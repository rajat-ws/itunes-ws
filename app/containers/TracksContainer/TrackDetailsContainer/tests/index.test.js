/**
 *
 * Tests for TrackDetailsContainer container
 *
 *
 */

import React from 'react';
// import { fireEvent } from '@testing-library/dom';
import { renderProvider } from '@utils/testUtils';
import { mapDispatchToProps, TrackDetailsContainerTest as TrackDetailsContainer } from '../index';
import { MOCK_TRACK_DATA } from '@app/utils/mockData';
import { tracksContainerCreators } from '../../reducer';

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

  it('should validate mapDispatchToProps actions', () => {
    const dispatchSpy = jest.fn();
    const trackId = MOCK_TRACK_DATA.trackId;
    const { requestGetTrackDetails } = tracksContainerCreators;
    const props = mapDispatchToProps(dispatchSpy);
    props.dispatchRequestTrackDetails(trackId);
    expect(dispatchSpy).toBeCalled();
    expect(dispatchSpy).toHaveBeenCalledWith(requestGetTrackDetails(trackId));
  });
});
