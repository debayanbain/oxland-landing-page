import { motion } from "framer-motion";

const ease = [0.22, 1, 0.36, 1] as const;

// ── Area chart constants ──────────────────────────────────────────────────────
const W = 276, H = 120;
const PL = 30, PR = 8, PT = 10, PB = 28;
const CW = W - PL - PR;
const CH = H - PT - PB;
const YMIN = 20, YMAX = 100;
const gridYs = [40, 60, 80, 100];
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];

const series = [
  { label: "Acquisitions", values: [42, 58, 51, 72, 68, 82], color: "#2F5BFF" },
  { label: "Parcels", values: [30, 35, 47, 52, 60, 67], color: "#7C3AED" },
];

function toCoords(values: number[]): [number, number][] {
  return values.map((v, i) => [
    PL + (i / (values.length - 1)) * CW,
    PT + (1 - (v - YMIN) / (YMAX - YMIN)) * CH,
  ]);
}

function curvePath(pts: [number, number][]): string {
  if (pts.length === 0) return "";
  return pts.reduce((d, [x, y], i) => {
    if (i === 0) return `M ${x.toFixed(1)} ${y.toFixed(1)}`;
    const [px, py] = pts[i - 1];
    const cpx = ((px + x) / 2).toFixed(1);
    return `${d} C ${cpx} ${py.toFixed(1)} ${cpx} ${y.toFixed(1)} ${x.toFixed(1)} ${y.toFixed(1)}`;
  }, "");
}

function fillPath(pts: [number, number][], bottom: number): string {
  const line = curvePath(pts);
  const last = pts[pts.length - 1];
  const first = pts[0];
  return `${line} L ${last[0].toFixed(1)} ${bottom.toFixed(1)} L ${first[0].toFixed(1)} ${bottom.toFixed(1)} Z`;
}

// ── Sparkline ─────────────────────────────────────────────────────────────────
function Sparkline({ values, color }: { values: number[]; color: string }) {
  const min = Math.min(...values);
  const max = Math.max(...values);
  const sw = 60, sh = 18;
  const pts: [number, number][] = values.map((v, i) => [
    (i / (values.length - 1)) * sw,
    sh - ((v - min) / (max - min || 1)) * sh * 0.85,
  ]);
  return (
    <svg viewBox={`0 0 ${sw} ${sh}`} className="w-full h-[18px]" preserveAspectRatio="xMidYMid meet">
      <motion.path
        d={curvePath(pts)}
        fill="none"
        stroke={color}
        strokeWidth="1.8"
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        whileInView={{ pathLength: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.1, ease }}
      />
    </svg>
  );
}

// ── Donut ─────────────────────────────────────────────────────────────────────
function Donut() {
  const r = 52;
  const c = 2 * Math.PI * r;
  return (
    <div className="relative grid place-items-center">
      <svg viewBox="0 0 140 140" className="h-40 w-40 -rotate-90">
        <circle cx="70" cy="70" r={r} fill="none" stroke="#EDEBFA" strokeWidth="14" />
        <motion.circle
          cx="70" cy="70" r={r}
          fill="none"
          stroke="url(#donutg)"
          strokeWidth="14"
          strokeLinecap="round"
          strokeDasharray={c}
          initial={{ strokeDashoffset: c }}
          whileInView={{ strokeDashoffset: c * 0.28 }}
          viewport={{ once: true }}
          transition={{ duration: 1.3, ease }}
        />
        <defs>
          <linearGradient id="donutg" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#2F5BFF" />
            <stop offset="100%" stopColor="#7C3AED" />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute text-center">
        <div className="font-display text-3xl font-extrabold text-brand-navy">72%</div>
        <div className="text-[11px] font-medium text-brand-navy/50">Portfolio health</div>
      </div>
    </div>
  );
}

// ── Stat cards ────────────────────────────────────────────────────────────────
const stats = [
  { k: "Projects", v: "15", d: "+2%", spark: [9, 10, 11, 11, 12, 13, 15], color: "#2F5BFF" },
  { k: "Plots", v: "120", d: "+5%", spark: [95, 100, 103, 108, 112, 118, 120], color: "#4F46E5" },
  { k: "Areas", v: "164", d: "+12%", spark: [120, 130, 140, 148, 156, 161, 164], color: "#7C3AED" },
];

// ── Main ──────────────────────────────────────────────────────────────────────
export default function Analytics() {
  return (
    <div className="grid gap-6 lg:grid-cols-[1.3fr_1fr]">

      {/* Left — area/line chart */}
      <div className="rounded-3xl border border-border bg-white/80 p-7 shadow-card backdrop-blur-sm sm:p-9">
        <div className="flex items-center justify-between">
          <h3 className="font-display text-lg font-bold text-brand-navy">Portfolio Growth</h3>
          <div className="flex items-center gap-3">
            {series.map((s) => (
              <div key={s.label} className="flex items-center gap-1.5">
                <div className="h-2 w-2 rounded-full" style={{ background: s.color }} />
                <span className="text-[11px] font-medium text-brand-navy/60">{s.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-5">
          <svg viewBox={`0 0 ${W} ${H}`} className="w-full">
            {/* grid */}
            {gridYs.map((y) => {
              const yc = PT + (1 - (y - YMIN) / (YMAX - YMIN)) * CH;
              return (
                <g key={y}>
                  <line
                    x1={PL} x2={W - PR} y1={yc} y2={yc}
                    stroke="#E2E8F0" strokeWidth="0.5" strokeDasharray="2 3"
                  />
                  <text x={PL - 5} y={yc + 3} textAnchor="end" fontSize="7" fill="#94A3B8" fontFamily="system-ui">
                    {y}
                  </text>
                </g>
              );
            })}

            {/* x labels */}
            {months.map((m, i) => (
              <text
                key={m}
                x={PL + (i / (months.length - 1)) * CW}
                y={H - 6}
                textAnchor="middle"
                fontSize="7"
                fill="#94A3B8"
                fontFamily="system-ui"
              >
                {m}
              </text>
            ))}

            {/* series */}
            {series.map((s, si) => {
              const pts = toCoords(s.values);
              const gradId = `af${si}`;
              return (
                <g key={s.label}>
                  <defs>
                    <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor={s.color} stopOpacity="0.22" />
                      <stop offset="100%" stopColor={s.color} stopOpacity="0.01" />
                    </linearGradient>
                  </defs>
                  <motion.path
                    d={fillPath(pts, PT + CH)}
                    fill={`url(#${gradId})`}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, delay: si * 0.2, ease }}
                  />
                  <motion.path
                    d={curvePath(pts)}
                    fill="none"
                    stroke={s.color}
                    strokeWidth="2"
                    strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.4, delay: si * 0.15, ease }}
                  />
                  <motion.circle
                    cx={pts[pts.length - 1][0]}
                    cy={pts[pts.length - 1][1]}
                    r="3.5"
                    fill="white"
                    stroke={s.color}
                    strokeWidth="2"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: si * 0.15 + 1.3, ease }}
                  />
                </g>
              );
            })}
          </svg>
        </div>
      </div>

      {/* Right */}
      <div className="flex flex-col gap-6">
        {/* donut */}
        <div className="flex flex-1 items-center justify-center rounded-3xl border border-border bg-white/80 p-7 shadow-card backdrop-blur-sm">
          <Donut />
        </div>

        {/* stat cards with sparklines */}
        <div className="grid grid-cols-3 gap-3">
          {stats.map((s) => (
            <div key={s.k} className="rounded-2xl border border-border bg-white/80 p-4 text-center shadow-card backdrop-blur-sm">
              <div className="font-display text-2xl font-extrabold text-brand-navy">{s.v}</div>
              <div className="my-1.5">
                <Sparkline values={s.spark} color={s.color} />
              </div>
              <div className="text-[10px] font-medium text-brand-navy/50">{s.k}</div>
              <div className="mt-0.5 text-[10px] font-semibold text-success">{s.d}</div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
