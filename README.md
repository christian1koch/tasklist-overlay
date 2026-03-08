# Tasklist Overlay

A Twitch stream tasklist overlay with chat bot integration. Viewers can manage their own task lists directly from chat.

## Features

- **Overlay** (`/`) — displays the tasks of whoever added the last task
- **Admin** (`/admin`) — manage owners and their tasks manually
- **Twitch bot** — chat commands to CRUD tasks

## Chat Commands

| Command | Description |
|---|---|
| `!addtask <title>` | Add a task (auto-creates owner on first use) |
| `!done <number>` | Mark task N as complete |
| `!deltask <number>` | Delete task N |
| `!tasks` | List your tasks |

## Setup

**1. Prerequisites:** Node.js, Docker

**2. Install dependencies**
```bash
npm install
```

**3. Start the database**
```bash
docker compose up -d
```

**4. Configure environment**
```bash
cp .env.example .env
```

Fill in the values (see table below).

**5. Run migrations**
```bash
npx prisma migrate dev
```

**6. Start the app**
```bash
npm run dev      # Next.js (http://localhost:3000)
npm run bot      # Twitch bot (separate terminal)
```

## Environment Variables

| Variable | Description |
|---|---|
| `DATABASE_URL` | Postgres connection string |
| `TWITCH_BOT_USERNAME` | Bot's Twitch username |
| `TWITCH_OAUTH_TOKEN` | Bot's OAuth token (`oauth:...`) |
| `TWITCH_REFRESH_TOKEN` | OAuth refresh token |
| `TWITCH_CLIENT_ID` | Twitch app client ID |
| `TWITCH_CLIENT_SECRET` | Twitch app client secret |
| `TWITCH_CHANNEL` | Channel the bot listens in |

To get Twitch credentials, create an app at [dev.twitch.tv](https://dev.twitch.tv/console) and follow the OAuth authorization flow.

## Tech Stack

- Next.js 16, TypeScript, Tailwind CSS v4, shadcn/ui
- Prisma 7 + PostgreSQL
- tmi.js (Twitch bot)
