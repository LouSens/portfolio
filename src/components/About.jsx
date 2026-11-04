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
const card = 'rounded-2xl border border-white/[0.1] bg-white/[0.02] p-6 md:p-7';

/* A bento grid: a wide intro tile (reversed colours) beside a facts tile, then the three areas I work in.
   Tiles share one grid so their edges line up; the middle area is wider because it has the most to say. */
export default function About() {
  return (
    <div className="px-5 sm:px-8 py-12 md:py-20">
      <div className="max-w-[1100px] mx-auto">
        <SectionLabel label="About" />
        <div className="grid md:grid-cols-12 gap-4 md:gap-5">
          <div className="stage md:col-span-7 p-7 md:p-10 flex flex-col justify-end min-h-[260px]">
            <div className="stage-glow absolute inset-0 pointer-events-none" aria-hidden="true" />
            <IsoObject kind="layers" className="absolute right-[-30px] top-[-10px] w-[220px] opacity-40 pointer-events-none" />
            <div className="relative z-10">
              <h2 className="font-display font-extrabold text-fluid-h2 text-white tracking-tight leading-[1.1]">
                Hi, I&apos;m <span className="text-[var(--accent)]">David.</span>
              </h2>
              <div className="mt-5 space-y-2.5 text-[16px] text-white/75 leading-relaxed max-w-[30rem]">
                <p>I&apos;m an AI student at Xiamen University Malaysia, originally from Indonesia.</p>
                <p>I enjoy building web apps and AI systems, and in team projects I usually work on the backend.</p>
              </div>
            </div>
          </div>

          <ul className={`md:col-span-5 ${card} flex flex-col justify-center divide-y divide-white/[0.12]`}>
            {ABOUT.facts.map((f) => {
              const Icon = FACT_ICONS[f.label] || MapPin;
              return (
                <li key={f.label} className="flex gap-4 py-4 first:pt-0 last:pb-0">
                  <Icon size={18} className="mt-0.5 text-[var(--accent)] shrink-0" aria-hidden="true" />
                  <span>
                    <span className="block text-xs uppercase tracking-wider text-white/50">{f.label}</span>
                    <span className="mt-1 block text-[15px] text-white leading-snug">{f.value}</span>
                  </span>
                </li>
              );
            })}
          </ul>

          {ABOUT.focus.map((item, i) => (
            <article key={item.title} className={`md:col-span-4 ${card} flex flex-col`}>
              <IsoObject kind={KINDS[i % KINDS.length]} className="w-14 h-14" />
              <h3 className="mt-4 font-display font-bold text-lg text-white tracking-tight">{item.title}</h3>
              <ul className="mt-3 space-y-2 text-[15px] text-white/70 leading-snug">
                {item.points.map((pt) => (
                  <li key={pt} className="flex gap-3">
                    <span className="mt-2 w-1.5 h-px bg-[var(--accent)] shrink-0" />
                    {pt}
                  </li>
                ))}
              </ul>
              <p className="mt-auto pt-5 flex flex-wrap gap-x-4 gap-y-1 text-sm">
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
