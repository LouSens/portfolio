import React, { useState } from 'react';
import SectionLabel from './SectionLabel';
import IsoTile from './ui/IsoTile';
import { TECH_STACK, EARLIER_WORK, PROJECTS_DATA } from '../data/portfolioData';

/* Tech stack: pick a layer, see its tools as isometric slabs with their icons. Hover or focus a slab for its name and
   where it is used. */
export default function StackBench() {
  const [layer, setLayer] = useState(0);
  const [hover, setHover] = useState(null);
  const group = TECH_STACK[layer];
  const total = new Set(TECH_STACK.flatMap((g) => g.items.map((i) => i.name))).size;
  const repos = PROJECTS_DATA.length + EARLIER_WORK.length;
  const shown = hover && group.items.find((i) => i.name === hover);

  return (
    <div className="px-5 sm:px-8 py-12 md:py-16">
      <div className="max-w-[1100px] mx-auto">
        <div className="flex items-end justify-between gap-6">
          <div>
            <SectionLabel label="Tech stack" />
            <h2 className="font-display font-extrabold text-fluid-h2 text-white tracking-tight leading-[1.1]">
              Tools and <span className="text-[var(--accent)]">technologies</span>
            </h2>
            <p className="mt-3 text-sm text-white/50">Used across {repos} repositories, grouped by layer.</p>
          </div>
        </div>

        <div role="tablist" aria-label="Layers" className="mt-10 flex flex-wrap gap-2">
          {TECH_STACK.map((g, i) => (
            <button
              key={g.name}
              role="tab"
              aria-selected={i === layer}
              onClick={() => setLayer(i)}
              className={`px-4 py-2 rounded-full border text-sm font-display font-medium transition-colors cursor-pointer ${
                i === layer ? 'bg-accent text-white border-accent' : 'border-white/[0.14] text-white/65 hover:text-white hover:border-white/[0.3]'
              }`}
            >
              {g.name}
              <span className={`ml-2 text-xs ${i === layer ? 'text-white/80' : 'text-white/35'}`}>{g.items.length}</span>
            </button>
          ))}
        </div>

        <div role="tabpanel" className="mt-8 rounded-3xl border border-white/[0.1] bg-white/[0.02] p-6 md:p-10 min-h-[22rem]">
          <ul className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-x-3 gap-y-6 justify-items-center">
            {group.items.map((it) => (
              <li key={it.name}>
                <IsoTile name={it.name} selected={hover === it.name} onHover={setHover} onSelect={() => setHover(it.name)} />
              </li>
            ))}
          </ul>
          <p className="mt-8 pt-5 border-t border-white/[0.08] min-h-[3rem] text-sm text-white/55" aria-live="polite">
            {shown ? (
              <>
                <span className="text-white font-medium">{shown.name}</span>
                <span className="text-white/40"> · {shown.repos.join(', ')}</span>
              </>
            ) : (
              <span className="text-white/35">{group.name}</span>
            )}
          </p>
        </div>
      </div>
    </div>
  );
}
