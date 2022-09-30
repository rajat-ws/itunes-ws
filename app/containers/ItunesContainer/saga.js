import { call, put, takeLatest } from 'redux-saga/effects';
import { getSongs } from '@app/services/itunesApi';
import { itunesContainerTypes, itunesContainerCreators } from './reducer';

const { SEARCH_ITUNES } = itunesContainerTypes;
const { successSearchItunes, failureSearchItunes } = itunesContainerCreators;

export function* requestSearchItunes(action) {
  const res = yield call(getSongs, action.searchTerm);
  const { data, ok } = res;

  //check if ok
  if (ok) {
    yield put(successSearchItunes(data));
  } else {
    yield put(failureSearchItunes(data));
  }
}

//exporting itunesContainer saga
export default function* itunesContainerSaga() {
  yield takeLatest(SEARCH_ITUNES, requestSearchItunes);
}
