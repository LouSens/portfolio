import React, { useState, useEffect, useRef, useCallback } from 'react';

/* ─────────────────────────────────────────
   CONSTANTS
───────────────────────────────────────── */
const GEMINI_MODEL = 'gemini-1.5-flash';
const GEMINI_BASE = 'https://generativelanguage.googleapis.com/v1beta/models';

const ALL_PROJECTS = [
  { title: 'Multimodal Financial Sentiment Correlator', category: 'Deep Learning', metrics: 'R²: 0.97 · MSE: 0.024', githubUrl: 'https://github.com/LouSens/multimodal-financial-sentiment-correlator', tag: 'CNN + Transformer' },
  { title: 'Sentiment Vector Space', category: 'NLP', metrics: 'Tokens: 50k · F1: 0.88', githubUrl: 'https://github.com/LouSens/sentiment-vector-space', tag: 'BERT Embedding' },
  { title: 'Algorithmic Forecaster', category: 'Data Science', metrics: 'R²: 0.85 · MSE: 0.04', githubUrl: 'https://github.com/LouSens/algorithmic-forecaster', tag: 'Time Series' },
  { title: 'LLM Prompt Optimizer', category: 'Generative AI', metrics: 'Latency −40% · Tokens −20%', githubUrl: 'https://github.com/LouSens/llm-prompt-optimizer', tag: 'LLM Tuning' },
  { title: 'Audio Speech Recognition', category: 'Deep Learning', metrics: 'WER: 4.2% · RTF: 0.8', githubUrl: 'https://github.com/LouSens/audio-speech-recognition', tag: 'Whisper/ASR' },
  { title: 'Customer Churn Predictor', category: 'Data Science', metrics: 'AUC: 0.91 · Precision: 88%', githubUrl: 'https://github.com/LouSens/customer-churn-predictor', tag: 'XGBoost' },
  { title: 'Semantic Search Engine', category: 'NLP', metrics: 'Recall@10: 94%', githubUrl: 'https://github.com/LouSens/semantic-search-engine', tag: 'Vector DB' },
];

const SKILL_STACK = [
  { name: 'Python', icon: '🐍' },
  { name: 'PyTorch', icon: '🔥' },
  { name: 'TensorFlow', icon: '🧠' },
  { name: 'Scikit-Learn', icon: '⚙️' },
  { name: 'Pandas', icon: '🐼' },
  { name: 'NumPy', icon: '🔢' },
  { name: 'FastAPI', icon: '⚡' },
  { name: 'Flask', icon: '🧪' },
  { name: 'HuggingFace', icon: '🤗' },
  { name: 'OpenCV', icon: '👁️' },
  { name: 'CUDA', icon: '💻' },
  { name: 'Docker', icon: '🐳' },
  { name: 'PostgreSQL', icon: '🗄️' },
  { name: 'Git', icon: '📦' },
  { name: 'C', icon: '©️' },
  { name: 'SQL', icon: '🔍' },
  { name: 'ONNX', icon: '🔄' },
  { name: 'LangChain', icon: '🔗' },
];

const SYSTEM_PROMPT = `You are the AI interface embedded in the portfolio of David Huang, an Indonesian undergraduate AI student at Xiamen University Malaysia.

KNOWLEDGE BASE:
- Skills: Python, TensorFlow, PyTorch, Pandas, NumPy, Scikit-Learn, Prompt Engineering, FastAPI, Flask, C.
- Projects: 1) Multimodal Financial Sentiment Correlator (R² 0.97). 2) Sentiment Vector Space (NLP, Transformers, F1: 0.88). 3) Algorithmic Forecaster (Data Science, R²: 0.85). 4) LLM Prompt Optimizer (Latency −40%). 5) Audio Speech Recognition (WER 4.2%). 6) Customer Churn Predictor (AUC 0.91). 7) Semantic Search Engine (Recall@10 94%).
- Education: BEng in Artificial Intelligence at Xiamen University Malaysia. Focuses on theoretical math and applied ML.

RULES:
1. Answer queries concisely (max 3 sentences) based ONLY on the Knowledge Base above.
2. Be direct and technical. No filler phrases.
3. If asked about something NOT in the Knowledge Base, reply EXACTLY: "Not in my knowledge base. Contact David via Email or LinkedIn below."`;

/* ─────────────────────────────────────────
   GEMINI HELPER
───────────────────────────────────────── */
async function callGemini(prompt, systemInstruction = null, signal = null) {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  if (!apiKey) throw new Error('VITE_GEMINI_API_KEY not set in .env');
  const endpoint = `${GEMINI_BASE}/${GEMINI_MODEL}:generateContent?key=${apiKey}`;
  const body = {
    contents: [{ parts: [{ text: prompt }] }],
    ...(systemInstruction && { systemInstruction: { parts: [{ text: systemInstruction }] } }),
    generationConfig: { maxOutputTokens: 250, temperature: 0.6 },
  };
  const res = await fetch(endpoint, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body), signal });
  if (!res.ok) { const err = await res.json().catch(() => ({})); throw new Error(err?.error?.message || `HTTP ${res.status}`); }
  const data = await res.json();
  const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!text) throw new Error('Empty response');
  return text;
}

/* ─────────────────────────────────────────
   HOOKS
───────────────────────────────────────── */
function useCountUp(target, duration = 2000, active = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!active) return;
    let raf, start = null;
    const tick = (ts) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / duration, 1);
      setCount(Math.floor((1 - Math.pow(1 - p, 3)) * target));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, duration, active]);
  return count;
}

function useIntersection(ref, threshold = 0.2) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } }, { threshold });
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
  const [view, setView] = useState('home');
  useEffect(() => { setReady(true); }, []);
  if (!ready) return null;
  return (
    <div className="app-root">
      <Navbar onLibrary={() => { window.scrollTo(0, 0); setView('library'); }} isLibrary={view === 'library'} onHome={() => setView('home')} />
      {view === 'home' ? (
        <main>
          <HeroSection />
          <SkillsSlider />
          <AboutSection />
          <MetricsSection />
          <ProjectsSection onOpenLibrary={() => { window.scrollTo(0, 0); setView('library'); }} />
          <FooterSection />
        </main>
      ) : (
        <ProjectLibrary onClose={() => setView('home')} />
      )}
    </div>
  );
}

/* ─────────────────────────────────────────
   NAVBAR — neobrutalist fixed bar
───────────────────────────────────────── */
function Navbar({ onLibrary, isLibrary, onHome }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', h);
    return () => window.removeEventListener('scroll', h);
  }, []);

  const scroll = (e, id) => {
    e.preventDefault();
    setOpen(false);
    if (isLibrary) { onHome(); setTimeout(() => { const el = document.getElementById(id); el?.scrollIntoView({ behavior: 'smooth', block: 'start' }); }, 100); return; }
    if (id === 'top') { window.scrollTo({ top: 0, behavior: 'smooth' }); return; }
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const links = [
    { label: 'About', id: 'about' },
    { label: 'Skills', id: 'skills' },
    { label: 'Work', id: 'neural_models' },
    { label: 'Contact', id: 'contact' },
  ];

  return (
    <>
      <nav className={`nb-nav ${scrolled ? 'nb-nav--scrolled' : ''}`}>
        <a href="#top" onClick={e => { e.preventDefault(); if (isLibrary) onHome(); else window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="nb-logo">
          DH<span className="nb-logo-dot">.</span>
        </a>

        <div className="nb-nav-links">
          {links.map(l => (
            <a key={l.id} href={`#${l.id}`} onClick={e => scroll(e, l.id)} className="nb-nav-link">{l.label}</a>
          ))}
          <button onClick={onLibrary} className="nb-nav-btn">Archive →</button>
        </div>

        <button onClick={() => setOpen(v => !v)} className="nb-hamburger" aria-label="Menu">
          <span className={`nb-ham-bar ${open ? 'nb-ham-bar--1-open' : ''}`} />
          <span className={`nb-ham-bar ${open ? 'nb-ham-bar--2-open' : ''}`} />
          <span className={`nb-ham-bar ${open ? 'nb-ham-bar--3-open' : ''}`} />
        </button>
      </nav>

      <div className={`nb-drawer ${open ? 'nb-drawer--open' : ''}`}>
        {links.map(l => (
          <a key={l.id} href={`#${l.id}`} onClick={e => scroll(e, l.id)} className="nb-drawer-link">{l.label}</a>
        ))}
        <button onClick={() => { setOpen(false); onLibrary(); }} className="nb-drawer-btn">Full Archive</button>
      </div>
      {open && <div className="nb-overlay" onClick={() => setOpen(false)} />}
    </>
  );
}

/* ─────────────────────────────────────────
   HERO SECTION
───────────────────────────────────────── */
function HeroSection() {
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const abortRef = useRef(null);

  const suggestions = [
    'ML frameworks?',
    'Speech Recognition project?',
    'Strongest skill?',
  ];

  const submit = useCallback(async (text) => {
    if (!text.trim() || loading) return;
    if (abortRef.current) abortRef.current.abort();
    abortRef.current = new AbortController();
    setLoading(true); setResponse(''); setError('');
    try {
      const out = await callGemini(text, SYSTEM_PROMPT, abortRef.current.signal);
      setResponse(out);
    } catch (err) {
      if (err.name !== 'AbortError') setError('Neural core unreachable. Check API key.');
    } finally {
      setLoading(false);
    }
  }, [loading]);

  useEffect(() => () => abortRef.current?.abort(), []);

  return (
    <section id="hero" className="nb-hero">
      <div className="nb-hero-bg-grid" />

      <div className="nb-hero-inner">
        {/* Left: headline */}
        <div className="nb-hero-left">
          <div className="nb-badge">
            <span className="nb-badge-dot" />
            AI · ML Engineer
          </div>
          <h1 className="nb-hero-h1">
            David<br />
            <span className="nb-hero-h1-accent">Huang</span>
          </h1>
          <p className="nb-hero-sub">
            BEng Artificial Intelligence<br />
            Xiamen University Malaysia
          </p>
          <div className="nb-hero-actions">
            <a href="/RESUME.pdf" target="_blank" rel="noopener noreferrer" className="nb-btn-primary">
              Download CV ↓
            </a>
            <a href="#contact" onClick={e => { e.preventDefault(); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }); }} className="nb-btn-secondary">
              Contact
            </a>
          </div>
        </div>

        {/* Right: AI terminal */}
        <div className="nb-hero-right">
          <div className="nb-terminal">
            <div className="nb-terminal-topbar">
              <span className="nb-terminal-dot nb-td-r" /><span className="nb-terminal-dot nb-td-y" /><span className="nb-terminal-dot nb-td-g" />
              <span className="nb-terminal-title">david_huang.ai — query interface</span>
            </div>

            <div className="nb-terminal-body">
              <p className="nb-terminal-prompt">
                <span className="nb-prompt-sym">$</span> interrogate --subject david_huang
              </p>
              <form onSubmit={e => { e.preventDefault(); submit(query); }} className="nb-terminal-form">
                <span className="nb-prompt-sym">›</span>
                <input
                  type="text"
                  value={query}
                  onChange={e => setQuery(e.target.value)}
                  placeholder="Ask about skills, projects, background..."
                  className="nb-terminal-input"
                />
                <button type="submit" disabled={loading || !query.trim()} className="nb-terminal-exec">
                  {loading ? '…' : 'RUN'}
                </button>
              </form>

              <div className="nb-terminal-suggestions">
                {suggestions.map((s, i) => (
                  <button key={i} onClick={() => { setQuery(s); submit(s); }} className="nb-suggestion">{s}</button>
                ))}
              </div>

              {(loading || response || error) && (
                <div className="nb-terminal-response">
                  <span className="nb-response-label">{loading ? '⟳ processing' : error ? '✗ error' : '✓ output'}</span>
                  <div className="nb-response-body">
                    {loading ? (
                      <span className="nb-loading-dots"><span /><span /><span /></span>
                    ) : error ? (
                      <span className="nb-error-text">{error}</span>
                    ) : (
                      <p className="nb-response-text">{response}</p>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────
   SKILLS SLIDER — infinite marquee
───────────────────────────────────────── */
function SkillsSlider() {
  const doubled = [...SKILL_STACK, ...SKILL_STACK];
  return (
    <section id="skills" className="nb-skills-section">
      <div className="nb-skills-label">TECH STACK</div>
      <div className="nb-skills-track-wrapper">
        <div className="nb-skills-track">
          {doubled.map((s, i) => (
            <div key={i} className="nb-skill-chip">
              <span className="nb-skill-icon">{s.icon}</span>
              <span className="nb-skill-name">{s.name}</span>
            </div>
          ))}
        </div>
      </div>
      {/* Reverse track */}
      <div className="nb-skills-track-wrapper nb-skills-track-wrapper--reverse">
        <div className="nb-skills-track nb-skills-track--reverse">
          {doubled.map((s, i) => (
            <div key={i} className="nb-skill-chip nb-skill-chip--alt">
              <span className="nb-skill-icon">{s.icon}</span>
              <span className="nb-skill-name">{s.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────
   ABOUT SECTION
───────────────────────────────────────── */
function AboutSection() {
  const ref = useRef(null);
  const visible = useIntersection(ref, 0.15);

  return (
    <section id="about" ref={ref} className={`nb-about ${visible ? 'nb-visible' : ''}`}>
      <div className="nb-about-inner">
        <div className="nb-section-tag">01 / ABOUT</div>
        <div className="nb-about-grid">
          <div className="nb-about-text">
            <h2 className="nb-section-h2">
              Synthesizing<br />data into<br /><span className="nb-accent">intelligence.</span>
            </h2>
          </div>
          <div className="nb-about-desc">
            <p>Indonesian undergraduate pursuing a <strong>BEng in Artificial Intelligence</strong> at Xiamen University Malaysia. My focus bridges theoretical mathematics with production-grade machine learning systems.</p>
            <p>I leverage advanced LLMs to accelerate problem-solving while deeply understanding neural architectures, matrix operations, and classical algorithms from first principles.</p>
            <div className="nb-about-stats">
              <div className="nb-stat-box">
                <span className="nb-stat-num">300+</span>
                <span className="nb-stat-label">GitHub Commits</span>
              </div>
              <div className="nb-stat-box">
                <span className="nb-stat-num">7</span>
                <span className="nb-stat-label">ML Projects</span>
              </div>
              <div className="nb-stat-box">
                <span className="nb-stat-num">80%</span>
                <span className="nb-stat-label">Python Coverage</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────
   METRICS SECTION
───────────────────────────────────────── */
function MetricsSection() {
  const ref = useRef(null);
  const visible = useIntersection(ref, 0.3);
  const contrib = useCountUp(300, 2000, visible);
  const repos = useCountUp(7, 1500, visible);
  const lang = useCountUp(80, 2200, visible);

  const items = [
    { val: contrib, suf: '+', label: 'Contributions', sub: 'Total GitHub activity' },
    { val: repos, suf: '', label: 'Repositories', sub: 'Public ML projects' },
    { val: lang, suf: '%', label: 'Python', sub: 'Primary language' },
  ];

  return (
    <section ref={ref} className="nb-metrics">
      <div className="nb-metrics-inner">
        {items.map((m, i) => (
          <div key={i} className={`nb-metric-card ${visible ? 'nb-visible' : ''}`} style={{ animationDelay: `${i * 0.1}s` }}>
            <div className="nb-metric-num">{m.val}<span className="nb-metric-suf">{m.suf}</span></div>
            <div className="nb-metric-label">{m.label}</div>
            <div className="nb-metric-sub">{m.sub}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────
   PROJECTS SECTION
───────────────────────────────────────── */
function ProjectsSection({ onOpenLibrary }) {
  const ref = useRef(null);
  const visible = useIntersection(ref, 0.1);

  return (
    <section id="neural_models" ref={ref} className="nb-projects">
      <div className="nb-projects-inner">
        <div className="nb-projects-header">
          <div>
            <div className="nb-section-tag">02 / WORK</div>
            <h2 className="nb-section-h2">Featured<br /><span className="nb-accent">Builds</span></h2>
          </div>
          <button onClick={onOpenLibrary} className="nb-btn-secondary nb-archive-btn">
            Full Archive →
          </button>
        </div>
        <div className="nb-projects-grid">
          {ALL_PROJECTS.slice(0, 4).map((p, i) => (
            <ProjectCard key={i} proj={p} delay={i * 80} visible={visible} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────
   PROJECT CARD
───────────────────────────────────────── */
function ProjectCard({ proj, delay = 0, visible = true }) {
  const [explanation, setExplanation] = useState('');
  const [explaining, setExplaining] = useState(false);
  const [showAI, setShowAI] = useState(false);
  const abortRef = useRef(null);

  const handleExplain = async () => {
    if (showAI) { setShowAI(false); return; }
    setShowAI(true); setExplaining(true); setExplanation('');
    if (abortRef.current) abortRef.current.abort();
    abortRef.current = new AbortController();
    const prompt = `In exactly 2 sentences, explain the technical concepts and real-world utility of: ${proj.category} project "${proj.title}" achieving ${proj.metrics}.`;
    try {
      const text = await callGemini(prompt, null, abortRef.current.signal);
      setExplanation(text);
    } catch (err) {
      if (err.name !== 'AbortError') setExplanation('AI connection failed.');
    } finally {
      setExplaining(false);
    }
  };

  useEffect(() => () => abortRef.current?.abort(), []);

  return (
    <div
      className={`nb-card ${visible ? 'nb-card--visible' : ''}`}
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="nb-card-header">
        <span className="nb-card-cat">{proj.category}</span>
        <span className="nb-card-tag">{proj.tag}</span>
      </div>
      <h3 className="nb-card-title">{proj.title}</h3>
      <div className="nb-card-metrics">{proj.metrics}</div>
      <div className="nb-card-footer">
        <a href={proj.githubUrl} target="_blank" rel="noopener noreferrer" className="nb-card-link">
          Source ↗
        </a>
        <button onClick={handleExplain} className="nb-card-ai-btn">
          {showAI ? '✕' : '✦ AI'}
        </button>
      </div>
      {showAI && (
        <div className="nb-card-ai-panel">
          {explaining ? <span className="nb-loading-inline">Synthesizing<span className="nb-dots" /></span> : <p>{explanation}</p>}
        </div>
      )}
    </div>
  );
}

/* ─────────────────────────────────────────
   PROJECT LIBRARY
───────────────────────────────────────── */
function ProjectLibrary({ onClose }) {
  const [filter, setFilter] = useState('All');
  const categories = ['All', ...new Set(ALL_PROJECTS.map(p => p.category))];
  const filtered = filter === 'All' ? ALL_PROJECTS : ALL_PROJECTS.filter(p => p.category === filter);

  return (
    <div className="nb-library">
      <div className="nb-library-inner">
        <div className="nb-library-header">
          <button onClick={onClose} className="nb-back-btn">← Back</button>
          <h1 className="nb-library-title">Neural <span className="nb-accent">Archive</span></h1>
        </div>
        <div className="nb-filter-row">
          {categories.map(cat => (
            <button key={cat} onClick={() => setFilter(cat)} className={`nb-filter-btn ${filter === cat ? 'nb-filter-btn--active' : ''}`}>{cat}</button>
          ))}
        </div>
        <div className="nb-library-grid">
          {filtered.map((p, i) => <ProjectCard key={i} proj={p} delay={i * 50} visible />)}
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
  const abortRef = useRef(null);

  const PITCH_SYSTEM = `Generate a 3-sentence outreach from David Huang (BEng AI, Xiamen Univ. Malaysia). Skills: Python, TensorFlow, PyTorch, FastAPI. Best projects: Sentiment (F1 0.88), Churn (AUC 0.91), ASR (WER 4.2%). Facts only. No filler.`;

  const generate = async () => {
    if (!company.trim() || pitching) return;
    if (abortRef.current) abortRef.current.abort();
    abortRef.current = new AbortController();
    setPitching(true); setPitch('');
    try {
      const t = await callGemini(`3-sentence outreach from David Huang to recruiter at "${company}". Be specific and technical.`, PITCH_SYSTEM, abortRef.current.signal);
      setPitch(t);
    } catch (err) {
      if (err.name !== 'AbortError') setPitch('Generation failed. Try again.');
    } finally { setPitching(false); }
  };
  useEffect(() => () => abortRef.current?.abort(), []);

  return (
    <section id="contact" className="nb-footer">
      <div className="nb-footer-inner">
        <div className="nb-section-tag">03 / CONTACT</div>
        <h2 className="nb-section-h2">Let's Build<br /><span className="nb-accent">Something.</span></h2>

        {/* Outreach generator */}
        <div className="nb-outreach">
          <p className="nb-outreach-label">✦ AI Outreach Generator — Enter your company for a custom pitch</p>
          <div className="nb-outreach-row">
            <input
              type="text"
              value={company}
              onChange={e => setCompany(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && generate()}
              placeholder="Google, OpenAI, Startup Inc..."
              className="nb-outreach-input"
            />
            <button onClick={generate} disabled={pitching || !company.trim()} className="nb-btn-primary">
              {pitching ? '...' : 'Generate'}
            </button>
          </div>
          {pitch && (
            <div className="nb-pitch-result">
              <p>{pitch}</p>
              <button onClick={() => navigator.clipboard.writeText(pitch)} className="nb-copy-btn" title="Copy">⎘ Copy</button>
            </div>
          )}
        </div>

        {/* Contact links */}
        <div className="nb-contact-links">
          <a href="mailto:student@xmu.edu.my" className="nb-contact-btn nb-contact-email">
            Email ↗
          </a>
          <a href="https://linkedin.com/in/yourprofile" target="_blank" rel="noopener noreferrer" className="nb-contact-btn nb-contact-li">
            LinkedIn ↗
          </a>
          <a href="https://github.com/LouSens" target="_blank" rel="noopener noreferrer" className="nb-contact-btn nb-contact-gh">
            GitHub ↗
          </a>
        </div>

        <div className="nb-footer-credit">
          © {new Date().getFullYear()} David Huang · React + Vite + TailwindCSS
        </div>
      </div>
    </section>
  );
}