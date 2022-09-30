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

export const { Types: trackContainerTypes, Creators: tracksContainerCreators } = createActions({
  requestGetTracks: ['trackName'],
  successGetTracks: ['data'],
  failureGetTracks: ['error'],
  clearTracksData: {}
});

/* eslint-disable default-case, no-param-reassign */
export const tracksContainerReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case trackContainerTypes.REQUEST_GET_TRACKS:
        draft.trackName = action.trackName;
        break;

      case trackContainerTypes.SUCCESS_GET_TRACKS:
        draft.tracksError = null;
        draft.tracksData = action.data;
        break;

      case trackContainerTypes.FAILURE_GET_TRACKS:
        draft.tracksError = action.error;
        draft.trackName = null;
        draft.tracksData = {};
        break;

      case trackContainerTypes.CLEAR_TRACKS_DATA:
        draft.tracksData = {};
        draft.trackName = null;
        break;
    }
  });

export default tracksContainerReducer;
