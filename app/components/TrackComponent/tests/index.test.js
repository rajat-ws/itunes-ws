/**
 *
 * Tests for TrackComponent
 *
 */

import React from 'react';
import { fireEvent } from '@testing-library/dom';
import { renderProvider, renderWithIntl, timeout } from '@utils/testUtils';
import TrackComponent from '../index';

describe('<TrackComponent />', () => {
  let artistName;
  let collectionName;
  let imageUrl;
  let trackUrl;
  let handlePauseTrackWrapperSpy;

  beforeEach(() => {
    (artistName = 'Arijit'),
      (collectionName = 'Some collection'),
      (trackUrl =
        'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview125/v4/d4/06/39/d4063988-a5c8-974e-059b-5233110a322c/mzaf_2253161526891008132.plus.aac.p.m4a'),
      (imageUrl =
        'https://www.google.com/url?sa=i&url=https%3A%2F%2Fdribbble.com%2Fshots%2F14395014-Music-Logo&psig=AOvVaw3I_T0J8_ZRKW_g4VF_KmKz&ust=1630933127025000&source=images&cd=vfe&ved=2ahUKEwiT5uO-8efyAhWVHLcAHVSbCvQQjRx6BAgAEAk');

    handlePauseTrackWrapperSpy = jest.fn();
  });

  it('should render and match the snapshot', () => {
    const { baseElement } = renderWithIntl(
      <TrackComponent
        artistName={artistName}
        imageUrl={imageUrl}
        collectionName={collectionName}
        trackUrl={trackUrl}
        handlePauseTrackWrapper={handlePauseTrackWrapperSpy}
      />
    );
    expect(baseElement).toMatchSnapshot();
  });

  it('should contain 1 TrackComponent component', () => {
    const { getAllByTestId } = renderWithIntl(<TrackComponent />);
    expect(getAllByTestId('track-component').length).toBe(1);
  });

  it('should render the PLAY text on PlayTrackBtn button', () => {
    const { queryByRole } = renderProvider(
      <TrackComponent trackUrl={trackUrl} handlePauseTrackWrapper={handlePauseTrackWrapperSpy} />
    );
    const button = queryByRole('button');

    expect(button).toHaveTextContent(/play/i);
  });

  it('should render the PAUSE text on PlayTrackBtn button when the play is clicked', async () => {
    let handlePlayPauseSpy = jest.fn();
    const { queryByRole } = renderProvider(
      <TrackComponent trackUrl={trackUrl} handlePauseTrackWrapper={handlePauseTrackWrapperSpy} />
    );

    const button = queryByRole('button');

    expect(button).toHaveTextContent(/play/i);
    fireEvent.click(button, { onclick: handlePlayPauseSpy() });
    await timeout(1000);
    expect(button).toHaveTextContent(/pause/i);
  });
});
