import { useRef, useState, useEffect } from "react";
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
  FileText,
  Database,
  Map,
  Download,
  RefreshCw,
  Plus,
  Home,
  FolderKanban,
  MapPin,
  BookOpen,
  Landmark,
  Briefcase,
  Upload,
  Network,
  LayoutGrid,
  Search,
  Bell,
  Mic,
  Sparkles,
  Info,
  Maximize2,
  UserCheck,
  Folder,
  ChevronDown,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
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
  const src = (variant === 0 || variant === 2) ? "/cloud1.webp" : "/cloud2.png";

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
   Dashboard mock — light-themed, brand-matched, interactive
   ============================================================ */

const PIPELINE = [
  { label: "Identified",        value: 147, max: 350, gradient: "from-brand-blue to-brand-indigo",    status: "Active",      statusCls: "bg-indigo-50 text-brand-indigo" },
  { label: "Under Negotiation", value: 98,  max: 350, gradient: "from-brand-indigo to-brand-purple",  status: "In Progress", statusCls: "bg-amber-50 text-amber-600" },
  { label: "Documentation",     value: 63,  max: 350, gradient: "from-brand-purple to-brand-lavender",status: "Review",      statusCls: "bg-violet-50 text-violet-600" },
  { label: "Closed",            value: 42,  max: 350, gradient: "from-emerald-400 to-emerald-500",    status: "Done",        statusCls: "bg-emerald-50 text-emerald-600" },
];

const ACTIVITY = [
  { dot: "bg-emerald-500", text: "Parcel KA-441 — owner meeting confirmed", time: "2m ago" },
  { dot: "bg-amber-500",   text: "Litigation #LC-089 — status updated",     time: "1h ago" },
  { dot: "bg-brand-blue",  text: "Survey report uploaded · Plot 128",        time: "3h ago" },
];

const SIDE_NAV: { icon: any; label: string; active?: boolean; chevron?: boolean }[] = [
  { icon: Home,         label: "Dashboard", active: true },
  { icon: FolderKanban, label: "Projects",         chevron: true },
  { icon: MapPin,       label: "Plot Data",        chevron: true },
  { icon: BookOpen,     label: "Locations",        chevron: true },
  { icon: Database,     label: "Master Data",      chevron: true },
  { icon: Landmark,     label: "Land Acquisition", chevron: true },
  { icon: Map,          label: "Plot Management" },
  { icon: Briefcase,    label: "Litigation & Cases" },
  { icon: FileText,     label: "Proposal",         chevron: true },
  { icon: Upload,       label: "Uploads" },
  { icon: Network,      label: "NGT Manage",       chevron: true },
  { icon: LayoutGrid,   label: "Platform Management" },
];

function DashboardMock() {
  return (
    <div className="relative mx-auto w-full max-w-[1080px] overflow-hidden rounded-[18px] border border-slate-200/60 bg-white shadow-[0_40px_120px_-30px_rgba(47,71,160,0.35),0_18px_50px_-20px_rgba(124,58,237,0.2)]">
      <div className="flex" style={{ aspectRatio: "1913 / 894" }}>
        {/* ───────────── SIDEBAR ───────────── */}
        <div
          className="relative flex w-[8.6%] min-w-[118px] flex-shrink-0 flex-col py-2"
          style={{
            background:
              "linear-gradient(180deg,#1c4fb4 0%,#3a52c2 22%,#5a57cb 44%,#7d5fd2 64%,#a566dc 82%,#c76ce6 100%)",
          }}
        >
          {/* logo */}
          <div className="mx-2 mb-3 flex items-center justify-center rounded-xl bg-white py-1.5 shadow-sm">
            <div className="flex items-center gap-1">
              <span className="grid h-4 w-4 place-items-center rounded-full bg-gradient-to-br from-emerald-400 to-brand-indigo">
                <MapPin size={9} className="text-white" strokeWidth={2.5} />
              </span>
              <span className="text-[11px] font-extrabold tracking-tight text-brand-navy">xland</span>
            </div>
          </div>

          <nav className="flex-1 space-y-[3px] px-1.5">
            {SIDE_NAV.map(({ icon: Icon, label, active, chevron }) => (
              <div
                key={label}
                className={`flex items-center justify-between rounded-lg px-2 py-[5px] text-[9px] font-semibold leading-tight ${
                  active ? "bg-white text-brand-navy shadow-sm" : "text-white/85"
                }`}
              >
                <span className="flex min-w-0 items-center gap-1.5">
                  <Icon size={11} strokeWidth={2.1} className={`flex-shrink-0 ${active ? "text-brand-indigo" : ""}`} />
                  <span className="truncate">{label}</span>
                </span>
                {chevron && <ChevronDown size={9} className="ml-0.5 flex-shrink-0 opacity-50" />}
              </div>
            ))}
          </nav>

          {/* workspace card */}
          <div className="mx-1.5 mt-2 flex items-center gap-1.5 rounded-lg bg-white/15 px-2 py-1.5">
            <span className="grid h-5 w-5 flex-shrink-0 place-items-center rounded bg-white text-[6px] font-black text-blue-700">
              TATA
            </span>
            <span className="min-w-0">
              <span className="block text-[6px] font-bold uppercase tracking-wider text-white/55">Workspace</span>
              <span className="block truncate text-[7.5px] font-bold text-white">WORKSPACE NAME</span>
            </span>
          </div>
        </div>

        {/* ───────────── MAIN ───────────── */}
        <div className="relative flex flex-1 flex-col bg-[#f7f8fc]">
          {/* collapse toggle on sidebar seam */}
          <div className="absolute -left-2.5 top-7 z-10 grid h-5 w-5 place-items-center rounded-full border border-slate-200 bg-white shadow-sm">
            <ChevronLeft size={10} className="text-slate-400" />
          </div>

          {/* top bar */}
          <div className="flex flex-shrink-0 items-center justify-between border-b border-slate-200/70 bg-white px-3 py-2">
            <nav className="flex items-center gap-1 text-[10px]">
              <span className="font-semibold text-brand-indigo">Home</span>
              <ChevronRight size={9} className="text-slate-300" />
              <span className="font-semibold text-slate-500">Dashboard</span>
            </nav>
            <div className="flex items-center gap-2">
              <div className="flex w-[150px] items-center gap-1.5 rounded-full bg-slate-100/80 px-2.5 py-1 text-[9px] text-slate-400">
                <Search size={10} className="text-slate-400" />
                Search
                <Search size={9} className="ml-auto text-brand-indigo/60" />
              </div>
              <Mic size={13} className="text-brand-indigo/70" />
              <span className="relative">
                <Bell size={13} className="text-slate-500" />
                <span className="absolute -right-0.5 -top-0.5 h-1.5 w-1.5 rounded-full bg-rose-500" />
              </span>
              <span className="grid h-6 w-6 place-items-center overflow-hidden rounded-full bg-gradient-to-br from-slate-200 to-slate-300 text-[8px] font-bold text-slate-500">
                JD
              </span>
            </div>
          </div>

          {/* scroll body */}
          <div className="flex-1 overflow-hidden">
            {/* banners */}
            <div className="space-y-1.5 px-3 pt-2">
              <div className="flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-[9px] text-amber-900" style={{ background: "#ffcf41" }}>
                <Info size={10} className="text-amber-700" />
                <span>
                  Please verify your email to continue.{" "}
                  <span className="font-semibold underline">Click here</span> to sent verification mail.
                </span>
                <span className="ml-auto text-amber-700/70">✕</span>
              </div>
              <div
                className="flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-[9px] text-white"
                style={{ background: "linear-gradient(90deg,#5d39fd 0%,#7630fc 45%,#9025fa 100%)" }}
              >
                <span>
                  Welcome back <strong>John Doe</strong>! 🎉 Your personalized data and tools have been refreshed.{" "}
                  <span className="underline">Click here</span> for help.
                </span>
                <span className="ml-1.5 rounded bg-black/20 px-1.5 py-0.5 text-[8px] font-semibold">Start a Tour</span>
                <span className="ml-auto text-white/70">✕</span>
              </div>
            </div>

            <div className="flex gap-3 px-3 pt-2.5">
              {/* centre column */}
              <div className="min-w-0 flex-1">
                {/* title row */}
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <h2 className="text-[12px] font-extrabold tracking-tight text-brand-navy">
                      Oxland — Land Management &amp; Insights
                    </h2>
                    <p className="mt-0.5 text-[8px] text-brand-navy/45">
                      Visualized to match your flow: projects overview, uploaded data, and map &amp; parcels.
                    </p>
                  </div>
                </div>

                {/* toolbar */}
                <div className="mt-2 flex items-center gap-1.5">
                  <div className="flex items-center gap-1 rounded-md border border-slate-200 bg-white px-2 py-1 text-[8px] font-medium text-brand-navy/70">
                    Last 30 Days <ChevronDown size={8} className="text-slate-400" />
                  </div>
                  <button className="flex items-center gap-1 rounded-md border border-slate-200 bg-white px-2 py-1 text-[8px] font-medium text-brand-navy/70">
                    <Download size={8} /> Export PDF
                  </button>
                  <button className="flex items-center gap-1 rounded-md bg-brand-indigo px-2 py-1 text-[8px] font-semibold text-white shadow-soft">
                    New Projects <Plus size={8} strokeWidth={3} />
                  </button>
                </div>

                {/* KPI cards */}
                <div className="mt-2.5 grid grid-cols-4 gap-1.5">
                  <KpiCard label="No. of Projects" value="15"  delta="+2%"  tone="indigo" icon={Folder} />
                  <KpiCard label="Total Plots"      value="120" delta="+5%"  tone="emerald" icon={Map} />
                  <KpiCard label="Interested Areas" value="164" delta="+12%" tone="amber"  icon={UserCheck} />
                  <KpiCard label="Overall Cases"    value="78"  delta="-3%"  tone="rose"   icon={Briefcase} negative />
                </div>

                {/* Project's Report */}
                <div className="mt-3 text-[10px] font-extrabold text-brand-navy">Project's Report</div>
                <div className="mt-1.5 rounded-lg border border-slate-200/80 bg-white p-2.5">
                  <div className="flex gap-3">
                    {/* bars */}
                    <div className="min-w-0 flex-1">
                      <div className="mb-2 flex items-center justify-between">
                        <span className="text-[9px] font-bold text-brand-navy">Area-Wise Layers</span>
                        <span className="flex items-center gap-1 rounded border border-slate-200 px-1.5 py-0.5 text-[7.5px] text-brand-navy/55">
                          Overall Projects <ChevronDown size={7} />
                        </span>
                      </div>
                      <div className="space-y-2">
                        {[
                          { label: "States Layer",    value: 8 },
                          { label: "Districts Layer", value: 40 },
                          { label: "Villages Layer",  value: 74 },
                          { label: "Plot Layer",      value: 90 },
                        ].map(({ label, value }) => (
                          <div key={label} className="flex items-center gap-2">
                            <span className="w-[58px] flex-shrink-0 text-right text-[7.5px] text-brand-navy/55">{label}</span>
                            <div className="h-2.5 flex-1">
                              <motion.div
                                initial={{ width: 0 }}
                                whileInView={{ width: `${value}%` }}
                                viewport={{ once: true, margin: "-40px" }}
                                transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                                className="h-full rounded-r-[3px] bg-[#6b6ef0]"
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                      <p className="mt-2 text-[7px] leading-snug text-brand-navy/35">
                        Shows number of layers at this each stage used: Plot Layer → Village Layer → District Layer → State Layer.
                      </p>
                    </div>

                    {/* map preview */}
                    <div className="w-[34%] flex-shrink-0">
                      <div className="mb-1 flex items-center justify-between">
                        <span className="text-[8px] font-bold text-brand-navy">Recent Project Preview</span>
                        <span className="flex items-center gap-0.5 rounded border border-slate-200 px-1 py-0.5 text-[7px] text-brand-navy/55">
                          Open <Maximize2 size={6} />
                        </span>
                      </div>
                      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-md">
                        <div className="absolute inset-0 bg-[#e8eef0]" />
                        {/* land masses */}
                        <div className="absolute left-0 top-0 h-2/3 w-3/5 bg-[#dfe7d6]" style={{ clipPath: "polygon(0 0,100% 0,80% 100%,0 70%)" }} />
                        <div className="absolute bottom-0 right-0 h-3/5 w-2/3 bg-[#e3ead9]" style={{ clipPath: "polygon(20% 0,100% 30%,100% 100%,0 100%)" }} />
                        {/* river */}
                        <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 75" preserveAspectRatio="none">
                          <path d="M0 38 Q30 30 50 42 Q72 54 100 40 L100 52 Q72 64 50 52 Q30 42 0 50 Z" fill="#9ec5e8" opacity="0.8" />
                        </svg>
                        {/* selected red parcel */}
                        <div
                          className="absolute border-2 border-rose-500 bg-rose-500/30"
                          style={{ top: "30%", left: "40%", width: "30%", height: "26%", transform: "rotate(-8deg)" }}
                        />
                        {/* labels */}
                        <span className="absolute right-1 top-[26%] text-[6px] font-semibold text-slate-600">Guwahati</span>
                        <span className="absolute left-[30%] top-[52%] text-[5px] text-slate-500">Maligaon</span>
                        <span className="absolute bottom-1 left-1 text-[5px] text-slate-400">AZARA</span>
                        <span className="absolute bottom-2 right-2 text-[5px] text-slate-400">SAWKUCH</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* right summary panel */}
              <div className="w-[22%] min-w-[150px] flex-shrink-0">
                <div className="rounded-lg border border-slate-200/80 bg-white p-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-extrabold text-brand-navy">Summary Report</span>
                    <button className="flex items-center gap-0.5 text-[8px] font-semibold text-brand-indigo">
                      <RefreshCw size={8} /> Refresh
                    </button>
                  </div>

                  {/* toggle */}
                  <div className="mt-2 flex rounded-md border border-slate-200 p-0.5">
                    <span className="flex-1 rounded bg-brand-navy py-1 text-center text-[8px] font-semibold text-white">This Month</span>
                    <span className="flex-1 py-1 text-center text-[8px] font-medium text-brand-navy/55">All Over</span>
                  </div>

                  {/* donut */}
                  <div className="flex justify-center py-3">
                    <div className="relative h-[62px] w-[62px]">
                      <svg viewBox="0 0 62 62" className="h-full w-full -rotate-90">
                        <circle cx="31" cy="31" r="23" fill="none" stroke="#e6e9f0" strokeWidth="7" />
                        <circle
                          cx="31" cy="31" r="23" fill="none" stroke="#3b5096" strokeWidth="7"
                          strokeLinecap="round" strokeDasharray="130 14"
                        />
                        <circle
                          cx="31" cy="31" r="23" fill="none" stroke="#ffcf41" strokeWidth="7"
                          strokeLinecap="round" strokeDasharray="14 130" strokeDashoffset="-130"
                        />
                      </svg>
                    </div>
                  </div>

                  <div className="h-px bg-slate-100" />

                  {/* assets */}
                  <div className="mt-2 flex items-center justify-between">
                    <span className="flex items-center gap-1 text-[9px] font-bold text-brand-navy">
                      My Assets <Info size={8} className="text-slate-300" />
                    </span>
                    <RefreshCw size={8} className="text-slate-300" />
                  </div>
                  <div className="mt-1 flex items-baseline gap-1">
                    <UserCheck size={11} className="text-brand-navy" />
                    <span className="text-[18px] font-extrabold leading-none text-brand-navy">67</span>
                    <span className="text-[8px] font-semibold text-emerald-500">acres</span>
                  </div>
                  <div className="mt-2 text-[8px] text-brand-navy/50">Total net expenses:</div>
                  <div className="text-[12px] font-extrabold text-brand-navy">₹1,20,921/-</div>
                  <div className="mt-0.5 text-[7px] italic text-brand-navy/35">Last updated just now</div>

                  <button className="mt-2 flex w-full items-center justify-between rounded-md border border-slate-200 px-2 py-1.5 text-[8px] font-semibold text-brand-navy/70">
                    Download Reports
                    <span className="grid h-4 w-4 place-items-center rounded-full bg-brand-navy">
                      <ArrowRight size={8} className="text-white" />
                    </span>
                  </button>
                </div>

                <div className="mt-2 text-[9px] font-extrabold text-brand-navy">Users Activity Logs</div>
              </div>
            </div>
          </div>

          {/* floating AI assistant */}
          <span className="absolute bottom-3 right-3 grid h-7 w-7 place-items-center rounded-xl bg-gradient-to-br from-brand-indigo to-brand-purple shadow-float">
            <Sparkles size={13} className="text-white" />
            <span className="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full border border-white bg-emerald-400" />
          </span>
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
  tone: "indigo" | "blue" | "emerald" | "amber" | "rose";
  icon: any;
  negative?: boolean;
}) {
  const tones: Record<string, string> = {
    indigo: "bg-indigo-50 text-brand-indigo",
    blue: "bg-blue-50 text-brand-blue",
    emerald: "bg-emerald-50 text-emerald-600",
    amber: "bg-amber-50 text-amber-600",
    rose: "bg-rose-50 text-rose-600",
  };
  return (
    <div className="relative overflow-hidden rounded-lg border border-slate-200/80 bg-white px-2 py-2">
      {/* faded watermark icon */}
      <Icon size={42} className="pointer-events-none absolute -bottom-2 -right-1 text-slate-100" strokeWidth={1.5} />
      <div className="relative flex items-start justify-between">
        <div className="text-[7.5px] font-semibold uppercase tracking-wide text-brand-navy/45">{label}</div>
        <span className={`grid h-5 w-5 place-items-center rounded-md ${tones[tone]}`}>
          <Icon size={10} strokeWidth={2.2} />
        </span>
      </div>
      <div className="relative mt-0.5 font-display text-[18px] font-extrabold leading-none text-brand-navy">{value}</div>
      <div className={`relative mt-1 text-[7.5px] font-bold ${negative ? "text-rose-500" : "text-emerald-600"}`}>
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
  // useReducedMotion() returns null on the server and the real value on the
  // client, so branching the *rendered markup* on it directly causes a
  // hydration mismatch under prefers-reduced-motion. Gate structural branches
  // on `rm`, which matches the server (false) until after mount, then applies
  // the reduced-motion layout in a normal client re-render.
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const rm = mounted && reduce;

  // Track scroll from when hero enters viewport to when it has scrolled fully out
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Dashboard scroll animation: starts 3D-tilted, flat early so it sits straight
  // by the time it lands in view. Tilt/scale finish at 35% scroll; only Y keeps moving.
  const rotateX = useTransform(scrollYProgress, [0, 0.35], [15, 0]);
  const dashScale = useTransform(scrollYProgress, [0, 0.35], [0.91, 1]);
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
            scale: rm ? 1.08 : landScale,
            opacity: rm ? 0.7 : landOpacity,
            transformOrigin: "center bottom",
            WebkitMaskImage:
              "linear-gradient(to bottom, transparent 0%, transparent 12%, rgba(0,0,0,0.08) 28%, rgba(0,0,0,0.5) 55%, white 90%)",
            maskImage:
              "linear-gradient(to bottom, transparent 0%, transparent 12%, rgba(0,0,0,0.08) 28%, rgba(0,0,0,0.5) 55%, white 90%)",
          }}
        >
          <img
            src="/hero.webp"
            alt=""
            aria-hidden
            width="1500"
            height="998"
            loading="eager"
            decoding="async"
            className="h-full w-full object-cover"
          />
          {/* tint to match brand */}
          <div className="absolute inset-0 bg-gradient-to-b from-white/60 via-transparent to-white/30 mix-blend-soft-light" />
        </motion.div>

        {/* soft horizon tint over land photo */}
        <div className="absolute inset-x-0 bottom-0 h-[28%] bg-gradient-to-t from-white via-white/70 to-transparent" />
      </div>

      {/* ---------- CLOUDS (scroll-driven) ---------- */}
      {!rm && (
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
      {rm && (
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
          style={rm ? undefined : { y: textY, opacity: textOpacity }}
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
              <a
                href="https://app.oxland.in/register"
                target="_blank"
                rel="noopener noreferrer"
                className={buttonVariants({ variant: "primary", size: "lg", className: "rounded-full" })}
              >
                Try Free Demo <ArrowRight size={18} />
              </a>
            </Magnetic>
            <Magnetic strength={0.15}>
              <a
                href="https://app.oxland.in"
                target="_blank"
                rel="noopener noreferrer"
                className={buttonVariants({ variant: "secondary", size: "lg", className: "rounded-full" })}
              >
                Explore Platform
              </a>
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
            rm
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
          {/* <DashboardMock /> */}
          <img
            src="/Dashboard-1.webp"
            alt="Oxland dashboard"
            width="1728"
            height="910"
            loading="eager"
            decoding="async"
            className="mx-auto w-full max-w-[1080px] rounded-[18px] border border-slate-200/60 shadow-[0_40px_120px_-30px_rgba(47,71,160,0.35),0_18px_50px_-20px_rgba(124,58,237,0.2)]"
          />
        </motion.div>
      </div>
    </section>
  );
}
