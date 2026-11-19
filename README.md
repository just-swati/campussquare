# CampusSquare — website

**Live at https://campussquare.in** — hosted on GitHub Pages from the `main` branch of [`just-swati/campussquare`](https://github.com/just-swati/campussquare). `www.campussquare.in` and `just-swati.github.io/campussquare` redirect there.

Static site (HTML + CSS + vanilla JS, no build step). Open `index.html` in a browser to preview locally.

| Page | Purpose |
|---|---|
| `index.html` | Home — programs, verification checklist, steps, 10th/12th, career support, FAQ |
| `about.html` | Story, mission/vision, values, approach, who we help |
| `courses.html` | All 15 programs with filters and search (`courses.html?level=pg\|ug\|cert\|school`) |
| `contact.html` | Contact details + enquiry form |
| `landing.html` | Standalone ad-campaign landing page (lead form above the fold, mobile sticky bar) |

Shared files: `assets/css/styles.css`, `assets/js/main.js`, `assets/img/`.

## Business details in use

- **Phone & WhatsApp:** +91 95405 42226 — `tel:+919540542226`, `wa.me/919540542226`, and `CONFIG.whatsappNumber` in `assets/js/main.js`
- **Address:** B-07, 247/4A, Procapitus Business Park, Sector 63, Noida, Uttar Pradesh (contact page + every footer, with a Google Maps link)
- **Logo:** generated from the original `logo.jpg` (white background made transparent):
  - `assets/img/logo-horizontal.png` — icon + wordmark, used in the header and (on a white pill) on the landing page
  - `assets/img/logo-full.png` — full stacked logo with tagline, used on a white card in the footer
  - `assets/img/favicon.png`, `assets/img/apple-touch-icon.png` — browser tab and home-screen icons
- **Colours:** the blue/orange tokens at the top of `assets/css/styles.css` are sampled from the logo

## Still to replace before going live

| Placeholder | Replace with |
|---|---|
| `hello@example.com` | Your email (find-and-replace across all files) |
| `href="#"` in `.socials` | Your Instagram / YouTube / Facebook / LinkedIn URLs |

Also review:
- **Testimonials** on `index.html` and `landing.html` are placeholders (marked with HTML comments). Replace them with real, consented student reviews.
- **Career-support bundles**, the **24-hour callback** promise and the **office hours** (Mon–Sat, 10 AM – 7 PM) should match what you actually offer.

## Where enquiries go

All forms (pop-up, contact page, landing page) are handled in `assets/js/main.js` → `CONFIG`:

- `formEndpoint: ''` (default) — on submit, WhatsApp opens to +91 95405 42226 with the visitor's details prefilled.
- Set `formEndpoint` to a URL that accepts POSTed form fields (e.g. Formspree, a Google Apps Script web app, or your own backend) to receive leads directly. Fields sent: `name, phone, email, course, message, source, page, submittedAt`.

Course lists for the dropdowns live in `COURSES` in the same file.

## Publishing updates

Edit the files, then in this folder run:

```sh
git add -A
git commit -m "Describe the change"
git push
```

GitHub Pages rebuilds the site in about a minute. This folder is configured to push as the `just-swati` GitHub account (its token is read from the `gh` keyring at push time), whichever `gh` account is active.

## Domain (GoDaddy)

The `CNAME` file tells GitHub Pages to serve the site at `campussquare.in`. DNS records at GoDaddy:

| Type | Name | Value |
|---|---|---|
| A | @ | 185.199.108.153, 185.199.109.153, 185.199.110.153, 185.199.111.153 (four records) |
| CNAME | www | just-swati.github.io |

HTTPS certificates are issued and renewed automatically by GitHub Pages.
