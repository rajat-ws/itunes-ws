/*
 ** Tests for TracksContainer
 */
import React from 'react';
import { renderProvider, renderWithIntl, timeout } from '@app/utils/testUtils';
import { fireEvent } from '@testing-library/dom';
import { TracksContainerTest as TracksContainer } from '../index';

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
    const { queryByTestId } = renderWithIntl(
      <TracksContainer
        dispatchRequestTracksData={mockdispatchRequestTracksData}
        tracksData={{ 1: { name: 'song1' }, 2: { name: 'song1' } }}
      />
    );
    fireEvent.change(queryByTestId('search-bar'), {
      target: { value: 'Arijit' }
    });
    await timeout(500);
    expect(mockdispatchRequestTracksData).toBeCalled();
  });

  // testing For component
  it('should render For component when tracksData is available', async () => {
    let tracksDummyData = { 1: { name: 'song1' }, 2: { name: 'song1' } };
    await timeout(500);
    const { queryByTestId } = renderProvider(<TracksContainer tracksData={tracksDummyData} />);
    expect(queryByTestId('for')).toBeInTheDocument();
  });

  // testing for dispatchClearTracksData
  it('should trigger the disptachsingleTrackData while search input is being emptied', async () => {
    let searchTrackNamesSpy = jest.fn();
    let clearTracksDataSpy = jest.fn();
    const { queryByTestId } = renderWithIntl(
      <TracksContainer
        tracksData={{ 1: { name: 'song1' }, 2: { name: 'song1' } }}
        dispatchRequestTracksData={searchTrackNamesSpy}
        dispatchClearTracksData={clearTracksDataSpy}
      />
    );

    fireEvent.change(queryByTestId('search-bar'), {
      target: { value: 'a' }
    });
    await timeout(500);
    expect(searchTrackNamesSpy).toBeCalled();
    fireEvent.change(queryByTestId('search-bar'), {
      target: { value: '' }
    });
    await timeout(500);
    expect(clearTracksDataSpy).toBeCalled();
  });
});
