import React, { useState, useEffect, useLayoutEffect, useRef, lazy, Suspense } from 'react';
import { motion, useScroll, PresenceContext } from 'framer-motion';
import Lenis from 'lenis';

// Modular Components
import Navbar from './components/Navbar';
import Home from './components/Home';
import Footer from './components/Footer';
import CursorGlow from './components/CursorGlow';
import ProjectsPage from './components/ProjectsPage';
import PageNav from './components/PageNav';

import { PROJECTS_DATA } from './data/portfolioData';
import { HOME, PAGES, parseRoute, routeUrl, takePendingSection } from './utils/route';

// Heavy pieces load after the first paint: three.js for the background, and the case study view.
const ProjectDetailModal = lazy(() => import('./components/ProjectDetailModal'));
// Below the fold: fetched alongside the main script, rendered once the hero is already on screen.
const CredentialsSection = lazy(() => import('./components/CredentialsSection'));

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
    const jump = () => {
      const el = section && document.getElementById(section);
      const y = el ? el.getBoundingClientRect().top + window.scrollY : 0;
      window.scrollTo({ top: y, behavior: 'instant' });
      lenisRef.current?.scrollTo(y, { immediate: true, force: true });
    };
    jump();
    // The 3D page settles its room heights a moment after it mounts, so land again once it has
    if (!section) return undefined;
    const timers = [250, 800, 1600].map((ms) => setTimeout(jump, ms));
    return () => timers.forEach(clearTimeout);
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

      {/* Main Content Flow */}
      <PresenceContext.Provider value={IS_PHONE && homeKey === 0 ? NO_INTRO : null}>
      <main key={`${route}-${homeKey}`} className="relative z-10 w-full overflow-x-clip">
        {route === HOME ? (
          <>
            <Home onOpenProject={handleOpenProject} />
          </>
        ) : (
          // Dedicated pages: one part of the home page in full, clear of the floating navbar.
          <div className="pt-24 min-h-screen">
            {route === 'projects' && <ProjectsPage onOpenProject={handleOpenProject} />}
            <Suspense fallback={<div className="min-h-screen" />}>
              {route === 'awards' && <CredentialsSection />}
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
