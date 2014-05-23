(function() {
  module.exports = {

    /*
     * Returns a unique version of the array using ES6's Set
     * implementation
     *
     * Damn, that shit is _fast_:
     * http://jsperf.com/array-unique2/15
     *
     * @param  {Array} arr
     * @return {Array}
     */
    unique: function(arr) {
      var i, item, out, seen;
      out = [];
      seen = new Set;
      i = arr.length;
      while (i--) {
        item = arr[i];
        if (!seen.has(item)) {
          out.push(item);
          seen.add(item);
        }
      }
      return out;
    }
  };

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxFQUFBLE1BQU0sQ0FBQyxPQUFQLEdBRUU7QUFBQTtBQUFBOzs7Ozs7Ozs7T0FBQTtBQUFBLElBVUEsTUFBQSxFQUFRLFNBQUMsR0FBRCxHQUFBO0FBQ04sVUFBQSxrQkFBQTtBQUFBLE1BQUEsR0FBQSxHQUFNLEVBQU4sQ0FBQTtBQUFBLE1BQ0EsSUFBQSxHQUFPLEdBQUEsQ0FBQSxHQURQLENBQUE7QUFBQSxNQUdBLENBQUEsR0FBSSxHQUFHLENBQUMsTUFIUixDQUFBO0FBSUEsYUFBTSxDQUFBLEVBQU4sR0FBQTtBQUNFLFFBQUEsSUFBQSxHQUFPLEdBQUksQ0FBQSxDQUFBLENBQVgsQ0FBQTtBQUNBLFFBQUEsSUFBQSxDQUFBLElBQVcsQ0FBQyxHQUFMLENBQVMsSUFBVCxDQUFQO0FBQ0UsVUFBQSxHQUFHLENBQUMsSUFBSixDQUFTLElBQVQsQ0FBQSxDQUFBO0FBQUEsVUFDQSxJQUFJLENBQUMsR0FBTCxDQUFTLElBQVQsQ0FEQSxDQURGO1NBRkY7TUFBQSxDQUpBO0FBVUEsYUFBTyxHQUFQLENBWE07SUFBQSxDQVZSO0dBRkYsQ0FBQTtBQUFBIgp9
//# sourceURL=/Users/hisamatsu/dotfile/.atom/packages/autocomplete-plus/lib/utils.coffee