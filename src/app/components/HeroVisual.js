import VisibilityGate from "./VisibilityGate";
import SwarmField from "./SwarmField";

/**
 * The hero backdrop: pure-CSS aurora + structural grid + grain (zero JS,
 * LCP-neutral), plus the cursor-reactive particle swarm. The swarm mounts
 * through VisibilityGate (in-view + idle + motion-safe) on every device —
 * it's a 2D canvas, no WebGL needed.
 */
export default function HeroVisual() {
  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden>
      <div className="aurora" />
      <div className="void-grid absolute inset-0" />
      <VisibilityGate className="absolute inset-0">
        <SwarmField />
      </VisibilityGate>
      <div className="grain" />
    </div>
  );
}
