import { useState } from 'react';

export const useLoading = (initialState = false) => {
  const [isLoading, setLoading] = useState(initialState);

  const loading = {
    start: () => setLoading(true),
    stop: () => setLoading(false),
    end: () => setLoading(false),
  };

  return [isLoading, loading] as const;
};

export type UseLoading = ReturnType<typeof useLoading>;
export type UseLoadingActions = UseLoading[1];
