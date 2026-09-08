import PageLayout from "./PageLayout";
import { breadcrumbLd, pageOg, url } from "@/data/site";

/** Metadata for a legal page, built the same way for both. */
export function legalMetadata(doc, path) {
  return {
    title: doc.title,
    description: doc.intro,
    alternates: { canonical: url(path) },
    openGraph: pageOg({ title: `${doc.title} — Closing Brackets`, description: doc.intro, path }),
  };
}

/**
 * /privacy/ and /terms/ share one shape: a dated intro and a run of short
 * headed sections, set in the prose style the essays use.
 */
export default function LegalPage({ doc, path }) {
  const jsonLd = breadcrumbLd(doc.title, path);
  return (
    <PageLayout eyebrow={doc.title} title={doc.title} intro={doc.intro} width="max-w-3xl">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <p className="cb-eyebrow border-y border-rain py-4">
        Last updated <time dateTime={doc.updated}>{doc.updated}</time>
      </p>
      <div className="cb-prose mt-10">
        {doc.sections.map((section) => (
          <section key={section.h}>
            <h2>{section.h}</h2>
            {section.p.map((text) => (
              <p key={text}>{text}</p>
            ))}
          </section>
        ))}
      </div>
    </PageLayout>
  );
}
