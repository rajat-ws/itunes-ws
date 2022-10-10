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
  tracksError: null,
  tracksLoading: false,
  singleTrackLoading: false,
  trackId: null,
  trackDetails: null,
  trackDetailsError: null
};

export const { Types: trackContainerTypes, Creators: tracksContainerCreators } = createActions({
  requestGetTracks: ['trackName'],
  successGetTracks: ['data'],
  failureGetTracks: ['error'],
  clearTracksData: {},
  requestGetTrackDetails: ['trackId'],
  successGetTrackDetails: ['data'],
  failureGetTrackDetails: ['error']
});

/* eslint-disable default-case, no-param-reassign */
export const tracksContainerReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case trackContainerTypes.REQUEST_GET_TRACKS:
        draft.trackName = action.trackName;
        draft.tracksLoading = true;
        break;

      case trackContainerTypes.SUCCESS_GET_TRACKS:
        draft.tracksError = null;
        draft.tracksData = action.data;
        draft.tracksLoading = false;
        break;

      case trackContainerTypes.FAILURE_GET_TRACKS:
        draft.tracksError = action.error;
        draft.trackName = null;
        draft.tracksData = {};
        draft.tracksLoading = false;
        break;

      case trackContainerTypes.CLEAR_TRACKS_DATA:
        draft.tracksData = {};
        draft.trackName = null;
        draft.tracksLoading = false;
        break;

      // track details
      case trackContainerTypes.REQUEST_GET_TRACK_DETAILS:
        draft.trackId = action.trackId;
        draft.trackDetailsError = null;
        draft.trackDetails = null;
        draft.singleTrackLoading = true;
        break;

      case trackContainerTypes.SUCCESS_GET_TRACK_DETAILS:
        draft.trackDetails = action.data;
        draft.trackDetailsError = null;
        draft.singleTrackLoading = false;
        break;

      case trackContainerTypes.FAILURE_GET_TRACK_DETAILS:
        draft.singleTrackLoading = false;
        draft.trackDetailsError = action.error;
        break;
    }
  });

export default tracksContainerReducer;
