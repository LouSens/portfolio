import React from 'react';

/* Animated covers drawn as SVG, for projects that have no screenshot worth showing. No words in them: the card
   already carries the title. Colours are fixed (dark with an orange accent) so they look the same in both themes. */
const BG = (
  <>
    <defs>
      <linearGradient id="ca-bg" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="#0b0c12" />
        <stop offset="1" stopColor="#1a1013" />
      </linearGradient>
      <radialGradient id="ca-glow" cx="0.5" cy="1" r="0.8">
        <stop offset="0" stopColor="#FF5A36" stopOpacity="0.32" />
        <stop offset="1" stopColor="#FF5A36" stopOpacity="0" />
      </radialGradient>
    </defs>
    <rect width="160" height="90" fill="url(#ca-bg)" />
    <rect width="160" height="90" fill="url(#ca-glow)" />
  </>
);

function Paddle({ x, flip }) {
  // swings a little around the grip, out of step with the other side
  return (
    <g transform={`translate(${x} 70) scale(${flip ? -1 : 1} 1)`}>
      <g>
        <animateTransform attributeName="transform" type="rotate" values="-8 0 0;14 0 0;-8 0 0" dur="3.2s" repeatCount="indefinite" begin={flip ? '1.6s' : '0s'} calcMode="spline" keySplines="0.4 0 0.2 1;0.4 0 0.2 1" />
        <rect x="-1.6" y="-4" width="3.2" height="12" rx="1.4" fill="#2a2d3a" />
        <rect x="-9" y="-30" width="18" height="27" rx="8.5" fill="#FF5A36" />
        <rect x="-6.4" y="-27.4" width="12.8" height="21.8" rx="6.2" fill="none" stroke="#fff" strokeOpacity="0.35" strokeWidth="0.8" />
        {[-4, 0, 4].map((dx) => <line key={dx} x1={dx} y1="-24" x2={dx} y2="-9" stroke="#fff" strokeOpacity="0.18" strokeWidth="0.6" />)}
      </g>
    </g>
  );
}

export function CourtArt() {
  return (
    <svg viewBox="0 0 160 90" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 w-full h-full" aria-hidden="true">
      {BG}
      {/* court floor and the net */}
      <line x1="0" y1="72" x2="160" y2="72" stroke="#fff" strokeOpacity="0.22" strokeWidth="0.8" />
      <line x1="80" y1="72" x2="80" y2="90" stroke="#fff" strokeOpacity="0.1" strokeWidth="0.6" strokeDasharray="2 2" />
      <rect x="79" y="48" width="2" height="24" rx="1" fill="#e8e8ee" />
      {[52, 56, 60, 64, 68].map((y) => <line key={y} x1="79" y1={y} x2="81" y2={y} stroke="#0b0c12" strokeWidth="0.6" />)}
      <Paddle x={30} />
      <Paddle x={130} flip />
      {/* the ball: back and forth over the net, with a soft shadow on the floor */}
      <circle r="3" fill="#fff">
        <animateMotion dur="3.2s" repeatCount="indefinite" path="M38 50 Q80 -4 122 50 Q80 -4 38 50" calcMode="spline" keyPoints="0;0.5;1" keyTimes="0;0.5;1" keySplines="0.45 0 0.55 1;0.45 0 0.55 1" />
      </circle>
      <ellipse cx="80" cy="72" rx="4" ry="0.9" fill="#000" opacity="0.35">
        <animate attributeName="cx" values="38;122;38" dur="3.2s" repeatCount="indefinite" />
      </ellipse>
    </svg>
  );
}

export function RagArt() {
  const doc = (x, y, o) => (
    <g key={`${x}${y}`} opacity={o}>
      <rect x={x} y={y} width="30" height="38" rx="3" fill="#161821" stroke="#fff" strokeOpacity="0.2" strokeWidth="0.7" />
      {[8, 14, 20, 26].map((dy) => <line key={dy} x1={x + 5} y1={y + dy} x2={x + 25 - (dy % 12)} y2={y + dy} stroke="#fff" strokeOpacity="0.22" strokeWidth="1.2" strokeLinecap="round" />)}
    </g>
  );
  return (
    <svg viewBox="0 0 160 90" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 w-full h-full" aria-hidden="true">
      {BG}
      {/* a pile of documents */}
      {doc(14, 28, 0.45)}
      {doc(20, 24, 0.7)}
      {doc(26, 20, 1)}
      {/* the search: a lens that sweeps down the page */}
      <g>
        <animateTransform attributeName="transform" type="translate" values="0 0;0 18;0 0" dur="3.6s" repeatCount="indefinite" calcMode="spline" keySplines="0.4 0 0.2 1;0.4 0 0.2 1" />
        <circle cx="48" cy="34" r="8" fill="#FF5A36" fillOpacity="0.14" stroke="#FF5A36" strokeWidth="1.6" />
        <line x1="54" y1="40" x2="60" y2="46" stroke="#FF5A36" strokeWidth="2" strokeLinecap="round" />
      </g>
      {/* the path from the pile to the answer, with a dot travelling along it */}
      <path d="M64 45 H98" stroke="#fff" strokeOpacity="0.25" strokeWidth="1" strokeDasharray="2 2.5" />
      <circle r="2" fill="#FF5A36">
        <animateMotion dur="1.8s" repeatCount="indefinite" path="M64 45 H98" />
      </circle>
      {/* the answer card, with the cited line lit */}
      <rect x="100" y="24" width="48" height="42" rx="4" fill="#161821" stroke="#fff" strokeOpacity="0.22" strokeWidth="0.7" />
      <line x1="107" y1="33" x2="140" y2="33" stroke="#fff" strokeOpacity="0.55" strokeWidth="1.8" strokeLinecap="round" />
      <line x1="107" y1="40" x2="136" y2="40" stroke="#fff" strokeOpacity="0.25" strokeWidth="1.4" strokeLinecap="round" />
      <rect x="105" y="46" width="38" height="8" rx="2" fill="#FF5A36" fillOpacity="0.2">
        <animate attributeName="fill-opacity" values="0.1;0.35;0.1" dur="1.8s" repeatCount="indefinite" />
      </rect>
      <line x1="108" y1="50" x2="134" y2="50" stroke="#FF5A36" strokeWidth="1.4" strokeLinecap="round" />
      <line x1="107" y1="60" x2="128" y2="60" stroke="#fff" strokeOpacity="0.18" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

/* A price line draws itself, then a dashed forecast and its band carry on from the last point */
export function GoldArt() {
  const hist = 'M12 64 L24 60 L34 66 L46 54 L58 58 L70 46 L82 50 L94 38';
  const fore = 'M94 38 L106 34 L118 40 L130 30 L148 26';
  return (
    <svg viewBox="0 0 160 90" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 w-full h-full" aria-hidden="true">
      {BG}
      {[24, 40, 56, 72].map((y) => <line key={y} x1="8" y1={y} x2="152" y2={y} stroke="#fff" strokeOpacity="0.07" strokeWidth="0.5" />)}
      {/* a second, flatter model line for contrast */}
      <path d="M12 62 L34 60 L58 56 L82 54 L106 52 L130 50 L148 49" fill="none" stroke="#fff" strokeOpacity="0.22" strokeWidth="1" strokeDasharray="2 2" />
      {/* the forecast band */}
      <polygon points="94,38 106,28 118,32 130,20 148,14 148,40 130,42 118,48 106,42" fill="#FF5A36" fillOpacity="0.14">
        <animate attributeName="fill-opacity" values="0;0;0.16;0.16;0" keyTimes="0;0.45;0.6;0.9;1" dur="5s" repeatCount="indefinite" />
      </polygon>
      <path d={hist} fill="none" stroke="#fff" strokeWidth="1.6" strokeLinejoin="round" strokeLinecap="round" pathLength="1" strokeDasharray="1">
        <animate attributeName="stroke-dashoffset" values="1;0;0;0;1" keyTimes="0;0.45;0.9;0.97;1" dur="5s" repeatCount="indefinite" />
      </path>
      <path d={fore} fill="none" stroke="#FF5A36" strokeWidth="1.6" strokeLinecap="round" strokeDasharray="3 2.4">
        <animate attributeName="stroke-opacity" values="0;0;1;1;0" keyTimes="0;0.45;0.6;0.9;1" dur="5s" repeatCount="indefinite" />
      </path>
      <circle r="2.4" fill="#fff">
        <animateMotion dur="5s" repeatCount="indefinite" path={`${hist} ${fore.replace('M94 38', 'L94 38')}`} keyPoints="0;0.62;0.62;1" keyTimes="0;0.45;0.9;1" calcMode="linear" />
        <animate attributeName="opacity" values="1;1;1;0" keyTimes="0;0.9;0.97;1" dur="5s" repeatCount="indefinite" />
      </circle>
    </svg>
  );
}

/* One liked film, and the three it points to appearing in turn */
export function MovieArt() {
  const card = (x, delay, accent) => (
    <g key={x} opacity="0">
      <animate attributeName="opacity" values="0;0;1;1;0" keyTimes="0;0.1;0.25;0.9;1" dur="4.5s" begin={`${delay}s`} repeatCount="indefinite" />
      <animateTransform attributeName="transform" type="translate" values="0 6;0 6;0 0;0 0;0 0" keyTimes="0;0.1;0.25;0.9;1" dur="4.5s" begin={`${delay}s`} repeatCount="indefinite" />
      <rect x={x} y="28" width="24" height="34" rx="3" fill="#161821" stroke={accent ? '#FF5A36' : '#fff'} strokeOpacity={accent ? 0.9 : 0.25} strokeWidth="0.8" />
      <rect x={x + 3} y="31" width="18" height="18" rx="2" fill="#fff" fillOpacity="0.08" />
      <line x1={x + 3} y1="54" x2={x + 20} y2="54" stroke="#fff" strokeOpacity="0.4" strokeWidth="1.3" strokeLinecap="round" />
      <line x1={x + 3} y1="58" x2={x + 14} y2="58" stroke="#fff" strokeOpacity="0.2" strokeWidth="1.1" strokeLinecap="round" />
    </g>
  );
  return (
    <svg viewBox="0 0 160 90" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 w-full h-full" aria-hidden="true">
      {BG}
      {/* the liked film */}
      <rect x="14" y="24" width="30" height="42" rx="3.5" fill="#161821" stroke="#FF5A36" strokeWidth="1.2" />
      <rect x="18" y="28" width="22" height="22" rx="2" fill="#FF5A36" fillOpacity="0.2" />
      <line x1="18" y1="55" x2="38" y2="55" stroke="#fff" strokeOpacity="0.5" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="18" y1="60" x2="30" y2="60" stroke="#fff" strokeOpacity="0.25" strokeWidth="1.2" strokeLinecap="round" />
      {/* the link to what comes next */}
      <path d="M46 45 H66" stroke="#fff" strokeOpacity="0.25" strokeWidth="1" strokeDasharray="2 2.5" />
      <circle r="2" fill="#FF5A36">
        <animateMotion dur="1.5s" repeatCount="indefinite" path="M46 45 H66" />
      </circle>
      {card(72, 0, true)}
      {card(102, 0.5, false)}
      {card(132, 1, false)}
    </svg>
  );
}

export default function CoverArt({ kind }) {
  if (kind === 'court') return <CourtArt />;
  if (kind === 'gold') return <GoldArt />;
  if (kind === 'movie') return <MovieArt />;
  return <RagArt />;
}
