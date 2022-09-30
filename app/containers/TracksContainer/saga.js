import { call, put, takeLatest } from 'redux-saga/effects';
import { getSongs } from '@app/services/itunesApi';
import { trackContainerTypes, tracksContainerCreators } from './reducer';

const { REQUEST_GET_TRACKS } = trackContainerTypes;
const { successGetTracks, failureGetTracks } = tracksContainerCreators;

export function* requestGetTracks(action) {
  const res = yield call(getSongs, action.trackName);
  const { data, ok } = res;

  //check if ok
  if (ok) {
    yield put(successGetTracks(data));
  } else {
    yield put(failureGetTracks(data));
  }
}

//exporting tracksContainer saga
export default function* tracksContainerSaga() {
  yield takeLatest(REQUEST_GET_TRACKS, requestGetTracks);
}
