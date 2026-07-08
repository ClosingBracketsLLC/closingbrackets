import { guaranteeChips } from "@/data/differentiators";

const proofs = [
  {
    stat: "100",
    label: "Lighthouse SEO score, every page",
  },
  {
    stat: "< 1s",
    label: "page loads on this site",
  },
  {
    stat: "100%",
    label: "of the code is yours",
  },
];

/**
 * Verifiable self-demonstration instead of testimonials: this site is the
 * proof. Every claim here can be checked by the visitor in their own browser.
 */
export default function ProofBar() {
  return (
    <div className="card flex h-full flex-col justify-between gap-6 p-7 md:p-8">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-ink-low">
          This site is the pitch
        </p>
        <div className="mt-5 grid grid-cols-3 gap-4">
          {proofs.map((p) => (
            <div key={p.label}>
              <p className="font-display text-2xl font-bold tracking-display text-ink-hi md:text-3xl">
                {p.stat}
              </p>
              <p className="mt-1 text-xs font-medium text-ink-mid">{p.label}</p>
            </div>
          ))}
        </div>
        <p className="mt-4 text-sm text-ink-hi">
          There will always be zero servers behind this site. Every page is
          pre-built and served from the edge — nothing to hack, nothing to
          crash, nothing slowing you down. That&apos;s the architecture, not an
          accident.
        </p>
        <p className="mt-3 text-xs text-ink-low">
          Don&apos;t take our word for it — open DevTools and run Lighthouse on
          this page. That score is our baseline for client work.
        </p>
      </div>
      <div className="flex flex-wrap gap-2">
        {guaranteeChips.map((chip) => (
          <span
            key={chip}
            className="rounded-full border border-line bg-void-2 px-3 py-1.5 text-xs font-medium text-ink-mid"
          >
            {chip}
          </span>
        ))}
      </div>
    </div>
  );
}
