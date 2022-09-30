/*
 *
 * TracksContainer reducer
 *
 */

import produce from 'immer';
import { createActions } from 'reduxsauce';

export const initialState = {
  trackName: null,
  tracksData: {},
  tracksError: null
};

export const { Types: TracksContainerTypes, Creators: TracksContainerCreators } = createActions({
  requestGetTracks: ['trackName'],
  successGetTracks: ['data'],
  failureGetTracks: ['error'],
  clearTracksData: {}
});

/* eslint-disable default-case, no-param-reassign */
export const TracksContainerReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case TracksContainerTypes.REQUEST_GET_TRACKS:
        draft.trackName = action.trackName;
        break;

      case TracksContainerTypes.SUCCESS_GET_TRACKS:
        draft.tracksError = null;
        draft.tracksData = action.data;
        break;

      case TracksContainerTypes.FAILURE_GET_TRACKS:
        draft.tracksError = action.error;
        draft.trackName = null;
        draft.tracksData = {};
        break;

      case TracksContainerTypes.CLEAR_TRACKS_DATA:
        draft.tracksData = {};
        draft.trackName = null;
        break;
    }
  });

export default TracksContainerReducer;
