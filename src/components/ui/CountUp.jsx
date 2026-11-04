import React, { useEffect, useRef, useState } from 'react';
import { animate, useInView } from 'framer-motion';

/* Counts up once when scrolled into view. The final text sits invisibly underneath so the width never
   changes while counting. */
export default function CountUp({ to, decimals = 0, prefix = '', suffix = '' }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const [n, setN] = useState(0);
  const fmt = (v) => `${prefix}${v.toLocaleString('en-US', { minimumFractionDigits: decimals, maximumFractionDigits: decimals })}${suffix}`;

  useEffect(() => {
    if (!inView || typeof to !== 'number') return undefined;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setN(to);
      return undefined;
    }
    const c = animate(0, to, { duration: 1.3, ease: [0.22, 1, 0.36, 1], onUpdate: setN });
    return () => c.stop();
  }, [inView, to]);

  if (typeof to !== 'number') return <span>{to}</span>;
  return (
    <span ref={ref} className="relative inline-block tabular-nums">
      <span className="invisible" aria-hidden="true">{fmt(to)}</span>
      <span className="absolute left-0 top-0" aria-hidden="true">{fmt(n)}</span>
      <span className="sr-only">{fmt(to)}</span>
    </span>
  );
}
