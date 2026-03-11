# Heia — Requirements & Architecture

## Overview
Heia is a client-side AI chat application built on the [Pollinations.ai](https://pollinations.ai) API.
All data is stored in the browser via `localStorage`. No backend required.

## Dependencies (CDN — no install needed)

| Dependency | Version | Purpose |
|---|---|---|
| [highlight.js](https://highlightjs.org/) | 11.9.0 | Syntax highlighting in code blocks |
| [Inter](https://fonts.google.com/specimen/Inter) | via Google Fonts | UI typeface |

Both are loaded directly from CDN in `index.html`. No `npm install` is needed.

## Running Locally
Open `index.html` in any modern browser. Since the app uses `fetch()` and `localStorage`,
it requires a browser environment (not `file://` for CORS reasons on some browsers).

Recommended: use a simple local server:
```bash
# Python 3
python3 -m http.server 8080

# Node (npx)
npx serve .
```
Then visit `http://localhost:8080`.

## API Key
Obtain a free public key at [enter.pollinations.ai](https://enter.pollinations.ai).
Keys start with `pk_` or `sk_`.

---

## Project Structure

```
heia/
├── index.html              ← Entry point — HTML shell + script/CSS wiring
├── requirements.md         ← This file
│
├── css/
│   ├── variables.css       ← CSS custom properties (design tokens, themes)
│   ├── base.css            ← Reset, typography, shared buttons & form fields
│   ├── key-screen.css      ← Login screen, expired-key banner
│   ├── sidebar.css         ← Sidebar, chat list, bottom nav, Pollinations credit
│   ├── topbar.css          ← Topbar, model pill, brain (memory) button
│   ├── chat.css            ← Chat area, message bubbles, code blocks, typing indicators
│   ├── input.css           ← Input bar, send/stop buttons, stream status, scroll button
│   ├── modals.css          ← Modal shell, settings sections, key items, memory items, model picker
│   └── utilities.css       ← Toast, hljs override, responsive breakpoints
│
└── js/
    ├── config.js           ← Constants: API_BASE, KEYS, MEMORY_MAX_BLOCKS, DEFAULT_MODELS
    ├── state.js            ← Global mutable state object
    ├── i18n-strings.js     ← STRINGS (10 languages) + I18n module + `t()` helper
    ├── store-theme-account.js ← Store (localStorage), Theme, Account modules
    ├── api.js              ← API module: fetch, stream, validateKey
    ├── renderer.js         ← Renderer: Markdown parser, code highlighting, streaming render
    ├── ui.js               ← UI module: DOM helpers, scroll, toast, bubbles, chat list
    ├── chat.js             ← Chat module: create/switch/delete/send/regenerate/stop
    ├── memory.js           ← Memory module: extract, deduplicate, clear, editItem, deleteItem
    ├── modals.js           ← Modals module: renderSettings, renderMemory, renderModelPicker, renderHelp
    ├── keys.js             ← Keys module: handleSubmit, handleRenew, activate, add, delete, setModel
    ├── canvas.js           ← Honeycomb canvas drawing (key screen + chat background)
    └── app.js              ← App.enter() + init() bootstrap
```

## JavaScript Load Order
Scripts must be loaded in this exact order (each depends on the ones above it):

1. `config.js`             — no dependencies
2. `state.js`              — depends on: config
3. `i18n-strings.js`       — depends on: state
4. `store-theme-account.js`— depends on: config, state
5. `api.js`                — depends on: config, state, ui (called at runtime)
6. `renderer.js`           — depends on: ui (called at runtime)
7. `ui.js`                 — depends on: state, renderer, i18n, chat (called at runtime)
8. `chat.js`               — depends on: state, store, ui, api, renderer, memory
9. `memory.js`             — depends on: state, store, ui, modals, api
10. `modals.js`            — depends on: state, i18n, renderer, theme, keys, account, memory
11. `keys.js`              — depends on: state, store, api, ui, modals, app
12. `canvas.js`            — depends on: state
13. `app.js`               — depends on: all of the above

## Supported Languages (i18n)
pt · en · es · fr · de · it · ja · zh · ko · ru

Language is auto-detected from `navigator.languages`.
