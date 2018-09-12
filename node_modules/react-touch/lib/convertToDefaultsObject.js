'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _isArray = require('lodash/isArray');

var _isArray2 = _interopRequireDefault(_isArray);

var _isObject = require('lodash/isObject');

var _isObject2 = _interopRequireDefault(_isObject);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var convertToDefaultsObject = function convertToDefaultsObject(value) {
  var mainKey = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'main';
  var defaultValues = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

  if ((0, _isArray2.default)(value) || !(0, _isObject2.default)(value)) {
    return _extends({}, defaultValues, _defineProperty({}, mainKey, value));
  }
  return _extends({}, defaultValues, value);
};

exports.default = convertToDefaultsObject;