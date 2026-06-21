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
  Activity,
  FileText,
  Settings,
  LayoutDashboard,
  Database,
  Map,
  BarChart3,
  Building2,
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

function DashboardMock() {
  return (
    <div className="relative mx-auto w-full max-w-[1080px] overflow-hidden rounded-[28px] border border-slate-200/60 bg-white shadow-[0_40px_120px_-30px_rgba(47,71,160,0.35),0_18px_50px_-20px_rgba(124,58,237,0.2)]">
      <img src="/dashboard.png" alt="dashboard mock"
        height={500}
        width={1080}
      />
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
            WebkitMaskImage:
              "linear-gradient(to bottom, transparent 0%, transparent 12%, rgba(0,0,0,0.08) 28%, rgba(0,0,0,0.5) 55%, white 90%)",
            maskImage:
              "linear-gradient(to bottom, transparent 0%, transparent 12%, rgba(0,0,0,0.08) 28%, rgba(0,0,0,0.5) 55%, white 90%)",
          }}
        >
          <img
            src="/hero.jpg"
            alt=""
            aria-hidden
            className="h-full w-full object-cover"
          />
          {/* tint to match brand */}
          <div className="absolute inset-0 bg-gradient-to-b from-white/60 via-transparent to-white/30 mix-blend-soft-light" />
        </motion.div>

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
