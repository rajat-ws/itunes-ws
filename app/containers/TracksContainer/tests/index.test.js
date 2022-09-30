/*
 ** Tests for TracksContainer
 */
import React from 'react';
import { renderProvider } from '@app/utils/testUtils';
import TracksContainer from '../index';

describe('TracksContainer Tests', () => {
  it('should render and match to the snapshot', () => {
    const { baseElement } = renderProvider(<TracksContainer />);
    expect(baseElement).toMatchSnapshot();
  });
});
