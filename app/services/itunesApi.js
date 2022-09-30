import { generateApiClient } from '@utils/apiUtils';
const itunesApi = generateApiClient('itunes');

export const getSongs = trackName => itunesApi.get(`/search?term=${trackName}`);
