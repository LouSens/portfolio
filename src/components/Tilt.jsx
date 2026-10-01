import React from 'react';
import { motion } from 'framer-motion';

/* Flat hover treatment that matches the rest of the site: the card lifts a few pixels and its
   border picks up the accent. (This used to tilt in 3D with a white shine, which did not fit.)
   Kept under the same name so every caller keeps working. */
export default function Tilt({ children, className = '', as = 'div', ...rest }) {
  const Comp = motion[as] || motion.div;
  return (
    <Comp
      whileHover={{ y: -3 }}
      transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
      className={`relative hover:border-[var(--accent)]/40 ${className}`}
      {...rest}
    >
      {children}
    </Comp>
  );
}
