// Single source of truth for the four-stage process. Consumed by the home
// page (compact strip) and /process (expanded with deliverables).
export const processSteps = [
  {
    n: "01",
    title: "Discover",
    body: "We start with a free strategy call to understand your goals, users, and constraints. Then we turn that into a fixed-scope plan you can actually sign off on — no vague estimates.",
    deliverables: [
      "Discovery call & goal mapping",
      "Fixed-scope proposal & timeline",
      "Success metrics we both agree on",
    ],
    timeframe: "About 1 week",
  },
  {
    n: "02",
    title: "Design & build",
    body: "We design and engineer in short, visible milestones. You review working software — not slide decks — so course corrections happen early while they're cheap.",
    deliverables: [
      "Design direction & prototypes",
      "Milestone builds you can click through",
      "Weekly progress you can see",
    ],
    timeframe: "2–12 weeks by scope",
  },
  {
    n: "03",
    title: "Launch",
    body: "We ship fast, tuned for speed, SEO, and accessibility from the start. You get clean, documented code and a smooth hand-off — the product is yours, no lock-in.",
    deliverables: [
      "Performance, SEO & a11y pass",
      "Documented, deployable codebase",
      "Launch & hand-off walkthrough",
    ],
    timeframe: "Launch week",
  },
  {
    n: "04",
    title: "Grow",
    body: "Optional retainer for marketing, AI automation, and iteration so results compound over time. We keep optimizing what's live instead of walking away at launch.",
    deliverables: [
      "Analytics & reporting cadence",
      "Growth, content & ad iteration",
      "AI automation & new features",
    ],
    timeframe: "Ongoing, monthly",
  },
];
