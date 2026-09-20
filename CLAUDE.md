# CE/JM Tutoring — Claude Code Build Plan

You are building a polished, production-ready tutoring website for **CE/JM Tutoring**, a Beaumont High School peer-tutoring service focused on Chemistry and Integrated Math III (IM3).

Treat this document as the implementation contract. Do not replace the visual direction with a generic SaaS, template, or AI-generated landing page. The finished site should feel editorial, precise, academic, and distinctly built for Beaumont High students.

## 1. Product goal

Build a responsive Next.js application with three routes:

- `/` — Home: clear value proposition, subject focus, and conversion to booking.
- `/staff` — Tutors: interactive tutor profiles with canvas dot-matrix portraits.
- `/contact` — Booking: session request form plus direct contact actions.

Primary conversion: get a student from the home page to a completed session request with as little friction as possible.

## 2. Non-negotiable brand system

### Content

Use direct, confident language written for high-school students and families. Do not use filler such as “unlock your potential,” “empower,” “journey,” “holistic,” or “transformative.” Explain exactly what is taught and what the student can do next.

Brand:

- Name: **CE/JM Tutoring**
- School: **Beaumont High School (BHS)**
- Chemistry tutor: **Caden Erwin**
- Chemistry and IM3 tutor: **Jayden McCarthy**

### Colors

Define these as CSS variables and Tailwind tokens:

- `--brand: #241B79`
- `--obsidian: #07070C`
- `--paper: #FFFFFF`
- `--ink: #0D0C1D`
- `--chalk: #F4F4F9`
- `--brand-tint: rgba(36, 27, 121, 0.15)`

Use indigo as a deliberate signal color, not as a full-page gradient. Use strong light/dark section changes, fine rules, technical labels, generous whitespace, and asymmetrical composition. Avoid excessive rounded cards, centered purple gradients, stock imagery, and decorative copy that says nothing.

### Type and motion

Use a high-quality display face for headings and a highly legible sans-serif for body/UI text. Establish a clear type scale with readable line lengths and visible focus states.

Motion should communicate interaction:

- Framer Motion for entrances, layout transitions, springy hover states, and modal transitions.
- Canvas requestAnimationFrame for particle physics.
- Respect `prefers-reduced-motion`; disable cursor trails, particle displacement, and nonessential transitions for reduced-motion users.
- Never make motion necessary to read content or submit a form.

## 3. Recommended stack and setup

Use:

- Next.js 15 App Router
- TypeScript in strict mode
- Tailwind CSS with CSS custom properties
- Framer Motion
- `lucide-react`
- HTML5 Canvas for the dot-matrix portrait and optional reactive grid
- Zod for form validation
- React Hook Form for controlled form behavior
- ESLint, Prettier, and a test runner suitable for the chosen setup

Prefer a small dependency footprint. Do not add Three.js, GSAP, or Lenis unless the interaction cannot be achieved cleanly with native browser APIs, Framer Motion, and Canvas.

Suggested structure:

```text
app/
  layout.tsx
  page.tsx
  staff/page.tsx
  contact/page.tsx
  globals.css
components/
  layout/Navbar.tsx
  layout/Footer.tsx
  motion/MagneticButton.tsx
  motion/Reveal.tsx
  effects/ReactiveGrid.tsx
  effects/DotMatrixPortrait.tsx
  staff/TutorCard.tsx
  booking/BookingForm.tsx
  booking/BookingModal.tsx
  ui/CopyEmailButton.tsx
lib/
  tutors.ts
  site.ts
  build.ts
public/
  portraits/
  brand/
.github/workflows/
  release.yml
  ci.yml
CLAUDE.md
README.md
```

Keep tutor data in one typed source (`lib/tutors.ts`) so the staff page, contact page, and footer cannot drift apart.

## 4. Page implementation requirements

### Global navigation

Create a floating but restrained navigation bar:

- Brand mark/text on the left.
- Links: Home, Staff, Contact / Book.
- Primary “Book a Session” action.
- Keyboard-accessible mobile menu with escape-to-close and focus management.
- Active route styling.
- Do not rely on hover alone to expose navigation information.

### Home `/`

#### Hero

Headline: **“Master Chemistry & IM3 at Beaumont High.”**

Supporting copy: **“Direct peer-led instruction tailored to BHS class standards and exam formats. Led by Caden Erwin & Jayden McCarthy.”**

Include:

- Primary CTA: Book a Session → `/contact`
- Secondary CTA: Meet the Tutors → `/staff`
- A responsive reactive vector/grid field in the background. It should be subtle, high-performance, and never compete with the headline.
- A small credibility strip using factual labels such as `CHEMISTRY`, `IM3`, `BHS-FOCUSED`.

#### Subject focus

Use an asymmetrical bento layout with two strong cards:

Chemistry topics:

- Stoichiometry
- Thermodynamics
- Lab reports
- Exam preparation

IM3 topics:

- Polynomials
- Trigonometry
- Rational functions
- Logarithms

Hover/focus effects may expose a molecular wireframe or coordinate-grid treatment, but preserve a static equivalent on touch and reduced motion.

#### Closing CTA

End with a clear, short invitation to request a session. Link to `/contact`.

### Staff `/staff`

Header:

- Title: **“The Tutors”**
- Subtitle: **“Beaumont High students equipped with proven mastery in STEM coursework.”**

Create two tutor cards with:

- Name
- Subject badge(s)
- Short, specific bio
- Email address
- Copy-email action with a non-blocking success toast
- Mailto action
- Accessible portrait label and fallback

#### Dot-matrix portrait

Implement `DotMatrixPortrait` as a client component with this behavior:

1. Load an image into an offscreen canvas.
2. Draw it at a responsive, bounded resolution.
3. Read pixel data and sample on a configurable step (start around 4–6 pixels; tune for performance).
4. Map luminance/alpha to dot opacity and size.
5. Store each particle with `x`, `y`, `originX`, `originY`, `vx`, `vy`, color, and size.
6. Apply pointer repulsion within a radius.
7. Apply spring force toward the original position and damping each frame.
8. Keep the portrait blended into the ambient field at rest; focus/hover should sharpen it.
9. Cancel animation frames and remove listeners on unmount.
10. Handle image loading failure by rendering a branded abstract portrait fallback, never a broken image.

Canvas requirements:

- Use device-pixel-ratio scaling without creating unbounded canvases.
- Resize with `ResizeObserver`.
- Avoid `getImageData` on every animation frame.
- Do not use pointer events to block scrolling.
- Provide an accessible text portrait fallback for screen readers.
- Make the effect decorative with `aria-hidden` where appropriate while keeping tutor text in the DOM.

### Contact `/contact`

Title: **“Lock In Your Session”**.

Provide a prominent “Launch Session Request Form” action. The form may be inline or modal, but it must be usable directly on mobile and with a keyboard.

Fields:

1. Student full name — required
2. Student email — required; show the `@beaumontusd.k12.ca.us` helper, but do not reject a family email without an explicit product decision
3. Course — Chemistry, IM3, or Both
4. Preferred tutor — Caden, Jayden, or First Available
5. Specific topics or upcoming exam date — optional textarea

Validation:

- Show field-level errors near the relevant field.
- Preserve entered values after validation errors.
- Show a clear success state with what happens next.
- Do not pretend to send data if no backend exists. In the first version, use a configurable submission adapter: mailto fallback or a clearly marked endpoint from environment variables.
- Never expose secrets in client code.

Also show direct email cards for both tutors with one-click mailto and copy actions.

## 5. Footer requirements — mandatory

Build a reusable `Footer` rendered from `app/layout.tsx` so it appears on every route.

The footer must include **all tutor information**, sourced from `lib/tutors.ts`:

- Caden Erwin — Chemistry Tutor — `cerwin42451@beaumontusd.k12.ca.us`
- Jayden McCarthy — Chemistry & IM3 Tutor — `jmccarthy35750@beaumontusd.k12.ca.us`

For each tutor, include their name, focus/title, visible email, mailto link, and copy-email action. Include links to Home, Staff, and Contact / Book, plus the Beaumont High School association and a short factual copyright line.

### Website build number

The footer must visibly show the current website build number in a small technical metadata row, for example:

`CE/JM WEB · BUILD 42`

Implement this as release-derived metadata, not a hard-coded string in the component:

- Add `lib/build.ts` exporting a typed build-info object.
- Read `NEXT_PUBLIC_BUILD_NUMBER` and `NEXT_PUBLIC_RELEASE_TAG` at build time.
- In local development, show `DEV` or a safe fallback rather than an empty value.
- In production, show the numeric release build and, if available, the release tag/date in an accessible tooltip or adjacent text.
- Never expose private environment values.

Release behavior:

- Add `.github/workflows/release.yml` that runs on a published GitHub Release.
- Use the GitHub Actions run number (or another monotonically increasing release number) as `NEXT_PUBLIC_BUILD_NUMBER` during the production build/deploy.
- Pass the release tag as `NEXT_PUBLIC_RELEASE_TAG`.
- Ensure every new published release produces a different build number.
- Document the release procedure in `README.md`.
- Add a CI assertion/test that production build metadata is not blank and that development fallback remains available.

If deployment is later moved from GitHub Actions to another host, preserve the same environment-variable contract.

## 6. Accessibility and quality bar

Before considering the site complete:

- Full keyboard navigation works on desktop and mobile menu/modal flows.
- Visible `:focus-visible` styles use sufficient contrast.
- Correct heading hierarchy and landmark elements exist.
- Buttons are buttons; links are links; interactive canvas effects do not replace semantic controls.
- Images have useful alt text or are explicitly decorative.
- Color contrast meets WCAG AA for normal text.
- Forms announce errors and success states.
- Layout works from 320px wide through large desktop screens.
- No horizontal overflow caused by canvas or motion.
- Test with reduced motion and a touch device.
- Run lint, typecheck, tests, and production build before handoff.

## 7. Performance and resilience

- Keep the first viewport lightweight; lazy-load noncritical effects.
- Pause or reduce canvas work when the component is offscreen using `IntersectionObserver`.
- Cap particle counts on low-power/mobile devices.
- Avoid layout shifts by reserving portrait and image dimensions.
- Use optimized local assets with appropriate dimensions.
- Ensure the site remains fully readable if JavaScript or Canvas effects fail.

## 8. SEO and metadata

Add route-aware metadata:

- Title: `CE/JM Tutoring | Chemistry & IM3 at Beaumont High`
- Description that names Chemistry, IM3, Beaumont High, and peer tutoring.
- Open Graph metadata with a branded fallback image.
- Semantic `Organization`/`EducationalOrganization` data only for facts actually supported by the site.
- Do not claim certifications, grades, guarantees, or outcomes that were not provided.

## 9. Delivery sequence

Implement in this order:

1. Scaffold Next.js, TypeScript, Tailwind, linting, and global tokens.
2. Add typed site/tutor/build data models.
3. Build layout, navigation, footer, and route shells.
4. Build home content and responsive bento sections.
5. Build staff cards and the canvas portrait effect.
6. Build booking form, validation, success/error states, and email actions.
7. Add release workflow and build-number metadata.
8. Add responsive/accessibility/performance polish.
9. Run all checks and manually verify desktop, mobile, keyboard, reduced motion, and canvas-failure behavior.

## 10. Definition of done

The work is complete only when:

- All three routes are functional and visually coherent.
- The footer appears everywhere and contains both tutors’ complete information.
- The footer shows a non-empty development fallback and a release-derived production build number.
- A new published GitHub Release changes the displayed production build number.
- The site is beautiful without relying on generic AI visual conventions.
- No placeholder copy, broken images, console errors, hydration warnings, or inaccessible modal/menu traps remain.
- `npm run lint`, `npm run typecheck`, `npm test`, and `npm run build` pass.
