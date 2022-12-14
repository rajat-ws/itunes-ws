import { call, put, takeLatest, select } from 'redux-saga/effects';
import { getSongs } from '@app/services/itunesApi';
import { trackContainerTypes, tracksContainerCreators } from './reducer';
import { selectTracksData } from './selectors';

const { REQUEST_GET_TRACKS, REQUEST_GET_TRACK_DETAILS } = trackContainerTypes;
const { successGetTracks, failureGetTracks, successGetTrackDetails, failureGetTrackDetails } = tracksContainerCreators;

export function* requestGetTracks(action) {
  const res = yield call(getSongs, action.trackName);
  const { data, ok } = res;

  const tracksDataResponse = data?.results;
  const optimisedTrackData = tracksDataResponse?.reduce((obj, item) => ({ ...obj, [item.trackId]: { ...item } }), {});
  //check if ok
  if (ok) {
    yield put(successGetTracks(optimisedTrackData));
  } else {
    yield put(failureGetTracks(data));
  }
}

export function* requestGetTrackDetails(action) {
  const tracksData = yield select(selectTracksData());
  let foundTrackItem = tracksData[action.trackId];
  if (foundTrackItem) {
    yield put(successGetTrackDetails(foundTrackItem));
  } else {
    yield put(failureGetTrackDetails(foundTrackItem));
  }
}

//exporting tracksContainer saga
export default function* tracksContainerSaga() {
  yield takeLatest(REQUEST_GET_TRACKS, requestGetTracks);
  yield takeLatest(REQUEST_GET_TRACK_DETAILS, requestGetTrackDetails);
}
