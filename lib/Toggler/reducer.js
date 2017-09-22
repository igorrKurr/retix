'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _seamlessImmutable = require('seamless-immutable');

var _seamlessImmutable2 = _interopRequireDefault(_seamlessImmutable);

var _actionTypes = require('./action-types');

var _actionTypes2 = _interopRequireDefault(_actionTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var initialState = (0, _seamlessImmutable2.default)({});

var ACTION_HANDLERS = _defineProperty({}, _actionTypes2.default.toggle, function (state, _ref) {
  var key = _ref.key,
      value = _ref.value;
  return state.set(key, value);
});

exports.default = {
  toggler: function togglerReducer() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
    var action = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    var handler = ACTION_HANDLERS[action.type];
    return handler ? handler(state, action) : state;
  }
};