import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Github, Linkedin, Mail } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import IsoObject from './iso/IsoObject';
import ResumeButton from './ResumeButton';

const ease = [0.22, 1, 0.36, 1];
const calm = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const LINKS = [
  { label: 'GitHub', href: PERSONAL_INFO.github, Icon: Github, external: true },
  { label: 'LinkedIn', href: PERSONAL_INFO.linkedin, Icon: Linkedin, external: true },
  { label: 'Email', href: `mailto:${PERSONAL_INFO.email}`, Icon: Mail },
];

/* The lobby. `panel` is the 3D version (fills its panel, no frame); otherwise it is the first section of the light page. */
export default function Hero({ panel = false }) {
  const item = (delay) => ({
    initial: calm ? false : { opacity: 0, y: 14 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.55, delay, ease },
  });
  const Wrap = panel ? 'div' : 'section';
  const wrapProps = panel
    ? { className: 'relative h-full flex items-center px-8 md:px-14' }
    : { id: 'hero', className: 'relative min-h-[88svh] flex items-center px-5 sm:px-8 pt-28 pb-16' };

  return (
    <Wrap {...wrapProps}>
      <div className="relative z-10 w-full max-w-[1100px] mx-auto grid lg:grid-cols-12 gap-10 items-center">
        <div className="lg:col-span-7">
          <motion.p {...item(0.05)} className="inline-flex items-center gap-2.5 text-sm text-white/65">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60 animate-ping" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            {PERSONAL_INFO.status}
          </motion.p>

          <motion.h1 {...item(0.12)} className="mt-6 font-display font-extrabold text-fluid-h1 tracking-[-0.035em] leading-[1.04] text-white">
            I build web apps and <span className="text-[var(--accent)]">AI systems.</span>
          </motion.h1>

          <motion.p {...item(0.2)} className="mt-6 text-lg text-white/65 leading-relaxed max-w-[32rem]">
            David Kurniawan, AI student at Xiamen University Malaysia. The backend, the data and the models behind a product.
          </motion.p>

          <motion.div {...item(0.28)} className="mt-9 flex flex-col sm:flex-row gap-3">
            <a
              href="#work"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-accent text-white font-display font-semibold text-sm hover:brightness-110 transition cursor-pointer"
            >
              View projects <ArrowDown size={15} />
            </a>
            <ResumeButton />
          </motion.div>

          <motion.ul {...item(0.36)} className="mt-6 flex flex-wrap items-center gap-2.5" aria-label="Find me">
            {LINKS.map(({ label, href, Icon, external }) => (
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

        {/* The one sculpture, in its own column so it never sits behind text */}
        <motion.div {...item(0.3)} className="hidden lg:flex lg:col-span-5 items-center justify-center" aria-hidden="true">
          <IsoObject kind="layers" className="w-full max-w-[380px] h-auto" />
        </motion.div>
      </div>
    </Wrap>
  );
}
