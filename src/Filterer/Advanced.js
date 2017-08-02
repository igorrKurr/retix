import React from 'react';
import get from 'lodash/get'
import findIndex from 'lodash/findIndex';
import isEqual from 'lodash/isEqual';
import gte from 'lodash/gte';
import lte from 'lodash/lte';
import gt from 'lodash/gt';
import lt from 'lodash/lt';
import startCase from 'lodash/startCase';

const filterTmpl = {
  value: '',
  operator: '',
  field: '',
  type: null,
}

const number = 'number'
const string = 'string'
const date = 'date'
const bool = 'bool'

const genId = () => Date.now()

const filterReady = (filter) =>
  filter.operator && filter.field && filter.value && filter.type

const isEmpty = (val) => val === null || val === undefined || val === ''
const isPresent = (val) => !isEmpty(val)
const parseByType = (value, type) => {
  if (type === number) {
    return Number(value)
  }
  return value
}

class Advanced extends React.Component {
  state = {
    filters: this.props.defaultValue,
  }

  filter = (items) => {
    const filters = this.state.filters;
    const ready = filters.filter(filterReady)

    if (ready.length === 0) {
      return items;
    }

    return items.filter(item =>
      ready.reduce((acc, filter) => {
        const operation = Advanced.Operations[filter.operator]
        const field = filter.field
        const filterType = filter.type
        let fieldValue = get(item, field)
        fieldValue = isPresent(fieldValue) && parseByType(fieldValue, filterType)
        const current = isPresent(fieldValue) && operation.fn(fieldValue, parseByType(filter.value, filterType))
        return acc && current
      }, true));
  }

  addFilter = () => {
    const filters = this.state.filters
    this.setState({ filters: [ ...filters, { ...filterTmpl, id: genId() } ]})
  }

  removeFilter = (id) => {
    const filters = this.state.filters
    this.setState({ filters: filters.filter(item => item.id !== id) })
  }

  clear = () => {
    this.setState({ filters: this.props.defaultValue })
  }

  handleChange = (id, prop, value) => {
    const filters = this.state.filters
    const currentIndex = findIndex(filters, filter => filter.id === id)

    if (currentIndex > -1) {
      filters[currentIndex] = {
        ...filters[currentIndex],
        [prop]: value
      }
      this.setState({ filters })
    }
  }

  load = (filters) => {
    this.setState({ filters })
  }

  render() {
    return this.props.children({
      filters: this.state.filters,
      filter: this.filter,
      clear: this.clear,
      addFilter: this.addFilter,
      removeFilter: this.removeFilter,
      handleChange: this.handleChange,
      load: this.load,
    })
  }
}

Advanced.Types = {
  number,
  string,
  date,
  bool,
}

const OperationsFn = {
  eq: (x, y) => isEqual(x.toString(), y.toString()),
  gt,
  lt,
  lte,
  gte,
  match: (x, y) => {
    if (!x || !y) {
      return false
    }
    const regex = new RegExp(y, 'i');
    return x.match(regex)
  },
  exists: (x) => isPresent(x),
}

const Operations = {
  eq: {
    id: 'eq',
    name: 'Equals',
    fn: OperationsFn.eq,
  },
  gt: {
    id: 'gt',
    name: 'Greater',
    fn: OperationsFn.gt,
  },
  lt: {
    id: 'lt',
    name: 'Less',
    fn: OperationsFn.lt,
  },
  gte: {
    id: 'gte',
    name: 'Greater or equals',
    fn: OperationsFn.gte,
  },
  lte: {
    id: 'lte',
    name: 'Less or equals',
    fn: OperationsFn.lte,
  },
  match: {
    id: 'match',
    name: 'Like',
    fn: OperationsFn.match,
  },
  exists: {
    id: 'exists',
    name: 'Exists',
    fn: OperationsFn.exists,
  },
}

Advanced.Operations = Operations

const operationsByType = {
  [number]: [
    Operations.eq,
    Operations.lt,
    Operations.gt,
    Operations.lte,
    Operations.gte,
  ],
  [string]: [
    Operations.eq,
    Operations.match,
    Operations.exists,
  ],
  [date]: [
    Operations.eq,
    Operations.lte,
    Operations.gte,
  ],
  [bool]: [
    Operations.exists,
  ],
}

const operationsFor = (field) => {
  const candidat = operationsByType[field]
  if (!candidat) {
    return []
  }
  return candidat
}

Advanced.operationsFor = operationsFor

class Model {
  constructor(model) {
    this.model = model
  }

  fields = () => {
    const model = this.model

    return Object.keys(model).map(key => ({
      id: key,
      name: startCase(key),
      type: model[key],
    }))
  }
}

Advanced.Model = Model

Advanced.defaultProps = {
  defaultValue: [],
  ignore: ['all']
}

export default Advanced;
