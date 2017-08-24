import { combineReducers } from 'redux';
import { RESET, TEST } from './constants';

function test(state = '', { type, payload}) {
  switch (type) {
    case TEST:
      return payload;
    default:
      return state;
  }
}

const combine = combineReducers({
  test,
});

function reducer(state, action) {
  if(action.type === RESET) {
    state = undefined;
  }
  return combine(state, action);
}

export default reducer;