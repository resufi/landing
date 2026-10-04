# Resu — landing

The showcase page leading into the app <https://resufi.github.io/fe/>.

## Stack

| What | With | Why this way |
| --- | --- | --- |
| Framework | Next.js 15, App Router | Static export out of the box, typed metadata, markup rendered at build time — the page is visible even without JS |
| Language | TypeScript, `strict` | Plus `noUncheckedIndexedAccess` and `noUnusedLocals`: content here is typed data, and a typo in it should fail at build |
| Styles | CSS Modules + one tokens file | Exactly as in the app. The tokens are the design system; Tailwind would duplicate it with a second vocabulary |
| Fonts | system stack | As in the app. Not a single network request for a font |
| Hosting | `output: "export"` → GitHub Pages | A landing is text. It needs no server, and static on a CDN doesn't go down |
| Checks | `tsc --noEmit`, `eslint-config-next` | Run both locally and in CI before publishing |

Three runtime dependencies: `next`, `react`, `react-dom`. No UI kits, no
animation libraries — nothing on the page justifies them.

## Commands

```bash
npm run dev        # development, localhost:3000
npm run build      # static export to out/
npm run start      # preview the build
npm run check      # types + lint + build, same as CI
```

## Architecture

```
src/
  app/
    layout.tsx        metadata, og card, token import
    page.tsx          section order — and nothing else
    globals.css       tokens, reset, three utility classes
  components/
    Loader.tsx        splash
    Header.tsx        header
    Footer.tsx
    ui/               primitives: Button, Section, DataTable, Reveal
    sections/         one file per page section
  content/            texts and numbers as separate typed modules
  lib/config.ts       external addresses, tagline, path prefix
public/               two SVG brand marks
```

One rule holds the whole structure together: **the markup doesn't know the
content**. Numbers, roadmap, limits and tranche texts live in `src/content/` as
typed data, and editing a phrase or adding a roadmap item needs no JSX changes.
Style lives in `*.module.css` next to its component; there is exactly one global
CSS file — the same rule as in `fe`.

There are three client components: `Loader`, `Header` and `Reveal`. Each has a
header comment explaining why it can't be a server component. Everything else
renders at build time.

## Link to the app

The palette, spacing scale and typography are copied from
`fe/src/styles/tokens.css` unchanged. The splash mirrors
`fe/src/components/Loader.tsx`: the same mark with SMIL animation inside the SVG,
the same caption typed out letter by letter, the same timings. Moving from the
landing into the app shouldn't read like moving to a different product.

The only thing added on top of the app is a dark overlay (`--dark-*`) — used
twice, under the numbers block and the final call to action.

## Numbers block

`src/content/stats.ts`. The `value` field is optional on purpose: before launch
we have no real numbers, and a dash is the only thing we can write honestly here.
To fill one in, add `value` to that row — the dash and the muted color lift on
their own, with no markup changes.

## Publishing

`.github/workflows/pages.yml` builds and publishes on a push to `main`.
`BASE_PATH` is injected by the build from the repo name, so it isn't hardcoded —
the same approach as in `fe`.

## Content

The texts are a condensed retelling of `ECONOMICS.txt` in English, because the
app's interface is English. The "What we do not promise" section is kept
second-to-last and complete: it is the main difference from our neighbors on the
market.
