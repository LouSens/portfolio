import React, { useState, useEffect, useRef } from 'react';

// --- MOCK DATABASE OF ALL PROJECTS ---
const ALL_PROJECTS = [
  { title: "Multimodal Financial Sentiment Correlator", category: "Deep Learning", color: "from-cyan-500 to-blue-500", metrics: "R²: 0.97 | MSE: 0.024" },
  { title: "Sentiment Vector Space", category: "Natural Language", color: "from-blue-500 to-indigo-500", metrics: "Tokens: 50k | F1: 0.88" },
  { title: "Algorithmic Forecaster", category: "Data Science", color: "from-indigo-500 to-purple-500", metrics: "R²: 0.85 | MSE: 0.04" },
  { title: "LLM Prompt Optimizer", category: "Generative AI", color: "from-purple-500 to-fuchsia-500", metrics: "Latency: -40% | Tokens: -20%" },
  { title: "Audio Speech Recognition", category: "Deep Learning", color: "from-emerald-500 to-cyan-500", metrics: "WER: 4.2% | RTF: 0.8" },
  { title: "Customer Churn Predictor", category: "Data Science", color: "from-orange-500 to-red-500", metrics: "AUC: 0.91 | Precision: 88%" },
  { title: "Semantic Search Engine", category: "Natural Language", color: "from-pink-500 to-rose-500", metrics: "Recall@10: 94%" },
];

// --- MAIN APPLICATION ---
export default function App() {
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [currentView, setCurrentView] = useState('home'); // 'home' or 'library'

  useEffect(() => {
    setMounted(true);

    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || matchMedia('(pointer: coarse)').matches);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  if (!mounted) return null;

  return (
    <div
      className="relative bg-[#020204] text-slate-200 font-sans selection:bg-cyan-500/30 overflow-x-hidden w-full min-h-screen">
      {/* Background stays persistent across views */}
      <ThreeJSFluidNetwork isMobile={isMobile} />

      {/* Navbar at root level so z-50 isn't trapped inside a lower stacking context */}
      {currentView === 'home' && <Navbar />}

      {currentView === 'home' ? (
        <div className="relative z-10 fade-in animate-in duration-500">
          <HeroAISection />
          <AboutSection />
          <GitHubMetricsSection />
          <ProjectsSection onOpenLibrary={() => {
            window.scrollTo(0, 0);
            setCurrentView('library');
          }} />
          <FooterSection />
        </div>
      ) : (
        <ProjectLibrary onClose={() => setCurrentView('home')} />
      )}
    </div>
  );
}

// --- UI COMPONENTS ---

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (e, id) => {
    e.preventDefault();
    setIsMenuOpen(false);

    if (id === 'top') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <>
      <nav
        className="fixed top-0 left-0 w-full z-50 bg-[#020204]/90 backdrop-blur-xl border-b border-white/5 px-4 md:px-8 py-4 flex justify-between items-center transition-all duration-300">
        <a href="#top" onClick={(e) => scrollToSection(e, 'top')}
          className="font-bold text-lg md:text-xl tracking-tighter text-white cursor-pointer hover:text-cyan-400 transition-colors">
          David Huang<span className="text-cyan-500">.</span>
        </a>

        <div className="hidden md:flex gap-8 text-sm font-mono text-slate-300">
          <a href="#ai-terminal" onClick={(e) => scrollToSection(e, 'ai-terminal')} className="hover:text-cyan-400 transition-colors">HOME</a>
          <a href="#about" onClick={(e) => scrollToSection(e, 'about')} className="hover:text-cyan-400 transition-colors">ABOUT</a>
          <a href="#neural_models" onClick={(e) => scrollToSection(e, 'neural_models')} className="hover:text-cyan-400 transition-colors">WORKS</a>
          <a href="#contact" onClick={(e) => scrollToSection(e, 'contact')} className="hover:text-cyan-400 transition-colors">CONTACT</a>
        </div>

        <button onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden text-white cursor-pointer hover:text-cyan-400 z-50 p-2">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </nav>

      <div className={`fixed inset-0 bg-[#020204]/95 backdrop-blur-3xl z-40 transition-transform duration-300 ease-in-out
        md:hidden flex flex-col items-center justify-center ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex flex-col gap-8 text-xl font-mono text-slate-300 items-center">
          <a href="#ai-terminal" onClick={(e) => scrollToSection(e, 'ai-terminal')} className="hover:text-cyan-400 transition-colors">HOME</a>
          <a href="#about" onClick={(e) => scrollToSection(e, 'about')} className="hover:text-cyan-400 transition-colors">ABOUT</a>
          <a href="#neural_models" onClick={(e) => scrollToSection(e, 'neural_models')} className="hover:text-cyan-400 transition-colors">WORKS</a>
          <a href="#contact" onClick={(e) => scrollToSection(e, 'contact')} className="hover:text-cyan-400 transition-colors">CONTACT</a>
        </div>
      </div>
    </>
  );
}

function HeroAISection() {
  const [queryText, setQueryText] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const suggestedQueries = [
    "What is your experience with TensorFlow?",
    "Explain your NLP Sentiment project.",
    "Do you know React or Web Dev?"
  ];

  const callGemini = async (prompt) => {
    setLoading(true);
    setResponse('');
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
    const endpoint =
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`;

    const systemPrompt = `You are the AI interface embedded in the portfolio of an Indonesian undergraduate AI student at Xiamen University Malaysia.

    KNOWLEDGE BASE:
    - Skills: Python, TensorFlow, Pandas, NumPy, Scikit-Learn, Prompt Engineering.
    - Projects: 1) Vision Matrix Classifier (CNNs, Deep Learning, 92% Acc). 2) Sentiment Vector Space (NLP, Transformers, F1: 0.88). 3) Algorithmic Forecaster (Data Science, Scikit-learn).
    - Education: BSc in Artificial Intelligence at XMU Malaysia. Focuses on theoretical math and applied machine learning.

    RULES:
    1. Answer queries concisely based ONLY on the Knowledge Base above.
    2. Be professional and highlight the student's eagerness to learn.
    3. IF the user asks about something NOT in the Knowledge Base (e.g., specific past jobs, non-AI tech, personal life), you MUST reply exactly with: "I do not have that data in my current knowledge base. Please contact me directly via Email or LinkedIn in the Contact section below for more details."`;

    const payload = {
      contents: [{ parts: [{ text: prompt }] }],
      systemInstruction: { parts: [{ text: systemPrompt }] }
    };

    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      setResponse(data.candidates?.[0]?.content?.parts?.[0]?.text || "System error. Could not generate response.");
    } catch (err) {
      setResponse("Network protocol failure. Cannot reach AI core right now.");
    }
    setLoading(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (queryText.trim()) callGemini(queryText);
  };

  const handleSuggestionClick = (text) => {
    setQueryText(text);
    callGemini(text);
  };

  return (
    <section id="ai-terminal"
      className="min-h-[100svh] flex flex-col items-center justify-center px-4 md:px-6 relative pt-24 pb-12">
      <div id="top" className="absolute top-0"></div>
      <div className="max-w-4xl w-full z-10 flex flex-col items-center text-center">

        <h1
          className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tighter leading-[1] mb-6 uppercase text-white">
          Interactive <span
            className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">Resume</span>
        </h1>

        <p className="max-w-2xl text-base md:text-lg text-slate-400 font-light leading-relaxed mb-10 px-4">
          Do not just read about my capabilities. Query my embedded AI assistant to extract specific data regarding my
          academic background and neural network projects.
        </p>

        <div
          className="w-full max-w-2xl bg-[#0a0a0f] border border-white/10 rounded-2xl p-2 md:p-4 shadow-2xl relative overflow-hidden">
          <div
            className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-50">
          </div>

          <form onSubmit={handleSubmit} className="relative flex items-center">
            <svg className="w-6 h-6 text-cyan-500 absolute left-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
            <input type="text" value={queryText} onChange={(e) => setQueryText(e.target.value)}
              placeholder="Query my knowledge base..."
              className="w-full bg-transparent border-none text-white px-12 py-4 focus:outline-none focus:ring-0 text-sm md:text-base font-mono placeholder-slate-600"
            />
            <button type="submit" disabled={loading || !queryText.trim()}
              className="absolute right-2 px-4 py-2 bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 rounded-lg text-xs font-bold uppercase tracking-widest transition-colors disabled:opacity-50 cursor-pointer">
              Execute
            </button>
          </form>

          <div className="flex flex-wrap gap-2 px-4 pb-4 pt-2 border-t border-white/5 mt-2">
            <span className="text-xs font-mono text-slate-600 uppercase pt-1 mr-2">Suggested:</span>
            {suggestedQueries.map((q, idx) => (
              <button key={idx} onClick={() => handleSuggestionClick(q)}
                className="text-[10px] md:text-xs font-mono text-slate-400 hover:text-cyan-400 bg-white/5 hover:bg-white/10 px-3 py-1.5 rounded-md transition-colors border border-transparent hover:border-cyan-500/30 text-left cursor-pointer">
                {q}
              </button>
            ))}
          </div>

          {(loading || response) && (
            <div
              className="mt-4 mx-4 mb-4 p-4 bg-black/50 rounded-xl border border-white/5 text-left relative overflow-hidden">
              <div className="flex items-center gap-2 mb-3 border-b border-white/10 pb-2">
                <div className={`w-2 h-2 rounded-full ${loading ? 'bg-amber-400 animate-pulse' : 'bg-emerald-400'}`}></div>
                <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">
                  {loading ? 'Processing Query...' : 'Response Acquired'}
                </span>
              </div>
              <div className="text-sm md:text-base text-slate-300 font-mono leading-relaxed min-h-[60px]">
                {loading ? (
                  <div className="flex gap-1 items-center h-full pt-2">
                    <span className="w-1.5 h-4 bg-cyan-500 animate-[bounce_1s_infinite] delay-0"></span>
                    <span className="w-1.5 h-4 bg-cyan-500 animate-[bounce_1s_infinite] delay-100"></span>
                    <span className="w-1.5 h-4 bg-cyan-500 animate-[bounce_1s_infinite] delay-200"></span>
                  </div>
                ) : (
                  <p>{response}</p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function AboutSection() {
  const skills = ["Python", "TensorFlow", "Pandas", "NumPy", "Scikit-Learn", "Prompt Engineering"];

  return (
    <section id="about" className="py-24 px-4 md:px-6 max-w-5xl mx-auto">
      <div className="grid md:grid-cols-2 gap-12 items-center">

        <div className="space-y-6">
          <h2 className="text-sm font-mono tracking-[0.2em] text-cyan-400">01 // IDENTIFICATION</h2>
          <h3 className="text-3xl md:text-5xl font-light leading-tight text-white">
            Synthesizing data into <span
              className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">intelligence.</span>
          </h3>
          <p className="text-slate-400 leading-relaxed text-lg">
            I am an Indonesian undergraduate student pursuing a BEng in Artificial Intelligence at Xiamen University
            Malaysia. My current academic focus bridges theoretical mathematics with applied machine learning.
          </p>
          <p className="text-slate-400 leading-relaxed text-lg">
            While I leverage advanced LLMs to accelerate problem-solving, my core objective is deeply understanding the
            underlying mechanics of neural architectures, matrix operations, and classical algorithms.
          </p>

          <div className="pt-6 border-t border-white/10">
            <div className="flex flex-wrap gap-2 mb-6">
              {skills.map((skill, i) => (
                <span key={i}
                  className="px-3 py-1 bg-white/5 border border-white/10 rounded-md text-xs font-mono text-slate-300">
                  {skill}
                </span>
              ))}
            </div>

            <a href="https://github.com/LouSens/portfolio/blob/main/static/CV-DAVID%20KURNIAWAN.pdf" target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-6 py-3 bg-cyan-500 hover:bg-cyan-400 text-black font-bold font-mono text-sm tracking-widest rounded-lg transition-colors cursor-pointer">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                  d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z">
                </path>
              </svg>
              ACCESS FULL CV
            </a>
          </div>
        </div>

        <div className="relative hidden md:block">
          <div
            className="aspect-square rounded-full border border-white/10 bg-gradient-to-br from-cyan-500/10 to-blue-600/10 flex items-center justify-center p-8 relative overflow-hidden group">
            <div
              className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4wNSkiLz48L3N2Zz4=')] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_70%)] opacity-50">
            </div>

            <div
              className="w-full h-full border border-cyan-500/30 rounded-full flex items-center justify-center relative z-10 animate-[spin_30s_linear_infinite]">
              <div
                className="w-3/4 h-3/4 border border-blue-500/30 rounded-full flex items-center justify-center border-dashed">
                <div
                  className="w-1/2 h-1/2 bg-gradient-to-tr from-cyan-400 to-blue-600 rounded-full blur-xl opacity-50 animate-pulse">
                </div>
              </div>
            </div>

            <div
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 w-32 h-32 rounded-full overflow-hidden border-2 border-cyan-500/50 shadow-[0_0_30px_rgba(6,182,212,0.3)]">
              <img src="https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=300&q=80"
                alt="Profile"
                className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src =
                    'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iIzMzMyIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LWZhbWlseT0ibW9ub3NwYWNlIiBmb250LXNpemU9IjE0IiBmaWxsPSIjMDZiNmQ0IiBkeT0iLjNlbSIgdGV4dC1hbmNob3I9Im1pZGRsZSI+SU1BR0VfTUlTU0lORzwvdGV4dD48L3N2Zz4=';
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// --- ANIMATED COUNTER HOOK ---
function useCountUp(target, duration = 2000, startCounting = false) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!startCounting) return;

    let startTime = null;
    let animationFrame;

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);

      // Ease-out cubic for a satisfying deceleration
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [target, duration, startCounting]);

  return count;
}

function GitHubMetricsSection() {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  // ========================================
  // UPDATE THESE WITH YOUR REAL GITHUB STATS
  // ========================================
  const metrics = [
    {
      label: "Contributions",
      value: 300,
      suffix: "+",
      description: "Total GitHub contributions",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
            d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
      ),
    },
    {
      label: "Repositories",
      value: 7,
      suffix: "",
      description: "Public projects created",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
            d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
        </svg>
      ),
    },
  ];

  // Top language config
  const topLanguage = {
    name: "Python",
    percentage: 80,
  };

  const contributionsCount = useCountUp(metrics[0].value, 2000, isVisible);
  const reposCount = useCountUp(metrics[1].value, 1800, isVisible);
  const langPercent = useCountUp(topLanguage.percentage, 2200, isVisible);
  const animatedCounts = [contributionsCount, reposCount];

  return (
    <section ref={sectionRef} className="py-24 px-4 md:px-6 max-w-5xl mx-auto">
      <h2 className="text-sm font-mono tracking-[0.2em] text-cyan-400 mb-12 text-center">
        // GITHUB_METRICS
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Contribution & Repo Cards */}
        {metrics.map((metric, idx) => (
          <div key={idx}
            className="relative group bg-[#0a0a0f] border border-white/10 rounded-2xl p-8 text-center hover:border-cyan-500/30 transition-all duration-500 overflow-hidden">
            <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-gradient-to-br from-cyan-500/20 to-blue-600/20 blur-[40px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

            <div className="relative z-10">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 mb-5">
                {metric.icon}
              </div>
              <div className="text-5xl font-black text-white tracking-tight mb-2">
                {animatedCounts[idx]}
                {metric.suffix && (
                  <span className="text-cyan-400">{metric.suffix}</span>
                )}
              </div>
              <div className="text-sm font-mono text-white uppercase tracking-widest mb-1">
                {metric.label}
              </div>
              <div className="text-xs text-slate-500">
                {metric.description}
              </div>
            </div>
          </div>
        ))}

        {/* Top Language Card */}
        <div
          className="relative group bg-[#0a0a0f] border border-white/10 rounded-2xl p-8 text-center hover:border-cyan-500/30 transition-all duration-500 overflow-hidden">
          <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-gradient-to-br from-purple-500/20 to-fuchsia-600/20 blur-[40px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

          <div className="relative z-10">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 mb-5">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                  d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
              </svg>
            </div>
            <div className="text-5xl font-black text-white tracking-tight mb-2">
              {topLanguage.name}
            </div>
            <div className="text-sm font-mono text-white uppercase tracking-widest mb-3">
              Top Language
            </div>

            {/* Percentage Bar */}
            <div className="w-full bg-white/5 rounded-full h-2 mt-2 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full transition-all duration-[2200ms] ease-out"
                style={{ width: isVisible ? `${topLanguage.percentage}%` : '0%' }}>
              </div>
            </div>
            <div className="text-xs text-slate-500 mt-2 font-mono">
              {langPercent}% of codebase
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ProjectsSection({ onOpenLibrary }) {
  // Only display the top 3 projects on the home page
  const featuredProjects = ALL_PROJECTS.slice(0, 3);

  return (
    <section id="neural_models" className="py-24 px-4 md:px-6 max-w-5xl mx-auto">
      <h2 className="text-sm font-mono tracking-[0.2em] text-cyan-400 mb-12 text-center">02 // ARCHITECTURES</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {featuredProjects.map((proj, idx) => (
          <ProjectCard key={idx} proj={proj} />
        ))}
      </div>

      {/* Access Library Button */}
      <div className="mt-16 flex justify-center">
        <button onClick={onOpenLibrary}
          className="group flex items-center gap-3 px-8 py-4 bg-transparent border border-white/20 hover:border-cyan-500 text-white font-mono text-sm tracking-widest uppercase rounded-full transition-all duration-300 cursor-pointer">
          Access Full Archive
          <svg className="w-4 h-4 text-cyan-500 transform group-hover:translate-x-1 transition-transform" fill="none"
            stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
          </svg>
        </button>
      </div>
    </section>
  );
}

// Reusable Project Card Component (Used in both Home and Library)
function ProjectCard({ proj }) {
  const [explanation, setExplanation] = useState('');
  const [isExplaining, setIsExplaining] = useState(false);
  const [showAI, setShowAI] = useState(false);

  const handleExplain = async (e) => {
    e.preventDefault();
    if (showAI) {
      setShowAI(false);
      return;
    }

    setShowAI(true);
    setIsExplaining(true);
    setExplanation('');

    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
    const endpoint =
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`;

    const prompt = `You are an AI assistant embedded in a student's portfolio. Briefly explain the technical concepts and real-world utility of a ${proj.category} project titled "${proj.title}" which achieved ${proj.metrics}. Keep it to 2 concise, highly impressive sentences.`;

    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
      });
      const data = await res.json();
      setExplanation(data.candidates?.[0]?.content?.parts?.[0]?.text || "Unable to generate explanation.");
    } catch (err) {
      setExplanation("Connection to neural core failed.");
    }
    setIsExplaining(false);
  };

  return (
    <div
      className="h-auto min-h-[350px] rounded-3xl p-6 flex flex-col justify-end relative overflow-hidden bg-[#0a0a0f] border border-white/10 group hover:border-cyan-500/30 transition-colors">
      <div className={`absolute -bottom-10 -right-10 w-32 h-32 bg-gradient-to-br ${proj.color} blur-[50px] opacity-30
        group-hover:opacity-60 transition-opacity duration-500`}></div>

      <div className="relative z-10 transform transition-transform duration-500 md:group-hover:-translate-y-2 mt-auto">
        <p className="text-[10px] font-mono text-cyan-400 mb-2">{proj.category}</p>
        <h3 className="text-xl font-bold text-white mb-2">{proj.title}</h3>

        <div className="h-auto opacity-100 transition-all duration-500">
          <p className="text-xs font-mono text-slate-500 mb-4 bg-white/5 inline-block px-2 py-1 rounded">
            {proj.metrics}
          </p>

          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <a href="#"
                className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-white hover:text-cyan-400 transition-colors">
                Source Code
                <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none"
                  stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                </svg>
              </a>
              <button onClick={handleExplain}
                className="text-[10px] uppercase font-bold tracking-widest bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 px-3 py-1.5 rounded-lg border border-cyan-500/30 transition-colors flex items-center gap-1 cursor-pointer">
                ✨ AI Dive
              </button>
            </div>

            {showAI && (
              <div
                className="mt-2 p-3 bg-black/60 rounded-xl border border-white/10 text-xs text-slate-300 font-mono leading-relaxed animate-in fade-in slide-in-from-top-2">
                {isExplaining ? (
                  <span className="flex items-center gap-2 text-cyan-400">
                    <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-ping"></span> Synthesizing...
                  </span>
                ) : (
                  <p>{explanation}</p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// --- NEW LIBRARY VIEW (Netflix Style) ---
function ProjectLibrary({ onClose }) {
  const [filter, setFilter] = useState('All');

  // Extract unique categories from ALL_PROJECTS dynamically
  const categories = ['All', ...new Set(ALL_PROJECTS.map(p => p.category))];

  const filteredProjects = filter === 'All'
    ? ALL_PROJECTS
    : ALL_PROJECTS.filter(p => p.category === filter);

  return (
    <div
      className="relative z-20 min-h-screen pt-24 pb-20 px-4 md:px-8 max-w-7xl mx-auto fade-in animate-in slide-in-from-bottom-10 duration-500">

      {/* Top Bar Navigation */}
      <div className="flex justify-between items-center mb-12 border-b border-white/10 pb-6">
        <div>
          <button onClick={onClose}
            className="flex items-center gap-2 text-slate-400 hover:text-cyan-400 font-mono text-sm uppercase tracking-widest transition-colors mb-4 cursor-pointer">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
            </svg>
            Return to Dashboard
          </button>
          <h1 className="text-4xl md:text-5xl font-black text-white tracking-tighter">
            Neural <span
              className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Archive</span>
          </h1>
        </div>
        <div className="hidden md:flex gap-1">
          <span className="w-2 h-2 bg-cyan-500 rounded-full animate-pulse"></span>
          <span className="text-[10px] font-mono text-cyan-500 uppercase">Live Index</span>
        </div>
      </div>

      {/* Filter Menu */}
      <div className="flex flex-wrap gap-3 mb-12">
        {categories.map(cat => (
          <button key={cat} onClick={() => setFilter(cat)}
            className={`px-4 py-2 rounded-full text-xs font-mono uppercase tracking-widest transition-all duration-300
            cursor-pointer ${filter === cat
                ? 'bg-cyan-500 text-black font-bold'
                : 'bg-white/5 text-slate-400 hover:bg-white/10 border border-white/10'
              }`}>
            {cat}
          </button>
        ))}
      </div>

      {/* Dynamic Grid (Netflix Style) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProjects.map((proj, idx) => (
          <ProjectCard key={idx} proj={proj} />
        ))}
        {filteredProjects.length === 0 && (
          <div className="col-span-full py-20 text-center text-slate-500 font-mono">
            No architectures found for this filter.
          </div>
        )}
      </div>

    </div>
  );
}

function FooterSection() {
  const [company, setCompany] = useState('');
  const [pitch, setPitch] = useState('');
  const [isPitching, setIsPitching] = useState(false);

  const generatePitch = async () => {
    if (!company.trim()) return;
    setIsPitching(true);
    setPitch('');

    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
    const endpoint =
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`;

    const systemPrompt = `You are an outreach message generator embedded in David Huang's portfolio website.

    DAVID HUANG — VERIFIED KNOWLEDGE BASE (use ONLY these facts about David):
    - Name: David Huang
    - Currently pursuing BEng in Artificial Intelligence at Xiamen University Malaysia
    - Technical Skills: Python, TensorFlow, Pandas, NumPy, Scikit-Learn, Prompt Engineering
    - Project 1: Vision Matrix Classifier — CNN-based deep learning image classifier, 92% accuracy over 100 epochs
    - Project 2: Sentiment Vector Space — NLP sentiment analysis using transformers, F1 score 0.88 on 50k tokens
    - Project 3: Algorithmic Forecaster — Data science forecasting model using Scikit-learn, R² 0.85
    - Project 4: LLM Prompt Optimizer — Reduced latency by 40% and token usage by 20%
    - Project 5: Audio Speech Recognition — Deep learning ASR system, 4.2% WER
    - Project 6: Customer Churn Predictor — AUC 0.91, 88% precision
    - Project 7: Semantic Search Engine — NLP-based search, Recall@10 of 94%
    - Strengths: Bridges theoretical math (linear algebra, calculus, probability) with applied ML
    - 300+ GitHub contributions, 7 public repositories, primary language Python (80%)

    STRICT RULES:
    1. About David: ONLY mention skills, projects, and facts listed above. Do NOT invent capabilities or experience he doesn't have.
    2. About the company: ONLY reference things you are genuinely confident are true about the company. If you are not sure what the company does, keep the message general — say something like "your team" or "your engineering challenges" instead of guessing specifics.
    3. NEVER fabricate company products, projects, missions, or values you aren't certain about.
    4. Do NOT mention "student" or "undergraduate" — frame everything around capabilities and what David can deliver.
    5. Keep the tone confident, direct, and professional.`;

    const prompt = `Draft a 3-sentence outreach message from David Huang to a recruiter at "${company}".
    
    Sentence 1: Lead with what David can build that would be relevant to ${company} — connect his specific projects/skills to the company's likely needs. If you're unsure what the company does, keep it general.
    Sentence 2: Highlight a specific technical achievement from his knowledge base that demonstrates impact.
    Sentence 3: Express interest in contributing and suggest connecting.
    
    Remember: only state facts about David from the knowledge base, and only reference company details you're genuinely confident about.`;

    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          systemInstruction: { parts: [{ text: systemPrompt }] }
        })
      });
      const data = await res.json();
      setPitch(data.candidates?.[0]?.content?.parts?.[0]?.text || "Failed to generate outreach pitch.");
    } catch (err) {
      setPitch("Network error. Unable to connect to LLM.");
    }
    setIsPitching(false);
  };

  return (
    <section id="contact" className="py-32 px-4 md:px-6 border-t border-white/5 relative overflow-hidden text-center">
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-gradient-to-b from-cyan-600/10 to-transparent blur-[100px] pointer-events-none">
      </div>

      <div className="max-w-3xl mx-auto relative z-10 flex flex-col items-center">
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tighter mb-6 uppercase">
          Connect & <span
            className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Collaborate</span>
        </h2>
        <p className="text-base md:text-lg text-slate-400 font-light mb-8 px-4">
          Seeking opportunities to apply theoretical AI knowledge into production environments.
        </p>

        <div
          className="w-full max-w-md bg-white/5 border border-white/10 rounded-2xl p-6 mb-10 backdrop-blur-md text-left">
          <label className="block text-xs font-mono text-cyan-400 uppercase tracking-widest mb-3">
            ✨ AI Outreach Generator
          </label>
          <p className="text-xs text-slate-400 mb-4">Are you a recruiter? Enter your company name and my AI agent will
            draft a custom pitch for you.</p>
          <div className="flex gap-2 mb-4">
            <input type="text" value={company} onChange={(e) => setCompany(e.target.value)}
              placeholder="e.g. Google, OpenAI, Startup Inc."
              className="flex-1 bg-black/40 border border-white/10 rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-cyan-500 font-mono"
            />
            <button onClick={generatePitch} disabled={isPitching || !company.trim()}
              className="px-4 py-2 bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-500/50 text-cyan-300 font-bold text-xs uppercase tracking-widest rounded-lg transition-colors disabled:opacity-50 flex items-center gap-2 cursor-pointer">
              {isPitching ? 'Drafting...' : 'Generate'}
            </button>
          </div>

          {pitch && (
            <div
              className="p-4 bg-black/60 rounded-xl border border-cyan-500/30 text-sm text-slate-300 leading-relaxed font-sans relative">
              <button onClick={() => navigator.clipboard.writeText(pitch)}
                className="absolute top-2 right-2 p-1.5 bg-white/5 hover:bg-white/10 rounded-md text-slate-400 hover:text-white transition-colors cursor-pointer"
                title="Copy to clipboard">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                    d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z">
                  </path>
                </svg>
              </button>
              {pitch}
            </div>
          )}
        </div>

        <div className="flex flex-col sm:flex-row justify-center gap-4 w-full sm:w-auto mt-4">
          <a href="mailto:student@xmu.edu.my"
            className="flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-bold tracking-widest uppercase transition-colors text-center w-full sm:w-auto">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z">
              </path>
            </svg>
            Email Me
          </a>
          <a href="https://linkedin.com/in/yourprofile" target="_blank" rel="noopener noreferrer"
            className="flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-[#0A66C2] hover:bg-[#004182] text-white font-bold tracking-widest uppercase transition-colors text-center w-full sm:w-auto">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path
                d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
            </svg>
            LinkedIn
          </a>
          <a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer"
            className="flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-[#24292e] hover:bg-black text-white font-bold tracking-widest uppercase border border-white/10 transition-colors text-center w-full sm:w-auto">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path
                d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
            GitHub
          </a>
        </div>
      </div>
    </section>
  );
}

// --- THREE.JS BACKGROUND ---
function ThreeJSFluidNetwork({ isMobile }) {
  const mountRef = useRef(null);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js';
    script.async = true;

    script.onload = () => {
      if (!mountRef.current || !window.THREE) return;

      const THREE = window.THREE;
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
      camera.position.z = 400;

      const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: !isMobile });
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(isMobile ? 1 : Math.min(window.devicePixelRatio, 2));
      mountRef.current.appendChild(renderer.domElement);

      const particleCount = isMobile ? 50 : 250;
      const geometry = new THREE.BufferGeometry();
      const positions = new Float32Array(particleCount * 3);

      const spread = isMobile ? 600 : 1200;
      for (let i = 0; i < particleCount; i++) {
        positions[i * 3] = (Math.random() - 0.5) * spread;
        positions[i * 3 + 1] = (Math.random() - 0.5) * spread;
        positions[i * 3 + 2] = (Math.random() - 0.5) * 500;
      }

      geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

      const material = new THREE.PointsMaterial({
        color: 0x06b6d4,
        size: isMobile ? 2 : 3,
        transparent: true,
        opacity: 0.4,
        blending: THREE.AdditiveBlending
      });

      const particles = new THREE.Points(geometry, material);
      scene.add(particles);

      let time = 0;
      const animate = () => {
        requestAnimationFrame(animate);
        time += 0.001;

        particles.rotation.y = time;
        particles.rotation.x = time * 0.5;

        const posArray = particles.geometry.attributes.position.array;
        for (let i = 0; i < particleCount; i++) {
          posArray[i * 3 + 1] += Math.sin(time * 10 + posArray[i * 3]) * 0.2;
        }
        particles.geometry.attributes.position.needsUpdate = true;
        renderer.render(scene, camera);
      };
      animate();

      const handleResize = () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      };
      window.addEventListener('resize', handleResize);

      return () => {
        window.removeEventListener('resize', handleResize);
        if (mountRef.current) mountRef.current.removeChild(renderer.domElement);
        geometry.dispose();
        material.dispose();
        renderer.dispose();
      };
    };

    document.body.appendChild(script);

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, [isMobile]);

  return (
    <div ref={mountRef} className="fixed top-0 left-0 w-full h-full pointer-events-none opacity-30 z-0" />
  );
}