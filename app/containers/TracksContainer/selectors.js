import { createSelector } from 'reselect';
import get from 'lodash/get';
import { initialState } from './reducer';

/**
 * Direct selector to the TracksContainer state domain
 */

export const selectTracksContainerDomain = state => state.TracksContainer || initialState;

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

export const selectTracksData = () =>
  createSelector(
    selectTracksContainerDomain,
    substate => get(substate, 'tracksData')
  );
