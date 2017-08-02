import ActionTypes from './action-types';

export default {
  toggle: (key, value) => ({
    type: ActionTypes.toggle,
    key,
    value,
  })
}
