import { generateApiClient } from '@utils/apiUtils';
const itunesApi = generateApiClient('itunes');

export const getSongs = trackName => {
  return itunesApi.get(`/search?term=${trackName}`);
};
