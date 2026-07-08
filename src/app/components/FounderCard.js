import { site } from "@/data/site";

/**
 * Trust fold: the real human behind the work, with direct contact routes.
 * Honest authority instead of fabricated testimonials.
 */
export default function FounderCard() {
  return (
    <div className="card flex h-full flex-col justify-between gap-6 p-7 md:p-8">
      <div>
        <div className="flex items-center gap-4">
          <span
            aria-hidden
            className="flex h-16 w-16 items-center justify-center rounded-2xl border border-violet/40 bg-void-2 font-display text-xl font-bold text-violet"
          >
            RC
          </span>
          <div>
            <p className="font-display text-lg font-semibold text-ink-hi">
              {site.founder}
            </p>
            <p className="text-sm text-ink-low">Founder · Engineer</p>
          </div>
        </div>
        <p className="mt-5 text-sm md:text-base">
          When you call Closing Brackets, you talk to the engineer — not an
          account manager. I scope it, I build it, and I answer for it. That&apos;s
          the whole model.
        </p>
      </div>
      <div className="flex flex-col gap-1.5">
        <a
          href={`tel:${site.phone}`}
          className="text-sm font-semibold text-violet hover:underline underline-offset-4"
        >
          {site.phoneDisplay}
        </a>
        <a
          href={`mailto:${site.email}`}
          className="text-sm font-semibold text-violet hover:underline underline-offset-4"
        >
          {site.email}
        </a>
        <p className="text-xs text-ink-low">
          {site.locality}, {site.region} · Replies within 1 business day
        </p>
      </div>
    </div>
  );
}
