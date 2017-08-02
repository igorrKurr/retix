import React from 'react';

class Switcher extends React.Component {
  state = {
    active: this.props.defaultValue,
  }

  switch = (active) => {
    this.setState({ active })
  }

  render() {
    const children = this.props.children
    return children({ switch: this.switch, active: this.state.active })
  }
}

Switcher.defaultProps = {
  defaultValue: false,
}

export default Switcher;
