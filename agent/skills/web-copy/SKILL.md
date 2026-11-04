---
name: web-copy
description: >
  This skill should be used when writing the words on a website — when the user asks to
  "write the copy", "write a headline", "what should the hero say", "write the about page",
  "make the CTA better", "write FAQs", "add testimonials", or when site-builder
  needs page copy. Produces specific, conversion-oriented, GEO-friendly copy in a voice that
  matches the design archetype.
metadata:
  version: "0.1.0"
---

# Web Copy

Copy is the part of the site the reader actually uses. Write for one person with one problem, in the voice the archetype implies, and never ship Lorem ipsum or generic filler. Never write a number, name, quote, rating, licence, certification or year in business that the client did not give you: on a live site each one is a legal problem for the client. A fact you do not have is left out, and the delivery message lists what is missing. The deploy check fails any page that carries a `[PLACEHOLDER…]` or `[SAMPLE…]` marker.

## Voice by archetype

Swiss: declarative, short, no adjectives. Brutalist: blunt, first-person, slang allowed. Editorial: literate, long-form, wry. Luxury: sparse, sensory, never salesy. Playful: warm, exclamation-free but upbeat, contractions. Corporate: plain, confident, outcome-led. Terminal: terse, technical, exact. Organic: gentle, second-person, unhurried. Retro-Futurist: bold, a little absurd. Bauhaus: manifesto-like, short lines. Japanese: minimal, quiet, few words. Maximalist: exuberant, layered. Art Deco: elegant, slightly formal. Neo-Glass: precise, future-facing, benefit-first. Craft: honest, personal, story-led. Scandinavian: functional, product-fact-led. Cinematic: one-liners, dramatic. Newspaper: reportorial, factual. Docs: instructional, imperative.

## Headline formulas (pick one per hero; vary across sites)

1. Outcome + timeframe: "Close your books in 3 days, not 3 weeks."
2. For-whom + what: "Bookkeeping for restaurants that hate spreadsheets."
3. Contrast: "Less admin. More Fridays."
4. Question the reader is asking: "Still doing month-end by hand?"
5. Bold claim + proof: "The fastest roofer in Boise. 4.9★ from 300 homeowners."
6. Verb-first invitation: "Sell the thing you make."
7. Single word/phrase (Cinematic/Brutalist): "Unreasonable." / "Bread, slowly."
8. Specific number: "212 kitchens. Zero change orders."

Subhead: how it works or who it is for, one or two lines, concrete nouns. Avoid: "solutions", "seamless", "elevate", "unlock", "cutting-edge", "passionate", "world-class", "leverage", "empower".

## CTAs

Verb + outcome, first person optional: "Book a free audit", "See the menu", "Get the price list", "Start my trial", "Reserve a table", "Download the guide". Secondary CTA is lower commitment: "See how it works →", "Watch the 90-second demo". One primary per view. Match the CTA label to the actual next screen.

## Section copy patterns

- **Problem → promise**: two short paragraphs; name the pain specifically, then the outcome. No "we" in the first paragraph.
- **Services/features**: title as a benefit ("Same-week install"), 1–2 sentence description with a specific, optional "Good for: …" line.
- **Process**: 3–5 numbered steps, each a verb phrase + one sentence; timeframes where true.
- **Proof**: stats with units and timeframes; logos with a caption; one long testimonial beats five short ones.
- **About**: who, since when, where, why — facts first (helps GEO), then the story. Founder name and role.
- **Pricing**: real numbers or honest ranges ("Most kitchens: $18k–$42k"); what is included; the one thing that changes price.
- **FAQ**: 5–8 real objections phrased as searched questions; answers 40–80 words, answer-first (see `geo`).
- **Final CTA band**: restate the hero promise in new words + the same primary CTA.
- **Footer tagline**: one line, the 25-word canonical description from `geo` §8 shortened.

## Testimonials and social proof without real data

Do not write testimonials, review counts, star ratings, customer names, stats or licence numbers. Not as samples, not as drafts, not in a comment or a hidden block: a made-up quote sitting in a page's source is still a made-up quote, and the deploy check fails on the markers and on the old template's invented text. The site template shows no section for an empty `testimonials`, `stats` or `faq` list, so leave the list empty and move on. Never add `aggregateRating` schema without a rating and a count the client can show you the source of.

Use only what the client supplied: their real review quotes with the name they allow and where it came from ("via Google"), figures they gave you, a licence number they read out. Put what is missing in the delivery message as a question ("No reviews yet. Send two or three quotes you are happy to publish, with the customer's first name"), so the client can supply it. Until they do, lead with proof that exists today: the services, the process, the service area, a photo of the work.

## Microcopy

Form labels are nouns ("Email", "Phone"), helper text is a full sentence, error text says how to fix ("Enter a phone number with area code"), success states confirm the next step ("Thanks — we'll call you before 5pm tomorrow"). Empty states and 404s stay in voice. Button loading states: "Sending…".

## Length guides

Home: 400–800 words visible. Service page: 600–1,200. About: 300–600. Landing page (paid traffic): 300–600, one CTA repeated. Blog/guide: 1,000–2,000 with H2 questions.

## SEO/GEO hooks (apply silently)

Primary query in H1 and first 100 words; H2s as questions; specifics over adjectives; entity sentence on Home/About; `datePublished` on articles; internal links with descriptive anchors woven into copy.

## Output

Deliver copy per section in the order of the page cadence, ready to paste into components; list at the end every fact you did not have and had to leave out.
