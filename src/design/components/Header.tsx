import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Spacer,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import Link from 'next/link';
import React from 'react';
import { FiMenu } from 'react-icons/fi';
import { colors } from '~/design/colors';
import Drawer from './Drawer';

const Header: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Flex py={[3, 10]} as='header'>
        <Container maxW='container.xl'>
          <Flex>
            <Heading mr={[2, 20]} color='yellow.400'>
              <Link passHref href='/'>
                <Heading fontSize={['md', 'lg', '2xl']} as='a'>
                  mymovielist-beta
                  <Text color='white' as='span'>
                    .vercel.com
                  </Text>
                </Heading>
              </Link>
            </Heading>
            <Spacer />
            <Box ml={[2, 4]}>
              <Button
                bgColor={colors.backgroundSecondary}
                _hover={{
                  backgroundColor: colors.backgroundSecondary,
                  filter: 'brightness(0.8)',
                  transition: '300ms',
                }}
                _active={{
                  backgroundColor: colors.backgroundSecondary,
                  filter: 'brightness(0.6)',
                  transition: '300ms',
                }}
                colorScheme='teal'
                onClick={onOpen}>
                <FiMenu />
              </Button>
            </Box>
          </Flex>
        </Container>
      </Flex>
      <Drawer isOpen={isOpen} onClose={onClose} />
    </>
  );
};

export default Header;
