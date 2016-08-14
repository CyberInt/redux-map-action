(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["mapAction"] = factory();
	else
		root["mapAction"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

	var nullReducer = function nullReducer(state) {
	  return typeof state === 'undefined' ? null : state;
	};

	/**
	 * Creates a higher-order reducer which map actions before passing to a reducer
	 * Specify a list of action types to whitelist actions for mapping.
	 *
	 * mapAction(
	 *   actionMapper: (action: Object) => newAction: Object,
	 *   actionTypes: ?Array<string>
	 * ): (reducer) => reducer
	 */
	var mapAction = function mapAction(actionMapper) {
	  var actionTypes = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];

	  var actionTypesDict = actionTypes && actionTypes.reduce(function (dict, actionType) {
	    return _extends({}, dict, _defineProperty({}, actionType, true));
	  }, {});

	  return function () {
	    var reducer = arguments.length <= 0 || arguments[0] === undefined ? nullReducer : arguments[0];
	    return function (state, action) {
	      if (actionTypes && !actionTypesDict[action.type]) {
	        return reducer(state, action);
	      }

	      return reducer(state, actionMapper(action));
	    };
	  };
	};

	exports.default = mapAction;

/***/ }
/******/ ])
});
;