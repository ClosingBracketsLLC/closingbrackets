import ContactForm from "./ContactForm";
import { BracketTick } from "./BracketMark";
import { site } from "@/data/site";

/**
 * The single pre-footer conversion band. Pages opt in by rendering this once
 * at the end — there is never a second stacked CTA. Includes an inline
 * mini-form so a visitor can convert without navigating.
 */
export default function CTASection({
  title = "Let's close the brackets on your next project.",
  lead = "Tell us what you're building or growing. You'll get a reply from the person who'd actually build it — within one business day.",
}) {
  return (
    <section className="relative overflow-hidden border-t border-line">
      <div className="aurora opacity-70" aria-hidden />
      <div className="container relative z-10 py-20 lg:py-28">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <p className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-ink-low">
              <BracketTick />
              Start here
            </p>
            <h2 className="font-display text-3xl font-semibold tracking-display text-ink-hi md:text-5xl">
              {title}
            </h2>
            <p className="mt-5 max-w-md text-base md:text-lg">{lead}</p>
            <p className="mt-6 text-sm">
              Prefer to talk?{" "}
              <a
                href={`tel:${site.phone}`}
                className="font-semibold text-violet hover:underline underline-offset-4"
              >
                Call {site.phoneDisplay}
              </a>
            </p>
          </div>
          <div className="card p-6 md:p-8">
            <ContactForm variant="mini" formName="Home / CTA band" />
          </div>
        </div>
      </div>
    </section>
  );
}
