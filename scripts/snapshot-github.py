#!/usr/bin/env python3
"""Build src/data/githubSnapshot.json from the git history of local clones.

The Numbers section shows this snapshot immediately and replaces it with live GitHub data when the browser can
reach the API. Re-run it whenever you like:

    python3 scripts/snapshot-github.py ~/code/portfolio ~/code/RADAR ... --email you@example.com

Pipeline: EXTRACT commits by author email per repo (git log) -> CLEAN (dedupe by hash, ignore other authors)
-> TRANSFORM daily counts for the last 12 months, per-repo totals, language share by tracked file size
-> WRITE JSON. Nothing here needs network access or a token."""
import argparse, collections, datetime as dt, json, os, subprocess, sys

LANG = {'.py': 'Python', '.ts': 'TypeScript', '.tsx': 'TypeScript', '.js': 'JavaScript', '.jsx': 'JavaScript', '.mjs': 'JavaScript',
        '.html': 'HTML', '.css': 'CSS', '.sql': 'SQL', '.cs': 'C#', '.cpp': 'C++', '.cc': 'C++', '.h': 'C++', '.c': 'C', '.luau': 'Luau',
        '.lua': 'Lua', '.sh': 'Shell', '.toml': None, '.yml': None, '.yaml': None}
SKIP = ('node_modules/', 'dist/', 'build/', '.git/', 'package-lock.json', 'pnpm-lock', 'uv.lock', 'Packages/', 'dpickleball-ml-agents/')


def git(repo, *args):
    return subprocess.run(['git', '-C', repo, *args], capture_output=True, text=True, check=False).stdout


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('repos', nargs='+')
    ap.add_argument('--email', required=True)
    ap.add_argument('--out', default=os.path.join(os.path.dirname(__file__), '..', 'src', 'data', 'githubSnapshot.json'))
    ap.add_argument('--today', default=dt.date.today().isoformat())
    a = ap.parse_args()
    today = dt.date.fromisoformat(a.today)
    start = today - dt.timedelta(days=364)

    seen, days, per_repo, lang_bytes = set(), collections.Counter(), [], collections.Counter()
    for repo in a.repos:
        name = os.path.basename(os.path.abspath(repo))
        out = git(repo, 'log', '--all', f'--author={a.email}', '--pretty=%H|%ad', '--date=format:%Y-%m-%d')
        mine = []
        for line in out.splitlines():
            h, d = line.split('|')
            if h in seen:
                continue
            seen.add(h)
            mine.append(d)
        if not mine:
            continue
        for d in mine:
            if start.isoformat() <= d <= today.isoformat():
                days[d] += 1
        per_repo.append({'name': name, 'commits': len(mine), 'first': min(mine), 'last': max(mine)})
        for line in git(repo, 'ls-tree', '-r', '-l', 'HEAD').splitlines():
            meta, _, path = line.partition('\t')
            if any(s in path for s in SKIP):
                continue
            ext = os.path.splitext(path)[1].lower()
            lang = LANG.get(ext)
            if lang:
                lang_bytes[lang] += int(meta.split()[3]) if meta.split()[3].isdigit() else 0

    series = []
    d = start
    while d <= today:
        series.append({'date': d.isoformat(), 'count': days.get(d.isoformat(), 0)})
        d += dt.timedelta(days=1)
    top = sorted({s['count'] for s in series if s['count']})
    def level(c):
        if not c:
            return 0
        q = (top.index(c) + 1) / len(top)
        return 1 if q <= 0.25 else 2 if q <= 0.5 else 3 if q <= 0.75 else 4
    for s in series:
        s['level'] = level(s['count'])

    per_repo.sort(key=lambda r: r['last'], reverse=True)
    total_lang = sum(lang_bytes.values()) or 1
    data = {
        'generatedAt': today.isoformat(),
        'commits': sum(r['commits'] for r in per_repo),
        'commitsLastYear': sum(s['count'] for s in series),
        'repositories': len(per_repo),
        'firstCommit': min(r['first'] for r in per_repo),
        'days': series,
        'repos': per_repo,
        'languages': [{'name': k, 'bytes': v, 'share': v / total_lang} for k, v in lang_bytes.most_common()],
    }
    with open(a.out, 'w') as f:
        json.dump(data, f, separators=(',', ':'))
    print(f"{data['commits']} commits in {data['repositories']} repos; {data['commitsLastYear']} in the last year -> {a.out}")


if __name__ == '__main__':
    sys.exit(main())
