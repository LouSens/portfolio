import React from 'react';

/* The mark: three isometric layers stacked, the top one in the accent colour. It echoes the layered object in the
   hero, so the logo and the page speak the same shape. */
export default function Logo({ className = 'w-8 h-8' }) {
  const layer = (y, fill, op) => (
    <g transform={`translate(0 ${y})`}>
      <path d="M16 3 L28 9.5 L16 16 L4 9.5 Z" fill={fill} fillOpacity={op} />
      <path d="M4 9.5 V12 L16 18.5 L28 12 V9.5 L16 16 Z" fill={fill} fillOpacity={op * 0.55} />
    </g>
  );
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true">
      {layer(11, 'rgb(var(--fg))', 0.35)}
      {layer(5.5, 'rgb(var(--fg))', 0.65)}
      {layer(0, 'var(--accent)', 1)}
    </svg>
  );
}
