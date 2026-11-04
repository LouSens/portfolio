import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Github, Linkedin, Mail } from 'lucide-react';
import { PERSONAL_INFO, PROJECTS_DATA } from '../data/portfolioData';
import ProjectMedia from './ProjectMedia';
import RankChip from './RankChip';
import ResumeButton from './ResumeButton';

const ease = [0.22, 1, 0.36, 1];
// On a fresh load the name screen is still up, so the hero waits for it to lift before it moves in
const lead = typeof document !== 'undefined' && document.getElementById('splash') ? 1.05 : 0;
const calm = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const LINKS = [
  { label: 'GitHub', href: PERSONAL_INFO.github, Icon: Github, external: true },
  { label: 'LinkedIn', href: PERSONAL_INFO.linkedin, Icon: Linkedin, external: true },
  { label: 'Email', href: `mailto:${PERSONAL_INFO.email}`, Icon: Mail },
];

/* The first screen: who I am and how to reach me on the left, the featured project on the right. */
export default function Hero({ onOpenProject }) {
  const featured = PROJECTS_DATA.find((p) => p.id === 'adept');
  const item = (delay) => ({
    initial: calm ? false : { opacity: 0, y: 14 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, delay: delay + lead, ease },
  });
  return (
    <section id="hero" className="relative min-h-[88svh] flex items-center px-5 sm:px-8 pt-28 pb-16">
      <div className="relative z-10 w-full max-w-[1100px] mx-auto grid lg:grid-cols-12 gap-10 items-center">
        <div className="lg:col-span-7">
          <motion.h1 {...item(0.12)} className="font-display font-extrabold text-fluid-h1 tracking-[-0.035em] leading-[1.04] text-white">
            I build web apps and <span className="text-[var(--accent)]">AI systems.</span>
          </motion.h1>

          <motion.p {...item(0.2)} className="mt-6 text-lg text-white/65 leading-relaxed max-w-[32rem]">
            David Kurniawan, AI student at Xiamen University Malaysia. The backend, the data and the models behind a product.
          </motion.p>

          <motion.div {...item(0.28)} className="mt-9 flex flex-col sm:flex-row gap-3">
            <a
              href={`mailto:${PERSONAL_INFO.email}`}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-accent text-white font-display font-semibold text-sm hover:brightness-110 transition cursor-pointer"
            >
              <Mail size={15} aria-hidden="true" /> Get in touch
            </a>
            <ResumeButton />
          </motion.div>

          <motion.ul {...item(0.36)} className="mt-8 flex flex-wrap items-center gap-2.5" aria-label="Find me">
            {LINKS.filter((l) => l.label !== 'Email').map(({ label, href, Icon, external }) => (
              <li key={label}>
                <a
                  href={href}
                  target={external ? '_blank' : undefined}
                  rel={external ? 'noreferrer' : undefined}
                  className="group inline-flex items-center gap-2 px-3.5 py-2 rounded-full border border-white/[0.14] text-[13px] text-white/75 hover:text-white hover:border-accent/60 transition-colors"
                >
                  <Icon size={15} className="text-white/55 group-hover:text-[var(--accent)] transition-colors" aria-hidden="true" />
                  {label}
                </a>
              </li>
            ))}
          </motion.ul>
        </div>

        {featured && (
          <motion.div {...item(0.3)} className="lg:col-span-5">
            <button
              type="button"
              onClick={() => onOpenProject?.(featured)}
              className="liquid-glass-card group block w-full text-left rounded-3xl p-3 cursor-pointer transition-transform duration-300 hover:-translate-y-1"
              aria-label={`Open ${featured.title}`}
            >
              <div className="rounded-2xl overflow-hidden border border-white/[0.1]">
                <ProjectMedia project={featured} still eager />
              </div>
              <div className="px-2 pt-4 pb-2">
                <p className="text-xs text-white/45">Featured project</p>
                <div className="mt-1 flex items-center justify-between gap-3">
                  <span className="font-display font-bold text-xl text-white">{featured.title}</span>
                  <span className="inline-flex items-center gap-1.5 text-sm text-[var(--accent)]">
                    Open <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
                  </span>
                </div>
                <RankChip rank={featured.rank} className="mt-3" />
              </div>
            </button>
          </motion.div>
        )}
      </div>
    </section>
  );
}
