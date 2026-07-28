import { Inter, Space_Grotesk } from "next/font/google";
import Script from "next/script";
import "./globals.css";

// Self-hosted at build time by next/font, so the static export makes no
// third-party font requests at runtime.
const body = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-body",
});

const display = Space_Grotesk({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-display",
});

const SITE_URL = "https://closingbrackets.com";

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
    images: [
      {
        url: "/og.jpg",
        width: 1200,
        height: 630,
        alt: "Closing Brackets — custom software, growth marketing, and AI automation",
        type: "image/jpeg",
      },
    ],
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
      email: "robert@closingbrackets.com",
      description: DESCRIPTION,
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: `${SITE_URL}/`,
      name: "Closing Brackets",
      publisher: { "@id": `${SITE_URL}/#organization` },
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
