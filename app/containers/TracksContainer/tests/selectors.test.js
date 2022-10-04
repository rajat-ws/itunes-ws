/*
 ** TracksContainer selector tests
 */

import {
  selectTracksData,
  selectTracksContainer,
  selectTracksContainerDomain,
  selectTracksError,
  selectTrackName,
  selectTracksLoading
} from '../selectors';

describe('TracksContainer selector tests', () => {
  let mockedState;
  let trackName;
  let tracksError;
  let tracksData;
  let tracksLoading;
  let initialState = {
    tracksData: {},
    tracksError: null,
    trackName: null,
    tracksLoading: false
  };
  let mockedStateWithoutInitialState = {};

  beforeEach(() => {
    (trackName = 'Naina'), (tracksData = { songName: 'Naina', songArtist: 'Arijit Singh' });
    tracksError = 'Some error occured whille finding requested information';
    mockedState = {
      tracksContainer: {
        trackName,
        tracksError,
        tracksData,
        tracksLoading
      }
    };
  });

  it('should return initial state', () => {
    expect(selectTracksContainerDomain(mockedStateWithoutInitialState)).toEqual(initialState);
  });

  it('should return state', () => {
    expect(selectTracksContainerDomain(mockedState)).toEqual(mockedState.tracksContainer);
  });

  it('should select the user state', () => {
    const tracksContainerSelector = selectTracksContainer();
    expect(tracksContainerSelector(mockedState)).toEqual(mockedState.tracksContainer);
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

  it('should select the tracksLoading state', () => {
    const tracksLoadingSelector = selectTracksLoading();
    expect(tracksLoadingSelector(mockedState)).toEqual(tracksLoading);
  });
});
