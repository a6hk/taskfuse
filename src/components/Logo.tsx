/**
 * Circuit Breaker Logo for AgentGuard
 * Flat vector emblem of an electrical circuit breaker switch in the tripped position.
 * Drawn in amber #F5A524 with off-white #E6EDF3 detail lines on a transparent background.
 */

interface LogoProps {
  size?: number;
  showWordmark?: boolean;
}

export function CircuitBreakerEmblem({ size = 24 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="shrink-0"
      aria-hidden="true"
    >
      {/* Outer breaker housing outline */}
      <rect
        x="2.5"
        y="2.5"
        width="19"
        height="19"
        rx="3"
        stroke="#30363D"
        strokeWidth="1.5"
        fill="transparent"
      />
      
      {/* Top and bottom electrical terminal lines */}
      <line x1="12" y1="2.5" x2="12" y2="6.5" stroke="#E6EDF3" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="12" y1="17.5" x2="12" y2="21.5" stroke="#E6EDF3" strokeWidth="1.5" strokeLinecap="round" />
      
      {/* Pivot hinge point */}
      <circle cx="12" cy="14" r="1.5" fill="#E6EDF3" />
      
      {/* Breaker switch arm in tripped (angled OFF/TRIPPED) position */}
      <path
        d="M12 14L7.5 8"
        stroke="#F5A524"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      
      {/* Switch handle toggle tip */}
      <rect
        x="6"
        y="6.5"
        width="3"
        height="3"
        rx="0.75"
        fill="#F5A524"
      />
      
      {/* Trip indicator contact gap */}
      <circle cx="15.5" cy="8" r="1" fill="#E6EDF3" />
    </svg>
  );
}

export function Logo({ size = 24, showWordmark = true }: LogoProps) {
  return (
    <div className="flex items-center gap-2 sm:gap-2.5 select-none shrink-0 min-w-0">
      <CircuitBreakerEmblem size={size} />
      {showWordmark && (
        <span
          className="text-[#E6EDF3] tracking-tight font-semibold text-[17px] sm:text-[20px] shrink-0"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          Taskfuse
        </span>
      )}
    </div>
  );
}
