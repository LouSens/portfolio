import React from 'react';
import { ICON_DATA } from './techIcons';

/* A tool as a small isometric slab with its brand icon lying on the top face. Monochrome, drawn in SVG, and a normal
   button: hover, focus or tap lifts it. */
const W = 92;
const T = [46, 8];
const R = [86, 30];
const B = [46, 52];
const L = [6, 30];
const D = 9; // slab thickness
const pts = (list) => list.map((p) => p.join(',')).join(' ');

// Tools with no brand mark in simple-icons get a short label on the slab instead
const LABELS = {
  'sql': 'SQL', 'c#': 'C#', 'powershell': 'PS', 'recharts': 'RC', 'remotion': 'RM', 'react three fiber': 'R3F',
  'zustand': 'ZS', 'next-intl': 'i18n', 'alembic': 'ALB', 'seaborn': 'SNS', 'statsmodels': 'SM', 'xgboost': 'XGB',
  'stable-baselines3': 'SB3', 'nltk': 'NLTK', 'surprise': 'SUR', 'openai api': 'OAI', 'langsmith': 'LS', 'faiss': 'FAISS',
  'unsloth': 'US', 'playwright': 'PW', 'mypy': 'mypy', 'vs code': 'VS',
};
const label = (name) => LABELS[name.toLowerCase()] ?? name.replace(/[^A-Za-z0-9]/g, '').slice(0, 2).toUpperCase();

export default function IsoTile({ name, selected, onSelect, onHover }) {
  const icon = ICON_DATA[name.toLowerCase()];
  const tag = icon ? null : label(name);
  // Map the 24-unit icon box onto the middle 60% of the top face
  const a = [(R[0] - T[0]) * 0.6 / 24, (R[1] - T[1]) * 0.6 / 24];
  const b = [(L[0] - T[0]) * 0.6 / 24, (L[1] - T[1]) * 0.6 / 24];
  const origin = [T[0] + 0.2 * (R[0] - T[0]) + 0.2 * (L[0] - T[0]), T[1] + 0.2 * (R[1] - T[1]) + 0.2 * (L[1] - T[1])];

  return (
    <button
      type="button"
      onClick={onSelect}
      onMouseEnter={() => onHover?.(name)}
      onMouseLeave={() => onHover?.(null)}
      onFocus={() => onHover?.(name)}
      onBlur={() => onHover?.(null)}
      aria-label={name}
      aria-pressed={selected}
      className="group flex flex-col items-center gap-0.5 cursor-pointer outline-none"
    >
      <svg viewBox={`0 0 ${W} ${60 + D}`} className="w-[92px] h-auto overflow-visible" aria-hidden="true">
        <g className={`transition-transform duration-200 ease-out ${selected ? '-translate-y-[7px]' : 'group-hover:-translate-y-[7px] group-focus-visible:-translate-y-[7px]'}`}>
          <polygon points={pts([L, B, [B[0], B[1] + D], [L[0], L[1] + D]])} fill="rgb(var(--fg) / 0.26)" stroke="rgb(var(--fg) / 0.5)" strokeWidth="1" strokeLinejoin="round" />
          <polygon points={pts([B, R, [R[0], R[1] + D], [B[0], B[1] + D]])} fill="rgb(var(--fg) / 0.14)" stroke="rgb(var(--fg) / 0.5)" strokeWidth="1" strokeLinejoin="round" />
          <polygon
            points={pts([T, R, B, L])}
            fill={selected ? 'rgb(var(--accent-rgb) / 0.28)' : 'rgb(var(--fg) / 0.16)'}
            stroke={selected ? 'rgb(var(--accent-rgb))' : 'rgb(var(--fg) / 0.6)'}
            strokeWidth="1.2"
            strokeLinejoin="round"
            className="transition-colors group-hover:fill-[rgb(var(--accent-rgb)/0.14)]"
          />
          {icon ? (
            <path
              d={icon}
              transform={`matrix(${a[0]} ${a[1]} ${b[0]} ${b[1]} ${origin[0]} ${origin[1]})`}
              fill={selected ? 'rgb(var(--accent-rgb))' : 'rgb(var(--fg) / 0.9)'}
              className="transition-colors"
            />
          ) : (
            <text
              x="12"
              y="12"
              textAnchor="middle"
              dominantBaseline="central"
              transform={`matrix(${a[0]} ${a[1]} ${b[0]} ${b[1]} ${origin[0]} ${origin[1]})`}
              fontSize={tag.length <= 2 ? 13 : tag.length === 3 ? 10 : 8}
              fontWeight="700"
              className="font-display transition-colors"
              fill={selected ? 'rgb(var(--accent-rgb))' : 'rgb(var(--fg) / 0.9)'}
            >
              {tag}
            </text>
          )}
        </g>
      </svg>
      <span className={`text-[11px] leading-tight text-center max-w-[96px] truncate ${selected ? 'text-white' : 'text-white/50 group-hover:text-white'}`}>{name}</span>
    </button>
  );
}
