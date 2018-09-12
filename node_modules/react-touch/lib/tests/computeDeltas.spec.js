'use strict';

var _chai = require('chai');

var _computeDeltas = require('../computeDeltas');

var _computeDeltas2 = _interopRequireDefault(_computeDeltas);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe("computeDeltas", function () {
  it("should return a dx and a dy of 0 when the positions are the same", function () {
    var position = { x: 100, y: 100 };
    (0, _chai.expect)((0, _computeDeltas2.default)(position, position)).to.eql({ dx: 0, dy: 0 });
  });

  it("should return a negative dx when the position moves left", function () {
    var initial = { x: 100, y: 100 };
    var current = { x: 80, y: 100 };
    (0, _chai.expect)((0, _computeDeltas2.default)(initial, current)).to.eql({ dx: -20, dy: 0 });
  });

  it("should return a positve dx when the position moves right", function () {
    var initial = { x: 100, y: 100 };
    var current = { x: 120, y: 100 };
    (0, _chai.expect)((0, _computeDeltas2.default)(initial, current)).to.eql({ dx: 20, dy: 0 });
  });

  it("should return a positive dy when the position moves down", function () {
    var initial = { x: 100, y: 100 };
    var current = { x: 100, y: 120 };
    (0, _chai.expect)((0, _computeDeltas2.default)(initial, current)).to.eql({ dx: 0, dy: 20 });
  });

  it("should return a negative dy when the position moves up", function () {
    var initial = { x: 100, y: 100 };
    var current = { x: 100, y: 80 };
    (0, _chai.expect)((0, _computeDeltas2.default)(initial, current)).to.eql({ dx: 0, dy: -20 });
  });

  it("should return non-zero deltas when the position moves in two directions", function () {
    var initial = { x: 100, y: 100 };
    var current = { x: 120, y: 120 };
    (0, _chai.expect)((0, _computeDeltas2.default)(initial, current)).to.eql({ dx: 20, dy: 20 });
  });
});