'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createFakeRaf = exports.nativeTouch = exports.ExampleComponent = exports.renderComponent = exports.documentEvent = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactAddonsTestUtils = require('react-addons-test-utils');

var _reactAddonsTestUtils2 = _interopRequireDefault(_reactAddonsTestUtils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var documentEvent = exports.documentEvent = function documentEvent(eventName) {
  var props = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  var evt = Object.assign(document.createEvent("HTMLEvents"), props);
  evt.initEvent(eventName, true, true);
  document.dispatchEvent(evt);
};

var renderComponent = exports.renderComponent = function renderComponent(component) {
  var _component = _react2.default.createFactory(component);
  return function (props) {
    return _reactAddonsTestUtils2.default.renderIntoDocument(_component(props, _react2.default.createElement('div', null)));
  };
};

var ExampleComponent = exports.ExampleComponent = function ExampleComponent() {
  return _react2.default.createElement('div', null);
};

var nativeTouch = exports.nativeTouch = function nativeTouch(x, y) {
  return { touches: [{ clientX: x, clientY: y }] };
};

var createFakeRaf = exports.createFakeRaf = function createFakeRaf() {
  var FRAME_LENGTH = 1000 / 60; // assume 60fps for now

  var callbacks = [];
  var time = 0;
  var id = 0;

  var raf = function raf(callback) {
    id += 1;
    callbacks.push({ callback: callback, id: id });
    return id;
  };

  raf.cancel = function (cancelId) {
    callbacks = callbacks.filter(function (item) {
      return item.id !== cancelId;
    });
  };

  raf.step = function () {
    var steps = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;

    for (var i = 0; i < steps; i++) {
      time += FRAME_LENGTH;
      // eslint-disable-next-line no-loop-func
      callbacks.forEach(function (_ref) {
        var callback = _ref.callback;
        return callback(time);
      });
      callbacks = [];
    }
  };

  return raf;
};