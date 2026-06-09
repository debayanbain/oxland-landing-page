import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  type MotionValue,
} from "framer-motion";
import {
  ArrowRight,
  ShieldCheck,
  MapPinned,
  Layers,
  Bell,
  Search,
  Activity,
  FileText,
  Settings,
  LayoutDashboard,
  Database,
  Map,
  BarChart3,
  Building2,
  ChevronDown,
  Download,
  RefreshCw,
  Plus,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import SplitText from "@/components/SplitText";
import Magnetic from "@/components/Magnetic";

/* ============================================================
   Cloud — soft, billowy SVG cloud rendered with CSS blur
   ============================================================ */

function Cloud({
  className,
  width = 420,
  blur = 1.5,
  opacity = 0.95,
  variant = 0,
  tint = "white",
}: {
  className?: string;
  width?: number;
  blur?: number;
  opacity?: number;
  variant?: 0 | 1 | 2 | 3;
  tint?: string;
}) {
  const src = (variant === 0 || variant === 2) ? "/cloud1.png" : "/cloud2.png";

  return (
    <div
      className={className}
      style={{
        width,
        filter: blur > 0 ? `blur(${blur}px)` : undefined,
        opacity,
        willChange: "transform, opacity",
      }}
    >
      <img
        src={src}
        alt=""
        aria-hidden
        className="block h-auto w-full select-none pointer-events-none"
        style={{
          mixBlendMode: "screen",
        }}
      />
    </div>
  );
}

/* ============================================================
   ScrollCloud — wraps a Cloud with scroll-driven motion
   ============================================================ */

function ScrollCloud({
  progress,
  fromX,
  toX,
  fromY = 0,
  toY = 0,
  fromOpacity = 1,
  toOpacity = 0,
  className,
  ...rest
}: React.ComponentProps<typeof Cloud> & {
  progress: MotionValue<number>;
  fromX: number;
  toX: number;
  fromY?: number;
  toY?: number;
  fromOpacity?: number;
  toOpacity?: number;
}) {
  const x = useTransform(progress, [0, 1], [fromX, toX]);
  const y = useTransform(progress, [0, 1], [fromY, toY]);
  const opacity = useTransform(progress, [0, 0.6, 1], [fromOpacity, fromOpacity * 0.75, toOpacity]);
  return (
    <motion.div className={`absolute ${className ?? ""}`} style={{ x, y, opacity }}>
      <Cloud {...rest} />
    </motion.div>
  );
}

/* ============================================================
   Dashboard mock — large, centered, matching the reference
   ============================================================ */

function DashboardMock() {
  return (
    <div className="relative mx-auto w-full max-w-[1080px] overflow-hidden rounded-[28px] border border-white/80 bg-white/95 shadow-[0_40px_120px_-30px_rgba(47,71,160,0.45),0_18px_50px_-20px_rgba(124,58,237,0.25)] backdrop-blur-2xl">
      {/* shimmer top edge */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/90 to-transparent" />

      <div className="flex">
        {/* SIDEBAR */}
        <aside className="relative hidden w-[200px] shrink-0 bg-gradient-to-b from-[#5046E5] via-[#4F46E5] to-[#6D28D9] p-4 sm:block">
          {/* logo */}
          <div className="flex items-center gap-2 px-1.5 pb-5 pt-1">
            <span className="grid h-8 w-8 place-items-center rounded-xl bg-white/15 ring-1 ring-white/20">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                <path d="M12 2C7.6 2 4 5.5 4 9.8c0 5.2 6.5 11.2 7.4 12a1 1 0 0 0 1.3 0c.9-.8 7.3-6.8 7.3-12C20 5.5 16.4 2 12 2Z" fill="white"/>
                <circle cx="12" cy="9.6" r="2.6" fill="#4F46E5"/>
              </svg>
            </span>
            <span className="font-display text-[15px] font-bold text-white tracking-tight">oxland</span>
          </div>

          <SideItem icon={LayoutDashboard} label="Dashboard" active />
          <SideItem icon={Database} label="Master Data" />
          <SideItem icon={Settings} label="Settings" />
          <SideItem icon={FileText} label="Menu List" />
          <SideItem icon={Map} label="Locations" />
          <SideItem icon={Layers} label="Projects" />
          <SideItem icon={BarChart3} label="Analytics" />
          <SideItem icon={MapPinned} label="Land Acquisition" />
          <SideItem icon={Building2} label="Plot Management" />

          {/* workspace card */}
          <div className="absolute inset-x-4 bottom-4 rounded-2xl border border-white/15 bg-white/10 p-2.5 backdrop-blur">
            <div className="flex items-center gap-2">
              <span className="grid h-7 w-7 place-items-center rounded-lg bg-white text-[9px] font-bold text-brand-indigo">TATA</span>
              <div className="leading-tight">
                <div className="text-[8.5px] font-medium text-white/70 uppercase tracking-wider">Workspace</div>
                <div className="text-[11px] font-bold text-white">TATA GROUP</div>
              </div>
            </div>
          </div>
        </aside>

        {/* MAIN */}
        <div className="min-w-0 flex-1">
          {/* top bar */}
          <div className="flex items-center justify-between gap-3 border-b border-slate-200/70 px-5 py-3.5">
            <div className="flex items-center gap-2 text-[12px] text-brand-navy/60">
              <span className="font-semibold text-brand-navy">Home</span>
              <span className="text-brand-navy/30">›</span>
              <span className="text-brand-indigo">Dashboard</span>
            </div>
            <div className="flex items-center gap-2.5">
              <div className="hidden items-center gap-1.5 rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 md:flex">
                <Search size={12} className="text-brand-navy/40" />
                <span className="text-[11px] text-brand-navy/40">Search reports, projects…</span>
              </div>
              <button className="grid h-8 w-8 place-items-center rounded-full bg-brand-indigo/10 text-brand-indigo">
                <Activity size={14} />
              </button>
              <button className="relative grid h-8 w-8 place-items-center rounded-full bg-slate-100 text-brand-navy/70">
                <Bell size={14} />
                <span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-rose-500" />
              </button>
              <div className="flex items-center gap-1 rounded-full bg-slate-100 py-1 pl-1 pr-2">
                <span className="grid h-6 w-6 place-items-center rounded-full bg-gradient-to-br from-brand-indigo to-brand-purple text-[9px] font-bold text-white">RK</span>
                <ChevronDown size={12} className="text-brand-navy/40" />
              </div>
            </div>
          </div>

          {/* body */}
          <div className="p-5">
            <div className="flex items-end justify-between gap-3">
              <div>
                <h3 className="font-display text-[18px] font-extrabold tracking-tight text-brand-navy">
                  Oxland — Land Management &amp; Insights
                </h3>
                <p className="mt-0.5 text-[11.5px] text-brand-navy/55">
                  Visualized to match your filters, projects overview, uploaded data, and map &amp; parcels.
                </p>
              </div>
              <div className="hidden items-center gap-2 md:flex">
                <button className="flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-2.5 py-1.5 text-[10.5px] font-semibold text-brand-navy/70">
                  Last 30 Days <ChevronDown size={11} />
                </button>
                <button className="flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-2.5 py-1.5 text-[10.5px] font-semibold text-brand-navy/70">
                  <Download size={11} /> Export PDF
                </button>
                <button className="flex items-center gap-1.5 rounded-full bg-brand-indigo px-2.5 py-1.5 text-[10.5px] font-semibold text-white shadow-soft">
                  <Plus size={11} /> New Project
                </button>
              </div>
            </div>

            {/* KPI cards */}
            <div className="mt-4 grid grid-cols-2 gap-2.5 md:grid-cols-4">
              <KpiCard label="No. of Projects" value="15" delta="+2%" tone="indigo" icon={FileText} />
              <KpiCard label="Total Plots" value="120" delta="+5%" tone="blue" icon={Layers} />
              <KpiCard label="Interested Areas" value="164" delta="+12%" tone="amber" icon={MapPinned} />
              <KpiCard label="Overall Cases" value="78" delta="−3%" tone="rose" icon={BarChart3} negative />
            </div>

            {/* charts row */}
            <div className="mt-3 grid grid-cols-1 gap-2.5 lg:grid-cols-[1.05fr_0.95fr_0.7fr]">
              {/* area-wise layers */}
              <div className="rounded-2xl border border-slate-200/80 bg-white p-3.5">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-[11px] font-bold text-brand-navy">Area-Wise Layers</div>
                  </div>
                  <button className="flex items-center gap-1 rounded-full border border-slate-200 px-2 py-0.5 text-[9.5px] font-semibold text-brand-navy/65">
                    Overall Projects <ChevronDown size={10} />
                  </button>
                </div>
                <div className="mt-3 space-y-2">
                  <BarRow label="States Layer" value={12} max={120} />
                  <BarRow label="Districts Layer" value={45} max={120} />
                  <BarRow label="Villages Layer" value={85} max={120} />
                  <BarRow label="Plot Layer" value={120} max={120} />
                </div>
                <div className="mt-3 text-[9px] text-brand-navy/45">
                  Shows number of layers at each stage used: Plot Layer → Village Layer
                </div>
              </div>

              {/* recent project preview / map */}
              <div className="rounded-2xl border border-slate-200/80 bg-white p-3.5">
                <div className="flex items-center justify-between">
                  <div className="text-[11px] font-bold text-brand-navy">Recent Project Preview</div>
                  <span className="text-[9.5px] font-semibold text-brand-indigo">Open ↗</span>
                </div>
                <div className="relative mt-2.5 h-[148px] overflow-hidden rounded-xl border border-slate-200/70 bg-gradient-to-br from-emerald-50 via-slate-50 to-indigo-50">
                  <svg viewBox="0 0 300 150" className="absolute inset-0 h-full w-full">
                    <defs>
                      <pattern id="map-grid" width="14" height="14" patternUnits="userSpaceOnUse">
                        <path d="M 14 0 L 0 0 0 14" fill="none" stroke="rgba(79,70,229,0.05)" strokeWidth="0.6" />
                      </pattern>
                    </defs>
                    <rect width="300" height="150" fill="url(#map-grid)" />
                    {/* river */}
                    <path d="M -10 60 C 60 50, 120 90, 180 75 S 310 50, 320 60" stroke="#7DD3FC" strokeWidth="6" fill="none" opacity="0.65" strokeLinecap="round" />
                    {/* roads */}
                    <path d="M 30 130 L 270 20" stroke="#FBBF24" strokeWidth="1.5" fill="none" opacity="0.5" />
                    <path d="M 0 100 L 300 110" stroke="#94A3B8" strokeWidth="1" fill="none" opacity="0.4" strokeDasharray="3 3" />
                    {/* parcel highlight */}
                    <polygon points="120,55 195,45 200,110 130,118" fill="rgba(220,38,38,0.18)" stroke="#DC2626" strokeWidth="1.4" />
                    <text x="148" y="86" fontSize="9" fontWeight="700" fill="#7F1D1D">Manger</text>
                    {/* pin */}
                    <g transform="translate(160 30)">
                      <circle r="4" fill="#4F46E5" />
                      <circle r="9" fill="#4F46E5" opacity="0.15" />
                    </g>
                  </svg>
                  <button className="absolute bottom-2 right-2 grid h-7 w-7 place-items-center rounded-full border border-white/80 bg-white/95 text-brand-navy/70 shadow-soft">
                    <Plus size={12} />
                  </button>
                </div>
              </div>

              {/* summary report */}
              <div className="rounded-2xl border border-slate-200/80 bg-white p-3.5">
                <div className="flex items-center justify-between">
                  <div className="text-[11px] font-bold text-brand-navy">Summary Report</div>
                  <span className="flex items-center gap-1 text-[9.5px] font-semibold text-brand-indigo">
                    <RefreshCw size={9} /> Refresh
                  </span>
                </div>
                <div className="mt-2 flex gap-1.5">
                  <span className="rounded-full bg-brand-indigo px-2 py-0.5 text-[9px] font-bold text-white">This Month</span>
                  <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[9px] font-semibold text-brand-navy/65">All Over</span>
                </div>
                {/* donut */}
                <div className="relative mx-auto mt-2 h-[100px] w-[100px]">
                  <svg viewBox="0 0 36 36" className="-rotate-90">
                    <circle cx="18" cy="18" r="15.9" fill="none" stroke="#EEF2FF" strokeWidth="3.5" />
                    <circle
                      cx="18" cy="18" r="15.9" fill="none"
                      stroke="#4F46E5" strokeWidth="3.5"
                      strokeDasharray="78 100" strokeLinecap="round"
                    />
                    <circle
                      cx="18" cy="18" r="15.9" fill="none"
                      stroke="#FBBF24" strokeWidth="3.5"
                      strokeDasharray="14 100" strokeDashoffset="-78" strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute inset-0 grid place-items-center">
                    <div className="text-center">
                      <div className="font-display text-[18px] font-extrabold text-brand-navy leading-none">78</div>
                      <div className="text-[8.5px] text-brand-navy/50 mt-0.5">Total Cases</div>
                    </div>
                  </div>
                </div>
                <div className="mt-2 rounded-xl border border-slate-100 bg-slate-50/60 p-2">
                  <div className="text-[8.5px] font-semibold uppercase tracking-wider text-brand-navy/45">My Assets</div>
                  <div className="mt-0.5 flex items-baseline gap-1">
                    <span className="font-display text-[15px] font-extrabold text-brand-navy">67</span>
                    <span className="text-[9.5px] font-semibold text-brand-navy/55">acres</span>
                  </div>
                </div>
              </div>
            </div>

            {/* trust strip */}
            <div className="mt-3 hidden items-center justify-between gap-2 rounded-2xl border border-slate-200/80 bg-gradient-to-r from-indigo-50/60 to-white px-4 py-2.5 md:flex">
              <TrustChip icon={ShieldCheck} title="Secure. Reliable. Always Up-to-date." subtitle="Your data is encrypted and backed up." />
              <Divider />
              <TrustChip badge="99.9%" title="Uptime Guarantee" />
              <Divider />
              <TrustChip badge="24/7" title="Customer Support" />
              <Divider />
              <TrustChip icon={ShieldCheck} title="Secure" subtitle="Data Protection" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function SideItem({
  icon: Icon,
  label,
  active,
}: {
  icon: any;
  label: string;
  active?: boolean;
}) {
  return (
    <div
      className={`mb-0.5 flex items-center gap-2 rounded-xl px-2.5 py-2 text-[11.5px] font-semibold transition-colors ${
        active ? "bg-white text-brand-indigo shadow-[0_2px_8px_-2px_rgba(0,0,0,0.12)]" : "text-white/85 hover:bg-white/10"
      }`}
    >
      <Icon size={13} strokeWidth={2.2} />
      <span className="truncate">{label}</span>
    </div>
  );
}

function KpiCard({
  label,
  value,
  delta,
  tone,
  icon: Icon,
  negative,
}: {
  label: string;
  value: string;
  delta: string;
  tone: "indigo" | "blue" | "amber" | "rose";
  icon: any;
  negative?: boolean;
}) {
  const tones: Record<string, string> = {
    indigo: "bg-indigo-50 text-brand-indigo",
    blue: "bg-blue-50 text-brand-blue",
    amber: "bg-amber-50 text-amber-600",
    rose: "bg-rose-50 text-rose-600",
  };
  return (
    <div className="rounded-2xl border border-slate-200/80 bg-white p-3">
      <div className="flex items-start justify-between">
        <div className="text-[10px] font-semibold uppercase tracking-wider text-brand-navy/45">{label}</div>
        <span className={`grid h-7 w-7 place-items-center rounded-lg ${tones[tone]}`}>
          <Icon size={13} strokeWidth={2.2} />
        </span>
      </div>
      <div className="mt-1 flex items-baseline gap-1.5">
        <span className="font-display text-[22px] font-extrabold leading-none text-brand-navy">{value}</span>
      </div>
      <div className={`mt-1 text-[10px] font-bold ${negative ? "text-rose-500" : "text-emerald-600"}`}>
        {delta} <span className="font-medium text-brand-navy/40">vs last 30d</span>
      </div>
    </div>
  );
}

function BarRow({ label, value, max }: { label: string; value: number; max: number }) {
  const pct = (value / max) * 100;
  return (
    <div>
      <div className="flex items-center justify-between text-[10px] font-semibold text-brand-navy/60">
        <span>{label}</span>
        <span className="text-brand-navy/80">{value}</span>
      </div>
      <div className="mt-1 h-2 w-full overflow-hidden rounded-full bg-slate-100">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${pct}%` }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="h-full rounded-full bg-gradient-to-r from-brand-blue to-brand-indigo"
        />
      </div>
    </div>
  );
}

function TrustChip({
  icon: Icon,
  badge,
  title,
  subtitle,
}: {
  icon?: any;
  badge?: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="flex items-center gap-2">
      {Icon ? (
        <span className="grid h-7 w-7 place-items-center rounded-lg bg-brand-indigo/10 text-brand-indigo">
          <Icon size={13} />
        </span>
      ) : badge ? (
        <span className="grid h-7 min-w-[28px] place-items-center rounded-lg bg-emerald-50 px-1.5 text-[10px] font-extrabold text-emerald-600">
          {badge}
        </span>
      ) : null}
      <div className="leading-tight">
        <div className="text-[10.5px] font-bold text-brand-navy">{title}</div>
        {subtitle && <div className="text-[9.5px] text-brand-navy/50">{subtitle}</div>}
      </div>
    </div>
  );
}

function Divider() {
  return <div className="h-7 w-px bg-slate-200" />;
}

/* ============================================================
   Hero — sky/cloud backdrop with scroll-driven cloud parting
   ============================================================ */

const TRUST = [
  "Enterprise Ready",
  "GIS Powered",
  "Secure Document Workflows",
  "Multi-Team Collaboration",
];

export default function Hero() {
  const ref = useRef<HTMLDivElement | null>(null);
  const reduce = useReducedMotion();

  // Track scroll from when hero enters viewport to when it has scrolled fully out
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Sun glow shrinks / fades
  const sunScale = useTransform(scrollYProgress, [0, 1], [1, 1.45]);
  const sunOpacity = useTransform(scrollYProgress, [0, 0.6, 1], [1, 0.55, 0]);

  // Dashboard scroll animation: starts 3D-tilted, flat early so it sits straight
  // by the time it lands in view. Tilt/scale finish at 18% scroll; only Y keeps moving.
  const rotateX = useTransform(scrollYProgress, [0, 0.5], [15, 0]);
  const dashScale = useTransform(scrollYProgress, [0, 0.5], [0.91, 1]);
  const dashY = useTransform(scrollYProgress, [0, 0.5], [-35, -120]);

  // Heading drifts up slightly
  const textY = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0.4]);

  // Land photo reveal — zooms in slightly as clouds part
  const landScale = useTransform(scrollYProgress, [0, 1], [1.08, 1.18]);
  const landOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.55, 0.85, 1]);

  return (
    <section
      ref={ref}
      className="relative isolate overflow-hidden pt-20 pb-0 lg:pt-24 lg:pb-2"
    >
      {/* ---------- SKY BACKDROP ---------- */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        {/* base gradient sky */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#EAF0FF] via-[#F4F1FF] to-white" />

        {/* aerial land photo (sits at bottom, revealed as clouds part) */}
        <motion.div
          className="absolute inset-x-0 bottom-0 h-[78%]"
          style={{
            scale: reduce ? 1.08 : landScale,
            opacity: reduce ? 0.7 : landOpacity,
            transformOrigin: "center bottom",
          }}
        >
          <img
            src="/hero.jpg"
            alt=""
            aria-hidden
            className="h-full w-full object-cover"
            style={{
              WebkitMaskImage:
                "linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.35) 22%, rgba(0,0,0,0.9) 55%, white 100%)",
              maskImage:
                "linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.35) 22%, rgba(0,0,0,0.9) 55%, white 100%)",
            }}
          />
          {/* tint to match brand */}
          <div className="absolute inset-0 bg-gradient-to-b from-white/60 via-transparent to-white/30 mix-blend-soft-light" />
        </motion.div>

        {/* sun / radial glow */}
        <motion.div
          className="absolute left-1/2 top-[-160px] h-[680px] w-[680px] -translate-x-1/2 rounded-full"
          style={{
            background:
              "radial-gradient(closest-side, rgba(255,240,210,0.95) 0%, rgba(255,225,180,0.55) 32%, rgba(167,139,250,0.18) 62%, transparent 75%)",
            scale: reduce ? 1 : sunScale,
            opacity: reduce ? 1 : sunOpacity,
          }}
        />
        {/* soft horizon tint over land photo */}
        <div className="absolute inset-x-0 bottom-0 h-[28%] bg-gradient-to-t from-white via-white/70 to-transparent" />
      </div>

      {/* ---------- CLOUDS (scroll-driven) ---------- */}
      {!reduce && (
        <div className="pointer-events-none absolute inset-0 -z-[5] overflow-hidden">
          {/* far layer — slow, deep */}
          <ScrollCloud
            progress={scrollYProgress}
            fromX={0}
            toX={-260}
            fromY={0}
            toY={40}
            fromOpacity={0.75}
            toOpacity={0}
            className="left-[-6%] top-[8%]"
            width={520}
            blur={6}
            opacity={0.7}
            variant={0}
          />
          <ScrollCloud
            progress={scrollYProgress}
            fromX={0}
            toX={300}
            fromY={0}
            toY={60}
            fromOpacity={0.8}
            toOpacity={0}
            className="right-[-8%] top-[4%]"
            width={560}
            blur={6}
            opacity={0.75}
            variant={1}
          />

          {/* mid layer — parting effect */}
          <ScrollCloud
            progress={scrollYProgress}
            fromX={0}
            toX={-460}
            fromY={0}
            toY={20}
            className="left-[2%] top-[24%]"
            width={420}
            blur={3}
            opacity={0.95}
            variant={2}
          />
          <ScrollCloud
            progress={scrollYProgress}
            fromX={0}
            toX={520}
            fromY={0}
            toY={30}
            className="right-[2%] top-[22%]"
            width={440}
            blur={3}
            opacity={0.95}
            variant={1}
          />

          {/* near layer — fast, crisp */}
          <ScrollCloud
            progress={scrollYProgress}
            fromX={0}
            toX={-700}
            fromY={0}
            toY={-20}
            className="left-[-4%] top-[44%]"
            width={360}
            blur={1.2}
            opacity={1}
            variant={3}
          />
          <ScrollCloud
            progress={scrollYProgress}
            fromX={0}
            toX={760}
            fromY={0}
            toY={-10}
            className="right-[-6%] top-[40%]"
            width={380}
            blur={1.2}
            opacity={1}
            variant={2}
          />

          {/* small accent clouds */}
          <ScrollCloud
            progress={scrollYProgress}
            fromX={0}
            toX={-220}
            fromY={0}
            toY={60}
            className="left-[18%] top-[58%]"
            width={220}
            blur={2}
            opacity={0.7}
            variant={3}
          />
          <ScrollCloud
            progress={scrollYProgress}
            fromX={0}
            toX={240}
            fromY={0}
            toY={80}
            className="right-[18%] top-[60%]"
            width={240}
            blur={2}
            opacity={0.7}
            variant={3}
          />
        </div>
      )}
      {reduce && (
        <div className="pointer-events-none absolute inset-0 -z-[5] overflow-hidden">
          <div className="absolute left-[-6%] top-[8%]"><Cloud width={520} blur={6} opacity={0.7} variant={0} /></div>
          <div className="absolute right-[-8%] top-[4%]"><Cloud width={560} blur={6} opacity={0.75} variant={1} /></div>
          <div className="absolute left-[2%] top-[24%]"><Cloud width={420} blur={3} opacity={0.95} variant={2} /></div>
          <div className="absolute right-[2%] top-[22%]"><Cloud width={440} blur={3} opacity={0.95} variant={1} /></div>
        </div>
      )}

      {/* ---------- CONTENT ---------- */}
      <div className="container relative">
        <motion.div
          className="mx-auto max-w-3xl text-center"
          style={reduce ? undefined : { y: textY, opacity: textOpacity }}
        >
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="inline-flex"
          >
            <Badge>
              <span className="h-1.5 w-1.5 rounded-full bg-brand-purple" />
              Built for Modern Land Operations
            </Badge>
          </motion.div>

          <SplitText
            as="h1"
            className="mt-6 font-display text-[40px] font-extrabold leading-[1.04] tracking-tight text-brand-navy sm:text-6xl lg:text-[68px]"
            parts={[
              { text: "The Operating System for " },
              { text: "Modern Land Acquisition", className: "text-gradient" },
              { text: " Teams." },
            ]}
            delay={0.2}
            stagger={0.06}
            duration={1.8}
            blur={16}
          />

          <SplitText
            as="p"
            className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-brand-navy/65"
            text="Centralize parcel intelligence, acquisitions, litigation tracking, document workflows, GIS data, approvals, and reporting in a single platform."
            delay={0.8}
            stagger={0.02}
            duration={1.4}
            blur={10}
          />

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.72, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="mt-8 flex flex-wrap items-center justify-center gap-3"
          >
            <Magnetic strength={0.2}>
              <Button size="lg" className="rounded-full">
                Try Free Demo <ArrowRight size={18} />
              </Button>
            </Magnetic>
            <Magnetic strength={0.15}>
              <Button variant="secondary" size="lg" className="rounded-full">
                Explore Platform
              </Button>
            </Magnetic>
          </motion.div>

          <motion.ul
            initial="hidden"
            animate="show"
            variants={{
              hidden: {},
              show: { transition: { staggerChildren: 0.08, delayChildren: 0.95 } },
            }}
            className="mx-auto mt-8 flex max-w-2xl flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm"
          >
            {/* {TRUST.map((t) => (
              <motion.li
                key={t}
                variants={{
                  hidden: { opacity: 0, y: 10, filter: "blur(6px)" },
                  show: {
                    opacity: 1,
                    y: 0,
                    filter: "blur(0px)",
                    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
                  },
                }}
                className="flex items-center gap-1.5 text-brand-navy/65"
              >
                <ShieldCheck size={14} className="text-brand-indigo" />
                {t}
              </motion.li>
            ))} */}
          </motion.ul>
        </motion.div>

        {/* ---------- DASHBOARD ---------- */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 1, ease: [0.22, 1, 0.36, 1] }}
          style={
            reduce
              ? undefined
              : {
                  y: dashY,
                  scale: dashScale,
                  rotateX,
                  transformPerspective: 1200,
                }
          }
          className="relative mt-16 sm:mt-24 lg:mt-18"
        >
          <DashboardMock />
        </motion.div>
      </div>
    </section>
  );
}
