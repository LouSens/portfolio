import React, { useState, useEffect, useLayoutEffect, useRef, lazy, Suspense } from 'react';
import { motion, useScroll, useTransform, PresenceContext } from 'framer-motion';
import Lenis from 'lenis';

// Modular Components
import Navbar from './components/Navbar';
import SectionNav from './components/SectionNav';
import Hero from './components/Hero';
import About from './components/About';
import WorkGallery from './components/WorkGallery';
import StackGallery from './components/StackGallery';
import Footer from './components/Footer';
import CursorGlow from './components/CursorGlow';
import ProjectsPage from './components/ProjectsPage';
import PageNav from './components/PageNav';

import { PROJECTS_DATA } from './data/portfolioData';
import { HOME, PAGES, parseRoute, routeUrl, takePendingSection } from './utils/route';

// Heavy pieces load after the first paint: three.js for the background, and the case study view.
const IsoScene = lazy(() => import('./components/IsoScene'));
const ActivitySection = lazy(() => import('./components/ActivitySection'));
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
/* The building is the centrepiece in the lobby, then steps back so it never competes with text and charts. */
function useBuildingOpacity() {
  const { scrollY } = useScroll();
  return useTransform(scrollY, [0, 500], [0.6, 0.14]);
}

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
   MAIN APP
   ═══════════════════════════════════════ */
export default function App() {
  const lenisRef = useRef(null);
  const buildingOpacity = useBuildingOpacity();
  const [activeModalProject, setActiveModalProject] = useState(null);
  // Which page is showing: the long home page, or one of the dedicated pages the navbar links to.
  const [route, setRoute] = useState(() => parseRoute());
  // Bumped every time a case study closes: remounting <main> replays every entrance animation,
  // which otherwise only run once per page load.
  const [homeKey, setHomeKey] = useState(0);
  // Where the visitor was on the page when a case study opened, so closing it returns them there.
  const savedScroll = useRef(0);
  // Mount the 3D background only once the browser is idle, so it never delays the hero.
  const [show3D, setShow3D] = useState(false);
  useEffect(() => {
    // Phones skip the 3D building entirely: no three.js download, no GPU work. The hero draws a CSS version.
    if (window.matchMedia('(max-width: 767px)').matches) return undefined;
    const start = () => setShow3D(true);
    const id = 'requestIdleCallback' in window ? window.requestIdleCallback(start, { timeout: 2500 }) : setTimeout(start, 1200);
    return () => ('requestIdleCallback' in window ? window.cancelIdleCallback(id) : clearTimeout(id));
  }, []);

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
    const y = section ? (document.getElementById(section)?.offsetTop ?? 0) : 0;
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

      {/* ── THE BUILDING: a monochrome isometric wireframe that loops forever and turns as you scroll ── */}
      {show3D && (
        <motion.div
          aria-hidden="true"
          className={`fixed top-0 right-0 h-[100svh] w-[62vw] pointer-events-none z-0 ${route === HOME ? '' : 'hidden'}`}
          style={{
            opacity: buildingOpacity,
            maskImage: 'radial-gradient(ellipse 70% 65% at 55% 50%, #000 35%, transparent 100%)',
            WebkitMaskImage: 'radial-gradient(ellipse 70% 65% at 55% 50%, #000 35%, transparent 100%)',
          }}
        >
          <Suspense fallback={null}>
            <IsoScene paused={!!activeModalProject || route !== HOME} />
          </Suspense>
        </motion.div>
      )}

      {/* Navigation */}
      <Navbar route={route} />
      {route === HOME && <SectionNav />}

      {/* Main Content Flow */}
      <PresenceContext.Provider value={IS_PHONE && homeKey === 0 ? NO_INTRO : null}>
      <main key={`${route}-${homeKey}`} className="relative z-10 w-full overflow-x-clip">
        {route === HOME ? (
          <>
            {/* 1. Hero Section */}
            <Hero />

            {/* The page is a walk through rooms. Rooms turn into view from different angles; the two
                galleries (projects, tech stack) hold the page until you have been through every frame. */}
            <About />
            <WorkGallery onOpenProject={handleOpenProject} />
            <StackGallery />
            <Suspense fallback={<div className="min-h-screen" />}>
              <ActivitySection onOpenProject={handleOpenProject} />
              <CredentialsSection compact />
              <ScopeInquiryDrawer compact />
            </Suspense>
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
