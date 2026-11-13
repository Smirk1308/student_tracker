# Design system — Syllabus Wallah

Original direction: a calm night flight deck where each topic is study payload and an exam is its landing. The logo is **सा Wallah**; tagline: *syllabus ka scene ab ekdam clean*.

## Tokens

- Surface: warm ivory `#f6f7f3`; cards `#ffffff`; ink forest `#18372b`; muted green `#52675b`; action green `#176543`; soft sage `#dce7dd`.
- Heading: Outfit 600; body: Work Sans 400, both self-hosted with `@fontsource`.
- Motion: fast 180ms, normal 320ms, slow 650ms; easing `[.16,1,.3,1]`; transform/opacity only.
- AA contrast, 44px targets, visible amber focus, labels on inputs, aria-live for changed countdown/toasts.

## Primitives

- `Reveal`: use around one heading/card sequence.
- `ScrollSection`: semantic animated section; `<ScrollSection label="Overview">…</ScrollSection>`.
- `Parallax`: decorative only, static under reduced motion.
- `CountUp`: updated metric, e.g. `<CountUp value={days} />`.
- `Magnetic`: one primary CTA only.
- `PageTransition`: router content wrapper.
- `ProgressTrack`: accessible visual progress with visible number nearby.
- `RunwayScene`: original inline-SVG flight path, no copied asset.

The loader must be skippable and <1.5s; the working tracker stays one click from top. Validate 390px and 1440px before marking a UI task done.
