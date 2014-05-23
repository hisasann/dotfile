(function() {
  var formatter, prettify, stringify;

  stringify = require("json-stable-stringify");

  prettify = function(editor, sorted) {
    var text, wholeFile;
    wholeFile = editor.getGrammar().name === 'JSON';
    if (wholeFile) {
      text = editor.getText();
      return editor.setText(formatter(text, sorted));
    } else {
      return text = editor.replaceSelectedText({}, function(text) {
        return formatter(text, sorted);
      });
    }
  };

  formatter = function(text, sorted) {
    var editorSettings, error, parsed, space;
    editorSettings = atom.config.getSettings().editor;
    if (editorSettings.softTabs != null) {
      space = Array(editorSettings.tabLength + 1).join(" ");
    } else {
      space = "\t";
    }
    try {
      parsed = JSON.parse(text);
      if (sorted) {
        return stringify(parsed, {
          space: space
        });
      } else {
        return JSON.stringify(parsed, null, space);
      }
    } catch (_error) {
      error = _error;
      return text;
    }
  };

  module.exports = {
    activate: function() {
      atom.workspaceView.command('pretty-json:prettify', '.editor', function() {
        var editor;
        editor = atom.workspaceView.getActivePaneItem();
        return prettify(editor);
      });
      return atom.workspaceView.command('pretty-json:sort-and-prettify', '.editor', function() {
        var editor;
        editor = atom.workspaceView.getActivePaneItem();
        return prettify(editor, true);
      });
    }
  };

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLDhCQUFBOztBQUFBLEVBQUEsU0FBQSxHQUFZLE9BQUEsQ0FBUSx1QkFBUixDQUFaLENBQUE7O0FBQUEsRUFFQSxRQUFBLEdBQVcsU0FBQyxNQUFELEVBQVMsTUFBVCxHQUFBO0FBQ1QsUUFBQSxlQUFBO0FBQUEsSUFBQSxTQUFBLEdBQVksTUFBTSxDQUFDLFVBQVAsQ0FBQSxDQUFtQixDQUFDLElBQXBCLEtBQTRCLE1BQXhDLENBQUE7QUFFQSxJQUFBLElBQUcsU0FBSDtBQUNFLE1BQUEsSUFBQSxHQUFPLE1BQU0sQ0FBQyxPQUFQLENBQUEsQ0FBUCxDQUFBO2FBQ0EsTUFBTSxDQUFDLE9BQVAsQ0FBZSxTQUFBLENBQVUsSUFBVixFQUFnQixNQUFoQixDQUFmLEVBRkY7S0FBQSxNQUFBO2FBSUUsSUFBQSxHQUFPLE1BQU0sQ0FBQyxtQkFBUCxDQUEyQixFQUEzQixFQUErQixTQUFDLElBQUQsR0FBQTtlQUNwQyxTQUFBLENBQVUsSUFBVixFQUFnQixNQUFoQixFQURvQztNQUFBLENBQS9CLEVBSlQ7S0FIUztFQUFBLENBRlgsQ0FBQTs7QUFBQSxFQWFBLFNBQUEsR0FBWSxTQUFDLElBQUQsRUFBTyxNQUFQLEdBQUE7QUFDVixRQUFBLG9DQUFBO0FBQUEsSUFBQSxjQUFBLEdBQWlCLElBQUksQ0FBQyxNQUFNLENBQUMsV0FBWixDQUFBLENBQXlCLENBQUMsTUFBM0MsQ0FBQTtBQUNBLElBQUEsSUFBRywrQkFBSDtBQUNFLE1BQUEsS0FBQSxHQUFRLEtBQUEsQ0FBTSxjQUFjLENBQUMsU0FBZixHQUEyQixDQUFqQyxDQUFtQyxDQUFDLElBQXBDLENBQXlDLEdBQXpDLENBQVIsQ0FERjtLQUFBLE1BQUE7QUFHRSxNQUFBLEtBQUEsR0FBUSxJQUFSLENBSEY7S0FEQTtBQU1BO0FBQ0UsTUFBQSxNQUFBLEdBQVMsSUFBSSxDQUFDLEtBQUwsQ0FBVyxJQUFYLENBQVQsQ0FBQTtBQUNBLE1BQUEsSUFBRyxNQUFIO0FBQ0UsZUFBTyxTQUFBLENBQVUsTUFBVixFQUFrQjtBQUFBLFVBQUUsS0FBQSxFQUFPLEtBQVQ7U0FBbEIsQ0FBUCxDQURGO09BQUEsTUFBQTtBQUdFLGVBQU8sSUFBSSxDQUFDLFNBQUwsQ0FBZSxNQUFmLEVBQXVCLElBQXZCLEVBQTZCLEtBQTdCLENBQVAsQ0FIRjtPQUZGO0tBQUEsY0FBQTtBQU9FLE1BREksY0FDSixDQUFBO2FBQUEsS0FQRjtLQVBVO0VBQUEsQ0FiWixDQUFBOztBQUFBLEVBNkJBLE1BQU0sQ0FBQyxPQUFQLEdBQ0U7QUFBQSxJQUFBLFFBQUEsRUFBVSxTQUFBLEdBQUE7QUFDUixNQUFBLElBQUksQ0FBQyxhQUFhLENBQUMsT0FBbkIsQ0FBMkIsc0JBQTNCLEVBQW1ELFNBQW5ELEVBQThELFNBQUEsR0FBQTtBQUM1RCxZQUFBLE1BQUE7QUFBQSxRQUFBLE1BQUEsR0FBUyxJQUFJLENBQUMsYUFBYSxDQUFDLGlCQUFuQixDQUFBLENBQVQsQ0FBQTtlQUNBLFFBQUEsQ0FBUyxNQUFULEVBRjREO01BQUEsQ0FBOUQsQ0FBQSxDQUFBO2FBR0EsSUFBSSxDQUFDLGFBQWEsQ0FBQyxPQUFuQixDQUEyQiwrQkFBM0IsRUFBNEQsU0FBNUQsRUFBdUUsU0FBQSxHQUFBO0FBQ3JFLFlBQUEsTUFBQTtBQUFBLFFBQUEsTUFBQSxHQUFTLElBQUksQ0FBQyxhQUFhLENBQUMsaUJBQW5CLENBQUEsQ0FBVCxDQUFBO2VBQ0EsUUFBQSxDQUFTLE1BQVQsRUFBaUIsSUFBakIsRUFGcUU7TUFBQSxDQUF2RSxFQUpRO0lBQUEsQ0FBVjtHQTlCRixDQUFBO0FBQUEiCn0=
//# sourceURL=/Users/hisamatsu/dotfile/.atom/packages/pretty-json/index.coffee