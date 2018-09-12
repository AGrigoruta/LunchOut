'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var DIRECTIVES = [['left', 'dx', add], ['top', 'dy', add], ['bottom', 'dy', subtract], ['right', 'dx', subtract], ['translateX', 'dx', add], ['translateY', 'dy', add]];

var computePositionStyle = function computePositionStyle(currentStyle, deltas) {
  return DIRECTIVES.reduce(function (style, directive) {
    var _directive = _slicedToArray(directive, 3),
        name = _directive[0],
        deltaType = _directive[1],
        operation = _directive[2];

    if (currentStyle[name] !== undefined) {
      // eslint-disable-next-line no-param-reassign
      style[name] = operation(currentStyle[name], deltas[deltaType]);
    }
    return style;
  }, {});
};

function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return add(a, -b);
}

exports.default = computePositionStyle;