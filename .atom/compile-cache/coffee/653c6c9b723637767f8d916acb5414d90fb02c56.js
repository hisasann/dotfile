(function() {
  var $, $$, AutocompleteView, Editor, FuzzyProvider, Perf, Range, SimpleSelectListView, Utils, minimatch, path, _, _ref,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  _ref = require("atom"), Editor = _ref.Editor, $ = _ref.$, $$ = _ref.$$, Range = _ref.Range;

  _ = require("underscore-plus");

  path = require("path");

  minimatch = require("minimatch");

  SimpleSelectListView = require("./simple-select-list-view");

  FuzzyProvider = require("./fuzzy-provider");

  Perf = require("./perf");

  Utils = require("./utils");

  module.exports = AutocompleteView = (function(_super) {
    __extends(AutocompleteView, _super);

    function AutocompleteView() {
      this.onChanged = __bind(this.onChanged, this);
      this.onSaved = __bind(this.onSaved, this);
      this.cursorMoved = __bind(this.cursorMoved, this);
      this.contentsModified = __bind(this.contentsModified, this);
      this.runAutocompletion = __bind(this.runAutocompletion, this);
      this.cancel = __bind(this.cancel, this);
      return AutocompleteView.__super__.constructor.apply(this, arguments);
    }

    AutocompleteView.prototype.currentBuffer = null;

    AutocompleteView.prototype.debug = false;


    /*
     * Makes sure we're listening to editor and buffer events, sets
     * the current buffer
     * @param  {EditorView} @editorView
     * @private
     */

    AutocompleteView.prototype.initialize = function(editorView) {
      this.editorView = editorView;
      this.editor = this.editorView.editor;
      AutocompleteView.__super__.initialize.apply(this, arguments);
      this.addClass("autocomplete-plus");
      this.providers = [];
      if (this.currentFileBlacklisted()) {
        return;
      }
      this.registerProvider(new FuzzyProvider(this.editorView));
      this.handleEvents();
      this.setCurrentBuffer(this.editor.getBuffer());
      return this.subscribeToCommand(this.editorView, "autocomplete-plus:activate", this.runAutocompletion);
    };


    /*
     * Checks whether the current file is blacklisted
     * @return {Boolean}
     * @private
     */

    AutocompleteView.prototype.currentFileBlacklisted = function() {
      var blacklist, blacklistGlob, fileName, _i, _len;
      blacklist = (atom.config.get("autocomplete-plus.fileBlacklist") || "").split(",").map(function(s) {
        return s.trim();
      });
      fileName = path.basename(this.editor.getBuffer().getPath());
      for (_i = 0, _len = blacklist.length; _i < _len; _i++) {
        blacklistGlob = blacklist[_i];
        if (minimatch(fileName, blacklistGlob)) {
          return true;
        }
      }
      return false;
    };


    /*
     * Creates a view for the given item
     * @return {jQuery}
     * @private
     */

    AutocompleteView.prototype.viewForItem = function(_arg) {
      var label, word;
      word = _arg.word, label = _arg.label;
      return $$(function() {
        return this.li((function(_this) {
          return function() {
            _this.span(word, {
              "class": "word"
            });
            if (label != null) {
              return _this.span(label, {
                "class": "label"
              });
            }
          };
        })(this));
      });
    };


    /*
     * Handles editor events
     * @private
     */

    AutocompleteView.prototype.handleEvents = function() {
      this.list.on("mousewheel", function(event) {
        return event.stopPropagation();
      });
      this.editor.on("title-changed-subscription-removed", this.cancel);
      return this.editor.on("cursor-moved", this.cursorMoved);
    };


    /*
     * Registers the given provider
     * @param  {Provider} provider
     * @private
     */

    AutocompleteView.prototype.registerProvider = function(provider) {
      return this.providers.push(provider);
    };


    /*
     * Gets called when the user successfully confirms a suggestion
     * @private
     */

    AutocompleteView.prototype.confirmed = function(match) {
      var position, replace;
      replace = match.provider.confirm(match);
      this.editor.getSelection().clear();
      this.cancel();
      if (!match) {
        return;
      }
      if (replace) {
        this.replaceTextWithMatch(match);
        position = this.editor.getCursorBufferPosition();
        return this.editor.setCursorBufferPosition([position.row, position.column]);
      }
    };


    /*
     * Focuses the editor again
     * @private
     */

    AutocompleteView.prototype.cancel = function() {
      AutocompleteView.__super__.cancel.apply(this, arguments);
      return this.editorView.focus();
    };


    /*
     * Finds suggestions for the current prefix, sets the list items,
     * positions the overlay and shows it
     * @private
     */

    AutocompleteView.prototype.runAutocompletion = function() {
      var provider, providerSuggestions, suggestions, _i, _len, _ref1;
      if (this.active) {
        this.detach();
        this.list.empty();
        this.editorView.focus();
      }
      suggestions = [];
      _ref1 = this.providers.slice().reverse();
      for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
        provider = _ref1[_i];
        providerSuggestions = provider.buildSuggestions();
        if (!(providerSuggestions != null ? providerSuggestions.length : void 0)) {
          continue;
        }
        if (provider.exclusive) {
          suggestions = providerSuggestions;
          break;
        } else {
          suggestions = suggestions.concat(providerSuggestions);
        }
      }
      if (!suggestions.length) {
        return;
      }
      this.setItems(suggestions);
      this.editorView.appendToLinesView(this);
      this.setPosition();
      return this.setActive();
    };


    /*
     * Gets called when the content has been modified
     * @private
     */

    AutocompleteView.prototype.contentsModified = function() {
      var delay;
      delay = parseInt(atom.config.get("autocomplete-plus.autoActivationDelay"));
      if (this.delayTimeout) {
        clearTimeout(this.delayTimeout);
      }
      return this.delayTimeout = setTimeout(this.runAutocompletion, delay);
    };


    /*
     * Gets called when the cursor has moved. Cancels the autocompletion if
     * the text has not been changed and the autocompletion is
     * @param  {[type]} data [description]
     * @return {[type]}      [description]
     */

    AutocompleteView.prototype.cursorMoved = function(data) {
      if (!data.textChanged) {
        return this.cancel();
      }
    };


    /*
     * Gets called when the user saves the document. Rebuilds the word
     * list and cancels the autocompletion
     * @private
     */

    AutocompleteView.prototype.onSaved = function() {
      return this.cancel();
    };


    /*
     * Cancels the autocompletion if the user entered more than one character
     * with a single keystroke. (= pasting)
     * @param  {Event} e
     * @private
     */

    AutocompleteView.prototype.onChanged = function(e) {
      if (e.newText.length === 1 && atom.config.get("autocomplete-plus.enableAutoActivation")) {
        return this.contentsModified();
      } else {
        return this.cancel();
      }
    };


    /*
     * Repositions the list view. Checks for boundaries and moves the view
     * above or below the cursor if needed.
     * @private
     */

    AutocompleteView.prototype.setPosition = function() {
      var abovePosition, belowLowerPosition, belowPosition, cursorLeft, cursorTop, left, top, _ref1;
      _ref1 = this.editorView.pixelPositionForScreenPosition(this.editor.getCursorScreenPosition()), left = _ref1.left, top = _ref1.top;
      cursorLeft = left;
      cursorTop = top;
      belowPosition = cursorTop + this.editorView.lineHeight;
      belowLowerPosition = belowPosition + this.outerHeight();
      abovePosition = cursorTop;
      if (belowLowerPosition > this.editorView.outerHeight() + this.editorView.scrollTop()) {
        this.css({
          left: cursorLeft,
          top: abovePosition
        });
        return this.css("-webkit-transform", "translateY(-100%)");
      } else {
        this.css({
          left: cursorLeft,
          top: belowPosition
        });
        return this.css("-webkit-transform", "");
      }
    };


    /*
     * Replaces the current prefix with the given match
     * @param {Object} match
     * @private
     */

    AutocompleteView.prototype.replaceTextWithMatch = function(match) {
      var buffer, cursorPosition, selection, startPosition, suffixLength;
      selection = this.editor.getSelection();
      startPosition = selection.getBufferRange().start;
      buffer = this.editor.getBuffer();
      cursorPosition = this.editor.getCursorBufferPosition();
      buffer["delete"](Range.fromPointWithDelta(cursorPosition, 0, -match.prefix.length));
      this.editor.insertText(match.word);
      suffixLength = match.word.length - match.prefix.length;
      return this.editor.setSelectedBufferRange([startPosition, [startPosition.row, startPosition.column + suffixLength]]);
    };


    /*
     * As soon as the list is in the DOM tree, it calculates the maximum width of
     * all list items and resizes the list so that all items fit
     * @param {Boolean} onDom
     *
     */

    AutocompleteView.prototype.afterAttach = function(onDom) {
      var widestCompletion;
      if (!onDom) {
        return;
      }
      widestCompletion = parseInt(this.css("min-width")) || 0;
      this.list.find("li").each(function() {
        var labelWidth, totalWidth, wordWidth;
        wordWidth = $(this).find("span.word").outerWidth();
        labelWidth = $(this).find("span.label").outerWidth();
        totalWidth = wordWidth + labelWidth + 40;
        return widestCompletion = Math.max(widestCompletion, totalWidth);
      });
      this.list.width(widestCompletion);
      return this.width(this.list.outerWidth());
    };


    /*
     * Updates the list's position when populating results
     * @private
     */

    AutocompleteView.prototype.populateList = function() {
      var p;
      p = new Perf("Populating list", {
        debug: this.debug
      });
      p.start();
      AutocompleteView.__super__.populateList.apply(this, arguments);
      p.stop();
      return this.setPosition();
    };


    /*
     * Sets the current buffer, starts listening to change events and delegates
     * them to #onChanged()
     * @param {TextBuffer}
     * @private
     */

    AutocompleteView.prototype.setCurrentBuffer = function(currentBuffer) {
      this.currentBuffer = currentBuffer;
      this.currentBuffer.on("saved", this.onSaved);
      return this.currentBuffer.on("changed", this.onChanged);
    };


    /*
     * Why are we doing this again...?
     * Might be because of autosave:
     * http://git.io/iF32wA
     * @private
     */

    AutocompleteView.prototype.getModel = function() {
      return null;
    };


    /*
     * Clean up, stop listening to events
     * @public
     */

    AutocompleteView.prototype.dispose = function() {
      var _ref1, _ref2;
      if ((_ref1 = this.currentBuffer) != null) {
        _ref1.off("changed", this.onChanged);
      }
      if ((_ref2 = this.currentBuffer) != null) {
        _ref2.off("saved", this.onSaved);
      }
      this.editor.off("title-changed-subscription-removed", this.cancel);
      return this.editor.off("cursor-moved", this.cursorMoved);
    };

    return AutocompleteView;

  })(SimpleSelectListView);

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLGtIQUFBO0lBQUE7O21TQUFBOztBQUFBLEVBQUEsT0FBMEIsT0FBQSxDQUFRLE1BQVIsQ0FBMUIsRUFBQyxjQUFBLE1BQUQsRUFBUyxTQUFBLENBQVQsRUFBWSxVQUFBLEVBQVosRUFBZ0IsYUFBQSxLQUFoQixDQUFBOztBQUFBLEVBQ0EsQ0FBQSxHQUFJLE9BQUEsQ0FBUSxpQkFBUixDQURKLENBQUE7O0FBQUEsRUFFQSxJQUFBLEdBQU8sT0FBQSxDQUFRLE1BQVIsQ0FGUCxDQUFBOztBQUFBLEVBR0EsU0FBQSxHQUFZLE9BQUEsQ0FBUSxXQUFSLENBSFosQ0FBQTs7QUFBQSxFQUlBLG9CQUFBLEdBQXVCLE9BQUEsQ0FBUSwyQkFBUixDQUp2QixDQUFBOztBQUFBLEVBS0EsYUFBQSxHQUFnQixPQUFBLENBQVEsa0JBQVIsQ0FMaEIsQ0FBQTs7QUFBQSxFQU1BLElBQUEsR0FBTyxPQUFBLENBQVEsUUFBUixDQU5QLENBQUE7O0FBQUEsRUFPQSxLQUFBLEdBQVEsT0FBQSxDQUFRLFNBQVIsQ0FQUixDQUFBOztBQUFBLEVBU0EsTUFBTSxDQUFDLE9BQVAsR0FDTTtBQUNKLHVDQUFBLENBQUE7Ozs7Ozs7Ozs7S0FBQTs7QUFBQSwrQkFBQSxhQUFBLEdBQWUsSUFBZixDQUFBOztBQUFBLCtCQUNBLEtBQUEsR0FBTyxLQURQLENBQUE7O0FBR0E7QUFBQTs7Ozs7T0FIQTs7QUFBQSwrQkFTQSxVQUFBLEdBQVksU0FBRSxVQUFGLEdBQUE7QUFDVixNQURXLElBQUMsQ0FBQSxhQUFBLFVBQ1osQ0FBQTtBQUFBLE1BQUMsSUFBQyxDQUFBLFNBQVUsSUFBQyxDQUFBLFdBQVgsTUFBRixDQUFBO0FBQUEsTUFFQSxrREFBQSxTQUFBLENBRkEsQ0FBQTtBQUFBLE1BSUEsSUFBQyxDQUFBLFFBQUQs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
//# sourceURL=/Users/hisamatsu/dotfile/.atom/packages/autocomplete-plus/lib/autocomplete-view.coffee