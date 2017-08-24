import { combineReducers } from 'redux';
import { RESET, TABLE } from './constants';

function table(state = [], { type, payload }) {
  switch (type) {
    case TABLE:
      return payload;
    default:
      return state;
  }
}

const combine = combineReducers({
  table,
});

function reducer(state, action) {
  if(action.type === RESET) {
    state = undefined;
  }
  return combine(state, action);
}

export default reducer;