import { take, cancel, fork, call, put, takeEvery } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
import * as service from './services';
import { TABLE, CREATE, REMOVE, EDIT } from './constants';

function *init() {
  yield fetchTable();
  yield takeEvery(CREATE, function *({ payload: values }) {
    yield call(service.create, values);
    yield fetchTable();
  });
  yield takeEvery(REMOVE, function *({ payload: id }) {
    yield call(service.remove, id);
    yield fetchTable();
  });
  yield takeEvery(EDIT, function *({ payload: { id, values } }) {
    yield call(service.edit, id, values);
    yield fetchTable();
  });
}

function *fetchTable() {
  const table = yield call(service.table);
  yield put({ type: TABLE, payload: table });
}

function *sagas() {
  const task = yield fork(init);
  yield take(LOCATION_CHANGE);
  yield cancel(task);
}

export default [sagas];

