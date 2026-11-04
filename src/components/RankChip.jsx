import React from 'react';
import { Trophy } from 'lucide-react';

/* A project's result at the competition it was built for: the placing first, the event after it. */
export default function RankChip({ rank, stacked = false, className = '' }) {
  if (!rank) return null;
  return (
    <span className={`inline-flex ${stacked ? 'flex-col items-start gap-0.5' : 'items-center gap-2'} rounded-xl border border-accent/40 bg-accent/10 px-2.5 py-1.5 ${className}`}>
      <span className="inline-flex items-center gap-1.5 text-xs font-display font-semibold text-[var(--accent)]">
        <Trophy size={12} aria-hidden="true" /> {rank.result}
      </span>
      <span className="text-[11px] text-white/60">{rank.event}</span>
    </span>
  );
}
