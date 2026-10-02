import React, { useState, useEffect, useLayoutEffect, useRef, lazy, Suspense } from 'react';
import { motion, useScroll } from 'framer-motion';
import Lenis from 'lenis';

// Modular Components
import Navbar from './components/Navbar';
import SectionNav from './components/SectionNav';
import Hero from './components/Hero';
import Marquee from './components/Marquee';
import About from './components/About';
import NetflixProjectsHub from './components/NetflixProjectsHub';
import CredentialsSection from './components/CredentialsSection';
import ScopeInquiryDrawer from './components/ScopeInquiryDrawer';
import Footer from './components/Footer';
import CursorGlow from './components/CursorGlow';

import { PROJECTS_DATA } from './data/portfolioData';

// Heavy pieces load after the first paint: three.js for the background, and the case study view.
const ParticleCanvas = lazy(() => import('./components/ParticleCanvas'));
const ProjectDetailModal = lazy(() => import('./components/ProjectDetailModal'));

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
  // Bumped every time a case study closes: remounting <main> replays every entrance animation,
  // which otherwise only run once per page load. lastIndex keeps the carousel on the project just viewed.
  const [homeKey, setHomeKey] = useState(0);
  const [lastIndex, setLastIndex] = useState(0);
  // Where the visitor was on the page when a case study opened, so closing it returns them there.
  const savedScroll = useRef(0);
  // Mount the 3D background only once the browser is idle, so it never delays the hero.
  const [show3D, setShow3D] = useState(false);
  useEffect(() => {
    // Phones skip the 3D background entirely: no three.js download, no GPU work. The hero keeps its CSS glow.
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

  // Sync modal with URL hash
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash;
      if (hash.startsWith('#project=')) {
        const projectId = hash.replace('#project=', '').toLowerCase();
        const found = PROJECTS_DATA.find(
          (p) => p.id.toLowerCase() === projectId || p.slug.toLowerCase() === projectId
        );
        if (found) {
          setActiveModalProject(found);
        }
      }
    };

    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  const handleOpenProject = (project) => {
    if (!activeModalProject) savedScroll.current = window.scrollY;
    setActiveModalProject(project);
    setLastIndex(Math.max(0, PROJECTS_DATA.findIndex((p) => p.id === project.id)));
    window.history.replaceState(null, '', `#project=${project.id}`);
  };

  const handleCloseProject = () => {
    setActiveModalProject(null);
    setHomeKey((k) => k + 1);
    if (window.location.hash.startsWith('#project=')) {
      window.history.replaceState(null, '', window.location.pathname + window.location.search);
    }
  };

  return (
    <div className="relative min-h-screen bg-[#050508] text-[#f3f3f6] font-sans selection:bg-[var(--accent)]/30 selection:text-white overflow-x-hidden">
      <ScrollProgress />
      <CursorGlow />
      <div className="fixed inset-0 z-0 pointer-events-none bg-dots" aria-hidden="true" />

      {/* ── 3D WEBGL PARTICLE SPHERE (HERO ISOLATED CENTERPIECE) ── */}
      <div
        className="absolute top-0 left-0 w-full pointer-events-none z-0 overflow-hidden"
        style={{
          height: '100vh',
          maskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 40%, rgba(0,0,0,0) 100%)',
          WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 40%, rgba(0,0,0,0) 100%)',
        }}
      >
        {show3D && (
          <Suspense fallback={null}>
            <ParticleCanvas paused={!!activeModalProject} />
          </Suspense>
        )}
      </div>

      {/* Navigation */}
      <Navbar />
      <SectionNav />

      {/* Main Content Flow */}
      <main key={homeKey} className="relative z-10 w-full overflow-hidden">
        {/* 1. Hero Section */}
        <Hero />

        {/* 2. Marquee Ticker */}
        <Marquee />

        {/* 3. About */}
        <About />

        {/* 4. Projects Showcase & Catalog */}
        <NetflixProjectsHub onOpenProject={handleOpenProject} initialIndex={lastIndex} />

        {/* 6. Education & Awards */}
        <CredentialsSection />

        {/* 7. Flexible Contact & Inquiry */}
        <ScopeInquiryDrawer />
      </main>

      {/* Footer */}
      <Footer />

      {/* ── PROJECT DETAIL MODAL ── */}
      {activeModalProject && (
        <Suspense fallback={<div className="fixed inset-0 z-[100] bg-[#050508]" />}>
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
