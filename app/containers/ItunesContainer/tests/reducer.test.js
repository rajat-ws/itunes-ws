import { itunesContainerReducer, initialState, itunesContainerTypes } from '../reducer';

/* eslint-disable default-case, no-param-reassign */
describe('itunesContainer reducer tests', () => {
  let state;
  beforeEach(() => {
    state = initialState;
  });

  it('should return the initial state', () => {
    expect(itunesContainerReducer(undefined, {})).toEqual(state);
  });

  it('should return the required state when an action of type SEARCH_ITUNES is dispatched', () => {
    const expectedResult = { ...state, searchTerm: 'Arijit Singh' };
    expect(
      itunesContainerReducer(state, {
        type: itunesContainerTypes.SEARCH_ITUNES,
        searchTerm: 'Arijit Singh'
      })
    ).toEqual(expectedResult);
  });

  it('should ensure that the SEARCH_ITUNES is success and SUCCESS_SEARCH_ITUNES is dispatched, returns the data and updates gridData', () => {
    const data = { songName: 'Naina', songArtist: 'Arijit Singh' };
    const expectedResult = { ...state, searchError: null, gridData: data };
    expect(
      itunesContainerReducer(state, {
        type: itunesContainerTypes.SUCCESS_SEARCH_ITUNES,
        data: data
      })
    ).toEqual(expectedResult);
  });

  it('should ensure that whilst FAILURE_SEARCH_ITUNES has been dispatched, then grid data should be erased whille the searchError iss updated with error message', () => {
    const error = 'something_went_wrong';
    const expectedResult = { ...state, searchError: error, gridData: {} };
    expect(
      itunesContainerReducer(state, {
        type: itunesContainerTypes.FAILURE_SEARCH_ITUNES,
        error
      })
    ).toEqual(expectedResult);
  });

  it('should ensure that whilst CLEAR_GRID_DATA is dispatched, grid data is being cleared', () => {
    expect(
      itunesContainerReducer(state, {
        type: itunesContainerTypes.CLEAR_GRID_DATA
      })
    ).toEqual(initialState);
  });
});
