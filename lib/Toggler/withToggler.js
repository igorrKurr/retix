'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.default = withToggler;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _selectors = require('./selectors');

var _selectors2 = _interopRequireDefault(_selectors);

var _actions = require('./actions');

var _actions2 = _interopRequireDefault(_actions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function getDisplayName(component) {
  return component.displayName || component.name || 'Component';
}

function withToggler() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var _options$withRef = options.withRef,
      withRef = _options$withRef === undefined ? false : _options$withRef,
      _options$onlyActions = options.onlyActions,
      onlyActions = _options$onlyActions === undefined ? false : _options$onlyActions,
      _options$forKey = options.forKey,
      forKey = _options$forKey === undefined ? false : _options$forKey;


  return function Wrapper(WrappedComponent) {
    var WithToggler = function (_Component) {
      _inherits(WithToggler, _Component);

      function WithToggler() {
        _classCallCheck(this, WithToggler);

        return _possibleConstructorReturn(this, (WithToggler.__proto__ || Object.getPrototypeOf(WithToggler)).apply(this, arguments));
      }

      _createClass(WithToggler, [{
        key: 'getWrappedInstance',
        value: function getWrappedInstance() {
          if (!withRef) {
            console.error('To access the wrapped instance, you need to specify ' + '{ withRef: true } as the second argument of the translate() call.');
          }

          return this.refs.wrappedInstance;
        }
      }, {
        key: 'render',
        value: function render() {
          var extraProps = {};

          if (withRef) {
            extraProps.ref = 'wrappedInstance';
          }

          var mapStateToProps = void 0,
              mapDispatchToProps = void 0;

          if (forKey) {
            mapStateToProps = function mapStateToProps(state) {
              return _defineProperty({}, forKey + 'Active', _selectors2.default.getByKey(forKey)(state));
            };
            mapDispatchToProps = function mapDispatchToProps(dispatch) {
              return _defineProperty({}, forKey + 'Toggle', function undefined(value) {
                return dispatch(_actions2.default.toggle(forKey, value));
              });
            };
          } else {
            mapStateToProps = function mapStateToProps(state) {
              return {
                togglerState: _selectors2.default.all(state)
              };
            };
            mapDispatchToProps = function mapDispatchToProps(dispatch) {
              return {
                toggle: function toggle(key, value) {
                  return dispatch(_actions2.default.toggle(key, value));
                }
              };
            };
          }

          if (onlyActions) {
            return _react2.default.createElement((0, _reactRedux.connect)(null, mapDispatchToProps)(WrappedComponent), _extends({}, this.props, extraProps));
          }

          return _react2.default.createElement((0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(WrappedComponent), _extends({}, this.props, extraProps));
        }
      }]);

      return WithToggler;
    }(_react.Component);

    WithToggler.WrappedComponent = WrappedComponent;

    WithToggler.displayName = 'withToggler(' + getDisplayName(WrappedComponent) + ')';

    return WithToggler;
  };
}