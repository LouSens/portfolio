import React, { useRef } from 'react';
import { motion, useTransform } from 'framer-motion';

// The route the plane flies when the hero scrolls away, in the drawing's own units: it climbs along its nose, loops
// over the top, then swoops down and out past the bottom right. It starts at the centre of the plane.
const FLIGHT = 'M 211 179 C 300 105, 400 -10, 330 -70 C 270 -120, 170 -60, 200 20 C 225 90, 320 140, 380 260 C 420 340, 430 470, 400 640';
const START = { x: 211, y: 179 };

// Where the plane is on the route at progress v (0 to 1), and which way it points
function pose(path, v) {
  if (!path) return { x: 0, y: 0, angle: 0 };
  const total = path.getTotalLength();
  const at = Math.min(Math.max(v, 0), 1) * total;
  const p = path.getPointAtLength(at);
  const a = path.getPointAtLength(Math.max(at - 1, 0));
  const b = path.getPointAtLength(Math.min(at + 1, total));
  return { x: p.x - START.x, y: p.y - START.y, angle: (Math.atan2(b.y - a.y, b.x - a.x) * 180) / Math.PI };
}

/* A paper plane drawn as folded planes, drifting up and down with a dotted trail behind it. The drift is CSS only and
   stops when the visitor asks for less motion. `flight` (optional motion values from the hero) flies it along FLIGHT
   as the page scrolls, drawing a dotted trail behind it. It takes its colours from the page, so it works in both
   themes. */
export default function PaperPlane({ className = '', flight }) {
  const line = 'rgb(var(--fg) / 0.55)';
  const routeRef = useRef(null);
  const zero = useTransform(() => 0);
  const t = flight?.t ?? zero;
  const x = useTransform(t, (v) => pose(routeRef.current, v).x);
  const y = useTransform(t, (v) => pose(routeRef.current, v).y);
  // Turn the plane by how far the route has turned since the start, so it keeps pointing where it flies
  const rotate = useTransform(t, (v) => pose(routeRef.current, v).angle - pose(routeRef.current, 0).angle);

  return (
    <svg viewBox="0 0 420 380" className={className} aria-hidden="true" fill="none" strokeLinejoin="round" overflow="visible">
      {/* the resting trail and specks, which fade once the plane leaves */}
      <motion.g style={{ opacity: flight?.decor }}>
        <path className="plane-trail" d="M14 322 C 66 300 30 236 96 252 S 134 300 176 284" stroke="rgb(var(--fg) / 0.4)" strokeWidth="2" strokeLinecap="round" strokeDasharray="2 9" />
        <circle cx="46" cy="96" r="3" fill="rgb(var(--fg) / 0.18)" />
        <circle cx="356" cy="300" r="4" fill="rgb(var(--fg) / 0.14)" />
        <circle cx="388" cy="170" r="2.5" fill="rgb(var(--fg) / 0.2)" />
      </motion.g>

      {flight && (
        <>
          {/* the trail of the flight: a dotted line along the route, revealed up to where the plane is */}
          <defs>
            <mask id="plane-flight-mask" maskUnits="userSpaceOnUse" x="-600" y="-600" width="1600" height="1600">
              <motion.path d={FLIGHT} stroke="white" strokeWidth="10" fill="none" style={{ pathLength: t }} />
            </mask>
          </defs>
          <motion.path
            ref={routeRef}
            d={FLIGHT}
            mask="url(#plane-flight-mask)"
            stroke="rgb(var(--fg) / 0.45)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeDasharray="2 9"
            style={{ opacity: flight.trail }}
          />
        </>
      )}

      <motion.g style={flight ? { x, y, rotate, scale: flight.scale, opacity: flight.opacity } : undefined}>
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
