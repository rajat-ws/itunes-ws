/**
 * Test itunesContainer sagas
 */

/* eslint-disable redux-saga/yield-effects */
import { takeLatest, call, put } from 'redux-saga/effects';
import { getSongs } from '@services/itunesApi';
import { apiResponseGenerator } from '@utils/testUtils';
import itunesContainerSaga, { requestSearchItunes } from '../saga';
import { itunesContainerTypes } from '../reducer';

describe('itunesContainer saga tests', () => {
  const generator = itunesContainerSaga();
  const searchTerm = 'Arijit';
  let requestSongsGenerator = requestSearchItunes({ searchTerm });

  it('should start task to watch for SEARCH_ITUNES action', () => {
    expect(generator.next().value).toEqual(takeLatest(itunesContainerTypes.SEARCH_ITUNES, requestSearchItunes));
  });

  it('should ensure that the action FAILURE_SEARCH_ITUNES is dispatched when the api call fails', () => {
    const res = requestSongsGenerator.next().value;
    expect(res).toEqual(call(getSongs, searchTerm));
    const errorResponse = {
      errorMessage: 'There was an error while fetching requested information.'
    };
    expect(requestSongsGenerator.next(apiResponseGenerator(false, errorResponse)).value).toEqual(
      put({
        type: itunesContainerTypes.FAILURE_SEARCH_ITUNES,
        error: errorResponse
      })
    );
  });

  it('should ensure that the action SUCCESS_SEARCH_ITUNES is dispatched when the api call succeeds', () => {
    requestSongsGenerator = requestSearchItunes({ searchTerm });
    const res = requestSongsGenerator.next().value;
    expect(res).toEqual(call(getSongs, searchTerm));
    const sucessSongsResponse = {
      resultCount: 0,
      items: [{ songName: 'Naina', songArtist: 'Arijit Singh' }]
    };
    expect(requestSongsGenerator.next(apiResponseGenerator(true, sucessSongsResponse)).value).toEqual(
      put({
        type: itunesContainerTypes.SUCCESS_SEARCH_ITUNES,
        data: sucessSongsResponse
      })
    );
  });
});
