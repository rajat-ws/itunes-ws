/**
 * Combine all reducers in this file and export the combined reducers.
 */

import { combineReducers } from 'redux';
import languageProviderReducer from 'containers/LanguageProvider/reducer';
import TracksContainerReducer from '@app/containers/TracksContainer/reducer';

/**
 * Merges the main reducer with the router state and dynamically injected reducers
 */
export default function createRootReducer(injectedReducer = {}) {
  return combineReducers({
    ...injectedReducer,
    language: languageProviderReducer,
    TracksContainer: TracksContainerReducer
  });
}
