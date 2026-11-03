---
name: lumos-prismic
description: Work with this template's Prismic repository. Use when creating or editing slices, the settings custom type, SEO fields, header links, prismic.config.json, design photos for the media library, or when starting a project by duplicating the Prismic repository.
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

### Navigation

`header_links` is a group. Each item has `label` (text) and `link` (a link that may open in a new tab). These are the header links.

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

`inherit` follows the site theme from `settings.theme`.

## Building from a design

When the design arrives, ask every question that would change the result, in one batch. After those answers, build every section and every page without waiting for a check between them. Ask again only when something in the design cannot be decided.

Read each page from top to bottom. Each section is one slice. Set its `settings` from the design: padding top, padding bottom, and theme. Add that section's content in the same step, including its photos. Header links stay on the settings document.

## Images

A photo in a design goes in the Prismic media library.

Upload the upright source, once. A card rotated in Figma stays straight in the library. Two cards that crop the same photo are one asset.

Textures, frames, wordmarks, icons, and photos hidden under another layer stay out.

## Changing a model

1. Edit it with the Prismic CLI (`prismic type`, `prismic field`).
2. Commit the model files locally.
3. Run `prismic push`.

Leave that commit local. Push the branch to GitHub only when asked. `prismic push` updates models, not document content. Writing content needs `PRISMIC_WRITE_TOKEN` in `.env.local`.
