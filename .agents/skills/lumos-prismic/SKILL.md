---
name: lumos-prismic
description: Work with this template's Prismic repository. Use when creating or editing slices, the settings custom type, SEO fields, header/footer links, prismic.config.json, design photos for the media library, or when starting a project by duplicating the Prismic repository.
---

# Prismic in this template

The code reads one Prismic repository. Its name is `repositoryName` in `prismic.config.json`. A new project duplicates that repository in Prismic, then changes `repositoryName` to the copy. `NEXT_PUBLIC_PRISMIC_ENVIRONMENT` overrides it for one environment without changing the file.

## Settings

`settings` is a singleton custom type (`repeatable: false`). Fetch it with `client.getSingle("settings")`. The model is `customtypes/settings/index.json`.

### SEO

| API ID | Field | Editor guidance |
| --- | --- | --- |
| `meta_title` | Text | 50–60 characters. Search results and the browser tab. |
| `meta_description` | Text | 150–160 characters. The snippet under the title. |
| `og_image` | Image | 1200 × 630. The share image. The field constraint is that size. |

### Theme

| API ID | Control | Options | Default |
| --- | --- | --- | --- |
| `theme` | Select | `light`, `dark`, `brand` | `light` |

The root layout reads this and sets it on `<html>`. A slice theme of `inherit` follows it. A slice set to `light`, `dark`, or `brand` replaces it for that section.

### Navigation and footer

Nav and footer content belong on the settings singleton — not as slices in the page slice zone. Pages are an ordered list of content sections only.

| API ID | Field | Editor guidance |
| --- | --- | --- |
| `header_links` | Group | Each item: `label` (text) and `link` (may open in a new tab). Main nav. |
| `footer_links` | Group | Same shape as `header_links`. Footer nav. |

## Pages

`homepage` is a single page. Its route is `/`, and it is fetched with `getSingle("homepage")`.

`page` is repeatable. Its route is `/:uid`, and it is fetched with `getByUID("page", uid)`.

Both have a slice zone and an SEO & Metadata tab: `meta_title` (50–60 characters), `meta_description` (150–160 characters), and `meta_image` at 1200 × 630.

When a page SEO field is empty, every page uses the settings document: `meta_title`, `meta_description`, and `og_image`. A filled field on that page wins.

## Slices

A designed section becomes one slice. A page is an ordered list of slices. The slice's other fields are that section's content.

Every slice includes one non-repeatable group, `settings`, passed to the Lumos `Section` that wraps the slice.

| API ID | Control | Options | Default |
| --- | --- | --- | --- |
| `padding_top` | Select | `none`, `even`, `small`, `medium`, `large`, `navoverlap` | `medium` |
| `padding_bottom` | Select | `none`, `even`, `small`, `medium`, `large`, `navoverlap` | `medium` |
| `theme` | Select | `inherit`, `light`, `dark`, `brand` | `inherit` |

`inherit` follows the site theme from `settings.theme`. Theme default is always `inherit` in the model and in code (`settings?.theme ?? "inherit"`). Never default a new slice to `dark` / `light` / `brand`.

### Slice CSS and screenshots

No CSS strings or `Styles` helper in slice JSX. Styles live in `src/slices/<Name>/index.css` under `@layer components`, imported from `index.tsx`.

After building or changing a slice visually, save `screenshot-default.png` in that slice folder (about one viewport of the section).

### Rendering

Do not use Prismic’s default `SliceZone` output that injects `prismic-slice-start` / `prismic-slice-end` comments between slices. Render with `SliceList` (`src/prismic/SliceList.tsx`), which maps `slice_type` → component with no toolbar comment markers.

## Content and media

### Alt text

Every asset gets a descriptive alt in the language of the project. Describe what is in the photo: who or what, where it matters, and what a screen reader needs. Do not use the filename, a city name alone, or a bare label. Prefer the design’s alt when it has one. Write the same alt on the image field of every document that uses that asset.

### No duplicate assets

Before uploading, list the media library and match on filename (and obvious same source). If the image is already there, reuse its id — do not import it again. A failed write, a retry, or a second script is not a reason to upload again. One source file → one asset. If duplicates already exist in the library, delete the extras and keep a single asset; point documents at that one.

### What goes in the media library

Upload the upright source photo once. Skip textures, frames, wordmarks, icons, and photos hidden under another layer. A card rotated in the design stays straight in the library. Two crops of the same photo are still one asset.

### Videos

Videos are always self-hosted. Use a link field (URL to the `.mp4` or hosted file). Do not upload video into the Prismic media library.

### Fill content in the same pass

When building from a design, create/update the slice model and component and fill that section’s Prismic content (copy, links, images, settings) in the same step. Do not leave empty slices for someone else to fill later.

### Publish after writing

Writing content needs `PRISMIC_WRITE_TOKEN` in `.env.local`. After creating or updating documents, publish them so the site can see the content. Drafts alone are not enough.

## Building from a design

When a design or HTML prototype arrives:

1. Ask every question that would change the result, once, in one batch.
2. Then build every section and page without waiting for a check between them.
3. Set each slice’s padding and theme from the design; fill its content in the same step.
4. Treat the provided prototype as the source of truth for structure, content, motion, and visual behavior — match it, with clean code. Stay within Lumos conventions (tokens, layout, components); do not invent one-off layout rules that break the system.
5. Ask again only when something in the design cannot be decided.

Header and footer links stay on the settings document.

### Motion (GSAP)

For animations driven by scroll or text, use GSAP, ScrollTrigger, and SplitText as the default stack. Clean up timelines, ScrollTriggers, and SplitText instances when the component unmounts or when recreating animations (`kill` / `revert` as appropriate). Handle resize properly (ScrollTrigger refresh / kill-and-rebuild, or the APIs GSAP already provides). Do not leave broken scrub, pin, or split state after viewport changes.

## Changing a model

1. Edit it with the Prismic CLI (`prismic type`, `prismic field`).
2. Commit the model files locally.
3. Run `prismic push`.

Leave that commit local. Push the branch to GitHub only when asked. `prismic push` updates models, not document content.
