# Tasklist Overlay

Interactive tasklist overlay for Twitch streams, inspired by [supersweetbot.cc](https://supersweetbot.cc).

## Tech Stack
- Next.js (App Router) with TypeScript
- Tailwind CSS v4 + shadcn/ui
- Dark theme by default

## Theme
- Primary color: `oklch(65.6% 0.241 354.308)` (pink)
- Secondary color: `oklch(45% 0.2 354.308)` (darker pink — same hue, lower lightness)

## Roadmap
All core phases complete. Remaining work tracked in GitHub issues.

1. ✅ Static overlay — hardcoded tasks, toggle complete, sort to bottom
2. ✅ Persistent storage — Prisma + Postgres, full CRUD
3. ✅ Multi-owner — Owner model, overlay shows latest owner, admin view
4. ✅ Twitch bot — tmi.js, !addtask / !done / !deltask / !tasks commands

## Project Conventions
- Styling decisions deferred to the user — focus on functionality first
- Components live in `components/`
- UI primitives (shadcn) in `components/ui/`
