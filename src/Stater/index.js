import React from 'react'

const proxifier = {
  get(target, name) {
    return name in target ? target[name] : ''
  }
}

const proxify = (obj) => new Proxy(obj, proxifier)

class Stater extends React.Component {
  state = {}

  handleChange = (field, value) => this.setState({
    ...this.state,
    [field]: value
  })

  clear = () => this.setState({})

  render() {
    return this.props.children({
      ...proxify(this.state),
      handleChange: this.handleChange,
      clear: this.clear,
    })
  }
}

export default Stater
