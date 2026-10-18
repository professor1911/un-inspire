# Illustrations - source & license

All SVGs in this folder are from **unDraw** (https://undraw.co), created by
Katerina Limpitsouni.

unDraw's license permits free use for personal and commercial projects,
including modification, with no attribution required (credit given here
anyway as good practice). See https://undraw.co/license for the current
terms.

## What was done to them

Each file was extracted from the open-source `undraw-svg` npm package
(MIT-licensed compilation of the unDraw catalog) and had its accent color
swapped to match this site's palette (bay `#17394D`, terrace `#5C7A5E`,
ochre `#C98A2B`, vermillion `#BF4E3A`) via a simple hex find-and-replace.
Skin tones and neutral grays were left untouched. No structural edits.

## Files and where they're used

| File | Used on | Original unDraw slug |
|---|---|---|
| `global-team.svg` | Home - Welcome section | `global-team` |
| `team-goals.svg` | About - Vision & Mission | `team-goals` |
| `researching.svg` | Research | `researching` |
| `continuous-learning.svg` | Education | `continuous-learning` |
| `eco-conscious.svg` | Living Labs | `eco-conscious` |
| `handshake-deal.svg` | Partnerships | `handshake-deal` |
| `meet-the-team.svg` | People | `meet-the-team` |
| `a-better-world.svg` | SDGs | `a-better-world` |
| `group-chat.svg` | Contact | `group-chat` |

## Adding more

Browse https://undraw.co/illustrations for other scenes. To pull and
recolor another one the same way:

```bash
npm install undraw-svg --no-save   # ~26MB, temporary - do not commit this
# copy the SVG(s) you want from node_modules/undraw-svg/svgs/ into this
# folder, then find-and-replace the accent hex (#3f3d56 or #3f3d58, where
# present) with one of the site's palette colors above.
npm uninstall undraw-svg
```
