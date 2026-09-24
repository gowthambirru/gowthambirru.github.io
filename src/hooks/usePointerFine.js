import { useState, useEffect } from 'react';
import { hasFinePointer } from '../animation/pointer';

export function usePointerFine() {
  const [isFine, setIsFine] = useState(hasFinePointer);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mediaQuery = window.matchMedia('(pointer: fine)');

    const handleChange = () => {
      setIsFine(mediaQuery.matches);
    };

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    } else {
      mediaQuery.addListener(handleChange);
      return () => mediaQuery.removeListener(handleChange);
    }
  }, []);

  return isFine;
}
