import React from 'react';
import { GraduationCap, Layers, Search } from 'lucide-react';
import { ABOUT } from '../data/portfolioData';

const FACT_ICONS = { Studying: GraduationCap, Focus: Layers, 'Looking for': Search };

/* Who I am, and nothing more. No picture, so the section is built on type and symmetry: a centred introduction, then
   three facts in equal columns under one rule. What I work on is shown by Projects and Tech stack. */
export default function About() {
  return (
    <div className="px-5 sm:px-8 py-14 md:py-24">
      <div className="max-w-[1100px] mx-auto">

        <div className="text-center max-w-[40rem] mx-auto">
          <span className="mx-auto w-16 h-16 rounded-2xl bg-accent/10 border border-accent/40 flex items-center justify-center font-display font-extrabold text-xl text-[var(--accent)]">
            DK
          </span>
          <h2 className="mt-6 font-display font-extrabold text-fluid-h2 text-white tracking-tight leading-[1.1]">
            Hi, I&apos;m <span className="text-[var(--accent)]">David.</span>
          </h2>
          <p className="mt-5 text-lg text-white/70 leading-relaxed">
            I&apos;m an AI student at Xiamen University Malaysia. I like building things end to end: the web app, the backend and the models behind it. In team projects I usually take the backend.
          </p>
        </div>

        <ul className="mt-14 grid md:grid-cols-3 border-t border-white/[0.18]">
          {ABOUT.facts.map((f) => {
            const Icon = FACT_ICONS[f.label] || Layers;
            return (
              <li key={f.label} className="pt-6 pb-2 md:px-8 first:md:pl-0 last:md:pr-0 md:border-l first:md:border-l-0 border-white/[0.18] text-center md:text-left">
                <Icon size={18} className="mx-auto md:mx-0 text-[var(--accent)]" aria-hidden="true" />
                <p className="mt-3 text-xs uppercase tracking-wider text-white/50">{f.label}</p>
                <p className="mt-1.5 text-[16px] text-white leading-snug">{f.value}</p>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
