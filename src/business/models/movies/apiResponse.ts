import { MovieInfo } from './info';

export interface APIMoviesResponse {
  Search: MovieInfo[];
  totalResults: string;
  Response: string;
}
