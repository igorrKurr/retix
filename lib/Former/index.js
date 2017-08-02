'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _set = require('lodash/set');

var _set2 = _interopRequireDefault(_set);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var clearProps = function clearProps(obj) {
  return Object.keys(obj).reduce(function (acc, n) {
    return _extends({}, acc, _defineProperty({}, n, ''));
  }, {});
};

var proxifier = {
  get: function get(target, name) {
    return name in target ? target[name] : '';
  }
};

var proxify = function proxify(obj) {
  return new Proxy(obj, proxifier);
};

var Former = function (_React$Component) {
  _inherits(Former, _React$Component);

  function Former() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Former);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Former.__proto__ || Object.getPrototypeOf(Former)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      form: _this.props.defaultValue,
      submitted: false,
      dirty: false
    }, _this.handleChange = function (field, value) {
      var form = (0, _set2.default)(_extends({}, _this.state.form), field, value);
      _this.setState({
        form: form,
        dirty: true
      });
    }, _this.handleChangeInput = function (field) {
      return function (evt) {
        return _this.handleChange(field, evt.target.value);
      };
    }, _this.clear = function () {
      return _this.setState({ form: _this.props.defaultValue, dirty: false });
    }, _this.onSubmit = function (handleSubmit) {
      handleSubmit(_this.state.form);

      _this.setState({ dirty: false });
      _this.setState({ submitted: true });
      _this.markAsClean();
    }, _this.markAsDirty = function () {
      return _this.setState({ dirty: true });
    }, _this.markAsClean = function () {
      return _this.setState({ dirty: false });
    }, _this.markAsSubmitted = function () {
      return _this.setState({ submitted: true });
    }, _this.markAsUnsubmitted = function () {
      return _this.setState({ submitted: false });
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Former, [{
    key: 'render',
    value: function render() {
      return this.props.children({
        form: proxify(this.state.form),
        dirty: this.state.dirty,
        submitted: this.state.submitted,
        clear: this.clear,
        handleChange: this.handleChange,
        handleChangeInput: this.handleChangeInput,
        onSubmit: this.onSubmit,
        markAsUnsubmitted: this.markAsUnsubmitted,
        markAsSubmitted: this.markAsSubmitted,
        markAsDirty: this.markAsDirty,
        markAsClean: this.markAsClean
      });
    }
  }]);

  return Former;
}(_react2.default.Component);

Former.defaultProps = {
  defaultValue: {}
};

exports.default = Former;