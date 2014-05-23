(function() {
  var $, EditorView, HighlightLineView, View, lines, underlineStyleInUse, underlineStyles, _ref,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  _ref = require('atom'), EditorView = _ref.EditorView, View = _ref.View;

  $ = require('atom').$;

  lines = [];

  underlineStyles = ["solid", "dotted", "dashed"];

  underlineStyleInUse = '';

  module.exports = {
    configDefaults: {
      enableBackgroundColor: true,
      hideHighlightOnSelect: false,
      backgroundRgbColor: "100, 100, 100",
      opacity: "50%",
      enableUnderline: false,
      underline: {
        solid: false,
        dotted: false,
        dashed: false
      },
      underlineRgbColor: "255, 165, 0"
    },
    activate: function() {
      atom.workspaceView.eachEditorView(function(editorView) {
        var line;
        if (editorView.attached && editorView.getPane()) {
          line = new HighlightLineView(editorView);
          lines.push(line);
          return editorView.underlayer.append(line);
        }
      });
      atom.workspaceView.command('highlight-line:toggle-background', '.editor', (function(_this) {
        return function() {
          return _this.toggleHighlight();
        };
      })(this));
      return atom.workspaceView.command('highlight-line:toggle-underline', '.editor', (function(_this) {
        return function() {
          return _this.toggleUnderline();
        };
      })(this));
    },
    deactivate: function() {
      var line, _i, _len;
      for (_i = 0, _len = lines.length; _i < _len; _i++) {
        line = lines[_i];
        line.destroy();
        line = null;
      }
      lines = [];
      atom.workspaceView.off('highlight-line:toggle-background');
      return atom.workspaceView.off('highlight-line:toggle-underline');
    },
    toggleHighlight: function() {
      var current;
      current = atom.config.get('highlight-line.enableBackgroundColor');
      return atom.config.set('highlight-line.enableBackgroundColor', !current);
    },
    toggleUnderline: function() {
      var current;
      current = atom.config.get('highlight-line.enableUnderline');
      return atom.config.set('highlight-line.enableUnderline', !current);
    }
  };

  HighlightLineView = (function(_super) {
    __extends(HighlightLineView, _super);

    function HighlightLineView() {
      this.observeSettings = __bind(this.observeSettings, this);
      this.showHighlight = __bind(this.showHighlight, this);
      this.updateSelectedLine = __bind(this.updateSelectedLine, this);
      this.destroy = __bind(this.destroy, this);
      this.updateUnderlineSetting = __bind(this.updateUnderlineSetting, this);
      return HighlightLineView.__super__.constructor.apply(this, arguments);
    }

    HighlightLineView.content = function() {
      return this.div({
        "class": 'highlight-view hidden'
      });
    };

    HighlightLineView.prototype.initialize = function(editorView) {
      this.editorView = editorView;
      this.defaultColors = {
        backgroundRgbColor: "100, 100, 100",
        underlineColor: "255, 165, 0"
      };
      this.defaultOpacity = 50;
      this.subscribe(this.editorView, 'cursor:moved', this.updateSelectedLine);
      this.subscribe(this.editorView, 'selection:changed', this.updateSelectedLine);
      this.subscribe(this.editorView.getPane(), 'pane:active-item-changed', this.updateSelectedLine);
      atom.workspaceView.on('pane:item-removed', this.destroy);
      this.updateUnderlineStyle();
      this.observeSettings();
      return this.updateSelectedLine();
    };

    HighlightLineView.prototype.updateUnderlineStyle = function() {
      var underlineStyle, _i, _len, _results;
      underlineStyleInUse = '';
      this.marginHeight = 0;
      _results = [];
      for (_i = 0, _len = underlineStyles.length; _i < _len; _i++) {
        underlineStyle = underlineStyles[_i];
        if (atom.config.get("highlight-line.underline." + underlineStyle)) {
          underlineStyleInUse = underlineStyle;
          _results.push(this.marginHeight = -1);
        } else {
          _results.push(void 0);
        }
      }
      return _results;
    };

    HighlightLineView.prototype.updateUnderlineSetting = function(value) {
      if (value) {
        if (underlineStyleInUse) {
          atom.config.set("highlight-line.underline." + underlineStyleInUse, false);
        }
      }
      this.updateUnderlineStyle();
      return this.updateSelectedLine();
    };

    HighlightLineView.prototype.destroy = function() {
      var editor, found, _i, _len, _ref1;
      found = false;
      _ref1 = atom.workspaceView.getEditorViews();
      for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
        editor = _ref1[_i];
        if (editor.id === this.editorView.id) {
          found = true;
        }
      }
      if (found) {
        return;
      }
      atom.workspaceView.off('pane:item-removed', this.destroy);
      this.unsubscribe();
      this.remove();
      return this.detach();
    };

    HighlightLineView.prototype.updateSelectedLine = function() {
      this.resetBackground();
      return this.showHighlight();
    };

    HighlightLineView.prototype.resetBackground = function() {
      return $('.line').css('background-color', '').css('border-bottom', '').css('margin-bottom', '');
    };

    HighlightLineView.prototype.makeLineStyleAttr = function() {
      var bgColor, bgRgba, show, styleAttr, ulColor, ulRgba, _ref1;
      styleAttr = '';
      if (atom.config.get('highlight-line.enableBackgroundColor')) {
        show = true;
        if (atom.config.get('highlight-line.hideHighlightOnSelect')) {
          if (!((_ref1 = atom.workspace.getActiveEditor()) != null ? _ref1.getSelection().isEmpty() : void 0)) {
            show = false;
          }
        }
        if (show) {
          bgColor = this.wantedColor('backgroundRgbColor');
          bgRgba = "rgba(" + bgColor + ", " + (this.wantedOpacity()) + ")";
          styleAttr += "background-color: " + bgRgba + ";";
        }
      }
      if (atom.config.get('highlight-line.enableUnderline') && underlineStyleInUse) {
        ulColor = this.wantedColor('underlineRgbColor');
        ulRgba = "rgba(" + ulColor + ",1)";
        styleAttr += "border-bottom: 1px " + underlineStyleInUse + " " + ulRgba + ";";
        styleAttr += "margin-bottom: " + this.marginHeight + "px;";
      }
      return styleAttr;
    };

    HighlightLineView.prototype.showHighlight = function() {
      var cursorView, cursorViews, lineElement, range, styleAttr, _i, _len, _ref1, _results;
      styleAttr = this.makeLineStyleAttr();
      if (styleAttr) {
        cursorViews = this.editorView.getCursorViews();
        _results = [];
        for (_i = 0, _len = cursorViews.length; _i < _len; _i++) {
          cursorView = cursorViews[_i];
          range = cursorView.getScreenPosition();
          lineElement = this.editorView.lineElementForScreenRow(range.row);
          if ((_ref1 = this.editorView.editor.getSelection()) != null ? _ref1.isSingleScreenLine() : void 0) {
            _results.push($(lineElement).attr('style', styleAttr));
          } else {
            _results.push(void 0);
          }
        }
        return _results;
      }
    };

    HighlightLineView.prototype.wantedColor = function(color) {
      var wantedColor;
      wantedColor = atom.config.get("highlight-line." + color);
      if ((wantedColor != null ? wantedColor.split(',').length : void 0) !== 3) {
        wantedColor = this.defaultColors[color];
      }
      return wantedColor;
    };

    HighlightLineView.prototype.wantedOpacity = function() {
      var wantedOpacity;
      wantedOpacity = atom.config.get('highlight-line.opacity');
      if (wantedOpacity) {
        wantedOpacity = parseFloat(wantedOpacity);
      } else {
        wantedOpacity = this.defaultOpacity;
      }
      return (wantedOpacity / 100).toString();
    };

    HighlightLineView.prototype.observeSettings = function() {
      var underlineStyle, _i, _len;
      for (_i = 0, _len = underlineStyles.length; _i < _len; _i++) {
        underlineStyle = underlineStyles[_i];
        this.subscribe(atom.config.observe("highlight-line.underline." + underlineStyle, {
          callNow: false
        }, this.updateUnderlineSetting));
      }
      this.subscribe(atom.config.observe("highlight-line.enableBackgroundColor", {
        callNow: false
      }, this.updateSelectedLine));
      return this.subscribe(atom.config.observe("highlight-line.enableUnderline", {
        callNow: false
      }, this.updateSelectedLine));
    };

    return HighlightLineView;

  })(View);

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLHlGQUFBO0lBQUE7O21TQUFBOztBQUFBLEVBQUEsT0FBcUIsT0FBQSxDQUFRLE1BQVIsQ0FBckIsRUFBQyxrQkFBQSxVQUFELEVBQWEsWUFBQSxJQUFiLENBQUE7O0FBQUEsRUFDQyxJQUFLLE9BQUEsQ0FBUSxNQUFSLEVBQUwsQ0FERCxDQUFBOztBQUFBLEVBR0EsS0FBQSxHQUFRLEVBSFIsQ0FBQTs7QUFBQSxFQUlBLGVBQUEsR0FBa0IsQ0FBQyxPQUFELEVBQVMsUUFBVCxFQUFrQixRQUFsQixDQUpsQixDQUFBOztBQUFBLEVBS0EsbUJBQUEsR0FBc0IsRUFMdEIsQ0FBQTs7QUFBQSxFQU9BLE1BQU0sQ0FBQyxPQUFQLEdBQ0U7QUFBQSxJQUFBLGNBQUEsRUFDRTtBQUFBLE1BQUEscUJBQUEsRUFBdUIsSUFBdkI7QUFBQSxNQUNBLHFCQUFBLEVBQXVCLEtBRHZCO0FBQUEsTUFFQSxrQkFBQSxFQUFvQixlQUZwQjtBQUFBLE1BR0EsT0FBQSxFQUFTLEtBSFQ7QUFBQSxNQUlBLGVBQUEsRUFBaUIsS0FKakI7QUFBQSxNQUtBLFNBQUEsRUFDRTtBQUFBLFFBQUEsS0FBQSxFQUFPLEtBQVA7QUFBQSxRQUNBLE1BQUEsRUFBUSxLQURSO0FBQUEsUUFFQSxNQUFBLEVBQVEsS0FGUjtPQU5GO0FBQUEsTUFTQSxpQkFBQSxFQUFtQixhQVRuQjtLQURGO0FBQUEsSUFZQSxRQUFBLEVBQVUsU0FBQSxHQUFBO0FBQ1IsTUFBQSxJQUFJLENBQUMsYUFBYSxDQUFDLGNBQW5CLENBQWtDLFNBQUMsVUFBRCxHQUFBO0FBQ2hDLFlBQUEsSUFBQTtBQUFBLFFBQUEsSUFBRyxVQUFVLENBQUMsUUFBWCxJQUF3QixVQUFVLENBQUMsT0FBWCxDQUFBLENBQTNCO0FBQ0UsVUFBQSxJQUFBLEdBQVcsSUFB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
//# sourceURL=/Users/hisamatsu/dotfile/.atom/packages/highlight-line/lib/highlight-line-view.coffee