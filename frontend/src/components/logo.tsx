// Original mark for FreelanceTrail: a compass needle in a ring — the literal "Trail" as
// a journey/waypoint, with the needle pointing to a verified direction. Built from
// scratch, not modeled on any other brand's mark.
export function Logo({ size = 34, className }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ filter: 'drop-shadow(0 0 3px var(--accent)) drop-shadow(0 0 7px var(--accent-2))' }}
      aria-hidden
    >
      <defs>
        <linearGradient id="ft-logo-gradient" x1="4" y1="27" x2="28" y2="5" gradientUnits="userSpaceOnUse">
          <stop stopColor="var(--accent)" />
          <stop offset="1" stopColor="var(--accent-2)" />
        </linearGradient>
      </defs>

      <circle cx="16" cy="16" r="12.5" stroke="url(#ft-logo-gradient)" strokeWidth="2.5" />

      <path d="M16 6 L21 16 L16 16 Z" fill="url(#ft-logo-gradient)" />
      <path d="M16 26 L11 16 L16 16 Z" fill="var(--foreground)" opacity="0.5" />

      <circle cx="16" cy="16" r="1.8" fill="var(--background)" />
    </svg>
  );
}
