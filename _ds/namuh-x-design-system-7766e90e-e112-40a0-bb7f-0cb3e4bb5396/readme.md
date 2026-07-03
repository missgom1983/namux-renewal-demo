# NAMUH X — Design System

Brand & product design system for **나무엑스 (NAMUH X)** — a *Wellness Robotics*
company whose flagship is an intelligent, self-driving home **wellness robot**
(air-care + vital-sign sensing + AI voice + family care), sold by subscription
at **namux.com**.

> **NAMUH = HUMAN, reversed.** The brand is about rediscovering human value
> ("인류 가치 재발견과 새로운 이동"). The **X** is the product, the unknown, the mark.

---

## 1 · Context — what this covers

namux.com is mid-**리뉴얼 (renewal)**: moving from a rented 고도몰(Godomall) shop to an
**independent subscription-commerce platform** (target: August launch). Two
surfaces, deliberately opposite in mood:

| Surface | Theme | Job |
|---|---|---|
| **Marketing** (home, 브랜드스토리) | **Dark** | Make you feel something about the robot. Cinematic, character-driven. |
| **Store** (스토어, PDP) | **Light** | Configure & subscribe. Bright, calm, dense, trustworthy. |

The renewal's stated goals (from the exec 1-pager): subscription-first IA,
video-centric layout, **AI review summaries + video reviews**, two-way "fan
community" interaction, and group-grade security.

### Sources given (store these even if the reader can't open them)
- `uploads/브랜드 가이드.JPG` — the brand identity guide (BI, symbol, color system, pattern, type). **Primary source** for foundations.
- `uploads/총괄사장님 보고용 1P.png` — executive 1-pager on the renewal strategy.
- `uploads/(리뉴얼)메임 HOME.jpeg` — renewed dark homepage → `ui_kits/marketing`.
- `uploads/(리뉴얼)스토어 HOME_260624.png`, `(리뉴얼)스토어_구매상세.png`, `…(AI리뷰,영상).PNG` — renewed store + PDP → `ui_kits/store`.
- `uploads/(고도몰)*` — the **old** Godomall screens (pre-renewal; for contrast only, not recreated).
- `uploads/WellnessSans-*` — brand webfont (Latin).
- `uploads/A-*, B-*, C-*, D-*.png` — brand pattern artwork (the wave/equalizer/X motif) → `assets/patterns`.
- `uploads/나무엑스닷컴_로봇메뉴_스토리보드_v2.2_260623.pdf` — robot-menu (양방향 소통) storyboard. **Not machine-readable here** — see Caveats.

---

## 2 · Content Fundamentals — how NAMUH X writes

**Voice: warm, human, a little playful. Wellness, never spec-sheet.** The robot
is framed as a member of the household, almost a character.

- **Tone** — friendly and witty, with genuine care underneath. Headlines read
  like a story or a wink, not an ad slogan.
  - ✅ *"우리집에 이상한 녀석이 들어왔다"* (A strange little fellow moved into our house)
  - ✅ *"로봇과 사는 시대"* · *"아이의 첫번째 친구"*
  - ❌ *"최대 풍량 7.2㎥/min 고성능 청정기"* — cold spec dumps.
- **Person** — speaks *to* the customer (you / 가족), about *the robot* (그 녀석/나무엑스). Reviews are first-person and unfiltered.
- **Korean-first**, with selective English for system/feature names: *Wellness
  Solution*, *Air Solution*, *Safe Care*, *Vital Sign Check*. Product/section
  eyebrows are often English uppercase; everything human-facing is Korean.
- **Casing** — Korean has no case; Latin labels use Title Case for names
  (*Night Gray*, *Wellness Mint*) and UPPERCASE for eyebrows/overlines.
- **Numbers** — Korean comma grouping + 원, with affixes: `월 51,900원 부터`,
  `최대 7개월 무이자`. Periods as `2026.02.01 – 2026.06.30`.
- **No emoji** in product UI. Mint dots, tags, and the X mark carry accent duty.
- **Wellness vocabulary** — 케어, 살피다, 깨끗한, 함께, 하루, 가족. Avoid aggressive
  sales verbs.

---

## 3 · Visual Foundations

**The mood:** calm, premium, slightly futuristic; lots of breathing room. Two
worlds — bright airy store, deep cinematic marketing — unified by **Wellness
Mint** and the **wave** motif.

### Color
- **Wellness Mint `#85E1D2`** (Pantone 332) — *the* brand color. Primary CTAs,
  active states, accents, the X. Used as a soft tint (`--mint-50/100`) for promo
  blocks and AI-summary cards, solid for buttons, bright for dark-theme accents.
- **Wellness Blue `#022452`** — deep navy. Supporting: sticky purchase bar,
  trust/secondary surfaces, dark promo cards.
- **Black `#0A0B0D`** and a near-black `--dark-bg #08090B` — marketing surfaces.
- **White + a cool gray ramp** (`--gray-50…950`) — store text, borders, surfaces.
- **Rule:** at most 1–2 background colors per page. Marketing = black with one
  mint band. Store = gray/white with mint accents only.

### Type
- **WellnessSans** — brand face (Regular + Bold only). Used for the wordmark,
  Latin display, numbers. Geometric, confident, slightly humanist.
- **Pretendard** (CDN) — Korean + UI body. WellnessSans has **no Hangul**, so
  Korean falls through to Pretendard; stack is `WellnessSans, Pretendard, …`.
- Display is tight (`-0.022em`, 1.12 line-height); **body is generous**
  (`1.62` leading) because Korean needs the air. Two weights do all the work —
  contrast comes from size, not many weights.

### Shape, depth, motion
- **Corners**: soft. Cards ~20px (`--radius-card`), inputs/options 14px, pills
  fully round. Nothing sharp.
- **Borders**: 1px hairlines (`--border-subtle`). **Selected** controls switch
  to a 1.5px near-black outline (`--border-strong`) — that's the selection
  language across color cards, option pills, rows, toggles.
- **Shadow**: light and diffuse (`--shadow-card/lg`) — commerce is airy, never
  heavy. On dark, a **mint glow** (`--glow-mint`) marks active/robot states.
- **Motion**: calm and precise — `--ease-out` ~240ms; small press scale (0.98)
  and hover lift (−3px). **No bounce**, no spring.
- **Backgrounds**: the signature is the **vertical-bar wave/equalizer pattern**
  (a sound-wave that also forms the **X**) — mint on white, faint, often blended
  over dark gradients in heroes. Not gradients-for-their-own-sake, not textures.
- **Imagery vibe**: clean studio product shots on pale gradients; warm domestic
  lifestyle photography (families, kids, pets with the robot). Cool-neutral, soft.
- **Transparency/blur**: sparingly — the sticky header is a `blur(14px)` glass
  bar; review cards use a bottom protection gradient for legible captions.

---

## 4 · Iconography

- **Style:** thin line icons, ~1.7–2px stroke, rounded caps/joins — geometric and
  quiet, matching WellnessSans. No filled/duotone icons, no emoji, no novelty.
- **In this system** icons are authored as **inline SVG inside the components**
  (arrow, check, chevron, plus/minus, star, heart, share, search, user, cart) so
  primitives stay dependency-free. They all follow the thin-line spec above.
- The **circular arrow badge** on `Button trailingArrow` is the one "icon" with
  brand weight — a dark disc + white arrow that says *proceed / subscribe*.
- The **mint star** (`RatingStars`) is the only colored icon; ratings are central
  to the renewal (AI review summaries, video reviews).
- **For new screens** needing icons beyond the built-ins, use **Lucide**
  (https://lucide.dev) via CDN — same thin-line, rounded language. Do **not**
  introduce a heavier or filled icon set, and never hand-draw brand glyphs.
- **The X** is type, not an icon: WellnessSans Bold "X" in mint, set as a small
  superscript after the wordmark. Reuse `NamuhLogo` (in `ui_kits/store/siteChrome.jsx`).

---

## 5 · Index — what's in here

**Foundations** (`styles.css` → imports):
- `tokens/colors.css` · `typography.css` · `layout.css` (spacing/radius/shadow/motion) · `fonts.css` (@font-face + Pretendard) · `base.css`
- `assets/fonts` (WellnessSans woff/woff2), `assets/patterns` (6 brand wave/X motifs), `assets/products` & `assets/lifestyle` (imagery cropped from source screens)

**Components** — `window.NAMUHXDesignSystem_7766e9`:
- core/ — `Button`, `Tag`, `Card`
- forms/ — `OptionPill`, `OptionRow`, `ColorOption`, `TogglePair`, `Stepper`, `Select`
- commerce/ — `ProductCard`, `PriceBlock`, `RatingStars`
- navigation/ — `Tabs`
Each has a `.d.ts` (props) and `.prompt.md` (what/when + example).

**UI Kits**:
- `ui_kits/store/` — light commerce: listing ⇄ subscription PDP (`index.html`).
- `ui_kits/marketing/` — dark homepage (`index.html`).

**Specimen cards** populate the Design System tab (groups: Colors, Type, Spacing,
Brand, Components, Store, Marketing).

**`SKILL.md`** — makes this folder usable as a downloadable Claude skill.

---

## 6 · Caveats & open questions  → **please help me make this perfect**

1. **WellnessSans has Latin glyphs only — no Hangul.** I paired it with
   **Pretendard** (CDN) for Korean. If NAMUH X uses a specific Korean font
   (e.g. a custom WellnessSans KR), **please upload it** and I'll swap it in.
2. **Color hex are sampled from the brand-guide JPG**, not its printed values.
   Wellness Mint `#85E1D2` and Wellness Blue `#022452` are confident reads; the
   guide also cites **Pantone 332** (mint) and a Pantone blue. If you have the
   exact HEX/RGB/CMYK spec, send it and I'll lock the tokens.
3. **The robot-menu storyboard PDF** (`…로봇메뉴_스토리보드…`) and several source
   files had Korean filenames my environment couldn't open directly. I worked
   from the screenshots I *could* read; if the **양방향 소통 메뉴** UX matters for the
   kit, re-share that storyboard as images.
4. **Product/lifestyle imagery is cropped from your screenshots** (lossy). For a
   production-grade kit, drop clean PNGs of the A1 robot, 에어센서, filters, and
   key lifestyle shots into `assets/` and I'll replace them.
5. **Scope:** I built the two renewal surfaces (home + store/PDP). Want more —
   브랜드스토리, 디스커버, 고객지원, cart/checkout, the AI-review module as a component,
   or mobile layouts? Tell me which and I'll extend.
