/**
 *
 * Tests for TrackComponent
 *
 */

import React from 'react';
import { renderWithIntl } from '@utils/testUtils';
import TrackComponent from '../index';

describe('<TrackComponent />', () => {
  let artistName;
  let collectionName;
  let imgUrl;

  beforeEach(() => {
    (artistName = 'Arijit'),
      (collectionName = 'Some collection'),
      (imgUrl =
        'https://www.google.com/url?sa=i&url=https%3A%2F%2Fdribbble.com%2Fshots%2F14395014-Music-Logo&psig=AOvVaw3I_T0J8_ZRKW_g4VF_KmKz&ust=1630933127025000&source=images&cd=vfe&ved=2ahUKEwiT5uO-8efyAhWVHLcAHVSbCvQQjRx6BAgAEAk');
  });

  it('should render and match the snapshot', () => {
    const { baseElement } = renderWithIntl(
      <TrackComponent artistName={artistName} imgUrl={imgUrl} collectionName={collectionName} />
    );
    expect(baseElement).toMatchSnapshot();
  });

  it('should contain 1 TrackComponent component', () => {
    const { getAllByTestId } = renderWithIntl(<TrackComponent />);
    expect(getAllByTestId('track-component').length).toBe(1);
  });
});
