# Tasklist Overlay

Interactive tasklist overlay for Twitch streams, inspired by [supersweetbot.cc](https://supersweetbot.cc).

## Tech Stack
- Next.js (App Router) with TypeScript
- Tailwind CSS v4 + shadcn/ui
- Dark theme by default

## Theme
- Primary color: `oklch(65.6% 0.241 354.308)` (pink)
- Secondary color: `oklch(45% 0.2 354.308)` (darker pink — same hue, lower lightness)

## Roadmap (Agile — subject to change)
1. **Phase 1 (MVP):** Static overlay with hardcoded tasks for one user. Tasks have title + completed status. Completed tasks get strikethrough/dimmed and move to bottom.
2. **Phase 2:** Dynamic tasklist with persistent storage (database). CRUD operations.
3. **Phase 3:** Multi-owner support. DB stores tasks per owner, UI shows the selected owner's tasks.
4. **Phase 4:** Twitch bot integration. Chat commands to CRUD tasks.

## Project Conventions
- Styling decisions deferred to the user — focus on functionality first
- Components live in `components/`
- UI primitives (shadcn) in `components/ui/`
