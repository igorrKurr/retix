import { createSelector } from 'reselect';

const togglerSelector = state => state.toggler

export const allSelector = togglerSelector

export const getByKeySelector = (key) => createSelector(
  [allSelector],
  (state) => state[key]
)

export default {
  all: allSelector,
  getByKey: getByKeySelector,
}
