import {
  AccordionButton,
  AccordionButtonProps,
  AccordionItem,
  AccordionPanel,
  Text,
} from '@chakra-ui/react';
import React from 'react';

interface ListItemProps extends AccordionButtonProps {
  title: string;
  icon: React.ReactNode;
  spacing?: number;
}

const ListItem: React.FC<ListItemProps> = ({
  title,
  icon,
  spacing,
  children,
  ...rest
}) => {
  return (
    <AccordionItem>
      <AccordionButton {...rest}>
        {icon}
        <Text ml={spacing}>{title}</Text>
      </AccordionButton>
      {children && <AccordionPanel>{children}</AccordionPanel>}
    </AccordionItem>
  );
};

export default ListItem;
