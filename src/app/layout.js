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

export const metadata = {
  metadataBase: new URL("https://closingbrackets.com"),
  title: {
    default: "Custom Software, Growth & AI | Closing Brackets",
    template: "%s | Closing Brackets",
  },
  description:
    "Closing Brackets builds custom software, growth marketing, and AI automation for businesses that have outgrown off-the-shelf tools.",
  openGraph: {
    type: "website",
    siteName: "Closing Brackets",
    locale: "en_US",
    url: "https://closingbrackets.com/",
  },
  robots: { index: true, follow: true },
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
