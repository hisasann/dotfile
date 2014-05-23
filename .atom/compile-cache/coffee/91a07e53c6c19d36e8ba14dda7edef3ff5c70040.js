(function() {
  var BuildMatrixView, BuildStatusView, TravisCi, spawn;

  spawn = require('child_process').spawn;

  BuildMatrixView = require('./build-matrix-view');

  BuildStatusView = require('./build-status-view');

  TravisCi = require('./travis-ci');

  module.exports = {
    buildMatrixView: null,
    buildStatusView: null,
    activate: function() {
      var createStatusEntry;
      if (!this.isGitHubRepo()) {
        return;
      }
      atom.travis = new TravisCi;
      atom.workspaceView.command('travis-ci-status:open-on-travis', (function(_this) {
        return function() {
          return _this.openOnTravis();
        };
      })(this));
      createStatusEntry = (function(_this) {
        return function() {
          var nwo;
          nwo = _this.getNameWithOwner();
          _this.buildMatrixView = new BuildMatrixView(nwo);
          return _this.buildStatusView = new BuildStatusView(nwo, _this.buildMatrixView);
        };
      })(this);
      if (atom.workspaceView.statusBar) {
        return createStatusEntry();
      } else {
        return atom.packages.once('activated', function() {
          return createStatusEntry();
        });
      }
    },
    deactivate: function() {
      var _ref, _ref1;
      atom.travis = null;
      if ((_ref = this.buildStatusView) != null) {
        _ref.destroy();
      }
      return (_ref1 = this.buildMatrixView) != null ? _ref1.destroy() : void 0;
    },
    serialize: function() {},
    isGitHubRepo: function() {
      var repo;
      repo = atom.project.getRepo();
      if (repo == null) {
        return false;
      }
      return /github\.com:/i.test(repo.getOriginUrl());
    },
    getNameWithOwner: function() {
      var repo, url;
      repo = atom.project.getRepo();
      url = repo.getOriginUrl();
      if (url == null) {
        return null;
      }
      return url.replace(/git@github\.com:/i, '').replace(/https:\/\/github\.com\//i, '').replace(/\.git/i, '');
    },
    openOnTravis: function() {
      var nwo, url;
      nwo = this.getNameWithOwner();
      url = "https://travis-ci.org/" + nwo;
      return spawn('open', [url]);
    }
  };

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLGlEQUFBOztBQUFBLEVBQUMsUUFBUyxPQUFBLENBQVEsZUFBUixFQUFULEtBQUQsQ0FBQTs7QUFBQSxFQUVBLGVBQUEsR0FBa0IsT0FBQSxDQUFRLHFCQUFSLENBRmxCLENBQUE7O0FBQUEsRUFHQSxlQUFBLEdBQWtCLE9BQUEsQ0FBUSxxQkFBUixDQUhsQixDQUFBOztBQUFBLEVBSUEsUUFBQSxHQUFXLE9BQUEsQ0FBUSxhQUFSLENBSlgsQ0FBQTs7QUFBQSxFQU1BLE1BQU0sQ0FBQyxPQUFQLEdBRUU7QUFBQSxJQUFBLGVBQUEsRUFBaUIsSUFBakI7QUFBQSxJQUdBLGVBQUEsRUFBaUIsSUFIakI7QUFBQSxJQVFBLFFBQUEsRUFBVSxTQUFBLEdBQUE7QUFDUixVQUFBLGlCQUFBO0FBQUEsTUFBQSxJQUFBLENBQUEsSUFBZSxDQUFBLFlBQUQsQ0FBQSxDQUFkO0FBQUEsY0FBQSxDQUFBO09BQUE7QUFBQSxNQUNBLElBQUksQ0FBQyxNQUFMLEdBQWMsR0FBQSxDQUFBLFFBRGQsQ0FBQTtBQUFBLE1BR0EsSUFBSSxDQUFDLGFBQWEsQ0FBQyxPQUFuQixDQUEyQixpQ0FBM0IsRUFBOEQsQ0FBQSxTQUFBLEtBQUEsR0FBQTtlQUFBLFNBQUEsR0FBQTtpQkFDNUQsS0FBQyxDQUFBLFlBQUQsQ0FBQSxFQUQ0RDtRQUFBLEVBQUE7TUFBQSxDQUFBLENBQUEsQ0FBQSxJQUFBLENBQTlELENBSEEsQ0FBQTtBQUFBLE1BTUEsaUJBQUEsR0FBb0IsQ0FBQSxTQUFBLEtBQUEsR0FBQTtlQUFBLFNBQUEsR0FBQTtBQUNsQixjQUFBLEdBQUE7QUFBQSxVQUFBLEdBQUEsR0FBTSxLQUFDLENBQUEsZ0JBQUQsQ0FBQSxDQUFOLENBQUE7QUFBQSxVQUNBLEtBQUMsQ0FBQSxlQUFELEdBQXVCLElBQUEsZUFBQSxDQUFnQixHQUFoQixDQUR2QixDQUFBO2lCQUVBLEtBQUMsQ0FBQSxlQUFELEdBQXVCLElBQUEsZUFBQSxDQUFnQixHQUFoQixFQUFxQixLQUFDLENBQUEsZUFBdEIsRUFITDtRQUFBLEVBQUE7TUFBQSxDQUFBLENBQUEsQ0FBQSxJQUFBLENBTnBCLENBQUE7QUFXQSxNQUFBLElBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxTQUF0QjtlQUNFLGlCQUFBLENBQUEsRUFERjtPQUFBLE1BQUE7ZUFHRSxJQUFJLENBQUMsUUFBUSxDQUFDLElBQWQsQ0FBbUIsV0FBbkIsRUFBZ0MsU0FBQSxHQUFBO2lCQUM5QixpQkFBQSxDQUFBLEVBRDhCO1FBQUEsQ0FBaEMsRUFIRjtPQVpRO0lBQUEsQ0FSVjtBQUFBLElBNkJBLFVBQUEsRUFBWSxTQUFBLEdBQUE7QUFDVixVQUFBLFdBQUE7QUFBQSxNQUFBLElBQUksQ0FBQyxNQUFMLEdBQWMsSUFBZCxDQUFBOztZQUNnQixDQUFFLE9BQWxCLENBQUE7T0FEQTsyREFFZ0IsQ0FBRSxPQUFsQixDQUFBLFdBSFU7SUFBQSxDQTdCWjtBQUFBLElBcUNBLFNBQUEsRUFBVyxTQUFBLEdBQUEsQ0FyQ1g7QUFBQSxJQTBDQSxZQUFBLEVBQWMsU0FBQSxHQUFBO0FBQ1osVUFBQSxJQUFBO0FBQUEsTUFBQSxJQUFBLEdBQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFiLENBQUEsQ0FBUCxDQUFBO0FBQ0EsTUFBQSxJQUFvQixZQUFwQjtBQUFBLGVBQU8sS0FBUCxDQUFBO09BREE7YUFFQSxlQUFlLENBQUMsSUFBaEIsQ0FBcUIsSUFBSSxDQUFDLFlBQUwsQ0FBQSxDQUFyQixFQUhZO0lBQUEsQ0ExQ2Q7QUFBQSxJQW1EQSxnQkFBQSxFQUFrQixTQUFBLEdBQUE7QUFDaEIsVUFBQSxTQUFBO0FBQUEsTUFBQSxJQUFBLEdBQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFiLENBQUEsQ0FBUCxDQUFBO0FBQUEsTUFDQSxHQUFBLEdBQU8sSUFBSSxDQUFDLFlBQUwsQ0FBQSxDQURQLENBQUE7QUFFQSxNQUFBLElBQW1CLFdBQW5CO0FBQUEsZUFBTyxJQUFQLENBQUE7T0FGQTthQUdBLEdBQUcsQ0FBQyxPQUFKLENBQVksbUJBQVosRUFBaUMsRUFBakMsQ0FDRSxDQUFDLE9BREgsQ0FDVywwQkFEWCxFQUN1QyxFQUR2QyxDQUVFLENBQUMsT0FGSCxDQUVXLFFBRlgsRUFFcUIsRUFGckIsRUFKZ0I7SUFBQSxDQW5EbEI7QUFBQSxJQThEQSxZQUFBLEVBQWMsU0FBQSxHQUFBO0FBQ1osVUFBQSxRQUFBO0FBQUEsTUFBQSxHQUFBLEdBQU0sSUFBQyxDQUFBLGdCQUFELENBQUEsQ0FBTixDQUFBO0FBQUEsTUFDQSxHQUFBLEdBQU8sd0JBQUEsR0FBdUIsR0FEOUIsQ0FBQTthQUVBLEtBQUEsQ0FBTSxNQUFOLEVBQWMsQ0FBQyxHQUFELENBQWQsRUFIWTtJQUFBLENBOURkO0dBUkYsQ0FBQTtBQUFBIgp9
//# sourceURL=/Users/hisamatsu/dotfile/.atom/packages/travis-ci-status/lib/travis-ci-status.coffee