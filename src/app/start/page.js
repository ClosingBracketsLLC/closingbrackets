import PageLayout from "../components/PageLayout";
import StartForm from "../components/StartForm";
import { ACCENT, NumberedStrip, SectionHeading, cellTone } from "../components/primitives";
import {
  SITE_URL,
  author,
  breadcrumbLd,
  call,
  contact,
  faqLd,
  graphLd,
  pageOg,
  routes,
  url,
} from "@/data/site";
import { balloon, faqs, hero, next } from "@/data/start";

const TITLE = "Start";
const PATH = routes.start;

export const metadata = {
  title: "Start a Project",
  description: `Tell Closing Brackets what you want built: a Build-a-Bot, a site or app, or both. ${author.line} What comes back is scope, real dates, and one price.`,
  alternates: { canonical: url(PATH) },
  openGraph: pageOg({
    title: "Start a project with Closing Brackets",
    description:
      "Describe the tasks you want to hand off, or the property you want built. The first answer is free; the scope and the price come next.",
    path: PATH,
  }),
};

/* The FAQ node only stays valid because every answer is rendered visibly
   further down, in the same words. */
const jsonLd = graphLd(
  breadcrumbLd(TITLE, PATH),
  {
    "@type": "ContactPage",
    "@id": url(`${PATH}#contact`),
    url: url(PATH),
    name: "Start a project with Closing Brackets",
    description:
      "Describe a Build-a-Bot, a site or app, or both, and get back scope, real dates, and one price. Replies the same business day.",
    mainEntity: { "@id": `${SITE_URL}/#organization` },
  },
  faqLd(faqs),
);

/* The two other ways in, given the same weight as the form. */
const WAYS_IN = [
  {
    eyebrow: "Would rather email",
    accent: ACCENT.cyan,
    link: { href: `mailto:${contact.email}`, label: contact.email },
    note: `It reaches ${author.name} directly and gets the same answer ${contact.reply}.`,
  },
  {
    eyebrow: "Would rather talk",
    accent: ACCENT.coral,
    link: { href: call.href, label: call.label, button: true },
    note: call.note,
  },
];

export default function Start() {
  return (
    <PageLayout eyebrow={TITLE} title={hero.title} intro={hero.intro} accent="#ff4e64">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="mt-12">
        <StartForm />
      </div>

      <div className="cb-strip mt-3 sm:grid-cols-2">
        {WAYS_IN.map((way, i) => {
          const { style, tone } = cellTone(i, way.accent);
          return (
            <div key={way.eyebrow} style={style} className={`cb-cell cb-tone ${tone} p-6 sm:p-7`}>
              <p className="cb-eyebrow text-[var(--cb-accent)]">{way.eyebrow}</p>
              <a
                href={way.link.href}
                className={
                  way.link.button
                    ? "cb-btn cb-btn--ghost mt-4"
                    : "mt-3 block font-[family-name:var(--font-display)] text-lg text-bone transition hover:text-cyan"
                }
              >
                {way.link.label}
              </a>
              <p className="mt-3 text-sm leading-relaxed text-slate">{way.note}</p>
            </div>
          );
        })}
      </div>

      {/* Below the form, not beside it: the form is the action. */}
      <section className="mt-20">
        <SectionHeading eyebrow="After you send" title="What happens next">
          Three steps, and you can hold us to all of them.
        </SectionHeading>
        <NumberedStrip items={next} />
      </section>

      {/* The objections, answered before anyone has to raise them. Rendered
          in full, never behind disclosure toggles: these are the FAQPage
          structured data above, word for word. */}
      <section className="mt-20">
        <SectionHeading eyebrow="Before you write" title="Questions people ask first">
          The things worth knowing before you spend twenty minutes describing
          your business to strangers.
        </SectionHeading>
        <div className="cb-strip mt-9 lg:grid-cols-2">
          {faqs.map((item, i) => {
            const { style, tone } = cellTone(i);
            return (
              <div key={item.q} style={style} className={`cb-cell cb-tone ${tone} p-7 sm:p-8`}>
                <h3 className="font-[family-name:var(--font-display)] text-lg leading-snug text-bone">
                  {item.q}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-slate">{item.a}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* The page's one speech balloon, on the line it would say out loud. */}
      <section style={{ "--cb-accent": ACCENT.coral }} className="mt-20">
        <p className="cb-balloon max-w-2xl p-7 text-lg leading-relaxed text-bone">{balloon}</p>
      </section>
    </PageLayout>
  );
}
