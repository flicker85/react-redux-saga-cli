import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import reducer from './containers/App/redux/reducers';

export default function createReducer(asyncReducers) {
  return combineReducers({
    routing: routerReducer,
    global: reducer,
    ...asyncReducers,
  });
}