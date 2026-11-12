import React from 'react';
import { motion } from 'framer-motion';

/* A paper plane drawn as folded planes, drifting up and down with a dotted trail behind it. The drift is CSS only and
   stops when the visitor asks for less motion. `flight` (optional motion values) moves the plane and fades the trail,
   so the hero can make it take off as the page scrolls. It takes its colours from the page, so it works in both
   themes. */
export default function PaperPlane({ className = '', flight }) {
  const line = 'rgb(var(--fg) / 0.55)';
  return (
    <svg viewBox="0 0 420 380" className={className} aria-hidden="true" fill="none" strokeLinejoin="round" overflow="visible">
      {/* trail */}
      <motion.g style={{ opacity: flight?.trail }}>
        <path className="plane-trail" d="M14 322 C 66 300 30 236 96 252 S 134 300 176 284" stroke="rgb(var(--fg) / 0.4)" strokeWidth="2" strokeLinecap="round" strokeDasharray="2 9" />
        <circle cx="46" cy="96" r="3" fill="rgb(var(--fg) / 0.18)" />
        <circle cx="356" cy="300" r="4" fill="rgb(var(--fg) / 0.14)" />
        <circle cx="388" cy="170" r="2.5" fill="rgb(var(--fg) / 0.2)" />
      </motion.g>

      <motion.g style={flight ? { x: flight.x, y: flight.y, rotate: flight.rotate, scale: flight.scale, opacity: flight.opacity } : undefined}>
      <g className="plane-float">
        {/* left wing */}
        <polygon points="360,58 62,152 158,214" fill="rgb(var(--fg) / 0.1)" stroke={line} strokeWidth="1.4" />
        {/* left lower fold */}
        <polygon points="62,152 188,300 158,214" fill="rgb(var(--fg) / 0.22)" stroke={line} strokeWidth="1.4" />
        {/* right wing, the lit side */}
        <polygon points="360,58 158,214 286,250" fill="var(--accent)" stroke={line} strokeWidth="1.4" />
        {/* underside of the right wing */}
        <polygon points="158,214 286,250 188,300" fill="var(--accent)" fillOpacity="0.62" stroke={line} strokeWidth="1.4" />
        {/* centre crease */}
        <line x1="360" y1="58" x2="188" y2="300" stroke="rgb(var(--fg) / 0.5)" strokeWidth="1.2" />
      </g>
      </motion.g>
    </svg>
  );
}
