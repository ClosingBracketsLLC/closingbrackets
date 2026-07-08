import { site, services } from "@/data/site";
import { posts } from "@/data/posts";

// Required so the metadata route is prerendered under `output: "export"`.
export const dynamic = "force-static";

// Emits static sitemap.xml at build time (works with `output: "export"`).
const routes = [
  { path: "/", priority: 1.0, changeFrequency: "weekly" },
  { path: "/services", priority: 0.9, changeFrequency: "monthly" },
  ...services.map((s) => ({
    path: `/services/${s.slug}`,
    priority: 0.9,
    changeFrequency: "monthly",
  })),
  { path: "/work", priority: 0.8, changeFrequency: "monthly" },
  { path: "/process", priority: 0.7, changeFrequency: "monthly" },
  { path: "/about", priority: 0.7, changeFrequency: "yearly" },
  { path: "/blog", priority: 0.8, changeFrequency: "weekly" },
  ...posts.map((p) => ({
    path: `/blog/${p.slug}`,
    priority: 0.6,
    changeFrequency: "monthly",
  })),
  { path: "/contact", priority: 0.9, changeFrequency: "yearly" },
  { path: "/privacy-policy", priority: 0.3, changeFrequency: "yearly" },
  { path: "/terms-of-service", priority: 0.3, changeFrequency: "yearly" },
];

export default function sitemap() {
  return routes.map((r) => ({
    url: `${site.url}${r.path}`,
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));
}
