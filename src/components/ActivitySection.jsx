import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useInView } from 'framer-motion';
import { ArrowUpRight, Github, RefreshCw, Star, GitCommitHorizontal, GitPullRequest, Flame, CalendarDays, FolderGit2 } from 'lucide-react';
import SectionLabel from './SectionLabel';
import CountUp from './ui/CountUp';
import { GITHUB_USER, KEY_NUMBERS, PERSONAL_INFO, PROJECTS_DATA, EARLIER_WORK } from '../data/portfolioData';
import { fetchGitHub, readCache, isFresh } from '../utils/github';

/* The Numbers room. Three blocks, each answering one question:
   1. Results          what the work achieved (figures that already appear in the project write-ups)
   2. Project KPIs     the headline numbers of each project, one row each
   3. GitHub           how much I build, live from GitHub (commits, activity, languages, repositories) */

const WEEKDAYS = ['Sundays', 'Mondays', 'Tuesdays', 'Wednesdays', 'Thursdays', 'Fridays', 'Saturdays'];
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const nf = (n) => (typeof n === 'number' ? n.toLocaleString('en-US') : '–');

function Block({ title, kicker, children, id }) {
  return (
    <div id={id} className="mt-14 md:mt-20 first:mt-0">
      <div className="flex items-end justify-between gap-4 mb-5 md:mb-7">
        <h3 className="font-display font-bold text-xl md:text-2xl text-white tracking-tight">{title}</h3>
        {kicker && <p className="text-xs text-white/45 text-right max-w-[50%]">{kicker}</p>}
      </div>
      {children}
    </div>
  );
}

function Tile({ icon: Icon, value, label, note, to, decimals, prefix, suffix }) {
  return (
    <div className="rounded-2xl border border-white/[0.1] bg-white/[0.02] p-4 md:p-5 min-w-0">
      {Icon && <Icon size={16} className="text-[var(--accent)] mb-3" />}
      <p className="font-display font-extrabold text-2xl md:text-3xl text-white tracking-tight leading-none">
        {typeof to === 'number' ? <CountUp to={to} decimals={decimals} prefix={prefix} suffix={suffix} /> : value}
      </p>
      <p className="mt-2 text-sm text-white/75 leading-snug">{label}</p>
      {note && <p className="mt-0.5 text-xs text-white/40 leading-snug">{note}</p>}
    </div>
  );
}

/* A two-part pill: muted label, strong value. Same idea as a README badge, drawn here so it matches the theme. */
function Badge({ label, value, accent = false }) {
  return (
    <span className="inline-flex items-stretch rounded-md overflow-hidden text-[11px] font-medium border border-white/[0.12]">
      <span className="px-2 py-1 bg-white/[0.06] text-white/65">{label}</span>
      <span className={`px-2 py-1 ${accent ? 'bg-[var(--accent)] text-white' : 'bg-white/[0.14] text-white'}`}>{value}</span>
    </span>
  );
}

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

function Skeleton({ className }) {
  return <div className={`rounded-2xl bg-white/[0.05] animate-pulse ${className}`} />;
}

/* ─── GitHub block ─── */

function GitHubBlock() {
  const ref = useRef(null);
  const near = useInView(ref, { once: true, margin: '500px 0px' });
  const [state, setState] = useState(() => ({ data: readCache()?.data || null, status: 'idle' }));
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    if (!near) return undefined;
    const cached = readCache();
    if (cached && isFresh(cached) && attempt === 0) {
      setState({ data: cached.data, status: 'ready' });
      return undefined;
    }
    const ctl = new AbortController();
    setState((s) => ({ ...s, status: 'loading' }));
    fetchGitHub(ctl.signal)
      .then((data) => setState({ data, status: 'ready' }))
      .catch((e) => {
        if (e.name !== 'AbortError') setState((s) => ({ ...s, status: s.data ? 'stale' : 'error' }));
      });
    return () => ctl.abort();
  }, [near, attempt]);

  const { data, status } = state;
  const cal = data?.calendar;
  const since = data?.profile?.createdAt ? new Date(data.profile.createdAt).getFullYear() : null;

  return (
    <div ref={ref}>
      {!data && status !== 'error' && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          {Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="h-28" />)}
          <Skeleton className="col-span-2 md:col-span-4 h-44" />
        </div>
      )}

      {status === 'error' && !data && (
        <div className="rounded-2xl border border-white/[0.12] p-6 md:p-8 flex flex-col sm:flex-row sm:items-center gap-4 justify-between">
          <div>
            <p className="text-white font-medium">GitHub numbers are not loading right now.</p>
            <p className="mt-1 text-sm text-white/55">GitHub limits how often a browser can ask. The profile has the live figures.</p>
          </div>
          <div className="flex gap-2">
            <button type="button" onClick={() => setAttempt((a) => a + 1)} className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/[0.2] text-sm text-white hover:border-[var(--accent)] cursor-pointer">
              <RefreshCw size={14} /> Try again
            </button>
            <a href={PERSONAL_INFO.github} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--accent)] text-white text-sm font-semibold">
              <Github size={14} /> Open profile
            </a>
          </div>
        </div>
      )}

      {data && (
        <>
          {/* Headline figures */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
            <Tile icon={GitCommitHorizontal} to={data.commits ?? undefined} value={nf(data.commits)} label="Public commits" note="all time" />
            <Tile icon={FolderGit2} to={data.profile?.publicRepos} value={nf(data.profile?.publicRepos)} label="Public repositories" note={data.languages.length ? `${data.languages.length} languages` : undefined} />
            <Tile icon={GitPullRequest} to={data.pullRequests ?? undefined} value={nf(data.pullRequests)} label="Pull requests" note="opened" />
            <Tile icon={Star} to={data.stars} value={nf(data.stars)} label="Stars received" note="on my own repos" />
            {cal && (
              <>
                <Tile icon={CalendarDays} to={cal.total} value={nf(cal.total)} label="Contributions" note="last 12 months" />
                <Tile icon={CalendarDays} to={cal.activeDays} value={nf(cal.activeDays)} label="Active days" note={`about ${cal.perActiveDay.toFixed(1)} per active day`} />
                <Tile icon={Flame} to={cal.longest} value={nf(cal.longest)} label="Longest streak" note={`days in a row · now ${cal.current}`} />
                <Tile icon={CalendarDays} value={WEEKDAYS[cal.busiestWeekday]} label="Busiest day" note={`best day: ${cal.best.count} on ${cal.best.date}`} />
              </>
            )}
          </div>

          {/* Activity */}
          {cal && (
            <div className="mt-4 md:mt-5 rounded-2xl border border-white/[0.1] bg-white/[0.02] p-5 md:p-7">
              <div className="flex flex-wrap items-baseline justify-between gap-2 mb-4">
                <h4 className="font-display font-semibold text-white">Activity, last 12 months</h4>
                <p className="text-xs text-white/45">{cal.from} to {cal.to}</p>
              </div>
              <Heatmap calendar={cal} />
              <div className="mt-6 pt-6 border-t border-white/[0.08]">
                <h4 className="font-display font-semibold text-white mb-4">Contributions per month</h4>
                <MonthBars months={cal.months.slice(-12)} />
              </div>
            </div>
          )}

          <div className="mt-4 md:mt-5 grid md:grid-cols-2 gap-4 md:gap-5">
            {/* Languages */}
            {data.languages.length > 0 && (
              <div className="rounded-2xl border border-white/[0.1] bg-white/[0.02] p-5 md:p-7">
                <h4 className="font-display font-semibold text-white">Languages</h4>
                <p className="text-xs text-white/45 mt-0.5 mb-4">By amount of code, across my own public repos</p>
                <Languages languages={data.languages} />
              </div>
            )}
            {/* Recently pushed repositories */}
            {data.repos.length > 0 && (
              <div className="rounded-2xl border border-white/[0.1] bg-white/[0.02] p-5 md:p-7">
                <h4 className="font-display font-semibold text-white">Recently active repositories</h4>
                <ul className="mt-3 divide-y divide-white/[0.08]">
                  {data.repos.slice(0, 6).map((r) => (
                    <li key={r.name}>
                      <a href={r.url} target="_blank" rel="noreferrer" className="group flex items-center gap-3 py-2.5 text-sm">
                        <span className="text-white/90 group-hover:text-[var(--accent)] transition-colors truncate">{r.name}</span>
                        {r.language && <span className="text-xs text-white/40 shrink-0">{r.language}</span>}
                        <span className="ml-auto text-xs text-white/40 tabular-nums shrink-0">{new Date(r.pushedAt).toLocaleDateString('en-GB', { month: 'short', year: 'numeric' })}</span>
                        <ArrowUpRight size={13} className="text-white/30 group-hover:text-[var(--accent)] shrink-0" />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Badges */}
          <div className="mt-5 flex flex-wrap gap-2" aria-label="GitHub badges">
            <Badge label="commits" value={nf(data.commits)} accent />
            <Badge label="repos" value={nf(data.profile?.publicRepos)} />
            <Badge label="stars" value={nf(data.stars)} />
            <Badge label="followers" value={nf(data.profile?.followers)} />
            <Badge label="PRs" value={nf(data.pullRequests)} />
            {cal && <Badge label="streak" value={`${cal.longest} days`} />}
            {since && <Badge label="on GitHub since" value={String(since)} />}
          </div>
          <p className="mt-3 text-xs text-white/40 flex flex-wrap items-center gap-x-2">
            <span>Live from GitHub, saved in your browser for 6 hours. Updated {new Date(data.fetchedAt).toLocaleString('en-GB', { dateStyle: 'medium', timeStyle: 'short' })}.</span>
            {status === 'stale' && <span className="text-[var(--accent)]">Showing saved numbers: GitHub did not answer.</span>}
            <a href={`https://github.com/${GITHUB_USER}`} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-white/60 hover:text-white">
              github.com/{GITHUB_USER} <ArrowUpRight size={11} />
            </a>
          </p>
        </>
      )}
    </div>
  );
}

/* ─── main ─── */

export default function ActivitySection({ onOpenProject }) {
  const projectRows = useMemo(
    () => PROJECTS_DATA.filter((p) => p.impactMetrics?.length).map((p) => ({ p, m: p.impactMetrics.slice(0, 3) })),
    []
  );
  const awards = [
    ['Finalist, top 15', 'SDC XMUM Hackathon 2026'],
    ['Top 80 of 2,000+', 'PIDI Digdaya 2026'],
    ['Silver', 'SEA-CICSIC 2026'],
    ['Top 24 of 100+', 'UMHackathon 2026'],
    ['3rd place', 'DPickleball AI'],
    ['Top 20%', 'WorldQuant IQC'],
    ['Gold', 'ONSK 2023 Physics'],
  ];

  return (
    <section id="activity" className="relative py-20 md:py-32 px-4 sm:px-6 md:px-8 border-t border-white/[0.06]">
      <div className="max-w-[1100px] mx-auto relative z-10">
        <div className="max-w-2xl mb-12 md:mb-16">
          <SectionLabel label="Numbers" />
          <h2 className="font-display font-extrabold text-fluid-h2 text-white tracking-tight leading-[1.1]">
            The work, <span className="text-[var(--accent)]">in numbers</span>
          </h2>
          <ul className="mt-5 space-y-2.5 text-[15px] text-white/70">
            <li className="flex gap-3"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-[var(--accent)] shrink-0" />Results from school, competitions and projects</li>
            <li className="flex gap-3"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-[var(--accent)] shrink-0" />The headline numbers of each project</li>
            <li className="flex gap-3"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-[var(--accent)] shrink-0" />Live GitHub activity: commits, streaks, languages</li>
          </ul>
        </div>

        <Block title="Results" kicker="Each one is explained in its project or on the Awards page">
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
            {KEY_NUMBERS.map((k) => (
              <Tile key={k.label} to={k.value} decimals={k.decimals} prefix={k.prefix} suffix={k.suffix} label={k.label} note={k.note} />
            ))}
          </div>
          <ul className="mt-4 flex flex-wrap gap-2">
            {awards.map(([v, l]) => <li key={l}><Badge label={l} value={v} accent={v.startsWith('Top 80') || v.startsWith('Finalist')} /></li>)}
          </ul>
        </Block>

        <Block title="Project KPIs" kicker="Press a row to open the project">
          <ul className="rounded-2xl border border-white/[0.1] divide-y divide-white/[0.08] overflow-hidden">
            {projectRows.map(({ p, m }) => (
              <li key={p.id}>
                <button
                  type="button"
                  onClick={() => onOpenProject(p)}
                  className="group w-full grid grid-cols-[1fr_auto] md:grid-cols-[220px_1fr_auto] items-center gap-x-6 gap-y-3 px-4 md:px-6 py-4 text-left hover:bg-white/[0.03] transition-colors cursor-pointer"
                >
                  <span className="min-w-0">
                    <span className="block font-display font-semibold text-white group-hover:text-[var(--accent)] transition-colors">{p.title}</span>
                    <span className="block text-xs text-white/45 truncate">{p.type}</span>
                  </span>
                  <ArrowUpRight size={16} className="text-white/30 group-hover:text-[var(--accent)] md:order-3" />
                  <span className="col-span-2 md:col-span-1 grid grid-cols-3 gap-4 min-w-0">
                    {m.map((x) => (
                      <span key={x.label} className="min-w-0">
                        <span className="block font-display font-bold text-base md:text-lg text-white tabular-nums truncate">{x.value}</span>
                        <span className="block text-[11px] text-white/45 leading-snug line-clamp-2">{x.label}</span>
                      </span>
                    ))}
                  </span>
                </button>
              </li>
            ))}
          </ul>
          <p className="mt-3 text-xs text-white/40">{EARLIER_WORK.length} smaller repositories are listed on the Projects page.</p>
        </Block>

        <Block title="GitHub" kicker="Live, from the public GitHub API" id="github">
          <GitHubBlock />
        </Block>
      </div>
    </section>
  );
}
