import React, { useCallback, useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { ArrowRight, ArrowUpRight, ChevronLeft, ChevronRight, ExternalLink, Github } from 'lucide-react';
import SectionLabel from './SectionLabel';
import ProjectMedia from './ProjectMedia';
import RankChip from './RankChip';
import { PROJECTS_DATA, EARLIER_WORK } from '../data/portfolioData';
import { small } from '../utils/img';

/* Projects, in the manner of a streaming service: one featured project on a billboard with its demo playing, then rows
   you swipe or drag sideways. Press a poster for the full write-up. */

const byId = (ids) => ids.map((id) => PROJECTS_DATA.find((p) => p.id === id)).filter(Boolean);

const ROWS = [
  { title: 'Hackathons and competitions', projects: byId(['kerjacerdas', 'orion', 'dpickleball']) },
  { title: 'Machine learning and research', projects: byId(['radar', 'neuralvoid', 'legal-rag', 'gold-forecast', 'movie-recommender']) },
];

function Rail({ title, children }) {
  const [ref, api] = useEmblaCarousel({ align: 'start', dragFree: true, containScroll: 'trimSnaps' });
  const [can, setCan] = useState({ prev: false, next: true });
  const update = useCallback(() => api && setCan({ prev: api.canScrollPrev(), next: api.canScrollNext() }), [api]);
  useEffect(() => {
    if (!api) return undefined;
    update();
    api.on('select', update).on('reInit', update).on('scroll', update);
    return () => api.off('select', update).off('reInit', update).off('scroll', update);
  }, [api, update]);

  const arrow = 'w-9 h-9 rounded-full border border-white/[0.16] text-white/80 hover:text-white hover:border-white/[0.4] disabled:opacity-25 disabled:pointer-events-none flex items-center justify-center transition-colors cursor-pointer';
  return (
    <div className="mt-12 first:mt-0">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-display font-semibold text-lg text-white">{title}</h3>
        <div className="hidden sm:flex gap-2">
          <button type="button" className={arrow} onClick={() => api?.scrollPrev()} disabled={!can.prev} aria-label={`${title}: previous`}><ChevronLeft size={16} /></button>
          <button type="button" className={arrow} onClick={() => api?.scrollNext()} disabled={!can.next} aria-label={`${title}: next`}><ChevronRight size={16} /></button>
        </div>
      </div>
      <div className="overflow-hidden -mx-5 px-5 sm:-mx-8 sm:px-8 lg:mx-0 lg:px-0 cursor-grab active:cursor-grabbing" ref={ref}>
        <div className="flex gap-4 pb-2">{children}</div>
      </div>
    </div>
  );
}

function Poster({ project, onOpen }) {
  const metric = project.impactMetrics?.[0];
  return (
    <button type="button" onClick={() => onOpen(project)} className="group flex-none w-[260px] sm:w-[310px] text-left cursor-pointer">
      <div className="rounded-2xl overflow-hidden border border-white/[0.12] group-hover:border-accent/60 transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-[0_18px_40px_rgba(0,0,0,0.3)]">
        <ProjectMedia project={project} still />
      </div>
      <div className="mt-3 px-1">
        <p className="font-display font-semibold text-white group-hover:text-[var(--accent)] transition-colors">{project.title}</p>
        <p className="mt-0.5 text-xs text-white/45 truncate">{project.category}</p>
        {project.rank && <RankChip rank={project.rank} stacked className="mt-2" />}
        {!project.rank && metric && (
          <p className="mt-2 text-xs text-white/65">
            <span className="font-display font-bold text-white">{metric.value}</span> <span className="text-white/45">· {metric.label}</span>
          </p>
        )}
      </div>
    </button>
  );
}

function Billboard({ project, onOpen }) {
  const metrics = (project.impactMetrics || []).slice(0, 4);
  // With no demo video, show two more screens beside the cover so the billboard is filled
  const extra = project.walkthrough ? [] : (project.screenCategories || []).slice(0, 2).map((c) => ({ ...c.screens[0], label: c.name })).filter((x) => x.src);
  return (
    <article className="relative grid lg:grid-cols-12 gap-0 rounded-3xl overflow-hidden border border-white/[0.14] bg-panel">
      <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-accent/10 blur-3xl pointer-events-none" aria-hidden="true" />
      <div className="lg:col-span-7 bg-white/[0.03] p-3 md:p-4 flex flex-col gap-3 md:gap-4 justify-center">
        <div className="rounded-xl overflow-hidden border border-white/[0.14] shadow-[0_10px_30px_rgba(0,0,0,0.18)]">
          <ProjectMedia project={project} eager />
        </div>
        {extra.length > 0 && (
          <div className="grid grid-cols-2 gap-3 md:gap-4">
            {extra.map((sc) => (
              <figure key={sc.src} className="m-0">
                <div className="aspect-video rounded-xl overflow-hidden border border-white/[0.14] bg-white/[0.04]">
                  <img src={small(sc.src)} alt={sc.caption} loading="lazy" decoding="async" className="w-full h-full object-contain" />
                </div>
                <figcaption className="mt-1.5 px-1 text-[11px] text-white/55 truncate">{sc.label}</figcaption>
              </figure>
            ))}
          </div>
        )}
      </div>
      <div className="lg:col-span-5 relative p-6 md:p-9 flex flex-col">
        <p className="text-xs font-medium tracking-wide text-white/50">FEATURED</p>
        <RankChip rank={project.rank} className="mt-2" />
        <h3 className="mt-4 font-display font-extrabold text-3xl md:text-4xl text-white tracking-tight">{project.title}</h3>
        <p className="mt-1 text-xs text-white/45">{[project.role, project.team, project.year].filter(Boolean).join(' · ')}</p>
        <p className="mt-4 text-[15px] text-white/70 leading-relaxed">{project.synopsis}</p>
        <dl className="mt-6 pt-5 border-t border-white/[0.1] grid grid-cols-[repeat(auto-fit,minmax(7.5rem,1fr))] gap-x-4 gap-y-4">
          {metrics.map((m) => (
            <div key={m.label} className="min-w-0">
              <dt className="font-display font-extrabold text-lg text-white leading-tight">{m.value}</dt>
              <dd className="mt-1 text-[11px] text-white/50 leading-snug">{m.label}</dd>
            </div>
          ))}
        </dl>
        {project.workflow && (
          <p className="mt-5 text-xs text-white/55 leading-relaxed">
            <span className="text-white/75">{project.workflow.inputs.map((n) => n.label).join(' + ')}</span>
            {project.workflow.steps.map((n) => (
              <React.Fragment key={n.label}>
                <span className="text-[var(--accent)] mx-1.5">→</span>
                <span>{n.label}</span>
              </React.Fragment>
            ))}
            <span className="text-[var(--accent)] mx-1.5">→</span>
            <span className="text-white/75">{project.workflow.outputs.map((n) => n.label).join(' / ')}</span>
          </p>
        )}
        <ul className="mt-5 flex flex-wrap gap-1.5">
          {(project.tags || []).slice(0, 5).map((t) => (
            <li key={t} className="px-2.5 py-1 rounded-md bg-white/[0.06] border border-white/[0.08] text-[11px] text-white/75">{t}</li>
          ))}
        </ul>
        <div className="mt-auto pt-7 flex flex-wrap gap-2.5">
          <button type="button" onClick={() => onOpen(project)} className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-accent text-white text-sm font-semibold hover:brightness-110 transition cursor-pointer">
            Details <ArrowUpRight size={15} />
          </button>
          {project.liveUrl && (
            <a href={project.liveUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full border border-white/[0.2] text-sm text-white hover:border-white/[0.4] transition-colors">
              <ExternalLink size={14} /> Live
            </a>
          )}
          {project.githubUrl && (
            <a href={project.githubUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full border border-white/[0.2] text-sm text-white hover:border-white/[0.4] transition-colors">
              <Github size={14} /> Code
            </a>
          )}
        </div>
      </div>
    </article>
  );
}

export default function ProjectsNetflix({ onOpenProject }) {
  const featured = PROJECTS_DATA.find((p) => p.id === 'adept') || PROJECTS_DATA[0];
  return (
    <div className="px-5 sm:px-8 py-12 md:py-16">
      <div className="max-w-[1100px] mx-auto">
        <div className="flex items-end justify-between gap-4 mb-8">
          <div>
            <SectionLabel label="Projects" />
            <h2 className="font-display font-extrabold text-fluid-h2 text-white tracking-tight leading-[1.1]">
              What I have <span className="text-[var(--accent)]">built</span>
            </h2>
            <p className="mt-3 text-[15px] text-white/60 max-w-[34rem]">Hackathon builds and personal projects. Open one to see what it does, how it works and how it ended.</p>
          </div>
        </div>

        <Billboard project={featured} onOpen={onOpenProject} />

        <div className="mt-10">
          {ROWS.map((row) => (
            <Rail key={row.title} title={row.title}>
              {row.projects.map((p) => (
                <Poster key={p.id} project={p} onOpen={onOpenProject} />
              ))}
            </Rail>
          ))}
          <Rail title="Earlier and smaller work">
            {EARLIER_WORK.map((w) => (
              <a
                key={w.title}
                href={w.url}
                target="_blank"
                rel="noreferrer"
                draggable={false}
                className="group flex-none w-[250px] rounded-2xl border border-white/[0.12] hover:border-accent/50 bg-white/[0.02] p-5 transition-colors"
              >
                <span className="flex items-start justify-between gap-2">
                  <span className="font-display font-semibold text-white group-hover:text-[var(--accent)] transition-colors">{w.title}</span>
                  <ArrowUpRight size={14} className="mt-1 shrink-0 text-white/30 group-hover:text-[var(--accent)]" />
                </span>
                <span className="mt-1.5 block text-sm text-white/55 leading-snug">{w.line}</span>
                <span className="mt-3 flex flex-wrap gap-1.5">
                  {w.tags.map((t) => <span key={t} className="px-2 py-0.5 rounded-md bg-white/[0.06] border border-white/[0.08] text-[11px] text-white/70">{t}</span>)}
                </span>
              </a>
            ))}
          </Rail>
        </div>
      </div>
    </div>
  );
}
