'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _isFunction = require('lodash/isFunction');

var _isFunction2 = _interopRequireDefault(_isFunction);

var _isArray = require('lodash/isArray');

var _isArray2 = _interopRequireDefault(_isArray);

var _merge = require('lodash/merge');

var _merge2 = _interopRequireDefault(_merge);

var _TouchHandler = require('./TouchHandler');

var _TouchHandler2 = _interopRequireDefault(_TouchHandler);

var _computeDeltas2 = require('./computeDeltas');

var _computeDeltas3 = _interopRequireDefault(_computeDeltas2);

var _gestureLevenshtein = require('./gestureLevenshtein');

var _gestureLevenshtein2 = _interopRequireDefault(_gestureLevenshtein);

var _convertToDefaultsObject = require('./convertToDefaultsObject');

var _convertToDefaultsObject2 = _interopRequireDefault(_convertToDefaultsObject);

var _circleMath = require('./circleMath');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var INITIAL_STATE = { current: null, moves: [] };
var DEFAULT_CONFIG = { fudgeFactor: 5, minMoves: 8, gesture: "" };

var CustomGesture = function (_React$Component) {
  _inherits(CustomGesture, _React$Component);

  _createClass(CustomGesture, null, [{
    key: 'defaultProps',
    get: function get() {
      return {
        onGesture: function onGesture() {},
        config: DEFAULT_CONFIG
      };
    }
  }]);

  function CustomGesture(props) {
    _classCallCheck(this, CustomGesture);

    var _this = _possibleConstructorReturn(this, (CustomGesture.__proto__ || Object.getPrototypeOf(CustomGesture)).call(this, props));

    _this._state = INITIAL_STATE;
    _this._sectors = (0, _circleMath.createSectors)(); // create a resolution map of sectors

    _this._touchHandler = new _TouchHandler2.default(_this.handleTouchStart.bind(_this), _this.handleTouchMove.bind(_this), _this.handleTouchEnd.bind(_this));
    return _this;
  }

  _createClass(CustomGesture, [{
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this._touchHandler.cancelAnimationFrame();
      this._touchHandler.removeListeners();
    }
  }, {
    key: 'handleTouchStart',
    value: function handleTouchStart(touchPosition) {
      // set initial conditions for the touch event
      this._state = (0, _merge2.default)({}, this._state, { current: touchPosition });
    }
  }, {
    key: 'handleTouchMove',
    value: function handleTouchMove(touchPosition) {
      var _state = this._state,
          current = _state.current,
          moves = _state.moves;

      var _computeDeltas = (0, _computeDeltas3.default)(current, touchPosition),
          dx = _computeDeltas.dx,
          dy = _computeDeltas.dy;

      var sectorIdx = (0, _circleMath.computeSectorIdx)(dx, dy);

      this._state = {
        current: { x: current.x + dx, y: current.y + dy },
        moves: [].concat(_toConsumableArray(moves), [this._sectors[sectorIdx]])
      };
    }
  }, {
    key: 'handleTouchEnd',
    value: function handleTouchEnd() {
      var _config = this.props.config;

      var config = (0, _convertToDefaultsObject2.default)(_config, 'gesture', DEFAULT_CONFIG);

      if (this._state.moves.length < config.minMoves) {
        this._resetState();
        return;
      }

      var gesture = (0, _isArray2.default)(config.gesture) ? config.gesture.join("") : config.gesture;
      var distance = (0, _gestureLevenshtein2.default)(this._state.moves.join(""), gesture);

      if (distance < config.fudgeFactor) {
        this.props.onGesture();
      }
      this._resetState();
    }
  }, {
    key: '_resetState',
    value: function _resetState() {
      this._touchHandler.cancelAnimationFrame();
      this._state = INITIAL_STATE;
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          onTouchStart = _props.onTouchStart,
          onMouseDown = _props.onMouseDown,
          children = _props.children,
          __passThrough = _props.__passThrough;

      var child = (0, _isFunction2.default)(children) ? children(__passThrough) : children;
      var props = _extends({}, this._touchHandler.listeners(child, onTouchStart, onMouseDown));

      if (child.type.propTypes && child.type.propTypes.hasOwnProperty('__passThrough')) {
        props.__passThrough = __passThrough;
      }

      return _react2.default.cloneElement(_react2.default.Children.only(child), props);
    }
  }]);

  return CustomGesture;
}(_react2.default.Component);

CustomGesture.propTypes = {
  children: _propTypes.PropTypes.oneOfType([_propTypes.PropTypes.func, _propTypes.PropTypes.element]).isRequired,
  config: _propTypes.PropTypes.oneOfType([_propTypes.PropTypes.string, _propTypes.PropTypes.array, _propTypes.PropTypes.object]).isRequired,
  onMouseDown: _propTypes.PropTypes.func,
  onTouchStart: _propTypes.PropTypes.func,
  onGesture: _propTypes.PropTypes.func,
  __passThrough: _propTypes.PropTypes.object
};
exports.default = CustomGesture;