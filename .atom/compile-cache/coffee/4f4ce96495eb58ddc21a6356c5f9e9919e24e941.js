(function() {
  var StatsTracker;

  StatsTracker = require('./stats-tracker');

  module.exports = {
    activate: function() {
      this.stats = new StatsTracker();
      return atom.workspaceView.command('editor-stats:toggle', (function(_this) {
        return function() {
          return _this.createView().toggle(_this.stats);
        };
      })(this));
    },
    deactivate: function() {
      this.editorStatsView = null;
      return this.stats = null;
    },
    createView: function() {
      var EditorStatsView;
      if (!this.editorStatsView) {
        EditorStatsView = require('./editor-stats-view');
        this.editorStatsView = new EditorStatsView();
      }
      return this.editorStatsView;
    }
  };

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLFlBQUE7O0FBQUEsRUFBQSxZQUFBLEdBQWUsT0FBQSxDQUFRLGlCQUFSLENBQWYsQ0FBQTs7QUFBQSxFQUVBLE1BQU0sQ0FBQyxPQUFQLEdBQ0U7QUFBQSxJQUFBLFFBQUEsRUFBVSxTQUFBLEdBQUE7QUFDUixNQUFBLElBQUMsQ0FBQSxLQUFELEdBQWEsSUFBQSxZQUFBLENBQUEsQ0FBYixDQUFBO2FBQ0EsSUFBSSxDQUFDLGFBQWEsQ0FBQyxPQUFuQixDQUEyQixxQkFBM0IsRUFBa0QsQ0FBQSxTQUFBLEtBQUEsR0FBQTtlQUFBLFNBQUEsR0FBQTtpQkFDaEQsS0FBQyxDQUFBLFVBQUQsQ0FBQSxDQUFhLENBQUMsTUFBZCxDQUFxQixLQUFDLENBQUEsS0FBdEIsRUFEZ0Q7UUFBQSxFQUFBO01BQUEsQ0FBQSxDQUFBLENBQUEsSUFBQSxDQUFsRCxFQUZRO0lBQUEsQ0FBVjtBQUFBLElBS0EsVUFBQSxFQUFZLFNBQUEsR0FBQTtBQUNWLE1BQUEsSUFBQyxDQUFBLGVBQUQsR0FBbUIsSUFBbkIsQ0FBQTthQUNBLElBQUMsQ0FBQSxLQUFELEdBQVMsS0FGQztJQUFBLENBTFo7QUFBQSxJQVNBLFVBQUEsRUFBWSxTQUFBLEdBQUE7QUFDVixVQUFBLGVBQUE7QUFBQSxNQUFBLElBQUEsQ0FBQSxJQUFRLENBQUEsZUFBUjtBQUNFLFFBQUEsZUFBQSxHQUFtQixPQUFBLENBQVEscUJBQVIsQ0FBbkIsQ0FBQTtBQUFBLFFBQ0EsSUFBQyxDQUFBLGVBQUQsR0FBdUIsSUFBQSxlQUFBLENBQUEsQ0FEdkIsQ0FERjtPQUFBO2FBR0EsSUFBQyxDQUFBLGdCQUpTO0lBQUEsQ0FUWjtHQUhGLENBQUE7QUFBQSIKfQ==
//# sourceURL=/Users/hisamatsu/dotfile/.atom/packages/editor-stats/lib/editor-stats.coffee