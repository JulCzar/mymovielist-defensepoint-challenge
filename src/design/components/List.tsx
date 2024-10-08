import { Accordion } from '@chakra-ui/react';
import React, { PropsWithChildren } from 'react';

const List: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <Accordion allowMultiple defaultIndex={[0]}>
      {children}
    </Accordion>
  );
};

export default List;
