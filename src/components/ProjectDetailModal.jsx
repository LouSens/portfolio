import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  motion,
  AnimatePresence,
  useScroll,
  useInView,
  animate,
} from 'framer-motion';
import {
  ArrowLeft,
  ArrowRight,
  ArrowDown,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Check,
  Cpu,
  Compass,
  Target,
  Search,
  BookOpen,
  Send,
  MessageSquare,
  Lightbulb,
  Bot,
  ShieldCheck,
  FileText,
  Rocket,
  ExternalLink,
  Github,
  RotateCw,
  Share2,
  Sparkles,
} from 'lucide-react';
import SectionLabel from './SectionLabel';
import Lightbox from './Lightbox';
import Tilt from './Tilt';
import { small, srcSet } from '../utils/img';

const ease = [0.22, 1, 0.36, 1];
const pad2 = (n) => String(n).padStart(2, '0');
const reducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const PART_ICONS = [Cpu, Compass, Bot, ShieldCheck, FileText, Rocket];
const STEP_ICONS = { Target, Search, BookOpen, Send, MessageSquare };

/* ───────────────────────── small pieces ───────────────────────── */

/* "768-dim" counts 0 to 768 once on screen; non-numeric values ("Top 24") render as-is.
   The final text is rendered invisibly underneath so the width never changes while counting. */
function StatValue({ value }) {
  const str = String(value);
  const m = str.match(/^(~?)(\d+(?:\.\d+)?)(.*)$/);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const prefix = m ? m[1] : '';
  const suffix = m ? m[3] : '';
  const to = m ? parseFloat(m[2]) : 0;
  const decimals = m ? (m[2].split('.')[1] || '').length : 0;
  const [n, setN] = useState(m ? 0 : to);

  useEffect(() => {
    if (!m || !inView) return undefined;
    if (reducedMotion()) {
      setN(to);
      return undefined;
    }
    const controls = animate(0, to, { duration: 1.3, ease, onUpdate: setN });
    return () => controls.stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, to]);

  if (!m) return <span ref={ref}>{str}</span>;
  return (
    <span ref={ref} className="relative inline-block">
      <span className="invisible" aria-hidden="true">{str}</span>
      <span className="absolute left-0 top-0 whitespace-nowrap">
        {prefix}
        {n.toFixed(decimals)}
        {suffix}
      </span>
      <span className="sr-only">{str}</span>
    </span>
  );
}

function Scene({ id, index, label, title, children, className = '' }) {
  return (
    <motion.section
      id={`cs-${id}`}
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.6, ease }}
      className={`scroll-mt-16 py-12 md:py-24 border-t border-white/[0.06] ${className}`}
    >
      <div className="max-w-[1100px] mx-auto px-4 sm:px-6 md:px-8">
        <SectionLabel label={label} />
        <h3 className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl text-white tracking-tight leading-[1.1] mb-7 md:mb-10 max-w-3xl">
          {title}
        </h3>
      </div>
      {children}
    </motion.section>
  );
}

/* ───────────────────────── screens viewer ───────────────────────── */

function ScreensViewer({ categories, onOpen }) {
  const [cat, setCat] = useState(0);
  const [i, setI] = useState(0);
  const [dir, setDir] = useState(1);
  const shots = categories[cat]?.screens || [];
  const shot = shots[i];

  const go = (d) => {
    setDir(d);
    setI((v) => (v + d + shots.length) % shots.length);
  };

  useEffect(() => setI(0), [cat]);

  if (!shot) return null;
  return (
    <div className="max-w-[1100px] mx-auto px-4 sm:px-6 md:px-8">
      {categories.length > 1 && (
        <div className="flex gap-5 mb-5 overflow-x-auto no-scrollbar" role="tablist">
          {categories.map((c, ci) => (
            <button
              key={c.name}
              type="button"
              role="tab"
              aria-selected={cat === ci}
              onClick={() => setCat(ci)}
              className={`shrink-0 h-11 text-sm border-b-2 transition-colors cursor-pointer ${
                cat === ci ? 'text-white border-[var(--accent)]' : 'text-white/45 border-transparent hover:text-white/80'
              }`}
            >
              {c.name}
              <span className="ml-1.5 text-white/30">{c.screens.length}</span>
            </button>
          ))}
        </div>
      )}

      <Tilt max={3} glare={false} className="rounded-2xl">
        <div className="relative aspect-[4/3] sm:aspect-[16/10] md:aspect-[16/9] overflow-hidden rounded-2xl border border-white/[0.12] bg-black">
          {/* blurred copy fills the letterbox so portrait photos still feel full-bleed */}
          <img src={small(shot.src)} alt="" aria-hidden="true" className="hidden md:block absolute inset-0 w-full h-full object-cover scale-110 blur-2xl opacity-40" />
          <AnimatePresence mode="popLayout" custom={dir} initial={false}>
            <motion.img
              key={shot.src}
              custom={dir}
              src={shot.src}
              srcSet={srcSet(shot.src, 1600)}
              sizes="(max-width: 768px) 100vw, 1100px"
              alt={shot.caption}
              draggable={false}
              variants={{
                enter: (d) => ({ opacity: 0, x: d * 60, scale: 0.98 }),
                center: { opacity: 1, x: 0, scale: 1 },
                exit: (d) => ({ opacity: 0, x: d * -60, scale: 0.98 }),
              }}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.4, ease }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.25}
              onDragEnd={(e, info) => {
                if (info.offset.x < -60) go(1);
                else if (info.offset.x > 60) go(-1);
              }}
              onTap={() => onOpen(shots, i)}
              className="absolute inset-0 w-full h-full object-contain cursor-zoom-in"
            />
          </AnimatePresence>

          {shots.length > 1 && (
            <>
              <button type="button" onClick={() => go(-1)} aria-label="Previous screenshot" className="absolute left-3 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/60 hover:bg-black/85 border border-white/[0.15] text-white flex items-center justify-center transition-colors cursor-pointer">
                <ChevronLeft size={20} />
              </button>
              <button type="button" onClick={() => go(1)} aria-label="Next screenshot" className="absolute right-3 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/60 hover:bg-black/85 border border-white/[0.15] text-white flex items-center justify-center transition-colors cursor-pointer">
                <ChevronRight size={20} />
              </button>
            </>
          )}
        </div>
      </Tilt>

      <div className="mt-4 flex items-center justify-between gap-4">
        <p className="text-sm sm:text-base text-white/70 min-w-0">{shot.caption}</p>
        <span className="text-sm text-white/40 tabular-nums shrink-0">
          {pad2(i + 1)} / {pad2(shots.length)}
        </span>
      </div>

      {shots.length > 1 && (
        <div className="mt-4 flex gap-2 overflow-x-auto no-scrollbar pb-1">
          {shots.map((s, ti) => (
            <button
              key={s.src}
              type="button"
              onClick={() => {
                setDir(ti > i ? 1 : -1);
                setI(ti);
              }}
              aria-label={`Show: ${s.caption}`}
              className={`shrink-0 w-20 sm:w-24 aspect-[4/3] rounded-lg overflow-hidden border-2 transition-all cursor-pointer ${
                ti === i ? 'border-[var(--accent)]' : 'border-transparent opacity-50 hover:opacity-90'
              }`}
            >
              <img src={small(s.src)} alt="" loading="lazy" decoding="async" draggable={false} className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

/* ───────────────────────── animated flow ───────────────────────── */

function FlowStage({ steps, loopNote }) {
  const ref = useRef(null);
  const inView = useInView(ref, { amount: 0.4 });
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (!inView || paused || reducedMotion()) return;
    const t = setInterval(() => setActive((a) => (a + 1) % steps.length), 3200);
    return () => clearInterval(t);
  }, [inView, paused, steps.length]);

  const step = steps[active];
  const pct = steps.length > 1 ? (active / (steps.length - 1)) * 100 : 0;

  return (
    <div ref={ref} className="max-w-[1100px] mx-auto px-4 sm:px-6 md:px-8" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      <div className="relative">
        {/* track + progress */}
        <div className="absolute left-5 right-5 top-5 h-px bg-white/[0.12]" aria-hidden="true" />
        <motion.div
          aria-hidden="true"
          className="absolute left-5 top-5 h-px bg-[var(--accent)] origin-left"
          animate={{ width: `calc((100% - 2.5rem) * ${pct / 100})` }}
          transition={{ duration: 0.6, ease }}
        />
        <ol className="relative grid" style={{ gridTemplateColumns: `repeat(${steps.length}, minmax(0, 1fr))` }}>
          {steps.map((st, idx) => {
            const on = idx === active;
            const done = idx < active;
            return (
              <li key={st.name} className="flex flex-col items-center text-center">
                <button
                  type="button"
                  onClick={() => {
                    setActive(idx);
                    setPaused(true);
                  }}
                  aria-label={st.name}
                  aria-current={on ? 'step' : undefined}
                  className="relative w-10 h-10 rounded-full flex items-center justify-center cursor-pointer"
                >
                  {on && <span className="absolute inset-0 rounded-full bg-[var(--accent)]/30 animate-ping" aria-hidden="true" />}
                  <span
                    className={`relative w-10 h-10 rounded-full border-2 flex items-center justify-center text-sm font-bold transition-all duration-300 ${
                      on
                        ? 'bg-[var(--accent)] border-[var(--accent)] text-white scale-110'
                        : done
                        ? 'bg-[var(--accent)]/20 border-[var(--accent)]/60 text-white'
                        : 'bg-[#050508] border-white/20 text-white/50 hover:border-white/50'
                    }`}
                  >
                    {done ? <Check size={16} /> : STEP_ICONS[st.icon] ? React.createElement(STEP_ICONS[st.icon], { size: 16 }) : <span className="w-2 h-2 rounded-full bg-current" />}
                  </span>
                </button>
                <span className={`mt-3 text-xs sm:text-sm leading-snug px-1 hidden sm:block transition-colors ${on ? 'text-white' : 'text-white/45'}`}>
                  {st.name}
                </span>
              </li>
            );
          })}
        </ol>
      </div>

      <div className="mt-8 min-h-[150px] sm:min-h-[130px] rounded-2xl border border-white/[0.1] bg-white/[0.02] p-6 sm:p-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3, ease }}
          >
            <h4 className="mt-1 font-display font-bold text-2xl sm:text-3xl text-white tracking-tight">{step.name}</h4>
            <p className="mt-2 text-base sm:text-lg text-white/70 leading-relaxed max-w-2xl">{step.desc}</p>
          </motion.div>
        </AnimatePresence>
      </div>

      {loopNote && (
        <p className="mt-4 flex items-center gap-2 text-sm text-white/55">
          <RotateCw size={15} className="text-[var(--accent)] shrink-0" />
          {loopNote}
        </p>
      )}
    </div>
  );
}

/* ───────────────────────── KerjaCerdas scoring demo ───────────────────────── */

const EVIDENCE = [
  { key: 'Claimed', w: 0.3, hint: 'only written on the CV' },
  { key: 'Quiz passed', w: 0.85, hint: 'passed the skill quiz' },
  { key: 'HR confirmed', w: 1, hint: 'confirmed in the interview' },
];
const DEMO_SKILLS = ['Excel', 'Customer service', 'Administration'];
// Same for every candidate in the demo, so only the proof changes the result.
const FIXED = { semantic: 0.8, experience: 0.9, education: 1 };

function ProofScoreDemo() {
  const [levels, setLevels] = useState([0, 0, 0]);
  const skill = levels.reduce((a, l) => a + EVIDENCE[l].w, 0) / levels.length;
  const rows = [
    { label: 'Semantic fit', weight: 0.35, value: FIXED.semantic, fixed: true },
    { label: 'Skills, weighted by proof', weight: 0.4, value: skill },
    { label: 'Experience', weight: 0.15, value: FIXED.experience, fixed: true },
    { label: 'Education', weight: 0.1, value: FIXED.education, fixed: true },
  ];
  const total = rows.reduce((a, r) => a + r.weight * r.value, 0);
  const [shown, setShown] = useState(total);
  useEffect(() => {
    const c = animate(shown, total, { duration: 0.6, ease, onUpdate: setShown });
    return () => c.stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [total]);

  const presets = [
    { name: 'Only claims', set: [0, 0, 0] },
    { name: 'Passed two quizzes', set: [1, 1, 0] },
    { name: 'Everything confirmed', set: [2, 2, 2] },
  ];

  return (
    <div className="max-w-[1100px] mx-auto px-4 sm:px-6 md:px-8 grid lg:grid-cols-2 gap-8 lg:gap-12">
      <div>
        <p className="text-base text-white/65 mb-6 max-w-md">
          The job needs three skills. Same candidate, same CV. Change how well each skill is proven and watch the match score move.
        </p>
        <div className="space-y-5">
          {DEMO_SKILLS.map((name, si) => (
            <div key={name}>
              <p className="text-sm text-white/80 mb-2">{name}</p>
              <div className="grid grid-cols-3 gap-1.5 p-1 rounded-xl bg-white/[0.04] border border-white/[0.08]">
                {EVIDENCE.map((e, li) => {
                  const on = levels[si] === li;
                  return (
                    <button
                      key={e.key}
                      type="button"
                      aria-pressed={on}
                      onClick={() => setLevels((l) => l.map((v, k) => (k === si ? li : v)))}
                      className={`relative h-11 rounded-lg text-xs sm:text-sm transition-colors cursor-pointer ${
                        on ? 'text-white font-semibold' : 'text-white/55 hover:text-white'
                      }`}
                    >
                      {on && <motion.span layoutId={`ev-${si}`} className="absolute inset-0 rounded-lg bg-[var(--accent)]" transition={{ type: 'spring', stiffness: 400, damping: 32 }} />}
                      <span className="relative">{e.key}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
        <div className="mt-6 flex flex-wrap gap-2">
          {presets.map((p) => (
            <button key={p.name} type="button" onClick={() => setLevels(p.set)} className="h-10 px-4 rounded-full border border-white/[0.14] text-sm text-white/70 hover:text-white hover:bg-white/[0.06] transition-colors cursor-pointer">
              {p.name}
            </button>
          ))}
        </div>
      </div>

      <Tilt max={4} className="rounded-2xl border border-white/[0.12] bg-white/[0.02] p-6 sm:p-8">
        <p className="text-sm text-white/45">Match score</p>
        <p className="font-display font-extrabold text-6xl sm:text-7xl text-white tabular-nums leading-none mt-2">
          {Math.round(shown * 100)}
          <span className="text-3xl text-white/40">%</span>
        </p>
        <div className="mt-7 space-y-4">
          {rows.map((r) => (
            <div key={r.label}>
              <div className="flex justify-between text-sm mb-1.5">
                <span className={r.fixed ? 'text-white/50' : 'text-white'}>
                  {r.label} <span className="text-white/30">· {Math.round(r.weight * 100)}%</span>
                </span>
                <span className="text-white/50 tabular-nums">{Math.round(r.value * 100)}</span>
              </div>
              <div className="h-2 rounded-full bg-white/[0.08] overflow-hidden">
                <motion.div
                  className={`h-full rounded-full ${r.fixed ? 'bg-white/30' : 'bg-[var(--accent)]'}`}
                  animate={{ width: `${r.value * 100}%` }}
                  transition={{ duration: 0.6, ease }}
                />
              </div>
            </div>
          ))}
        </div>
        <p className="mt-6 text-xs text-white/40 leading-relaxed">
          Example values for illustration. The weights (35 / 40 / 15 / 10) and the evidence levels (0.30 / 0.85 / 1.00) are the ones the engine uses. Location and salary are filters, not part of the score.
        </p>
      </Tilt>
    </div>
  );
}

/* ───────────────────────── decisions ───────────────────────── */

/* Pick a decision, read the full reasoning. No horizontal scrolling and nothing is ever cropped:
   desktop shows a question list beside a reading panel; mobile uses tap-to-expand rows. */
function DecisionExplorer({ items }) {
  const [active, setActive] = useState(0);
  const [open, setOpen] = useState(0);
  const item = items[active];
  const step = (d) => setActive((a) => (a + d + items.length) % items.length);

  return (
    <div className="max-w-[1100px] mx-auto px-4 sm:px-6 md:px-8">
      {/* desktop / tablet */}
      <div className="hidden md:grid grid-cols-12 gap-8 lg:gap-12 items-start">
        <div className="col-span-5 border-t border-white/[0.1]" role="tablist" aria-orientation="vertical">
          {items.map((it, i) => {
            const on = i === active;
            return (
              <button
                key={it.decision}
                type="button"
                role="tab"
                aria-selected={on}
                onClick={() => setActive(i)}
                className={`relative w-full text-left py-4 pl-5 pr-3 border-b border-white/[0.1] transition-colors cursor-pointer ${on ? 'text-white' : 'text-white/50 hover:text-white/85'}`}
              >
                {on && <motion.span layoutId="decision-bar" className="absolute left-0 top-3 bottom-3 w-[3px] rounded-full bg-[var(--accent)]" transition={{ type: 'spring', stiffness: 400, damping: 34 }} />}
                <span className="font-display font-semibold text-base leading-snug">{it.decision}</span>
              </button>
            );
          })}
        </div>

        <div className="col-span-7 sticky top-24">
          <div className="rounded-2xl border border-white/[0.12] bg-white/[0.02] p-7 lg:p-9">
            <AnimatePresence mode="wait">
              <motion.div key={active} role="tabpanel" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.28, ease }}>
                <Lightbulb size={22} className="text-[var(--accent)]" />
                <h4 className="mt-4 font-display font-bold text-xl lg:text-2xl text-white leading-snug tracking-tight">{item.decision}</h4>
                <p className="mt-4 text-base lg:text-[17px] text-white/75 leading-relaxed">{item.reasoning}</p>
              </motion.div>
            </AnimatePresence>
            <div className="mt-8 pt-5 border-t border-white/[0.08] flex items-center justify-end gap-2">
              <button type="button" onClick={() => step(-1)} aria-label="Previous decision" className="w-11 h-11 rounded-full border border-white/[0.14] hover:bg-white/[0.08] text-white/70 hover:text-white flex items-center justify-center transition-colors cursor-pointer">
                <ChevronLeft size={18} />
              </button>
              <button type="button" onClick={() => step(1)} aria-label="Next decision" className="w-11 h-11 rounded-full border border-white/[0.14] hover:bg-white/[0.08] text-white/70 hover:text-white flex items-center justify-center transition-colors cursor-pointer">
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* phones */}
      <div className="md:hidden border-t border-white/[0.1]">
        {items.map((it, i) => {
          const on = open === i;
          return (
            <div key={it.decision} className="border-b border-white/[0.1]">
              <button type="button" onClick={() => setOpen(on ? -1 : i)} aria-expanded={on} className="w-full flex items-start justify-between gap-4 py-5 text-left cursor-pointer">
                <span className={`font-display font-semibold text-base leading-snug ${on ? 'text-white' : 'text-white/75'}`}>{it.decision}</span>
                <ChevronDown size={20} className={`shrink-0 mt-0.5 transition-transform duration-200 ${on ? 'rotate-180 text-[var(--accent)]' : 'text-white/40'}`} />
              </button>
              <AnimatePresence initial={false}>
                {on && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25, ease }} className="overflow-hidden">
                    <p className="pb-6 text-[15px] text-white/75 leading-relaxed">{it.reasoning}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function HeroVisual({ project }) {
  if (!project.heroImage) return null;
  return (
    <div style={{ animationDelay: '0.5s' }} className="cs-fade-up lg:col-span-5 min-w-0">
      <div className="rounded-xl overflow-hidden border border-white/[0.14] bg-[#07080D] shadow-[0_30px_80px_rgba(0,0,0,0.55)]">
        <img src={project.heroImage} srcSet={srcSet(project.heroImage, 1600)} sizes="(max-width: 1024px) 100vw, 440px" alt={`${project.title} interface`} className="block w-full h-auto" />
      </div>
      {project.concept && <p className="mt-3 text-xs text-white/40">Concept design with sample data, not a screenshot of the deployed app.</p>}
    </div>
  );
}

/* ───────────────────────── the stage ───────────────────────── */

export default function ProjectDetailModal({ project, projects, onClose, onSelectProject }) {
  const scrollRef = useRef(null);
  const [lightbox, setLightbox] = useState(null); // { items, index }
  const [copiedLink, setCopiedLink] = useState(false);
  const [activeScene, setActiveScene] = useState('cover');

  const currentIndex = projects.findIndex((p) => p.id === project.id);
  const prevProject = projects[(currentIndex - 1 + projects.length) % projects.length];
  const nextProject = projects[(currentIndex + 1) % projects.length];

  const { scrollYProgress } = useScroll({ container: scrollRef });

  const closeLightbox = useCallback(() => setLightbox(null), []);
  const setLightboxIndex = useCallback((index) => setLightbox((lb) => (lb ? { ...lb, index } : lb)), []);

  /* Esc closes; arrows switch project. Both stand down while the photo viewer is open. */
  useEffect(() => {
    const onKey = (e) => {
      if (lightbox) return;
      if (e.key === 'Escape') onClose();
      else if (e.key === 'ArrowLeft') onSelectProject(prevProject);
      else if (e.key === 'ArrowRight') onSelectProject(nextProject);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [lightbox, onClose, onSelectProject, prevProject, nextProject]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: 0 });
    setLightbox(null);
  }, [project.id]);

  const categories = project.screenCategories || [];
  const hasScreens = categories.length > 0;
  const flowSteps = project.flow?.steps || project.architectureNodes?.map((n) => ({ name: n.name, desc: n.desc }));
  const flowTitle = project.flow?.title || "How it's built";

  const scenes = [
    { id: 'cover', label: 'Overview' },
    hasScreens && { id: 'screens', label: project.concept ? 'Design' : 'Screens' },
    flowSteps && { id: 'flow', label: flowTitle },
    project.demo === 'proof-score' && { id: 'demo', label: 'Try it' },
    project.parts && { id: 'parts', label: 'What I built' },
    project.process && { id: 'decisions', label: 'Decisions' },
  ].filter(Boolean);
  const num = (id) => scenes.findIndex((s) => s.id === id);

  /* Scroll-spy for the dots on the right. */
  useEffect(() => {
    const root = scrollRef.current;
    if (!root) return;
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActiveScene(e.target.id.replace('cs-', ''))),
      { root, rootMargin: '-35% 0px -55% 0px', threshold: 0 }
    );
    scenes.forEach((s) => {
      const el = document.getElementById(`cs-${s.id}`);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [project.id]);

  const jump = (id) => document.getElementById(`cs-${id}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' });

  const handleShare = () => {
    const url = `${window.location.origin}${window.location.pathname}#project=${project.id}`;
    navigator.clipboard.writeText(url).then(() => {
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2200);
    });
  };

  const linkBtn = 'liquid-btn-secondary !py-2.5 !px-4 text-sm font-semibold';

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease }}
      role="dialog"
      aria-modal="true"
      aria-label={`${project.title} case study`}
      className="fixed inset-0 z-[100] bg-[#050508] flex flex-col select-text"
    >
      {/* ── TOP BAR ── */}
      <header className="relative shrink-0 h-14 sm:h-16 px-3 sm:px-6 flex items-center justify-between gap-3 border-b border-white/[0.08] bg-[#050508]/95 backdrop-blur z-20">
        <button type="button" onClick={onClose} className="inline-flex items-center gap-2 h-11 pr-3 text-sm text-white/80 hover:text-white transition-colors cursor-pointer">
          <ArrowLeft size={18} />
          <span>All projects</span>
        </button>

        <p className="hidden md:block absolute left-1/2 -translate-x-1/2 font-display font-semibold text-sm text-white/60 truncate max-w-[40%]">{project.title}</p>

        <div className="flex items-center gap-1 sm:gap-2">
          <span className="hidden sm:block text-sm text-white/45 tabular-nums mr-1">
            {pad2(currentIndex + 1)} / {pad2(projects.length)}
          </span>
          <button type="button" onClick={() => onSelectProject(prevProject)} aria-label={`Previous: ${prevProject.title}`} className="w-11 h-11 rounded-full hover:bg-white/[0.08] text-white/70 hover:text-white flex items-center justify-center transition-colors cursor-pointer">
            <ChevronLeft size={20} />
          </button>
          <button type="button" onClick={() => onSelectProject(nextProject)} aria-label={`Next: ${nextProject.title}`} className="w-11 h-11 rounded-full hover:bg-white/[0.08] text-white/70 hover:text-white flex items-center justify-center transition-colors cursor-pointer">
            <ChevronRight size={20} />
          </button>
          <button type="button" onClick={handleShare} aria-label="Copy link to this project" className="w-11 h-11 rounded-full hover:bg-white/[0.08] text-white/70 hover:text-white flex items-center justify-center transition-colors cursor-pointer">
            {copiedLink ? <Check size={17} className="text-emerald-400" /> : <Share2 size={17} />}
          </button>
        </div>

        <motion.div style={{ scaleX: scrollYProgress }} className="absolute left-0 right-0 bottom-[-1px] h-[2px] origin-left bg-[var(--accent)]" />
      </header>

      {/* ── SCENE DOTS (desktop) ── */}
      <nav aria-label="Case study scenes" className="hidden lg:flex fixed right-5 top-1/2 -translate-y-1/2 z-30 flex-col items-end gap-3.5">
        {scenes.map((s) => {
          const on = activeScene === s.id;
          return (
            <button key={s.id} type="button" onClick={() => jump(s.id)} aria-label={`Jump to ${s.label}`} aria-current={on ? 'true' : undefined} className="group flex items-center gap-2.5 cursor-pointer">
              <span className={`text-[11px] whitespace-nowrap transition-all duration-200 ${on ? 'text-white opacity-100' : 'text-white/50 opacity-0 group-hover:opacity-100'}`}>{s.label}</span>
              <span className={`rounded-full transition-all duration-200 ${on ? 'w-2 h-2 bg-[var(--accent)]' : 'w-1.5 h-1.5 bg-white/25 group-hover:bg-white/50'}`} />
            </button>
          );
        })}
      </nav>

      {/* ── SCROLLING STAGE ── */}
      <div ref={scrollRef} data-lenis-prevent="true" onWheel={(e) => e.stopPropagation()} className="flex-1 overflow-y-auto overscroll-contain" style={{ WebkitOverflowScrolling: 'touch' }}>
        <div key={project.id}>
          {/* ── COVER ── */}
          <section id="cs-cover" className="relative min-h-[calc(100svh-4rem)] flex flex-col justify-end overflow-hidden">
            <div className="absolute inset-0" aria-hidden="true">
              <div className="w-full h-full bg-dots opacity-70" />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-[#050508] via-[#050508]/70 to-[#050508]/20" aria-hidden="true" />
            <motion.div aria-hidden="true" className="absolute -bottom-40 -left-32 w-[560px] h-[560px] rounded-full bg-[var(--accent)]/[0.14] blur-[140px]" animate={{ x: [0, 60, 0], y: [0, -30, 0] }} transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }} />

            <div className="relative max-w-[1100px] w-full mx-auto px-4 sm:px-6 md:px-8 pt-24 pb-10 md:pb-14">
              <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-center">
              <div className="lg:col-span-7 min-w-0">
              <p style={{ animationDelay: '0.1s' }} className="cs-fade-up text-sm text-white/60">
                {project.type} · {project.year} · {project.role}
              </p>
              <h2 className="mt-3 font-display font-extrabold text-5xl sm:text-6xl md:text-8xl text-white tracking-[-0.03em] leading-[0.98]">
                {project.title.split(' ').map((w, wi) => (
                  <span key={wi} className="inline-block overflow-hidden align-bottom mr-[0.25em]">
                    <span className="cs-rise inline-block" style={{ animationDelay: `${0.15 + wi * 0.08}s` }}>
                      {w}
                    </span>
                  </span>
                ))}
              </h2>
              {project.highlight && (
                <p style={{ animationDelay: '0.5s' }} className="cs-fade-up mt-4 inline-flex items-center gap-2 text-base sm:text-lg text-[var(--accent)]">
                  <Sparkles size={18} /> {project.highlight}
                </p>
              )}
              <p style={{ animationDelay: '0.6s' }} className="cs-fade-up mt-5 text-base sm:text-xl text-white/75 leading-relaxed max-w-2xl">
                {project.synopsis}
              </p>

              <div style={{ animationDelay: '0.7s' }} className="cs-fade-up mt-7 flex flex-wrap gap-3">
                {project.githubUrl && (
                  <a href={project.githubUrl} target="_blank" rel="noreferrer" className="liquid-btn-primary !py-2.5 !px-5 text-sm font-bold">
                    <Github size={15} />
                    <span>View code on GitHub</span>
                  </a>
                )}
                {project.liveUrl && (
                  <a href={project.liveUrl} target="_blank" rel="noreferrer" className={linkBtn}>
                    <ExternalLink size={14} />
                    <span>Live platform</span>
                  </a>
                )}
                {project.colabUrls?.map((nb) => (
                  <a key={nb.label} href={nb.url} target="_blank" rel="noreferrer" className={linkBtn}>
                    <ExternalLink size={14} />
                    <span>{nb.label}</span>
                  </a>
                ))}
                {project.hfUrl && (
                  <a href={project.hfUrl} target="_blank" rel="noreferrer" className={linkBtn}>
                    <ExternalLink size={14} />
                    <span>Hugging Face</span>
                  </a>
                )}
                {project.wandbUrl && (
                  <a href={project.wandbUrl} target="_blank" rel="noreferrer" className={linkBtn}>
                    <ExternalLink size={14} />
                    <span>Experiment runs</span>
                  </a>
                )}
              </div>

              {project.impactMetrics && (
                <dl className={`mt-10 grid grid-cols-2 ${project.heroImage ? '' : 'sm:grid-cols-4'} gap-x-8 gap-y-7 pt-6 border-t border-white/[0.14]`}>
                  {project.impactMetrics.map((m) => (
                    <div key={m.label}>
                      <dt className="font-display font-extrabold text-3xl sm:text-4xl text-white leading-none tabular-nums whitespace-nowrap">
                        <StatValue value={m.value} />
                      </dt>
                      <dd className="mt-2 text-sm text-white/55 leading-snug">{m.label}</dd>
                    </div>
                  ))}
                </dl>
              )}

              <motion.button
                type="button"
                onClick={() => jump(scenes[1]?.id || 'cover')}
                aria-label="Scroll down"
                className="mt-10 w-11 h-11 rounded-full border border-white/[0.2] text-white/70 flex items-center justify-center cursor-pointer hover:text-white hover:border-white/50 transition-colors"
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
              >
                <ArrowDown size={18} />
              </motion.button>
              </div>
              <HeroVisual project={project} />
              </div>
            </div>
          </section>

          {/* ── SCREENS ── */}
          {hasScreens && (
            <Scene id="screens" index={num('screens')} label={project.concept ? 'Design' : 'Screens'} title={project.concept ? 'The design' : 'See it'}>
              <ScreensViewer categories={categories} onOpen={(items, index) => setLightbox({ items, index })} />
              {project.concept && <p className="max-w-[1100px] mx-auto px-4 sm:px-6 md:px-8 mt-1 text-xs text-white/40">Concept design with sample data, not a screenshot of the deployed app.</p>}
            </Scene>
          )}

          {/* ── FLOW ── */}
          {flowSteps && (
            <Scene id="flow" index={num('flow')} label={flowTitle} title={flowTitle}>
              <FlowStage steps={flowSteps} loopNote={project.flow?.loopNote} />
            </Scene>
          )}

          {/* ── DEMO ── */}
          {project.demo === 'proof-score' && (
            <Scene id="demo" index={num('demo')} label="Try it" title="Why proof beats keywords">
              <ProofScoreDemo />
            </Scene>
          )}

          {/* ── WHAT I BUILT ── */}
          {project.parts && (
            <Scene id="parts" index={num('parts')} label="What I built" title="What I built">
              <div className="max-w-[1100px] mx-auto px-4 sm:px-6 md:px-8 grid sm:grid-cols-2 gap-4" style={{ perspective: 1200 }}>
                {project.parts.map((p, i) => {
                  const Icon = PART_ICONS[i % PART_ICONS.length];
                  return (
                    <motion.div key={p.title} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.5, delay: (i % 2) * 0.08, ease }}>
                      <Tilt max={6} className="h-full rounded-2xl border border-white/[0.1] hover:border-white/[0.22] bg-white/[0.02] p-6 transition-colors">
                        <div className="w-11 h-11 rounded-xl bg-[var(--accent)]/10 border border-[var(--accent)]/30 flex items-center justify-center text-[var(--accent)]" style={{ transform: 'translateZ(30px)' }}>
                          <Icon size={20} />
                        </div>
                        <h4 className="mt-4 font-display font-bold text-xl text-white tracking-tight">{p.title}</h4>
                        <p className="mt-2 text-[15px] text-white/65 leading-relaxed">{p.text}</p>
                      </Tilt>
                    </motion.div>
                  );
                })}
              </div>
            </Scene>
          )}

          {/* ── DECISIONS ── */}
          {project.process && (
            <Scene id="decisions" index={num('decisions')} label="Decisions" title="The calls I made">
              <p className="max-w-[1100px] mx-auto px-4 sm:px-6 md:px-8 -mt-6 mb-8 text-base text-white/60">
                Pick one to read why. Where it was judgment more than testing, I say so.
              </p>
              <DecisionExplorer items={project.process} />
            </Scene>
          )}

          {/* ── NEXT PROJECT ── */}
          <section className="border-t border-white/[0.06]">
            <div className="max-w-[1100px] mx-auto px-4 sm:px-6 md:px-8 py-16 md:py-24 pb-28">
              <button type="button" onClick={() => onSelectProject(nextProject)} className="group w-full text-left flex items-center justify-between gap-6 cursor-pointer">
                <span>
                  <span className="block text-sm text-white/45 mb-2">Next project</span>
                  <span className="block font-display font-extrabold text-4xl sm:text-6xl text-white group-hover:text-[var(--accent)] transition-colors tracking-tight">{nextProject.title}</span>
                  {nextProject.highlight && <span className="block mt-3 text-sm sm:text-base text-white/55">{nextProject.highlight}</span>}
                </span>
                <span className="shrink-0 w-14 h-14 sm:w-16 sm:h-16 rounded-full border border-white/[0.2] group-hover:border-[var(--accent)] group-hover:bg-[var(--accent)] flex items-center justify-center text-white transition-all duration-300 group-hover:translate-x-1">
                  <ArrowRight size={24} />
                </span>
              </button>
            </div>
          </section>
        </div>
      </div>

      <AnimatePresence>{lightbox && <Lightbox items={lightbox.items} index={lightbox.index} onClose={closeLightbox} onIndex={setLightboxIndex} />}</AnimatePresence>
    </motion.div>
  );
}
