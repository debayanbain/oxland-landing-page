import { motion, animate, useMotionValue, useMotionValueEvent, useTransform } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { Upload, Files, TrendingUp, type LucideIcon } from "lucide-react";

type Step = {
  n: string;
  Icon: LucideIcon;
  title: string;
  desc: string;
};

const steps: Step[] = [
  {
    n: "01",
    Icon: Upload,
    title: "Import projects & parcels",
    desc: "Bring in projects, parcels and GIS layers in minutes — spreadsheet, API or map upload.",
  },
  {
    n: "02",
    Icon: Files,
    title: "Track cases & documents",
    desc: "Link litigation, proposals and versioned documents directly to the parcels they belong to.",
  },
  {
    n: "03",
    Icon: TrendingUp,
    title: "Manage operations & reporting",
    desc: "Run acquisitions, approvals and budgets with live dashboards and exportable reports.",
  },
];

const PATH_START_X = 160;
const PATH_END_X = 840;
const ICON_POSITIONS = [160, 500, 840];
const ICON_PROGRESS = [0, 0.5, 1];
const ACTIVATION_TOL = 0.11;
const LOOP_DURATION = 4.0;

const SPARKLE_COUNT = 6;

export default function WorkflowFlow() {
  const flow = useMotionValue(0);
  const [activeIdx, setActiveIdx] = useState<number>(-1);

  // Comet sweeps across, loops cleanly.
  useEffect(() => {
    const controls = animate(flow, [0, 1.05], {
      duration: LOOP_DURATION,
      ease: "easeInOut",
      repeat: Infinity,
      repeatType: "loop",
      repeatDelay: 0.4,
    });
    return () => controls.stop();
  }, [flow]);

  useMotionValueEvent(flow, "change", (v) => {
    let nextIdx = -1;
    for (let i = 0; i < ICON_PROGRESS.length; i++) {
      if (Math.abs(ICON_PROGRESS[i] - v) <= ACTIVATION_TOL) {
        nextIdx = i;
        break;
      }
    }
    setActiveIdx((prev) => (prev === nextIdx ? prev : nextIdx));
  });

  const cometX = useTransform(flow, [0, 1], [PATH_START_X, PATH_END_X]);
  const cometYMobile = useTransform(flow, [0, 1], [0, 1000]);

  // Pre-computed sparkle positions and stagger delays — deterministic
  // so they're stable across renders.
  const sparkles = useMemo(() => {
    const arr: { x: number; delay: number; dur: number }[] = [];
    for (let i = 0; i < SPARKLE_COUNT; i++) {
      const t = (i + 0.5) / SPARKLE_COUNT;
      const jitter = ((Math.sin(i * 12.97) + 1) / 2 - 0.5) * 0.06;
      const x = PATH_START_X + (t + jitter) * (PATH_END_X - PATH_START_X);
      arr.push({
        x,
        delay: (i * 0.42) % 2.4,
        dur: 1.8 + ((i * 7) % 5) * 0.1,
      });
    }
    return arr;
  }, []);

  return (
    <div className="relative mt-16">
      {/* ============= Desktop horizontal stage ============= */}
      <div className="pointer-events-none absolute left-0 right-0 top-[14px] hidden lg:block">
        <svg
          viewBox="0 0 1000 80"
          preserveAspectRatio="none"
          className="h-20 w-full overflow-visible"
        >
          <defs>
            <linearGradient id="wf-grad" x1="0%" y1="0%" x2="100%" y2="0%" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#2F5BFF" />
              <stop offset="50%" stopColor="#4F46E5" />
              <stop offset="100%" stopColor="#7C3AED" />
            </linearGradient>
            <linearGradient id="wf-grad-faint" x1="0%" y1="0%" x2="100%" y2="0%" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#2F5BFF" stopOpacity="0.0" />
              <stop offset="20%" stopColor="#4F46E5" stopOpacity="0.5" />
              <stop offset="80%" stopColor="#7C3AED" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#7C3AED" stopOpacity="0.0" />
            </linearGradient>
            <radialGradient id="wf-ambient" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#A78BFA" stopOpacity="0.45" />
              <stop offset="55%" stopColor="#7C3AED" stopOpacity="0.18" />
              <stop offset="100%" stopColor="#7C3AED" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="wf-comet" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
              <stop offset="35%" stopColor="#A78BFA" stopOpacity="0.7" />
              <stop offset="100%" stopColor="#7C3AED" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Ambient glow behind the spine */}
          <ellipse cx={500} cy={40} rx={460} ry={36} fill="url(#wf-ambient)" opacity={0.55} />

          {/* === Echo lines (parallel decorative tracks) === */}
          {/* Upper echo */}
          <line
            x1={210}
            y1={18}
            x2={790}
            y2={18}
            stroke="url(#wf-grad-faint)"
            strokeOpacity={0.45}
            strokeWidth={1.25}
            strokeDasharray="2 5"
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
          />
          {/* Continuous chase on the upper echo */}
          <motion.line
            x1={210}
            y1={18}
            x2={790}
            y2={18}
            stroke="url(#wf-grad)"
            strokeOpacity={0.55}
            strokeWidth={1.25}
            strokeDasharray="2 5"
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
            initial={{ strokeDashoffset: 0 }}
            animate={{ strokeDashoffset: [0, -14] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "linear" }}
          />

          {/* Lower echo */}
          <line
            x1={210}
            y1={62}
            x2={790}
            y2={62}
            stroke="url(#wf-grad-faint)"
            strokeOpacity={0.45}
            strokeWidth={1.25}
            strokeDasharray="2 5"
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
          />
          <motion.line
            x1={210}
            y1={62}
            x2={790}
            y2={62}
            stroke="url(#wf-grad)"
            strokeOpacity={0.55}
            strokeWidth={1.25}
            strokeDasharray="2 5"
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
            initial={{ strokeDashoffset: 0 }}
            animate={{ strokeDashoffset: [0, 14] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "linear" }}
          />

          {/* === Tick marks bridging echoes to the spine === */}
          {[260, 380, 620, 740].map((x) => (
            <g key={`tick-${x}`} stroke="url(#wf-grad)" strokeOpacity={0.35} strokeWidth={1} vectorEffect="non-scaling-stroke">
              <line x1={x} y1={22} x2={x} y2={36} />
              <line x1={x} y1={44} x2={x} y2={58} />
            </g>
          ))}

          {/* === Main spine === */}
          {/* Soft base — always visible, prominent */}
          <line
            x1={PATH_START_X}
            y1={40}
            x2={PATH_END_X}
            y2={40}
            stroke="#C7D2FE"
            strokeWidth={4}
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
          />
          {/* Bright gradient overlay — always at full length */}
          <line
            x1={PATH_START_X}
            y1={40}
            x2={PATH_END_X}
            y2={40}
            stroke="url(#wf-grad)"
            strokeWidth={3}
            strokeLinecap="round"
            strokeOpacity={0.95}
            vectorEffect="non-scaling-stroke"
          />
          {/* Marching highlight dashes on the spine */}
          <motion.line
            x1={PATH_START_X}
            y1={40}
            x2={PATH_END_X}
            y2={40}
            stroke="#ffffff"
            strokeOpacity={0.85}
            strokeWidth={2}
            strokeDasharray="12 22"
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
            initial={{ strokeDashoffset: 0 }}
            animate={{ strokeDashoffset: [0, -34] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "linear" }}
          />

          {/* Twinkling sparkles along the spine */}
          {sparkles.map((s, i) => (
            <motion.circle
              key={`spark-${i}`}
              cx={s.x}
              cy={40}
              r={2.5}
              fill="#ffffff"
              vectorEffect="non-scaling-stroke"
              initial={{ opacity: 0, scale: 0.4 }}
              animate={{ opacity: [0, 1, 0], scale: [0.4, 1.4, 0.4] }}
              transition={{
                duration: s.dur,
                delay: s.delay,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          ))}

          {/* Junction dots at icon positions */}
          {ICON_POSITIONS.map((x) => (
            <g key={`junc-${x}`}>
              <circle
                cx={x}
                cy={40}
                r={6}
                fill="#ffffff"
                stroke="#4F46E5"
                strokeWidth={1.5}
                vectorEffect="non-scaling-stroke"
              />
              <circle cx={x} cy={40} r={2.5} fill="#4F46E5" />
            </g>
          ))}

          {/* Comet halo + bright core sweeps across */}
          <motion.circle cx={cometX} cy={40} r={20} fill="url(#wf-comet)" />
          <motion.circle
            cx={cometX}
            cy={40}
            r={5.5}
            fill="#ffffff"
            stroke="#4F46E5"
            strokeWidth={2}
            vectorEffect="non-scaling-stroke"
          />
        </svg>
      </div>

      {/* ============= Mobile vertical path ============= */}
      <div className="pointer-events-none absolute left-1/2 top-[34px] bottom-[34px] -translate-x-1/2 lg:hidden">
        <svg
          viewBox="0 0 40 1000"
          preserveAspectRatio="none"
          className="h-full w-10 overflow-visible"
        >
          <defs>
            <linearGradient id="wf-grad-v" x1="0%" y1="0%" x2="0%" y2="100%" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#2F5BFF" />
              <stop offset="50%" stopColor="#4F46E5" />
              <stop offset="100%" stopColor="#7C3AED" />
            </linearGradient>
            <radialGradient id="wf-comet-v" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
              <stop offset="35%" stopColor="#A78BFA" stopOpacity="0.7" />
              <stop offset="100%" stopColor="#7C3AED" stopOpacity="0" />
            </radialGradient>
          </defs>

          <line
            x1={20}
            y1={0}
            x2={20}
            y2={1000}
            stroke="#C7D2FE"
            strokeWidth={4}
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
          />
          <line
            x1={20}
            y1={0}
            x2={20}
            y2={1000}
            stroke="url(#wf-grad-v)"
            strokeWidth={3}
            strokeLinecap="round"
            strokeOpacity={0.95}
            vectorEffect="non-scaling-stroke"
          />
          <motion.line
            x1={20}
            y1={0}
            x2={20}
            y2={1000}
            stroke="#ffffff"
            strokeOpacity={0.85}
            strokeWidth={2}
            strokeDasharray="12 22"
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
            initial={{ strokeDashoffset: 0 }}
            animate={{ strokeDashoffset: [0, -34] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "linear" }}
          />

          <motion.circle cx={20} cy={cometYMobile} r={20} fill="url(#wf-comet-v)" />
          <motion.circle
            cx={20}
            cy={cometYMobile}
            r={5.5}
            fill="#ffffff"
            stroke="#4F46E5"
            strokeWidth={2}
            vectorEffect="non-scaling-stroke"
          />
        </svg>
      </div>

      {/* ============= Steps ============= */}
      <div className="grid gap-14 lg:grid-cols-3 lg:gap-10">
        {steps.map((s, i) => {
          const isActive = activeIdx === i;
          return (
            <motion.div
              key={s.n}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
              className="relative text-center"
            >
              <motion.div
                animate={
                  isActive
                    ? {
                        scale: 1.1,
                        boxShadow:
                          "0 18px 44px -12px rgba(79,70,229,0.6), 0 8px 18px -8px rgba(124,58,237,0.45)",
                      }
                    : {
                        scale: 1,
                        boxShadow: "0 8px 24px -10px rgba(15,23,42,0.18)",
                      }
                }
                transition={{ type: "spring", stiffness: 240, damping: 18 }}
                className={`relative z-10 mx-auto grid h-[68px] w-[68px] place-items-center rounded-2xl border bg-white transition-colors duration-500 ${
                  isActive
                    ? "border-brand-indigo/50 text-brand-indigo"
                    : "border-white/70 text-brand-indigo/85"
                }`}
              >
                <s.Icon size={26} strokeWidth={2} />
                <motion.span
                  aria-hidden
                  initial={false}
                  animate={
                    isActive
                      ? { opacity: [0.55, 0], scale: [1, 1.7] }
                      : { opacity: 0, scale: 1 }
                  }
                  transition={
                    isActive
                      ? { duration: 1.2, repeat: Infinity, ease: "easeOut" }
                      : { duration: 0 }
                  }
                  className="pointer-events-none absolute inset-0 rounded-2xl bg-brand-indigo/25"
                />
              </motion.div>
              <div
                className={`mt-5 font-display text-sm font-bold tracking-widest transition-colors duration-500 ${
                  isActive ? "text-brand-indigo" : "text-brand-indigo/50"
                }`}
              >
                {s.n}
              </div>
              <h3 className="mt-1.5 font-display text-xl font-bold text-brand-navy">{s.title}</h3>
              <p className="mx-auto mt-2.5 max-w-xs text-[15px] leading-relaxed text-brand-navy/60">
                {s.desc}
              </p>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
