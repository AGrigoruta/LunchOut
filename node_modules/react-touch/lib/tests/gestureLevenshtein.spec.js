'use strict';

var _chai = require('chai');

var _gestureLevenshtein = require('../gestureLevenshtein');

var _gestureLevenshtein2 = _interopRequireDefault(_gestureLevenshtein);

var _gestureMoves = require('../gestureMoves');

var _gestureMoves2 = _interopRequireDefault(_gestureMoves);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var UPCARET = [_gestureMoves2.default.UPRIGHT, _gestureMoves2.default.DOWNRIGHT];
var CIRCLE = [_gestureMoves2.default.RIGHT, _gestureMoves2.default.DOWNRIGHT, _gestureMoves2.default.DOWN, _gestureMoves2.default.DOWNLEFT, _gestureMoves2.default.LEFT, _gestureMoves2.default.UPLEFT, _gestureMoves2.default.UP, _gestureMoves2.default.UPRIGHT, _gestureMoves2.default.RIGHT];

describe("gestureLevenshtein", function () {
  it("should return a big number when an argument is an empty string", function () {
    (0, _chai.expect)((0, _gestureLevenshtein2.default)("", "1")).to.equal(10000);
    (0, _chai.expect)((0, _gestureLevenshtein2.default)("1", "")).to.equal(10000);
  });

  it("should return 0 when the arguments match", function () {
    (0, _chai.expect)((0, _gestureLevenshtein2.default)(UPCARET, UPCARET)).to.equal(0);
    (0, _chai.expect)((0, _gestureLevenshtein2.default)(CIRCLE, CIRCLE)).to.equal(0);
  });

  it("should return 0 when the arguments 'collapse' to be equal", function () {
    // Collapse here meaning if we were to manually remove consecutive
    // duplicates, the below value would collapse into "71".
    var humanUpCaret = "777777771111111";
    (0, _chai.expect)((0, _gestureLevenshtein2.default)(UPCARET, humanUpCaret)).to.equal(0);

    var humanCircle = "0111122222233445555666700000";
    (0, _chai.expect)((0, _gestureLevenshtein2.default)(CIRCLE, humanCircle)).to.equal(0);
  });

  it("should return correct values when arguments don't match", function () {
    var humanUpCaret = "77777777001111111";
    (0, _chai.expect)((0, _gestureLevenshtein2.default)(UPCARET, humanUpCaret)).to.equal(2);

    var humanCircle = "0001121112222122233344445555665666777770";
    (0, _chai.expect)((0, _gestureLevenshtein2.default)(CIRCLE, humanCircle)).to.equal(3);
  });
});