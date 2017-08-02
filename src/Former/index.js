import React from 'react';
import set from 'lodash/set';

const clearProps = (obj) => Object.keys(obj).reduce((acc, n) => ({ ...acc, [n]: ''}), {})

const proxifier = {
  get(target, name) {
    return name in target ? target[name] : ''
  }
}

const proxify = (obj) => new Proxy(obj, proxifier)

class Former extends React.Component {
  state = {
    form: this.props.defaultValue,
    submitted: false,
    dirty: false
  }

  handleChange = (field, value) => {
    const form = set({...this.state.form}, field, value);
    this.setState({
      form,
      dirty: true
    })
  }

  handleChangeInput = (field) => (evt) => this.handleChange(field, evt.target.value)

  clear = () => this.setState({ form: this.props.defaultValue, dirty: false })

  onSubmit = (handleSubmit) => {
    handleSubmit(this.state.form);

    this.setState({ dirty: false })
    this.setState({ submitted: true })
    this.markAsClean()
  }

  markAsDirty = () => this.setState({ dirty: true })
  markAsClean = () => this.setState({ dirty: false })

  markAsSubmitted = () => this.setState({ submitted: true })
  markAsUnsubmitted = () => this.setState({ submitted: false })


  render() {
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
      markAsClean: this.markAsClean,
    })
  }
}

Former.defaultProps = {
  defaultValue: {}
}

export default Former
