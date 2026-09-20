# CE/JM Tutoring

The website for CE/JM Tutoring — Chemistry and Integrated Math III (IM3) peer tutoring at
Beaumont High School, run by Caden Erwin and Jayden McCarthy.

Built with Next.js 15+ (App Router), TypeScript, Tailwind CSS v4, and Framer Motion.

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Script                 | What it does                                  |
| ---------------------- | ---------------------------------------------- |
| `npm run dev`          | Start the local dev server                    |
| `npm run build`        | Production build                              |
| `npm start`            | Serve a production build                      |
| `npm run lint`         | ESLint                                        |
| `npm run typecheck`    | `tsc --noEmit`                                |
| `npm test`             | Run the Vitest suite                          |
| `npm run format`       | Format the codebase with Prettier             |
| `npm run format:check` | Check formatting without writing              |

## Project structure

- `app/` — routes (`/`, `/staff`, `/contact`), root layout, global styles.
- `components/layout` — `Navbar`, `Footer` (rendered on every route from `app/layout.tsx`).
- `components/motion` — `Reveal` (scroll entrances) and `MagneticButton`, both Framer Motion.
- `components/effects` — `ReactiveGrid` (ambient hero background) and `DotMatrixPortrait`
  (canvas particle portrait used on `/staff`).
- `components/staff`, `components/booking`, `components/ui` — page-specific UI.
- `lib/tutors.ts` — the single source of truth for tutor data (name, subject, email, bio,
  portrait). The staff page, contact page, and footer all read from here so they can't drift.
- `lib/site.ts` — site-wide copy and navigation constants.
- `lib/build.ts` — reads the build metadata described below.

## Booking

The "Launch Session Request Form" button on `/contact` and the home page opens the studio's
Setmore booking page in a new tab. There is no in-house booking backend — Setmore owns
scheduling. Direct tutor emails (with one-click mailto and copy-to-clipboard) are always shown
alongside it as a fallback.

## Build number / release procedure

The footer shows a small metadata row — `CE/JM WEB · BUILD <n>` — sourced from
`lib/build.ts`, which reads two env vars at **build time**:

- `NEXT_PUBLIC_BUILD_NUMBER` — a build identifier. Locally, this is unset, so the footer shows
  `DEV` instead of going blank.
- `NEXT_PUBLIC_RELEASE_TAG` — the release tag (shown in a tooltip on the build number).

### Cutting a release

1. Merge everything you want released into `main`.
2. Publish a new [GitHub Release](../../releases) with a tag (e.g. `v1.3.0`).
3. `.github/workflows/release.yml` runs automatically on publish. It builds the app with:
   - `NEXT_PUBLIC_BUILD_NUMBER` set to `${{ github.run_number }}` — GitHub Actions' run number,
     which only ever increases, so every release gets a strictly higher build number than the
     last.
   - `NEXT_PUBLIC_RELEASE_TAG` set to the release's tag name.
4. The workflow uploads the production `.next` build as a workflow artifact. Deployment itself
   is intentionally left open — wire up whatever host you use (Vercel, a container platform,
   etc.) as an additional step in `release.yml`, as long as it's given those same two env vars
   at build time. See the commented example at the bottom of that file.

If you move off GitHub Actions entirely, keep the same `NEXT_PUBLIC_BUILD_NUMBER` /
`NEXT_PUBLIC_RELEASE_TAG` env var contract in your new build pipeline so the footer keeps
working without code changes.

## Continuous integration

`.github/workflows/ci.yml` runs on every push and pull request against `main`: lint, typecheck,
the Vitest suite (including an assertion that the dev build-number fallback is non-blank), and a
production build.
