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

## 4. New in this update (header, i18n, animations)

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

## 6. New in this update (SDGs, Gallery, photos, links)

- **SDGs page** (`/sdgs`) - all 17 UN Sustainable Development Goals, grouped
  and filterable by the five foundational themes (People, Planet,
  Prosperity, Peace, Partnership), each with an official-palette color, a
  themed icon, and a short description. The animated 17-dot ring in the
  hero echoes the homepage's Pillars wheel rather than reproducing the
  UN's own icon artwork (colors are public data; the icon set is ours).
  Fully translated EN/JA. Reachable from the header's **About** dropdown.
- **Photo Gallery page** (`/gallery`) - an animated masonry grid of photos
  added via the admin panel, with a click-to-enlarge lightbox and a
  graceful empty state until photos are added. Reachable from the
  header's **Insights** dropdown.
- **People photos** - `/admin` → People now has an optional photo field:
  paste an image URL, or upload a file directly (it's converted to a
  compact embedded image, capped around 700KB, so no separate file/cloud
  storage setup is needed). Leave it blank and the person's initials show
  instead, exactly as before.
- **Links on Publications / News & Media / Resources** - any item with a
  `link` set (via the seed data or the admin panel) now shows a
  "View link ↗" affordance on the public pages, opening in a new tab.

## 7. Adding photos (People and Gallery)

Both go through the same `/admin` panel:

- **People** → select "People", fill in name/category, and under **Photo
  (optional)** either paste a hosted image URL or use the file picker to
  upload one from your computer. Leave it empty for initials.
- **Gallery** → select "Gallery Photos", write a short caption, choose a
  category (Campus / Field Research / Living Labs / Events /
  Partnerships), and add the photo the same way. It appears on `/gallery`
  immediately.

Note on uploads: files are stored as embedded base64 images directly in
MongoDB (capped at ~700KB each) rather than in separate cloud storage -
simple and works with zero extra setup, but isn't meant for large photo
libraries. For a media-heavy gallery down the line, swap this for real
object storage (S3, Cloudinary, etc.) and store the resulting URL in the
same `image` field - no schema change needed.

## 8. Page illustrations (unDraw)

Nine pages now carry a small, on-brand illustration near their main
heading, sourced from **unDraw** (https://undraw.co, by Katerina
Limpitsouni) - a genuinely free, open-license illustration library: free
for personal and commercial use, modification permitted, no attribution
required (credited anyway as good practice).

| Page | Illustration |
|---|---|
| Home (Welcome section) | `global-team` |
| About (Vision & Mission) | `team-goals` |
| Research | `researching` |
| Education | `continuous-learning` |
| Living Labs | `eco-conscious` |
| Partnerships | `handshake-deal` |
| People | `meet-the-team` |
| SDGs | `a-better-world` |
| Contact | `group-chat` |

**How they were sourced and adapted:** each SVG was pulled from the
MIT-licensed `undraw-svg` npm package (a compilation of the unDraw
catalog), then had its accent color swapped to match this site's palette
(bay `#17394D`, terrace `#5C7A5E`, ochre `#C98A2B`, vermillion `#BF4E3A`)
via a plain hex find-and-replace - skin tones and neutral shading were
left untouched, no structural edits. The `undraw-svg` package itself
(~26MB) was installed temporarily with `--no-save` purely to extract
these files and was never added to `package.json` - check
`frontend/package.json` yourself if you want to confirm it isn't a
runtime dependency.

Full provenance, the exact recolor mapping, and instructions for pulling
additional illustrations the same way live in
`frontend/src/assets/illustrations/README.md`. The rendering itself is a
single reusable component, `src/components/PageIllustration.jsx` (fade-in
+ gentle float, respects `prefers-reduced-motion`) - adding one to
another page is an SVG import plus a few lines.

(Two small custom components from an earlier pass, `AnimatedIcon.jsx` and
`OrbitBadge.jsx`, are still in `src/components/` but no longer used on any
page - safe to delete or repurpose if you don't plan to use them.)

## 9. University content & media (photos, student profiles, looping videos)

Content supplied by the university is wired in **without moving any existing section**: everything new is
either appended after a page's last section or slotted between two existing ones.

| What | Where it appears |
|---|---|
| 7 student / researcher profiles (photo, bio, "what sustainability means to me") | **People**: photo-first cards open a full profile (← → keys step through all 7). Everyone else keeps the original compact card. |
| 35 photos (`natu1.pdf`, `natu2.pdf`) | **Gallery**: category filter (Nature & Seasons, Campus, City & Heritage, Festivals, Coast & Waterways), keyboard lightbox, EN/JA captions. Small 4-photo strips also appear at the end of **About**, **Research** and **Education**. |
| 6 looping videos | One per page, each matched to what it shows: **Home** (video-04, with the slogan), **About** (03, five pillars), **Research** (05, food-energy-water), **Living Labs** (06, co-creation), **Partnerships** (01, Japan-India), **SDGs** (02, closed loops). All six also sit on **Gallery → Moving moments**. |
| Slogan "UT-INSPIRE: Many Minds. One Future." | Home hero, Home band, People (closing band), footer on every page. Japanese: 多くの知恵、ひとつの未来。 |

**Real images.** The photos are labelled placeholders named after the PDF and page (`natu1-p03.jpg`,
`students-p05.jpg`, ...). Paste the real JPGs into `frontend/public/media/` using the same names and they
appear with no code change. `MEDIA_CHECKLIST.md` lists every file with its source page and notes (for
example, two images need cropping or rotating).

**Captions** live in `frontend/src/data/media.js` (and `backend/seed/mediaData.js` for the database); edit both.

**Database.** Run `cd backend && npm run seed` to load the profiles and gallery. This wipes and reloads the
whole `items` collection, so do it before adding anything through `/admin` (or re-add afterwards). The People
form in `/admin` now has **Bio** and **Quote** fields; Gallery has a **Japanese caption** and the new categories.

**Videos** are muted, loop, play only while on screen, and show a still frame instead for visitors who prefer
reduced motion or have Data Saver on. They are already compressed (about 1.4 MB for all six). To swap one,
overwrite `public/media/videos/video-0N.mp4` and its `-poster.jpg`.

**People cards.** Every person (all 26) now uses one card style: rounded card, ringed circular photo (initials
if there is no photo), role label, name and affiliation. People with a bio open the full profile; an optional
external link sits underneath (default text "Profile", or any text you set, e.g. "Faculty Profile"). Groups of
one or two people, and short last rows, are centred.

**Admin: full create / read / update / delete.** `/admin` now has an **Edit** (pencil) button on every row. It
loads the record into the form, the banner shows "Editing: ...", and **Save changes** updates it (Cancel leaves
without saving). Every field the site displays is editable: title/name, affiliation (subtitle), category, bio,
quote, photo, profile link, link text, date, display order. Types now covered: People, Publications, Events, News
& Media, Resources, Gallery Photos, **Living Labs, Education programs, Research themes, Partner categories**.
A save only sends the fields that type's form shows, so editing never blanks hidden data. Not exposed:
the Pillars (their text comes from the translation files, so a database edit would not show) and the
unused `featured`/`tags` fields.

## 10. What's implemented

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

## 11. Next steps for a production launch

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
