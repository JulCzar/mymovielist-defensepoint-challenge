'use client';
import { Box, Flex, Input, Text } from '@chakra-ui/react';
import type { NextPage } from 'next';

import {
  InfinityGrid,
  MovieCard,
  Presentation,
  MovieSkeleton,
} from '~/design/components';
import Template from '~/design/template';
import { useHome } from './state/home';

const Home: NextPage = () => {
  const state = useHome();

  const movieList = state.getMovieList();

  return (
    <Template containerRef={state.containerRef}>
      <Presentation />

      <Box>
        <Flex gridGap={4} align='center' my={4}>
          <Box w={{ base: '100%', xl: 'md' }}>
            <Input
              name='search'
              color='white'
              placeholder='Search for a movie'
              value={state.movieName}
              onChange={({ target }) => {
                state.setMovieName(target.value);
              }}
            />
          </Box>
        </Flex>
        {movieList.length > 0 || state.isLoading ? (
          <InfinityGrid
            skeletonCount={10}
            Skeleton={MovieSkeleton}
            items={movieList}
            isLoading={state.isLoading}
            keyExtractor={movie => movie.imdbID}
            render={movie => (
              <Flex justify='center'>
                <MovieCard movie={movie} />
              </Flex>
            )}
          />
        ) : (
          <Flex w='full' h='400px' justifyContent='center' alignItems='center'>
            <Text color='white' fontSize='xl'>
              {state.movieName
                ? 'No movies found'
                : 'Search for a movie with the input above'}
            </Text>
          </Flex>
        )}
      </Box>
    </Template>
  );
};

export default Home;
