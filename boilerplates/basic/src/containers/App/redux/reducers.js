import { combineReducers } from 'redux';
import { SIDER_COLLAPSED, UPDATE_USER, LOGOUT } from './constants';

function collapsed(state = false, { type, payload }) {
  switch (type) {
    case SIDER_COLLAPSED:
      return payload;
    default:
      return state;
  }
}

function user(state = {}, { type, uid }) {
  switch (type) {
    case UPDATE_USER:
      return { name: uid, role: 'admin' };
    case LOGOUT:
      return {};
    default:
      return state;
  }
}

const reducer = combineReducers({
  user,
  collapsed,
});

export default reducer;