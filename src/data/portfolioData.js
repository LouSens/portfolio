// Portfolio data store: full-stack and AI systems focus
import { TECH_STACK } from './techStack';

export const PERSONAL_INFO = {
  name: 'David Kurniawan',
  role: 'Full-Stack Developer & AI Systems Engineer',
  title: 'Full-Stack Developer & AI Systems Engineer',
  location: 'Malaysia / Remote',
  email: 'davidk.academic@gmail.com',
  github: 'https://github.com/LouSens',
  linkedin: 'https://www.linkedin.com/in/davidkurniawan13/',
  gpa: '3.84 / 4.00',
  university: 'Xiamen University Malaysia',
  degree: 'BEng (Hons) in Artificial Intelligence',
  status: 'Open to internships and remote part-time roles',
  resumeUrl: '/CV_DAVID KURNIAWAN.pdf',
};

export const MARQUEE_TOOLS = [
  { name: 'React 19', category: 'Frontend', svg: 'https://cdn.simpleicons.org/react/white' },
  { name: 'FastAPI', category: 'Backend', svg: 'https://cdn.simpleicons.org/fastapi/white' },
  { name: 'LangGraph', category: 'Agentic AI', svg: 'https://cdn.simpleicons.org/langchain/white' },
  { name: 'Python', category: 'Core', svg: 'https://cdn.simpleicons.org/python/white' },
  { name: 'PostgreSQL', category: 'Database', svg: 'https://cdn.simpleicons.org/postgresql/white' },
  { name: 'PyTorch', category: 'Machine Learning', svg: 'https://cdn.simpleicons.org/pytorch/white' },
  { name: 'Docker', category: 'DevOps', svg: 'https://cdn.simpleicons.org/docker/white' },
  { name: 'Tailwind CSS', category: 'Frontend', svg: 'https://cdn.simpleicons.org/tailwindcss/white' },
  { name: 'scikit-learn', category: 'Machine Learning', svg: 'https://cdn.simpleicons.org/scikitlearn/white' },
  { name: 'Redis', category: 'Infrastructure', svg: 'https://cdn.simpleicons.org/redis/white' },
  { name: 'GitHub Actions', category: 'DevOps', svg: 'https://cdn.simpleicons.org/githubactions/white' },
  { name: 'Vercel', category: 'Cloud', svg: 'https://cdn.simpleicons.org/vercel/white' },
];

// Main Web & Software Projects
export const PROJECTS_DATA = [
  {
    id: 'kerjacerdas',
    title: 'KerjaCerdas',
    slug: 'kerjacerdas',
    type: 'Full-Stack & AI Matching Platform',
    category: 'AI-Powered Talent Matching Platform',
    role: 'Backend & AI',
    team: '4-person team',
    isTeam: true,
    year: '2026',
    badge: 'FEATURED BUILD',
    highlight: 'Finalist and Tier 3 Award, PIDI Digdaya x Hackathon 2026',
    posterAccent: 'from-white/[0.08] to-black/30',
    hasRealUI: true,
    coverImage: '/screenshots/kerjacerdas-v2/mobile-landing.webp',
    coverPosition: 'top',
    heroImage: '/screenshots/kerjacerdas-v2/seeker-dashboard.webp',
    walkthrough: { src: '/media/demos/kerjacerdas-demo.mp4', poster: '/media/demos/kerjacerdas-demo-poster.webp', seconds: 26 },
    synopsis:
      'An AI career platform that ranks candidates on skills they can prove, shows what is missing for a target job, and points to the courses that close the gap.',
    overview:
      'Job seekers send dozens of applications and hear nothing back. Recruiters spend hours on candidates who were never a fit. KerjaCerdas matches people to jobs on what they can actually do, not the keywords on their CV, and tells them exactly what to learn next.',
    problem:
      'Job seekers send dozens of applications and get silence or a generic rejection, with no idea what to improve. Recruiters spend hours screening candidates who were never a good fit.',
    solution:
      'Rank on proven skills instead of keywords. Show the candidate which skills are missing for the job they want, recommend courses to close the gap, and give employers one ranked list of better-fit applicants.',
    businessOutcomes: [
      'Finalist and Tier 3 Award at PIDI Digdaya x Hackathon 2026 by Bank Indonesia, top 80 of 2,000+ teams',
      'Demoed at FEKDI x IFSE 2026 at JICC Jakarta to recruiters, educators and founders',
    ],
    architectureNodes: [
      { name: 'Candidate & Employer Portal', desc: 'React 18 and Zustand app for job seekers and employers' },
      { name: 'FastAPI Backend', desc: 'Pydantic v2 validation, per-route rate limits and async CV extraction' },
      { name: 'Matching Engine', desc: 'Four-factor, proof-weighted score over 768-dim pgvector embeddings with HNSW indexing' },
      { name: 'Skill Gap & Courses', desc: 'Gap against a target job, study-time estimate and course recommendations' },
      { name: 'Career Advisor', desc: 'LangGraph conversational advisor' },
      { name: 'Privacy & Guardrails', desc: 'PII redaction before any model call, hallucination guards, 3-model fallback with a circuit breaker' },
    ],
    impactMetrics: [
      { value: '4-Factor', label: 'Proof-weighted match score' },
      { value: '163', label: 'Skills with quiz banks' },
      { value: '768-dim', label: 'MRL-truncated embeddings' },
      { value: 'Tier 3', label: 'PIDI Digdaya x Hackathon 2026' },
    ],
    parts: [
      {
        title: 'Matching engine',
        text: 'A four-factor ranking over pgvector embeddings: 35% semantic fit, 40% skills weighted by proof, 15% experience, 10% education. Location and salary are hard filters.',
      },
      {
        title: 'Skill gap and courses',
        text: 'Shows which skills are missing for a target job, estimates study time and recommends courses to close each gap.',
      },
      {
        title: 'Career advisor',
        text: 'A conversational career advisor built on LangGraph, running behind the same API as matching.',
      },
      {
        title: 'Responsible AI',
        text: 'Emails, phone numbers and 16-digit IDs are stripped by fixed rules before text reaches Gemini. Prompt-injection defences, hallucination guards, and a 3-model fallback keep it reliable.',
      },
      {
        title: 'CV intake',
        text: 'Gemini turns PDF CVs into skills, experience and education, processed asynchronously so uploads stay fast.',
      },
      {
        title: 'Shipping',
        text: 'A 4-phase GitHub Actions pipeline: lint, unit tests, database integration tests on a live pgvector container, and a latency benchmark.',
      },
    ],
    flow: {
      title: 'How KerjaCerdas works',
      steps: [
        { name: 'Pick a target job', icon: 'Target', desc: 'Jobs that fit your profile, ranked on skills you can prove.' },
        { name: 'See what is missing', icon: 'Search', desc: 'A skill-gap view specific to that job, not a generic list.' },
        { name: 'Learn', icon: 'BookOpen', desc: 'Course recommendations for each missing skill. Pass a short quiz to earn a Proven badge.' },
        { name: 'Apply', icon: 'Send', desc: 'Every applicant lands in one ranked list for the employer.' },
        { name: 'Get HR feedback', icon: 'MessageSquare', desc: 'Rejection reasons and confirmed skills from the interview feed the next round.' },
      ],
      loopNote: 'Not selected? The reason from HR sends you back to step 2.',
    },
    demo: 'proof-score',
    process: [
      {
        decision: 'Why rank on proven skills instead of CV keywords?',
        reasoning:
          'A claim on a CV costs nothing to write, so stuffing keywords used to win. The skill part of the score now weights evidence: a claimed skill counts 0.30, a passed quiz 0.85, and a skill confirmed by HR after an interview 1.00. The evidence is stored on the server and cannot be set from the client.',
      },
      {
        decision: 'Why hard filters for location and salary instead of folding them into the score?',
        reasoning:
          "A softly weighted location or salary term would let a great semantic match in the wrong city, or outside the budget, outrank a job that actually fits. That is confusing for a candidate and impossible to explain. Filtering them out first means every job that shows up can be explained by the four remaining factors.",
      },
      {
        decision: 'Why remove the recency factor from the score?',
        reasoning:
          "It added 5% to the score, but it was the same value for every candidate, so it carried no signal. Taking it out made the score more honest rather than less accurate.",
      },
      {
        decision: 'Why spend so much time on how results are shown, not just how they are computed?',
        reasoning:
          "I expected the engine to be the hard part, but a lot of my time went into UX. A model can produce a perfect score, but if a job seeker cannot understand or trust it, it helps no one. Showing the factor breakdown and the exact missing skills mattered as much as the ranking itself. The product is not the model, it is the decision it helps someone make.",
      },
      {
        decision: 'Why a regex filter for PII redaction instead of asking an LLM to strip sensitive data?',
        reasoning:
          "Using an LLM to scrub personal data adds latency and cost to every request, and it is not guaranteed to catch everything consistently. A deterministic pass over known patterns (emails, phone numbers, 16-digit IDs) runs before any external model call and behaves the same way every time, which matters more for compliance than a filter that can drift.",
      },
      {
        decision: 'Why add a token-efficiency gate instead of always generating a narrative explanation?',
        reasoning:
          "Early on, the agent called the LLM to write an explanation for every match, including weak ones nobody would act on. That pays for latency and tokens to explain an obvious non-fit. A threshold check that skips the narrative when every match scores below it cut wasted calls without touching ranking quality.",
      },
    ],
    tags: ['React 18', 'FastAPI', 'PostgreSQL + pgvector', 'LangGraph', 'Gemini', 'Zustand', 'Docker Compose'],
    githubUrl: 'https://github.com/LouSens/KerjaCerdas.git',
    liveUrl: 'https://kerjacerdas.tech',
    screenCategories: [
      {
        name: 'Landing',
        screens: [
          { src: '/screenshots/kerjacerdas-v2/landing.webp', caption: 'Landing: know which skills you lack before you apply' },
          { src: '/screenshots/kerjacerdas-v2/landing-loop.webp', caption: 'The loop: pick a target, learn what is missing, then apply' },
        ],
      },
      {
        name: 'Job seeker',
        screens: [
          { src: '/screenshots/kerjacerdas-v2/seeker-dashboard.webp', caption: 'Dashboard with ranked matches and a skill-gap summary' },
          { src: '/screenshots/kerjacerdas-v2/seeker-match.webp', caption: 'Matches ranked on proven skills, with the missing ones flagged' },
          { src: '/screenshots/kerjacerdas-v2/seeker-learning-plan.webp', caption: 'Learning plan: the skills missing for the chosen target job' },
          { src: '/screenshots/kerjacerdas-v2/seeker-applications.webp', caption: 'Applications with HR feedback and the reason behind a rejection' },
          { src: '/screenshots/kerjacerdas-v2/seeker-interview.webp', caption: 'Interview stage, with skills confirmed by HR' },
        ],
      },
      {
        name: 'Employer',
        screens: [
          { src: '/screenshots/kerjacerdas-v2/employer-dashboard.webp', caption: 'Employer dashboard' },
          { src: '/screenshots/kerjacerdas-v2/employer-applicants.webp', caption: 'Ranked applicants with a skill map for the job' },
          { src: '/screenshots/kerjacerdas-v2/employer-trust.webp', caption: 'Trust and verification for employers' },
        ],
      },
      {
        name: 'On mobile',
        screens: [
          { src: '/screenshots/kerjacerdas-v2/mobile-landing.webp', caption: 'Landing on a phone' },
          { src: '/screenshots/kerjacerdas-v2/mobile-dashboard.webp', caption: 'Dashboard on a phone' },
          { src: '/screenshots/kerjacerdas-v2/mobile-match.webp', caption: 'Matches on a phone' },
          { src: '/screenshots/kerjacerdas-v2/mobile-learning-plan.webp', caption: 'Learning plan on a phone' },
        ],
      },
    ],
  },
  {
    id: 'adept',
    title: 'Adept',
    slug: 'adept',
    type: 'Career & Reskilling Decision Platform',
    category: 'AI-Era Skills, Roles & Learning Plans',
    role: 'Team leader',
    team: 'Team Pecel Lele',
    isTeam: true,
    year: 'Oct 2026',
    badge: 'HACKATHON BUILD',
    highlight: 'Finalist (top 15), SDC XMUM Hackathon 2026',
    posterAccent: 'from-white/[0.08] to-black/30',
    hasRealUI: true,
    coverImage: '/screenshots/adept/cover.webp',
    coverPosition: 'top',
    heroImage: '/screenshots/adept/cover.webp',
    screenCategories: [
      {
        name: 'For a person',
        screens: [
          { src: '/screenshots/adept/me-home.webp', caption: 'Home: best-fit role, journey and top matches' },
          { src: '/screenshots/adept/me-radar.webp', caption: 'Skills radar: rising and declining skills, with your own marked' },
          { src: '/screenshots/adept/me-role.webp', caption: 'A role: the score, skills to close and the outlook under two AI paces' },
          { src: '/screenshots/adept/me-plan.webp', caption: 'Learning plan: ordered, free courses with hours and cost' },
          { src: '/screenshots/adept/me-progress.webp', caption: 'Progress: courses done, skill levels and badges' },
          { src: '/screenshots/adept/me-sdg.webp', caption: 'UN Goals: which goals the path supports' },
        ],
      },
      {
        name: 'For a team',
        screens: [
          { src: '/screenshots/adept/team-home.webp', caption: 'Team home: profiles ready and where the team is short' },
          { src: '/screenshots/adept/team-members.webp', caption: 'Team: members, profile status and the join code' },
          { src: '/screenshots/adept/team-gaps.webp', caption: 'Skill gaps: share of the team missing each skill, by role' },
          { src: '/screenshots/adept/team-radar.webp', caption: 'Industry radar and automation exposure' },
          { src: '/screenshots/adept/team-plan.webp', caption: 'Team plan: compare learning packages by cost and time' },
        ],
      },
      {
        name: 'Public site',
        screens: [
          { src: '/screenshots/adept/cover.webp', caption: 'Landing page' },
          { src: '/screenshots/adept/app-try.webp', caption: 'Try it first: drop a CV, no sign-up' },
          { src: '/screenshots/adept/app-impact.webp', caption: 'Evidence page' },
          { src: '/screenshots/adept/app-mobile.webp', caption: 'On a phone' },
        ],
      },
      {
        name: 'Diagrams',
        screens: [
          { src: '/screenshots/adept/system-architecture.webp', caption: 'System architecture: one public Next.js server, a private FastAPI service, PostgreSQL with pgvector and the refresh pipeline' },
          { src: '/screenshots/adept/user-journey-both-modes.webp', caption: 'User journey for a person and for a team, from landing page to a saved plan' },
          { src: '/screenshots/adept/individual-from-cv-to-a-saved-plan.webp', caption: 'From a CV to a saved learning plan, call by call' },
          { src: '/screenshots/adept/explainable-match-score.webp', caption: 'The match score: four parts, each shown to the user with its weight' },
        ],
      },
    ],
    synopsis:
      'A sourced, human-led guide that connects the skills you have to dated AI and labour signals, explains which roles fit, and turns the choice into an ordered, costed learning plan.',
    overview:
      'AI changes work faster than a one-time skills test or a static course list can follow. Adept links confirmed skills to dated trend signals, ranks roles with a score you can inspect, and builds a plan from a verified course catalogue. A second mode gives teams and career centres a cohort view without taking the choice away from the individual.',
    problem:
      'People and advisers face one fragmented decision: what can I do today, which skills are rising or fading, which role fits, and what can I realistically learn within my time and budget.',
    solution:
      'One backend and one explainable model. Skills are confirmed by the person, trends carry their source and date, every role score shows its parts, and every course in a plan comes from a verified catalogue with hours and cost.',
    businessOutcomes: [
      'Finalist (top 15) at the SDC XMUM Hackathon 2026, Domain 1: Future-Ready Workforce',
      'Built by a four-person team, with SDG 4 (Quality Education) as the main goal',
      'Every recommendation carries source names, retrieval dates, the snapshot date and an estimate label, so nothing is presented as more certain than it is',
      'Individual and organisation workspaces on one engine, in English, Bahasa Melayu and Chinese',
      'Fairness check: swapping 5 names and 3 segments across 5 personas (75 swaps) moved no role rank, and 93 API inputs passed the protected-term guardrail',
    ],
    architectureNodes: [
      { name: 'Next.js 16 app', desc: 'One public server: pages, server actions, API proxy and health checks, in three languages' },
      { name: 'FastAPI service', desc: 'Private API for profiles, trends, matching, pathways, SDG links, jobs and accounts, with Pydantic v2 contracts' },
      { name: 'PostgreSQL + pgvector', desc: 'Profiles, catalogue, dated trend snapshots with provenance, plans and progress' },
      { name: 'Trend pipeline', desc: 'arXiv cs.AI abstracts embedded with MiniLM on RunPod, scored per skill against a dated BLS labour baseline' },
      { name: 'Adi guide', desc: 'Deterministic guide by default; an optional LLM only picks validated, server-written answer blocks' },
      { name: 'GitHub Actions CI', desc: 'Lint, Python and web tests, TypeScript, translation parity and contract drift checks, plus browser journeys' },
    ],
    impactMetrics: [
      { value: '104', label: 'Courses in the verified catalogue' },
      { value: '48', label: 'Roles with skill requirements' },
      { value: '142', label: 'Skills in the taxonomy' },
      { value: '0', label: 'Rank changes across 75 fairness swaps' },
    ],
    partsTitle: 'What the team built',
    parts: [
      {
        title: 'Skills radar',
        text: 'Which skills are rising, steady or declining, from public arXiv cs.AI papers and a dated BLS baseline, with a moderate and a fast AI scenario.',
      },
      {
        title: 'Explainable role match',
        text: 'Skill overlap 45%, trend outlook 25%, interest fit 30%, with an optional UN Goals weight. The person sees each part and the missing skills.',
      },
      {
        title: 'Learning plan',
        text: 'An ordered plan from 104 verified courses: 92 are free, with hours, cost and HRD Corp claimability noted.',
      },
      {
        title: 'Team workspace',
        text: 'A join-code organisation, a skills-gap heatmap from consenting members, and a plan towards a target role. Members choose what to share.',
      },
      {
        title: 'UN Goals link',
        text: '26 distinct SDG targets across 88 role links, so a chosen path shows which goals it contributes to.',
      },
      {
        title: 'Honest evidence',
        text: 'Synthetic personas only, no raw CVs stored, and no human trials claimed. 1,985 Python and 129 web tests passed at the last recorded check.',
      },
    ],
    flow: {
      title: 'How Adept works',
      steps: [
        { name: 'Radar', icon: 'Search', desc: 'See which skills are rising, steady or declining, with the source and date.' },
        { name: 'Roles', icon: 'Target', desc: 'Ranked role matches, each score broken into parts with the skills you have, partly have or lack.' },
        { name: 'Plan', icon: 'BookOpen', desc: 'Pick a target role and get an ordered plan of verified courses, with weeks and cost.' },
        { name: 'Progress', icon: 'MessageSquare', desc: 'Mark courses done and add evidence. Confirmed evidence raises your skill levels.' },
        { name: 'Jobs', icon: 'Send', desc: 'Explore openings for the role you chose, from credited public feeds.' },
      ],
      loopNote: 'Confirmed evidence feeds back into the role match, so the next ranking reflects what you learned.',
    },
    tags: ['Next.js 16', 'React 19', 'TypeScript', 'FastAPI', 'PostgreSQL + pgvector', 'Sentence Transformers', 'Tailwind v4', 'RunPod', 'Replit'],
    githubUrl: 'https://github.com/pecel-lelele/adept',
    liveUrl: 'https://adept-my.replit.app',
  },
  {
    id: 'radar',
    title: 'RADAR',
    slug: 'radar',
    type: 'Full-Stack Market Analytics App',
    category: 'Read-Only Portfolio Analyst & Machine Learning',
    role: 'Full-Stack & ML Engineer',
    team: 'Solo build',
    isTeam: false,
    year: 'Oct 2026',
    badge: 'NEW BUILD',
    highlight: 'Solo build, open source',
    posterAccent: 'from-white/[0.08] to-black/30',
    hasRealUI: true,
    coverImage: '/screenshots/radar/home.webp',
    coverPosition: 'top',
    heroImage: '/screenshots/radar/home.webp',
    walkthrough: { src: '/media/demos/radar-reel.mp4', poster: '/media/demos/radar-reel-poster.webp', seconds: 32 },
    film: {
      src: '/media/demos/radar-reel.mp4',
      poster: '/media/demos/radar-reel-poster.webp',
      title: 'Bitcoin fell. Now what?',
      note: 'A 32-second film I made for the app in Remotion: one situation, Bitcoin falling, and the questions a holder asks, each answered by the app. Every figure in it is the app\u2019s own; the portfolio is a made-up example. The sound effects are generated in code.',
    },
    screenCategories: [
      {
        name: 'Home & markets',
        screens: [
          { src: '/screenshots/radar/home.webp', caption: 'Home: the account, what to do now, the three markets, what is coming up' },
          { src: '/screenshots/radar/bitcoin.webp', caption: 'A market: live price, its state, the range ahead and the size of a day\u2019s movement' },
          { src: '/screenshots/radar/markets.webp', caption: 'Markets side by side over a day, a week, a month and a year' },
          { src: '/screenshots/radar/calendar.webp', caption: 'Calendar: Fed, jobs and inflation dates, with how markets moved on past ones' },
        ],
      },
      {
        name: 'Questions it answers',
        screens: [
          { src: '/screenshots/radar/moves.webp', caption: 'Why it moved: each day against a usual day, with that day\u2019s headlines' },
          { src: '/screenshots/radar/check.webp', caption: 'Before you buy: where the price sits in its range, from a day to a year' },
          { src: '/screenshots/radar/range.webp', caption: 'Price range ahead, from 10,000 simulated futures' },
          { src: '/screenshots/radar/risk.webp', caption: 'Where the risk sits: share of the money against share of the risk' },
          { src: '/screenshots/radar/todo.webp', caption: 'What to do now: spare cash split into a ladder of prices, from the plan you set' },
        ],
      },
    ],
    synopsis:
      'A rigorous portfolio analyst for Bitcoin, gold and US stocks: every question answered with evidence, every model proved on days it had not seen, every claim accompanied by its sample size.',
    overview:
      'RADAR connects to a Binance account, explains exactly what each holding is doing, forecasts how far prices could move, and converts a plan of target shares into a precise, actionable list of what to do with spare cash. Every figure on screen carries its sample size and time period. Every model is validated on data it has never seen before. Research that passed its tests is shipped; research that failed is documented and kept honest. The screens shown use a made-up example portfolio.',
    problem:
      'When a holding falls, five questions hit at once: why did it move, is this price high or low right now, how far could it go from here, how risky is my overall mix, and what should I actually do. Most tools respond with a chart and an opinion, but give you no way to verify either.',
    solution:
      'A single app that answers every question with stored data and visible evidence. Suggestions only come from rules that cleared a pre-written test. Every model is walk-forward validated. Every accuracy claim is shown alongside its sample size, so you can judge it yourself.',
    businessOutcomes: [
      'Move-size forecasts outperformed every competing model tested, winning 6 of 6 head-to-head comparisons',
      '35 of 36 loss limits held at exactly the claimed frequency, verified with simultaneous-testing corrections',
      'Architecturally safe by design: an automated test locks the permitted API endpoints so the app can only read, never act',
      'Research integrity enforced end-to-end: every hypothesis and its pass mark are committed before the data is touched',
    ],
    architectureNodes: [
      { name: 'Sources', desc: 'Alpaca market data and news, the Binance account and public prices. Every connection is a read.' },
      { name: 'Worker', desc: 'Hourly sync, data-quality checks, then each model in order (APScheduler)' },
      { name: 'PostgreSQL + TimescaleDB', desc: 'Raw bars and news are append-only; models write to their own tables' },
      { name: 'FastAPI', desc: 'REST endpoints over stored results, and a WebSocket for live prices' },
      { name: 'React app', desc: 'TanStack Query, with API types generated from the backend\u2019s OpenAPI schema' },
    ],
    impactMetrics: [
      { value: '6 of 6', label: 'Move-Size Forecast Wins' },
      { value: '35 of 36', label: 'Loss Limits Held at Claimed Rate' },
      { value: '61% vs 52%', label: 'Fine-Tuned vs General Sentiment Model' },
      { value: '10,000', label: 'Simulated Price Paths per Forecast' },
    ],
    bullets: [
      'Engineered a full-stack portfolio analyst (FastAPI, PostgreSQL + TimescaleDB, React 19, TypeScript) that connects to a Binance account and delivers actionable insights in real time, with API access enforced at the test level.',
      'Deployed four validated models per market (hidden Markov model for regime detection, 10,000-path Monte Carlo simulation for the price range ahead, HAR regression for daily move-size forecasting, and coverage-tested loss limits), each proved walk-forward on unseen days.',
      'Applied pre-registered research discipline: every hypothesis and its pass mark were committed before the data was touched, ensuring that every result that reached the product is a result that can be trusted.',
      'Fine-tuned FinBERT on 1,800 labelled headlines, lifting sentiment accuracy from 52% (general model) to 61% on 700 held-out headlines, with the measured score displayed on every news card.',
      'Directed and built a 32-second Remotion film featuring a 3D coin, animated mark, phone mock-up, and the live app interface, with all sound effects generated programmatically in code.',
    ],
    tags: ['FastAPI', 'PostgreSQL', 'TimescaleDB', 'React 19', 'TypeScript', 'PyTorch', 'scikit-learn', 'Docker', 'Remotion'],
    process: [
      {
        decision: 'Why does the app forecast move size rather than direction?',
        reasoning:
          'Move-size forecasting is where the evidence is strongest. Seven direction-prediction approaches (RSI, moving averages, support and resistance, funding rates, gradient-boosted trees, logistic regression, and an LSTM) were each stress-tested with a planted signal first to prove the method could detect a real pattern. None cleared their pre-set bar. Move-size models won 6 of 6 comparisons, so that is what ships.',
      },
      {
        decision: 'Why commit the pass mark before running each test?',
        reasoning:
          'Pre-registration is the only discipline that stops a market result from meaning nothing. With enough indicators and parameter choices, in-sample fitting always finds something that looks good. Locking the question and the threshold first, and never re-running a failure with adjusted settings, makes each result genuinely informative.',
      },
      {
        decision: 'Why use filtered probabilities and strict walk-forward validation?',
        reasoning:
          'Every figure shown for a historical day uses only the data available up to that day. Smoothed states look tidier but borrow from the future; a shuffled train/test split leaks tomorrow into yesterday. Strict walk-forward validation (refit on the past, judged on the days that follow) is the standard that makes any claim on live data credible, and each model has an automated test that proves it holds.',
      },
      {
        decision: 'Why build the film from the app\u2019s own components instead of screen recordings?',
        reasoning:
          'The live app displays a real account on every page, so recording it was never an option. Instead, the film\u2019s data panels are the app\u2019s own React components rebuilt for Remotion, fed from recorded market data and an example portfolio computed by the app\u2019s own back end, keeping every figure in the film technically accurate.',
      },
    ],
    parts: [
      { title: 'Live account intelligence', text: 'Holdings pulled from Binance in real time, a plan of target shares, and spare cash precisely laddered into buy prices derived from the current market.' },
      { title: 'Four validated models per market', text: 'Regime detection (hidden Markov model), price range ahead (10,000-path Monte Carlo), daily move-size forecast (HAR regression), and coverage-tested loss limits: every one proved on unseen days.' },
      { title: 'Pre-registered research', text: 'Every hypothesis and its pass mark committed before the data is touched. The research log is public, results are reproducible, and only what passed ships.' },
      { title: 'Sentiment with measured accuracy', text: 'Headlines scored by a fine-tuned FinBERT that lifted accuracy from 52% to 61%. The measured score sits beside every result so you can judge its weight yourself.' },
      { title: 'The film', text: 'A 32-second Remotion film with code-generated sound: a 3D coin becomes the logo, then each question the app answers flows into the next.' },
    ],
    githubUrl: 'https://github.com/LouSens/RADAR.git',
    liveUrl: null,
  },
  {
    id: 'orion',
    title: 'Orion',
    slug: 'orion',
    type: 'Full-Stack SaaS & AI Workflows',
    category: 'AI Expense SaaS & Policy Workflows',
    role: 'Tech Lead & Backend Architect',
    team: '4-person team',
    isTeam: true,
    year: 'May 2026',
    badge: 'TOP 24 HACKATHON',
    highlight: 'Top 24 of 100+ teams, UM Hackathon 2026',
    posterAccent: 'from-white/[0.08] to-black/30',
    hasRealUI: true,
    coverImage: '/media/orion/07-manager-approvals.jpg',
    coverPosition: '22% top',
    heroImage: '/media/orion/02-employee-dashboard.jpg',
    walkthrough: { src: '/media/demos/orion-demo.mp4', poster: '/media/demos/orion-demo-poster.webp', seconds: 31 },
    screenCategories: [
      {
        name: 'Employee',
        screens: [
          { src: '/media/orion/02-employee-dashboard.jpg', caption: 'Employee dashboard: live claim progress, budget and an AI-flagged duplicate warning' },
          { src: '/media/orion/03-new-claim.jpg', caption: 'New claim written in plain language, parsed and categorized by the agents' },
          { src: '/media/orion/08-claim-history.jpg', caption: 'Claim history with auto-approve, escalate and reject outcomes' },
        ],
      },
      {
        name: 'Manager & Finance',
        screens: [
          { src: '/media/orion/07-manager-approvals.jpg', caption: 'Manager view: pending approvals, team velocity and category outliers' },
          { src: '/media/orion/06-finance-control.jpg', caption: 'Finance control: audit coverage, duplicates caught and the policy engine' },
          { src: '/media/orion/05-audit-trail.jpg', caption: 'Audit trail with duplicate detection, escalation and ledger verification' },
        ],
      },
      {
        name: 'Entry',
        screens: [
          { src: '/media/orion/01-splash.jpg', caption: 'Orion intelligent workflow engine' },
          { src: '/media/orion/09-role-select.jpg', caption: 'Sign in as employee, manager or finance' },
          { src: '/media/orion/04-finance-signin.jpg', caption: 'Finance sign-in' },
        ],
      },
    ],
    synopsis:
      'Automated corporate expense reimbursement platform that eliminates manual receipt audits, duplicate claims, and policy violations in seconds.',
    overview:
      'Orion transforms corporate expense reconciliation by replacing slow manual receipt reviews with a 6-stage intelligent workflow. Built under 48-hour hackathon constraints and placing in the Top 24 out of 100+ teams, it automatically checks receipts against company policy, detects duplicate submissions, and produces audit-ready financial ledgers.',
    problem:
      'Finance teams lose countless hours cross-referencing messy receipt photos against complex company spending policies, frequently missing duplicate or fraudulent claims.',
    solution:
      'Engineered an automated 6-stage state machine that scans receipt images, verifies merchant legitimacy, flags duplicate submissions via fuzzy matching, and updates transaction ledgers with full audit trails.',
    businessOutcomes: [
      'Top 24 finish out of 100+ competing teams at UM Hackathon 2026',
      'Automated duplicate detection stopping accidental double-reimbursements',
      'Audit-ready structured JSON ledgers for effortless accounting exports',
      '85% code coverage across unit and integration tests, with nightly regressions against production LLM APIs',
    ],
    architectureNodes: [
      { name: 'Intake Node', desc: 'Receipt parsing & prompt-injection sanitization' },
      { name: 'Policy Engine', desc: 'Deterministic policy evaluation with rapidfuzz duplicate check' },
      { name: 'Validation Stage', desc: 'LangGraph multi-step verification graph' },
      { name: 'Rate Limiter', desc: 'Sliding-window memory rate limiting middleware' },
      { name: 'Ledger Node', desc: 'Immutable structured transaction ledger' },
    ],
    impactMetrics: [
      { value: 'Top 24', label: 'Out of 100+ Teams (Hackathon)' },
      { value: '~80%', label: 'Faster Claim Processing' },
      { value: '6-Stage', label: 'Automated State Machine' },
      { value: '85%', label: 'Code Coverage (Unit + Integration)' },
    ],
    bullets: [
      'Built a 6-stage autonomous LLM workflow using LangGraph and FastAPI to automate end-to-end expense claim processing, parsing natural language submissions to extract, validate, and auto-approve claims, reducing processing time by roughly 80%.',
      'Integrated LangSmith observability and type-safe Pydantic contracts, establishing real-time tracing, token cost monitoring, and execution state debugging across all agent stages.',
      'Engineered deterministic document parsing and policy engines (Python, rapidfuzz, pypdf) for duplicate claim detection via fuzzy string matching and persistent audit logging.',
      'Established a dual-tier CI/CD testing architecture in GitHub Actions: PR gates enforcing unit/integration tests at 85% code coverage, alongside nightly cron regression suites running live against production LLM APIs.',
    ],
    tags: ['React 19', 'FastAPI', 'LangGraph', 'LangSmith', 'Pydantic v2', 'GitHub Actions'],
    process: [
      {
        decision: 'Why fuzzy string matching for duplicate detection instead of exact match?',
        reasoning:
          "Receipt data is messy. The same merchant can come through as \"Starbucks Coffee,\" \"STARBUCKS #4521,\" or \"Starbucks Coff.\" depending on how it was scanned. Exact matching would miss all of those as duplicates. Fuzzy matching catches near-identical merchant names and amounts even when the formatting differs, which is what actually happens with real receipts.",
      },
      {
        decision: 'Why run nightly regression tests against production LLM APIs on top of the normal PR test gate?',
        reasoning:
          "LLM outputs aren't fully deterministic, and the model on the provider's end can change without any signal to us. A suite that only runs against mocked responses can pass every single time while real production behavior quietly drifts underneath it. Running a live regression suite overnight was the only way we'd actually catch that kind of drift before a user did.",
      },
      {
        decision: 'Why split expense processing into 6 discrete stages instead of one end-to-end LLM call?',
        reasoning:
          "A single prompt asking a model to 'process this expense claim' gives you no point to intervene if something looks wrong partway through. Breaking it into intake, intelligence, policy, validation, approval, and recording stages meant each one could be tested and audited on its own, and a claim that failed a policy check never made it to auto-approval.",
      },
    ],
    parts: [
      { title: '6-stage workflow', text: 'A LangGraph state machine: intake, intelligence, policy, validation, approval and recording. Each stage can be tested and audited on its own.' },
      { title: 'Policy and duplicates', text: 'A deterministic policy engine with rapidfuzz fuzzy matching catches duplicate receipts and over-limit claims.' },
      { title: 'Observability', text: 'LangSmith tracing, Pydantic v2 contracts and token-cost monitoring across every agent stage.' },
      { title: 'Two-tier CI', text: 'PR gates enforce 85% coverage, and nightly regression runs hit the live LLM APIs to catch silent drift.' },
    ],
    githubUrl: 'https://github.com/LouSens/orion.git',
    liveUrl: null,
  },
  {
    id: 'neuralvoid',
    title: 'NeuralVoid',
    image: '/screenshots/neuralvoid/summary.webp',
    slug: 'neuralvoid',
    type: 'Full-Stack Analytics Web App',
    category: 'Behavioral Analytics & Machine Learning SPA',
    role: 'Full-Stack & ML Engineer',
    team: 'Solo build',
    isTeam: false,
    year: 'Jan 2026',
    badge: 'RESEARCH BUILD',
    highlight: 'Solo build',
    posterAccent: 'from-white/[0.08] to-black/30',
    hasRealUI: true,
    coverImage: '/screenshots/neuralvoid/summary-detail.webp',
    coverPosition: '12% top',
    heroImage: '/screenshots/neuralvoid/summary.webp',
    walkthrough: { src: '/media/demos/neuralvoid-demo.mp4', poster: '/media/demos/neuralvoid-demo-poster.webp', seconds: 27 },
    screenCategories: [
      {
        name: 'Results',
        screens: [
          { src: '/screenshots/neuralvoid/summary.webp', caption: 'Summary: the answer in one sentence, then a habit level in words' },
          { src: '/screenshots/neuralvoid/summary-detail.webp', caption: 'What the hours add up to, and the three things that stand out' },
          { src: '/screenshots/neuralvoid/when.webp', caption: 'When you watch: the week, hour by hour' },
          { src: '/screenshots/neuralvoid/plan.webp', caption: 'Your plan: pick one change and see the hours it gives back' },
        ],
      },
      {
        name: 'Getting started',
        screens: [
          { src: '/screenshots/neuralvoid/welcome.webp', caption: 'Welcome: what you get, and how to find the file' },
          { src: '/screenshots/neuralvoid/add-file.webp', caption: 'Add your watch history: it confirms what it found before starting' },
          { src: '/screenshots/neuralvoid/reading.webp', caption: 'Reading your history, step by step, in plain words' },
        ],
      },
    ],
    synopsis:
      'Full-stack digital wellness analytics platform that detects compulsive app usage and generates structured diagnostic reports with 96% accuracy.',
    overview:
      'NeuralVoid provides clinicians and end users with objective behavioral analytics. It transforms raw app interaction logs into session velocity, streak entropy, and binge probability metrics via a 25-feature machine learning ensemble (~96% accuracy), visualized through a responsive React dashboard.',
    problem:
      'Digital habits, screen fatigue, and compulsive app usage lack quantitative objective metrics, leaving clinicians to rely on inaccurate subjective self-reporting.',
    solution:
      'Engineered an end-to-end behavioral analytics web app that processes user session data, calculates 25 quantitative engagement features, and outputs automated clinical narrative summaries.',
    businessOutcomes: [
      '96% classification accuracy identifying compulsive behavioral patterns',
      'Automated narrative report generation saving clinicians hours of manual analysis',
      'Real-time interactive dashboard visualizing session velocity and heatmaps',
      'Production-ready API gateway ready to integrate with existing healthcare software',
    ],
    architectureNodes: [
      { name: 'Event Ingestion', desc: 'Raw session timestamp and interaction stream' },
      { name: 'Feature Pipeline', desc: '25 engineered behavioral features (velocity, streak, entropy)' },
      { name: 'ML Classifier', desc: 'Soft-voting ensemble: XGBoost, Random Forest, Logistic Regression (~96% accuracy)' },
      { name: 'FastAPI Gateway', desc: 'Async endpoints with clinical narrative generator' },
      { name: 'React SPA', desc: 'Hosted on Vercel with Railway API gateway' },
    ],
    impactMetrics: [
      { value: '96%', label: 'Classification Accuracy' },
      { value: '25', label: 'Behavioral Metrics Tracked' },
      { value: 'FastAPI', label: 'High-Speed API Gateway' },
      { value: 'React SPA', label: 'Responsive Web Platform' },
    ],
    bullets: [
      'Engineered a 25-feature machine learning pipeline calculating session velocity, streak metrics, and binge probability feeding an ensemble model with ~96% classification accuracy.',
      'Integrated automated clinical report synthesis served through a high-throughput FastAPI backend.',
      'Built a responsive web application deployed on Vercel with a Railway API gateway.',
    ],
    tags: ['React', 'Node.js', 'FastAPI', 'scikit-learn', 'XGBoost', 'Railway', 'Vercel'],
    process: [
      {
        decision: 'Why a soft-voting ensemble (XGBoost + Random Forest + Logistic Regression) instead of a single model?',
        reasoning:
          "Each of these tends to make different kinds of mistakes: XGBoost can overfit to noise, a single Random Forest can be unstable on a smaller dataset, and logistic regression is too simple on its own for behavior that isn't linearly separable. Averaging their votes smooths out any one model's blind spots, which mattered more here than squeezing out marginal accuracy from one more complex model on a dataset this size.",
      },
      {
        decision: 'Why 25 hand-engineered features instead of feeding raw session logs into a deep learning model?',
        reasoning:
          "The dataset wasn't large enough to train a deep model without overfitting, and just as importantly, the output needed to make sense to a clinician reading the report, \"late-night usage ratio\" and \"rapid app-switch rate\" are things a person can reason about and question, a learned embedding isn't. Hand-engineered features traded away some theoretical ceiling on accuracy for something interpretable enough to actually be useful in a clinical narrative.",
      },
    ],
    parts: [
      { title: '25-feature pipeline', text: 'Session velocity, streak entropy, late-night ratio, rapid app-switch rate and more, all explainable to a clinician.' },
      { title: 'Ensemble classifier', text: 'Soft-voting XGBoost, Random Forest and Logistic Regression at about 96% accuracy.' },
      { title: 'Clinical narrative', text: 'An automatically generated diagnostic report served by an async FastAPI backend.' },
      { title: 'Deployed', text: 'A React app on Vercel talking to a Railway API gateway.' },
    ],
    githubUrl: 'https://github.com/LouSens/neural-void.git',
    liveUrl: 'https://neural-void.davidk-academic.workers.dev',
  },
  {
    id: 'legal-rag',
    title: 'Indonesian Legal RAG',
    slug: 'legal-rag',
    type: 'Hybrid Search & Retrieval System',
    category: 'Hybrid Document Search & Retrieval',
    role: 'ML & Search Engineer',
    team: 'Solo build',
    isTeam: false,
    year: '2026',
    badge: 'BENCHMARK BUILD',
    highlight: 'Solo build, model published on Hugging Face',
    posterAccent: 'from-white/[0.08] to-black/30',
    hasRealUI: true,
    concept: true,
    coverImage: '/screenshots/concepts/legal-rag-poster.webp',
    coverPosition: 'top',
    heroImage: '/screenshots/concepts/legal-rag-search.webp',
    screenCategories: [
      {
        name: 'Concept',
        screens: [
          { src: '/screenshots/concepts/legal-rag-search.webp', caption: 'Hybrid search: keyword and vector scores side by side, then reranked' },
          { src: '/screenshots/concepts/legal-rag-answer.webp', caption: 'Cited answer: tied to exact articles, with the confidence gate visible' },
        ],
      },
    ],
    synopsis:
      'High-precision legal search engine providing verifiable Indonesian labor law citations with zero hallucinations and exact statutory references.',
    overview:
      'Built for legal and HR departments requiring 100% verifiable citations without hallucinations. Combines parent-child document chunking, hybrid search (keyword BM25 + dense vector FAISS), and cross-encoder neural reranking to deliver exact statutory article references.',
    problem:
      'Generic AI models and search engines frequently hallucinate legal clauses and penalty amounts, exposing enterprises to severe regulatory and compliance penalties.',
    solution:
      'Engineered a Parent-Child Hybrid RAG pipeline combining keyword search and semantic vector retrieval with cross-encoder verification, citing exact statutory articles and falling back to live search if confidence is low.',
    businessOutcomes: [
      'Zero hallucination risk with strict statutory article citations and confidence gates',
      '0.92+ reranked retrieval accuracy outperforming standard search engines',
      'Sub-second query responses across hundreds of complex statutory regulations',
      'Open-weights model published for reproducible enterprise legal research',
    ],
    architectureNodes: [
      { name: 'Legal Query', desc: 'Input with HyDE hypothetical statutory excerpt generation' },
      { name: 'Dual Retriever', desc: 'Parent-Child BM25 (0.4) + FAISS dense vectors (0.6)' },
      { name: 'Reranker Gate', desc: 'Cross-Encoder reranker with 0.3 confidence threshold' },
      { name: 'Synthesis Layer', desc: 'Verifiable statutory citation generator with exact article references' },
    ],
    impactMetrics: [
      { value: '0.92+', label: 'Retrieval Precision Score' },
      { value: 'Hybrid', label: 'BM25 + FAISS Vector Fusion' },
      { value: 'Parent-Child', label: 'Context Chunking' },
    ],
    bullets: [
      'Built a Parent-Child Hybrid Ensemble RAG pipeline combining sparse BM25 (0.4) and dense FAISS vector search (0.6) with HyDE hypothesis generation and Cross-Encoder reranking.',
      'Fine-tuned model weights on domain dataset with W&B experiment tracking across multiple hyperparameter sweeps.',
      'Published open-weights model to Hugging Face Hub; added DuckDuckGo live web search fallback when reranker confidence drops below 0.3 threshold.',
    ],
    tags: ['LangChain', 'FAISS', 'BM25', 'FastAPI', 'Python', 'Weights & Biases'],
    parts: [
      { title: 'Hybrid retrieval', text: 'Parent-child chunks searched with BM25 (0.4) and FAISS dense vectors (0.6), with HyDE query expansion.' },
      { title: 'Reranking and gate', text: 'A cross-encoder reranks candidates. Below a 0.3 confidence threshold it falls back to live web search.' },
      { title: 'Fine-tuning', text: 'Llama-3-8B fine-tuned on a domain dataset with Weights & Biases tracking, published to Hugging Face.' },
    ],
    colabUrls: [
      { label: 'RAG Notebook', url: 'https://colab.research.google.com/drive/1wzslBMXBo9QL4-ToEDmWl3amLrcVWpRP?usp=sharing' },
      { label: 'Fine-Tuning Notebook', url: 'https://colab.research.google.com/drive/1xwqQl8i3gc5g4ZgAf-uv6q94mst3U6uK?usp=sharing' },
    ],
    hfUrl: 'https://huggingface.co/HuangYiYang/Llama-3-8B-Indonesian-Legal',
    wandbUrl: 'https://wandb.ai/kyzo/legal-llm-finetune',
    liveUrl: null,
  },
  {
    id: 'dpickleball',
    title: 'dPickleBall Agent',
    slug: 'dpickleball',
    type: 'Reinforcement Learning Agent',
    category: 'Self-Play RL for a Pickleball Game',
    role: 'Led development',
    team: 'Team of three',
    isTeam: true,
    year: 'Oct 2025',
    badge: 'RL BUILD',
    highlight: '3rd place, AI category, XMUM AI Competition',
    posterAccent: 'from-white/[0.08] to-black/30',
    hasRealUI: true,
    coverImage: '/screenshots/dpickleball/cover.webp',
    coverPosition: 'center',
    heroImage: '/screenshots/dpickleball/cover.webp',
    synopsis: 'An agent that learns to play pickleball from pixels, using one policy for both sides of the court.',
    overview:
      'The agent sees the game as a small grayscale image, remembers the last few moments with an LSTM, and trains by playing against older copies of itself.',
    problem: 'Training one agent for the left side and another for the right doubles the work, and agents that only practise against one opponent get stuck.',
    solution: 'Flip the right-hand view so both sides look the same, train a single policy, and pick opponents from a growing league of past versions.',
    businessOutcomes: [
      '3rd place in the AI category of the tournament',
      'One policy plays both sides, so training cost is not doubled',
      'Trained weights published to the Hugging Face Hub',
    ],
    architectureNodes: [
      { name: 'Unity game', desc: 'The pickleball environment, built with Unity ML-Agents' },
      { name: 'Mirror view', desc: 'Right-side frames are flipped and actions swapped so both sides look alike' },
      { name: 'CNN + LSTM policy', desc: 'Three conv layers and a 256-unit LSTM read the ball and opponent from pixels' },
      { name: 'PPO training', desc: 'RecurrentPPO from Stable-Baselines3 with a 1024-step horizon' },
      { name: 'League self-play', desc: 'Opponents are sampled from past versions of the agent' },
      { name: 'Deploy', desc: 'Weights pushed to the Hugging Face Hub' },
    ],
    impactMetrics: [
      { value: '3rd', label: 'Place, AI category' },
      { value: '1', label: 'Policy for both sides' },
      { value: '256', label: 'LSTM memory units' },
      { value: '84 x 168', label: 'Grayscale input, 4 frames stacked' },
    ],
    parts: [
      { title: 'Mirror trick', text: 'Flip the right-hand view and swap left and right actions, so one network learns both sides.' },
      { title: 'Memory', text: 'An LSTM tracks where the ball is heading across a 1024-step window.' },
      { title: 'League self-play', text: 'The agent keeps playing older versions of itself so it does not overfit to one opponent.' },
      { title: 'Settings', text: 'Discount 0.995, learning rate 0.0001, batch size 256, 10 epochs per rollout.' },
    ],
    tags: ['Python', 'PyTorch', 'Stable-Baselines3', 'Unity ML-Agents', 'Hugging Face'],
    githubUrl: 'https://github.com/LouSens/Recurrent-PPO-dPickleBall',
    liveUrl: null,
  },
  {
    id: 'gold-forecast',
    title: 'Gold Price Forecast',
    slug: 'gold-forecast',
    type: 'Time-Series Research',
    category: 'ARIMA vs XGBoost vs LSTM',
    role: 'ML engineer',
    team: 'Solo build',
    isTeam: false,
    year: '2026',
    badge: 'RESEARCH BUILD',
    highlight: 'Solo build, tested with a significance test',
    posterAccent: 'from-white/[0.08] to-black/30',
    hasRealUI: true,
    coverImage: '/screenshots/gold/cover.webp',
    coverPosition: 'center',
    heroImage: '/screenshots/gold/cover.webp',
    screenCategories: [
      {
        name: 'Results',
        screens: [
          { src: '/screenshots/gold/cover.webp', caption: 'Predictions against the real price on the held-out test period' },
          { src: '/screenshots/gold/metrics.webp', caption: 'Four models side by side on the same test days' },
          { src: '/screenshots/gold/price.webp', caption: 'Gold price history used for training and testing' },
          { src: '/screenshots/gold/features.webp', caption: 'What the XGBoost model paid attention to' },
        ],
      },
    ],
    synopsis: 'Do fancy models predict tomorrow’s gold price better than a simple guess? I tested it, and the answer was no.',
    overview:
      'Four models forecast the next trading day’s gold price on the same unseen period: a naive guess, ARIMA, XGBoost and an LSTM. A statistical test checks whether any of them really beats the naive guess.',
    problem: 'Papers disagree on whether deep learning beats simple methods on financial prices.',
    solution: 'Compare all four models fairly, on the same chronological split, and test the gaps for significance.',
    businessOutcomes: [
      'No model beat the naive guess with statistical significance (all p-values above 0.05)',
      'The simple guess is as accurate as the alternatives at almost zero cost',
      'Full pipeline, unit tests and a report, all reproducible',
    ],
    architectureNodes: [
      { name: 'Download', desc: 'Daily gold futures prices from Yahoo Finance' },
      { name: 'Split', desc: 'Time-ordered 80% train, 10% validation, 10% test' },
      { name: 'Explore', desc: 'Returns, volatility, seasonality and autocorrelation' },
      { name: 'Train', desc: 'Naive, ARIMA, XGBoost and LSTM (PyTorch)' },
      { name: 'Evaluate', desc: 'RMSE, MAE, MAPE, direction accuracy and the Diebold-Mariano test' },
      { name: 'Choose', desc: 'Pick on validation, report once on test' },
    ],
    impactMetrics: [
      { value: '284', label: 'Test forecasts' },
      { value: '4', label: 'Models compared' },
      { value: '75.6', label: 'Best test RMSE (USD)' },
      { value: 'p > 0.05', label: 'No significant winner' },
    ],
    parts: [
      { title: 'Fair comparison', text: 'All models predict the same days, and the model is chosen on validation data only.' },
      { title: 'Honest result', text: 'The LSTM only learned the average upward drift. It called every test day "up".' },
      { title: 'Reproducible', text: 'A tested Python package, a notebook, an English guide and a report in Indonesian.' },
    ],
    tags: ['Python', 'PyTorch', 'XGBoost', 'statsmodels', 'scikit-learn', 'pytest'],
    githubUrl: 'https://github.com/LouSens/gold-price-forecast-arima-lstm',
    liveUrl: null,
  },
  {
    id: 'movie-recommender',
    title: 'Movie Recommender',
    slug: 'movie-recommender',
    type: 'Recommendation System',
    category: 'Content-Based and Collaborative Filtering',
    role: 'ML engineer',
    team: 'Solo build',
    isTeam: false,
    year: '2026',
    badge: 'ML BUILD',
    highlight: 'Solo build, 36 tests passing',
    posterAccent: 'from-white/[0.08] to-black/30',
    hasRealUI: true,
    coverImage: '/screenshots/movie/cover.webp',
    coverPosition: 'center',
    heroImage: '/screenshots/movie/cover.webp',
    screenCategories: [
      {
        name: 'Results',
        screens: [
          { src: '/screenshots/movie/cover.webp', caption: 'Ranking quality of every model on the same test users' },
          { src: '/screenshots/movie/learning.webp', caption: 'The neural model learning over training rounds' },
          { src: '/screenshots/movie/similarity.webp', caption: 'How similar movies are to each other by genre and tags' },
          { src: '/screenshots/movie/longtail.webp', caption: 'A few movies get most ratings: the long tail' },
        ],
      },
    ],
    synopsis: 'Three ways to suggest movies, compared fairly on the same held-out ratings.',
    overview:
      'A recommender built on MovieLens. A content model suggests similar movies, SVD predicts ratings, and a neural model (NeuMF) ranks the top picks per user.',
    problem: 'Low rating error does not mean good recommendations, and many projects compare models on different data.',
    solution: 'Evaluate every model on the same users, the same candidate movies and the same top-10 metrics, with a popularity baseline.',
    businessOutcomes: [
      'The neural model beat the popularity baseline by 31.5% on NDCG@10 and 58.2% on Recall@10',
      'SVD had the lowest rating error: 0.841 against 1.028 for a plain average',
      'The content model gave the most varied picks and handles brand-new movies',
    ],
    architectureNodes: [
      { name: 'Download', desc: 'MovieLens ratings, tags and genres' },
      { name: 'Clean and explore', desc: '13 charts: ratings, genres, sparsity, long tail' },
      { name: 'Features', desc: 'TF-IDF over genres and tags for the content model' },
      { name: 'Train', desc: 'Content model, SVD with grid search, and NeuMF in PyTorch' },
      { name: 'Evaluate', desc: 'Top-10 precision, recall, NDCG and coverage, plus RMSE' },
      { name: 'Run', desc: 'One command: python -m src.pipeline' },
    ],
    impactMetrics: [
      { value: '0.2173', label: 'NDCG@10, neural model' },
      { value: '+31.5%', label: 'Over the popularity baseline' },
      { value: '0.841', label: 'SVD rating error (RMSE)' },
      { value: '602', label: 'Test users' },
    ],
    parts: [
      { title: 'Three models', text: 'Content-based, SVD and NeuMF, each good at something different.' },
      { title: 'Fair test', text: 'Seen movies are hidden and every model ranks the same 3,643 candidates.' },
      { title: 'Clean code', text: '36 passing tests, a command-line pipeline and a notebook.' },
    ],
    tags: ['Python', 'PyTorch', 'scikit-learn', 'Surprise', 'pandas', 'pytest'],
    githubUrl: 'https://github.com/LouSens/movie-recommendation-system-ml',
    liveUrl: null,
  },
];

export const EDUCATION = {
  school: 'Xiamen University Malaysia',
  location: 'Selangor, Malaysia',
  degree: 'BEng (Hons) in Artificial Intelligence',
  gpa: '3.84 / 4.00',
  start: 'Sept 2024',
  expected: 'Sept 2028',
  highlights: [
    "Dean's List Awardee, three consecutive semesters",
    'Top 16% of cohort across College of Artificial Intelligence & Robotics',
  ],
  learning: [
    'Distributed systems & agent consensus',
    'Reinforcement learning & control algorithms',
    'High-throughput vector indexing',
  ],
};


// About section, written to complement the CV, not repeat it
export const ABOUT = {
  heading: "Hi, I'm David.",
  intro: [
    'I study AI at Xiamen University Malaysia. I am from Indonesia.',
    'I build the backend and AI side of products. In team projects I usually end up owning the backend.',
  ],
  facts: [
    { label: 'Based in', value: 'Selangor, Malaysia' },
    { label: 'From', value: 'Indonesia' },
    { label: 'Studying', value: 'BEng (Hons) Artificial Intelligence, 2024 to 2028' },
    { label: 'Looking for', value: 'Internships and remote part-time work' },
  ],
  focus: [
    {
      title: 'Backend and APIs',
      points: ['FastAPI services and typed data contracts', 'PostgreSQL with pgvector', 'CI that runs real integration tests'],
      projects: ['kerjacerdas', 'adept'],
    },
    {
      title: 'AI agents and search',
      points: ['LangGraph agent workflows', 'Hybrid search: BM25, vectors, reranker', 'Keeping LLM calls cheap and checkable'],
      projects: ['orion', 'legal-rag'],
    },
    {
      title: 'Machine learning',
      points: ['Hand-built features when results must be explained', 'Forecasting and recommendation, tested fairly', 'Reinforcement learning agents'],
      projects: ['neuralvoid', 'movie-recommender', 'dpickleball'],
    },
  ],
};

// Awards & academics. The Digdaya feature is photo-led; everything else is a quiet ledger.
const DIGDAYA_DIR = '/media/digdaya/';
export const DIGDAYA = {
  id: 'digdaya',
  title: 'PIDI Digdaya x Hackathon 2026',
  organizer: 'Bank Indonesia',
  date: 'Sep 2026',
  projectId: 'kerjacerdas',
  stats: [
    { prefix: 'Top ', value: 80, suffix: '', label: 'finalist teams' },
    { prefix: 'of ', value: 2000, suffix: '+', label: 'teams that entered' },
    { prefix: 'Tier ', value: 3, suffix: '', label: 'award' },
  ],
  summary:
    'KerjaCerdas was selected as a finalist and received a Tier 3 Award, one of the top 80 teams out of more than 2,000. Before the expo, the finalist programme put us through an online mentoring session and an offtaker session with potential adopters. We then took it to FEKDI x IFSE 2026 at JICC Jakarta (24 to 26 September), where we demoed the platform and heard directly from recruiters, educators and founders about the problem we were trying to solve. Those conversations were worth as much as the award.',
  lead: { src: DIGDAYA_DIR + 'team-booth.webp', w: 1800, h: 1200, caption: 'The KerjaCerdas team at our booth' },
  photos: [
    { src: DIGDAYA_DIR + 'mentor-session.webp', w: 1600, h: 999, caption: 'Mentoring session, online, before the expo' },
    { src: DIGDAYA_DIR + 'offtaker-session.webp', w: 1600, h: 999, caption: 'Offtaker session, online, before the expo' },
    { src: DIGDAYA_DIR + 'fekdi-display.webp', w: 1350, h: 1800, caption: 'KerjaCerdas on the FEKDI x IFSE display' },
    { src: DIGDAYA_DIR + 'expo-hall.webp', w: 1800, h: 1200, caption: 'Digitalent Expo 2026, finalists and attendees' },
    { src: DIGDAYA_DIR + 'demo-tablet.webp', w: 1800, h: 1200, caption: 'Demoing KerjaCerdas on the booth tablet' },
    { src: DIGDAYA_DIR + 'booth-sign.webp', w: 1350, h: 1800, caption: 'The Digdaya x Hackathon booth' },
    { src: DIGDAYA_DIR + 'team-group.webp', w: 1800, h: 1200, caption: 'The team with fellow finalists' },
    { src: DIGDAYA_DIR + 'visitors-talk.webp', w: 1800, h: 1013, caption: 'Talking through the platform with visitors' },
    { src: DIGDAYA_DIR + 'tier-announcement.webp', w: 1013, h: 1800, caption: 'Results announced by tier' },
    { src: DIGDAYA_DIR + 'visitors-booth.webp', w: 1800, h: 1013, caption: 'Visitors at the booth' },
  ],
};

export const DEANS_LIST = [
  { label: 'Sep 2024', src: "/docs/deans-list/2409 Dean's List.jpeg" },
  { label: 'Apr 2025', src: "/docs/deans-list/2504 Dean's List.jpeg" },
  { label: 'Sep 2025', src: "/docs/deans-list/2509 Dean's List.jpeg" },
];

// The full record for the Awards page, newest first. `proofs` open in the lightbox; `feature` points
// at the longer account (with photos) further down the same page.
const CERT = '/media/certificates/';
export const ACHIEVEMENTS = [
  {
    year: '2026',
    date: '2026',
    result: 'Finalist, top 15',
    title: 'SDC XMUM Hackathon 2026',
    organizer: 'Xiamen University Malaysia, Domain 1: The Aiversecity Future-Ready Workforce',
    detail: 'Adept, a career and reskilling guide that matches skills to roles and builds a learning plan. I led team Pecel Lele.',
    projectId: 'adept',
  },
  {
    year: '2026',
    date: 'Sep 2026',
    result: 'Finalist, Tier 3 Award',
    title: 'PIDI Digdaya x Hackathon 2026',
    organizer: 'Bank Indonesia',
    detail: 'Top 80 of more than 2,000 teams with KerjaCerdas. Mentoring and offtaker sessions online, then a booth demo at FEKDI x IFSE 2026 at JICC Jakarta.',
    projectId: 'kerjacerdas',
    feature: 'digdaya',
  },
  {
    year: '2026',
    date: 'Jun 2026',
    result: 'Silver Award',
    title: 'SEA-CICSIC 2026',
    organizer: 'China-ASEAN Innovation Competition, undergraduate division',
    detail: 'Omni-QC, an AI quality-control platform for PCB manufacturing. I led the AI strategy and technical architecture.',
    feature: 'omni-qc',
  },
  {
    year: '2026',
    date: 'Apr 2026',
    result: 'Top 24 of 100+ teams',
    title: 'UMHackathon 2026',
    organizer: 'Universiti Malaya',
    detail: "Built Orion with team One Hit Wonder in the 'AI Systems & Agentic Workflow Automation' domain. The judges called out the multi-agent architecture and the mix of deterministic policy checks with LLM reasoning.",
    projectId: 'orion',
    proofs: [{ label: 'Certificate', src: CERT + 'umhackathon-certificate.webp', caption: 'UMHackathon 2026 certificate of appreciation' }],
  },
  {
    year: '2025',
    date: 'Oct 2025',
    result: '3rd place, AI category',
    title: 'DPickleball AI Tournament',
    organizer: 'Unity ML-Agents',
    detail: 'Led development on a team of three: the Unity physics environment, reward shaping and PPO multi-agent training.',
    feature: 'dpickleball',
  },
  {
    year: '2025',
    date: 'Sep 2024 to Sep 2025',
    result: "Dean's List",
    title: 'Three consecutive semesters',
    organizer: EDUCATION.school,
    detail: 'GPA 3.84 out of 4.00, top 16% of the AI & Robotics cohort.',
    proofs: DEANS_LIST.map((d) => ({ label: d.label, src: d.src, caption: `Dean's List certificate, ${d.label}` })),
  },
  {
    year: '2025',
    date: 'Apr 2025',
    result: 'Top 20% globally',
    title: 'International Quant Championship',
    organizer: 'WorldQuant',
    detail: 'Stage 1 of the global quant competition, finishing in the top 20% of teams worldwide. Also reached Bronze level in the WorldQuant Challenge.',
    proofs: [
      { label: 'Stage 1 certificate', src: CERT + 'iqc-stage1.webp', caption: 'WorldQuant IQC 2025, Stage 1: top 20% of teams globally' },
      { label: 'Bronze certificate', src: CERT + 'iqc-bronze.webp', caption: 'WorldQuant Challenge, Bronze level' },
    ],
  },
  {
    year: '2023',
    date: 'Mar 2023',
    result: 'Gold medal, Physics',
    title: 'ONSK 2023',
    organizer: 'Olimpiade Nasional Sains dan Kedokteran · Braindicator',
    detail: 'Gold medal in the physics category of the National Science and Medicine Olympiad, a national-level competition for high school students.',
    proofs: [
      { label: 'Result', src: CERT + 'onsk-gold.webp', caption: 'ONSK 2023 Physics result: gold medal' },
      { label: 'Certificate', src: CERT + 'onsk-certificate.webp', caption: 'ONSK 2023 certificate' },
    ],
  },
  {
    year: '2023',
    date: '2023',
    result: 'Top 13, Physics',
    title: 'OSN, provincial round',
    organizer: 'Olimpiade Sains Nasional',
    detail: "Ranked 13th in physics at the provincial round of Indonesia's national science olympiad.",
  },
];

const OMNI = '/media/omni-qc/';
const DP = '/media/dpickleball-web/';

export const OMNIQC = {
  id: 'omni-qc',
  date: 'Jun 2026',
  organizer: 'SEA-CICSIC 2026 · China-ASEAN Innovation Competition',
  title: 'Omni-QC',
  stats: [
    { text: 'Silver', label: 'award, undergraduate division' },
    { value: 50, suffix: '', label: 'slides in the pitch deck' },
    { value: 155, suffix: '', label: 'pages in the business proposal' },
  ],
  summary:
    'Omni-QC is an AI quality-control platform for PCB manufacturing. It predicts defects before inspection, explains each prediction, and recommends what to do through a co-pilot. I led the AI strategy and the technical architecture for our proposal, and we took the Silver Award in the undergraduate division.',
  links: [
    { label: 'Pitch deck (PDF)', href: '/docs/omni-qc/Omni-QC Pitch Deck.pdf' },
    { label: 'Business proposal (PDF)', href: '/docs/omni-qc/Omni-QC Business Proposal.pdf' },
  ],
  lead: { src: OMNI + 'dashboard.webp', w: 1600, h: 900, caption: 'Production stream dashboard from the pitch deck' },
  photos: [
    { src: OMNI + 'title.webp', w: 1600, h: 900, caption: 'The pitch deck: AI-driven dynamic defect prediction' },
    { src: OMNI + 'problem.webp', w: 1600, h: 900, caption: 'The problem: where inspection wastes time and money' },
    { src: OMNI + 'copilot.webp', w: 1600, h: 900, caption: 'Co-pilot advisory with a human in the loop' },
    { src: OMNI + 'explainable-ai.webp', w: 1600, h: 900, caption: 'Explainable AI: why a board was flagged' },
    { src: OMNI + 'ai-core.webp', w: 1600, h: 900, caption: 'The predictive mechanism behind the score' },
    { src: OMNI + 'integration.webp', w: 1600, h: 900, caption: 'Integration topology with the manufacturing line' },
    { src: OMNI + 'team.webp', w: 1600, h: 900, caption: 'The team' },
  ],
};

export const DPICKLEBALL = {
  id: 'dpickleball',
  date: 'Oct 2025',
  organizer: 'DPickleball AI Tournament · Unity ML-Agents',
  title: 'Teaching an agent to play pickleball',
  stats: [
    { text: '3rd', label: 'place, AI category' },
    { value: 3, suffix: '', label: 'person team, I led development' },
    { text: 'PPO', label: 'multi-agent training' },
  ],
  summary:
    'Reinforcement learning for a competition: I led development on a team of three. I built the Unity 3D physics environment, the reward shaping and the PPO multi-agent training loops, and our agent finished third overall.',
  links: [],
  lead: { src: DP + 'trophy.webp', w: 1800, h: 1199, caption: 'Third place, AI category' },
  photos: [
    { type: 'video', src: DP + 'match.mp4', poster: DP + 'match-poster.webp', w: 464, h: 832, caption: 'The agents playing on the tournament projector' },
    { src: DP + 'group.webp', w: 1800, h: 1199, caption: 'All the teams after the tournament' },
  ],
};

export const AWARD_FEATURES = [DIGDAYA, OMNIQC, DPICKLEBALL];


export { TECH_STACK } from './techStack';

/* Smaller and earlier repositories: listed, not written up. */
export const EARLIER_WORK = [
  { title: 'Face Mask Detection', line: 'Real-time webcam detection with a MobileNetV2 model.', tags: ['TensorFlow', 'OpenCV'], url: 'https://github.com/LouSens/Face-Mask-Detection' },
  { title: 'Heart Disease Prediction', line: 'Random Forest classifier with tuning, 99% test accuracy reported.', tags: ['scikit-learn', 'pandas'], url: 'https://github.com/LouSens/Heart-Disease-Prediction' },
  { title: 'Handwritten Digit Recognition', line: 'CNN trained on MNIST, with a window where you draw a digit.', tags: ['TensorFlow', 'Tkinter'], url: 'https://github.com/LouSens/Handwritten-Digit-Recognition' },
  { title: 'Financial News Corpus', line: 'Scraped finance news, cleaned and prepared for sentiment analysis.', tags: ['Python', 'NLTK'], url: 'https://github.com/LouSens/nlp-corpus' },
  { title: 'Hospital Management System', line: 'Console app with doctors, patients, billing and saved records.', tags: ['C++17', 'OOP'], url: 'https://github.com/LouSens/Hospital-Management-System' },
  { title: 'Hotel Management System', line: 'Admin, employee and customer roles with file-based storage.', tags: ['C'], url: 'https://github.com/LouSens/Hotel-Management-System-using-C-Programming' },
];

/* ═══════════════════════════════════════
   NUMBERS: figures that already appear, with their sources, on this site.
   Live GitHub figures are fetched in the browser (see utils/github.js).
   ═══════════════════════════════════════ */
export const KEY_NUMBERS = [
  { value: 3.84, decimals: 2, label: 'GPA out of 4.00', note: "Dean's List, three semesters" },
  { value: 16, prefix: 'Top ', suffix: '%', label: 'of my cohort', note: 'AI and Robotics, Xiamen University Malaysia' },
  { value: 80, prefix: 'Top ', label: 'of 2,000+ teams', note: 'PIDI Digdaya x Hackathon 2026' },
  { value: ACHIEVEMENTS.length, label: 'Awards and results', note: 'Hackathons, competitions, olympiads' },
  { value: PROJECTS_DATA.length, label: 'Projects built', note: 'Web apps, AI agents and ML work' },
  { value: new Set(TECH_STACK.flatMap((g) => g.items.map((i) => i.name))).size, label: 'Tools used', note: 'Across all my GitHub repositories' },
];

export const GITHUB_USER = 'LouSens';
