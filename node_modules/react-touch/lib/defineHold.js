"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var DEFAULT_INTERVAL = 250;
var DEFAULT_HOLD_LENGTH = 1000;

var defineHold = function defineHold() {
  var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  var updateInterval = config.updateEvery || DEFAULT_INTERVAL;
  var holdLength = config.holdFor || DEFAULT_HOLD_LENGTH;

  return {
    holdProgress: function holdProgress(callback) {
      return function (updateState) {
        var holdDownTimer = setInterval(function () {
          callback();
          updateState(holdLength);
        }, updateInterval);
        return function () {
          return clearInterval(holdDownTimer);
        };
      };
    },
    holdComplete: function holdComplete(callback) {
      return function () {
        var holdReleaseTimer = setTimeout(callback, holdLength);
        return function () {
          return clearTimeout(holdReleaseTimer);
        };
      };
    }
  };
};

exports.default = defineHold;