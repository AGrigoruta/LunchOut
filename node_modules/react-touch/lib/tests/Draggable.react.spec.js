'use strict';

var _chai = require('chai');

var _sinon = require('sinon');

var _sinon2 = _interopRequireDefault(_sinon);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactAddonsTestUtils = require('react-addons-test-utils');

var _reactAddonsTestUtils2 = _interopRequireDefault(_reactAddonsTestUtils);

var _helpers = require('./helpers');

var _Draggable = require('../Draggable.react');

var _Draggable2 = _interopRequireDefault(_Draggable);

var _TouchHandler = require('../TouchHandler');

var _TouchHandler2 = _interopRequireDefault(_TouchHandler);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable no-unused-expressions */

var renderDraggable = (0, _helpers.renderComponent)(_Draggable2.default);
var fakeRaf = (0, _helpers.createFakeRaf)();

describe("Draggable", function () {
  beforeEach(function () {
    return _TouchHandler2.default.__Rewire__('raf', fakeRaf);
  });
  afterEach(function () {
    return _TouchHandler2.default.__ResetDependency__('raf');
  });

  it("should pass the 'translate' position updates to the callback child", function () {
    var update = void 0;
    var draggable = _reactAddonsTestUtils2.default.renderIntoDocument(_react2.default.createElement(
      _Draggable2.default,
      { position: { translateX: 150, translateY: 150 } },
      function (_ref) {
        var translateX = _ref.translateX,
            translateY = _ref.translateY;

        update = { translateX: translateX, translateY: translateY };
        return _react2.default.createElement('div', null);
      }
    ));
    _reactAddonsTestUtils2.default.Simulate.touchStart(_reactDom2.default.findDOMNode(draggable), { nativeEvent: (0, _helpers.nativeTouch)(200, 300) });
    (0, _helpers.documentEvent)('touchmove', (0, _helpers.nativeTouch)(220, 280));
    fakeRaf.step();
    (0, _chai.expect)(update).to.eql({ translateX: 170, translateY: 130 });
  });

  it("should pass the absolute position updates to the callback child", function () {
    var update = void 0;
    var draggable = _reactAddonsTestUtils2.default.renderIntoDocument(_react2.default.createElement(
      _Draggable2.default,
      { position: { left: 150, top: 150, bottom: 10, right: 20 } },
      function (_ref2) {
        var top = _ref2.top,
            left = _ref2.left,
            right = _ref2.right,
            bottom = _ref2.bottom;

        update = { top: top, left: left, right: right, bottom: bottom };
        return _react2.default.createElement('div', null);
      }
    ));
    _reactAddonsTestUtils2.default.Simulate.touchStart(_reactDom2.default.findDOMNode(draggable), { nativeEvent: (0, _helpers.nativeTouch)(200, 300) });
    (0, _helpers.documentEvent)('touchmove', (0, _helpers.nativeTouch)(220, 280));
    fakeRaf.step();
    (0, _chai.expect)(update).to.eql({ left: 170, top: 130, bottom: 30, right: 0 });
  });

  it("should call the 'onDrag' callback on touchmove events", function () {
    var initial = { translateX: 100, translateY: 100 };
    var spy = _sinon2.default.spy();
    var draggable = renderDraggable({ position: initial, onDrag: spy });
    _reactAddonsTestUtils2.default.Simulate.touchStart(_reactDom2.default.findDOMNode(draggable), { nativeEvent: (0, _helpers.nativeTouch)(200, 300) });
    (0, _helpers.documentEvent)('touchmove', (0, _helpers.nativeTouch)(220, 280));
    fakeRaf.step();
    (0, _chai.expect)(spy.calledOnce).to.be.true;
  });

  it("should pass the updated positions to the 'onDrag' callback", function () {
    var initial = { translateX: 100, translateY: 100 };
    var spy = _sinon2.default.spy();
    var draggable = renderDraggable({ position: initial, onDrag: spy });
    _reactAddonsTestUtils2.default.Simulate.touchStart(_reactDom2.default.findDOMNode(draggable), { nativeEvent: (0, _helpers.nativeTouch)(200, 300) });
    (0, _helpers.documentEvent)('touchmove', (0, _helpers.nativeTouch)(220, 280));
    fakeRaf.step();
    (0, _chai.expect)(spy.calledWith({ translateX: 120, translateY: 80 })).to.be.true;
  });

  it("should pass the delta updates to the callback child", function () {
    var update = void 0;
    var draggable = _reactAddonsTestUtils2.default.renderIntoDocument(_react2.default.createElement(
      _Draggable2.default,
      { position: { left: 150, top: 150 } },
      function (_ref3) {
        var dx = _ref3.dx,
            dy = _ref3.dy;

        update = { dx: dx, dy: dy };
        return _react2.default.createElement('div', null);
      }
    ));
    _reactAddonsTestUtils2.default.Simulate.touchStart(_reactDom2.default.findDOMNode(draggable), { nativeEvent: (0, _helpers.nativeTouch)(200, 300) });
    (0, _helpers.documentEvent)('touchmove', (0, _helpers.nativeTouch)(220, 280));
    fakeRaf.step();
    (0, _chai.expect)(update).to.eql({ dx: 20, dy: -20 });
  });

  it("should call 'onDragEnd' on touchend", function () {
    var initial = { translateX: 100, translateY: 100 };
    var spy = _sinon2.default.spy();
    var draggable = renderDraggable({ position: initial, onDragEnd: spy });
    _reactAddonsTestUtils2.default.Simulate.touchStart(_reactDom2.default.findDOMNode(draggable), { nativeEvent: (0, _helpers.nativeTouch)(200, 300) });
    (0, _helpers.documentEvent)('touchend');
    (0, _chai.expect)(spy.calledOnce).to.be.true;
  });

  it("should render its child as its only output", function () {
    var renderer = _reactAddonsTestUtils2.default.createRenderer();
    renderer.render(_react2.default.createElement(
      _Draggable2.default,
      { position: { translateX: 100, translateY: 100 } },
      _react2.default.createElement('div', null)
    ));
    var output = renderer.getRenderOutput();
    (0, _chai.expect)(output.type).to.be.equal('div');
  });

  it("should pass the correct props to nested react-touch components", function () {
    var renderer = _reactAddonsTestUtils2.default.createRenderer();
    renderer.render(_react2.default.createElement(
      _Draggable2.default,
      { position: { translateX: 100, translateY: 100 } },
      _react2.default.createElement(
        _Draggable2.default,
        { position: { translateX: 100, translateY: 100 } },
        _react2.default.createElement(_helpers.ExampleComponent, null)
      )
    ));
    var output = renderer.getRenderOutput();
    (0, _chai.expect)(output.props).to.have.keys(['__passThrough', 'children', 'position', 'onMouseDown', 'onTouchStart']);
  });

  it("should not pass custom props to its children", function () {
    var renderer = _reactAddonsTestUtils2.default.createRenderer();
    renderer.render(_react2.default.createElement(
      _Draggable2.default,
      { position: { translateX: 100, translateY: 100 } },
      _react2.default.createElement(_helpers.ExampleComponent, null)
    ));
    var output = renderer.getRenderOutput();
    (0, _chai.expect)(output.props).to.have.keys(['onMouseDown', 'onTouchStart']);
  });

  it("should not pass custom props down to DOM nodes", function () {
    var renderer = _reactAddonsTestUtils2.default.createRenderer();
    renderer.render(_react2.default.createElement(
      _Draggable2.default,
      { position: { translateX: 100, translateY: 100 } },
      _react2.default.createElement('div', null)
    ));
    var output = renderer.getRenderOutput();
    (0, _chai.expect)(output.props).to.have.keys(['onMouseDown', 'onTouchStart']);
  });
});