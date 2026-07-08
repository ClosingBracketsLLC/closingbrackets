import { site, services } from "@/data/site";

/**
 * Renders a JSON-LD <script> for rich results. Server-rendered into static HTML,
 * so it ships in the initial payload with zero client JS.
 */
export default function JsonLd({ data }) {
  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

const sameAs = Object.values(site.social).filter((u) => u && u !== "#");

// Organization / professional service — the primary business entity.
export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": `${site.url}/#organization`,
  name: site.name,
  url: site.url,
  description: site.shortDescription,
  email: site.email,
  telephone: site.phone,
  founder: { "@type": "Person", name: site.founder },
  image: `${site.url}${site.ogImage}`,
  logo: `${site.url}/img/logo.svg`,
  areaServed: site.areaServed,
  address: {
    "@type": "PostalAddress",
    addressLocality: site.locality,
    addressRegion: site.region,
    addressCountry: "US",
  },
  ...(sameAs.length ? { sameAs } : {}),
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Services",
    itemListElement: services.map((s) => ({
      "@type": "OfferCatalog",
      name: s.name,
      itemListElement: s.offerings.map((o) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: o },
      })),
    })),
  },
};

export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${site.url}/#website`,
  url: site.url,
  name: site.name,
  publisher: { "@id": `${site.url}/#organization` },
};

// Breadcrumb builder: pass [{ name, path }, ...] starting from Home.
export function breadcrumbSchema(items) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: `${site.url}${it.path}`,
    })),
  };
}

// FAQPage builder: pass [{ question, answer }, ...] (the shape of data/faqs.js).
export function faqSchema(faqs) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };
}

// Service builder for /services/[slug] pages.
export function serviceSchema(service) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.seo?.title || service.name,
    description: service.seo?.description || service.summary,
    url: `${site.url}/services/${service.slug}/`,
    provider: { "@id": `${site.url}/#organization` },
    areaServed: site.areaServed,
    serviceType: service.name,
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: service.name,
      itemListElement: service.offerings.map((o) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: o },
      })),
    },
  };
}

// Article builder for /blog/[slug] pages.
export function articleSchema(post) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    author: { "@type": "Person", name: post.author },
    publisher: { "@id": `${site.url}/#organization` },
    mainEntityOfPage: `${site.url}/blog/${post.slug}/`,
  };
}
