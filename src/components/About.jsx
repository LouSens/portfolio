import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Download, MapPin, Globe2, GraduationCap, Search } from 'lucide-react';
import SectionLabel from './SectionLabel';
import Magnetic from './Magnetic';
import IsoObject from './iso/IsoObject';
import { PERSONAL_INFO, PROJECTS_DATA, ABOUT } from '../data/portfolioData';

const projectTitle = (id) => PROJECTS_DATA.find((p) => p.id === id)?.title ?? id;
// App.jsx listens for #project=<id> and opens the matching project page
const openProject = (id) => {
  window.location.hash = `project=${id}`;
};

const FACT_ICONS = { 'Based in': MapPin, From: Globe2, Studying: GraduationCap, 'Looking for': Search };
const FOCUS_KINDS = ['database', 'cluster', 'bars'];

const reveal = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
};

export default function About() {
  return (
    <div className="px-5 sm:px-8 md:px-12 py-8 md:py-12">
      <div className="max-w-[1100px] mx-auto grid lg:grid-cols-12 gap-10 lg:gap-16">
        {/* Who I am */}
        <motion.div {...reveal} className="lg:col-span-5">
          <SectionLabel label="About" />
          <h2 className="font-display font-extrabold text-fluid-h2 text-white tracking-tight leading-[1.1] mb-6">
            Hi, I&apos;m <span className="text-[var(--accent)]">David.</span>
          </h2>
          <div className="space-y-3 text-[17px] text-white/75 leading-relaxed max-w-md">
            {ABOUT.intro.map((line) => (
              <p key={line}>{line}</p>
            ))}
          </div>

          <ul className="mt-10 space-y-5">
            {ABOUT.facts.map((fact) => {
              const Icon = FACT_ICONS[fact.label] || MapPin;
              return (
                <li key={fact.label} className="flex items-start gap-4">
                  <span className="mt-0.5 w-9 h-9 shrink-0 rounded-xl bg-white/[0.04] border border-white/[0.1] flex items-center justify-center text-[var(--accent)]">
                    <Icon size={16} />
                  </span>
                  <span>
                    <span className="block text-xs text-white/45">{fact.label}</span>
                    <span className="block text-[15px] text-white/90">{fact.value}</span>
                  </span>
                </li>
              );
            })}
          </ul>

          <div className="mt-10 flex flex-col sm:flex-row gap-3">
            <Magnetic className="w-full sm:w-auto">
              <button
                type="button"
                onClick={() => document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' })}
                className="liquid-btn-primary w-full justify-center !py-3 cursor-pointer"
              >
                <span>See my projects</span>
              </button>
            </Magnetic>
            <Magnetic className="w-full sm:w-auto">
              <a
                href={PERSONAL_INFO.resumeUrl}
                download="CV_David_Kurniawan.pdf"
                target="_blank"
                rel="noreferrer"
                className="liquid-btn-secondary w-full justify-center !py-3 flex items-center gap-2"
              >
                <Download size={15} />
                <span>Download CV</span>
              </a>
            </Magnetic>
          </div>
        </motion.div>

        {/* What I work on: three short lists */}
        <div className="lg:col-span-7 lg:pt-10">
          <motion.p {...reveal} className="text-sm text-white/45 mb-5">
            What I work on
          </motion.p>
          <div className="space-y-5">
            {ABOUT.focus.map((item, idx) => {
              return (
                <motion.div
                  key={item.title}
                  {...reveal}
                  transition={{ ...reveal.transition, delay: idx * 0.07 }}
                  className="rounded-2xl border border-white/[0.1] hover:border-white/[0.22] bg-white/[0.02] p-6 sm:p-8 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <span className="shrink-0 w-14 h-14" aria-hidden="true">
                      <IsoObject kind={FOCUS_KINDS[idx % FOCUS_KINDS.length]} className="w-full h-full" />
                    </span>
                    <h3 className="font-display font-bold text-xl sm:text-2xl text-white tracking-tight">{item.title}</h3>
                  </div>
                  <ul className="mt-5 space-y-2.5 text-[15px] text-white/70">
                    {item.points.map((pt) => (
                      <li key={pt} className="flex gap-3">
                        <span className="mt-2.5 w-1 h-1 rounded-full bg-[var(--accent)] shrink-0" />
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-5 pt-5 border-t border-white/[0.08] flex flex-wrap items-center gap-x-5 gap-y-1 text-sm">
                    <span className="text-white/35">See it in</span>
                    {item.projects.map((id) => (
                      <button
                        key={id}
                        type="button"
                        onClick={() => openProject(id)}
                        className="group inline-flex items-center gap-1 py-1.5 text-[var(--accent)] hover:text-white transition-colors cursor-pointer"
                      >
                        <span>{projectTitle(id)}</span>
                        <ArrowUpRight size={14} className="transition-transform duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </button>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
