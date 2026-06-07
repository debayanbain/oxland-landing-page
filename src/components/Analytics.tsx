import { motion } from "framer-motion";

const bars = [
  { label: "Acquisition progress", value: 82, color: "#2F5BFF" },
  { label: "Parcel coverage", value: 67, color: "#4F46E5" },
  { label: "Litigation resolved", value: 54, color: "#7C3AED" },
  { label: "Project growth", value: 91, color: "#A78BFA" },
];

const stats = [
  { k: "Projects", v: "15", d: "+2%" },
  { k: "Plots tracked", v: "120", d: "+5%" },
  { k: "Interested areas", v: "164", d: "+12%" },
];

const ease = [0.22, 1, 0.36, 1] as const;

function Donut() {
  const r = 52;
  const c = 2 * Math.PI * r;
  const pct = 0.72;
  return (
    <div className="relative grid place-items-center">
      <svg viewBox="0 0 140 140" className="h-40 w-40 -rotate-90">
        <circle cx="70" cy="70" r={r} fill="none" stroke="#EDEBFA" strokeWidth="14" />
        <motion.circle
          cx="70"
          cy="70"
          r={r}
          fill="none"
          stroke="url(#donutg)"
          strokeWidth="14"
          strokeLinecap="round"
          strokeDasharray={c}
          initial={{ strokeDashoffset: c }}
          whileInView={{ strokeDashoffset: c * (1 - pct) }}
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

export default function Analytics() {
  return (
    <div className="grid gap-6 lg:grid-cols-[1.3fr_1fr]">
      <div className="rounded-3xl border border-border bg-white/80 p-7 shadow-card backdrop-blur-sm sm:p-9">
        <div className="flex items-center justify-between">
          <h3 className="font-display text-lg font-bold text-brand-navy">Performance overview</h3>
          <span className="rounded-full bg-secondary px-3 py-1 text-[11px] font-semibold text-brand-indigo">
            Last 30 days
          </span>
        </div>
        <div className="mt-7 space-y-5">
          {bars.map((b, i) => (
            <div key={b.label}>
              <div className="mb-1.5 flex justify-between text-sm">
                <span className="font-medium text-brand-navy/70">{b.label}</span>
                <span className="font-semibold text-brand-navy">{b.value}%</span>
              </div>
              <div className="h-3 overflow-hidden rounded-full bg-secondary">
                <motion.div
                  className="h-full rounded-full"
                  style={{ background: b.color }}
                  initial={{ width: 0 }}
                  whileInView={{ width: `${b.value}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.1, delay: i * 0.12, ease }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-6">
        <div className="flex flex-1 items-center justify-center rounded-3xl border border-border bg-white/80 p-7 shadow-card backdrop-blur-sm">
          <Donut />
        </div>
        <div className="grid grid-cols-3 gap-3">
          {stats.map((s) => (
            <div key={s.k} className="rounded-2xl border border-border bg-white/80 p-4 text-center shadow-card backdrop-blur-sm">
              <div className="font-display text-2xl font-extrabold text-brand-navy">{s.v}</div>
              <div className="text-[10px] font-medium text-brand-navy/50">{s.k}</div>
              <div className="mt-0.5 text-[10px] font-semibold text-success">{s.d}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
