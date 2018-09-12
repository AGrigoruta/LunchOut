'use strict';

var _jsdom = require('jsdom');

global.document = (0, _jsdom.jsdom)('<!DOCTYPE HTML><html><body></body></html>');
global.window = document.defaultView;