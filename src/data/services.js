// Copy for /services/ and /services/catalog/.
//
// TWO LAYERS, ON PURPOSE:
//
//   `services` — the five public lines. These are the same five the homepage
//   scroll world names and that layout.js publishes as Organization
//   .hasOfferCatalog. Keep the three in step, or the structured data and the
//   visible page drift.
//
//   `catalog`, `tiers`, `hybrids`, `hireABot` — the full menu, transcribed from
//   biz-e-box/docs/product/mission.md §6. That doc is the source of truth: when
//   a service changes there, change it here.
//
// NO PRICES. mission.md §6 states the pricing model "doesn't need to be
// customer facing and can live in repo as an information piece" — so ranges
// stay in the doc and this file carries scope only. Every catalog card ends at
// "priced on request"; that is deliberate, not an oversight.

export const services = [
  {
    id: "custom-software",
    title: "Custom software development",
    accent: "#ff4e64",
    summary:
      "Software built for how your business actually works, instead of bending the business around a product you rented.",
    points: [
      "Every milestone lands as working software you can use, not a status report.",
      "Built in the open, so you see progress the week it happens.",
      "You own all of the code when we hand it over.",
    ],
    examples: [
      "Professional website build",
      "E-commerce setup",
      "Custom CRM and integrations",
      "Ongoing app features and APIs",
    ],
    catalogAnchor: "build",
  },
  {
    id: "ai-consulting",
    title: "AI consulting",
    accent: "#2ef2dc",
    summary:
      "A straight answer on where AI pays off in your business, and where it does not.",
    points: [
      "We map the work you do today and mark the places worth automating.",
      "You get a strategy and roadmap with the reasoning shown, not a shortlist of tools.",
      "Each recommendation names what it changes and what it costs to run.",
    ],
    examples: [
      "AI maturity audit and roadmap",
      "Marketing audit and 90-day plan",
      "Team AI training and prompt library",
      "Market research and personas",
    ],
    catalogAnchor: "ai-projects",
  },
  {
    id: "ai-integration",
    title: "AI integration",
    accent: "#2ef2dc",
    summary:
      "Getting AI into your existing systems, from a first pilot through to production.",
    points: [
      "Works against your data, your workflows, and your business rules.",
      "Fits the systems you already run rather than replacing them.",
      "Taken to production-ready, with the failure cases handled.",
    ],
    examples: [
      "AI integration package",
      "Custom AI agent swarm build",
      "AI performance and ROI dashboard",
      "Secure data pipelines",
    ],
    catalogAnchor: "ai-projects",
  },
  {
    id: "ai-automation",
    title: "AI automation",
    accent: "#ff4e64",
    summary:
      "Agents that carry the repetitive work, grounded in your own data.",
    points: [
      "Handles the steps your team repeats every day.",
      "Runs against real records, so answers reflect your business.",
      "Monitored, so you can see what it did and why.",
    ],
    examples: [
      "Hire a single agent",
      "Agent swarm management",
      "AI sales and lead generation engine",
      "Operations automation",
    ],
    catalogAnchor: "ai-ongoing",
  },
  {
    id: "growth-marketing",
    title: "Growth marketing",
    accent: "#2ef2dc",
    summary:
      "Marketing that keeps running after the launch, and brings in customers every month.",
    points: [
      "Your marketing becomes a machine we keep running.",
      "We tune whatever is performing best.",
      "Reported in plain English, not marketing jargon.",
    ],
    examples: [
      "SEO setup and ongoing monitoring",
      "Google Ads management",
      "Content and social",
      "Conversion rate optimisation",
    ],
    catalogAnchor: "ongoing",
  },
];

/** The engagement terms, stated the same way everywhere on the site. */
export const engagement = [
  {
    title: "Fixed scope",
    body: "One document says what we build. If it is not in there, it is not in the price.",
  },
  {
    title: "Real dates",
    body: "A timeline with actual dates on it, not a range that slides.",
  },
  {
    title: "One price",
    body: "A single fixed price agreed before anything starts. No hourly billing.",
  },
];

/* ------------------------------------------------------------------ */
/* The full catalog. Four groups: what you buy once, what you keep     */
/* running, and the same split again on the AI side.                   */
/* ------------------------------------------------------------------ */

export const catalog = [
  {
    id: "build",
    title: "Project work",
    kind: "One-time · fixed scope",
    accent: "#ff4e64",
    blurb:
      "Bought once, delivered against a written scope with real dates. Each one ends with something running that you own.",
    items: [
      {
        name: "Simple marketing website build",
        brief: "A professional, mobile-responsive 5–10 page marketing site.",
        detail:
          "Custom design on your brand colours, fonts and logo. Homepage hero with real calls to action, dedicated about, services and contact pages, full mobile optimisation, content integration, and launch on your hosting and domain. Ends with a one-hour live handover session.",
        pairs: "Basic SEO setup · Website maintenance",
      },
      {
        name: "Professional website build",
        brief: "An expanded 10–20 page site built to convert, not just to exist.",
        detail:
          "Custom post types and reusable blocks, advanced forms with conditional logic, considered navigation and micro-animations, and full blog, portfolio and testimonials sections. Full launch, two live training sessions, and 30 days of post-launch support.",
        pairs: "Ongoing SEO monitoring · Google Ads management",
      },
      {
        name: "Website redesign or migration",
        brief: "A full overhaul, or a move off a platform that is holding you back.",
        detail:
          "Audit of the current site, then a new sitemap and wireframes and a rebuild from the ground up. Content migrates cleanly, speed, security and accessibility all improve, and everything is tested before launch. Client training included.",
        pairs: "Marketing audit · Website maintenance",
      },
      {
        name: "Branding and identity package",
        brief: "The brand foundation everything else gets built on.",
        detail:
          "Discovery session, multiple mood boards, logo variations in every format, and a full style guide covering colours, fonts, icons and usage rules. Includes social templates and two rounds of revisions.",
        pairs: "Professional website build",
      },
      {
        name: "Marketing audit and strategy roadmap",
        brief: "A hard look at what you are doing now, and a 90-day plan.",
        detail:
          "Audit of website, SEO, social and paid, plus competitor benchmarking and a SWOT. You get prioritised recommendations, a written roadmap, and a live presentation with time for questions.",
        pairs: "Whatever the roadmap says comes first",
      },
      {
        name: "E-commerce setup",
        brief: "A store that takes money reliably.",
        detail:
          "Product catalogue, cart and checkout flow, Stripe and PayPal integration, and inventory and shipping configuration. Tested end to end before it goes live.",
        pairs: "Email and SMS automation · Reputation management",
      },
      {
        name: "Custom CRM and integrations setup",
        brief: "Your site and your business tools, actually talking to each other.",
        detail:
          "Data mapping between systems, custom automation rules and triggers, full testing and error handling, and written documentation at handover so the next person can pick it up.",
        pairs: "Analytics and attribution",
      },
      {
        name: "Basic SEO setup",
        brief: "The foundation, done once and done properly.",
        detail:
          "Technical audit and fixes, on-page optimisation across titles, meta descriptions, headings and alt text, keyword research on 5–10 high-value terms, Search Console and Analytics integration, and sitemap submission.",
        pairs: "Ongoing SEO monitoring",
      },
      {
        name: "Analytics setup",
        brief: "GA4 wired up so the numbers mean something.",
        detail:
          "Full GA4 implementation, event and conversion tracking, a custom dashboard template, and a live walkthrough so your team can read it without us.",
        pairs: "Google Ads setup · Analytics and attribution",
      },
      {
        name: "Google Ads / PPC initial setup",
        brief: "Campaigns built and ready to launch.",
        detail:
          "Campaign structure, keyword and negative keyword research, ad copy written to convert, landing page alignment, and conversion pixel installation before launch.",
        pairs: "Ongoing PPC management · Ad creative production",
      },
      {
        name: "Performance and speed optimisation",
        brief: "Core Web Vitals, fixed.",
        detail:
          "Performance audit, image compression, caching and CDN configuration, and code and database optimisation, with before-and-after numbers.",
        pairs: "Ongoing performance work as traffic grows",
      },
      {
        name: "Security hardening",
        brief: "A one-time pass over everything an attacker looks at first.",
        detail:
          "SSL, firewall configuration, malware scan and removal, login hardening with two-factor authentication, automated backups, and a written security report.",
        pairs: "Ongoing security suite",
      },
      {
        name: "Accessibility (WCAG AA) audit and fixes",
        brief: "A full audit and the remediation to go with it.",
        detail:
          "WCAG AA compliance audit, then fixes for alt text, colour contrast, keyboard navigation, ARIA labels and screen-reader compatibility. Re-tested after the fixes land, with a report you can show.",
        pairs: "Ongoing accessibility audits",
      },
      {
        name: "Copywriting and UX copy",
        brief: "The words, written by someone who has to make them work.",
        detail:
          "Sales and landing page copy, email and micro-copy, keyword integration that does not read like keyword integration, and two full rounds of revisions.",
        pairs: "Content creation package",
      },
      {
        name: "Ad creative production",
        brief: "Graphics and video creative, in every format the platforms want.",
        detail:
          "Multiple visual variations, carousel and video formats, brand-aligned design, and copy variations, delivered in all required sizes as a batch.",
        pairs: "Ongoing PPC · Video marketing",
      },
      {
        name: "Market research and customer personas",
        brief: "Who is actually buying, in writing.",
        detail:
          "Competitor deep-dive, customer surveys and interviews, written persona documents, an insights report, and a presentation of what it all means.",
        pairs: "Marketing audit",
      },
      {
        name: "Crisis and reputation recovery",
        brief: "For when the search results are the problem.",
        detail:
          "Monitoring setup, a strategic response framework, suppression tactics for negative content, a recovery action plan, and progress reporting until it is under control.",
        pairs: "Ongoing reputation management",
      },
    ],
  },
  {
    id: "ai-projects",
    title: "AI projects",
    kind: "One-time · fixed scope",
    accent: "#2ef2dc",
    blurb:
      "Standalone, or the first step before a retainer. The audit is the one we push hardest — it is what makes everything after it honest.",
    items: [
      {
        name: "AI maturity audit and roadmap",
        brief: "Where AI pays off in your business, and where it does not.",
        detail:
          "Process and tech-stack audit, data readiness evaluation, and competitor AI benchmarking, ending in a 12-month prioritised roadmap with ROI projections and an implementation timeline. On any retainer this is delivered inside the first 30 days and locks the final scope.",
        pairs: "Any ongoing AI retainer",
      },
      {
        name: "Custom AI agent swarm build",
        brief: "Five to ten specialised agents, built around your workflows.",
        detail:
          "Design and build of an agent swarm for lead qualification, sales, operations, support, or whatever the audit surfaced as highest value. Integration tested and deployed, not handed over as a demo.",
        pairs: "Agent swarm management",
      },
      {
        name: "AI integration package",
        brief: "AI connected to the tools you already run.",
        detail:
          "Integration of agents with your CRM, ERP, website, email and analytics, plus the secure data pipelines and workflow automation underneath. Your data stays yours and stays where you put it.",
        pairs: "Operations automation",
      },
      {
        name: "Team AI training and prompt library",
        brief: "So the thing you paid for actually gets used.",
        detail:
          "Two to four hands-on sessions, a prompt library written for your company rather than a generic pack, and governance policies covering what staff should and should not put into a model.",
        pairs: "Required for adoption, not optional",
      },
      {
        name: "AI performance and ROI dashboard",
        brief: "One screen that says whether this is working.",
        detail:
          "A custom dashboard with automated reports, KPI tracking, cost monitoring, and an executive summary view for people who will never open the detail.",
        pairs: "Included in the retainers",
      },
    ],
  },
  {
    id: "ongoing",
    title: "Ongoing services",
    kind: "Monthly · à la carte",
    accent: "#2ef2dc",
    blurb:
      "The work that only pays off by being done every month. Take one, take several, or take a bundled tier below.",
    items: [
      {
        name: "Website maintenance and updates",
        brief: "Hosting, updates, backups and the small stuff.",
        detail:
          "Hosting and domain management, plugin, theme and core updates, content tweaks up to six hours a month, daily automated backups, and quick bug fixes with an emergency route.",
        pairs: "Essential after any build",
      },
      {
        name: "Ongoing SEO monitoring",
        brief: "Rankings watched and nudged, monthly.",
        detail:
          "Monthly technical and ranking checks, minor on-page tweaks, keyword rank tracking, and a report that says what moved and what we did about it.",
        pairs: "Basic SEO setup first",
      },
      {
        name: "Google Ads / PPC management",
        brief: "Someone whose job is your ad account.",
        detail:
          "Bid adjustments, keyword and negative keyword refinement, ad copy testing and rotation, performance reporting, and a monthly strategy call.",
        pairs: "Ad creative production",
      },
      {
        name: "Content creation package",
        brief: "Four to twelve pieces a month, written to rank.",
        detail:
          "Blog posts, articles or landing page content with keyword-focused research, custom images or graphics, and publishing and promotion handled.",
        pairs: "Ongoing SEO monitoring",
      },
      {
        name: "Social media posting",
        brief: "Consistency, without you thinking about it.",
        detail:
          "Six to twenty posts a month scheduled and published, basic engagement monitoring, and a monthly performance summary.",
        pairs: "Step up to full social management",
      },
      {
        name: "Full social media management",
        brief: "The whole channel, run for you.",
        detail:
          "Content calendar, posting and community management, strategic boosts, analytics tracking, and a monthly growth report.",
        pairs: "Video marketing",
      },
      {
        name: "Email marketing automation",
        brief: "Sequences that keep selling after the first click.",
        detail:
          "Custom automation flows, list segmentation, scheduled campaigns, and performance tracking with optimisation each month.",
        pairs: "SMS · E-commerce",
      },
      {
        name: "SMS and text marketing",
        brief: "The channel people actually open.",
        detail:
          "Campaign creation, two-way messaging setup, trigger-based automations, compliance management, and monthly reporting.",
        pairs: "Email marketing automation",
      },
      {
        name: "Reputation management and reviews",
        brief: "More good reviews, faster answers to bad ones.",
        detail:
          "Continuous monitoring, professionally written review responses, automated review request funnels, and monthly reporting.",
        pairs: "Local SEO",
      },
      {
        name: "Conversion rate optimisation",
        brief: "Same traffic, more customers.",
        detail:
          "A/B testing, heatmap and user behaviour analysis, funnel optimisation, and a monthly testing cycle with results written up.",
        pairs: "Best once SEO or PPC is delivering traffic",
      },
      {
        name: "Video marketing and production",
        brief: "Short-form video, produced monthly.",
        detail:
          "Short-form videos, explainers and promotional clips, professionally edited and optimised for social and for your site.",
        pairs: "Full social management",
      },
      {
        name: "AI-powered marketing automation",
        brief: "The modern tooling, pointed at your funnel.",
        detail:
          "AI content generation, chatbot deployment, dynamic personalisation, and monthly optimisation against what the numbers say.",
        pairs: "Higher tiers",
      },
      {
        name: "Analytics and full-funnel attribution",
        brief: "Which channel actually earned the sale.",
        detail:
          "Custom dashboards, cross-channel tracking setup, and monthly reporting that connects spend to revenue rather than to clicks.",
        pairs: "Any paid or organic effort",
      },
      {
        name: "Local SEO and Google Business Profile",
        brief: "Winning the map, not just the page.",
        detail:
          "Google Business Profile optimisation, citation building, review management, and monthly local rank reporting.",
        pairs: "Reputation management",
      },
      {
        name: "Mobile app and PWA features",
        brief: "Ongoing mobile development.",
        detail:
          "Progressive web app updates, new companion mobile features, and testing and deployment on a monthly cycle.",
        pairs: "Custom app features",
      },
      {
        name: "Influencer and partnership coordination",
        brief: "Other people's audiences, borrowed properly.",
        detail:
          "Influencer outreach, campaign planning, relationship management, and performance tracking each month.",
        pairs: "Full social management",
      },
      {
        name: "Custom app features and API development",
        brief: "The product keeps getting built.",
        detail:
          "New feature builds, API integrations, bug fixes and iterative development, delivered and tested monthly.",
        pairs: "Enterprise engagements",
      },
    ],
  },
  {
    id: "ai-ongoing",
    title: "AI, running",
    kind: "Monthly · à la carte",
    accent: "#ff4e64",
    blurb:
      "An agent is not finished when it is built. This is the part that keeps it correct as your business, your data and the models all move.",
    items: [
      {
        name: "Hire a single agent",
        brief: "One custom AI employee, for one job.",
        detail:
          "The lowest-friction way in. Custom skill definition and loop engineering, integration with your CRM, email, Slack or website, 24/7 monitoring, a monthly performance report, and one minor tweak a month included.",
        pairs: "Grows into a swarm when it earns it",
      },
      {
        name: "Agent swarm management and optimisation",
        brief: "24/7 management of the swarm we built.",
        detail:
          "Performance monitoring, cost control, integration of new models as they land, proactive upgrades and maintenance, and a quarterly roadmap update.",
        pairs: "The core retainer",
      },
      {
        name: "AI-powered operations automation",
        brief: "The repetitive back office, handed over.",
        detail:
          "Invoice processing, customer support agents, inventory forecasting, and HR and admin automation, with a monthly optimisation cycle.",
        pairs: "Any retainer",
      },
      {
        name: "AI sales and lead generation engine",
        brief: "Qualifying and nurturing, around the clock.",
        detail:
          "Multi-channel outreach agents, intelligent lead scoring, CRM integration, and personalised nurture sequences, with monthly performance reporting.",
        pairs: "Analytics and attribution",
      },
      {
        name: "AI content and marketing factory",
        brief: "Personalised assets, produced at volume.",
        detail:
          "Personalised emails, social posts, video scripts and SEO content, with full campaign automation and monthly refinement.",
        pairs: "Content and social packages",
      },
      {
        name: "Full AI strategy retainer",
        brief: "A fractional AI department.",
        detail:
          "Monthly strategy calls, unlimited minor builds and updates inside the agreed roadmap, ROI reporting, team training, and proactive identification of the next thing worth automating. This is the flagship.",
        pairs: "The top of the AI ladder",
      },
    ],
  },
];

/** Bundled web tiers. Each one is everything in the tier above it, plus more. */
export const tiers = [
  {
    n: "01",
    name: "Basic Care",
    term: "3 months",
    body: "Hands-off reliability. Updates up to six hours a month, hosting and domain management, basic analytics monitoring, automated backups and security checks, and a quick support route.",
  },
  {
    n: "02",
    name: "Growth Starter",
    term: "3–6 months",
    body: "Basic Care plus the first visibility work: ongoing SEO monitoring and light PPC management.",
  },
  {
    n: "03",
    name: "Momentum",
    term: "6 months",
    body: "Growth Starter plus advanced and local SEO, monthly content creation, basic social posting, and full analytics reporting. The point where content starts compounding.",
  },
  {
    n: "04",
    name: "Revenue",
    term: "6 months",
    body: "Momentum plus full e-commerce support, advanced PPC, email and SMS automation, and conversion-focused reporting.",
  },
  {
    n: "05",
    name: "Optimisation",
    term: "6–12 months",
    body: "Revenue plus custom CRM integrations, full CRO testing, performance and security hardening, and detailed attribution analytics.",
  },
  {
    n: "06",
    name: "Advanced",
    term: "12 months",
    body: "Optimisation plus full video and social management, AI-powered marketing automation, and dedicated strategy calls.",
  },
  {
    n: "07",
    name: "Enterprise Partner",
    term: "12+ months",
    body: "A fully outsourced product and growth team: heavy custom SaaS and app development, mobile and PWA features, unlimited strategic support, and executive-level reporting.",
  },
];

/** Web + AI bundles. The audit gates all four. */
export const hybrids = [
  {
    name: "Hybrid 1",
    tag: "AI-Enhanced Growth",
    term: "3 months",
    fit: "Small service and local businesses",
    body: "The full Momentum web tier, plus a one-time AI maturity audit and three specialised agents built and managed: lead qualification, a support chatbot, and a content drafter, wired into your site and CRM with 24/7 monitoring.",
  },
  {
    name: "Hybrid 1.5",
    tag: "Momentum + a specialist",
    term: "3 months",
    fit: "Growing e-commerce and mid-market",
    body: "Everything in Hybrid 1 with a fourth, specialised agent — sales nurturing or review response, whichever the audit says earns more — plus one specialist swap every six months.",
  },
  {
    name: "Hybrid 2",
    tag: "AI Revenue Accelerator",
    term: "6 months",
    fit: "Revenue-focused online businesses",
    body: "The full Revenue web tier with advanced PPC, email and SMS, plus the complete AI sales and lead generation engine and AI-powered operations automation.",
  },
  {
    name: "Hybrid 3",
    tag: "AI Enterprise Partner",
    term: "12 months",
    fit: "Enterprise and SaaS",
    body: "The full Advanced web tier with CRO, custom CRM integrations and hardening, the full AI strategy retainer, and a custom swarm of five to ten-plus agents built and managed.",
  },
];

/** The value-menu entry point — deliberately the easiest thing to say yes to. */
export const hireABot = {
  title: "Hire a single agent",
  lede: "One custom AI employee, built for one job in your business. The smallest possible way to find out whether any of this is real.",
  included: [
    "Custom skill definition and loop engineering",
    "Integration with the tools you already use — CRM, email, Slack, your website",
    "24/7 monitoring and a monthly performance report",
    "One minor tweak a month, included",
    "Full data privacy and compliance handling",
  ],
  roles: [
    "Lead qualifier and appointment setter",
    "Support chatbot with escalation",
    "Content drafter and social poster",
    "Review responder",
    "Invoice and accounts payable assistant",
    "Research and competitive intelligence",
    "Personalised email nurturer",
  ],
};

/** How every engagement is protected, on both sides. */
export const assurances = [
  {
    title: "The audit gates the scope",
    body: "No retainer starts without the AI maturity audit. It is delivered inside the first 30 days and it is what locks the final scope, so nobody is guessing at month four.",
  },
  {
    title: "Nothing is guaranteed that cannot be",
    body: "Results are described as what similar engagements have typically produced. Anyone promising you a number before they have seen your data is selling something else.",
  },
  {
    title: "You own your data, and you can leave",
    body: "Client owns all data throughout. Offboarding is 30 days of transition support plus a full export — the exit is written into the contract, not negotiated at the end.",
  },
];
