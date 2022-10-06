/**
 *
 * Tests for TrackDetailsContainer container
 *
 *
 */

import React from 'react';
// import { fireEvent } from '@testing-library/dom';
import { renderProvider } from '@utils/testUtils';
import { TrackDetailsContainerTest as TrackDetailsContainer } from '../index';

describe('<TrackDetailsContainer /> container tests', () => {
  let trackDetails;
  let dispatchRequestTrackDetailsSpy;

  beforeEach(() => {
    trackDetails = {
      collectionName: 'collection name',
      previewUrl: 'https://audio-ssl.itunes.apple.com/itunes-assets/Music/43/63/eb/mzm.pmbvqxwh.aac.p.m4a',
      trackName: 'track name'
    };
    dispatchRequestTrackDetailsSpy = jest.fn();
  });

  it('should render and match the snapshot', () => {
    const { baseElement } = renderProvider(
      <TrackDetailsContainer dispatchRequestTrackDetails={dispatchRequestTrackDetailsSpy} trackDetails={trackDetails} />
    );
    expect(baseElement).toMatchSnapshot();
  });
});
