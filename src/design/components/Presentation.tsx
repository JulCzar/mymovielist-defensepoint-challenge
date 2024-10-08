import { Flex, Heading, Link, Spacer, Text, VStack } from '@chakra-ui/react';
import React from 'react';

const Presentation: React.FC = () => (
  <Flex wrap='wrap'>
    <Heading color='fontColor.600' fontSize={['3xl', '6xl']} w='lg'>
      Welcome to <br />
      <Text as='span' color='yellow.400'>
        My Movie List!
      </Text>
      !
    </Heading>
    <Spacer />
    <VStack spacing={4} w={['100%', '100%', '100%', '100%', 'md']}>
      <Text color='fontColor.400' fontSize={['sm', 'md']} textAlign='justify'>
        My Movie List is a service that utilizes open movie database api{' '}
        <Link href='https://www.omdbapi.com/'>OMDb API</Link> to list popular
        movies and keep control over the watched titles.
        <br />
        To use it is simple, just search for the movie in the input below you
        can go further in the search with the help of our filters and then mark
        the progress of the watched titles, the history will be kept with your
        browser, so remember to export it if you want to save it before
        formatting the computer or changing the browser.
      </Text>
    </VStack>
  </Flex>
);

export default Presentation;
