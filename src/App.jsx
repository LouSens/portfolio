import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import Lenis from 'lenis';
import {
  Github, Linkedin, Mail, ArrowUpRight, Code, Database, Server,
  Terminal, X, Menu, Download, ChevronRight, ChevronLeft, Plus, Minus, GraduationCap,
  Trophy, Bot, Brain, Cpu, Layers, ExternalLink, Users, User, Zap, Globe, Sparkles,
} from 'lucide-react';
import { LiquidMetalButton } from '@/components/ui/liquid-metal-button';

/* ═══════════════════════════════════════
   TOOLS MARQUEE DATA
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
  { name: 'PostgreSQL', svg: 'https://cdn.simpleicons.org/postgresql/white' },
  { name: 'GitHub Actions', svg: 'https://cdn.simpleicons.org/githubactions/white' },
  { name: 'Vercel', svg: 'https://cdn.simpleicons.org/vercel/white' },
  { name: 'Firebase', svg: 'https://cdn.simpleicons.org/firebase/white' },
];

/* ═══════════════════════════════════════
   PROJECTS DATA
   ═══════════════════════════════════════ */
const PROJECTS = [
  {
    title: 'Startup EMP',
    category: 'AI-Native Accelerator Platform',
    role: 'Backend & AI Engineer',
    team: '4-person team',
    isTeam: true,
    year: 'May 2026',
    context: 'MyHack 2025 Preliminary Round : 4-Person Team',
    url: 'https://github.com/nerdylive123/Startup-emp.git',
    liveUrl: null,
    tags: ['LangGraph', 'FastAPI', 'Pydantic v2', 'Cloud Run', 'Firestore'],
    desc: 'An AI Chief of Staff platform for accelerator programs that replaces fragile spreadsheet management with a structured knowledge graph.',
    bullets: [
      'Designed a 4-phase agentic pipeline covering application triage, multimodal pitch deck parsing, vector mentor matching, and institutional knowledge capture.',
      'Engineered the FastAPI backend using LangGraph orchestration and Pydantic v2 schema coercion to enforce strict LLM output typing.',
      'Implemented human-in-the-loop governance controls where AI recommendations serve as drafts requiring explicit admin approval before state mutation.',
      'Integrated high-dimensional vector similarity matching with aggressive caching to reduce redundant LLM compute calls.',
    ],
    icon: <Zap size={26} />,
  },
  {
    title: 'KerjaCerdas',
    category: 'Enterprise Talent AI Infrastructure',
    role: 'Lead Engineer',
    team: '4-person team',
    isTeam: true,
    isFeatured: true,
    year: '2026',
    context: 'Engineering Lead : 4-Person Team',
    url: 'https://github.com/LouSens/KerjaCerdas.git',
    liveUrl: null,
    images: [
      { src: '/screenshots/kerjacerdas/screenshot_8.jpg', caption: 'Seeker Flow: Landing Page' },
      { src: '/screenshots/kerjacerdas/screenshot_9.jpg', caption: 'Seeker Flow: Login' },
      { src: '/screenshots/kerjacerdas/screenshot_10.jpg', caption: 'Seeker Flow: Account Registration' },
      { src: '/screenshots/kerjacerdas/screenshot_1.jpg', caption: 'Seeker Flow: Candidate Dashboard' },
      { src: '/screenshots/kerjacerdas/screenshot_2.jpg', caption: 'Seeker Flow: Job Search & Filters' },
      { src: '/screenshots/kerjacerdas/screenshot_3.jpg', caption: 'Seeker Flow: AI CV Upload' },
      { src: '/screenshots/kerjacerdas/screenshot_4.jpg', caption: 'Seeker Flow: Vector Match Results' },
      { src: '/screenshots/kerjacerdas/screenshot_5.jpg', caption: 'Seeker Flow: Skill Gap Analyzer' },
      { src: '/screenshots/kerjacerdas/screenshot_7.jpg', caption: 'Seeker Flow: Identity Verification' },
      { src: '/screenshots/kerjacerdas/screenshot_6.jpg', caption: 'Seeker Flow: Saved Jobs' },
      { src: '/screenshots/kerjacerdas/screenshot_11.jpg', caption: 'Employer Flow: HR Authentication' },
      { src: '/screenshots/kerjacerdas/screenshot_12.jpg', caption: 'Employer Flow: HR Dashboard' },
      { src: '/screenshots/kerjacerdas/screenshot_13.jpg', caption: 'Employer Flow: Post Job Wizard' },
      { src: '/screenshots/kerjacerdas/screenshot_16.jpg', caption: 'Employer Flow: Posted Jobs List' },
      { src: '/screenshots/kerjacerdas/screenshot_15.jpg', caption: 'Employer Flow: AI Candidate Shortlist' },
      { src: '/screenshots/kerjacerdas/screenshot_14.jpg', caption: 'Employer Flow: Credential Verification' },
    ],
    tags: ['LangGraph', 'FastAPI', 'PostgreSQL + pgvector', 'React + Zustand', 'Docker Compose', 'A/B Testing'],
    desc: 'Enterprise talent matching infrastructure engineered to solve the labor market Triple Mismatch problem using high-dimensional vector search and ReAct multi-agent swarms.',
    bullets: [
      'Architected a ReAct Multi-Agent Swarm using LangGraph with a Supervisor node routing tasks in parallel to SearchJobs (pgvector), ResumeReview (multimodal PDF), and SkillGap worker agents.',
      'Engineered a 5-signal composite ranking engine combining vector cosine similarity (50%), skill overlap (30%), regional boost (10%), salary fit (5%), and experience fit (5%) with HNSW pgvector search.',
      'Built an asynchronous PDF processing pipeline achieving low-latency CV extraction, Token Efficiency Gates to control LLM compute costs, and PII mitigation middleware.',
      'Delivered an Employer Kanban pipeline featuring Pay-to-Unlock candidate contact monetization, E-KYC credential verification, closed-loop A/B event tracking, and a 4-phase automated CI/CD pipeline.',
    ],
    icon: <Globe size={26} />,
  },
  {
    title: 'Orion',
    category: 'Multi-Agent LLM Workflow',
    role: 'Tech Lead & Backend',
    team: '4-person team',
    isTeam: true,
    year: 'May 2026',
    context: 'Team One Hit Wonder : Production Pipeline',
    url: 'https://github.com/LouSens/orion.git',
    liveUrl: null,
    tags: ['LangGraph', 'FastAPI', 'LangSmith', 'Pydantic v2', 'React 19', 'Tailwind CSS v4'],
    desc: 'An AI-powered SaaS reimbursement assistant that automates end-to-end expense processing from natural language requests and uploaded receipt files.',
    bullets: [
      'Architected a 6-stage agentic workflow in LangGraph routing claims through Intake, Intelligence, Policy, Validation, Approval, and Recorder nodes.',
      'Implemented sliding-window rate limiting, anti-hallucination regex pre-passes, and prompt-injection sanitization across API endpoints.',
      'Built deterministic policy evaluation tools with rapidfuzz duplicate detection, subscription catalog lookup, and JSON-backed ledger storage.',
      'Established dual CI/CD workflows via GitHub Actions: a PR quality gate with 85% coverage across 120 unit tests and scheduled nightly regressions against production LLMs.',
    ],
    icon: <Bot size={28} />,
  },
  {
    title: 'NeuralVoid',
    category: 'Behavioural Analytics & Clinical AI',
    role: 'Full-Stack Engineer',
    team: 'Solo build',
    isTeam: false,
    year: 'Jan 2026',
    context: 'Independent Research & Engineering',
    url: 'https://github.com/LouSens/neural-void.git',
    liveUrl: null,
    tags: ['Node.js', 'FastAPI', 'scikit-learn', 'XGBoost', 'Vercel', 'Railway'],
    desc: 'End-to-end behavioural analytics platform transforming raw session events into clinical-grade reports on digital consumption patterns.',
    bullets: [
      'Engineered a 25-feature machine learning pipeline calculating session velocity, streak metrics, and binge probability feeding an ensemble model with ~96% classification accuracy.',
      'Integrated LLM-driven automated clinical report synthesis served through a high-throughput FastAPI backend.',
      'Built a responsive React SPA dashboard with interactive heatmaps and radar charts deployed on Vercel with a Railway API gateway.',
    ],
    icon: <Brain size={28} />,
  },
];

/* ═══════════════════════════════════════
   EXPERIENCE TIMELINE
   ═══════════════════════════════════════ */
const EXPERIENCE = [
  {
    year: '2026',
    current: true,
    role: 'Lead Engineer @ KerjaCerdas',
    company: '4-Person Team : Engineering Lead',
    desc: 'Led full-stack engineering of an enterprise talent AI platform solving labor market Triple Mismatch. Architected a LangGraph multi-agent swarm (Supervisor + parallel worker nodes), 5-signal pgvector hybrid ranking engine, low-latency Gemini PDF extraction, Token Efficiency Gates, Employer Kanban dashboard with Pay-to-Unlock monetization, E-KYC credential verification, and an automated 4-phase CI/CD pipeline.',
  },
  {
    year: 'May 2026',
    role: 'Tech Lead : Orion',
    company: '4-Person Team (One Hit Wonder)',
    desc: 'Architected backend infrastructure for a multi-agent LLM expense reimbursement platform. Owned the 6-stage LangGraph workflow, FastAPI type contracts, security rate-limiting middleware, and dual CI/CD pipelines running scheduled regressions against production LLM endpoints.',
  },
  {
    year: 'May 2026',
    role: 'Backend & AI Engineer : Startup EMP',
    company: '4-Person Team : MyHack 2025',
    desc: 'Built the backend and AI agent systems for an accelerator management platform. Designed the FastAPI/LangGraph triage pipeline, Pydantic v2 Gemini multimodal ingestion, semantic mentor matching via vector embeddings, and human-in-the-loop governance controls.',
  },
  {
    year: 'Jan 2026',
    role: 'Full-Stack Engineer : NeuralVoid',
    company: 'Independent Project',
    desc: 'Shipped a behavioural analytics platform end-to-end, including a 25-feature ensemble ML model (~96% accuracy), Gemini clinical report generation, and a React dashboard backed by a Railway-hosted FastAPI service.',
  },
  {
    year: 'Oct 2025',
    role: 'Lead Developer : DPickleball RL Agent',
    company: '3-Person Engineering Team',
    desc: 'Architected Unity ML-Agents environment, reward shaping, PPO training loops, and hyperparameter sweeps for a competition-graded reinforcement learning agent, achieving a 3rd place finish.',
  },
];

/* ═══════════════════════════════════════
   EDUCATION
   ═══════════════════════════════════════ */
const EDUCATION = {
  school: 'Xiamen University Malaysia',
  location: 'Selangor, Malaysia',
  degree: 'BEng (Hons) in Artificial Intelligence',
  gpa: '3.83 / 4.00',
  start: 'Sept 2024',
  expected: 'Sept 2028',
  highlights: [
    "Dean's List Awardee — three consecutive semesters",
    'Top 16% of cohort',
    'College of Artificial Intelligence & Robotics',
  ],
  learning: [
    'Robotic simulation environments',
    'Reinforcement learning for control tasks',
    'OpenCV & computer vision pipelines',
  ],
};

/* ═══════════════════════════════════════
   AWARDS
   ═══════════════════════════════════════ */
const AWARDS = [
  {
    place: '3rd Place',
    title: 'DPickleball AI Competition',
    org: 'Unity ML-Agents · Reinforcement Learning',
    date: 'Oct 2025',
    note: 'Lead developer on a 3-person engineering team. Architected the full Unity ML-Agents environment, reward shaping logic, and PPO training pipeline for a competition-grade RL agent — placing 3rd out of all competing teams.',
    icon: <Trophy size={20} />,
    // Award ceremony photo + competition group shot (shows scale of the event)
    photos: [
      { src: '/media/dpickleball/IMG_8700.png', caption: '3rd Place Award — DPickleball AI Category' },
      { src: '/media/dpickleball/IMG_8724.png', caption: 'Competition Group Photo — All Teams & Organisers' },
    ],
    // RL agent gameplay recordings
    videos: [
      { label: 'Watch RL Agent Play', url: '/media/dpickleball/WhatsApp Video 2025-12-01 at 21.35.32_cb1e0156.mp4' },
      { label: 'Watch RL Agent Play (2)', url: '/media/dpickleball/WhatsApp Video 2026-08-10 at 3.44.51 PM.mp4' },
    ],
  },
  {
    place: 'Silver Award',
    title: 'SEA-CICSIC 2026',
    org: 'China-ASEAN Innovation Competition · Undergraduate',
    date: '2026',
    note: 'Led AI strategy and technical architecture for Omni-QC — a manufacturing intelligence platform featuring real-time defect prediction and predictive quality control, competing at the China-ASEAN undergraduate level.',
    icon: <Trophy size={20} />,
    docs: [
      { label: 'Pitch Deck', url: '/docs/omni-qc/Omni-QC Pitch Deck.pdf' },
      { label: 'Business Proposal', url: '/docs/omni-qc/Omni-QC Business Proposal.pdf' },
    ],
  },
  {
    place: 'Top 20% Globally',
    title: 'Intl. Quant Championship',
    org: 'Quantitative Reasoning · Stage 1',
    date: 'Apr 2025',
    note: 'Placed top 20% globally against international competitors in data-driven analytical reasoning and quantitative problem-solving.',
    icon: <Sparkles size={20} />,
  },
  {
    place: 'Merit Scholarship',
    title: 'Xiamen University Malaysia',
    org: 'Academic Excellence · BEng Artificial Intelligence',
    date: '2024',
    note: 'Awarded merit scholarship by Xiamen University Malaysia in recognition of academic excellence upon entry to the BEng (Hons) Artificial Intelligence programme.',
    icon: <GraduationCap size={20} />,
    docs: [
      { label: 'Scholarship Letter', url: '/docs/merit-scholarship/AIT2409110 KURNIAWAN DAVID - 202509.pdf' },
    ],
  },
  {
    place: "Dean's List",
    title: 'Three Consecutive Semesters',
    org: 'Xiamen University Malaysia · Top 16% of Cohort',
    date: '2024 – 2026',
    note: "Placed on the Dean's List for three consecutive semesters, ranking in the top 16% of the cohort across the College of Artificial Intelligence & Robotics.",
    icon: <GraduationCap size={20} />,
    // JPEG certificates per semester (2409 = Sep 2024, 2504 = Apr 2025, 2509 = Sep 2025)
    photos: [
      { src: "/docs/deans-list/2409 Dean's List.jpeg", caption: 'Sem 1 — Sep 2024' },
      { src: "/docs/deans-list/2504 Dean's List.jpeg", caption: 'Sem 2 — Apr 2025' },
      { src: "/docs/deans-list/2509 Dean's List.jpeg", caption: 'Sem 3 — Sep 2025' },
    ],
  },
];

/* ═══════════════════════════════════════
   CORE COMPETENCIES
   ═══════════════════════════════════════ */
const CORE_COMPETENCIES = [
  {
    title: 'AI Agent Systems',
    icon: <Bot size={20} />,
    tagline: 'Multi-step AI that reliably finishes the job.',
    items: [
      'LangChain / LangGraph multi-agent orchestration',
      'Supervisor + parallel worker swarm architecture',
      'LangSmith observability & evaluation',
      'Gemini & GLM model integration',
      'Tool-calling, policy engines & RAG pipelines',
    ],
    tools: ['LangChain', 'LangGraph', 'LangSmith', 'Gemini API', 'OpenAI API'],
  },
  {
    title: 'ML & Data Science',
    icon: <Brain size={20} />,
    tagline: 'Models that train, deploy, and stay accurate.',
    items: [
      'Ensemble methods — XGBoost, Random Forest',
      'CNNs for image classification & detection',
      'Reinforcement learning (PPO via ML-Agents)',
      'OpenCV & real-time computer vision',
      'Feature engineering & model evaluation',
    ],
    tools: ['TensorFlow', 'Keras', 'PyTorch', 'scikit-learn', 'OpenCV', 'Pandas'],
  },
  {
    title: 'Backend & Infrastructure',
    icon: <Layers size={20} />,
    tagline: 'APIs and pipelines that survive real traffic.',
    items: [
      'FastAPI + Pydantic v2 type-safe REST APIs',
      'PostgreSQL & pgvector hybrid search engines',
      'Containerised deploys with Docker',
      'GitHub Actions CI/CD pipelines',
      'Cloud Run · Vercel · Railway · Firebase',
    ],
    tools: ['FastAPI', 'PostgreSQL', 'Docker', 'GitHub Actions', 'React', 'Node.js'],
  },
];

/* ═══════════════════════════════════════
   STATUS ROTATION
   ═══════════════════════════════════════ */
const STATUS_ROTATION = [
  'building enterprise AI pipelines',
  'open to 2-month remote internship',
  '3rd-year AI Engineering student',
  'shipping multi-agent LLM systems',
  'Silver Award · SEA-CICSIC 2026',
];

const LANGUAGES = ['Python', 'JavaScript', 'HTML & CSS', 'C', 'C++'];

/* ═══════════════════════════════════════
   SMOOTH SCROLL
   ═══════════════════════════════════════ */
function useSmoothScroll() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
    });

    let rafId;
    function raf(time) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);
    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
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

    let mx = -100, my = -100, rx = -100, ry = -100, rafId;

    const move = (e) => {
      mx = e.clientX; my = e.clientY;
      d.style.left = mx + 'px';
      d.style.top = my + 'px';
    };

    const loop = () => {
      rx += (mx - rx) * 0.12;
      ry += (my - ry) * 0.12;
      r.style.left = rx + 'px';
      r.style.top = ry + 'px';
      rafId = requestAnimationFrame(loop);
    };

    document.addEventListener('mousemove', move, { passive: true });
    rafId = requestAnimationFrame(loop);

    const onHover = () => { d.classList.add('active'); r.classList.add('active'); };
    const onLeave = () => { d.classList.remove('active'); r.classList.remove('active'); };

    const bindHovers = () => {
      document.querySelectorAll('a, button, [data-hover="true"]').forEach(el => {
        el.removeEventListener('mouseenter', onHover);
        el.removeEventListener('mouseleave', onLeave);
        el.addEventListener('mouseenter', onHover);
        el.addEventListener('mouseleave', onLeave);
      });
    };
    bindHovers();

    const obs = new MutationObserver(bindHovers);
    obs.observe(document.body, { childList: true, subtree: true });

    return () => {
      document.removeEventListener('mousemove', move);
      cancelAnimationFrame(rafId);
      obs.disconnect();
    };
  }, []);

  return (
    <>
      <div ref={dot} className="cursor-dot hidden md:block" />
      <div ref={ring} className="cursor-ring hidden md:block" />
    </>
  );
}

/* ═══════════════════════════════════════
   THREE.JS PARTICLE FIELD
   ═══════════════════════════════════════ */
function ParticleField() {
  const ref = useRef();

  const positions = React.useMemo(() => {
    const count = 2500;
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 14 * Math.cbrt(Math.random());
      const theta = Math.random() * 2 * Math.PI;
      const phi = Math.acos(2 * Math.random() - 1);
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);
    }
    return pos;
  }, []);

  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.y -= delta * 0.04;
      ref.current.rotation.x -= delta * 0.015;
    }
  });

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#FF5A36"
        size={0.045}
        sizeAttenuation={true}
        depthWrite={false}
        opacity={0.35}
      />
    </Points>
  );
}

/* ═══════════════════════════════════════
   SHARED — SECTION HEADING
   ═══════════════════════════════════════ */
function SectionHeading({ subtitle, title, description, align = 'left' }) {
  const alignClass = align === 'center'
    ? 'items-center text-center mx-auto'
    : 'items-start text-left';

  return (
    <div className={`mb-16 md:mb-20 flex flex-col ${alignClass} max-w-3xl`}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-8%' }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="flex items-center gap-3 mb-5"
      >
        <span className="w-10 h-px bg-[var(--accent)]" />
        <span className="font-mono-dm text-[11px] text-[var(--accent)] tracking-[0.22em] uppercase">
          {subtitle}
        </span>
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-8%' }}
        transition={{ duration: 0.8, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
        className="font-display text-4xl md:text-5xl font-bold tracking-tight mb-5 text-white"
      >
        {title}
      </motion.h2>

      {description && (
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-8%' }}
          transition={{ duration: 0.8, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
          className="text-lg md:text-xl text-[var(--text-2)] font-light leading-relaxed max-w-2xl"
        >
          {description}
        </motion.p>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════
   MAIN APP
   ═══════════════════════════════════════ */
export default function App() {
  useSmoothScroll();

  return (
    <div className="relative min-h-screen bg-[var(--bg)] text-[var(--text-1)]">
      <ScrollProgress />
      <Cursor />

      {/* Hero particle background — only renders for first viewport */}
      <div
        className="absolute top-0 left-0 w-full pointer-events-none"
        style={{
          height: '130vh',
          zIndex: 0,
          maskImage: 'linear-gradient(to bottom, black 40%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to bottom, black 40%, transparent 100%)',
          opacity: 0.75,
        }}
      >
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
   SCROLL PROGRESS BAR
   ═══════════════════════════════════════ */
function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[2px] z-[200] origin-left"
      style={{
        scaleX: scrollYProgress,
        background: 'linear-gradient(90deg, #FF5A36, #FF8C69)',
      }}
    />
  );
}

/* ═══════════════════════════════════════
   NAVBAR
   ═══════════════════════════════════════ */
function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const links = [
    { label: 'About', id: 'about' },
    { label: 'Timeline', id: 'experience' },
    { label: 'Projects', id: 'work' },
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
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 px-6 transition-all duration-300 ${isScrolled
            ? 'py-3 bg-[rgba(5,5,5,0.85)] backdrop-blur-2xl border-b border-[var(--border)]'
            : 'py-5 bg-transparent border-b border-transparent'
          }`}
      >
        <div className="max-w-[1200px] mx-auto flex items-center justify-between">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-3 text-white hover:text-[var(--accent)] transition-colors group"
          >
            <div className="w-9 h-9 rounded-lg bg-[#111] flex items-center justify-center border border-[var(--border)] group-hover:border-[var(--accent)] transition-all duration-300">
              <Code size={17} />
            </div>
            <span className="font-display font-bold tracking-tight text-lg hidden sm:block">
              David K.
            </span>
          </button>

          <div className="hidden md:flex items-center gap-7">
            {links.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className="relative text-[var(--text-2)] hover:text-white transition-colors text-[11px] uppercase tracking-[0.18em] font-mono-dm group"
              >
                {link.label}
                <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-[var(--accent)] group-hover:w-full transition-all duration-300" />
              </button>
            ))}
            <a
              href="/CV_DAVID KURNIAWAN.pdf"
              download="CV_David_Kurniawan.pdf"
              target="_blank"
              className="btn-outline"
              data-hover="true"
            >
              CV <Download size={12} />
            </a>
          </div>

          <button
            className="md:hidden text-white p-1"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 top-[60px] z-40 bg-[rgba(5,5,5,0.97)] backdrop-blur-2xl flex flex-col items-center justify-center gap-7 md:hidden border-t border-[var(--border)]"
          >
            {links.map((link, i) => (
              <motion.button
                key={link.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06 }}
                onClick={() => scrollTo(link.id)}
                className="font-display text-2xl font-bold uppercase tracking-widest text-white"
              >
                {link.label}
              </motion.button>
            ))}
            <motion.a
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: links.length * 0.06 }}
              href="/CV_DAVID KURNIAWAN.pdf"
              download="CV_David_Kurniawan.pdf"
              target="_blank"
              className="mt-6 btn-primary"
            >
              <span>Download CV</span>
              <Download size={13} />
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

/* ═══════════════════════════════════════
   HERO
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
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -6 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="text-white whitespace-nowrap"
      >
        {STATUS_ROTATION[idx]}
      </motion.span>
    </AnimatePresence>
  );
}

function Hero() {
  const { scrollY } = useScroll();
  /* Parallax — keep values moderate to avoid jank */
  const y1 = useTransform(scrollY, [0, 800], [0, 200]);
  const y2 = useTransform(scrollY, [0, 800], [0, 100]);
  const opacity = useTransform(scrollY, [0, 450], [1, 0]);

  return (
    <section className="relative min-h-screen flex items-center justify-center px-5 sm:px-6 pt-24 pb-16">
      <motion.div
        style={{ y: y1, opacity }}
        className="relative z-10 w-full max-w-[1200px] flex flex-col items-center text-center"
      >
        {/* Status pill */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="inline-flex items-center gap-2 sm:gap-3 px-4 sm:px-5 py-2 rounded-full border border-[var(--border)] bg-[rgba(15,15,15,0.7)] backdrop-blur-md mb-8 shadow-xl max-w-[92vw] overflow-hidden"
        >
          <span className="w-2 h-2 rounded-full bg-[var(--accent)] animate-pulse flex-shrink-0" />
          <span className="text-[10px] sm:text-xs font-mono-dm text-[var(--text-3)] uppercase tracking-widest flex-shrink-0">
            Currently
          </span>
          <span className="text-[10px] sm:text-xs font-mono-dm tracking-wide overflow-hidden text-ellipsis whitespace-nowrap">
            <RotatingStatus />
          </span>
        </motion.div>

        {/* Name */}
        <motion.h1
          style={{ y: y2 }}
          className="font-display font-bold text-5xl sm:text-7xl md:text-8xl lg:text-[96px] tracking-tight mb-6 md:mb-8"
        >
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            David
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.42, ease: [0.16, 1, 0.3, 1] }}
            className="text-[var(--accent)]"
          >
            Kurniawan
          </motion.div>
        </motion.h1>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.58, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-[640px] text-[var(--text-2)] text-base sm:text-lg md:text-xl mb-10 md:mb-14 font-light leading-relaxed px-2 sm:px-0"
        >
          3rd-year AI Engineering student who ships production systems —{' '}
          <span className="text-white">multi-agent LLM orchestration</span>,{' '}
          <span className="text-white">ML pipelines</span>, and the backend
          infrastructure that keeps them running in the real world.
        </motion.p>

        {/* CTA row */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.68, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row items-center gap-4 sm:gap-5 w-full sm:w-auto"
        >
          <LiquidMetalButton
            label="See Featured Work"
            onClick={() => document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' })}
          />

          {/* Download CV — sweep fill button */}
          <motion.a
            href="/CV_DAVID KURNIAWAN.pdf"
            download="CV_David_Kurniawan.pdf"
            target="_blank"
            className="relative inline-flex items-center gap-3 px-7 py-3 rounded-full border border-[var(--border)] font-mono-dm text-[11px] tracking-widest uppercase overflow-hidden"
            data-hover="true"
            initial="rest"
            whileHover="hover"
            whileTap={{ scale: 0.97 }}
            animate="rest"
          >
            <motion.span
              className="absolute inset-0 rounded-full bg-white"
              variants={{ rest: { scaleX: 0, originX: 0 }, hover: { scaleX: 1, originX: 0 } }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            />
            <motion.span
              className="relative z-10 leading-none"
              variants={{ rest: { color: 'var(--text-2)' }, hover: { color: '#000' } }}
              transition={{ duration: 0.25, delay: 0.05 }}
            >
              Download CV
            </motion.span>
            <motion.span
              className="relative z-10 w-7 h-7 rounded-full border flex items-center justify-center shrink-0"
              variants={{
                rest: { borderColor: 'var(--border)', color: 'var(--text-3)' },
                hover: { borderColor: '#1a1a1a', color: '#000' },
              }}
              transition={{ duration: 0.25, delay: 0.05 }}
            >
              <motion.div
                variants={{
                  rest: { y: 0, opacity: 1 },
                  hover: { y: [0, 5, -5, 0], opacity: [1, 0, 0, 1] },
                }}
                transition={{ duration: 0.5, delay: 0.08, ease: 'easeInOut' }}
              >
                <Download size={12} />
              </motion.div>
            </motion.span>
          </motion.a>
        </motion.div>

        {/* Availability signal */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.95 }}
          className="font-mono-dm text-[10px] uppercase tracking-widest text-[var(--text-3)] flex items-center gap-2 mt-2"
        >
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
          Available · 2-month remote internship
        </motion.p>

        {/* Quick stats row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.85, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center gap-8 mt-14 pt-8 border-t border-[var(--border)]"
        >
          {[
            { n: '5+', l: 'AI Projects' },
            { n: '3.83', l: 'GPA' },
            { n: '2026', l: 'Year 2' },
          ].map(({ n, l }) => (
            <div key={l} className="text-center">
              <p className="font-display font-bold text-2xl text-white leading-none mb-1">{n}</p>
              <p className="font-mono-dm text-[10px] uppercase tracking-widest text-[var(--text-3)]">{l}</p>
            </div>
          ))}
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
    <section className="py-9 border-y border-[var(--border)] bg-[#030303] overflow-hidden">
      <div className="ticker-wrap-new w-full">
        <div className="ticker-track-new">
          {toolsArray.map((t, idx) => (
            <div
              key={`t1-${idx}`}
              className="flex items-center gap-3 px-8 md:px-10 group opacity-35 hover:opacity-90 transition-opacity duration-300 cursor-default"
            >
              <img
                src={t.svg}
                alt={t.name}
                className="w-7 h-7 filter grayscale group-hover:grayscale-0 transition-all duration-300"
                loading="lazy"
              />
              <span className="font-display font-medium text-lg whitespace-nowrap">{t.name}</span>
              <span className="text-[var(--text-3)] px-3 text-sm">/</span>
            </div>
          ))}
        </div>
        <div className="ticker-track-new" aria-hidden="true">
          {toolsArray.map((t, idx) => (
            <div
              key={`t2-${idx}`}
              className="flex items-center gap-3 px-8 md:px-10 group opacity-35 hover:opacity-90 transition-opacity duration-300 cursor-default"
            >
              <img
                src={t.svg}
                alt={t.name}
                className="w-7 h-7 filter grayscale group-hover:grayscale-0 transition-all duration-300"
                loading="lazy"
              />
              <span className="font-display font-medium text-lg whitespace-nowrap">{t.name}</span>
              <span className="text-[var(--text-3)] px-3 text-sm">/</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════
   ABOUT / PERSONAL SECTION
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
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-8%' }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="terminal-frame rounded-2xl border border-[var(--border)] bg-[#080808] overflow-hidden shadow-2xl"
        >
          {/* macOS chrome */}
          <div className="flex items-center gap-2 px-5 py-3.5 border-b border-[var(--border)] bg-[#050505]">
            <span className="w-3 h-3 rounded-full bg-[#ff5f57]" />
            <span className="w-3 h-3 rounded-full bg-[#febc2e]" />
            <span className="w-3 h-3 rounded-full bg-[#28c840]" />
            <span className="ml-4 font-mono-dm text-[11px] text-[var(--text-3)]">~/david : about.md</span>
          </div>

          <div className="p-6 md:p-10 font-mono-dm text-[14px] leading-relaxed text-[var(--text-2)] space-y-5">
            <div>
              <span className="text-[var(--accent)]">david@portfolio</span>
              <span className="text-white">:</span>
              <span className="text-[#69b6ff]">~</span>
              <span className="text-white">$ cat about.md</span>
            </div>

            <p>
              Hi! I'm <span className="text-white font-semibold">David</span>, a 3rd-year AI Engineering
              student at <span className="text-white">Xiamen University Malaysia</span>.
            </p>

            <p>
              Currently{' '}
              <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-[var(--accent)]/10 border border-[var(--accent)]/20 text-[var(--accent)] text-[12px] align-middle mx-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] animate-pulse" />
                active
              </span>
              {' '}on <span className="text-white">KerjaCerdas</span> — leading backend engineering on an enterprise talent AI platform as part of a 4-person team. Most of my shipped work comes from team competitions and hackathons.{' '}
              <span className="text-white">NeuralVoid</span> is the one I built out of personal curiosity — behavioural analytics meets clinical AI.
            </p>

            <p>
              My approach:{' '}
              <span className="text-white">learn by shipping</span>. I use AI as a force multiplier — to prototype faster, test deeper, and build systems that hold up in production. CI/CD, type-safe APIs, and real test coverage are non-negotiable even in a hackathon.
            </p>

            <p>
              <span className="text-[var(--accent)]">Open to a 2-month remote internship.</span>{' '}
              I work best in teams where the code actually matters.
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
    <section id="experience" className="py-24 md:py-32 px-6 bg-[var(--bg)] border-t border-[var(--border)]">
      <div className="max-w-[1000px] mx-auto">
        <SectionHeading subtitle="Timeline" title="What I've been building" />

        <div className="relative border-l border-[var(--border)] ml-3 md:ml-[130px]">
          {EXPERIENCE.map((exp, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-8%' }}
              transition={{ duration: 0.7, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="relative pl-7 md:pl-12 pb-14 group last:pb-0"
            >
              {/* Timeline dot */}
              <div className="absolute top-1 left-[-6px] w-3 h-3 rounded-full bg-[var(--text-3)] border-4 border-[var(--bg)] group-hover:bg-[var(--accent)] transition-all duration-300" />
              {/* Glow on hover */}
              <div className="absolute top-[-2px] left-[-9px] w-5 h-5 rounded-full bg-[var(--accent)] opacity-0 group-hover:opacity-20 transition-opacity blur-[8px]" />

              <div className="flex flex-col md:flex-row md:items-baseline gap-2 md:gap-5 mb-3">
                <div className="flex items-center gap-2">
                  <span className="font-mono-dm text-[12px] text-[var(--accent)] tracking-widest uppercase">
                    {exp.year}
                  </span>
                  {exp.current && (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[var(--accent-dim)] border border-[var(--accent)]/30 font-mono-dm text-[9px] text-[var(--accent)] uppercase tracking-widest">
                      <span className="w-1 h-1 rounded-full bg-[var(--accent)] animate-pulse" />
                      Now
                    </span>
                  )}
                </div>
                <span className="font-mono-dm text-[10px] border border-[var(--border)] rounded px-3 py-1 max-w-max text-[var(--text-3)] uppercase tracking-wide">
                  {exp.company}
                </span>
              </div>

              <h3 className="font-display font-bold text-xl md:text-2xl mb-3 text-white group-hover:text-[var(--accent)] transition-colors duration-300">
                {exp.role}
              </h3>
              <p className="text-[var(--text-2)] text-sm md:text-base leading-relaxed max-w-[620px]">
                {exp.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════
   PROJECT SLIDESHOW COMPONENT
   ═══════════════════════════════════════ */
function ProjectSlideshow({ images, title }) {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (!images || images.length <= 1 || isPaused) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 3500);
    return () => clearInterval(timer);
  }, [images, isPaused]);

  if (!images || images.length === 0) return null;

  const nextSlide = () => setCurrent((prev) => (prev + 1) % images.length);
  const prevSlide = () => setCurrent((prev) => (prev - 1 + images.length) % images.length);

  const activeItem = images[current];
  const imgSrc = typeof activeItem === 'string' ? activeItem : activeItem.src;
  const imgCaption = typeof activeItem === 'object' ? activeItem.caption : null;

  return (
    <div
      className="relative w-full overflow-hidden rounded-xl border border-[var(--border)] bg-[#050505] mb-6 group/slideshow select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="relative aspect-[16/9] w-full overflow-hidden flex items-center justify-center bg-black/40">
        <AnimatePresence mode="wait">
          <motion.img
            key={current}
            src={imgSrc}
            alt={imgCaption || `${title} preview ${current + 1}`}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="w-full h-full object-cover rounded-xl"
          />
        </AnimatePresence>

        {/* Counter & Caption Overlay */}
        <div className="absolute top-3 left-3 flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/70 backdrop-blur-md border border-white/10 text-white font-mono-dm text-[11px] z-10 shadow-lg">
          <span className="text-[var(--accent)] font-bold">{current + 1} / {images.length}</span>
          {imgCaption && (
            <>
              <span className="text-white/30">|</span>
              <span className="text-white/90 truncate max-w-[180px] sm:max-w-[320px]">{imgCaption}</span>
            </>
          )}
        </div>

        {images.length > 1 && (
          <>
            {/* Prev Button */}
            <button
              onClick={prevSlide}
              aria-label="Previous slide"
              className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/70 backdrop-blur-md border border-white/10 flex items-center justify-center text-white opacity-100 md:opacity-0 md:group-hover/slideshow:opacity-100 transition-all duration-300 hover:bg-black/90 hover:scale-110 active:scale-95 z-10"
            >
              <ChevronLeft size={16} />
            </button>

            {/* Next Button */}
            <button
              onClick={nextSlide}
              aria-label="Next slide"
              className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/70 backdrop-blur-md border border-white/10 flex items-center justify-center text-white opacity-100 md:opacity-0 md:group-hover/slideshow:opacity-100 transition-all duration-300 hover:bg-black/90 hover:scale-110 active:scale-95 z-10"
            >
              <ChevronRight size={16} />
            </button>

            {/* Pagination Dots */}
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/70 backdrop-blur-md border border-white/10 shadow-lg max-w-[90vw] overflow-x-auto z-10">
              {images.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrent(idx)}
                  aria-label={`Go to slide ${idx + 1}`}
                  className={`h-2 rounded-full transition-all duration-300 shrink-0 ${
                    idx === current ? 'w-5 bg-[var(--accent)]' : 'w-2 bg-white/40 hover:bg-white/70'
                  }`}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════
   FEATURED PROJECT CARD (KerjaCerdas)
   ═══════════════════════════════════════ */
function FeaturedProjectCard({ project }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-8%' }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      className="relative w-full rounded-[var(--radius-card)] overflow-hidden bg-[#070707] group"
      style={{
        border: '1px solid transparent',
        backgroundImage:
          'linear-gradient(#070707, #070707), linear-gradient(135deg, rgba(255,90,54,0.55) 0%, rgba(255,140,105,0.2) 40%, rgba(255,255,255,0.06) 100%)',
        backgroundOrigin: 'border-box',
        backgroundClip: 'padding-box, border-box',
      }}
    >
      {/* Ambient glow behind the card */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 -left-20 w-[520px] h-[520px] rounded-full opacity-[0.07]"
        style={{ background: 'radial-gradient(circle, #FF5A36 0%, transparent 70%)' }}
      />

      {/* ── FEATURED BANNER ── */}
      <div className="flex items-center justify-between px-8 md:px-12 pt-8 md:pt-10 pb-0">
        <div className="flex items-center gap-3">
          <span className="font-mono-dm text-[10px] uppercase tracking-[0.28em] text-[var(--accent)] flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] animate-pulse" />
            Featured Project
          </span>
          {project.isTeam && (
            <div className="team-badge collab">
              <Users size={10} />
              {project.team}
            </div>
          )}
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-[var(--accent)]/30 bg-[var(--accent-dim)] font-mono-dm text-[9px] text-[var(--accent)] uppercase tracking-widest">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] animate-pulse" />
            Active
          </div>
        </div>
        <div className="flex flex-col items-end gap-1.5 shrink-0">
          <span className="font-mono-dm text-[11px] text-[var(--text-3)] uppercase tracking-widest">{project.year}</span>
          <span className="font-mono-dm text-[10px] text-[var(--text-3)] border border-[var(--border)] rounded-full px-3 py-0.5 uppercase tracking-wide">
            {project.role}
          </span>
        </div>
      </div>

      {/* ── FULL-BLEED SLIDESHOW ── */}
      {project.images && project.images.length > 0 && (
        <div className="px-8 md:px-12 pt-8">
          <ProjectSlideshow images={project.images} title={project.title} />
        </div>
      )}

      {/* ── MAIN CONTENT ── */}
      <div className="relative p-8 md:p-12">
        {/* Context */}
        <p className="font-mono-dm text-[10px] text-[var(--accent)] uppercase tracking-[0.22em] mb-2">
          {project.context}
        </p>

        {/* Category + Title — larger for featured */}
        <p className="font-mono-dm text-[10px] text-[var(--text-3)] uppercase tracking-[0.18em] mb-2">
          {project.category}
        </p>
        <h3 className="font-display font-bold text-4xl sm:text-5xl md:text-[56px] mb-5 text-white leading-tight tracking-tight">
          {project.title}
        </h3>

        {/* Description */}
        <p className="text-[var(--text-2)] text-base md:text-lg leading-relaxed max-w-3xl mb-8">
          {project.desc}
        </p>

        {/* ── BULLETS — always visible on featured ── */}
        <ul className="border-l-2 border-[var(--accent)]/30 pl-5 space-y-3.5 mb-8">
          {project.bullets.map((b, i) => (
            <motion.li
              key={i}
              initial={{ opacity: 0, x: -8 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 + i * 0.07 }}
              className="text-[var(--text-2)] text-sm md:text-[15px] leading-relaxed flex gap-3"
            >
              <ChevronRight size={13} className="mt-1.5 flex-shrink-0 text-[var(--accent)]" />
              <span>{b}</span>
            </motion.li>
          ))}
        </ul>

        {/* ── TAGS ── */}
        <div className="flex flex-wrap gap-2 mb-8">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1.5 rounded-full border border-[var(--accent)]/20 text-xs font-mono-dm text-[var(--accent)]/70 bg-[var(--accent-dim)] hover:border-[var(--accent)]/40 hover:text-[var(--accent)] transition-colors duration-200"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* ── ACTIONS ── */}
        <div className="flex flex-wrap items-center gap-3">
          {project.url && (
            <a
              href={project.url}
              target="_blank"
              rel="noreferrer"
              data-hover="true"
              className="btn-outline"
            >
              <Github size={12} />
              Source
            </a>
          )}
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer"
              data-hover="true"
              className="btn-primary"
            >
              <span className="flex items-center gap-2">
                <Globe size={12} />
                Live Demo
              </span>
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}


/* ═══════════════════════════════════════
   PROJECT CARD  (regular)
   ═══════════════════════════════════════ */
function ProjectCard({ project, idx }) {
  const [open, setOpen] = useState(false);
  const cardRef = useRef(null);
  const [pos, setPos] = useState({ x: -300, y: -300 });

  const handleMove = (e) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMove}
      onMouseLeave={() => setPos({ x: -300, y: -300 })}
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-12%' }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="relative w-full rounded-[var(--radius-card)] overflow-hidden border border-[var(--border)] bg-[#070707] group"
      style={{ willChange: 'transform' }}
    >
      {/* Mouse spotlight */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-[inherit]"
        style={{
          background: `radial-gradient(380px circle at ${pos.x}px ${pos.y}px, rgba(255,90,54,0.1), transparent 55%)`,
        }}
      />

      {/* Ghost index number */}
      <div className="absolute top-5 right-7 font-display font-bold text-[100px] md:text-[160px] leading-none text-white/[0.022] select-none pointer-events-none">
        {String(idx + 1).padStart(2, '0')}
      </div>

      <div className="relative p-8 md:p-12">
        {/* ── TOP ROW ── */}
        <div className="flex items-start justify-between gap-4 mb-7">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-[#050505] border border-[var(--border)] flex items-center justify-center text-[var(--accent)] group-hover:border-[var(--accent)] group-hover:scale-105 transition-all duration-400">
              {project.icon}
            </div>
            {project.isTeam ? (
              <div className="team-badge collab">
                <Users size={10} />
                {project.team}
              </div>
            ) : (
              <div className="team-badge">
                <User size={10} />
                {project.team}
              </div>
            )}
          </div>

          <div className="flex flex-col items-end gap-1.5 shrink-0">
            <span className="font-mono-dm text-[11px] text-[var(--text-3)] uppercase tracking-widest">
              {project.year}
            </span>
            <span className="font-mono-dm text-[10px] text-[var(--text-3)] border border-[var(--border)] rounded-full px-3 py-0.5 uppercase tracking-wide">
              {project.role}
            </span>
          </div>
        </div>

        {/* Context tag */}
        <p className="font-mono-dm text-[10px] text-[var(--accent)] uppercase tracking-[0.22em] mb-2">
          {project.context}
        </p>

        {/* Title */}
        <p className="font-mono-dm text-[10px] text-[var(--text-3)] uppercase tracking-[0.18em] mb-1.5">
          {project.category}
        </p>
        <h3 className="font-display font-bold text-3xl md:text-4xl mb-4 text-white group-hover:text-[var(--accent)] transition-colors duration-300 leading-tight">
          {project.title}
        </h3>

        {/* Description */}
        <p className="text-[var(--text-2)] text-sm md:text-base leading-relaxed max-w-2xl mb-4">
          {project.desc}
        </p>

        {/* First bullet teaser — visible without expanding */}
        {project.bullets?.[0] && (
          <p className="flex items-start gap-2.5 text-[var(--text-3)] text-[13px] leading-relaxed mb-5 italic border-l border-[var(--border)] pl-3">
            {project.bullets[0]}
          </p>
        )}

        {/* ── EXPANDABLE BULLETS & SLIDESHOW ── */}
        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden pt-2"
            >
              {project.images && project.images.length > 0 && (
                <ProjectSlideshow images={project.images} title={project.title} />
              )}
              <ul className="border-l-2 border-[var(--accent)]/30 pl-5 space-y-3 mb-6">
                {project.bullets.slice(1).map((b, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 + i * 0.06 }}
                    className="text-[var(--text-2)] text-sm md:text-[15px] leading-relaxed flex gap-3"
                  >
                    <ChevronRight size={13} className="mt-1.5 flex-shrink-0 text-[var(--accent)]" />
                    <span>{b}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── TAGS ── */}
        <div className="flex flex-wrap gap-2 mb-7">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1.5 rounded-full border border-[var(--border)] text-xs font-mono-dm text-[var(--text-3)] bg-black/40 hover:border-[var(--border-hover)] hover:text-[var(--text-2)] transition-colors duration-200"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* ── ACTION ROW ── */}
        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => setOpen((v) => !v)}
            data-hover="true"
            className="btn-outline"
          >
            {open ? <Minus size={12} /> : <Plus size={12} />}
            {open ? 'Hide details' : 'View details'}
          </button>

          {project.url && (
            <a href={project.url} target="_blank" rel="noreferrer" data-hover="true" className="btn-outline">
              <Github size={12} />
              Source
            </a>
          )}

          {project.videoUrl && (
            <a href={project.videoUrl} target="_blank" rel="noreferrer" data-hover="true" className="btn-primary">
              <span className="flex items-center gap-2">
                <ExternalLink size={12} />
                Demo Video
              </span>
            </a>
          )}

          {project.liveUrl && (
            <a href={project.liveUrl} target="_blank" rel="noreferrer" data-hover="true" className="btn-primary">
              <span className="flex items-center gap-2">
                <Globe size={12} />
                Live Demo
              </span>
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}


function ProjectsGallery() {
  const featured = PROJECTS.find((p) => p.isFeatured);
  const rest = PROJECTS.filter((p) => !p.isFeatured);

  return (
    <section
      id="work"
      className="bg-[#060606] w-full py-24 md:py-32 relative z-10 border-t border-[var(--border)]"
    >
      <div className="max-w-[1200px] mx-auto px-6 md:px-12 w-full mb-14 md:mb-20">
        <SectionHeading
          subtitle="Selected Works"
          title="Featured Projects"
          description="Production AI architectures and machine learning systems built for scalability and real-world deployment."
        />
      </div>

      <div className="relative w-full max-w-[1200px] mx-auto px-6 md:px-12 pb-16 flex flex-col gap-8 md:gap-12">
        {/* Featured card — full-bleed hero treatment */}
        {featured && <FeaturedProjectCard project={featured} />}

        {/* Regular project cards */}
        {rest.map((project, idx) => (
          <ProjectCard key={project.title} project={project} idx={idx} />
        ))}
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════
   EDUCATION
   ═══════════════════════════════════════ */
function EducationSection() {
  const start = new Date('2024-09-01').getTime();
  const end = new Date('2028-09-01').getTime();
  const pct = Math.max(0, Math.min(1, (Date.now() - start) / (end - start)));
  const circumference = 2 * Math.PI * 56;
  const dashOffset = circumference * (1 - pct);

  return (
    <section
      id="education"
      className="py-20 md:py-32 px-4 sm:px-6 bg-[var(--bg)] border-t border-[var(--border)]"
    >
      <div className="max-w-[1100px] mx-auto">
        <SectionHeading subtitle="Education" title="Building the foundation." />

        <motion.div
          initial={{ opacity: 0, y: 36 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-8%' }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="rounded-3xl border border-[var(--border)] bg-[#080808] p-7 sm:p-10 md:p-12 flex flex-col md:flex-row gap-8 md:gap-14 items-start"
        >
          {/* Progress ring */}
          <div className="relative w-[120px] h-[120px] sm:w-[140px] sm:h-[140px] flex-shrink-0 self-center md:self-start">
            <svg viewBox="0 0 130 130" className="w-full h-full -rotate-90">
              <circle cx="65" cy="65" r="56" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="5" />
              <motion.circle
                cx="65" cy="65" r="56"
                fill="none" stroke="var(--accent)" strokeWidth="5" strokeLinecap="round"
                strokeDasharray={circumference}
                initial={{ strokeDashoffset: circumference }}
                whileInView={{ strokeDashoffset: dashOffset }}
                viewport={{ once: true }}
                transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <span className="font-display font-bold text-3xl text-white">
                {Math.round(pct * 100)}%
              </span>
              <span className="font-mono-dm text-[9px] uppercase tracking-widest text-[var(--text-3)]">
                in progress
              </span>
            </div>
          </div>

          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <GraduationCap size={17} className="text-[var(--accent)]" />
              <span className="font-mono-dm text-[10px] uppercase tracking-widest text-[var(--text-3)]">
                {EDUCATION.start} to Expected {EDUCATION.expected}
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-[var(--accent)]/30 bg-[var(--accent-dim)] text-[10px] font-mono-dm text-[var(--accent)] uppercase tracking-widest">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] animate-pulse" />
                Ongoing
              </span>
            </div>

            <h3 className="font-display font-bold text-2xl sm:text-3xl md:text-4xl text-white mb-2">
              {EDUCATION.degree}
            </h3>
            <p className="text-[var(--text-2)] mb-1">
              {EDUCATION.school}{' '}
              <span className="text-[var(--text-3)]">: {EDUCATION.location}</span>
            </p>
            <p className="text-[var(--accent)] font-mono-dm text-sm mb-6">GPA {EDUCATION.gpa}</p>

            <ul className="grid sm:grid-cols-2 gap-3 mb-6">
              {EDUCATION.highlights.map((h) => (
                <li key={h} className="flex items-start gap-2 text-[var(--text-2)] text-sm">
                  <ChevronRight size={13} className="mt-1 text-[var(--accent)] flex-shrink-0" />
                  <span>{h}</span>
                </li>
              ))}
            </ul>

            {EDUCATION.learning && (
              <div className="pt-5 border-t border-[var(--border)]">
                <p className="font-mono-dm text-[10px] uppercase tracking-widest text-[var(--text-3)] mb-3">
                  Currently exploring
                </p>
                <div className="flex flex-wrap gap-2">
                  {EDUCATION.learning.map((item) => (
                    <span key={item} className="px-3 py-1.5 rounded-full border border-[var(--border)] text-xs font-mono-dm text-[var(--text-2)] bg-black/30 hover:border-[var(--border-hover)] transition-colors">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════
   AWARDS
   ═══════════════════════════════════════ */
function AwardsSection() {
  return (
    <section
      id="awards"
      className="py-20 md:py-32 px-4 sm:px-6 bg-[#050505] border-t border-[var(--border)]"
    >
      <div className="max-w-[1100px] mx-auto">
        <SectionHeading subtitle="Recognition" title="Awards & competitions" />

        <div className="grid md:grid-cols-2 gap-7 md:gap-9">
          {AWARDS.map((a, idx) => (
            <motion.div
              key={a.title}
              initial={{ opacity: 0, y: 36 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -4, scale: 1.015 }}
              viewport={{ once: true, margin: '-8%' }}
              transition={{ duration: 0.8, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="relative rounded-2xl border border-[var(--border)] bg-[#0A0A0A] p-8 shadow-xl overflow-hidden group flex flex-col"
            >
              <div className="absolute -top-16 -right-16 w-52 h-52 bg-[var(--accent)] opacity-[0.06] blur-[60px] rounded-full pointer-events-none" />

              <div className="flex items-center justify-between mb-6">
                <div className="w-11 h-11 rounded-xl bg-[#050505] border border-[var(--border)] flex items-center justify-center text-[var(--accent)] group-hover:border-[var(--accent)] transition-all duration-300">
                  {a.icon}
                </div>
                <span className="font-mono-dm text-[11px] uppercase tracking-widest text-[var(--text-3)]">
                  {a.date}
                </span>
              </div>

              <p className="font-display font-bold text-2xl md:text-3xl text-[var(--accent)] mb-2">
                {a.place}
              </p>
              <h3 className="font-display font-semibold text-xl text-white mb-1">{a.title}</h3>
              <p className="font-mono-dm text-[10px] uppercase tracking-widest text-[var(--text-3)] mb-4">
                {a.org}
              </p>
              <p className="text-[var(--text-2)] text-sm leading-relaxed mb-5 flex-1">{a.note}</p>

              {/* ── PHOTO THUMBNAIL STRIP ── */}
              {a.photos && a.photos.length > 0 && (
                <div className="flex gap-2 overflow-x-auto pb-1 mb-4 scrollbar-none">
                  {a.photos.map((ph, i) => (
                    <a
                      key={i}
                      href={ph.src}
                      target="_blank"
                      rel="noreferrer"
                      title={ph.caption}
                      className="flex-shrink-0 w-20 h-14 rounded-lg overflow-hidden border border-[var(--border)] hover:border-[var(--accent)]/50 transition-all duration-200 group/ph"
                    >
                      <img
                        src={ph.src}
                        alt={ph.caption}
                        className="w-full h-full object-cover opacity-70 group-hover/ph:opacity-100 transition-opacity duration-200"
                      />
                    </a>
                  ))}
                </div>
              )}

              {/* ── DOCUMENT / VIDEO ACTIONS ── */}
              {((a.docs && a.docs.filter(d => d.url).length > 0) || (a.videos && a.videos.length > 0)) && (
                <div className="flex flex-wrap gap-2 pt-4 border-t border-[var(--border)]">
                  {a.docs && a.docs.filter(d => d.url).map((doc) => (
                    <a
                      key={doc.label}
                      href={doc.url}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[var(--border)] text-[11px] font-mono-dm text-[var(--text-3)] hover:border-[var(--accent)]/50 hover:text-[var(--accent)] transition-all duration-200 bg-black/30"
                    >
                      <ExternalLink size={10} />
                      {doc.label}
                    </a>
                  ))}
                  {a.videos && a.videos.map((vid) => (
                    <a
                      key={vid.label}
                      href={vid.url}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[var(--accent)]/20 text-[11px] font-mono-dm text-[var(--accent)]/80 hover:border-[var(--accent)]/60 hover:text-[var(--accent)] transition-all duration-200 bg-[var(--accent-dim)]"
                    >
                      <ExternalLink size={10} />
                      {vid.label}
                    </a>
                  ))}
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════
   SKILLS GRID
   ═══════════════════════════════════════ */
function SkillsGrid() {
  return (
    <section id="skills" className="py-20 md:py-32 px-4 sm:px-6 border-t border-[var(--border)] bg-[#060606]">
      <div className="max-w-[1200px] mx-auto">
        <SectionHeading
          subtitle="Capabilities"
          title="What I can do for you."
          description="Three focused areas — from training a model to shipping the API around it."
          align="center"
        />

        {/* Competency cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-12">
          {CORE_COMPETENCIES.map((comp, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 36 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-8%' }}
              transition={{ duration: 0.7, delay: idx * 0.12, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -5 }}
              className="flex flex-col p-7 md:p-8 border border-[var(--border)] rounded-3xl bg-[#080808] group transition-all duration-300 hover:border-[var(--accent)]/30 hover:shadow-[0_0_40px_rgba(255,90,54,0.06)]"
            >
              {/* Header */}
              <div className="flex items-center gap-3 mb-3">
                <div className="w-9 h-9 rounded-xl bg-[#050505] border border-[var(--border)] flex items-center justify-center text-[var(--accent)] group-hover:border-[var(--accent)]/60 transition-all duration-300">
                  {comp.icon}
                </div>
                <h3 className="font-display font-bold text-lg text-white">{comp.title}</h3>
              </div>

              {/* Tagline */}
              <p className="text-[var(--text-3)] text-[12px] italic mb-5 leading-relaxed">{comp.tagline}</p>

              {/* Capability bullets */}
              <ul className="flex flex-col gap-2.5 flex-1">
                {comp.items.map((item, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2.5 text-[var(--text-2)] group-hover:text-[var(--text-1)] transition-colors duration-500"
                    style={{ transitionDelay: `${i * 35}ms` }}
                  >
                    <ChevronRight size={12} className="mt-0.5 flex-shrink-0 text-[var(--accent)] opacity-40 group-hover:opacity-70 transition-opacity" />
                    <span className="text-sm leading-snug">{item}</span>
                  </li>
                ))}
              </ul>

              {/* Tool pills — specific tech used in this area */}
              <div className="flex flex-wrap gap-1.5 pt-5 mt-5 border-t border-[var(--border)]">
                {comp.tools.map((tool) => (
                  <span
                    key={tool}
                    className="px-2.5 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] font-mono-dm text-[10px] text-[var(--text-3)] group-hover:border-[var(--accent)]/20 group-hover:text-[var(--text-2)] transition-all duration-500"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Languages strip — minimal, just the foundation layer */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-8%' }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-start sm:items-center gap-3 px-1"
        >
          <span className="font-mono-dm text-[10px] uppercase tracking-widest text-[var(--text-3)] shrink-0">
            Languages
          </span>
          <div className="flex flex-wrap gap-2">
            {LANGUAGES.map((lang) => (
              <span
                key={lang}
                className="px-3 py-1 rounded-full border border-[var(--border)] text-xs font-mono-dm text-[var(--text-2)] hover:border-[var(--border-hover)] transition-colors"
              >
                {lang}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════
   CTA SECTION
   ═══════════════════════════════════════ */
function CTASection() {
  return (
    <section className="py-24 md:py-44 px-5 sm:px-6 relative overflow-hidden bg-[var(--bg)] border-t border-[var(--border)]">
      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[var(--accent)] blur-[200px] opacity-[0.04] rounded-full pointer-events-none" />

      <div className="max-w-[780px] mx-auto text-center relative z-10">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-8%' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="font-mono-dm text-[11px] tracking-widest uppercase text-[var(--accent)] mb-5"
        >
          // available · 2-month remote internship
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 36 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-8%' }}
          transition={{ duration: 0.9, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
          className="font-display font-bold text-4xl sm:text-5xl md:text-[68px] mb-6 md:mb-7 tracking-tight text-white leading-[1.05]"
        >
          Let's build <br />
          something useful.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-8%' }}
          transition={{ duration: 0.8, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
          className="text-[var(--text-2)] text-base sm:text-lg md:text-xl mb-10 md:mb-12 max-w-[560px] mx-auto leading-relaxed"
        >
          I'm a 3rd-year AI Engineering student open to 2-month remote internships. If you're building something AI-heavy and want someone who actually ships — reach out.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-8%' }}
          transition={{ duration: 0.8, delay: 0.24, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row items-center justify-center gap-5"
        >
          <LiquidMetalButton
            label="Send an Email"
            onClick={() => (window.location.href = 'mailto:davidk.academic@gmail.com')}
          />
          <a
            href="https://www.linkedin.com/in/davidkurniawan13/"
            target="_blank"
            className="font-mono-dm text-[11px] tracking-widest uppercase text-[var(--text-2)] hover:text-white transition-colors underline underline-offset-8 decoration-[var(--border)] hover:decoration-white"
            data-hover="true"
          >
            LinkedIn Profile →
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
    <footer
      id="contact"
      className="pt-14 pb-10 sm:pb-8 px-4 sm:px-6 bg-[#030303] relative z-20 overflow-hidden border-t border-[var(--border)]"
    >
      {/* Top gradient line */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[var(--border)] to-transparent" />

      <div className="max-w-[1200px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 sm:gap-10 mb-10 sm:mb-14">
        <div className="col-span-2">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-8 h-8 rounded bg-[#0e0e0e] border border-[var(--border)] flex items-center justify-center text-[var(--accent)]">
              <Code size={15} />
            </div>
            <span className="font-display font-bold text-lg text-white">David Kurniawan.</span>
          </div>
          <p className="text-[var(--text-3)] max-w-sm text-sm leading-relaxed">
            AI engineering student. Building multi-agent systems, ML pipelines, and the backend
            plumbing that holds it all together.
          </p>
        </div>

        <div>
          <h4 className="font-mono-dm text-white tracking-widest uppercase text-[10px] mb-5">
            Navigate
          </h4>
          <ul className="flex flex-col gap-3.5">
            {[
              { label: 'About', id: 'about' },
              { label: 'Timeline', id: 'experience' },
              { label: 'Projects', id: 'work' },
              { label: 'Awards', id: 'awards' },
            ].map((link) => (
              <li key={link.id}>
                <button
                  onClick={() => document.getElementById(link.id)?.scrollIntoView({ behavior: 'smooth' })}
                  className="text-[var(--text-3)] hover:text-white transition-colors text-sm"
                >
                  {link.label}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-mono-dm text-white tracking-widest uppercase text-[10px] mb-5">
            Connect
          </h4>
          <ul className="flex flex-col gap-3.5">
            <li>
              <a
                href="https://github.com/LouSens"
                target="_blank"
                className="text-[var(--text-3)] hover:text-white transition-colors flex items-center gap-2 text-sm group"
              >
                <Github size={14} className="text-[var(--accent)] opacity-40 group-hover:opacity-100 transition-opacity" />
                GitHub
              </a>
            </li>
            <li>
              <a
                href="https://www.linkedin.com/in/davidkurniawan13/"
                target="_blank"
                className="text-[var(--text-3)] hover:text-white transition-colors flex items-center gap-2 text-sm group"
              >
                <Linkedin size={14} className="text-[var(--accent)] opacity-40 group-hover:opacity-100 transition-opacity" />
                LinkedIn
              </a>
            </li>
            <li>
              <a
                href="mailto:davidk.academic@gmail.com"
                className="text-[var(--text-3)] hover:text-white transition-colors flex items-center gap-2 text-sm group"
              >
                <Mail size={14} className="text-[var(--accent)] opacity-40 group-hover:opacity-100 transition-opacity" />
                Email
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto pt-7 border-t border-[var(--border)] flex flex-col md:flex-row justify-between items-center gap-3 text-[10px] font-mono-dm text-[var(--text-3)] uppercase tracking-widest text-center md:text-left">
        <p>© {new Date().getFullYear()} David Kurniawan. All rights reserved.</p>
      </div>
    </footer>
  );
}
