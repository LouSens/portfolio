import React, { useState, useCallback } from 'react';
import { AnimatePresence, motion, useTransform } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import SectionLabel from './SectionLabel';
import Lightbox from './Lightbox';
import { DIGDAYA, DPICKLEBALL, OMNIQC } from '../data/portfolioData';
import { small } from '../utils/img';
import { navigate, routeUrl } from '../utils/route';

/* The Moments room: the photos from the competitions, as a wall whose columns drift at different speeds
   as you pass. A third kind of movement (the galleries slide sideways, the stack scrubs downward). */

const PHOTOS = [
  { ...DIGDAYA.lead, tag: 'PIDI Digdaya 2026' },
  ...DIGDAYA.photos.slice(2, 4).map((p) => ({ ...p, tag: 'PIDI Digdaya 2026' })),
  { ...DPICKLEBALL.lead, tag: 'DPickleball 2025' },
  ...DIGDAYA.photos.slice(5, 7).map((p) => ({ ...p, tag: 'PIDI Digdaya 2026' })),
  { ...OMNIQC.lead, tag: 'SEA-CICSIC 2026' },
  ...DPICKLEBALL.photos.filter((p) => p.type !== 'video').map((p) => ({ ...p, tag: 'DPickleball 2025' })),
  ...DIGDAYA.photos.slice(0, 2).map((p) => ({ ...p, tag: 'PIDI Digdaya 2026' })),
].filter((p) => p.src);

export default function MomentsWall({ progress }) {
  const [lightbox, setLightbox] = useState(null);
  const close = useCallback(() => setLightbox(null), []);
  const setIndex = useCallback((index) => setLightbox((lb) => (lb ? { ...lb, index } : lb)), []);
  // Columns drift against each other while the room scrolls
  const up = useTransform(progress, [0, 1], [30, -60]);
  const down = useTransform(progress, [0, 1], [-40, 40]);
  const cols = [[], [], []];
  PHOTOS.forEach((p, i) => cols[i % 3].push({ ...p, i }));
  const items = PHOTOS.map((p) => ({ src: p.src, caption: `${p.caption} · ${p.tag}`, label: p.tag }));
  const speeds = [up, down, up];

  return (
    <div className="px-5 sm:px-8 md:px-12 py-8 md:py-12">
      <div className="max-w-[1100px] mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-5 mb-10 md:mb-14">
          <div className="max-w-xl">
            <SectionLabel label="Moments" />
            <h2 className="font-display font-extrabold text-fluid-h2 text-white tracking-tight leading-[1.1]">
              From the <span className="text-[var(--accent)]">stage</span>
            </h2>
            <p className="mt-4 text-[15px] text-white/65">Booths, trophies and teams.</p>
          </div>
          <a
            href={routeUrl('awards')}
            onClick={(e) => { e.preventDefault(); navigate('awards'); }}
            className="group inline-flex items-center gap-2 text-sm text-[var(--accent)] hover:text-white transition-colors"
          >
            Full story on Awards <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" />
          </a>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-5 items-start">
          {cols.map((col, ci) => (
            <motion.div key={ci} style={{ y: speeds[ci] }} className={`flex flex-col gap-3 md:gap-5 ${ci === 2 ? 'hidden md:flex' : ''} ${ci === 1 ? 'mt-10 md:mt-16' : ''}`}>
              {col.map((p) => (
                <button
                  key={p.src}
                  type="button"
                  onClick={() => setLightbox({ items, index: p.i })}
                  className="group relative block w-full overflow-hidden rounded-2xl border border-white/[0.1] bg-white/[0.03] cursor-zoom-in"
                  style={{ aspectRatio: `${p.w || 3} / ${p.h || 2}` }}
                >
                  <img
                    src={small(p.src)}
                    alt={p.caption}
                    loading="lazy"
                    decoding="async"
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                  />
                  <span className="absolute inset-x-0 bottom-0 p-3 pt-10 bg-gradient-to-t from-black/70 to-transparent text-left text-[11px] text-white/90 opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity">
                    {p.tag}
                  </span>
                </button>
              ))}
            </motion.div>
          ))}
        </div>
      </div>
      <AnimatePresence>{lightbox && <Lightbox items={lightbox.items} index={lightbox.index} onClose={close} onIndex={setIndex} />}</AnimatePresence>
    </div>
  );
}
