'use client';
import { MovieDetails } from '~/business/models/movies';
import { storageKeys } from '~/constants/storageKeys';
import { usePersistentStorage } from './useLocalStorage';

export const useMovieData = () => {
  const persistentStorage = usePersistentStorage();

  const getLikedMovies = () => {
    return persistentStorage?.getItem<MovieDetails[]>(storageKeys.LIKED) ?? [];
  };

  const likeMovie = (movie: MovieDetails) => {
    const likedMovies = getLikedMovies();

    if (!likedMovies.map(l => l.imdbID).includes(movie.imdbID))
      likedMovies.push(movie);

    persistentStorage?.setItem(storageKeys.LIKED, likedMovies);
  };

  const unlikeMovie = (movie: MovieDetails) => {
    const likedMovies = getLikedMovies();

    const filteredLikedMovies = likedMovies.filter(
      s => s.imdbID !== movie.imdbID
    );

    persistentStorage?.setItem(storageKeys.LIKED, filteredLikedMovies);
  };

  const movieIsLiked = (movie: MovieDetails) => {
    const likedMovies = getLikedMovies();

    if (!likedMovies) return false;

    for (const storedMovie of likedMovies)
      if (storedMovie.imdbID === movie.imdbID) return true;

    return false;
  };

  return {
    getLikedMovies,
    likeMovie,
    unlikeMovie,
    movieIsLiked,
  };
};
