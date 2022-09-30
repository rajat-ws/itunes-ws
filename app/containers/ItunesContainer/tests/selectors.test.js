/*
 ** itunesContainer selector tests
 */

import {
  selectGridData,
  selectItunesContainer,
  selectItunesContainerDomain,
  selectSearchError,
  selectSearchTerm
} from '../selectors';

describe('ItunesContainer selector tests', () => {
  let mockedState;
  let searchTerm;
  let searchError;
  let gridData;
  let initialState = {
    gridData: {},
    searchError: null,
    searchTerm: null
  };
  let mockedStateWithoutInitialState = {};

  beforeEach(() => {
    (searchTerm = 'Naina'), (gridData = { songName: 'Naina', songArtist: 'Arijit Singh' });
    searchError = 'Some error occured whille finding requested information';
    mockedState = {
      itunesContainer: {
        searchTerm,
        searchError,
        gridData
      }
    };
  });

  it('should return initial state', () => {
    expect(selectItunesContainerDomain(mockedStateWithoutInitialState)).toEqual(initialState);
  });

  it('should return state', () => {
    expect(selectItunesContainerDomain(mockedState)).toEqual(mockedState.itunesContainer);
  });

  it('should select the user state', () => {
    const itunesContainerSelector = selectItunesContainer();
    expect(itunesContainerSelector(mockedState)).toEqual(mockedState.itunesContainer);
  });

  it('should select the search term', () => {
    const searchTermSelector = selectSearchTerm();
    expect(searchTermSelector(mockedState)).toEqual(searchTerm);
  });

  it('should select the grid data', () => {
    const gridDataSelector = selectGridData();
    expect(gridDataSelector(mockedState)).toEqual(gridData);
  });

  it('should select the search error', () => {
    const searchErrorSelector = selectSearchError();
    expect(searchErrorSelector(mockedState)).toEqual(searchError);
  });
});
