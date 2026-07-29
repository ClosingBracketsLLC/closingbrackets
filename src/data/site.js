// Single source for the site chrome — the frame around every page.
//
// The homepage's scroll world owns its own copy in world.js; anything that
// wraps it (header, footer, canonical URLs) lives here so a nav change is one
// edit rather than one per page.

export const SITE_URL = "https://closingbrackets.com";

export const brand = { name: "Closing Brackets", href: "/" };

// Order is the header order. Adding a route here puts it in the header, the
// footer, and the mobile nav at once — but remember to add it to
// public/sitemap.xml and to drop any render.yaml redirect that shadows it.
export const navLinks = [
  { label: "Services", href: "/services/" },
  { label: "Work", href: "/work/" },
  { label: "Content", href: "/content/" },
];

export const cta = { label: "Start a project", href: "/contact/" };

/**
 * The named human behind the work.
 *
 * The site ran anonymous — "one small senior team", "the same two people" —
 * which costs on both sides of the same coin. Google's E-E-A-T asks who is
 * behind a claim, and every AI citation engine weights named authorship; a
 * prospect about to describe their business to a stranger is asking the same
 * question in plainer words. One real name answers all of it.
 *
 * `bio` is the byline blurb on the essays. `line` is the accountability
 * sentence used at conversion points, where the promise "a person reads it"
 * only means something once the person has a name.
 */
export const author = {
  name: "Robert Campbell",
  role: "Founder",
  email: "robert@closingbrackets.com",
  bio: "Robert Campbell is the founder of Closing Brackets, where he builds agent systems, custom software and the loop engineering that keeps them running in production.",
  line: "Robert reads every enquiry himself.",
};

/** Absolute URL for a site-relative path. */
export const url = (path = "/") => `${SITE_URL}${path}`;

/**
 * The author as a schema.org Person, by reference.
 *
 * Consumers merge every JSON-LD block on a page and resolve @id across them, so
 * `author: authorRef` on an article points at the same entity the layout
 * publishes rather than declaring a second one.
 */
export const authorRef = { "@id": `${SITE_URL}/#person` };

/**
 * The Person node itself. Emitted by layout.js on every page, and again inside
 * an article's own graph so that block stands on its own — same @id, so the two
 * merge into one entity instead of competing. Defined here rather than at
 * either call site precisely so they cannot drift into two different people.
 */
export const personLd = () => ({
  "@type": "Person",
  "@id": `${SITE_URL}/#person`,
  name: author.name,
  jobTitle: author.role,
  email: author.email,
  description: author.bio,
  url: url("/content/"),
  worksFor: { "@id": `${SITE_URL}/#organization` },
});

/** The one social card, shared by every page. Read by layout.js and pageOg. */
export const ogImage = {
  url: "/og.jpg",
  width: 1200,
  height: 630,
  alt: "Closing Brackets — custom software, growth marketing, and AI automation",
  type: "image/jpeg",
};

/**
 * Open Graph block for a page.
 *
 * ALWAYS build a page's `openGraph` with this rather than by hand. Next.js
 * shallow-merges metadata: a page that declares `openGraph` REPLACES the
 * layout's object outright instead of merging into it, so a page setting just
 * a title silently drops the site name, locale, type and — the one that
 * matters — the card image, and shares of it render as a bare link.
 *
 * `type` defaults to "website"; articles pass "article" plus `publishedTime`.
 */
export function pageOg({ title, description, path, type = "website", ...rest }) {
  return {
    type,
    siteName: "Closing Brackets",
    locale: "en_US",
    images: [ogImage],
    title,
    description,
    url: url(path),
    ...rest,
  };
}

/**
 * BreadcrumbList JSON-LD for a second-level page. Google uses it to render the
 * breadcrumb trail in results instead of a bare URL.
 */
export function breadcrumbLd(title, path) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: url("/") },
      { "@type": "ListItem", position: 2, name: title, item: url(path) },
    ],
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
