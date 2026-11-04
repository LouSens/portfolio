import React from 'react';

/* Phones and anyone who prefers calm: the same idea as light CSS, with no WebGL or three.js download. */
export default function IsoFallback({ className = '' }) {
  const floors = [0, 1, 2, 3];
  const rhombus = (y) => `150,${y - 38} 232,${y} 150,${y + 38} 68,${y}`;
  return (
    <svg viewBox="0 0 300 300" className={className} aria-hidden="true" fill="none" strokeLinejoin="round">
      {floors.map((f) => {
        const y = 215 - f * 40;
        return (
          <g key={f} className="iso-floor" style={{ '--lift': `${f * -14}px`, animationDelay: `${f * 0.12}s` }}>
            <polygon points={rhombus(y)} stroke="rgb(var(--fg) / 0.5)" fill="rgb(var(--bg-rgb) / 0.55)" strokeWidth="1" />
            <polyline points={`68,${y} 68,${y + 8} 150,${y + 46} 232,${y + 8} 232,${y}`} stroke="rgb(var(--fg) / 0.3)" strokeWidth="1" />
            <polyline points={`150,${y + 38} 150,${y + 46}`} stroke="rgb(var(--fg) / 0.3)" strokeWidth="1" />
          </g>
        );
      })}
    </svg>
  );
}
