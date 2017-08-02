import React from 'react';

class Toggler extends React.Component {
  state = {
    active: this.props.defaultValue
  }

  _change = (value) => {
    this.setState({ active: value })

    const onChange = this.props.onChange
    if (onChange) {
      onChange(value)
    }
  }

  toggle = () => {
    const nextState = !this.state.active
    this._change(nextState)
  }

  activate = () => this._change(true)
  desactivate = () => this._change(false)

  render() {
    return this.props.children({
      toggle: this.toggle,
      activate: this.activate,
      desactivate: this.desactivate,
      active: this.state.active,
    })
  }
}

Toggler.defaultProps = {
  defaultValue: false
}

export default Toggler
