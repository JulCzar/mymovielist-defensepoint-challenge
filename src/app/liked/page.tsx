'use client';
import { Box, Flex, Heading } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { FaHeart } from 'react-icons/fa';
import { useMovieData, usePersistentStorage } from '~/business/hooks';
import { MovieInfo } from '~/business/models/movies';

import { InfinityGrid, MovieCard } from '~/design/components';
import Template from '~/design/template';

const Liked: React.FC = () => {
  const { getLikedMovies } = useMovieData();
  const persistentStorage = usePersistentStorage();
  const [movies, setMovies] = useState<MovieInfo[]>([]);

  useEffect(() => {
    const likedMovies = getLikedMovies();

    const likedMoviesInfo = likedMovies.sort((a, b) => {
      if (b.Title > a.Title) return -1;
      if (a.Title > b.Title) return 1;
      return 0;
    });

    setMovies(likedMoviesInfo);
  }, [persistentStorage]);

  return (
    <Template>
      <Flex gridGap={6}>
        <FaHeart color='#d33c3c' size={40} />
        <Heading color='fontColor.600' fontSize='4xl'>
          Favoritos
        </Heading>
      </Flex>
      <Box>
        <InfinityGrid
          items={movies}
          keyExtractor={movie => movie.imdbID}
          render={movie => (
            <Flex justify='center'>
              <MovieCard movie={movie} />
            </Flex>
          )}
        />
      </Box>
    </Template>
  );
};

export default Liked;
