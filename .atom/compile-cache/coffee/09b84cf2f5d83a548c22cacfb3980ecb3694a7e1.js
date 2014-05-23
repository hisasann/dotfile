(function() {
  var $, CommandLoggerView, commandLoggerUri;

  $ = require('atom').$;

  CommandLoggerView = null;

  commandLoggerUri = 'atom://command-logger';

  module.exports = {
    activate: function(_arg) {
      var registerTriggeredEvent, trigger;
      this.eventLog = (_arg != null ? _arg : {}).eventLog;
      if (this.eventLog == null) {
        this.eventLog = {};
      }
      atom.workspaceView.command('command-logger:clear-data', (function(_this) {
        return function() {
          return _this.eventLog = {};
        };
      })(this));
      atom.project.registerOpener((function(_this) {
        return function(filePath) {
          if (filePath === commandLoggerUri) {
            return _this.createView();
          }
        };
      })(this));
      atom.workspaceView.command('command-logger:open', function() {
        return atom.workspaceView.open(commandLoggerUri);
      });
      registerTriggeredEvent = (function(_this) {
        return function(eventName) {
          var eventNameLog;
          eventNameLog = _this.eventLog[eventName];
          if (!eventNameLog) {
            eventNameLog = {
              count: 0,
              name: eventName
            };
            _this.eventLog[eventName] = eventNameLog;
          }
          eventNameLog.count++;
          return eventNameLog.lastRun = Date.now();
        };
      })(this);
      trigger = $.fn.trigger;
      this.originalTrigger = trigger;
      return $.fn.trigger = function(event) {
        var eventName, _ref;
        eventName = (_ref = event.type) != null ? _ref : event;
        if ($(this).events()[eventName]) {
          registerTriggeredEvent(eventName);
        }
        return trigger.apply(this, arguments);
      };
    },
    deactivate: function() {
      if (this.originalTrigger != null) {
        $.fn.trigger = this.originalTrigger;
      }
      return this.eventLog = {};
    },
    serialize: function() {
      return {
        eventLog: this.eventLog
      };
    },
    createView: function() {
      if (CommandLoggerView == null) {
        CommandLoggerView = require('./command-logger-view');
      }
      return new CommandLoggerView({
        uri: commandLoggerUri,
        eventLog: this.eventLog
      });
    }
  };

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLHNDQUFBOztBQUFBLEVBQUMsSUFBSyxPQUFBLENBQVEsTUFBUixFQUFMLENBQUQsQ0FBQTs7QUFBQSxFQUNBLGlCQUFBLEdBQW9CLElBRHBCLENBQUE7O0FBQUEsRUFHQSxnQkFBQSxHQUFtQix1QkFIbkIsQ0FBQTs7QUFBQSxFQUtBLE1BQU0sQ0FBQyxPQUFQLEdBQ0U7QUFBQSxJQUFBLFFBQUEsRUFBVSxTQUFDLElBQUQsR0FBQTtBQUNSLFVBQUEsK0JBQUE7QUFBQSxNQURVLElBQUMsQ0FBQSwyQkFBRixPQUFZLElBQVYsUUFDWCxDQUFBOztRQUFBLElBQUMsQ0FBQSxXQUFZO09BQWI7QUFBQSxNQUNBLElBQUksQ0FBQyxhQUFhLENBQUMsT0FBbkIsQ0FBMkIsMkJBQTNCLEVBQXdELENBQUEsU0FBQSxLQUFBLEdBQUE7ZUFBQSxTQUFBLEdBQUE7aUJBQUcsS0FBQyxDQUFBLFFBQUQsR0FBWSxHQUFmO1FBQUEsRUFBQTtNQUFBLENBQUEsQ0FBQSxDQUFBLElBQUEsQ0FBeEQsQ0FEQSxDQUFBO0FBQUEsTUFHQSxJQUFJLENBQUMsT0FBTyxDQUFDLGNBQWIsQ0FBNEIsQ0FBQSxTQUFBLEtBQUEsR0FBQTtlQUFBLFNBQUMsUUFBRCxHQUFBO0FBQzFCLFVBQUEsSUFBaUIsUUFBQSxLQUFZLGdCQUE3QjttQkFBQSxLQUFDLENBQUEsVUFBRCxDQUFBLEVBQUE7V0FEMEI7UUFBQSxFQUFBO01BQUEsQ0FBQSxDQUFBLENBQUEsSUFBQSxDQUE1QixDQUhBLENBQUE7QUFBQSxNQU1BLElBQUksQ0FBQyxhQUFhLENBQUMsT0FBbkIsQ0FBMkIscUJBQTNCLEVBQWtELFNBQUEsR0FBQTtlQUNoRCxJQUFJLENBQUMsYUFBYSxDQUFDLElBQW5CLENBQXdCLGdCQUF4QixFQURnRDtNQUFBLENBQWxELENBTkEsQ0FBQTtBQUFBLE1BU0Esc0JBQUEsR0FBeUIsQ0FBQSxTQUFBLEtBQUEsR0FBQTtlQUFBLFNBQUMsU0FBRCxHQUFBO0FBQ3ZCLGNBQUEsWUFBQTtBQUFBLFVBQUEsWUFBQSxHQUFlLEtBQUMsQ0FBQSxRQUFTLENBQUEsU0FBQSxDQUF6QixDQUFBO0FBQ0EsVUFBQSxJQUFBLENBQUEsWUFBQTtBQUNFLFlBQUEsWUFBQSxHQUNFO0FBQUEsY0FBQSxLQUFBLEVBQU8sQ0FBUDtBQUFBLGNBQ0EsSUFBQSxFQUFNLFNBRE47YUFERixDQUFBO0FBQUEsWUFHQSxLQUFDLENBQUEsUUFBUyxDQUFBLFNBQUEsQ0FBVixHQUF1QixZQUh2QixDQURGO1dBREE7QUFBQSxVQU1BLFlBQVksQ0FBQyxLQUFiLEVBTkEsQ0FBQTtpQkFPQSxZQUFZLENBQUMsT0FBYixHQUF1QixJQUFJLENBQUMsR0FBTCxDQUFBLEVBUkE7UUFBQSxFQUFBO01BQUEsQ0FBQSxDQUFBLENBQUEsSUFBQSxDQVR6QixDQUFBO0FBQUEsTUFrQkEsT0FBQSxHQUFVLENBQUMsQ0FBQyxFQUFFLENBQUMsT0FsQmYsQ0FBQTtBQUFBLE1BbUJBLElBQUMsQ0FBQSxlQUFELEdBQW1CLE9BbkJuQixDQUFBO2FBb0JBLENBQUMsQ0FBQyxFQUFFLENBQUMsT0FBTCxHQUFlLFNBQUMsS0FBRCxHQUFBO0FBQ2IsWUFBQSxlQUFBO0FBQUEsUUFBQSxTQUFBLHdDQUF5QixLQUF6QixDQUFBO0FBQ0EsUUFBQSxJQUFxQyxDQUFBLENBQUUsSUFBRixDQUFPLENBQUMsTUFBUixDQUFBLENBQWlCLENBQUEsU0FBQSxDQUF0RDtBQUFBLFVBQUEsc0JBQUEsQ0FBdUIsU0FBdkIsQ0FBQSxDQUFBO1NBREE7ZUFFQSxPQUFPLENBQUMsS0FBUixDQUFjLElBQWQsRUFBb0IsU0FBcEIsRUFIYTtNQUFBLEVBckJQO0lBQUEsQ0FBVjtBQUFBLElBMEJBLFVBQUEsRUFBWSxTQUFBLEdBQUE7QUFDVixNQUFBLElBQW1DLDRCQUFuQztBQUFBLFFBQUEsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxPQUFMLEdBQWUsSUFBQyxDQUFBLGVBQWhCLENBQUE7T0FBQTthQUNBLElBQUMsQ0FBQSxRQUFELEdBQVksR0FGRjtJQUFBLENBMUJaO0FBQUEsSUE4QkEsU0FBQSxFQUFXLFNBQUEsR0FBQTthQUNUO0FBQUEsUUFBRSxVQUFELElBQUMsQ0FBQSxRQUFGO1FBRFM7SUFBQSxDQTlCWDtBQUFBLElBaUNBLFVBQUEsRUFBWSxTQUFBLEdBQUE7O1FBQ1Ysb0JBQXFCLE9BQUEsQ0FBUSx1QkFBUjtPQUFyQjthQUNJLElBQUEsaUJBQUEsQ0FBa0I7QUFBQSxRQUFDLEdBQUEsRUFBSyxnQkFBTjtBQUFBLFFBQXlCLFVBQUQsSUFBQyxDQUFBLFFBQXpCO09BQWxCLEVBRk07SUFBQSxDQWpDWjtHQU5GLENBQUE7QUFBQSIKfQ==
//# sourceURL=/Users/hisamatsu/dotfile/.atom/packages/command-logger/lib/command-logger.coffee