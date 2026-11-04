import React, { useCallback, useEffect, useMemo, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import AutoScroll from 'embla-carousel-auto-scroll';
import { AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';
import SectionLabel from './SectionLabel';
import Lightbox from './Lightbox';
import IsoObject from './iso/IsoObject';
import { PHOTOS } from '../data/photos';
import { small } from '../utils/img';

/* Photos from the competitions on a film strip that drifts by itself, like a reel. It stops when you hover, touch or
   focus it, while a photo is open, or when you press pause, and it stays still for people who ask for less motion. */
const reduced = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
export default function PhotoStrip() {
  const plugins = useMemo(() => [AutoScroll({ speed: 0.7, startDelay: 600, stopOnInteraction: false, stopOnMouseEnter: true, stopOnFocusIn: true })], []);
  const [ref, api] = useEmblaCarousel({ align: 'start', dragFree: true, loop: true }, plugins);
  const [playing, setPlaying] = useState(!reduced);
  const [lightbox, setLightbox] = useState(null);
  // Apply play/pause, and hold still while a photo is open
  useEffect(() => {
    const auto = api?.plugins()?.autoScroll;
    if (!auto) return;
    if (playing && !lightbox) auto.play();
    else auto.stop();
  }, [api, playing, lightbox]);
  // After a drag or a hover ends, keep drifting if the strip is meant to be playing
  useEffect(() => {
    const auto = api?.plugins()?.autoScroll;
    if (!api || !auto) return undefined;
    const resume = () => playing && !lightbox && auto.play();
    api.on('pointerUp', resume);
    return () => api.off('pointerUp', resume);
  }, [api, playing, lightbox]);

  const items = PHOTOS.map((p) => ({ src: p.src, caption: `${p.caption} · ${p.tag}`, label: p.tag }));
  const arrow = 'w-10 h-10 rounded-full border border-white/[0.16] text-white/80 hover:text-white hover:border-white/[0.4] flex items-center justify-center transition-colors cursor-pointer';
  const sprockets = { backgroundImage: 'repeating-linear-gradient(90deg, rgb(255 255 255 / 0.22) 0 14px, transparent 14px 30px)', WebkitMaskImage: 'linear-gradient(#000,#000)' };

  return (
    <div className="px-5 sm:px-8 py-12 md:py-16">
      <div className="max-w-[1100px] mx-auto">
        <div className="flex items-end justify-between gap-6 mb-8">
          <div>
            <SectionLabel label="Moments" />
            <h2 className="font-display font-extrabold text-fluid-h2 text-white tracking-tight leading-[1.1]">
              From the <span className="text-[var(--accent)]">stage</span>
            </h2>
            <p className="mt-3 text-[15px] text-white/55">Booths, trophies and teams. Hover to pause, drag to browse.</p>
          </div>
          <IsoObject kind="camera" className="hidden md:block w-28 h-28 shrink-0" />
        </div>

        <div className="rounded-2xl bg-[#0c0c10] border border-white/[0.12] py-3 text-white">
          <div className="h-2.5 mx-0" style={sprockets} aria-hidden="true" />
          <div className="overflow-hidden my-3 cursor-grab active:cursor-grabbing" ref={ref}>
            <div className="flex gap-3 px-3">
              {PHOTOS.map((p, i) => (
                <figure key={p.src} className="flex-none">
                  <button
                    type="button"
                    onClick={() => setLightbox({ index: i })}
                    className="block overflow-hidden rounded-md bg-white/[0.05] cursor-zoom-in"
                    style={{ height: 280, aspectRatio: `${p.w || 3} / ${p.h || 2}` }}
                    aria-label={p.caption}
                  >
                    <img src={small(p.src)} alt={p.caption} draggable={false} loading="lazy" decoding="async" className="w-full h-full object-cover" />
                  </button>
                  <figcaption className="mt-2 text-[11px] text-white/55 max-w-[16rem] truncate">{p.tag}</figcaption>
                </figure>
              ))}
            </div>
          </div>
          <div className="h-2.5" style={sprockets} aria-hidden="true" />
        </div>

        <div className="mt-5 flex items-center justify-between gap-4">
          <div className="flex gap-2">
            <button type="button" className={arrow} onClick={() => api?.scrollPrev()} aria-label="Previous photos"><ChevronLeft size={18} /></button>
            <button type="button" className={arrow} onClick={() => setPlaying((v) => !v)} aria-label={playing ? 'Pause the strip' : 'Play the strip'} aria-pressed={!playing}>
              {playing ? <Pause size={16} /> : <Play size={16} />}
            </button>
            <button type="button" className={arrow} onClick={() => api?.scrollNext()} aria-label="Next photos"><ChevronRight size={18} /></button>
          </div>
        </div>
      </div>
      <AnimatePresence>
        {lightbox && <Lightbox items={items} index={lightbox.index} onClose={() => setLightbox(null)} onIndex={(index) => setLightbox({ index })} />}
      </AnimatePresence>
    </div>
  );
}
