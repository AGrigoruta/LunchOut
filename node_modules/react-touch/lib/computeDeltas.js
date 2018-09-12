"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var computeDeltas = function computeDeltas(oldPosition, newPosition) {
  var oldX = oldPosition.x,
      oldY = oldPosition.y;
  var newX = newPosition.x,
      newY = newPosition.y;

  return { dx: newX - oldX, dy: newY - oldY };
};

exports.default = computeDeltas;