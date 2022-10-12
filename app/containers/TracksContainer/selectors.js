import { createSelector } from 'reselect';
import get from 'lodash/get';
import { initialState } from './reducer';

/**
 * Direct selector to the TracksContainer state domain
 */

export const selectTracksContainerDomain = state => state.tracksContainer || initialState;

export const selectTracksContainer = () =>
  // eslint-disable-next-line prettier/prettier
  createSelector(selectTracksContainerDomain, substate => substate);

export const selectTrackName = () =>
  // eslint-disable-next-line prettier/prettier
  createSelector(selectTracksContainerDomain, substate => get(substate, 'trackName'));

export const selectTracksError = () =>
  // eslint-disable-next-line prettier/prettier
  createSelector(selectTracksContainerDomain, substate => get(substate, 'tracksError'));

export const selectTracksLoading = () =>
  // eslint-disable-next-line prettier/prettier
  createSelector(selectTracksContainerDomain, substate => get(substate, 'tracksLoading'));

export const selectSingleTrackLoading = () =>
  // eslint-disable-next-line prettier/prettier
  createSelector(selectTracksContainerDomain, substate => get(substate, 'singleTrackLoading'));

export const selectTracksData = () =>
  // eslint-disable-next-line prettier/prettier
  createSelector(selectTracksContainerDomain, substate => get(substate, 'tracksData'));

export const selectTrackId = () =>
  // eslint-disable-next-line prettier/prettier
  createSelector(selectTracksContainerDomain, substate => get(substate, 'trackId'));

export const selectTrackDetails = () =>
  // eslint-disable-next-line prettier/prettier
  createSelector(selectTracksContainerDomain, substate => get(substate, 'trackDetails'));

export const selectTrackDetailsError = () =>
  // eslint-disable-next-line prettier/prettier
  createSelector(selectTracksContainerDomain, substate => get(substate, 'trackDetailsError'));
