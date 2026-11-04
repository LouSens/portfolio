import { useEffect, useState } from 'react';

/* The 3D walk is for large screens only. Phones, tablets, anyone who prefers reduced motion, and `?flat` in the address
   get the light page: same content, nothing to flight through or to download for it. */
const compute = () => {
  if (typeof window === 'undefined') return false;
  if (/[?&]flat\b/.test(window.location.search)) return false;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false;
  if ((navigator.hardwareConcurrency || 8) < 4) return false;
  return window.matchMedia('(min-width: 1100px) and (min-height: 640px) and (pointer: fine)').matches;
};

export function useSpaceMode() {
  const [on, setOn] = useState(compute);
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1100px) and (min-height: 640px) and (pointer: fine)');
    const update = () => setOn(compute());
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);
  return on;
}
