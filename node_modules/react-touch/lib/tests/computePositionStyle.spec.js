'use strict';

var _chai = require('chai');

var _computePositionStyle = require('../computePositionStyle');

var _computePositionStyle2 = _interopRequireDefault(_computePositionStyle);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe("computePositionStyle", function () {
  it("should output any keys that you used as inputs", function () {
    var styles = { left: 100, right: 30, translateX: 100 };
    var deltas = { dx: 20, dy: 10 };
    var keys = ['left', 'right', 'translateX'];
    (0, _chai.expect)((0, _computePositionStyle2.default)(styles, deltas)).to.have.all.keys(keys);
  });

  it("should not skip 0 values", function () {
    var styles = { left: 0 };
    var deltas = { dx: 20 };
    (0, _chai.expect)((0, _computePositionStyle2.default)(styles, deltas)).to.eql({ left: 20 });
  });

  it("should should correctly increment 'left'", function () {
    var styles = { left: 100 };
    var deltas = { dx: 20 };
    (0, _chai.expect)((0, _computePositionStyle2.default)(styles, deltas)).to.eql({ left: 120 });
  });

  it("should should correctly increment 'right'", function () {
    var styles = { right: 100 };
    var deltas = { dx: 20 };
    (0, _chai.expect)((0, _computePositionStyle2.default)(styles, deltas)).to.eql({ right: 80 });
  });

  it("should should correctly increment 'top'", function () {
    var styles = { top: 100 };
    var deltas = { dy: 20 };
    (0, _chai.expect)((0, _computePositionStyle2.default)(styles, deltas)).to.eql({ top: 120 });
  });

  it("should should correctly increment 'bottom'", function () {
    var styles = { bottom: 100 };
    var deltas = { dy: 20 };
    (0, _chai.expect)((0, _computePositionStyle2.default)(styles, deltas)).to.eql({ bottom: 80 });
  });

  it("should should correctly increment 'translateX'", function () {
    var styles = { translateX: 100 };
    var deltas = { dx: 20 };
    (0, _chai.expect)((0, _computePositionStyle2.default)(styles, deltas)).to.eql({ translateX: 120 });
  });

  it("should should correctly increment 'translateY'", function () {
    var styles = { translateY: 100 };
    var deltas = { dy: 20 };
    (0, _chai.expect)((0, _computePositionStyle2.default)(styles, deltas)).to.eql({ translateY: 120 });
  });
});