import React, { useRef, useState } from 'react';
import { AnimatePresence, motion, useMotionValueEvent, useScroll, useTransform } from 'framer-motion';
import SectionLabel from './SectionLabel';
import TechIcon from './ui/TechIcon';
import { TECH_STACK, EARLIER_WORK, PROJECTS_DATA } from '../data/portfolioData';

/* The Tech stack room: a different mechanic from the projects gallery. The stage stays put while you scroll
   down through the layers of a system. Each layer is a plate of an isometric stack; the active one slides
   out and lights up, and its tools appear as icons. Hover or focus an icon for its name and the repos. */

const S = 12;
const proj = (x, y, z) => [(x - y) * 0.866 * S, (x + y) * 0.5 * S - z * S];
const pts = (l) => l.map((p) => p.join(',')).join(' ');

function Plates({ n, active }) {
  const plates = Array.from({ length: n }, (_, i) => i); // 0 is the top plate
  return (
    <svg viewBox="-70 -70 140 230" className="w-full h-full" aria-hidden="true" fill="none" strokeLinejoin="round">
      {[...plates].reverse().map((i) => {
        const z = (n - 1 - i) * 1.7;
        const w = 7;
        const top = [proj(0, 0, z + 0.3), proj(w, 0, z + 0.3), proj(w, w, z + 0.3), proj(0, w, z + 0.3)];
        const right = [proj(w, 0, z), proj(w, w, z), proj(w, w, z + 0.3), proj(w, 0, z + 0.3)];
        const front = [proj(0, w, z), proj(w, w, z), proj(w, w, z + 0.3), proj(0, w, z + 0.3)];
        const on = i === active;
        return (
          <motion.g
            key={i}
            animate={{ x: on ? 16 : 0, opacity: on || active < 0 ? 1 : 0.5 }}
            transition={{ type: 'spring', stiffness: 160, damping: 20 }}
          >
            <polygon points={pts(front)} fill="rgb(var(--bg-rgb) / 0.95)" stroke="rgb(var(--fg) / 0.45)" strokeWidth="1" vectorEffect="non-scaling-stroke" />
            <polygon points={pts(right)} fill="rgb(var(--bg-rgb) / 0.95)" stroke="rgb(var(--fg) / 0.45)" strokeWidth="1" vectorEffect="non-scaling-stroke" />
            <polygon
              points={pts(top)}
              fill={on ? 'rgb(var(--accent-rgb) / 0.16)' : 'rgb(var(--fg) / 0.05)'}
              stroke={on ? 'rgb(var(--accent-rgb))' : 'rgb(var(--fg) / 0.7)'}
              strokeWidth={on ? 1.6 : 1}
              vectorEffect="non-scaling-stroke"
            />
          </motion.g>
        );
      })}
    </svg>
  );
}

export default function StackLayers() {
  const ref = useRef(null);
  const n = TECH_STACK.length;
  const [active, setActive] = useState(0);
  const [hover, setHover] = useState(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });
  useMotionValueEvent(scrollYProgress, 'change', (p) => setActive(Math.min(n - 1, Math.floor(p * n * 0.999))));
  const bar = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  const group = TECH_STACK[active];
  const total = new Set(TECH_STACK.flatMap((g) => g.items.map((i) => i.name))).size;
  const repoCount = PROJECTS_DATA.length + EARLIER_WORK.length;
  const shown = hover && group.items.find((i) => i.name === hover);

  return (
    <section id="stack" ref={ref} aria-label="Tech stack" className="relative" style={{ height: `${n * 62 + 100}svh` }}>
      <div className="sticky top-0 h-[100svh] flex items-center px-4 sm:px-6 md:px-8 pt-16">
        <div className="w-full max-w-[1100px] mx-auto grid md:grid-cols-12 gap-6 md:gap-12 items-center">
          {/* Left: heading and the stack of plates */}
          <div className="md:col-span-5 flex md:block items-center gap-5">
            <div className="min-w-0">
              <SectionLabel label="Tech stack" />
              <h2 className="font-display font-extrabold text-fluid-h2 text-white tracking-tight leading-[1.1]">
                Every tool, <span className="text-[var(--accent)]">by layer</span>
              </h2>
              <p className="mt-3 text-sm text-white/60">{total} tools across {repoCount} repositories.</p>
            </div>
            <div className="w-28 h-40 shrink-0 md:w-full md:h-[min(46svh,380px)] md:mt-6">
              <Plates n={n} active={active} />
            </div>
          </div>

          {/* Right: the active layer */}
          <div className="md:col-span-7">
            <div className="flex items-baseline justify-between gap-4">
              <AnimatePresence mode="wait">
                <motion.h3
                  key={group.name}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="font-display font-bold text-2xl md:text-4xl text-white tracking-tight"
                >
                  {group.name}
                </motion.h3>
              </AnimatePresence>
              <span className="font-mono text-xs text-white/45 tabular-nums shrink-0">
                {String(active + 1).padStart(2, '0')} / {String(n).padStart(2, '0')}
              </span>
            </div>
            <div className="mt-3 h-px bg-white/[0.12] relative">
              <motion.div className="absolute left-0 top-0 h-px bg-[var(--accent)]" style={{ width: bar }} />
            </div>

            <AnimatePresence mode="wait">
              <motion.ul
                key={group.name}
                initial="hide"
                animate="show"
                exit="hide"
                variants={{ show: { transition: { staggerChildren: 0.025 } }, hide: {} }}
                className="mt-6 grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 gap-2.5 md:gap-3"
              >
                {group.items.map((it) => (
                  <motion.li
                    key={it.name}
                    variants={{ hide: { opacity: 0, y: 12, scale: 0.9 }, show: { opacity: 1, y: 0, scale: 1 } }}
                    transition={{ duration: 0.25 }}
                  >
                    <button
                      type="button"
                      onMouseEnter={() => setHover(it.name)}
                      onMouseLeave={() => setHover(null)}
                      onFocus={() => setHover(it.name)}
                      onBlur={() => setHover(null)}
                      title={`${it.name}: ${it.repos.join(', ')}`}
                      className="relative w-full aspect-square rounded-2xl border border-white/[0.12] bg-panel/85 hover:border-[var(--accent)]/60 focus-visible:border-[var(--accent)] outline-none text-white/85 hover:text-white flex items-center justify-center transition-colors cursor-default"
                    >
                      <TechIcon name={it.name} size={26} />
                      <span className="absolute top-1.5 right-2 text-[10px] text-white/35 tabular-nums">{it.repos.length}</span>
                    </button>
                  </motion.li>
                ))}
              </motion.ul>
            </AnimatePresence>

            {/* Caption: the name and where it is used (icons carry the page; words only on demand) */}
            <p className="mt-5 min-h-[2.75rem] text-sm text-white/55 leading-snug" aria-live="polite">
              {shown ? (
                <>
                  <span className="text-white font-medium">{shown.name}</span>
                  <span className="text-white/40"> · used in {shown.repos.length} {shown.repos.length === 1 ? 'repo' : 'repos'}: </span>
                  {shown.repos.join(', ')}
                </>
              ) : (
                <span className="text-white/40">Hover an icon for its name. The small number is how many repos use it.</span>
              )}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
