// Single source of truth for engagement models. Consumed by /services and
// referenced from /process.
export const engagements = [
  {
    name: "Project",
    price: "Fixed-scope proposal",
    tagline: "A defined outcome, shipped.",
    body: "Best when you know what you need built. We scope it, quote it, and deliver working software on a clear timeline.",
    points: [
      "Fixed scope & deliverables",
      "Milestone-based delivery",
      "Clean, documented hand-off",
    ],
    featured: false,
  },
  {
    name: "Retainer",
    price: "Monthly retainer",
    tagline: "Momentum that compounds.",
    body: "Ongoing design, development, marketing, and AI work on a predictable monthly cadence — ideal once you're live and growing.",
    points: [
      "Reserved senior capacity",
      "Growth, iteration & support",
      "Priority turnaround",
    ],
    featured: true,
  },
  {
    name: "Fractional team",
    price: "Embedded team",
    tagline: "Your product team, on demand.",
    body: "We plug in as your product, growth, and AI team — senior operators augmented by AI, no offshore hand-offs.",
    points: [
      "Cross-discipline coverage",
      "Direct access, no middle layer",
      "Scale up or down as needed",
    ],
    featured: false,
  },
];
