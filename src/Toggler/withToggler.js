import React, { Component } from 'react';
import { connect } from 'react-redux';

import Toggler from './selectors';
import Actions from './actions';

function getDisplayName(component) {
  return component.displayName || component.name || 'Component';
}

export default function withToggler (options = {}) {
  const { withRef = false, onlyActions = false, forKey = false } = options;

  return function Wrapper(WrappedComponent) {

    class WithToggler extends Component {
      getWrappedInstance() {
        if (!withRef) {
          console.error(
            'To access the wrapped instance, you need to specify ' +
            '{ withRef: true } as the second argument of the translate() call.'
          );
        }

        return this.refs.wrappedInstance;
      }

      render() {
        const extraProps = {};

        if (withRef) {
          extraProps.ref = 'wrappedInstance';
        }

        let mapStateToProps, mapDispatchToProps

        if (forKey) {
          mapStateToProps = (state) => {
            return ({
            [`${forKey}Active`]: Toggler.getByKey(forKey)(state)
          })
          }
          mapDispatchToProps = (dispatch) => ({
            [`${forKey}Toggle`]: (value) => dispatch(Actions.toggle(forKey, value))
          })
        } else {
          mapStateToProps = (state) => ({
            togglerState: Toggler.all(state)
          })
          mapDispatchToProps = (dispatch) => ({
            toggle: (key, value) => dispatch(Actions.toggle(key, value))
          })
        }

        if (onlyActions) {
          return React.createElement(
            connect(null, mapDispatchToProps)(WrappedComponent),
            { ...this.props, ...extraProps }
          );
        }

        return React.createElement(
          connect(mapStateToProps, mapDispatchToProps)(WrappedComponent),
          { ...this.props, ...extraProps }
        );
      }
    }

    WithToggler.WrappedComponent = WrappedComponent;

    WithToggler.displayName = 'withToggler(' + getDisplayName(WrappedComponent) + ')';

    return WithToggler
  };
}
