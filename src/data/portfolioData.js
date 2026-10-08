// Portfolio data store: full-stack and AI systems focus

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
      'A read-only analyst for a portfolio of Bitcoin, gold and US stocks: what moved, how much it could move, and what your own plan says to do next. It never places a trade.',
    overview:
      'RADAR reads a Binance account, explains what each holding is doing, measures how much it could move, and turns a plan of target shares into a short list of what to do with spare cash. Every claim on a screen carries its sample size and period, every model is checked on days it had not seen, and the things that were tested and did not work are written down instead of shipped. The screens here show a made-up example portfolio.',
    problem:
      'When a holding falls, the questions come at once: why, is this price high or low, how far could it go, how risky is my mix, what do I buy. Most tools answer with a chart and an opinion, and no way to check either.',
    solution:
      'One app that answers each question from stored data with its evidence shown, never trades, and only offers a suggestion from a rule that passed a test written down beforehand.',
    businessOutcomes: [
      'Read-only by construction: a test fixes the list of endpoints the app may call, and none can place an order',
      'The size of the next move is forecast better than every rival tried, in 6 of 6 comparisons',
      '35 of 36 loss limits held as often as they claimed, after allowing for testing many at once',
      'Nothing tested could call direction, so no "buy now" or "sell now" is built',
    ],
    architectureNodes: [
      { name: 'Sources', desc: 'Alpaca market data and news, the Binance account and public prices. Every connection is a read.' },
      { name: 'Worker', desc: 'Hourly sync, data-quality checks, then each model in order (APScheduler)' },
      { name: 'PostgreSQL + TimescaleDB', desc: 'Raw bars and news are append-only; models write to their own tables' },
      { name: 'FastAPI', desc: 'REST endpoints over stored results, and a WebSocket for live prices' },
      { name: 'React app', desc: 'TanStack Query, with API types generated from the backend\u2019s OpenAPI schema' },
    ],
    impactMetrics: [
      { value: '0', label: 'Trades It Can Place' },
      { value: '6 of 6', label: 'Wins Forecasting Move Size' },
      { value: '35 of 36', label: 'Loss Limits That Held' },
      { value: '61% vs 52%', label: 'Fine-Tuned Tone Model vs General' },
    ],
    bullets: [
      'Built a read-only portfolio analyst (FastAPI, PostgreSQL with TimescaleDB, React 19 and TypeScript) that reads a Binance account and never places a trade, enforced by a test on the endpoints it may call.',
      'Modelled each market four ways, all checked walk-forward on unseen days: a hidden Markov model for its state, a 10,000-path simulation for the range ahead, a HAR regression for the size of a day\u2019s movement, and loss limits with coverage tests.',
      'Wrote every research question and its pass mark down before running it; direction forecasts, news-driven forecasts and dip-buying all failed and were left out of the product.',
      'Fine-tuned FinBERT on 1,800 labelled headlines, reaching 61% against 52% on 700 unseen headlines, and showed the measured accuracy beside every score.',
      'Directed and built a 32-second film for the app in Remotion with a 3D coin, mark and phone and the app\u2019s own interface in motion.',
    ],
    tags: ['FastAPI', 'PostgreSQL', 'TimescaleDB', 'React 19', 'TypeScript', 'PyTorch', 'scikit-learn', 'Docker', 'Remotion'],
    process: [
      {
        decision: 'Why does the app refuse to say "buy now"?',
        reasoning:
          'Because nothing I tested could call direction. RSI, moving averages, support and resistance, funding rates, trees, logistic regression and an LSTM were each given a pass mark before the test, and each was first shown to find a pattern I had planted so that its "no" could be believed. None passed. What did hold up was the size of the next move, so that is what the app forecasts.',
      },
      {
        decision: 'Why write the pass mark down before running each test?',
        reasoning:
          'With enough indicators and enough settings, something always looks good on past data. Fixing the question and the bar first, and never rerunning a failed test with changed settings, is the only way a result on market data means anything.',
      },
      {
        decision: 'Why filtered probabilities and walk-forward checks everywhere?',
        reasoning:
          'A value shown for a day may only use data up to that day. A smoothed market state looks cleaner but uses the future, and a shuffled train and test split leaks tomorrow into yesterday. Every model here is refit on the past and judged on the days after it, and each has a test that proves it does not look ahead.',
      },
      {
        decision: 'Why is the film built from the app\u2019s own interface instead of screen recordings?',
        reasoning:
          'The running app shows a real account on every page, so it could not be filmed. The film\u2019s data elements are the app\u2019s components rebuilt for motion and fed from recorded market data and an example portfolio worked out by the app\u2019s own code.',
      },
    ],
    parts: [
      { title: 'Account and plan', text: 'Holdings read from Binance, a plan of target shares, and spare cash turned into a ladder of prices worked out from the price now.' },
      { title: 'Four models per market', text: 'State (hidden Markov model), range ahead (Monte Carlo), size of movement (HAR regression) and loss limits, each checked on unseen days.' },
      { title: 'Research, written down', text: 'Decisions and pass marks recorded before each test; what failed is documented and left out.' },
      { title: 'News with measured accuracy', text: 'Tone from a fine-tuned FinBERT, shown with how often it is right. It drives no forecast and no alert.' },
      { title: 'The film', text: 'A 32-second Remotion film with generated sound: a 3D coin that becomes the logo, then each answer turning into the next.' },
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
    "I'm an AI undergraduate at Xiamen University Malaysia, originally from Indonesia. I build the backend and AI side of products: APIs, retrieval and ranking, agent workflows, and the CI that keeps them honest.",
    "Most of my work started in a team or a hackathon, and I usually end up owning the backend. If you found me through my CV, the Projects section has what a one-page résumé can't fit: the problem, the architecture, and the decisions I'd defend or change.",
  ],
  facts: [
    { label: 'Based in', value: 'Selangor, Malaysia' },
    { label: 'From', value: 'Indonesia' },
    { label: 'Studying', value: 'BEng (Hons) Artificial Intelligence, 2024 to 2028' },
    { label: 'Looking for', value: 'Internships, and remote part-time work' },
  ],
  focus: [
    {
      title: 'Backend & APIs',
      body: 'FastAPI services, PostgreSQL with pgvector, typed contracts in Pydantic, and CI/CD pipelines that run real integration tests.',
      projects: ['kerjacerdas', 'orion'],
    },
    {
      title: 'AI agents & retrieval',
      body: 'LangGraph workflows, hybrid search that combines BM25, dense vectors and a cross-encoder reranker, and keeping LLM calls cheap and checkable.',
      projects: ['orion', 'legal-rag'],
    },
    {
      title: 'Applied ML & RL',
      body: 'Hand-built feature pipelines and ensembles when the result has to be explained, and PPO agents in Unity ML-Agents for competition.',
      projects: ['neuralvoid'],
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
