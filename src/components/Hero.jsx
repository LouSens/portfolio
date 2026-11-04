import React from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { PHOTOS } from '../data/photos';
import { small } from '../utils/img';
import IsoObject from './iso/IsoObject';
import ResumeButton from './ResumeButton';

const ease = [0.22, 1, 0.36, 1];
const calm = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
// On a fresh load the name screen is still up, so the hero waits for it to lift before it moves in
const lead = typeof document !== 'undefined' && document.getElementById('splash') ? 1.05 : 0;

const LINKS = [
  { label: 'GitHub', href: PERSONAL_INFO.github, Icon: Github },
  { label: 'LinkedIn', href: PERSONAL_INFO.linkedin, Icon: Linkedin },
];

// A competition photo for the image half of the hero
const PHOTO = PHOTOS.find((p) => /DIGDAYA|digdaya/i.test(p.src || '')) || PHOTOS[0];

/* The first screen: one diagonal composition. A black-to-orange gradient on the left carries the text, a competition
   photo fills the right, and an isometric object turns on the seam between them. */
export default function Hero() {
  const item = (delay) => ({
    initial: calm ? false : { opacity: 0, y: 14 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, delay: delay + lead, ease },
  });

  return (
    <section id="hero" className="relative min-h-[100svh] flex items-center overflow-hidden px-5 sm:px-8 pt-28 pb-20">
      {/* Left: gradient from the page colour into a warm orange glow */}
      <div
        className="absolute inset-0"
        aria-hidden="true"
        style={{
          background:
            'radial-gradient(60% 70% at 8% 100%, rgb(var(--accent-rgb) / 0.35), transparent 70%), linear-gradient(115deg, rgb(var(--bg-rgb)) 30%, rgb(var(--accent-rgb) / 0.16) 100%)',
        }}
      />

      {/* Right: the photo, cut on a diagonal (a band behind the text on phones) */}
      {PHOTO && (
        <div className="hero-photo absolute inset-y-0 right-0 w-full lg:w-[56%]" aria-hidden="true">
          <img src={small(PHOTO.src)} alt="" decoding="async" fetchPriority="high" className="w-full h-full object-cover" />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(90deg, rgb(var(--bg-rgb) / 0.75), transparent 45%), linear-gradient(0deg, rgb(var(--bg-rgb) / 0.55), transparent 40%)' }} />
          <div className="absolute inset-0 mix-blend-soft-light" style={{ background: 'linear-gradient(135deg, rgb(var(--accent-rgb) / 0.55), transparent 60%)' }} />
        </div>
      )}
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
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-accent text-white font-display font-semibold text-sm hover:brightness-110 transition"
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

      {/* The object turns on the seam, between the text and the photo */}
      <motion.div {...item(0.4)} className="hidden lg:block absolute z-10 right-[34%] top-1/2 -translate-y-1/2 pointer-events-none" aria-hidden="true">
        <div className="absolute inset-0 -m-10 rounded-full blur-3xl bg-accent/25" />
        <IsoObject kind="layers" className="relative w-[300px] h-auto drop-shadow-[0_20px_40px_rgba(0,0,0,0.45)]" />
      </motion.div>
    </section>
  );
}
