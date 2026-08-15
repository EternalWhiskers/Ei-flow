# EiFlow design research

**Research date:** 2026-08-14
**Scope:** premium consumer productivity operating system redesign across desktop, tablet, and mobile.

## Research access note

I attempted the requested Mobbin MCP searches for productivity dashboards, task managers, habit trackers, goals, planners, focus timers, analytics, onboarding, and settings. The MCP returned a paid-plan requirement before any screen results or Mobbin canonical links were available, so this document does **not** pretend that Mobbin screens were examined. As a transparent fallback, I studied publicly accessible product documentation and product pages from the products below, then used their recurring interaction patterns rather than copying a single screen.

Source content was rephrased for compliance with licensing restrictions. The references are included so the source context is inspectable.

## 1. Products and flows examined

| Product / flow | What was useful to study | Source |
| --- | --- | --- |
| Sunsama timeboxing and daily planning | Tasks become visible against real available capacity; time blocks can be moved and the day has a deliberate shutdown edge. | [Sunsama timeboxing](https://sunsama.com/features/timeboxing), [Sunsama daily planning](https://help.sunsama.com/docs/usage-guides/daily-planning/) |
| Todoist list / board layout | List and board are two views of the same work; columns represent phases, tasks remain movable, and filters make an intentionally smaller view. | [Todoist board layout](https://todoist.com/help/articles/how-to-use-board-view), [Todoist filters](https://todoist.com/help/articles/introduction-to-filters/) |
| Streaks habit tracker | Completion is a low-friction tap, streak history is visible without a heavy dashboard, and habits have a strong personal visual identity through colors and icons. | [Streaks](https://streaks.app/), [Streaks on the App Store](https://apps.apple.com/us/app/streaks/id963034692) |
| Asana Goals | A goal is more useful when its work and checkpoints are connected; progress should update from the underlying milestones instead of asking for a second manual score. | [Asana Goals](https://help.asana.com/s/article/setting-and-tracking-progress-towards-goals?), [Asana progress sources](https://help.asana.com/s/article/progress-status-and-connecting-work-to-goals?language=en_US) |
| Week Plan / weekly planning | A week is easier to act on when goals, priorities, and time blocks are shown together without pretending every minute is known. | [Week Plan weekly planner](https://weekplan.net/weekly-planner/) |
| Headspace timers | A focus timer is a calm single-purpose ritual: choose a duration, press play, and keep the visual field quiet while the session is active. | [Headspace timers](https://www.headspace.com/content/topics/timers/60), [Headspace focus](https://www.headspace.com/meditation/focus) |
| Fabulous onboarding and habit coaching | Onboarding asks about the person before asking for setup; the sequence frames habits as support for a better day rather than as a score. | [Fabulous onboarding](https://www.thefabulous.co/onboarding/onboarding/initial), [Fabulous product](https://www.thefabulous.co/landing/) |
| Strava progress summary | Progress is easier to interpret when a range switch changes the chart, metrics have a clear unit, and the chart can lead back to the activities that created the data. | [Strava progress summary](https://support.strava.com/en-us/articles/15401618-progress-summary-chart), [Strava activity page guide](https://stories.strava.com/articles/strava-guide-your-activity-page-101) |
| Notion appearance settings | Theme choices are explicit and grouped under appearance; system, light, and dark are understandable without hidden color logic. | [Notion appearance settings](https://dev.notion.so/help/appearance-settings), [Notion theme options](https://www.notion.com/help/edit-and-customize-your-notion-sites) |

## 2. Useful recurring patterns

### Orient before optimize
- A strong “today” surface answers three questions immediately: what day is this, what deserves attention, and how much capacity remains.
- One primary next action is more helpful than a grid of equal-weight metrics.
- A lightweight daily narrative makes productivity feel personal without adding a coaching layer that blocks action.

### Work has multiple useful views
- List view is for scanning and editing details; board view is for seeing flow and moving work.
- A view toggle should preserve the same task data, not create separate mini-products.
- Filters should reduce noise and be reversible in one click. Search and filters belong together in a compact control rail.

### Habits need tactile progress
- A habit check-in should be a large, high-confidence target with immediate visual feedback.
- The useful metrics are current streak, best streak, planned vs. completed for the week, and a small history grid.
- Color and icon are identity cues, not decoration scattered across every card.

### Goals need a causal model
- Milestones are better than a manually edited percentage because every completed checkpoint explains the number.
- A goal detail view should connect the “why,” target date, progress, and next milestone in one readable composition.
- Active, paused, and completed states need different treatment but the same underlying object.

### Time blocks and tasks are not the same thing
- A block is a container for attention; a task is an outcome inside that container.
- The planner should make capacity visible and let a block move between days without losing its identity.
- Scheduled work should look like a schedule; task lists should look like work queues. Reusing the same card style for both creates ambiguity.

### Focus is a ritual, not a dashboard
- Presets and a single primary control create a low-cognitive-load start.
- The linked task or goal is supporting context, not competing content.
- The complete state deserves a short, affirming handoff into the next action and a local session record.

### Analytics should reveal a pattern
- Range controls should change the story, not just the number of bars.
- Every metric needs a unit and a readable label; color alone cannot carry meaning.
- The best day / best time callout is more actionable than a wall of charts.

### Settings should be calm and reversible
- Appearance choices should be explicit, visible, and grouped.
- Data export/import and reset need clear labels, safe validation, and a recovery path.
- Destructive actions should be visually separated from everyday preferences.

## 3. Patterns intentionally rejected

- **Copying a single competitor's shell:** EiFlow combines task, habit, goal, calendar, focus, and reflection. A one-product clone would flatten the product into a task manager or calendar.
- **Admin-dashboard card wall:** Equal-weight metric cards and dense tables make personal productivity feel like reporting work. EiFlow will use one dominant story per page and supporting panels only where they clarify a decision.
- **Gamified streak pressure:** No fireworks, leaderboards, punitive red states, or “perfect day” language. EiFlow should help a person return without turning recovery into failure.
- **Opaque auto-scheduling:** EiFlow lets people move blocks and choose their own timing; it will not silently rearrange a day or claim predictive intelligence.
- **Overly decorative wellness screens:** Focus mode will be quiet and warm, not a full-screen gradient, stock illustration, or ambient visualizer that steals attention.
- **Calendar-only task planning:** A weekly view is useful, but forcing every task into a time slot is not. Tasks can remain unscheduled and still be first-class.
- **Progress rings everywhere:** One score/ring can orient the dashboard, but repeated rings obscure the underlying work. Lists, grids, and compact bars will carry most progress.
- **Hidden theme controls:** Light, dark, and system remain explicit and keyboard accessible.

## 4. EiFlow design system

### Design thesis

**EiFlow is a signal garden for attention:** a cool, mineral workspace where apricot signals the next action, mint confirms a return, and periwinkle maps time and reflection. It refuses both the gray enterprise console and the soft wellness dashboard; every color has a job, and every page makes one next decision easy.

### Visual direction

- **Mode:** operate with a humane editorial edge.
- **Material:** cool mist canvas, opaque mineral surfaces, dark pine navigation, thin graphite rules, and high-contrast signal marks.
- **Composition:** one large lead surface plus a supporting rail; avoid four equal cards as the default opening move.
- **Signature:** a “signal line” motif — 1px rules, small dot markers, and horizontal progress traces that connect a person’s next action to the larger rhythm.
- **Atmosphere:** quiet in the background, decisive in the foreground. No decorative blur as a default; depth comes from offset shadows and clear surfaces.

### Color roles

| Token | Value | Role |
| --- | --- | --- |
| `canvas` | `#EEF2F5` | Cool mist page background |
| `surface` | `#FBFCFD` | Primary opaque content surface |
| `surface-raised` | `#FFFFFF` | Elevated modal and focused control surface |
| `ink` | `#17242B` | Primary text and dark anchor |
| `muted` | `#64747D` | Secondary text, never for essential labels below contrast |
| `pine` | `#1E4842` | Primary action and navigation anchor |
| `apricot` | `#F4B36B` | Main action signal, focus progress, selected states |
| `mint` | `#7AD9BC` | Completion and healthy positive state |
| `periwinkle` | `#A7B6F5` | Planning and analytic context |
| `coral` | `#E98272` | Warning, overdue, and destructive actions |
| `line` | `rgba(23,36,43,.12)` | Borders and dividers |

Dark mode keeps the same roles: `canvas #10191D`, `surface #182329`, `surface-raised #202D33`, `ink #F3F7F5`, `muted #A5B3B7`, with pine, apricot, mint, periwinkle, and coral shifted only enough to maintain contrast.

### Typography

- **Display:** `"Arial Rounded MT Bold", "Trebuchet MS", ui-rounded, sans-serif`; use for page titles, timer numbers, goal titles, and the greeting. It is friendly without reading as a luxury editorial template.
- **UI/body:** `"Segoe UI", "Helvetica Neue", Arial, sans-serif`; use for controls, metadata, and longer descriptions.
- **Scale:** 12px metadata, 14px body compact, 16px body, 20px section title, 30–46px display depending on viewport.
- **Rules:** body line-height 1.5; display line-height 1.02–1.12; use letter spacing only on short labels; never use all-caps for sentences.

### Spacing scale

Base unit is 4px. Use `4, 8, 12, 16, 20, 24, 32, 40, 48, 64` as the shared rhythm. Page gutters are 20px mobile, 32px tablet, 48px desktop. Lead surfaces use 32–48px internal padding; controls use 12–16px.

### Corner radii

- `8px` for inputs, compact controls, and chart bars.
- `12px` for buttons, nav items, and small task rows.
- `18px` for primary surfaces and panels.
- `24px` only for onboarding, focus mode, and major feature moments.
- Avoid rounding every nested element; the parent surface establishes the shape.

### Shadows and borders

- Use opaque surfaces with a 1px graphite border.
- `shadow-surface`: `0 10px 30px rgba(23,36,43,.07)`.
- `shadow-lift`: `0 18px 50px rgba(23,36,43,.14)`.
- Hover state moves at most 2px and increases border contrast; do not animate images or create floating card stacks.

### Icon style

Use Lucide outline icons at 16px for controls, 18–20px for feature context, and 24px only for empty-state or primary focus moments. Stroke width is 1.8–2. Do not use emoji as functional iconography; habit identity can remain a user-selected icon rendered through Lucide.

### Motion principles

- Enter pages with one 320ms `ease-out` signal-line reveal and staggered content at 40ms increments.
- Buttons respond in 160–200ms with color, border, and a maximum 2px lift.
- Progress changes animate over 420ms so the cause and result feel connected.
- Timer state changes use a slow opacity/scale transition only; never pulse continuously while attention is meant to rest.
- Respect `prefers-reduced-motion` by removing transforms, stagger, and non-essential transitions.

### Chart style

- Use one baseline and one primary series per chart whenever possible.
- Bars are 8px wide on desktop, 6px on mobile, with a visible baseline and an accessible textual summary.
- Use apricot for completed effort, mint for positive consistency, periwinkle for planned time, and coral only for exceptions.
- Tooltips are supplemental; the chart must remain understandable from labels and nearby totals.

### Form style

- Labels are always visible above fields; placeholders are examples only.
- Inputs are 44px minimum height, opaque, lightly bordered, and focused with a 2px pine ring.
- Use progressive disclosure for optional notes, linking, and milestone details.
- Validation appears immediately under the relevant field in coral, with a recovery instruction.
- Modal forms have one clear primary action and a secondary cancel action.

### Empty states

Every empty state answers: what is missing, why it is useful, and what action creates it. Use a small signal-line icon or dot mark, a short human title, one sentence of help, and one primary action. Avoid illustrations that imply a missing asset or add visual noise.

### Mobile behavior

- Desktop rail becomes a five-item bottom navigation, with settings reachable from the avatar and the “more” surfaces from page controls.
- Preserve 44px touch targets and 8px gaps.
- Convert multi-column surfaces into a single lead column plus disclosure rows; never force dense horizontal tables.
- Planner keeps the seven-day selector and shows the selected day’s blocks/tasks as the primary mobile view.
- Board view scrolls within its own region and retains a clear list-view alternative.
- Focus mode uses the full available viewport with safe bottom padding above mobile navigation.

### Accessibility rules

- Minimum 4.5:1 contrast for body text and 3:1 for large text or UI boundaries.
- Every icon-only control has an accessible label and a visible focus ring.
- Status is never conveyed by color alone; pair it with text, shape, or icon.
- Keyboard users can operate navigation, view toggles, filters, dialogs, timer controls, and import/export actions.
- Dialogs use `role="dialog"`, `aria-modal`, a labelled heading, and click-away close only as a supplement to the close button.
- Motion is optional and disabled under `prefers-reduced-motion`.

## 5. Page-by-page redesign plan

### Onboarding
Replace the current large split onboarding with a compact “setup notebook” surface: a cool mist background, an anchored EiFlow signal mark, one question per step, and a small progress rail. Keep the five questions and skip behavior. Add a live summary strip showing what EiFlow will remember, so the user sees personalization building without a second form.

### Today dashboard
Make the greeting and “next best action” the first visual decision. Keep the score as a supporting signal, then use a two-column lead composition: open tasks on the left, today’s capacity timeline on the right. Move habits and goals into a lower “keep the rhythm” band with fewer competing cards. Use the signal-line motif to connect focus time, completion, and goal progress.

### Tasks
Keep the list/board toggle, but give the toolbar one clear hierarchy: search, saved view/filter controls, and new task. Make list rows denser and more scannable with a status dot, title, due label, and priority mark. Make board columns feel like workflow lanes rather than four card buckets, and retain drag-and-drop plus the detail modal.

### Habits
Lead with a large “today’s check-ins” row where each habit has a direct touch target and a compact streak label. Keep the weekly grid as the history proof, not the first view. Move best streak and completion percentage into a compact summary rail. Preserve create/edit/detail behavior and icon/color choices.

### Goals
Keep the strong goal detail screen but make the left goal index quieter and more editorial. Let the selected goal lead with title, why, target date, milestone trace, and a single progress bar. Add a clearer empty state for a new goal and keep active/completed/paused filtering visible.

### Planner
Make the week selector the anchor and treat scheduled blocks as colored time containers, with tasks shown as a separate “due on selected day” queue. Preserve drag-to-move, create/edit/delete, and categories. On mobile, prioritize selected-day blocks rather than shrinking seven columns.

### Focus mode
Keep the dark focus surface, but remove supporting controls from the timer’s visual center. Put presets above the timer, link controls in a quiet footer, and make the completion state an explicit “return to flow” moment. Preserve functional start, pause, resume, reset, presets, linking, and local session history.

### Analytics
Replace the generic metric-card opening with a single lead “rhythm” chart and a compact range switch. Add a summary row for completed work, habit returns, and focus minutes, then keep best day/time and goal/habit breakdowns below. Ensure chart labels and textual totals make the screen useful without hover.

### Settings
Use a simple preference rail with three groups: profile, appearance, and local workspace. Keep system/light/dark as visible choice tiles, preserve safe import validation, export, reset, and onboarding restart. Visually separate destructive reset controls and add a local-only privacy explanation.

### Shared shell and mobile
Use the new pine rail as a quiet anchor, reduce over-rounded surfaces, make active navigation an apricot signal with a clear label, and keep the mobile bottom bar to five high-frequency destinations. Apply the same radius, shadow, label, focus, and motion rules across every view.
