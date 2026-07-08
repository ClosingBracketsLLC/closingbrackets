import Link from "next/link";
import { engagements } from "@/data/engagements";
import Reveal from "./Reveal";
import { BracketTick } from "./BracketMark";

/** The three engagement models, rendered from the single data source. */
export default function EngagementCards() {
  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
      {engagements.map((e, i) => (
        <Reveal key={e.name} delay={i * 80} className="h-full">
          <div
            className={`card flex h-full flex-col p-8 ${
              e.featured ? "!border-violet shadow-glow-violet" : ""
            }`}
          >
            {e.featured ? (
              <span className="mb-4 self-start rounded-full border border-violet px-3 py-1 text-xs font-semibold uppercase tracking-wide text-violet">
                Most popular
              </span>
            ) : null}
            <h3 className="font-display text-2xl font-semibold tracking-display text-ink-hi">
              {e.name}
            </h3>
            <p className="mt-2 text-sm font-semibold text-violet">{e.price}</p>
            <p className="mt-4 text-base text-ink-hi">{e.tagline}</p>
            <p className="mt-3 text-sm">{e.body}</p>
            <ul className="mb-8 mt-6 flex flex-col gap-3">
              {e.points.map((p) => (
                <li key={p} className="flex items-start gap-2.5 text-sm">
                  <BracketTick className="mt-0.5" />
                  {p}
                </li>
              ))}
            </ul>
            <Link
              href="/contact"
              className={`mt-auto ${e.featured ? "btn-signal" : "btn-ghost"}`}
            >
              Get a proposal
            </Link>
          </div>
        </Reveal>
      ))}
    </div>
  );
}
