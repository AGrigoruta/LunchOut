'use strict';

var _chai = require('chai');

var _index = require('../index');

var index = _interopRequireWildcard(_index);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var EXPORTS = ['Draggable', 'Holdable', 'Swipeable', 'CustomGesture', 'defineHold', 'defineSwipe', 'moves'];

describe("index.js", function () {
  it("should have the correct exports", function () {
    (0, _chai.expect)(index).to.have.all.keys(EXPORTS);
  });

  it("should not have any extra exports", function () {
    (0, _chai.expect)(Object.keys(index)).to.have.lengthOf(EXPORTS.length);
  });
});