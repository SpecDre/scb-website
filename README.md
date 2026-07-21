# So Cal Bobcat &amp; SKAGGS Concrete Cutting

Company website. Plain HTML and CSS — no build step, no framework, no dependencies.

**Live site:** socalbobcatskaggs.com
**Host:** Vercel (project `so-cal-bobcat-skaggs-concrete-cutting`)

---

## Files

| File | Page |
|---|---|
| `index.html` | Home |
| `services.html` | Services |
| `projects.html` | Project gallery |
| `about.html` | Company, safety, licensing |
| `careers.html` | Hiring / open positions |
| `contact.html` | Contact and bid request |
| `rate-card.html` | Gated rate card request |
| `style.css` | Colors, fonts, layout for all pages |
| `photos/` | Job photos used on the home and projects pages |
| `video/` | Background and project-card footage |
| `READ-ME-FIRST.md` | Punch list — what still needs filling in |

Change a color or font in `style.css` and every page updates.

---

## How to update the site

1. Click the file you want to change here on GitHub
2. Click the pencil icon (Edit)
3. Make the change
4. Click **Commit changes** at the bottom

Vercel redeploys automatically. Live in about a minute.

### Adding a photo

Job photos live in the `photos/` folder. They're saved at 1600×1000 (16:10) to
match the card shape — anything else gets centre-cropped to fit.

1. Open the `photos` folder, click **Add file → Upload files**, drag it in, commit
2. Edit `projects.html`, copy one whole `<div class="card">` block, paste it above
   the others, and change three things:

```html
<div class="card">
  <div class="shot">
    <img src="photos/your-photo.jpg" width="1600" height="1000" loading="lazy"
      alt="describe what the photo shows">
  </div>
  <div class="meta">
    <div class="tag">Core drilling</div>
    <strong>Project name</strong>
    <span>One line on the scope.</span>
  </div>
</div>
```

Keep filenames lowercase with no spaces: `irvine-coring-2026.jpg`, not
`IMG 4471 (1).JPG`. iPhone photos come off as `.heic`, which browsers can't
display — save or export them as JPEG first.

Always fill in the `alt` text. It's what a screen reader announces and what
Google reads.

---

## Before this replaces the old sites

- [ ] Connect the bid request form (`contact.html`) — currently goes nowhere
- [ ] Connect the rate card form (`rate-card.html`) — currently goes nowhere
- [ ] Replace or delete the placeholder testimonials on `index.html`
- [ ] Take the old public rate card PDF off skaggsconcretecutting.com
- [ ] Confirm public email addresses
- [ ] Update `careers.html` to match what you're actually hiring for
- [ ] Upload a current employment application PDF and link it on `careers.html`

Full list in `READ-ME-FIRST.md`.

---

## Background video

Every page has a fixed video behind it (`<div class="bgvideo">` near the top of
each file) with the content scrolling over translucent dark panels.

- Three clips cycle: skid steers breaking slab, slab sawing, then the excavator
  loading out, then back to the start. The list lives in the `<script>` at the
  bottom of each page — edit `clips` there to change the order or add one.
- To swap footage: update the `clips` list on **every** page, and the `src` on the
  `bgvideo` and hero `<video>` tags (that's just the first clip shown before the
  script takes over)
- **Encode as H.264, not HEVC.** Phone video is often HEVC, which Safari plays and
  Chrome and Firefox frequently don't — the clip silently fails and the rotation
  skips past it. Every clip in `video/` is H.264 for that reason.
- To turn the effect off on a page: remove `class="glass"` from its `<body>` tag
- Phones don't run the fixed video (unreliable on iOS, drains battery) — they get
  a dark background instead. Same for anyone with reduced-motion turned on.
- All footage lives in `video/` in this repo, so nothing depends on the old
  GoDaddy account staying alive.

## Notes

- Search any file for `FILL IN` to find the blanks
- Placeholder testimonials are marked with yellow warning boxes on the page — those are there so nothing fake goes live by accident
- The fax number is commented out in `contact.html` if it's ever wanted back
