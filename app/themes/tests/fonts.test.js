import { css } from 'styled-components';
import fonts, { dynamicFontSize } from '../fonts';
import media from '../media';

describe('fonts', () => {
  it('should have the correct font-size', () => {
    expect(fonts.size.medium()).toEqual(expect.arrayContaining([expect.stringContaining('font-size:1rem')]));
    expect(fonts.size.small()).toEqual(expect.arrayContaining([expect.stringContaining('font-size:0.875rem')]));
    expect(fonts.size.xSmall()).toEqual(expect.arrayContaining([expect.stringContaining('font-size:0.75rem')]));
    expect(fonts.size.regular()).toEqual(expect.arrayContaining([expect.stringContaining('font-size:1rem;')]));
    expect(fonts.size.big()).toEqual(expect.arrayContaining([expect.stringContaining('font-size:1.25rem;')]));
    expect(fonts.size.large()).toEqual(expect.arrayContaining([expect.stringContaining('font-size:1.5rem;')]));
    expect(fonts.size.extraLarge()).toEqual(expect.arrayContaining([expect.stringContaining('font-size:2rem;')]));
  });
  it('should have the correct font-weight', () => {
    expect(fonts.weights.light()).toEqual(expect.arrayContaining(['font-weight:400;']));
    expect(fonts.weights.bold()).toEqual(expect.arrayContaining(['font-weight:600;']));
    expect(fonts.weights.normal()).toEqual(expect.arrayContaining(['font-weight:500;']));
    expect(fonts.weights.xBold()).toEqual(expect.arrayContaining(['font-weight:700;']));
  });
  it('should have the correct font-weight and font-size', () => {
    expect(fonts.style.heading()).toEqual(expect.arrayContaining(['font-size:1.5rem;', ' ', 'font-weight:600;']));
    expect(fonts.style.heading()).toEqual(expect.arrayContaining(['font-size:1.5rem;', ' ', 'font-weight:600;']));
    expect(fonts.style.subheading()).toEqual(expect.arrayContaining(['font-size:1.25rem;', ' ', 'font-weight:600;']));
    expect(fonts.style.subheading()).toEqual(expect.arrayContaining([expect.stringContaining('font-size:1.25rem;')]));
    expect(fonts.style.standard()).toEqual(expect.arrayContaining([expect.stringContaining('font-size:1rem;')]));
    expect(fonts.style.standard()).toEqual(expect.arrayContaining(['font-size:1rem;', ' ', 'font-weight:500;']));
    expect(fonts.style.subText()).toEqual(expect.arrayContaining([expect.stringContaining('font-size:0.875rem;')]));
    expect(fonts.style.subText()).toEqual(expect.arrayContaining(['font-size:0.875rem;', ' ', 'font-weight:500;']));
  });
});

describe('Tests for dynamicFontSize method', () => {
  it('should return dynamic font stylings along with required media queries', () => {
    const font = fonts.size.large;
    const desktopDelta = 1;
    const tabletDelta = 0.4;
    const expectedResult = css`
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
    expect(JSON.stringify(dynamicFontSize(font, desktopDelta, tabletDelta))).toEqual(JSON.stringify(expectedResult));
  });

  it('should return  default dynamic font stylings along with required media queries', () => {
    const font = fonts.size.large;

    const expectedResult = css`
      ${font()}
      ${media.greaterThan('tablet')`font-size: ${0 +
        parseInt(
          font()[0]
            .replace('font-size:', '')
            .replace('rem;', '')
            .replace(/\s+/g, '')
        )}rem;`}
    ${media.greaterThan('desktop')`font-size: ${0 +
      parseInt(
        font()[0]
          .replace('font-size:', '')
          .replace('rem;', '')
          .replace(/\s+/g, '')
      )}rem;`}
    `;
    expect(JSON.stringify(dynamicFontSize(font))).toEqual(JSON.stringify(expectedResult));
  });
});
