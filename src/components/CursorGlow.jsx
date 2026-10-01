import React, { useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

/* A soft accent light that trails the cursor across the whole page. Desktop pointers only. */
export default function CursorGlow() {
  const x = useMotionValue(-600);
  const y = useMotionValue(-600);
  const sx = useSpring(x, { stiffness: 90, damping: 22, mass: 0.6 });
  const sy = useSpring(y, { stiffness: 90, damping: 22, mass: 0.6 });

  useEffect(() => {
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
    const move = (e) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    window.addEventListener('pointermove', move, { passive: true });
    return () => window.removeEventListener('pointermove', move);
  }, [x, y]);

  return (
    <motion.div
      aria-hidden="true"
      style={{ x: sx, y: sy }}
      className="pointer-events-none fixed left-0 top-0 z-[5] hidden [@media(hover:hover)]:block"
    >
      <div className="-translate-x-1/2 -translate-y-1/2 w-[560px] h-[560px] rounded-full bg-[radial-gradient(circle,rgba(255,90,54,0.11),transparent_65%)]" />
    </motion.div>
  );
}
