# So Cal Bobcat & Skaggs — New Website

Five pages, one stylesheet. Everything is plain HTML, so it can be hosted
anywhere — GoDaddy, Netlify, Vercel, or a normal web host.

## Files

| File | What it is |
|---|---|
| `index.html` | Home page |
| `services.html` | Services detail |
| `projects.html` | Project gallery |
| `about.html` | Company, safety, licensing |
| `contact.html` | Contact info and bid request form |
| `rate-card.html` | Gated rate card request (lead capture) |
| `careers.html` | Hiring / open positions |
| `style.css` | Colors, fonts and layout for all five pages |

To change a color or font everywhere at once, edit the top of `style.css`.

---

## MUST DO BEFORE LAUNCH

These three will cost money or credibility if they go live wrong.

**1. Connect the bid request form.**
The form on the contact page does nothing right now. Submissions go nowhere.
Whoever hosts the site has to point it at a form handler (Formspree, Netlify
Forms, or the host's own). An unconnected form silently loses bids.

**2. Confirm the estimating email address.**
The old site's quote button pointed at `estimator@skaggsconcrtecutting.com` —
that domain looks misspelled. Quote requests may have been bouncing for a while.
Verify what address should be public and put it in.

**3. Connect the rate card request form too.**
Same deal as the bid form — `rate-card.html` does nothing until it's wired up.
This one matters because it's your lead-capture: every submission tells you who
is actively shopping. Once connected, you get an email per request, you decide,
and you reply with the PDF attached. Fully automatic delivery would need a real
backend; this manual version gets you the same information now.

**4. Replace or remove the placeholder testimonials.**
Three empty quote slots on the home page are marked with a yellow warning box.
Either fill them with real approved quotes or delete the section entirely
before launch. One of the sites you looked at shipped with fake stock
testimonials — same headshot, same text repeated four times. A GC spots that
immediately and it costs more trust than having no testimonials at all.

---

## FILL IN AS YOU GO

Search any file for `FILL IN` to find these in place.

**Numbers and facts**
- Core drilling diameter range
- Grinder width and max depth per pass (the two questions GCs ask about grinding)
- Emergency response time — if you can commit to one, it's the strongest thing
  on the site. Only publish a number you can actually hit.
- Max depth of cut by saw type
- Typical mobilization lead time (FAQ)
- Confirm the county list — remove any you don't actually service

**Settled — no longer open questions**
- Company name: So Cal Bobcat & SKAGGS Concrete Cutting (one name, everywhere)
- License: CA #834117
- Main phone: 714-787-9970
- After hours: calls go to dispatch (no name published)
- Rate card: gated behind a request form, not posted publicly

**Company details**
- Real logo (currently an orange "SB" box)
- Confirm both license numbers and that each is attributed to the right entity
- DIR registration number if you have one — public works GCs look for it
- Rob's last name and title for the owner statement
- Rob's statement — three or four sentences in his own words
- Founding story for the About page
- Fax: left off the site for now by decision. The old number (714-993-9487) is
  commented out in `contact.html` — uncomment it if you decide to publish one.

**Safety — best place on the site to get specific**
- EMR rating
- OSHA 10/30 certified crews
- Written IIPP, silica exposure control plan
- Any safety awards or recognitions

Generic "safety is our top priority" language is on there now. Real specifics
beat it every time with a superintendent.

**Proof (the part that actually sells)**
- Job photos — eight empty slots on the projects page, four on the home page
- Project names with city and scope
- Testimonials — three slots
- Contractor names or logos (get written permission first)

**Careers page**
- Update the six roles to match what you're actually hiring for — delete any you're not
- Confirm what class of driver's license the truck driver role needs
- Add real benefits if you offer them (health, holidays, OT, boot allowance, 401k).
  Specifics get applications; generalities don't.
- Upload a current employment application PDF and uncomment the download button
- Confirm which email should receive applications

**Housekeeping**
- Confirm the real Instagram handle — the old link looked misspelled
- Set up a LinkedIn company page and link it (this is where your GC contacts are)
- Embed the Google map on the contact page
- Link a current employment application PDF

---

## LEFT OFF ON PURPOSE

**The public rate card.** The old Skaggs site had rates downloadable by anyone
at `/rates2023.pdf`. Competitors could read them. Talk to Rob before putting
that back on a public page.

---

## HOW TO ADD A PROJECT

Open `projects.html`, copy one whole `<div class="card">` block, paste it above
the others, then change three things:

1. Replace `<div class="ph">...</div>` with `<img src="photo.jpg" alt="what it shows">`
2. Change the tag line to the scope (Core drilling, Wall sawing, etc.)
3. Change the project name and the city/scope line

Naming the **project** ("Medical office TI, Irvine") is usually an easier
permission ask than naming the **general contractor**. Get written OK before
naming a GC or using their logo.

---

## THE HONEST PART

The design is done and it holds up against every site you sent me. But design
isn't what wins the bid — proof is. Of the six sites you liked, the two that
felt most credible (IRS Demo and Bedrock) were credible because of named
testimonials and real client logos, not because of their layout.

Every empty slot on this site is a slot for proof you have to go get. The
photos are free — the crews are already on those jobs. The testimonials cost
you a few phone calls. That's the work that turns this into sales.
