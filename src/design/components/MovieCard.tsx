import { Box, Flex, Image, Text } from '@chakra-ui/react';
import Link from 'next/link';
import React from 'react';

import { MovieInfo } from '~/business/models/movies';

interface MovieCardProps {
  movie: MovieInfo;
}

const accessibleSelection = {
  cursor: 'pointer',
  shadow: '2xl',
  transform: 'scale(1.01)',
};

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => (
  <Link href={`/movie/${movie.imdbID}`}>
    <Box
      shadow='md'
      tabIndex={0}
      overflow='hidden'
      borderRadius='md'
      transition='300ms'
      position='relative'
      _focus={accessibleSelection}
      _hover={accessibleSelection}>
      <Image
        src={
          movie.Poster.toLowerCase() !== 'n/a'
            ? movie.Poster
            : 'https://moviereelist.com/wp-content/uploads/2019/07/poster-placeholder.jpg'
        }
        alt={`poster of movie named ${movie.Title}`}
        height={360}
        loading='lazy'
        width='3xs'
      />
      <Box
        p={4}
        h={140}
        bottom={0}
        width='100%'
        position='absolute'
        backgroundSize='cover'
        backgroundPosition='bottom'
        backgroundRepeat='no-repeat'
        backdropFilter='blur(10px) brightness(0.4)'
        bgGradient='radial(transparent, #fff2)'>
        <Flex>
          <Text color='fontColor.500'>
            <Text as='span' fontWeight='bold' color='yellow.400'>
              {Number.isNaN(+movie.Year)
                ? 'N/A'
                : new Date(movie.Year).getFullYear()}
            </Text>
          </Text>
        </Flex>
        <Text
          color='fontColor.600'
          fontSize='xl'
          fontWeight='extrabold'
          noOfLines={1}>
          {movie.Title}
        </Text>
      </Box>
    </Box>
  </Link>
);

export default MovieCard;
