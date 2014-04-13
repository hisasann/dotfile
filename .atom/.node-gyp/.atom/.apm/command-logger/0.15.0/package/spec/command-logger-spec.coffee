{WorkspaceView} = require 'atom'

describe "CommandLogger", ->
  [commandLogger, editor] = []

  beforeEach ->
    atom.workspaceView = new WorkspaceView
    atom.workspaceView.openSync('sample.js')
    editor = atom.workspaceView.getActiveView()

    waitsForPromise ->
      atom.packages.activatePackage('command-logger')

    runs ->
      commandLogger = atom.packages.getActivePackage('command-logger').mainModule
      commandLogger.eventLog = {}

  describe "when a command is triggered", ->
    it "records the number of times the command is triggered", ->
      expect(commandLogger.eventLog['core:backspace']).toBeUndefined()
      editor.trigger 'core:backspace'
      expect(commandLogger.eventLog['core:backspace'].count).toBe 1
      editor.trigger 'core:backspace'
      expect(commandLogger.eventLog['core:backspace'].count).toBe 2

    it "records the date the command was last triggered", ->
      expect(commandLogger.eventLog['core:backspace']).toBeUndefined()
      editor.trigger 'core:backspace'
      lastRun = commandLogger.eventLog['core:backspace'].lastRun
      expect(lastRun).toBeGreaterThan 0
      start = Date.now()
      waitsFor ->
        Date.now() > start

      runs ->
        editor.trigger 'core:backspace'
        expect(commandLogger.eventLog['core:backspace'].lastRun).toBeGreaterThan lastRun

  describe "when the data is cleared", ->
    it "removes all triggered events from the log", ->
      expect(commandLogger.eventLog['core:backspace']).toBeUndefined()
      editor.trigger 'core:backspace'
      expect(commandLogger.eventLog['core:backspace'].count).toBe 1
      atom.workspaceView.trigger 'command-logger:clear-data'
      expect(commandLogger.eventLog['core:backspace']).toBeUndefined()

  describe "when an event is ignored", ->
    it "does not create a node for that event", ->
      commandLoggerView = commandLogger.createView()
      commandLoggerView.ignoredEvents.push 'editor:delete-line'
      editor.trigger 'editor:delete-line'
      commandLoggerView.eventLog = commandLogger.eventLog
      nodes = commandLoggerView.createNodes()
      for {name, children} in nodes when name is 'Editor'
        for child in children
          expect(child.name.indexOf('Delete Line')).toBe -1

  describe "command-logger:open", ->
    it "opens the command logger in a pane", ->
      atom.workspaceView.attachToDom()
      atom.workspaceView.trigger 'command-logger:open'

      waitsFor ->
        atom.workspaceView.getActivePaneItem().treeMap?

      runs ->
        commandLoggerView = atom.workspaceView.getActivePaneItem()
        expect(commandLoggerView.categoryHeader.text()).toBe 'All Commands'
        expect(commandLoggerView.categorySummary.text()).toBe ' (1 command, 1 invocation)'
        expect(commandLoggerView.treeMap.find('svg').length).toBe 1
