import React from 'react';

// Section marker: a short accent bar, the section name, and a hairline. No numbering.
export default function SectionLabel({ label }) {
  return (
    <div className="flex items-center gap-3 mb-5 text-sm">
      <span className="h-[3px] w-6 rounded-full bg-[var(--accent)]" aria-hidden="true" />
      <span className="text-white/65">{label}</span>
      <span className="flex-1 h-px bg-white/[0.1]" aria-hidden="true" />
    </div>
  );
}
