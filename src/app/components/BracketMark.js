/**
 * The brand device: a curly-brace pair, the closing brace weighted in violet.
 * This is the ONLY place the brace motif is drawn — every logo, eyebrow tick,
 * and accent renders through this component (the 3D scenes trace the same
 * curves in TubeGeometry).
 */
export default function BracketMark({ size = 28, className = "" }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      className={className}
      aria-hidden
    >
      <path
        d="M12.5 4C9.5 4 9 5.5 9 8v4c0 2.5-1 3.5-3 4 2 .5 3 1.5 3 4v4c0 2.5.5 4 3.5 4"
        stroke="var(--text-low)"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M19.5 4c3 0 3.5 1.5 3.5 4v4c0 2.5 1 3.5 3 4-2 .5-3 1.5-3 4v4c0 2.5-.5 4-3.5 4"
        stroke="var(--violet)"
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Small violet closing-brace tick used as a list bullet. */
export function BracketTick({ className = "" }) {
  return (
    <span
      aria-hidden
      className={`font-display font-bold text-violet ${className}`}
    >
      {"}"}
    </span>
  );
}

/** Eyebrow wrapper: renders its children inside a violet curly-brace pair. */
export function BracePair({ children, className = "" }) {
  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <span aria-hidden className="font-display font-bold text-violet">
        {"{"}
      </span>
      {children}
      <span aria-hidden className="font-display font-bold text-violet">
        {"}"}
      </span>
    </span>
  );
}
