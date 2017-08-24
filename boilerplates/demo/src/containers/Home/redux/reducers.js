import { combineReducers } from 'redux';
import { RESET, CHART, TABLE } from './constants';

function chart(state = {}, { type, payload }) {
  switch (type) {
    case CHART:
      return payload;
    default:
      return state;
  }
}

function table(state = [], { type, payload }) {
  switch (type) {
    case TABLE:
      return payload;
    default:
      return state;
  }
}

const combine = combineReducers({
  chart,
  table,
});

function reducer(state, action) {
  if(action.type === RESET) {
    state = undefined;
  }
  return combine(state, action);
}

export default reducer;