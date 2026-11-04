import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

/* A "room" of the page. As it scrolls into view the camera swings in from a different angle, and as it
   leaves it swings away again, so moving down the page reads as walking from room to room rather than
   sliding a long sheet of paper.

   Each room gets its own angle (variant). The movement is a pure function of scroll position, so it
   reverses perfectly when scrolling back up. */

const reduced = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const phone = typeof window !== 'undefined' && window.matchMedia('(max-width: 767px)').matches;

// `in` is the pose while entering (progress 0), `out` the pose while leaving (progress 1).
// Angles are degrees, y/x are pixels. Keep them small: this is a camera move, not a flip.
const VARIANTS = {
  // Pans in from the left like turning a corner
  swingLeft: { origin: '0% 50%', in: { rotateY: 16, x: -70, scale: 0.96 }, out: { rotateY: -8, x: 30, scale: 0.97 } },
  // Pans in from the right
  swingRight: { origin: '100% 50%', in: { rotateY: -16, x: 70, scale: 0.96 }, out: { rotateY: 8, x: -30, scale: 0.97 } },
  // Looks down from above, then settles level: like stepping onto a balcony
  tiltDown: { origin: '50% 0%', in: { rotateX: 14, y: 60, scale: 0.95 }, out: { rotateX: -6, y: -30, scale: 0.97 } },
  // Looks up from below, like leaving a lift
  tiltUp: { origin: '50% 100%', in: { rotateX: -12, y: 70, scale: 0.95 }, out: { rotateX: 7, y: -30, scale: 0.97 } },
  // Pushes straight in through a door
  dolly: { origin: '50% 50%', in: { scale: 0.88, y: 40 }, out: { scale: 0.94, y: -20 } },
};

const REST = { rotateX: 0, rotateY: 0, x: 0, y: 0, scale: 1 };

function useMix(enter, exit, v, key) {
  const a = v.in[key] ?? REST[key];
  const b = v.out[key] ?? REST[key];
  return useTransform([enter, exit], ([e, x]) => REST[key] + (a - REST[key]) * (1 - e) + (b - REST[key]) * x);
}

function Camera({ variant, children, className }) {
  const ref = useRef(null);
  const v = VARIANTS[variant] || VARIANTS.dolly;
  const { scrollYProgress: enter } = useScroll({ target: ref, offset: ['start end', 'start 30%'] });
  const { scrollYProgress: exit } = useScroll({ target: ref, offset: ['end 70%', 'end start'] });

  const rotateX = useMix(enter, exit, v, 'rotateX');
  const rotateY = useMix(enter, exit, v, 'rotateY');
  const x = useMix(enter, exit, v, 'x');
  const y = useMix(enter, exit, v, 'y');
  const scale = useMix(enter, exit, v, 'scale');
  const opacity = useTransform([enter, exit], ([e, x2]) => Math.min(1, 0.15 + e * 0.85) * (1 - x2 * 0.55));

  const style = phone ? { y, opacity } : { rotateX, rotateY, x, y, scale, opacity, transformOrigin: v.origin };

  return (
    <div style={{ perspective: 1500 }} className="w-full">
      <motion.div ref={ref} style={style} className={className}>
        {children}
      </motion.div>
    </div>
  );
}

export default function Scene({ id, variant = 'dolly', className = '', innerClassName = '', as: Tag = 'section', children, ...rest }) {
  if (reduced) {
    return (
      <Tag id={id} className={className} {...rest}>
        {children}
      </Tag>
    );
  }
  return (
    <Tag id={id} className={className} {...rest}>
      <Camera variant={variant} className={innerClassName}>
        {children}
      </Camera>
    </Tag>
  );
}

