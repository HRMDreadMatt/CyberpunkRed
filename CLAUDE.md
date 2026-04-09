# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Hey Choom! This is a static HTML/CSS/JS website themed as a "Night City Public Terminal" — a prop/companion site for a Cyberpunk TTRPG campaign set in the Cyberpunk RED universe. No build system, bundler, or package manager is used. Open any `.html` file directly in a browser to view it.

## Architecture

All pages share the same nav bar (duplicated inline in each file) and link to a shared `styles.css`. Bootstrap 4.6.2 is loaded via CDN on pages that use card layouts (`npc.html`, `news.html`). `script.js` is minimal — it only handles nav `active` class toggling.

### Pages and their purpose

| File | Nav label | Description |
|---|---|---|
| `index.html` | Terminal | Landing page with auto-advancing image carousel |
| `npc.html` | Dossier | Character cards with Bootstrap modals containing lore/bios |
| `news.html` | News | In-universe "screamsheet" news articles as Bootstrap cards with modals |
| `map.html` | Map | Static map image with clickable ping animations |
| `locations.html` | Locations | Location cards with fullscreen image viewer |
| `scan.html` | Scan | Reads browser metadata (user agent, memory, language, geolocation) with typing animation |
| `privacy.html` | Privacy | Static lore/flavor page |

### Assets

All images live in the `images/` folder (`.png`, `.jpg`, `.webp`). The `netwatchBanner.png` and `nightcitylogo.jpg` are used for branding. Character portraits are named after their character (e.g., `kali.png`, `broadway.png`). Corporate logos are named after corps (e.g., `nightcorp.png`, `biotechnica.png`).

### Styling conventions

- `styles.css` holds shared styles; page-specific styles are written in `<style>` blocks inline within each HTML file.
- The `.typing-effect` CSS animation (used on `scan.html`) reveals text with a typewriter effect via a `width: 0 → 100%` keyframe.
- Map pings use a `@keyframes ping` scale+fade animation defined inline in `map.html`.

### Adding a new NPC

Follow the pattern in `npc.html`: add a Bootstrap card `col-md-4` div that triggers a modal (`data-toggle="modal" data-target="#textModalN"`), then add the corresponding modal div at the bottom of the file. Portrait images go in `images/`.

### Adding a news article

Follow the pattern in `news.html`: add a Bootstrap card triggering a modal, then add the modal with the full article text at the bottom of the file. Give each modal a unique `id` and matching `aria-labelledby`/`id` pair on the `h5.modal-title`.

## Design Direction

The goal is a **sleek but gritty cyberpunk terminal** — like a public access terminal you'd find in a Night City back-alley. The aesthetic should feel like aged hardware running slick software: phosphor glow, scanlines, monospace fonts, dark backgrounds with neon accents.

### Constraints
- Must work by opening `index.html` directly (`file://` protocol) — no local server, no build step.
- No npm, no bundlers. External dependencies via CDN `<script>`/`<link>` tags only.
- Players may open this offline, so prefer CSS/vanilla JS effects over CDN-dependent ones where possible. CDN fonts/libraries are acceptable since players will generally have internet.

### Aesthetic palette
- Background: near-black (`#0a0a0a` or similar)
- Primary accent: terminal green (`#00ff41`), cyan (`#00e5ff`), or amber (`#ffb000`) — pick one and be consistent
- Text glow via stacked `text-shadow` in the accent color
- Font: `Share Tech Mono` or `VT323` from Google Fonts (one `<link>` tag)

### What is already implemented
- **Color scheme**: CSS custom properties in `:root` in `styles.css` — change `--accent`, `--bg`, `--text`, etc. to retheme the whole site
- **Font**: `Share Tech Mono` loaded via Google Fonts `@import` in `styles.css` (falls back to `monospace` if offline)
- **Screen flicker**: subtle `@keyframes flicker` on `body` in `styles.css`
- **Phosphor glow**: `text-shadow: var(--accent-glow)` on all headings via `styles.css`
- **Boot sequence**: full-screen overlay on `index.html` — types fake OS boot messages then fades out; click anywhere to skip
- **Scanlines**: CRT scanline overlay via `body::after` in `privacy.html` only (intentional — NetWatch surveillance aesthetic)
- **Map ripple rings**: Anime.js — click anywhere on `map.html` spawns 3 staggered expanding rings with accent glow (replaces old single CSS ping)
- **Card stagger entrance**: Anime.js — cards on `npc.html` and `news.html` fade + slide up one by one on page load (80ms stagger, 500ms duration)

### Anime.js ideas not yet implemented (CDN: cdnjs.cloudflare.com/ajax/libs/animejs/3.2.1/anime.min.js)

#### npc.html portrait images
- **Phosphor burn-in on load**: portraits animate from `brightness(4) blur(6px) opacity(0)` to normal, like a CRT warming up — staggers naturally with the existing card entrance.
- **Desaturate to color on hover**: portraits start `grayscale(100%)` and animate to full color on hover — dramatic "character activating" effect.
- **Glitch flicker on hover**: rapid `translateX` jitter + brief `skewX` on the portrait when hovered — corrupted signal feel, ~200ms.
- **FLATLINED special treatment**: Mr. Shima and Albatross portraits permanently locked in red-tinted grayscale (`grayscale(1) sepia(1) hue-rotate(300deg)`) with a slow looping static flicker — visually separates the dead from the living.
- **Scanline wipe reveal on load**: portraits reveal top-to-bottom via animated `clip-path: inset()` like a scanner passing over the dossier image.
- **Glitch flash on headings**: on page load, `h1`/`h2` briefly split cyan/red `text-shadow` channels apart and snap back — like a signal resolving. One-shot, no loop.
- **Breaking news badge pulse**: continuous slow `scale` + glow heartbeat on the red `BREAKING` badge in `news.html` to draw the eye.
- **Scan page number tick-up**: numerical values on `scan.html` (cores, GB, resolution, battery %) count up from 0 before the cursor moves to the next line, like the system is actively measuring.
- **Carousel glitch frame**: brief `skewX` + opacity flash between carousel slide transitions on `index.html` to simulate a signal dropout.
- **Page nav transition**: fade/static-burst on nav link click before the new page loads — requires a small inline script on every page.

### Other techniques not yet implemented
- **Glitch animation**: CSS `@keyframes` with `clip-path` or `skew` + color-channel `text-shadow` offset
- **Canvas effects**: Matrix rain or noise static as background (vanilla JS, no library)
- **Web Audio API**: synthesized key-click or beep sounds on interaction (no audio files needed)
