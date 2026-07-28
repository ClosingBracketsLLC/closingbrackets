// Single source of truth for the scroll world.
//
// Consumed twice, deliberately: `ScrollWorld` feeds it to the scrub engine as
// runtime config, and `page.js` renders the same copy as the static `data-sw-seo`
// block. The engine builds its DOM client-side, so that block is the ONLY
// crawlable text on the page — driving both from this file is what stops the
// visible copy and the indexed copy from drifting apart.
//
// Asset paths are absolute (`/assets/...`). They must be: `trailingSlash: true`
// means a page like /contact/ would resolve relative paths one level too deep.

export const brand = {
  name: "Closing Brackets",
  href: "#top",
};

/** Persistent CTA in the engine chrome. Deliberately generic vs the finale's
    button: an early clicker has only seen the hero; by the finale the visitor
    knows what the fixed-scope plan is, so that button names the deliverable. */
export const cta = {
  label: "Start a project",
  href: "/contact/",
};

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
    eyebrow: "AI-native agency",
    title: "Custom solutions for your business",
    body: "AI Integration, Custom Software, and Growth Strategy. Tailored to your business, with no compromises",
  },
  {
    id: "blueprint",
    label: "The Blueprint",
    still: "/assets/blueprint.webp",
    poster: "/assets/blueprint-poster.webp",
    posterMobile: "/assets/blueprint-poster-m.webp",
    clip: "/assets/vid/blueprint.mp4",
    clipMobile: "/assets/vid/blueprint-m.mp4",
    accent: "#2EF2DC",
    eyebrow: "AI consulting",
    title: "Where AI pays off, drawn to scale",
    body: "Built from the ground up, your AI strategy is a blueprint for growth. We show you where to invest, and how to get the most out of it.",
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
    eyebrow: "Custom software development",
    title: "Working software at every milestone",
    body: "Each stage comes off the floor as software you can use, not a status report. When we hand it over, you own all of the code.",
  },
  {
    id: "swarm",
    label: "The Swarm",
    still: "/assets/swarm.webp",
    poster: "/assets/swarm-poster.webp",
    posterMobile: "/assets/swarm-poster-m.webp",
    clip: "/assets/vid/swarm.mp4",
    clipMobile: "/assets/vid/swarm-m.mp4",
    accent: "#2EF2DC",
    scroll: 1.5,
    linger: 0.35,
    eyebrow: "AI automation",
    title: "Agents grounded in your data",
    body: "We integrate AI into your existing systems, from pilot to production: your data, your workflows, your business rules. The result is a swarm of agents that work for you.",
  },
  {
    id: "engine",
    label: "Growth Engine",
    still: "/assets/engine.webp",
    poster: "/assets/engine-poster.webp",
    posterMobile: "/assets/engine-poster-m.webp",
    clip: "/assets/vid/engine.mp4",
    clipMobile: "/assets/vid/engine-m.mp4",
    accent: "#FF4E64",
    eyebrow: "Growth marketing that runs",
    title: "An engine for new customers",
    body: "Your marketing becomes a machine that never turns off. The result is organic growth, powered by AI, and optimized for your business.",
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
    eyebrow: "To the Moon!",
    title: "Prepare for Lift Off!",
    body: "We are ready to launch your project into the world. Our team will ensure a smooth and successful launch, with all systems go.",
    // Single CTA on purpose: the only other route that exists is /contact/, and
    // pointing the page's most prominent action at a 404 is worse than one button.
    cta: { primary: { label: "Get Started", href: "/contact/" } },
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
