/**
 * Hero Visual Component
 * Renders the dark monitoring console screen at a slight perspective angle:
 * Shows a jagged cost line climbing in muted gray (#8B949E) until it hits
 * a flat amber (#F5A524) threshold line and stops, on a near-black interface
 * with faint grid lines.
 */

export function HeroVisual() {
  return (
    <div className="w-full max-w-[560px] mx-auto select-none">
      {/* 3D perspective wrapper */}
      <div
        className="w-full rounded-[8px] border border-[#30363D] bg-[#161B22] overflow-hidden"
        style={{
          boxShadow: "0 0 0 1px #30363D",
          transform: "perspective(1000px) rotateY(-3deg) rotateX(2deg)",
          transition: "transform 300ms ease-out",
        }}
      >
        {/* Console Window Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-[#30363D] bg-[#0D1117]/80">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#30363D]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#30363D]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#30363D]" />
            <span className="ml-2 font-mono text-[12px] text-[#8B949E]">
              proxy.taskfuse.io/v1
            </span>
          </div>
          <div className="flex items-center gap-1.5 font-mono text-[11px] text-[#F5A524]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#F5A524] animate-pulse" />
            TASK CAP ACTIVE
          </div>
        </div>

        {/* Telemetry metadata row */}
        <div className="grid grid-cols-3 gap-2 px-4 py-2.5 border-b border-[#30363D] bg-[#161B22] font-mono text-[11px]">
          <div>
            <span className="text-[#8B949E] block">TASK_ID</span>
            <span className="text-[#E6EDF3] font-medium">#triage-9481</span>
          </div>
          <div>
            <span className="text-[#8B949E] block">RUNAWAY RETRIES</span>
            <span className="text-[#E6EDF3] font-medium">4 loops (38k tok)</span>
          </div>
          <div>
            <span className="text-[#8B949E] block">HARD BUDGET CAP</span>
            <span className="text-[#F5A524] font-medium">$4.00 max</span>
          </div>
        </div>

        {/* Chart Viewport */}
        <div className="p-4 bg-[#0D1117] relative">
          <svg
            viewBox="0 0 500 240"
            className="w-full h-auto overflow-visible"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Background Grid Lines */}
            <line x1="40" y1="30" x2="480" y2="30" stroke="#30363D" strokeWidth="1" strokeDasharray="3 3" />
            <line x1="40" y1="75" x2="480" y2="75" stroke="#30363D" strokeWidth="1" strokeDasharray="3 3" />
            <line x1="40" y1="120" x2="480" y2="120" stroke="#30363D" strokeWidth="1" strokeDasharray="3 3" />
            <line x1="40" y1="165" x2="480" y2="165" stroke="#30363D" strokeWidth="1" strokeDasharray="3 3" />
            <line x1="40" y1="210" x2="480" y2="210" stroke="#30363D" strokeWidth="1" />

            <line x1="120" y1="20" x2="120" y2="210" stroke="#30363D" strokeWidth="1" strokeDasharray="3 3" />
            <line x1="200" y1="20" x2="200" y2="210" stroke="#30363D" strokeWidth="1" strokeDasharray="3 3" />
            <line x1="280" y1="20" x2="280" y2="210" stroke="#30363D" strokeWidth="1" strokeDasharray="3 3" />
            <line x1="360" y1="20" x2="360" y2="210" stroke="#30363D" strokeWidth="1" strokeDasharray="3 3" />
            <line x1="440" y1="20" x2="440" y2="210" stroke="#30363D" strokeWidth="1" strokeDasharray="3 3" />

            {/* Y-Axis Value Labels */}
            <text x="32" y="34" fill="#8B949E" fontSize="10" fontFamily="monospace" textAnchor="end">$5.00</text>
            <text x="32" y="79" fill="#F5A524" fontSize="10" fontFamily="monospace" fontWeight="bold" textAnchor="end">$4.00</text>
            <text x="32" y="124" fill="#8B949E" fontSize="10" fontFamily="monospace" textAnchor="end">$3.00</text>
            <text x="32" y="169" fill="#8B949E" fontSize="10" fontFamily="monospace" textAnchor="end">$2.00</text>
            <text x="32" y="214" fill="#8B949E" fontSize="10" fontFamily="monospace" textAnchor="end">$0.00</text>

            {/* AMBER THRESHOLD LINE (at y=75 -> $4.00 threshold) */}
            <line
              x1="40"
              y1="75"
              x2="480"
              y2="75"
              stroke="#F5A524"
              strokeWidth="2"
            />
            {/* Amber Badge on threshold line */}
            <g transform="translate(330, 63)">
              <rect width="145" height="22" rx="4" fill="#F5A524" />
              <text
                x="72.5"
                y="15"
                fill="#0D1117"
                fontSize="10"
                fontFamily="monospace"
                fontWeight="700"
                textAnchor="middle"
              >
                BUDGET CAP: $4.00
              </text>
            </g>

            {/* Projected Runaway Line (faint dashed gray showing where spend would have reached without cap) */}
            <path
              d="M 285 75 L 340 38 L 420 10"
              stroke="#8B949E"
              strokeWidth="1.5"
              strokeDasharray="4 4"
              opacity="0.3"
            />
            <text x="430" y="15" fill="#8B949E" fontSize="9" fontFamily="monospace" opacity="0.5">
              Runaway bleed ($9.80+)
            </text>

            {/* JAGGED COST LINE IN MUTED GRAY (#8B949E) */}
            {/* Starts at 0, steps up through retries until it hits exactly $4.00 at x=285, then runs DEAD FLAT */}
            <path
              d="M 40 210 
                 L 80 195 
                 L 110 185 
                 L 135 155 
                 L 165 148 
                 L 190 115 
                 L 220 108 
                 L 255 82 
                 L 285 75 
                 L 480 75"
              stroke="#8B949E"
              strokeWidth="2.5"
              strokeLinejoin="round"
              strokeLinecap="round"
            />

            {/* Point of Cap Impact */}
            <circle cx="285" cy="75" r="5" fill="#F5A524" />
            <circle cx="285" cy="75" r="9" stroke="#F5A524" strokeWidth="1.5" opacity="0.5" />

            {/* Callout Indicator for Cap Trigger */}
            <g transform="translate(180, 20)">
              <rect x="0" y="0" width="135" height="24" rx="4" fill="#161B22" stroke="#30363D" strokeWidth="1" />
              <text x="67" y="16" fill="#E6EDF3" fontSize="9.5" fontFamily="monospace" textAnchor="middle">
                Cap Hit • Task Terminated
              </text>
            </g>
            <path d="M 245 44 L 280 68" stroke="#30363D" strokeWidth="1" strokeDasharray="2 2" />

            {/* X-Axis time labels */}
            <text x="40" y="230" fill="#8B949E" fontSize="9.5" fontFamily="monospace">00:00</text>
            <text x="135" y="230" fill="#8B949E" fontSize="9.5" fontFamily="monospace">01:10 (Retry 1)</text>
            <text x="240" y="230" fill="#8B949E" fontSize="9.5" fontFamily="monospace">02:45 (Retry 3)</text>
            <text x="420" y="230" fill="#8B949E" fontSize="9.5" fontFamily="monospace">04:00 (Cap)</text>
          </svg>
        </div>

        {/* Live Proxy Output Footer */}
        <div className="px-4 py-3 border-t border-[#30363D] bg-[#161B22] font-mono text-[12px] flex items-center justify-between">
          <div className="flex items-center gap-2 truncate">
            <span className="text-[#8B949E]">$</span>
            <span className="text-[#E6EDF3] truncate">
              HTTP 429: Task #triage-9481 halted at $4.00 cap
            </span>
          </div>
          <span className="text-[#8B949E] text-[11px] shrink-0">
            0ms added
          </span>
        </div>
      </div>
    </div>
  );
}
