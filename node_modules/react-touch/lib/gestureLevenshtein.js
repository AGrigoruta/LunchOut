'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _times = require('lodash/times');

var _times2 = _interopRequireDefault(_times);

var _circleMath = require('./circleMath');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var BIG_NUM = 10000;

var gestureLevenshtein = function gestureLevenshtein(a, b) {
  if (a.length === 0 || b.length === 0) {
    return BIG_NUM;
  }

  // create a levenshtein matrix
  var levMatrix = (0, _times2.default)(b.length + 1, function () {
    return (0, _times2.default)(a.length + 1, function () {
      return 0;
    });
  });
  // make the first row and the first side column a big number
  for (var j = 1; j <= a.length; j++) {
    levMatrix[0][j] = BIG_NUM;
  }
  for (var i = 1; i <= b.length; i++) {
    levMatrix[i][0] = BIG_NUM;
  }

  // now compute the cells in the levenshtein matrix
  for (var _i = 1; _i <= b.length; _i++) {
    for (var _j = 1; _j <= a.length; _j++) {
      var cost = (0, _circleMath.sectorDistance)(a[_j - 1], b[_i - 1]);
      levMatrix[_i][_j] = Math.min(cost + levMatrix[_i - 1][_j], cost + levMatrix[_i][_j - 1], cost + levMatrix[_i - 1][_j - 1]);
    }
  }
  return levMatrix[b.length][a.length];
};

exports.default = gestureLevenshtein;