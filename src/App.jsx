import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useInView, useMotionValue, useSpring, useMotionTemplate } from 'framer-motion';
import {
  Github, Linkedin, Mail, Download, ArrowRight, Trophy, Sparkles, Search, CheckCircle2,
  Brain, Menu, X, ArrowUpRight, Layers, BarChart3, Mic,
  MessageSquare, ChevronDown, GraduationCap, Rocket, Target
} from 'lucide-react';

/* ═══════════════════════════════════════
   DATA
   ═══════════════════════════════════════ */
const TOOLS = [
  { name: 'Python', svg: 'https://cdn.simpleicons.org/python/white' },
  { name: 'PyTorch', svg: 'https://cdn.simpleicons.org/pytorch/white' },
  { name: 'TensorFlow', svg: 'https://cdn.simpleicons.org/tensorflow/white' },
  { name: 'scikit-learn', svg: 'https://cdn.simpleicons.org/scikitlearn/white' },
  { name: 'Pandas', svg: 'https://cdn.simpleicons.org/pandas/white' },
  { name: 'NumPy', svg: 'https://cdn.simpleicons.org/numpy/white' },
  { name: 'FastAPI', svg: 'https://cdn.simpleicons.org/fastapi/white' },
  { name: 'Docker', svg: 'https://cdn.simpleicons.org/docker/white' },
  { name: 'PostgreSQL', svg: 'https://cdn.simpleicons.org/postgresql/white' },
  { name: 'Git', svg: 'https://cdn.simpleicons.org/git/white' },
  { name: 'OpenCV', svg: 'https://cdn.simpleicons.org/opencv/white' },
  { name: 'HuggingFace', svg: 'https://cdn.simpleicons.org/huggingface/white' },
  { name: 'LangChain', svg: 'https://cdn.simpleicons.org/langchain/white' },
];

const PROJECTS = [
  { title: 'Multimodal Financial Sentiment Correlator', category: 'Deep Learning', metric: '0.97', metricLabel: 'R² Score', secondary: 'MSE: 0.024', url: 'https://github.com/LouSens/multimodal-financial-sentiment-correlator', tags: ['CNN', 'Transformer', 'PyTorch'], desc: 'Cross-modal analysis of financial text and market data via multi-head attention and convolutional feature fusion.', icon: <BarChart3 size={18} /> },
  { title: 'Customer Churn Predictor', category: 'Data Science', metric: '0.91', metricLabel: 'AUC', secondary: 'Precision: 88%', url: 'https://github.com/LouSens/customer-churn-predictor', tags: ['XGBoost', 'Pandas', 'Scikit-Learn'], desc: 'Enterprise classification identifying at-risk customers for targeted retention.', icon: <Layers size={18} /> },
  { title: 'LLM Prompt Optimizer', category: 'Generative AI', metric: '40%', metricLabel: 'Latency ↓', secondary: 'Token savings: 20%', url: 'https://github.com/LouSens/llm-prompt-optimizer', tags: ['LLM', 'LangChain', 'Python'], desc: 'Automated pipeline reducing token consumption through iterative prompt refinement.', icon: <Sparkles size={18} /> },
  { title: 'Audio Speech Recognition', category: 'Machine Learning', metric: '4.2%', metricLabel: 'WER', secondary: 'RTF: 0.8', url: 'https://github.com/LouSens/audio-speech-recognition', tags: ['Whisper', 'Librosa', 'ONNX'], desc: 'Production-grade speech-to-text across noisy acoustic environments.', icon: <Mic size={18} /> },
  { title: 'Sentiment Vector Space', category: 'NLP', metric: '0.88', metricLabel: 'F1 Score', secondary: '50K tokens', url: 'https://github.com/LouSens/sentiment-vector-space', tags: ['BERT', 'Transformers', 'HuggingFace'], desc: 'Dense embedding space for multi-domain sentiment analysis.', icon: <MessageSquare size={18} /> },
  { title: 'Semantic Search Engine', category: 'NLP', metric: '94%', metricLabel: 'Recall@10', secondary: 'Vector DB', url: 'https://github.com/LouSens/semantic-search-engine', tags: ['Embeddings', 'FAISS', 'Python'], desc: 'Vector embedding search with approximate nearest neighbor retrieval.', icon: <Search size={18} /> },
];

const TIMELINE = [
  { year: 'Now', title: 'AI & ML Engineering', sub: 'Production systems', desc: 'Deep learning pipelines, LLM integrations, and predictive models with measurable business impact.', icon: <Rocket size={16} />, stat: '7+ shipped' },
  { year: '2024', title: 'Deep Learning Research', sub: 'Multimodal & NLP', desc: 'Cross-modal sentiment analysis, transformer fine-tuning, semantic search with 94% recall.', icon: <Brain size={16} />, stat: 'F1: 0.88' },
  { year: '2023', title: 'Data Science', sub: 'Statistical modeling', desc: 'End-to-end pipelines, churn prediction, algorithmic forecasting with ensemble methods.', icon: <Target size={16} />, stat: 'AUC: 0.91' },
  { year: '2022', title: 'BEng Artificial Intelligence', sub: 'Xiamen University Malaysia', desc: 'Theoretical math, linear algebra, probability theory, applied ML fundamentals.', icon: <GraduationCap size={16} />, stat: 'Enrolled' },
];

const GEMINI_MODEL = 'gemini-1.5-flash';
const GEMINI_BASE = 'https://generativelanguage.googleapis.com/v1beta/models';
const SYS_PROMPT = `You are the AI embedded in David Huang's portfolio. Indonesian AI student pursuing BEng Artificial Intelligence at Xiamen University Malaysia (XMUM).
Skills: Python, TensorFlow, PyTorch, Pandas, NumPy, Scikit-Learn, FastAPI, Flask, C.
Projects: 1) Multimodal Financial Sentiment Correlator (R² 0.97, MSE 0.024). 2) Customer Churn Predictor (AUC 0.91, Precision 88%). 3) LLM Prompt Optimizer (Latency −40%, Token savings 20%). 4) Audio Speech Recognition (WER 4.2%, RTF 0.8). 5) Sentiment Vector Space (F1 0.88, 50K tokens). 6) Semantic Search Engine (Recall@10 94%, FAISS). 7) BTC Daily ML Pipeline.
Rules: Max 3 sentences. Knowledge base only. Unknown → "Outside my embedded knowledge scope. Please contact David directly."`;

async function askGemini(prompt, signal) {
  const key = import.meta.env.VITE_GEMINI_API_KEY;
  if (!key) throw new Error('API key missing');
  const res = await fetch(`${GEMINI_BASE}/${GEMINI_MODEL}:generateContent?key=${key}`, {
    method: 'POST', signal, headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }], systemInstruction: { parts: [{ text: SYS_PROMPT }] }, generationConfig: { maxOutputTokens: 250, temperature: 0.3 } }),
  });
  if (!res.ok) throw new Error(`${res.status}`);
  const d = await res.json();
  return d?.candidates?.[0]?.content?.parts?.[0]?.text || '';
}

/* ═══════════════════════════════════════
   MOTION
   ═══════════════════════════════════════ */
const ease = [0.16, 1, 0.3, 1];
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } } };
const fadeUp = { hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease } } };

/* ═══════════════════════════════════════
   SectionReveal — exact spec:
   useInView margin: -50px, y: 30→0,
   duration 0.8s, ease [0.16, 1, 0.3, 1]
   ═══════════════════════════════════════ */
function Reveal({ children, className = '', delay = 0 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay, ease }}
      className={className}>{children}</motion.div>
  );
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
    const move = e => { mx = e.clientX; my = e.clientY; d.style.left = mx + 'px'; d.style.top = my + 'px'; };
    const loop = () => { rx += (mx - rx) * 0.12; ry += (my - ry) * 0.12; r.style.left = rx + 'px'; r.style.top = ry + 'px'; requestAnimationFrame(loop); };
    const on = () => { d.classList.add('active'); r.classList.add('active'); };
    const off = () => { d.classList.remove('active'); r.classList.remove('active'); };

    document.addEventListener('mousemove', move);
    loop();

    const bind = () => {
      document.querySelectorAll('a, button, [data-hover]').forEach(el => {
        el.removeEventListener('mouseenter', on);
        el.removeEventListener('mouseleave', off);
        el.addEventListener('mouseenter', on);
        el.addEventListener('mouseleave', off);
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
   SCROLL PROGRESS
   ═══════════════════════════════════════ */
function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  return <motion.div style={{ scaleX: scrollYProgress }} className="scroll-progress" />;
}

/* ═══════════════════════════════════════
   AnimatedCounter — exact spec:
   easeOutCubic, rAF, useInView once
   ═══════════════════════════════════════ */
function Counter({ target, suffix = '', prefix = '', decimals = 0 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const num = parseFloat(target);
    const dur = 1200;
    const start = performance.now();
    const tick = now => {
      const p = Math.min((now - start) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3); // easeOutCubic
      setVal(eased * num);
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [inView, target]);

  return <span ref={ref}>{prefix}{decimals > 0 ? val.toFixed(decimals) : Math.round(val)}{suffix}</span>;
}

/* ═══════════════════════════════════════
   Magnetic — exact spec:
   strength: 0.3, stiffness: 400, damping: 30
   Disabled on mobile
   ═══════════════════════════════════════ */
function Magnetic({ children, className = '', strength = 0.3, ...props }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 400, damping: 30 });
  const sy = useSpring(y, { stiffness: 400, damping: 30 });
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    setIsDesktop(window.matchMedia('(hover: hover) and (pointer: fine)').matches);
  }, []);

  const handleMove = useCallback(e => {
    if (!isDesktop) return;
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    x.set((e.clientX - cx) * strength);
    y.set((e.clientY - cy) * strength);
  }, [x, y, strength, isDesktop]);

  const reset = useCallback(() => { x.set(0); y.set(0); }, [x, y]);

  return (
    <motion.div ref={ref} style={{ x: sx, y: sy }}
      onMouseMove={handleMove} onMouseLeave={reset}
      className={`inline-block ${className}`} {...props}
    >{children}</motion.div>
  );
}

/* ═══════════════════════════════════════
   TiltCard — exact spec:
   perspective: 900, stiffness: 180, damping: 22,
   ±7deg rotateX/Y, glare layer with
   useMotionTemplate radial gradient
   ═══════════════════════════════════════ */
function TiltCard({ children, className = '' }) {
  const ref = useRef(null);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const mouseX = useMotionValue(50);
  const mouseY = useMotionValue(50);
  const sRx = useSpring(rotateX, { stiffness: 180, damping: 22 });
  const sRy = useSpring(rotateY, { stiffness: 180, damping: 22 });

  // Glare — radial gradient following cursor
  const glare = useMotionTemplate`radial-gradient(circle at ${mouseX}% ${mouseY}%, rgba(255,255,255,0.05) 0%, transparent 60%)`;

  const onMove = useCallback(e => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    rotateY.set((px - 0.5) * 14);  // ±7deg
    rotateX.set(-(py - 0.5) * 14); // ±7deg
    mouseX.set(px * 100);
    mouseY.set(py * 100);
  }, [rotateX, rotateY, mouseX, mouseY]);

  const onLeave = useCallback(() => {
    rotateX.set(0); rotateY.set(0);
    mouseX.set(50); mouseY.set(50);
  }, [rotateX, rotateY, mouseX, mouseY]);

  return (
    <motion.div ref={ref} onMouseMove={onMove} onMouseLeave={onLeave}
      style={{ rotateX: sRx, rotateY: sRy, transformPerspective: 900 }}
      className={`tilt-card relative ${className}`}
    >
      {children}
      {/* Glare layer */}
      <motion.div style={{ background: glare }} className="tilt-glare" />
    </motion.div>
  );
}

/* ═══════════════════════════════════════
   Typewriter — character by character
   with blinking ▊ cursor in orange
   ═══════════════════════════════════════ */
function Typewriter({ text, speed = 18 }) {
  const [displayed, setDisplayed] = useState('');
  const [done, setDone] = useState(false);

  useEffect(() => {
    setDisplayed('');
    setDone(false);
    if (!text) return;
    let i = 0;
    const id = setInterval(() => {
      i++;
      setDisplayed(text.slice(0, i));
      if (i >= text.length) { clearInterval(id); setDone(true); }
    }, speed);
    return () => clearInterval(id);
  }, [text, speed]);

  return (
    <span>
      {displayed}
      {!done && <span className="typewriter-cursor">▊</span>}
    </span>
  );
}

/* ═══════════════════════════════════════
   PARTICLES — subtle mesh
   ═══════════════════════════════════════ */
function Particles() {
  const ref = useRef(null);
  useEffect(() => {
    const c = ref.current; if (!c) return;
    const ctx = c.getContext('2d'); let w, h, id;
    const resize = () => { w = c.width = window.innerWidth; h = c.height = window.innerHeight; };
    resize(); window.addEventListener('resize', resize);
    const N = Math.min(35, Math.floor(w / 40));
    const pts = Array.from({ length: N }, () => ({ x: Math.random() * w, y: Math.random() * h, vx: (Math.random() - 0.5) * 0.18, vy: (Math.random() - 0.5) * 0.18, r: Math.random() * 1.2 + 0.3 }));
    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      for (const p of pts) { p.x += p.vx; p.y += p.vy; if (p.x < 0) p.x = w; if (p.x > w) p.x = 0; if (p.y < 0) p.y = h; if (p.y > h) p.y = 0; }
      for (let i = 0; i < N; i++) for (let j = i + 1; j < N; j++) {
        const dx = pts[i].x - pts[j].x, dy = pts[i].y - pts[j].y, d = Math.sqrt(dx * dx + dy * dy);
        if (d < 120) { ctx.beginPath(); ctx.moveTo(pts[i].x, pts[i].y); ctx.lineTo(pts[j].x, pts[j].y); ctx.strokeStyle = `rgba(255,255,255,${0.025 * (1 - d / 120)})`; ctx.lineWidth = 0.5; ctx.stroke(); }
      }
      for (const p of pts) { ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fillStyle = 'rgba(255,255,255,0.03)'; ctx.fill(); }
      id = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(id); window.removeEventListener('resize', resize); };
  }, []);
  return <canvas ref={ref} className="absolute inset-0 w-full h-full pointer-events-none z-[1]" />;
}

/* ═══════════════════════════════════════
   APP
   ═══════════════════════════════════════ */
export default function App() {
  return (
    <div className="relative min-h-screen bg-[var(--bg)]">
      <Cursor />
      <ScrollProgress />
      <Nav />
      <main>
        <Hero />
        <About />
        <Work />
        <Assistant />
        <Footer />
      </main>
    </div>
  );
}

/* ═══════════════════════════════════════
   NAV
   ═══════════════════════════════════════ */
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => { const fn = () => setScrolled(window.scrollY > 40); window.addEventListener('scroll', fn, { passive: true }); return () => window.removeEventListener('scroll', fn); }, []);
  useEffect(() => { document.body.style.overflow = open ? 'hidden' : ''; return () => { document.body.style.overflow = ''; }; }, [open]);
  const go = id => { setOpen(false); document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }); };
  const links = [{ label: 'About', id: 'about' }, { label: 'Work', id: 'work' }, { label: 'AI', id: 'assistant' }, { label: 'Contact', id: 'contact' }];

  return (
    <>
      <motion.nav initial={{ y: -40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.8, delay: 0.1, ease }}
        className={`fixed top-0 w-full z-50 transition-all duration-500 ${scrolled ? 'bg-[var(--bg)]/85 backdrop-blur-xl border-b border-[var(--border)] py-3' : 'bg-transparent py-5'}`}>
        <div className="max-w-[1100px] mx-auto px-6 sm:px-8 flex justify-between items-center">
          <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="font-display font-bold text-[15px] text-[var(--text-1)] tracking-tight">David Huang</button>
          <div className="hidden md:flex items-center gap-8">
            {links.map(l => <button key={l.id} onClick={() => go(l.id)} className="nav-link text-[13px] py-1">{l.label}</button>)}
            <Magnetic><a href="/RESUME.pdf" target="_blank" rel="noopener noreferrer" className="btn-primary px-5 py-2 text-[13px] inline-block" data-hover>Resume</a></Magnetic>
          </div>
          <button onClick={() => setOpen(v => !v)} className="md:hidden w-10 h-10 flex items-center justify-center text-[var(--text-1)] rounded-lg border border-[var(--border)]" aria-label="Menu">
            <AnimatePresence mode="wait">
              {open ? <motion.div key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}><X size={18} /></motion.div>
                : <motion.div key="m" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}><Menu size={18} /></motion.div>}
            </AnimatePresence>
          </button>
        </div>
      </motion.nav>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-[var(--bg)]/98 backdrop-blur-2xl md:hidden flex flex-col items-center justify-center gap-3">
            {links.map((l, i) => (
              <motion.button key={l.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06, ease }}
                onClick={() => go(l.id)} className="font-display text-2xl text-[var(--text-2)] hover:text-[var(--text-1)] font-semibold py-2 transition-colors">{l.label}</motion.button>
            ))}
            <motion.a initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
              href="/RESUME.pdf" target="_blank" className="mt-6 btn-primary px-8 py-3 text-base font-bold">Resume</motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

/* ═══════════════════════════════════════
   HERO — Compact heading, above-fold stats,
   atmospheric depth, parallax
   ═══════════════════════════════════════ */
function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const orbY = useTransform(scrollYProgress, [0, 1], ['0%', '10%']);
  const doubled = useMemo(() => [...TOOLS, ...TOOLS], []);

  return (
    <section ref={ref} className="relative min-h-screen flex flex-col overflow-hidden dot-grid">
      {/* ATMOSPHERE — two orbs, exact spec */}
      <motion.div style={{ y: orbY }} className="absolute inset-0 z-0">
        <div className="orb-a" />
        <div className="orb-b" />
      </motion.div>

      {/* Particles */}
      <Particles />

      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <img src="/hero-bg.png" alt="" className="w-full h-full object-cover opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--bg)]/60 via-[var(--bg)]/30 to-[var(--bg)]" />
      </div>

      {/* Content */}
      <motion.div style={{ y, opacity }} className="relative z-10 flex-grow flex items-center justify-center px-6 sm:px-8 pt-28 pb-20">
        <motion.div variants={stagger} initial="hidden" animate="visible" className="text-center max-w-[680px]">
          {/* Label */}
          <motion.p variants={fadeUp} className="label mb-5 text-[var(--accent)]">AI & Machine Learning Engineer</motion.p>

          {/* Name — compact, max 2 lines */}
          <motion.h1 variants={fadeUp} className="hero-heading text-[clamp(2.6rem,9vw,6rem)] mb-5">
            David Huang
          </motion.h1>

          {/* One-liner */}
          <motion.p variants={fadeUp} className="text-[var(--text-2)] text-base sm:text-lg max-w-[420px] mx-auto mb-8 leading-relaxed">
            Production-grade deep learning pipelines and NLP systems. BEng AI, Xiamen University Malaysia.
          </motion.p>

          {/* ABOVE-FOLD STATS */}
          <motion.div variants={fadeUp} className="flex justify-center gap-8 sm:gap-12 mb-10">
            <div className="text-center">
              <div className="font-display font-bold text-2xl sm:text-3xl text-[var(--text-1)] tracking-tight">
                <Counter target="6" suffix="+" decimals={0} />
              </div>
              <div className="text-[10px] sm:text-[11px] text-[var(--text-3)] mt-1 font-medium">Systems shipped</div>
            </div>
            <div className="text-center">
              <div className="font-display font-bold text-2xl sm:text-3xl text-[var(--text-1)] tracking-tight">
                <Counter target="2" suffix="+" decimals={0} />
              </div>
              <div className="text-[10px] sm:text-[11px] text-[var(--text-3)] mt-1 font-medium">Years building</div>
            </div>
            <div className="text-center">
              <div className="font-display font-bold text-2xl sm:text-3xl text-[var(--text-1)] tracking-tight">∞</div>
              <div className="text-[10px] sm:text-[11px] text-[var(--text-3)] mt-1 font-medium">Problems left</div>
            </div>
          </motion.div>

          {/* CTAs — clear hierarchy */}
          <motion.div variants={fadeUp} className="flex flex-col sm:flex-row justify-center gap-3">
            <Magnetic strength={0.25}>
              <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                onClick={() => document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' })}
                className="btn-primary px-8 py-3.5 text-sm flex items-center gap-2.5" data-hover
              >View Projects <ArrowRight size={15} /></motion.button>
            </Magnetic>
            <motion.a whileTap={{ scale: 0.97 }}
              href="/RESUME.pdf" target="_blank"
              className="btn-ghost px-8 py-3.5 text-[13px] flex items-center justify-center gap-2"
            >Download CV <Download size={14} /></motion.a>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Marquee */}
      <div className="relative z-10 pb-8">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2, duration: 1 }} className="ticker-wrap">
          <div className="ticker-track">
            {doubled.map((t, i) => (
              <div key={i} className="flex items-center gap-3 px-8 sm:px-10 shrink-0 group">
                <img src={t.svg} alt={t.name} className="w-6 h-6 sm:w-7 sm:h-7 object-contain opacity-15 group-hover:opacity-35 transition-opacity duration-500 grayscale" loading="lazy" />
                <span className="text-[11px] sm:text-[12px] font-medium text-[var(--text-3)] group-hover:text-[var(--text-2)] transition-colors duration-500 whitespace-nowrap">{t.name}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════
   ABOUT — Horizontal 4-column timeline
   ═══════════════════════════════════════ */
function About() {
  return (
    <section id="about" className="max-w-[1100px] mx-auto px-6 sm:px-8 py-24 sm:py-32 md:py-40">
      <Reveal>
        <div className="mb-14 sm:mb-16">
          <p className="label mb-4">Journey</p>
          <h2 className="section-heading text-2xl sm:text-3xl md:text-4xl leading-tight mb-4">From foundations to production.</h2>
          <p className="text-[var(--text-2)] text-sm sm:text-base leading-relaxed max-w-lg">
            A trajectory of continuous learning and deploying — driven by the conviction that intelligence should be engineered, not accidental.
          </p>
        </div>
      </Reveal>

      {/* Horizontal timeline — 4 columns on desktop, 2 on tablet, 1 on mobile */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {TIMELINE.map((item, idx) => (
          <Reveal key={idx} delay={idx * 0.08}>
            <TiltCard>
              <div className="card p-5 sm:p-6 h-full flex flex-col group">
                {/* Year badge + icon */}
                <div className="flex items-center justify-between mb-5">
                  <span className="text-[10px] font-bold tracking-[0.14em] uppercase text-[var(--accent)] bg-[var(--accent-dim)] px-2.5 py-1 rounded-md">{item.year}</span>
                  <div className="w-8 h-8 rounded-lg bg-[var(--accent-dim)] flex items-center justify-center text-[var(--accent)] group-hover:bg-[var(--accent)] group-hover:text-white transition-colors duration-300">
                    {item.icon}
                  </div>
                </div>
                {/* Content */}
                <h3 className="font-display font-bold text-base sm:text-lg text-[var(--text-1)] tracking-tight mb-1">{item.title}</h3>
                <p className="text-[11px] text-[var(--text-3)] font-medium mb-3">{item.sub}</p>
                <p className="text-[13px] text-[var(--text-2)] leading-relaxed mb-4 flex-grow">{item.desc}</p>
                {/* Stat */}
                <div className="pt-3 border-t border-[var(--border)]">
                  <span className="inline-flex items-center gap-1.5 text-[11px] font-medium text-[var(--accent)]"><Trophy size={10} /> {item.stat}</span>
                </div>
              </div>
            </TiltCard>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════
   WORK — True bento with dominant featured card
   ═══════════════════════════════════════ */
function Work() {
  return (
    <section id="work" className="max-w-[1100px] mx-auto px-6 sm:px-8 py-24 sm:py-32 md:py-40">
      <Reveal>
        <div className="mb-14 sm:mb-16">
          <p className="label mb-4">Selected Work</p>
          <h2 className="section-heading text-2xl sm:text-3xl md:text-4xl mb-3">Project Showcase</h2>
          <p className="text-[var(--text-2)] max-w-md text-sm sm:text-base">Production-oriented models and pipelines, optimized for scale and accuracy.</p>
        </div>
      </Reveal>

      {/* Bento: featured spans 3 cols + 2 rows, others fill remaining space */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-3 sm:gap-4 auto-rows-auto" style={{ gridTemplateRows: 'auto auto' }}>
        {/* Featured — spans 3 cols, 2 rows */}
        <Reveal className="md:col-span-3 md:row-span-2">
          <TiltCard className="h-full">
            <a href={PROJECTS[0].url} target="_blank" rel="noopener noreferrer" data-hover
              className="card-accent p-6 sm:p-8 md:p-10 flex flex-col h-full group block relative overflow-hidden">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[var(--accent-dim)] flex items-center justify-center text-[var(--accent)] group-hover:bg-[var(--accent)] group-hover:text-white transition-colors duration-300">{PROJECTS[0].icon}</div>
                  <span className="label text-[10px]">{PROJECTS[0].category}</span>
                </div>
                <ArrowUpRight size={16} className="text-[var(--text-3)] group-hover:text-[var(--text-1)] transition-colors" />
              </div>
              <h3 className="font-display font-bold text-xl sm:text-2xl md:text-3xl tracking-tight mb-3 text-[var(--text-1)]">{PROJECTS[0].title}</h3>
              <p className="text-[var(--text-2)] text-sm sm:text-base leading-relaxed mb-8 flex-grow max-w-md">{PROJECTS[0].desc}</p>
              {/* Giant metric */}
              <div className="pt-5 border-t border-[var(--border)]">
                <div className="flex items-end gap-3 mb-4">
                  <span className="font-display font-bold text-[var(--text-1)] leading-none" style={{ fontSize: 'clamp(3rem, 7vw, 5.5rem)' }}>{PROJECTS[0].metric}</span>
                  <div className="pb-2">
                    <span className="text-sm text-[var(--text-2)] block">{PROJECTS[0].metricLabel}</span>
                    <span className="text-xs text-[var(--text-3)]">{PROJECTS[0].secondary}</span>
                  </div>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {PROJECTS[0].tags.map(t => <span key={t} className="px-2.5 py-1 text-[10px] font-mono text-[var(--text-3)] bg-[var(--surface-2)] border border-[var(--border)] rounded-md">{t}</span>)}
                </div>
              </div>
            </a>
          </TiltCard>
        </Reveal>

        {/* Remaining 5 cards — each spans 2 cols, 1 row */}
        {PROJECTS.slice(1).map((p, i) => (
          <Reveal key={i} className="md:col-span-2" delay={0.06 + i * 0.05}>
            <TiltCard className="h-full"><SmallProjCard p={p} /></TiltCard>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function SmallProjCard({ p }) {
  return (
    <a href={p.url} target="_blank" rel="noopener noreferrer" data-hover
      className="card p-5 sm:p-6 flex flex-col h-full group block relative overflow-hidden">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-[var(--surface-2)] flex items-center justify-center text-[var(--text-3)] group-hover:text-[var(--text-1)] transition-colors">{p.icon}</div>
          <span className="label text-[9px]">{p.category}</span>
        </div>
        <ArrowUpRight size={13} className="text-[var(--text-3)] group-hover:text-[var(--text-1)] transition-colors" />
      </div>
      <h3 className="font-display font-bold text-sm sm:text-base tracking-tight mb-1.5 text-[var(--text-1)]">{p.title}</h3>
      <p className="text-[var(--text-2)] text-[12px] leading-relaxed mb-4 flex-grow line-clamp-2">{p.desc}</p>
      <div className="pt-3 border-t border-[var(--border)]">
        <div className="flex items-baseline gap-2">
          <span className="font-display font-bold text-xl text-[var(--text-1)]">{p.metric}</span>
          <span className="text-[10px] text-[var(--text-2)]">{p.metricLabel}</span>
          <span className="text-[9px] text-[var(--text-3)] ml-auto">{p.secondary}</span>
        </div>
        <div className="flex flex-wrap gap-1 mt-2">
          {p.tags.map(t => <span key={t} className="px-2 py-0.5 text-[9px] font-mono text-[var(--text-3)] bg-[var(--surface-2)] border border-[var(--border)] rounded">{t}</span>)}
        </div>
      </div>
    </a>
  );
}

/* ═══════════════════════════════════════
   AI SECTION — Full-width terminal
   ═══════════════════════════════════════ */
function Assistant() {
  const [q, setQ] = useState('');
  const [res, setRes] = useState('');
  const [st, setSt] = useState('idle');
  const ab = useRef(null);
  const ask = async txt => {
    const v = txt || q; if (!v.trim() || st === 'loading') return;
    ab.current?.abort(); ab.current = new AbortController();
    setSt('loading'); setRes('');
    try { const r = await askGemini(v, ab.current.signal); setRes(r); setSt('ok'); }
    catch (e) { if (e.name !== 'AbortError') { setRes('Connection failed. Reach out via email.'); setSt('err'); } }
  };
  useEffect(() => () => ab.current?.abort(), []);
  const hints = ['What ML frameworks does he use?', 'Explain the Churn Predictor.', 'Educational background?'];

  return (
    <section id="ai" className="max-w-[1100px] mx-auto px-6 sm:px-8 py-24 sm:py-32 md:py-40">
      <Reveal>
        {/* Terminal card */}
        <div className="overflow-hidden" style={{ background: 'rgba(0,0,0,0.65)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 16 }}>
          {/* macOS title bar */}
          <div className="px-5 sm:px-6 py-3.5 flex items-center border-b" style={{ borderColor: 'rgba(255,255,255,0.05)' }}>
            <div className="flex items-center gap-2">
              <div className="traffic-light" style={{ background: '#FF5F57' }} />
              <div className="traffic-light" style={{ background: '#FFBD2E' }} />
              <div className="traffic-light" style={{ background: '#28C840' }} />
            </div>
            <span className="mx-auto font-mono-dm text-[10px]" style={{ color: '#2a2a2a' }}>portfolio-ai — query.sh</span>
            <div className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: '#28C840' }} />
              <span className="font-mono-dm text-[9px]" style={{ color: '#28C840' }}>connected</span>
            </div>
          </div>

          {/* Section heading — inside the card */}
          <div className="px-6 sm:px-8 pt-6 sm:pt-8 pb-2">
            <p className="label mb-3">AI-Powered</p>
            <h2 className="section-heading text-xl sm:text-2xl md:text-3xl">Query the portfolio.</h2>
          </div>

          {/* 2-column: suggestions | terminal */}
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.7fr]">
            {/* Left — suggestions */}
            <div className="p-6 sm:p-8 lg:border-r" style={{ borderColor: 'rgba(255,255,255,0.05)' }}>
              <p className="label mb-4">Suggested queries</p>
              <div className="flex flex-col gap-2 mb-6">
                {hints.map(h => (
                  <motion.button key={h} whileHover={{ x: 5 }} onClick={() => { setQ(h); ask(h); }} data-hover
                    className="text-left font-mono-dm text-[11px] px-3.5 py-2.5 border rounded-lg transition-all duration-200"
                    style={{ background: 'rgba(255,255,255,0.02)', borderColor: 'rgba(255,255,255,0.06)', color: 'var(--text-2)' }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--accent-border)'; e.currentTarget.style.background = 'var(--accent-dim)'; e.currentTarget.style.color = 'var(--orange)'; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'; e.currentTarget.style.background = 'rgba(255,255,255,0.02)'; e.currentTarget.style.color = 'var(--text-2)'; }}>
                    {h}
                  </motion.button>
                ))}
              </div>
              <p className="font-mono-dm text-[9px]" style={{ color: 'var(--text-3)' }}>Powered by Google Gemini</p>
            </div>

            {/* Right — terminal I/O */}
            <div className="p-5 sm:p-6 lg:p-8">
              <form onSubmit={e => { e.preventDefault(); ask(); }} className="flex gap-2 mb-5">
                <div className="relative flex-grow">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 font-mono-dm text-[13px] font-bold select-none" style={{ color: 'var(--orange)' }}>›</span>
                  <input type="text"
                    className="w-full rounded-lg py-3 pl-9 pr-4 text-[var(--text-1)] placeholder:text-[var(--text-3)] focus:outline-none transition-colors font-mono-dm text-[12px]"
                    style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}
                    onFocus={e => e.currentTarget.style.borderColor = 'var(--accent)'}
                    onBlur={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'}
                    placeholder="Type a question..." value={q} onChange={e => setQ(e.target.value)} />
                </div>
                <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.95 }} type="submit"
                  disabled={st === 'loading' || !q.trim()} data-hover
                  className="btn-primary px-5 py-3 font-mono-dm text-[12px] font-bold disabled:opacity-30 disabled:cursor-not-allowed shrink-0">
                  Run
                </motion.button>
              </form>

              {/* Output area — always visible, min-height 160px */}
              <div className="rounded-lg flex items-center justify-center" style={{ minHeight: 160, background: 'rgba(0,0,0,0.4)' }}>
                {st === 'idle' && (
                  <p className="font-mono-dm text-[13px]" style={{ color: 'var(--text-3)' }}>
                    › Awaiting query<span className="typewriter-cursor">_</span>
                  </p>
                )}
                {st === 'loading' && (
                  <div className="flex items-center gap-2">
                    <span className="bounce-dot" />
                    <span className="bounce-dot" />
                    <span className="bounce-dot" />
                  </div>
                )}
                {(st === 'ok' || st === 'err') && res && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="w-full p-5">
                    <div className="flex items-center gap-1.5 mb-3">
                      <CheckCircle2 size={12} style={{ color: 'var(--orange)' }} />
                      <span className="label text-[9px]">Output</span>
                    </div>
                    <p className="font-mono-dm text-[13px] text-[var(--text-1)] leading-relaxed"><Typewriter text={res} /></p>
                  </motion.div>
                )}
              </div>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

/* ═══════════════════════════════════════
   CONTACT / FOOTER
   ═══════════════════════════════════════ */
function Footer() {
  return (
    <footer id="contact" className="max-w-[1100px] mx-auto px-6 sm:px-8 py-10 sm:py-12">
      <Reveal>
        {/* Orange-tinted banner card */}
        <div className="relative overflow-hidden" style={{ background: 'rgba(224,85,48,0.04)', border: '1px solid rgba(224,85,48,0.12)', borderRadius: 20, padding: 'clamp(40px, 6vw, 64px)' }}>
          {/* Radial orange glow from left edge */}
          <div className="absolute top-0 left-0 w-1/2 h-full pointer-events-none" style={{ background: 'radial-gradient(ellipse at 0% 50%, rgba(224,85,48,0.08) 0%, transparent 70%)' }} />

          <div className="relative z-10 grid grid-cols-1 md:grid-cols-[1.2fr_1fr] gap-10 md:gap-16 items-start">
            {/* Left — heading */}
            <div>
              <p className="label mb-5">Get in touch</p>
              <h2 className="font-display tracking-tight" style={{ fontWeight: 800, fontSize: 'clamp(2.5rem, 6.5vw, 6rem)', lineHeight: 0.92, color: 'var(--text-1)' }}>
                Let's<br /><span style={{ color: 'var(--orange)' }}>build.</span>
              </h2>
            </div>

            {/* Right — description + buttons */}
            <div className="md:pt-4">
              <p className="text-[var(--text-2)] text-sm sm:text-base leading-relaxed mb-8">
                Currently open to full-time roles, contract work, and meaningful collaborations in AI & ML engineering.
              </p>
              <div className="flex flex-nowrap gap-3">
                <Magnetic>
                  <motion.a whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} data-hover
                    href="mailto:student@xmu.edu.my"
                    className="btn-primary px-6 py-3 text-[13px] flex items-center gap-2">
                    <Mail size={14} /> Send Email
                  </motion.a>
                </Magnetic>
                <Magnetic>
                  <motion.a whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} data-hover
                    href="https://linkedin.com/in/yourprofile" target="_blank" rel="noopener noreferrer"
                    className="btn-ghost px-6 py-3 text-[13px] flex items-center gap-2">
                    <Linkedin size={14} /> LinkedIn
                  </motion.a>
                </Magnetic>
                <Magnetic>
                  <motion.a whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} data-hover
                    href="https://github.com/LouSens" target="_blank" rel="noopener noreferrer"
                    className="btn-ghost px-6 py-3 text-[13px] flex items-center gap-2">
                    <Github size={14} /> GitHub
                  </motion.a>
                </Magnetic>
              </div>
            </div>
          </div>
        </div>
      </Reveal>

      {/* Bottom bar */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-2 mt-8">
        <span className="font-mono-dm text-[10px]" style={{ color: '#222' }}>© {new Date().getFullYear()} David Huang</span>
        <span className="font-mono-dm text-[10px]" style={{ color: '#222' }}>React · Vite · Framer Motion</span>
      </div>
    </footer>
  );
}