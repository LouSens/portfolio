import React from 'react';
import SectionLabel from './SectionLabel';
import { motion } from 'framer-motion';
import { ArrowUpRight, Download, Server, Bot, LineChart, MapPin, Globe2, GraduationCap, Search } from 'lucide-react';
import { PERSONAL_INFO, PROJECTS_DATA, ABOUT } from '../data/portfolioData';
import Tilt from './Tilt';
import Magnetic from './Magnetic';

const projectTitle = (id) => PROJECTS_DATA.find((p) => p.id === id)?.title ?? id;

// App.jsx listens for #project=<id> and opens the matching detail modal
const openProject = (id) => {
  window.location.hash = `project=${id}`;
};

const FACT_ICONS = { 'Based in': MapPin, From: Globe2, Studying: GraduationCap, 'Looking for': Search };
const FOCUS_ICONS = [Server, Bot, LineChart];

const reveal = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
};

export default function About() {
  return (
    <section
      id="about"
      className="section-glow py-14 md:py-28 px-4 sm:px-6 md:px-8 relative overflow-hidden border-t border-white/[0.06]"
    >
      <div className="max-w-[1100px] mx-auto relative z-10 grid lg:grid-cols-12 gap-10 lg:gap-16">
        {/* ── LEFT: who I am (sticks while the right column scrolls on desktop) ── */}
        <motion.div {...reveal} className="lg:col-span-5 lg:sticky lg:top-28 self-start">
          <SectionLabel label="About" />
          <h2 className="font-display font-extrabold text-fluid-h2 text-white tracking-tight leading-[1.12] mb-6">
            Hi, I'm <span className="text-[var(--accent)]">David.</span>
          </h2>

          <div className="space-y-4 text-white/70 text-base leading-relaxed">
            {ABOUT.intro.map((para) => (
              <p key={para}>{para}</p>
            ))}
          </div>

          <ul className="mt-8 pt-6 border-t border-white/[0.08] space-y-3.5 text-sm">
            {ABOUT.facts.map((fact, i) => {
              const Icon = FACT_ICONS[fact.label] || MapPin;
              return (
                <motion.li
                  key={fact.label}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 0.45, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
                  className="group flex items-start gap-3.5"
                >
                  <span className="mt-0.5 w-8 h-8 shrink-0 rounded-lg bg-white/[0.04] border border-white/[0.1] group-hover:border-[var(--accent)]/60 group-hover:bg-[var(--accent)]/10 flex items-center justify-center text-[var(--accent)] transition-colors">
                    <Icon size={15} />
                  </span>
                  <span>
                    <span className="block text-white/40 text-xs">{fact.label}</span>
                    <span className="block text-white/90">{fact.value}</span>
                  </span>
                </motion.li>
              );
            })}
          </ul>

          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <Magnetic className="w-full sm:w-auto">
              <button
                type="button"
                onClick={() => document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' })}
                className="liquid-btn-primary w-full justify-center !py-3 cursor-pointer"
              >
                <span>See the projects</span>
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

        {/* ── RIGHT: what I work on, linked to the write-ups ── */}
        <div className="lg:col-span-7 lg:pt-9">
          <motion.p {...reveal} className="text-sm text-white/45 mb-4">
            What I work on
          </motion.p>

          <div className="space-y-4" style={{ perspective: 1200 }}>
            {ABOUT.focus.map((item, idx) => {
              const Icon = FOCUS_ICONS[idx % FOCUS_ICONS.length];
              return (
                <motion.div key={item.title} {...reveal} transition={{ ...reveal.transition, delay: idx * 0.08 }}>
                  <Tilt max={5} className="rounded-2xl border border-white/[0.1] hover:border-white/[0.22] bg-white/[0.02] p-6 sm:p-7 transition-colors">
                    <div className="flex items-start gap-4 sm:gap-5">
                      <motion.div
                        className="shrink-0 w-12 h-12 rounded-xl bg-[var(--accent)]/10 border border-[var(--accent)]/30 flex items-center justify-center text-[var(--accent)]"
                        style={{ transform: 'translateZ(30px)' }}
                        animate={{ y: [0, -4, 0] }}
                        transition={{ duration: 3.2 + idx * 0.5, repeat: Infinity, ease: 'easeInOut' }}
                      >
                        <Icon size={22} />
                      </motion.div>
                      <div className="min-w-0">
                        <h3 className="font-display font-bold text-xl sm:text-2xl text-white tracking-tight mb-2">{item.title}</h3>
                        <p className="text-white/65 text-sm sm:text-base leading-relaxed mb-3 max-w-xl">{item.body}</p>
                        <div className="flex flex-wrap gap-x-5 gap-y-1 text-sm">
                          <span className="text-white/35 py-2">See it in</span>
                          {item.projects.map((id) => (
                            <button
                              key={id}
                              type="button"
                              onClick={() => openProject(id)}
                              className="group inline-flex items-center gap-1 py-2 text-[var(--accent)] hover:text-white transition-colors cursor-pointer"
                            >
                              <span>{projectTitle(id)}</span>
                              <ArrowUpRight size={14} className="transition-transform duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </Tilt>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
