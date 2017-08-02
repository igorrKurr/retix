'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _actionTypes = require('./action-types');

var _actionTypes2 = _interopRequireDefault(_actionTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  toggle: function toggle(key, value) {
    return {
      type: _actionTypes2.default.toggle,
      key: key,
      value: value
    };
  }
};