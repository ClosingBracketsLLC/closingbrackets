import Link from "next/link";
import PageHero from "../components/PageHero";
import Reveal from "../components/Reveal";
import CTASection from "../components/CTASection";
import { posts } from "@/data/posts";

export const metadata = {
  title: "Blog",
  description:
    "Essays from Closing Brackets on custom software, growth marketing, and AI automation — practical, honest, and written by the person who does the work.",
  alternates: { canonical: "/blog" },
};

export default function BlogPage() {
  return (
    <>
      <PageHero
        eyebrow="Blog"
        title="Notes on software, growth & AI"
        subtitle="Practical essays written by the person who does the work — no ghostwritten filler, no keyword sludge."
        breadcrumbs={[
          { name: "Home", path: "/" },
          { name: "Blog", path: "/blog" },
        ]}
      />

      <section className="relative py-20 lg:py-28">
        <div className="container">
          <div className="mx-auto flex max-w-3xl flex-col gap-6">
            {posts.map((post, i) => (
              <Reveal key={post.slug} delay={(i % 2) * 60}>
                <Link
                  href={`/blog/${post.slug}`}
                  className="card group block p-8 transition-colors duration-200 hover:!border-violet"
                >
                  <div className="flex flex-wrap items-center gap-3 text-xs font-semibold text-ink-low">
                    <span className="rounded-full border border-line px-3 py-1 text-violet">
                      {post.category}
                    </span>
                    <time dateTime={post.date}>
                      {new Date(post.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </time>
                    <span aria-hidden>·</span>
                    <span>{post.readingTime}</span>
                  </div>
                  <h2 className="mt-4 font-display text-2xl font-semibold tracking-display text-ink-hi group-hover:text-violet md:text-3xl">
                    {post.title}
                  </h2>
                  <p className="mt-3 text-base">{post.excerpt}</p>
                  <span className="mt-5 inline-block text-sm font-semibold text-violet">
                    Read the essay →
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
