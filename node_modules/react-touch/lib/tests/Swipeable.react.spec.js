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

var _omitBy2 = require('lodash/omitBy');

var _omitBy3 = _interopRequireDefault(_omitBy2);

var _isNull = require('lodash/isNull');

var _isNull2 = _interopRequireDefault(_isNull);

var _helpers = require('./helpers');

var _Swipeable = require('../Swipeable.react');

var _Swipeable2 = _interopRequireDefault(_Swipeable);

var _defineSwipe = require('../defineSwipe');

var _defineSwipe2 = _interopRequireDefault(_defineSwipe);

var _TouchHandler = require('../TouchHandler');

var _TouchHandler2 = _interopRequireDefault(_TouchHandler);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/* eslint-disable no-unused-expressions */

var renderSwipeable = (0, _helpers.renderComponent)(_Swipeable2.default);
var fakeRaf = (0, _helpers.createFakeRaf)();

var testSwipeDirection = function testSwipeDirection(callback, failPos, successPos) {
  var _omitBy;

  var config = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;

  var spy = _sinon2.default.spy();
  var props = (0, _omitBy3.default)((_omitBy = {}, _defineProperty(_omitBy, callback, spy), _defineProperty(_omitBy, 'config', config), _omitBy), _isNull2.default);
  var swipeable = renderSwipeable(props);
  _reactAddonsTestUtils2.default.Simulate.touchStart(_reactDom2.default.findDOMNode(swipeable), { nativeEvent: (0, _helpers.nativeTouch)(200, 300) });
  (0, _helpers.documentEvent)('touchmove', { touches: [failPos] });
  fakeRaf.step();
  (0, _chai.expect)(spy.calledOnce).to.be.false;
  (0, _helpers.documentEvent)('touchmove', { touches: [successPos] });
  fakeRaf.step();
  (0, _chai.expect)(spy.calledOnce).to.be.true;
};

describe("Swipeable", function () {
  beforeEach(function () {
    return _TouchHandler2.default.__Rewire__('raf', fakeRaf);
  });
  afterEach(function () {
    return _TouchHandler2.default.__ResetDependency__('raf');
  });

  it("should fire 'onSwipeLeft' when swiped left", function () {
    testSwipeDirection('onSwipeLeft', { clientX: 101 }, { clientX: 100 });
  });

  it("should fire 'onSwipeRight' when swiped right", function () {
    testSwipeDirection('onSwipeRight', { clientX: 299 }, { clientX: 300 });
  });

  it("should fire 'onSwipeUp' when swiped up", function () {
    testSwipeDirection('onSwipeUp', { clientY: 201 }, { clientY: 200 });
  });

  it("should fire 'onSwipeDown' when swiped down", function () {
    testSwipeDirection('onSwipeDown', { clientY: 399 }, { clientY: 400 });
  });

  it("should reset the state when touch is ended", function () {
    var swipeable = renderSwipeable();
    _reactAddonsTestUtils2.default.Simulate.touchStart(_reactDom2.default.findDOMNode(swipeable), { nativeEvent: (0, _helpers.nativeTouch)(200, 300) });
    (0, _helpers.documentEvent)('touchend');
    (0, _chai.expect)(swipeable.state).to.eql({ initial: null, current: null, deltas: { dx: 0, dy: 0 } });
  });

  it("should alter its distance threshold when 'swipeDistance is used", function () {
    var config = (0, _defineSwipe2.default)({ swipeDistance: 75 });
    testSwipeDirection('onSwipeLeft', { clientX: 126 }, { clientX: 125 }, config);
  });

  it("should render its child as its only output", function () {
    var renderer = _reactAddonsTestUtils2.default.createRenderer();
    renderer.render(_react2.default.createElement(
      _Swipeable2.default,
      null,
      _react2.default.createElement('div', null)
    ));
    var output = renderer.getRenderOutput();
    (0, _chai.expect)(output.type).to.be.equal('div');
  });

  it("should pass the correct props to nested react-touch components", function () {
    var renderer = _reactAddonsTestUtils2.default.createRenderer();
    renderer.render(_react2.default.createElement(
      _Swipeable2.default,
      null,
      _react2.default.createElement(
        _Swipeable2.default,
        null,
        _react2.default.createElement('div', null)
      )
    ));
    var output = renderer.getRenderOutput();
    (0, _chai.expect)(output.props).to.have.keys(['__passThrough', 'children', 'config', 'onMouseDown', 'onTouchStart']);
  });

  it("should not pass custom props to its children", function () {
    var renderer = _reactAddonsTestUtils2.default.createRenderer();
    renderer.render(_react2.default.createElement(
      _Swipeable2.default,
      null,
      _react2.default.createElement(_helpers.ExampleComponent, null)
    ));
    var output = renderer.getRenderOutput();
    (0, _chai.expect)(output.props).to.have.keys(['onMouseDown', 'onTouchStart']);
  });

  it("should not pass custom props down to DOM nodes", function () {
    var renderer = _reactAddonsTestUtils2.default.createRenderer();
    renderer.render(_react2.default.createElement(
      _Swipeable2.default,
      null,
      _react2.default.createElement('div', null)
    ));
    var output = renderer.getRenderOutput();
    (0, _chai.expect)(output.props).to.have.keys(['onMouseDown', 'onTouchStart']);
  });

  it("should remove listeners when the component unmounts", function () {
    var container = document.createElement('div');
    var spy = _sinon2.default.spy();
    var swipeable = _reactDom2.default.render(_react2.default.createElement(
      _Swipeable2.default,
      { onSwipeLeft: spy },
      _react2.default.createElement('div', null)
    ), container);
    _reactAddonsTestUtils2.default.Simulate.touchStart(_reactDom2.default.findDOMNode(swipeable), { nativeEvent: (0, _helpers.nativeTouch)(200, 300) });
    _reactDom2.default.unmountComponentAtNode(container);
    (0, _helpers.documentEvent)('touchmove', (0, _helpers.nativeTouch)(100, 300));
    fakeRaf.step();
    (0, _chai.expect)(spy.notCalled).to.be.true;
  });
});