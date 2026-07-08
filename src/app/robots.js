import { site } from "@/data/site";

// Required so the metadata route is prerendered under `output: "export"`.
export const dynamic = "force-static";

// Emits static robots.txt at build time (works with `output: "export"`).
export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  };
}
