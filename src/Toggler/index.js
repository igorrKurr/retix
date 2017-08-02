import Toggler from './Toggler';
import withToggler from './withToggler';

Toggler.connect = withToggler

export default Toggler

export { Toggler }
export { withToggler }

export { default as selectors } from './selectors'
export { default as actions } from './actions'
export { default as reducer } from './reducer'
