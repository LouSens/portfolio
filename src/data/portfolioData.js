// Portfolio Data Store — Full-Stack & AI Systems Focus

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
  status: 'Available for Full-Stack & AI Systems Roles',
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

export const SERVICES = [
  {
    id: 'fullstack-web',
    number: '01',
    title: 'Full-Stack Web Applications & Portals',
    tagline: 'Modern Web Apps, Client Dashboards & SaaS Platforms',
    icon: 'Globe',
    problem:
      'Businesses lose potential customers and slow down daily operations when relying on outdated, slow websites or fragmented spreadsheets.',
    solution:
      'I engineer complete, production-ready web applications with modern user interfaces, client portals, and lightning-fast loading speeds on all devices.',
    businessImpact: [
      'Sub-second page load times for higher conversion and retention',
      'Intuitive client dashboards reducing user confusion and support tickets',
      'Secure user login and permission controls out of the box',
      'Fully responsive layouts optimized for mobile, tablet, and desktop',
    ],
    technicalHighlights: [
      'React 19 & Tailwind CSS single-page applications with smooth 60fps micro-interactions',
      'Predictable client state synchronization with Zustand store persistence',
      'FastAPI asynchronous REST endpoints with strict Pydantic v2 validation contracts',
      'Containerized deployment via Docker, GitHub Actions CI/CD, and Vercel',
    ],
    featuredProject: 'KerjaCerdas',
    appliedProjects: ['KerjaCerdas', 'Personal Portfolio', 'NeuralVoid'],
  },
  {
    id: 'backend-apis',
    number: '02',
    title: 'Scalable Backends & Data Infrastructure',
    tagline: 'High-Speed APIs, Secure Databases & Cloud Reliability',
    icon: 'Layers',
    problem:
      'System slowdowns, database bottlenecks, and data security risks cause lost revenue and frustrate paying customers during high traffic.',
    solution:
      'I build scalable cloud backends and high-speed databases designed to handle high concurrency, protect client data, and process complex operations in milliseconds.',
    businessImpact: [
      '99.9% uptime architecture ready for traffic spikes without crashing',
      'Built-in rate limiting defense protecting against spam and abuse',
      'Sub-second database queries and instant data retrieval for end users',
      'Automated background processing so users never wait on heavy calculations',
    ],
    technicalHighlights: [
      'FastAPI async REST microservices with automated OpenAPI 3.1 specifications',
      'PostgreSQL relational data modeling with pgvector HNSW similarity indexing',
      'Redis in-memory caching & sliding-window rate limiting middleware',
      'Asynchronous task worker pipelines for heavy PDF and document ingestion',
    ],
    featuredProject: 'Orion',
    appliedProjects: ['KerjaCerdas', 'Orion', 'Startup EMP'],
  },
  {
    id: 'ai-workflows',
    number: '03',
    title: 'Autonomous AI Agents & Workflow Automation',
    tagline: 'Multi-Step AI Workflows, Document Processing & Operations',
    icon: 'Bot',
    problem:
      'Teams waste hundreds of hours each month on repetitive manual tasks—reading PDFs, triaging applications, and cross-checking policy compliance.',
    solution:
      'I develop autonomous AI agent networks that execute complex multi-step workflows from start to finish, while keeping human administrators in control for final approvals.',
    businessImpact: [
      'Over 40% reduction in compute and operational processing costs',
      '10x faster document triage and applicant screening with zero fatigue',
      'Human-in-the-loop approval checkpoints ensuring zero rogue actions',
      'Consistent, audit-ready structured outputs without manual data entry',
    ],
    technicalHighlights: [
      'LangGraph cyclical state graphs & supervisor-worker task delegation swarms',
      'Human-in-the-loop approval checkpoints for critical operations and mutations',
      'Pydantic v2 runtime output schema coercion with automated retry heuristics',
      'LangSmith end-to-end tracing, evaluation, and latency monitoring',
    ],
    featuredProject: 'Startup EMP',
    appliedProjects: ['Startup EMP', 'KerjaCerdas', 'Orion'],
  },
  {
    id: 'rag-ml',
    number: '04',
    title: 'Intelligent Enterprise Search & Predictive Analytics',
    tagline: 'Hallucination-Free Document Search & Machine Learning Models',
    icon: 'Brain',
    problem:
      'Critical corporate knowledge, contracts, and legal regulations are buried across documents, causing costly compliance mistakes and AI hallucinations.',
    solution:
      'I implement high-accuracy hybrid search engines that pinpoint exact answers with direct source citations, alongside predictive analytics models that uncover hidden operational insights.',
    businessImpact: [
      'Verifiable source citations that eliminate AI hallucinations in compliance',
      'Instant search across thousands of pages of company knowledge and policies',
      '96%+ accuracy predictive analytics models to anticipate user behavior',
      'Automated executive reports generated in seconds instead of hours',
    ],
    technicalHighlights: [
      'Parent-child document chunking with reciprocal rank fusion (RRF)',
      'Dense (pgvector/FAISS) + sparse (BM25) hybrid retrieval pipelines',
      'Cross-encoder neural rerankers with dynamic confidence scoring thresholds',
      'Machine learning classification pipelines with scikit-learn and XGBoost',
    ],
    featuredProject: 'Indonesian Legal RAG',
    appliedProjects: ['Indonesian Legal RAG', 'NeuralVoid', 'KerjaCerdas'],
  },
];

export const HOW_WE_WORK = [
  {
    step: '01',
    title: 'Discovery & Architecture',
    desc: 'Clarifying your core business objectives, user flows, and technical requirements into an actionable solution blueprint.',
  },
  {
    step: '02',
    title: 'Interactive Working Prototype',
    desc: 'Delivering a functional, interactive build early so you can test features, validate user experience, and give real feedback.',
  },
  {
    step: '03',
    title: 'Hardening & Quality Assurance',
    desc: 'Enforcing strict data security, database indexing, automated unit tests, and performance optimization for heavy loads.',
  },
  {
    step: '04',
    title: 'Production Launch & Handover',
    desc: 'Containerized cloud deployment with automated CI/CD pipelines, complete documentation, and seamless handover.',
  },
];

// Main Web & Software Projects
export const PROJECTS_DATA = [
  {
    id: 'kerjacerdas',
    title: 'KerjaCerdas',
    slug: 'kerjacerdas',
    type: 'Full-Stack & AI Matching Platform',
    category: 'Enterprise Talent AI & Multi-Agent Platform',
    role: 'Lead Systems Engineer',
    team: '4-person team',
    isTeam: true,
    year: '2026',
    badge: 'FEATURED BUILD',
    themeColor: '#FF5A36',
    posterAccent: 'from-orange-600/30 to-amber-900/10',
    hasRealUI: true,
    coverImage: '/screenshots/kerjacerdas/01_landing_hero.png',
    synopsis:
      'Enterprise talent matching platform combining a modern web portal, automated candidate screening, and 5-signal AI matching that cuts hiring overhead.',
    overview:
      'KerjaCerdas solves the high friction and overhead of manual hiring by delivering an end-to-end recruitment platform. It combines a responsive candidate portal with an automated AI resume evaluation pipeline and an Employer Kanban dashboard, scoring candidates across skills, experience, salary fit, and location in real time.',
    problem:
      'Recruitment teams spend hundreds of hours manually screening unqualified resumes, while traditional job boards use rigid keyword filters that miss exceptional candidates.',
    solution:
      'Engineered a complete recruitment solution featuring automated multimodal CV parsing, a 5-signal composite matching engine (semantic match, skills, location, salary, experience), and an interactive Employer Kanban dashboard with candidate verification.',
    businessOutcomes: [
      '10x faster candidate screening by automating resume extraction and ranking',
      'Over 40% reduction in AI compute costs via intelligent token efficiency gates',
      'Sub-second candidate recommendation search across thousands of active job postings',
      'Pay-to-Unlock candidate monetization and E-KYC company verification ready for business',
    ],
    architectureNodes: [
      { name: 'Candidate Portal', desc: 'React 19 + Zustand SPA for job seekers & employer dashboard' },
      { name: 'API Gateway', desc: 'FastAPI with Pydantic v2 validation & rate limiting' },
      { name: 'Supervisor Agent', desc: 'LangGraph orchestrator routing tasks in parallel' },
      { name: 'Worker Swarm', desc: 'SearchJobs, ResumeReview & SkillGap agents' },
      { name: 'Vector DB', desc: 'PostgreSQL + pgvector HNSW indexing (5-signal ranker)' },
      { name: 'Document Ingestion', desc: 'Gemini multimodal PDF parser with Token Gates' },
    ],
    impactMetrics: [
      { value: '5-Signal', label: 'Composite Match Score' },
      { value: '40%+', label: 'Compute Cost Savings' },
      { value: 'Sub-second', label: 'Instant Search Latency' },
      { value: '4-Phase', label: 'Automated CI/CD Quality' },
    ],
    bullets: [
      'Architected a ReAct Multi-Agent Swarm using LangGraph with a Supervisor node routing tasks in parallel to SearchJobs (pgvector), ResumeReview (multimodal PDF), and SkillGap worker agents.',
      'Engineered a 5-signal composite ranking engine combining vector cosine similarity (50%), skill overlap (30%), regional boost (10%), salary fit (5%), and experience fit (5%) with HNSW pgvector indexing.',
      'Built an asynchronous PDF processing pipeline achieving low-latency CV extraction, Token Efficiency Gates to control LLM compute costs, and PII mitigation middleware.',
      'Delivered an Employer Kanban pipeline featuring Pay-to-Unlock candidate monetization, E-KYC credential verification, closed-loop A/B event tracking, and an automated 4-phase CI/CD pipeline.',
    ],
    tags: ['React 19', 'FastAPI', 'PostgreSQL + pgvector', 'LangGraph', 'Zustand', 'Docker Compose'],
    githubUrl: 'https://github.com/LouSens/KerjaCerdas.git',
    liveUrl: 'http://kerja-cerdas.replit.app/',
    codeSnippet: {
      filename: 'backend/services/matching_engine.py',
      language: 'python',
      code: `import numpy as np
from sqlalchemy import text
from typing import List, Dict, Any

async def calculate_5_signal_composite_score(
    db_session,
    candidate_vector: List[float],
    candidate_skills: List[str],
    salary_expectation: float,
    experience_years: int,
    preferred_region: str,
    top_k: int = 20
) -> List[Dict[str, Any]]:
    """
    5-Signal Composite Match:
    1. Vector Cosine Similarity (50%) via pgvector HNSW
    2. Exact & Semantic Skill Overlap (30%)
    3. Regional Location Boost (10%)
    4. Salary Range Compatibility (5%)
    5. Seniority & Experience Alignment (5%)
    """
    query = text("""
        SELECT 
            j.id, j.title, j.company_name, j.skills_required, j.region,
            j.min_salary, j.max_salary, j.min_exp_years,
            1 - (j.embedding <=> :candidate_vector::vector) AS vector_similarity
        FROM job_postings j
        WHERE j.is_active = TRUE
        ORDER BY j.embedding <=> :candidate_vector::vector
        LIMIT :top_k;
    """)
    
    results = await db_session.execute(query, {
        "candidate_vector": str(candidate_vector),
        "top_k": top_k
    })
    
    scored_jobs = []
    for job in results.mappings():
        req_skills = set(job["skills_required"])
        cand_skills = set(candidate_skills)
        skill_score = len(cand_skills & req_skills) / max(len(req_skills), 1)
        
        region_score = 1.0 if job["region"].lower() == preferred_region.lower() else 0.4
        salary_score = 1.0 if job["min_salary"] <= salary_expectation <= job["max_salary"] else 0.5
        exp_score = min(experience_years / max(job["min_exp_years"], 1), 1.0)
        
        composite_score = (
            0.50 * job["vector_similarity"] +
            0.30 * skill_score +
            0.10 * region_score +
            0.05 * salary_score +
            0.05 * exp_score
        )
        
        scored_jobs.append({
            "job_id": job["id"],
            "title": job["title"],
            "composite_score": round(float(composite_score), 4),
            "match_breakdown": {
                "vector_semantic": round(float(job["vector_similarity"]), 3),
                "skill_overlap": round(float(skill_score), 3),
                "region_fit": region_score
            }
        })
        
    return sorted(scored_jobs, key=lambda x: x["composite_score"], reverse=True)`,
    },
    screenCategories: [
      {
        name: 'Candidate Portal',
        screens: [
          { src: '/screenshots/kerjacerdas/01_landing_hero.png', caption: 'Landing Page Hero & Value Proposition' },
          { src: '/screenshots/kerjacerdas/06_seeker_dashboard.png', caption: 'Candidate Dashboard with AI Recommendations' },
          { src: '/screenshots/kerjacerdas/07_seeker_job_match.png', caption: '5-Signal Vector Job Match Results' },
          { src: '/screenshots/kerjacerdas/08_job_detail_modal.png', caption: 'Job Detail & Semantic Breakdown Modal' },
          { src: '/screenshots/kerjacerdas/09_seeker_skill_gap.png', caption: 'AI Skill Gap Analyzer & Learning Roadmap' },
          { src: '/screenshots/kerjacerdas/10_seeker_search.png', caption: 'Job Search & Filter Interface' },
          { src: '/screenshots/kerjacerdas/14_seeker_cv_upload.png', caption: 'AI Resume Upload & Automated Parsing' },
          { src: '/screenshots/kerjacerdas/22_ai_career_advisor.png', caption: 'Interactive AI Career Advisor Chat' },
        ],
      },
      {
        name: 'Employer Portal',
        screens: [
          { src: '/screenshots/kerjacerdas/15_employer_dashboard.png', caption: 'Employer Portal: HR Pipeline Overview' },
          { src: '/screenshots/kerjacerdas/16_employer_jobs.png', caption: 'Active Job Listings & Applicant Count' },
          { src: '/screenshots/kerjacerdas/17_employer_post_job.png', caption: 'Post Job Wizard with AI Skill Tagging' },
          { src: '/screenshots/kerjacerdas/19_employer_candidates.png', caption: 'Employer Candidate Kanban & Shortlist' },
          { src: '/screenshots/kerjacerdas/20_employer_verification.png', caption: 'Company Verification & KYC Screen' },
          { src: '/screenshots/kerjacerdas/21_employer_profile.png', caption: 'Employer Profile & Branding Settings' },
        ],
      },
      {
        name: 'Auth & Pricing',
        screens: [
          { src: '/screenshots/kerjacerdas/02_landing_features.png', caption: 'Platform Features & Capability Overview' },
          { src: '/screenshots/kerjacerdas/03_pricing_plans.png', caption: 'Pay-to-Unlock & Subscription Pricing' },
          { src: '/screenshots/kerjacerdas/04_auth_modal_login.png', caption: 'Authentication & Sign-in Modal' },
          { src: '/screenshots/kerjacerdas/05_auth_modal_register.png', caption: 'Role-based Account Registration' },
          { src: '/screenshots/kerjacerdas/13_seeker_verification.png', caption: 'Candidate ID & Document Verification' },
        ],
      },
    ],
  },
  {
    id: 'portfolio-website',
    title: 'Personal Engineering Portfolio',
    slug: 'portfolio-website',
    type: 'Interactive Full-Stack Web Platform',
    category: 'High-Performance Developer Portfolio',
    role: 'Creator & UI Architect',
    team: 'Solo build',
    isTeam: false,
    year: '2026',
    badge: 'LIVE PLATFORM',
    themeColor: '#FF5A36',
    posterAccent: 'from-rose-600/30 to-amber-900/10',
    hasRealUI: true,
    coverImage: '/screenshots/portfolio/01_hero_portal.png',
    synopsis:
      'Interactive web application featuring WebGL particle graphics, liquid glass design system, smooth scroll choreography, and a direct inquiry pipeline.',
    overview:
      'Built from the ground up as a premier interactive showcase of engineering craft and customer-oriented solutions. Demonstrates high-performance UI engineering, WebGL rendering, seamless mobile gestures, and an automated inquiry intake system.',
    problem:
      'Standard portfolio templates are static and generic, failing to demonstrate real product craft, responsive interactivity, or clean intake workflows to prospective clients.',
    solution:
      'Engineered an interactive web platform combining React 19, GPU-accelerated Three.js particle graphics, Framer Motion choreography, and a custom liquid glassmorphism design system with direct email dispatch.',
    businessOutcomes: [
      '60 FPS buttery-smooth performance across mobile and desktop devices',
      'Direction-aware navigation that maximizes screen real estate for content',
      'Automated client project inquiry pipeline with local persistence and email notification',
      'Sub-300ms lightning-fast production asset bundle load times',
    ],
    architectureNodes: [
      { name: 'WebGL Particle Engine', desc: 'Three.js GPU-accelerated 2,200 particle dynamics field' },
      { name: 'Kinetic Motion Layer', desc: 'Lenis smooth scrolling with Framer Motion choreographies' },
      { name: 'Smart Navigation Dock', desc: 'Direction-aware liquid glass floating header with instant scroll memory' },
      { name: '3D Projects Carousel', desc: 'Hardware-accelerated orbital 3D project showcase with deep-linking' },
      { name: 'Solutions Console', desc: 'Interactive capabilities workbench with business problem & technical specs' },
      { name: 'Global Inquiry Engine', desc: 'Cloudflare Worker + KV serverless counter & Web3Forms live email dispatch' },
    ],
    impactMetrics: [
      { value: '60 FPS', label: 'Fluid GPU Motion & WebGL' },
      { value: 'Cloudflare', label: 'Worker + KV Global Sync' },
      { value: 'Sub-300ms', label: 'Fast Production Bundles' },
      { value: 'Zero-Jank', label: 'Optimized Mobile Swipes' },
    ],
    bullets: [
      'Architected a Three.js WebGL particle field rendering 2,200 dynamic particles with real-time rotational inertia and depth attenuation.',
      'Engineered a direction-aware liquid glass navigation bar that automatically slides away on scroll-down and reveals instantly on scroll-up.',
      'Built a serverless inquiry pipeline powered by a Cloudflare Worker and KV storage for real-time global inquiry tracking across all devices.',
      'Delivered a GPU-accelerated 3D project carousel with deep-linking support, lightbox media viewing, and an interactive direct scoping drawer.',
    ],
    tags: ['React 19', 'Cloudflare Workers', 'Three.js', 'Framer Motion', 'Tailwind CSS', 'Vite'],
    githubUrl: 'https://github.com/LouSens/portfolio-website.git',
    liveUrl: 'https://davidkurniawan.dev',
    codeSnippet: {
      filename: 'src/components/Navbar.jsx',
      language: 'javascript',
      code: `// Instant Direction-Aware Liquid Glass Navigation
useEffect(() => {
  const handleScroll = () => {
    const currentScrollY = window.scrollY;
    const delta = currentScrollY - prevScrollY.current;

    // Instantaneous reveal on any upward scroll (delta < 0) or at the top
    if (delta < 0 || currentScrollY < 15) {
      setIsVisible(true);
    } else if (delta > 3 && currentScrollY > 60 && !isOpen) {
      setIsVisible(false);
    }
    prevScrollY.current = currentScrollY;
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  return () => window.removeEventListener('scroll', handleScroll);
}, [isOpen]);`,
    },
    screenCategories: [
      {
        name: 'Platform Views',
        screens: [
          { src: '/screenshots/portfolio/01_hero_portal.png', caption: 'Hero Section & 3D WebGL Particle Field' },
          { src: '/screenshots/portfolio/02_capabilities_workbench.png', caption: 'System Capabilities & Solution Console' },
          { src: '/screenshots/portfolio/03_featured_systems_carousel.png', caption: '3D Projects Carousel & Specs Viewer' },
          { src: '/screenshots/portfolio/04_tech_stack_matrix.png', caption: 'Filterable Core Tech Stack Matrix' },
          { src: '/screenshots/portfolio/05_engineering_timeline.png', caption: 'Engineering Milestones & Interactive Timeline' },
          { src: '/screenshots/portfolio/06_academic_awards_modal.png', caption: 'Academic Honors & 3.84 GPA Certificate Viewer' },
          { src: '/screenshots/portfolio/07_direct_scoping_inquiry.png', caption: 'Direct Project Inquiry & Scoping Form' },
        ],
      },
    ],
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
    themeColor: '#38bdf8',
    posterAccent: 'from-sky-600/30 to-blue-900/10',
    hasRealUI: false,
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
      '85% test coverage across 120 unit tests ensuring bank-grade reliability',
    ],
    architectureNodes: [
      { name: 'Intake Node', desc: 'Receipt parsing & prompt-injection sanitization' },
      { name: 'Policy Engine', desc: 'Deterministic policy evaluation with rapidfuzz duplicate check' },
      { name: 'Validation Swarm', desc: 'LangGraph multi-step verification graph' },
      { name: 'Rate Limiter', desc: 'Sliding-window memory rate limiting middleware' },
      { name: 'Ledger Node', desc: 'Immutable structured transaction ledger' },
    ],
    codeSnippet: {
      filename: 'backend/graph/expense_workflow.py',
      language: 'python',
      code: `from langgraph.graph import StateGraph, END
from rapidfuzz import fuzz

def policy_validation_node(state: ExpenseState) -> ExpenseState:
    # Deterministic duplicate receipt detection
    for prev_claim in state.existing_ledger:
        sim = fuzz.ratio(state.current_claim.merchant, prev_claim.merchant)
        if sim > 90 and abs(state.current_claim.amount - prev_claim.amount) < 0.01:
            state.flags.append("POTENTIAL_DUPLICATE_RECEIPT")
            state.requires_manual_audit = True

    # Check policy threshold rules
    if state.current_claim.amount > state.policy_limits[state.current_claim.category]:
        state.flags.append("EXCEEDS_CATEGORY_LIMIT")
        state.requires_manual_audit = True

    return state`,
    },
    impactMetrics: [
      { value: 'Top 24', label: 'Out of 100+ Teams (Hackathon)' },
      { value: '6-Stage', label: 'Automated State Machine' },
      { value: '85%', label: 'Test Coverage Across 120 Units' },
      { value: 'FastAPI', label: 'Type-Safe API Contracts' },
    ],
    bullets: [
      'Architected a 6-stage agentic workflow in LangGraph routing claims through Intake, Intelligence, Policy, Validation, Approval, and Recorder nodes.',
      'Implemented sliding-window rate limiting, anti-hallucination regex pre-passes, and prompt-injection sanitization across API endpoints.',
      'Built deterministic policy evaluation tools with rapidfuzz duplicate detection, subscription catalog lookup, and JSON-backed ledger storage.',
      'Established dual CI/CD workflows via GitHub Actions: a PR quality gate with 85% coverage across 120 unit tests and scheduled nightly regressions.',
    ],
    tags: ['React 19', 'FastAPI', 'LangGraph', 'LangSmith', 'Pydantic v2', 'GitHub Actions'],
    githubUrl: 'https://github.com/LouSens/orion.git',
    liveUrl: null,
  },
  {
    id: 'startup-emp',
    title: 'Startup EMP',
    slug: 'startup-emp',
    type: 'Full-Stack Accelerator Platform',
    category: 'AI Chief of Staff & Accelerator Systems',
    role: 'Backend & AI Systems Engineer',
    team: '4-person team',
    isTeam: true,
    year: 'May 2026',
    badge: 'HACKATHON BUILD',
    themeColor: '#a855f7',
    posterAccent: 'from-purple-600/30 to-indigo-900/10',
    hasRealUI: false,
    synopsis:
      'AI Chief of Staff platform for startup accelerators that replaces spreadsheet chaos with automated pitch deck evaluation and mentor matching.',
    overview:
      'Startup EMP solves cohort intake bottlenecks for venture accelerators and incubators. It automatically ingests pitch decks, extracts traction and market size metrics, and pairs founders with the most relevant domain mentors while requiring program managers to approve scores before state changes.',
    problem:
      'Startup accelerators receive hundreds of unstructured pitch deck PDFs per cohort, leading to disorganized spreadsheets, slow evaluation cycles, and mismatched mentors.',
    solution:
      'Built an end-to-end management platform featuring automated multimodal pitch deck parsing, structured traction scoring, semantic mentor matching, and a human-in-the-loop admin review dashboard.',
    businessOutcomes: [
      'Eliminated spreadsheet chaos with a single centralized cohort evaluation platform',
      'Automated pitch deck analysis saving hours of manual review per applicant',
      'Instant semantic mentor pairing based on founder industry and traction needs',
      'Built-in human review gates ensuring managers maintain final decision authority',
    ],
    architectureNodes: [
      { name: 'Deck Parsing Node', desc: 'Gemini multimodal PDF parser extracting traction metrics' },
      { name: 'Schema Coercion', desc: 'Pydantic v2 validation enforcing strict typed outputs' },
      { name: 'LangGraph Pipeline', desc: '4-stage agent graph for scoring, triage, and ranking' },
      { name: 'Vector Mentor Match', desc: 'Cosine similarity matching with Redis caching' },
      { name: 'Storage Layer', desc: 'Firestore & Google Cloud Run service deployment' },
    ],
    codeSnippet: {
      filename: 'backend/agents/triage_graph.py',
      language: 'python',
      code: `from langgraph.graph import StateGraph, END
from pydantic import BaseModel, Field
from typing import List, Optional

class PitchDeckEvaluation(BaseModel):
    problem_clarity_score: float = Field(ge=0, le=10)
    market_size_tam_sam: str
    traction_mrr: Optional[float] = None
    founder_market_fit: float = Field(ge=0, le=10)
    mentor_tags: List[str] = Field(default_factory=list)

# Define 4-phase LangGraph agentic triage workflow
workflow = StateGraph(TriageState)
workflow.add_node("parse_multimodal_deck", parse_deck_node)
workflow.add_node("evaluate_metrics", evaluate_metrics_node)
workflow.add_node("vector_mentor_match", match_mentors_node)
workflow.add_node("human_review_draft", prepare_admin_draft_node)

workflow.set_entry_point("parse_multimodal_deck")
workflow.add_edge("parse_multimodal_deck", "evaluate_metrics")
workflow.add_edge("evaluate_metrics", "vector_mentor_match")
workflow.add_edge("vector_mentor_match", "human_review_draft")
workflow.add_edge("human_review_draft", END)

triage_pipeline = workflow.compile()`,
    },
    impactMetrics: [
      { value: '4-Phase', label: 'Automated Agent Pipeline' },
      { value: '100%', label: 'Schema Validation Safety' },
      { value: 'Human-in-Loop', label: 'Admin Approval Controls' },
      { value: 'Cloud Run', label: 'Scalable Serverless Cloud' },
    ],
    bullets: [
      'Designed a 4-phase agentic pipeline covering application triage, multimodal pitch deck parsing, vector mentor matching, and institutional knowledge capture.',
      'Engineered the FastAPI backend using LangGraph orchestration and Pydantic v2 schema coercion to enforce strict LLM output typing.',
      'Implemented human-in-the-loop governance controls where AI recommendations serve as drafts requiring explicit admin approval before state mutation.',
      'Integrated high-dimensional vector similarity matching with aggressive caching to eliminate redundant compute calls.',
    ],
    tags: ['FastAPI', 'LangGraph', 'Pydantic v2', 'Cloud Run', 'Firestore', 'React'],
    githubUrl: 'https://github.com/nerdylive123/Startup-emp.git',
    liveUrl: null,
  },
  {
    id: 'neuralvoid',
    title: 'NeuralVoid',
    slug: 'neuralvoid',
    type: 'Full-Stack Analytics Web App',
    category: 'Behavioral Analytics & Machine Learning SPA',
    role: 'Full-Stack & ML Engineer',
    team: 'Solo build',
    isTeam: false,
    year: 'Jan 2026',
    badge: 'RESEARCH BUILD',
    themeColor: '#10b981',
    posterAccent: 'from-emerald-600/30 to-teal-900/10',
    hasRealUI: false,
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
      { name: 'ML Classifier', desc: 'XGBoost & Random Forest ensemble (~96% accuracy)' },
      { name: 'FastAPI Gateway', desc: 'Async endpoints with clinical narrative generator' },
      { name: 'React SPA', desc: 'Hosted on Vercel with Railway API gateway' },
    ],
    codeSnippet: {
      filename: 'ml/feature_extractor.py',
      language: 'python',
      code: `import numpy as np
import pandas as pd

def extract_session_features(events_df: pd.DataFrame) -> dict:
    events_df['latency'] = events_df['timestamp'].diff().dt.total_seconds().fillna(0)
    
    features = {
        'mean_session_duration': events_df['duration'].mean(),
        'session_velocity': len(events_df) / (events_df['timestamp'].max() - events_df['timestamp'].min()).total_seconds(),
        'streak_entropy': -np.sum(p * np.log2(p + 1e-9) for p in events_df['action_type'].value_counts(normalize=True)),
        'late_night_ratio': (events_df['timestamp'].dt.hour.between(0, 5)).mean(),
        'rapid_switch_rate': (events_df['latency'] < 3.0).mean()
    }
    return features`,
    },
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
    tags: ['React', 'FastAPI', 'scikit-learn', 'XGBoost', 'Python', 'Vercel'],
    githubUrl: 'https://github.com/LouSens/neural-void.git',
    liveUrl: null,
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
    themeColor: '#eab308',
    posterAccent: 'from-amber-600/30 to-yellow-900/10',
    hasRealUI: false,
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
    codeSnippet: {
      filename: 'retrieval/hybrid_rag.py',
      language: 'python',
      code: `from langchain.retrievers import EnsembleRetriever
from langchain_community.retrievers import BM25Retriever
from langchain_community.vectorstores import FAISS

# Parent-Child hybrid ensemble combining BM25 keyword search (0.4) and dense FAISS (0.6)
bm25_retriever = BM25Retriever.from_documents(parent_docs)
bm25_retriever.k = 10

faiss_retriever = faiss_vectorstore.as_retriever(search_kwargs={"k": 10})

ensemble_retriever = EnsembleRetriever(
    retrievers=[bm25_retriever, faiss_retriever],
    weights=[0.4, 0.6]
)

# Cross-encoder reranking over candidate chunks
def rerank_documents(query: str, candidate_docs: list) -> list:
    pairs = [[query, doc.page_content] for doc in candidate_docs]
    scores = reranker_model.predict(pairs)
    ranked = sorted(zip(scores, candidate_docs), key=lambda x: x[0], reverse=True)
    return [doc for score, doc in ranked if score > 0.3]`,
    },
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
    colabUrls: [
      { label: 'RAG Notebook', url: 'https://colab.research.google.com/drive/1wzslBMXBo9QL4-ToEDmWl3amLrcVWpRP?usp=sharing' },
      { label: 'Fine-Tuning Notebook', url: 'https://colab.research.google.com/drive/1xwqQl8i3gc5g4ZgAf-uv6q94mst3U6uK?usp=sharing' },
    ],
    hfUrl: 'https://huggingface.co/HuangYiYang/Llama-3-8B-Indonesian-Legal',
    wandbUrl: 'https://wandb.ai/kyzo/legal-llm-finetune',
    liveUrl: null,
  },
];

export const EXPERIENCE = [
  {
    year: '2026',
    current: true,
    role: 'Lead Systems Engineer @ KerjaCerdas',
    company: '4-Person Team · Engineering Lead',
    desc: 'Led full-stack engineering of an enterprise talent AI platform. Architected a LangGraph multi-agent swarm, 5-signal pgvector hybrid ranking engine, low-latency Gemini PDF extraction, Token Efficiency Gates, Employer Kanban dashboard, and an automated 4-phase CI/CD pipeline.',
  },
  {
    year: 'June 2026',
    role: 'Silver Award Winner & AI Strategy Lead',
    company: 'China-ASEAN Innovation Competition (SEA-CICSIC)',
    desc: 'Led technical architecture and proposal for Omni-QC — an industrial manufacturing intelligence platform combining real-time computer vision defect detection on conveyor lines with predictive equipment maintenance at the China-ASEAN undergraduate level.',
  },
  {
    year: 'May 2026',
    role: 'Tech Lead · Orion',
    company: 'UM Hackathon (Top 24 / 100+ Teams) · One Hit Wonder',
    desc: 'Architected backend infrastructure for an AI expense reimbursement platform. Owned the 6-stage LangGraph workflow, FastAPI type contracts, rate-limiting middleware, and dual CI/CD regression test workflows.',
  },
  {
    year: 'May 2026',
    role: 'Backend & AI Engineer · Startup EMP',
    company: '4-Person Team · MyHack 2025',
    desc: 'Built the backend and agent systems for an accelerator management platform. Designed the FastAPI/LangGraph triage pipeline, Pydantic v2 multimodal ingestion, and semantic mentor matching via vector embeddings.',
  },
  {
    year: 'Oct 2025',
    role: 'Lead Developer · DPickleball RL Agent',
    company: '3-Person Engineering Team',
    desc: 'Architected Unity ML-Agents environment, reward shaping, and PPO training loops for a competition-graded reinforcement learning agent, achieving a 3rd place finish.',
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
    "Dean's List Awardee — three consecutive semesters",
    'Top 16% of cohort across College of Artificial Intelligence & Robotics',
  ],
  learning: [
    'Distributed systems & agent consensus',
    'Reinforcement learning & control algorithms',
    'High-throughput vector indexing',
  ],
};

export const AWARDS = [
  {
    place: 'Silver Award',
    title: 'SEA-CICSIC 2026',
    category: 'Industrial AI Proposal',
    org: 'China-ASEAN Innovation Competition · Undergraduate Division',
    date: '2026',
    note: 'Led AI strategy and technical architecture proposal for Omni-QC — a manufacturing intelligence platform combining real-time computer vision defect detection on conveyor lines with predictive equipment maintenance.',
    docs: [
      { label: 'Pitch Deck (PDF)', url: '/docs/omni-qc/Omni-QC Pitch Deck.pdf' },
      { label: 'Business Proposal (PDF)', url: '/docs/omni-qc/Omni-QC Business Proposal.pdf' },
    ],
  },
  {
    place: '3rd Place',
    title: 'DPickleball AI Tournament',
    category: 'Deep Reinforcement Learning (PPO)',
    org: 'Unity ML-Agents · Continuous Control Tournament',
    date: 'Oct 2025',
    note: 'Lead developer on a 3-person team. Architected the Unity ML-Agents 3D physics environment, reward shaping logic, and PPO multi-agent training loops — placing 3rd out of all competing teams.',
    photos: [
      { src: '/media/dpickleball/IMG_8700.png', caption: '3rd Place Award Trophy & Certificate' },
      { src: '/media/dpickleball/IMG_8724.png', caption: 'Competition Group Photo — Teams & Organizers' },
    ],
  },
  {
    place: 'Top 20% Globally',
    title: 'Intl. Quant Championship',
    category: 'Quantitative Problem Solving',
    org: 'Quantitative Reasoning · Stage 1',
    date: 'Apr 2025',
    note: 'Placed top 20% globally against international competitors in data-driven analytical reasoning and quantitative problem-solving.',
  },
  {
    place: "Dean's List",
    title: 'Three Consecutive Semesters',
    category: 'Academic Honors',
    org: 'Xiamen University Malaysia · Top 16% of Cohort',
    date: '2024 – 2026',
    note: "Placed on the Dean's List for three consecutive semesters, ranking in the top 16% of the cohort across the College of Artificial Intelligence & Robotics with a 3.84 / 4.00 GPA.",
    photos: [
      { src: "/docs/deans-list/2409 Dean's List.jpeg", caption: 'Sem 1 — Sep 2024' },
      { src: "/docs/deans-list/2504 Dean's List.jpeg", caption: 'Sem 2 — Apr 2025' },
      { src: "/docs/deans-list/2509 Dean's List.jpeg", caption: 'Sem 3 — Sep 2025' },
    ],
  },
];
