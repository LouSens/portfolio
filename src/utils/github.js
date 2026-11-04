import { GITHUB_USER } from '../data/portfolioData';

/* GitHub numbers, fetched in the visitor's browser from public endpoints (no token, nothing secret).

   Pipeline:
     1. EXTRACT   profile, repositories, per-repository language bytes, commit and pull request counts
                  (GitHub REST), and the daily contribution calendar (a public mirror of the profile graph,
                  because the REST API does not expose the calendar).
     2. CLEAN     drop forks and empty repositories from language totals, ignore failed calls individually
                  so one rate-limited endpoint never blanks the whole section.
     3. TRANSFORM weekly grid for the heatmap, monthly totals, streaks, busiest weekday, language shares.
     4. CACHE     localStorage for 30 minutes, served immediately while a fresh copy loads in the background.
   Unauthenticated GitHub calls are limited to 60 per hour per visitor, so the cache matters. */

const API = 'https://api.github.com';
const CAL = `https://github-contributions-api.jogruber.de/v4/${GITHUB_USER}?y=last`;
const CACHE_KEY = `dk-github-${GITHUB_USER}-v2`;
const TTL = 30 * 60 * 1000;

const j = async (url, signal) => {
  const r = await fetch(url, { signal, headers: { Accept: 'application/vnd.github+json' } });
  if (!r.ok) throw new Error(`${r.status} ${url}`);
  return r.json();
};
const safe = (p) => p.catch(() => null);

/* Commits by the user in one repository: ask for one commit per page and read the page count from the Link header. */
async function commitCount(name, signal) {
  const r = await fetch(`${API}/repos/${GITHUB_USER}/${name}/commits?author=${GITHUB_USER}&per_page=1`, { signal, headers: { Accept: 'application/vnd.github+json' } });
  if (!r.ok) return null;
  const last = /[?&]page=(\d+)>; rel="last"/.exec(r.headers.get('link') || '');
  if (last) return Number(last[1]);
  const body = await r.json();
  return Array.isArray(body) ? body.length : null;
}

export function readCache() {
  try {
    const raw = JSON.parse(localStorage.getItem(CACHE_KEY) || 'null');
    return raw && raw.data ? raw : null;
  } catch {
    return null;
  }
}
const writeCache = (data) => {
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify({ at: Date.now(), data }));
  } catch {
    /* storage full or blocked: fine, just refetch next time */
  }
};
export const isFresh = (c) => c && Date.now() - c.at < TTL;

/* ─── transforms (pure, so they can be tested on their own) ─── */

export function summariseCalendar(days) {
  if (!days?.length) return null;
  const sorted = [...days].sort((a, b) => a.date.localeCompare(b.date));
  const total = sorted.reduce((n, d) => n + d.count, 0);
  const active = sorted.filter((d) => d.count > 0);

  let longest = 0;
  let run = 0;
  sorted.forEach((d) => {
    run = d.count > 0 ? run + 1 : 0;
    longest = Math.max(longest, run);
  });
  // Current streak: counted back from today, allowing today itself to still be empty.
  let current = 0;
  for (let i = sorted.length - 1; i >= 0; i--) {
    if (sorted[i].count > 0) current++;
    else if (i === sorted.length - 1) continue;
    else break;
  }

  const byMonth = new Map();
  const byWeekday = Array(7).fill(0);
  sorted.forEach((d) => {
    const key = d.date.slice(0, 7);
    byMonth.set(key, (byMonth.get(key) || 0) + d.count);
    byWeekday[new Date(`${d.date}T00:00:00Z`).getUTCDay()] += d.count;
  });
  const months = [...byMonth.entries()].map(([key, count]) => ({ key, count }));
  const best = sorted.reduce((a, b) => (b.count > a.count ? b : a), sorted[0]);

  // Weeks of 7 (Sunday first), padded at the start so columns line up with weekdays.
  const first = new Date(`${sorted[0].date}T00:00:00Z`).getUTCDay();
  const cells = [...Array(first).fill(null), ...sorted];
  const weeks = [];
  for (let i = 0; i < cells.length; i += 7) weeks.push(cells.slice(i, i + 7));

  return {
    total,
    activeDays: active.length,
    longest,
    current,
    perActiveDay: active.length ? total / active.length : 0,
    months,
    weeks,
    byWeekday,
    busiestWeekday: byWeekday.indexOf(Math.max(...byWeekday)),
    best,
    from: sorted[0].date,
    to: sorted[sorted.length - 1].date,
  };
}

export function summariseLanguages(langBytes) {
  const entries = Object.entries(langBytes).sort((a, b) => b[1] - a[1]);
  const sum = entries.reduce((n, [, b]) => n + b, 0);
  if (!sum) return [];
  return entries.map(([name, bytes]) => ({ name, bytes, share: bytes / sum }));
}

/* ─── the fetch ─── */

export async function fetchGitHub(signal) {
  const [profile, repos, commits, prs, cal] = await Promise.all([
    safe(j(`${API}/users/${GITHUB_USER}`, signal)),
    safe(j(`${API}/users/${GITHUB_USER}/repos?per_page=100&sort=pushed`, signal)),
    safe(j(`${API}/search/commits?q=author:${GITHUB_USER}&per_page=1`, signal)),
    safe(j(`${API}/search/issues?q=author:${GITHUB_USER}+type:pr&per_page=1`, signal)),
    safe(j(CAL, signal)),
  ]);

  const own = (repos || []).filter((r) => !r.fork);
  // Language bytes per repository, a few at a time. Missing ones fall back to the repo's main language.
  const langBytes = {};
  const langRepos = {};
  const queue = own.filter((r) => r.size > 0).slice(0, 40);
  const worker = async () => {
    while (queue.length) {
      const r = queue.shift();
      const l = await safe(j(`${API}/repos/${GITHUB_USER}/${r.name}/languages`, signal));
      const entries = l && Object.keys(l).length ? Object.entries(l) : r.language ? [[r.language, Math.max(r.size, 1) * 1024]] : [];
      entries.forEach(([name, bytes]) => {
        langBytes[name] = (langBytes[name] || 0) + bytes;
        langRepos[name] = (langRepos[name] || 0) + 1;
      });
    }
  };
  await Promise.all([worker(), worker(), worker(), worker()]);

  // Commits per repository, for the bar chart
  const repoCommits = {};
  const cq = own.slice(0, 14);
  const cworker = async () => {
    while (cq.length) {
      const r = cq.shift();
      const n = await safe(commitCount(r.name, signal));
      if (n != null) repoCommits[r.name.toLowerCase()] = n;
    }
  };
  await Promise.all([cworker(), cworker(), cworker()]);

  const days = cal?.contributions?.map((d) => ({ date: d.date, count: d.count, level: d.level })) || null;

  const data = {
    fetchedAt: Date.now(),
    profile: profile && {
      followers: profile.followers,
      following: profile.following,
      publicRepos: profile.public_repos,
      createdAt: profile.created_at,
      url: profile.html_url,
    },
    repos: own.map((r) => ({
      name: r.name,
      url: r.html_url,
      description: r.description,
      language: r.language,
      stars: r.stargazers_count,
      forks: r.forks_count,
      pushedAt: r.pushed_at,
      topics: r.topics || [],
    })),
    stars: own.reduce((n, r) => n + r.stargazers_count, 0),
    commits: commits?.total_count ?? null,
    repoCommits,
    pullRequests: prs?.total_count ?? null,
    languages: summariseLanguages(langBytes).map((l) => ({ ...l, repos: langRepos[l.name] })),
    calendar: summariseCalendar(days),
    calendarTotal: cal?.total ? Object.values(cal.total).slice(-1)[0] : null,
  };

  // Nothing came back at all: do not cache an empty result.
  const got = data.profile || data.repos.length || data.calendar || data.commits;
  if (!got) throw new Error('GitHub unreachable');
  writeCache(data);
  return data;
}
