'use client';

import { ChakraProvider } from '@chakra-ui/react';
import React, { PropsWithChildren } from 'react';
import theme from '~/design/theme';

export const Providers: React.FC<PropsWithChildren> = ({ children }) => {
  return <ChakraProvider theme={theme}>{children}</ChakraProvider>;
};
