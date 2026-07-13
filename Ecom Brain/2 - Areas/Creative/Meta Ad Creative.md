# Meta Ad Creative

> Guidelines & templates for creating Facebook/Instagram ad creatives — tactical/functional niche.

## Ad Structure

Every Meta ad has these components:

| Element | Specs | Notes |
|---|---|---|
| **Primary Text** | 125 chars visible (up to 1000) | Hook in first line — stop the scroll |
| **Headline** | 27 chars visible (up to 255) | Benefit-driven, not feature-driven |
| **Description** | 27 chars visible | Often hidden on mobile |
| **CTA Button** | Shop Now / Learn More / Get Offer | "Shop Now" for direct response |
| **Media** | Image 1080x1080 or Video 1080x1350 | 4:5 ratio for max feed real estate |

## Creative Formats

### Image Ads
- Product on white/lifestyle background
- Before/After comparison
- UGC-style (phone screenshot, review overlay)
- Infographic (features callout)

### Video Ads
- **Hook** (0-3s): Problem statement or visual shock
- **Body** (3-15s): Solution + demo
- **CTA** (15-20s): Offer + urgency
- Best length: 15-30s for cold traffic

### Carousel
- Slide 1: Hook image
- Slide 2-4: Features/benefits
- Slide 5: CTA + offer

## Copy Frameworks

### PAS (Problem - Agitate - Solution)
```
[PROBLEM] Most people can tell when someone's carrying.
[AGITATE] The bulge. The awkward waistband dig. The constant adjusting.
[SOLUTION] The 2TAC Ghost Brief fixes this.
```

### Hook → Benefit → Proof → CTA
```
[HOOK] Big guys who carry know the problem.
[BENEFIT] Zero dig-in, zero printing. All day. Every day.
[PROOF] Trusted by 200,000+ carriers worldwide
[CTA] 👇 43% OFF today only.
```

### Listicle
```
✅ Fits any full-size handgun
✅ Right or left draw
✅ Zero printing. Zero shifting. All day comfort.
```

## Tactical Niche — Winning Angles

Based on competitor research ([[FB Ads Library Scraper]]):

| Angle | Example | Why it works |
|---|---|---|
| Concealment | "Nobody sees a thing" | Core fear of printing |
| Comfort | "Carry all day. Feel nothing." | IWB pain point |
| Confidence | "Carry with confidence" | Emotional benefit |
| Discount/Urgency | "43% OFF today only" | Direct response driver |
| Social Proof | "200,000+ carriers" | Trust building |
| Mystery/Curiosity | "What's in the box?" | Click-bait for bundles |

## Offer Types

- **Percentage off**: 20-43% (sweet spot for impulse)
- **Promo code**: DAD15, COMEBACK20 (event-tied or retargeting)
- **Bundle/Mystery box**: Higher AOV play
- **Free shipping threshold**: Increases cart size

## Creative Testing Framework

### Phase 1: Hook Test
- Same body, 3-5 different hooks
- Winner = lowest CPC / highest CTR

### Phase 2: Body Test
- Winning hook, 3-5 different bodies/angles
- Winner = highest ROAS

### Phase 3: Format Test
- Winning hook + body across: image / video / carousel
- Winner = scale

## Specs Quick Reference

| Placement | Ratio | Size |
|---|---|---|
| Feed (FB/IG) | 4:5 | 1080x1350 |
| Stories/Reels | 9:16 | 1080x1920 |
| Carousel | 1:1 | 1080x1080 |
| Video max | — | 240 min, 4GB |
| Image max | — | 30MB |

## Creative Metadata Refresh Flow

Before uploading ad creatives, strip old metadata and stamp as iPhone UGC so the creative appears fresh and authentic.

**When:** After downloading new creatives, before uploading to Meta Ads Manager.

**Steps (ask Claude to run):**
1. Tell Claude the folder name in Downloads (e.g. "Creative 15-06")
2. Claude runs:
   - **Strip**: Removes all existing metadata (EXIF, GPS, device model, capture time, software)
   - **Stamp**: Writes iPhone 15 Pro Max metadata — `Make: Apple`, `Model: iPhone 15 Pro Max`, `Software: 18.5`, timestamps set to today with randomized hours

**What gets written:**

| Tag | Value |
|---|---|
| Make | Apple |
| Model | iPhone 15 Pro Max |
| Software | 18.5 (iOS version) |
| CreateDate / ModifyDate | Today's date, random hour 8am-8pm |
| TrackCreateDate / TrackModifyDate | Same |
| MediaCreateDate / MediaModifyDate | Same |

**Why:** Platforms can fingerprint creatives by metadata. Fresh iPhone metadata makes the video look like original UGC shot on a phone, not a rip or stock clip.

**Requires:** `exiftool` installed (`brew install exiftool`).

## Resources
- [[FB Ads Library Scraper]] — Crawl competitor ads for inspiration
- [[Paid Ads]] — Channel strategy & budgets
