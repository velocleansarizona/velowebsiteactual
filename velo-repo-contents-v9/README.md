# Velo Property Solutions — Website

Static marketing website for [velocleansarizona.com](https://www.velocleansarizona.com). Hosted on Cloudflare Pages and auto-deployed from this repo (`main` branch).

## Structure

```
/
├── index.html                  Homepage
├── about.html                  About the company
├── contact.html                Contact + quote form (Google Map embed)
├── services.html               Services overview
├── service-areas.html          Cities served (links to 14 dedicated city pages)
├── testimonials.html           Customer testimonials
├── faq.html                    FAQ
├── blog.html                   Blog index
├── landing.html                Google Ads landing page (no nav, conversion-focused)
├── thank-you.html              Form submission confirmation (noindexed, strips URL params)
│
├── service-areas/              Per-city landing pages (14 total)
│   ├── phoenix.html, scottsdale.html, mesa.html, tempe.html, chandler.html,
│   ├── gilbert.html, glendale.html, peoria.html, surprise.html, avondale.html,
│   └── goodyear.html, buckeye.html, queen-creek.html, fountain-hills.html
│
├── services/                   Per-service detail pages (14 total)
│   ├── pressure-washing.html, soft-wash.html, window-cleaning.html,
│   ├── janitorial-cleaning.html, office-cleaning.html, medical-facility-cleaning.html,
│   ├── warehouse-cleaning.html, carpet-cleaning.html, stripping-waxing.html,
│   ├── landscaping.html, line-striping.html, waste-management.html,
│   └── post-construction-cleaning.html, property-maintenance.html
│
├── blog/                       Blog articles (2 written, 4 placeholders in code)
├── css/                        Main stylesheet + service-page-specific styles
├── js/                         Nav, form handling, popup logic (main.js)
└── images/                     Logo + on-the-job photos
```

## How forms work

The quote form appears on every page where there's a "Get a Free Quote" CTA. On submit:

1. `js/main.js` validates required fields.
2. If valid, the form submits via GET to `/thank-you.html`.
3. WhatConverts (tracking script in every page's `<head>`) captures the submit event before the navigation completes and records the lead to the WhatConverts dashboard, which emails Damien.
4. The user lands on `/thank-you.html`, which strips the form data out of the URL via `history.replaceState` and shows a confirmation message.
5. Google Ads also captures the form data via Enhanced Conversions for conversion tracking.

There is no backend / serverless function. Forms work because WhatConverts catches submit events client-side.

### Important: WhatConverts form registration

Every form on the site is identified in the WhatConverts dashboard by its HTML `id` attribute:

- `#contact-form` — Used on `contact.html`, every service page, and every city page
- `#hero-form` and `#bottom-form` — Used on `landing.html`

If you change these `id` attributes in the HTML, WhatConverts will stop capturing leads until you update the dashboard registration (Tracking → Forms → Web Forms).

### If the WhatConverts script ever stops working

Forms will still navigate to the thank-you page, but no lead notification email will be sent. Consider adding a backup like [Formspree](https://formspree.io) so emails are guaranteed even if tracking breaks.

## Reviews & Google Business Profile integration

Live Google Business Profile:
- Direct link: `https://share.google/BVoK1ndq1Pmkjv4Bs`
- Write-a-review shortcut: `https://g.page/r/CRi_FD2VbqZJEBE/review`

Where each appears on the site:

- **Homepage** — Reviews summary section with 5.0 / 45+ reviews stats and both "Read Reviews" and "Leave a Review" CTAs
- **About page** — Review CTA card below the Damien-on-the-job photo
- **Thank-you page** — "Leave a review" CTA below the main thank-you message (natural post-conversion moment)
- **Every page footer** — "Leave a Google Review" link in the Quick Links column

Structured data (LocalBusiness schema) on every page includes `aggregateRating` (5.0 stars, 45 reviews) and `sameAs` (GBP + Instagram + Threads).

## Trust bar

Appears just below the page hero on every main page (homepage, about, contact, services, service-areas, FAQ, all city pages, all service pages). Shows 5 items: 5.0 / 45+ Reviews, Licensed & Insured, Locally Owned, After-Hours Service, Google Verified. On mobile it collapses to a 2×2+1 grid layout.

Not present on: `landing.html` (intentionally minimal), `thank-you.html`, blog pages.

## Tracking and analytics

- **Google Analytics 4** — `G-8BG8MQ67Q6`
- **Google Ads** — `AW-17166136199` (conversion tracking + Enhanced Conversions for forms)
- **WhatConverts** — Profile `169027`, script at `s.ksrndkehqnwntyxlhgto.com/169027.js`
- **Phone DNI** — All visible phone numbers swap dynamically via WhatConverts. Real line: (602) 325-3235.

## Deploying

This repo is connected to Cloudflare Pages. Pushes to `main` automatically trigger a build and deploy:

- Build command: *(none — static site)*
- Build output directory: `/`
- Production branch: `main`
- Custom domain: `www.velocleansarizona.com` (CNAME at Namecheap → `velo-dq3.pages.dev`)
- Apex domain `velocleansarizona.com` 301-redirects to `www` via a Namecheap URL Redirect record

To deploy manually (e.g., for an emergency change without going through Git), you can also do a direct upload via the Cloudflare Pages dashboard → project → Create deployment → Upload assets.

## Editing checklist

Before pushing changes:

- Test locally: `python3 -m http.server 8000` from this directory, then visit `http://localhost:8000`
- Verify forms still validate and navigate to the thank-you page
- If editing HTML, check that all internal links still resolve
- If editing form fields or IDs, confirm the WhatConverts dashboard form registration still matches

## Known to-do items (not blockers)

- Write the 4 placeholder blog posts (`/blog/ada-parking-lot-requirements-arizona.html`, `commercial-landscaping-arizona-guide.html`, `osha-cleaning-requirements-medical-offices-arizona.html`, `parking-lot-pressure-washing-maricopa-county.html`, `post-construction-cleaning-checklist-arizona.html`)
- Add or remove the missing `images/google-logo.svg` reference (currently referenced by 2 pages)
- Some existing service pages (medical, warehouse, carpet, floor stripping/waxing) may not match Damien's actual offering — trim any that aren't relevant

## Domains & accounts

- Domain registrar: Namecheap (`velocleansarizona.com`)
- DNS: Namecheap (Advanced DNS tab)
- Hosting: Cloudflare Pages (project `velo`)
- Email destination for leads: configured in WhatConverts (profile 169027)

## Version history (initial buildout)

- **v1** — Fixed original broken flat-file structure (moved CSS/JS/images into proper subfolders)
- **v2** — Added 3 on-the-job photos (hero, About page, pressure washing service page); added Recent Work section
- **v3** — Wired quote forms to WhatConverts + created thank-you.html
- **v4** — Added 14 city landing pages, soft-wash service page, Google reviews integration; subtle exterior positioning rebalance
- **v5** — Style polish pass (typography, buttons, trust bar, hover states)
- **v6** — Toned down glossy button/card treatments (corporate calm)
- **v7** — Fixed mobile trust bar layout; added trust bar to all main pages
- **v8** — Removed duplicate/invisible original trust bar on homepage (fixed mobile empty-space bug)
- **v9** — Punctuation fix on homepage "Getting Started" section

From this point forward, use Git commits instead of version zips.
