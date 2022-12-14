/*
 *
 * LanguageProvider
 *
 * this component connects the redux state language locale to the
 * IntlProvider component and i18n messages (loaded from `app/translations`)
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { IntlProvider } from 'react-intl';
import { IntlGlobalProvider } from '@app/components/IntlGlobalProvider';
import { makeSelectLocale } from './selectors';

export function LanguageProvider(props) {
  return (
    <IntlProvider locale={props.locale} key={props.locale} messages={props.messages[props.locale]}>
      <IntlGlobalProvider>{React.Children.only(props.children)}</IntlGlobalProvider>
    </IntlProvider>
  );
}

LanguageProvider.propTypes = {
  locale: PropTypes.string,
  messages: PropTypes.object,
  children: PropTypes.element.isRequired
};

// eslint-disable-next-line prettier/prettier
const mapStateToProps = createSelector(makeSelectLocale(), locale => ({ locale }));

function mapDispatchToProps(dispatch) {
  return {
    dispatch
  };
}

// eslint-disable-next-line prettier/prettier
export default connect(mapStateToProps, mapDispatchToProps)(LanguageProvider);
