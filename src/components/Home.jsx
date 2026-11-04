import React, { lazy, Suspense, useEffect } from 'react';
import Hero from './Hero';
import About from './About';
import ProjectsNetflix from './ProjectsNetflix';
import StackBench from './StackBench';
import { setActiveRoom } from '../utils/roomStore';

const ResultsRoom = lazy(() => import('./ActivitySection').then((m) => ({ default: m.ResultsRoom })));
const KpiRoom = lazy(() => import('./ActivitySection').then((m) => ({ default: m.KpiRoom })));
const GithubRoom = lazy(() => import('./ActivitySection').then((m) => ({ default: m.GithubRoom })));
const PhotoStrip = lazy(() => import('./PhotoStrip'));
const CredentialsSection = lazy(() => import('./CredentialsSection'));
const ScopeInquiryDrawer = lazy(() => import('./ScopeInquiryDrawer'));

const IDS = ['about', 'work', 'stack', 'activity', 'github', 'moments', 'awards', 'inquire'];

/* The home page: one calm vertical scroll. Each section has its own look; sideways movement happens only inside rows
   you drag or swipe (projects, KPIs, photos). Nothing is pinned and nothing takes over the scroll. */
export default function Home({ onOpenProject }) {
  // Tell the navbar which section is in front of you
  useEffect(() => {
    const io = new IntersectionObserver((entries) => entries.forEach((e) => e.isIntersecting && setActiveRoom(e.target.id)), {
      rootMargin: '-40% 0px -55% 0px',
    });
    IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    // Sections that load later are picked up once they exist
    const retry = setTimeout(() => IDS.forEach((id) => document.getElementById(id) && io.observe(document.getElementById(id))), 1200);
    return () => {
      clearTimeout(retry);
      io.disconnect();
    };
  }, []);

  const section = 'scroll-mt-20 border-t border-white/[0.06]';
  return (
    <>
      <Hero />
      <section id="about" className={section}>
        <About />
      </section>
      <section id="work" className={section}>
        <ProjectsNetflix onOpenProject={onOpenProject} />
      </section>
      <section id="stack" className={section}>
        <StackBench />
      </section>
      <Suspense fallback={<div className="min-h-[50svh]" />}>
        <section id="activity" className={section}>
          <ResultsRoom />
          <KpiRoom onOpenProject={onOpenProject} />
        </section>
        <section id="github" className="scroll-mt-20">
          <GithubRoom near />
        </section>
        <section id="moments" className={section}>
          <PhotoStrip />
        </section>
        <CredentialsSection compact />
        <ScopeInquiryDrawer compact />
      </Suspense>
    </>
  );
}
