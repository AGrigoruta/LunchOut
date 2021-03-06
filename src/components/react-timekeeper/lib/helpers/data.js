'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var hours = Array.apply(null, { length: 12 }).map(function (a, i) {
	return (i + 1).toString();
});
var minutes = Array.apply(null, { length: 60 }).map(function (a, i) {
	return i.toString();
});
var CLOCK_DATA = exports.CLOCK_DATA = {
	hour: {
		numbers: hours,
		dropdownOptions: hours,
		increments: 12
	},
	minute: {
		numbers: ['05', 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, '00'].map(function (a) {
			return a.toString();
		}),
		dropdownOptions: minutes,
		increments: 60
	}
};