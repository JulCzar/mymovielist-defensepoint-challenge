import { Grid } from '@chakra-ui/react';
import React, { useMemo } from 'react';

interface InfinityGridProps<T> {
  items: T[];
  render: (i: T) => JSX.Element;
  Skeleton?: React.FC | React.ElementType;
  isLoading?: boolean;
  keyExtractor?: (i: T) => string;
  skeletonCount?: number;
}

function InfinityGrid<T>({
  items,
  render,
  skeletonCount = 5,
  isLoading = false,
  keyExtractor,
  Skeleton = () => <div />,
}: InfinityGridProps<T>): JSX.Element {
  const skeletonKeys = useMemo(
    () =>
      '.'
        .repeat(skeletonCount)
        .split('')
        .map(() => crypto.randomUUID()),
    []
  );
  return (
    <Grid
      templateColumns='repeat(auto-fill, minmax(220px, 1fr))'
      gridGap={4}
      minH={300}
      mt={4}>
      {items.map(item => (
        <React.Fragment key={keyExtractor?.(item)}>
          {render(item)}
        </React.Fragment>
      ))}
      {!isLoading ? null : skeletonKeys.map(key => <Skeleton key={key} />)}
    </Grid>
  );
}

export default InfinityGrid;
