import React from 'react';
import { Trophy } from 'lucide-react';

/* A project's result at the competition it was built for. Plain text, no box: the placing in the accent colour,
   the event muted beneath it (or after it on one line). */
export default function RankChip({ rank, stacked = false, className = '' }) {
  if (!rank) return null;
  return (
    <span className={`inline-flex ${stacked ? 'flex-col items-start gap-0.5' : 'flex-wrap items-center gap-x-2.5 gap-y-0.5'} ${className}`}>
      <span className="inline-flex items-center gap-1.5 text-[13px] font-display font-semibold text-[var(--accent)]">
        <Trophy size={13} aria-hidden="true" /> {rank.result}
      </span>
      <span className="text-xs text-white/55">{rank.event}</span>
    </span>
  );
}
