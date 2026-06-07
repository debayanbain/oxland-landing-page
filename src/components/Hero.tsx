import { motion } from "framer-motion";
import {
  MapPinned,
  Scale,
  LayoutGrid,
  FileStack,
  Layers,
  Handshake,
  ArrowRight,
  TrendingUp,
  ShieldCheck,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const TRUST = [
  "Enterprise Ready",
  "GIS Powered",
  "Secure Document Workflows",
  "Multi-Team Collaboration",
];

const ring1 = [
  { icon: Handshake, label: "Acquisition", angle: 0, glow: "rgba(245, 158, 11, 0.4)", textColor: "text-amber-500" },
  { icon: Layers, label: "GIS Layers", angle: 120, glow: "rgba(16, 185, 129, 0.4)", textColor: "text-emerald-500" },
  { icon: FileStack, label: "Uploads", angle: 240, glow: "rgba(6, 182, 212, 0.4)", textColor: "text-cyan-500" },
];
const ring2 = [
  { icon: MapPinned, label: "Parcels", angle: 60, glow: "rgba(47, 91, 255, 0.4)", textColor: "text-blue-500" },
  { icon: Scale, label: "Litigation", angle: 180, glow: "rgba(124, 58, 237, 0.4)", textColor: "text-purple-500" },
  { icon: LayoutGrid, label: "Plot Mgmt", angle: 300, glow: "rgba(236, 72, 153, 0.4)", textColor: "text-rose-500" },
];

function OrbitNode({
  icon: Icon,
  label,
  angle,
  radius,
  spin,
  counter,
  glow,
  textColor,
}: {
  icon: any;
  label: string;
  angle: number;
  radius: number;
  spin: string;
  counter: "normal" | "reverse";
  glow: string;
  textColor: string;
}) {
  const rad = (angle * Math.PI) / 180;
  const x = Math.round(radius * Math.sin(rad));
  const y = Math.round(-radius * Math.cos(rad));
  return (
    <div
      className="absolute left-1/2 top-1/2"
      style={{
        transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
      }}
    >
      {/* counter-rotate (opposite to the ring) so the card stays upright */}
      <div style={{ animation: `orbit ${spin} linear infinite ${counter}` }}>
        <div className="flex flex-col items-center gap-1.5">
          <div
            className={`grid h-12 w-12 place-items-center rounded-2xl border border-white/70 bg-white/80 ${textColor} backdrop-blur-md transition-all duration-300 hover:scale-110`}
            style={{
              boxShadow: `0 8px 20px -4px ${glow}, inset 0 1px 0 rgba(255,255,255,0.6)`,
            }}
          >
            <Icon size={20} strokeWidth={2.2} />
          </div>
          <span className="inline-block rounded-full bg-white/85 px-2.5 py-0.5 text-[10px] font-bold text-brand-navy/80 shadow-sm backdrop-blur-sm border border-white/50 whitespace-nowrap select-none">
            {label}
          </span>
        </div>
      </div>
    </div>
  );
}

function FloatingKPI({
  value,
  label,
  className,
  delay,
  accent,
}: {
  value: string;
  label: string;
  className: string;
  delay: number;
  accent?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay, type: "spring", stiffness: 120, damping: 14 }}
      whileHover={{ y: -6, scale: 1.04 }}
      className={`absolute z-20 ${className}`}
    >
      <div className="animate-float rounded-2xl border border-white/70 bg-white/80 px-4 py-3 shadow-float backdrop-blur-xl">
        <div className={`font-display text-xl font-bold ${accent ?? "text-brand-navy"}`}>
          {value}
        </div>
        <div className="text-[11px] font-medium text-brand-navy/55">{label}</div>
      </div>
    </motion.div>
  );
}

function DashboardMock() {
  return (
    <div className="w-[230px] rounded-[22px] border border-white/80 bg-white/85 p-3.5 shadow-float backdrop-blur-2xl transition-all duration-300 hover:shadow-2xl">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-brand-indigo/10 pb-2">
        <div className="flex items-center gap-1.5">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="text-[10.5px] font-bold text-brand-navy tracking-tight select-none">Acquisition Hub</span>
        </div>
        <span className="rounded-full bg-emerald-50 px-1.5 py-0.5 text-[8.5px] font-bold text-emerald-600 border border-emerald-100 select-none">
          Live Sync
        </span>
      </div>

      {/* Progress & Stats Row */}
      <div className="mt-3 flex items-center justify-between gap-2">
        <div>
          <div className="text-[9px] font-semibold text-brand-navy/45 uppercase tracking-wider select-none">Acquired Area</div>
          <div className="font-display text-base font-extrabold text-brand-navy tracking-tight leading-none mt-1">
            3,840 <span className="text-[10px] font-medium text-brand-navy/60">Ha</span>
          </div>
          <div className="mt-1 flex items-center gap-1 text-[9px] font-bold text-emerald-600 select-none">
            <span>+12.4%</span>
            <span className="text-brand-navy/40 font-medium">this month</span>
          </div>
        </div>

        {/* Circular Progress Ring */}
        <div className="relative flex items-center justify-center h-11 w-11 select-none">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
            <path
              className="text-brand-indigo/10"
              strokeWidth="3"
              stroke="currentColor"
              fill="none"
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            />
            <path
              className="text-brand-indigo"
              strokeDasharray="82, 100"
              strokeWidth="3"
              strokeLinecap="round"
              stroke="currentColor"
              fill="none"
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            />
          </svg>
          <div className="absolute text-[9px] font-black text-brand-indigo">82%</div>
        </div>
      </div>

      {/* SVG Map Section */}
      <div className="mt-3.5 overflow-hidden rounded-xl border border-brand-indigo/10 bg-slate-50/50">
        <div className="flex items-center justify-between bg-slate-100/80 px-2 py-1 border-b border-brand-indigo/5 select-none">
          <span className="text-[9px] font-bold text-brand-navy/70">Parcel Workspace</span>
          <Layers size={9} className="text-brand-indigo" />
        </div>
        <div className="relative h-16 bg-gradient-to-br from-indigo-50/30 to-violet-50/30 p-1">
          <svg viewBox="0 0 200 80" className="h-full w-full">
            {/* Grid Pattern Background */}
            <defs>
              <pattern id="grid-mini" width="10" height="10" patternUnits="userSpaceOnUse">
                <path d="M 10 0 L 0 0 0 10" fill="none" stroke="rgba(79,70,229,0.04)" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="200" height="80" fill="url(#grid-mini)" />

            {/* Parcel P-01 (Acquired) */}
            <polygon
              points="15,45 25,15 85,20 75,55"
              className="fill-emerald-500/10 stroke-emerald-500 stroke-[1.2] transition-colors"
            />
            <text x="45" y="38" className="text-[8px] font-bold fill-emerald-700/80 text-center select-none" pointerEvents="none">
              P-01
            </text>

            {/* Parcel P-02 (Acquired) */}
            <polygon
              points="85,20 145,15 135,50 75,55"
              className="fill-emerald-500/10 stroke-emerald-500 stroke-[1.2] transition-colors"
            />
            <text x="105" y="38" className="text-[8px] font-bold fill-emerald-700/80 text-center select-none" pointerEvents="none">
              P-02
            </text>

            {/* Parcel P-03 (Acquiring) */}
            <polygon
              points="145,15 185,30 175,65 135,50"
              className="fill-amber-500/8 stroke-amber-500 stroke-[1.2] transition-colors"
              style={{ strokeDasharray: "3 2" }}
            />
            <text x="156" y="44" className="text-[8px] font-bold fill-amber-700/80 text-center select-none" pointerEvents="none">
              P-03
            </text>
          </svg>
        </div>
      </div>

      {/* Spent / Budget Footer */}
      <div className="mt-3">
        <div className="flex justify-between items-center text-[9px] font-bold text-brand-navy/60 select-none">
          <span>Spent ₹1.8Cr</span>
          <span className="text-brand-navy/40">Budget ₹2.5Cr</span>
        </div>
        <div className="mt-1 h-1.5 w-full rounded-full bg-slate-100 overflow-hidden border border-slate-200/50">
          <div className="h-full rounded-full bg-brand-indigo" style={{ width: "72%" }} />
        </div>
      </div>
    </div>
  );
}

export default function Hero() {
  const reveal = {
    hidden: { opacity: 0, y: 24 },
    show: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: 0.1 + i * 0.09, duration: 0.7, ease: [0.22, 1, 0.36, 1] },
    }),
  };

  return (
    <section className="relative pt-24 pb-12 lg:pt-28 lg:pb-16">
      <div className="container grid items-center gap-16 lg:grid-cols-[1.05fr_0.95fr]">
        {/* LEFT — marketing */}
        <div className="max-w-xl">
          <motion.div variants={reveal} custom={0} initial="hidden" animate="show">
            <Badge>
              <span className="h-1.5 w-1.5 rounded-full bg-brand-purple" />
              Built for Modern Land Operations
            </Badge>
          </motion.div>

          <motion.h1
            variants={reveal}
            custom={1}
            initial="hidden"
            animate="show"
            className="mt-6 font-display text-[44px] font-extrabold leading-[1.04] tracking-tight text-brand-navy sm:text-6xl"
          >
            The Operating System for{" "}
            <span className="text-gradient">Modern Land Acquisition</span> Teams.
          </motion.h1>

          <motion.p
            variants={reveal}
            custom={2}
            initial="hidden"
            animate="show"
            className="mt-6 text-lg leading-relaxed text-brand-navy/65"
          >
            Centralize parcel intelligence, acquisitions, litigation tracking, document
            workflows, GIS data, approvals, and reporting in a single platform.
          </motion.p>

          <motion.div
            variants={reveal}
            custom={3}
            initial="hidden"
            animate="show"
            className="mt-8 flex flex-wrap items-center gap-3"
          >
            <Button size="lg">
              Book a Demo <ArrowRight size={18} />
            </Button>
            <Button variant="secondary" size="lg">
              Explore Platform
            </Button>
          </motion.div>

          <motion.ul
            variants={reveal}
            custom={4}
            initial="hidden"
            animate="show"
            className="mt-9 grid grid-cols-2 gap-y-3 gap-x-4 text-sm"
          >
            {TRUST.map((t) => (
              <li key={t} className="flex items-center gap-2 text-brand-navy/70">
                <ShieldCheck size={16} className="text-brand-indigo" />
                {t}
              </li>
            ))}
          </motion.ul>
        </div>

        {/* RIGHT — ecosystem */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          className="relative mx-auto aspect-square w-full max-w-[520px] scale-[0.7] sm:scale-100 origin-center"
        >
          {/* radial glow */}
          <div className="absolute inset-0 rounded-full bg-[radial-gradient(closest-side,rgba(124,58,237,0.16),transparent)]" />

          {/* data-flow signal lines */}
          <svg
            viewBox="0 0 520 520"
            className="absolute inset-0 h-full w-full"
            aria-hidden="true"
          >
            {[
              "M260 260 L120 120",
              "M260 260 L400 130",
              "M260 260 L150 400",
              "M260 260 L410 380",
            ].map((d, i) => (
              <g key={i}>
                <path d={d} stroke="rgba(79,70,229,0.14)" strokeWidth="1.5" fill="none" />
                <path
                  d={d}
                  stroke="#4F46E5"
                  strokeWidth="2"
                  fill="none"
                  strokeLinecap="round"
                  strokeDasharray="6 200"
                  className="animate-dash-flow"
                  style={{ animationDelay: `${i * 0.5}s` }}
                />
              </g>
            ))}
          </svg>

          {/* orbit rings */}
          <div className="absolute left-1/2 top-1/2 h-[480px] w-[480px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-brand-indigo/12" />
          <div className="absolute left-1/2 top-1/2 h-[310px] w-[310px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-brand-indigo/15" />

          {/* ring 1 — clockwise */}
          <div
            className="absolute left-1/2 top-1/2 h-0 w-0"
            style={{ animation: "orbit 30s linear infinite" }}
          >
            {ring1.map((n) => (
              <OrbitNode key={n.label} {...n} radius={240} spin="30s" counter="reverse" />
            ))}
          </div>

          {/* ring 2 — counter-clockwise */}
          <div
            className="absolute left-1/2 top-1/2 h-0 w-0"
            style={{ animation: "orbit 22s linear infinite reverse" }}
          >
            {ring2.map((n) => (
              <OrbitNode key={n.label} {...n} radius={155} spin="22s" counter="normal" />
            ))}
          </div>

          {/* center dashboard */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <DashboardMock />
          </div>

          {/* floating KPI cards */}
          <FloatingKPI value="120" label="Parcels managed" className="left-[-6%] top-[12%]" delay={0.7} accent="text-brand-blue" />
          <FloatingKPI value="95%" label="Faster doc retrieval" className="right-[-4%] top-[6%]" delay={0.9} accent="text-brand-purple" />
          <FloatingKPI value="78" label="Active cases" className="bottom-[10%] right-[-6%]" delay={1.1} accent="text-brand-indigo" />
        </motion.div>
      </div>
    </section>
  );
}
