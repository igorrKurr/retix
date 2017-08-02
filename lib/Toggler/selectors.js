'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getByKeySelector = exports.allSelector = undefined;

var _reselect = require('reselect');

var togglerSelector = function togglerSelector(state) {
  return state.toggler;
};

var allSelector = exports.allSelector = togglerSelector;

var getByKeySelector = exports.getByKeySelector = function getByKeySelector(key) {
  return (0, _reselect.createSelector)([allSelector], function (state) {
    return state[key];
  });
};

exports.default = {
  all: allSelector,
  getByKey: getByKeySelector
};