'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _get = require('lodash/get');

var _get2 = _interopRequireDefault(_get);

var _Advanced = require('./Advanced');

var _Advanced2 = _interopRequireDefault(_Advanced);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Filterer = function (_React$Component) {
  _inherits(Filterer, _React$Component);

  function Filterer() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Filterer);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Filterer.__proto__ || Object.getPrototypeOf(Filterer)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      filters: _this.props.defaultValue
    }, _this.filter = function (items) {
      var filters = _this.state.filters;
      var fields = Object.keys(filters);

      if (fields.length === 0) {
        return items;
      }

      var ignore = _this.props.ignore;
      var activeFields = fields.filter(function (field) {
        return !ignore.includes(filters[field]);
      });

      if (activeFields.length === 0) {
        return items;
      }

      return items.filter(function (item) {
        return activeFields.reduce(function (acc, field) {
          var current = (0, _get2.default)(item, field) && (0, _get2.default)(item, field) === filters[field];
          return acc && current;
        }, true);
      });
    }, _this.handleChange = function (key, value) {
      var filters = _this.state.filters;
      _this.setState({ filters: _extends({}, filters, _defineProperty({}, key, value)) });
    }, _this.clear = function () {
      _this.setState({ filters: _this.props.defaultValue });
    }, _this.anyFilters = function () {
      var filters = _this.state.filters;
      var fields = Object.keys(filters);
      var values = Object.values(filters);
      var ignore = _this.props.ignore;

      var excludeIgnore = values.reduce(function (acc, item) {
        return acc && ignore.includes(item);
      }, true);

      return fields.length > 0 && !excludeIgnore;
    }, _this.hasFilter = function (filter) {
      var filters = _this.state.filters;

      return !!filters[filter];
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Filterer, [{
    key: 'render',
    value: function render() {
      return this.props.children({
        filters: this.state.filters,
        filter: this.filter,
        handleChange: this.handleChange,
        clear: this.clear,
        anyFilters: this.anyFilters,
        hasFilter: this.hasFilter
      });
    }
  }]);

  return Filterer;
}(_react2.default.Component);

Filterer.defaultProps = {
  defaultValue: {},
  ignore: ['all']
};

Filterer.Advanced = _Advanced2.default;

exports.default = Filterer;