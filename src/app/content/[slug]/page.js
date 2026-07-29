import Link from "next/link";
import PageLayout from "../../components/PageLayout";
import ClipFrame from "../../components/ClipFrame";
import { SITE_URL, author, authorRef, pageOg, personLd, url } from "@/data/site";
import { posts } from "@/data/content";

/* Static export: every article URL has to be enumerable at build time. */
export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.summary,
    alternates: { canonical: url(`/content/${post.slug}/`) },
    openGraph: pageOg({
      type: "article",
      title: post.title,
      description: post.summary,
      path: `/content/${post.slug}/`,
      publishedTime: post.date,
    }),
  };
}

const dateFormat = new Intl.DateTimeFormat("en-US", {
  year: "numeric",
  month: "long",
  day: "numeric",
  timeZone: "UTC",
});

/** Renders one content block. See the block reference in data/content.js. */
function Block({ block }) {
  switch (block.t) {
    case "h2":
      return <h2>{block.x}</h2>;
    case "ul":
      return (
        <ul>
          {block.x.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      );
    case "ol":
      return (
        <ol>
          {block.x.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ol>
      );
    case "quote":
      return <blockquote>{block.x}</blockquote>;
    case "code":
      return (
        <pre>
          <code>{block.x}</code>
        </pre>
      );
    default:
      return <p>{block.x}</p>;
  }
}

export default async function Post({ params }) {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);
  if (!post) return null;

  // Everything else in the same series, for the footer.
  const related = posts.filter(
    (p) => p.series === post.series && p.slug !== post.slug,
  );

  const articleLd = {
    "@context": "https://schema.org",
    "@type": post.kind === "film" ? "VideoObject" : "Article",
    headline: post.title,
    description: post.summary,
    datePublished: post.date,
    /* dateModified matters more than it looks: answer engines weight recency
       heavily, and an undated revision reads as older than it is. Falls back to
       the publication date, so a piece that has never been revised is not
       claiming a freshness it does not have. */
    dateModified: post.updated ?? post.date,
    /* A Person, by reference to the node layout.js defines — not an inline
       Organization. An article authored by a company is a weaker E-E-A-T signal
       than one authored by a named human who works there, and inlining a second
       Person object here would read as a different entity than the founder on
       the Organization. */
    author: authorRef,
    publisher: { "@id": `${SITE_URL}/#organization` },
    ...(post.series ? { articleSection: post.series } : {}),
    mainEntityOfPage: url(`/content/${post.slug}/`),
    ...(post.media
      ? {
          name: post.title,
          uploadDate: post.date,
          thumbnailUrl: url(post.media.poster),
          contentUrl: url(post.media.clip),
        }
      : {}),
  };

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
      { "@type": "ListItem", position: 2, name: "Content", item: url("/content/") },
      {
        "@type": "ListItem",
        position: 3,
        name: post.title,
        item: url(`/content/${post.slug}/`),
      },
    ],
  };

  return (
    <PageLayout
      eyebrow={post.series}
      crumbs={[
        { label: "Home", href: "/" },
        { label: "Content", href: "/content/" },
      ]}
      title={post.title}
      intro={post.summary}
      accent={post.accent}
      width="max-w-3xl"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([articleLd, personLd(), breadcrumb]),
        }}
      />

      {/* The byline. It read "· Closing Brackets" — a company, which is the one
          thing that cannot have written first-hand technical experience. Search
          quality guidelines and every AI citation engine ask the same question
          of a claim like "the failure we are called in to fix most often", and
          a named author with a role is the answer to it. */}
      <p className="cb-eyebrow flex flex-wrap items-center gap-x-3 gap-y-2 border-y border-rain py-4">
        <span className="text-[var(--cb-accent)]">
          By {author.name}, {author.role.toLowerCase()}
        </span>
        <time dateTime={post.date}>· {dateFormat.format(new Date(post.date))}</time>
        {post.readingMinutes ? <span>· {post.readingMinutes} min read</span> : null}
      </p>

      {post.media && (
        <figure className="mt-10">
          <ClipFrame
            poster={post.media.poster}
            posterMobile={post.media.posterMobile}
            clip={post.media.clip}
            clipMobile={post.media.clipMobile}
            alt={`${post.title} — still`}
            className="aspect-[16/9] w-full border border-rain"
          />
          <figcaption className="mt-3 text-xs text-slate">
            {post.media.caption}
          </figcaption>
        </figure>
      )}

      <div
        className="cb-prose mt-12"
        style={{ "--cb-accent": post.accent }}
      >
        {post.body.map((block, i) => (
          <Block key={i} block={block} />
        ))}
      </div>

      {/* Author note. The visible half of the Person node above — structured
          data claiming an author the page never shows is the kind of markup
          that gets discounted, and a reader who has just finished nine minutes
          on retry budgets has earned the answer to "who is telling me this".
          Deliberately plain: the page spends its loud devices on the pull
          quotes and the closing panel. */}
      <aside className="mt-14 border-t border-rain pt-7">
        <p className="cb-eyebrow text-[var(--cb-accent)]">About the author</p>
        <p className="mt-4 leading-relaxed text-slate">
          {author.bio}{" "}
          <a
            href={`mailto:${author.email}`}
            className="text-[var(--cb-accent)] underline decoration-current/40 underline-offset-4 transition hover:decoration-current"
          >
            {author.email}
          </a>
        </p>
      </aside>

      {related.length > 0 && (
        <section className="mt-20">
          <h2 className="cb-rule font-[family-name:var(--font-display)] text-xl text-bone">
            More in {post.series}
          </h2>
          <div className="mt-7 grid gap-4">
            {related.map((other) => (
              <article
                key={other.slug}
                style={{ "--cb-accent": other.accent }}
                className="cb-panel cb-panel--lift p-6"
              >
                <h3 className="font-[family-name:var(--font-display)] text-lg leading-snug text-bone">
                  <Link
                    href={`/content/${other.slug}/`}
                    className="transition after:absolute after:inset-0 after:content-[''] hover:text-cyan focus-visible:outline-none"
                  >
                    {other.title}
                  </Link>
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate">{other.summary}</p>
              </article>
            ))}
          </div>
        </section>
      )}

      <section
        style={{ "--cb-accent": post.accent }}
        className="cb-panel relative mt-16 isolate overflow-hidden p-8"
      >
        <span aria-hidden className="cb-speedlines" />
        <h2 className="font-[family-name:var(--font-display)] text-xl leading-tight text-bone">
          Got this problem right now?
        </h2>
        <p className="mt-3 max-w-lg text-sm leading-relaxed text-slate">
          Describe it and we will tell you what we would do about it. One
          business day, no charge for the first answer.
        </p>
        <div className="mt-7 flex flex-wrap gap-3">
          <Link
            href="/contact/"
            className="cb-halftone cb-btn"
          >
            Start a conversation
          </Link>
          <Link
            href="/content/"
            className="cb-btn cb-btn--ghost"
          >
            All writing
          </Link>
        </div>
      </section>
    </PageLayout>
  );
}
