/*
 *
 * itunesContainer reducer
 *
 */

import produce from 'immer';
import { createActions } from 'reduxsauce';

export const initialState = {
  searchTerm: null,
  gridData: {},
  searchError: null
};

export const { Types: itunesContainerTypes, Creators: itunesContainerCreators } = createActions({
  searchItunes: ['searchTerm'],
  successSearchItunes: ['data'],
  failureSearchItunes: ['error'],
  clearGridData: {}
});

/* eslint-disable default-case, no-param-reassign */
export const itunesContainerReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case itunesContainerTypes.SEARCH_ITUNES:
        draft.searchTerm = action.searchTerm;
        break;

      case itunesContainerTypes.SUCCESS_SEARCH_ITUNES:
        draft.searchError = null;
        draft.gridData = action.data;
        break;

      case itunesContainerTypes.FAILURE_SEARCH_ITUNES:
        draft.searchError = action.error;
        draft.searchTerm = null;
        draft.gridData = {};
        break;

      case itunesContainerTypes.CLEAR_GRID_DATA:
        draft.gridData = {};
        draft.searchTerm = null;
        break;
    }
  });

export default itunesContainerReducer;
