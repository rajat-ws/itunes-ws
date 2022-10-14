/**
 *
 * Tests for TrackComponent
 *
 */

import React from 'react';
import { fireEvent } from '@testing-library/dom';
import { renderProvider, renderWithIntl, timeout } from '@utils/testUtils';
import TrackComponent from '../index';
import { MOCK_TRACK_DATA } from '@app/utils/mockData';

describe('<TrackComponent />', () => {
  let handlePauseTrackWrapperSpy = jest.fn();

  it('should render and match the snapshot', () => {
    const { baseElement } = renderWithIntl(
      <TrackComponent trackData={MOCK_TRACK_DATA} handlePauseTrackWrapper={handlePauseTrackWrapperSpy} />
    );
    expect(baseElement).toMatchSnapshot();
  });

  it('should contain 1 TrackComponent component', () => {
    const { getAllByTestId } = renderWithIntl(<TrackComponent trackData={MOCK_TRACK_DATA} />);
    expect(getAllByTestId('track-component').length).toBe(1);
  });

  it('should render the PLAY text on PlayTrackBtn button', () => {
    const { queryByRole } = renderProvider(
      <TrackComponent trackData={MOCK_TRACK_DATA} handlePauseTrackWrapper={handlePauseTrackWrapperSpy} />
    );
    const button = queryByRole('button');

    expect(button).toHaveTextContent(/play/i);
  });

  it('should render the PAUSE text on PlayTrackBtn button when the play is clicked', async () => {
    const handlePlayPauseSpy = jest.fn();

    const { queryByRole } = renderProvider(
      <TrackComponent trackData={MOCK_TRACK_DATA} handlePauseTrackWrapper={handlePauseTrackWrapperSpy} />
    );
    const button = queryByRole('button');
    expect(button).toHaveTextContent(/play/i);
    fireEvent.click(button, { onclick: handlePlayPauseSpy() });
    await timeout(500);
    expect(button).toHaveTextContent(/pause/i);
  });

  it('should call the handlePlayPause on PlayTrackBtn when it is clicked', async () => {
    const handlePlayPauseSpy = jest.fn();

    const { queryByRole, queryByTestId } = renderProvider(
      <TrackComponent trackData={MOCK_TRACK_DATA} handlePauseTrackWrapper={handlePauseTrackWrapperSpy} />
    );
    const audio = queryByTestId('trackAudio');
    const button = queryByRole('button');

    fireEvent.click(button, { onclick: handlePlayPauseSpy() });
    await timeout(500);
    expect(handlePlayPauseSpy).toBeCalled();
    expect(handlePauseTrackWrapperSpy).toBeCalledWith({ current: audio });
  });
});
