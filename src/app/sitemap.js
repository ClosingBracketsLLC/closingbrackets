import { pages, routes, url } from "@/data/site";
import { posts } from "@/data/content";

/**
 * /sitemap.xml, generated at build time from the route table in data/site.js
 * and the posts in data/content.js — so a new route or post cannot be left
 * out. `lastModified` is the last REAL content change, never a deploy date.
 */
export const dynamic = "force-static";

export default function sitemap() {
  return [
    ...pages.map((page) => ({
      url: url(page.path),
      lastModified: page.updated,
      changeFrequency: page.changefreq,
      priority: page.priority,
    })),
    ...posts.map((post) => ({
      url: url(`${routes.content}${post.slug}/`),
      lastModified: post.updated ?? post.date,
      changeFrequency: "yearly",
      priority: post.pillar ? 0.6 : 0.5,
    })),
  ];
}
