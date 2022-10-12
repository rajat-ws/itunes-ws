import { css } from 'styled-components';
import { media } from '@app/themes';

// sizes

export const dynamicFontSize = (font, desktopDelta = 0, tabletDelta = 0) => css`
  ${font()}
  ${media.greaterThan('tablet')`font-size: ${tabletDelta +
    parseInt(
      font()[0]
        .replace('font-size:', '')
        .replace('rem;', '')
        .replace(/\s+/g, '')
    )}rem;`}
${media.greaterThan('desktop')`font-size: ${desktopDelta +
  parseInt(
    font()[0]
      .replace('font-size:', '')
      .replace('rem;', '')
      .replace(/\s+/g, '')
  )}rem;`}
`;
const regular = () => css`
  font-size: 1rem;
`;

const xRegular = () => css`
  font-size: 1.125rem;
`;
const xSmall = () => css`
  font-size: 0.75rem;
`;
const small = () => css`
  font-size: 0.875rem;
`;
const medium = () => css`
  font-size: 1rem;
`;
const big = () => css`
  font-size: 1.25rem;
`;
const large = () => css`
  font-size: 1.5rem;
`;
const extraLarge = () => css`
  font-size: 2rem;
`;

// weights
const light = () => css`
  font-weight: 400;
`;
const bold = () => css`
  font-weight: 600;
`;

const xBold = () => css`
  font-weight: 700;
`;

const normal = () => css`
  font-weight: 500;
`;

// styles
const heading = () => css`
  ${large()}
  ${bold()}
`;

const subheading = () => css`
  ${big()}
  ${bold()}
`;

const standard = () => css`
  ${regular()}
  ${normal()}
`;

const subText = () => css`
  ${small()}
  ${normal()}
`;

export default {
  dynamicFontSize,
  size: {
    regular,
    xSmall,
    small,
    medium,
    big,
    large,
    extraLarge,
    xRegular
  },
  style: {
    heading,
    subheading,
    standard,
    subText
  },
  weights: {
    light,
    bold,
    xBold,
    normal
  }
};
