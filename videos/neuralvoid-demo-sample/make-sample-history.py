# Writes a made-up TikTok "Watch History.txt" in the export format NeuralVoid parses, so the demo
# never uses a real person's history. Fixed seed: the same file every run.
import random
from datetime import datetime, timedelta

random.seed(7)
END = datetime(2026, 9, 28)
DAYS = 60
rows = []


def session(start, minutes):
    t = start
    end = start + timedelta(minutes=minutes)
    while t < end:
        rows.append(t)
        t += timedelta(seconds=random.randint(7, 26))


for d in range(DAYS):
    day = END - timedelta(days=DAYS - d)
    weekend = day.weekday() >= 5
    drift = d / DAYS  # the habit gets worse over the two months
    if random.random() < 0.55:
        session(day.replace(hour=7, minute=random.randint(5, 50)), random.randint(4, 14))
    for _ in range(random.randint(1, 3)):
        session(day.replace(hour=random.randint(11, 16), minute=random.randint(0, 59)), random.randint(3, 18))
    session(day.replace(hour=random.randint(19, 21), minute=random.randint(0, 59)), random.randint(15, 40 + int(25 * drift)))
    if random.random() < 0.35 + 0.5 * drift or weekend:
        session(day.replace(hour=23, minute=random.randint(0, 40)), random.randint(35, 70 + int(60 * drift)))

# The times above are local evenings and nights. The export is in UTC, so shift them back by the
# demo's time zone (UTC+8); the app, reading them in that zone, shows the same hours again.
rows = [t - timedelta(hours=8) for t in rows]
rows.sort(reverse=True)
ids = []
with open('Watch History.txt', 'w', encoding='utf-8', newline='\n') as f:
    for t in rows:
        # about 1 video in 12 is one already seen recently
        if ids and random.random() < 0.085:
            vid = random.choice(ids[-200:])
        else:
            vid = random.randint(7_400_000_000_000_000_000, 7_599_999_999_999_999_999)
        ids.append(vid)
        f.write('Date: %s UTC\nLink: https://www.tiktokv.com/share/video/%d/\n\n' % (t.strftime('%Y-%m-%d %H:%M:%S'), vid))
print(len(rows), 'clips over', DAYS, 'days')
