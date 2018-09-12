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

var _Holdable = require('../Holdable.react');

var _Holdable2 = _interopRequireDefault(_Holdable);

var _defineHold = require('../defineHold');

var _defineHold2 = _interopRequireDefault(_defineHold);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable no-unused-expressions */

var clock = void 0;
var renderHoldable = (0, _helpers.renderComponent)(_Holdable2.default);

describe("Holdable", function () {
  beforeEach(function () {
    clock = _sinon2.default.useFakeTimers();
  });

  afterEach(function () {
    clock.restore();
  });

  it("should pass updates to callback child as 'holdProgress'", function () {
    var progressUpdates = [];
    var holdable = _reactAddonsTestUtils2.default.renderIntoDocument(_react2.default.createElement(
      _Holdable2.default,
      null,
      function (_ref) {
        var holdProgress = _ref.holdProgress;

        progressUpdates.push(holdProgress);
        return _react2.default.createElement('div', null);
      }
    ));
    _reactAddonsTestUtils2.default.Simulate.touchStart(_reactDom2.default.findDOMNode(holdable));
    clock.tick(250);
    (0, _chai.expect)(progressUpdates).to.be.lengthOf(3);
    clock.tick(250);
    (0, _chai.expect)(progressUpdates[3]).to.be.above(progressUpdates[2]);
  });

  it("should fire a callback 'onHoldProgress' when progress is made", function () {
    var spy = _sinon2.default.spy();
    var holdable = renderHoldable({ onHoldProgress: spy });
    _reactAddonsTestUtils2.default.Simulate.touchStart(_reactDom2.default.findDOMNode(holdable));
    clock.tick(1000);
    (0, _chai.expect)(spy.callCount).to.be.equal(4);
  });

  it("should fire a callback 'onHoldComplete' after hold is completed", function () {
    var spy = _sinon2.default.spy();
    var holdable = renderHoldable({ onHoldComplete: spy });
    _reactAddonsTestUtils2.default.Simulate.touchStart(_reactDom2.default.findDOMNode(holdable));
    clock.tick(1500);
    (0, _chai.expect)(spy.calledOnce).to.be.true;
  });

  it("should stop firing 'onHoldProgress' when touch is moved", function () {
    var spy = _sinon2.default.spy();
    var holdable = renderHoldable({ onHoldProgress: spy });

    _reactAddonsTestUtils2.default.Simulate.touchStart(_reactDom2.default.findDOMNode(holdable));
    clock.tick(250);
    (0, _chai.expect)(spy.calledOnce).to.be.true;
    (0, _helpers.documentEvent)('touchmove');
    clock.tick(250);
    (0, _chai.expect)(spy.calledOnce).to.be.true;
  });

  it("should not fire 'onHoldComplete' when touch is moved", function () {
    var spy = _sinon2.default.spy();
    var holdable = renderHoldable({ onHoldComplete: spy });

    _reactAddonsTestUtils2.default.Simulate.touchStart(_reactDom2.default.findDOMNode(holdable));
    clock.tick(250);
    (0, _helpers.documentEvent)('touchmove');
    (0, _chai.expect)(spy.notCalled).to.be.true;
    clock.tick(1000);
    (0, _chai.expect)(spy.notCalled).to.be.true;
  });

  it("should stop firing 'onHoldProgress' when touch is released", function () {
    var spy = _sinon2.default.spy();
    var holdable = renderHoldable({ onHoldProgress: spy });
    _reactAddonsTestUtils2.default.Simulate.touchStart(_reactDom2.default.findDOMNode(holdable));
    clock.tick(250);
    (0, _helpers.documentEvent)('touchend');
    clock.tick(250);
    (0, _chai.expect)(spy.calledOnce).to.be.true;
  });

  it("should not fire 'onHoldComplete' when touch is released", function () {
    var spy = _sinon2.default.spy();
    var holdable = renderHoldable({ onHoldComplete: spy });
    _reactAddonsTestUtils2.default.Simulate.touchStart(_reactDom2.default.findDOMNode(holdable));
    clock.tick(250);
    (0, _helpers.documentEvent)('touchend');
    clock.tick(1000);
    (0, _chai.expect)(spy.notCalled).to.be.true;
  });

  it("should reset the state when touch is ended", function () {
    var holdable = renderHoldable();
    _reactAddonsTestUtils2.default.Simulate.touchStart(_reactDom2.default.findDOMNode(holdable));
    (0, _helpers.documentEvent)('touchend');
    (0, _chai.expect)(holdable.state).to.eql({ initial: null, current: null, duration: 0 });
  });

  it("should alter its progress updates when 'updateEvery' is used", function () {
    var spy = _sinon2.default.spy();
    var config = (0, _defineHold2.default)({ updateEvery: 50 });
    var holdable = renderHoldable({ onHoldProgress: spy, config: config });
    _reactAddonsTestUtils2.default.Simulate.touchStart(_reactDom2.default.findDOMNode(holdable));

    (0, _chai.expect)(spy.notCalled).to.be.true;
    clock.tick(50);
    (0, _chai.expect)(spy.calledOnce).to.be.true;
    clock.tick(50);
    (0, _chai.expect)(spy.calledTwice).to.be.true;
    clock.tick(50);
    (0, _chai.expect)(spy.calledThrice).to.be.true;
  });

  it("should alter its hold length when 'holdFor' is used", function () {
    var spy = _sinon2.default.spy();
    var config = (0, _defineHold2.default)({ holdFor: 500 });
    var holdable = renderHoldable({ onHoldComplete: spy, config: config });
    _reactAddonsTestUtils2.default.Simulate.touchStart(_reactDom2.default.findDOMNode(holdable));

    clock.tick(250);
    (0, _chai.expect)(spy.notCalled).to.be.true;
    clock.tick(500);
    (0, _chai.expect)(spy.calledOnce).to.be.true;
    clock.tick(500);
    (0, _chai.expect)(spy.calledOnce).to.be.true;
  });

  it("should render its child as its only output", function () {
    var renderer = _reactAddonsTestUtils2.default.createRenderer();
    renderer.render(_react2.default.createElement(
      _Holdable2.default,
      null,
      _react2.default.createElement('div', null)
    ));
    var output = renderer.getRenderOutput();
    (0, _chai.expect)(output.type).to.be.equal('div');
  });

  it("should pass the correct props to nested react-touch components", function () {
    var renderer = _reactAddonsTestUtils2.default.createRenderer();
    renderer.render(_react2.default.createElement(
      _Holdable2.default,
      null,
      _react2.default.createElement(
        _Holdable2.default,
        null,
        _react2.default.createElement('div', null)
      )
    ));
    var output = renderer.getRenderOutput();
    (0, _chai.expect)(output.props).to.have.keys(['__passThrough', 'children', 'config', 'onMouseDown', 'onTouchStart', 'onHoldComplete', 'onHoldProgress']);
  });

  it("should not pass custom props to its children", function () {
    var renderer = _reactAddonsTestUtils2.default.createRenderer();
    renderer.render(_react2.default.createElement(
      _Holdable2.default,
      null,
      _react2.default.createElement(_helpers.ExampleComponent, null)
    ));
    var output = renderer.getRenderOutput();
    (0, _chai.expect)(output.props).to.have.keys(['onMouseDown', 'onTouchStart']);
  });

  it("should not pass custom props down to DOM nodes", function () {
    var renderer = _reactAddonsTestUtils2.default.createRenderer();
    renderer.render(_react2.default.createElement(
      _Holdable2.default,
      null,
      _react2.default.createElement('div', null)
    ));
    var output = renderer.getRenderOutput();
    (0, _chai.expect)(output.props).to.have.keys(['onMouseDown', 'onTouchStart']);
  });

  it("should remove timers and listeners when the component unmounts", function () {
    var container = document.createElement('div');
    var spy = _sinon2.default.spy();
    var holdable = _reactDom2.default.render(_react2.default.createElement(
      _Holdable2.default,
      { onHoldProgress: spy },
      _react2.default.createElement('div', null)
    ), container);
    _reactAddonsTestUtils2.default.Simulate.touchStart(_reactDom2.default.findDOMNode(holdable));
    _reactDom2.default.unmountComponentAtNode(container);
    clock.tick(250);
    (0, _chai.expect)(spy.notCalled).to.be.true;
  });
});