/** @type {import('next').NextConfig} */
const nextConfig = {
  // Fully static site (no server) — ideal for SEO + speed, deployed to Render as a static site.
  output: "export",
  // The image optimizer requires a running server, which static export does not have.
  // `unoptimized` lets <Image> work in an exported build (assets are served as-is).
  images: {
    unoptimized: true,
  },
  // Emit each route as a directory with index.html (e.g. /services/index.html) for clean static URLs.
  trailingSlash: true,
  experimental: {
    // The site's CSS is a single small file (~6 KB gz). Inlining it into the HTML
    // removes the only render-blocking request and the document→CSS fetch chain.
    inlineCss: true,
  },
};

export default nextConfig;
