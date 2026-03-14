import React, { useState, useEffect, useRef, useCallback } from 'react';

/* ─────────────────────────────────────────
   CONSTANTS
───────────────────────────────────────── */
const GEMINI_MODEL = 'gemini-1.5-flash';
const GEMINI_BASE = 'https://generativelanguage.googleapis.com/v1beta/models';

const ALL_PROJECTS = [
  { title: 'Multimodal Financial Sentiment Correlator', category: 'Deep Learning',    color: 'from-cyan-500 to-teal-400',     metrics: 'R²: 0.97 | MSE: 0.024',         githubUrl: 'https://github.com/LouSens/multimodal-financial-sentiment-correlator' },
  { title: 'Sentiment Vector Space',                   category: 'Natural Language',  color: 'from-teal-400 to-blue-500',     metrics: 'Tokens: 50k | F1: 0.88',         githubUrl: 'https://github.com/LouSens/sentiment-vector-space' },
  { title: 'Algorithmic Forecaster',                   category: 'Data Science',      color: 'from-blue-500 to-indigo-500',   metrics: 'R²: 0.85 | MSE: 0.04',          githubUrl: 'https://github.com/LouSens/algorithmic-forecaster' },
  { title: 'LLM Prompt Optimizer',                     category: 'Generative AI',     color: 'from-indigo-400 to-cyan-500',   metrics: 'Latency: −40% | Tokens: −20%',   githubUrl: 'https://github.com/LouSens/llm-prompt-optimizer' },
  { title: 'Audio Speech Recognition',                 category: 'Deep Learning',     color: 'from-emerald-400 to-teal-500',  metrics: 'WER: 4.2% | RTF: 0.8',          githubUrl: 'https://github.com/LouSens/audio-speech-recognition' },
  { title: 'Customer Churn Predictor',                 category: 'Data Science',      color: 'from-orange-400 to-red-500',    metrics: 'AUC: 0.91 | Precision: 88%',    githubUrl: 'https://github.com/LouSens/customer-churn-predictor' },
  { title: 'Semantic Search Engine',                   category: 'Natural Language',  color: 'from-pink-400 to-rose-500',     metrics: 'Recall@10: 94%',                 githubUrl: 'https://github.com/LouSens/semantic-search-engine' },
];

const SYSTEM_PROMPT = `You are the AI interface embedded in the portfolio of David Huang, an Indonesian undergraduate AI student at Xiamen University Malaysia.

KNOWLEDGE BASE:
- Skills: Python, TensorFlow, PyTorch, Pandas, NumPy, Scikit-Learn, Prompt Engineering, FastAPI, Flask, C.
- Projects: 1) Vision Matrix Classifier (CNNs, 92% Acc). 2) Sentiment Vector Space (NLP, Transformers, F1: 0.88). 3) Algorithmic Forecaster (Data Science, R²: 0.85). 4) LLM Prompt Optimizer (Latency −40%). 5) Audio Speech Recognition (WER 4.2%). 6) Customer Churn Predictor (AUC 0.91). 7) Semantic Search Engine (Recall@10 94%).
- Education: BEng in Artificial Intelligence at Xiamen University Malaysia. Focuses on theoretical math and applied ML.

RULES:
1. Answer queries concisely based ONLY on the Knowledge Base above.
2. Be professional, concise, and highlight David's technical depth.
3. If the user asks about something NOT in the Knowledge Base, reply EXACTLY: "I do not have that data in my current knowledge base. Please contact David directly via Email or LinkedIn in the Contact section below."`;

/* ─────────────────────────────────────────
   GEMINI API HELPER
───────────────────────────────────────── */
async function callGemini(prompt, systemInstruction = null, signal = null) {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  if (!apiKey) throw new Error('VITE_GEMINI_API_KEY is not set in .env');

  const endpoint = `${GEMINI_BASE}/${GEMINI_MODEL}:generateContent?key=${apiKey}`;

  const body = {
    contents: [{ parts: [{ text: prompt }] }],
    ...(systemInstruction && { systemInstruction: { parts: [{ text: systemInstruction }] } }),
    generationConfig: { maxOutputTokens: 300, temperature: 0.7 },
  };

  const res = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
    signal,
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err?.error?.message || `HTTP ${res.status}`);
  }

  const data = await res.json();
  const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!text) throw new Error('Empty response from Gemini');
  return text;
}

/* ─────────────────────────────────────────
   HOOKS
───────────────────────────────────────── */
function useCountUp(target, duration = 2000, active = false) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!active) return;
    let raf;
    let start = null;

    const tick = (ts) => {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, duration, active]);

  return count;
}

function useIntersection(ref, threshold = 0.3) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [ref, threshold]);
  return visible;
}

/* ─────────────────────────────────────────
   ROOT APP
───────────────────────────────────────── */
export default function App() {
  const [ready, setReady] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [view, setView] = useState('home');

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    setReady(true);
    return () => window.removeEventListener('resize', check);
  }, []);

  if (!ready) return null;

  return (
    <div className="relative min-h-screen overflow-x-hidden" style={{ background: 'var(--bg-base)', color: '#c8d6e5' }}>
      {/* Persistent ambient background */}
      <AmbientBackground />
      <ThreeJSBackground isMobile={isMobile} />

      {view === 'home' && <Navbar />}

      {view === 'home' ? (
        <main className="relative z-10">
          <HeroSection />
          <AboutSection />
          <MetricsSection />
          <ProjectsSection onOpenLibrary={() => { window.scrollTo(0, 0); setView('library'); }} />
          <FooterSection />
        </main>
      ) : (
        <div className="relative z-10">
          <ProjectLibrary onClose={() => setView('home')} />
        </div>
      )}
    </div>
  );
}

/* ─────────────────────────────────────────
   AMBIENT BACKGROUND — layered radial glows
───────────────────────────────────────── */
function AmbientBackground() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      {/* Top-left cyan blob */}
      <div style={{
        position: 'absolute', top: '-10%', left: '-5%',
        width: 600, height: 600,
        background: 'radial-gradient(circle, rgba(6,242,212,0.07) 0%, transparent 70%)',
        filter: 'blur(40px)',
      }} />
      {/* Bottom-right blue blob */}
      <div style={{
        position: 'absolute', bottom: '-10%', right: '-5%',
        width: 700, height: 700,
        background: 'radial-gradient(circle, rgba(6,182,212,0.06) 0%, transparent 70%)',
        filter: 'blur(60px)',
      }} />
      {/* Center subtle glow */}
      <div style={{
        position: 'absolute', top: '40%', left: '50%',
        transform: 'translate(-50%,-50%)',
        width: 900, height: 400,
        background: 'radial-gradient(ellipse, rgba(6,242,212,0.03) 0%, transparent 65%)',
        filter: 'blur(30px)',
      }} />
    </div>
  );
}

/* ─────────────────────────────────────────
   NAVBAR
───────────────────────────────────────── */
function Navbar() {
  const [open, setOpen] = useState(false);

  const scroll = (e, id) => {
    e.preventDefault();
    setOpen(false);
    if (id === 'top') { window.scrollTo({ top: 0, behavior: 'smooth' }); return; }
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const links = [
    { label: 'Home',    id: 'ai-terminal' },
    { label: 'About',   id: 'about' },
    { label: 'Works',   id: 'neural_models' },
    { label: 'Contact', id: 'contact' },
  ];

  return (
    <>
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
        backdropFilter: 'blur(20px) saturate(180%)',
        WebkitBackdropFilter: 'blur(20px) saturate(180%)',
        background: 'rgba(7,11,20,0.75)',
        borderBottom: '1px solid var(--glass-border)',
        boxShadow: '0 4px 24px rgba(0,0,0,0.4)',
      }} className="px-4 md:px-8 py-4 flex justify-between items-center">

        <a href="#top" onClick={e => scroll(e, 'top')} style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.1rem', color: '#fff', textDecoration: 'none', letterSpacing: '-0.02em' }}>
          David<span style={{ color: 'var(--accent)' }}>.</span>
        </a>

        {/* Desktop nav */}
        <div className="hidden md:flex gap-8" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', letterSpacing: '0.12em' }}>
          {links.map(l => (
            <a key={l.id} href={`#${l.id}`} onClick={e => scroll(e, l.id)}
              style={{ color: '#8a9ab8', textDecoration: 'none', textTransform: 'uppercase', transition: 'color 0.2s' }}
              onMouseEnter={e => e.target.style.color = 'var(--accent)'}
              onMouseLeave={e => e.target.style.color = '#8a9ab8'}>
              {l.label}
            </a>
          ))}
        </div>

        {/* Hamburger */}
        <button onClick={() => setOpen(v => !v)} className="md:hidden" style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer', padding: 8 }}>
          <svg width="22" height="22" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {open
              ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />}
          </svg>
        </button>
      </nav>

      {/* Mobile drawer */}
      <div className="md:hidden" style={{
        position: 'fixed', inset: 0, zIndex: 40,
        background: 'rgba(7,11,20,0.97)',
        backdropFilter: 'blur(24px)',
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '2.5rem',
        transform: open ? 'translateX(0)' : 'translateX(100%)',
        transition: 'transform 0.32s cubic-bezier(.16,1,.3,1)',
      }}>
        {links.map(l => (
          <a key={l.id} href={`#${l.id}`} onClick={e => scroll(e, l.id)}
            style={{ fontFamily: 'var(--font-mono)', fontSize: '1.1rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#c8d6e5', textDecoration: 'none' }}>
            {l.label}
          </a>
        ))}
      </div>
    </>
  );
}

/* ─────────────────────────────────────────
   HERO — AI TERMINAL
───────────────────────────────────────── */
function HeroSection() {
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const abortRef = useRef(null);

  const suggestions = [
    'What ML frameworks do you know?',
    'Tell me about the Speech Recognition project.',
    'What is your strongest skill?',
  ];

  const submit = useCallback(async (text) => {
    if (!text.trim() || loading) return;

    // cancel any in-flight request
    if (abortRef.current) abortRef.current.abort();
    abortRef.current = new AbortController();

    setLoading(true);
    setResponse('');
    setError('');

    try {
      const text_out = await callGemini(text, SYSTEM_PROMPT, abortRef.current.signal);
      setResponse(text_out);
    } catch (err) {
      if (err.name !== 'AbortError') {
        setError('Neural core unreachable. Check your API key or network.');
      }
    } finally {
      setLoading(false);
    }
  }, [loading]);

  const handleSubmit = (e) => {
    e.preventDefault();
    submit(query);
  };

  // cleanup on unmount
  useEffect(() => () => abortRef.current?.abort(), []);

  return (
    <section id="ai-terminal" style={{ minHeight: '100svh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '7rem 1.5rem 4rem' }}>
      <div id="top" style={{ position: 'absolute', top: 0 }} />

      <div className="animate-fade-up" style={{ maxWidth: 760, width: '100%', textAlign: 'center' }}>

        {/* Badge */}
        <div className="animate-fade-up delay-100" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: '1.5rem', padding: '6px 16px', borderRadius: 999, background: 'var(--accent-dim)', border: '1px solid var(--glass-border-accent)', fontFamily: 'var(--font-mono)', fontSize: '0.65rem', letterSpacing: '0.15em', color: 'var(--accent)', textTransform: 'uppercase' }}>
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--accent)', boxShadow: '0 0 8px var(--accent)' }} className="animate-pulse-glow" />
          AI Architect · Portfolio v2
        </div>

        <h1 className="animate-fade-up delay-200" style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 'clamp(2.8rem, 8vw, 5.5rem)', lineHeight: 1.0, letterSpacing: '-0.03em', color: '#ffffff', marginBottom: '1.25rem' }}>
          Interactive<br />
          <span style={{ color: 'var(--accent)', textShadow: '0 0 40px rgba(6,242,212,0.35)' }}>Résumé</span>
        </h1>

        <p className="animate-fade-up delay-300" style={{ fontSize: 'clamp(0.9rem, 2.5vw, 1.1rem)', color: '#8a9ab8', lineHeight: 1.7, marginBottom: '2.5rem', maxWidth: 540, marginLeft: 'auto', marginRight: 'auto' }}>
          Don't just read about my capabilities — query my embedded AI assistant to extract
          skills, projects, and academic background in real time.
        </p>

        {/* Terminal card */}
        <div className="animate-fade-up delay-400 glass-card gradient-border" style={{ position: 'relative', padding: '1.5rem', textAlign: 'left' }}>

          {/* Top accent line */}
          <div style={{ position: 'absolute', top: 0, left: '10%', right: '10%', height: 1, background: 'linear-gradient(90deg, transparent, var(--accent), transparent)', opacity: 0.6 }} />

          {/* Input row */}
          <form onSubmit={handleSubmit} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div className="neu-inset" style={{ flex: 1, display: 'flex', alignItems: 'center', padding: '0 1rem', gap: 10 }}>
              <svg width="16" height="16" fill="none" stroke="var(--accent)" viewBox="0 0 24 24" style={{ flexShrink: 0, opacity: 0.8 }}>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="Query the knowledge base..."
                style={{ flex: 1, background: 'none', border: 'none', outline: 'none', color: '#e2e8f0', fontFamily: 'var(--font-mono)', fontSize: '0.82rem', padding: '0.8rem 0', caretColor: 'var(--accent)' }}
              />
            </div>
            <button type="submit" disabled={loading || !query.trim()} className="neu-btn"
              style={{ padding: '0.7rem 1.2rem', fontFamily: 'var(--font-mono)', fontSize: '0.65rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: loading ? '#8a9ab8' : 'var(--accent)', cursor: 'pointer', whiteSpace: 'nowrap', opacity: (!query.trim() || loading) ? 0.5 : 1 }}>
              {loading ? '...' : 'Execute'}
            </button>
          </form>

          {/* Suggestions */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, paddingTop: '0.9rem', borderTop: '1px solid var(--glass-border)', marginTop: '0.9rem' }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: '#4a5a72', letterSpacing: '0.1em', textTransform: 'uppercase', paddingTop: 4, marginRight: 4 }}>Try:</span>
            {suggestions.map((s, i) => (
              <button key={i} onClick={() => { setQuery(s); submit(s); }}
                style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid var(--glass-border)', borderRadius: 8, padding: '4px 10px', fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: '#8a9ab8', cursor: 'pointer', transition: 'all 0.2s', textAlign: 'left' }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--glass-border-accent)'; e.currentTarget.style.color = 'var(--accent)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--glass-border)'; e.currentTarget.style.color = '#8a9ab8'; }}>
                {s}
              </button>
            ))}
          </div>

          {/* Response area */}
          {(loading || response || error) && (
            <div className="neu-inset animate-slide-down" style={{ marginTop: '1rem', padding: '1rem 1.2rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: '0.6rem', paddingBottom: '0.6rem', borderBottom: '1px solid var(--glass-border)' }}>
                <div style={{ width: 7, height: 7, borderRadius: '50%', background: loading ? '#f59e0b' : (error ? '#f43f5e' : 'var(--accent)'), boxShadow: loading ? '0 0 8px #f59e0b' : (error ? '0 0 8px #f43f5e' : '0 0 8px var(--accent)') }} className={loading ? 'animate-pulse-glow' : ''} />
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#4a5a72' }}>
                  {loading ? 'Processing…' : error ? 'Error' : 'Response Acquired'}
                </span>
              </div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.82rem', color: '#c8d6e5', lineHeight: 1.7 }}>
                {loading ? (
                  <div style={{ display: 'flex', gap: 4, alignItems: 'center', padding: '4px 0' }}>
                    {[0, 1, 2].map(i => (
                      <span key={i} style={{ width: 6, height: 20, background: 'var(--accent)', borderRadius: 3, display: 'inline-block', animation: `bounce 0.8s ${i * 0.15}s ease-in-out infinite alternate` }} />
                    ))}
                    <style>{`@keyframes bounce { from { transform: scaleY(0.4); } to { transform: scaleY(1.0); } }`}</style>
                  </div>
                ) : error ? (
                  <span style={{ color: '#f87171' }}>{error}</span>
                ) : (
                  <p className="cursor-blink" style={{ '--blink-hide': 'none' }}>{response}</p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────
   ABOUT
───────────────────────────────────────── */
function AboutSection() {
  const skills = ['Python', 'TensorFlow', 'PyTorch', 'Pandas', 'NumPy', 'Scikit-Learn', 'FastAPI', 'Flask', 'C', 'Prompt Engineering'];
  const ref = useRef(null);
  const visible = useIntersection(ref, 0.15);

  return (
    <section id="about" ref={ref} style={{ padding: '7rem 1.5rem', maxWidth: 1100, margin: '0 auto' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3.5rem', alignItems: 'center' }}>

        <div className={visible ? 'animate-fade-up' : ''} style={{ opacity: visible ? undefined : 0 }}>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: '1rem' }}>01 // Identification</p>
          <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 'clamp(2rem, 5vw, 3rem)', lineHeight: 1.15, letterSpacing: '-0.025em', color: '#fff', marginBottom: '1.5rem' }}>
            Synthesizing data<br />into <span style={{ color: 'var(--accent)' }}>intelligence.</span>
          </h2>
          <p style={{ color: '#8a9ab8', lineHeight: 1.8, marginBottom: '1rem' }}>
            Indonesian undergraduate pursuing a BEng in Artificial Intelligence at Xiamen University Malaysia.
            My focus bridges theoretical mathematics with production-grade machine learning.
          </p>
          <p style={{ color: '#8a9ab8', lineHeight: 1.8, marginBottom: '2rem' }}>
            While I leverage advanced LLMs to accelerate problem-solving, my core goal is deeply understanding
            neural architectures, matrix operations, and classical algorithms from first principles.
          </p>

          {/* Skill chips */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: '2rem' }}>
            {skills.map((s, i) => (
              <span key={i} style={{ padding: '5px 12px', background: 'var(--glass-bg)', border: '1px solid var(--glass-border)', borderRadius: 8, fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: '#a0b0c8', letterSpacing: '0.05em' }}>
                {s}
              </span>
            ))}
          </div>

          <a href="/RESUME.pdf" target="_blank" rel="noopener noreferrer"
            style={{ display: 'inline-flex', alignItems: 'center', gap: 10, padding: '0.75rem 1.6rem', background: 'var(--accent)', borderRadius: 10, fontFamily: 'var(--font-mono)', fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#070b14', textDecoration: 'none', boxShadow: '0 0 20px rgba(6,242,212,0.3)', transition: 'all 0.2s' }}
            onMouseEnter={e => { e.currentTarget.style.background = '#2af5dc'; e.currentTarget.style.boxShadow = '0 0 30px rgba(6,242,212,0.5)'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'var(--accent)'; e.currentTarget.style.boxShadow = '0 0 20px rgba(6,242,212,0.3)'; }}>
            <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Access Full CV
          </a>
        </div>

        {/* Orbital avatar — hidden on mobile */}
        <div className={`hidden md:flex ${visible ? 'animate-fade-up delay-200' : ''}`} style={{ justifyContent: 'center', opacity: visible ? undefined : 0 }}>
          <div style={{ position: 'relative', width: 320, height: 320 }}>
            {/* Outer ring */}
            <div className="animate-spin-slow" style={{ position: 'absolute', inset: 0, borderRadius: '50%', border: '1px solid rgba(6,242,212,0.2)' }} />
            {/* Mid dashed ring */}
            <div style={{ position: 'absolute', inset: 28, borderRadius: '50%', border: '1px dashed rgba(6,182,212,0.15)' }} />
            {/* Glow fill */}
            <div style={{ position: 'absolute', inset: 0, borderRadius: '50%', background: 'radial-gradient(circle at 40% 40%, rgba(6,242,212,0.08), transparent 70%)' }} />
            {/* Avatar circle */}
            <div className="glass-card" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: 140, height: 140, borderRadius: '50%', overflow: 'hidden', border: '2px solid var(--glass-border-accent)', boxShadow: 'var(--accent-glow)' }}>
              <img
                src="https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=300&q=80"
                alt="David Huang"
                style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'grayscale(60%)' }}
                onError={e => { e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iIzBjMTIyMiIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LWZhbWlseT0ibW9ub3NwYWNlIiBmb250LXNpemU9IjEyIiBmaWxsPSIjMGNmMmQ0IiBkeT0iLjNlbSIgdGV4dC1hbmNob3I9Im1pZGRsZSI+RE48L3RleHQ+PC9zdmc+'; }}
              />
            </div>
            {/* Orbiting dot */}
            <div style={{ position: 'absolute', top: 14, left: '50%', marginLeft: -5, width: 10, height: 10, borderRadius: '50%', background: 'var(--accent)', boxShadow: '0 0 12px var(--accent)' }} className="animate-pulse-glow" />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────
   METRICS
───────────────────────────────────────── */
function MetricsSection() {
  const ref = useRef(null);
  const visible = useIntersection(ref, 0.3);

  const contributions = useCountUp(300, 2000, visible);
  const repos        = useCountUp(7,   1800, visible);
  const langPct      = useCountUp(80,  2200, visible);

  const cards = [
    {
      label: 'Contributions', value: contributions, suffix: '+', desc: 'Total GitHub contributions',
      icon: <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>,
    },
    {
      label: 'Repositories',  value: repos,         suffix: '',  desc: 'Public projects created',
      icon: <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" /></svg>,
    },
  ];

  return (
    <section ref={ref} style={{ padding: '0 1.5rem 7rem', maxWidth: 1100, margin: '0 auto' }}>
      <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: '3rem', textAlign: 'center' }}>// GitHub_Metrics</p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.25rem' }}>
        {cards.map((c, i) => (
          <div key={i} className={`glass-card ${visible ? `animate-fade-up delay-${(i + 1) * 100}` : ''}`}
            style={{ padding: '2rem', textAlign: 'center', opacity: visible ? undefined : 0 }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 44, height: 44, borderRadius: 12, background: 'var(--accent-dim)', border: '1px solid var(--glass-border-accent)', color: 'var(--accent)', marginBottom: '1.2rem' }}>
              {c.icon}
            </div>
            <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '3rem', color: '#fff', lineHeight: 1, letterSpacing: '-0.03em', marginBottom: 6 }}>
              {c.value}<span style={{ color: 'var(--accent)' }}>{c.suffix}</span>
            </div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#c8d6e5', marginBottom: 4 }}>{c.label}</div>
            <div style={{ fontSize: '0.75rem', color: '#4a5a72' }}>{c.desc}</div>
          </div>
        ))}

        {/* Language card */}
        <div className={`glass-card ${visible ? 'animate-fade-up delay-300' : ''}`}
          style={{ padding: '2rem', textAlign: 'center', opacity: visible ? undefined : 0 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 44, height: 44, borderRadius: 12, background: 'var(--accent-dim)', border: '1px solid var(--glass-border-accent)', color: 'var(--accent)', marginBottom: '1.2rem' }}>
            <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>
          </div>
          <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '2rem', color: '#fff', letterSpacing: '-0.02em', marginBottom: 6 }}>Python</div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#c8d6e5', marginBottom: '0.9rem' }}>Top Language</div>
          <div className="neu-inset" style={{ height: 8, borderRadius: 4, overflow: 'hidden', padding: 1 }}>
            <div style={{ height: '100%', borderRadius: 3, background: 'linear-gradient(90deg, var(--accent), var(--accent-mid))', width: visible ? `${langPct}%` : '0%', transition: `width 2.2s cubic-bezier(.16,1,.3,1)`, boxShadow: '0 0 8px var(--accent)' }} />
          </div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: '#4a5a72', marginTop: 8 }}>{langPct}% of codebase</div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────
   PROJECTS SECTION (homepage — top 3)
───────────────────────────────────────── */
function ProjectsSection({ onOpenLibrary }) {
  const ref = useRef(null);
  const visible = useIntersection(ref, 0.1);

  return (
    <section id="neural_models" ref={ref} style={{ padding: '0 1.5rem 7rem', maxWidth: 1100, margin: '0 auto' }}>
      <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: '0.5rem', textAlign: 'center' }}>02 // Architectures</p>
      <h2 className={visible ? 'animate-fade-up' : ''} style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', letterSpacing: '-0.025em', color: '#fff', textAlign: 'center', marginBottom: '3rem', opacity: visible ? undefined : 0 }}>
        Featured Builds
      </h2>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem' }}>
        {ALL_PROJECTS.slice(0, 3).map((p, i) => (
          <ProjectCard key={i} proj={p} delay={i * 100} visible={visible} />
        ))}
      </div>

      <div style={{ marginTop: '3.5rem', display: 'flex', justifyContent: 'center' }}>
        <button onClick={onOpenLibrary} className="neu-btn"
          style={{ display: 'inline-flex', alignItems: 'center', gap: 10, padding: '0.85rem 2rem', fontFamily: 'var(--font-mono)', fontSize: '0.7rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--accent)', cursor: 'pointer', background: 'none' }}>
          Access Full Archive
          <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </button>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────
   PROJECT CARD (reused in library)
───────────────────────────────────────── */
function ProjectCard({ proj, delay = 0, visible = true }) {
  const [explanation, setExplanation] = useState('');
  const [explaining, setExplaining] = useState(false);
  const [showAI, setShowAI] = useState(false);
  const [aiError, setAiError] = useState('');
  const abortRef = useRef(null);

  const handleExplain = async (e) => {
    e.preventDefault();
    if (showAI) { setShowAI(false); return; }

    setShowAI(true);
    setExplaining(true);
    setExplanation('');
    setAiError('');

    if (abortRef.current) abortRef.current.abort();
    abortRef.current = new AbortController();

    const prompt = `Briefly explain (2 concise sentences) the technical concepts and real-world utility of a ${proj.category} project titled "${proj.title}" which achieved ${proj.metrics}.`;

    try {
      const text = await callGemini(prompt, null, abortRef.current.signal);
      setExplanation(text);
    } catch (err) {
      if (err.name !== 'AbortError') setAiError('Connection to AI core failed.');
    } finally {
      setExplaining(false);
    }
  };

  useEffect(() => () => abortRef.current?.abort(), []);

  return (
    <div className={`glass-card ${visible ? `animate-fade-up` : ''}`}
      style={{
        opacity: visible ? undefined : 0,
        animationDelay: `${delay}ms`,
        padding: '1.5rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.75rem',
        position: 'relative',
        overflow: 'hidden',
        minHeight: 240,
      }}>

      {/* Color glow blob */}
      <div style={{ position: 'absolute', bottom: -20, right: -20, width: 120, height: 120, borderRadius: '50%', background: `linear-gradient(135deg, ${proj.color.includes('cyan') ? 'rgba(6,242,212,0.15)' : 'rgba(6,182,212,0.12)'}, transparent)`, filter: 'blur(30px)', pointerEvents: 'none' }} />

      <div style={{ position: 'relative', zIndex: 1, flex: 1, display: 'flex', flexDirection: 'column', gap: 8 }}>
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--accent)' }}>{proj.category}</p>
        <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.05rem', color: '#fff', lineHeight: 1.3 }}>{proj.title}</h3>
        <span style={{ display: 'inline-block', fontFamily: 'var(--font-mono)', fontSize: '0.62rem', color: '#4a5a72', background: 'rgba(255,255,255,0.04)', padding: '3px 10px', borderRadius: 6, border: '1px solid var(--glass-border)', width: 'fit-content' }}>
          {proj.metrics}
        </span>

        <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: 10, borderTop: '1px solid var(--glass-border)' }}>
          <a href={proj.githubUrl} target="_blank" rel="noopener noreferrer"
            style={{ display: 'flex', alignItems: 'center', gap: 6, fontFamily: 'var(--font-mono)', fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#c8d6e5', textDecoration: 'none', transition: 'color 0.2s' }}
            onMouseEnter={e => e.currentTarget.style.color = 'var(--accent)'}
            onMouseLeave={e => e.currentTarget.style.color = '#c8d6e5'}>
            Source Code
            <svg width="12" height="12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
          </a>
          <button onClick={handleExplain} className="neu-btn"
            style={{ padding: '5px 12px', fontFamily: 'var(--font-mono)', fontSize: '0.6rem', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--accent)', cursor: 'pointer', background: 'var(--accent-dim)' }}>
            {showAI ? '✕ Close' : '✦ AI Dive'}
          </button>
        </div>

        {showAI && (
          <div className="neu-inset animate-slide-down" style={{ padding: '0.75rem', marginTop: 4 }}>
            {explaining ? (
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--accent)', display: 'flex', alignItems: 'center', gap: 6 }}>
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--accent)', display: 'inline-block' }} className="animate-pulse-glow" />
                Synthesizing…
              </span>
            ) : aiError ? (
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: '#f87171' }}>{aiError}</span>
            ) : (
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: '#a0b0c8', lineHeight: 1.6 }}>{explanation}</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────
   PROJECT LIBRARY (Netflix-style)
───────────────────────────────────────── */
function ProjectLibrary({ onClose }) {
  const [filter, setFilter] = useState('All');
  const categories = ['All', ...new Set(ALL_PROJECTS.map(p => p.category))];
  const filtered = filter === 'All' ? ALL_PROJECTS : ALL_PROJECTS.filter(p => p.category === filter);

  return (
    <div className="animate-fade-up" style={{ minHeight: '100svh', paddingTop: '5.5rem', paddingBottom: '5rem', padding: '6rem 1.5rem 5rem' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>

        {/* Header bar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '3rem', paddingBottom: '1.5rem', borderBottom: '1px solid var(--glass-border)' }}>
          <div>
            <button onClick={onClose} style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'none', border: 'none', fontFamily: 'var(--font-mono)', fontSize: '0.65rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#8a9ab8', cursor: 'pointer', marginBottom: '1rem', padding: 0, transition: 'color 0.2s' }}
              onMouseEnter={e => e.currentTarget.style.color = 'var(--accent)'}
              onMouseLeave={e => e.currentTarget.style.color = '#8a9ab8'}>
              <svg width="12" height="12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
              Return to Dashboard
            </button>
            <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 'clamp(2rem,5vw,3rem)', letterSpacing: '-0.025em', color: '#fff' }}>
              Neural <span style={{ color: 'var(--accent)' }}>Archive</span>
            </h1>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, paddingTop: '0.5rem' }}>
            <span style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--accent)', boxShadow: '0 0 8px var(--accent)' }} className="animate-pulse-glow" />
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--accent)' }}>Live Index</span>
          </div>
        </div>

        {/* Filters */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: '2.5rem' }}>
          {categories.map(cat => (
            <button key={cat} onClick={() => setFilter(cat)} className={filter === cat ? '' : 'neu-btn'}
              style={{
                padding: '6px 16px', borderRadius: 999,
                fontFamily: 'var(--font-mono)', fontSize: '0.65rem', letterSpacing: '0.1em', textTransform: 'uppercase',
                cursor: 'pointer', transition: 'all 0.2s',
                background: filter === cat ? 'var(--accent)' : 'var(--glass-bg)',
                color: filter === cat ? '#070b14' : '#8a9ab8',
                border: filter === cat ? 'none' : '1px solid var(--glass-border)',
                fontWeight: filter === cat ? 700 : 400,
                boxShadow: filter === cat ? '0 0 16px rgba(6,242,212,0.3)' : undefined,
              }}>
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '1.25rem' }}>
          {filtered.map((p, i) => <ProjectCard key={i} proj={p} delay={i * 60} visible />)}
          {filtered.length === 0 && (
            <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: '5rem 0', fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: '#4a5a72' }}>
              No architectures match this filter.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────
   FOOTER / CONTACT
───────────────────────────────────────── */
function FooterSection() {
  const [company, setCompany] = useState('');
  const [pitch, setPitch] = useState('');
  const [pitching, setPitching] = useState(false);
  const [pitchError, setPitchError] = useState('');
  const abortRef = useRef(null);

  const PITCH_SYSTEM = `You are an outreach message generator embedded in David Huang's portfolio.
David's facts: BEng AI at Xiamen University Malaysia | Skills: Python, TensorFlow, PyTorch, Pandas, NumPy, Scikit-Learn, FastAPI | 300+ GitHub contributions, 7 repositories, 80% Python.
Projects: Vision Matrix Classifier (92% acc), Sentiment Vector Space (F1 0.88), Algorithmic Forecaster (R² 0.85), LLM Prompt Optimizer (−40% latency), Audio ASR (WER 4.2%), Churn Predictor (AUC 0.91), Semantic Search (Recall@10 94%).
RULES: ONLY use the facts above. Do not invent company details. Do not use "student" or "undergraduate". Keep it to 3 impactful sentences.`;

  const generatePitch = async () => {
    if (!company.trim() || pitching) return;

    if (abortRef.current) abortRef.current.abort();
    abortRef.current = new AbortController();

    setPitching(true);
    setPitch('');
    setPitchError('');

    const prompt = `Draft a 3-sentence outreach message from David Huang to a recruiter at "${company}". Sentence 1: connect David's specific skills to ${company}'s likely needs. Sentence 2: highlight one specific achievement. Sentence 3: express interest and suggest connecting.`;

    try {
      const text = await callGemini(prompt, PITCH_SYSTEM, abortRef.current.signal);
      setPitch(text);
    } catch (err) {
      if (err.name !== 'AbortError') setPitchError('AI generation failed. Please try again.');
    } finally {
      setPitching(false);
    }
  };

  useEffect(() => () => abortRef.current?.abort(), []);

  return (
    <section id="contact" style={{ padding: '7rem 1.5rem', borderTop: '1px solid var(--glass-border)', position: 'relative', textAlign: 'center', overflow: 'hidden' }}>
      {/* Glow */}
      <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: 600, height: 300, background: 'radial-gradient(ellipse, rgba(6,242,212,0.07) 0%, transparent 70%)', filter: 'blur(40px)', pointerEvents: 'none' }} />

      <div style={{ maxWidth: 700, margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: '1rem' }}>03 // Contact</p>
        <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 'clamp(2rem,5vw,3.2rem)', letterSpacing: '-0.025em', color: '#fff', marginBottom: '1rem' }}>
          Connect &amp; <span style={{ color: 'var(--accent)' }}>Collaborate</span>
        </h2>
        <p style={{ color: '#8a9ab8', lineHeight: 1.7, marginBottom: '2.5rem' }}>
          Seeking opportunities to apply theoretical AI knowledge into production environments.
        </p>

        {/* AI Outreach generator */}
        <div className="glass-card" style={{ padding: '1.5rem', marginBottom: '2rem', textAlign: 'left' }}>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: '0.5rem' }}>✦ AI Outreach Generator</p>
          <p style={{ fontSize: '0.8rem', color: '#8a9ab8', marginBottom: '1rem', lineHeight: 1.6 }}>Recruiter? Enter your company name and get a custom outreach pitch drafted by AI.</p>
          <div style={{ display: 'flex', gap: 8, marginBottom: '1rem' }}>
            <div className="neu-inset" style={{ flex: 1, display: 'flex', alignItems: 'center', padding: '0 0.75rem' }}>
              <input
                type="text"
                value={company}
                onChange={e => setCompany(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && generatePitch()}
                placeholder="e.g. Google, OpenAI, Startup Inc."
                style={{ flex: 1, background: 'none', border: 'none', outline: 'none', color: '#e2e8f0', fontFamily: 'var(--font-mono)', fontSize: '0.78rem', padding: '0.7rem 0', caretColor: 'var(--accent)' }}
              />
            </div>
            <button onClick={generatePitch} disabled={pitching || !company.trim()} className="neu-btn"
              style={{ padding: '0.65rem 1.2rem', fontFamily: 'var(--font-mono)', fontSize: '0.65rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--accent)', cursor: 'pointer', opacity: (!company.trim() || pitching) ? 0.5 : 1, whiteSpace: 'nowrap' }}>
              {pitching ? '…' : 'Generate'}
            </button>
          </div>

          {(pitch || pitchError) && (
            <div className="neu-inset animate-slide-down" style={{ padding: '1rem', position: 'relative' }}>
              {pitchError ? (
                <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: '#f87171' }}>{pitchError}</p>
              ) : (
                <>
                  <button onClick={() => navigator.clipboard.writeText(pitch)}
                    style={{ position: 'absolute', top: 8, right: 8, background: 'var(--glass-bg)', border: '1px solid var(--glass-border)', borderRadius: 6, padding: 6, cursor: 'pointer', color: '#8a9ab8', transition: 'color 0.2s' }}
                    onMouseEnter={e => e.currentTarget.style.color = 'var(--accent)'}
                    onMouseLeave={e => e.currentTarget.style.color = '#8a9ab8'}
                    title="Copy to clipboard">
                    <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                  </button>
                  <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', color: '#c8d6e5', lineHeight: 1.7, paddingRight: '2rem' }}>{pitch}</p>
                </>
              )}
            </div>
          )}
        </div>

        {/* Contact buttons */}
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '0.75rem' }}>
          {[
            { label: 'Email Me',  href: 'mailto:student@xmu.edu.my', bg: 'var(--accent)', color: '#070b14', icon: <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg> },
            { label: 'LinkedIn',  href: 'https://linkedin.com/in/yourprofile', bg: '#0A66C2', color: '#fff', icon: <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg> },
            { label: 'GitHub',    href: 'https://github.com/LouSens',          bg: '#161b22',  color: '#fff', icon: <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg> },
          ].map(btn => (
            <a key={btn.label} href={btn.href} target={btn.href.startsWith('mailto') ? undefined : '_blank'} rel="noopener noreferrer"
              style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '0.75rem 1.5rem', borderRadius: 10, background: btn.bg, color: btn.color, fontFamily: 'var(--font-mono)', fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', textDecoration: 'none', border: btn.bg === '#161b22' ? '1px solid rgba(255,255,255,0.08)' : 'none', transition: 'filter 0.2s, box-shadow 0.2s', boxShadow: btn.bg === 'var(--accent)' ? '0 0 20px rgba(6,242,212,0.3)' : 'none' }}
              onMouseEnter={e => e.currentTarget.style.filter = 'brightness(1.15)'}
              onMouseLeave={e => e.currentTarget.style.filter = 'brightness(1)'}>
              {btn.icon}{btn.label}
            </a>
          ))}
        </div>

        <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: '#2a3a52', marginTop: '4rem', letterSpacing: '0.08em' }}>
          © {new Date().getFullYear()} David Huang · Built with React + Vite + TailwindCSS
        </p>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────
   THREE.JS PARTICLE BACKGROUND
   Bug-fixed: cleanup runs synchronously
   via a flag, not inside async onload
───────────────────────────────────────── */
function ThreeJSBackground({ isMobile }) {
  const mountRef = useRef(null);

  useEffect(() => {
    let cancelled = false;
    let cleanupFn = null;

    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js';
    script.async = true;

    script.onload = () => {
      if (cancelled || !mountRef.current || !window.THREE) return;
      const THREE = window.THREE;

      const scene    = new THREE.Scene();
      const camera   = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
      camera.position.z = 400;

      const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: !isMobile });
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(isMobile ? 1 : Math.min(window.devicePixelRatio, 2));
      mountRef.current.appendChild(renderer.domElement);

      const count    = isMobile ? 60 : 260;
      const spread   = isMobile ? 600 : 1300;
      const positions = new Float32Array(count * 3);
      for (let i = 0; i < count; i++) {
        positions[i * 3]     = (Math.random() - 0.5) * spread;
        positions[i * 3 + 1] = (Math.random() - 0.5) * spread;
        positions[i * 3 + 2] = (Math.random() - 0.5) * 500;
      }

      const geometry = new THREE.BufferGeometry();
      geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

      const material = new THREE.PointsMaterial({
        color: 0x0cf2d4,
        size: isMobile ? 2 : 2.5,
        transparent: true,
        opacity: 0.35,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      });

      const points = new THREE.Points(geometry, material);
      scene.add(points);

      let rafId;
      let t = 0;
      const animate = () => {
        if (cancelled) return;
        rafId = requestAnimationFrame(animate);
        t += 0.0008;
        points.rotation.y = t;
        points.rotation.x = t * 0.45;
        const pos = geometry.attributes.position.array;
        for (let i = 0; i < count; i++) {
          pos[i * 3 + 1] += Math.sin(t * 8 + pos[i * 3]) * 0.15;
        }
        geometry.attributes.position.needsUpdate = true;
        renderer.render(scene, camera);
      };
      animate();

      const onResize = () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      };
      window.addEventListener('resize', onResize);

      cleanupFn = () => {
        window.removeEventListener('resize', onResize);
        cancelAnimationFrame(rafId);
        if (mountRef.current && renderer.domElement.parentNode === mountRef.current) {
          mountRef.current.removeChild(renderer.domElement);
        }
        geometry.dispose();
        material.dispose();
        renderer.dispose();
      };
    };

    document.body.appendChild(script);

    return () => {
      cancelled = true;
      cleanupFn?.();
      if (document.body.contains(script)) document.body.removeChild(script);
    };
  }, [isMobile]);

  return (
    <div ref={mountRef} style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none', opacity: 0.25 }} />
  );
}