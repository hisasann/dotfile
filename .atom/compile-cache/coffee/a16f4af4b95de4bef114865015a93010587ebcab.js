(function() {
  var $, $$, Keys, SimpleSelectListView, View, _, _ref,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  _ref = require("atom"), $ = _ref.$, $$ = _ref.$$, View = _ref.View;

  _ = require("underscore-plus");

  Keys = {
    Escape: 27,
    Enter: 13,
    Tab: 9
  };

  SimpleSelectListView = (function(_super) {
    __extends(SimpleSelectListView, _super);

    function SimpleSelectListView() {
      return SimpleSelectListView.__super__.constructor.apply(this, arguments);
    }

    SimpleSelectListView.prototype.maxItems = 10;

    SimpleSelectListView.content = function() {
      return this.div({
        "class": "select-list popover-list"
      }, (function(_this) {
        return function() {
          _this.input({
            "class": "hidden-input",
            outlet: "hiddenInput"
          });
          return _this.ol({
            "class": "list-group",
            outlet: "list"
          });
        };
      })(this));
    };


    /*
     * Listens to events, delegates them to instance methods
     * @private
     */

    SimpleSelectListView.prototype.initialize = function() {
      this.on("core:move-up", (function(_this) {
        return function(e) {
          return _this.selectPreviousItemView();
        };
      })(this));
      this.on("core:move-down", (function(_this) {
        return function() {
          return _this.selectNextItemView();
        };
      })(this));
      this.on("core:cancel", (function(_this) {
        return function() {
          return _this.cancel();
        };
      })(this));
      this.on("autocomplete-plus:confirm", (function(_this) {
        return function() {
          return _this.confirmSelection();
        };
      })(this));
      this.list.on("mousedown", "li", (function(_this) {
        return function(e) {
          e.preventDefault();
          e.stopPropagation();
          return _this.selectItemView($(e.target).closest("li"));
        };
      })(this));
      return this.list.on("mouseup", "li", (function(_this) {
        return function(e) {
          e.preventDefault();
          e.stopPropagation();
          if ($(e.target).closest("li").hasClass("selected")) {
            return _this.confirmSelection();
          }
        };
      })(this));
    };


    /*
     * Selects the previous item view
     * @private
     */

    SimpleSelectListView.prototype.selectPreviousItemView = function() {
      var view;
      view = this.getSelectedItemView().prev();
      if (!view.length) {
        view = this.list.find("li:last");
      }
      this.selectItemView(view);
      return false;
    };


    /*
     * Selects the next item view
     * @private
     */

    SimpleSelectListView.prototype.selectNextItemView = function() {
      var view;
      view = this.getSelectedItemView().next();
      if (!view.length) {
        view = this.list.find("li:first");
      }
      this.selectItemView(view);
      return false;
    };


    /*
     * Sets the items, displays the list
     * @param {Array} items
     * @private
     */

    SimpleSelectListView.prototype.setItems = function(items) {
      if (items == null) {
        items = [];
      }
      this.items = items;
      return this.populateList();
    };


    /*
     * Unselects all views, selects the given view
     * @param  {jQuery} view
     * @private
     */

    SimpleSelectListView.prototype.selectItemView = function(view) {
      if (!view.length) {
        return;
      }
      this.list.find(".selected").removeClass("selected");
      view.addClass("selected");
      return this.scrollToItemView(view);
    };


    /*
     * Sets the scroll position to match the given view's position
     * @param  {jQuery} view
     * @private
     */

    SimpleSelectListView.prototype.scrollToItemView = function(view) {
      var desiredBottom, desiredTop, scrollTop;
      scrollTop = this.list.scrollTop();
      desiredTop = view.position().top + scrollTop;
      desiredBottom = desiredTop + view.outerHeight();
      if (desiredTop < scrollTop) {
        return this.list.scrollTop(desiredTop);
      } else {
        return this.list.scrollBottom(desiredBottom);
      }
    };


    /*
     * Returns the currently selected item view
     * @return {jQuery}
     * @private
     */

    SimpleSelectListView.prototype.getSelectedItemView = function() {
      return this.list.find("li.selected");
    };


    /*
     * Returns the currently selected item (NOT the view)
     * @return {Object}
     * @private
     */

    SimpleSelectListView.prototype.getSelectedItem = function() {
      return this.getSelectedItemView().data("select-list-item");
    };


    /*
     * Confirms the currently selected item or cancels the list view
     * if no item has been selected
     * @private
     */

    SimpleSelectListView.prototype.confirmSelection = function() {
      var item;
      item = this.getSelectedItem();
      if (item != null) {
        return this.confirmed(item);
      } else {
        return this.cancel();
      }
    };


    /*
     * Focuses the hidden input, starts listening to keyboard events
     * @private
     */

    SimpleSelectListView.prototype.setActive = function() {
      this.active = true;
      return this.hiddenInput.focus();
    };


    /*
     * Re-builds the list with the current items
     * @private
     */

    SimpleSelectListView.prototype.populateList = function() {
      var i, item, itemView, _i, _ref1;
      if (this.items == null) {
        return;
      }
      this.list.empty();
      for (i = _i = 0, _ref1 = Math.min(this.items.length, this.maxItems); 0 <= _ref1 ? _i < _ref1 : _i > _ref1; i = 0 <= _ref1 ? ++_i : --_i) {
        item = this.items[i];
        itemView = this.viewForItem(item);
        $(itemView).data("select-list-item", item);
        this.list.append(itemView);
      }
      return this.selectItemView(this.list.find("li:first"));
    };


    /*
     * Creates a view for the given item
     * @return {jQuery}
     * @private
     */

    SimpleSelectListView.prototype.viewForItem = function(_arg) {
      var word;
      word = _arg.word;
      return $$(function() {
        return this.li((function(_this) {
          return function() {
            return _this.span(word);
          };
        })(this));
      });
    };


    /*
     * Clears the list, detaches the element
     * @private
     */

    SimpleSelectListView.prototype.cancel = function() {
      if (!this.active) {
        return;
      }
      this.active = false;
      this.list.empty();
      return this.detach();
    };

    return SimpleSelectListView;

  })(View);

  module.exports = SimpleSelectListView;

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLGdEQUFBO0lBQUE7bVNBQUE7O0FBQUEsRUFBQSxPQUFnQixPQUFBLENBQVEsTUFBUixDQUFoQixFQUFDLFNBQUEsQ0FBRCxFQUFJLFVBQUEsRUFBSixFQUFRLFlBQUEsSUFBUixDQUFBOztBQUFBLEVBQ0EsQ0FBQSxHQUFJLE9BQUEsQ0FBUSxpQkFBUixDQURKLENBQUE7O0FBQUEsRUFHQSxJQUFBLEdBQ0U7QUFBQSxJQUFBLE1BQUEsRUFBUSxFQUFSO0FBQUEsSUFDQSxLQUFBLEVBQU8sRUFEUDtBQUFBLElBRUEsR0FBQSxFQUFLLENBRkw7R0FKRixDQUFBOztBQUFBLEVBUU07QUFDSiwyQ0FBQSxDQUFBOzs7O0tBQUE7O0FBQUEsbUNBQUEsUUFBQSxHQUFVLEVBQVYsQ0FBQTs7QUFBQSxJQUNBLG9CQUFDLENBQUEsT0FBRCxHQUFVLFNBQUEsR0FBQTthQUNSLElBQUMsQ0FBQSxHQUFELENBQUs7QUFBQSxRQUFBLE9BQUEsRUFBTywwQkFBUDtPQUFMLEVBQXdDLENBQUEsU0FBQSxLQUFBLEdBQUE7ZUFBQSxTQUFBLEdBQUE7QUFDdEMsVUFBQSxLQUFDLENBQUEsS0FBRCxDQUFPO0FBQUEsWUFBQSxPQUFBLEVBQU8sY0FBUDtBQUFBLFlBQXVCLE1BQUEsRUFBUSxhQUEvQjtXQUFQLENBQUEsQ0FBQTtpQkFDQSxLQUFDLENBQUEsRUFBRCxDQUFJO0FBQUEsWUFBQSxPQUFBLEVBQU8sWUFBUDtBQUFBLFlBQXFCLE1BQUEsRUFBUSxNQUE3QjtXQUFKLEVBRnNDO1FBQUEsRUFBQTtNQUFBLENBQUEsQ0FBQSxDQUFBLElBQUEsQ0FBeEMsRUFEUTtJQUFBLENBRFYsQ0FBQTs7QUFNQTtBQUFBOzs7T0FOQTs7QUFBQSxtQ0FVQSxVQUFBLEdBQVksU0FBQSxHQUFBO0FBRVYsTUFBQSxJQUFD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
//# sourceURL=/Users/hisamatsu/dotfile/.atom/packages/autocomplete-plus/lib/simple-select-list-view.coffee