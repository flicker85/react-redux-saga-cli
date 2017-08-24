import { call, takeEvery, take, cancel, fork, put } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
import * as service from './services';
import { CHART, TABLE } from './constants';

function *init() {
  const [chart, table] = yield [call(service.chart), call(service.table)];
  yield put({ type: CHART, payload: chart });
  yield put({ type: TABLE, payload: table });
}

function *sagas() {
  const task = yield fork(init);
  // exit current task when route change.
  yield take(LOCATION_CHANGE);
  yield cancel(task);
}

export default [sagas];

