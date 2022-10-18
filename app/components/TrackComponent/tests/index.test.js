/**
 *
 * Tests for TrackComponent
 *
 */

import React from 'react';
import * as routeData from 'react-router-dom';
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

  it('should handle the handleRoute navigation to TrackDetails Container', () => {
    const mockHistory = {
      push: jest.fn()
    };

    const mockHistorySpy = jest.spyOn(routeData, 'useHistory').mockReturnValue(mockHistory);

    const { getByTestId } = renderProvider(<TrackComponent trackData={MOCK_TRACK_DATA} isShowDetailsButton={true} />);
    const button = getByTestId('showDetails');
    expect(button).toHaveTextContent(/Show Details/i);
    fireEvent.click(button);
    expect(mockHistorySpy).toHaveBeenCalled();
  });

  it('should render the PLAY text on PlayTrackBtn button', () => {
    const { getByRole } = renderProvider(
      <TrackComponent trackData={MOCK_TRACK_DATA} handlePauseTrackWrapper={handlePauseTrackWrapperSpy} />
    );
    const button = getByRole('button');

    expect(button).toHaveTextContent(/play/i);
  });

  it('should render the PAUSE text on PlayTrackBtn button when the play is clicked', async () => {
    const { getByRole } = renderProvider(
      <TrackComponent trackData={MOCK_TRACK_DATA} handlePauseTrackWrapper={handlePauseTrackWrapperSpy} />
    );

    // const mockUseRef = {
    //   current: {
    //     play: jest.fn(),
    //     pause: jest.fn()
    //   }
    // };

    // const mockUseRefSpy = jest.spyOn(React, 'useRef').mockReturnValueOnce(mockUseRef);

    const button = getByRole('button');
    expect(button).toHaveTextContent(/play/i);
    fireEvent.click(button);
    await timeout(500);
    expect(button).toHaveTextContent(/pause/i);
    // expect(mockUseRefSpy).toHaveBeenCalled();
  });
});
