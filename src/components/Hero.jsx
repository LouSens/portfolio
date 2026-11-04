import React from 'react';
import { motion } from 'framer-motion';
import { Layers, Download, MapPin, GraduationCap } from 'lucide-react';
import { PERSONAL_INFO, PROJECTS_DATA } from '../data/portfolioData';
import IsoFallback from './IsoFallback';
import Magnetic from './Magnetic';

const ease = [0.22, 1, 0.36, 1];
const phone = typeof window !== 'undefined' && window.matchMedia('(max-width: 767px)').matches;
const calm = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
// Same rule as App: weak phones get the light CSS sculpture instead of the WebGL world.
const weak = phone && (navigator.hardwareConcurrency || 4) < 6;

/* The lobby. Text on the left; on the right sits the building (the 3D scene, drawn behind the whole page). */
export default function Hero() {
  const item = (delay) => ({
    initial: calm ? false : { opacity: 0, y: 18 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, delay, ease },
  });

  return (
    <section className="relative min-h-[100svh] flex items-center px-4 sm:px-6 md:px-8 pt-28 pb-24 select-none">
      {/* Phones skip WebGL: a light CSS version of the building instead */}
      {(weak || calm) && <IsoFallback className="absolute right-[-18%] top-[12%] w-[78%] max-w-[420px] opacity-40 pointer-events-none" />}

      <div className="relative z-10 w-full max-w-[1100px] mx-auto">
        <div className="max-w-[620px]">
          <motion.p {...item(0.05)} className="inline-flex items-center gap-2.5 text-sm text-white/70">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60 animate-ping" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            {PERSONAL_INFO.status}
          </motion.p>

          <motion.h1 {...item(0.15)} className="mt-6 font-display font-extrabold text-fluid-h1 tracking-[-0.035em] leading-[1.05] text-white">
            I build web apps and <span className="text-[var(--accent)]">AI systems.</span>
          </motion.h1>

          <motion.p {...item(0.3)} className="mt-6 text-lg text-white/70 leading-relaxed max-w-[34rem]">
            David Kurniawan, an AI student. I make the backend, the data and the models that make a product work.
          </motion.p>

          <motion.ul {...item(0.4)} className="mt-7 space-y-2 text-sm text-white/60">
            <li className="flex items-center gap-2.5"><GraduationCap size={15} className="text-[var(--accent)]" />Xiamen University Malaysia, GPA {PERSONAL_INFO.gpa.split(' ')[0]}</li>
            <li className="flex items-center gap-2.5"><MapPin size={15} className="text-[var(--accent)]" />{PERSONAL_INFO.location}</li>
            <li className="flex items-center gap-2.5"><Layers size={15} className="text-[var(--accent)]" />{PROJECTS_DATA.length} projects, two hackathon finals in 2026</li>
          </motion.ul>

          <motion.div {...item(0.5)} className="mt-9 flex flex-col sm:flex-row gap-3">
            <Magnetic className="w-full sm:w-auto">
              <button
                onClick={() => document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' })}
                className="liquid-btn-primary w-full sm:w-auto !px-7 !py-3.5 cursor-pointer"
              >
                <span>View projects</span>
              </button>
            </Magnetic>
            <Magnetic className="w-full sm:w-auto">
              <a
                href={PERSONAL_INFO.resumeUrl}
                download="CV_David_Kurniawan.pdf"
                target="_blank"
                rel="noreferrer"
                className="liquid-btn-secondary w-full sm:w-auto !px-7 !py-3.5 flex items-center gap-2"
              >
                <Download size={15} />
                <span>Download CV</span>
              </a>
            </Magnetic>
          </motion.div>
        </div>
      </div>

      {/* Cue: the page is a walk, not a sheet */}
      <motion.div
        initial={calm ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="absolute bottom-7 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[11px] text-white/45"
      >
        Scroll to walk through
        <span className="relative block w-px h-9 bg-white/[0.2] overflow-hidden">
          <motion.span className="absolute left-0 top-0 w-px h-3 bg-[var(--accent)]" animate={calm ? undefined : { y: [-12, 36] }} transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }} />
        </span>
      </motion.div>
    </section>
  );
}
