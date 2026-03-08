# SSE Stream Route

This route implements **Server-Sent Events (SSE)** to push real-time updates to the overlay.

## How it works

1. The overlay opens a persistent connection to `/api/tasks/stream`
2. This route connects to Postgres and runs `LISTEN tasks_changed`
3. When a task changes (bot or admin), the caller runs `NOTIFY tasks_changed` on the DB
4. Postgres forwards the notification to this route
5. This route pushes a `tasks_changed` event to the overlay
6. The overlay calls `router.refresh()` to re-fetch the latest tasks

## Why Postgres LISTEN/NOTIFY?

The bot and Next.js run as separate processes — they can't share in-memory state.
Postgres acts as the message bus since both already connect to the same DB.
