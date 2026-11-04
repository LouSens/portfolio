import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Github, Linkedin, Mail } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import StageArt from './StageArt';
import IsoObject from './iso/IsoObject';

const ease = [0.22, 1, 0.36, 1];
const calm = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
// On a fresh load the name screen is still up, so the hero waits for it to lift before it moves in
const lead = typeof document !== 'undefined' && document.getElementById('splash') ? 1.05 : 0;

const LINKS = [
  { label: 'GitHub', href: PERSONAL_INFO.github, Icon: Github },
  { label: 'LinkedIn', href: PERSONAL_INFO.linkedin, Icon: Linkedin },
  { label: 'Email', href: `mailto:${PERSONAL_INFO.email}`, Icon: Mail },
];

/* The first screen: the sentence about me, one main action, one quiet one, and where else to find me. */
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
    <section id="hero">
      <div className="stage stage-bleed min-h-[100svh] flex flex-col pt-16">
        <StageArt scene="hero" />

        <div className="relative z-10 flex-1 flex items-center px-5 sm:px-10 md:px-16 pt-24 pb-14">
          <div className="w-full max-w-[1100px] mx-auto grid lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7 text-center lg:text-left">
              <motion.h1 {...item(0.1)} className="font-display font-extrabold text-[2.35rem] sm:text-[clamp(2.75rem,1.2rem+4vw,4.5rem)] tracking-[-0.035em] leading-[1.04] text-white">
                I build web apps<br className="sm:hidden" />and <span className="text-[var(--accent)] whitespace-nowrap">AI systems.</span>
              </motion.h1>

              <motion.p {...item(0.2)} className="mt-5 sm:mt-6 text-base sm:text-lg md:text-xl text-white/80 leading-relaxed max-w-[34rem] mx-auto lg:mx-0">
                David Kurniawan, AI student at Xiamen University Malaysia. I work on the backend, the data and the models behind a product.
              </motion.p>

              <motion.div {...item(0.3)} className="mt-8 flex flex-col sm:flex-row sm:items-center sm:justify-center lg:justify-start gap-3 max-w-[22rem] sm:max-w-none mx-auto lg:mx-0">
                <a
                  href="#work"
                  onClick={goProjects}
                  className="group inline-flex items-center justify-center gap-2 h-12 px-7 rounded-full bg-accent text-white font-display font-semibold text-[15px] hover:brightness-110 transition"
                >
                  See my projects
                  <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                </a>
                <a
                  href={`mailto:${PERSONAL_INFO.email}`}
                  className="inline-flex items-center justify-center gap-2 h-12 px-7 rounded-full sm:border border-white/35 text-white font-display font-semibold text-[15px] hover:bg-white/10 transition-colors"
                >
                  Get in touch
                </a>
              </motion.div>

              <motion.ul {...item(0.4)} className="mt-5 sm:mt-6 flex items-center justify-center lg:justify-start gap-6" aria-label="Find me">
                {LINKS.map(({ label, href, Icon }) => (
                  <li key={label}>
                    <a
                      href={href}
                      target={label === 'Email' ? undefined : '_blank'}
                      rel="noreferrer"
                      className="group inline-flex items-center gap-2 py-2 text-sm text-white/75 hover:text-white transition-colors"
                    >
                      <Icon size={17} aria-hidden="true" />
                      {label}
                    </a>
                  </li>
                ))}
              </motion.ul>
            </div>

            {/* The object sits in its own column, level with the text */}
            <motion.div {...item(0.35)} className="hidden lg:flex lg:col-span-5 items-center justify-center" aria-hidden="true">
              <IsoObject kind="system" className="w-full max-w-[470px] h-auto" />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
