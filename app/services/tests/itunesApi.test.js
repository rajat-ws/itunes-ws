import MockAdapter from 'axios-mock-adapter';
import { getApiClient } from '@utils/apiUtils';
import { getSongs } from '../itunesApi';

describe('iTunes Search API tests', () => {
  const songName = 'Naina';
  it('should make the api call to "/search?term=${songName}"', async () => {
    const mock = new MockAdapter(getApiClient().axiosInstance);
    const data = [
      {
        resultsCount: 1,
        results: [{ songName }]
      }
    ];
    mock.onGet(`/search?term=${songName}`).reply(200, data);
    const res = await getSongs(songName);
    expect(res.data).toEqual(data);
  });
});
