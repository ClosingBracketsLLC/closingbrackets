// Single source of truth for the scroll world.
//
// Consumed twice, deliberately: `ScrollWorld` feeds it to the scrub engine as
// runtime config, and `page.js` renders the same copy as the static `data-sw-seo`
// block. The engine builds its DOM client-side, so that block is the ONLY
// crawlable text inside the flight — driving both from this file is what stops
// the visible copy and the indexed copy from drifting apart. (The structured
// homepage sections below the flight live in data/home.js and render as
// ordinary in-flow HTML in HomeTail.js.)
//
// Asset paths are absolute (`/assets/...`). They must be: `trailingSlash: true`
// means a page like /start/ would resolve relative paths one level too deep.
//
// THE COPY IS THE OWNER'S, VERBATIM (2026-09-07). The six scenes are video-
// locked (signal → blueprint → forge → swarm → engine → launch) but the story
// they carry follows the master brief: the agency in one line, how an agent is
// scoped, the site/app door, the Build-a-Bot door, the three rules, the ask.
// "swarm" survives only as an asset id; nothing visible says it.
//
// Section CTAs: the hero carries the Build-a-Bot door (the header's "Start a
// project" is already on screen above it), two middle scenes carry a ghost
// sidetrack, and the finale carries the ask. Buttons take their slide's `accent` at
// runtime, so a CTA always matches the colour of its own dot on the route rail.

import { cta, routes } from "./site";

export const sections = [
  {
    id: "signal",
    label: "The Signal",
    still: "/assets/signal.webp",
    poster: "/assets/signal-poster.webp",
    posterMobile: "/assets/signal-poster-m.webp",
    clip: "/assets/vid/signal.mp4",
    clipMobile: "/assets/vid/signal-m.mp4",
    accent: "#2EF2DC",
    scroll: 1.7,
    linger: 0.45,
    eyebrow: "AI-native web agency",
    title: "Websites, apps, and custom AI agents.",
    body: "We build the site or app. We can also build an agent that does a job you assign.",
    // One button: the header already carries "Start a project".
    cta: { primary: { label: "Build A Bot", href: routes.bot } },
  },
  {
    id: "blueprint",
    label: "The Scope",
    still: "/assets/blueprint.webp",
    poster: "/assets/blueprint-poster.webp",
    posterMobile: "/assets/blueprint-poster-m.webp",
    clip: "/assets/vid/blueprint.mp4",
    clipMobile: "/assets/vid/blueprint-m.mp4",
    accent: "#2EF2DC",
    eyebrow: "How the agent is scoped",
    title: "You list the jobs. That is the scope.",
    body: "What it should do. What it should not do. We build that, and nothing else.",
  },
  {
    id: "forge",
    label: "The Forge",
    still: "/assets/forge.webp",
    poster: "/assets/forge-poster.webp",
    posterMobile: "/assets/forge-poster-m.webp",
    clip: "/assets/vid/forge.mp4",
    clipMobile: "/assets/vid/forge-m.mp4",
    accent: "#FF4E64",
    eyebrow: "Web & app",
    title: "You get working software as we go.",
    body: "Each stage comes off the floor as software you can use, not a status report. When we hand it over, you own all of the code.",
    cta: { secondary: { label: "See the work", href: routes.work } },
  },
  {
    id: "swarm",
    label: "Build-a-Bot",
    still: "/assets/swarm.webp",
    poster: "/assets/swarm-poster.webp",
    posterMobile: "/assets/swarm-poster-m.webp",
    clip: "/assets/vid/swarm.mp4",
    clipMobile: "/assets/vid/swarm-m.mp4",
    accent: "#2EF2DC",
    scroll: 1.5,
    linger: 0.35,
    eyebrow: "Build-a-Bot",
    title: "An agent that does a job you assign.",
    body: "Bookings, follow-ups, paperwork — wired to tools you already use. A person handles anything it should not.",
    cta: { secondary: { label: "How it works", href: routes.bot } },
  },
  {
    id: "engine",
    label: "The Rules",
    still: "/assets/engine.webp",
    poster: "/assets/engine-poster.webp",
    posterMobile: "/assets/engine-poster-m.webp",
    clip: "/assets/vid/engine.mp4",
    clipMobile: "/assets/vid/engine-m.mp4",
    accent: "#FF4E64",
    eyebrow: "How we work",
    title: "One scope. Real dates. One price.",
    body: "Written down before we start. No hourly billing. You own the work when it ships.",
  },
  {
    id: "launch",
    label: "Launch",
    still: "/assets/launch.webp",
    poster: "/assets/launch-poster.webp",
    posterMobile: "/assets/launch-poster-m.webp",
    clip: "/assets/vid/launch.mp4",
    clipMobile: "/assets/vid/launch-m.mp4",
    accent: "#FF4E64",
    scroll: 1.8,
    linger: 0.5,
    eyebrow: "Start",
    title: "Tell us what you need.",
    body: "Site, app, agent, or a mix. You get the scope and the price before we start.",
    cta: { primary: cta },
  },
];

// length === sections.length - 1, in flight order. A `null` slot is legal — the
// engine crossfades that seam directly instead of flying it.
export const connectors = [
  "/assets/vid/conn1.mp4",
  "/assets/vid/conn2.mp4",
  "/assets/vid/conn3.mp4",
  "/assets/vid/conn4.mp4",
  "/assets/vid/conn5.mp4",
];

export const connectorsMobile = [
  "/assets/vid/conn1-m.mp4",
  "/assets/vid/conn2-m.mp4",
  "/assets/vid/conn3-m.mp4",
  "/assets/vid/conn4-m.mp4",
  "/assets/vid/conn5-m.mp4",
];
