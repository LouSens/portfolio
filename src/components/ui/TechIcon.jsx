import React from 'react';
import { ICONS } from './techIcons';

const monogram = (name) => {
  const words = name.replace(/[^A-Za-z0-9 +#.]/g, ' ').split(/\s+/).filter(Boolean);
  return (words.length > 1 ? words[0][0] + words[1][0] : name.slice(0, 2)).toUpperCase();
};

export default function TechIcon({ name, size = 26, className = '' }) {
  const icon = ICONS[name.toLowerCase()];
  if (icon) {
    return (
      <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" className={className} role="img" aria-label={name}>
        <path d={icon.path} />
      </svg>
    );
  }
  return (
    <span
      role="img"
      aria-label={name}
      style={{ fontSize: size * 0.46 }}
      className={`font-mono font-semibold tracking-tight leading-none ${className}`}
    >
      {monogram(name)}
    </span>
  );
}
