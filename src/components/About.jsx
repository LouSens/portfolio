import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
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

/* One focus area. It comes forward as you reach it and rests back as you leave, so the right column reads as a
   sequence you move down, with the intro staying beside it. */
function Focus({ item, kind }) {
  const ref = useRef(null);
  const here = useInView(ref, { margin: '-35% 0px -35% 0px' });
  return (
    <article ref={ref} className={`py-9 first:pt-0 border-t first:border-t-0 border-white/[0.1] transition-opacity duration-500 ${here ? 'opacity-100' : 'opacity-50'}`}>
      <div className="flex items-start gap-6">
        <IsoObject kind={kind} className="w-16 h-16 shrink-0 hidden sm:block" />
        <div className="min-w-0">
          <h3 className="font-display font-bold text-2xl text-white tracking-tight">{item.title}</h3>
          <ul className="mt-4 space-y-2 text-[15px] text-white/70">
            {item.points.map((pt) => (
              <li key={pt} className="flex gap-3">
                <span className="mt-2.5 w-1 h-1 rounded-full bg-[var(--accent)] shrink-0" />
                {pt}
              </li>
            ))}
          </ul>
          <p className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm">
            <span className="text-white/35">See it in</span>
            {item.projects.map((id) => (
              <button key={id} type="button" onClick={() => openProject(id)} className="group inline-flex items-center gap-1 py-1 text-[var(--accent)] hover:text-white transition-colors cursor-pointer">
                {projectTitle(id)}
                <ArrowUpRight size={13} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>
            ))}
          </p>
        </div>
      </div>
    </article>
  );
}

export default function About() {
  return (
    <div className="px-5 sm:px-8 py-16 md:py-24">
      <div className="max-w-[1100px] mx-auto grid lg:grid-cols-12 gap-12 lg:gap-20">
        {/* Stays beside the list while it scrolls (large screens) */}
        <div className="lg:col-span-5 lg:sticky lg:top-28 self-start">
          <SectionLabel label="About" />
          <h2 className="font-display font-extrabold text-fluid-h2 text-white tracking-tight leading-[1.1]">
            Hi, I&apos;m <span className="text-[var(--accent)]">David.</span>
          </h2>
          <div className="mt-6 space-y-3 text-[17px] text-white/70 leading-relaxed max-w-md">
            {ABOUT.intro.map((line) => (
              <p key={line}>{line}</p>
            ))}
          </div>
          <ul className="mt-8 space-y-4">
            {ABOUT.facts.map((f) => {
              const Icon = FACT_ICONS[f.label] || MapPin;
              return (
                <li key={f.label} className="flex items-center gap-3.5 text-[15px]">
                  <Icon size={17} className="text-[var(--accent)] shrink-0" aria-hidden="true" />
                  <span className="text-white/45 w-24 shrink-0">{f.label}</span>
                  <span className="text-white/90">{f.value}</span>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="lg:col-span-7">
          <p className="text-sm text-white/40 mb-8">What I work on</p>
          {ABOUT.focus.map((item, i) => (
            <Focus key={item.title} item={item} kind={KINDS[i % KINDS.length]} />
          ))}
        </div>
      </div>
    </div>
  );
}
