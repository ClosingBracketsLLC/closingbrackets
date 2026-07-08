// Real essays only — no placeholder posts. Each post carries its full body so
// /blog and /blog/[slug] share this single source.
export const posts = [
  {
    slug: "why-this-site-is-a-static-export",
    title: "Why this site is a static export — and why yours probably should be too",
    excerpt:
      "No servers, no database, no waiting. How we built closingbrackets.com to load instantly and score a perfect Lighthouse run — and when the same architecture fits your business.",
    category: "Custom Software",
    date: "2026-07-08",
    readingTime: "6 min read",
    author: "Robert Collins",
    body: [
      {
        text: "You're reading a page that has no server behind it. Every page on this site is pre-rendered to plain HTML at build time and served from a CDN edge near you. There is nothing to boot, nothing to query, and almost nothing to break.",
      },
      {
        heading: "What a static export actually is",
        text: "Most websites assemble themselves on every visit: a server receives the request, queries a database, renders a template, and finally sends HTML. A static export does all of that once — at build time. The result is a folder of finished HTML, CSS, and JavaScript that any CDN can serve in milliseconds. This site is built with Next.js in static export mode: we get a modern component workflow while shipping the simplest possible artifact.",
      },
      {
        heading: "Why it's fast — and why fast matters",
        text: "Speed isn't vanity. Google's Core Web Vitals are a ranking signal, and conversion research consistently shows that every extra second of load time costs measurable revenue. Static HTML from a CDN removes the two slowest links in the chain: server processing and database round-trips. Open DevTools and run Lighthouse on this page — that score is the baseline we hold client work to, not a lab-conditions trophy.",
      },
      {
        heading: "The security and cost story",
        text: "No running server means no server to patch, no database to breach, and no 3 a.m. outage because a process ran out of memory. Hosting a static site costs a few dollars a month at most — often nothing. For a marketing site, that's budget better spent on the content and campaigns that actually grow the business.",
      },
      {
        heading: "When static isn't the answer",
        text: "Honest scoping cuts both ways: if your product needs user accounts, live inventory, or personalized dashboards, parts of it need a server — and we build those too. The pattern we like is static-first: pre-render everything that can be pre-rendered, and reach for servers only where the product genuinely needs them. Most business sites need far less server than they're paying for.",
      },
      {
        heading: "The takeaway",
        text: "If your current site takes more than two seconds to load on a phone, you're paying an invisible tax on every visitor — in rankings, in bounce rate, and in ad spend efficiency. A static rebuild is often the highest-ROI project on the menu. We're happy to show you the numbers for your own site on a free call.",
      },
    ],
  },
  {
    slug: "what-ai-native-actually-means",
    title: "What \"AI-native agency\" actually means (and what it doesn't)",
    excerpt:
      "Every agency claims AI now. Here's concretely how AI changes what we ship and what we charge — and the three places we still insist on humans.",
    category: "AI Consulting & Automation",
    date: "2026-06-30",
    readingTime: "7 min read",
    author: "Robert Collins",
    body: [
      {
        text: "\"AI-powered\" is on every agency's homepage this year, and most of the time it means somebody drafts proposals with a chatbot. When we say Closing Brackets is AI-native, we mean something specific enough to hold us to — AI is woven into both how we build and what we build.",
      },
      {
        heading: "How AI changes how we build",
        text: "Modern AI tooling collapses the distance between deciding and shipping. Scaffolding, test coverage, refactors, and cross-browser fixes that used to absorb junior-developer weeks now happen in hours, with a senior engineer reviewing every line. The result isn't lower quality at higher speed — it's senior judgment applied at a pace that used to require a team of six. That's why our fixed-scope proposals can be aggressive without being fantasy.",
      },
      {
        heading: "How AI changes what we ship",
        text: "The more interesting half is AI in the product itself. The pattern that reliably earns its keep is narrow and grounded: an agent that answers from your actual documentation, qualifies leads against your actual criteria, or triages tickets into your actual queues. We build these with retrieval over your real content, so the agent cites sources and says \"I don't know\" instead of inventing policy. Demos are easy; the work is in the grounding, the guardrails, and the handoff to a human at the right moment.",
      },
      {
        heading: "Where we still insist on humans",
        text: "Three places, non-negotiable. Strategy: an AI will happily optimize toward the wrong goal; deciding what to build is human work. Review: every line of generated code gets senior eyes before it ships — AI writes fast and occasionally writes confidently wrong. And the relationship: when you call, you get the person building your product, not a bot doing empathy.",
      },
      {
        heading: "Questions to ask any \"AI\" agency",
        text: "Ask what specifically AI does in their delivery process — you want concrete verbs, not vibes. Ask who reviews the output. Ask whether the AI features they propose are grounded in your data or just a thin wrapper on a chat window. And ask what happens when the AI is wrong, because sometimes it is. If the answers are fuzzy, the premium they're charging for the letters \"AI\" is pure markup.",
      },
    ],
  },
  {
    slug: "when-to-build-custom-vs-buy",
    title: "When to build custom software vs. buy off the shelf",
    excerpt:
      "A practical framework for deciding when a SaaS subscription is enough and when a custom build will pay for itself — from someone who profits from one of these answers.",
    category: "Custom Software",
    date: "2026-06-16",
    readingTime: "6 min read",
    author: "Robert Collins",
    body: [
      {
        text: "Full disclosure: we build custom software for a living, so we have an obvious bias. Which is exactly why our discovery calls regularly end with \"just use Shopify\" — recommending a build that won't pay for itself is how an agency burns its reputation. Here's the actual framework we use.",
      },
      {
        heading: "Start with buy",
        text: "Off-the-shelf wins by default. If a $99/month tool covers 90% of what you need, the missing 10% is rarely worth a five-figure build. SaaS products ship features weekly, handle security for you, and cost less than a single sprint of custom work. The default answer to \"should we build this?\" is no — the interesting question is what flips it.",
      },
      {
        heading: "The three signals that flip the answer",
        text: "First: the workflow IS the business. If your competitive advantage lives in how you quote, schedule, price, or fulfill, renting the same software as your competitors caps that advantage at zero. Second: integration tax. When your team spends hours a week copying data between tools that don't talk to each other, that payroll is already funding a custom build — you're just not getting the asset. Third: per-seat pricing at scale. SaaS that's cheap at 5 users can exceed the cost of owning your own tool at 50.",
      },
      {
        heading: "Do the arithmetic",
        text: "Put real numbers on it: current subscription costs, hours lost to workarounds multiplied by loaded payroll, and revenue lost to the things the tool can't do. Compare that against a fixed-scope build amortized over three years. When we scope projects, this arithmetic is the first page of the proposal — if the build doesn't clear the bar, we say so and point you to the tool that does.",
      },
      {
        heading: "The middle path most people miss",
        text: "Build-vs-buy isn't binary. The highest-ROI projects we ship are often glue: keep the off-the-shelf tools your team already knows, and build the thin custom layer that connects them — the integration, the customer portal, the AI agent that moves data while your team sleeps. You get 80% of the custom advantage at 20% of the cost.",
      },
    ],
  },
];
