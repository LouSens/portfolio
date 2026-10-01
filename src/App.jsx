import React, { useState, useEffect, useLayoutEffect, useRef } from 'react';
import { motion, useScroll } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import Lenis from 'lenis';

// Modular Components
import Navbar from './components/Navbar';
import SectionNav from './components/SectionNav';
import Hero from './components/Hero';
import Marquee from './components/Marquee';
import About from './components/About';
import NetflixProjectsHub from './components/NetflixProjectsHub';
import ProjectDetailModal from './components/ProjectDetailModal';
import CredentialsSection from './components/CredentialsSection';
import ScopeInquiryDrawer from './components/ScopeInquiryDrawer';
import Footer from './components/Footer';
import CursorGlow from './components/CursorGlow';

import { PROJECTS_DATA } from './data/portfolioData';

/* ═══════════════════════════════════════
   THREE.JS HERO PARTICLE FIELD
   ═══════════════════════════════════════ */
function ParticleField() {
  const ref = useRef();
  const prefersReducedMotion = React.useMemo(
    () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    []
  );

  const positions = React.useMemo(() => {
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
    const count = isMobile ? 800 : 2000;
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = (isMobile ? 13 : 15) * Math.cbrt(Math.random());
      const theta = Math.random() * 2 * Math.PI;
      const phi = Math.acos(2 * Math.random() - 1);
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);
    }
    return pos;
  }, []);

  // Pointer position (-1..1) so the sphere leans toward the cursor. The canvas wrapper ignores
  // pointer events, so listen on the window instead.
  const pointer = useRef({ x: 0, y: 0 });
  useEffect(() => {
    const move = (e) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener('pointermove', move, { passive: true });
    return () => window.removeEventListener('pointermove', move);
  }, []);

  useFrame((state, delta) => {
    if (ref.current && !prefersReducedMotion) {
      ref.current.rotation.y -= delta * 0.035;
      ref.current.rotation.x -= delta * 0.012;
      // ease toward the cursor for a slight 3D parallax
      ref.current.position.x += (pointer.current.x * 1.1 - ref.current.position.x) * Math.min(1, delta * 2);
      ref.current.position.y += (-pointer.current.y * 0.7 - ref.current.position.y) * Math.min(1, delta * 2);
    }
  });

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#FF5A36"
        size={0.045}
        sizeAttenuation={true}
        depthWrite={false}
        opacity={0.35}
      />
    </Points>
  );
}

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

  // Initialize Lenis Smooth Scroll (skipped for users who prefer reduced motion)
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
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
        <Canvas
          frameloop={activeModalProject ? 'never' : 'always'}
          camera={{ position: [0, 0, 15] }}
          dpr={[1, 1.5]}
          gl={{ powerPreference: 'high-performance', antialias: false }}
        >
          <ParticleField />
        </Canvas>
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
        <ProjectDetailModal
          project={activeModalProject}
          projects={PROJECTS_DATA}
          onClose={handleCloseProject}
          onSelectProject={handleOpenProject}
        />
      )}
    </div>
  );
}
