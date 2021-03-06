'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.Timepicker = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _debounce = require('lodash/debounce');

var _debounce2 = _interopRequireDefault(_debounce);

var _radium = require('radium');

var _radium2 = _interopRequireDefault(_radium);

var _parseTime = require('../helpers/parse-time');

var _parseTime2 = _interopRequireDefault(_parseTime);

var _composeTime = require('../helpers/compose-time');

var _composeTime2 = _interopRequireDefault(_composeTime);

var _ClockWrapper = require('./ClockWrapper');

var _ClockWrapper2 = _interopRequireDefault(_ClockWrapper);

var _Time = require('./Time');

var _Time2 = _interopRequireDefault(_Time);

var _config = require('../helpers/config');

var defaultConfig = _interopRequireWildcard(_config);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Timepicker = exports.Timepicker = function (_React$Component) {
	_inherits(Timepicker, _React$Component);

	function Timepicker(props) {
		_classCallCheck(this, Timepicker);

		var _this = _possibleConstructorReturn(this, (Timepicker.__proto__ || Object.getPrototypeOf(Timepicker)).call(this, props));

		_this.state = _extends({}, (0, _parseTime2.default)(props.time), {
			unit: 'hour'

			// override any default styles
		});var config = Object.assign({}, defaultConfig, props.config);
		_this.config = config;

		_this.changeHour = _this.handleTimeChange.bind(_this, 'hour');
		_this.changeMinute = _this.handleTimeChange.bind(_this, 'minute');
		_this.changeUnit = _this.changeUnit.bind(_this);
		_this.changeMeridiem = _this.handleMeridiemChange.bind(_this);

		_this.timeChangeHandler = null;
		if (typeof props.onChange === 'function') {
			_this.timeChangeHandler = (0, _debounce2.default)(function () {
				_this.props.onChange(_this.getTime());
			}, 80);
		}
		return _this;
	}

	_createClass(Timepicker, [{
		key: 'componentWillReceiveProps',
		value: function componentWillReceiveProps(nextProps) {
			if (nextProps.time) {
				this.setState((0, _parseTime2.default)(nextProps.time));
			}
		}
	}, {
		key: 'getTime',
		value: function getTime() {
			var state = this.state;
			return (0, _composeTime2.default)(state.hour, state.minute, state.meridiem);
		}
	}, {
		key: 'handleTimeChange',
		value: function handleTimeChange(unit, val, canChangeUnit) {
			val = parseInt(val, 10);
			if (isNaN(val)) {
				return;
			}
			if (unit === 'hour' && val === 0) {
				val = 12;
			} else if (unit === 'minute' && val === 60) {
				val = 0;
			}

			this.setState(_defineProperty({}, unit, val), this.timeChangeHandler); // update time on parent

			var props = this.props;

			if (canChangeUnit && unit === 'hour' && props.switchToMinuteOnHourSelect) {
				this.changeUnit('minute');
			} else if (canChangeUnit && unit === 'minute' && props.closeOnMinuteSelect) {
				props.onDoneClick && props.onDoneClick();
				props.onCancelClick && props.onCancelClick();
			}
		}
	}, {
		key: 'handleMeridiemChange',
		value: function handleMeridiemChange(val) {
			if (val !== this.state.meridiem) {
				this.setState({
					meridiem: val
				}, this.timeChangeHandler); // update on parent
			}
		}
	}, {
		key: 'changeUnit',
		value: function changeUnit(newUnit) {
			var currentUnit = this.state.unit;
			if (currentUnit === newUnit) {
				return;
			}
			this.setState({ unit: newUnit });
		}
	}, {
		key: 'render',
		value: function render() {
			var config = this.config;
			var styles = {
				timePicker: {
					fontFamily: config.FONT_FAMILY,
					background: config.TIMEPICKER_BACKGROUND,
					borderRadius: '3px',
					display: 'inline-block',
					// boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
					boxShadow: '0 3px 6px rgba(0,0,0,0.13), 0 3px 6px rgba(0,0,0,0.19)', // bigger
					width: '260px',
					position: 'relative',
					userSelect: 'none'
				},
				doneButton: {
					display: 'block',
					margin: '0',
					float: 'left',
					width:'49%',
					borderRight: '1px solid' + config.DONE_BUTTON_BORDER_COLOR,
					color: config.DONE_BUTTON_COLOR,
					textTransform: 'uppercase',
					borderTop: '1px solid ' + config.DONE_BUTTON_BORDER_COLOR,
					textAlign: 'center',
					cursor: 'pointer',
					padding: '16px 0',
					fontSize: '13px',
					letterSpacing: '0.5px',
					lineHeight: 'normal',
					fontWeight: 500
				},
				cancelButton: {
					display: 'block',
					margin: '0',
					float: 'left',
					width:'49%',
					color: config.CANCEL_BUTTON_COLOR,
					textTransform: 'uppercase',
					borderTop: '1px solid ' + config.CANCEL_BUTTON_BORDER_COLOR,
					textAlign: 'center',
					cursor: 'pointer',
					padding: '16px 0',
					fontSize: '13px',
					letterSpacing: '0.5px',
					lineHeight: 'normal',
					fontWeight: 500
				}
				
			};

			var state = this.state;
			return _react2.default.createElement(
				_radium.StyleRoot,
				{ style: styles.timePicker, className: 'react-timekeeper' },
				_react2.default.createElement(
					'style',
					null,
					'\n\t\t\t\t\t.react-timekeeper {\n\t\t\t\t\t\t-webkit-tap-highlight-color: transparent;\n\t\t\t\t\t\t-webkit-font-smoothing: antialiased;\n\t\t\t\t\t\tfont-smoothing: antialiased;\n\t\t\t\t\t}\n\t\t\t\t\t.react-timekeeper-button-reset {\n\t\t\t\t\t\tbackground: 0;\n\t\t\t\t\t\tborder: 0;\n\t\t\t\t\t\tbox-shadow: none;\n\t\t\t\t\t\ttext-shadow: none;\n\t\t\t\t\t\t-webkit-appearance: none;\n\t\t\t\t\t\t-moz-appearance: none;\n\t\t\t\t\t\tcursor: pointer;\n\t\t\t\t\t}\n\t\t\t\t\t.react-timekeeper-button-reset:hover, .react-timekeeper-button-reset:focus, .react-timekeeper-button-reset:active {\n\t\t\t\t\t\toutline: none;\n\t\t\t\t\t}\n\t\t\t\t\t.react-timekeeper-button-reset::-moz-focus-inner {\n\t\t\t\t\t\tborder: 0;\n\t\t\t\t\t\tpadding: 0;\n\t\t\t\t\t}\n\t\t\t\t\t.react-timekeeper-noscroll {\n\t\t\t\t\t\toverflow: hidden;\n\t\t\t\t\t}\n\t\t\t\t\t.react-timekeeper-scrollbar-measure {\n\t\t\t\t\t\twidth: 100px;\n\t\t\t\t\t\theight: 100px;\n\t\t\t\t\t\toverflow: scroll;\n\t\t\t\t\t\tposition: absolute;\n\t\t\t\t\t\ttop: -9999px;\n\t\t\t\t\t}\n\t\t\t\t'
				),
				_react2.default.createElement(_Time2.default, {
					config: this.config,
					unit: state.unit,
					hour: state.hour,
					minute: state.minute,
					meridiem: state.meridiem,

					changeMeridiem: this.changeMeridiem,
					changeHour: this.changeHour,
					changeMinute: this.changeMinute,
					changeUnit: this.changeUnit
				}),
				_react2.default.createElement(_ClockWrapper2.default, {
					config: this.config,
					unit: state.unit,
					hour: state.hour,
					minute: state.minute,
					meridiem: state.meridiem,

					changeHour: this.changeHour,
					changeMinute: this.changeMinute,
					changeMeridiem: this.changeMeridiem
				}),
				this.props.onDoneClick && _react2.default.createElement(
					'span',
					{ style: styles.doneButton, onClick: this.props.onDoneClick },
					'Done'
				),
				this.props.onCancelClick && _react2.default.createElement(
					'span',
					{ style: styles.cancelButton, onClick: this.props.onCancelClick },
					'Cancel'
				)
			);
		}
	}]);

	return Timepicker;
}(_react2.default.Component);

Timepicker.propTypes = {
	time: _propTypes2.default.string,
	onChange: _propTypes2.default.func,

	onDoneClick: _propTypes2.default.func,
	onCancelClick: _propTypes2.default.func,
	switchToMinuteOnHourSelect: _propTypes2.default.bool,
	closeOnMinuteSelect: _propTypes2.default.bool,
	config: _propTypes2.default.object
};

exports.default = (0, _radium2.default)(Timepicker);