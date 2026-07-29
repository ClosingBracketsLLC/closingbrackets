import Link from "next/link";
import PageLayout from "../components/PageLayout";
import ClipFrame from "../components/ClipFrame";
import CtaPanel from "../components/CtaPanel";
import { Numeral, SectionHeading } from "../components/primitives";
import {
  SITE_URL,
  author,
  authorRef,
  breadcrumbLd,
  graphLd,
  pageOg,
  url,
} from "@/data/site";
import { posts, topics } from "@/data/content";

const TITLE = "Content";
const PATH = "/content/";

/* Title trimmed to fit: the old one ran to 72 characters once the brand
   template was appended and lost "Production Notes" to truncation anyway. Both
   series names survive intact, which is the point — they are terms we coined
   and are the only ones here we can expect to own outright. */
export const metadata = {
  title: "Loop Engineering & Graph Engineering",
  description:
    "Essays by Robert Campbell on loop engineering — context budgets, retries, stopping conditions — graph engineering, and what survives contact with production.",
  alternates: { canonical: url(PATH) },
  openGraph: pageOg({
    title: "Content — loop engineering, graph engineering, production notes",
    description:
      "Two running series on the engineering behind agents that survive production, plus notes on what we made and why it was cut that way.",
    path: PATH,
  }),
};

const dateFormat = new Intl.DateTimeFormat("en-US", {
  year: "numeric",
  month: "long",
  day: "numeric",
  timeZone: "UTC",
});

const newest = (a, b) => new Date(b.date) - new Date(a.date);
const film = posts.filter((p) => p.kind === "film").sort(newest)[0];
const essays = posts.filter((p) => p !== film).sort(newest);

/* Series order is deliberate, not alphabetical — loop engineering is the one
   we lead with. Anything in a series not listed here still renders, appended. */
const SERIES = ["Loop engineering", "Graph engineering"];
const seriesOrder = [
  ...SERIES,
  ...new Set(essays.map((p) => p.series).filter((s) => !SERIES.includes(s))),
];

/* Within a run, the pillar piece comes first whatever its publication date —
   it is the one that makes the others make sense. */
const inSeries = (series) =>
  essays
    .filter((p) => p.series === series)
    .sort((a, b) => Number(b.pillar ?? false) - Number(a.pillar ?? false));

/* A Blog node listing every piece. Each entry is a BlogPosting stub — the full
   Article markup lives on the piece's own page (content/[slug]/page.js), and
   this one exists so a crawler reading only the index still gets the set. */
const jsonLd = graphLd(breadcrumbLd(TITLE, PATH), {
  "@type": "Blog",
  "@id": `${SITE_URL}${PATH}#blog`,
  name: "Closing Brackets — writing",
  description: metadata.description,
  url: url(PATH),
  publisher: { "@id": `${SITE_URL}/#organization` },
  /* Authored by the named Person layout.js publishes, not by the company. The
     same reference is repeated on each stub because a consumer reading only
     one entry should still get the author with it. */
  author: authorRef,
  blogPost: posts
    .slice()
    .sort(newest)
    .map((post) => ({
      "@type": "BlogPosting",
      headline: post.title,
      description: post.summary,
      url: url(`${PATH}${post.slug}/`),
      datePublished: post.date,
      dateModified: post.updated ?? post.date,
      author: authorRef,
      ...(post.series ? { articleSection: post.series } : {}),
    })),
});

/** Date and reading time, in the caption register the whole site uses. */
function PostMeta({ post }) {
  return (
    <p className="cb-eyebrow">
      <time dateTime={post.date}>{dateFormat.format(new Date(post.date))}</time>
      {post.readingMinutes ? ` · ${post.readingMinutes} min read` : ""}
    </p>
  );
}

/**
 * One essay as a numbered panel in its series' run. The dot screen alternates
 * corner by issue: a run of panels screened from the same side reads as
 * wallpaper rather than as a page someone laid out.
 */
function PostCard({ post, issue }) {
  return (
    <article
      style={{ "--cb-accent": post.accent }}
      className={`cb-cell cb-tone ${
        issue % 2 ? "cb-tone--tr" : "cb-tone--bl"
      } flex flex-col p-7`}
    >
      <div className="flex items-center gap-4">
        <Numeral value={issue} className="text-3xl" />
        {post.pillar && (
          <span className="cb-eyebrow text-[var(--cb-accent)]">Start here</span>
        )}
      </div>
      <h3 className="mt-5 font-[family-name:var(--font-display)] text-xl leading-snug text-bone">
        <Link
          href={`/content/${post.slug}/`}
          className="transition after:absolute after:inset-0 after:content-[''] hover:text-cyan focus-visible:outline-none"
        >
          {post.title}
        </Link>
      </h3>
      <p className="mt-3 flex-1 text-sm leading-relaxed text-slate">{post.summary}</p>
      <div className="mt-6">
        <PostMeta post={post} />
      </div>
    </article>
  );
}

export default function Content() {
  return (
    <PageLayout
      eyebrow={TITLE}
      title="What we have learned, written down"
      /* The byline is in the intro rather than repeated on all six cards: the
         index needs the author visible once to match its schema, and printing
         the same name six times down a page reads as a template. */
      intro={`Notes from the work itself, written by ${author.name}. Two running series — loop engineering and graph engineering — plus the occasional piece on what we made and why it was cut that way.`}
      accent="#2ef2dc"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* The film leads: it is the one piece on this page you can understand
          without reading anything. The splash panel of the issue, so it takes
          the heavier ink — screened bottom-right, where the copy is, because a
          dot tone laid over the film frame would fight the footage. */}
      {film && (
        <article
          style={{ "--cb-accent": film.accent }}
          className="cb-panel cb-splash cb-tone cb-tone--br relative overflow-hidden lg:grid lg:grid-cols-2"
        >
          <ClipFrame
            poster={film.media.poster}
            posterMobile={film.media.posterMobile}
            clip={film.media.clip}
            clipMobile={film.media.clipMobile}
            alt={`${film.title} — still`}
            className="aspect-[16/9] w-full lg:h-full lg:aspect-auto"
          />
          <div className="p-7 sm:p-9">
            <div className="flex flex-wrap items-center gap-3">
              <span className="cb-eyebrow">Film</span>
              {film.media.concept && (
                <span className="cb-eyebrow text-[var(--cb-accent)]">Concept piece</span>
              )}
            </div>
            <h2 className="mt-5 font-[family-name:var(--font-display)] text-2xl leading-tight text-bone sm:text-3xl">
              <Link
                href={`/content/${film.slug}/`}
                className="transition after:absolute after:inset-0 after:content-[''] hover:text-cyan focus-visible:outline-none"
              >
                {film.title}
              </Link>
            </h2>
            <p className="mt-4 leading-relaxed text-slate">{film.summary}</p>
            <div className="mt-6">
              <PostMeta post={film} />
            </div>
          </div>
        </article>
      )}

      {seriesOrder.map((series, i) => {
        const items = inSeries(series);
        if (!items.length) return null;
        return (
          <section key={series} className="mt-20">
            <SectionHeading
              eyebrow={`Series ${String(i + 1).padStart(2, "0")} · ${items.length} ${
                items.length === 1 ? "piece" : "pieces"
              }`}
              title={series}
            >
              {topics.find((t) => t.title === series)?.body}
            </SectionHeading>
            <div className="cb-strip mt-9 md:grid-cols-2">
              {items.map((post, n) => (
                <PostCard key={post.slug} post={post} issue={n + 1} />
              ))}
            </div>
          </section>
        );
      })}

      <CtaPanel
        caption="Faster than reading all of it"
        title="If one of these describes a problem you have, describe it to us"
        body="The quickest route to an answer is to tell us the actual problem. We read every enquiry ourselves, reply within one business day, and the first answer costs nothing."
        action={{ label: "Ask us directly", href: "/contact/" }}
        secondary={{ label: "See what we do", href: "/services/" }}
        accent="#2ef2dc"
      />
    </PageLayout>
  );
}
