"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var DEFAULT_SWIPE_DISTANCE = 100;

var defineSwipe = function defineSwipe() {
  var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  // TODO: add swipe velocity back in
  var swipeDistance = config.swipeDistance || DEFAULT_SWIPE_DISTANCE;

  return {
    onSwipeLeft: function onSwipeLeft(current, initial, callback) {
      if (-(current.x - initial.x) >= swipeDistance) {
        callback();
      }
    },
    onSwipeRight: function onSwipeRight(current, initial, callback) {
      if (current.x - initial.x >= swipeDistance) {
        callback();
      }
    },
    onSwipeUp: function onSwipeUp(current, initial, callback) {
      if (-(current.y - initial.y) >= swipeDistance) {
        callback();
      }
    },
    onSwipeDown: function onSwipeDown(current, initial, callback) {
      if (current.y - initial.y >= swipeDistance) {
        callback();
      }
    }
  };
};

exports.default = defineSwipe;