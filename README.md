# EiFlow

EiFlow is a local-first personal productivity operating system built around a calmer idea of progress: make the next thing clear, protect space for focus, and notice the patterns that help.

## Run locally

Requirements: Node.js 22+ and npm.

```bash
npm ci
npm run dev
```

Open the local URL printed by Vite. A production build can be checked with:

```bash
npm run build
npm run preview
```

No API keys, external databases, authentication providers, or environment variables are required.

## Architecture

- **React + TypeScript + Vite** provide the application runtime and type-safe component model.
- **Tailwind CSS** supplies the responsive visual system; `src/index.css` contains the design tokens, dark-mode overrides, grid texture, and reduced-motion behavior.
- **Local-first state** is held in a single typed `AppState` object and persisted with `src/hooks/useLocalStorage.ts` under `eiflow-state-v1`.
- **Seeded demo data** lives in `src/data.ts`, with dates generated relative to the current day so the demo stays useful after refreshes.
- **Reusable UI primitives** are in `src/components/ui.tsx`; navigation and common display patterns are in `src/components/common.tsx`.
- **Product views** are split into `dashboard.tsx`, `tasks.tsx`, and `flow-views.tsx`; `App.tsx` owns state transitions and page routing.

## Implemented feature checklist

- [x] Guided onboarding for name, primary goal, working hours, energy pattern, and habits (available from Settings)
- [x] Skippable and repeatable onboarding from Settings
- [x] Personalized Today dashboard with greeting, date, score, tasks, schedule, habits, goals, and focus start
- [x] Task list and board views
- [x] Task search and filters for priority, category, status, and due date
- [x] Task create, edit, complete, delete, status movement, priorities, categories, due times, and detail modal
- [x] Drag-and-drop task movement across board columns
- [x] Habit creation with frequency, target days, icon, and color
- [x] Habit check-ins, current/best streaks, weekly grid, percentage, and detailed habit modal
- [x] Goal creation with target date, description, category, status, color, and milestones
- [x] Automatic milestone-based goal progress and milestone check-off
- [x] Active, completed, and paused goal views with a strong detail surface
- [x] Weekly planner with deep work, meetings, exercise, personal, and study blocks
- [x] Create, edit, delete, and drag-to-move planner blocks
- [x] Clear visual separation between scheduled blocks and due tasks
- [x] Functional 25/45/60-minute focus timer with start, pause, resume, reset, and completion state
- [x] Optional task/goal linking for focus sessions
- [x] Focus session history stored locally
- [x] 7-day and 30-day analytics for tasks, habits, focus, goals, best day, and best time
- [x] Light, dark, and system theme modes
- [x] Profile and working-hour preferences
- [x] Safe JSON export/import, seeded demo reset, and onboarding restart
- [x] Responsive desktop, tablet, and mobile navigation
- [x] Keyboard-visible focus states and reduced-motion support

## Data and privacy

EiFlow stores data in the browser's localStorage only. Use Settings → Export all data as JSON for a portable backup. Import validates record shape, unique identifiers, and cross-record references before replacing the current workspace; invalid files leave the existing data untouched.

## Public releases

The public repository is [EternalWhiskers/Ei-flow](https://github.com/EternalWhiskers/Ei-flow). Every semantic-version tag such as `v1.0.0` runs the release workflow in `.github/workflows/release.yml`, audits dependencies, builds the web app, synchronizes Capacitor, and publishes a GitHub Release containing:

- `eiflow-<tag>-web.tar.gz` — the production web bundle
- `eiflow-<tag>-debug.apk` — an installable debug APK for evaluation
- `SHA256SUMS` — checksums for the release assets

To publish a release after pushing the repository:

```bash
git tag v1.0.0
git push origin v1.0.0
```

The APK in the automated release is intentionally debug-signed because no Android release keystore was supplied. It is not suitable for Google Play or a production Android distribution. A future signed Android release should use an organization-owned keystore and GitHub Actions secrets for the keystore contents and passwords; signing material must never be committed to this repository.

## License

EiFlow is released under the [MIT License](LICENSE), copyright © 2026 EternalWhiskers.
