import React from 'react';
import get from 'lodash/get'

class Searcher extends React.Component {
  state = {
    input: this.props.defaultValue
  }

  search = (items) => {
    const fields = this.props.fields;
    const input = this.state.input

    if (!input) {
      return items;
    }
    const regex = new RegExp(input, 'i');

    return items.filter(item => fields.reduce((acc, field) => acc || (get(item, field) && get(item, field).match(regex)), false));
  }

  handleChange = (value) => this.setState({ input: value })

  isAnyInput = () => {
    const input = this.state.input
    return input && input.length > 0
  }

  clear = () => this.setState({ input: this.props.defaultValue })

  render() {
    return this.props.children({
      search: this.search,
      input: this.state.input,
      handleChange: this.handleChange,
      isAnyInput: this.isAnyInput,
      clear: this.clear,
    })
  }
}

Searcher.defaultProps = {
  fields: ['name'],
  defaultValue: null,
};

export default Searcher;
