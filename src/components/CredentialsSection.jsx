import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence, useInView, animate } from 'framer-motion';
import { ArrowDown, ArrowRight, ArrowUpRight, ChevronLeft, ChevronRight, FileText, Image as ImageIcon } from 'lucide-react';
import SectionLabel from './SectionLabel';
import Lightbox from './Lightbox';
import Tilt from './Tilt';
import { Play } from 'lucide-react';
import { srcSet, isTouch } from '../utils/img';
import { ACHIEVEMENTS, AWARD_FEATURES, DEANS_LIST, EDUCATION, PROJECTS_DATA } from '../data/portfolioData';
import { navigate, routeUrl } from '../utils/route';

const ease = [0.22, 1, 0.36, 1];
const EDGE = 'max(1rem, calc((100vw - 1100px) / 2))';

const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* Counts up once when scrolled into view. The final text sits invisibly underneath so the width
   never changes while counting. */
function CountUp({ to }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!inView) return undefined;
    if (prefersReducedMotion()) {
      setN(to);
      return undefined;
    }
    const controls = animate(0, to, { duration: 1.4, ease, onUpdate: (v) => setN(Math.round(v)) });
    return () => controls.stop();
  }, [inView, to]);

  const final = to.toLocaleString('en-US');
  return (
    <span ref={ref} className="relative inline-block">
      <span className="invisible" aria-hidden="true">{final}</span>
      <span className="absolute left-0 top-0">{n.toLocaleString('en-US')}</span>
      <span className="sr-only">{final}</span>
    </span>
  );
}

/* A looping clip that only plays while it is on screen (saves battery on phones). */
function LoopVideo({ src, poster, className }) {
  const ref = useRef(null);
  const inView = useInView(ref, { amount: 0.4 });
  const [tapToPlay, setTapToPlay] = useState(() => isTouch());

  useEffect(() => {
    const v = ref.current;
    if (!v || tapToPlay) return;
    if (inView && !prefersReducedMotion()) v.play().catch(() => {});
    else v.pause();
  }, [inView, tapToPlay]);

  if (tapToPlay) {
    return (
      <button type="button" onClick={() => setTapToPlay(false)} aria-label="Play clip" className="relative block w-full h-full cursor-pointer">
        <img src={poster} alt="" loading="lazy" decoding="async" className={className} />
        <span className="absolute inset-0 flex items-center justify-center">
          <span className="w-14 h-14 rounded-full bg-black/70 border border-white/30 flex items-center justify-center text-white">
            <Play size={22} className="ml-0.5" />
          </span>
        </span>
      </button>
    );
  }
  return <video ref={ref} src={src} poster={poster} muted loop playsInline autoPlay preload="none" className={className} />;
}

/* Horizontal media band. Touch and trackpads scroll it natively; mouse users get arrow buttons
   and click-and-drag, since a mouse wheel cannot scroll sideways. */
function MediaBand({ label, children }) {
  const ref = useRef(null);
  const drag = useRef({ down: false, moved: false, x: 0, left: 0 });
  const [can, setCan] = useState({ left: false, right: false });

  const update = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    setCan({ left: el.scrollLeft > 4, right: el.scrollLeft < el.scrollWidth - el.clientWidth - 4 });
  }, []);

  useEffect(() => {
    update();
    const t = setTimeout(update, 600);
    window.addEventListener('resize', update);
    return () => {
      clearTimeout(t);
      window.removeEventListener('resize', update);
    };
  }, [update]);

  const page = (dir) => {
    const el = ref.current;
    if (el) el.scrollBy({ left: dir * el.clientWidth * 0.7, behavior: 'smooth' });
  };

  const onPointerDown = (e) => {
    if (e.pointerType !== 'mouse' || e.button !== 0) return;
    drag.current = { down: true, moved: false, x: e.clientX, left: ref.current.scrollLeft };
  };
  const onPointerMove = (e) => {
    const d = drag.current;
    if (!d.down) return;
    const dx = e.clientX - d.x;
    if (!d.moved && Math.abs(dx) > 6) {
      d.moved = true;
      ref.current.style.scrollSnapType = 'none';
    }
    if (d.moved) ref.current.scrollLeft = d.left - dx;
  };
  const endDrag = () => {
    const d = drag.current;
    if (!d.down) return;
    d.down = false;
    if (d.moved) ref.current.style.scrollSnapType = '';
  };
  // a drag must not open the photo underneath
  const onClickCapture = (e) => {
    if (drag.current.moved) {
      e.preventDefault();
      e.stopPropagation();
      drag.current.moved = false;
    }
  };

  const arrow = 'hidden md:flex absolute top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-black/70 hover:bg-black/90 border border-white/[0.2] hover:border-white/50 text-white items-center justify-center backdrop-blur transition-colors cursor-pointer';

  return (
    <div className="relative mt-6 md:mt-10">
      <div
        ref={ref}
        onScroll={update}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerLeave={endDrag}
        onClickCapture={onClickCapture}
        className="no-scrollbar flex gap-3 md:gap-4 overflow-x-auto snap-x snap-mandatory md:snap-none pb-2 pr-4 md:cursor-grab md:active:cursor-grabbing select-none"
        style={{ paddingLeft: EDGE, scrollPaddingLeft: EDGE }}
        aria-label={label}
      >
        {children}
      </div>
      {can.left && (
        <button type="button" onClick={() => page(-1)} aria-label="Scroll left" className={`${arrow} left-4 lg:left-6`}>
          <ChevronLeft size={22} />
        </button>
      )}
      {can.right && (
        <button type="button" onClick={() => page(1)} aria-label="Scroll right" className={`${arrow} right-4 lg:right-16`}>
          <ChevronRight size={22} />
        </button>
      )}
    </div>
  );
}

/* One award with real material behind it: a lead visual, the numbers, a short account, and a
   band of everything else (photos, slides or a clip) that runs to the screen edge. */
function AwardFeature({ feature, reverse, onOpen, showMedia = true }) {
  const project = feature.projectId && PROJECTS_DATA.find((p) => p.id === feature.projectId);
  const images = [feature.lead, ...feature.photos.filter((p) => p.type !== 'video')];

  return (
    <article id={`award-${feature.id}`} className="pt-12 md:pt-24 first:pt-0 scroll-mt-20">
      <div className="max-w-[1100px] mx-auto px-4 sm:px-6 md:px-8">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.55, ease }}
            className={`lg:col-span-5 order-2 ${reverse ? 'lg:order-2' : 'lg:order-1'}`}
          >
            <p className="text-sm text-white/45 mb-2">
              {feature.date} · {feature.organizer}
            </p>
            <h3 className="font-display font-bold text-3xl sm:text-4xl text-white tracking-tight leading-tight mb-6">
              {feature.title}
            </h3>

            <dl className="grid grid-cols-3 gap-x-3 sm:gap-x-5 gap-y-4 pb-6 mb-6 border-b border-white/[0.1]">
              {feature.stats.map((st) => (
                <div key={st.label} className="min-w-0">
                  {/* small lead-in on its own line, so long numbers never collide with the next column */}
                  <p className="h-4 text-[11px] sm:text-xs text-white/40 leading-none mb-1.5">{st.prefix ? st.prefix.trim() : '\u00a0'}</p>
                  <dt className="font-display font-extrabold text-[1.65rem] sm:text-3xl text-white leading-none tabular-nums whitespace-nowrap">
                    {st.text ? st.text : (
                      <>
                        <CountUp to={st.value} />
                        {st.suffix}
                      </>
                    )}
                  </dt>
                  <dd className="text-xs sm:text-sm text-white/50 mt-2 leading-snug">{st.label}</dd>
                </div>
              ))}
            </dl>

            <p className="text-white/70 text-base leading-relaxed mb-5">{feature.summary}</p>

            <div className="flex flex-wrap gap-x-5 gap-y-1">
              {project && (
                <button
                  type="button"
                  onClick={() => {
                    window.location.hash = `project=${project.id}`;
                  }}
                  className="group inline-flex items-center gap-1 py-2.5 text-[var(--accent)] hover:text-white transition-colors cursor-pointer"
                >
                  <span>Read the {project.title} write-up</span>
                  <ArrowUpRight size={15} className="transition-transform duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </button>
              )}
              {feature.links?.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  target="_blank"
                  rel="noreferrer"
                  className="group inline-flex items-center gap-1.5 py-2.5 text-[var(--accent)] hover:text-white transition-colors"
                >
                  <FileText size={15} />
                  <span>{l.label}</span>
                  <ArrowUpRight size={14} className="transition-transform duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              ))}
            </div>
          </motion.div>

          <Tilt className={`lg:col-span-7 order-1 ${reverse ? 'lg:order-1' : 'lg:order-2'} rounded-2xl`}>
            <motion.button
              type="button"
              onClick={() => onOpen(images, 0)}
              initial={{ opacity: 0, scale: 0.97 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.7, ease }}
              aria-label={`Open: ${feature.lead.caption}`}
              className="group relative block w-full overflow-hidden rounded-2xl border border-white/[0.1] cursor-zoom-in"
              style={{ aspectRatio: `${feature.lead.w} / ${feature.lead.h}` }}
            >
              <img
                src={feature.lead.src}
                srcSet={srcSet(feature.lead.src, feature.lead.w)}
                sizes="(max-width: 1024px) 100vw, 640px"
                alt={feature.lead.caption}
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
              />
              <span className="absolute inset-x-0 bottom-0 p-4 pt-12 text-left text-sm text-white/90 bg-gradient-to-t from-black/75 to-transparent">
                {feature.lead.caption}
              </span>
            </motion.button>
          </Tilt>
        </div>
      </div>

      {/* The rest of the material, running to the screen edge */}
      {showMedia && <MediaBand label={`${feature.title} media`}>
        {feature.photos.map((photo, i) => {
          const sizeClass = 'h-[220px] sm:h-[280px] lg:h-[340px]';
          if (photo.type === 'video') {
            return (
              <motion.figure
                key={photo.src}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.5, ease }}
                className={`relative shrink-0 snap-start overflow-hidden rounded-xl border border-white/[0.1] ${sizeClass}`}
                style={{ aspectRatio: `${photo.w} / ${photo.h}` }}
              >
                <LoopVideo src={photo.src} poster={photo.poster} className="w-full h-full object-cover" />
                <figcaption className="absolute inset-x-0 bottom-0 p-3 pt-10 text-xs sm:text-sm text-white/90 bg-gradient-to-t from-black/75 to-transparent">{photo.caption}</figcaption>
              </motion.figure>
            );
          }
          const imgIndex = images.findIndex((im) => im.src === photo.src);
          return (
            <motion.button
              key={photo.src}
              type="button"
              onClick={() => onOpen(images, imgIndex)}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.5, delay: Math.min(i, 3) * 0.06, ease }}
              aria-label={`Open: ${photo.caption}`}
              className={`group relative shrink-0 snap-start overflow-hidden rounded-xl border border-white/[0.1] cursor-zoom-in ${sizeClass}`}
              style={{ aspectRatio: `${photo.w} / ${photo.h}` }}
            >
              <img src={photo.src} srcSet={srcSet(photo.src, photo.w)} sizes="(max-width: 768px) 85vw, 520px" alt={photo.caption} loading="lazy" decoding="async" draggable={false} className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]" />
              <span className="absolute inset-x-0 bottom-0 p-3 pt-10 text-left text-xs sm:text-sm text-white/90 bg-gradient-to-t from-black/75 to-transparent opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-200">
                {photo.caption}
              </span>
            </motion.button>
          );
        })}
      </MediaBand>}
    </article>
  );
}

/* Every result in date order, each with its proof one tap away. Only on the dedicated Awards page. */
function Timeline({ onOpen }) {
  const link = 'group inline-flex items-center gap-1.5 py-2 text-sm text-[var(--accent)] hover:text-white transition-colors cursor-pointer';

  return (
    <ol className="relative">
      {ACHIEVEMENTS.map((a, i) => {
        const project = a.projectId && PROJECTS_DATA.find((p) => p.id === a.projectId);
        const newYear = i === 0 || ACHIEVEMENTS[i - 1].year !== a.year;
        const last = i === ACHIEVEMENTS.length - 1;
        return (
          <li key={a.title} className="relative grid md:grid-cols-12 gap-x-6 pl-7 md:pl-0">
            {/* the year, shown once at the start of each run */}
            <div className="md:col-span-2 md:text-right md:pr-2">
              {newYear && (
                <p className="font-display font-extrabold text-2xl md:text-3xl text-white/90 leading-none tabular-nums mb-4 md:mb-0 pt-1 md:pt-0">
                  {a.year}
                </p>
              )}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.45, ease }}
              className={`relative md:col-span-10 md:pl-9 ${last ? 'pb-0' : 'pb-9 md:pb-11'}`}
            >
              {/* spine and marker */}
              {!last && <span className="absolute -left-7 md:left-0 top-2 bottom-0 ml-[4px] w-px bg-white/[0.12]" aria-hidden="true" />}
              <span className="absolute -left-7 md:left-0 top-1.5 w-[9px] h-[9px] rounded-full bg-[var(--accent)] ring-4 ring-[#FF5A36]/20" aria-hidden="true" />

              <p className="text-sm text-white/45 mb-1.5">
                {a.date} · {a.organizer}
              </p>
              <h3 className="font-display font-bold text-xl sm:text-2xl text-white tracking-tight leading-snug">
                <span className="text-[var(--accent)]">{a.result}</span>
                <span className="text-white/30 mx-2">/</span>
                {a.title}
              </h3>
              <p className="mt-2 text-sm sm:text-base text-white/65 leading-relaxed max-w-2xl">{a.detail}</p>

              <div className="mt-1.5 flex flex-wrap gap-x-5">
                {a.proofs?.map((proof, n) => (
                  <button key={proof.src} type="button" onClick={() => onOpen(a.proofs, n)} className={link}>
                    <ImageIcon size={14} />
                    <span>{proof.label}</span>
                  </button>
                ))}
                {a.feature && (
                  <button
                    type="button"
                    onClick={() => document.getElementById(`award-${a.feature}`)?.scrollIntoView({ behavior: 'smooth' })}
                    className={link}
                  >
                    <span>Photos and the full story</span>
                    <ArrowDown size={14} className="transition-transform duration-150 group-hover:translate-y-0.5" />
                  </button>
                )}
                {project && (
                  <button
                    type="button"
                    onClick={() => {
                      window.location.hash = `project=${project.id}`;
                    }}
                    className={link}
                  >
                    <span>{project.title} write-up</span>
                    <ArrowUpRight size={14} className="transition-transform duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </button>
                )}
              </div>
            </motion.div>
          </li>
        );
      })}
    </ol>
  );
}

/* compact: the home page version (the three headline awards, no media bands). The Awards page adds
   the full timeline with certificates, and the photos, slides and clips behind each award. */
export default function CredentialsSection({ compact = false }) {
  const [lightbox, setLightbox] = useState(null); // { items, index }
  const open = (items, index) => setLightbox({ items, index });
  const close = useCallback(() => setLightbox(null), []);
  const setIndex = useCallback((index) => setLightbox((lb) => (lb ? { ...lb, index } : lb)), []);

  return (
    <section id="awards" className="section-glow py-14 md:py-28 relative overflow-hidden border-t border-white/[0.06]">
      <div className="max-w-[1100px] mx-auto px-4 sm:px-6 md:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, ease }}
          className="max-w-2xl mb-8 md:mb-12"
        >
          <SectionLabel label="Awards" />
          <h2 className="font-display font-extrabold text-fluid-h2 text-white tracking-tight leading-[1.12]">
            Awards &amp; <span className="text-[var(--accent)]">academics</span>
          </h2>
        </motion.div>
      </div>

      {!compact && (
        <div className="max-w-[1100px] mx-auto px-4 sm:px-6 md:px-8 relative z-10 mb-14 md:mb-24">
          <p className="text-white/65 text-sm md:text-base leading-relaxed max-w-2xl -mt-3 md:-mt-6 mb-10 md:mb-14">
            Every competition and academic result since 2023, with the certificates. The three I have the most to say about follow below, with photos, slides and a clip.
          </p>
          <Timeline onOpen={open} />
        </div>
      )}

      {!compact && (
        <div className="max-w-[1100px] mx-auto px-4 sm:px-6 md:px-8 relative z-10 mb-8 md:mb-12">
          <SectionLabel label="A closer look" />
        </div>
      )}

      {AWARD_FEATURES.map((feature, i) => (
        <AwardFeature key={feature.id || feature.title} feature={feature} reverse={i % 2 === 1} onOpen={open} showMedia={!compact} />
      ))}

      <div className="max-w-[1100px] mx-auto px-4 sm:px-6 md:px-8 relative z-10 mt-14 md:mt-28">
        {compact && (
          <a
            href={routeUrl('awards')}
            onClick={(e) => {
              e.preventDefault();
              navigate('awards');
            }}
            className="group flex items-center justify-between gap-6 rounded-2xl border border-white/[0.1] hover:border-[var(--accent)]/50 bg-white/[0.02] hover:bg-white/[0.04] px-5 py-4 sm:px-6 sm:py-5 mb-10 md:mb-16 transition-colors"
          >
            <span>
              <span className="block font-display font-bold text-lg sm:text-xl text-white tracking-tight">See the full record</span>
              <span className="block text-sm text-white/55 mt-0.5">
                All {ACHIEVEMENTS.length} results since 2023, with certificates, photos and pitch decks
              </span>
            </span>
            <ArrowRight size={20} className="shrink-0 text-[var(--accent)] transition-transform duration-150 group-hover:translate-x-0.5" />
          </a>
        )}

        <p className="text-sm text-white/45 mb-2">Academics</p>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.45, ease }}
          className="grid md:grid-cols-12 gap-x-6 gap-y-6 py-6 border-y border-white/[0.1]"
        >
          <div className="md:col-span-5">
            <h3 className="font-display font-bold text-xl text-white tracking-tight">{EDUCATION.degree}</h3>
            <p className="mt-1 text-sm text-white/55">
              {EDUCATION.school}, {EDUCATION.start} to {EDUCATION.expected}
            </p>
          </div>

          <dl className="md:col-span-3 flex gap-8">
            <div>
              <dt className="font-display font-extrabold text-3xl text-white leading-none tabular-nums">3.84</dt>
              <dd className="text-xs text-white/50 mt-2">GPA out of 4.00</dd>
            </div>
            <div>
              <dt className="font-display font-extrabold text-3xl text-white leading-none">Top 16%</dt>
              <dd className="text-xs text-white/50 mt-2">of AI &amp; Robotics cohort</dd>
            </div>
          </dl>

          <div className="md:col-span-4">
            <p className="text-sm text-white/65 mb-2">Dean's List, 3 consecutive semesters</p>
            <div className="flex flex-wrap gap-x-4">
              {DEANS_LIST.map((d, i) => (
                <button
                  key={d.src}
                  type="button"
                  onClick={() =>
                    open(
                      DEANS_LIST.map((x) => ({ src: x.src, caption: `Dean's List certificate, ${x.label}` })),
                      i
                    )
                  }
                  className="group inline-flex items-center gap-1 py-2.5 text-sm text-[var(--accent)] hover:text-white transition-colors cursor-pointer"
                >
                  <span>{d.label}</span>
                  <ArrowUpRight size={14} className="transition-transform duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </button>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      <AnimatePresence>{lightbox && <Lightbox items={lightbox.items} index={lightbox.index} onClose={close} onIndex={setIndex} />}</AnimatePresence>
    </section>
  );
}
