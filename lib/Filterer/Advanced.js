'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _operationsByType;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _get = require('lodash/get');

var _get2 = _interopRequireDefault(_get);

var _findIndex = require('lodash/findIndex');

var _findIndex2 = _interopRequireDefault(_findIndex);

var _isEqual = require('lodash/isEqual');

var _isEqual2 = _interopRequireDefault(_isEqual);

var _gte = require('lodash/gte');

var _gte2 = _interopRequireDefault(_gte);

var _lte = require('lodash/lte');

var _lte2 = _interopRequireDefault(_lte);

var _gt = require('lodash/gt');

var _gt2 = _interopRequireDefault(_gt);

var _lt = require('lodash/lt');

var _lt2 = _interopRequireDefault(_lt);

var _startCase = require('lodash/startCase');

var _startCase2 = _interopRequireDefault(_startCase);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var filterTmpl = {
  value: '',
  operator: '',
  field: '',
  type: null
};

var number = 'number';
var string = 'string';
var date = 'date';
var bool = 'bool';

var genId = function genId() {
  return Date.now();
};

var filterReady = function filterReady(filter) {
  return filter.operator && filter.field && filter.value && filter.type;
};

var isEmpty = function isEmpty(val) {
  return val === null || val === undefined || val === '';
};
var isPresent = function isPresent(val) {
  return !isEmpty(val);
};
var parseByType = function parseByType(value, type) {
  if (type === number) {
    return Number(value);
  }
  return value;
};

var Advanced = function (_React$Component) {
  _inherits(Advanced, _React$Component);

  function Advanced() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Advanced);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Advanced.__proto__ || Object.getPrototypeOf(Advanced)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      filters: _this.props.defaultValue
    }, _this.filter = function (items) {
      var filters = _this.state.filters;
      var ready = filters.filter(filterReady);

      if (ready.length === 0) {
        return items;
      }

      return items.filter(function (item) {
        return ready.reduce(function (acc, filter) {
          var operation = Advanced.Operations[filter.operator];
          var field = filter.field;
          var filterType = filter.type;
          var fieldValue = (0, _get2.default)(item, field);
          fieldValue = isPresent(fieldValue) && parseByType(fieldValue, filterType);
          var current = isPresent(fieldValue) && operation.fn(fieldValue, parseByType(filter.value, filterType));
          return acc && current;
        }, true);
      });
    }, _this.addFilter = function () {
      var filters = _this.state.filters;
      _this.setState({ filters: [].concat(_toConsumableArray(filters), [_extends({}, filterTmpl, { id: genId() })]) });
    }, _this.removeFilter = function (id) {
      var filters = _this.state.filters;
      _this.setState({ filters: filters.filter(function (item) {
          return item.id !== id;
        }) });
    }, _this.clear = function () {
      _this.setState({ filters: _this.props.defaultValue });
    }, _this.handleChange = function (id, prop, value) {
      var filters = _this.state.filters;
      var currentIndex = (0, _findIndex2.default)(filters, function (filter) {
        return filter.id === id;
      });

      if (currentIndex > -1) {
        filters[currentIndex] = _extends({}, filters[currentIndex], _defineProperty({}, prop, value));
        _this.setState({ filters: filters });
      }
    }, _this.load = function (filters) {
      _this.setState({ filters: filters });
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Advanced, [{
    key: 'render',
    value: function render() {
      return this.props.children({
        filters: this.state.filters,
        filter: this.filter,
        clear: this.clear,
        addFilter: this.addFilter,
        removeFilter: this.removeFilter,
        handleChange: this.handleChange,
        load: this.load
      });
    }
  }]);

  return Advanced;
}(_react2.default.Component);

Advanced.Types = {
  number: number,
  string: string,
  date: date,
  bool: bool
};

var OperationsFn = {
  eq: function eq(x, y) {
    return (0, _isEqual2.default)(x.toString(), y.toString());
  },
  gt: _gt2.default,
  lt: _lt2.default,
  lte: _lte2.default,
  gte: _gte2.default,
  match: function match(x, y) {
    if (!x || !y) {
      return false;
    }
    var regex = new RegExp(y, 'i');
    return x.match(regex);
  },
  exists: function exists(x) {
    return isPresent(x);
  }
};

var Operations = {
  eq: {
    id: 'eq',
    name: 'Equals',
    fn: OperationsFn.eq
  },
  gt: {
    id: 'gt',
    name: 'Greater',
    fn: OperationsFn.gt
  },
  lt: {
    id: 'lt',
    name: 'Less',
    fn: OperationsFn.lt
  },
  gte: {
    id: 'gte',
    name: 'Greater or equals',
    fn: OperationsFn.gte
  },
  lte: {
    id: 'lte',
    name: 'Less or equals',
    fn: OperationsFn.lte
  },
  match: {
    id: 'match',
    name: 'Like',
    fn: OperationsFn.match
  },
  exists: {
    id: 'exists',
    name: 'Exists',
    fn: OperationsFn.exists
  }
};

Advanced.Operations = Operations;

var operationsByType = (_operationsByType = {}, _defineProperty(_operationsByType, number, [Operations.eq, Operations.lt, Operations.gt, Operations.lte, Operations.gte]), _defineProperty(_operationsByType, string, [Operations.eq, Operations.match, Operations.exists]), _defineProperty(_operationsByType, date, [Operations.eq, Operations.lte, Operations.gte]), _defineProperty(_operationsByType, bool, [Operations.exists]), _operationsByType);

var operationsFor = function operationsFor(field) {
  var candidat = operationsByType[field];
  if (!candidat) {
    return [];
  }
  return candidat;
};

Advanced.operationsFor = operationsFor;

var Model = function Model(model) {
  _classCallCheck(this, Model);

  _initialiseProps.call(this);

  this.model = model;
};

var _initialiseProps = function _initialiseProps() {
  var _this2 = this;

  this.fields = function () {
    var model = _this2.model;

    return Object.keys(model).map(function (key) {
      return {
        id: key,
        name: (0, _startCase2.default)(key),
        type: model[key]
      };
    });
  };
};

Advanced.Model = Model;

Advanced.defaultProps = {
  defaultValue: [],
  ignore: ['all']
};

exports.default = Advanced;