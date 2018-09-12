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

var _clamp = require('lodash/clamp');

var _clamp2 = _interopRequireDefault(_clamp);

var _defineHold = require('./defineHold');

var _defineHold2 = _interopRequireDefault(_defineHold);

var _TouchHandler = require('./TouchHandler');

var _TouchHandler2 = _interopRequireDefault(_TouchHandler);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DEFAULT_HOLD = { initial: null, current: null, duration: 0 };

var Holdable = function (_React$Component) {
  _inherits(Holdable, _React$Component);

  _createClass(Holdable, null, [{
    key: 'defaultProps',
    get: function get() {
      return {
        onHoldProgress: function onHoldProgress() {},
        onHoldComplete: function onHoldComplete() {},
        config: (0, _defineHold2.default)()
      };
    }
  }]);

  function Holdable(props) {
    _classCallCheck(this, Holdable);

    var _this = _possibleConstructorReturn(this, (Holdable.__proto__ || Object.getPrototypeOf(Holdable)).call(this, props));

    _this.state = DEFAULT_HOLD;
    _this._startHoldProgress = null;
    _this._startHoldComplete = null;
    _this._clearHoldProgressTimer = null;
    _this._clearHoldCompleteTimer = null;

    _this._touchHandler = new _TouchHandler2.default(_this.handleTouchStart.bind(_this), _this.handleTouchMove.bind(_this), _this.handleTouchEnd.bind(_this));
    return _this;
  }

  _createClass(Holdable, [{
    key: '_resetTouch',
    value: function _resetTouch() {
      this.setState(DEFAULT_HOLD);
    }
  }, {
    key: '_clearTimers',
    value: function _clearTimers() {
      // successful hold completes will null these out
      this._clearHoldProgressTimer && this._clearHoldProgressTimer();
      this._clearHoldCompleteTimer && this._clearHoldCompleteTimer();
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _props = this.props,
          onHoldProgress = _props.onHoldProgress,
          onHoldComplete = _props.onHoldComplete,
          config = _props.config;


      this._startHoldProgress = config.holdProgress(onHoldProgress);
      this._startHoldComplete = config.holdComplete(onHoldComplete);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this._touchHandler.removeListeners();
      this._clearTimers();
    }
  }, {
    key: 'passThroughState',
    value: function passThroughState() {
      return { holdProgress: this.state.duration };
    }
  }, {
    key: 'handleTouchStart',
    value: function handleTouchStart() {
      var _this2 = this;

      // set initial conditions for the touch event
      var initial = Date.now();
      this.setState((0, _merge2.default)({}, this.state, { initial: initial, current: initial }));

      this._clearHoldProgressTimer = this._startHoldProgress(function (holdLength) {
        var current = Date.now();
        var _duration = (current - _this2.state.initial) / holdLength;
        var duration = (0, _clamp2.default)(_duration, 0, 1);
        _this2.setState((0, _merge2.default)({}, _this2.state, { current: current, duration: duration }));

        if (duration === 1) {
          // edge case: setTimeout ensures onholdComplete has a chance to fire
          setTimeout(function () {
            return _this2._clearTimers();
          });
        }
      });
      this._clearHoldCompleteTimer = this._startHoldComplete();
    }
  }, {
    key: 'handleTouchMove',
    value: function handleTouchMove() {
      this._clearTimers();
    }
  }, {
    key: 'handleTouchEnd',
    value: function handleTouchEnd() {
      this._clearTimers();
      this._resetTouch();
    }
  }, {
    key: 'render',
    value: function render() {
      var _props2 = this.props,
          onTouchStart = _props2.onTouchStart,
          onMouseDown = _props2.onMouseDown,
          children = _props2.children,
          __passThrough = _props2.__passThrough;

      var passThrough = _extends({}, __passThrough, this.passThroughState());
      var child = (0, _isFunction2.default)(children) ? children(_extends({}, passThrough)) : children;
      var props = _extends({}, this._touchHandler.listeners(child, onTouchStart, onMouseDown));

      if (child.type.propTypes && child.type.propTypes.hasOwnProperty('__passThrough')) {
        props.__passThrough = passThrough;
      }

      return _react2.default.cloneElement(_react2.default.Children.only(child), props);
    }
  }]);

  return Holdable;
}(_react2.default.Component);

Holdable.propTypes = {
  children: _propTypes.PropTypes.oneOfType([_propTypes.PropTypes.func, _propTypes.PropTypes.element]).isRequired,
  onHoldProgress: _propTypes.PropTypes.func,
  onHoldComplete: _propTypes.PropTypes.func,
  onMouseDown: _propTypes.PropTypes.func,
  onTouchStart: _propTypes.PropTypes.func,
  config: _propTypes.PropTypes.object,
  __passThrough: _propTypes.PropTypes.object
};
exports.default = Holdable;