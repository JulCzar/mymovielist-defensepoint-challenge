import type { Metadata } from 'next';
import { PropsWithChildren } from 'react';
import { Providers } from './providers';

export const metadata: Metadata = {
  title: 'my movie list',
  description: 'an OMDb dashboard to track your favorite movies',
};

const RootLayout: React.FC<PropsWithChildren> = ({ children }) => (
  <html lang='en'>
    <body>
      <Providers>{children}</Providers>
    </body>
  </html>
);

export default RootLayout;
