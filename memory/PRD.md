# Daali Pictures — Cinematic Animation Enhancement

## Original Problem Statement
Enhance the EXISTING Daali Pictures cinematic website (React + TypeScript + Vite, Lovable source) with a
sophisticated, premium, cinematic animation system WITHOUT redesigning anything. Layout, alignment,
section order, dimensions, spacing, typography, colors, image sizes/crops, content, navigation,
breakpoints, component structure and visual identity are all locked. Animation is an additive layer:
opacity/transform/scale/clip only, no layout shift, IntersectionObserver-style scroll reveals that
fire once, `prefers-reduced-motion` support, consistent timing scale (micro 150-250ms / standard
600-900ms / cinematic 900-1600ms) with `cubic-bezier(0.22, 1, 0.36, 1)` easing, plus framer-motion
scroll reveals and lenis smooth momentum scrolling.

## User Personas
- Film fans / visitors browsing Daali Pictures productions and Daali Dhananjaya's profile
- Collaborators/press using the contact form
- Community members registering for Abhimani Sangha events

## Architecture
- Frontend: the user's uploaded Lovable source (React 19 + TypeScript + Vite 8), now served as
  /app/frontend via `yarn start` (vite dev server, port 3000, supervisor-managed).
  CRA template backed up at /app/frontend-cra-bak.
- Backend: untouched FastAPI template (site is frontend-only; forms are client-side).
- Motion layer:
  - `src/shared/motion/index.tsx` — MOTION_EASE, VIEWPORT_ONCE, fadeUp/fadeSide helpers, MotionLink
  - `src/shared/motion/useSmoothScroll.ts` — lenis smooth scrolling + scroll-to-top on route change
  - `src/shared/styles/motion.css` — motion tokens, header/nav/film-strip/button/footer/modal CSS,
    reduced-motion block (imported LAST after global.css)
  - `MotionConfig reducedMotion="user"` in providers.tsx

## Implemented (2026-08-15, round 7 — heading replays)
- SplitChars view-mode headings now REPLAY their letter-by-letter transition on every scroll pass:
  IntersectionObserver toggles inView both directions (chars reset when the heading fully leaves,
  rise again on re-entry). Applies to all section headings site-wide. Load-gated hero headings
  still replay per page visit via the panel transition

## Implemented (2026-08-15, round 6 — glow spread, ember motion, real forms, ring drag)
- Warm ember grade extended to Productions (maroon ambience behind heading + mid-page ember) and
  Sangha (hero warm melt, stats/upcoming/cta/gallery blooms) — all additive CSS in motion.css
- Hero ember: two warm radial lights drift slowly (34s alternate, GPU transform only), disabled
  under reduced motion
- Forms are now REAL: POST /api/contact and POST /api/sangha/register (FastAPI + MongoDB,
  contact_messages / sangha_registrations collections, GET list endpoints for reads).
  ContactForm shows Sending…/Message Sent ✓/error states; Sangha modal registration posts with
  event title and shows success only on 2xx
- Orbit ring is draggable with momentum: pointer drag maps to clamped scroll progress
  (2.4x ratio, immediate lenis scroll), release applies a gentle clamped flick, clicks after a
  drag are suppressed; touch keeps vertical scrolling via touch-action: pan-y; cursor grab/grabbing

## Implemented (2026-08-15, round 5 — PDF landing-page warm color grade)
- Applied the client's Landing Page.pdf color grading: hero gets an amber-to-maroon melt overlay
  (warm tint at top, deep sienna #36140e→#150908 fade at bottom), mission section carries a deep
  maroon radial glow (#2b1114→#190b0d) bleeding out of the hero, ember glow behind the profile
  portrait, maroon blooms into Beyond Filmmaking (top-left) and Sangha CTA (left), subtle warmth
  at contact top settling into pure black #050505 (base bg was already exact)
- Colors pixel-sampled from the PDF render for fidelity; all additive CSS in motion.css, zero
  layout/asset changes

## Implemented (2026-08-15, round 4 — reference-style reactive About portrait)
- About page hero portrait now mirrors lukebaffait.fr's hero treatment: the portrait frame tilts
  in 3D toward the cursor (spring-smoothed rotateX/rotateY, perspective 1000) while the inner
  image counter-translates at 1.08 scale for a depth-parallax feel, and a soft-light highlight
  blob follows the mouse across the photo
- Frame gained the reference's corner "+" registration marks and a blurred red glow halo behind
  it; the hero veil gained one extra red radial at top for the same crimson ambience
- Tilt auto-disables on touch devices (hover:none) and under prefers-reduced-motion;
  entry animation, red edge bar, name/roles/bio and all original layout unchanged

## Implemented (2026-08-15, round 3 — orbital poster gallery)
- Home "Our Productions" rebuilt as a scroll-driven 3D poster orbit inspired by lukebaffait.fr's
  circle-gallery: the section is tall (~416vh) with a sticky full-viewport stage; 6 posters travel
  an elliptical ring (translate3d x/z + rotateY tangent-facing, perspective 1500px) driven by
  framer-motion useScroll; depth controls opacity (0.16-1), scale (0.8-1) and
  brightness/saturate so the front poster is full-color and the backs fade to mono
- Active film meta (status/title/year/genre) crossfades below the stage; prev/next arrows and
  poster clicks smooth-scroll (via lenis scrollToY helper) to the matching snap point;
  "Scroll to explore" hint pulses subtly
- Fallback: original flat swipe carousel kept intact for ≤960px viewports and reduced-motion users
- Fixed: `.home-productions` overflow:hidden silently broke the sticky pin — orbit variant now
  uses overflow:clip (still no horizontal scrollbars)

## Implemented (2026-08-15, round 2 — lukebaffait.fr-inspired motion package)
- Cinematic preloader: black screen, "DAALI." logo revealed letter-by-letter (Bebas, red dot),
  then red + black panels rise from the bottom and wipe upward to unveil the page (~2.9s total);
  locks scroll during intro, unmounts after; IntroContext gates hero entrances until panels lift;
  skipped entirely under prefers-reduced-motion
- Page transitions: red-then-black panel wipe on every route change (cover 0.42s, reveal 0.55s,
  red leads in / trails out), via useAnimationControls keyed on pathname; skipped under reduced motion
- Kinetic split-letter headings (SplitChars component): every major heading animates char-by-char
  through overflow masks (32ms stagger, 0.65s, cinematic ease) — SectionHeading (all usages),
  home productions title, profile name, Sangha CTA, contact title lines, productions page h1,
  about hero name, sangha hero/upcoming/cta headings. Word-level wrapping preserved for
  responsive; accent/red coloring preserved via outer class spans + split-plain overrides.
  Reveal is driven by a deterministic passive-scroll check (fires at 88% viewport) instead of
  IntersectionObserver so instant scroll jumps can never leave text hidden
- Fixed: IntroContext setter instability re-running preloader timers; missing imports after edits

## Implemented (2026-08-15, round 1)
- Page load: header fade + -10px settle (850ms); home/about hero image 0.85→1 opacity + 1.03→1 scale
  (1.5s) + subtle scroll parallax (56px over hero scroll distance)
- Header: red underline indicators (scaleX 0→1, hover + active page); mobile menu link stagger (70ms steps)
- Film strips: seamless infinite slow reel via WAAPI (measured tile height, linear, ~10-30s/tile),
  reduced-motion safe
- Global scroll reveal: framer-motion whileInView (once, 20% threshold), fadeUp 26-30px / 0.7-0.95s
- SectionHeading: heading rise + delayed accent-word reveal
- Mission: ORIGINAL line-detection reveal kept untouched (already compliant: 720ms/140ms stagger)
- Productions carousel: original transform system kept; shell + header fade-up added; nav hover
  scale 1.05 (existing); swipe/pointer preserved
- Profile spotlight: media scale 1.03→1 (1.1s), staggered name/roles/tags/bio (100ms), hover zoom 1.02 clipped
- Beyond Filmmaking: 100ms card stagger; icon -3px / title -2px hover nudges
- Sangha CTA: heading → body → button stagger, arrow +5px on hover, image fade-up
- Contact: copy slides from -20px, form from +20px (0.8s); red focus ring on fields; submit shows
  "Message Sent ✓" state (frontend-only, MOCKED — no backend persistence)
- Productions page: cards reveal translateY 30 + scale .98→1 sequentially; play modal gets cinematic
  fade + scale .97→1 entry; play button hover 1.08 with red glow
- About: hero/portrait/name/roles/bio sequential entrance; stats keep flex indicator + added
  count-up numbers (eased, in-view once); awards wall 90ms stagger + trophy hover lift/scale 1.04;
  Beyond Cinema stagger + modal kept original spring open/close (Escape/backdrop/back button intact)
- Sangha: hero/caption/subtext stagger, stats 80ms stagger, event cards rise, gallery tile stagger
  (scale .98→1), event modal + registration success flow verified
- Footer: fade-up reveal, link hover lift + underline draw
- Buttons: global standard hover translateY(-1px) scale(1.01), active scale(.99), 200ms
- Accessibility: full prefers-reduced-motion coverage (CSS + framer MotionConfig + lenis disabled)
- data-testid attributes on all key interactive elements

## Verified
Home/mission/carousel (ZEBRR→RED HOUR)/contact submit, About stats count-up + awards + Beyond Cinema
modal (open + Escape close), Productions play modal (video + close), Sangha event registration success,
mobile 390px (menu stagger, nav, no horizontal overflow), reduced-motion emulation (content instantly
visible), zero console errors.

## Backlog
- P1: Wire contact + event registration forms to backend (POST /api/contact, /api/sangha/register)
- P1: Replace `<a href="#terms">` footer placeholders with real pages/modals
- P2: Trailer modal close animation (currently unmounts instantly; open is animated)
- P2: Sangha event modal Escape-key + focus-trap parity with BeyondCinemaModal
- P2: Production build pipeline (vite build + static serve) for deployment
