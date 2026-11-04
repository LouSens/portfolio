import React from 'react';
import { ArrowRight } from 'lucide-react';
import HorizontalGate from './HorizontalGate';
import SectionLabel from './SectionLabel';
import { TECH_STACK, PROJECTS_DATA, EARLIER_WORK } from '../data/portfolioData';

/* The Stack "room": every tool found in the repositories, one panel per layer of a system.
   The small number on a chip is how many repositories use it; hover or focus it for the names. */

function Group({ group, index, total }) {
  return (
    <div className="w-[min(86vw,440px)] md:w-[min(78vw,500px)] rounded-3xl border border-white/[0.12] bg-panel p-6 md:p-8">
      <div className="flex items-baseline justify-between gap-4">
        <h3 className="font-display font-bold text-xl md:text-2xl text-white tracking-tight">{group.name}</h3>
        <span className="font-mono text-[11px] text-white/45 tabular-nums">
          {String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
        </span>
      </div>
      <p className="mt-1 text-xs text-white/45">{group.items.length} tools</p>
      <ul className="mt-5 flex flex-wrap gap-2">
        {group.items.map((it) => (
          <li key={it.name}>
            <span
              tabIndex={0}
              title={`Used in: ${it.repos.join(', ')}`}
              className="inline-flex items-center gap-2 pl-3 pr-2 py-1.5 rounded-full border border-white/[0.14] bg-white/[0.03] hover:border-accent/60 focus-visible:border-[var(--accent)] outline-none text-[13px] text-white/85 transition-colors cursor-default"
            >
              {it.name}
              <span className="min-w-[1.25rem] h-5 px-1 rounded-full bg-white/[0.08] text-[11px] text-white/60 tabular-nums flex items-center justify-center">
                {it.repos.length}
              </span>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function StackGallery() {
  const all = new Set(TECH_STACK.flatMap((g) => g.items.map((i) => i.name)));
  const repoCount = PROJECTS_DATA.length + EARLIER_WORK.length;

  const panels = [
    {
      key: 'intro',
      name: 'Stack',
      className: 'w-[min(86vw,400px)]',
      node: (
        <div className="pr-2 md:pr-8">
          <SectionLabel label="Tech stack" />
          <h2 className="font-display font-extrabold text-fluid-h2 text-white tracking-tight leading-[1.1]">
            Every tool, <span className="text-[var(--accent)]">by layer</span>
          </h2>
          <ul className="mt-6 space-y-3 text-[15px] text-white/70">
            <li className="flex gap-3"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-[var(--accent)] shrink-0" />{all.size} tools across {repoCount} repositories</li>
            <li className="flex gap-3"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-[var(--accent)] shrink-0" />Read from each repo&apos;s own package files</li>
            <li className="flex gap-3"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-[var(--accent)] shrink-0" />The number is how many repos use it</li>
          </ul>
          <p className="mt-8 inline-flex items-center gap-2 text-sm text-white/50">
            Keep scrolling <ArrowRight size={14} className="text-[var(--accent)]" />
          </p>
        </div>
      ),
    },
    ...TECH_STACK.map((g, i) => ({ key: g.name, name: g.name, node: <Group group={g} index={i} total={TECH_STACK.length} /> })),
  ];

  return <HorizontalGate id="stack" label="Tech stack" panels={panels} speed={1.3} />;
}
