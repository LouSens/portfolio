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

/* A short statement first, then who I am (one card) beside what I work on (three cards). */
export default function About() {
  return (
    <div className="px-5 sm:px-8 py-16 md:py-24">
      <div className="max-w-[1100px] mx-auto">
        <SectionLabel label="About" />
        <p className="font-display font-bold text-2xl sm:text-3xl md:text-4xl text-white tracking-tight leading-[1.2] max-w-[48rem]">
          I study AI and build the <span className="text-[var(--accent)]">backend and AI side</span> of products.
        </p>
        <p className="mt-5 text-[17px] text-white/65 leading-relaxed max-w-[38rem]">
          From Indonesia, studying at Xiamen University Malaysia. In team projects I usually end up owning the backend.
        </p>

        <div className="mt-12 grid lg:grid-cols-12 gap-4 md:gap-5">
          <aside className="lg:col-span-4 liquid-glass-card rounded-3xl p-6 md:p-7 self-start">
            <div className="flex items-center gap-3.5">
              <span className="w-12 h-12 rounded-2xl bg-accent/15 border border-accent/40 flex items-center justify-center font-display font-extrabold text-[var(--accent)]">DK</span>
              <div>
                <p className="font-display font-bold text-white leading-tight">David Kurniawan</p>
                <p className="text-xs text-white/45">AI student and developer</p>
              </div>
            </div>
            <ul className="mt-6 space-y-5">
              {ABOUT.facts.map((f) => {
                const Icon = FACT_ICONS[f.label] || MapPin;
                return (
                  <li key={f.label} className="flex gap-3.5">
                    <Icon size={16} className="mt-0.5 text-[var(--accent)] shrink-0" aria-hidden="true" />
                    <span>
                      <span className="block text-xs text-white/45">{f.label}</span>
                      <span className="block text-[15px] text-white/90 leading-snug">{f.value}</span>
                    </span>
                  </li>
                );
              })}
            </ul>
          </aside>

          <div className="lg:col-span-8 grid md:grid-cols-3 gap-4 md:gap-5">
            {ABOUT.focus.map((item, i) => (
              <article key={item.title} className="rounded-3xl border border-white/[0.1] bg-white/[0.02] p-5 md:p-6 flex flex-col">
                <IsoObject kind={KINDS[i % KINDS.length]} className="w-14 h-14" />
                <h3 className="mt-4 font-display font-bold text-lg text-white tracking-tight">{item.title}</h3>
                <ul className="mt-3 space-y-2 text-sm text-white/65 leading-snug">
                  {item.points.map((pt) => (
                    <li key={pt} className="flex gap-2.5">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-[var(--accent)] shrink-0" />
                      {pt}
                    </li>
                  ))}
                </ul>
                <p className="mt-auto pt-5 flex flex-wrap gap-x-3 gap-y-0.5 text-sm">
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
    </div>
  );
}
