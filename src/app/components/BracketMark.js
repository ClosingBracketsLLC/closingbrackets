/**
 * The brand device: a geometric bracket pair, the closing stroke weighted in
 * violet. This is the ONLY place the bracket motif is drawn — every logo,
 * eyebrow tick, and accent renders through this component.
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
        d="M11 5H6v22h5"
        stroke="var(--text-low)"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M21 5h5v22h-5"
        stroke="var(--violet)"
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Small violet closing-bracket tick used by SectionHeading eyebrows. */
export function BracketTick({ className = "" }) {
  return (
    <span
      aria-hidden
      className={`font-display font-bold text-violet ${className}`}
    >
      ]
    </span>
  );
}
