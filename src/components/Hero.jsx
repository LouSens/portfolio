import React from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import StageArt from './StageArt';
import ResumeButton from './ResumeButton';

const ease = [0.22, 1, 0.36, 1];
const calm = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
// On a fresh load the name screen is still up, so the hero waits for it to lift before it moves in
const lead = typeof document !== 'undefined' && document.getElementById('splash') ? 1.05 : 0;

const LINKS = [
  { label: 'GitHub', href: PERSONAL_INFO.github, Icon: Github },
  { label: 'LinkedIn', href: PERSONAL_INFO.linkedin, Icon: Linkedin },
];

/* The first screen: a dark stage set into the page, isometric line art drifting behind the text. */
export default function Hero() {
  const item = (delay) => ({
    initial: calm ? false : { opacity: 0, y: 14 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, delay: delay + lead, ease },
  });

  return (
    <section id="hero" className="hero-stage-pad">
      <div className="stage min-h-[calc(100svh-7.5rem)] flex items-center px-6 sm:px-10 md:px-16 py-16">
        <StageArt scene="hero" />
      <div className="relative z-10 w-full max-w-[1100px] mx-auto">
        <div className="max-w-[40rem]">
          <motion.h1 {...item(0.12)} className="font-display font-extrabold text-fluid-h1 tracking-[-0.035em] leading-[1.04] text-white">
            I build web apps and <span className="text-[var(--accent)]">AI systems.</span>
          </motion.h1>

          <motion.p {...item(0.2)} className="mt-6 text-lg text-white/75 leading-relaxed max-w-[32rem]">
            David Kurniawan, AI student at Xiamen University Malaysia. The backend, the data and the models behind a product.
          </motion.p>

          <motion.div {...item(0.28)} className="mt-9 flex flex-col sm:flex-row gap-3">
            <a
              href={`mailto:${PERSONAL_INFO.email}`}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-accent text-white font-display font-bold text-sm tracking-wide shadow-[0_8px_24px_rgba(255,90,54,0.4)] hover:brightness-110 transition"
            >
              <Mail size={15} aria-hidden="true" /> Get in touch
            </a>
            <ResumeButton />
          </motion.div>

          <motion.ul {...item(0.36)} className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2" aria-label="Find me">
            {LINKS.map(({ label, href, Icon }) => (
              <li key={label}>
                <a href={href} target="_blank" rel="noreferrer" className="group inline-flex items-center gap-2 py-1.5 text-sm text-white/75 hover:text-white transition-colors">
                  <Icon size={16} className="text-white/55 group-hover:text-[var(--accent)] transition-colors" aria-hidden="true" />
                  {label}
                </a>
              </li>
            ))}
          </motion.ul>
        </div>
      </div>

      </div>
    </section>
  );
}
