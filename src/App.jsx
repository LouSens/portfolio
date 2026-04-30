import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';
import Lenis from 'lenis';
import {
  Github, Linkedin, Mail, ArrowUpRight, Code, Database, Sparkles, Server,
  Terminal, X, Menu, Download, ChevronRight, Plus, Minus, GraduationCap,
  Trophy, Bot, Brain, Cpu, Layers
} from 'lucide-react';
import { LiquidMetalButton } from '@/components/ui/liquid-metal-button';

/* ═══════════════════════════════════════
   DATA & CONTENT
   ═══════════════════════════════════════ */
const TOOLS = [
  { name: 'Python', svg: 'https://cdn.simpleicons.org/python/white' },
  { name: 'FastAPI', svg: 'https://cdn.simpleicons.org/fastapi/white' },
  { name: 'LangChain', svg: 'https://cdn.simpleicons.org/langchain/white' },
  { name: 'TensorFlow', svg: 'https://cdn.simpleicons.org/tensorflow/white' },
  { name: 'Keras', svg: 'https://cdn.simpleicons.org/keras/white' },
  { name: 'PyTorch', svg: 'https://cdn.simpleicons.org/pytorch/white' },
  { name: 'scikit-learn', svg: 'https://cdn.simpleicons.org/scikitlearn/white' },
  { name: 'React', svg: 'https://cdn.simpleicons.org/react/white' },
  { name: 'Node.js', svg: 'https://cdn.simpleicons.org/nodedotjs/white' },
  { name: 'Docker', svg: 'https://cdn.simpleicons.org/docker/white' },
  { name: 'GitHub Actions', svg: 'https://cdn.simpleicons.org/githubactions/white' },
  { name: 'Vercel', svg: 'https://cdn.simpleicons.org/vercel/white' },
  { name: 'Railway', svg: 'https://cdn.simpleicons.org/railway/white' },
];

const PROJECTS = [
  {
    title: 'Orion',
    category: 'Multi-Agent LLM Workflow',
    role: 'Tech Lead / Backend',
    team: '4-person team',
    year: '2026',
    metric: '~80%',
    metricLabel: 'Faster Processing',
    secondaryMetric: '85%',
    secondaryLabel: 'Test Coverage',
    url: 'https://github.com/LouSens/orion.git',
    tags: ['LangGraph', 'FastAPI', 'LangSmith', 'Pydantic v2', 'GitHub Actions'],
    desc: 'A six-stage agentic pipeline that automates end-to-end expense claim processing — employees submit claims in natural language and the system extracts, validates, and auto-approves them.',
    bullets: [
      'Architected the multi-agent LangGraph workflow that cut processing time by ~80% versus the manual baseline.',
      'Built a type-safe FastAPI backend with Pydantic v2 contracts and LangSmith tracing across all six agent stages.',
      'Stood up dual CI/CD via GitHub Actions: a PR gate (120 unit + stub-integration tests at 85% coverage) and a nightly cron running live regressions against GLM-5.1 with automatic secret rotation.',
      'Wrote a deterministic policy engine and ledger tools in Python (rapidfuzz, pypdf) for PDF/DOCX parsing, fuzzy duplicate detection, and persistent JSON-backed claim records.',
    ],
    icon: <Bot size={28} />,
  },
  {
    title: 'NeuralVoid',
    category: 'Behavioural Analytics + Clinical AI',
    role: 'Full-Stack Engineer',
    team: 'Solo build',
    year: '2026',
    metric: '~96%',
    metricLabel: 'Ensemble Accuracy',
    secondaryMetric: '25',
    secondaryLabel: 'ML Features',
    url: 'https://github.com/LouSens/neural-void.git',
    tags: ['Node.js', 'FastAPI', 'scikit-learn', 'XGBoost', 'Gemini', 'Vercel', 'Railway'],
    desc: 'End-to-end TikTok behavioural analytics platform — from raw session events to a clinical-grade report on doomscroll patterns, surfaced through an interactive React dashboard.',
    bullets: [
      'Engineered a 25-feature ML pipeline (session detection, binge streaks, doomscroll velocity) feeding a soft-voting ensemble of Logistic Regression, Random Forest, and XGBoost — ~96% accuracy.',
      'Integrated Google Gemini for clinical report generation served through a FastAPI backend.',
      'Built a responsive React SPA dashboard with heatmaps, radar charts, and area charts; deployed on Vercel with a Railway-hosted REST API.',
    ],
    icon: <Brain size={28} />,
  },
  {
    title: 'Handwritten Digit Recognition',
    category: 'Computer Vision Foundations',
    role: 'Solo project',
    team: '',
    year: '2024',
    metric: '98.5%',
    metricLabel: 'Test Accuracy',
    secondaryMetric: 'MNIST',
    secondaryLabel: 'Benchmark',
    url: 'https://github.com/LouSens/handwritten-digit-recognition.git',
    tags: ['TensorFlow', 'Keras', 'CNN'],
    desc: 'A convolutional model trained on MNIST that beats the standard benchmark — built as a deep dive into the full CV training loop.',
    bullets: [
      'Designed and trained a CNN in Keras/TensorFlow, hitting 98.5% test accuracy.',
      'Applied a full preprocessing, augmentation, and hyperparameter-tuning pipeline to optimise generalisation and convergence.',
    ],
    icon: <Cpu size={28} />,
  },
];

const EXPERIENCE = [
  {
    year: '2026',
    role: 'Tech Lead — Orion',
    company: '4-Person Engineering Team',
    desc: 'Led backend architecture for a multi-agent LLM expense-claim platform. Owned the LangGraph pipeline, the FastAPI contracts, and the dual-strategy CI/CD that keeps live regressions running nightly against production LLM endpoints.',
  },
  {
    year: '2026',
    role: 'Full-Stack Engineer — NeuralVoid',
    company: 'Independent build',
    desc: 'Shipped a behavioural analytics platform end-to-end: 25-feature ensemble ML model, Gemini-powered clinical reporting, and a React/Vercel dashboard backed by a Railway-hosted FastAPI API.',
  },
  {
    year: '2025',
    role: 'Lead Developer — DPickleball RL Agent',
    company: '3-person engineering team',
    desc: 'Architected the full Unity ML-Agents training stack, environment, reward shaping, PPO loop, and hyperparameter sweep for a competition-graded reinforcement learning agent. 3rd place finish.',
  },
  {
    year: '2024',
    role: 'Computer Vision — MNIST CNN',
    company: 'Solo research project',
    desc: 'Built and tuned a Keras/TensorFlow CNN on MNIST end-to-end, achieving 98.5% test accuracy and clearing the standard benchmark.',
  },
];

const EDUCATION = {
  school: 'Xiamen University Malaysia',
  location: 'Selangor, Malaysia',
  degree: 'BEng (Hons) in Artificial Intelligence',
  gpa: '3.83 / 4.00',
  start: 'Sept 2024',
  expected: 'Sept 2028',
  highlights: [
    "Dean's List Awardee — 3 consecutive semesters",
    'Top 16% of cohort',
    'College of Artificial Intelligence and Robotics',
  ],
};

const AWARDS = [
  {
    place: '3rd Place',
    title: 'DPickleball AI Competition',
    org: 'Unity • ML-Agents • Reinforcement Learning',
    date: 'Oct 2025',
    note: 'Lead developer — architected the full training system, reward shaping, and PPO loop for a competition-grade RL agent.',
    icon: <Trophy size={20} />,
  },
  {
    place: 'Top 20% Globally',
    title: 'International Quant Championship — Stage 1',
    org: 'Quantitative Reasoning',
    date: 'Apr 2025',
    note: 'Benchmarked analytical and data-driven problem-solving against international competitors.',
    icon: <Sparkles size={20} />,
  },
];

const CORE_COMPETENCIES = [
  {
    title: 'LLM & Agent Systems',
    icon: <Bot size={20} />,
    items: ['LangChain / LangGraph', 'Agentic workflow design', 'LangSmith observability', 'Gemini & GLM integration', 'Tool-calling & policy engines'],
  },
  {
    title: 'ML & Data Science',
    icon: <Brain size={20} />,
    items: ['Ensemble methods (XGBoost, RF, LR)', 'CNNs (TensorFlow / Keras)', 'PyTorch & scikit-learn', 'Reinforcement learning (PPO)', 'Feature engineering at scale'],
  },
  {
    title: 'Backend & DevOps',
    icon: <Layers size={20} />,
    items: ['FastAPI + Pydantic v2', 'Node.js, REST APIs', 'GitHub Actions CI/CD', 'Docker, WSL', 'Vercel + Railway deploys'],
  },
];

const STATUS_ROTATION = [
  'shipping multi-agent LLM systems',
  'researching deep learning for HAR',
  'open to weekend project collab',
  'open to remote summer internships',
];

/* ═══════════════════════════════════════
   SMOOTH SCROLL SETUP
   ═══════════════════════════════════════ */
function useSmoothScroll() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.5,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
    });
    function raf(time) { lenis.raf(time); requestAnimationFrame(raf); }
    requestAnimationFrame(raf);
    return () => lenis.destroy();
  }, []);
}

/* ═══════════════════════════════════════
   CUSTOM CURSOR
   ═══════════════════════════════════════ */
function Cursor() {
  const dot = useRef(null);
  const ring = useRef(null);

  useEffect(() => {
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
    const d = dot.current, r = ring.current;
    if (!d || !r) return;

    let mx = -100, my = -100, rx = -100, ry = -100;
    const move = (e) => { mx = e.clientX; my = e.clientY; d.style.left = mx + 'px'; d.style.top = my + 'px'; };
    const loop = () => {
      rx += (mx - rx) * 0.15; ry += (my - ry) * 0.15;
      r.style.left = rx + 'px'; r.style.top = ry + 'px';
      requestAnimationFrame(loop);
    };

    document.addEventListener('mousemove', move);
    loop();

    const onHover = () => { d.classList.add('active'); r.classList.add('active'); };
    const onLeave = () => { d.classList.remove('active'); r.classList.remove('active'); };

    const bind = () => {
      document.querySelectorAll('a, button, [data-hover="true"], input, textarea').forEach(el => {
        el.addEventListener('mouseenter', onHover);
        el.addEventListener('mouseleave', onLeave);
      });
    };
    bind();

    const obs = new MutationObserver(bind);
    obs.observe(document.body, { childList: true, subtree: true });

    return () => { document.removeEventListener('mousemove', move); obs.disconnect(); };
  }, []);

  return (
    <>
      <div ref={dot} className="cursor-dot hidden md:block" />
      <div ref={ring} className="cursor-ring hidden md:block" />
    </>
  );
}

/* ═══════════════════════════════════════
   THREE.JS PARTICLE BACKGROUND
   ═══════════════════════════════════════ */
function ParticleField() {
  const ref = useRef();

  const [positions] = useState(() => {
    const count = 3000;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 15 * Math.cbrt(Math.random());
      const theta = Math.random() * 2 * Math.PI;
      const phi = Math.acos(2 * Math.random() - 1);
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);
    }
    return positions;
  });

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.y -= delta * 0.05;
      ref.current.rotation.x -= delta * 0.02;
    }
  });

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial transparent color="#FF5A36" size={0.05} sizeAttenuation={true} depthWrite={false} opacity={0.4} />
    </Points>
  );
}

/* ═══════════════════════════════════════
   SHARED ANIMATION COMPONENTS
   ═══════════════════════════════════════ */
function SectionHeading({ subtitle, title, description, align = 'left' }) {
  const alignClass = align === 'center' ? 'items-center text-center mx-auto' : 'items-start text-left';
  return (
    <div className={`mb-16 md:mb-24 flex flex-col ${alignClass} max-w-3xl`}>
      <motion.div
        initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="flex items-center gap-3 mb-6"
      >
        <span className="w-12 h-px bg-[var(--accent)]" />
        <span className="font-mono-dm text-sm text-[var(--accent)] tracking-[0.2em] uppercase">{subtitle}</span>
      </motion.div>
      <motion.h2
        initial={{ opacity: 0, y: 40, scale: 0.95, filter: "blur(10px)" }}
        whileInView={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        className="font-display text-4xl md:text-5xl font-bold tracking-tight mb-6 text-white"
      >
        {title}
      </motion.h2>
      {description && (
        <motion.p
          initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-lg md:text-xl text-[var(--text-2)] font-light leading-relaxed max-w-2xl"
        >
          {description}
        </motion.p>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════
   MAIN APP COMPONENT
   ═══════════════════════════════════════ */
export default function App() {
  useSmoothScroll();

  return (
    <div className="relative min-h-screen bg-[var(--bg)] text-[var(--text-1)]">
      <Cursor />

      {/* Absolute 3D Background just for Hero */}
      <div className="absolute top-0 left-0 w-full h-[150vh] z-0 pointer-events-none opacity-80" style={{ maskImage: 'linear-gradient(to bottom, black 50%, transparent 100%)', WebkitMaskImage: 'linear-gradient(to bottom, black 50%, transparent 100%)' }}>
        <Canvas camera={{ position: [0, 0, 15] }}>
          <ParticleField />
        </Canvas>
      </div>

      <Navbar />

      <main className="relative z-10 w-full overflow-hidden">
        <Hero />
        <Marquee />
        <PersonalSection />
        <ExperienceTimeline />
        <ProjectsGallery />
        <EducationSection />
        <AwardsSection />
        <SkillsGrid />
        <CTASection />
      </main>

      <Footer />
    </div>
  );
}

/* ═══════════════════════════════════════
   NAVBAR
   ═══════════════════════════════════════ */
function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const links = [
    { label: 'About', id: 'about' },
    { label: 'Experience', id: 'experience' },
    { label: 'Work', id: 'work' },
    { label: 'Awards', id: 'awards' },
    { label: 'Contact', id: 'contact' },
  ];

  const scrollTo = (id) => {
    setIsOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 py-5 border-b ${isScrolled
          ? 'bg-[var(--surface-1)] backdrop-blur-xl border-b-[var(--border)] py-4'
          : 'bg-transparent border-b-transparent'
          }`}
      >
        <div className="max-w-[1200px] mx-auto flex items-center justify-between">
          <button
            onClick={() => window.scrollTo(0, 0)}
            className="flex items-center gap-3 text-white hover:text-[var(--accent)] transition-colors group"
          >
            <div className="w-10 h-10 rounded-lg bg-[var(--surface-2)] flex items-center justify-center border border-[var(--border)] shadow-lg group-hover:border-[var(--accent)] transition-colors">
              <Code size={20} />
            </div>
            <span className="font-display font-bold tracking-tight text-xl hidden sm:block">David K.</span>
          </button>

          <div className="hidden md:flex items-center gap-8">
            {links.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className="text-[var(--text-2)] hover:text-white transition-colors text-sm uppercase tracking-widest font-mono-dm"
              >
                {link.label}
              </button>
            ))}
            <a href="/CV_DAVID KURNIAWAN.pdf" download="CV_David_Kurniawan.pdf" target="_blank" className="flex items-center gap-2 px-6 py-2.5 rounded-full border border-[var(--border)] hover:border-[var(--accent)] hover:bg-[var(--accent-dim)] transition-all font-mono-dm text-xs tracking-wider uppercase" data-hover="true">
              Download <Download size={14} />
            </a>
          </div>

          <button className="md:hidden text-white" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 top-[73px] z-40 bg-[var(--bg)]/95 backdrop-blur-xl flex flex-col items-center justify-center gap-8 md:hidden border-t border-[var(--border)]"
          >
            {links.map((link) => (
              <button key={link.id} onClick={() => scrollTo(link.id)} className="font-display text-2xl font-bold uppercase tracking-widest text-[var(--text-1)]">
                {link.label}
              </button>
            ))}
            <a href="/CV_DAVID KURNIAWAN.pdf" download="CV_David_Kurniawan.pdf" target="_blank" className="mt-8 px-8 py-3 bg-white text-black font-mono-dm tracking-widest text-sm rounded-full flex items-center gap-2">
              DOWNLOAD <Download size={16} />
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

/* ═══════════════════════════════════════
   HERO  (with rotating "currently" pill)
   ═══════════════════════════════════════ */
function RotatingStatus() {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % STATUS_ROTATION.length), 2800);
    return () => clearInterval(t);
  }, []);
  return (
    <AnimatePresence mode="wait">
      <motion.span
        key={idx}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        className="text-white whitespace-nowrap"
      >
        {STATUS_ROTATION[idx]}
      </motion.span>
    </AnimatePresence>
  );
}

function Hero() {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 1000], [0, 300]);
  const y2 = useTransform(scrollY, [0, 1000], [0, 150]);
  const opacity = useTransform(scrollY, [0, 500], [1, 0]);

  return (
    <section className="relative min-h-screen flex items-center justify-center px-5 sm:px-6 pt-24 pb-16">
      <motion.div style={{ y: y1, opacity }} className="relative z-10 w-full max-w-[1200px] flex flex-col items-center text-center">

        <motion.div
          initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}
          className="inline-flex items-center gap-2 sm:gap-3 px-3 sm:px-5 py-1.5 sm:py-2 rounded-full border border-[var(--border)] bg-[rgba(20,20,20,0.6)] backdrop-blur-md mb-8 shadow-2xl shadow-[var(--accent-dim)] max-w-[92vw] overflow-hidden"
        >
          <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[var(--accent)] animate-pulse flex-shrink-0" />
          <span className="text-[9px] sm:text-xs font-mono-dm text-[var(--text-3)] uppercase tracking-tight sm:tracking-widest flex-shrink-0 whitespace-nowrap">Currently</span>
          <span className="text-[9px] sm:text-xs font-mono-dm tracking-tight sm:tracking-wide whitespace-nowrap overflow-hidden text-ellipsis"><RotatingStatus /></span>
        </motion.div>

        <motion.h1 style={{ y: y2 }} className="font-display font-bold text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight mb-6 md:mb-8">
          <motion.div
            initial={{ opacity: 0, y: 60 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            David
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 60 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="text-[var(--accent)]"
          >
            Kurniawan
          </motion.div>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.6 }}
          className="max-w-[680px] text-[var(--text-2)] text-base sm:text-lg md:text-xl mb-8 md:mb-12 font-light leading-relaxed px-2 sm:px-0"
        >
          AI engineering student building <span className="text-white">multi-agent LLM systems</span>, <span className="text-white">ML pipelines</span>, and the backend plumbing that keeps them running in production.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.7 }}
          className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 w-full sm:w-auto"
        >
          <LiquidMetalButton label="See Featured Work" onClick={() => document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' })} />
          <motion.a
            href="/CV_DAVID KURNIAWAN.pdf"
            download="CV_David_Kurniawan.pdf"
            target="_blank"
            className="relative inline-flex items-center gap-3 px-7 py-3 rounded-full border border-[var(--border)] font-mono-dm text-sm tracking-widest uppercase overflow-hidden cursor-pointer"
            data-hover="true"
            initial="rest"
            whileHover="hover"
            animate="rest"
          >
            {/* Sweep fill — slides in from left on hover */}
            <motion.span
              className="absolute inset-0 rounded-full bg-white"
              variants={{
                rest: { scaleX: 0, originX: 0 },
                hover: { scaleX: 1, originX: 0 },
              }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            />

            {/* Text — inverts to black as fill sweeps */}
            <motion.span
              className="relative z-10 leading-none"
              variants={{
                rest: { color: 'var(--text-1)' },
                hover: { color: '#000000' },
              }}
              transition={{ duration: 0.3, delay: 0.05 }}
            >
              Download CV
            </motion.span>

            {/* Icon circle — border inverts, icon bounces down then resets */}
            <motion.span
              className="relative z-10 w-7 h-7 rounded-full border flex items-center justify-center shrink-0"
              variants={{
                rest: { borderColor: 'var(--border)', color: 'var(--text-3)' },
                hover: { borderColor: '#1a1a1a', color: '#000000' },
              }}
              transition={{ duration: 0.3, delay: 0.05 }}
            >
              <motion.div
                variants={{
                  rest: { y: 0, opacity: 1 },
                  hover: { y: [0, 6, -6, 0], opacity: [1, 0, 0, 1] },
                }}
                transition={{ duration: 0.55, delay: 0.1, ease: 'easeInOut' }}
              >
                <Download size={13} />
              </motion.div>
            </motion.span>
          </motion.a>
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ═══════════════════════════════════════
   MARQUEE
   ═══════════════════════════════════════ */
function Marquee() {
  const toolsArray = [...TOOLS, ...TOOLS, ...TOOLS];
  return (
    <section className="py-10 border-y border-[var(--border)] bg-[#050505] overflow-hidden">
      <div className="ticker-wrap-new w-full">
        <div className="ticker-track-new">
          {toolsArray.map((t, idx) => (
            <div key={`t1-${idx}`} className="flex items-center gap-4 px-8 md:px-12 group opacity-40 hover:opacity-100 transition-opacity duration-300 cursor-default">
              <img src={t.svg} alt={t.name} className="w-8 h-8 filter grayscale group-hover:grayscale-0 transition-all duration-300" loading="lazy" />
              <span className="font-display font-medium text-xl whitespace-nowrap">{t.name}</span>
              <span className="text-[var(--text-3)] px-4">/</span>
            </div>
          ))}
        </div>
        <div className="ticker-track-new" aria-hidden="true">
          {toolsArray.map((t, idx) => (
            <div key={`t2-${idx}`} className="flex items-center gap-4 px-8 md:px-12 group opacity-40 hover:opacity-100 transition-opacity duration-300 cursor-default">
              <img src={t.svg} alt={t.name} className="w-8 h-8 filter grayscale group-hover:grayscale-0 transition-all duration-300" loading="lazy" />
              <span className="font-display font-medium text-xl whitespace-nowrap">{t.name}</span>
              <span className="text-[var(--text-3)] px-4">/</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════
   PERSONAL SECTION  (terminal-frame About)
   ═══════════════════════════════════════ */
function PersonalSection() {
  return (
    <section id="about" className="py-24 md:py-32 px-6 bg-[var(--bg)] relative">
      <div className="max-w-[1000px] mx-auto">
        <SectionHeading
          subtitle="// whoami"
          title="About me, briefly."
        />

        <motion.div
          initial={{ opacity: 0, y: 40, filter: "blur(8px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="terminal-frame rounded-2xl border border-[var(--border)] bg-[#0A0A0A] overflow-hidden shadow-2xl"
        >
          {/* Window chrome */}
          <div className="flex items-center gap-2 px-5 py-3 border-b border-[var(--border)] bg-[#050505]">
            <span className="w-3 h-3 rounded-full bg-[#ff5f57]" />
            <span className="w-3 h-3 rounded-full bg-[#febc2e]" />
            <span className="w-3 h-3 rounded-full bg-[#28c840]" />
            <span className="ml-4 font-mono-dm text-xs text-[var(--text-3)]">~/david — about.md</span>
          </div>

          {/* Body */}
          <div className="p-6 md:p-10 font-mono-dm text-[15px] leading-relaxed text-[var(--text-2)] space-y-5">
            <div>
              <span className="text-[var(--accent)]">david@portfolio</span>
              <span className="text-white">:</span>
              <span className="text-[#69b6ff]">~</span>
              <span className="text-white">$ </span>
              <span className="text-white">cat about.md</span>
            </div>

            <p>
              Hii! I'm <span className="text-white font-semibold">David</span>, a 2nd-year AI Engineering student at <span className="text-white">Xiamen University Malaysia</span>.
            </p>

            <p>
              Most days I'm <span className="text-white">exploring the latest AI trends and tools</span>,<span className="text-white">backend engineering</span>, <span className="text-white">agentic workflows</span>, and I’m a firm believer in <span className="text-white">learning by doing</span>—building, breaking, and iterating until it works.
            </p>

            <p>
              When I'm not working on something, I'm probably playing video games, sleeping, or hunting down the next late-night food near campus.
            </p>

            <p>
              Feel free to reach out — I'm <span className="text-[var(--accent)]">open to 2026 remote ML/AI internship roles</span> and the occasional weekend collab.
            </p>

            <div className="pt-2">
              <span className="text-[var(--accent)]">david@portfolio</span>
              <span className="text-white">:</span>
              <span className="text-[#69b6ff]">~</span>
              <span className="text-white">$ </span>
              <span className="terminal-caret" />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════
   EXPERIENCE TIMELINE
   ═══════════════════════════════════════ */
function ExperienceTimeline() {
  return (
    <section id="experience" className="py-24 md:py-32 px-6 bg-[var(--bg)]">
      <div className="max-w-[1000px] mx-auto">
        <SectionHeading subtitle="Experience" title="What I've been building" />

        <div className="relative border-l border-[var(--border)] ml-4 md:ml-[150px]">
          {EXPERIENCE.map((exp, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -50, filter: "blur(10px)", scale: 0.95 }}
              whileInView={{ opacity: 1, x: 0, filter: "blur(0px)", scale: 1 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 1, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="relative pl-6 md:pl-12 pb-16 group"
            >
              <div className="absolute top-0 left-[-7px] w-3 h-3 rounded-full bg-[var(--text-3)] border-4 border-black group-hover:bg-white transition-colors" />
              <div className="absolute top-[-4px] left-[-11px] w-5 h-5 rounded-full bg-[var(--accent)] opacity-0 group-hover:opacity-100 transition-opacity blur-[6px]" />

              <div className="flex flex-col md:flex-row md:items-baseline gap-2 md:gap-6 mb-4">
                <span className="font-mono-dm text-[13px] text-[var(--accent)] tracking-widest uppercase">{exp.year}</span>
                <span className="font-mono-dm text-[11px] border border-[var(--border)] rounded px-3 py-1 max-w-max text-[var(--text-2)] uppercase">{exp.company}</span>
              </div>

              <h3 className="font-display font-bold text-2xl md:text-3xl mb-4 text-white">{exp.role}</h3>
              <p className="text-[var(--text-2)] text-base md:text-lg leading-relaxed max-w-[600px]">{exp.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════
   PROJECT CARD  (mouse-spotlight + expandable)
   ═══════════════════════════════════════ */
function ProjectCard({ project, idx }) {
  const [open, setOpen] = useState(false);
  const cardRef = useRef(null);
  const [pos, setPos] = useState({ x: -200, y: -200 });

  const handleMove = (e) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMove}
      onMouseLeave={() => setPos({ x: -200, y: -200 })}
      initial={{ opacity: 0, y: 100, scale: 0.95, filter: "blur(10px)" }}
      whileInView={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-15%" }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      className="relative w-full glass-card rounded-[2rem] overflow-hidden border border-[var(--border)] shadow-2xl backdrop-blur-2xl bg-[#070707] group"
    >
      {/* Mouse spotlight */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 transition-opacity duration-500 opacity-0 group-hover:opacity-100"
        style={{
          background: `radial-gradient(420px circle at ${pos.x}px ${pos.y}px, rgba(255,90,54,0.12), transparent 60%)`,
        }}
      />

      {/* Ghost number */}
      <div className="absolute top-6 right-8 font-display font-bold text-[120px] md:text-[180px] leading-none text-white/[0.025] select-none pointer-events-none">
        {String(idx + 1).padStart(2, '0')}
      </div>

      <div className="relative p-8 md:p-12 flex flex-col md:flex-row gap-8 md:gap-16">
        <div className="flex-1 flex flex-col justify-between z-10 min-w-0">
          <div>
            <div className="flex items-start justify-between gap-4 mb-6 md:mb-8">
              <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-[#050505] border border-[var(--border)] flex items-center justify-center text-[var(--accent)] shadow-xl group-hover:scale-110 group-hover:border-[var(--accent)] transition-all duration-500">
                {project.icon}
              </div>
              <div className="flex flex-col items-end gap-1.5">
                <span className="font-mono-dm text-[11px] text-[var(--text-3)] uppercase tracking-widest">{project.year}</span>
                <span className="font-mono-dm text-[10px] text-[var(--text-2)] border border-[var(--border)] rounded-full px-3 py-1 uppercase tracking-wider">{project.role}</span>
              </div>
            </div>

            <p className="font-mono-dm text-[11px] text-[var(--accent)] uppercase tracking-[0.25em] mb-3">{project.category}</p>
            <h3 className="font-display font-bold text-3xl md:text-5xl mb-4 text-white group-hover:text-[var(--accent)] transition-colors">
              {project.title}
            </h3>
            <p className="text-[var(--text-2)] text-base md:text-lg leading-relaxed max-w-xl">{project.desc}</p>

            <AnimatePresence initial={false}>
              {open && (
                <motion.ul
                  initial={{ height: 0, opacity: 0, marginTop: 0 }}
                  animate={{ height: 'auto', opacity: 1, marginTop: 24 }}
                  exit={{ height: 0, opacity: 0, marginTop: 0 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="overflow-hidden border-l-2 border-[var(--accent)]/40 pl-5 space-y-3"
                >
                  {project.bullets.map((b, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 + i * 0.06 }}
                      className="text-[var(--text-2)] text-sm md:text-base leading-relaxed flex gap-3"
                    >
                      <ChevronRight size={14} className="mt-1.5 flex-shrink-0 text-[var(--accent)]" />
                      <span>{b}</span>
                    </motion.li>
                  ))}
                </motion.ul>
              )}
            </AnimatePresence>
          </div>

          <div className="flex flex-wrap gap-2 mt-8">
            {project.tags.map((tag) => (
              <span key={tag} className="px-3.5 py-1.5 rounded-full border border-[var(--border)] text-xs font-mono-dm text-[var(--text-2)] bg-black/50">
                {tag}
              </span>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-4 mt-8">
            <button
              onClick={() => setOpen((v) => !v)}
              data-hover="true"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-[var(--border)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors font-mono-dm text-xs tracking-widest uppercase text-[var(--text-1)]"
            >
              {open ? <Minus size={14} /> : <Plus size={14} />}
              {open ? 'Hide details' : 'View details'}
            </button>
            <a
              href={project.url}
              target="_blank"
              rel="noreferrer"
              data-hover="true"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-[var(--border)] hover:border-white hover:text-white transition-colors font-mono-dm text-xs tracking-widest uppercase text-[var(--text-2)]"
            >
              <Github size={14} /> Source
            </a>
          </div>
        </div>

        <div className="md:w-[320px] flex flex-col justify-between items-start md:items-end z-10 pt-8 md:pt-0 border-t md:border-t-0 md:border-l border-[var(--border)] md:pl-12">
          <div className="w-12 h-12 md:w-14 md:h-14 rounded-full border border-[var(--border)] flex items-center justify-center backdrop-blur-md group-hover:bg-white group-hover:text-black transition-colors duration-300 self-end mb-8 md:mb-0">
            <ArrowUpRight size={22} />
          </div>

          <div className="w-full md:text-right mt-auto space-y-6">
            <div>
              <p className="text-4xl md:text-6xl font-display font-bold text-white mb-2 group-hover:text-[var(--accent)] transition-colors leading-none">{project.metric}</p>
              <p className="text-[var(--text-3)] font-mono-dm text-xs uppercase tracking-widest">{project.metricLabel}</p>
            </div>
            <div className="pt-4 border-t border-[var(--border)]/60">
              <p className="text-2xl md:text-3xl font-display font-semibold text-white/80 mb-1 leading-none">{project.secondaryMetric}</p>
              <p className="text-[var(--text-3)] font-mono-dm text-[10px] uppercase tracking-widest">{project.secondaryLabel}</p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════
   PROJECTS GALLERY
   ═══════════════════════════════════════ */
function ProjectsGallery() {
  return (
    <section id="work" className="bg-[#0A0A0A] w-full py-24 md:py-32 relative z-10 border-t border-[var(--border)]">
      <div className="max-w-[1200px] mx-auto px-6 md:px-12 w-full mb-16 md:mb-24">
        <SectionHeading
          subtitle="Selected Works"
          title="Three projects, end-to-end."
          description="Real systems with real metrics — not demo widgets. Each one shipped, with the bullet-point story behind it."
        />
      </div>

      <div className="relative w-full max-w-[1200px] mx-auto px-6 md:px-12 pb-16 flex flex-col gap-10 md:gap-16">
        {PROJECTS.map((project, idx) => (
          <ProjectCard key={project.title} project={project} idx={idx} />
        ))}
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════
   EDUCATION  (ongoing — progress ring)
   ═══════════════════════════════════════ */
function EducationSection() {
  // Progress through 4-year degree (Sept 2024 → Sept 2028)
  const start = new Date('2024-09-01').getTime();
  const end = new Date('2028-09-01').getTime();
  const now = Date.now();
  const pct = Math.max(0, Math.min(1, (now - start) / (end - start)));
  const circumference = 2 * Math.PI * 56;
  const dashOffset = circumference * (1 - pct);

  return (
    <section id="education" className="py-20 md:py-32 px-4 sm:px-6 bg-[var(--bg)] border-t border-[var(--border)]">
      <div className="max-w-[1100px] mx-auto">
        <SectionHeading subtitle="Education" title="Still in the loop." />

        <motion.div
          initial={{ opacity: 0, y: 50, filter: "blur(8px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="rounded-3xl border border-[var(--border)] bg-[#0A0A0A] p-6 sm:p-8 md:p-12 flex flex-col md:flex-row gap-8 md:gap-16 items-start"
        >
          {/* Progress ring */}
          <div className="relative w-[120px] h-[120px] sm:w-[150px] sm:h-[150px] flex-shrink-0 self-center md:self-start">
            <svg viewBox="0 0 130 130" className="w-full h-full -rotate-90">
              <circle cx="65" cy="65" r="56" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="6" />
              <motion.circle
                cx="65" cy="65" r="56" fill="none" stroke="var(--accent)" strokeWidth="6" strokeLinecap="round"
                strokeDasharray={circumference}
                initial={{ strokeDashoffset: circumference }}
                whileInView={{ strokeDashoffset: dashOffset }}
                viewport={{ once: true }}
                transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <span className="font-display font-bold text-3xl text-white">{Math.round(pct * 100)}%</span>
              <span className="font-mono-dm text-[10px] uppercase tracking-widest text-[var(--text-3)]">in progress</span>
            </div>
          </div>

          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <GraduationCap size={18} className="text-[var(--accent)]" />
              <span className="font-mono-dm text-[10px] sm:text-[11px] uppercase tracking-widest text-[var(--text-3)]">{EDUCATION.start} — Expected {EDUCATION.expected}</span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-[var(--accent)]/40 bg-[var(--accent-dim)] text-[10px] font-mono-dm text-[var(--accent)] uppercase tracking-widest">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] animate-pulse" /> Ongoing
              </span>
            </div>

            <h3 className="font-display font-bold text-2xl sm:text-3xl md:text-4xl text-white mb-2">{EDUCATION.degree}</h3>
            <p className="text-[var(--text-2)] mb-1">{EDUCATION.school} <span className="text-[var(--text-3)]">— {EDUCATION.location}</span></p>
            <p className="text-[var(--accent)] font-mono-dm text-sm mb-6">GPA {EDUCATION.gpa}</p>

            <ul className="grid sm:grid-cols-2 gap-3">
              {EDUCATION.highlights.map((h) => (
                <li key={h} className="flex items-start gap-2 text-[var(--text-2)] text-sm">
                  <ChevronRight size={14} className="mt-1 text-[var(--accent)] flex-shrink-0" />
                  <span>{h}</span>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════
   AWARDS  (tilted polaroid badges)
   ═══════════════════════════════════════ */
function AwardsSection() {
  return (
    <section id="awards" className="py-20 md:py-32 px-4 sm:px-6 bg-[#050505] border-t border-[var(--border)]">
      <div className="max-w-[1100px] mx-auto">
        <SectionHeading subtitle="Recognition" title="Awards & competitions" />

        <div className="grid md:grid-cols-2 gap-8 md:gap-10">
          {AWARDS.map((a, idx) => (
            <motion.div
              key={a.title}
              initial={{ opacity: 0, y: 50, rotate: idx % 2 === 0 ? -2 : 2, filter: "blur(8px)" }}
              whileInView={{ opacity: 1, y: 0, rotate: idx % 2 === 0 ? -1.5 : 1.5, filter: "blur(0px)" }}
              whileHover={{ rotate: 0, y: -6, scale: 1.02 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.9, delay: idx * 0.12, ease: [0.16, 1, 0.3, 1] }}
              className="relative rounded-2xl border border-[var(--border)] bg-[#0A0A0A] p-8 shadow-2xl overflow-hidden group"
            >
              {/* corner glow */}
              <div className="absolute -top-20 -right-20 w-60 h-60 bg-[var(--accent)] opacity-[0.08] blur-[80px] rounded-full pointer-events-none" />

              <div className="flex items-center justify-between mb-6">
                <div className="w-12 h-12 rounded-xl bg-[#050505] border border-[var(--border)] flex items-center justify-center text-[var(--accent)]">
                  {a.icon}
                </div>
                <span className="font-mono-dm text-[11px] uppercase tracking-widest text-[var(--text-3)]">{a.date}</span>
              </div>

              <p className="font-display font-bold text-2xl md:text-3xl text-[var(--accent)] mb-2">{a.place}</p>
              <h3 className="font-display font-semibold text-xl text-white mb-1">{a.title}</h3>
              <p className="font-mono-dm text-[11px] uppercase tracking-widest text-[var(--text-3)] mb-5">{a.org}</p>
              <p className="text-[var(--text-2)] text-sm leading-relaxed">{a.note}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════
   SKILLS & SERVICES
   ═══════════════════════════════════════ */
function SkillsGrid() {
  return (
    <section className="py-20 md:py-32 px-4 sm:px-6 border-t border-[var(--border)] bg-[#050505]">
      <div className="max-w-[1200px] mx-auto">
        <SectionHeading subtitle="Capabilities" title="Skills & technologies" align="center" />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10">
          {CORE_COMPETENCIES.map((comp, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 50, scale: 0.95, filter: "blur(10px)" }}
              whileInView={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 1, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="p-8 border border-[var(--border)] rounded-3xl bg-[#0A0A0A] hover:bg-black/80 hover:border-white/20 transition-colors duration-500 group"
            >
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 rounded-xl bg-[#050505] border border-[var(--border)] flex items-center justify-center text-[var(--accent)]">
                  {comp.icon}
                </div>
                <h3 className="font-display font-bold text-2xl text-white">{comp.title}</h3>
              </div>
              <ul className="flex flex-col gap-4">
                {comp.items.map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-[var(--text-2)] group-hover:text-white transition-colors duration-500" style={{ transitionDelay: `${i * 50}ms` }}>
                    <ChevronRight size={14} className="text-[var(--accent)] opacity-50" />
                    <span className="font-medium text-base">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════
   CTA SECTION
   ═══════════════════════════════════════ */
function CTASection() {
  return (
    <section className="py-24 md:py-48 px-5 sm:px-6 relative overflow-hidden bg-[var(--bg)] border-t border-[var(--border)]">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[800px] h-[800px] bg-[var(--accent)] blur-[250px] opacity-[0.05] rounded-full pointer-events-none" />

      <div className="max-w-[800px] mx-auto text-center relative z-10">
        <motion.p
          initial={{ opacity: 0, y: 30, filter: "blur(5px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="font-mono-dm text-xs tracking-widest uppercase text-[var(--accent)] mb-6"
        >
          // open for opportunities
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 50, scale: 0.95, filter: "blur(15px)" }}
          whileInView={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="font-display font-bold text-4xl sm:text-5xl md:text-7xl mb-6 md:mb-8 tracking-tight text-white"
        >
          Let's build <br /> something useful.
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-[var(--text-2)] text-base sm:text-lg md:text-xl mb-10 md:mb-12 max-w-[600px] mx-auto leading-relaxed"
        >
          I'm looking for 2026 summer internships in AI / backend engineering and the occasional weekend collab — my DMs are open.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.95, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row items-center justify-center gap-6"
        >
          <LiquidMetalButton viewMode="text" label="Send an Email" onClick={() => window.location.href = 'mailto:davidk.academic@gmail.com'} />
          <a href="https://linkedin.com" target="_blank" className="font-mono-dm text-sm tracking-widest uppercase text-white hover:text-[var(--accent)] transition-colors underline underline-offset-8" data-hover="true">
            LinkedIn Profile
          </a>
        </motion.div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════
   FOOTER
   ═══════════════════════════════════════ */
function Footer() {
  return (
    <footer id="contact" className="pt-16 pb-16 sm:pb-12 px-4 sm:px-6 bg-[#030303] relative z-20 overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[var(--border)] to-transparent" />

      <div className="max-w-[1200px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 sm:gap-12 mb-12 sm:mb-16">
        <div className="col-span-2 md:col-span-2">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 rounded bg-[#111] border border-[var(--border)] flex items-center justify-center text-[var(--accent)]">
              <Code size={16} />
            </div>
            <span className="font-display font-bold text-xl text-white">David Kurniawan.</span>
          </div>
          <p className="text-[var(--text-3)] max-w-sm text-base leading-relaxed">
            AI engineering student. Building agents, ML pipelines, and the backend plumbing that holds them together.
          </p>
        </div>

        <div>
          <h4 className="font-mono-dm text-white tracking-widest uppercase text-xs mb-6">Navigation</h4>
          <ul className="flex flex-col gap-4">
            {[
              { label: 'About', id: 'about' },
              { label: 'Experience', id: 'experience' },
              { label: 'Work', id: 'work' },
              { label: 'Awards', id: 'awards' },
            ].map((link) => (
              <li key={link.id}>
                <button onClick={() => document.getElementById(link.id)?.scrollIntoView({ behavior: 'smooth' })} className="text-[var(--text-2)] hover:text-white transition-colors font-medium">
                  {link.label}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-mono-dm text-white tracking-widest uppercase text-xs mb-6">Hub</h4>
          <ul className="flex flex-col gap-4">
            <li><a href="https://github.com/LouSens" target="_blank" className="text-[var(--text-2)] hover:text-[var(--text-1)] transition-colors flex items-center gap-2 group"><Github size={16} className="text-[var(--accent)] opacity-50 group-hover:opacity-100 transition-opacity" /> GitHub</a></li>
            <li><a href="https://linkedin.com" target="_blank" className="text-[var(--text-2)] hover:text-[var(--text-1)] transition-colors flex items-center gap-2 group"><Linkedin size={16} className="text-[var(--accent)] opacity-50 group-hover:opacity-100 transition-opacity" /> LinkedIn</a></li>
            <li><a href="mailto:davidk.academic@gmail.com" className="text-[var(--text-2)] hover:text-[var(--text-1)] transition-colors flex items-center gap-2 group"><Mail size={16} className="text-[var(--accent)] opacity-50 group-hover:opacity-100 transition-opacity" /> Contact</a></li>
          </ul>
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto pt-8 border-t border-[var(--border)] flex flex-col md:flex-row justify-between items-center gap-3 text-[10px] sm:text-[11px] font-mono-dm text-[var(--text-3)] uppercase tracking-widest text-center md:text-left">
        <p>© {new Date().getFullYear()} David Kurniawan. All rights reserved.</p>
        <p className="flex items-center gap-2">Built with React <Sparkles size={12} className="text-[var(--accent)]" /> Hosted on Vercel</p>
      </div>
    </footer>
  );
}
