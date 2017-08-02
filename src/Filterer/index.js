import React from 'react';
import get from 'lodash/get'

import Advanced from './Advanced';

class Filterer extends React.Component {
  state = {
    filters: this.props.defaultValue
  }

  filter = (items) => {
    const filters = this.state.filters;
    const fields = Object.keys(filters)

    if (fields.length === 0) {
      return items;
    }

    const ignore = this.props.ignore
    const activeFields = fields.filter(field => !ignore.includes(filters[field]))

    if (activeFields.length === 0) {
      return items;
    }

    return items.filter(item =>
      activeFields.reduce((acc, field) => {
        const current = get(item, field) && get(item, field) === filters[field]
        return acc && current
      }, true));
  }

  handleChange = (key, value) => {
    const filters = this.state.filters
    this.setState({ filters: { ...filters, [key]: value } })
  }

  clear = () => {
    this.setState({ filters: this.props.defaultValue })
  }

  anyFilters = () => {
    const filters = this.state.filters;
    const fields = Object.keys(filters)
    const values = Object.values(filters)
    const ignore = this.props.ignore

    const excludeIgnore = values.reduce((acc, item) => {
      return acc && ignore.includes(item)
    }, true)

    return fields.length > 0 && !excludeIgnore
  }

  hasFilter = (filter) => {
    const filters = this.state.filters;

    return !!filters[filter]
  }

  render() {
    return this.props.children({
      filters: this.state.filters,
      filter: this.filter,
      handleChange: this.handleChange,
      clear: this.clear,
      anyFilters: this.anyFilters,
      hasFilter: this.hasFilter,
    })
  }
}

Filterer.defaultProps = {
  defaultValue: {},
  ignore: ['all']
}

Filterer.Advanced = Advanced

export default Filterer;
