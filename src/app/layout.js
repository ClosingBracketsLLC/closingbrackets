import { Archivo, Archivo_Black } from "next/font/google";
import Script from "next/script";
import SiteHeader from "./components/SiteHeader";
import { SITE_URL, author, navLinks, ogImage, personLd, url } from "@/data/site";
import "./globals.css";

// Self-hosted at build time by next/font, so the static export makes no
// third-party font requests at runtime.
//
// The pair is one superfamily on purpose: Archivo Black is the comic-poster
// display weight (heavy grotesque — the register of graphic-novel titling, and
// what the halftone button texture is drawn to sit next to), and Archivo is its
// text companion, so headline and body share skeletons instead of merely
// coexisting. Micro-labels (section numbers) stay on the system mono stack —
// a code register that fits the name, at zero download cost.
const body = Archivo({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-body",
});

const display = Archivo_Black({
  subsets: ["latin"],
  weight: "400", // the family IS the black weight; it ships no other
  display: "swap",
  variable: "--font-display",
});

// The site's one canonical description — meta tag and JSON-LD both read it.
const DESCRIPTION =
  "AI-native agency: custom software, AI consulting and integration, automation, growth marketing. Fixed scope, real dates, one price, no hourly billing.";

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Custom Software Development, Growth & AI | Closing Brackets",
    template: "%s | Closing Brackets",
  },
  description: DESCRIPTION,
  openGraph: {
    type: "website",
    siteName: "Closing Brackets",
    locale: "en_US",
    // No `url` here: metadata shallow-merges, so a layout-level og:url leaks
    // the homepage URL onto every page. Scrapers fall back to the fetched URL.
    //
    // That same shallow merge means any page declaring its own `openGraph`
    // replaces this whole block — which is why pages build theirs with
    // pageOg() in data/site.js rather than by hand.
    images: [ogImage],
  },
  // twitter:title/description/image all resolve from openGraph when unset.
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
};

// Embedded in the static HTML of both pages (it describes the org, not one
// page). Organization, not ProfessionalService: LocalBusiness subtypes expect
// a physical address this remote-first agency doesn't publish.
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: "Closing Brackets",
      url: `${SITE_URL}/`,
      logo: `${SITE_URL}/icon.svg`,
      email: author.email,
      description: DESCRIPTION,
      // Names the human behind the org. Search and AI answer engines both
      // resolve entities before they trust claims, and an organisation with no
      // person attached is a weaker entity than one with a founder.
      founder: { "@id": `${SITE_URL}/#person` },
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "Sales",
        email: author.email,
        url: url("/contact/"),
        availableLanguage: "English",
      },
      // Remote-first, so the service area is stated rather than an address.
      areaServed: { "@type": "Country", name: "United States" },
      // The topics this entity is actually about. Cheap, accurate, and it is
      // what an answer engine matches against when deciding whether we are a
      // relevant source for a question rather than merely a page about it.
      knowsAbout: [
        "Custom software development",
        "AI agents",
        "AI integration",
        "Workflow automation",
        "Loop engineering",
        "Graph engineering",
        "Growth marketing",
      ],
      // The visible h1 says "custom solutions" by design; the service-line
      // keywords live here (and in the title tag / h2s) instead.
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Services",
        itemListElement: [
          "Custom software development",
          "AI consulting",
          "AI integration",
          "AI automation",
          "Growth marketing",
        ].map((name) => ({
          "@type": "Offer",
          itemOffered: { "@type": "Service", name },
        })),
      },
    },
    // Built from the shared definition in data/site.js — the essays emit the
    // same node inside their own graph, and two hand-written copies would be
    // two entities the moment one of them was edited.
    personLd(),
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: `${SITE_URL}/`,
      name: "Closing Brackets",
      publisher: { "@id": `${SITE_URL}/#organization` },
    },
    // Declares the header nav to crawlers, which helps them treat these as the
    // site's primary sections rather than incidental links.
    {
      "@type": "SiteNavigationElement",
      "@id": `${SITE_URL}/#nav`,
      name: navLinks.map((l) => l.label),
      url: navLinks.map((l) => url(l.href)),
    },
  ],
};

// viewport-fit=cover is required: the engine relies on safe-area insets to keep
// copy clear of the notch and home indicator on phones.
export const viewport = {
  themeColor: "#060910",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

const clarityId = process.env.NEXT_PUBLIC_CLARITY_ID;

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${body.variable} ${display.variable} h-full antialiased`}
    >
      <body className="min-h-full">
        {/* Plain <script>, not next/script: JSON-LD must be in the served
            static HTML, not injected at runtime. */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <SiteHeader />
        {children}
        {clarityId ? (
          <Script id="clarity" strategy="lazyOnload">
            {`(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window,document,"clarity","script","${clarityId}");`}
          </Script>
        ) : null}
      </body>
    </html>
  );
}
