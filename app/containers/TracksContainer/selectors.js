import { createSelector } from 'reselect';
import get from 'lodash/get';
import { initialState } from './reducer';

/**
 * Direct selector to the TracksContainer state domain
 */

export const selectTracksContainerDomain = state => state.tracksContainer || initialState;

export const selectTracksContainer = () =>
  createSelector(
    selectTracksContainerDomain,
    substate => substate
  );

export const selectTrackName = () =>
  createSelector(
    selectTracksContainerDomain,
    substate => get(substate, 'trackName')
  );

export const selectTracksError = () =>
  createSelector(
    selectTracksContainerDomain,
    substate => get(substate, 'tracksError')
  );

export const selectTracksLoading = () =>
  createSelector(
    selectTracksContainerDomain,
    substate => get(substate, 'tracksLoading')
  );

export const selectTracksData = () =>
  createSelector(
    selectTracksContainerDomain,
    substate => get(substate, 'tracksData')
  );

export const selectTrackId = () =>
  createSelector(
    selectTracksContainerDomain,
    substate => get(substate, 'trackId')
  );

export const selectTrackDetails = () =>
  createSelector(
    selectTracksContainerDomain,
    substate => get(substate, 'trackDetails')
  );

export const selectTrackDetailsError = () =>
  createSelector(
    selectTracksContainerDomain,
    substate => get(substate, 'trackDetailsError')
  );
