JSbeautify = require("js-beautify").js_beautify
HTMLbeautify = require("js-beautify").html
CSSbeautify = require("js-beautify").css
Subscriber = require('emissary').Subscriber
_ = require('lodash')

plugin = module.exports

Subscriber.extend(plugin)


convertJs = ->
  console.log("Converting Js..")
  editor = atom.workspace.activePaneItem

  return unless editor.getGrammar()?.scopeName is 'source.js'

  editor.setText JSbeautify(editor.getText(),
    indent_size: atom.config.get('atom-beautifier.JsIndentSize')
    indent_char: atom.config.get('atom-beautifier.JsIndentChar')
    indent_level: atom.config.get('atom-beautifier.JsIndentLevel')
    indent_with_tabs: atom.config.get('atom-beautifier.JsIndentWithTabs')
    preserve_newlines: atom.config.get('atom-beautifier.JsPreserveNewlines')
    max_preserve_newlines: atom.config.get('atom-beautifier.JsMaxPreserveNewlines')
    jslint_happy: atom.config.get('atom-beautifier.JsJslintHappy')
    brace_style: atom.config.get('atom-beautifier.JsBraceStyle')
    keep_array_indentation: atom.config.get('atom-beautifier.JsKeepArrayIndentation')
    keep_function_indentation: atom.config.get('atom-beautifier.JsKeepFunctionIndentation')
    space_before_conditional: atom.config.get('atom-beautifier.JsSpaceBeforeConditional')
    break_chained_methods: atom.config.get('atom-beautifier.JsBreakChainedMethods')
    eval_code: atom.config.get('atom-beautifier.JsEvalCode')
    unescape_strings: atom.config.get('atom-beautifier.JsUnescapeStrings')
    wrap_line_length: atom.config.get('atom-beautifier.JsWrapLineLength')
  )

convertCSS = ->
  console.log("Converting CSS..")
  editor = atom.workspace.activePaneItem
  return unless editor.getGrammar()?.scopeName is 'source.css'

  editor.setText CSSbeautify(editor.getText(),
    indent_size: atom.config.get('atom-beautifier.CssIndentSize')
    indent_char: atom.config.get('atom-beautifier.CssIndentChar')
  )

convertHTML = ->
  console.log("Converting Html..")
  editor = atom.workspace.activePaneItem
  return unless editor.getGrammar()?.scopeName is 'text.html.basic'

  editor.setText HTMLbeautify(editor.getText(),
    indent_size: atom.config.get('atom-beautifier.HtmlIndentSize')
    indent_char: atom.config.get('atom-beautifier.HtmlIndentChar')
    indent_inner_html : atom.config.get('atom-beautifier.HtmlIndentInnerHtml')
    brace_style : atom.config.get('atom-beautifier.HtmlBraceStyle')
    indent_scripts : atom.config.get('atom-beautifier.HtmlIndentScripts')
    wrap_line_length : atom.config.get('atom-beautifier.HtmlWrapLineLength')
  )

convert = ->
  editor = atom.workspace.activePaneItem
  console.log(editor.getGrammar()?.scopeName)
  if editor.getGrammar()?.scopeName is 'source.js'
    convertJs()
  else if editor.getGrammar()?.scopeName is 'source.css'
    convertCSS()
  else if editor.getGrammar()?.scopeName is 'text.html.basic'
    convertHTML()

plugin.configDefaults =
  autoSave: false
  JsIndentSize: 2
  JsIndentChar: " "
  JsIndentLevel: 0
  JsIndentWithTabs: false
  JsPreserveNewlines: true
  JsMaxPreserveNewlines: 10
  JsJslintHappy: false
  JsBraceStyle: "collapse"
  JsKeepArrayIndentation: false
  JsKeepFunctionIndentation: false
  JsSpaceBeforeConditional: true
  JsBreakChainedMethods: false
  JsEvalCode: false
  JsUnescapeStrings: false
  JsWrapLineLength: 0
  CssIndentSize: 2
  CssIndentChar: " "
  HtmlIndentInnerHtml: false
  HtmlIndentSize: 2
  HtmlIndentChar: " "
  HtmlBraceStyle: "collapse"
  HtmlIndentScripts: "normal"
  HtmlWrapLineLength: 250


plugin.activate = ->

  atom.workspaceView.command "beautifier", -> convert()
  atom.workspaceView.command "beautifier:js", -> convertJs()
  atom.workspaceView.command "beautifier:html", -> convertHTML()
  atom.workspaceView.command "beautifier:css", -> convertCSS()

  if atom.config.get('atom-beautifier.autoSave')

    atom.workspace.eachEditor (editor) ->

      buffer = editor.getBuffer()

      plugin.unsubscribe(buffer)

      plugin.subscribe(buffer, 'saved', _.debounce(convert, 50))
