/*
 ** Tests for TracksContainer
 */
import React from 'react';
import { renderProvider } from '@app/utils/testUtils';
import TracksContainer from '../index';

describe('TracksContainer Tests', () => {
  //testing for dispatchTrackNames
  let mockDispatchTrackNames;

  beforeEach(() => {
    mockDispatchTrackNames = jest.fn();
  });
  it('should render and match to the snapshot', () => {
    const { baseElement } = renderProvider(<TracksContainer dispatchTrackNames={mockDispatchTrackNames} />);
    expect(baseElement).toMatchSnapshot();
  });

  // testing for dispatchClearTracksData
});
