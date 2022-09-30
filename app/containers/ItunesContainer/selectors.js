import { createSelector } from 'reselect';
import get from 'lodash/get';
import { initialState } from './reducer';

/**
 * Direct selector to the itunesContainer state domain
 */

export const selectItunesContainerDomain = (state) => state.itunesContainer || initialState;

export const selectItunesContainer = () => createSelector(selectItunesContainerDomain, (substate) => substate);

export const selectSearchTerm = () =>
  createSelector(selectItunesContainerDomain, (substate) => get(substate, 'searchTerm'));

export const selectSearchError = () =>
  createSelector(selectItunesContainerDomain, (substate) => get(substate, 'searchError'));

export const selectGridData = () =>
  createSelector(selectItunesContainerDomain, (substate) => get(substate, 'gridData'));
