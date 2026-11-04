import React, { lazy, Suspense, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import Hero from './Hero';
import About from './About';
import SectionLabel from './SectionLabel';
import StackGrid from './StackGrid';
import { ProjectCard } from './WorkGallery';
import { PROJECTS_DATA } from '../data/portfolioData';
import { navigate, routeUrl } from '../utils/route';
import { setActiveRoom } from '../utils/roomStore';

const ResultsRoom = lazy(() => import('./ActivitySection').then((m) => ({ default: m.ResultsRoom })));
const KpiRoom = lazy(() => import('./ActivitySection').then((m) => ({ default: m.KpiRoom })));
const GithubRoom = lazy(() => import('./ActivitySection').then((m) => ({ default: m.GithubRoom })));
const MomentsWall = lazy(() => import('./MomentsWall'));
const CredentialsSection = lazy(() => import('./CredentialsSection'));
const ScopeInquiryDrawer = lazy(() => import('./ScopeInquiryDrawer'));

const IDS = ['about', 'work', 'stack', 'activity', 'github', 'moments', 'awards', 'inquire'];

/* The home page on phones, tablets and for anyone who prefers calm: a plain page of sections. No 3D, no pinned scrolling,
   nothing heavy to load; the same content as the 3D version. */
export default function LightHome({ onOpenProject }) {
  // Tell the navbar which section is in front of you
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActiveRoom(e.target.id)),
      { rootMargin: '-45% 0px -50% 0px' }
    );
    IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, []);

  return (
    <>
      <Hero />
      <section id="about" className="scroll-mt-20 border-t border-white/[0.06]">
        <About />
      </section>

      <section id="work" className="scroll-mt-20 border-t border-white/[0.06] px-5 sm:px-8 py-14 md:py-20">
        <div className="max-w-[1100px] mx-auto">
          <SectionLabel label="Projects" />
          <h2 className="font-display font-extrabold text-fluid-h2 text-white tracking-tight leading-[1.1]">
            Selected <span className="text-[var(--accent)]">work</span>
          </h2>
          <div className="mt-8 grid gap-5 md:grid-cols-2">
            {PROJECTS_DATA.map((p) => (
              <ProjectCard key={p.id} project={p} onOpen={onOpenProject} layout="column" />
            ))}
          </div>
          <a
            href={routeUrl('projects')}
            onClick={(e) => {
              e.preventDefault();
              navigate('projects');
            }}
            className="mt-8 inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/[0.2] hover:border-[var(--accent)] text-sm font-semibold text-white transition-colors"
          >
            All projects <ArrowRight size={15} />
          </a>
        </div>
      </section>

      <section id="stack" className="scroll-mt-20 border-t border-white/[0.06]">
        <StackGrid />
      </section>

      <Suspense fallback={<div className="min-h-[60svh]" />}>
        <section id="activity" className="scroll-mt-20 border-t border-white/[0.06]">
          <ResultsRoom />
          <KpiRoom onOpenProject={onOpenProject} />
        </section>
        <section id="github" className="scroll-mt-20">
          <GithubRoom near />
        </section>
        <section id="moments" className="scroll-mt-20 border-t border-white/[0.06]">
          <MomentsWall />
        </section>
        <CredentialsSection compact />
        <ScopeInquiryDrawer compact />
      </Suspense>
    </>
  );
}
