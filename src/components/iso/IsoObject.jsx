import React, { useMemo } from 'react';
import { KINDS } from './kinds';

/* A monochrome isometric sculpture drawn as SVG, looping with CSS only: no WebGL, no JavaScript per frame.
   Faces are filled with the page colour so nearer boxes hide the lines of farther ones. */
const S = 10;
const proj = (x, y, z) => [(x - y) * 0.866 * S, (x + y) * 0.5 * S - z * S];
const pts = (list) => list.map((p) => p.join(',')).join(' ');

export default function IsoObject({ kind = 'layers', className = '' }) {
  const { boxes, box } = useMemo(() => {
    const src = [...(KINDS[kind] || KINDS.layers)].sort((a, c) => a.x + a.y + a.z - (c.x + c.y + c.z));
    let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
    const out = src.map((o) => {
      const { x, y, z, w, d, h } = o;
      const top = [proj(x, y, z + h), proj(x + w, y, z + h), proj(x + w, y + d, z + h), proj(x, y + d, z + h)];
      const right = [proj(x + w, y, z), proj(x + w, y + d, z), proj(x + w, y + d, z + h), proj(x + w, y, z + h)];
      const front = [proj(x, y + d, z), proj(x + w, y + d, z), proj(x + w, y + d, z + h), proj(x, y + d, z + h)];
      [...top, ...right, ...front].forEach(([px, py]) => {
        minX = Math.min(minX, px); maxX = Math.max(maxX, px);
        minY = Math.min(minY, py - o.amp * S * 1.2); maxY = Math.max(maxY, py + 2);
      });
      return { ...o, top, right, front };
    });
    return { boxes: out, box: [minX - 4, minY - 4, maxX - minX + 8, maxY - minY + 8] };
  }, [kind]);

  return (
    <svg viewBox={box.join(' ')} className={className} aria-hidden="true" fill="none" strokeLinejoin="round">
      {boxes.map((o, i) => (
        <g key={i} className="iso-b" style={{ '--amp': `${-o.amp * S}px`, '--d': `${-o.ph}s` }}>
          <polygon points={pts(o.front)} fill="rgb(var(--bg-rgb) / 0.92)" stroke="rgb(var(--fg) / 0.5)" strokeWidth="0.9" vectorEffect="non-scaling-stroke" />
          <polygon points={pts(o.right)} fill="rgb(var(--bg-rgb) / 0.92)" stroke="rgb(var(--fg) / 0.5)" strokeWidth="0.9" vectorEffect="non-scaling-stroke" />
          <polygon points={pts(o.top)} fill="rgb(var(--fg) / 0.07)" stroke="rgb(var(--fg) / 0.7)" strokeWidth="0.9" vectorEffect="non-scaling-stroke" />
        </g>
      ))}
    </svg>
  );
}
