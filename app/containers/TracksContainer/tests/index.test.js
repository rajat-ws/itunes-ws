/*
 ** Tests for TracksContainer
 */
import React from 'react';
import { renderProvider, renderWithIntl, timeout } from '@app/utils/testUtils';
import { fireEvent } from '@testing-library/dom';
import { TracksContainerTest as TracksContainer } from '../index';

describe('TracksContainer Tests', () => {
  //testing for dispatchTrackNames
  let mockDispatchTrackNames;

  beforeEach(() => {
    mockDispatchTrackNames = jest.fn();
  });
  it('should render and match to the snapshot', () => {
    const { baseElement } = renderWithIntl(<TracksContainer dispatchTrackNames={mockDispatchTrackNames} />);
    expect(baseElement).toMatchSnapshot();
  });

  // dispatch track names
  it('should call dispatchTrackNames on change', async () => {
    const { getByTestId } = renderWithIntl(<TracksContainer dispatchTrackNames={mockDispatchTrackNames} />);
    fireEvent.change(getByTestId('search-bar'), {
      target: { value: 'Arijit' }
    });
    await timeout(500);
    expect(mockDispatchTrackNames).toBeCalled();
  });

  // testing For component
  it('should render For component when tracksData is available', async () => {
    const data = {
      resultCount: 2,
      results: [
        {
          id: 1,
          name: 'First data'
        },
        {
          id: 2,
          name: 'Second Data'
        }
      ]
    };
    await timeout(500);
    const { getByTestId } = renderProvider(<TracksContainer tracksData={data} />);
    expect(getByTestId('for')).toBeInTheDocument();
  });

  // testing for dispatchClearTracksData
  it('should trigger the disptachTrackData while search input is being emptied', async () => {
    let searchTrackNamesSpy = jest.fn();
    let clearTracksDataSpy = jest.fn();
    const { getByTestId } = renderWithIntl(
      <TracksContainer dispatchTrackNames={searchTrackNamesSpy} dispatchClearTracksData={clearTracksDataSpy} />
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
});
