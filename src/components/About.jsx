import React from 'react';
import { GraduationCap, MapPin, Search } from 'lucide-react';
import SectionLabel from './SectionLabel';
import { ABOUT } from '../data/portfolioData';
import { PHOTOS } from '../data/photos';
import { small } from '../utils/img';

const FACT_ICONS = { 'Based in': MapPin, Studying: GraduationCap, 'Looking for': Search };
const PHOTO = PHOTOS[0];

/* Who I am, and nothing more: a photo, two sentences, three facts. What I work on is shown by Projects and Tech stack. */
export default function About() {
  return (
    <div className="px-5 sm:px-8 py-12 md:py-20">
      <div className="max-w-[1100px] mx-auto">
        <SectionLabel label="About" />
        <div className="grid md:grid-cols-12 gap-8 md:gap-14 items-center">
          {PHOTO && (
            <figure className="md:col-span-5 m-0">
              <div className="rounded-2xl overflow-hidden border border-white/[0.14]">
                <img src={small(PHOTO.src)} alt="David with the KerjaCerdas team at PIDI Digdaya 2026" loading="lazy" decoding="async" className="w-full h-full object-cover aspect-[4/3]" />
              </div>
              <figcaption className="mt-3 text-xs text-white/55">With my team at PIDI Digdaya 2026</figcaption>
            </figure>
          )}

          <div className="md:col-span-7">
            <h2 className="font-display font-extrabold text-fluid-h2 text-white tracking-tight leading-[1.1]">
              Hi, I&apos;m <span className="text-[var(--accent)]">David.</span>
            </h2>
            <p className="mt-5 text-[17px] text-white/70 leading-relaxed max-w-[34rem]">
              I&apos;m an AI student at Xiamen University Malaysia, originally from Indonesia. I like building web apps and AI systems, and in team projects I usually work on the backend.
            </p>

            <ul className="mt-8 max-w-[34rem] divide-y divide-white/[0.14] border-y border-white/[0.14]">
              {ABOUT.facts.map((f) => {
                const Icon = FACT_ICONS[f.label] || MapPin;
                return (
                  <li key={f.label} className="flex items-start gap-4 py-3.5">
                    <Icon size={16} className="mt-1 text-[var(--accent)] shrink-0" aria-hidden="true" />
                    <span className="w-24 shrink-0 text-sm text-white/50">{f.label}</span>
                    <span className="text-[15px] text-white leading-snug">{f.value}</span>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
