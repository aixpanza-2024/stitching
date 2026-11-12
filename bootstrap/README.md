# Stitchy — Bootstrap 5 frontend

Frontend only. No backend, no database, no API calls.
Client: Cute Fashions · SOW-013/2026 · AIXPANZA Pvt. Ltd.

## What's here

```
index.html       all 21 application screens
login.html       sign in + forgot password
theme.css        design tokens and components (mulberry, approved)
app.js           demo navigation only — replace at build
vendor/          Bootstrap 5.3.3 + Bootstrap Icons 1.11.3, local copies
```

Open `index.html` in a browser. Nothing to install, works offline.

## Screens

Daily work — dashboard, orders, new order, order detail, billing
Shop — products, categories, customers, income & expenses, staff, settings
Messaging — WhatsApp log, message templates
Super admin — shops, onboard shop, branches, plans & renewals
Print views — cutting slip, customer copy, completion printout, invoice

## Moving it into Django

```
templates/            index.html, login.html  → split per view
static/css/theme.css
static/js/app.js
static/vendor/        bootstrap + icons
```

Each `<section class="tab-pane" id="view-xxx">` in `index.html` is one Django
template. Replace the sidebar's `data-bs-toggle="pill"` buttons with `<a href="{% url %}">`
once routing exists, and drop `app.js` — its only job is demo navigation.

Bootstrap is vendored rather than loaded from a CDN so the app keeps working
when the shop's internet drops. Google Fonts is the one remote request; if it
fails the type falls back to the system stack and nothing breaks.

## Theme

All colour and type lives in `:root` at the top of `theme.css`.

| Token | Value | Use |
|---|---|---|
| `--brand` | `#5A2545` | mulberry — sidebar, primary buttons, headings |
| `--brand-900` | `#2E1024` | hover and pressed states |
| `--gold` | `#E8A317` | turmeric — accent only, one per screen |
| `--bg` | `#FCF6F2` | page background |
| `--danger` | `#C0392B` | overdue and errors only |

Changing the five values above re-skins the whole application. No green is used
anywhere, including status colours.

Print views are black-only, so thermal and laser printers both work and brand
colour is never required on paper.

## Not built — Phase 2

Marked in the UI with a `Phase 2` chip: product variants, voice-entered
measurements, buffered measurement presets, daily order acceptance limit.

## Note on messaging

Messages open in WhatsApp Web with the text pre-filled; the shop presses send.
The app records that a message was opened, not that WhatsApp delivered it.
There is no message quota anywhere in the UI.
