/**
 *
 * T
 *
 */

import React, { memo } from 'react';
import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';
import { PropTypes } from 'prop-types';
import If from '@components/If';
import { fonts } from '@app/themes';

const StyledText = styled.p`
  && {
    ${props => props.marginBottom && `margin-bottom: ${props.marginBottom}rem;`};
    ${props => props.paddingBottom && `padding-bottom: ${props.paddingBottom}rem;`};
    ${props => props.font()};
  }
`;
const getFontStyle = type => fonts.style[type] || (() => '');
export const T = ({ type, text, id, marginBottom, paddingBottom, values, ...otherProps }) => (
  <StyledText
    data-testid="t"
    font={getFontStyle(type)}
    paddingBottom={paddingBottom}
    marginBottom={marginBottom}
    {...otherProps}
  >
    <If condition={id} otherwise={text}>
      <FormattedMessage id={id} values={values} />
    </If>
  </StyledText>
);

T.propTypes = {
  id: PropTypes.string,
  marginBottom: PropTypes.number,
  paddingBottom: PropTypes.number,
  values: PropTypes.object,
  text: PropTypes.string,
  type: PropTypes.oneOf(Object.keys(fonts.style))
};

T.defaultProps = {
  values: {},
  type: 'standard'
};

const TextComponent = memo(T);
export default TextComponent;
