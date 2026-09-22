# MyStore

Premium electronics storefront — Next.js 15 (App Router) · TypeScript · Tailwind CSS 4.

## Run

```bash
npm install
npm run dev
```

## Languages

Three locales via `next-intl`: **hy** (default, no prefix — `/`), **ru** (`/ru`),
**en** (`/en`). Routing lives in `i18n/routing.ts` + `middleware.ts`; UI strings
in `messages/{hy,ru,en}.json`; always import `Link`/`useRouter` from
`i18n/navigation.ts` (not `next/link` / `next/navigation`) so locale prefixes
stay correct.

Product data (`data/catalog.json`) carries `hy`/`ru`/`en` fields per string —
read with `pick(triObject, locale)` from `lib/catalog.ts`. The Armenian text
in `messages/hy.json` and `data/catalog.json` was drafted by AI translation and
**needs a native-speaker review before launch** — it is the storefront's default
language.

## Product data

`data/catalog.json` holds 40 curated products (facts only — model names and
specifications) generated from a competitor's public catalogue export.
**Prices in it are placeholders copied from that competitor — replace with
MyStore's own pricing before launch.** Regenerate or extend it by editing
`lib/catalog.ts`'s consumers directly, or hand-author more entries in the same
shape (see `Product` / `Category` types in that file).

## preview/

`preview/index.html` is a static mirror of the homepage for machines without
Node: it fetches the real `app/globals.css` and compiles it with the Tailwind
browser build, so it shows the same design system the app uses. Serve the
project folder over http (it needs `fetch`) and open `/preview/`. Delete the
folder once `npm run dev` works — the React components are the source of truth.

## Design system

All colors live as CSS variables in `app/globals.css` and are mirrored into
Tailwind's theme, so `--orange` and `bg-orange` are always the same value.

| Variable               | Value     | Used for                          |
| ---------------------- | --------- | --------------------------------- |
| `--background`         | `#050505` | page ground                       |
| `--surface`            | `#0D0D0D` | cards, footer                     |
| `--surface-secondary`  | `#121212` | card hover                        |
| `--surface-elevated`   | `#161616` | product image stage               |
| `--text`               | `#FFFFFF` | primary type                      |
| `--text-secondary`     | `#A0A0A0` | secondary type                    |
| `--orange`             | `#FF6500` | logo power mark, CTAs, active     |
| `--orange-hover`       | `#FF7A00` | hover state                       |
| `--border`             | `#252525` | hairlines                         |

Tailwind aliases: `bg-background`, `bg-surface`, `bg-surface-secondary`,
`bg-surface-elevated`, `text-ink`, `text-muted`, `text-orange`, `border-line`.

Shared classes (also in `globals.css`): `.shell`, `.section`, `.display`,
`.h2`, `.eyebrow`, `.lede`, `.btn` + `.btn-primary` / `.btn-secondary` /
`.btn-quiet`, `.card` + `.card-lift`, `.stage` + `.stage-media`, `.nav-link`,
`.icon-button`, `.rail`, `.reveal`.

## Product photography

`components/ProductVisual.tsx` draws vector stand-ins so the grid is complete
before the shoot. Every product in `lib/catalog.ts` accepts an `image` field —
set it (e.g. `image: "/products/iphone-18-pro.png"`) and that photo replaces the
vector for that product, no component changes needed.

## Structure

```
app/          layout, homepage, global design system
components/   Header, Hero, CategoryCard, ProductCard, BrandStrip,
              PromoBanner, Benefits, NewArrivals, StoreLocation, Footer,
              Logo, ProductVisual, Reveal, SectionHeading, icons
lib/catalog.ts  navigation, categories, products, brands, store details
```
