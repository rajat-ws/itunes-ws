import {
  selectTracksContainer,
  selectTrackName,
  selectTrackDetails,
  selectTrackDetailsError,
  selectTrackId,
  selectTracksData,
  selectTracksError
} from '../selectors';

describe('TracksContainer selector tests', () => {
  let mockedState;
  let trackName;
  let tracksData;
  let trackDetails;
  let trackId;
  let tracksError;
  let trackDetailsError;

  beforeEach(() => {
    (trackName = 'Naina'), (tracksData = { songName: 'Naina', songArtist: 'Arijit Singh' });
    tracksError = 'Some error occured whille finding requested information';
    trackId = '3434533';
    trackDetails = [{ trackId }];
    tracksError = 'something went wrong';
    trackDetailsError = 'error while fetching the track details';

    mockedState = {
      tracksContainer: {
        trackName,
        tracksData,
        trackDetails,
        tracksError,
        trackDetailsError,
        trackId
      }
    };
  });

  it('should select the trackName', () => {
    const trackNameSelector = selectTrackName();
    expect(trackNameSelector(mockedState)).toEqual(trackName);
  });

  it('should select the tracksContainer state', () => {
    const tracksContainerSelector = selectTracksContainer();
    expect(tracksContainerSelector(mockedState)).toEqual(mockedState.tracksContainer);
  });

  it('should select tracksData', () => {
    const searchsingleTrackDataSelector = selectTracksData();
    expect(searchsingleTrackDataSelector(mockedState)).toEqual(tracksData);
  });

  it('should select the trackDetails', () => {
    const trackDetailsSelector = selectTrackDetails();
    expect(trackDetailsSelector(mockedState)).toEqual(trackDetails);
  });

  it('should select the trackError', () => {
    const trackErrorSelector = selectTracksError();
    expect(trackErrorSelector(mockedState)).toEqual(tracksError);
  });

  it('should select the trackDetailsError', () => {
    const trackErrorSelector = selectTrackDetailsError();
    expect(trackErrorSelector(mockedState)).toEqual(trackDetailsError);
  });

  it('should select the trackError', () => {
    const trackErrorSelector = selectTrackId();
    expect(trackErrorSelector(mockedState)).toEqual(trackId);
  });
});
