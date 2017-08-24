import createReducer from '../reducers';

export function injectAsyncReducer(store) {
  return function injectReducer(name, asyncReducer) {
    if(store.asyncReducers[name] !== undefined) return;
    store.asyncReducers[name] = asyncReducer;
    store.replaceReducer(createReducer(store.asyncReducers));
  };
}

export function injectAsyncSagas(store) {
  return function injectSagas(sagas) {
    sagas.forEach(store.runSaga);
  };
}

export default function getAsyncInjectors(store) {
  return {
    injectReducer: injectAsyncReducer(store),
    injectSagas: injectAsyncSagas(store)
  };
}
