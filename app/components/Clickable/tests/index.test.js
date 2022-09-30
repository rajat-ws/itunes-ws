/**
 *
 * Tests for Clickable
 *
 */

import React from 'react';
import { renderWithIntl } from '@utils/testUtils';
import Clickable from '../index';

describe('<Clickable /> component tests', () => {
  let clickSpy;
  beforeAll(() => {
    clickSpy = jest.fn();
  });
  it('should render and match the snapshot', () => {
    const { baseElement } = renderWithIntl(<Clickable textId="songs_list" onClick={clickSpy} />);
    expect(baseElement).toMatchSnapshot();
  });

  it('should contain 1 Clickable component', () => {
    const { getAllByTestId } = renderWithIntl(<Clickable textId="songs_list" onClick={clickSpy} />);
    expect(getAllByTestId('clickable').length).toBe(1);
  });
});
