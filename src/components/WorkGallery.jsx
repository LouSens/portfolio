import React, { useLayoutEffect, useRef, useState } from 'react';
import { motion, useMotionValueEvent, useTransform } from 'framer-motion';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import SectionLabel from './SectionLabel';
import ProjectMedia from './ProjectMedia';
import { PROJECTS_DATA } from '../data/portfolioData';
import { navigate, routeUrl } from '../utils/route';

/* The Projects room (desktop). The frames slide sideways inside the panel; the room holds the camera until the last one
   has passed. Each frame shows its demo whole, with the numbers, the stack and the flow beside it. */

const SPEED = 1.4; // sideways pixels per pixel of vertical scroll

export function ProjectCard({ project, onOpen, layout = 'row' }) {
  const metrics = (project.impactMetrics || []).slice(0, 3);
  const steps = (project.flow?.steps || project.architectureNodes || []).slice(0, 5).map((s) => s.name);
  const row = layout === 'row';

  return (
    <article className={`group relative flex ${row ? 'flex-row w-[min(80vw,980px)]' : 'flex-col w-full'} rounded-3xl overflow-hidden border border-white/[0.12] bg-panel`}>
      <ProjectMedia project={project} className={row ? 'w-[58%] shrink-0 self-start' : 'w-full'} />
      <div className={`flex flex-col min-w-0 ${row ? 'flex-1 p-7' : 'p-5'}`}>
        <p className="text-xs text-[var(--accent)] font-medium">{project.category}</p>
        <h3 className="mt-1 font-display font-bold text-2xl md:text-[1.7rem] text-white tracking-tight leading-tight">{project.title}</h3>
        <p className="mt-1 text-xs text-white/45">{[project.role, project.year].filter(Boolean).join(' · ')}</p>
        <p className="mt-3 text-[15px] text-white/70 leading-relaxed">{project.synopsis}</p>

        {metrics.length > 0 && (
          <dl className="mt-5 pt-4 border-t border-white/[0.1] grid grid-cols-3 gap-3">
            {metrics.map((m) => (
              <div key={m.label} className="min-w-0">
                <dt className="font-display font-extrabold text-lg text-white leading-none tabular-nums truncate">{m.value}</dt>
                <dd className="mt-1.5 text-[11px] text-white/50 leading-snug line-clamp-2">{m.label}</dd>
              </div>
            ))}
          </dl>
        )}

        {row && steps.length > 0 && (
          <p className="mt-4 text-xs text-white/55 leading-relaxed">
            {steps.map((st, i) => (
              <React.Fragment key={st}>
                {i > 0 && <span className="text-[var(--accent)] mx-1.5">→</span>}
                <span>{st}</span>
              </React.Fragment>
            ))}
          </p>
        )}

        <div className="mt-auto pt-5 flex items-end justify-between gap-3">
          <ul className="flex flex-wrap gap-1.5 min-w-0">
            {(project.tags || []).slice(0, 4).map((t) => (
              <li key={t} className="px-2 py-0.5 rounded-md bg-white/[0.06] border border-white/[0.08] text-[11px] text-white/75 whitespace-nowrap">
                {t}
              </li>
            ))}
          </ul>
          <button
            type="button"
            onClick={() => onOpen(project)}
            className="shrink-0 inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-accent text-white text-xs font-semibold hover:brightness-110 transition cursor-pointer"
          >
            Details <ArrowUpRight size={13} />
          </button>
        </div>
      </div>
    </article>
  );
}

export default function WorkGallery({ progress, onDwell, dims, onOpenProject }) {
  const track = useRef(null);
  const geo = useRef({ dist: 0, lefts: [], widths: [] });
  const [active, setActive] = useState(0);
  const total = PROJECTS_DATA.length;

  const x = useTransform(progress, (p) => -p * geo.current.dist);
  const bar = useTransform(progress, (p) => `${p * 100}%`);

  useLayoutEffect(() => {
    const el = track.current;
    if (!el) return undefined;
    const measure = () => {
      const nodes = Array.from(el.querySelectorAll('[data-frame]'));
      const lefts = nodes.map((n) => n.offsetLeft);
      const widths = nodes.map((n) => n.offsetWidth);
      const end = nodes.length ? lefts[nodes.length - 1] + widths[nodes.length - 1] : 0;
      const dist = Math.max(0, end + 56 - dims.pw);
      geo.current = { dist, lefts, widths };
      onDwell(dist / SPEED);
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [dims.pw, onDwell]);

  useMotionValueEvent(x, 'change', (latest) => {
    const g = geo.current;
    let best = 0;
    let bd = Infinity;
    g.lefts.forEach((l, i) => {
      const d = Math.abs(l + g.widths[i] / 2 + latest - dims.pw / 2);
      if (d < bd) {
        bd = d;
        best = i;
      }
    });
    setActive((a) => (a === best ? a : best));
  });

  const names = ['Selected work', ...PROJECTS_DATA.map((p) => p.title), 'All projects'];

  return (
    <div className="absolute inset-0 flex flex-col">
      <motion.div ref={track} style={{ x }} className="flex flex-1 min-h-0 items-center gap-10 pl-12 pr-12">
        <div data-frame className="shrink-0 w-[340px]">
          <SectionLabel label="Projects" />
          <h2 className="font-display font-extrabold text-fluid-h2 text-white tracking-tight leading-[1.1]">
            Selected <span className="text-[var(--accent)]">work</span>
          </h2>
          <p className="mt-4 text-[15px] text-white/55">{total} projects, from hackathons to research.</p>
        </div>
        {PROJECTS_DATA.map((project) => (
          <div data-frame key={project.id} className="shrink-0">
            <ProjectCard project={project} onOpen={onOpenProject} />
          </div>
        ))}
        <div data-frame className="shrink-0 w-[280px]">
          <h3 className="font-display font-bold text-2xl text-white tracking-tight">And more</h3>
          <p className="mt-2 text-sm text-white/55">Smaller repos and earlier work are on the Projects page.</p>
          <a
            href={routeUrl('projects')}
            onClick={(e) => {
              e.preventDefault();
              navigate('projects');
            }}
            className="mt-5 inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/[0.2] hover:border-[var(--accent)] text-sm font-semibold text-white transition-colors"
          >
            All projects <ArrowRight size={15} />
          </a>
        </div>
      </motion.div>

      <div className="shrink-0 px-12 pb-5 flex items-center gap-4">
        <span className="text-xs text-white/55 w-44 truncate">{names[Math.min(active, names.length - 1)]}</span>
        <div className="relative flex-1 h-px bg-white/[0.14]">
          <motion.div className="absolute left-0 top-0 h-px bg-[var(--accent)]" style={{ width: bar }} />
        </div>
      </div>
    </div>
  );
}
