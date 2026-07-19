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

1. Click **Add file → Upload files** in this repo
2. Drag the photo in, commit
3. Edit `projects.html` and replace a placeholder block:

```html
<!-- before -->
<div class="shot"><div class="ph">Add job photo<br>Core drilling</div></div>

<!-- after -->
<div class="shot"><img src="your-photo.jpg" alt="Core drilling through slab"></div>
```

4. Update the project name and city/scope line underneath

Keep photo filenames lowercase with no spaces: `irvine-coring-2026.jpg`, not `IMG 4471 (1).JPG`.

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

- Two clips alternate: the bobcat/skid steer footage, then the wall saw trench
  removal, then back to the start. The list lives in the `<script>` at the bottom
  of each page — edit `clips` there to change the order or add a third.
- To swap footage: update the `clips` list on **every** page, and the `src` on the
  `bgvideo` and hero `<video>` tags (that's just the first clip shown before the
  script takes over)
- To turn the effect off on a page: remove `class="glass"` from its `<body>` tag
- Phones don't run the fixed video (unreliable on iOS, drains battery) — they get
  a dark background instead. Same for anyone with reduced-motion turned on.
- The videos are still hosted on the old GoDaddy site. If that account lapses,
  they die. Worth uploading copies to this repo.

## Notes

- Search any file for `FILL IN` to find the blanks
- Placeholder testimonials are marked with yellow warning boxes on the page — those are there so nothing fake goes live by accident
- The fax number is commented out in `contact.html` if it's ever wanted back
