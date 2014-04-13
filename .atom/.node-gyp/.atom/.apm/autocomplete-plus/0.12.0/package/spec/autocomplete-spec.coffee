require "./spec-helper"
{$, EditorView, WorkspaceView} = require 'atom'
_ = require "underscore-plus"
AutocompleteView = require '../lib/autocomplete-view'
Autocomplete = require '../lib/autocomplete'

describe "Autocomplete", ->
  [activationPromise, completionDelay] = []

  beforeEach ->
    # Create a fake workspace and open a sample file
    atom.workspaceView = new WorkspaceView
    atom.workspaceView.openSync "sample.js"
    atom.workspaceView.simulateDomAttachment()

    # Set to live completion
    atom.config.set "autocomplete-plus.enableAutoActivation", true

    # Set the completion delay
    completionDelay = 100
    atom.config.set "autocomplete-plus.autoActivationDelay", completionDelay
    completionDelay += 100 # Rendering delay

    # Spy on AutocompleteView#initialize
    spyOn(AutocompleteView.prototype, "initialize").andCallThrough()

    # Activate the package
    activationPromise = atom.packages.activatePackage "autocomplete-plus"

  describe "@activate()", ->
    it "activates autocomplete and initializes AutocompleteView instances", ->
      expect(AutocompleteView.prototype.initialize).toHaveBeenCalled()
      editor = atom.workspaceView.getActiveView()

      waitsForPromise ->
        activationPromise

      runs ->
        expect(editor.find(".autocomplete-plus")).not.toExist()

  describe "@deactivate()", ->
    it "removes all autocomplete views", ->
      [editorView] = []

      waitsForPromise ->
        activationPromise

      runs ->
        editorView = atom.workspaceView.getActiveView()
        editor = editorView.getEditor()
        buffer = editor.getBuffer()

        # Trigger an autocompletion
        editor.moveCursorToBottom()
        editor.insertText("A")

        advanceClock completionDelay

        expect(editorView.find(".autocomplete-plus")).toExist()

        # Deactivate the package
        atom.packages.deactivatePackage "autocomplete-plus"
        expect(editorView.find(".autocomplete-plus")).not.toExist()

  describe "AutocompleteView", ->
    [autocomplete, editorView, editor] = []

    describe "when auto-activation is enabled", ->
      beforeEach ->
        atom.config.set "autocomplete-plus.enableAutoActivation", true
        atom.workspaceView = new WorkspaceView
        editorView = new EditorView editor: atom.project.openSync("sample.js")
        {editor} = editorView
        autocomplete = new AutocompleteView editorView

      describe "on changed events", ->
        it "should attach when finding suggestions", ->
          editorView.attachToDom()
          expect(editorView.find(".autocomplete-plus")).not.toExist()

          # Trigger an autocompletion
          triggerAutocompletion editor
          advanceClock completionDelay
          expect(editorView.find(".autocomplete-plus")).toExist()

          # Check suggestions
          suggestions = ["function", "if", "left", "shift"]
          editorView.find(".autocomplete li span").each (index, item) ->
            $item = $(item)
            expect($item.text()).toEqual suggestions[index]

        it "should not attach when not finding suggestions", ->
          editorView.attachToDom()
          expect(editorView.find(".autocomplete-plus")).not.toExist()

          # Trigger an autocompletion
          editor.moveCursorToBottom()
          editor.insertText("x")
          advanceClock completionDelay
          expect(editorView.find(".autocomplete-plus")).not.toExist()

      describe "accepting suggestions", ->
        describe "when pressing enter while suggestions are visible", ->
          it "inserts the word and moves the cursor to the end of the word", ->
            editorView.attachToDom()
            expect(editorView.find(".autocomplete-plus")).not.toExist()

            # Trigger an autocompletion
            triggerAutocompletion editor
            advanceClock completionDelay

            # Accept suggestion
            autocomplete.trigger "autocomplete-plus:confirm"

            # Check for result
            expect(editor.getBuffer().getLastLine()).toEqual "function"

            # Check for cursor position
            bufferPosition = editor.getCursorBufferPosition()
            expect(bufferPosition.row).toEqual 13
            expect(bufferPosition.column).toEqual 8

          it "hides the suggestions", ->
            editorView.attachToDom()
            expect(editorView.find(".autocomplete-plus")).not.toExist()

            # Trigger an autocompletion
            editor.moveCursorToBottom()
            editor.moveCursorToBeginningOfLine()
            editor.insertText("f")
            advanceClock completionDelay
            expect(editorView.find(".autocomplete-plus")).toExist()

            # Accept suggestion
            autocomplete.trigger "autocomplete-plus:confirm"

            expect(editorView.find(".autocomplete-plus")).not.toExist()

      describe "move-up event", ->
        it "selects the previous item in the list", ->
          editorView.attachToDom()

          # Trigger an autocompletion
          triggerAutocompletion editor
          advanceClock completionDelay

          expect(editorView.find(".autocomplete-plus li:eq(0)")).toHaveClass("selected")
          expect(editorView.find(".autocomplete-plus li:eq(1)")).not.toHaveClass("selected")
          expect(editorView.find(".autocomplete-plus li:eq(2)")).not.toHaveClass("selected")
          expect(editorView.find(".autocomplete-plus li:eq(3)")).not.toHaveClass("selected")

          # Accept suggestion
          autocomplete.trigger "core:move-up"

          expect(editorView.find(".autocomplete-plus li:eq(0)")).not.toHaveClass("selected")
          expect(editorView.find(".autocomplete-plus li:eq(1)")).not.toHaveClass("selected")
          expect(editorView.find(".autocomplete-plus li:eq(2)")).not.toHaveClass("selected")
          expect(editorView.find(".autocomplete-plus li:eq(3)")).toHaveClass("selected")

      describe "move-down event", ->
        it "selects the next item in the list", ->
          editorView.attachToDom()

          # Trigger an autocompletion
          triggerAutocompletion editor
          advanceClock completionDelay

          expect(editorView.find(".autocomplete-plus li:eq(0)")).toHaveClass("selected")
          expect(editorView.find(".autocomplete-plus li:eq(1)")).not.toHaveClass("selected")
          expect(editorView.find(".autocomplete-plus li:eq(2)")).not.toHaveClass("selected")
          expect(editorView.find(".autocomplete-plus li:eq(3)")).not.toHaveClass("selected")

          # Accept suggestion
          autocomplete.trigger "core:move-down"

          expect(editorView.find(".autocomplete-plus li:eq(0)")).not.toHaveClass("selected")
          expect(editorView.find(".autocomplete-plus li:eq(1)")).toHaveClass("selected")
          expect(editorView.find(".autocomplete-plus li:eq(2)")).not.toHaveClass("selected")
          expect(editorView.find(".autocomplete-plus li:eq(3)")).not.toHaveClass("selected")

      describe "when a suggestion is clicked", ->
        it "should select the item and confirm the selection", ->
          editorView.attachToDom()

          # Trigger an autocompletion
          triggerAutocompletion editor
          advanceClock completionDelay

          # Get the second item
          item = editorView.find(".autocomplete-plus li:eq(1)")

          # Click the item, expect list to be hidden and
          # text to be added
          item.mousedown()
          expect(item).toHaveClass "selected"
          item.mouseup()

          expect(editorView.find(".autocomplete-plus")).not.toExist()
          expect(editor.getBuffer().getLastLine()).toEqual item.text()

      describe "Positioning", ->
        beforeEach ->
          editorView.attachToDom()
          setEditorHeightInLines editorView, 13
          editorView.resetDisplay() # Ensures the editor only has 13 lines visible

        describe "when the autocomplete view fits below the cursor", ->
          it "adds the autocomplete view to the editor below the cursor", ->
            editor.setCursorBufferPosition [1, 2]
            editor.insertText "f"
            advanceClock completionDelay
            expect(editorView.find(".autocomplete-plus")).toExist()

            # Check position
            cursorPixelPosition = editorView.pixelPositionForScreenPosition editor.getCursorScreenPosition()
            expect(autocomplete.position().top).toBe cursorPixelPosition.top + editorView.lineHeight
            expect(autocomplete.position().left).toBe cursorPixelPosition.left

        describe "when the autocomplete view does not fit below the cursor", ->
          it "adds the autocomplete view to the editor above the cursor", ->
            # Trigger autocompletion
            editor.setCursorScreenPosition [11, 0]
            editor.insertText "t"
            advanceClock completionDelay
            expect(editorView.find(".autocomplete-plus")).toExist()

            # Check position
            cursorPixelPosition = editorView.pixelPositionForScreenPosition editor.getCursorScreenPosition()
            autocompleteBottom = autocomplete.position().top + autocomplete.outerHeight()
            expect(autocompleteBottom).toBe cursorPixelPosition.top
            expect(autocomplete.position().left).toBe cursorPixelPosition.left

      describe ".cancel()", ->
        it "unbinds autocomplete event handlers for move-up and move-down", ->
          triggerAutocompletion editor, false
          autocomplete.cancel()

          editorView.trigger "core:move-down"
          expect(editor.getCursorBufferPosition().row).toBe 1

          editorView.trigger "core:move-up"
          expect(editor.getCursorBufferPosition().row).toBe 0

      # TODO: Move this to a separate fuzzyprovider spec
      it "adds words to the wordlist after they have been written", ->
        editorView.attachToDom()
        editor.insertText "somethingNew"
        editor.insertText " "

        provider = autocomplete.providers[0];
        expect(provider.wordList.indexOf("somethingNew")).not.toEqual(-1)

      it "sets the width of the view to be wide enough to contain the longest completion without scrolling (+ 15 pixels)", ->
        editorView.attachToDom()
        editor.insertText('thisIsAReallyReallyReallyLongCompletion ')
        editor.moveCursorToBottom()
        editor.insertNewline()
        editor.insertText "t"
        advanceClock completionDelay
        expect(autocomplete.list.prop('scrollWidth') + 15).toBe autocomplete.list.width()

      it "includes completions for the scope's completion preferences", ->
        waitsForPromise ->
          atom.packages.activatePackage('language-css')

        runs ->
          cssEditorView = new EditorView(editor: atom.project.openSync('css.css'))
          cssEditor = cssEditorView.editor
          autocomplete = new AutocompleteView(cssEditorView)

          cssEditorView.attachToDom()
          cssEditor.moveCursorToEndOfLine()
          cssEditor.insertText "o"
          cssEditor.insertText "u"
          cssEditor.insertText "t"

          advanceClock completionDelay

          expect(cssEditorView.find(".autocomplete-plus")).toExist()

          expect(autocomplete.list.find("li").length).toBe 10
          expect(autocomplete.list.find("li:eq(0)")).toHaveText "outline"
          expect(autocomplete.list.find("li:eq(1)")).toHaveText "outline-color"
          expect(autocomplete.list.find("li:eq(2)")).toHaveText "outline-width"
          expect(autocomplete.list.find("li:eq(3)")).toHaveText "outline-style"

    describe "Hotkey Activation", ->
      beforeEach ->
        atom.config.set "autocomplete-plus.enableAutoActivation", false
        atom.workspaceView = new WorkspaceView
        editorView = new EditorView editor: atom.project.openSync("sample.js")
        {editor} = editorView
        autocomplete = new AutocompleteView editorView

      it "does not show suggestions after a delay", ->
        triggerAutocompletion editor
        advanceClock completionDelay
        expect(editorView.find(".autocomplete-plus")).not.toExist()

        editorView.trigger "autocomplete-plus:activate"
        expect(editorView.find(".autocomplete-plus")).toExist()

    describe "File blacklist", ->
      beforeEach ->
        atom.workspaceView = new WorkspaceView
        editorView = new EditorView editor: atom.project.openSync("blacklisted.md")
        {editor} = editorView
        autocomplete = new AutocompleteView editorView

      it "should not show autocompletion for files that match the blacklist", ->
        editorView.attachToDom()

        editor.insertText "a"
        advanceClock completionDelay

        expect(editorView.find(".autocomplete-plus")).not.toExist()
