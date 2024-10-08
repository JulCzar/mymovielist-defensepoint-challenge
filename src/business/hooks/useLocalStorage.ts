import { PersistentStorage } from 'persistor-node';
import { useEffect, useState } from 'react';

export const usePersistentStorage = () => {
  const [ps, setPS] = useState<PersistentStorage>();

  useEffect(() => {
    const ps = PersistentStorage.getOrCreate('mml', {
      storage: localStorage,
    });

    setPS(ps);
  }, []);

  return ps;
};
