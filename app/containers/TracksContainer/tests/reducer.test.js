import { tracksContainerReducer, initialState, trackContainerTypes } from '../reducer';

/* eslint-disable default-case, no-param-reassign */
describe('TracksContainer reducer tests', () => {
  let state;
  beforeEach(() => {
    state = initialState;
  });

  it('should return the initial state', () => {
    expect(tracksContainerReducer(undefined, {})).toEqual(state);
  });

  it('should return the required state when an action of type REQUEST_GET_TRACKS is dispatched', () => {
    const expectedResult = {
      ...state,
      trackName: 'Arijit Singh',
      tracksLoading: true
    };
    expect(
      tracksContainerReducer(state, {
        type: trackContainerTypes.REQUEST_GET_TRACKS,
        trackName: 'Arijit Singh'
      })
    ).toEqual(expectedResult);
  });

  it('should ensure that the REQUEST_GET_TRACKS is success and SUCCESS_GET_TRACKS is dispatched, returns the data and updates tracksData', () => {
    const data = { songName: 'Naina', songArtist: 'Arijit Singh' };
    const expectedResult = {
      ...state,
      tracksError: null,
      tracksData: data,
      tracksLoading: false
    };
    expect(
      tracksContainerReducer(state, {
        type: trackContainerTypes.SUCCESS_GET_TRACKS,
        data: data
      })
    ).toEqual(expectedResult);
  });

  it('should ensure that whilst FAILURE_GET_TRACKS has been dispatched, then tracks data should be erased whille the tracksError iss updated with error message', () => {
    const error = 'something_went_wrong';
    const expectedResult = {
      ...state,
      tracksError: error,
      tracksData: {},
      tracksLoading: false
    };
    expect(
      tracksContainerReducer(state, {
        type: trackContainerTypes.FAILURE_GET_TRACKS,
        error
      })
    ).toEqual(expectedResult);
  });

  it('should ensure that whilst CLEAR_TRACKS_DATA is dispatched, tracks data is being cleared', () => {
    expect(
      tracksContainerReducer(state, {
        type: trackContainerTypes.CLEAR_TRACKS_DATA
      })
    ).toEqual(initialState);
  });

  it('should return the required state when an action of type REQUEST_GET_TRACK_DETAILS is dispatched', () => {
    const expectedResult = {
      ...state,
      trackId: 12345,
      singleTrackLoading: true
    };
    expect(
      tracksContainerReducer(state, {
        type: trackContainerTypes.REQUEST_GET_TRACK_DETAILS,
        trackId: 12345
      })
    ).toEqual(expectedResult);
  });

  it('should ensure that the REQUEST_GET_TRACK_DETAILS is success and SUCCESS_GET_TRACK_DETAILS is dispatched, returns the data and updates tracksData', () => {
    const data = { songName: 'Naina', songArtist: 'Arijit Singh' };
    const expectedResult = {
      ...state,
      trackDetailsError: null,
      trackDetails: data,
      singleTrackLoading: false
    };
    expect(
      tracksContainerReducer(state, {
        type: trackContainerTypes.SUCCESS_GET_TRACK_DETAILS,
        data: data
      })
    ).toEqual(expectedResult);
  });

  it('should ensure that whilst FAILURE_GET_TRACK_DETAILS has been dispatched when the track details data can not be found', () => {
    const error = 'something_went_wrong';
    const expectedResult = { ...state, trackDetailsError: error };
    expect(
      tracksContainerReducer(state, {
        type: trackContainerTypes.FAILURE_GET_TRACK_DETAILS,
        error
      })
    ).toEqual(expectedResult);
  });
});
