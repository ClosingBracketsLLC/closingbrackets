import { notFound } from "next/navigation";
import Link from "next/link";
import PageHero from "../../components/PageHero";
import CTASection from "../../components/CTASection";
import JsonLd, { articleSchema } from "../../components/JsonLd";
import { posts } from "@/data/posts";

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: { type: "article", publishedTime: post.date },
  };
}

export default async function BlogPostPage({ params }) {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);
  if (!post) notFound();

  return (
    <>
      <PageHero
        eyebrow={post.category}
        title={post.title}
        subtitle={`${post.author} · ${new Date(post.date).toLocaleDateString(
          "en-US",
          { year: "numeric", month: "long", day: "numeric" }
        )} · ${post.readingTime}`}
        breadcrumbs={[
          { name: "Home", path: "/" },
          { name: "Blog", path: "/blog" },
          { name: post.title, path: `/blog/${post.slug}` },
        ]}
      />
      <JsonLd data={articleSchema(post)} />

      <article className="relative py-16 lg:py-24">
        <div className="container">
          <div className="mx-auto max-w-prose">
            {post.body.map((section, i) => (
              <section key={section.heading || i}>
                {section.heading ? (
                  <h2 className="mb-4 mt-10 font-display text-2xl font-semibold tracking-display text-ink-hi">
                    {section.heading}
                  </h2>
                ) : null}
                <p className="text-base leading-relaxed md:text-lg">
                  {section.text}
                </p>
              </section>
            ))}
            <p className="mt-12 border-t border-line pt-8 text-sm text-ink-low">
              Written by {post.author}, founder of Closing Brackets.{" "}
              <Link
                href="/contact"
                className="font-semibold text-violet hover:underline underline-offset-4"
              >
                Talk to him about your project →
              </Link>
            </p>
          </div>
        </div>
      </article>

      <CTASection />
    </>
  );
}
