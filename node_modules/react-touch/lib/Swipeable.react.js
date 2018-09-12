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

var _merge = require('lodash/merge');

var _merge2 = _interopRequireDefault(_merge);

var _TouchHandler = require('./TouchHandler');

var _TouchHandler2 = _interopRequireDefault(_TouchHandler);

var _defineSwipe = require('./defineSwipe');

var _defineSwipe2 = _interopRequireDefault(_defineSwipe);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DIRECTIONS = ['Left', 'Right', 'Up', 'Down'];
var ZERO_DELTAS = { dx: 0, dy: 0 };
var DEFAULT_STATE = { initial: null, current: null, deltas: ZERO_DELTAS };

var Swipeable = function (_React$Component) {
  _inherits(Swipeable, _React$Component);

  _createClass(Swipeable, null, [{
    key: 'defaultProps',
    get: function get() {
      return { config: (0, _defineSwipe2.default)() };
    }
  }]);

  function Swipeable(props) {
    _classCallCheck(this, Swipeable);

    var _this = _possibleConstructorReturn(this, (Swipeable.__proto__ || Object.getPrototypeOf(Swipeable)).call(this, props));

    _this.state = DEFAULT_STATE;
    _this._handlerFired = {};
    _this._touchHandler = new _TouchHandler2.default(_this.handleTouchStart.bind(_this), _this.handleTouchMove.bind(_this), _this.handleTouchEnd.bind(_this));
    return _this;
  }

  _createClass(Swipeable, [{
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this._touchHandler.cancelAnimationFrame();
      this._touchHandler.removeListeners();
    }
  }, {
    key: 'passThroughState',
    value: function passThroughState() {
      return _extends({}, this.state.deltas);
    }
  }, {
    key: 'handleTouchStart',
    value: function handleTouchStart(touchPosition) {
      this.setState((0, _merge2.default)({}, this.state, {
        initial: touchPosition,
        current: touchPosition
      }));
    }
  }, {
    key: 'handleTouchMove',
    value: function handleTouchMove(touchPosition) {
      var _this2 = this;

      this.setState((0, _merge2.default)({}, this.state, { current: touchPosition }));

      DIRECTIONS.forEach(function (direction) {
        var name = 'onSwipe' + direction;
        var handler = _this2.props[name];
        if (handler && !_this2._handlerFired[name]) {
          _this2.props.config[name](touchPosition, _this2.state.initial, function () {
            _this2._handlerFired[name] = true;
            handler();
          });
        }
      });
    }
  }, {
    key: 'handleTouchEnd',
    value: function handleTouchEnd() {
      this._resetState();
    }
  }, {
    key: '_resetState',
    value: function _resetState() {
      this._touchHandler.cancelAnimationFrame();
      this._handlerFired = {};
      this.setState((0, _merge2.default)({}, this.state, DEFAULT_STATE));
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          onTouchStart = _props.onTouchStart,
          onMouseDown = _props.onMouseDown,
          children = _props.children,
          __passThrough = _props.__passThrough;

      var passThrough = _extends({}, __passThrough, this.passThroughState());
      var child = (0, _isFunction2.default)(children) ? children(_extends({}, passThrough)) : children;
      var props = _extends({}, this._touchHandler.listeners(child, onTouchStart, onMouseDown));

      if (child.type.propTypes && child.type.propTypes.hasOwnProperty('__passThrough')) {
        props.__passThrough = passThrough;
      }

      return _react2.default.cloneElement(_react2.default.Children.only(child), props);
    }
  }]);

  return Swipeable;
}(_react2.default.Component);

Swipeable.propTypes = {
  children: _propTypes.PropTypes.oneOfType([_propTypes.PropTypes.func, _propTypes.PropTypes.element]).isRequired,
  config: _propTypes.PropTypes.object,
  onMouseDown: _propTypes.PropTypes.func,
  onTouchStart: _propTypes.PropTypes.func,
  __passThrough: _propTypes.PropTypes.object
};
exports.default = Swipeable;