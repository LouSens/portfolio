import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useMotionValueEvent } from 'framer-motion';

/* A horizontal gallery that holds the page.

   The section is as tall as the sideways distance plus one screen. Inside it, a stage sticks to the
   viewport and the track inside slides left as you scroll down. The next section cannot come into view
   until the last panel has: the only way past is through every panel. Scrolling back up walks the
   gallery in reverse.

   Panels lean toward the camera as they cross the middle of the screen (a shallow corridor effect). */

const reduced = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const clamp = (n, lo, hi) => Math.min(hi, Math.max(lo, n));

function Panel({ index, geometry, x, children, className }) {
  // Distance of this panel's centre from the screen centre, -1 (far left) to 1 (far right).
  const rotateY = useTransform(x, (latest) => {
    const g = geometry.current;
    if (!g.vw || reduced) return 0;
    const centre = g.lefts[index] + g.widths[index] / 2 + latest;
    return clamp((centre - g.vw / 2) / g.vw, -1, 1) * -16;
  });
  const scale = useTransform(x, (latest) => {
    const g = geometry.current;
    if (!g.vw || reduced) return 1;
    const centre = g.lefts[index] + g.widths[index] / 2 + latest;
    return 1 - Math.min(1, Math.abs((centre - g.vw / 2) / g.vw)) * 0.07;
  });
  return (
    <motion.div data-panel style={{ rotateY, scale }} className={`shrink-0 ${className || ''}`}>
      {children}
    </motion.div>
  );
}

export default function HorizontalGate({
  id,
  label,
  panels, // [{ key, name, className, node }]
  className = '',
  hint = 'Keep scrolling to move through',
  speed = 1.5, // sideways pixels travelled per pixel of vertical scroll
}) {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const geometry = useRef({ vw: 0, lefts: [], widths: [], distance: 0 });
  const [active, setActive] = useState(0);
  const dist = useMotionValue(0);

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end end'] });
  const x = useTransform([scrollYProgress, dist], ([p, d]) => -p * d);
  const bar = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  // Measure the track and give the section its height. Done imperatively so the height exists before the
  // parent restores a saved scroll position.
  const measure = useCallback(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const nodes = Array.from(track.querySelectorAll('[data-panel]'));
    const lefts = nodes.map((n) => n.offsetLeft);
    const widths = nodes.map((n) => n.offsetWidth);
    const end = nodes.length ? lefts[nodes.length - 1] + widths[nodes.length - 1] : vw;
    const pad = parseFloat(getComputedStyle(track).paddingRight) || 0;
    const travel = Math.max(0, end + pad - vw);
    geometry.current = { vw, lefts, widths, distance: travel };
    // One viewport of height for the stage itself, plus 1px of vertical scroll per `speed` px of sideways travel.
    section.style.height = `${travel / speed + vh}px`;
    dist.set(travel);
  }, [dist, speed]);

  useLayoutEffect(() => {
    measure();
  }, [measure, panels.length]);

  useEffect(() => {
    const ro = new ResizeObserver(measure);
    if (trackRef.current) ro.observe(trackRef.current);
    window.addEventListener('resize', measure);
    // Images and fonts arriving late can change panel widths.
    window.addEventListener('load', measure);
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', measure);
      window.removeEventListener('load', measure);
    };
  }, [measure]);

  // Which panel is nearest the middle of the screen drives the counter.
  useMotionValueEvent(x, 'change', (latest) => {
    const g = geometry.current;
    if (!g.vw) return;
    let best = 0;
    let bestD = Infinity;
    g.lefts.forEach((l, i) => {
      const d = Math.abs(l + g.widths[i] / 2 + latest - g.vw / 2);
      if (d < bestD) {
        bestD = d;
        best = i;
      }
    });
    setActive((prev) => (prev === best ? prev : best));
  });

  // Bring a given panel to the middle of the screen by moving the page, so the HUD, keyboard focus
  // and the dots all share the one scroll position.
  const goTo = useCallback(
    (i) => {
      const section = sectionRef.current;
      const g = geometry.current;
      if (!section || !g.vw || !g.distance) return;
      const want = g.lefts[i] + g.widths[i] / 2 - g.vw / 2;
      const p = clamp(want / g.distance, 0, 1);
      const top = section.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({ top: top + (p * g.distance) / speed, behavior: 'smooth' });
    },
    [speed]
  );

  const onFocus = (e) => {
    const panel = e.target.closest('[data-panel]');
    if (!panel) return;
    const i = Array.from(trackRef.current.querySelectorAll('[data-panel]')).indexOf(panel);
    if (i >= 0) goTo(i);
  };

  const names = panels.map((p) => p.name);
  const pad = (n) => String(n + 1).padStart(2, '0');

  return (
    <section id={id} ref={sectionRef} aria-label={label} className={`relative ${className}`}>
      <div className="sticky top-0 h-[100svh] overflow-hidden flex flex-col" style={{ perspective: 1600 }}>
        <motion.div
          ref={trackRef}
          onFocusCapture={onFocus}
          style={{ x }}
          className="flex items-center gap-5 md:gap-8 flex-1 min-h-0 pl-[max(1rem,calc((100vw-1100px)/2))] pr-[max(1rem,calc((100vw-1100px)/2))] pt-16 md:pt-20 pb-16"
        >
          {panels.map((p, i) => (
            <Panel key={p.key} index={i} geometry={geometry} x={x} className={p.className}>
              {p.node}
            </Panel>
          ))}
        </motion.div>

        {/* Heads-up display: where you are in the gallery, and how to leave it */}
        <div className="absolute inset-x-0 bottom-0 pb-4 md:pb-6 pointer-events-none">
          <div className="mx-auto max-w-[1100px] px-4 sm:px-6 md:px-8 flex items-center gap-4">
            <span className="font-mono text-[11px] tabular-nums text-white/55 shrink-0 w-[3.2rem]">
              {pad(active)} / {pad(names.length - 1)}
            </span>
            <div className="relative flex-1 h-px bg-white/[0.14]">
              <motion.div className="absolute left-0 top-0 h-px bg-[var(--accent)]" style={{ width: bar }} />
              <div className="absolute inset-0 flex justify-between pointer-events-auto">
                {names.map((n, i) => (
                  <button
                    key={`${n}-${i}`}
                    type="button"
                    aria-label={`Go to ${n}`}
                    onClick={() => goTo(i)}
                    className="-mt-2 h-4 w-4 flex items-center justify-center cursor-pointer group"
                  >
                    <span className={`block rounded-full transition-all ${i === active ? 'w-2 h-2 bg-[var(--accent)]' : 'w-1.5 h-1.5 bg-white/30 group-hover:bg-white/60'}`} />
                  </button>
                ))}
              </div>
            </div>
            <span className="hidden sm:block text-[11px] text-white/45 shrink-0 truncate max-w-[40%]" aria-live="polite">
              {active === names.length - 1 ? 'Scroll on to leave the gallery' : names[active] || hint}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
