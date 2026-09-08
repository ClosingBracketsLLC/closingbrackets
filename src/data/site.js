// Single source for the site chrome and the things every page shares — the
// route table, the header/footer links, contact details, the site-wide close.
//
// The homepage's scroll world owns its own copy in world.js; anything that
// wraps it (header, footer, canonical URLs) lives here so a nav change is one
// edit rather than one per page.

export const SITE_URL = "https://closingbrackets.com";

export const brand = { name: "Closing Brackets", href: "/" };

/**
 * Every route on the site, by name. Pages, data files and the sitemap read
 * these instead of typing paths, so renaming a route is one edit here plus a
 * redirect in render.yaml (never a redirect whose source is a real route).
 */
export const routes = {
  home: "/",
  bot: "/build-a-bot/",
  work: "/work/",
  services: "/services/",
  catalog: "/services/catalog/",
  content: "/content/",
  about: "/about/",
  start: "/start/",
  privacy: "/privacy/",
  terms: "/terms/",
};

/** The conversion page, optionally pre-selecting what the visitor wants. */
export const startHref = (intent) =>
  intent ? `${routes.start}?intent=${intent}` : routes.start;

/**
 * The pages the sitemap lists, with the last REAL content change per page —
 * never a deploy date. Articles are added by src/app/sitemap.js from
 * data/content.js. Order is the header order for the routes that are in it.
 */
export const pages = [
  { path: routes.home, updated: "2026-09-07", changefreq: "monthly", priority: 1 },
  { path: routes.bot, updated: "2026-09-07", changefreq: "monthly", priority: 0.9 },
  { path: routes.work, updated: "2026-09-07", changefreq: "monthly", priority: 0.8 },
  { path: routes.services, updated: "2026-09-07", changefreq: "monthly", priority: 0.8 },
  { path: routes.catalog, updated: "2026-09-07", changefreq: "monthly", priority: 0.5 },
  { path: routes.content, updated: "2026-09-07", changefreq: "weekly", priority: 0.6 },
  { path: routes.about, updated: "2026-09-07", changefreq: "yearly", priority: 0.6 },
  { path: routes.start, updated: "2026-09-07", changefreq: "yearly", priority: 0.7 },
  { path: routes.privacy, updated: "2026-09-07", changefreq: "yearly", priority: 0.2 },
  { path: routes.terms, updated: "2026-09-07", changefreq: "yearly", priority: 0.2 },
];

// Header order. Adding a route here puts it in the header, the footer, and
// the mobile nav at once.
export const navLinks = [
  { label: "Work", href: routes.work },
  { label: "Build-a-Bot", href: routes.bot },
  { label: "Services", href: routes.services },
  { label: "Content", href: routes.content },
  { label: "About", href: routes.about },
];

export const cta = { label: "Start a project", href: routes.start };

/** Footer-only links: the legal pages the enquiry form makes necessary. */
export const legalLinks = [
  { label: "Privacy", href: routes.privacy },
  { label: "Terms", href: routes.terms },
];

/** The site's one title and description: <title> default, meta, JSON-LD. */
export const siteTitle = "Closing Brackets — AI-native web agency";
export const siteDescription =
  "We build sites and apps, and Build-a-Bot: a custom agent that handles the tasks you delegate. Fixed scope, real dates, one price. You own the code.";

/**
 * The studio's public contact details, defined once. The site used to carry
 * three different addresses (contact page, footer, form fallback) — a lead
 * sent to the wrong one is a lead lost, so every mailto on the site reads
 * this object.
 */
export const contact = {
  email: "robert@closingbrackets.com",
  location: "Spokane / Inland Northwest · remote",
  tagline: "AI-native web agency. Custom agents for work you delegate.",
  reply: "the same business day",
};

/**
 * The "book a call" control. NEXT_PUBLIC_CALENDAR_URL is the slot for a
 * Cal.com / Calendly link; until it is set, the control is a mailto that
 * promises a booking link by reply. Consumers render href/label/note and
 * never re-check the env themselves.
 */
const calendar = process.env.NEXT_PUBLIC_CALENDAR_URL;
export const call = calendar
  ? {
      href: calendar,
      label: "Book a 15-minute call",
      note: "Fifteen minutes, no deck. Pick a slot that suits you.",
    }
  : {
      href: `mailto:${contact.email}?subject=${encodeURIComponent("15-minute call")}&body=${encodeURIComponent(
        "Hi Robert — I'd like a 15-minute call. Please send a booking link.",
      )}`,
      label: "Book a 15-minute call",
      note: "Fifteen minutes, no deck. Say when suits you and we will send a booking link.",
    };

/**
 * The named human behind the work. `bio` is the byline blurb on the essays
 * and the founder panel; `line` is the accountability sentence used at
 * conversion points, where "a person reads it" only means something once the
 * person has a name. Set `photo` to a path under /public to render the
 * founder photo on /about.
 */
export const author = {
  name: "Robert Campbell",
  firstName: "Robert",
  role: "Founder",
  email: contact.email,
  // Set to a path under /public to render the founder photo on /about, and
  // to a Loom share URL to embed the 60–90 second walkthrough beside it.
  photo: undefined,
  loom: undefined,
  bio: "Robert Campbell is the founder of Closing Brackets, a builder-led studio. He scopes the work, writes the code, and builds the agent systems and the loop engineering that keep them running in production.",
  line: "Robert reads every enquiry himself and replies the same business day.",
};

/**
 * The site-wide closing panel — the same ask on the homepage, /about and
 * /services. Pages spread it into CtaPanel and may extend the body.
 */
export const startClose = {
  caption: "Before anything starts",
  title: "Tell us what you want built",
  body: "A property, a bot, or both. You get scope, dates, and one price before anything starts.",
  action: cta,
  secondary: { label: "Get a Build-a-Bot", href: routes.bot },
};

/** Absolute URL for a site-relative path. */
export const url = (path = "/") => `${SITE_URL}${path}`;

/**
 * The author as a schema.org Person, by reference. Consumers merge every
 * JSON-LD block on a page and resolve @id across them, so `author: authorRef`
 * on an article points at the entity the layout publishes.
 */
export const authorRef = { "@id": `${SITE_URL}/#person` };

/**
 * The Person node itself. Emitted by layout.js on every page, and again inside
 * an article's own graph so that block stands on its own — same @id, so the two
 * merge into one entity instead of competing.
 */
export const personLd = () => ({
  "@type": "Person",
  "@id": `${SITE_URL}/#person`,
  name: author.name,
  jobTitle: author.role,
  email: author.email,
  description: author.bio,
  url: url(routes.content),
  worksFor: { "@id": `${SITE_URL}/#organization` },
});

/** The one social card, shared by every page. Read by layout.js and pageOg. */
export const ogImage = {
  url: "/og.jpg",
  width: 1200,
  height: 630,
  alt: "Closing Brackets — AI-native web agency. Build-a-Bot: a custom agent for the tasks you delegate.",
  type: "image/jpeg",
};

/**
 * Open Graph block for a page. ALWAYS build a page's `openGraph` with this:
 * Next.js shallow-merges metadata, so a page that declares `openGraph`
 * REPLACES the layout's object outright, and one that sets just a title
 * silently drops the site name, locale, type and the card image.
 */
export function pageOg({ title, description, path, type = "website", ...rest }) {
  return {
    type,
    siteName: brand.name,
    locale: "en_US",
    images: [ogImage],
    title,
    description,
    url: url(path),
    ...rest,
  };
}

/**
 * BreadcrumbList JSON-LD. `trail` is [{ name, path }] for the ancestors after
 * Home; the current page is last. Google renders it as the breadcrumb in
 * results instead of a bare URL.
 */
export function breadcrumbLd(title, path, trail = []) {
  const items = [{ name: "Home", path: routes.home }, ...trail, { name: title, path }];
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: url(item.path),
    })),
  };
}

/**
 * FAQPage JSON-LD from [{ q, a }]. Every answer must also be visible on the
 * page in the same words — structured data that does not match what a visitor
 * reads is a manual-action risk, not a shortcut.
 */
export function faqLd(items) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map(({ q, a }) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: { "@type": "Answer", text: a },
    })),
  };
}

/**
 * ItemList JSON-LD — the ordered set a listing page is about. `items` is
 * [{ name, url, description? }]; the position is the order given, which should
 * be the order rendered.
 */
export function itemListLd(name, items) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name,
    numberOfItems: items.length,
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      url: item.url,
      ...(item.description ? { description: item.description } : {}),
    })),
  };
}

/**
 * Bundles several JSON-LD objects into one @graph, so a page emits a single
 * script tag rather than three.
 */
export function graphLd(...nodes) {
  return {
    "@context": "https://schema.org",
    "@graph": nodes.map(({ "@context": _drop, ...node }) => node),
  };
}
