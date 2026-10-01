import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence, useInView, animate } from 'framer-motion';
import { ArrowUpRight, ChevronLeft, ChevronRight, FileText, Trophy, Medal, Award } from 'lucide-react';
import SectionLabel from './SectionLabel';
import Lightbox from './Lightbox';
import Tilt from './Tilt';
import { AWARD_FEATURES, COMPETITIONS, DEANS_LIST, EDUCATION, PROJECTS_DATA } from '../data/portfolioData';

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

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    if (inView && !prefersReducedMotion()) v.play().catch(() => {});
    else v.pause();
  }, [inView]);

  return <video ref={ref} src={src} poster={poster} muted loop playsInline preload="metadata" className={className} />;
}

/* One award with real material behind it: a lead visual, the numbers, a short account, and a
   band of everything else (photos, slides or a clip) that runs to the screen edge. */
function AwardFeature({ feature, reverse, onOpen }) {
  const project = feature.projectId && PROJECTS_DATA.find((p) => p.id === feature.projectId);
  const images = [feature.lead, ...feature.photos.filter((p) => p.type !== 'video')];

  return (
    <article className="pt-12 md:pt-24 first:pt-0">
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
      <div className="no-scrollbar mt-6 md:mt-10 flex gap-3 md:gap-4 overflow-x-auto snap-x snap-mandatory pb-2 pr-4" style={{ paddingLeft: EDGE, scrollPaddingLeft: EDGE }} aria-label={`${feature.title} media`}>
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
              <img src={photo.src} alt={photo.caption} loading="lazy" draggable={false} className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]" />
              <span className="absolute inset-x-0 bottom-0 p-3 pt-10 text-left text-xs sm:text-sm text-white/90 bg-gradient-to-t from-black/75 to-transparent opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-200">
                {photo.caption}
              </span>
            </motion.button>
          );
        })}
      </div>
    </article>
  );
}

export default function CredentialsSection() {
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

      {AWARD_FEATURES.map((feature, i) => (
        <AwardFeature key={feature.id || feature.title} feature={feature} reverse={i % 2 === 1} onOpen={open} />
      ))}

      {/* ═══ THE REST OF THE RECORD ═══ */}
      <div className="max-w-[1100px] mx-auto px-4 sm:px-6 md:px-8 relative z-10 mt-14 md:mt-28">
        <p className="text-sm text-white/45 mb-2">Also</p>
        <ul className="border-t border-white/[0.1] mb-10 md:mb-16">
          {COMPETITIONS.map((c) => {
            const ResultIcon = Trophy;
            return (
              <li key={c.title} className="group grid md:grid-cols-12 gap-x-6 gap-y-2 py-6 border-b border-white/[0.1]">
                <p className="md:col-span-2 text-sm text-white/45 md:pt-1">{c.year}</p>
                <div className="md:col-span-10">
                  <h3 className="font-display font-bold text-xl text-white tracking-tight">
                    <ResultIcon size={20} className="inline -mt-1 mr-2 text-[var(--accent)]" />
                    <span className="text-[var(--accent)]">{c.result}</span>
                    <span className="text-white/30 mx-2">/</span>
                    {c.title}
                  </h3>
                  <p className="mt-2 text-sm sm:text-base text-white/65 leading-relaxed max-w-xl">{c.detail}</p>
                </div>
              </li>
            );
          })}
        </ul>

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
