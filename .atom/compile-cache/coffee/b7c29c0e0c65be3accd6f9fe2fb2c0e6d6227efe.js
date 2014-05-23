(function() {
  var $, $$, _ref;

  _ref = require('atom'), $ = _ref.$, $$ = _ref.$$;

  module.exports = {
    configDefaults: {
      enabled: true
    },
    activate: function() {
      return atom.workspaceView.on('beep', (function(_this) {
        return function() {
          if (!atom.config.get('visual-bell.enabled')) {
            return;
          }
          _this.addOverlay();
          return setTimeout((function() {
            return _this.removeOverlay();
          }), 300);
        };
      })(this));
    },
    deactivate: function() {
      return this.removeOverlay();
    },
    addOverlay: function() {
      if (this.overlay) {
        this.removeOverlay();
      }
      this.overlay = $$(function() {
        return this.div({
          "class": 'visual-bell'
        });
      });
      return $('body').append(this.overlay);
    },
    removeOverlay: function() {
      var _ref1;
      if ((_ref1 = this.overlay) != null) {
        _ref1.remove();
      }
      return this.overlay = null;
    }
  };

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLFdBQUE7O0FBQUEsRUFBQSxPQUFVLE9BQUEsQ0FBUSxNQUFSLENBQVYsRUFBQyxTQUFBLENBQUQsRUFBSSxVQUFBLEVBQUosQ0FBQTs7QUFBQSxFQUVBLE1BQU0sQ0FBQyxPQUFQLEdBQ0U7QUFBQSxJQUFBLGNBQUEsRUFDRTtBQUFBLE1BQUEsT0FBQSxFQUFTLElBQVQ7S0FERjtBQUFBLElBR0EsUUFBQSxFQUFVLFNBQUEsR0FBQTthQUNSLElBQUksQ0FBQyxhQUFhLENBQUMsRUFBbkIsQ0FBc0IsTUFBdEIsRUFBOEIsQ0FBQSxTQUFBLEtBQUEsR0FBQTtlQUFBLFNBQUEsR0FBQTtBQUM1QixVQUFBLElBQUEsQ0FBQSxJQUFrQixDQUFDLE1BQU0sQ0FBQyxHQUFaLENBQWdCLHFCQUFoQixDQUFkO0FBQUEsa0JBQUEsQ0FBQTtXQUFBO0FBQUEsVUFDQSxLQUFDLENBQUEsVUFBRCxDQUFBLENBREEsQ0FBQTtpQkFFQSxVQUFBLENBQVcsQ0FBQyxTQUFBLEdBQUE7bUJBQUcsS0FBQyxDQUFBLGFBQUQsQ0FBQSxFQUFIO1VBQUEsQ0FBRCxDQUFYLEVBQWtDLEdBQWxDLEVBSDRCO1FBQUEsRUFBQTtNQUFBLENBQUEsQ0FBQSxDQUFBLElBQUEsQ0FBOUIsRUFEUTtJQUFBLENBSFY7QUFBQSxJQVNBLFVBQUEsRUFBWSxTQUFBLEdBQUE7YUFDVixJQUFDLENBQUEsYUFBRCxDQUFBLEVBRFU7SUFBQSxDQVRaO0FBQUEsSUFZQSxVQUFBLEVBQVksU0FBQSxHQUFBO0FBQ1YsTUFBQSxJQUFvQixJQUFDLENBQUEsT0FBckI7QUFBQSxRQUFBLElBQUMsQ0FBQSxhQUFELENBQUEsQ0FBQSxDQUFBO09BQUE7QUFBQSxNQUNBLElBQUMsQ0FBQSxPQUFELEdBQVcsRUFBQSxDQUFHLFNBQUEsR0FBQTtlQUFHLElBQUMsQ0FBQSxHQUFELENBQUs7QUFBQSxVQUFBLE9BQUEsRUFBTyxhQUFQO1NBQUwsRUFBSDtNQUFBLENBQUgsQ0FEWCxDQUFBO2FBRUEsQ0FBQSxDQUFFLE1BQUYsQ0FBUyxDQUFDLE1BQVYsQ0FBaUIsSUFBQyxDQUFBLE9BQWxCLEVBSFU7SUFBQSxDQVpaO0FBQUEsSUFpQkEsYUFBQSxFQUFlLFNBQUEsR0FBQTtBQUNiLFVBQUEsS0FBQTs7YUFBUSxDQUFFLE1BQVYsQ0FBQTtPQUFBO2FBQ0EsSUFBQyxDQUFBLE9BQUQsR0FBVyxLQUZFO0lBQUEsQ0FqQmY7R0FIRixDQUFBO0FBQUEiCn0=
//# sourceURL=/Users/hisamatsu/dotfile/.atom/packages/visual-bell/lib/visual-bell.coffee