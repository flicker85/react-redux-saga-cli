import { take, cancel, fork, call, put, takeEvery } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
import * as service from './services';
import { TEST } from './constants';

function *init() {
  const { data } = yield call(service.test);
  yield put({ type: TEST, payload: data });
  // yield takeEvery('xxx', function *() {
  //   console.log('xxx');
  // });
}

function *sagas() {
  const task = yield fork(init);
  yield take(LOCATION_CHANGE);
  yield cancel(task);
}

export default [sagas];

