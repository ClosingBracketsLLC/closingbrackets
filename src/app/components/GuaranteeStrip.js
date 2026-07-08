import { guarantees } from "@/data/differentiators";
import Reveal from "./Reveal";

/** The six guarantees, rendered from the single data source. */
export default function GuaranteeStrip() {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {guarantees.map((g, i) => (
        <Reveal key={g.title} delay={(i % 3) * 80} className="h-full">
          <div className="card h-full p-7">
            <h3 className="font-display text-lg font-semibold text-ink-hi">
              {g.title}
            </h3>
            <p className="mt-2.5 text-sm">{g.body}</p>
          </div>
        </Reveal>
      ))}
    </div>
  );
}
