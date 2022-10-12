/**
 * Test TracksContainer sagas
 */

/* eslint-disable redux-saga/yield-effects */
import { takeLatest, call, put } from 'redux-saga/effects';
import { getSongs } from '@services/itunesApi';
import { apiResponseGenerator } from '@utils/testUtils';
import tracksContainerSaga, { requestGetTrackDetails, requestGetTracks } from '../saga';
import { trackContainerTypes } from '../reducer';

describe('TracksContainer saga tests', () => {
  const generator = tracksContainerSaga();
  const trackName = 'Arijit';
  const trackId = 123456;
  let requestSongsGenerator = requestGetTracks({ trackName });
  let requestTrackIdGenerator = requestGetTrackDetails({ trackId });

  it('should start task to watch for REQUEST_GET_TRACKS action', () => {
    expect(generator.next().value).toEqual(takeLatest(trackContainerTypes.REQUEST_GET_TRACKS, requestGetTracks));
  });

  it('should ensure that the action FAILURE_GET_TRACKS is dispatched when the api call fails', () => {
    const res = requestSongsGenerator.next().value;
    expect(res).toEqual(call(getSongs, trackName));
    const errorResponse = {
      errorMessage: 'There was an error while fetching requested information.'
    };
    expect(requestSongsGenerator.next(apiResponseGenerator(false, errorResponse)).value).toEqual(
      put({
        type: trackContainerTypes.FAILURE_GET_TRACKS,
        error: errorResponse
      })
    );
  });

  it('should ensure that the action SUCCESS_GET_TRACKS is dispatched when the api call succeeds', () => {
    requestSongsGenerator = requestGetTracks({ trackName });
    const res = requestSongsGenerator.next().value;
    expect(res).toEqual(call(getSongs, trackName));
    const sucessSongsResponse = {
      resultCount: 0,
      items: [{ songName: 'Naina', songArtist: 'Arijit Singh' }]
    };
    expect(requestSongsGenerator.next(apiResponseGenerator(true, sucessSongsResponse)).value).toEqual(
      put({
        type: trackContainerTypes.SUCCESS_GET_TRACKS,
        data: sucessSongsResponse
      })
    );
  });

  it('should start task to watch for REQUEST_GET_TRACK_DETAILS', () => {
    expect(generator.next().value).toEqual(
      takeLatest(trackContainerTypes.REQUEST_GET_TRACK_DETAILS, requestGetTrackDetails)
    );
  });

  it('should ensure that the action SUCCESS_GET_TRACK_DETAILS is dispatched when the api call succeeds', () => {
    requestTrackIdGenerator = requestGetTrackDetails({ trackId });
    requestTrackIdGenerator.next().value;
    const succcessTrackIdResponse = {
      results: [{ trackId }]
    };
    expect(requestTrackIdGenerator.next(apiResponseGenerator(true, succcessTrackIdResponse)).value).toEqual(
      put({
        type: trackContainerTypes.SUCCESS_GET_TRACK_DETAILS,
        data: { trackId }
      })
    );
  });
});
