'use client';

import {
  Box,
  Divider,
  Flex,
  Heading,
  IconButton,
  Image,
  Spacer,
  Text,
  useToast,
} from '@chakra-ui/react';
import axios from 'axios';
import { NextPage } from 'next';
import { useEffect, useState } from 'react';
import { FaHeart } from 'react-icons/fa';
import { FiHeart } from 'react-icons/fi';

import { useMovieData } from '~/business/hooks';
import { MovieDetails } from '~/business/models/movies';
import { MovieDetailSkeleton } from '~/design/components';
import Template from '~/design/template';

interface URLParams {
  params: {
    id: string;
  };
}

const Movie: NextPage<URLParams> = ({ params }) => {
  const [data, setData] = useState<MovieDetails | null>(null);
  const [isMovieLiked, setLiked] = useState(false);

  const { movieIsLiked, likeMovie, unlikeMovie } = useMovieData();

  const toast = useToast();

  useEffect(() => {
    if (!params.id) return;

    axios
      .get<MovieDetails>(`/api/movie/${params.id}`)
      .then(({ data }) => setData(data))
      .catch(() =>
        toast({
          title: 'We were unable to load this movie',
          status: 'warning',
        })
      );
  }, [params.id]);

  useEffect(() => {
    if (!data) return;

    const isMovieLiked = movieIsLiked(data);

    setLiked(isMovieLiked);
  }, [data]);

  function toggleLikedMovie() {
    if (!data) return;

    if (movieIsLiked(data)) {
      unlikeMovie(data);
      setLiked(false);
    } else {
      likeMovie(data);
      setLiked(true);
    }
  }

  if (!data) return <MovieDetailSkeleton />;

  return (
    <Template>
      <Box
        p={0}
        overflow='hidden'
        borderRadius='md'
        backgroundSize='cover'
        backgroundRepeat='no-repeat'
        backgroundImage={data.Poster}>
        <Box
          p={[0, 0, 1, 2, 4, 6]}
          background='#0008'
          backdropFilter='blur(10px)'>
          <Flex wrap='wrap' justify={['center', 'auto']}>
            <Image
              alt=''
              w='100%'
              maxW='300px'
              loading='lazy'
              borderRadius='md'
              boxSize={['auto']}
              src={data.Poster}
            />
            <Flex direction='column' p={[1, 2, 4, 6]} w={['100%', '3xl']}>
              <Heading color='fontColor.600' fontSize='4xl'>
                {data.Title} ({new Date(data.Released).getFullYear()})
              </Heading>
              <Text color='fontColor.400'>{data.Genre}</Text>
              <Text color='fontColor.400'>{data.Director}</Text>
              <Text color='fontColor.400'>{data.Actors}</Text>
              <Divider my={6} />
              <Text color='fontColor.600' mt={4}>
                Sinopse
              </Text>
              <Text color='fontColor.400' textAlign='justify'>
                {data.Plot || 'N/A'}
              </Text>
              <Spacer />
              <Box>
                <IconButton
                  aria-label='favorite'
                  background='red.600'
                  onClick={toggleLikedMovie}
                  icon={
                    isMovieLiked ? (
                      <FaHeart color='white' />
                    ) : (
                      <FiHeart color='white' />
                    )
                  }
                />
              </Box>
            </Flex>
          </Flex>
        </Box>
      </Box>
    </Template>
  );
};

export default Movie;
