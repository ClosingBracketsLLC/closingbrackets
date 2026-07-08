import VisibilityGate from "./VisibilityGate";
import ParticleField from "./ParticleField";

/**
 * The hero backdrop: pure-CSS aurora + grain + structural grid (zero JS,
 * LCP-neutral), with a tiny canvas particle layer mounted lazily behind a
 * VisibilityGate so it never competes with first paint.
 */
export default function HeroVisual() {
  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden>
      <div className="aurora" />
      <div className="void-grid absolute inset-0" />
      <VisibilityGate className="absolute inset-0">
        <ParticleField />
      </VisibilityGate>
      <div className="grain" />
    </div>
  );
}
