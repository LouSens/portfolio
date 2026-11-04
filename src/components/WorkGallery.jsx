import React, { useEffect, useRef } from 'react';
import { useInView } from 'framer-motion';
import { ArrowRight, ArrowUpRight, Trophy } from 'lucide-react';
import HorizontalGate from './HorizontalGate';
import SectionLabel from './SectionLabel';
import { PROJECTS_DATA } from '../data/portfolioData';
import { small } from '../utils/img';
import { navigate, routeUrl } from '../utils/route';

/* The Projects "room": a gallery you walk through sideways. Each frame is one project, written as a short
   list: what it is, the numbers, the stack, and how the app works from input to output. */

/* The app demo, silent and looping: it only downloads when its frame is near and only plays while it is the
   frame in view. */
function Demo({ project, active, near }) {
  const ref = useRef(null);
  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    if (active && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) v.play().catch(() => {});
    else v.pause();
  }, [active]);
  return (
    <video
      ref={ref}
      src={near ? project.walkthrough.src : undefined}
      poster={project.walkthrough.poster}
      muted
      loop
      playsInline
      preload="none"
      aria-label={`${project.title} demo, silent`}
      className="absolute inset-0 w-full h-full object-cover"
    />
  );
}

function ProjectFrame({ project, index, total, onOpen }) {
  const frame = useRef(null);
  const active = useInView(frame, { amount: 0.7 });
  const near = useInView(frame, { once: true, margin: '0px 600px 0px 600px' });
  const metrics = (project.impactMetrics || []).slice(0, 3);
  const steps = (project.flow?.steps || project.architectureNodes || []).slice(0, 5).map((s) => s.name);
  const tags = (project.tags || []).slice(0, 5);

  return (
    <article
      ref={frame}
      className="group relative flex flex-col md:flex-row w-[min(86vw,360px)] md:w-[min(78vw,780px)] h-[min(68svh,560px)] md:h-[min(62svh,500px)] rounded-3xl overflow-hidden border border-white/[0.12] hover:border-accent/50 bg-panel transition-colors"
    >
      {/* Image */}
      <div className="relative md:w-[42%] h-[30%] md:h-auto shrink-0 overflow-hidden bg-white/[0.03]">
        {project.walkthrough ? (
          <Demo project={project} active={active} near={near} />
        ) : (
          <img
            src={small(project.coverImage)}
            alt=""
            loading="lazy"
            decoding="async"
            style={{ objectPosition: project.coverPosition || 'top' }}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-panel/70 via-transparent to-transparent" />
        <span className="absolute top-3 left-3 font-mono text-[11px] tabular-nums text-white/80 px-2 py-1 rounded-md bg-panel/80 border border-white/[0.12]">
          {String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
        </span>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 min-w-0 p-5 md:p-7">
        <p className="text-xs text-[var(--accent)] font-medium mb-1">{project.category}</p>
        <h3 className="font-display font-bold text-2xl md:text-3xl text-white tracking-tight leading-tight">{project.title}</h3>
        <p className="mt-1.5 text-xs text-white/50">{[project.role, project.team, project.year].filter(Boolean).join(' · ')}</p>
        <p className="mt-3 text-sm md:text-[15px] text-white/70 leading-relaxed line-clamp-2 md:line-clamp-3">{project.synopsis}</p>

        {metrics.length > 0 && (
          <dl className="mt-4 grid grid-cols-3 gap-3 pt-4 border-t border-white/[0.1]">
            {metrics.map((m) => (
              <div key={m.label} className="min-w-0">
                <dt className="font-display font-extrabold text-lg md:text-xl text-white leading-none tabular-nums truncate">{m.value}</dt>
                <dd className="mt-1.5 text-[11px] text-white/50 leading-snug line-clamp-2">{m.label}</dd>
              </div>
            ))}
          </dl>
        )}

        {steps.length > 0 && (
          <p className="hidden md:block mt-4 text-xs text-white/55 leading-relaxed">
            <span className="text-white/35">How it works </span>
            {steps.map((st, i) => (
              <React.Fragment key={st}>
                {i > 0 && <span className="text-[var(--accent)] mx-1.5">→</span>}
                <span className="text-white/75">{st}</span>
              </React.Fragment>
            ))}
          </p>
        )}

        <div className="mt-auto pt-4 flex items-end justify-between gap-3">
          <ul className="flex flex-wrap gap-1.5 min-w-0">
            {tags.slice(0, 4).map((t) => (
              <li key={t} className="px-2 py-0.5 rounded-md bg-white/[0.06] border border-white/[0.08] text-[11px] text-white/75 whitespace-nowrap">
                {t}
              </li>
            ))}
          </ul>
          <button
            type="button"
            onClick={() => onOpen(project)}
            className="shrink-0 inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-[var(--accent)] text-white text-xs font-semibold hover:brightness-110 transition cursor-pointer"
          >
            Details <ArrowUpRight size={13} />
          </button>
        </div>
      </div>

      {/* Whole frame is clickable; the button above and the links keep their own targets. */}
      <button type="button" onClick={() => onOpen(project)} aria-label={`Open ${project.title}`} className="absolute inset-0 z-0 cursor-pointer opacity-0 focus-visible:opacity-100 focus-visible:ring-2 focus-visible:ring-[var(--accent)] rounded-3xl" />
    </article>
  );
}

export default function WorkGallery({ onOpenProject }) {
  const total = PROJECTS_DATA.length;
  const go = (e) => {
    e.preventDefault();
    navigate('projects');
  };

  const panels = [
    {
      key: 'intro',
      name: 'Projects',
      className: 'w-[min(86vw,420px)]',
      node: (
        <div className="pr-2 md:pr-8">
          <SectionLabel label="Projects" />
          <h2 className="font-display font-extrabold text-fluid-h2 text-white tracking-tight leading-[1.1]">
            Things I have <span className="text-[var(--accent)]">built</span>
          </h2>
          <ul className="mt-6 space-y-3 text-[15px] text-white/70">
            <li className="flex gap-3"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-[var(--accent)] shrink-0" />{total} projects: web apps, AI agents and ML work</li>
            <li className="flex gap-3"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-[var(--accent)] shrink-0" />Each one shows its numbers, its tools and how it works</li>
            <li className="flex gap-3"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-[var(--accent)] shrink-0" />Press Details to see screens and the choices behind it</li>
          </ul>
          <p className="mt-8 inline-flex items-center gap-2 text-sm text-white/50">
            Keep scrolling <ArrowRight size={14} className="text-[var(--accent)]" />
          </p>
        </div>
      ),
    },
    ...PROJECTS_DATA.map((project, i) => ({
      key: project.id,
      name: project.title,
      node: <ProjectFrame project={project} index={i} total={total} onOpen={onOpenProject} />,
    })),
    {
      key: 'outro',
      name: 'All projects',
      className: 'w-[min(86vw,380px)]',
      node: (
        <div className="pl-2 md:pl-6 pr-4">
          <Trophy size={22} className="text-[var(--accent)] mb-4" />
          <h3 className="font-display font-bold text-2xl md:text-3xl text-white tracking-tight">Want the full list?</h3>
          <p className="mt-3 text-[15px] text-white/65 leading-relaxed">
            The Projects page shows every project side by side, with app demos and the smaller repos.
          </p>
          <a
            href={routeUrl('projects')}
            onClick={go}
            className="mt-6 inline-flex items-center gap-2 px-5 py-3 rounded-full border border-white/[0.2] hover:border-[var(--accent)] text-sm font-semibold text-white transition-colors"
          >
            All projects <ArrowRight size={15} />
          </a>
        </div>
      ),
    },
  ];

  return <HorizontalGate id="work" label="Projects" panels={panels} />;
}
