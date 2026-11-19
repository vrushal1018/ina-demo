# Ina TechFM website · colour fix

12 Nov 2026 · Jaisalil Shilewant

Keep inatechfm.com exactly as it is and swap its colours for one Ina palette taken from the logo: one blue, its tints, and blue-toned navies and greys in place of black and neutral grey.

The live site (checked 12 Nov 2026) runs on **9 hard-coded hex colours plus Tailwind slate and black**. Its main blue, #2495D3, is close to the logo blue but not the same. Its navy, #1C3A62, leans purple and is not in the logo. Greys #585858 and #383838, black overlays and slate-900 bring in near-black, which the brand rules exclude.

The fix is a find-and-replace across the codebase plus 12 colour tokens. Layout, content, images and animation stay untouched.

## The Ina palette

Every colour below shares the logo's hue (about 200°), so the whole site reads as one family of blue. Ina Blue is sampled from the logo file; confirm it against the vector logo or the brand guideline.

| Token | Hex | Role | Contrast |
| --- | --- | --- | --- |
| Ina Blue | #1A95D1 | The logo blue. Logo, icons, highlight words in large headlines, hover accents, active borders, lines | 3.4:1 on white: large text (24 px+) and graphics only |
| Ina Blue Deep | #0F6F9F | Buttons with white text, links, small blue text on light grounds | 5.5:1 on white |
| Ina Navy | #0F3B57 | Headings on light grounds; dark section backgrounds | 11.8:1 on white |
| Ina Night | #082336 | Darkest grounds: hero and video overlays, footer. Replaces every black | 16.1:1 with white |
| Ina Ink | #2B4150 | Body text on light grounds | 10.6:1 on white |
| Ina Grey | #5C6E7A | Secondary text, captions, labels on light grounds | 5.3:1 on white |
| Ina Mist | #92AAB9 | Small secondary text on dark grounds only | 4.9:1 on Ina Navy, 6.7:1 on Ina Night |
| Ina Sky | #63BCE9 | Blue accents and hover states on dark grounds | 5.6:1 on Ina Navy |
| Ina Tint 15 | #DDEFF8 | Chips, tags, icon tiles, gradient ends | — |
| Ina Tint 8 | #EDF7FB | Section backgrounds, cards on white | — |
| Ina Tint 4 | #F6FBFD | Page background | — |
| Ina Line | #CDE8F5 | Borders and dividers on light grounds | — |

White (#FFFFFF) stays for cards, text on dark grounds and the white logo.

## Find and replace

These are every colour the home page uses today, from its Tailwind classes, most-used first. Replace each across the whole codebase, including the `/20`-style opacity suffixes, so inner pages change too.

| Current | Where it shows today | Replace with |
| --- | --- | --- |
| #2495D3 (≈340 uses) | Headline "Enriching Assets", icons, hover fills, borders, card accents | Ina Blue #1A95D1; where it is small text or a button with white text, Ina Blue Deep #0F6F9F |
| #1C3A62 (≈130 uses) | Section headings, sector cards, dark tiles, shadows, gradient start | Ina Navy #0F3B57 |
| #585858 | Card titles and body copy | Ina Grey #5C6E7A for captions; Ina Ink #2B4150 for body text |
| #383838 | Dark body text | Ina Ink #2B4150 |
| slate-400, slate-300 | Small labels: "Area Managed", "Direct Support Line", footer text | Ina Mist #92AAB9 on dark grounds; Ina Grey #5C6E7A on light grounds |
| slate-600 | Secondary text | Ina Grey #5C6E7A |
| slate-100, slate-200 | Light fills and borders | Ina Tint 8 #EDF7FB fills; Ina Line #CDE8F5 borders |
| slate-900, slate-900/45, /70 | Dark overlays and buttons | Ina Night #082336 at the same opacity |
| #0A1629 (incl. /85, /65, /90 gradient) | Hero video overlay, dark bands | Ina Night #082336 at the same opacity |
| black/10, /30, /65 | Image overlays, shadows | Ina Night #082336 at the same opacity |
| #45B1E8 | Hover text on dark, gradient end | Ina Sky #63BCE9 |
| #488FCD | Button hover | Ina Blue Deep #0F6F9F |
| #D9EDF8, #E2F1FA | Pale blue gradients and chips | Ina Tint 15 #DDEFF8 and Ina Tint 8 #EDF7FB |
| via-[#2495D3] in from-[#1C3A62] gradients | Gradient bands | from Ina Navy via Ina Blue; check text on them stays white and large |
| white, white/5 to white/25 | Text and glass panels on dark | Keep as they are |
| emerald-400 | "Active operations" live dot | Keep: it is a status light, not brand colour |

The gold set (#FFD37A, #FFC14D, #FFE3A0, #C9A45A and the cream toast) belongs to the Diwali lanterns and greeting. It is seasonal: leave it until the festival ends, then remove it with the decorations.

## Usage rules

1. **No black anywhere.** No #000, no `black/…`, no slate-900, no #383838. The darkest colour on the site is Ina Night.
2. **One blue.** Ina Blue is the only brand blue; Deep and Sky are its working shades for contrast, not new colours.
3. **Logo:** the all-blue logo on white or Ina Tint grounds; the white logo on Ina Navy, Ina Night or over photos. Never a grey or black version. Keep clear space around it: no line, shape or edge touching or capping it.
4. **Small text is never Ina Blue on white.** At 3.4:1 it fails; use Ina Blue Deep for links and small blue labels.
5. **Buttons:** primary = Ina Blue Deep fill, white text, hover Ina Navy. On dark grounds, primary = white fill, Ina Navy text; secondary = white outline.
6. **Dark sections** (hero overlay, services, footer) use Ina Navy and Ina Night only, with Ina Sky for blue accents and Ina Mist for small text.
7. **Name:** write "Ina TechFM" in all visible text and meta titles. The site currently mixes "INA TechFM" and "Ina Tech FM".

## Code for the developer

The site uses Tailwind v4 with hex values written straight into class names. Step one: add the palette as theme tokens in the global stylesheet, so every class can use names like `bg-ina-navy` or `border-ina-blue/25`.

```css
@theme {
  --color-ina-blue: #1A95D1;
  --color-ina-blue-deep: #0F6F9F;
  --color-ina-navy: #0F3B57;
  --color-ina-night: #082336;
  --color-ina-ink: #2B4150;
  --color-ina-grey: #5C6E7A;
  --color-ina-mist: #92AAB9;
  --color-ina-sky: #63BCE9;
  --color-ina-tint-15: #DDEFF8;
  --color-ina-tint-8: #EDF7FB;
  --color-ina-tint-4: #F6FBFD;
  --color-ina-line: #CDE8F5;
}

::selection { background: var(--color-ina-blue); color: #FFFFFF; }
```

Step two: swap the hard-coded values. These replacements are safe to run across the project's source files (commit first so the change can be reviewed; on macOS use `sed -i ''`):

```bash
grep -rlE '#(2495D3|1C3A62|0A1629|585858|383838|45B1E8|488FCD|D9EDF8|E2F1FA)|black/|slate-' src app components 2>/dev/null | xargs sed -i -E \
  -e 's/\[#2495D3\]/ina-blue/g' \
  -e 's/\[#1C3A62\]/ina-navy/g' \
  -e 's/\[#0A1629\]/ina-night/g' \
  -e 's/\[#383838\]/ina-ink/g' \
  -e 's/\[#585858\]/ina-grey/g' \
  -e 's/\[#45B1E8\]/ina-sky/g' \
  -e 's/\[#488FCD\]/ina-blue-deep/g' \
  -e 's/\[#D9EDF8\]/ina-tint-15/g' \
  -e 's/\[#E2F1FA\]/ina-tint-8/g' \
  -e 's/(bg|from|via|to|shadow)-black/\1-ina-night/g' \
  -e 's/slate-900/ina-night/g' \
  -e 's/slate-600/ina-grey/g' \
  -e 's/slate-200/ina-line/g' \
  -e 's/slate-100/ina-tint-8/g'
```

Step three, by hand, because they depend on the background:

- `text-slate-400` and `text-slate-300`: `text-ina-mist` on dark grounds, `text-ina-grey` on light ones.
- `text-ina-blue` under 24 px on a light ground, and any `bg-ina-blue` button with white text: change to `ina-blue-deep`.
- Any remaining `#2495D3` or `rgb(36,149,211)` inside CSS files, SVG icons, chart settings or the meta theme colour: change to #1A95D1.
- Replace the logo files with the supplied all-blue and white versions; check that no image still carries the older grey letters.

## Checklist

- [ ] Add the 12 tokens to the global stylesheet
- [ ] Run the step-two replacements and review the diff
- [ ] Fix slate-400/300 labels and small blue text by hand (step three)
- [ ] Swap in the all-blue and white logo files
- [ ] Change "INA TechFM" and "Ina Tech FM" to "Ina TechFM" in text, alt text and page titles
- [ ] Set the meta theme colour to #1A95D1
- [ ] Check the home, services, clients, careers, blog and contact pages on desktop and phone
- [ ] Remove the Diwali lanterns, diya and greeting after the festival

Two things noticed on the way, outside the colour fix:

- Every page's canonical link and social-share address point to inatechfmglobal.com, while the site lives at inatechfm.com. If both domains are not the same site, search engines are being told the real page is elsewhere. Worth a check with the developer.
- The page description claims 55+ cities; Ina SpaceWorks material says 12 cities and 46+ sites. One figure should be confirmed and used everywhere.
