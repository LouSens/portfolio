import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import Lenis from 'lenis';

// Modular Components
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Marquee from './components/Marquee';
import ServicesSection from './components/ServicesSection';
import NetflixProjectsHub from './components/NetflixProjectsHub';
import ProjectDetailModal from './components/ProjectDetailModal';
import TechStackMatrix from './components/TechStackMatrix';
import ExperienceTimeline from './components/ExperienceTimeline';
import CredentialsSection from './components/CredentialsSection';
import ScopeInquiryDrawer from './components/ScopeInquiryDrawer';
import Footer from './components/Footer';

import { PROJECTS_DATA } from './data/portfolioData';

/* ═══════════════════════════════════════
   THREE.JS PARTICLE FIELD
   ═══════════════════════════════════════ */
function ParticleField() {
  const ref = useRef();

  const positions = React.useMemo(() => {
    const count = 2200;
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 14 * Math.cbrt(Math.random());
      const theta = Math.random() * 2 * Math.PI;
      const phi = Math.acos(2 * Math.random() - 1);
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);
    }
    return pos;
  }, []);

  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.y -= delta * 0.035;
      ref.current.rotation.x -= delta * 0.012;
    }
  });

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#FF5A36"
        size={0.04}
        sizeAttenuation={true}
        depthWrite={false}
        opacity={0.3}
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

  // Initialize Lenis Smooth Scroll
  useEffect(() => {
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

  // Deep linking: Open modal on URL hash #project=<id>
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
    setActiveModalProject(project);
    window.history.replaceState(null, '', `#project=${project.id}`);
  };

  const handleCloseProject = () => {
    setActiveModalProject(null);
    if (window.location.hash.startsWith('#project=')) {
      window.history.replaceState(null, '', window.location.pathname + window.location.search);
    }
  };

  return (
    <div className="relative min-h-screen bg-[#070709] text-[#f3f3f6] font-sans selection:bg-[var(--accent)]/30 selection:text-white">
      <ScrollProgress />

      {/* 3D WebGL particle field in Hero background */}
      <div
        className="absolute top-0 left-0 w-full pointer-events-none"
        style={{
          height: '110vh',
          zIndex: 0,
          maskImage: 'linear-gradient(to bottom, black 35%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to bottom, black 35%, transparent 100%)',
          opacity: 0.7,
        }}
      >
        <Canvas camera={{ position: [0, 0, 15] }}>
          <ParticleField />
        </Canvas>
      </div>

      {/* Navigation */}
      <Navbar />

      {/* Main Content Flow */}
      <main className="relative z-10 w-full overflow-hidden">
        {/* 1. Hero Section */}
        <Hero />

        {/* 2. Marquee Ticker */}
        <Marquee />

        {/* 3. Services / Capabilities */}
        <ServicesSection onOpenProject={handleOpenProject} />

        {/* 4. Projects Showcase & Catalog */}
        <NetflixProjectsHub onOpenProject={handleOpenProject} />

        {/* 5. Compact Tech Matrix */}
        <TechStackMatrix onOpenProject={handleOpenProject} />

        {/* 6. Engineering Timeline */}
        <ExperienceTimeline />

        {/* 7. Education & Awards */}
        <CredentialsSection />

        {/* 8. Flexible Contact & Inquiry */}
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
