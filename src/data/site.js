// Single source of truth for business info, reused by metadata, JSON-LD,
// the header/footer, and the contact page.

export const site = {
  name: "Closing Brackets",
  legalName: "Closing Brackets",
  tagline: "Consulting · Custom Software · Artificial Intelligence",
  shortDescription:
    "Closing Brackets is an AI-native web agency building custom software, growth marketing, and AI automation that ships fast and converts.",
  url: "https://www.closingbrackets.com",
  ogImage: "/img/og-image.png",
  founder: "Robert Collins",
  email: "robert@closingbrackets.com",
  // E.164 for tel: links, plus a display version. 509-272-CODE.
  phone: "+15092722633",
  phoneDisplay: "509-272-2633",
  areaServed: "United States",
  locality: "Spokane",
  region: "WA",
  social: {
    // TODO: replace "#" with real profile URLs when available.
    x: "#",
    linkedin: "#",
    instagram: "#",
    facebook: "#",
    youtube: "#",
    github: "#",
  },
};

// The three service pillars from the brand (business card). Each pillar's
// `seo` block drives its /services/[slug] detail page — the H1 exclusively
// owns that pillar's keyword (home owns "web agency Spokane").
export const services = [
  {
    slug: "custom-software",
    name: "Custom Software",
    tagline: "Websites, web apps & platforms engineered to perform.",
    summary:
      "Modern, fast, secure web experiences — from marketing sites to full SaaS platforms and mobile apps.",
    offerings: [
      "Modern Websites & Web Applications",
      "E-commerce Stores & SaaS Platforms",
      "Mobile Apps & Progressive Web Apps",
      "Speed, Security & Accessibility",
    ],
    seo: {
      title: "Custom Software Development",
      h1: "Custom software development that pays for itself",
      description:
        "Custom software development from a senior team: websites, web apps, e-commerce, SaaS platforms, and mobile — engineered for speed, SEO, and security.",
      intro:
        "Off-the-shelf tools cap what your business can do. We design and build software around how you actually work — fast, secure, accessible, and yours to keep. From a marketing site that finally ranks to a full SaaS platform, the same senior team takes it from first sketch to production.",
    },
  },
  {
    slug: "digital-marketing",
    name: "Digital Marketing & Growth",
    tagline: "Turn traffic into pipeline, and pipeline into revenue.",
    summary:
      "SEO, paid, social, and content programs wired to measurable growth — with the analytics to prove it.",
    offerings: [
      "SEO & Google Ads",
      "Social Media Marketing",
      "Content Creation & Email Campaigns",
      "Analytics & Performance Reports",
    ],
    seo: {
      title: "Digital Marketing & Growth",
      h1: "Digital marketing that proves its own ROI",
      description:
        "SEO, Google Ads, content, and email programs built by the same team that builds your site — every campaign wired to analytics so you see exactly what's working.",
      intro:
        "Marketing bolted onto a slow site burns budget. Because we build the site and run the growth, every campaign lands on pages engineered to convert — and every dollar is tracked to an outcome, not an impression count.",
    },
  },
  {
    slug: "ai-automation",
    name: "AI Consulting & Automation",
    tagline: "Deploy AI that does real work across your business.",
    summary:
      "From strategy and audits to custom agents, chatbots, and fully automated workflows that compound.",
    offerings: [
      "AI Strategy & Business Audits",
      "Custom AI Agents & Swarms",
      "AI Sales Engines & Lead Generation",
      "Smart Chatbots & Automated Workflows",
      "Full AI-Powered Digital Teams",
    ],
    seo: {
      title: "AI Consulting & Automation",
      h1: "AI consulting & automation that earns its keep",
      description:
        "AI strategy, custom agents, chatbots, and workflow automation grounded in your real data — deployed where AI creates measurable ROI, not demos.",
      intro:
        "Most AI features are demos. We build entire teams of coordinated AI agents grounded in your actual documents and workflows — support that answers correctly, intake that qualifies leads while you sleep, and ops that run themselves. It's how we deliver our own projects better and faster, and we'll build the same capability inside your business.",
    },
  },
];
