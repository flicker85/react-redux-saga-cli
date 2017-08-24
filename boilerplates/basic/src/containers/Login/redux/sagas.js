import { call, takeEvery, take, cancel, fork, put } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
import { LOGIN } from './constants';
import { UPDATE_USER } from '../../App/redux/constants';

function *init() {
  yield takeEvery(LOGIN, function *({ uid, pwd, callback: { success, fail } }) {
    if(uid === 'admin' && pwd === '123') {
      yield put({ type: UPDATE_USER, uid });
      success();
    } else {
      fail();
    }
  });
}

function *sagas() {
  const task = yield fork(init);
  // exit current task when route change.
  yield take(LOCATION_CHANGE);
  yield cancel(task);
}

export default [sagas];

