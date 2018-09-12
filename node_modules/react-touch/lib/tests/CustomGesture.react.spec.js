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

var _times = require('lodash/times');

var _times2 = _interopRequireDefault(_times);

var _helpers = require('./helpers');

var _gestureMoves = require('../gestureMoves');

var _gestureMoves2 = _interopRequireDefault(_gestureMoves);

var _CustomGesture = require('../CustomGesture.react');

var _CustomGesture2 = _interopRequireDefault(_CustomGesture);

var _TouchHandler = require('../TouchHandler');

var _TouchHandler2 = _interopRequireDefault(_TouchHandler);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable no-unused-expressions */

var renderCustomGesture = (0, _helpers.renderComponent)(_CustomGesture2.default);
var fakeRaf = (0, _helpers.createFakeRaf)();

describe("CustomGesture", function () {
  beforeEach(function () {
    return _TouchHandler2.default.__Rewire__('raf', fakeRaf);
  });
  afterEach(function () {
    return _TouchHandler2.default.__ResetDependency__('raf');
  });

  it("should fire 'onGesture' with a qualifying gesture", function () {
    var alpha = [_gestureMoves2.default.DOWNRIGHT, _gestureMoves2.default.RIGHT, _gestureMoves2.default.UPRIGHT, _gestureMoves2.default.UP, _gestureMoves2.default.UPLEFT, _gestureMoves2.default.LEFT, _gestureMoves2.default.DOWNLEFT];
    var spy = _sinon2.default.spy();
    var component = renderCustomGesture({
      onGesture: spy,
      config: alpha
    });
    _reactAddonsTestUtils2.default.Simulate.touchStart(_reactDom2.default.findDOMNode(component), { nativeEvent: (0, _helpers.nativeTouch)(200, 300) });
    (0, _helpers.documentEvent)('touchmove', (0, _helpers.nativeTouch)(210, 310)); // down-right
    fakeRaf.step();
    (0, _helpers.documentEvent)('touchmove', (0, _helpers.nativeTouch)(220, 320)); // down-right
    fakeRaf.step();
    (0, _helpers.documentEvent)('touchmove', (0, _helpers.nativeTouch)(230, 320)); // right
    fakeRaf.step();
    (0, _helpers.documentEvent)('touchmove', (0, _helpers.nativeTouch)(240, 310)); // up-right
    fakeRaf.step();
    (0, _helpers.documentEvent)('touchmove', (0, _helpers.nativeTouch)(240, 300)); // up
    fakeRaf.step();
    (0, _helpers.documentEvent)('touchmove', (0, _helpers.nativeTouch)(230, 290)); // up-left
    fakeRaf.step();
    (0, _helpers.documentEvent)('touchmove', (0, _helpers.nativeTouch)(220, 290)); // left
    fakeRaf.step();
    (0, _helpers.documentEvent)('touchmove', (0, _helpers.nativeTouch)(210, 300)); // down-left
    fakeRaf.step();
    (0, _helpers.documentEvent)('touchmove', (0, _helpers.nativeTouch)(200, 310)); // down-left
    fakeRaf.step();
    (0, _helpers.documentEvent)('touchend');
    (0, _chai.expect)(spy.calledOnce).to.be.true;
  });

  it("should reset the state when touch is ended", function () {
    var component = renderCustomGesture();
    _reactAddonsTestUtils2.default.Simulate.touchStart(_reactDom2.default.findDOMNode(component), { nativeEvent: (0, _helpers.nativeTouch)(200, 300) });
    (0, _times2.default)(10, function (i) {
      (0, _helpers.documentEvent)('touchmove', (0, _helpers.nativeTouch)(200 + i * 20, 300));
      fakeRaf.step();
    });
    (0, _helpers.documentEvent)('touchend');
    (0, _chai.expect)(component._state).to.eql({ current: null, moves: [] });
  });

  it("should reset the state when touch is ended even when there are no moves", function () {
    var component = renderCustomGesture();
    _reactAddonsTestUtils2.default.Simulate.touchStart(_reactDom2.default.findDOMNode(component), { nativeEvent: (0, _helpers.nativeTouch)(200, 300) });
    (0, _helpers.documentEvent)('touchend');
    (0, _chai.expect)(component._state).to.eql({ current: null, moves: [] });
  });

  it("should render its child as its only output", function () {
    var renderer = _reactAddonsTestUtils2.default.createRenderer();
    renderer.render(_react2.default.createElement(
      _CustomGesture2.default,
      null,
      _react2.default.createElement('div', null)
    ));
    var output = renderer.getRenderOutput();
    (0, _chai.expect)(output.type).to.be.equal('div');
  });

  it("should pass the correct props to nested react-touch components", function () {
    var renderer = _reactAddonsTestUtils2.default.createRenderer();
    renderer.render(_react2.default.createElement(
      _CustomGesture2.default,
      null,
      _react2.default.createElement(
        _CustomGesture2.default,
        null,
        _react2.default.createElement(_helpers.ExampleComponent, null)
      )
    ));
    var output = renderer.getRenderOutput();
    (0, _chai.expect)(output.props).to.have.keys(['__passThrough', 'children', 'config', 'onGesture', 'onMouseDown', 'onTouchStart']);
  });

  it("should not pass custom props to its children", function () {
    var renderer = _reactAddonsTestUtils2.default.createRenderer();
    renderer.render(_react2.default.createElement(
      _CustomGesture2.default,
      null,
      _react2.default.createElement(_helpers.ExampleComponent, null)
    ));
    var output = renderer.getRenderOutput();
    (0, _chai.expect)(output.props).to.have.keys(['onMouseDown', 'onTouchStart']);
  });

  it("should not pass custom props down to DOM nodes", function () {
    var renderer = _reactAddonsTestUtils2.default.createRenderer();
    renderer.render(_react2.default.createElement(
      _CustomGesture2.default,
      null,
      _react2.default.createElement('div', null)
    ));
    var output = renderer.getRenderOutput();
    (0, _chai.expect)(output.props).to.have.keys(['onMouseDown', 'onTouchStart']);
  });

  it("should remove listeners when the component unmounts", function () {
    var container = document.createElement('div');
    var spy = _sinon2.default.spy();
    var component = _reactDom2.default.render(_react2.default.createElement(
      _CustomGesture2.default,
      { onGesture: spy, config: [_gestureMoves2.default.RIGHT] },
      _react2.default.createElement('div', null)
    ), container);
    _reactAddonsTestUtils2.default.Simulate.touchStart(_reactDom2.default.findDOMNode(component), { nativeEvent: (0, _helpers.nativeTouch)(200, 300) });
    (0, _times2.default)(9, function (i) {
      (0, _helpers.documentEvent)('touchmove', (0, _helpers.nativeTouch)(200 + i * 20, 300));
      fakeRaf.step();
    });
    _reactDom2.default.unmountComponentAtNode(container);
    (0, _helpers.documentEvent)('touchend');
    fakeRaf.step();
    (0, _chai.expect)(spy.notCalled).to.be.true;
  });
});