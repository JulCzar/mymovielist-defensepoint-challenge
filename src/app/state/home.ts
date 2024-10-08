import axios from 'axios';
import { Duration } from 'persistor-node';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useLoading, useScroll } from '~/business/hooks';
import { usePersistentStorage } from '~/business/hooks/useLocalStorage';
import {
  APIMoviesResponse,
  MovieListPaginated,
} from '~/business/models/movies';
import { storageKeys } from '~/constants/storageKeys';

export const useHome = () => {
  const persistentStorage = usePersistentStorage();
  const [movies, setMovies] = useState<MovieListPaginated>({});
  const [noNextPage, setNoNextPage] = useState(false);
  const [currPage, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  const [movieName, setMovieName] = useState<string>('');

  const [isLoading, loading] = useLoading();

  const containerRef = useRef<HTMLDivElement>(null);
  const scroll = useScroll({ wait: 64 });

  const loadNextPage = async () => {
    if (noNextPage || !movieName) return;
    if (total && getMovieList().length + 10 > total) {
      setNoNextPage(true);
    }

    try {
      const { data } = await axios.get<APIMoviesResponse>('/api/movie/byName', {
        params: {
          name: movieName,
          page: currPage,
        },
      });

      const movieListPaginated: MovieListPaginated = {
        ...movies,
        [currPage]: data.Search,
      };

      setTotal(+data.totalResults);
      setPage(p => p + 1);
      setMovies(movieListPaginated);
    } catch (e) {
      console.log(e);
    }
  };

  const getMovieList = useCallback(
    () => Object.values(movies).flat().filter(Boolean),
    [movies]
  );

  useEffect(() => {
    const currPage =
      persistentStorage?.getItem<number>(storageKeys.CURRENT_PAGE) ?? 1;
    const movies = persistentStorage?.getItem<MovieListPaginated>(
      storageKeys.MOVIES
    );

    if (!movies) {
      loadNextPage();
      return;
    } else {
      setMovies(movies);
      setPage(currPage);
    }
  }, []);

  useEffect(() => {
    if (!movieName) return;
    if (isLoading) return;

    setNoNextPage(false);
    setTotal(0);
    setPage(1);
    setMovies({});

    const timer = setTimeout(
      () =>
        Promise.resolve(0)
          .then(loading.start)
          .then(loadNextPage)
          .finally(loading.stop),
      500
    );
    return () => {
      clearTimeout(timer);
    };
  }, [movieName]);

  useEffect(() => {
    persistentStorage?.setItem(storageKeys.MOVIES, movies, {
      expireIn: new Duration({ minutes: 5 }),
    });
    persistentStorage?.setItem(storageKeys.CURRENT_PAGE, currPage, {
      expireIn: new Duration({ minutes: 5 }),
    });
  }, [movies, currPage]);

  useEffect(() => {
    if (!containerRef.current || !scroll.y) return;

    if (containerRef.current instanceof Element) {
      const { scrollHeight } = containerRef.current;
      const currentScroll = scroll.y;
      const screenHeight = window.outerHeight;
      const distanceToPageBottom =
        scrollHeight - (currentScroll + screenHeight);

      if (distanceToPageBottom < 2000)
        Promise.resolve(0)
          .then(loading.start)
          .then(loadNextPage)
          .finally(loading.stop);
    }
  }, [scroll]);

  return {
    containerRef,
    getMovieList,
    movieName,
    setMovieName,
    isLoading,
  };
};
