import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Download, Github, Linkedin, Mail } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import StageArt from './StageArt';

const ease = [0.22, 1, 0.36, 1];
const calm = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
// On a fresh load the name screen is still up, so the hero waits for it to lift before it moves in
const lead = typeof document !== 'undefined' && document.getElementById('splash') ? 1.05 : 0;

const ICONS = [
  { label: 'GitHub', href: PERSONAL_INFO.github, Icon: Github, external: true },
  { label: 'LinkedIn', href: PERSONAL_INFO.linkedin, Icon: Linkedin, external: true },
  { label: 'Email', href: `mailto:${PERSONAL_INFO.email}`, Icon: Mail },
  { label: 'Resume', href: PERSONAL_INFO.resumeUrl, Icon: Download, download: 'CV_David_Kurniawan.pdf' },
];

const PROOF = [
  ['Finalist, top 15', 'SDC XMUM Hackathon 2026'],
  ['Finalist, top 80', 'PIDI x Digdaya Hackathon 2026'],
];

/* The first screen: a stage set into the page. Top: the one sentence about me and the two things to do next.
   Bottom bar: where else to find me on the left, the results that back the sentence on the right. */
export default function Hero() {
  const item = (delay) => ({
    initial: calm ? false : { opacity: 0, y: 14 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, delay: delay + lead, ease },
  });
  const goProjects = (e) => {
    e.preventDefault();
    document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="hero-stage-pad">
      <div className="stage min-h-[calc(100svh-7.5rem)] max-h-[860px] flex flex-col">
        <StageArt scene="hero" />

        <div className="relative z-10 flex-1 flex items-center px-6 sm:px-10 md:px-16 pt-14 pb-10">
          <div className="w-full max-w-[1100px] mx-auto">
            <div className="max-w-[44rem]">
              <motion.h1 {...item(0.1)} className="font-display font-extrabold text-fluid-h1 tracking-[-0.035em] leading-[1.04] text-white">
                I build the backend and AI behind <span className="text-[var(--accent)]">real products.</span>
              </motion.h1>

              <motion.p {...item(0.2)} className="mt-6 text-lg md:text-xl text-white/75 leading-relaxed max-w-[34rem]">
                I&apos;m David, an AI student at Xiamen University Malaysia. I take hackathon projects from idea to a working demo, and two of them reached the finals.
              </motion.p>

              <motion.div {...item(0.3)} className="mt-9 flex flex-col sm:flex-row gap-3">
                <a
                  href="#work"
                  onClick={goProjects}
                  className="group inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-xl bg-accent text-white font-display font-bold text-[15px] shadow-[0_10px_28px_rgba(255,90,54,0.35)] hover:brightness-110 transition"
                >
                  See my projects
                  <ArrowRight size={17} className="transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                </a>
                <a
                  href={`mailto:${PERSONAL_INFO.email}`}
                  className="inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-xl border-2 border-white/80 text-white font-display font-bold text-[15px] hover:bg-white hover:text-canvas transition-colors"
                >
                  <Mail size={17} aria-hidden="true" /> Get in touch
                </a>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <motion.div {...item(0.45)} className="stage-bar relative z-10 px-6 sm:px-10 md:px-16 py-5">
          <div className="max-w-[1100px] mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-5">
            <ul className="flex items-center gap-2" aria-label="Find me">
              {ICONS.map(({ label, href, Icon, external, download }) => (
                <li key={label}>
                  <a
                    href={href}
                    target={external ? '_blank' : undefined}
                    rel={external ? 'noreferrer' : undefined}
                    download={download}
                    aria-label={label}
                    title={label}
                    className="w-11 h-11 rounded-xl border border-white/25 text-white/80 hover:text-white hover:border-white/60 hover:bg-white/10 flex items-center justify-center transition-colors"
                  >
                    <Icon size={18} aria-hidden="true" />
                  </a>
                </li>
              ))}
            </ul>
            <ul className="flex flex-wrap gap-x-10 gap-y-3">
              {PROOF.map(([result, event]) => (
                <li key={event}>
                  <span className="block font-display font-bold text-[15px] text-[var(--accent)]">{result}</span>
                  <span className="block text-xs text-white/60">{event}</span>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
