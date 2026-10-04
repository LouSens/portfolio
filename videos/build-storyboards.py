# Writes STORYBOARD.md and the storyboard.html review sheet for both demo videos from one plan,
# so the two never drift apart. Run from the repo root:  python videos/build-storyboards.py
import html, os

HERE = os.path.dirname(os.path.abspath(__file__))

# cursor / focus are positions inside the capture, in capture pixels
PLANS = {
    'kerjacerdas-demo': {
        'title': 'KerjaCerdas',
        'version': 'v2',
        'message': 'KerjaCerdas shows you which skills you are missing before you apply, then helps you close the gap',
        'audience': 'recruiters and engineers reading the KerjaCerdas case study',
        'arc': 'Promise → Pick a target → See the gap → Close it → Apply → Employer side → Sign-off',
        'shot': (1440, 900),
        'spine': 'One browser window that never leaves the frame. The real screens change inside it, a cursor makes the click that leads to the next screen, and the camera pushes toward the detail the caption names.',
        'truth': 'Every screen is a real capture of the app, signed in as the seeded demo seeker Maya Sari and the demo employer Klinik Sehat Keluarga. The cursor only points at controls that really exist and lead where the next screen shows. Nothing is rebuilt.',
        'held': 'frame 3, the missing-skill flag',
        'award': 'Finalist, Tier 3 Award · PIDI Digdaya x Hackathon 2026',
        'frames': [
            dict(id='01-promise', name='Promise', dur=3.5, img='landing.webp', kicker='', line='Stop applying blind.',
                 sub='KerjaCerdas shows what you are missing before you apply.', cursor=None, focus=None,
                 shape='device-surface-showcase (window rises in, static hold)', seam='cut in',
                 moves='The window rises into place and settles. The headline lands with it; the second line follows.',
                 why='States the value in the first beat, in the viewer\'s terms.'),
            dict(id='02-target', name='Pick a target', dur=4, img='seeker-dashboard.webp', kicker='01 · Pick a target', line='Ranked on what you can prove.',
                 sub='A skill counts for more once a quiz or an employer has backed it up.', cursor=(1300, 592), focus=(1050, 480),
                 shape='cursor-ui-demo + device-surface-showcase (screen swap)', seam='crossfade inside the window',
                 moves='Slow push toward the ranked list. The cursor glides to "Lihat detail & jadikan target" and clicks.',
                 why='Shows how matching works, and the click sets up the next screen.'),
            dict(id='03-gap', name='See the gap', dur=4.5, img='seeker-match.webp', kicker='02 · See the gap', line='You have 2 of 3 required skills.',
                 sub='The missing one is named, not buried in a score.', cursor=(790, 668), focus=(640, 560),
                 shape='cursor-ui-demo + punch-in, then a held frame', seam='crossfade inside the window',
                 moves='Punch in on the job card until the red "Kasir · Belum ada" chip is readable, hold for a full second, then the cursor clicks "Lihat rencana belajar".',
                 why='The core of the product: the gap is specific and visible.'),
            dict(id='04-close', name='Close it', dur=4, img='seeker-learning-plan.webp', kicker='03 · Close it', line='A learning plan for exactly that skill.',
                 sub='Courses for each gap. Add the skill once you have it.', cursor=(1195, 512), focus=(1000, 440),
                 shape='cursor-ui-demo + device-surface-showcase (screen swap)', seam='crossfade inside the window',
                 moves='Slow push toward the two skills to learn. The cursor moves to "Sudah saya kuasai" on the Kasir row and clicks.',
                 why='The gap becomes something the seeker can act on.'),
            dict(id='05-apply', name='Apply', dur=3.5, img='seeker-interview.webp', kicker='04 · Apply', line='Then apply, and follow every stage.',
                 sub='HR feedback lands on the application itself.', cursor=(848, 390), focus=(840, 330),
                 shape='cursor-ui-demo + device-surface-showcase (screen swap)', seam='crossfade inside the window',
                 moves='Slow push toward the stage tracker at "Wawancara". The cursor comes to rest on the note from the employer.',
                 why='Closes the loop for the seeker: an answer instead of silence.'),
            dict(id='06-employer', name='Employer side', dur=4, img='employer-applicants.webp', kicker='For employers', line='One ranked shortlist, with a skill map.',
                 sub='Confirm a skill at interview and it counts in full.', cursor=(1065, 657), focus=(980, 520),
                 shape='cursor-ui-demo + device-surface-showcase (screen swap)', seam='crossfade inside the window',
                 moves='Slow push from the skill map down to candidate #1. The cursor clicks "Wawancara & konfirmasi skill".',
                 why='The other half of the platform, and where "proven" comes from.'),
            dict(id='07-signoff', name='Sign-off', dur=2.5, img='landing.webp', kicker='', line='KerjaCerdas',
                 sub='Finalist, Tier 3 Award · PIDI Digdaya x Hackathon 2026', cursor=None, focus=None, signoff=True,
                 shape='titlecard-reveal', seam='crossfade',
                 moves='The window eases back and dims behind the title. One move, then still.',
                 why='The result, and the loop point back to frame 1.'),
        ],
    },
    'orion-demo': {
        'title': 'Orion',
        'version': 'v2',
        'message': 'Orion turns a plain-language expense claim into an audited decision, and only sends people the ones that need them',
        'audience': 'recruiters and engineers reading the Orion case study',
        'arc': 'Promise → Sign in → Submit → Agents work → Manager decides → Finance governs → Audit proves → Sign-off',
        'shot': (1920, 1080),
        'spine': 'One browser window that never leaves the frame, following a single claim from the employee to the ledger. A cursor performs each real action: sign in, open a claim, swipe to approve, open the audit record.',
        'truth': 'Every screen is a fresh capture of the real front end running locally (videos/orion-demo/capture-orion.mjs), using the demo data it ships with. The approval swipe and the opened audit record are real state changes in the app. The claim text is typed into the real form but not submitted, so no AI call is made.',
        'held': 'frame 4, the duplicate the agents caught',
        'award': 'Top 24 of 100+ teams · UMHackathon 2026',
        'frames': [
            dict(id='01-promise', name='Promise', dur=3, img='01-splash.png', kicker='', line='Expense claims that audit themselves.',
                 sub='Six AI agents take a claim from one sentence to a decision.', cursor=None, focus=None,
                 shape='device-surface-showcase (window rises in, static hold)', seam='cut in',
                 moves='The window rises into place on the real splash screen. Headline, then the second line.',
                 why='States the value in the first beat.'),
            dict(id='02-signin', name='Sign in', dur=2.5, img='02-role-select.png', kicker='Three roles, one workflow', line='Employee, manager, finance.',
                 sub='', cursor=(960, 438), focus=(960, 480),
                 shape='cursor-ui-demo', seam='crossfade inside the window',
                 moves='The cursor travels to "Sign in as Employee" and clicks. A short hand-off beat.',
                 why='Tells the viewer whose screen they are about to see.'),
            dict(id='03-submit', name='Submit', dur=5, img='06-claim-typed.png', kicker='01 · Submit', line='Just describe the expense.',
                 sub='No form to fill in. The agents pull out vendor, amount and category.', cursor=(1302, 889), focus=(960, 560),
                 shape='prompt-type-submit-generate (type, then press)', seam='crossfade inside the window',
                 moves='The cursor clicks the "+" button, the claim dialog opens, the description types in line by line, then the cursor moves to "Continue".',
                 why='The input is the product\'s first surprise: plain language.'),
            dict(id='04-agents', name='Agents work', dur=4.5, img='04-employee-dashboard.png', kicker='02 · Agents work', line='It caught a duplicate Canva Pro seat.',
                 sub='Parsed, checked against policy, and compared with existing licences.', cursor=None, focus=(1180, 560),
                 shape='device-surface-showcase (screen swap) + punch-in, then a held frame', seam='crossfade inside the window',
                 moves='The claim\'s progress steps light up in order, then a push toward the Agent Intelligence card. Hold for a full second.',
                 why='The core of the product: the agents found something a person would miss.'),
            dict(id='05-manager', name='Manager decides', dur=4.5, img='07b-manager-dragging.png', kicker='03 · Decide', line='Managers swipe only the edge cases.',
                 sub='Every card carries the agent\'s reasoning.', cursor=(820, 560), focus=(700, 560),
                 shape='cursor-ui-demo (drag)', seam='crossfade inside the window',
                 moves='The cursor grabs the top card and drags it right. The card tilts, leaves, and the real "Claim Approved Digitally" toast appears.',
                 why='Shows what reaches a human, and how little effort it takes.'),
            dict(id='06-finance', name='Finance governs', dur=3.5, img='08-finance.png', kicker='04 · Govern', line='Finance writes the rules.',
                 sub='Eight policies drive every automatic decision.', cursor=(955, 760), focus=(960, 700),
                 shape='cursor-ui-demo + device-surface-showcase (screen swap)', seam='crossfade inside the window',
                 moves='Slow push from the four headline numbers down to the policy cards. The cursor rests on "Business justification required".',
                 why='Where the automatic decisions come from.'),
            dict(id='07-audit', name='Audit proves', dur=4, img='10-audit-expanded.png', kicker='05 · Prove', line='Every decision leaves a ledger record.',
                 sub='Which agent decided, who was notified, and when.', cursor=(935, 632), focus=(800, 420),
                 shape='cursor-ui-demo + device-surface-showcase (screen swap)', seam='crossfade inside the window',
                 moves='The cursor clicks claim CLM-2024-047, the record opens to its audit analysis, and the cursor moves to "Verify on Ledger".',
                 why='The decisions can be checked afterwards.'),
            dict(id='08-signoff', name='Sign-off', dur=2.5, img='01-splash.png', kicker='', line='Orion',
                 sub='Top 24 of 100+ teams · UMHackathon 2026', cursor=None, focus=None, signoff=True,
                 shape='titlecard-reveal', seam='crossfade',
                 moves='The window eases back and dims behind the title. One move, then still.',
                 why='The result, and the loop point back to frame 1.'),
        ],
    },
}

CSS = '''
:root{--bg:#050508;--panel:#0d0e14;--line:rgba(255,255,255,.1);--text:#f3f3f6;--mute:rgba(243,243,246,.58);--accent:#FF5A36}
*{box-sizing:border-box}
body{margin:0;background:var(--bg);color:var(--text);font-family:Inter,"Segoe UI",system-ui,sans-serif;line-height:1.5}
.wrap{max-width:1500px;margin:0 auto;padding:40px 24px 80px}
header h1{font-size:34px;letter-spacing:-.02em;margin:0 0 6px}
header h1 span{color:var(--accent)}
header p{margin:0;color:var(--mute);max-width:70ch}
.tag{display:inline-block;margin-top:14px;padding:4px 10px;border:1px solid var(--line);border-radius:999px;font-size:12px;color:var(--mute)}
.grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:26px 22px;margin-top:34px}
@media (max-width:1100px){.grid{grid-template-columns:repeat(2,minmax(0,1fr))}}
@media (max-width:700px){.grid{grid-template-columns:1fr}}
.cell{aspect-ratio:16/9;container-type:inline-size;position:relative;overflow:hidden;border-radius:10px;border:1px solid var(--line);
  background:radial-gradient(120% 90% at 50% 0%,rgba(255,90,54,.13),transparent 60%),var(--bg)}
.win{position:absolute;left:50%;top:4.5%;height:70%;transform:translateX(-50%);border-radius:1.1cqw;overflow:hidden;border:.12cqw solid rgba(255,255,255,.16);
  box-shadow:0 2cqw 5cqw rgba(0,0,0,.6);background:#111}
.bar{height:7%;background:#14151c;display:flex;align-items:center;gap:.5cqw;padding:0 1.1cqw}
.bar i{width:.8cqw;height:.8cqw;border-radius:50%;background:rgba(255,255,255,.18)}
.bar b{margin-left:1cqw;font-weight:500;font-size:.95cqw;color:rgba(255,255,255,.45)}
.shot{position:relative;height:93%}
.shot img{display:block;height:100%;width:auto}
.focus{position:absolute;width:26%;aspect-ratio:1;border-radius:50%;transform:translate(-50%,-50%);border:.14cqw dashed rgba(255,90,54,.75)}
.cur{position:absolute;width:2.6cqw;transform:translate(-12%,-8%);filter:drop-shadow(0 .3cqw .5cqw rgba(0,0,0,.6))}
.ring{position:absolute;width:4.4cqw;aspect-ratio:1;border-radius:50%;transform:translate(-50%,-50%);border:.22cqw solid var(--accent)}
.cap{position:absolute;left:6%;right:6%;bottom:4.2%;display:flex;flex-direction:column;gap:.35cqw}
.kick{align-self:flex-start;font-size:1.4cqw;font-weight:600;letter-spacing:.04em;color:var(--accent);text-transform:uppercase}
.line{font-size:3.6cqw;font-weight:800;letter-spacing:-.025em;line-height:1.08}
.sub{font-size:1.8cqw;color:var(--mute)}
.signoff .win{opacity:.22;top:9%;height:64%}
.signoff .cap{bottom:auto;top:36%;align-items:center;text-align:center}
.signoff .line{font-size:7cqw}
.signoff .sub{font-size:1.9cqw;color:var(--text)}
.signoff .rule{width:6cqw;height:.35cqw;border-radius:9px;background:var(--accent);margin-bottom:1cqw}
.label{display:flex;justify-content:space-between;gap:12px;margin-top:10px;font-size:13px}
.label b{font-weight:700}
.label span{color:var(--mute);font-variant-numeric:tabular-nums}
.note{margin:6px 0 0;font-size:13px;color:var(--mute)}
.note b{color:var(--text)}
.chip{display:inline-block;margin-top:8px;padding:2px 9px;border:1px solid var(--line);border-radius:999px;font-size:11px;color:var(--mute)}
.extra{aspect-ratio:16/9;border-radius:10px;border:1px solid var(--line);background:var(--panel);padding:18px 20px;font-size:13px;overflow:hidden}
.extra h3{margin:0 0 10px;font-size:13px;color:var(--accent);text-transform:uppercase;letter-spacing:.06em}
.extra ol,.extra ul{margin:0;padding-left:18px;color:var(--mute)}
.sw{display:inline-block;width:14px;height:14px;border-radius:4px;vertical-align:-2px;margin-right:6px;border:1px solid var(--line)}
footer{margin-top:34px;color:var(--mute);font-size:13px;max-width:80ch}
'''

CURSOR = '<svg class="cur" style="left:{x}%;top:{y}%" viewBox="0 0 24 24"><path d="M4 2l15 9-7 1.6L9.5 20z" fill="#fff" stroke="#111" stroke-width="1.4" stroke-linejoin="round"/></svg>'


def esc(s):
    return html.escape(s, quote=True)


def cell(f, plan, n, start):
    sw, sh = plan['shot']
    win_w = 70 * (sw / sh) * 0.93 * 9 / 16  # % of cell width so the capture keeps its ratio
    marks = ''
    if f.get('focus'):
        marks += '<span class="focus" style="left:%.1f%%;top:%.1f%%"></span>' % (f['focus'][0] / sw * 100, f['focus'][1] / sh * 100)
    if f.get('cursor'):
        x, y = f['cursor'][0] / sw * 100, f['cursor'][1] / sh * 100
        marks += '<span class="ring" style="left:%.1f%%;top:%.1f%%"></span>' % (x, y) + CURSOR.format(x='%.1f' % x, y='%.1f' % y)
    cap = ''
    if f.get('signoff'):
        cap += '<span class="rule"></span>'
    if f['kicker']:
        cap += '<span class="kick">%s</span>' % esc(f['kicker'])
    cap += '<span class="line">%s</span>' % esc(f['line'])
    if f['sub']:
        cap += '<span class="sub">%s</span>' % esc(f['sub'])
    return '''<section>
  <div class="cell%s" id="frame-%02d">
    <div class="win" style="width:%.2f%%"><div class="bar"><i></i><i></i><i></i><b>%s</b></div><div class="shot"><img src="public/shots/%s" alt="">%s</div></div>
    <div class="cap">%s</div>
  </div>
  <div class="label"><b>%02d · %s</b><span>%s · %.1f–%.1fs</span></div>
  <p class="note"><b>Moves:</b> %s</p>
  <span class="chip">in: %s</span>
</section>''' % (' signoff' if f.get('signoff') else '', n, win_w, esc(plan['title'].lower()), f['img'], marks, cap,
                  n, esc(f['name'].upper()), f['id'], start, start + f['dur'], esc(f['moves']), esc(f['seam']))


for slug, plan in PLANS.items():
    root = os.path.join(HERE, slug)
    total = sum(f['dur'] for f in plan['frames'])

    # ---- STORYBOARD.md ----
    md = ['---', 'format: 1920x1080', 'duration: %gs' % total, 'message: "%s"' % plan['message'], 'arc: %s' % plan['arc'],
          'audience: %s' % plan['audience'], 'mode: collaborative', '---', '', '## Decisions', '',
          '- **Format**: 1920x1080, %gs, silent (no voiceover, no music). Each beat carries a step label, one headline and one supporting line in the bottom band.' % total,
          '- **Spine**: %s' % plan['spine'],
          '- **Brand**: stage in the portfolio palette (background `#050508`, accent `#FF5A36`, text `#F3F3F6`, Inter). The window shows the app\'s own UI untouched.',
          '- **Truthfulness**: %s' % plan['truth'],
          '- **Bans**: no invented UI, no clicks on things that do not exist, no glow effects, no slideshow (the window persists, only its content changes), no motion that says nothing.',
          '- **Held frame**: %s holds still for a full second.' % plan['held'], '',
          '## Changes from v1', '',
          '- "can you actually goto the orion repo and kerjacerdas repo to understand the flow": beats now follow the real in-app flow read from each repo.',
          '- "Use your best copywriting ... adding short text or subtitle": every beat has a step label, a headline and a supporting line.',
          '- "can show cursor or smth too": a cursor performs the real click that leads to the next screen.', '']
    start = 0
    for n, f in enumerate(plan['frames'], 1):
        caption = ' / '.join(x for x in (f['kicker'], f['line'], f['sub']) if x)
        md += ['## Frame %d — %s' % (n, f['name']), '',
               '- scene: %s' % f['moves'], '- duration: %gs' % f['dur'], '- transition_in: %s' % f['seam'], '- status: built',
               '- src: compositions/%s.html' % f['id'], '- shape: %s' % f['shape'], '- capture: public/shots/%s' % f['img'],
               '- caption: "%s"' % caption, '', '%s Runs %.1f–%.1fs.' % (f['why'], start, start + f['dur']), '']
        start += f['dur']
    open(os.path.join(root, 'STORYBOARD.md'), 'w', encoding='utf-8', newline='\n').write('\n'.join(md))

    # ---- storyboard.html ----
    cells, start = [], 0
    for n, f in enumerate(plan['frames'], 1):
        cells.append(cell(f, plan, n, start))
        start += f['dur']
    seams = ''.join('<li>%s → %s: %s</li>' % (esc(a['name']), esc(b['name']), esc(b['seam'])) for a, b in zip(plan['frames'], plan['frames'][1:]))
    extras = '''<section><div class="extra"><h3>Seams</h3><ol>%s</ol></div><div class="label"><b>SEAM MAP</b><span>the window never leaves</span></div></section>
<section><div class="extra"><h3>Tokens and rules</h3><ul>
<li><span class="sw" style="background:#050508"></span>Stage #050508 · <span class="sw" style="background:#FF5A36"></span>Accent #FF5A36 · <span class="sw" style="background:#F3F3F6"></span>Text #F3F3F6</li>
<li>Type: Inter. Step label 600 uppercase, headline 800, supporting line 400.</li>
<li>Dashed circle = where the camera pushes. Solid ring + arrow = where the cursor clicks.</li>
<li>Real captures only. No invented UI, no glow, no slideshow.</li>
<li>Held frame: %s.</li></ul></div><div class="label"><b>TOKENS</b><span>shared by both videos</span></div></section>''' % (seams, esc(plan['held']))
    page = '''<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>%s demo storyboard %s</title><style>%s</style></head><body><div class="wrap">
<header><h1>%s demo <span>storyboard %s</span></h1><p>%s.</p><span class="tag">1920×1080 · %gs · %d beats · silent, captions on screen</span></header>
<div class="grid">%s%s</div>
<footer>%s</footer></div></body></html>''' % (plan['title'], plan['version'], CSS, plan['title'], plan['version'], esc(plan['message']), total,
                                                len(plan['frames']), '\n'.join(cells), extras, esc(plan['truth']))
    open(os.path.join(root, 'storyboard.html'), 'w', encoding='utf-8', newline='\n').write(page)
    print(slug, '%gs' % total, len(plan['frames']), 'frames')
