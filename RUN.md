# Running CE/JM Tutoring

## Prerequisites

- Node.js 22+
- npm

## 1. Install dependencies

```bash
npm install
```

## 2. Run it locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The footer will show `CE/JM WEB · BUILD DEV`
since no release build number is set locally.

## 3. Build for production

```bash
npm run build
npm start
```

To preview it with a real-looking build number, set the env vars the release workflow sets:

```bash
NEXT_PUBLIC_BUILD_NUMBER=42 NEXT_PUBLIC_RELEASE_TAG=v1.0.0 npm run build
npm start
```

## Checks (run all four before considering a change done)

```bash
npm run lint        # ESLint
npm run typecheck   # tsc --noEmit
npm test            # Vitest
npm run build       # production build
```

Optional formatting:

```bash
npm run format        # write formatting fixes
npm run format:check  # check only, no writes
```

## Routes

| Path       | Page                                          |
| ---------- | ---------------------------------------------- |
| `/`        | Home — hero, subject focus, closing CTA        |
| `/staff`   | Tutor profiles with canvas dot-matrix portraits |
| `/contact` | Booking link (Setmore) + direct tutor emails   |

## Notes

- Booking happens on Setmore (external), opened in a new tab from `/contact`. There's no
  in-app booking backend to run.
- See [README.md](README.md) for the full release/build-number procedure.
