"use client";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  Sparkles,
  MapPinned,
  Gavel,
  Plane,
  ShieldCheck,
  TrendingUp,
} from "lucide-react";

const EASE = [0.22, 1, 0.36, 1] as const;

export default function FeaturesHero() {
  const reduce = useReducedMotion();

  return (
    <section className="relative isolate overflow-hidden pt-32 pb-24 sm:pt-40 sm:pb-32">
      {/* Ambient */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-grid-faint [background-size:42px_42px] opacity-50" />
        <div
          className="absolute -top-40 left-1/2 h-[560px] w-[820px] -translate-x-1/2 rounded-full opacity-60 blur-3xl"
          style={{
            background:
              "radial-gradient(closest-side, rgba(79,70,229,0.32), rgba(124,58,237,0.18) 50%, transparent 75%)",
          }}
        />
        <div
          className="absolute -left-32 top-40 h-[360px] w-[420px] rounded-full opacity-50 blur-3xl"
          style={{
            background:
              "radial-gradient(closest-side, rgba(47,91,255,0.32), transparent 70%)",
          }}
        />
        <img
          src="/cloud1.webp"
          alt=""
          aria-hidden
          width="1920"
          height="1080"
          loading="lazy"
          decoding="async"
          className="absolute -top-4 left-[5%] w-[280px] opacity-70 blur-[2px] select-none"
        />
        <img
          src="/cloud2.png"
          alt=""
          aria-hidden
          className="absolute top-32 right-[3%] w-[260px] opacity-60 blur-[1.5px] select-none"
        />
      </div>

      <div className="container relative">
        <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_1fr]">
          {/* Left — copy */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 18, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.7, ease: EASE }}
              className="inline-flex items-center gap-2 rounded-full border border-brand-indigo/20 bg-brand-indigo/5 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-brand-indigo"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-brand-indigo animate-pulse-soft" />
              Platform features
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 24, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.8, ease: EASE, delay: 0.1 }}
              className="mt-6 font-display text-5xl font-extrabold leading-[1.05] tracking-tight text-brand-navy sm:text-6xl lg:text-[64px]"
            >
              One platform.{" "}
              <span className="bg-gradient-to-r from-brand-blue via-brand-indigo to-brand-purple bg-clip-text text-transparent">
                Every workflow your land team runs.
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: EASE, delay: 0.22 }}
              className="mt-6 max-w-xl text-base leading-relaxed text-brand-navy/65 sm:text-lg"
            >
              From cadastre to court order, drone capture to dispatch — Oxland brings every step of a land operation into one workspace, with the audit trail, GIS depth and field-ops realism that Indian land teams actually need.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: EASE, delay: 0.32 }}
              className="mt-9 flex flex-wrap items-center gap-4"
            >
              <button
                type="button"
                onClick={() =>
                  typeof window !== "undefined" &&
                  window.dispatchEvent(
                    new CustomEvent("oxland:open-contact", {
                      detail: { reason: "demo" },
                    })
                  )
                }
                className="group inline-flex items-center gap-2 rounded-xl bg-brand-gradient px-6 py-3 text-sm font-semibold text-white shadow-soft transition-all hover:shadow-float"
              >
                Book a platform walkthrough
                <ArrowRight
                  size={15}
                  strokeWidth={2.5}
                  className="transition-transform group-hover:translate-x-0.5"
                />
              </button>
              <a
                href="#pillars"
                className="inline-flex items-center gap-2 rounded-xl border border-brand-navy/12 bg-white/70 px-5 py-3 text-sm font-semibold text-brand-navy backdrop-blur-sm transition-colors hover:bg-white"
              >
                Explore the 6 pillars
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.5 }}
              className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-brand-navy/55"
            >
              <span className="flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-success" />
                Built for India · DPDP-compliant
              </span>
              <span className="flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-brand-indigo" />
                14 PSUs · 32 infra developers
              </span>
              <span className="flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-brand-purple" />
                On-prem ready
              </span>
            </motion.div>
          </div>

          {/* Right — cinematic land visual */}
          <div className="relative">
            <div className="relative aspect-[1/0.95] w-full">
              {/* Ambient green-tinted glow behind the land */}
              <motion.div
                animate={reduce ? {} : { scale: [1, 1.08, 1], opacity: [0.45, 0.7, 0.45] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="pointer-events-none absolute inset-[8%] rounded-full blur-3xl"
                style={{
                  background:
                    "radial-gradient(closest-side, rgba(34,197,94,0.32), rgba(79,70,229,0.18) 55%, transparent 80%)",
                }}
              />

              {/* Radar SVG underlay — circular dashed rings around land */}
              <svg viewBox="0 0 500 500" className="absolute inset-0 h-full w-full">
                <defs>
                  <linearGradient id="hero-ring" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#4F46E5" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="#7C3AED" stopOpacity="0.25" />
                  </linearGradient>
                </defs>
                <circle cx="250" cy="250" r="190" fill="none" stroke="url(#hero-ring)" strokeWidth="1" strokeDasharray="2 8" opacity="0.6" />
                <circle cx="250" cy="250" r="150" fill="none" stroke="url(#hero-ring)" strokeWidth="1" strokeDasharray="3 7" opacity="0.5" />
                <circle cx="250" cy="250" r="110" fill="none" stroke="url(#hero-ring)" strokeWidth="1" strokeDasharray="4 6" opacity="0.4" />

                {/* Radar sweep arc */}
                {!reduce && (
                  <motion.g
                    style={{ transformOrigin: "250px 250px" }}
                    animate={{ rotate: 360 }}
                    transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                  >
                    <defs>
                      <linearGradient id="sweep-grad" x1="0%" y1="50%" x2="100%" y2="50%">
                        <stop offset="0%" stopColor="#7C3AED" stopOpacity="0" />
                        <stop offset="100%" stopColor="#7C3AED" stopOpacity="0.55" />
                      </linearGradient>
                    </defs>
                    <path d="M 250 250 L 440 250 A 190 190 0 0 0 366 113 Z" fill="url(#sweep-grad)" opacity="0.35" />
                  </motion.g>
                )}

                {/* Connector lines from land to callouts */}
                <g stroke="#4F46E5" strokeWidth="1.2" strokeDasharray="3 5" fill="none" opacity="0.45">
                  <path d="M 250 250 Q 130 160 60 100">
                    <animate attributeName="stroke-dashoffset" from="0" to="-16" dur="1.4s" repeatCount="indefinite" />
                  </path>
                  <path d="M 250 250 Q 380 175 460 110">
                    <animate attributeName="stroke-dashoffset" from="0" to="-16" dur="1.4s" repeatCount="indefinite" />
                  </path>
                  <path d="M 250 250 Q 360 360 460 410">
                    <animate attributeName="stroke-dashoffset" from="0" to="-16" dur="1.4s" repeatCount="indefinite" />
                  </path>
                  <path d="M 250 250 Q 140 360 60 410">
                    <animate attributeName="stroke-dashoffset" from="0" to="-16" dur="1.4s" repeatCount="indefinite" />
                  </path>
                </g>

                {/* Endpoint dots */}
                {[
                  [60, 100],
                  [460, 110],
                  [460, 410],
                  [60, 410],
                ].map(([x, y], i) => (
                  <g key={i}>
                    <circle cx={x} cy={y} r="4" fill="#4F46E5" />
                    <circle cx={x} cy={y} r="9" fill="none" stroke="#4F46E5" strokeWidth="1.2" opacity="0.4">
                      <animate attributeName="r" values="4;14;4" dur="2.4s" repeatCount="indefinite" begin={`${i * 0.4}s`} />
                      <animate attributeName="opacity" values="0.5;0;0.5" dur="2.4s" repeatCount="indefinite" begin={`${i * 0.4}s`} />
                    </circle>
                  </g>
                ))}
              </svg>

              {/* The 3D land image — floats gently */}
              <motion.div
                initial={{ opacity: 0, scale: 0.85, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 1, ease: EASE, delay: 0.2 }}
                className="absolute inset-0 z-10"
              >
                <motion.div
                  animate={reduce ? {} : { y: [0, -10, 0] }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                  className="relative h-full w-full"
                >
                  <img
                    src="/features.webp"
                    alt="Oxland land parcel intelligence"
                    width="1536"
                    height="1024"
                    loading="lazy"
                    decoding="async"
                    className="absolute inset-0 h-full w-full object-contain select-none"
                    draggable={false}
                  />
                  {/* Reflection / spotlight */}
                  <div
                    className="pointer-events-none absolute inset-x-[20%] -bottom-2 h-12 rounded-full blur-2xl"
                    style={{
                      background:
                        "radial-gradient(closest-side, rgba(124,58,237,0.45), transparent 70%)",
                    }}
                  />
                </motion.div>
              </motion.div>

              {/* Floating callout — top-left (GIS) */}
              <motion.div
                initial={{ opacity: 0, x: -16, y: -8 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{ duration: 0.7, delay: 0.7, ease: EASE }}
                className="absolute left-0 top-2 z-20"
              >
                <motion.div
                  animate={reduce ? {} : { y: [0, -6, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                  className="rounded-2xl border border-brand-navy/10 bg-white/95 p-3 shadow-float backdrop-blur-md max-w-[180px]"
                >
                  <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-brand-navy/55">
                    <MapPinned size={11} className="text-brand-indigo" />
                    GIS · live
                  </div>
                  <div className="mt-1 font-display text-lg font-extrabold text-brand-navy tabular-nums">
                    1,248 parcels
                  </div>
                  <div className="text-[10px] text-brand-navy/55">across 12 villages</div>
                </motion.div>
              </motion.div>

              {/* Floating callout — top-right (AI insight) */}
              <motion.div
                initial={{ opacity: 0, x: 16, y: -8 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{ duration: 0.7, delay: 0.85, ease: EASE }}
                className="absolute right-0 top-1 z-20"
              >
                <motion.div
                  animate={reduce ? {} : { y: [0, -8, 0] }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
                  className="rounded-2xl border border-brand-indigo/30 bg-gradient-to-br from-brand-indigo to-brand-purple p-3 shadow-float max-w-[210px] text-white"
                >
                  <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-white/90">
                    <Sparkles size={11} />
                    AI insight
                  </div>
                  <div className="mt-1 text-xs font-semibold leading-snug">
                    3 cases flagged for hearing this week — auto-scheduled
                  </div>
                </motion.div>
              </motion.div>

              {/* Floating callout — bottom-right (Litigation) */}
              <motion.div
                initial={{ opacity: 0, x: 16, y: 8 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{ duration: 0.7, delay: 1, ease: EASE }}
                className="absolute right-0 bottom-12 z-20"
              >
                <motion.div
                  animate={reduce ? {} : { y: [0, -7, 0] }}
                  transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
                  className="rounded-2xl border border-brand-navy/10 bg-white/95 p-3 shadow-float backdrop-blur-md max-w-[185px]"
                >
                  <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-brand-navy/55">
                    <Gavel size={11} className="text-brand-purple" />
                    Cases · active
                  </div>
                  <div className="mt-1 flex items-baseline gap-1">
                    <span className="font-display text-lg font-extrabold text-brand-navy tabular-nums">86</span>
                    <span className="text-[10px] text-success font-semibold">+12% mo</span>
                  </div>
                  <div className="mt-2 h-1 overflow-hidden rounded-full bg-brand-navy/8">
                    <motion.div
                      animate={{ width: ["20%", "82%", "62%"] }}
                      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                      className="h-full rounded-full bg-gradient-to-r from-brand-indigo to-brand-purple"
                    />
                  </div>
                </motion.div>
              </motion.div>

              {/* Floating callout — bottom-left (Drone) */}
              <motion.div
                initial={{ opacity: 0, x: -16, y: 8 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{ duration: 0.7, delay: 1.15, ease: EASE }}
                className="absolute left-0 bottom-12 z-20"
              >
                <motion.div
                  animate={reduce ? {} : { y: [0, -9, 0] }}
                  transition={{ duration: 5.8, repeat: Infinity, ease: "easeInOut", delay: 1.2 }}
                  className="rounded-2xl border border-brand-navy/10 bg-white/95 p-3 shadow-float backdrop-blur-md max-w-[175px]"
                >
                  <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-brand-navy/55">
                    <Plane size={11} className="text-brand-blue" />
                    Drone capture
                  </div>
                  <div className="mt-1 font-display text-lg font-extrabold text-brand-navy tabular-nums">
                    68.4 ha
                  </div>
                  <div className="flex items-center gap-1 text-[10px] text-brand-navy/55">
                    <span className="h-1.5 w-1.5 rounded-full bg-success animate-pulse-soft" />
                    today
                  </div>
                </motion.div>
              </motion.div>

              {/* Bottom centered KPI strip */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.3, ease: EASE }}
                className="absolute left-1/2 -bottom-4 z-20 -translate-x-1/2"
              >
                <div className="flex items-center gap-3 rounded-full border border-brand-navy/10 bg-white/95 px-4 py-2 shadow-float backdrop-blur-md">
                  <div className="flex items-center gap-1.5 text-[11px] font-semibold text-brand-navy/75">
                    <ShieldCheck size={13} className="text-success" />
                    SOC 2
                  </div>
                  <span className="h-3 w-px bg-brand-navy/15" />
                  <div className="flex items-center gap-1.5 text-[11px] font-semibold text-brand-navy/75">
                    <TrendingUp size={13} className="text-brand-indigo" />
                    62% faster
                  </div>
                  <span className="h-3 w-px bg-brand-navy/15" />
                  <div className="flex items-center gap-1.5 text-[11px] font-semibold text-brand-navy/75">
                    <span className="h-1.5 w-1.5 rounded-full bg-brand-purple animate-pulse-soft" />
                    24×7 NOC
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
