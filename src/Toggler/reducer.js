import Immutable from 'seamless-immutable';
import ActionTypes from './action-types';

const initialState = Immutable({});

const ACTION_HANDLERS = {
  [ActionTypes.toggle]: (state, { key, value }) => state.set(key, value),
};

export default {
  toggler: function togglerReducer(state = initialState, action = {}) {
    const handler = ACTION_HANDLERS[action.type];
    return handler ? handler(state, action) : state;
  }
}
