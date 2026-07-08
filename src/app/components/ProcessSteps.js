import { processSteps } from "@/data/process";
import Reveal from "./Reveal";
import { BracketTick } from "./BracketMark";

/**
 * The four-stage process, rendered from the single data source.
 * `compact` = home-page strip; full = /process cards with deliverables.
 */
export default function ProcessSteps({ compact = false }) {
  if (compact) {
    return (
      <ol className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {processSteps.map((step, i) => (
          <li key={step.n}>
            <Reveal delay={i * 80} className="h-full">
              <div className="card h-full p-6">
                <span className="font-display text-sm font-bold text-violet">
                  {step.n}
                </span>
                <h3 className="mt-3 font-display text-lg font-semibold text-ink-hi">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm">{step.body}</p>
                <p className="mt-4 text-xs font-semibold text-ink-low">
                  {step.timeframe}
                </p>
              </div>
            </Reveal>
          </li>
        ))}
      </ol>
    );
  }

  return (
    <ol className="flex flex-col gap-6">
      {processSteps.map((step) => (
        <li key={step.n}>
          <Reveal>
            <div className="card flex flex-col gap-8 p-8 md:flex-row md:p-12">
              <div className="md:w-1/2">
                <span className="font-display text-3xl font-bold text-violet">
                  {step.n}
                </span>
                <h3 className="mt-4 font-display text-2xl font-semibold tracking-display text-ink-hi md:text-3xl">
                  {step.title}
                </h3>
                <p className="mt-4 max-w-md text-base">{step.body}</p>
                <p className="mt-6 text-sm font-semibold text-ink-hi">
                  <span className="text-ink-low">Timeframe: </span>
                  {step.timeframe}
                </p>
              </div>
              <div className="md:w-1/2">
                <p className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-ink-low">
                  What you get
                </p>
                <ul className="flex flex-col gap-3">
                  {step.deliverables.map((d) => (
                    <li key={d} className="flex items-start gap-3 text-base">
                      <BracketTick className="mt-0.5" />
                      {d}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>
        </li>
      ))}
    </ol>
  );
}
