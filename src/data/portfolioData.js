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

export const ROTATING_STATUS = [
  'Available for Full-Stack & AI Systems Roles',
  'Building Responsive Web Apps with React 19 & FastAPI',
  'Architecting Multi-Agent Workflows with LangGraph',
  'Engineering Type-Safe Async Backends & pgvector Search',
];

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
    title: 'Full-Stack Web Applications',
    tagline: 'Modern React single-page applications with modular components and high-speed APIs.',
    icon: 'Globe',
    description:
      'Building responsive, accessible web applications from the ground up using React 19, Tailwind CSS, Zustand, and FastAPI. Creating intuitive dashboards, role-based authentication, and interactive data visualization.',
    deliverables: [
      'Modern React 19 single-page applications & interactive dashboards',
      'FastAPI asynchronous REST endpoints with strict Pydantic v2 validation',
      'Role-based authentication, document ingestion pipelines & database schemas',
      'Containerized deployment with Docker, GitHub Actions CI/CD, and Vercel',
    ],
    featuredProject: 'KerjaCerdas',
    appliedProjects: ['KerjaCerdas', 'Personal Portfolio', 'NeuralVoid'],
  },
  {
    id: 'backend-apis',
    number: '02',
    title: 'Backend Engineering & Data Infrastructure',
    tagline: 'Type-safe APIs, PostgreSQL data modeling, and vector search indexing.',
    icon: 'Layers',
    description:
      'Engineering high-throughput backends with FastAPI and PostgreSQL with pgvector. Implementing strict data validation, async task queues, Redis caching, and rate limiting middleware.',
    deliverables: [
      'FastAPI REST microservices with automated OpenAPI 3.1 specifications',
      'PostgreSQL relational data modeling with pgvector HNSW similarity search',
      'Redis caching & token-bucket rate limiting middleware',
      'Asynchronous background worker pipelines for heavy document and PDF processing',
    ],
    featuredProject: 'Orion',
    appliedProjects: ['KerjaCerdas', 'Orion', 'Startup EMP'],
  },
  {
    id: 'ai-workflows',
    number: '03',
    title: 'Autonomous Multi-Agent Systems',
    tagline: 'Orchestrating agent workflows that execute multi-step tasks reliably.',
    icon: 'Bot',
    description:
      'Designing robust agent workflows using LangGraph. Implementing supervisor-worker routing, parallel task execution, human-in-the-loop validation checkpoints, and structured schema coercion.',
    deliverables: [
      'LangGraph cyclical state graphs & supervisor-worker routing networks',
      'Human-in-the-loop approval checkpoints for critical operations',
      'Pydantic v2 runtime output schema validation and retry heuristics',
      'LangSmith tracing, evaluation, and latency performance monitoring',
    ],
    featuredProject: 'Startup EMP',
    appliedProjects: ['KerjaCerdas', 'Orion', 'Startup EMP'],
  },
  {
    id: 'rag-ml',
    number: '04',
    title: 'Hybrid Search & Machine Learning',
    tagline: 'Hybrid retrieval engines (BM25 + vector) and predictive analytics.',
    icon: 'Brain',
    description:
      'Building hybrid search architectures (sparse BM25 + dense pgvector/FAISS) with cross-encoder neural rerankers, and developing feature extraction pipelines with scikit-learn and XGBoost.',
    deliverables: [
      'Parent-child document chunking with reciprocal rank fusion (RRF)',
      'Dense (pgvector/FAISS) + sparse (BM25) hybrid retrieval pipelines',
      'Feature engineering & tabular ML classification models (XGBoost / Random Forest)',
      'Automated diagnostic reporting & model evaluation suites',
    ],
    featuredProject: 'Indonesian Legal RAG',
    appliedProjects: ['Indonesian Legal RAG', 'NeuralVoid'],
  },
];

export const HOW_WE_WORK = [
  {
    step: '01',
    title: 'System Architecture',
    desc: 'Clarifying product workflows, database schemas, and technical constraints into a clear roadmap.',
  },
  {
    step: '02',
    title: 'Interactive Prototype',
    desc: 'Delivering an interactive working build with modular UI and integrated backend endpoints early on.',
  },
  {
    step: '03',
    title: 'Hardening & Testing',
    desc: 'Enforcing strict type contracts, database indices, security middleware, and automated test suites.',
  },
  {
    step: '04',
    title: 'Production Handover',
    desc: 'Containerized deployment via Docker and CI/CD pipelines, supported by thorough documentation.',
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
      'Enterprise talent matching platform featuring a React 19 SPA, FastAPI backend, LangGraph multi-agent swarm, and 5-signal pgvector hybrid search.',
    overview:
      'KerjaCerdas connects job seekers with employers by combining a modern React 19 SPA with an asynchronous backend. Features a LangGraph supervisor swarm routing tasks in parallel, an asynchronous PDF parsing pipeline with token efficiency gates, and a 5-signal composite ranking engine over PostgreSQL with pgvector.',
    problem:
      'Traditional talent platforms rely on simplistic keyword filters and manual resume screening, leading to high candidate drop-off and substantial HR overhead.',
    solution:
      'Engineered an end-to-end platform with a LangGraph supervisor swarm routing tasks in parallel, pgvector HNSW indexing, and an Employer Kanban dashboard with automated verification.',
    architectureNodes: [
      { name: 'Frontend Portal', desc: 'React 19 + Zustand SPA with Seeker & Employer flows' },
      { name: 'API Gateway', desc: 'FastAPI with Pydantic v2 validation & rate limiting' },
      { name: 'Supervisor Agent', desc: 'LangGraph orchestrator routing tasks in parallel' },
      { name: 'Worker Swarm', desc: 'SearchJobs, ResumeReview & SkillGap agents' },
      { name: 'Vector DB', desc: 'PostgreSQL + pgvector HNSW indexing (5-signal ranker)' },
      { name: 'Document Ingestion', desc: 'Gemini multimodal PDF parser with Token Gates' },
    ],
    impactMetrics: [
      { value: '5-Signal', label: 'Composite Hybrid Ranker' },
      { value: '40%+', label: 'Token Compute Cost Savings' },
      { value: 'Sub-second', label: 'pgvector HNSW Search' },
      { value: '4-Phase', label: 'Automated CI/CD Pipeline' },
    ],
    bullets: [
      'Architected a ReAct Multi-Agent Swarm using LangGraph with a Supervisor node routing tasks in parallel to SearchJobs (pgvector), ResumeReview (multimodal PDF), and SkillGap worker agents.',
      'Engineered a 5-signal composite ranking engine combining vector cosine similarity (50%), skill overlap (30%), regional boost (10%), salary fit (5%), and experience fit (5%) with HNSW pgvector indexing.',
      'Built an asynchronous PDF processing pipeline achieving low-latency CV extraction, Token Efficiency Gates to control LLM compute costs, and PII mitigation middleware.',
      'Delivered an Employer Kanban pipeline featuring Pay-to-Unlock candidate monetization, E-KYC credential verification, closed-loop A/B event tracking, and an automated 4-phase CI/CD pipeline.',
    ],
    tags: ['React 19', 'FastAPI', 'PostgreSQL + pgvector', 'LangGraph', 'Zustand', 'Docker Compose'],
    githubUrl: 'https://github.com/LouSens/KerjaCerdas.git',
    liveUrl: null,
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
      'Responsive personal developer portfolio featuring Three.js particle graphics, liquid glass design system, smooth scroll choreography, and interactive architecture showcases.',
    overview:
      'Designed and engineered from the ground up as a high-craft engineering portfolio. Features a 3D WebGL particle field, Lenis kinetic smooth scrolling, instant direction-aware liquid glass navigation, interactive architecture consoles, and a 3D project showcase.',
    problem:
      'Standard developer portfolios rely on static bullet points and generic templates, failing to demonstrate real architectural craft or interactive UI precision.',
    solution:
      'Engineered an interactive engineering portfolio combining React 19, Three.js particle dynamics, Framer Motion choreography, and a custom liquid glassmorphism design system.',
    architectureNodes: [
      { name: 'WebGL Particle Engine', desc: 'Three.js / React Three Fiber GPU-accelerated field' },
      { name: 'Kinetic Motion Layer', desc: 'Lenis smooth scrolling with Framer Motion choreographies' },
      { name: 'Smart Navigation Dock', desc: 'Direction-aware liquid glass floating header with instant scroll memory' },
      { name: 'Capabilities Console', desc: 'Interactive system solution console with pipeline trace simulation' },
      { name: '3D Projects Carousel', desc: 'Hardware-accelerated mobile-optimized project showcase' },
      { name: 'Direct Inquiry Drawer', desc: 'Flexible client intake form with local persistence and confirmation receipt' },
    ],
    impactMetrics: [
      { value: '60 FPS', label: 'Fluid GPU Motion & WebGL' },
      { value: '100%', label: 'Liquid Glass Design System' },
      { value: 'Sub-300ms', label: 'Vite Production Bundling' },
      { value: 'Zero-Jank', label: 'Optimized Mobile Swipes' },
    ],
    bullets: [
      'Architected a Three.js WebGL particle field rendering 2,200 dynamic particles with real-time rotational inertia and depth attenuation.',
      'Engineered a direction-aware liquid glass navigation bar that automatically slides away on scroll-down and reveals instantly on scroll-up.',
      'Built an interactive System Capabilities console with consistent height transitions and live pipeline simulation.',
      'Delivered a GPU-accelerated 3D project carousel with deep-linking support, lightbox media viewing, and an interactive direct scoping drawer.',
    ],
    tags: ['React 19', 'Three.js', 'Framer Motion', 'Tailwind CSS', 'Lenis Scroll', 'Vite'],
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
      'An AI expense reimbursement SaaS assistant featuring a 6-stage LangGraph workflow, rapidfuzz duplicate detection, and automated CI/CD testing.',
    overview:
      'Orion automates corporate expense reconciliation from raw receipts through a deterministic 6-stage LangGraph state machine. Developed under 48-hour hackathon constraints and placing in the Top 24 out of 100+ teams, the platform integrates sliding-window rate limiting, anti-hallucination regex pre-passes, and scheduled nightly regression tests.',
    problem:
      'Manual expense reconciliation requires cross-referencing policy limits, detecting duplicate claims, and manually logging transactions to ledgers.',
    solution:
      'Engineered a deterministic 6-stage LangGraph state machine routing claims through Intake, Intelligence, Policy, Validation, Approval, and Ledger nodes with immutable JSON records.',
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
      { value: 'Top 24', label: 'Out of 100+ Teams (UM Hackathon)' },
      { value: '6-Stage', label: 'LangGraph State Machine' },
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
      'An AI Chief of Staff platform for startup accelerators replacing spreadsheet chaos with a 4-phase LangGraph pipeline and vector mentor matching.',
    overview:
      'Startup EMP streamlines cohort application triage for accelerator programs. Features a 4-phase LangGraph pipeline that parses pitch decks, enforces Pydantic v2 validation contracts, and performs semantic mentor matching via high-dimensional vector search with Redis caching.',
    problem:
      'Accelerators receive hundreds of unstructured pitch decks in disparate formats, making triage and mentor pairing slow and inconsistent.',
    solution:
      'Engineered a FastAPI backend using LangGraph orchestration, Pydantic v2 schema coercion, and human-in-the-loop governance controls where AI scores act as drafts requiring admin approval.',
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
      { value: '4-Phase', label: 'LangGraph Agent Pipeline' },
      { value: '100%', label: 'Pydantic v2 Schema Safety' },
      { value: 'Human-in-Loop', label: 'Admin Approval Controls' },
      { value: 'Cloud Run', label: 'Serverless Backend' },
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
      'A full-stack behavioral analytics web application with a 25-feature ML pipeline, session velocity heatmaps, and automated narrative reporting.',
    overview:
      'NeuralVoid transforms raw session interaction logs into structured behavioral metrics. Calculates session velocity, streak entropy, and binge probability using a 25-feature machine learning ensemble (~96% classification accuracy) served via a high-throughput FastAPI backend and a responsive React SPA dashboard.',
    problem:
      'Digital habits and compulsive screen behaviors lack objective quantitative metrics and automated narrative synthesis for clinicians.',
    solution:
      'Engineered an event-driven feature extraction pipeline feeding an XGBoost and Random Forest ensemble model with automated clinical report generation.',
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
      { value: '96%', label: 'Ensemble Classification Accuracy' },
      { value: '25', label: 'Engineered Behavioral Features' },
      { value: 'FastAPI', label: 'High-Throughput Gateway' },
      { value: 'React SPA', label: 'Deployed Web App' },
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
      'A Parent-Child Hybrid RAG pipeline combining sparse BM25 keyword search with dense FAISS vector indexing and cross-encoder reranking.',
    overview:
      'Built to provide verifiable, exact statutory article citations in Indonesian Labor Law without hallucinations. Features parent-child document chunking, HyDE hypothesis generation, dual-retriever hybrid search (BM25 + FAISS), and a cross-encoder reranking gate.',
    problem:
      'Generic search engines and language models frequently hallucinate Indonesian statutory references and specific labor dispute penalty clauses.',
    solution:
      'Engineered a Parent-Child Hybrid RAG pipeline combining sparse BM25 and dense FAISS vector search with HyDE generation, Cross-Encoder reranking, and live search fallback.',
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
      { value: '0.92+', label: 'Reranked Retrieval Score' },
      { value: 'Hybrid', label: 'BM25 (0.4) + FAISS (0.6)' },
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
