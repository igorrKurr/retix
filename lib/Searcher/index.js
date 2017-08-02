'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _get = require('lodash/get');

var _get2 = _interopRequireDefault(_get);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Searcher = function (_React$Component) {
  _inherits(Searcher, _React$Component);

  function Searcher() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Searcher);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Searcher.__proto__ || Object.getPrototypeOf(Searcher)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      input: _this.props.defaultValue
    }, _this.search = function (items) {
      var fields = _this.props.fields;
      var input = _this.state.input;

      if (!input) {
        return items;
      }
      var regex = new RegExp(input, 'i');

      return items.filter(function (item) {
        return fields.reduce(function (acc, field) {
          return acc || (0, _get2.default)(item, field) && (0, _get2.default)(item, field).match(regex);
        }, false);
      });
    }, _this.handleChange = function (value) {
      return _this.setState({ input: value });
    }, _this.isAnyInput = function () {
      var input = _this.state.input;
      return input && input.length > 0;
    }, _this.clear = function () {
      return _this.setState({ input: _this.props.defaultValue });
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Searcher, [{
    key: 'render',
    value: function render() {
      return this.props.children({
        search: this.search,
        input: this.state.input,
        handleChange: this.handleChange,
        isAnyInput: this.isAnyInput,
        clear: this.clear
      });
    }
  }]);

  return Searcher;
}(_react2.default.Component);

Searcher.defaultProps = {
  fields: ['name'],
  defaultValue: null
};

exports.default = Searcher;