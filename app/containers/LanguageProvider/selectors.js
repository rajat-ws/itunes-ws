import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the languageToggle state domain
 */
const selectLanguage = state => state.language || initialState;

/**
 * Select the language locale
 */

// eslint-disable-next-line prettier/prettier
const makeSelectLocale = () => createSelector(selectLanguage, languageState => languageState.locale);

export { selectLanguage, makeSelectLocale };
