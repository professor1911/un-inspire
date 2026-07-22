# UT-INSPIRE - Web Platform (MERN)

Full website for the University of Toyama Interdisciplinary Sustainability
Platform for Innovation, Research and Education (UT-INSPIRE), built as a
MERN stack app: **M**ongoDB, **E**xpress, **R**eact, **N**ode.

All 12 pages from the sitemap are implemented with real content transcribed
from the project brief: Home, About Us, Research, Education, Living Labs,
Partnerships, People, Publications, Events, News & Media, Resources, Contact.

```
ut-inspire/
├── backend/     Express API + Mongoose models, seed script
└── frontend/    React (Vite) app, Tailwind CSS, Framer Motion, React Router
```

## 1. Prerequisites

- **Node.js 18+** and npm
- **MongoDB** - either:
  - installed locally ([mongodb.com/try/download/community](https://www.mongodb.com/try/download/community)), or
  - a free [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) cluster (cloud, no local install)

## 2. Backend setup

```bash
cd backend
npm install
cp .env.example .env
```

Edit `.env` and set `MONGO_URI` to your database:

```
# Local MongoDB
MONGO_URI=mongodb://127.0.0.1:27017/ut-inspire

# OR MongoDB Atlas
MONGO_URI=mongodb+srv://<user>:<password>@<cluster-url>/ut-inspire
```

Seed the database with the site's content (pillars, people, publications,
events, news, resources, etc.):

```bash
npm run seed
```

Start the API:

```bash
npm run dev
```

The API runs at `http://localhost:5000`. Confirm it's up:

```bash
curl http://localhost:5000/api/health
```

## 3. Frontend setup

In a second terminal:

```bash
cd frontend
npm install
npm run dev
```

Open `http://localhost:5173`. The site works fully even if the backend
isn't running yet - every page falls back to bundled sample content in
`frontend/src/data/content.js` - but connect the API for live data and a
working Contact form.

To point the frontend at a different API URL (e.g. after deploying the
backend), create `frontend/.env`:

```
VITE_API_URL=https://your-api-domain.com/api
```

## 4. New in this update

- **Redesigned header** - a bilingual utility strip (institution name + email
  + the **single** language toggle) above a cleaner main nav row. The 12
  pages are grouped into three dropdowns (**About** → About Us, People,
  Partnerships · **Research** → Research, Education, Living Labs ·
  **Insights** → Publications, Events, News & Media, Resources), plus a
  standalone **Contact** button and a **search icon** (press it, or think
  of it as a mini command palette - type any page or topic name like
  "ReACT" or "IIT Kharagpur" and jump straight there). The mobile drawer
  mirrors the same three groups. Logo click = Home, so there's no
  redundant "Home" link cluttering the bar.
- **Homepage de-duplication** - Home no longer repeats full sections that
  already live on their own pages: the Flagship Research section is now a
  short summary + link (the four-area breakdown lives on `/research`);
  the Living Lab Showcase shows a 3-of-5 teaser + "see all" link (the full
  five live on `/living-labs`); and the interactive Pillars wheel now
  lives only on Home, while `/about` shows the same five pillars as a
  distinct reference list rather than repeating the same widget.
- **Content Admin panel** (`/admin`, not linked in the public nav) - add
  People, Publications, Events, News, and Resources straight to MongoDB
  through a simple form, with a live list + delete underneath. Protected
  by an `ADMIN_TOKEN` you set in `backend/.env`; the panel asks for it
  once and keeps it for the browser tab session. See "Adding content"
  below.
- **Full responsiveness pass** - an added `xs` (420px) breakpoint plus
  tighter `sm:`/`md:`/`lg:` tuning across every page's type scale, grid
  columns, spacing, and the header/drawer, so the site holds up from small
  phones through tablets to ultra-wide laptop screens.
- **English ⇄ Japanese translation** - full i18n via `react-i18next`
  (`src/i18n/`). Every page's navigation, hero, section headings, footer,
  marquee, and the 5 Pillars wheel are translated; the toggle (`EN` /
  `日本語`) lives in exactly one place - the top utility bar - and persists
  across visits via `localStorage`. Japanese text automatically switches
  to Noto Serif JP / Noto Sans JP for correct rendering. Dynamic database
  content (people, publications, events, news) currently stays in its
  source language - add a `translations` field to the `Item` model if/when
  you want those translated too.
- **Japanese design touches** - a seigaiha (wave) pattern band in the
  footer, falling sakura petals in the hero, and the bilingual logo/topbar
  lockup, layered onto the existing topographic-contour motif.
- **Motion, throughout** - Lenis inertial smooth-scroll site-wide; a
  scroll-progress bar under the header; a subtle cursor-follow accent on
  desktop; animated page transitions on route change; scroll-triggered
  fade/rise reveals and staggered card grids on every page; a hero
  parallax effect; and count-up animated stats. All of it respects
  `prefers-reduced-motion` and turns off automatically for anyone who's
  asked for less motion.

## 5. Adding content (People, Publications, Events, News, Resources)

Two ways:

1. **Admin panel (recommended for one-off additions).** Set `ADMIN_TOKEN`
   in `backend/.env` to a long random string, restart the backend, then
   visit `http://localhost:5173/admin` in the browser. Enter the token
   once, pick a content type, fill in the form, and it's saved to MongoDB
   and live on the site immediately (refresh the relevant page to see it).
   Existing entries for that type are listed below the form with a delete
   button.
2. **Seed script (recommended for bulk/initial content).** Edit
   `backend/seed/data.js` with your real records, then run `npm run seed`
   from `/backend`. This wipes and reloads the whole `items` collection,
   so it's better for bulk edits than one-off additions.

Either way, content shows up on the site via the same `GET /api/items`
endpoint the pages already call - no frontend changes needed.

## 6. What's implemented

- **All 12 pages**, each pulling real content from MongoDB via the API
  (with graceful offline fallback).
- **Interactive SVG "5 Pillars" wheel** on Home and About - hover or tap a
  segment to see pillar details.
- **Sticky scrolling marquee** with the mission slogan above the footer.
- **Mobile slide-out mega-drawer** replacing the 12-item nav on small
  screens.
- **3D tilt-on-hover cards** (Framer Motion) for research, people, and news.
- **Working Contact form** - POSTs to `/api/contact`, stored in MongoDB.
- **Generic CMS-style content API** (`GET/POST/PUT/DELETE /api/items`) -
  one collection, discriminated by `type`, covering pillars, research
  themes, education components, Living Labs, partner categories, people,
  publications, events, news, and resources. This keeps the schema simple
  to extend without new migrations as real content replaces the seed data.

## 7. Next steps for a production launch

- **Stronger auth for admin writes** - `POST/PUT/DELETE /api/items` are
  now gated by a single shared `ADMIN_TOKEN` (see section 5), which is
  enough to keep the write API from being wide open, but isn't a full
  auth system. For a multi-person team, swap it for real accounts (JWT +
  roles, or an SSO provider) before relying on it long-term.
- **Real media** - swap in real photography/video for the hero and Living
  Lab showcase (see the `image` field already on the `Item` model).
- **Deploy** - frontend to Vercel/Netlify, backend to a Node host (Render,
  Railway, Fly.io) or a VM, database to MongoDB Atlas. Set `CLIENT_ORIGIN`
  on the backend and `VITE_API_URL` on the frontend to match your deployed
  URLs.
- **Content ownership** - replace placeholder publications/events/news in
  `backend/seed/data.js` with real records, then re-run `npm run seed`
  (or manage them via the API/Compass going forward).
