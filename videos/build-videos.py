# Writes the HyperFrames composition (index.html) for both demo videos from one plan.
# Run from the repo root:  python videos/build-videos.py
# All positions are in capture pixels; the script scales them to the window.
import html, json, os

HERE = os.path.dirname(os.path.abspath(__file__))
STAGE_W, STAGE_H = 1920, 1080
WIN_TOP, BAR_H, CONTENT_H = 36, 40, 756
CAP_LEFT, CAP_W = 288, 1344


def beat(name, dur, img, kicker, line, sub, cam=None, cursor=None, swaps=None, marks=None, typing=None, signoff=False):
    return dict(name=name, dur=dur, img=img, kicker=kicker, line=line, sub=sub, cam=cam or [], cursor=cursor or [],
                swaps=swaps or [], marks=marks or [], typing=typing, signoff=signoff)


PLANS = {
    'orion-demo': dict(
        title='orion', shot=(1920, 1080),
        beats=[
            beat('promise', 3.0, '01-splash.png', '', 'Expense claims that audit themselves.',
                 'Six AI agents take a claim from one sentence to a decision.'),
            beat('signin', 2.5, '02-role-select.png', 'Three roles, one workflow', 'Employee, manager, finance.', '',
                 cam=[dict(at=0.4, dur=1.4, z=1.25, f=(960, 470))],
                 cursor=[dict(at=0.0, pos=(1320, 820)), dict(at=0.4, dur=0.9, to=(960, 438)), dict(click=1.55)]),
            beat('submit', 6.0, '04-employee-dashboard.png', '01 · Submit', 'Just describe the expense.',
                 'No form to fill in. The agents pull out vendor, amount and category.',
                 cam=[dict(at=1.2, dur=1.0, z=1.3, f=(960, 570))],
                 cursor=[dict(at=0.0, pos=(1300, 640)), dict(at=0.15, dur=0.65, to=(1812, 972)), dict(click=0.9),
                         dict(at=1.3, dur=0.5, to=(1420, 720)), dict(at=3.85, dur=0.6, to=(1302, 889)), dict(click=4.6)],
                 swaps=[dict(at=1.0, img='05-claim-empty.png'), dict(at=3.7, img='06-claim-typed.png', dur=0.2),
                        dict(at=4.7, img='06b-claim-processing.png')],
                 typing=dict(at=1.7, img='06-claim-typed.png', per=0.62, x=(506, 1414), lines=[(458, 492), (492, 522), (522, 552)])),
            beat('agents', 4.5, '04-employee-dashboard.png', '02 · Agents work', 'It caught a duplicate Canva Pro seat.',
                 'Parsed, checked against policy, and compared with existing licences.',
                 cam=[dict(at=0.5, dur=1.0, z=1.35, f=(560, 600)), dict(at=1.9, dur=0.9, z=1.5, f=(1560, 800))],
                 marks=[dict(at=2.8, box=(1290, 650, 590, 300))]),
            beat('manager', 4.5, '07-manager.png', '03 · Decide', 'Managers swipe only the edge cases.',
                 "Every card carries the agent's reasoning.",
                 cam=[dict(at=0.3, dur=0.9, z=1.25, f=(660, 600)), dict(at=2.6, dur=0.8, z=1.25, f=(1500, 320))],
                 cursor=[dict(at=0.0, pos=(1150, 900)), dict(at=0.3, dur=0.8, to=(650, 560)), dict(click=1.3),
                         dict(at=1.45, dur=0.45, to=(810, 580)), dict(at=1.95, dur=0.4, to=(1080, 560)), dict(hide=2.45)],
                 swaps=[dict(at=1.5, img='07b-manager-dragging.png', dur=0.25), dict(at=2.05, img='07c-manager-approved.png', dur=0.3)],
                 marks=[dict(at=3.1, box=(1452, 42, 444, 60))]),
            beat('finance', 3.5, '08-finance.png', '04 · Govern', 'Finance writes the rules.',
                 'Eight policies drive every automatic decision.',
                 cam=[dict(at=0.3, dur=0.9, z=1.2, f=(960, 360)), dict(at=1.4, dur=1.1, z=1.3, f=(960, 780))],
                 cursor=[dict(at=0.0, pos=(1500, 500)), dict(at=1.5, dur=0.9, to=(955, 760))]),
            beat('audit', 4.5, '09-audit-trail.png', '05 · Prove', 'Every decision leaves a ledger record.',
                 'Which agent decided, who was notified, and when.',
                 cam=[dict(at=1.3, dur=0.9, z=1.35, f=(800, 400))],
                 cursor=[dict(at=0.0, pos=(1450, 700)), dict(at=0.2, dur=0.7, to=(650, 150)), dict(click=1.0),
                         dict(at=2.6, dur=0.8, to=(935, 632))],
                 swaps=[dict(at=1.15, img='10-audit-expanded.png')]),
            beat('signoff', 2.5, '01-splash.png', '', 'Orion', 'Top 24 of 100+ teams · UMHackathon 2026', signoff=True),
        ]),
    'kerjacerdas-demo': dict(
        title='kerjacerdas', shot=(1440, 900),
        beats=[
            beat('promise', 3.5, 'landing.webp', '', 'Stop applying blind.',
                 'KerjaCerdas shows what you are missing before you apply.'),
            beat('target', 4.0, 'seeker-dashboard.webp', '01 · Pick a target', 'Ranked on what you can prove.',
                 'A skill counts for more once a quiz or an employer has backed it up.',
                 cam=[dict(at=0.4, dur=1.4, z=1.4, f=(800, 500))],
                 cursor=[dict(at=0.0, pos=(1150, 820)), dict(at=1.6, dur=0.9, to=(885, 594)), dict(click=2.75)]),
            beat('gap', 4.5, 'seeker-match.webp', '02 · See the gap', 'You have 2 of 3 required skills.',
                 'The missing one is named, not buried in a score.',
                 cam=[dict(at=0.4, dur=1.2, z=1.6, f=(640, 590))],
                 cursor=[dict(at=0.0, pos=(1100, 760)), dict(at=2.9, dur=0.7, to=(790, 668)), dict(click=3.8)],
                 marks=[dict(at=1.5, box=(382, 602, 140, 30))]),
            beat('close', 4.0, 'seeker-learning-plan.webp', '03 · Close it', 'A learning plan for exactly that skill.',
                 'Courses for each gap. Add the skill once you have it.',
                 cam=[dict(at=0.4, dur=1.3, z=1.35, f=(1000, 440))],
                 cursor=[dict(at=0.0, pos=(900, 800)), dict(at=1.7, dur=0.8, to=(1195, 512)), dict(click=2.7)]),
            beat('apply', 3.5, 'seeker-interview.webp', '04 · Apply', 'Then apply, and follow every stage.',
                 'HR feedback lands on the application itself.',
                 cam=[dict(at=0.4, dur=1.2, z=1.4, f=(840, 320))],
                 cursor=[dict(at=0.0, pos=(1100, 700)), dict(at=1.5, dur=0.8, to=(850, 392))],
                 marks=[dict(at=2.3, box=(374, 368, 948, 44))]),
            beat('employer', 4.0, 'employer-applicants.webp', 'For employers', 'One ranked shortlist, with a skill map.',
                 'Confirm a skill at interview and it counts in full.',
                 cam=[dict(at=0.4, dur=1.0, z=1.3, f=(1000, 330)), dict(at=1.7, dur=1.0, z=1.3, f=(1000, 640))],
                 cursor=[dict(at=0.0, pos=(1300, 850)), dict(at=2.3, dur=0.7, to=(1065, 657)), dict(click=3.2)]),
            beat('signoff', 2.5, 'landing.webp', '', 'KerjaCerdas', 'Finalist, Tier 3 Award · PIDI Digdaya x Hackathon 2026', signoff=True),
        ]),
    # Captured from the rebuilt app running locally on a made-up watch history
    # (videos/neuralvoid-demo-sample/capture-new-ui.mjs).
    'neuralvoid-demo': dict(
        title='neuralvoid', shot=(1920, 1080),
        beats=[
            beat('promise', 3.0, '01-welcome.png', '', 'Your TikTok habits, in plain numbers.',
                 'NeuralVoid reads your watch history and tells you what it means.',
                 cam=[dict(at=0.9, dur=1.4, z=1.25, f=(760, 480))],
                 cursor=[dict(at=1.5, pos=(980, 820)), dict(at=1.7, dur=0.8, to=(358, 646)), dict(click=2.65)]),
            beat('upload', 3.5, '02-add-empty.png', '01 · Upload', 'One file. Nothing saved.',
                 'Your TikTok watch history is all it needs.',
                 cam=[dict(at=0.3, dur=0.9, z=1.3, f=(1000, 470))],
                 cursor=[dict(at=0.0, pos=(1350, 760)), dict(at=0.2, dur=0.5, to=(1008, 404)), dict(click=0.8),
                         dict(at=1.6, dur=0.7, to=(703, 563)), dict(click=2.6)],
                 swaps=[dict(at=0.95, img='03-add-ready.png', dur=0.25)]),
            beat('read', 3.0, '04-reading.png', '02 · Read', 'It says what it is doing.',
                 'Videos, sittings, the long ones. No jargon.',
                 cam=[dict(at=0.3, dur=1.0, z=1.35, f=(900, 480))]),
            beat('understand', 5.0, '05-summary.png', '03 · Understand', 'The answer in one sentence.',
                 'Hours, a habit level in words, and what it adds up to.',
                 cam=[dict(at=0.4, dur=1.0, z=1.12, f=(960, 620)), dict(at=2.4, dur=0.9, z=1.1, f=(960, 640))],
                 swaps=[dict(at=2.3, img='05b-summary-lower.png', dur=0.45)],
                 marks=[dict(at=3.4, box=(172, 566, 1578, 190))]),
            beat('when', 4.0, '06-when.png', '04 · When', 'Your week, hour by hour.',
                 'Brighter means more videos. The late nights stand out.',
                 cam=[dict(at=0.4, dur=1.1, z=1.35, f=(900, 560))]),
            beat('change', 5.5, '07-plan.png', '05 · Change one thing', 'Pick one change. Get hours back.',
                 'Worked out from your own history, with a reminder to make it stick.',
                 cam=[dict(at=0.4, dur=1.0, z=1.2, f=(960, 780))],
                 cursor=[dict(at=0.0, pos=(1100, 500)), dict(at=1.5, dur=0.8, to=(426, 748)), dict(click=2.45),
                         dict(at=3.2, dur=0.9, to=(1572, 971)), dict(click=4.3)],
                 swaps=[dict(at=2.5, img='07b-plan-midnight.png', dur=0.25)]),
            beat('signoff', 2.5, '01-welcome.png', '', 'NeuralVoid', 'Three models vote on the habit level, about 96% accurate', signoff=True),
        ]),
}

CSS = '''
* { margin: 0; padding: 0; box-sizing: border-box; }
html, body { margin: 0; width: 1920px; height: 1080px; overflow: hidden; background: #050508; }
#root { position: relative; width: 100%%; height: 100%%; font-family: Inter, sans-serif; color: #f3f3f6; }
#stage { position: absolute; inset: 0; overflow: hidden; background: #050508; }
.glow { position: absolute; inset: 0; background: radial-gradient(1200px 620px at 50%% -6%%, rgba(255, 90, 54, 0.2), rgba(255, 90, 54, 0) 70%%); }
#win { position: absolute; top: %(win_top)dpx; left: %(win_left)dpx; width: %(cw)dpx; height: %(win_h)dpx; border-radius: 18px; overflow: hidden;
  background: #101116; border: 2px solid rgba(255, 255, 255, 0.16); box-shadow: 0 40px 110px rgba(0, 0, 0, 0.7); }
.bar { height: %(bar_h)dpx; display: flex; align-items: center; gap: 9px; padding: 0 18px; background: #15161d; }
.bar i { display: block; width: 12px; height: 12px; border-radius: 50%%; background: rgba(255, 255, 255, 0.2); }
.bar b { display: block; margin-left: 14px; font-size: 15px; font-weight: 500; color: rgba(255, 255, 255, 0.5); }
#view { position: relative; width: %(cw)dpx; height: %(ch)dpx; overflow: hidden; }
#cam { position: absolute; left: 0; top: 0; width: %(cw)dpx; height: %(ch)dpx; transform-origin: 0 0; }
.shot { position: absolute; left: 0; top: 0; width: %(cw)dpx; height: %(ch)dpx; display: block; opacity: 0; }
.mark { position: absolute; display: block; border: 4px solid #ff5a36; border-radius: 12px; opacity: 0; }
#ring { position: absolute; left: -26px; top: -26px; width: 52px; height: 52px; border-radius: 50%%; border: 4px solid #ff5a36; opacity: 0; }
#cursor { position: absolute; left: 0; top: 0; width: 40px; height: 40px; opacity: 0; }
#cursor svg { display: block; width: 40px; height: 40px; filter: drop-shadow(0 4px 6px rgba(0, 0, 0, 0.55)); }
.cap { position: absolute; left: %(cap_left)dpx; top: %(cap_top)dpx; width: %(cap_w)dpx; }
.kick { display: block; height: 30px; font-size: 24px; line-height: 30px; font-weight: 600; letter-spacing: 0.06em; text-transform: uppercase; color: #ff5a36; opacity: 0; }
.line { display: block; margin-top: 6px; font-size: 64px; line-height: 72px; font-weight: 800; letter-spacing: -0.03em; color: #f3f3f6; opacity: 0; }
.sub { display: block; margin-top: 8px; font-size: 30px; line-height: 40px; font-weight: 400; color: #b9b9c2; opacity: 0; }
#sign { position: absolute; left: 0; top: 330px; width: 1920px; display: flex; flex-direction: column; align-items: center; }
#sign .rule { display: block; width: 110px; height: 8px; border-radius: 8px; background: #ff5a36; opacity: 0; }
#sign .name { display: block; margin-top: 30px; font-size: 168px; line-height: 180px; font-weight: 800; letter-spacing: -0.04em; color: #f3f3f6; opacity: 0; }
#sign .award { display: block; margin-top: 18px; font-size: 38px; line-height: 48px; font-weight: 500; color: #f3f3f6; opacity: 0; }
'''

CURSOR_SVG = '<svg viewBox="0 0 24 24"><path d="M4 2l15 9-7 1.6L9.5 20z" fill="#fff" stroke="#111" stroke-width="1.4" stroke-linejoin="round"/></svg>'

SCRIPT = r'''
const PLAN = __PLAN__;
const tl = gsap.timeline({ paused: true });
const W = PLAN.cw, H = PLAN.ch, S = PLAN.scale;
const clamp = (v, lo, hi) => Math.min(hi, Math.max(lo, v));
// camera: scale the capture and slide it so the focus point sits mid-window, never showing past an edge
const camTo = (z, f) => ({ scale: z, x: clamp(W / 2 - f[0] * S * z, W - W * z, 0), y: clamp(H / 2 - f[1] * S * z, H - H * z, 0) });
const press = (t) => {
  // immediateRender off: otherwise the ring shows at its starting size before the first click
  tl.fromTo("#ring", { scale: 0.35, opacity: 0.95 }, { scale: 1.25, opacity: 0, duration: 0.5, ease: "power2.out", immediateRender: false }, t);
  tl.to("#cursor svg", { scale: 0.82, duration: 0.09, ease: "power1.in" }, t - 0.02);
  tl.to("#cursor svg", { scale: 1, duration: 0.16, ease: "power2.out" }, t + 0.09);
};

// the window rises in once and then never leaves
tl.fromTo("#win", { y: 70, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }, 0);
tl.set("#shot-0", { opacity: 1 }, 0);

PLAN.beats.forEach((b, i) => {
  const T = b.start;
  if (b.signoff) {
    tl.to("#win", { scale: 0.93, opacity: 0, duration: 0.6, ease: "power2.inOut" }, T);
    tl.to("#cursor", { opacity: 0, duration: 0.2 }, T);
    tl.to("#cam", { scale: 1, x: 0, y: 0, duration: 0.7, ease: "power2.inOut" }, T);
    tl.to(b.shot, { opacity: 1, duration: 0.5, ease: "power1.inOut" }, T);
    tl.fromTo("#sign .rule", { scaleX: 0, opacity: 0 }, { scaleX: 1, opacity: 1, duration: 0.45, ease: "power3.out" }, T + 0.25);
    tl.fromTo("#sign .name", { y: 36, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" }, T + 0.35);
    tl.fromTo("#sign .award", { y: 22, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: "power3.out" }, T + 0.6);
    return;
  }

  // screen swap inside the window; the camera settles back as the next screen arrives
  if (i > 0) {
    tl.to(b.shot, { opacity: 1, duration: 0.4, ease: "power1.inOut" }, T);
    tl.to("#cam", { scale: 1, x: 0, y: 0, duration: 0.45, ease: "power2.inOut" }, T - 0.05);
    tl.to(".mark", { opacity: 0, duration: 0.2 }, T - 0.1);
  }
  b.swaps.forEach((s) => tl.to(s.shot, { opacity: 1, duration: s.dur || 0.35, ease: "power1.inOut" }, T + s.at));
  b.cam.forEach((c) => tl.to("#cam", { ...camTo(c.z, c.f), duration: c.dur, ease: "power2.inOut" }, T + c.at));

  // cursor: appears at its first position, then glides and clicks
  if (b.cursor.length) {
    b.cursor.forEach((c) => {
      if (c.pos) {
        tl.set("#cursor", { x: c.pos[0] * S, y: c.pos[1] * S }, T + c.at);
        tl.set("#ring", { x: c.pos[0] * S, y: c.pos[1] * S }, T + c.at);
        tl.to("#cursor", { opacity: 1, duration: 0.25 }, T + c.at + 0.05);
      } else if (c.to) {
        tl.to(["#cursor", "#ring"], { x: c.to[0] * S, y: c.to[1] * S, duration: c.dur, ease: "power2.inOut" }, T + c.at);
      } else if (c.click !== undefined) {
        press(T + c.click);
      } else if (c.hide !== undefined) {
        tl.to("#cursor", { opacity: 0, duration: 0.2 }, T + c.hide);
      }
    });
    tl.to("#cursor", { opacity: 0, duration: 0.2 }, T + b.dur - 0.22);
  }

  // text typed into the real form: each line of the capture is uncovered left to right
  if (b.typing) {
    b.typing.ids.forEach((id, n) => {
      tl.set(id, { opacity: 1 }, T + b.typing.at + n * b.typing.per);
      tl.fromTo(id, { clipPath: b.typing.from[n] }, { clipPath: b.typing.to[n], duration: b.typing.per, ease: "none" }, T + b.typing.at + n * b.typing.per);
    });
  }

  b.marks.forEach((m) => {
    tl.fromTo(m.id, { opacity: 0, scale: 1.08 }, { opacity: 1, scale: 1, duration: 0.4, ease: "power3.out" }, T + m.at);
  });

  // caption: label, headline, supporting line, then out before the next beat
  const cap = "#cap-" + i;
  const parts = [cap + " .kick", cap + " .line", cap + " .sub"].filter((sel) => document.querySelector(sel));
  parts.forEach((sel, n) => tl.fromTo(sel, { y: 22, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: "power3.out" }, T + 0.2 + n * 0.14));
  tl.to(parts, { opacity: 0, y: -12, duration: 0.24, ease: "power2.in" }, T + b.dur - 0.26);
});

window.__timelines["main"] = tl;
tl.seek(0);
'''


def esc(s):
    return html.escape(s, quote=True)


for slug, plan in PLANS.items():
    sw, sh = plan['shot']
    scale = CONTENT_H / sh
    cw = round(sw * scale)
    win_left = (STAGE_W - cw) // 2
    total = sum(b['dur'] for b in plan['beats'])
    css = CSS % dict(win_top=WIN_TOP, win_left=win_left, cw=cw, win_h=BAR_H + CONTENT_H, bar_h=BAR_H, ch=CONTENT_H,
                     cap_left=win_left, cap_top=WIN_TOP + BAR_H + CONTENT_H + 30, cap_w=max(cw, 1200))

    shots, marks, caps, beats_js, start, n_shot, n_mark = [], [], [], [], 0, 0, 0

    def add_shot(img):
        global n_shot
        sid = 'shot-%d' % n_shot
        n_shot += 1
        shots.append('<img id="%s" class="shot" src="public/shots/%s" alt="" />' % (sid, img))
        return '#' + sid

    for i, b in enumerate(plan['beats']):
        jb = dict(start=round(start, 3), dur=b['dur'], signoff=b['signoff'], cam=b['cam'], cursor=b['cursor'], swaps=[], marks=[], typing=None)
        jb['shot'] = add_shot(b['img'])
        typing = b['typing']
        for s in b['swaps']:
            # the typed lines are uncovered before the full typed capture fades in over them
            if typing and s['img'] == typing['img'] and not jb['typing']:
                ids, frm, to = [], [], []
                x0, x1 = typing['x'][0] * scale, typing['x'][1] * scale
                for (y0, y1) in typing['lines']:
                    ids.append(add_shot(typing['img']))
                    top, bottom = y0 * scale, CONTENT_H - y1 * scale
                    frm.append('inset(%.1fpx %.1fpx %.1fpx %.1fpx)' % (top, cw - x0, bottom, x0))
                    to.append('inset(%.1fpx %.1fpx %.1fpx %.1fpx)' % (top, cw - x1, bottom, x0))
                jb['typing'] = dict(at=typing['at'], per=typing['per'], ids=ids, **{'from': frm, 'to': to})
            jb['swaps'].append(dict(at=s['at'], dur=s.get('dur'), shot=add_shot(s['img'])))
        for m in b['marks']:
            mid = 'mark-%d' % n_mark
            n_mark += 1
            x, y, w, h = [v * scale for v in m['box']]
            marks.append('<span id="%s" class="mark" style="left:%.1fpx;top:%.1fpx;width:%.1fpx;height:%.1fpx"></span>' % (mid, x, y, w, h))
            jb['marks'].append(dict(at=m['at'], id='#' + mid))
        if not b['signoff']:
            parts = ''
            if b['kicker']:
                parts += '<span class="kick">%s</span>' % esc(b['kicker'])
            parts += '<span class="line">%s</span>' % esc(b['line'])
            if b['sub']:
                parts += '<span class="sub">%s</span>' % esc(b['sub'])
            caps.append('<div id="cap-%d" class="cap">%s</div>' % (i, parts))
        else:
            sign = '<div id="sign"><span class="rule"></span><span class="name">%s</span><span class="award">%s</span></div>' % (esc(b['line']), esc(b['sub']))
        beats_js.append(jb)
        start += b['dur']

    plan_js = json.dumps(dict(cw=cw, ch=CONTENT_H, scale=scale, beats=beats_js))
    page = '''<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=1920, height=1080" />
    <script src="https://cdn.jsdelivr.net/npm/gsap@3.14.2/dist/gsap.min.js"></script>
    <style>%s</style>
  </head>
  <body>
    <!-- Generated by videos/build-videos.py. Edit the plan there, not this file. -->
    <div id="root" data-composition-id="main" data-start="0" data-duration="%g" data-width="1920" data-height="1080">
      <div id="stage" class="clip" data-start="0" data-duration="%g" data-track-index="0">
        <div class="glow"></div>
        <div id="win">
          <div class="bar"><i></i><i></i><i></i><b>%s</b></div>
          <div id="view">
            <div id="cam">
              %s
              %s
              <div id="ring"></div>
              <div id="cursor">%s</div>
            </div>
          </div>
        </div>
        %s
        %s
      </div>
    </div>
    <script>%s</script>
  </body>
</html>
''' % (css, total, total, plan['title'], '\n              '.join(shots), '\n              '.join(marks), CURSOR_SVG,
       '\n        '.join(caps), sign, SCRIPT.replace('__PLAN__', plan_js))
    open(os.path.join(HERE, slug, 'index.html'), 'w', encoding='utf-8', newline='\n').write(page)
    print(slug, '%gs' % total, n_shot, 'shots')
