(function() {
  var FuzzyProvider, Perf, Provider, Suggestion, Utils, fuzzaldrin, _,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  _ = require("underscore-plus");

  Suggestion = require("./suggestion");

  Utils = require("./utils");

  fuzzaldrin = require("fuzzaldrin");

  Provider = require("./provider");

  Perf = require("./perf");

  module.exports = FuzzyProvider = (function(_super) {
    __extends(FuzzyProvider, _super);

    function FuzzyProvider() {
      this.onChanged = __bind(this.onChanged, this);
      this.onSaved = __bind(this.onSaved, this);
      return FuzzyProvider.__super__.constructor.apply(this, arguments);
    }

    FuzzyProvider.prototype.wordList = null;

    FuzzyProvider.prototype.debug = false;

    FuzzyProvider.prototype.initialize = function() {
      this.buildWordList();
      this.currentBuffer = this.editor.getBuffer();
      this.currentBuffer.on("saved", this.onSaved);
      return this.currentBuffer.on("changed", this.onChanged);
    };


    /*
     * Gets called when the document has been changed. Returns an array with
     * suggestions. If `exclusive` is set to true and this method returns suggestions,
     * the suggestions will be the only ones that are displayed.
     * @return {Array}
     * @public
     */

    FuzzyProvider.prototype.buildSuggestions = function() {
      var prefix, selection, suggestions;
      selection = this.editor.getSelection();
      prefix = this.prefixOfSelection(selection);
      if (!prefix.length) {
        return;
      }
      suggestions = this.findSuggestionsForWord(prefix);
      if (!suggestions.length) {
        return;
      }
      return suggestions;
    };


    /*
     * Gets called when a suggestion has been confirmed by the user. Return true
     * to replace the word with the suggestion. Return false if you want to handle
     * the behavior yourself.
     * @param  {Suggestion} suggestion
     * @return {Boolean}
     * @public
     */

    FuzzyProvider.prototype.confirm = function(item) {
      return true;
    };


    /*
     * Gets called when the user saves the document. Rebuilds the word list
     * @private
     */

    FuzzyProvider.prototype.onSaved = function() {
      return this.buildWordList();
    };


    /*
     * Gets called when the buffer's text has been changed. Checks if the user
     * has potentially finished a word and adds the new word to the word list.
     * @param  {Event} e
     * @private
     */

    FuzzyProvider.prototype.onChanged = function(e) {
      var newLine, _ref;
      if ((_ref = e.newText) === "\n" || _ref === " ") {
        newLine = e.newText === "\n";
        return this.addLastWordToList(newLine);
      }
    };


    /*
     * Adds the last typed word to the wordList
     * @param {Boolean} newLine
     * @private
     */

    FuzzyProvider.prototype.addLastWordToList = function(newLine) {
      var lastWord;
      lastWord = this.lastTypedWord(newLine);
      if (!lastWord) {
        return;
      }
      if (this.wordList.indexOf(lastWord) < 0) {
        return this.wordList.push(lastWord);
      }
    };


    /*
     * Finds the last typed word. If newLine is set to true, it looks
     * for the last word in the previous line.
     * @param {Boolean} newLine
     * @return {String}
     * @private
     */

    FuzzyProvider.prototype.lastTypedWord = function(newLine) {
      var lastWord, lineRange, maxColumn, row, selectionRange;
      selectionRange = this.editor.getSelection().getBufferRange();
      row = selectionRange.start.row;
      if (newLine) {
        row--;
      }
      if (newLine) {
        maxColumn = this.editor.lineLengthForBufferRow(row);
      } else {
        maxColumn = selectionRange.start.column;
      }
      lineRange = [[row, 0], [row, maxColumn]];
      lastWord = null;
      this.currentBuffer.scanInRange(this.wordRegex, lineRange, function(_arg) {
        var match, range, stop;
        match = _arg.match, range = _arg.range, stop = _arg.stop;
        return lastWord = match[0];
      });
      return lastWord;
    };


    /*
     * Generates the word list from the editor buffer(s)
     * @private
     */

    FuzzyProvider.prototype.buildWordList = function() {
      var buffer, buffers, matches, p, wordList, _i, _len;
      wordList = [];
      if (atom.config.get("autocomplete-plus.includeCompletionsFromAllBuffers")) {
        buffers = atom.project.getBuffers();
      } else {
        buffers = [this.editor.getBuffer()];
      }
      p = new Perf("Building word list", {
        debug: this.debug
      });
      p.start();
      matches = [];
      for (_i = 0, _len = buffers.length; _i < _len; _i++) {
        buffer = buffers[_i];
        matches.push(buffer.getText().match(this.wordRegex));
      }
      wordList = _.flatten(matches);
      wordList = Utils.unique(wordList);
      this.wordList = wordList;
      return p.stop();
    };


    /*
     * Finds possible matches for the given string / prefix
     * @param  {String} prefix
     * @return {Array}
     * @private
     */

    FuzzyProvider.prototype.findSuggestionsForWord = function(prefix) {
      var p, results, word, wordList, words;
      p = new Perf("Finding matches for '" + prefix + "'", {
        debug: this.debug
      });
      p.start();
      wordList = this.wordList.concat(this.getCompletionsForCursorScope());
      words = fuzzaldrin.filter(wordList, prefix);
      results = (function() {
        var _i, _len, _results;
        _results = [];
        for (_i = 0, _len = words.length; _i < _len; _i++) {
          word = words[_i];
          if (word !== prefix) {
            _results.push(new Suggestion(this, {
              word: word,
              prefix: prefix
            }));
          }
        }
        return _results;
      }).call(this);
      p.stop();
      return results;
    };


    /*
     * Finds autocompletions in the current syntax scope (e.g. css values)
     * @return {Array}
     * @private
     */

    FuzzyProvider.prototype.getCompletionsForCursorScope = function() {
      var completions, cursorScope;
      cursorScope = this.editor.scopesForBufferPosition(this.editor.getCursorBufferPosition());
      completions = atom.syntax.propertiesForScope(cursorScope, "editor.completions");
      completions = completions.map(function(properties) {
        return _.valueForKeyPath(properties, "editor.completions");
      });
      return Utils.unique(_.flatten(completions));
    };

    return FuzzyProvider;

  })(Provider);

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLCtEQUFBO0lBQUE7O21TQUFBOztBQUFBLEVBQUEsQ0FBQSxHQUFJLE9BQUEsQ0FBUSxpQkFBUixDQUFKLENBQUE7O0FBQUEsRUFDQSxVQUFBLEdBQWEsT0FBQSxDQUFRLGNBQVIsQ0FEYixDQUFBOztBQUFBLEVBRUEsS0FBQSxHQUFRLE9BQUEsQ0FBUSxTQUFSLENBRlIsQ0FBQTs7QUFBQSxFQUdBLFVBQUEsR0FBYSxPQUFBLENBQVEsWUFBUixDQUhiLENBQUE7O0FBQUEsRUFJQSxRQUFBLEdBQVcsT0FBQSxDQUFRLFlBQVIsQ0FKWCxDQUFBOztBQUFBLEVBS0EsSUFBQSxHQUFPLE9BQUEsQ0FBUSxRQUFSLENBTFAsQ0FBQTs7QUFBQSxFQU9BLE1BQU0sQ0FBQyxPQUFQLEdBQ007QUFDSixvQ0FBQSxDQUFBOzs7Ozs7S0FBQTs7QUFBQSw0QkFBQSxRQUFBLEdBQVUsSUFBVixDQUFBOztBQUFBLDRCQUNBLEtBQUEsR0FBTyxLQURQLENBQUE7O0FBQUEsNEJBR0EsVUFBQSxHQUFZLFNBQUEsR0FBQTtBQUNWLE1BQUEsSUFBQyxDQUFBLGFBQUQsQ0FBQSxDQUFBLENBQUE7QUFBQSxNQUVBLElBQUMsQ0FBQSxhQUFELEdBQWlCLElBQUMsQ0FBQSxNQUFNLENBQUMsU0FBUixDQUFBLENBRmpCLENBQUE7QUFBQSxNQUdBLElBQUMsQ0FBQSxhQUFhLENBQUMsRUFBZixDQUFrQixPQUFsQixFQUEyQixJQUFDLENBQUEsT0FBNUIsQ0FIQSxDQUFBO2FBSUEsSUFBQyxDQUFBLGFBQWEsQ0FBQyxFQUFmLENBQWtCLFNBQWxCLEVBQTZCLElBQUMsQ0FBQSxTQUE5QixFQUxVO0lBQUEsQ0FIWixDQUFBOztBQVlBO0FBQUE7Ozs7OztPQVpBOztBQUFBLDRCQW1CQSxnQkFBQSxHQUFrQixTQUFBLEdB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
//# sourceURL=/Users/hisamatsu/dotfile/.atom/packages/autocomplete-plus/lib/fuzzy-provider.coffee