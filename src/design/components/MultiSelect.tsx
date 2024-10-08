import React from 'react';
import Select, { GroupBase, Props } from 'react-select';

import { colors } from '../colors';

const MultiSelect = <
  Option,
  Group extends GroupBase<Option> = GroupBase<Option>
>(
  props: Props<Option, true, Group>
) => {
  return (
    <Select
      {...props}
      hideSelectedOptions
      styles={{
        container: provided => ({
          ...provided,
          width: '100%',
          ':focus': {
            borderColor: '#fff9',
          },
        }),
        control: provided => ({
          ...provided,
          background: '#1C202F',
          borderColor: '#1C202F',
          ':hover': {
            borderColor: '#1C202F',
          },
        }),
        indicatorSeparator: () => ({}),
        multiValue: provided => ({
          ...provided,
          backgroundColor: '#272E3E',
        }),
        multiValueLabel: provided => ({
          ...provided,
          color: colors['font.600'],
        }),
      }}
    />
  );
};

export default MultiSelect;
