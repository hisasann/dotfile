(function() {
  var COLOR_REGEXES, ConditionalContextMenu;

  ConditionalContextMenu = require('./conditional-contextmenu');

  COLOR_REGEXES = [
    {
      type: 'hexa',
      regex: /(rgba\(((\#[a-f0-9]{6}|\#[a-f0-9]{3}))\s*,\s*(0|1|0*\.\d+)\))/ig
    }, {
      type: 'rgba',
      regex: /(rgba\(((([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])\s*,\s*([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])\s*,\s*([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])))\s*,\s*(0|1|0*\.\d+)\))/ig
    }, {
      type: 'rgb',
      regex: /(rgb\(([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])\s*,\s*([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])\s*,\s*([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])\))/ig
    }, {
      type: 'hex',
      regex: /(\#[a-f0-9]{6}|\#[a-f0-9]{3})/ig
    }
  ];

  module.exports = {
    view: null,
    color: null,
    activate: function() {
      var ColorPickerView;
      atom.workspaceView.command("color-picker:open", (function(_this) {
        return function() {
          return _this.open();
        };
      })(this));
      ConditionalContextMenu.item({
        label: 'Color picker',
        command: 'color-picker:open'
      }, (function(_this) {
        return function() {
          if (_this.color = _this.getColorAtCursor()) {
            return true;
          }
        };
      })(this));
      ColorPickerView = require('./ColorPicker-view');
      return this.view = new ColorPickerView;
    },
    deactivate: function() {
      return this.view.destroy();
    },
    getColorAtCursor: function() {
      var color, colorRegex, regex, type, _color, _colors, _cursorBuffer, _cursorColumn, _cursorRow, _editor, _i, _index, _j, _len, _len1, _line, _matches;
      _editor = atom.workspace.getActiveEditor();
      if (!_editor) {
        return;
      }
      _line = _editor.getCursor().getCurrentBufferLine();
      _cursorBuffer = _editor.getCursorBufferPosition();
      _cursorRow = _cursorBuffer.row;
      _cursorColumn = _cursorBuffer.column;
      _matches = [];
      for (_i = 0, _len = COLOR_REGEXES.length; _i < _len; _i++) {
        colorRegex = COLOR_REGEXES[_i];
        type = colorRegex.type;
        regex = colorRegex.regex;
        if (!(_colors = _line.match(regex))) {
          continue;
        }
        for (_j = 0, _len1 = _colors.length; _j < _len1; _j++) {
          color = _colors[_j];
          if ((_index = _line.indexOf(color)) === -1) {
            continue;
          }
          _matches.push({
            color: color,
            type: type,
            index: _index,
            end: _index + color.length,
            row: _cursorRow
          });
          _line = _line.replace(color, (new Array(color.length + 1)).join(' '));
        }
      }
      if (!(_matches.length > 0)) {
        return;
      }
      _color = (function() {
        var _k, _len2;
        for (_k = 0, _len2 = _matches.length; _k < _len2; _k++) {
          color = _matches[_k];
          if (color.index <= _cursorColumn && color.end >= _cursorColumn) {
            return color;
          }
        }
      })();
      return _color;
    },
    open: function() {
      if (!this.color) {
        return;
      }
      this.view.open();
      this.view.storage.selectedColor = this.color;
      this.view.inputColor(this.color);
      return this.view.selectColor();
    }
  };

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBSVE7QUFBQSxNQUFBLHFDQUFBOztBQUFBLEVBQUEsc0JBQUEsR0FBeUIsT0FBQSxDQUFRLDJCQUFSLENBQXpCLENBQUE7O0FBQUEsRUFLQSxhQUFBLEdBQWdCO0lBR1o7QUFBQSxNQUFFLElBQUEsRUFBTSxNQUFSO0FBQUEsTUFBZ0IsS0FBQSxFQUFPLGlFQUF2QjtLQUhZLEVBT1o7QUFBQSxNQUFFLElBQUEsRUFBTSxNQUFSO0FBQUEsTUFBZ0IsS0FBQSxFQUFPLDBNQUF2QjtLQVBZLEVBV1o7QUFBQSxNQUFFLElBQUEsRUFBTSxLQUFSO0FBQUEsTUFBZSxLQUFBLEVBQU8saUxBQXRCO0tBWFksRUFlWjtBQUFBLE1BQUUsSUFBQSxFQUFNLEtBQVI7QUFBQSxNQUFlLEtBQUEsRUFBTyxpQ0FBdEI7S0FmWTtHQUxoQixDQUFBOztBQUFBLEVBMEJBLE1BQU0sQ0FBQyxPQUFQLEdBQ0k7QUFBQSxJQUFBLElBQUEsRUFBTSxJQUFOO0FBQUEsSUFDQSxLQUFBLEVBQU8sSUFEUDtBQUFBLElBR0EsUUFBQSxFQUFVLFNBQUEsR0FBQTtBQUNOLFVBQUEsZUFBQTtBQUFBLE1BQUEsSUFBSSxDQUFDLGFBQWEsQ0FBQyxPQUFuQixDQUEyQixtQkFBM0IsRUFBZ0QsQ0FBQSxTQUFBLEtBQUEsR0FBQTtlQUFBLFNBQUEsR0FBQTtpQkFBRyxLQUFDLENBQUEsSUFBRCxDQUFBLEVBQUg7UUFBQSxFQUFBO01BQUEsQ0FBQSxDQUFBLENBQUEsSUFBQSxDQUFoRCxDQUFBLENBQUE7QUFBQSxNQUVBLHNCQUFzQixDQUFDLElBQXZCLENBQTRCO0FBQUEsUUFDeEIsS0FBQSxFQUFPLGNBRGlCO0FBQUEsUUFFeEIsT0FBQSxFQUFTLG1CQUZlO09BQTVCLEVBR0csQ0FBQSxTQUFBLEtBQUEsR0FBQTtlQUFBLFNBQUEsR0FBQTtBQUFH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
//# sourceURL=/Users/hisamatsu/dotfile/.atom/packages/color-picker/lib/ColorPicker.coffee