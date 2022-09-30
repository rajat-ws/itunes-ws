import { TracksContainerReducer, initialState, TracksContainerTypes } from '../reducer';

/* eslint-disable default-case, no-param-reassign */
describe('TracksContainer reducer tests', () => {
  let state;
  beforeEach(() => {
    state = initialState;
  });

  it('should return the initial state', () => {
    expect(TracksContainerReducer(undefined, {})).toEqual(state);
  });

  it('should return the required state when an action of type REQUEST_GET_TRACKS is dispatched', () => {
    const expectedResult = { ...state, trackName: 'Arijit Singh' };
    expect(
      TracksContainerReducer(state, {
        type: TracksContainerTypes.REQUEST_GET_TRACKS,
        trackName: 'Arijit Singh'
      })
    ).toEqual(expectedResult);
  });

  it('should ensure that the REQUEST_GET_TRACKS is success and SUCCESS_GET_TRACKS is dispatched, returns the data and updates tracksData', () => {
    const data = { songName: 'Naina', songArtist: 'Arijit Singh' };
    const expectedResult = { ...state, tracksError: null, tracksData: data };
    expect(
      TracksContainerReducer(state, {
        type: TracksContainerTypes.SUCCESS_GET_TRACKS,
        data: data
      })
    ).toEqual(expectedResult);
  });

  it('should ensure that whilst FAILURE_GET_TRACKS has been dispatched, then grid data should be erased whille the tracksError iss updated with error message', () => {
    const error = 'something_went_wrong';
    const expectedResult = { ...state, tracksError: error, tracksData: {} };
    expect(
      TracksContainerReducer(state, {
        type: TracksContainerTypes.FAILURE_GET_TRACKS,
        error
      })
    ).toEqual(expectedResult);
  });

  it('should ensure that whilst CLEAR_TRACKS_DATA is dispatched, grid data is being cleared', () => {
    expect(
      TracksContainerReducer(state, {
        type: TracksContainerTypes.CLEAR_TRACKS_DATA
      })
    ).toEqual(initialState);
  });
});
