import { MOCK_TRACK_DATA } from '../mockData';

it('should mock the key in the mockData object', () => {
  const artistId = MOCK_TRACK_DATA.artistId;
  expect(artistId).toBe(76531581);
});
