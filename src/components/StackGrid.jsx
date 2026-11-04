import React from 'react';
import SectionLabel from './SectionLabel';
import TechIcon from './ui/TechIcon';
import { TECH_STACK, EARLIER_WORK, PROJECTS_DATA } from '../data/portfolioData';

/* The tech stack on the light page: every layer, every tool as an icon with a small label. */
export default function StackGrid() {
  const total = new Set(TECH_STACK.flatMap((g) => g.items.map((i) => i.name))).size;
  const repos = PROJECTS_DATA.length + EARLIER_WORK.length;
  return (
    <div className="px-5 sm:px-8 py-14 md:py-20">
      <div className="max-w-[1100px] mx-auto">
        <SectionLabel label="Tech stack" />
        <h2 className="font-display font-extrabold text-fluid-h2 text-white tracking-tight leading-[1.1]">
          Every tool, <span className="text-[var(--accent)]">by layer</span>
        </h2>
        <p className="mt-3 text-sm text-white/50">{total} tools across {repos} repositories</p>
        <div className="mt-10 space-y-9">
          {TECH_STACK.map((g) => (
            <div key={g.name}>
              <h3 className="font-display font-semibold text-white">{g.name}</h3>
              <ul className="mt-4 grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-2.5">
                {g.items.map((it) => (
                  <li key={it.name} title={`${it.name}: ${it.repos.join(', ')}`} className="rounded-2xl border border-white/[0.12] bg-white/[0.03] aspect-square flex flex-col items-center justify-center gap-1.5 text-white/85 px-1">
                    <TechIcon name={it.name} size={24} />
                    <span className="text-[10px] leading-tight text-white/50 text-center truncate w-full">{it.name}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
