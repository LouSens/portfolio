---
format: 1920x1080
duration: 29.5s
message: "Orion turns a plain-language expense claim into an audited decision, and only sends people the ones that need them"
arc: Promise → Sign in → Submit → Agents work → Manager decides → Finance governs → Audit proves → Sign-off
audience: recruiters and engineers reading the Orion case study
mode: collaborative
---

## Decisions

- **Format**: 1920x1080, 29.5s, silent (no voiceover, no music). Each beat carries a step label, one headline and one supporting line in the bottom band.
- **Spine**: One browser window that never leaves the frame, following a single claim from the employee to the ledger. A cursor performs each real action: sign in, open a claim, swipe to approve, open the audit record.
- **Brand**: stage in the portfolio palette (background `#050508`, accent `#FF5A36`, text `#F3F3F6`, Inter). The window shows the app's own UI untouched.
- **Truthfulness**: Every screen is a fresh capture of the real front end running locally (videos/orion-demo/capture-orion.mjs), using the demo data it ships with. The approval swipe and the opened audit record are real state changes in the app. The claim text is typed into the real form but not submitted, so no AI call is made.
- **Bans**: no invented UI, no clicks on things that do not exist, no glow effects, no slideshow (the window persists, only its content changes), no motion that says nothing.
- **Held frame**: frame 4, the duplicate the agents caught holds still for a full second.

## Changes from v1

- "can you actually goto the orion repo and kerjacerdas repo to understand the flow": beats now follow the real in-app flow read from each repo.
- "Use your best copywriting ... adding short text or subtitle": every beat has a step label, a headline and a supporting line.
- "can show cursor or smth too": a cursor performs the real click that leads to the next screen.

## Frame 1 — Promise

- scene: The window rises into place on the real splash screen. Headline, then the second line.
- duration: 3s
- transition_in: cut in
- status: built
- src: compositions/01-promise.html
- shape: device-surface-showcase (window rises in, static hold)
- capture: public/shots/01-splash.png
- caption: "Expense claims that audit themselves. / Six AI agents take a claim from one sentence to a decision."

States the value in the first beat. Runs 0.0–3.0s.

## Frame 2 — Sign in

- scene: The cursor travels to "Sign in as Employee" and clicks. A short hand-off beat.
- duration: 2.5s
- transition_in: crossfade inside the window
- status: built
- src: compositions/02-signin.html
- shape: cursor-ui-demo
- capture: public/shots/02-role-select.png
- caption: "Three roles, one workflow / Employee, manager, finance."

Tells the viewer whose screen they are about to see. Runs 3.0–5.5s.

## Frame 3 — Submit

- scene: The cursor clicks the "+" button, the claim dialog opens, the description types in line by line, then the cursor moves to "Continue".
- duration: 5s
- transition_in: crossfade inside the window
- status: built
- src: compositions/03-submit.html
- shape: prompt-type-submit-generate (type, then press)
- capture: public/shots/06-claim-typed.png
- caption: "01 · Submit / Just describe the expense. / No form to fill in. The agents pull out vendor, amount and category."

The input is the product's first surprise: plain language. Runs 5.5–10.5s.

## Frame 4 — Agents work

- scene: The claim's progress steps light up in order, then a push toward the Agent Intelligence card. Hold for a full second.
- duration: 4.5s
- transition_in: crossfade inside the window
- status: built
- src: compositions/04-agents.html
- shape: device-surface-showcase (screen swap) + punch-in, then a held frame
- capture: public/shots/04-employee-dashboard.png
- caption: "02 · Agents work / It caught a duplicate Canva Pro seat. / Parsed, checked against policy, and compared with existing licences."

The core of the product: the agents found something a person would miss. Runs 10.5–15.0s.

## Frame 5 — Manager decides

- scene: The cursor grabs the top card and drags it right. The card tilts, leaves, and the real "Claim Approved Digitally" toast appears.
- duration: 4.5s
- transition_in: crossfade inside the window
- status: built
- src: compositions/05-manager.html
- shape: cursor-ui-demo (drag)
- capture: public/shots/07b-manager-dragging.png
- caption: "03 · Decide / Managers swipe only the edge cases. / Every card carries the agent's reasoning."

Shows what reaches a human, and how little effort it takes. Runs 15.0–19.5s.

## Frame 6 — Finance governs

- scene: Slow push from the four headline numbers down to the policy cards. The cursor rests on "Business justification required".
- duration: 3.5s
- transition_in: crossfade inside the window
- status: built
- src: compositions/06-finance.html
- shape: cursor-ui-demo + device-surface-showcase (screen swap)
- capture: public/shots/08-finance.png
- caption: "04 · Govern / Finance writes the rules. / Eight policies drive every automatic decision."

Where the automatic decisions come from. Runs 19.5–23.0s.

## Frame 7 — Audit proves

- scene: The cursor clicks claim CLM-2024-047, the record opens to its audit analysis, and the cursor moves to "Verify on Ledger".
- duration: 4s
- transition_in: crossfade inside the window
- status: built
- src: compositions/07-audit.html
- shape: cursor-ui-demo + device-surface-showcase (screen swap)
- capture: public/shots/10-audit-expanded.png
- caption: "05 · Prove / Every decision leaves a ledger record. / Which agent decided, who was notified, and when."

The decisions can be checked afterwards. Runs 23.0–27.0s.

## Frame 8 — Sign-off

- scene: The window eases back and dims behind the title. One move, then still.
- duration: 2.5s
- transition_in: crossfade
- status: built
- src: compositions/08-signoff.html
- shape: titlecard-reveal
- capture: public/shots/01-splash.png
- caption: "Orion / Top 24 of 100+ teams · UMHackathon 2026"

The result, and the loop point back to frame 1. Runs 27.0–29.5s.
