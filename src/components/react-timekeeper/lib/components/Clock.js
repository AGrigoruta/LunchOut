'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.Clock = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactMotion = require('react-motion');

var _radium = require('radium');

var _radium2 = _interopRequireDefault(_radium);

var _dom = require('../helpers/dom');

var _data = require('../helpers/data');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// radius of clock, in px
var CLOCK_RADIUS = 110;
var CLOCK_SIZE = CLOCK_RADIUS * 2;

// clock hand length, in px
var CLOCK_HAND_LENGTH = 90;

// number of actual numbers to display
var NUMBER_INCREMENTS = 12;
var NUMBER_INCREMENTS_VALUE = 360 / NUMBER_INCREMENTS;

// size of circle surrounding number
var NUMBER_SIZE = 34;

// positioning of numbers within circle
var NUMBER_INNER_POSITION = 22;
function animationPosition(unit) {
	return unit === 'hour' ? NUMBER_INNER_POSITION - 30 : NUMBER_INNER_POSITION + 26;
}

var cos = Math.cos,
    sin = Math.sin,
    atan2 = Math.atan2;

var pi = Math.PI;

function rad(deg) {
	return deg / (180 / pi);
}
function deg(rad) {
	return rad * (180 / pi);
}

var Clock = exports.Clock = function (_React$Component) {
	_inherits(Clock, _React$Component);

	function Clock(props) {
		_classCallCheck(this, Clock);

		var _this = _possibleConstructorReturn(this, (Clock.__proto__ || Object.getPrototypeOf(Clock)).call(this, props));

		_this.mousedown = _this.mousedown.bind(_this);
		_this.touchstart = _this.touchstart.bind(_this);
		return _this;
	}

	_createClass(Clock, [{
		key: 'render',
		value: function render() {
			var props = this.props;
			var config = props.config;
			var styles = {
				clock: {
					display: 'inline-block',
					borderRadius: '200px',
					background: config.CLOCK_BACKGROUND,
					width: CLOCK_SIZE + 'px',
					height: CLOCK_SIZE + 'px',
					position: 'relative',
					cursor: 'pointer'
				},
				numberPositioning: {
					display: 'inline-block',
					position: 'absolute',
					color: config.CLOCK_NUMBER_COLOR,
					fontSize: '16px',
					pointerEvents: 'none',
					borderRadius: '99px',
					width: NUMBER_SIZE,
					height: NUMBER_SIZE,
					textAlign: 'center',
					lineHeight: NUMBER_SIZE + 'px',
					zIndex: 5
				},
				clockHand: {
					position: 'relative'
				}
			};

			function renderNumbersAndClockhand() {
				var _this2 = this;

				var unit = props.unit;
				var animationItems = [unit === 'hour' ? 'hour' : 'minute'];

				var animationOptions = {
					willEnter: function willEnter(transition) {
						return {
							opacity: 0,
							handOpacity: 0,
							translate: animationPosition(transition.data)
						};
					},
					willLeave: function willLeave(transition) {
						return {
							opacity: (0, _reactMotion.spring)(0),
							handOpacity: (0, _reactMotion.spring)(0),
							translate: (0, _reactMotion.spring)(animationPosition(transition.data))
						};
					},

					styles: animationItems.map(function (unit) {
						return {
							key: unit,
							style: {
								opacity: (0, _reactMotion.spring)(1),
								handOpacity: (0, _reactMotion.spring)(1, { stiffness: 120, damping: 40 }),
								translate: (0, _reactMotion.spring)(NUMBER_INNER_POSITION)
							},
							data: unit
						};
					})
				};

				var handRotation = props[unit] * (360 / _data.CLOCK_DATA[unit].increments);

				return _react2.default.createElement(
					_reactMotion.TransitionMotion,
					animationOptions,
					function (interpolatedStyles) {
						return _react2.default.createElement(
							'div',
							{ className: 'react-timekeeper__clock-animations-wrapper' },
							interpolatedStyles.map(function (anim) {
								var data = _data.CLOCK_DATA[anim.data];

								var showIntermediateValueDisplay = void 0;
								if (anim.data === 'minute' && props.minute % 5) {
									showIntermediateValueDisplay = _react2.default.createElement('circle', { cx: CLOCK_RADIUS, cy: NUMBER_INNER_POSITION, r: 4,
										fill: config.CLOCK_HAND_INTERMEDIATE_CIRCLE_BACKGROUND
									});
								}

								return _react2.default.createElement(
									'div',
									{ style: { position: 'absolute' }, key: anim.data, ref: function ref(el) {
											return _this2.clock = el;
										}, className: 'react-timekeeper__clock-animations' },
									data.numbers.map(function (numberString, i) {
										var num = i + 1;
										return _react2.default.createElement(
											'span',
											{
												key: numberString,
												style: _extends({}, styles.numberPositioning, {
													opacity: anim.style.opacity,
													left: sin(rad(num * -NUMBER_INCREMENTS_VALUE - 180)) * (CLOCK_RADIUS - anim.style.translate) + CLOCK_RADIUS - NUMBER_SIZE / 2,
													top: cos(rad(num * -NUMBER_INCREMENTS_VALUE - 180)) * (CLOCK_RADIUS - anim.style.translate) + CLOCK_RADIUS - NUMBER_SIZE / 2
												})
											},
											numberString
										);
									}),
									_react2.default.createElement(
										'svg',
										{ width: CLOCK_SIZE, height: CLOCK_SIZE, viewBox: '0 0 ' + CLOCK_SIZE + ' ' + CLOCK_SIZE, xmlns: 'http://www.w3.org/2000/svg',
											style: _extends({}, styles.clockHand, {
												opacity: anim.style.handOpacity
											}),
											className: 'react-timekeeper__clock-svgs'
										},
										_react2.default.createElement(
											'g',
											{ transform: 'rotate(' + handRotation + ' ' + CLOCK_RADIUS + ' ' + CLOCK_RADIUS + ')' },
											_react2.default.createElement('line', { x1: CLOCK_RADIUS, y1: CLOCK_RADIUS, x2: CLOCK_RADIUS, y2: CLOCK_RADIUS - CLOCK_HAND_LENGTH,
												strokeWidth: '1',
												stroke: config.CLOCK_HAND_ARM
											}),
											_react2.default.createElement('circle', { cx: CLOCK_RADIUS, cy: CLOCK_RADIUS, r: 1.5,
												fill: config.CLOCK_HAND_ARM
											}),
											_react2.default.createElement('circle', { cx: CLOCK_RADIUS, cy: NUMBER_INNER_POSITION, r: NUMBER_SIZE / 2,
												fill: config.CLOCK_HAND_CIRCLE_BACKGROUND
											}),
											showIntermediateValueDisplay
										)
									)
								);
							})
						);
					}
				);
			}

			return _react2.default.createElement(
				'div',
				{
					style: styles.clock,
					onMouseDown: this.mousedown,
					onTouchStart: this.touchstart,
					className: 'react-timekeeper__clock'
				},
				renderNumbersAndClockhand.call(this)
			);
		}
	}, {
		key: 'handlePoint',
		value: function handlePoint(clientX, clientY, canChangeUnit) {
			var x = clientX - CLOCK_RADIUS;
			var y = -clientY + CLOCK_RADIUS;

			var a = atan2(y, x);
			var d = 90 - deg(a);
			if (d < 0) {
				d = 360 + d;
			}

			var unit = this.props.unit;
			var selected = Math.round(d / 360 * _data.CLOCK_DATA[unit].increments);

			if (unit === 'hour') {
				this.props.changeHour(selected, canChangeUnit);
			} else if (unit === 'minute') {
				this.props.changeMinute(selected, canChangeUnit);
			}
		}
	}, {
		key: 'mousedown',
		value: function mousedown() {
			this.mousedragHandler = this.mousedrag.bind(this);
			this.stopDragHandler = this.stopDragHandler.bind(this);

			// add listeners
			document.addEventListener('mousemove', this.mousedragHandler, false);
			document.addEventListener('mouseup', this.stopDragHandler, false);
			this.props.clockWrapperEl.addEventListener('mouseleave', this.stopDragHandler, false);
		}
	}, {
		key: 'mousedrag',
		value: function mousedrag(e) {
			var _calcOffset = (0, _dom.calcOffset)(this.clock, e.clientX, e.clientY),
			    offsetX = _calcOffset.offsetX,
			    offsetY = _calcOffset.offsetY;

			this.handlePoint(offsetX, offsetY);

			e.preventDefault();
			return false;
		}
	}, {
		key: 'touchstart',
		value: function touchstart() {
			// bind handlers
			this.touchdragHandler = this.touchdrag.bind(this);
			this.stopDragHandler = this.stopDragHandler.bind(this);

			window.blockMenuHeaderScroll = false;

			document.addEventListener('touchmove', this.touchdragHandler, false);
			document.addEventListener('touchend', this.stopDragHandler, false);
			document.addEventListener('touchcancel', this.stopDragHandler, false);
		}
	}, {
		key: 'touchdrag',
		value: function touchdrag(e) {
			var touch = e.targetTouches[0];

			var _calcOffset2 = (0, _dom.calcOffset)(this.clock, touch.clientX, touch.clientY),
			    offsetX = _calcOffset2.offsetX,
			    offsetY = _calcOffset2.offsetY;

			this.handlePoint(offsetX, offsetY);

			e.preventDefault();
			return false;
		}
	}, {
		key: 'stopDragHandler',
		value: function stopDragHandler() {
			var e = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

			document.removeEventListener('mousemove', this.mousedragHandler, false);
			document.removeEventListener('mouseup', this.stopDragHandler, false);
			this.props.clockWrapperEl.removeEventListener('mouseleave', this.stopDragHandler, false);

			document.removeEventListener('touchmove', this.touchdragHandler, false);
			document.addEventListener('touchend', this.stopDragHandler, false);
			document.addEventListener('touchcancel', this.stopDragHandler, false);
			window.blockMenuHeaderScroll = false;

			var evType = e.type;
			if (evType === 'mouseup') {
				var _calcOffset3 = (0, _dom.calcOffset)(this.clock, e.clientX, e.clientY),
				    offsetX = _calcOffset3.offsetX,
				    offsetY = _calcOffset3.offsetY;

				this.handlePoint(offsetX, offsetY, true);
			} else if (evType === 'touchcancel' || evType === 'touchend') {
				var touch = e.targetTouches[0];
				if (touch) {
					var _calcOffset4 = (0, _dom.calcOffset)(this.clock, touch.clientX, touch.clientY),
					    _offsetX = _calcOffset4.offsetX,
					    _offsetY = _calcOffset4.offsetY;

					this.handlePoint(_offsetX, _offsetY, true);
				}
			}
		}
	}, {
		key: 'componentWillUnmount',
		value: function componentWillUnmount() {
			// clear any event listeners
			this.stopDragHandler();
		}
	}]);

	return Clock;
}(_react2.default.Component);

Clock.propTypes = {
	config: _propTypes2.default.object.isRequired,
	hour: _propTypes2.default.number.isRequired,
	minute: _propTypes2.default.number.isRequired,
	unit: _propTypes2.default.string.isRequired,

	changeHour: _propTypes2.default.func.isRequired,
	changeMinute: _propTypes2.default.func.isRequired,
	clockWrapperEl: _propTypes2.default.object
};

exports.default = (0, _radium2.default)(Clock);