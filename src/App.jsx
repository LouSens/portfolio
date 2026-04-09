import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';
import Lenis from 'lenis';
import { Github, Linkedin, Mail, ArrowUpRight, Code, Database, Sparkles, Server, Terminal, X, Menu, Download, ChevronRight } from 'lucide-react';
import { LiquidMetalButton } from '@/components/ui/liquid-metal-button';

/* ═══════════════════════════════════════
   DATA & CONTENT
   ═══════════════════════════════════════ */
const TOOLS = [
  { name: 'Python', svg: 'https://cdn.simpleicons.org/python/white' },
  { name: 'PyTorch', svg: 'https://cdn.simpleicons.org/pytorch/white' },
  { name: 'TensorFlow', svg: 'https://cdn.simpleicons.org/tensorflow/white' },
  { name: 'React', svg: 'https://cdn.simpleicons.org/react/white' },
  { name: 'FastAPI', svg: 'https://cdn.simpleicons.org/fastapi/white' },
  { name: 'Docker', svg: 'https://cdn.simpleicons.org/docker/white' },
  { name: 'PostgreSQL', svg: 'https://cdn.simpleicons.org/postgresql/white' },
  { name: 'LangChain', svg: 'https://cdn.simpleicons.org/langchain/white' },
];

const PROJECTS = [
  {
    title: 'Neural Void Platform',
    category: 'Full-stack AI',
    metric: 'R² 0.97',
    metricLabel: 'Accuracy',
    url: 'https://github.com/LouSens',
    tags: ['React', 'FastAPI', 'PyTorch'],
    desc: 'Full-stack platform built for real-time inference, featuring deep analytics dashboards and a custom dark-mode UI.',
    icon: <Sparkles size={32} />
  },
  {
    title: 'Agentic Inventory',
    category: 'Backend Workflow',
    metric: '< 1s',
    metricLabel: 'Latency',
    url: 'https://github.com/LouSens',
    tags: ['LangGraph', 'Gemini API', 'PostgreSQL'],
    desc: 'An automated orchestrator that handles the entire inventory lifecycle and manages automated purchase order fulfillment.',
    icon: <Database size={32} />
  },
  {
    title: 'TikTok Behavioral Analytics',
    category: 'Data Engineering',
    metric: '50M+',
    metricLabel: 'Events/sec',
    url: 'https://github.com/LouSens',
    tags: ['Python', 'Transformers'],
    desc: 'A robust data pipeline for tracking interaction velocity and identifying user binge patterns through session-based features.',
    icon: <Server size={32} />
  },
  {
    title: 'Semantic Search Hub',
    category: 'NLP',
    metric: '94%',
    metricLabel: 'Recall@10',
    url: 'https://github.com/LouSens',
    tags: ['FAISS', 'Embeddings'],
    desc: 'Vector embedding search engine providing robust multi-domain analysis and fast nearest neighbor retrieval.',
    icon: <Terminal size={32} />
  },
  {
    title: 'Audio Transcription Pipeline',
    category: 'Machine Learning',
    metric: '4.2%',
    metricLabel: 'WER',
    url: 'https://github.com/LouSens',
    tags: ['Whisper', 'ONNX'],
    desc: 'Production-grade speech-to-text integration designed to handle highly noisy acoustic environments reliably.',
    icon: <Code size={32} />
  },
];

const EXPERIENCE = [
  {
    year: '2024 - Present',
    role: 'AI & Machine Learning Engineer',
    company: 'Independent / Contract',
    desc: 'Building and deploying LLM tools, semantic search engines, and computer vision models to production. Bridging the gap between heavy backend pipelines and clean frontend interfaces.',
  },
  {
    year: '2023 - 2024',
    role: 'Deep Learning Researcher',
    company: 'Academic & Open Source',
    desc: 'Researched multimodal architectures. Improved recall on vector search engines to 94% and optimized generative pipelines to cut overall latency by 40%.',
  },
  {
    year: '2022 - 2023',
    role: 'Data Scientist',
    company: 'Various Platforms',
    desc: 'Built statistical prediction models. Developed customer churn predictors using XGBoost, which directly improved targeted retention strategies by over 20%.',
  },
  {
    year: '2022',
    role: 'BEng Artificial Intelligence',
    company: 'Xiamen University Malaysia',
    desc: 'Graduated with strong foundations in linear algebra, multivariable calculus, and probability theory, translating math directly into ML algorithms.',
  }
];

const CORE_COMPETENCIES = [
  { title: 'Machine Learning', items: ['Deep Neural Networks', 'Transformer Architectures', 'Computer Vision', 'NLP & LLM Tuning', 'Time-series Forecasting'] },
  { title: 'Software Engineering', items: ['React / Next.js', 'FastAPI / Python', 'REST & GraphQL', 'State Management', 'System Architecture'] },
  { title: 'Data & Cloud', items: ['PostgreSQL / Vector DBs', 'Docker & Containers', 'AWS / Vertex AI', 'CI/CD Pipelines', 'Model Deployment'] }
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
        <ExperienceTimeline />
        <ProjectsGallery />
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
    { label: 'Experience', id: 'experience' },
    { label: 'Work', id: 'work' },
    { label: 'Contact', id: 'contact' }
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
            <span className="font-display font-bold tracking-tight text-xl hidden sm:block">AI Engineer</span>
          </button>

          <div className="hidden md:flex items-center gap-10">
            {links.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className="text-[var(--text-2)] hover:text-white transition-colors text-sm uppercase tracking-widest font-mono-dm"
              >
                {link.label}
              </button>
            ))}
            <a href="/RESUME.pdf" target="_blank" className="flex items-center gap-2 px-6 py-2.5 rounded-full border border-[var(--border)] hover:border-[var(--accent)] hover:bg-[var(--accent-dim)] transition-all font-mono-dm text-xs tracking-wider uppercase" data-hover="true">
              Resume <ArrowUpRight size={14} />
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
            <a href="/RESUME.pdf" target="_blank" className="mt-8 px-8 py-3 bg-white text-black font-mono-dm tracking-widest text-sm rounded-full flex items-center gap-2">
              DOWNLOAD RESUME <Download size={16} />
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

/* ═══════════════════════════════════════
   HERO
   ═══════════════════════════════════════ */
function Hero() {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 1000], [0, 300]);
  const y2 = useTransform(scrollY, [0, 1000], [0, 150]);
  const opacity = useTransform(scrollY, [0, 500], [1, 0]);

  return (
    <section className="relative min-h-screen flex items-center justify-center px-6 pt-24 pb-12">
      <motion.div style={{ y: y1, opacity }} className="relative z-10 w-full max-w-[1200px] flex flex-col items-center text-center">

        <motion.div
          initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}
          className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-[var(--border)] bg-[rgba(20,20,20,0.6)] backdrop-blur-md mb-8 shadow-2xl shadow-[var(--accent-dim)]"
        >
          <span className="w-2 h-2 rounded-full bg-[var(--accent)] animate-pulse" />
          <span className="text-xs font-mono-dm text-[var(--text-2)] uppercase tracking-widest">Available for work</span>
        </motion.div>

        <motion.h1 style={{ y: y2 }} className="font-display font-bold text-5xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight mb-8">
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
          className="max-w-[650px] text-[var(--text-2)] text-lg md:text-xl mb-12 font-light leading-relaxed"
        >
          Focusing on building reliable backend systems, machine learning pipelines, and applications that scale.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.7 }}
          className="flex flex-col sm:flex-row items-center gap-8"
        >
          <LiquidMetalButton label="Explore Work" onClick={() => document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' })} />
          <a href="/RESUME.pdf" target="_blank" className="font-mono-dm text-sm tracking-widest uppercase text-[var(--text-1)] flex items-center gap-3 group px-4 py-2" data-hover="true">
            View Resume
            <span className="w-8 h-8 rounded-full border border-[var(--border)] flex items-center justify-center group-hover:border-[var(--accent)] group-hover:text-[var(--accent)] transition-colors">
              <ArrowUpRight size={14} />
            </span>
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ═══════════════════════════════════════
   MARQUEE
   ═══════════════════════════════════════ */
function Marquee() {
  const toolsArray = [...TOOLS, ...TOOLS, ...TOOLS]; // 3 copies ensure it visually overflows most screens
  return (
    <section className="py-10 border-y border-[var(--border)] bg-[#050505] overflow-hidden">
      <div className="ticker-wrap-new w-full">
        {/* Track 1 */}
        <div className="ticker-track-new">
          {toolsArray.map((t, idx) => (
            <div key={`t1-${idx}`} className="flex items-center gap-4 px-8 md:px-12 group opacity-40 hover:opacity-100 transition-opacity duration-300 cursor-default">
              <img src={t.svg} alt={t.name} className="w-8 h-8 filter grayscale group-hover:grayscale-0 transition-all duration-300" loading="lazy" />
              <span className="font-display font-medium text-xl whitespace-nowrap">{t.name}</span>
              <span className="text-[var(--text-3)] px-4">/</span>
            </div>
          ))}
        </div>
        {/* Track 2 (Duplicate for Seamless Loop) */}
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
   EXPERIENCE TIMELINE
   ═══════════════════════════════════════ */
function ExperienceTimeline() {
  return (
    <section id="experience" className="py-24 md:py-32 px-6 bg-[var(--bg)]">
      <div className="max-w-[1000px] mx-auto">
        <SectionHeading subtitle="Experience" title="Career Trajectory" />

        <div className="relative border-l border-[var(--border)] ml-4 md:ml-[150px]">
          {EXPERIENCE.map((exp, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -50, filter: "blur(10px)", scale: 0.95 }}
              whileInView={{ opacity: 1, x: 0, filter: "blur(0px)", scale: 1 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 1, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="relative pl-6 md:pl-12 group"
            >
              {/* Timeline Node */}
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
   VERTICAL STACKING PROJECTS GALLERY
   ═══════════════════════════════════════ */
function ProjectsGallery() {
  return (
    <section id="work" className="bg-[#0A0A0A] w-full py-24 md:py-32 relative z-10 border-t border-[var(--border)]">
      <div className="max-w-[1200px] mx-auto px-6 md:px-12 w-full mb-16 md:mb-24">
        <SectionHeading subtitle="Selected Works" title="Featured Projects" description="Recent work focusing on data engineering, machine learning pipelines, and full-stack applications." />
      </div>

      <div className="relative w-full max-w-[1200px] mx-auto px-6 md:px-12 pb-32 flex flex-col gap-16 md:gap-32">
        {PROJECTS.map((project, idx) => (
          <div
            key={idx}
            className="sticky w-full"
            style={{ top: `calc(15vh + ${idx * 30}px)` }}
          >
            <motion.a
              href={project.url}
              target="_blank"
              data-hover="true"
              initial={{ opacity: 0, y: 100, scale: 0.95, filter: "blur(10px)" }}
              whileInView={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
              viewport={{ once: true, margin: "-15%" }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="w-full glass-card rounded-[2rem] p-8 md:p-12 flex flex-col md:flex-row gap-8 md:gap-16 group overflow-hidden relative cursor-pointer block border border-[var(--border)] shadow-2xl backdrop-blur-2xl hover:border-[var(--accent)] transition-all duration-700 bg-[#070707]"
            >
              {/* Background gradient overlay */}
              <div className="absolute top-0 right-0 w-full md:w-1/2 h-full bg-gradient-to-l from-[var(--accent-dim)] to-transparent opacity-0 group-hover:opacity-10 transition-opacity duration-700 pointer-events-none" />

              <div className="flex-1 flex flex-col justify-between z-10">
                <div>
                  <div className="flex justify-between items-start mb-6 md:mb-8">
                    <div className="w-14 h-14 md:w-20 md:h-20 rounded-2xl bg-[#050505] border border-[var(--border)] flex items-center justify-center text-[var(--accent)] shadow-xl group-hover:scale-110 transition-transform duration-500">
                      {project.icon}
                    </div>
                  </div>

                  <h3 className="font-display font-bold text-3xl md:text-5xl mb-4 group-hover:text-[var(--accent)] transition-colors">{project.title}</h3>
                  <p className="text-[var(--text-2)] text-lg md:text-xl leading-relaxed max-w-xl">{project.desc}</p>
                </div>

                <div className="flex flex-wrap gap-2 mt-8 md:mt-12">
                  {project.tags.map(tag => (
                    <span key={tag} className="px-4 py-2 rounded-full border border-[var(--border)] text-xs md:text-sm font-mono-dm text-[var(--text-2)] bg-black/50">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="md:w-[350px] flex flex-col justify-between items-start md:items-end z-10 pt-8 md:pt-0 border-t md:border-t-0 md:border-l border-[var(--border)] md:pl-12 group-hover:border-[rgba(255,255,255,0.2)] transition-colors">
                <div className="w-12 h-12 md:w-14 md:h-14 rounded-full border border-[var(--border)] flex items-center justify-center backdrop-blur-md group-hover:bg-white group-hover:text-black transition-colors duration-300 self-end mb-8 md:mb-0">
                  <ArrowUpRight size={24} />
                </div>

                <div className="w-full md:text-right mt-auto">
                  <p className="text-4xl md:text-6xl font-display font-bold text-white mb-2 group-hover:text-[var(--accent)] transition-colors">{project.metric}</p>
                  <p className="text-[var(--text-3)] font-mono-dm text-xs md:text-sm uppercase tracking-widest">{project.metricLabel}</p>
                </div>
              </div>

            </motion.a>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════
   SKILLS & SERVICES
   ═══════════════════════════════════════ */
function SkillsGrid() {
  return (
    <section className="py-24 md:py-32 px-6 border-t border-[var(--border)] bg-[#050505]">
      <div className="max-w-[1200px] mx-auto">
        <SectionHeading subtitle="Capabilities" title="Skills & Technologies" align="center" />

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
              <h3 className="font-display font-bold text-2xl mb-8 text-white">{comp.title}</h3>
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
    <section className="py-32 md:py-48 px-6 relative overflow-hidden bg-[var(--bg)] border-t border-[var(--border)]">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[800px] h-[800px] bg-[var(--accent)] blur-[250px] opacity-[0.05] rounded-full pointer-events-none" />

      <div className="max-w-[800px] mx-auto text-center relative z-10">
        <motion.p
          initial={{ opacity: 0, y: 30, filter: "blur(5px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="font-mono-dm text-xs tracking-widest uppercase text-[var(--accent)] mb-6"
        >
          // Open for Opportunities
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 50, scale: 0.95, filter: "blur(15px)" }}
          whileInView={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="font-display font-bold text-5xl md:text-7xl mb-8 tracking-tight text-white"
        >
          Let's Build <br /> Something Great.
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-[var(--text-2)] text-lg md:text-xl mb-12 max-w-[600px] mx-auto leading-relaxed"
        >
          I'm currently looking for full-time roles in AI and Software Engineering. I'm also open to exciting freelance projects—let's chat.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.95, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row items-center justify-center gap-6"
        >
          <LiquidMetalButton viewMode="text" label="Send an Email" onClick={() => window.location.href = 'mailto:student@xmu.edu.my'} />
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
    <footer id="contact" className="pt-20 pb-12 px-6 bg-[#030303] relative z-20 overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[var(--border)] to-transparent" />

      <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
        <div className="md:col-span-2">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 rounded bg-[#111] border border-[var(--border)] flex items-center justify-center text-[var(--accent)]">
              <Code size={16} />
            </div>
            <span className="font-display font-bold text-xl text-white">David Kurniawan.</span>
          </div>
          <p className="text-[var(--text-3)] max-w-sm text-base leading-relaxed">
            Constructing the backend logic, model orchestration, and elegant interfaces for the future web.
          </p>
        </div>

        <div>
          <h4 className="font-mono-dm text-white tracking-widest uppercase text-xs mb-6">Navigation</h4>
          <ul className="flex flex-col gap-4">
            {['Home', 'Experience', 'Work'].map(link => (
              <li key={link}><button onClick={() => { document.getElementById(link.toLowerCase() === 'home' ? 'root' : link.toLowerCase())?.scrollIntoView({ behavior: 'smooth' }) }} className="text-[var(--text-2)] hover:text-white transition-colors font-medium">{link}</button></li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-mono-dm text-white tracking-widest uppercase text-xs mb-6">Hub</h4>
          <ul className="flex flex-col gap-4">
            <li><a href="https://github.com/LouSens" target="_blank" className="text-[var(--text-2)] hover:text-[var(--text-1)] transition-colors flex items-center gap-2 group"><Github size={16} className="text-[var(--accent)] opacity-50 group-hover:opacity-100 transition-opacity" /> GitHub</a></li>
            <li><a href="https://linkedin.com" target="_blank" className="text-[var(--text-2)] hover:text-[var(--text-1)] transition-colors flex items-center gap-2 group"><Linkedin size={16} className="text-[var(--accent)] opacity-50 group-hover:opacity-100 transition-opacity" /> LinkedIn</a></li>
            <li><a href="mailto:student@xmu.edu.my" className="text-[var(--text-2)] hover:text-[var(--text-1)] transition-colors flex items-center gap-2 group"><Mail size={16} className="text-[var(--accent)] opacity-50 group-hover:opacity-100 transition-opacity" /> Contact</a></li>
          </ul>
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto pt-8 border-t border-[var(--border)] flex flex-col md:flex-row justify-between items-center gap-4 text-[11px] font-mono-dm text-[var(--text-3)] uppercase tracking-widest">
        <p>© {new Date().getFullYear()} All rights reserved.</p>
        <p className="flex items-center gap-2">Built with React <Sparkles size={12} className="text-[var(--accent)]" /> Hosted on Vercel</p>
      </div>
    </footer>
  );
}