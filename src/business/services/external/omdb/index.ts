import axios from 'axios';

export const omdb = axios.create({
  baseURL: `http://www.omdbapi.com/`,
  timeout: 5000,
  headers: {
    'Cache-Control': 's-maxage=10, stale-while-revalidate',
  },
  params: {
    apikey: process.env.OMDB_API_KEY,
  },
});
