import { useEffect, useState } from 'react';

export const usePromise = <T>(promise?: Promise<T>) => {
  const [value, setValue] = useState<T>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!promise) {
      setLoading(false);
      return;
    }
    promise?.then((v) => {
      setLoading(false);
      setValue(v);
    });
  }, [promise]);

  return {
    value,
    loading,
  };
};
