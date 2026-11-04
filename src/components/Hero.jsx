import React from 'react';
import { motion } from 'framer-motion';
import { Layers, Download, MapPin, GraduationCap } from 'lucide-react';
import { PERSONAL_INFO, PROJECTS_DATA } from '../data/portfolioData';
import Magnetic from './Magnetic';

const ease = [0.22, 1, 0.36, 1];
const calm = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* The lobby: a bare panel (no frame) hung in the 3D space, text on the left, a looping sculpture floating on the right. */
export default function Hero() {
  const item = (delay) => ({
    initial: calm ? false : { opacity: 0, y: 18 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, delay, ease },
  });

  return (
    <div className="relative h-full flex items-center px-4 sm:px-8 md:px-12 select-none">

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
            David Kurniawan. AI student at Xiamen University Malaysia, building the backend, data and models behind a product.
          </motion.p>

          <motion.ul {...item(0.4)} className="mt-7 space-y-2 text-sm text-white/60">
            <li className="flex items-center gap-2.5"><GraduationCap size={15} className="text-[var(--accent)]" />GPA {PERSONAL_INFO.gpa.split(' ')[0]}</li>
            <li className="flex items-center gap-2.5"><MapPin size={15} className="text-[var(--accent)]" />{PERSONAL_INFO.location}</li>
            <li className="flex items-center gap-2.5"><Layers size={15} className="text-[var(--accent)]" />{PROJECTS_DATA.length} projects, two hackathon finals</li>
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
        className="absolute bottom-7 left-1/2 -translate-x-1/2 flex flex-col items-center"
      >
        <span className="relative block w-px h-9 bg-white/[0.2] overflow-hidden">
          <motion.span className="absolute left-0 top-0 w-px h-3 bg-[var(--accent)]" animate={calm ? undefined : { y: [-12, 36] }} transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }} />
        </span>
      </motion.div>
    </div>
  );
}
