import React, { useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowUpRight, ExternalLink, Trophy } from 'lucide-react';
import SectionLabel from './SectionLabel';
import { PROJECTS_DATA } from '../data/portfolioData';
import { small } from '../utils/img';

const ease = [0.22, 1, 0.36, 1];

/* The app walkthrough, running by itself: it plays (silent, looping) while the card is on screen and
   pauses when it scrolls away. Nothing downloads until the card is near the viewport. */
function Walkthrough({ video, title }) {
  const ref = useRef(null);
  const near = useInView(ref, { once: true, margin: '300px 0px' });
  const inView = useInView(ref, { amount: 0.4 });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (inView && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) el.play().catch(() => {});
    else el.pause();
  }, [inView]);

  return (
    <video
      ref={ref}
      src={near ? video.src : undefined}
      poster={video.poster}
      muted
      loop
      playsInline
      preload="none"
      aria-label={`${title} walkthrough, silent with on-screen captions`}
      className="absolute inset-0 w-full h-full object-cover"
    />
  );
}

/* The dedicated Projects page: every project visible at once, instead of the home page carousel. */
export default function ProjectsPage({ onOpenProject }) {
  return (
    <section id="work" className="section-glow py-14 md:py-28 px-4 sm:px-6 md:px-8 relative overflow-hidden">
      <div className="max-w-[1100px] mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease }}
          className="max-w-2xl mb-8 md:mb-12"
        >
          <SectionLabel label="Projects" />
          <h1 className="font-display font-extrabold text-fluid-h2 text-white tracking-tight leading-[1.12] mb-3">
            Things I've <span className="text-[var(--accent)]">Actually Built</span>
          </h1>
          <p className="text-white/65 text-sm md:text-base leading-relaxed">
            Web apps, AI agents, and backend systems I've shipped. Open any of them to see the problem, how I solved it, and the code behind it.
          </p>
        </motion.div>

        <ul className="grid md:grid-cols-2 gap-4 md:gap-6">
          {PROJECTS_DATA.map((project, i) => (
            <motion.li
              key={project.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.5, delay: (i % 2) * 0.08, ease }}
            >
              {/* The whole card opens the write-up (the button below stretches over it); the live link sits above that. */}
              <div className="group relative flex flex-col w-full h-full text-left rounded-2xl sm:rounded-3xl overflow-hidden border border-white/[0.1] hover:border-[var(--accent)]/50 bg-[#0A0B10] transition-colors">
                <div className="relative w-full aspect-video overflow-hidden bg-white/[0.03]">
                  {project.walkthrough ? (
                    <Walkthrough video={project.walkthrough} title={project.title} />
                  ) : (
                    <>
                      <img
                        src={small(project.coverImage)}
                        alt=""
                        loading={i < 2 ? undefined : 'lazy'}
                        decoding="async"
                        style={{ objectPosition: project.coverPosition || 'top' }}
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0A0B10] via-transparent to-transparent" />
                    </>
                  )}
                  {!project.walkthrough && (
                    <span className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-[#0A0B12]/90 border border-white/[0.12] font-display font-semibold text-[10px] text-white tracking-tight">
                      {project.badge}
                    </span>
                  )}
                </div>

                <div className="flex flex-col flex-1 p-5 sm:p-6">
                  <p className="font-display font-semibold text-[11px] uppercase tracking-wider text-[var(--accent)] mb-1">
                    {project.category}
                  </p>
                  <h2 className="font-display font-bold text-2xl sm:text-3xl text-white tracking-tight leading-snug mb-1">
                    {project.title}
                  </h2>
                  <p className="text-xs text-white/45 mb-3">
                    {[project.role, project.team, project.year].filter(Boolean).join(' · ')}
                  </p>
                  {project.highlight && project.highlight !== project.team && (
                    <p className="flex items-start gap-2 text-sm text-white/90 mb-3">
                      <Trophy size={15} className="shrink-0 mt-0.5 text-[var(--accent)]" />
                      <span>{project.highlight}</span>
                    </p>
                  )}
                  <p className="text-white/70 text-sm leading-relaxed mb-4">{project.synopsis}</p>

                  {/* The numbers the home page carousel has no room for */}
                  {project.impactMetrics?.length > 0 && (
                    <dl className="grid grid-cols-3 gap-x-3 py-4 mb-4 border-y border-white/[0.08]">
                      {project.impactMetrics.slice(0, 3).map((m) => (
                        <div key={m.label} className="min-w-0">
                          <dt className="font-display font-extrabold text-lg sm:text-xl text-white leading-tight">{m.value}</dt>
                          <dd className="text-[11px] sm:text-xs text-white/50 mt-1 leading-snug">{m.label}</dd>
                        </div>
                      ))}
                    </dl>
                  )}

                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {project.tags.slice(0, 5).map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-0.5 rounded-md bg-white/[0.06] text-[10px] font-display text-white/80 border border-white/[0.06]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="mt-auto flex flex-wrap items-center gap-x-6 gap-y-1">
                    <button
                      type="button"
                      onClick={() => onOpenProject(project)}
                      className="inline-flex items-center gap-1 py-2 text-sm text-[var(--accent)] group-hover:text-white transition-colors cursor-pointer after:absolute after:inset-0 after:content-['']"
                    >
                      <span>Read the write-up</span>
                      <ArrowUpRight size={15} className="transition-transform duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </button>
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="relative z-10 inline-flex items-center gap-1.5 py-2 text-sm text-white/80 hover:text-white transition-colors"
                      >
                        <span className="relative flex h-2 w-2">
                          <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60 animate-ping" />
                          <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                        </span>
                        <span>Try it live</span>
                        <ExternalLink size={13} />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
