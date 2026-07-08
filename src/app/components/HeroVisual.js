import VisibilityGate from "./VisibilityGate";
import ParticleField from "./ParticleField";
import { Hero3D } from "./three/Lazy3D";

/**
 * The hero backdrop, layered by capability:
 *  - always: pure-CSS aurora + structural grid + grain (zero JS, LCP-neutral)
 *  - desktop + WebGL + motion-safe: the 3D curly-brace scene (lazy chunk)
 *  - smaller screens: the 2 KB canvas particle field instead
 * Gates open on idle after the section is in view, so first paint is never taxed.
 */
export default function HeroVisual() {
  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden>
      <div className="aurora" />
      <div className="void-grid absolute inset-0" />
      <VisibilityGate minWidth={768} needsWebGL className="absolute inset-0">
        <Hero3D />
      </VisibilityGate>
      <VisibilityGate maxWidth={767} className="absolute inset-0">
        <ParticleField />
      </VisibilityGate>
      <div className="grain" />
    </div>
  );
}
