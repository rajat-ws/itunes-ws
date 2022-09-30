/*
 ** TracksContainer selector tests
 */

import {
  selectTracksData,
  selectTracksContainer,
  selectTracksContainerDomain,
  selectTracksError,
  selectTrackName
} from '../selectors';

describe('TracksContainer selector tests', () => {
  let mockedState;
  let trackName;
  let tracksError;
  let tracksData;
  let initialState = {
    tracksData: {},
    tracksError: null,
    trackName: null
  };
  let mockedStateWithoutInitialState = {};

  beforeEach(() => {
    (trackName = 'Naina'), (tracksData = { songName: 'Naina', songArtist: 'Arijit Singh' });
    tracksError = 'Some error occured whille finding requested information';
    mockedState = {
      TracksContainer: {
        trackName,
        tracksError,
        tracksData
      }
    };
  });

  it('should return initial state', () => {
    expect(selectTracksContainerDomain(mockedStateWithoutInitialState)).toEqual(initialState);
  });

  it('should return state', () => {
    expect(selectTracksContainerDomain(mockedState)).toEqual(mockedState.TracksContainer);
  });

  it('should select the user state', () => {
    const TracksContainerSelector = selectTracksContainer();
    expect(TracksContainerSelector(mockedState)).toEqual(mockedState.TracksContainer);
  });

  it('should select the tracks name', () => {
    const trackNameSelector = selectTrackName();
    expect(trackNameSelector(mockedState)).toEqual(trackName);
  });

  it('should select the tracks data', () => {
    const tracksDataSelector = selectTracksData();
    expect(tracksDataSelector(mockedState)).toEqual(tracksData);
  });

  it('should select the tracks error', () => {
    const tracksErrorSelector = selectTracksError();
    expect(tracksErrorSelector(mockedState)).toEqual(tracksError);
  });
});
