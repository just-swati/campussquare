# CampusSquare — website

**Live at https://campussquare.in** — hosted on GitHub Pages from the `main` branch of [`just-swati/campussquare`](https://github.com/just-swati/campussquare). `www.campussquare.in` and `just-swati.github.io/campussquare` redirect there.

Static site (HTML + CSS + vanilla JS, no build step). Open `index.html` in a browser to preview locally.

| Page | Purpose |
|---|---|
| `index.html` | Home — programs, verification checklist, steps, 10th/12th, career support, FAQ |
| `about.html` | Story, mission/vision, values, approach, who we help |
| `courses.html` | All 15 programs with filters and search (`courses.html?level=pg\|ug\|cert\|school`) |
| `contact.html` | Phone, WhatsApp, email, office address + enquiry form |
| `landing.html` | Standalone ad-campaign landing page (lead form above the fold, mobile sticky bar) |

Shared files: `assets/css/styles.css`, `assets/js/main.js`, `assets/img/`.

## Business details in use

- **Phone (calls):** main **+91 77018 22935**, second +91 95405 42226 — top bar (main), contact page and footers (both); the landing page's header and bottom-bar Call buttons use the main number.
- **WhatsApp:** `919540542226` — every "Chat on WhatsApp" button and `CONFIG.whatsappNumber` in `assets/js/main.js`.
- **Email:** info@campussquare.in — top bar, contact page, footers, landing page footer.
- **Address:** B-07, 247/4A, Procapitus Business Park, Sector 63, Noida, Uttar Pradesh (contact page + every footer, with a Google Maps link)
- **Logo:** generated from the original `logo.jpg` (white background made transparent):
  - `assets/img/logo-horizontal.png` — icon + wordmark, used in the header and (on a white pill) on the landing page
  - `assets/img/logo-full.png` — full stacked logo with tagline, used on a white card in the footer
  - `assets/img/favicon.png`, `assets/img/apple-touch-icon.png` — browser tab and home-screen icons
- **Colours:** the blue/orange tokens at the top of `assets/css/styles.css` are sampled from the logo

## Where enquiries (leads) go

All forms — the landing page form, the "Free counselling" pop-up and the contact page form — are handled in `assets/js/main.js` → `CONFIG.formEndpoint`:

- **Set to the Google Apps Script URL:** each enquiry is saved as a row in the **CampusSquare Leads** Google Sheet and an email alert is sent. The visitor sees a thank-you message (with an optional WhatsApp button).
- **Empty:** the form opens WhatsApp with the visitor's details prefilled; nothing is stored, and the lead only arrives if the visitor presses Send.

Fields saved: Received, Name, Phone, Email, Program, Message, Form (which form it came from), Page.

**Setup:** follow the steps at the top of [`google-apps-script/Code.gs`](google-apps-script/Code.gs), then put the Web app URL into `CONFIG.formEndpoint` and publish. To email other people too, set `NOTIFY_EMAILS` in the script and deploy a new version (Deploy → Manage deployments → Edit → Version: New version).

Spam protection: a hidden `website` field (people never see it; bots fill it in) plus server-side checks for a name and a valid 10-digit Indian mobile number.

## Still to replace

- `href="#"` in `.socials` → your Instagram / YouTube / Facebook / LinkedIn URLs
- **Testimonials** on `index.html` and `landing.html` are placeholders (marked with HTML comments) — replace with real, consented student reviews
- **Career-support bundles**, the **24-hour callback** promise and the **office hours** (Mon–Sat, 10 AM – 7 PM) should match what you actually offer

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
