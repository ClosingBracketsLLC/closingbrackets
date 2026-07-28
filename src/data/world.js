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

/** Persistent CTA in the engine chrome. Mirrors the finale's primary CTA. */
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
    eyebrow: "AI-native web agency",
    title: "Custom software, engineered to ship.",
    body: "Off-the-shelf software caps what your business can do. We build the thing that doesn't exist yet.",
    tags: ["Custom software", "Growth", "AI automation"],
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
    eyebrow: "Scope, not guesswork",
    title: "The plan you can actually sign.",
    body: "Fixed scope, fixed price, a timeline with real dates on it — we absorb the estimation risk, not you.",
    tags: ["Fixed scope", "Real dates"],
  },
  {
    id: "forge",
    label: "The Build Floor",
    still: "/assets/forge.webp",
    poster: "/assets/forge-poster.webp",
    posterMobile: "/assets/forge-poster-m.webp",
    clip: "/assets/vid/forge.mp4",
    clipMobile: "/assets/vid/forge-m.mp4",
    accent: "#FF4E64",
    eyebrow: "Custom software",
    title: "Built in the open. Shipped in weeks.",
    body: "You review working software at every milestone — never a slide deck, never a black box.",
    tags: ["Web & mobile", "SaaS platforms", "You own the code"],
  },
  {
    id: "swarm",
    label: "The Agent Swarm",
    still: "/assets/swarm.webp",
    poster: "/assets/swarm-poster.webp",
    posterMobile: "/assets/swarm-poster-m.webp",
    clip: "/assets/vid/swarm.mp4",
    clipMobile: "/assets/vid/swarm-m.mp4",
    accent: "#2EF2DC",
    scroll: 1.5,
    linger: 0.35,
    eyebrow: "AI consulting & automation",
    title: "A team of agents that never sleeps.",
    body: "Coordinated AI agents grounded in your real data — intake that qualifies leads at 3am, ops that run themselves.",
    tags: ["Custom agents", "Workflow automation"],
  },
  {
    id: "engine",
    label: "The Growth Engine",
    still: "/assets/engine.webp",
    poster: "/assets/engine-poster.webp",
    posterMobile: "/assets/engine-poster-m.webp",
    clip: "/assets/vid/engine.mp4",
    clipMobile: "/assets/vid/engine-m.mp4",
    accent: "#FF4E64",
    eyebrow: "Marketing & growth",
    title: "Traffic in. Pipeline out.",
    body: "SEO, paid, and content wired to analytics by the same team that built the site it lands on.",
    tags: ["SEO & paid", "Attribution"],
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
    eyebrow: "Ready when you are",
    title: "Tell us what you're building.",
    body: "You'll get a fixed-scope plan back, not an hourly meter.",
    tags: [],
    // Single CTA on purpose: the only other route that exists is /contact/, and
    // pointing the page's most prominent action at a 404 is worse than one button.
    cta: { primary: { label: "Start a project", href: "/contact/" } },
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
