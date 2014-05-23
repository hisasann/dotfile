(function() {
  var TravisCI, https;

  https = require('https');

  module.exports = TravisCI = (function() {
    function TravisCI() {}

    TravisCI.prototype.repo = function(nwo, callback) {
      return this.request('GET', "/repos/" + nwo, callback);
    };

    TravisCI.prototype.build = function(nwo, id, callback) {
      return this.request('GET', "/repos/" + nwo + "/builds/" + id, callback);
    };

    TravisCI.prototype.request = function(method, path, callback) {
      var options, req;
      options = {
        'hostname': 'api.travis-ci.org',
        'port': 443,
        'path': path,
        'method': method.toUpperCase(),
        'headers': {
          'Content-Type': 'application/json'
        }
      };
      req = https.request(options, function(res) {
        var data;
        data = '';
        res.on('data', function(chunk) {
          return data += chunk;
        });
        return res.on('end', function() {
          var json;
          json = JSON.parse(data);
          return callback(null, json);
        });
      });
      req.on('error', function(err) {
        return callback(err, null);
      });
      return req.end();
    };

    return TravisCI;

  })();

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLGVBQUE7O0FBQUEsRUFBQSxLQUFBLEdBQVEsT0FBQSxDQUFRLE9BQVIsQ0FBUixDQUFBOztBQUFBLEVBRUEsTUFBTSxDQUFDLE9BQVAsR0FFTTswQkFZSjs7QUFBQSx1QkFBQSxJQUFBLEdBQU0sU0FBQyxHQUFELEVBQU0sUUFBTixHQUFBO2FBQ0osSUFBQyxDQUFBLE9BQUQsQ0FBUyxLQUFULEVBQWlCLFNBQUEsR0FBUSxHQUF6QixFQUFpQyxRQUFqQyxFQURJO0lBQUEsQ0FBTixDQUFBOztBQUFBLHVCQWVBLEtBQUEsR0FBTyxTQUFDLEdBQUQsRUFBTSxFQUFOLEVBQVUsUUFBVixHQUFBO2FBQ0wsSUFBQyxDQUFBLE9BQUQsQ0FBUyxLQUFULEVBQWlCLFNBQUEsR0FBUSxHQUFSLEdBQWEsVUFBYixHQUFzQixFQUF2QyxFQUE4QyxRQUE5QyxFQURLO0lBQUEsQ0FmUCxDQUFBOztBQUFBLHVCQStCQSxPQUFBLEdBQVMsU0FBQyxNQUFELEVBQVMsSUFBVCxFQUFlLFFBQWYsR0FBQTtBQUNQLFVBQUEsWUFBQTtBQUFBLE1BQUEsT0FBQSxHQUNFO0FBQUEsUUFBQSxVQUFBLEVBQVksbUJBQVo7QUFBQSxRQUNBLE1BQUEsRUFBUSxHQURSO0FBQUEsUUFFQSxNQUFBLEVBQVEsSUFGUjtBQUFBLFFBR0EsUUFBQSxFQUFVLE1BQU0sQ0FBQyxXQUFQLENBQUEsQ0FIVjtBQUFBLFFBSUEsU0FBQSxFQUNFO0FBQUEsVUFBQSxjQUFBLEVBQWdCLGtCQUFoQjtTQUxGO09BREYsQ0FBQTtBQUFBLE1BUUEsR0FBQSxHQUFNLEtBQUssQ0FBQyxPQUFOLENBQWMsT0FBZCxFQUF1QixTQUFDLEdBQUQsR0FBQTtBQUMzQixZQUFBLElBQUE7QUFBQSxRQUFBLElBQUEsR0FBTyxFQUFQLENBQUE7QUFBQSxRQUNBLEdBQUcsQ0FBQyxFQUFKLENBQU8sTUFBUCxFQUFlLFNBQUMsS0FBRCxHQUFBO2lCQUNiLElBQUEsSUFBUSxNQURLO1FBQUEsQ0FBZixDQURBLENBQUE7ZUFJQSxHQUFHLENBQUMsRUFBSixDQUFPLEtBQVAsRUFBYyxTQUFBLEdBQUE7QUFDWixjQUFBLElBQUE7QUFBQSxVQUFBLElBQUEsR0FBTyxJQUFJLENBQUMsS0FBTCxDQUFXLElBQVgsQ0FBUCxDQUFBO2lCQUNBLFFBQUEsQ0FBUyxJQUFULEVBQWUsSUFBZixFQUZZO1FBQUEsQ0FBZCxFQUwyQjtNQUFBLENBQXZCLENBUk4sQ0FBQTtBQUFBLE1BaUJBLEdBQUcsQ0FBQyxFQUFKLENBQU8sT0FBUCxFQUFnQixTQUFDLEdBQUQsR0FBQTtlQUNkLFFBQUEsQ0FBUyxHQUFULEVBQWMsSUFBZCxFQURjO01BQUEsQ0FBaEIsQ0FqQkEsQ0FBQTthQW9CQSxHQUFHLENBQUMsR0FBSixDQUFBLEVBckJPO0lBQUEsQ0EvQlQsQ0FBQTs7b0JBQUE7O01BaEJGLENBQUE7QUFBQSIKfQ==
//# sourceURL=/Users/hisamatsu/dotfile/.atom/packages/travis-ci-status/lib/travis-ci.coffee