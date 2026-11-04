import React, { useState, useEffect, useLayoutEffect, useRef, lazy, Suspense } from 'react';
import { motion, useScroll, PresenceContext } from 'framer-motion';
import Lenis from 'lenis';

// Modular Components
import Navbar from './components/Navbar';
import SectionNav from './components/SectionNav';
import Hero from './components/Hero';
import { SpaceGuard } from './components/space/Space';
import About from './components/About';
import WorkGallery from './components/WorkGallery';
import StackLayers from './components/StackLayers';
import Footer from './components/Footer';
import CursorGlow from './components/CursorGlow';
import ProjectsPage from './components/ProjectsPage';
import PageNav from './components/PageNav';

import { PROJECTS_DATA } from './data/portfolioData';
import { HOME, PAGES, parseRoute, routeUrl, takePendingSection } from './utils/route';

// Heavy pieces load after the first paint: three.js for the background, and the case study view.
const MomentsWall = lazy(() => import('./components/MomentsWall'));
const ResultsRoom = lazy(() => import('./components/ActivitySection').then((m) => ({ default: m.ResultsRoom })));
const KpiRoom = lazy(() => import('./components/ActivitySection').then((m) => ({ default: m.KpiRoom })));
const GithubRoom = lazy(() => import('./components/ActivitySection').then((m) => ({ default: m.GithubRoom })));
const ProjectDetailModal = lazy(() => import('./components/ProjectDetailModal'));
// Below the fold: fetched alongside the main script, rendered once the hero is already on screen.
const CredentialsSection = lazy(() => import('./components/CredentialsSection'));
const ScopeInquiryDrawer = lazy(() => import('./components/ScopeInquiryDrawer'));

const HOME_TITLE = typeof document !== 'undefined' ? document.title : '';
const IS_PHONE = typeof window !== 'undefined' && window.matchMedia('(max-width: 767px)').matches;
// On a phone's first load, entrance animations are skipped: content that waits on a JS animation
// stays invisible for as long as the phone is busy, which reads as a black page.
const NO_INTRO = { id: 'no-intro', isPresent: true, initial: false, register: () => () => {}, onExitComplete: () => {} };

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

const gentle = (node) => <Suspense fallback={null}>{node}</Suspense>;

/* Rooms in the order you move through them. `dwell: 'auto'` means the room is as tall as its content and scrolls
   inside its panel; the others report their own dwell (the sideways strip, the layer steps). */
const ROOMS = (open) => [
  { id: 'hero', label: 'Introduction', bare: true, dwell: 'custom', render: () => <Hero /> },
  { id: 'about', label: 'About', dwell: 'auto', render: () => <About /> },
  { id: 'work', label: 'Projects', dwell: 'custom', render: (s) => <WorkGallery {...s} onOpenProject={open} /> },
  { id: 'stack', label: 'Tech stack', dwell: 'custom', render: (s) => <StackLayers {...s} /> },
  { id: 'activity', label: 'Results', dwell: 'auto', render: () => gentle(<ResultsRoom />) },
  { id: 'kpis', label: 'Project KPIs', dwell: 'auto', render: () => gentle(<KpiRoom onOpenProject={open} />) },
  { id: 'github', label: 'GitHub', dwell: 'auto', render: (s) => gentle(<GithubRoom near={s.near} />) },
  { id: 'moments', label: 'Photos', dwell: 'auto', render: (s) => gentle(<MomentsWall progress={s.progress} />) },
  { id: 'awards', label: 'Awards', dwell: 'auto', render: () => gentle(<CredentialsSection compact panel />) },
  { id: 'inquire', label: 'Contact', dwell: 'auto', render: () => gentle(<ScopeInquiryDrawer compact panel />) },
];

/* Looping isometric sculptures hung in the space: one beside the lobby, the rest seen in passing between rooms */
const SCULPTURES = [
  { kind: 'layers', size: 380, x: 430, y: 20, z: -140, ry: -18 },
  { kind: 'match', size: 300, x: -760, y: -60, z: -620, ry: 24 },
  { kind: 'cluster', size: 300, x: 840, y: 60, z: -1760, ry: -22 },
  { kind: 'database', size: 300, x: -700, y: -40, z: -2900, ry: 20 },
  { kind: 'bars', size: 300, x: 760, y: 40, z: -4050, ry: -20 },
  { kind: 'reel', size: 300, x: -720, y: -30, z: -5200, ry: 18 },
  { kind: 'ingots', size: 300, x: 700, y: 50, z: -6300, ry: -16 },
  { kind: 'books', size: 300, x: -640, y: -20, z: -7450, ry: 14 },
];

/* ═══════════════════════════════════════
   MAIN APP
   ═══════════════════════════════════════ */
export default function App() {
  const lenisRef = useRef(null);
  const [activeModalProject, setActiveModalProject] = useState(null);
  // Which page is showing: the long home page, or one of the dedicated pages the navbar links to.
  const [route, setRoute] = useState(() => parseRoute());
  // Bumped every time a case study closes: remounting <main> replays every entrance animation,
  // which otherwise only run once per page load.
  const [homeKey, setHomeKey] = useState(0);
  // Where the visitor was on the page when a case study opened, so closing it returns them there.
  const savedScroll = useRef(0);
  // Initialize Lenis Smooth Scroll (skipped for users who prefer reduced motion)
  useEffect(() => {
    // Touch devices already scroll smoothly; running Lenis there only costs frames.
    if (window.matchMedia('(prefers-reduced-motion: reduce), (max-width: 767px)').matches) {
      return;
    }

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
    });
    lenisRef.current = lenis;

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

  // Freeze/Resume Lenis when modal opens/closes
  useEffect(() => {
    if (activeModalProject) {
      lenisRef.current?.stop();
      document.body.style.overflow = 'hidden';
    } else {
      lenisRef.current?.start();
      document.body.style.overflow = '';
    }
  }, [activeModalProject]);

  useLayoutEffect(() => {
    if (homeKey === 0) return;
    const y = savedScroll.current;
    window.scrollTo(0, y);
    lenisRef.current?.scrollTo(y, { immediate: true, force: true });
  }, [homeKey]);

  // The case study has its own address (#project=<id>). Opening it adds a history step, so the phone's
  // back button closes it and lands on the page it was opened from.
  const modalOpen = useRef(false);
  const modalInHistory = useRef(false);

  // A new page starts at its top.
  const routeMounted = useRef(false);
  useLayoutEffect(() => {
    const page = PAGES.find((p) => p.route === route);
    document.title = page ? `${page.label} | David Kurniawan` : HOME_TITLE;
    if (!routeMounted.current) {
      routeMounted.current = true;
      return;
    }
    const section = takePendingSection();
    const sectionEl = section && document.getElementById(section);
    const y = sectionEl ? sectionEl.getBoundingClientRect().top + window.scrollY : 0;
    window.scrollTo({ top: y, behavior: 'instant' });
    lenisRef.current?.scrollTo(y, { immediate: true, force: true });
  }, [route]);

  // Sync page and modal with URL hash
  useEffect(() => {
    const handleHash = (event) => {
      const hash = window.location.hash;
      if (hash.startsWith('#project=')) {
        const projectId = hash.replace('#project=', '').toLowerCase();
        const found = PROJECTS_DATA.find(
          (p) => p.id.toLowerCase() === projectId || p.slug.toLowerCase() === projectId
        );
        if (found) {
          // Reached by a link or the forward button (not a fresh page load): the page it opened over is one step back.
          if (event) {
            if (!modalOpen.current) savedScroll.current = window.scrollY;
            modalInHistory.current = true;
          }
          modalOpen.current = true;
          setActiveModalProject(found);
        }
        return;
      }
      // Any other address means the case study is no longer showing, e.g. after the back button.
      if (modalOpen.current) {
        modalOpen.current = false;
        setActiveModalProject(null);
        setHomeKey((k) => k + 1);
      }
      modalInHistory.current = false;
      setRoute(parseRoute(hash));
    };

    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  const handleOpenProject = (project) => {
    setActiveModalProject(project);
    if (modalOpen.current) {
      // Switching between case studies stays a single step in the history.
      window.history.replaceState(null, '', `#project=${project.id}`);
      return;
    }
    savedScroll.current = window.scrollY;
    modalOpen.current = true;
    modalInHistory.current = true;
    window.history.pushState(null, '', `#project=${project.id}`);
  };

  const handleCloseProject = () => {
    // Opened over a page: step back to it, and the hash listener closes the case study.
    if (modalInHistory.current) {
      window.history.back();
      return;
    }
    modalOpen.current = false;
    setActiveModalProject(null);
    setHomeKey((k) => k + 1);
    window.history.replaceState(null, '', routeUrl(route));
  };

  return (
    // overflow-x-clip (not hidden): hidden would make this a scroll container and break the sticky galleries.
    <div id="top" className="relative min-h-screen bg-canvas text-white font-sans selection:bg-accent/30 selection:text-white overflow-x-clip">
      <ScrollProgress />
      <CursorGlow />
      <div className="fixed inset-0 z-0 pointer-events-none bg-dots" aria-hidden="true" />

      {/* Navigation */}
      <Navbar route={route} />
      {route === HOME && <SectionNav />}

      {/* Main Content Flow */}
      <PresenceContext.Provider value={IS_PHONE && homeKey === 0 ? NO_INTRO : null}>
      <main key={`${route}-${homeKey}`} className="relative z-10 w-full overflow-x-clip">
        {route === HOME ? (
          <>
            {/* The home page is a 3D space: every room is a panel hung in space, and the camera flies between them */}
            <SpaceGuard rooms={ROOMS(handleOpenProject)} sculptures={SCULPTURES} />
          </>
        ) : (
          // Dedicated pages: one part of the home page in full, clear of the floating navbar.
          <div className="pt-14 md:pt-10 min-h-screen">
            {route === 'projects' && <ProjectsPage onOpenProject={handleOpenProject} />}
            <Suspense fallback={<div className="min-h-screen" />}>
              {route === 'awards' && <CredentialsSection />}
              {route === 'contact' && <ScopeInquiryDrawer />}
            </Suspense>
            <PageNav route={route} />
          </div>
        )}
      </main>
      </PresenceContext.Provider>

      {/* Footer */}
      <Footer />

      {/* ── PROJECT DETAIL MODAL ── */}
      {activeModalProject && (
        <Suspense fallback={<div className="fixed inset-0 z-[100] bg-canvas" />}>
        <ProjectDetailModal
          project={activeModalProject}
          projects={PROJECTS_DATA}
          onClose={handleCloseProject}
          onSelectProject={handleOpenProject}
        />
        </Suspense>
      )}
    </div>
  );
}
