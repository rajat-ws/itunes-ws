/*
 ** Tests for TracksContainer
 */
import React from 'react';
import { renderProvider, renderWithIntl, timeout } from '@app/utils/testUtils';
import { fireEvent } from '@testing-library/dom';
import { mapDispatchToProps, TracksContainerTest as TracksContainer } from '../index';
import { MOCK_TRACK_DATA } from '@app/utils/mockData';
import { tracksContainerCreators } from '../reducer';

describe('TracksContainer Tests', () => {
  //testing for dispatchRequestTracksData
  let mockdispatchRequestTracksData;

  beforeEach(() => {
    mockdispatchRequestTracksData = jest.fn();
  });
  it('should render and match to the snapshot', () => {
    const { baseElement } = renderWithIntl(
      <TracksContainer
        dispatchRequestTracksData={mockdispatchRequestTracksData}
        tracksData={{ 1: { name: 'song1' }, 2: { name: 'song1' } }}
      />
    );
    expect(baseElement).toMatchSnapshot();
  });

  // dispatch track names
  it('should call dispatchRequestTracksData on change', async () => {
    const { getByTestId } = renderWithIntl(
      <TracksContainer
        dispatchRequestTracksData={mockdispatchRequestTracksData}
        tracksData={{ 1: { name: 'song1' }, 2: { name: 'song1' } }}
      />
    );
    fireEvent.change(getByTestId('search-bar'), {
      target: { value: 'Arijit' }
    });
    await timeout(500);
    expect(mockdispatchRequestTracksData).toBeCalled();
  });

  // testing For component
  it('should render For component when tracksData is available', async () => {
    let tracksDummyData = { 1: { name: 'song1' }, 2: { name: 'song1' } };
    await timeout(500);
    const { getByTestId } = renderProvider(<TracksContainer tracksData={tracksDummyData} />);
    expect(getByTestId('for')).toBeInTheDocument();
  });

  // testing for dispatchClearTracksData
  it('should trigger the disptachsingleTrackData while search input is being emptied', async () => {
    let searchTrackNamesSpy = jest.fn();
    let clearTracksDataSpy = jest.fn();
    const { getByTestId } = renderWithIntl(
      <TracksContainer
        tracksData={{ 1: { name: 'song1' }, 2: { name: 'song1' } }}
        dispatchRequestTracksData={searchTrackNamesSpy}
        dispatchClearTracksData={clearTracksDataSpy}
      />
    );

    fireEvent.change(getByTestId('search-bar'), {
      target: { value: 'a' }
    });
    await timeout(500);
    expect(searchTrackNamesSpy).toBeCalled();
    fireEvent.change(getByTestId('search-bar'), {
      target: { value: '' }
    });
    await timeout(500);
    expect(clearTracksDataSpy).toBeCalled();
  });

  it('should validate mapDispatchToProps actions', () => {
    const dispatchSpy = jest.fn();
    const trackName = MOCK_TRACK_DATA.trackName;
    const { requestGetTracks, clearTracksData } = tracksContainerCreators;
    const props = mapDispatchToProps(dispatchSpy);
    props.dispatchRequestTracksData(trackName);
    props.dispatchClearTracksData();
    expect(dispatchSpy).toBeCalled();
    expect(dispatchSpy).toHaveBeenCalledWith(requestGetTracks(trackName));
    expect(dispatchSpy).toHaveBeenCalledWith(clearTracksData());
  });
});
