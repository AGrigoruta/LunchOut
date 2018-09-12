'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _raf = require('raf');

var _raf2 = _interopRequireDefault(_raf);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var extractPosition = function extractPosition(callback) {
  return function (evt) {
    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    var nativeEvent = evt;
    if (!(evt instanceof window.Event)) {
      nativeEvent = evt.nativeEvent;
    }

    var touchPosition = null;
    if (nativeEvent.touches && nativeEvent.touches.length) {
      var touch = nativeEvent.touches[0];
      touchPosition = { x: touch.clientX, y: touch.clientY };
    } else if (nativeEvent.clientX && nativeEvent.clientY) {
      touchPosition = { x: nativeEvent.clientX, y: nativeEvent.clientY };
    }
    return callback.apply(undefined, [touchPosition, evt].concat(args));
  };
};

var TouchHandler = function () {
  function TouchHandler(onTouchStart, onTouchMove, onTouchEnd) {
    _classCallCheck(this, TouchHandler);

    // in the event both touch and click handlers can fire (e.g., chrome device
    // mode), only add one set of handlers
    this._listenersAdded = false;
    this._currentAnimationFrame = null;

    // delegated to callbacks
    this._onTouchStart = onTouchStart;
    this._onTouchMove = onTouchMove;
    this._onTouchEnd = onTouchEnd;

    this._handleTouchStart = extractPosition(this._handleTouchStart.bind(this));
    this._handleMouseDown = extractPosition(this._handleMouseDown.bind(this));

    this._handleTouchMove = extractPosition(this._handleTouchMove.bind(this));
    this._handleTouchEnd = extractPosition(this._handleTouchEnd.bind(this));
  }

  _createClass(TouchHandler, [{
    key: 'listeners',
    value: function listeners(child, _onTouchStart, _onMouseDown) {
      var _this = this;

      return {
        onTouchStart: function onTouchStart(evt) {
          return _this._handleTouchStart(evt, child, _onTouchStart);
        },
        onMouseDown: function onMouseDown(evt) {
          return _this._handleMouseDown(evt, child, _onMouseDown);
        }
      };
    }
  }, {
    key: 'removeListeners',
    value: function removeListeners() {
      this._listenersAdded = false;
      document.removeEventListener('touchmove', this._handleTouchMove);
      document.removeEventListener('touchend', this._handleTouchEnd);
      document.removeEventListener('touchcancel', this._handleTouchEnd);
      document.removeEventListener('mousemove', this._handleTouchMove);
      document.removeEventListener('mouseup', this._handleTouchEnd);
    }
  }, {
    key: 'cancelAnimationFrame',
    value: function cancelAnimationFrame() {
      _raf2.default.cancel(this._currentAnimationFrame);
      this._currentAnimationFrame = null;
    }
  }, {
    key: '_addTouchListeners',
    value: function _addTouchListeners() {
      this._listenersAdded = true;
      document.addEventListener('touchmove', this._handleTouchMove);
      document.addEventListener('touchend', this._handleTouchEnd);
      document.addEventListener('touchcancel', this._handleTouchEnd);
    }
  }, {
    key: '_addMouseListeners',
    value: function _addMouseListeners() {
      this._listenersAdded = true;
      document.addEventListener('mousemove', this._handleTouchMove);
      document.addEventListener('mouseup', this._handleTouchEnd);
    }
  }, {
    key: '_handleTouchStart',
    value: function _handleTouchStart(touchPosition, synthEvent, child, onTouchStart) {
      if (this._listenersAdded) return;
      this._addTouchListeners();

      child.props.onTouchStart && child.props.onTouchStart(synthEvent);
      onTouchStart && onTouchStart(synthEvent);
      this._onTouchStart(touchPosition);
    }
  }, {
    key: '_handleMouseDown',
    value: function _handleMouseDown(touchPosition, synthEvent, child, onMouseDown) {
      if (this._listenersAdded) return;
      this._addMouseListeners();

      child.props.onMouseDown && child.props.onMouseDown(synthEvent);
      onMouseDown && onMouseDown(synthEvent);
      this._onTouchStart(touchPosition);
    }
  }, {
    key: '_handleTouchMove',
    value: function _handleTouchMove(touchPosition) {
      var _this2 = this;

      if (!this._currentAnimationFrame) {
        this._currentAnimationFrame = (0, _raf2.default)(function () {
          _this2._currentAnimationFrame = null;
          _this2._onTouchMove(touchPosition);
        });
      }
    }
  }, {
    key: '_handleTouchEnd',
    value: function _handleTouchEnd(touchPosition) {
      this.cancelAnimationFrame();
      this.removeListeners();
      this._onTouchEnd(touchPosition);
    }
  }]);

  return TouchHandler;
}();

exports.default = TouchHandler;