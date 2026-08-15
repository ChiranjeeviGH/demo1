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

## Implemented (2026-08-15)
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
