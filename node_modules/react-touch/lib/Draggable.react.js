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

var _TouchHandler = require('./TouchHandler');

var _TouchHandler2 = _interopRequireDefault(_TouchHandler);

var _computePositionStyle = require('./computePositionStyle');

var _computePositionStyle2 = _interopRequireDefault(_computePositionStyle);

var _computeDeltas = require('./computeDeltas');

var _computeDeltas2 = _interopRequireDefault(_computeDeltas);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ZERO_DELTAS = { dx: 0, dy: 0 };
var DEFAULT_TOUCH = { initial: null, current: null, deltas: ZERO_DELTAS };

var Draggable = function (_React$Component) {
  _inherits(Draggable, _React$Component);

  function Draggable(props) {
    _classCallCheck(this, Draggable);

    var _this = _possibleConstructorReturn(this, (Draggable.__proto__ || Object.getPrototypeOf(Draggable)).call(this, props));

    _this.state = DEFAULT_TOUCH;
    _this._touchHandler = new _TouchHandler2.default(_this.handleTouchStart.bind(_this), _this.handleTouchMove.bind(_this), _this.handleTouchEnd.bind(_this));
    return _this;
  }

  _createClass(Draggable, [{
    key: 'passThroughState',
    value: function passThroughState() {
      var position = this.props.position;
      var deltas = this.state.deltas;

      var current = (0, _computePositionStyle2.default)(position, deltas);
      return _extends({}, current, deltas);
    }
  }, {
    key: 'handleTouchStart',
    value: function handleTouchStart(touchPosition) {
      this.setState({ initial: touchPosition, current: touchPosition });
    }
  }, {
    key: 'handleTouchMove',
    value: function handleTouchMove(touchPosition) {
      var _state = this.state,
          deltas = _state.deltas,
          current = _state.current;

      var touchDeltas = (0, _computeDeltas2.default)(current, touchPosition);
      var componentPosition = (0, _computePositionStyle2.default)(this.props.position, touchDeltas);
      this.props.onDrag && this.props.onDrag(componentPosition);

      var latest = { dx: deltas.dx + touchDeltas.dx, dy: deltas.dy + touchDeltas.dy };
      this.setState({ deltas: latest, current: touchPosition });
    }
  }, {
    key: 'handleTouchEnd',
    value: function handleTouchEnd() {
      this.props.onDragEnd && this.props.onDragEnd();
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

  return Draggable;
}(_react2.default.Component);

Draggable.propTypes = {
  children: _propTypes.PropTypes.oneOfType([_propTypes.PropTypes.func, _propTypes.PropTypes.element]).isRequired,
  position: _propTypes.PropTypes.objectOf(_propTypes.PropTypes.oneOfType([_propTypes.PropTypes.number, _propTypes.PropTypes.object])).isRequired,
  onMouseDown: _propTypes.PropTypes.func,
  onTouchStart: _propTypes.PropTypes.func,
  onDrag: _propTypes.PropTypes.func,
  onDragEnd: _propTypes.PropTypes.func,
  __passThrough: _propTypes.PropTypes.object
};
exports.default = Draggable;