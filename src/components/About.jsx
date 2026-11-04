import React from 'react';
import { ArrowUpRight, GraduationCap, MapPin, Search } from 'lucide-react';
import SectionLabel from './SectionLabel';
import IsoObject from './iso/IsoObject';
import { PROJECTS_DATA, ABOUT } from '../data/portfolioData';

const projectTitle = (id) => PROJECTS_DATA.find((p) => p.id === id)?.title ?? id;
// App.jsx listens for #project=<id> and opens the matching project page
const openProject = (id) => {
  window.location.hash = `project=${id}`;
};

const FACT_ICONS = { 'Based in': MapPin, Studying: GraduationCap, 'Looking for': Search };
const KINDS = ['database', 'cluster', 'bars'];

/* An editorial layout, no cards: a statement, a ruled row of facts, then three columns that share the same lines. */
export default function About() {
  return (
    <div className="px-5 sm:px-8 py-12 md:py-20">
      <div className="max-w-[1100px] mx-auto">
        <SectionLabel label="About" />
        <h2 className="font-display font-extrabold text-fluid-h2 text-white tracking-tight leading-[1.1]">
          Hi, I&apos;m <span className="text-[var(--accent)]">David.</span>
        </h2>
        <div className="mt-6 space-y-3 text-[17px] text-white/70 leading-relaxed max-w-[38rem]">
          <p>I&apos;m an AI student at Xiamen University Malaysia, originally from Indonesia.</p>
          <p>I enjoy building web apps and AI systems, and in team projects I usually work on the backend.</p>
        </div>

        {/* Facts: one ruled row */}
        <ul className="mt-12 grid md:grid-cols-3 border-y-2 border-white md:divide-x divide-white/[0.16]">
          {ABOUT.facts.map((f) => {
            const Icon = FACT_ICONS[f.label] || MapPin;
            return (
              <li key={f.label} className="flex gap-4 py-6 md:px-8 first:md:pl-0 last:md:pr-0 border-b md:border-b-0 border-white/[0.16] last:border-b-0">
                <Icon size={18} className="mt-1 text-[var(--accent)] shrink-0" aria-hidden="true" />
                <span>
                  <span className="block text-xs uppercase tracking-wider text-white/50">{f.label}</span>
                  <span className="mt-1 block text-[15px] text-white leading-snug">{f.value}</span>
                </span>
              </li>
            );
          })}
        </ul>

        {/* What I work on: three columns, links pinned to the bottom of each */}
        <div className="mt-12 grid md:grid-cols-3 md:divide-x divide-white/[0.16]">
          {ABOUT.focus.map((item, i) => (
            <article key={item.title} className="flex flex-col py-8 md:py-2 md:px-8 first:md:pl-0 last:md:pr-0 border-b md:border-b-0 border-white/[0.16] last:border-b-0">
              <IsoObject kind={KINDS[i % KINDS.length]} className="w-16 h-16" />
              <h3 className="mt-5 font-display font-bold text-xl text-white tracking-tight">{item.title}</h3>
              <ul className="mt-4 space-y-2.5 text-[15px] text-white/70 leading-snug">
                {item.points.map((pt) => (
                  <li key={pt} className="flex gap-3">
                    <span className="mt-2 w-1.5 h-px bg-[var(--accent)] shrink-0" />
                    {pt}
                  </li>
                ))}
              </ul>
              <p className="mt-auto pt-6 flex flex-wrap gap-x-4 gap-y-1 text-sm">
                {item.projects.map((id) => (
                  <button key={id} type="button" onClick={() => openProject(id)} className="group inline-flex items-center gap-1 py-1 text-[var(--accent)] hover:text-white transition-colors cursor-pointer">
                    {projectTitle(id)}
                    <ArrowUpRight size={12} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </button>
                ))}
              </p>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
