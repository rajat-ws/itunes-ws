/**
 * Test TracksContainer sagas
 */

/* eslint-disable redux-saga/yield-effects */
import { takeLatest, call, put } from 'redux-saga/effects';
import tracksContainerSaga, { requestGetTrackDetails, requestGetTracks } from '../saga';
import { trackContainerTypes } from '../reducer';
import { getSongs } from '@app/services/itunesApi';
import { apiResponseGenerator } from '@app/utils/testUtils';

describe('TracksContainer saga tests', () => {
  const generator = tracksContainerSaga();
  let trackName = 'Arijit';
  let trackId = 123456;
  let requestGetTracksGenerator = null;
  let requestGetTrackDetailsGenerator = null;

  it('should start task to watch for REQUEST_GET_TRACKS', () => {
    expect(generator.next().value).toEqual(takeLatest(trackContainerTypes.REQUEST_GET_TRACKS, requestGetTracks));
  });

  it('should start task to watch for SUCCESS_GET_TRACKS', () => {
    requestGetTracksGenerator = requestGetTracks({ trackName });
    const res = requestGetTracksGenerator.next().value;
    expect(res).toEqual(call(getSongs, trackName));

    const trackResponse = {
      // eslint-disable-next-line prettier/prettier
      results: [
        { name: 'song1', trackId: 1 },
        { name: 'song2', trackId: 2 }
      ]
    };

    const expectedRes = { 1: { name: 'song1', trackId: 1 }, 2: { name: 'song2', trackId: 2 } };
    expect(requestGetTracksGenerator.next(apiResponseGenerator(true, trackResponse)).value).toEqual(
      put({
        type: trackContainerTypes.SUCCESS_GET_TRACKS,
        data: expectedRes
      })
    );
  });

  it('should start task to watch for FAILURE_GET_TRACKS', () => {
    trackName = 'Arijit';
    requestGetTracksGenerator = requestGetTracks({ trackName });
    const res = requestGetTracksGenerator.next().value;
    expect(res).toEqual(call(getSongs, trackName));

    const errorResponse = {
      errorMessage: 'There is an error while fetching the tracks data'
    };

    expect(requestGetTracksGenerator.next(apiResponseGenerator(false, errorResponse)).value).toEqual(
      put({
        type: trackContainerTypes.FAILURE_GET_TRACKS,
        error: errorResponse
      })
    );
  });

  it('should start task to watch for REQUEST_GET_TRACK_DETAILS', () => {
    expect(generator.next().value).toEqual(
      takeLatest(trackContainerTypes.REQUEST_GET_TRACK_DETAILS, requestGetTrackDetails)
    );
  });

  it('should ensure that the action SUCCESS_GET_TRACK_DETAILS is dispatched when the api call succeeds', () => {
    const dataObj = { 123456: { name: 'song1', trackId: 123456 } };
    requestGetTrackDetailsGenerator = requestGetTrackDetails({ trackId });
    requestGetTrackDetailsGenerator.next();

    expect(requestGetTrackDetailsGenerator.next(dataObj).value).toEqual(
      put({
        type: trackContainerTypes.SUCCESS_GET_TRACK_DETAILS,
        data: dataObj[trackId]
      })
    );
  });

  it('should ensure that the action FAILURE_GET_TRACK_DETAILS is dispatched when the api call fails', () => {
    const dataObj = {};
    requestGetTrackDetailsGenerator = requestGetTrackDetails({});
    requestGetTrackDetailsGenerator.next();

    expect(requestGetTrackDetailsGenerator.next(dataObj).value).toEqual(
      put({
        type: trackContainerTypes.FAILURE_GET_TRACK_DETAILS
      })
    );
  });
});
