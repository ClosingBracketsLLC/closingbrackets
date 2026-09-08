import PageLayout from "../components/PageLayout";
import CtaPanel from "../components/CtaPanel";
import EngagementRules from "../components/EngagementRules";
import { NarrationList, SectionHeading } from "../components/primitives";
import {
  SITE_URL,
  author,
  breadcrumbLd,
  call,
  contact,
  graphLd,
  pageOg,
  routes,
  startClose,
  url,
} from "@/data/site";
import { hero, limitsHeading, positioning, studio } from "@/data/about";
import { notDelegate } from "@/data/build-a-bot";
import { fit } from "@/data/home";

const TITLE = "About";
const PATH = routes.about;

export const metadata = {
  title: "About — Builder-Led Studio, Spokane",
  description: `Closing Brackets is an AI-native web agency founded by ${author.name}. Sites, apps, and Build-a-Bot: a custom agent for the tasks you delegate. Spokane, remote-capable.`,
  alternates: { canonical: url(PATH) },
  openGraph: pageOg({
    title: "About Closing Brackets",
    description:
      "A builder-led studio: the person who scopes the work writes the code. Fixed scope, real dates, one price.",
    path: PATH,
  }),
};

const jsonLd = graphLd(breadcrumbLd(TITLE, PATH), {
  "@type": "AboutPage",
  "@id": url(`${PATH}#about`),
  url: url(PATH),
  name: "About Closing Brackets",
  description: positioning,
  mainEntity: { "@id": `${SITE_URL}/#organization` },
});

export default function About() {
  return (
    <PageLayout eyebrow={TITLE} title={hero.title} intro={positioning} accent="#ff4e64">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* The founder. A builder-led studio: engineering background at a high
          level, nothing personal. The photo cell and the Loom walkthrough
          below render only once author.photo / author.loom are set. */}
      {author.loom && (
        <figure className="cb-panel mt-8 overflow-hidden">
          <iframe
            src={author.loom}
            title={`${author.name} walks through one delegated job`}
            className="aspect-video w-full"
            allow="fullscreen"
            loading="lazy"
          />
        </figure>
      )}
      <section className="cb-strip mt-8 lg:grid-cols-12">
        {author.photo && (
          <div className="cb-cell overflow-hidden lg:col-span-4">
            {/* Plain <img>: images are `unoptimized` under static export. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={author.photo}
              alt={`${author.name}, ${author.role.toLowerCase()} of Closing Brackets`}
              width="800"
              height="1000"
              className="h-full w-full object-cover"
            />
          </div>
        )}
        <div
          style={{ "--cb-accent": "#ff4e64" }}
          className={`cb-cell cb-tone cb-tone--tl p-7 sm:p-9 ${
            author.photo ? "lg:col-span-8" : "lg:col-span-12"
          }`}
        >
          <p className="cb-eyebrow text-[var(--cb-accent)]">{author.role}</p>
          <h2 className="mt-4 font-[family-name:var(--font-display)] text-3xl leading-tight text-bone">
            {author.name}
          </h2>
          <p className="mt-5 max-w-2xl leading-relaxed text-slate">{author.bio}</p>
          <p className="mt-4 max-w-2xl leading-relaxed text-slate">{studio}</p>
          <dl className="cb-footrule mt-8 grid gap-x-10 gap-y-4 pt-6 text-sm sm:grid-cols-2">
            <div>
              <dt className="cb-eyebrow">Based</dt>
              <dd className="mt-2 text-bone">{contact.location}</dd>
            </div>
            <div>
              <dt className="cb-eyebrow">Reach</dt>
              <dd className="mt-2">
                <a href={`mailto:${contact.email}`} className="text-bone transition hover:text-cyan">
                  {contact.email}
                </a>
                <br />
                <a href={call.href} className="text-slate transition hover:text-cyan">
                  {call.label}
                </a>
              </dd>
            </div>
          </dl>
        </div>
      </section>

      <EngagementRules />

      <section className="mt-24">
        <SectionHeading eyebrow={limitsHeading.eyebrow} title={limitsHeading.title}>
          {fit.no}
        </SectionHeading>
        <NarrationList eyebrow={limitsHeading.listEyebrow} items={notDelegate} className="mt-9" />
        <p className="mt-7 max-w-2xl leading-relaxed text-slate">{fit.yes}</p>
      </section>

      <CtaPanel {...startClose} body={`${startClose.body} ${author.line}`} />
    </PageLayout>
  );
}
