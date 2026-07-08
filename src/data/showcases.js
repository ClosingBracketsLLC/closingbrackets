// Capability showcases — honest by design. These are demo builds and living
// proof, clearly framed as such; none are presented as client work. When real
// case studies exist, they replace entries here.
export const showcases = [
  {
    slug: "this-website",
    kind: "Living proof",
    title: "This website",
    stack: ["Next.js 15", "Static export", "Zero-bloat CSS"],
    summary:
      "The site you're reading is our first case study: a fully static Next.js build with no tracking bloat, self-hosted fonts, and structured data throughout.",
    details: [
      "Every page is pre-rendered HTML served from a CDN — no servers to slow it down or fall over.",
      "Run Lighthouse on this page right now. That score is the same baseline we set for client work.",
      "View source: semantic HTML, one H1 per page, JSON-LD rich results, and a sitemap a crawler can love.",
    ],
    proof: "Audit it yourself — open DevTools and run Lighthouse on this page.",
  },
  {
    slug: "saas-dashboard",
    kind: "Demo build",
    title: "SaaS analytics dashboard",
    stack: ["React", "Real-time charts", "Role-based auth"],
    summary:
      "A multi-tenant dashboard demo: live metrics, role-based access, and an interface that stays fast with thousands of rows on screen.",
    details: [
      "Virtualized tables and streaming updates keep interactions under 100 ms.",
      "The kind of build we ship for founders who outgrew spreadsheets and off-the-shelf admin panels.",
    ],
    proof: "Built to show our stack — not a client project.",
  },
  {
    slug: "ai-support-agent",
    kind: "Demo build",
    title: "AI support & intake agent",
    stack: ["Claude API", "RAG search", "Workflow automation"],
    summary:
      "A retrieval-augmented agent demo that answers from your real docs, qualifies leads, and hands off to a human the moment it should.",
    details: [
      "Grounded answers with citations — it says \"I don't know\" instead of inventing policy.",
      "The same pattern automates ticket triage, lead qualification, and internal ops.",
    ],
    proof: "Built to show our stack — not a client project.",
  },
  {
    slug: "headless-storefront",
    kind: "Demo build",
    title: "Headless e-commerce storefront",
    stack: ["Next.js", "Headless commerce", "Sub-second LCP"],
    summary:
      "A storefront demo that loads in under a second on a mid-range phone — product search, cart, and checkout flow without platform lock-in.",
    details: [
      "Static product pages with instant navigation; the catalog updates without a redeploy.",
      "The architecture we reach for when a slow theme is quietly taxing every sale.",
    ],
    proof: "Built to show our stack — not a client project.",
  },
];
