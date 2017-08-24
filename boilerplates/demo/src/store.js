import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import createSagaMiddleware from 'redux-saga';
import createReducer from './reducers';

const sagaMiddleware = createSagaMiddleware();

export default function configureStore(initialState = {}, history) {
  const middlewares = [
    sagaMiddleware,
    routerMiddleware(history),
  ];

  const composeEnhancers = 
    process.env.NODE_ENV !== "production" && 
    typeof window === "object" && 
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ? 
      window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : compose;
  
  const enhancer = composeEnhancers(
    applyMiddleware(...middlewares),
  );

  const store = createStore(
    createReducer(),
    initialState,
    enhancer
  );

  store.runSaga = sagaMiddleware.run;
  store.asyncReducers = {};
  
  return store;
}