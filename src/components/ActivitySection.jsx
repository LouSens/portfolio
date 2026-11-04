import React, { useEffect, useMemo, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import SectionLabel from './SectionLabel';
import { GITHUB_USER } from '../data/portfolioData';
import { fetchGitHub, readCache, isFresh, summariseCalendar } from '../utils/github';
import SNAPSHOT from '../data/githubSnapshot.json';

/* The GitHub section: a day-by-day activity map, commits per repository and languages. */

const WEEKDAYS = ['Sundays', 'Mondays', 'Tuesdays', 'Wednesdays', 'Thursdays', 'Fridays', 'Saturdays'];
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const nf = (n) => (typeof n === 'number' ? n.toLocaleString('en-US') : '–');

/* ─── charts: plain SVG, so they follow the theme and weigh nothing ─── */

function Heatmap({ calendar }) {
  const cell = 11;
  const gap = 3;
  const left = 28;
  const top = 18;
  const weeks = calendar.weeks;
  const w = left + weeks.length * (cell + gap);
  const h = top + 7 * (cell + gap);
  const fills = ['rgb(var(--fg) / 0.07)', 'rgb(var(--accent-rgb) / 0.3)', 'rgb(var(--accent-rgb) / 0.55)', 'rgb(var(--accent-rgb) / 0.8)', 'rgb(var(--accent-rgb) / 1)'];
  let lastMonth = -1;
  return (
    <div className="overflow-x-auto no-scrollbar -mx-1 px-1">
      <svg viewBox={`0 0 ${w} ${h}`} className="w-full min-w-[640px] h-auto" role="img" aria-label={`${nf(calendar.total)} contributions in the last year`}>
        {['Mon', 'Wed', 'Fri'].map((d, i) => (
          <text key={d} x={0} y={top + (i * 2 + 1) * (cell + gap) + cell - 2} fontSize="9" fill="rgb(var(--fg) / 0.4)">{d}</text>
        ))}
        {weeks.map((wk, x) => {
          const first = wk.find(Boolean);
          const m = first ? Number(first.date.slice(5, 7)) - 1 : -1;
          const label = m !== lastMonth && first && first.date.slice(8, 10) <= '14' ? MONTHS[m] : null;
          if (label) lastMonth = m;
          return (
            <g key={x}>
              {label && <text x={left + x * (cell + gap)} y={10} fontSize="9" fill="rgb(var(--fg) / 0.45)">{label}</text>}
              {wk.map((d, y) =>
                d ? (
                  <rect key={y} x={left + x * (cell + gap)} y={top + y * (cell + gap)} width={cell} height={cell} rx="2.5" fill={fills[d.level ?? (d.count ? 2 : 0)]}>
                    <title>{`${d.count} contribution${d.count === 1 ? '' : 's'} on ${d.date}`}</title>
                  </rect>
                ) : null
              )}
            </g>
          );
        })}
      </svg>
    </div>
  );
}

function MonthBars({ months }) {
  const max = Math.max(1, ...months.map((m) => m.count));
  return (
    <div className="flex items-end gap-1.5 md:gap-2 h-32" role="img" aria-label="Contributions per month">
      {months.map((m) => {
        const mi = Number(m.key.slice(5, 7)) - 1;
        return (
          <div key={m.key} className="flex-1 min-w-0 flex flex-col items-center justify-end h-full" title={`${MONTHS[mi]} ${m.key.slice(0, 4)}: ${m.count}`}>
            <span className="text-[10px] text-white/45 tabular-nums mb-1">{m.count}</span>
            <span className="w-full rounded-t-md bg-accent/80" style={{ height: `${Math.max(3, Math.round((m.count / max) * 72))}px` }} />
            <span className="mt-1.5 text-[10px] text-white/45">{MONTHS[mi]}</span>
          </div>
        );
      })}
    </div>
  );
}

function Languages({ languages }) {
  const top = languages.slice(0, 8);
  const rest = languages.slice(8).reduce((n, l) => n + l.share, 0);
  const shade = (i) => (i === 0 ? 'var(--accent)' : `rgb(var(--fg) / ${Math.max(0.12, 0.62 - i * 0.07)})`);
  return (
    <div>
      <div className="flex h-3 rounded-full overflow-hidden bg-white/[0.06]" role="img" aria-label="Language share by code size">
        {top.map((l, i) => (
          <span key={l.name} style={{ width: `${l.share * 100}%`, background: shade(i) }} title={`${l.name} ${(l.share * 100).toFixed(1)}%`} />
        ))}
        {rest > 0 && <span style={{ width: `${rest * 100}%`, background: 'rgb(var(--fg) / 0.1)' }} />}
      </div>
      <ul className="mt-4 grid grid-cols-2 gap-x-6 gap-y-2 text-sm">
        {top.map((l, i) => (
          <li key={l.name} className="flex items-center gap-2.5 min-w-0">
            <span className="w-2.5 h-2.5 rounded-sm shrink-0" style={{ background: shade(i) }} />
            <span className="text-white/85 truncate">{l.name}</span>
            <span className="ml-auto text-white/45 tabular-nums text-xs">{(l.share * 100).toFixed(1)}%</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ─── GitHub block ─── */

const REPO_NAMES = {
  'neural-void': 'NeuralVoid',
  adept: 'Adept',
  'gold-price-forecast-arima-lstm': 'Gold Forecast',
  'movie-recommendation-system-ml': 'Movie Recommender',
  'Recurrent-PPO-dPickleBall': 'dPickleBall',
  'IndoLegal-LLM': 'IndoLegal-LLM',
  'Face-Mask-Detection': 'Face Mask',
  'Heart-Disease-Prediction': 'Heart Disease',
  'Handwritten-Digit-Recognition': 'MNIST Digits',
  'Hospital-Management-System': 'Hospital System',
  'Hotel-Management-System-using-C-Programming': 'Hotel System',
  'nlp-corpus': 'NLP Corpus',
};
const repoName = (n) => REPO_NAMES[n] || n;

/* Commits per repository: horizontal bars, longest first */
function RepoBars({ repos }) {
  const top = [...repos].sort((a, b) => b.commits - a.commits).slice(0, 8);
  const max = Math.max(1, top[0]?.commits || 1);
  return (
    <ul className="space-y-3" aria-label="Commits per repository">
      {top.map((r) => (
        <li key={r.name} className="grid grid-cols-[7.5rem_1fr_2.5rem] items-center gap-3 text-sm" title={`${r.commits} commits`}>
          <span className="truncate text-white/80">{repoName(r.name)}</span>
          <span className="h-2 rounded-full bg-white/[0.06] overflow-hidden">
            <span className="block h-full rounded-full bg-accent" style={{ width: `${Math.max(3, (r.commits / max) * 100)}%` }} />
          </span>
          <span className="text-right text-xs tabular-nums text-white/50">{r.commits}</span>
        </li>
      ))}
    </ul>
  );
}

/* The numbers come from two places. The snapshot (built from git history, shipped with the site) is there at once,
   so the section never waits or goes blank. Live GitHub data replaces it when the browser can reach the API, and the
   last live copy is kept in the browser. If GitHub is rate limited, the section simply keeps what it has. */
function GitHubBlock({ near }) {
  const [live, setLive] = useState(() => readCache()?.data || null);
  // Start once the room has been reached, and keep going if you scroll on
  const [started, setStarted] = useState(false);
  useEffect(() => {
    if (near) setStarted(true);
  }, [near]);

  useEffect(() => {
    if (!started) return undefined;
    const cached = readCache();
    if (cached && isFresh(cached)) {
      setLive(cached.data);
      return undefined;
    }
    const ctl = new AbortController();
    fetchGitHub(ctl.signal).then(setLive).catch(() => {});
    return () => ctl.abort();
  }, [started]);

  const snapCal = useMemo(() => summariseCalendar(SNAPSHOT.days), []);
  const cal = live?.calendar || snapCal;
  const calLabel = live?.calendar ? 'Contributions' : 'Commits';
  const commits = live?.commits ?? SNAPSHOT.commits;
  const repoCount = live?.profile?.publicRepos ?? SNAPSHOT.repositories;
  const languages = live?.languages?.length ? live.languages : SNAPSHOT.languages;
  const recent = (live?.repos?.length ? live.repos.map((r) => ({ name: r.name, url: r.url, language: r.language, last: r.pushedAt })) : SNAPSHOT.repos.map((r) => ({ name: r.name, url: `https://github.com/${GITHUB_USER}/${r.name}`, last: r.last }))).slice(0, 6);
  const since = live?.profile?.createdAt ? new Date(live.profile.createdAt).getFullYear() : new Date(SNAPSHOT.firstCommit).getFullYear();
  const updated = new Date(live?.fetchedAt || SNAPSHOT.generatedAt);

  return (
    <div>
      {/* Bento: a headline tile beside the activity map, then repositories and languages, then recent work */}
      <div className="grid md:grid-cols-12 gap-4 md:gap-5">
        <div className="md:col-span-4 rounded-2xl bg-accent p-5 md:p-7 flex flex-col justify-between gap-6">
          <p className="text-sm text-white/80">Commits since {since}</p>
          <div>
            <p className="font-display font-extrabold text-5xl md:text-6xl text-white tracking-tight leading-none">{nf(commits)}</p>
            <p className="mt-3 text-sm text-white/85 leading-snug">across {nf(repoCount)} repositories. Longest streak: {cal.longest} days.</p>
          </div>
        </div>

        <div className="md:col-span-8 rounded-2xl border border-white/[0.1] bg-white/[0.02] p-5 md:p-7">
          <div className="flex flex-wrap items-baseline justify-between gap-2 mb-4">
            <h4 className="font-display font-semibold text-white">{calLabel} by day</h4>
            <p className="text-xs text-white/45">{cal.from} to {cal.to}</p>
          </div>
          <Heatmap calendar={cal} />
        </div>

        <div className="md:col-span-7 rounded-2xl border border-white/[0.1] bg-white/[0.02] p-5 md:p-7">
          <h4 className="font-display font-semibold text-white mb-4">Commits by repository</h4>
          <RepoBars repos={SNAPSHOT.repos} />
        </div>
        <div className="md:col-span-5 rounded-2xl border border-white/[0.1] bg-white/[0.02] p-5 md:p-7">
          <h4 className="font-display font-semibold text-white mb-4">Languages</h4>
          <Languages languages={languages} />
        </div>

        <div className="md:col-span-12 rounded-2xl border border-white/[0.1] bg-white/[0.02] p-5 md:p-7">
          <h4 className="font-display font-semibold text-white">Recently active</h4>
          <ul className="mt-2 grid md:grid-cols-3 gap-x-8 divide-y md:divide-y-0 divide-white/[0.08]">
            {recent.map((r) => (
              <li key={r.name}>
                <a href={r.url} target="_blank" rel="noreferrer" className="group flex items-center gap-3 py-2.5 text-sm">
                  <span className="text-white/90 group-hover:text-[var(--accent)] transition-colors truncate">{repoName(r.name)}</span>
                  {r.language && <span className="text-xs text-white/40 shrink-0">{r.language}</span>}
                  <span className="ml-auto text-xs text-white/40 tabular-nums shrink-0">{new Date(r.last).toLocaleDateString('en-GB', { month: 'short', year: 'numeric' })}</span>
                  <ArrowUpRight size={13} className="text-white/30 group-hover:text-[var(--accent)] shrink-0" />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <p className="mt-5 text-xs text-white/40 flex flex-wrap items-center gap-x-3">
        <span>Updated {updated.toLocaleDateString('en-GB', { dateStyle: 'medium' })}</span>
        <a href={`https://github.com/${GITHUB_USER}`} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-white/60 hover:text-white">
          github.com/{GITHUB_USER} <ArrowUpRight size={11} />
        </a>
      </p>
    </div>
  );
}

/* ─── room ─── */

export function GithubRoom({ near }) {
  return (
    <div className="stage stage-bleed px-5 sm:px-10 md:px-14 py-10 md:py-14">
      <div className="absolute inset-0 stage-glow pointer-events-none" aria-hidden="true" />
      <div className="relative max-w-[1100px] mx-auto">
        <SectionLabel label="GitHub" />
        <h2 className="font-display font-extrabold text-fluid-h2 text-white tracking-tight leading-[1.1]">
          Steady work, <span className="text-[var(--accent)]">in the open</span>
        </h2>
        <div className="mt-8">
          <GitHubBlock near={near} />
        </div>
      </div>
    </div>
  );
}
