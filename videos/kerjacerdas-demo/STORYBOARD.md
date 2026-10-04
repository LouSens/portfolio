---
format: 1920x1080
duration: 26s
message: "KerjaCerdas shows you which skills you are missing before you apply, then helps you close the gap"
arc: Promise → Pick a target → See the gap → Close it → Apply → Employer side → Sign-off
audience: recruiters and engineers reading the KerjaCerdas case study
mode: collaborative
---

## Decisions

- **Format**: 1920x1080, 26s, silent (no voiceover, no music). Each beat carries a step label, one headline and one supporting line in the bottom band.
- **Spine**: One browser window that never leaves the frame. The real screens change inside it, a cursor makes the click that leads to the next screen, and the camera pushes toward the detail the caption names.
- **Brand**: stage in the portfolio palette (background `#050508`, accent `#FF5A36`, text `#F3F3F6`, Inter). The window shows the app's own UI untouched.
- **Truthfulness**: Every screen is a real capture of the app, signed in as the seeded demo seeker Maya Sari and the demo employer Klinik Sehat Keluarga. The cursor only points at controls that really exist and lead where the next screen shows. Nothing is rebuilt.
- **Bans**: no invented UI, no clicks on things that do not exist, no glow effects, no slideshow (the window persists, only its content changes), no motion that says nothing.
- **Held frame**: frame 3, the missing-skill flag holds still for a full second.

## Changes from v1

- "can you actually goto the orion repo and kerjacerdas repo to understand the flow": beats now follow the real in-app flow read from each repo.
- "Use your best copywriting ... adding short text or subtitle": every beat has a step label, a headline and a supporting line.
- "can show cursor or smth too": a cursor performs the real click that leads to the next screen.

## Frame 1 — Promise

- scene: The window rises into place and settles. The headline lands with it; the second line follows.
- duration: 3.5s
- transition_in: cut in
- status: built
- src: compositions/01-promise.html
- shape: device-surface-showcase (window rises in, static hold)
- capture: public/shots/landing.webp
- caption: "Stop applying blind. / KerjaCerdas shows what you are missing before you apply."

States the value in the first beat, in the viewer's terms. Runs 0.0–3.5s.

## Frame 2 — Pick a target

- scene: Slow push toward the ranked list. The cursor glides to "Lihat detail & jadikan target" and clicks.
- duration: 4s
- transition_in: crossfade inside the window
- status: built
- src: compositions/02-target.html
- shape: cursor-ui-demo + device-surface-showcase (screen swap)
- capture: public/shots/seeker-dashboard.webp
- caption: "01 · Pick a target / Ranked on what you can prove. / A skill counts for more once a quiz or an employer has backed it up."

Shows how matching works, and the click sets up the next screen. Runs 3.5–7.5s.

## Frame 3 — See the gap

- scene: Punch in on the job card until the red "Kasir · Belum ada" chip is readable, hold for a full second, then the cursor clicks "Lihat rencana belajar".
- duration: 4.5s
- transition_in: crossfade inside the window
- status: built
- src: compositions/03-gap.html
- shape: cursor-ui-demo + punch-in, then a held frame
- capture: public/shots/seeker-match.webp
- caption: "02 · See the gap / You have 2 of 3 required skills. / The missing one is named, not buried in a score."

The core of the product: the gap is specific and visible. Runs 7.5–12.0s.

## Frame 4 — Close it

- scene: Slow push toward the two skills to learn. The cursor moves to "Sudah saya kuasai" on the Kasir row and clicks.
- duration: 4s
- transition_in: crossfade inside the window
- status: built
- src: compositions/04-close.html
- shape: cursor-ui-demo + device-surface-showcase (screen swap)
- capture: public/shots/seeker-learning-plan.webp
- caption: "03 · Close it / A learning plan for exactly that skill. / Courses for each gap. Add the skill once you have it."

The gap becomes something the seeker can act on. Runs 12.0–16.0s.

## Frame 5 — Apply

- scene: Slow push toward the stage tracker at "Wawancara". The cursor comes to rest on the note from the employer.
- duration: 3.5s
- transition_in: crossfade inside the window
- status: built
- src: compositions/05-apply.html
- shape: cursor-ui-demo + device-surface-showcase (screen swap)
- capture: public/shots/seeker-interview.webp
- caption: "04 · Apply / Then apply, and follow every stage. / HR feedback lands on the application itself."

Closes the loop for the seeker: an answer instead of silence. Runs 16.0–19.5s.

## Frame 6 — Employer side

- scene: Slow push from the skill map down to candidate #1. The cursor clicks "Wawancara & konfirmasi skill".
- duration: 4s
- transition_in: crossfade inside the window
- status: built
- src: compositions/06-employer.html
- shape: cursor-ui-demo + device-surface-showcase (screen swap)
- capture: public/shots/employer-applicants.webp
- caption: "For employers / One ranked shortlist, with a skill map. / Confirm a skill at interview and it counts in full."

The other half of the platform, and where "proven" comes from. Runs 19.5–23.5s.

## Frame 7 — Sign-off

- scene: The window eases back and dims behind the title. One move, then still.
- duration: 2.5s
- transition_in: crossfade
- status: built
- src: compositions/07-signoff.html
- shape: titlecard-reveal
- capture: public/shots/landing.webp
- caption: "KerjaCerdas / Finalist, Tier 3 Award · PIDI Digdaya x Hackathon 2026"

The result, and the loop point back to frame 1. Runs 23.5–26.0s.
