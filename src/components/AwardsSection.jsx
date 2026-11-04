import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, ChevronDown, FileText } from 'lucide-react';
import SectionLabel from './SectionLabel';
import Lightbox from './Lightbox';
import { ACHIEVEMENTS, AWARD_FEATURES, DEANS_LIST, EDUCATION, PROJECTS_DATA } from '../data/portfolioData';
import { small } from '../utils/img';

const ease = [0.22, 1, 0.36, 1];
const link = 'group inline-flex items-center gap-1.5 py-1.5 text-sm text-[var(--accent)] hover:text-white transition-colors cursor-pointer';

/* The whole record on the home page, one line per result. A row opens in place to show what it was, with the photos,
   slides and certificates that go with it. There is no separate page. */
function Row({ a, open, onToggle, onLightbox }) {
  const project = a.projectId && PROJECTS_DATA.find((p) => p.id === a.projectId);
  const feature = a.feature && AWARD_FEATURES.find((f) => f.id === a.feature);
  const images = feature ? [feature.lead, ...(feature.photos || []).filter((p) => p.type !== 'video')].filter((p) => p?.src) : [];
  const lbItems = images.map((p) => ({ src: p.src, caption: p.caption }));

  return (
    <li className="border-b border-white/[0.16]">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        className="w-full grid grid-cols-[1fr_auto] md:grid-cols-[9.5rem_14rem_1fr_auto] items-center gap-x-6 gap-y-1 py-5 text-left cursor-pointer group"
      >
        <span className="hidden md:block text-sm text-white/50 tabular-nums">{a.date}</span>
        <span className="font-display font-bold text-[var(--accent)] leading-snug col-span-1 md:col-auto">{a.result}</span>
        <span className="col-span-1 md:col-auto row-start-2 md:row-start-auto">
          <span className="block text-white group-hover:text-[var(--accent)] transition-colors leading-snug">{a.title}</span>
          <span className="md:hidden block text-xs text-white/50 mt-0.5">{a.date}</span>
        </span>
        <ChevronDown size={18} className={`row-span-2 md:row-span-1 col-start-2 md:col-start-auto text-white/50 transition-transform duration-300 ${open ? 'rotate-180' : ''}`} aria-hidden="true" />
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease }}
            className="overflow-hidden"
          >
            <div className="pb-7 md:pl-[9.5rem] grid md:grid-cols-12 gap-6 md:gap-8">
              <div className={images.length ? 'md:col-span-7' : 'md:col-span-12 max-w-[40rem]'}>
                <p className="text-xs text-white/50">{a.organizer}</p>
                <p className="mt-2 text-[15px] text-white/75 leading-relaxed">{feature?.summary || a.detail}</p>
                <div className="mt-3 flex flex-wrap gap-x-5">
                  {project && (
                    <button type="button" className={link} onClick={() => { window.location.hash = `project=${project.id}`; }}>
                      Read the {project.title} write-up <ArrowUpRight size={14} />
                    </button>
                  )}
                  {(a.proofs || []).map((pr, i) => (
                    <button key={pr.src} type="button" className={link} onClick={() => onLightbox((a.proofs).map((x) => ({ src: x.src, caption: x.caption })), i)}>
                      {pr.label} <ArrowUpRight size={14} />
                    </button>
                  ))}
                  {[...(a.links || []), ...(feature?.links || [])].map((l) => (
                    <a key={l.href} href={l.href} target="_blank" rel="noreferrer" className={link}>
                      <FileText size={14} /> {l.label} <ArrowUpRight size={14} />
                    </a>
                  ))}
                </div>
              </div>

              {images.length > 0 && (
                <div className="md:col-span-5 grid grid-cols-3 gap-2">
                  {images.slice(0, 6).map((p, i) => (
                    <button
                      key={p.src}
                      type="button"
                      onClick={() => onLightbox(lbItems, i)}
                      aria-label={p.caption}
                      className={`overflow-hidden rounded-lg bg-white/[0.05] cursor-zoom-in ${i === 0 ? 'col-span-3 aspect-[16/9]' : 'aspect-[4/3]'}`}
                    >
                      <img src={small(p.src)} alt={p.caption} loading="lazy" decoding="async" className="w-full h-full object-cover hover:scale-[1.03] transition-transform duration-500" />
                    </button>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </li>
  );
}

export default function AwardsSection() {
  const [openIdx, setOpenIdx] = useState(0);
  const [lightbox, setLightbox] = useState(null);
  const show = (items, index) => setLightbox({ items, index });

  return (
    <section id="awards" className="scroll-mt-20 px-5 sm:px-8 py-12 md:py-16 border-t border-white/[0.06]">
      <div className="max-w-[1100px] mx-auto">
        <SectionLabel label="Awards" />
        <h2 className="font-display font-extrabold text-fluid-h2 text-white tracking-tight leading-[1.1]">
          Awards &amp; <span className="text-[var(--accent)]">education</span>
        </h2>

        <ol className="mt-8 border-t border-white/[0.16]">
          {ACHIEVEMENTS.map((a, i) => (
            <Row key={a.title} a={a} open={openIdx === i} onToggle={() => setOpenIdx(openIdx === i ? -1 : i)} onLightbox={show} />
          ))}
        </ol>

        {/* Education, as one more row of the same ledger */}
        <div className="mt-12 grid md:grid-cols-[9.5rem_1fr] gap-x-6 gap-y-3 border-t-2 border-white pt-6">
          <p className="text-sm text-white/50">Education</p>
          <div className="grid md:grid-cols-2 gap-x-10 gap-y-4">
            <div>
              <h3 className="font-display font-bold text-xl text-white tracking-tight leading-snug">{EDUCATION.degree}</h3>
              <p className="mt-1 text-[15px] text-white/65">{EDUCATION.school}, {EDUCATION.start} to {EDUCATION.expected}</p>
            </div>
            <div className="text-[15px] text-white/75 leading-relaxed">
              <p>GPA 3.84 of 4.00, top 16% of the AI &amp; Robotics cohort.</p>
              <p className="mt-1">
                Dean&apos;s List, three semesters:{' '}
                {DEANS_LIST.map((d, i) => (
                  <React.Fragment key={d.src}>
                    {i > 0 && ', '}
                    <button
                      type="button"
                      className="text-[var(--accent)] hover:text-white underline-offset-4 hover:underline cursor-pointer"
                      onClick={() => show(DEANS_LIST.map((x) => ({ src: x.src, caption: `Dean's List certificate, ${x.label}` })), i)}
                    >
                      {d.label}
                    </button>
                  </React.Fragment>
                ))}
              </p>
            </div>
          </div>
        </div>
      </div>
      <AnimatePresence>
        {lightbox && <Lightbox items={lightbox.items} index={lightbox.index} onClose={() => setLightbox(null)} onIndex={(index) => setLightbox((l) => ({ ...l, index }))} />}
      </AnimatePresence>
    </section>
  );
}
