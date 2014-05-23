
/*
 * A provider provides an interface to the autocomplete+ package. Third-party
 * packages can register providers which will then be used to generate the
 * suggestions list.
 */

(function() {
  var Provider;

  module.exports = Provider = (function() {
    Provider.prototype.wordRegex = /\b\w*[a-zA-Z_]\w*\b/g;

    function Provider(editorView) {
      this.editorView = editorView;
      this.editor = editorView.editor;
      this.initialize.apply(this, arguments);
    }


    /*
     * An an initializer for subclasses
     * @private
     */

    Provider.prototype.initialize = function() {};


    /*
     * Defines whether the words returned at #buildWordList() should be added to
     * the default suggestions or should be displayed exclusively
     * @type {Boolean}
     */

    Provider.prototype.exclusive = false;


    /*
     * Gets called when the document has been changed. Returns an array with
     * suggestions. If `exclusive` is set to true and this method returns suggestions,
     * the suggestions will be the only ones that are displayed.
     * @return {Array}
     * @public
     */

    Provider.prototype.buildSuggestions = function() {
      throw new Error("Subclass must implement a buildWordList(prefix) method");
    };


    /*
     * Gets called when a suggestion has been confirmed by the user. Return true
     * to replace the word with the suggestion. Return false if you want to handle
     * the behavior yourself.
     * @param  {Suggestion} suggestion
     * @return {Boolean}
     * @public
     */

    Provider.prototype.confirm = function(suggestion) {
      return true;
    };


    /*
     * Finds and returns the content before the current cursor position
     * @param {Selection} selection
     * @return {String}
     * @private
     */

    Provider.prototype.prefixOfSelection = function(selection) {
      var lineRange, prefix, selectionRange;
      selectionRange = selection.getBufferRange();
      lineRange = [[selectionRange.start.row, 0], [selectionRange.end.row, this.editor.lineLengthForBufferRow(selectionRange.end.row)]];
      prefix = "";
      this.editor.getBuffer().scanInRange(this.wordRegex, lineRange, function(_arg) {
        var match, prefixOffset, range, stop;
        match = _arg.match, range = _arg.range, stop = _arg.stop;
        if (range.start.isGreaterThan(selectionRange.end)) {
          stop();
        }
        if (range.intersectsWith(selectionRange)) {
          prefixOffset = selectionRange.start.column - range.start.column;
          if (range.start.isLessThan(selectionRange.start)) {
            return prefix = match[0].slice(0, prefixOffset);
          }
        }
      });
      return prefix;
    };

    return Provider;

  })();

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQTs7OztHQUFBO0FBQUE7QUFBQTtBQUFBLE1BQUEsUUFBQTs7QUFBQSxFQU1BLE1BQU0sQ0FBQyxPQUFQLEdBQ007QUFDSix1QkFBQSxTQUFBLEdBQVcsc0JBQVgsQ0FBQTs7QUFDYSxJQUFBLGtCQUFFLFVBQUYsR0FBQTtBQUNYLE1BRFksSUFBQyxDQUFBLGFBQUEsVUFDYixDQUFBO0FBQUEsTUFBQyxJQUFDLENBQUEsU0FBVSxXQUFWLE1BQUYsQ0FBQTtBQUFBLE1BQ0EsSUFBQyxDQUFBLFVBQVUsQ0FBQyxLQUFaLENBQWtCLElBQWxCLEVBQXdCLFNBQXhCLENBREEsQ0FEVztJQUFBLENBRGI7O0FBS0E7QUFBQTs7O09BTEE7O0FBQUEsdUJBU0EsVUFBQSxHQUFZLFNBQUEsR0FBQSxDQVRaLENBQUE7O0FBWUE7QUFBQTs7OztPQVpBOztBQUFBLHVCQWlCQSxTQUFBLEdBQVcsS0FqQlgsQ0FBQTs7QUFtQkE7QUFBQTs7Ozs7O09BbkJBOztBQUFBLHVCQTBCQSxnQkFBQSxHQUFrQixTQUFBLEdBQUE7QUFDaEIsWUFBVSxJQUFBLEtBQUEsQ0FBTSx3REFBTixDQUFWLENBRGdCO0lBQUEsQ0ExQmxCLENBQUE7O0FBNkJBO0FBQUE7Ozs7Ozs7T0E3QkE7O0FBQUEsdUJBcUNBLE9BQUEsR0FBUyxTQUFDLFVBQUQsR0FBQTtBQUNQLGFBQU8sSUFBUCxDQURPO0lBQUEsQ0FyQ1QsQ0FBQTs7QUF3Q0E7QUFBQTs7Ozs7T0F4Q0E7O0FBQUEsdUJBOENBLGlCQUFBLEdBQW1CLFNBQUMsU0FBRCxHQUFBO0FBQ2pCLFVBQUEsaUNBQUE7QUFBQSxNQUFBLGNBQUEsR0FBaUIsU0FBUyxDQUFDLGNBQVYsQ0FBQSxDQUFqQixDQUFBO0FBQUEsTUFDQSxTQUFBLEdBQVksQ0FBQyxDQUFDLGNBQWMsQ0FBQyxLQUFLLENBQUMsR0FBdEIsRUFBMkIsQ0FBM0IsQ0FBRCxFQUFnQyxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsR0FBcEIsRUFBeUIsSUFBQyxDQUFBLE1BQU0sQ0FBQyxzQkFBUixDQUErQixjQUFjLENBQUMsR0FBRyxDQUFDLEdBQWxELENBQXpCLENBQWhDLENBRFosQ0FBQTtBQUFBLE1BRUEsTUFBQSxHQUFTLEVBRlQsQ0FBQTtBQUFBLE1BR0EsSUFBQyxDQUFBLE1BQU0sQ0FBQyxTQUFSLENBQUEsQ0FBbUIsQ0FBQyxXQUFwQixDQUFnQyxJQUFDLENBQUEsU0FBakMsRUFBNEMsU0FBNUMsRUFBdUQsU0FBQyxJQUFELEdBQUE7QUFDckQsWUFBQSxnQ0FBQTtBQUFBLFFBRHVELGFBQUEsT0FBTyxhQUFBLE9BQU8sWUFBQSxJQUNyRSxDQUFBO0FBQUEsUUFBQSxJQUFVLEtBQUssQ0FBQyxLQUFLLENBQUMsYUFBWixDQUEwQixjQUFjLENBQUMsR0FBekMsQ0FBVjtBQUFBLFVBQUEsSUFBQSxDQUFBLENBQUEsQ0FBQTtTQUFBO0FBRUEsUUFBQSxJQUFHLEtBQUssQ0FBQyxjQUFOLENBQXFCLGNBQXJCLENBQUg7QUFDRSxVQUFBLFlBQUEsR0FBZSxjQUFjLENBQUMsS0FBSyxDQUFDLE1BQXJCLEdBQThCLEtBQUssQ0FBQyxLQUFLLENBQUMsTUFBekQsQ0FBQTtBQUNBLFVBQUEsSUFBdUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxVQUFaLENBQXVCLGNBQWMsQ0FBQyxLQUF0QyxDQUF2QzttQkFBQSxNQUFBLEdBQVMsS0FBTSxDQUFBLENBQUEsQ0FBRyx3QkFBbEI7V0FGRjtTQUhxRDtNQUFBLENBQXZELENBSEEsQ0FBQTtBQVVBLGFBQU8sTUFBUCxDQVhpQjtJQUFBLENBOUNuQixDQUFBOztvQkFBQTs7TUFSRixDQUFBO0FBQUEiCn0=
//# sourceURL=/Users/hisamatsu/dotfile/.atom/packages/autocomplete-plus/lib/provider.coffee