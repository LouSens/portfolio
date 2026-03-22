import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useInView, useMotionValueEvent } from 'framer-motion';
import {
  Github, Linkedin, Mail, Download, ArrowRight, Trophy, Sparkles, Search, CheckCircle2,
  Code2, Brain, Database, Cpu, Menu, X, ArrowUpRight, Layers, BarChart3, Mic,
  MessageSquare, ChevronDown, GraduationCap, Briefcase, Rocket, Target
} from 'lucide-react';

/* ═══════════════════════════════════════
   TOOL LOGOS — CDN B&W
   ═══════════════════════════════════════ */
const TOOL_LOGOS = [
  { name: 'Python', svg: 'https://cdn.simpleicons.org/python/white' },
  { name: 'PyTorch', svg: 'https://cdn.simpleicons.org/pytorch/white' },
  { name: 'TensorFlow', svg: 'https://cdn.simpleicons.org/tensorflow/white' },
  { name: 'scikit-learn', svg: 'https://cdn.simpleicons.org/scikitlearn/white' },
  { name: 'Pandas', svg: 'https://cdn.simpleicons.org/pandas/white' },
  { name: 'NumPy', svg: 'https://cdn.simpleicons.org/numpy/white' },
  { name: 'FastAPI', svg: 'https://cdn.simpleicons.org/fastapi/white' },
  { name: 'Flask', svg: 'https://cdn.simpleicons.org/flask/white' },
  { name: 'Docker', svg: 'https://cdn.simpleicons.org/docker/white' },
  { name: 'PostgreSQL', svg: 'https://cdn.simpleicons.org/postgresql/white' },
  { name: 'Git', svg: 'https://cdn.simpleicons.org/git/white' },
  { name: 'OpenCV', svg: 'https://cdn.simpleicons.org/opencv/white' },
  { name: 'ONNX', svg: 'https://cdn.simpleicons.org/onnx/white' },
  { name: 'HuggingFace', svg: 'https://cdn.simpleicons.org/huggingface/white' },
  { name: 'LangChain', svg: 'https://cdn.simpleicons.org/langchain/white' },
  { name: 'CUDA', svg: 'https://cdn.simpleicons.org/nvidia/white' },
];

/* ═══════════════════════════════════════
   DATA
   ═══════════════════════════════════════ */
const GEMINI_MODEL = 'gemini-1.5-flash';
const GEMINI_BASE = 'https://generativelanguage.googleapis.com/v1beta/models';

const FEATURED_PROJECTS = [
  {
    title: 'Multimodal Financial Sentiment Correlator',
    category: 'Deep Learning',
    metrics: { label: 'R² Score', value: '0.97' },
    secondary: 'MSE: 0.024',
    githubUrl: 'https://github.com/LouSens/multimodal-financial-sentiment-correlator',
    tags: ['CNN', 'Transformer', 'PyTorch'],
    desc: 'Cross-modal analysis of financial text and market data for sentiment prediction via multi-head attention and convolutional feature fusion.',
    icon: <BarChart3 size={20} />,
    featured: true,
  },
  {
    title: 'Customer Churn Predictor',
    category: 'Data Science',
    metrics: { label: 'AUC', value: '0.91' },
    secondary: 'Precision: 88%',
    githubUrl: 'https://github.com/LouSens/customer-churn-predictor',
    tags: ['XGBoost', 'Pandas', 'Scikit-Learn'],
    desc: 'Enterprise classification model identifying at-risk customers with high precision for targeted retention strategies.',
    icon: <Layers size={20} />,
  },
  {
    title: 'LLM Prompt Optimizer',
    category: 'Generative AI',
    metrics: { label: 'Latency ↓', value: '40%' },
    secondary: 'Token savings: 20%',
    githubUrl: 'https://github.com/LouSens/llm-prompt-optimizer',
    tags: ['LLM', 'LangChain', 'Python'],
    desc: 'Automated refinement pipeline reducing token consumption and inference latency through iterative prompt optimization.',
    icon: <Sparkles size={20} />,
  },
  {
    title: 'Audio Speech Recognition',
    category: 'Machine Learning',
    metrics: { label: 'WER', value: '4.2%' },
    secondary: 'RTF: 0.8',
    githubUrl: 'https://github.com/LouSens/audio-speech-recognition',
    tags: ['Whisper', 'Librosa', 'ONNX'],
    desc: 'Optimized speech-to-text pipeline achieving production-grade accuracy across noisy acoustic environments.',
    icon: <Mic size={20} />,
  },
  {
    title: 'Sentiment Vector Space',
    category: 'NLP',
    metrics: { label: 'F1 Score', value: '0.88' },
    secondary: 'Tokens: 50K',
    githubUrl: 'https://github.com/LouSens/sentiment-vector-space',
    tags: ['BERT', 'Transformers', 'HuggingFace'],
    desc: 'Dense embedding space for sentiment analysis using fine-tuned transformer models across multiple text domains.',
    icon: <MessageSquare size={20} />,
  },
  {
    title: 'Semantic Search Engine',
    category: 'NLP',
    metrics: { label: 'Recall@10', value: '94%' },
    secondary: 'Vector DB',
    githubUrl: 'https://github.com/LouSens/semantic-search-engine',
    tags: ['Embeddings', 'FAISS', 'Python'],
    desc: 'High-recall semantic search system using vector embeddings and approximate nearest neighbor retrieval.',
    icon: <Search size={20} />,
  },
];

const TIMELINE_ITEMS = [
  {
    year: 'Present',
    title: 'AI & ML Engineering',
    subtitle: 'Building production-grade systems',
    desc: 'Designing and deploying deep learning pipelines, LLM integrations, and predictive models that solve real business problems with measurable impact.',
    icon: <Rocket size={20} />,
    metrics: '7+ Projects · R² 0.97',
  },
  {
    year: '2024',
    title: 'Deep Learning Research',
    subtitle: 'Multimodal architectures & NLP',
    desc: 'Developed cross-modal sentiment analysis systems, fine-tuned transformer models, and built semantic search engines with 94% recall.',
    icon: <Brain size={20} />,
    metrics: 'F1: 0.88 · WER: 4.2%',
  },
  {
    year: '2023',
    title: 'Data Science Foundation',
    subtitle: 'Statistical modeling & pipelines',
    desc: 'Built end-to-end data pipelines, customer churn predictors, and algorithmic forecasting systems using classical ML and ensemble methods.',
    icon: <Target size={20} />,
    metrics: 'AUC: 0.91 · XGBoost',
  },
  {
    year: '2022',
    title: 'BEng Artificial Intelligence',
    subtitle: 'Xiamen University Malaysia',
    desc: 'Began rigorous study in theoretical mathematics, linear algebra, probability theory, and applied machine learning fundamentals.',
    icon: <GraduationCap size={20} />,
    metrics: 'Python · C · SQL',
  },
];

const SYSTEM_PROMPT = `You are the AI interface embedded in the portfolio of David Huang, an Indonesian undergraduate AI student at Xiamen University Malaysia.

KNOWLEDGE BASE:
- Skills: Python, TensorFlow, PyTorch, Pandas, NumPy, Scikit-Learn, Prompt Engineering, FastAPI, Flask, C.
- Projects: 1) Multimodal Financial Sentiment Correlator (R² 0.97). 2) Sentiment Vector Space (NLP, Transformers, F1: 0.88). 3) Algorithmic Forecaster (Data Science, R²: 0.85). 4) LLM Prompt Optimizer (Latency −40%). 5) Audio Speech Recognition (WER 4.2%). 6) Customer Churn Predictor (AUC 0.91). 7) Semantic Search Engine (Recall@10 94%).
- Education: BEng in Artificial Intelligence at Xiamen University Malaysia. Focuses on theoretical math and applied ML.

RULES:
1. Answer queries concisely (max 3 sentences) based ONLY on the Knowledge Base above.
2. Be professional, direct, and authoritative. No filler.
3. If asked about something NOT in the Knowledge Base, reply EXACTLY: "Outside my embedded knowledge scope. Please contact David directly."`;

async function callGemini(prompt, systemInstruction = null, signal = null) {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  if (!apiKey) throw new Error('VITE_GEMINI_API_KEY not set');
  const endpoint = `${GEMINI_BASE}/${GEMINI_MODEL}:generateContent?key=${apiKey}`;
  const body = {
    contents: [{ parts: [{ text: prompt }] }],
    ...(systemInstruction && { systemInstruction: { parts: [{ text: systemInstruction }] } }),
    generationConfig: { maxOutputTokens: 250, temperature: 0.3 },
  };
  const res = await fetch(endpoint, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body), signal });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const data = await res.json();
  return data?.candidates?.[0]?.content?.parts?.[0]?.text || '';
}

/* ═══════════════════════════════════════
   ANIMATION
   ═══════════════════════════════════════ */
const ease = [0.16, 1, 0.3, 1];
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.8, delay: i * 0.12, ease } })
};
const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: (i = 0) => ({ opacity: 1, scale: 1, transition: { duration: 0.7, delay: i * 0.08, ease } })
};
const slideL = {
  hidden: { opacity: 0, x: -50 },
  visible: (i = 0) => ({ opacity: 1, x: 0, transition: { duration: 0.8, delay: i * 0.1, ease } })
};
const slideR = {
  hidden: { opacity: 0, x: 50 },
  visible: (i = 0) => ({ opacity: 1, x: 0, transition: { duration: 0.8, delay: i * 0.1, ease } })
};

/* ═══════════════════════════════════════
   PARTICLE CANVAS — Animated mesh bg
   ═══════════════════════════════════════ */
function ParticleCanvas() {
  const canvasRef = useRef(null);
  const animRef = useRef(null);
  const particlesRef = useRef([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let w, h;

    const resize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // Create particles
    const count = Math.min(60, Math.floor(window.innerWidth / 25));
    particlesRef.current = Array.from({ length: count }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      r: Math.random() * 1.5 + 0.5,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      const pts = particlesRef.current;

      // Update positions
      for (const p of pts) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = w;
        if (p.x > w) p.x = 0;
        if (p.y < 0) p.y = h;
        if (p.y > h) p.y = 0;
      }

      // Draw connections
      const maxDist = 140;
      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const dx = pts[i].x - pts[j].x;
          const dy = pts[i].y - pts[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < maxDist) {
            ctx.beginPath();
            ctx.moveTo(pts[i].x, pts[i].y);
            ctx.lineTo(pts[j].x, pts[j].y);
            ctx.strokeStyle = `rgba(255,255,255,${0.04 * (1 - dist / maxDist)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      // Draw dots
      for (const p of pts) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255,255,255,0.08)';
        ctx.fill();
      }

      animRef.current = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full z-[1] pointer-events-none" />;
}

/* ═══════════════════════════════════════
   ROOT
   ═══════════════════════════════════════ */
export default function App() {
  return (
    <div className="noise-overlay relative min-h-screen bg-[#050505]">
      <Navbar />
      <main className="relative z-10">
        <HeroSection />
        <AboutTimeline />
        <ProjectsShowcase />
        <AIAssistant />
        <ContactFooter />
      </main>
    </div>
  );
}

/* ═══════════════════════════════════════
   NAVBAR — No logo, clean theme
   ═══════════════════════════════════════ */
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', h, { passive: true });
    return () => window.removeEventListener('scroll', h);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const scrollTo = (id) => {
    setMobileOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const navItems = [
    { label: 'About', id: 'about' },
    { label: 'Projects', id: 'projects' },
    { label: 'AI Assistant', id: 'ai-assistant' },
    { label: 'Contact', id: 'contact' },
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, delay: 0.3, ease }}
        className={`fixed top-0 w-full z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-[#050505]/70 backdrop-blur-2xl border-b border-white/[0.06] py-3'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-[1200px] mx-auto px-5 sm:px-6 flex justify-between items-center">
          {/* Name as logo */}
          <motion.button
            whileHover={{ opacity: 0.7 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="text-white font-semibold text-base sm:text-lg tracking-tight"
          >
            David Huang
          </motion.button>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-0.5">
            {navItems.map(item => (
              <motion.button
                key={item.id}
                whileHover={{ y: -1 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => scrollTo(item.id)}
                className="nav-link-hover px-4 py-2 text-[13px] text-zinc-500 hover:text-white font-medium transition-all duration-300 rounded-lg"
              >
                {item.label}
              </motion.button>
            ))}
            <motion.a
              whileHover={{ scale: 1.03, boxShadow: '0 0 20px rgba(255,255,255,0.08)' }}
              whileTap={{ scale: 0.97 }}
              href="/RESUME.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="ml-4 px-5 py-2 text-[13px] font-medium text-black bg-white rounded-full hover:bg-zinc-200 transition-all flex items-center gap-1.5"
            >
              Resume <ArrowUpRight size={13} />
            </motion.a>
          </div>

          {/* Mobile hamburger — fixed sizing */}
          <motion.button
            whileTap={{ scale: 0.85 }}
            onClick={() => setMobileOpen(v => !v)}
            className="md:hidden w-10 h-10 flex items-center justify-center text-white rounded-lg hover:bg-white/[0.08] transition-colors"
            aria-label="Toggle menu"
          >
            <AnimatePresence mode="wait">
              {mobileOpen ? (
                <motion.div key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                  <X size={20} />
                </motion.div>
              ) : (
                <motion.div key="m" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
                  <Menu size={20} />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </motion.nav>

      {/* Mobile fullscreen menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-[#050505]/97 backdrop-blur-2xl md:hidden flex flex-col items-center justify-center gap-1"
          >
            {navItems.map((item, i) => (
              <motion.button
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ delay: i * 0.06, duration: 0.4, ease }}
                onClick={() => scrollTo(item.id)}
                className="text-xl sm:text-2xl text-zinc-400 hover:text-white font-medium py-3 sm:py-4 transition-colors"
              >
                {item.label}
              </motion.button>
            ))}
            <motion.a
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              href="/RESUME.pdf"
              target="_blank"
              className="mt-6 px-8 py-3 bg-white text-black font-semibold rounded-full text-base hover:bg-zinc-200 transition-colors"
            >
              Get Resume
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

/* ═══════════════════════════════════════
   HERO — Particle bg + tools marquee
   ═══════════════════════════════════════ */
function HeroSection() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  const doubled = useMemo(() => [...TOOL_LOGOS, ...TOOL_LOGOS], []);

  return (
    <section ref={heroRef} className="relative min-h-screen flex flex-col overflow-hidden">
      {/* Particle mesh background */}
      <ParticleCanvas />

      {/* Static bg image underneath */}
      <div className="absolute inset-0 z-0">
        <img src="/hero-bg.png" alt="" className="w-full h-full object-cover opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#050505]/50 via-[#050505]/20 to-[#050505]" />
      </div>

      {/* Hero content */}
      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative z-10 flex-grow flex items-center justify-center px-5 sm:px-6 pt-24 pb-20"
      >
        <motion.div
          initial="hidden"
          animate="visible"
          className="max-w-[860px] text-center"
        >
          <motion.h1
            variants={fadeUp}
            custom={0}
            className="hero-heading text-[clamp(2rem,7vw,5rem)] font-bold text-white tracking-tight leading-[1.06] mb-5 sm:mb-6"
          >
            Building intelligent{' '}
            <br className="hidden sm:block" />
            systems.{' '}
            <span className="text-zinc-500">Simplified.</span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            custom={1}
            className="text-sm sm:text-base md:text-lg text-zinc-400 leading-relaxed max-w-[520px] mx-auto mb-8 sm:mb-10"
          >
            Production-grade ML pipelines and deep learning architectures.
            BEng AI, Xiamen University Malaysia.
          </motion.p>

          <motion.div variants={fadeUp} custom={2} className="flex flex-col sm:flex-row justify-center gap-3">
            <motion.button
              whileHover={{ scale: 1.04, boxShadow: '0 0 40px rgba(255,255,255,0.12)' }}
              whileTap={{ scale: 0.97 }}
              onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
              className="hero-btn-primary px-7 sm:px-8 py-3.5 sm:py-4 bg-white text-black font-semibold rounded-full text-sm flex items-center justify-center gap-2 transition-all"
            >
              View Projects <ArrowRight size={16} />
            </motion.button>
            <motion.a
              whileHover={{ scale: 1.04, backgroundColor: 'rgba(255,255,255,0.1)' }}
              whileTap={{ scale: 0.97 }}
              href="/RESUME.pdf"
              target="_blank"
              className="px-7 sm:px-8 py-3.5 sm:py-4 bg-white/[0.06] border border-white/[0.12] text-white font-medium rounded-full text-sm flex items-center justify-center gap-2 transition-all backdrop-blur-sm"
            >
              Download CV <Download size={16} />
            </motion.a>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Tools marquee — integrated at hero bottom */}
      <div className="relative z-10 pb-6 sm:pb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8, ease }}
          className="tools-ticker-wrap"
        >
          <div className="tools-ticker-track">
            {doubled.map((tool, i) => (
              <div
                key={i}
                className="flex items-center gap-2.5 sm:gap-3 px-5 sm:px-7 shrink-0 group cursor-default"
              >
                <img
                  src={tool.svg}
                  alt={tool.name}
                  className="w-5 h-5 sm:w-6 sm:h-6 object-contain opacity-20 group-hover:opacity-60 transition-opacity duration-300 grayscale"
                  loading="lazy"
                />
                <span className="text-[10px] sm:text-[11px] font-medium text-zinc-700 group-hover:text-zinc-400 transition-colors duration-300 whitespace-nowrap">
                  {tool.name}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-16 sm:bottom-20 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}>
          <ChevronDown size={18} className="text-zinc-600" />
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ═══════════════════════════════════════
   ABOUT — Scroll-triggered storytelling
   timeline with animated cards
   ═══════════════════════════════════════ */
function AboutTimeline() {
  return (
    <section id="about" className="relative max-w-[1200px] mx-auto px-5 sm:px-6 py-20 sm:py-28 md:py-36">
      {/* Section intro */}
      <SectionReveal>
        <div className="max-w-2xl mb-16 sm:mb-24">
          <p className="text-[10px] sm:text-[11px] font-semibold text-zinc-600 uppercase tracking-[0.25em] mb-4">Journey</p>
          <h2 className="text-2xl sm:text-3xl md:text-[2.75rem] font-bold text-white tracking-tight leading-tight mb-5">
            From foundations{' '}
            <span className="text-zinc-500">to production.</span>
          </h2>
          <p className="text-sm sm:text-[15px] text-zinc-400 leading-relaxed">
            A trajectory of continuous learning, building, and deploying — driven by the
            conviction that intelligence should be engineered, not accidental.
          </p>
        </div>
      </SectionReveal>

      {/* Timeline */}
      <div className="relative">
        {/* Vertical timeline line */}
        <div className="absolute left-4 sm:left-8 md:left-1/2 md:-translate-x-px top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-white/[0.08] to-transparent" />

        {TIMELINE_ITEMS.map((item, idx) => (
          <TimelineCard key={idx} item={item} index={idx} isLeft={idx % 2 === 0} />
        ))}
      </div>

      {/* Stats row */}
      <SectionReveal>
        <div className="mt-20 sm:mt-28 grid grid-cols-3 gap-4 sm:gap-8 max-w-lg">
          {[
            { val: '7+', label: 'ML Projects', sub: 'Production-grade' },
            { val: '300+', label: 'Commits', sub: 'GitHub activity' },
            { val: '80%', label: 'Python', sub: 'Primary language' },
          ].map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6, ease }}
            >
              <div className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">{s.val}</div>
              <div className="text-[10px] sm:text-xs font-medium text-zinc-400 mt-1">{s.label}</div>
              <div className="text-[9px] sm:text-[10px] text-zinc-600 mt-0.5">{s.sub}</div>
            </motion.div>
          ))}
        </div>
      </SectionReveal>
    </section>
  );
}

function TimelineCard({ item, index, isLeft }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <div ref={ref} className={`relative flex items-start mb-12 sm:mb-16 md:mb-20 ${isLeft ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
      {/* Timeline dot */}
      <motion.div
        initial={{ scale: 0 }}
        animate={isInView ? { scale: 1 } : {}}
        transition={{ duration: 0.5, delay: 0.2, ease }}
        className="absolute left-4 sm:left-8 md:left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-zinc-700 border-2 border-[#050505] z-10 mt-6"
      />

      {/* Card */}
      <motion.div
        initial={{ opacity: 0, x: isLeft ? -40 : 40, y: 20 }}
        animate={isInView ? { opacity: 1, x: 0, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.1, ease }}
        className={`ml-10 sm:ml-16 md:ml-0 md:w-[calc(50%-40px)] ${isLeft ? 'md:pr-8' : 'md:pl-8 md:ml-auto'}`}
      >
        <div className="card-glass card-glow p-5 sm:p-7 group relative overflow-hidden">
          {/* Animated decorative gradient */}
          <div className="absolute top-0 right-0 w-[200px] h-[200px] bg-white/[0.015] blur-[80px] rounded-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

          {/* Floating decorative element */}
          <motion.div
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute -bottom-6 -right-6 w-24 h-24 border border-white/[0.03] rounded-full pointer-events-none"
          />

          <div className="relative z-10">
            {/* Year badge */}
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-white/[0.06] flex items-center justify-center text-zinc-500 group-hover:text-white group-hover:bg-white/[0.1] transition-all duration-300">
                {item.icon}
              </div>
              <span className="text-[10px] sm:text-[11px] font-bold text-zinc-500 uppercase tracking-widest">{item.year}</span>
            </div>

            <h3 className="text-base sm:text-lg font-semibold text-white tracking-tight mb-1 group-hover:text-zinc-100 transition-colors">
              {item.title}
            </h3>
            <p className="text-[11px] sm:text-xs text-zinc-500 font-medium mb-3">{item.subtitle}</p>
            <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed mb-4">{item.desc}</p>

            {/* Metrics tag */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/[0.04] border border-white/[0.06] rounded-full">
              <Trophy size={11} className="text-emerald-500/70" />
              <span className="text-[10px] sm:text-[11px] font-medium text-zinc-400">{item.metrics}</span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

/* ═══════════════════════════════════════
   SECTION REVEAL — Reusable scroll trigger
   ═══════════════════════════════════════ */
function SectionReveal({ children, className = '' }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ═══════════════════════════════════════
   PROJECTS
   ═══════════════════════════════════════ */
function ProjectsShowcase() {
  return (
    <section id="projects" className="max-w-[1200px] mx-auto px-5 sm:px-6 py-20 sm:py-28 md:py-36">
      <SectionReveal>
        <div className="mb-12 sm:mb-16">
          <p className="text-[10px] sm:text-[11px] font-semibold text-zinc-600 uppercase tracking-[0.25em] mb-4">Selected Work</p>
          <h2 className="text-2xl sm:text-3xl md:text-[2.75rem] font-bold text-white tracking-tight mb-4">
            Project Showcase
          </h2>
          <p className="text-zinc-400 max-w-lg text-sm sm:text-[15px]">
            Production-oriented models and data pipelines, optimized for scale and predictive accuracy.
          </p>
        </div>
      </SectionReveal>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <SectionReveal className="md:col-span-2">
          <ProjectCardFeatured project={FEATURED_PROJECTS[0]} />
        </SectionReveal>
        {FEATURED_PROJECTS.slice(1).map((proj, idx) => (
          <SectionReveal key={idx}>
            <ProjectCard project={proj} />
          </SectionReveal>
        ))}
      </div>
    </section>
  );
}

function ProjectCardFeatured({ project }) {
  return (
    <motion.a
      href={project.githubUrl}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ y: -3 }}
      className="block gradient-border group"
    >
      <div className="p-6 sm:p-8 md:p-10 bg-[#0a0a0a] rounded-2xl relative overflow-hidden">
        <motion.div
          className="absolute top-0 right-0 w-[400px] h-[400px] bg-white/[0.02] blur-[100px] rounded-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700"
        />
        {/* Decorative rotating element */}
        <motion.div
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="absolute -top-20 -right-20 w-[200px] h-[200px] border border-white/[0.03] rounded-full pointer-events-none"
        />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center gap-6 sm:gap-8">
          <div className="flex-grow">
            <div className="flex items-center gap-3 mb-4">
              <motion.div whileHover={{ scale: 1.1, rotate: 5 }} className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-white/[0.06] flex items-center justify-center text-zinc-400 group-hover:text-white transition-colors">
                {project.icon}
              </motion.div>
              <span className="text-[10px] sm:text-[11px] font-semibold text-zinc-500 uppercase tracking-widest">{project.category} · Featured</span>
            </div>
            <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white tracking-tight mb-3">{project.title}</h3>
            <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed max-w-xl mb-5">{project.desc}</p>
            <div className="flex flex-wrap gap-1.5">
              {project.tags.map(t => (
                <span key={t} className="px-2.5 py-1 text-[10px] sm:text-[11px] font-mono text-zinc-500 bg-white/[0.04] border border-white/[0.06] rounded-md">{t}</span>
              ))}
            </div>
          </div>
          <div className="flex-shrink-0 text-left md:text-right md:min-w-[130px]">
            <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight">{project.metrics.value}</div>
            <div className="text-[10px] sm:text-xs font-medium text-zinc-500 mt-1">{project.metrics.label}</div>
            <div className="text-[9px] sm:text-[10px] text-zinc-600 mt-0.5">{project.secondary}</div>
            <motion.div whileHover={{ x: 4 }} className="mt-3 inline-flex items-center gap-1.5 text-xs text-zinc-500 group-hover:text-white transition-colors">
              View Source <ArrowUpRight size={12} />
            </motion.div>
          </div>
        </div>
      </div>
    </motion.a>
  );
}

function ProjectCard({ project }) {
  return (
    <motion.a
      href={project.githubUrl}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ y: -4 }}
      className="card-glass card-glow p-5 sm:p-7 flex flex-col h-full group block relative overflow-hidden"
    >
      {/* Decorative spinning ring */}
      <motion.div
        animate={{ rotate: [0, 360] }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        className="absolute -bottom-10 -right-10 w-[120px] h-[120px] border border-white/[0.02] rounded-full pointer-events-none"
      />

      <div className="relative z-10 flex-grow flex flex-col">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <motion.div whileHover={{ scale: 1.1, rotate: 5 }} className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-white/[0.06] flex items-center justify-center text-zinc-500 group-hover:text-white transition-colors">
              {project.icon}
            </motion.div>
            <span className="text-[9px] sm:text-[10px] font-semibold text-zinc-600 uppercase tracking-widest">{project.category}</span>
          </div>
          <motion.div whileHover={{ scale: 1.2, rotate: 15 }}>
            <ArrowUpRight size={16} className="text-zinc-700 group-hover:text-zinc-400 transition-colors" />
          </motion.div>
        </div>

        <h3 className="text-base sm:text-lg font-semibold text-white tracking-tight mb-2">{project.title}</h3>
        <p className="text-zinc-500 text-xs sm:text-sm leading-relaxed mb-5 flex-grow">{project.desc}</p>

        <div className="pt-4 border-t border-white/[0.06]">
          <div className="flex items-center gap-2 mb-3">
            <Trophy size={13} className="text-emerald-500/70" />
            <span className="text-xs sm:text-sm font-semibold text-zinc-300">{project.metrics.label}: {project.metrics.value}</span>
            <span className="text-[9px] sm:text-[10px] text-zinc-600 ml-1">· {project.secondary}</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {project.tags.map(t => (
              <span key={t} className="px-2.5 py-0.5 text-[9px] sm:text-[10px] font-mono text-zinc-600 bg-white/[0.03] border border-white/[0.05] rounded">{t}</span>
            ))}
          </div>
        </div>
      </div>
    </motion.a>
  );
}

/* ═══════════════════════════════════════
   AI ASSISTANT
   ═══════════════════════════════════════ */
function AIAssistant() {
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState('');
  const [status, setStatus] = useState('idle');
  const abortRef = useRef(null);

  const suggestions = [
    'What ML frameworks does he use?',
    'Explain the Churn Predictor project.',
    'What is his educational background?',
  ];

  const handleQuery = async (text) => {
    const q = text || query;
    if (!q.trim() || status === 'loading') return;
    if (abortRef.current) abortRef.current.abort();
    abortRef.current = new AbortController();
    setStatus('loading');
    setResponse('');
    try {
      const res = await callGemini(q, SYSTEM_PROMPT, abortRef.current.signal);
      setResponse(res);
      setStatus('success');
    } catch (err) {
      if (err.name !== 'AbortError') {
        setResponse('Connection failed. Please reach out directly via email below.');
        setStatus('error');
      }
    }
  };

  useEffect(() => () => abortRef.current?.abort(), []);

  return (
    <section id="ai-assistant" className="max-w-[1200px] mx-auto px-5 sm:px-6 py-20 sm:py-28 md:py-36">
      <SectionReveal>
        <div className="gradient-border">
          <div className="bg-[#0a0a0a] rounded-2xl p-6 sm:p-8 md:p-12 relative overflow-hidden">
            <motion.div
              animate={{ x: [0, 20, -10, 0], y: [0, -15, 10, 0] }}
              transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-[-50px] right-[-50px] w-[400px] h-[400px] bg-white/[0.02] blur-[100px] rounded-full pointer-events-none"
            />

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
              <div>
                <p className="text-[10px] sm:text-[11px] font-semibold text-zinc-600 uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                  <Sparkles size={12} className="text-zinc-500" /> AI-Powered
                </p>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight mb-4">
                  Ask about this portfolio.
                </h2>
                <p className="text-zinc-400 text-sm sm:text-[15px] leading-relaxed mb-6">
                  Skip the parsing. Query the embedded AI about skills, projects, and metrics.
                </p>
                <div className="flex flex-wrap gap-2">
                  {suggestions.map(s => (
                    <motion.button
                      key={s}
                      whileHover={{ scale: 1.03, backgroundColor: 'rgba(255,255,255,0.08)' }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => { setQuery(s); handleQuery(s); }}
                      className="text-[10px] sm:text-[11px] px-3 py-1.5 bg-white/[0.04] border border-white/[0.08] rounded-lg text-zinc-500 hover:text-zinc-300 transition-all"
                    >
                      {s}
                    </motion.button>
                  ))}
                </div>
              </div>

              <div className="card-glass overflow-hidden shadow-2xl shadow-black/40">
                <div className="bg-white/[0.03] px-4 py-2.5 sm:py-3 flex items-center gap-2 border-b border-white/[0.06]">
                  <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-zinc-700" />
                  <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-zinc-700" />
                  <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-zinc-700" />
                  <span className="ml-2 text-[9px] sm:text-[10px] font-mono text-zinc-600">portfolio-query.sh</span>
                </div>
                <div className="p-4 sm:p-5">
                  <form onSubmit={e => { e.preventDefault(); handleQuery(); }} className="flex gap-2 mb-4">
                    <div className="relative flex-grow">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-600" size={14} />
                      <input
                        type="text"
                        className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl py-2.5 sm:py-3 pl-9 pr-4 text-white placeholder:text-zinc-600 focus:outline-none focus:border-white/[0.2] transition-colors font-mono text-[11px] sm:text-[13px]"
                        placeholder="Type a question..."
                        value={query}
                        onChange={e => setQuery(e.target.value)}
                      />
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      type="submit"
                      disabled={status === 'loading' || !query.trim()}
                      className="px-4 sm:px-5 py-2.5 sm:py-3 bg-white text-black font-semibold rounded-xl text-[11px] sm:text-[13px] hover:bg-zinc-200 disabled:bg-zinc-800 disabled:text-zinc-500 transition-all shrink-0"
                    >
                      {status === 'loading' ? <span className="w-3.5 h-3.5 sm:w-4 sm:h-4 border-2 border-zinc-400 border-t-white rounded-full animate-spin inline-block" /> : 'Run'}
                    </motion.button>
                  </form>
                  <AnimatePresence mode="wait">
                    {response && (
                      <motion.div
                        key="r"
                        initial={{ opacity: 0, y: 8, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3, ease }}
                        className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-3 sm:p-4"
                      >
                        <div className="flex items-center gap-2 mb-2">
                          <CheckCircle2 size={11} className="text-emerald-500/70" />
                          <span className="text-[9px] sm:text-[10px] font-semibold text-zinc-500 uppercase tracking-wider">Output</span>
                        </div>
                        <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-mono">{response}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </div>
        </div>
      </SectionReveal>
    </section>
  );
}

/* ═══════════════════════════════════════
   FOOTER
   ═══════════════════════════════════════ */
function ContactFooter() {
  return (
    <footer id="contact" className="max-w-[1200px] mx-auto px-5 sm:px-6 pt-14 pb-8 border-t border-white/[0.04]">
      <SectionReveal>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
          <div>
            <h3 className="text-base sm:text-lg font-semibold text-white mb-1">Open to opportunities</h3>
            <p className="text-xs sm:text-sm text-zinc-500">Let's discuss how I can contribute to your team.</p>
          </div>
          <div className="flex flex-wrap gap-2 sm:gap-3">
            {[
              { href: 'mailto:student@xmu.edu.my', icon: <Mail size={14} />, label: 'Email' },
              { href: 'https://linkedin.com/in/yourprofile', icon: <Linkedin size={14} />, label: 'LinkedIn', ext: true },
              { href: 'https://github.com/LouSens', icon: <Github size={14} />, label: 'GitHub', ext: true },
            ].map((l, i) => (
              <motion.a
                key={i}
                whileHover={{ scale: 1.04, backgroundColor: 'rgba(255,255,255,0.1)' }}
                whileTap={{ scale: 0.97 }}
                href={l.href}
                target={l.ext ? '_blank' : undefined}
                rel={l.ext ? 'noopener noreferrer' : undefined}
                className="px-4 sm:px-5 py-2 sm:py-2.5 bg-white/[0.06] border border-white/[0.08] rounded-full text-xs sm:text-sm text-zinc-400 hover:text-white transition-all flex items-center gap-2"
              >
                {l.icon} {l.label}
              </motion.a>
            ))}
          </div>
        </div>
      </SectionReveal>

      <div className="flex flex-col sm:flex-row justify-between items-center gap-3 pt-6 border-t border-white/[0.04]">
        <span className="text-[10px] sm:text-xs text-zinc-600">© {new Date().getFullYear()} David Huang. All rights reserved.</span>
        <span className="text-[9px] sm:text-xs text-zinc-700">React · Vite · Tailwind CSS</span>
      </div>
    </footer>
  );
}