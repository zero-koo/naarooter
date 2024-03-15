import { useEffect, useRef } from 'react';

export const useOutsideClick = <T extends HTMLElement>(
  callback: (event: MouseEvent) => void
) => {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as T)) {
        callback(event);
      }
    };

    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, [callback, ref]);

  return ref;
};
