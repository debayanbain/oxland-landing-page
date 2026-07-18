"use client";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  Sparkles,
  Bell,
  MapPinned,
  ScanEye,
  CheckCircle2,
  Layers3,
} from "lucide-react";

const EASE = [0.22, 1, 0.36, 1] as const;

const alerts = [
  { tone: "brand-purple", text: "Boundary updated", time: "2m ago" },
  { tone: "brand-blue", text: "Drone survey complete", time: "18m ago" },
  { tone: "success", text: "Mutation approved", time: "2h ago" },
];

const dotTone: Record<string, string> = {
  "brand-purple": "bg-brand-purple",
  "brand-blue": "bg-brand-blue",
  success: "bg-success",
};

export default function FeaturesCta() {
  const reduce = useReducedMotion();

  return (
    <section className="relative py-20 sm:py-28">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: EASE }}
          className="relative overflow-hidden rounded-[40px] border border-brand-navy/10 shadow-float lg:min-h-[600px]"
          style={{
            background:
              "linear-gradient(135deg, #f7f8ff 0%, #eef0fc 55%, #f4e8ff 100%)",
          }}
        >
          {/* ---- Full-bleed background photo (right side), faded into the card on the left ---- */}
          <div className="pointer-events-none absolute inset-0 hidden lg:block">
            <img
              src="/Feature_bg.png"
              alt="Aerial view of a solar-farm land parcel with an engineer reviewing it on Oxland"
              className="absolute inset-y-0 right-0 h-full w-[74%] object-cover object-right"
              loading="lazy"
              decoding="async"
              draggable={false}
            />
            {/* Left gradient — melts the photo edge into the card surface behind the copy */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(90deg, #f1f1fb 0%, #f1f1fb 46%, rgba(241,241,251,0.82) 58%, rgba(241,241,251,0.4) 68%, rgba(241,241,251,0) 80%)",
              }}
            />
            {/* Gentle top + bottom polish so the photo edges never read as a hard rectangle */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(180deg, rgba(247,248,255,0.5) 0%, rgba(247,248,255,0) 16%, rgba(244,232,255,0) 82%, rgba(244,232,255,0.55) 100%)",
              }}
            />
          </div>

          {/* Decorative orb + grid (kept subtle, behind content) */}
          <div className="pointer-events-none absolute -top-32 -left-20 h-[420px] w-[420px] rounded-full blur-3xl opacity-50" style={{ background: "radial-gradient(closest-side, rgba(79,70,229,0.28), transparent 70%)" }} />

          <div className="relative z-10 grid items-center gap-12 px-8 py-16 lg:grid-cols-[1fr_1.15fr] lg:gap-6 lg:px-16 lg:py-20">
            {/* Copy */}
            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-white/80 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-brand-indigo ring-1 ring-brand-indigo/20 backdrop-blur-md">
                <Sparkles size={11} />
                The whole platform · one walkthrough
              </span>

              <h2 className="mt-6 font-display text-4xl font-extrabold leading-[1.05] tracking-tight text-brand-navy sm:text-5xl lg:text-[56px]">
                See Oxland run on{" "}
                <span className="bg-gradient-to-r from-brand-blue via-brand-indigo to-brand-purple bg-clip-text text-transparent">
                  your project.
                </span>
              </h2>

              <p className="mt-5 max-w-md text-base leading-relaxed text-brand-navy/65 sm:text-lg">
                Bring a real parcel set, a real case file, a real corridor map — we'll load it into a sandbox and walk you through every pillar with your data. 45 minutes. No slides.
              </p>

              <div className="mt-9 flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={() =>
                    window.dispatchEvent(
                      new CustomEvent("oxland:open-contact", {
                        detail: { reason: "demo" },
                      })
                    )
                  }
                  className="group inline-flex items-center gap-2 rounded-xl bg-brand-gradient px-6 py-3.5 text-sm font-semibold text-white shadow-soft transition-all hover:shadow-float"
                >
                  Book a sandbox walkthrough
                  <ArrowRight
                    size={15}
                    strokeWidth={2.5}
                    className="transition-transform group-hover:translate-x-0.5"
                  />
                </button>
                <a
                  href="/pricing"
                  className="inline-flex items-center gap-2 rounded-xl border border-brand-navy/12 bg-white px-5 py-3.5 text-sm font-semibold text-brand-navy/80 hover:bg-brand-navy/5"
                >
                  See pricing
                </a>
              </div>
            </div>

            {/* Spacer column — the floating cards live in the absolute layer below */}
            <div className="hidden lg:block" aria-hidden="true" />
          </div>

          {/* ---- Floating SaaS cards, overlaid on the photo (desktop only) ---- */}
          <div className="pointer-events-none absolute inset-0 z-20 hidden lg:block">
            {/* Parcel Details — over the solar field, upper-left of the photo */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: EASE, delay: 0.15 }}
              className="absolute left-[54%] top-[9%] w-[200px]"
            >
              <motion.div
                animate={reduce ? {} : { y: [0, -6, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="rounded-2xl border border-brand-navy/10 bg-white p-4 shadow-float will-change-transform"
              >
                <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-brand-navy/55">
                  <MapPinned size={11} className="text-brand-indigo" />
                  Parcel details
                </div>
                <div className="mt-2 flex items-center justify-between">
                  <span className="font-display text-base font-extrabold text-brand-navy">Plot 224A</span>
                  <span className="rounded-full bg-success/10 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-success">Verified</span>
                </div>
                <div className="mt-3 space-y-1.5 text-[11px]">
                  {[
                    ["Owner", "ABC Power Pvt. Ltd."],
                    ["Area", "32.45 Acres"],
                    ["RoR", "KA-12-224A-1987"],
                  ].map(([k, v]) => (
                    <div key={k} className="flex items-center justify-between">
                      <span className="text-brand-navy/45">{k}</span>
                      <span className="font-semibold text-brand-navy">{v}</span>
                    </div>
                  ))}
                  <div className="flex items-center justify-between pt-0.5">
                    <span className="text-brand-navy/45">Status</span>
                    <span className="rounded-full bg-brand-indigo/10 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-brand-indigo">Acquired</span>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* Live Alerts — top-right */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: EASE, delay: 0.28 }}
              className="absolute right-[4%] top-[6%] w-[200px]"
            >
              <motion.div
                animate={reduce ? {} : { y: [0, -8, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                className="rounded-2xl border border-brand-navy/10 bg-white p-4 shadow-float will-change-transform"
              >
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-brand-navy/55">
                    <Bell size={11} className="text-brand-purple" />
                    Live alerts
                  </span>
                  <span className="rounded-full bg-success/10 px-1.5 py-0.5 text-[9px] font-bold text-success">3 new</span>
                </div>
                <ul className="mt-3 space-y-2.5">
                  {alerts.map((a) => (
                    <li key={a.text} className="flex items-start gap-2">
                      <span className={`mt-1 h-1.5 w-1.5 shrink-0 rounded-full ${dotTone[a.tone]} animate-pulse-soft`} />
                      <div>
                        <div className="text-[11px] font-semibold leading-snug text-brand-navy">{a.text}</div>
                        <div className="text-[10px] text-brand-navy/45">{a.time}</div>
                      </div>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </motion.div>

            {/* Acquisition progress ring — mid, left of centre */}
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: EASE, delay: 0.4 }}
              className="absolute left-[53%] top-[47%]"
            >
              <motion.div
                animate={reduce ? {} : { y: [0, -7, 0] }}
                transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
                className="rounded-2xl border border-brand-navy/10 bg-white p-4 shadow-float will-change-transform"
              >
                <div className="text-[10px] font-bold uppercase tracking-wider text-brand-navy/55">
                  Acquisition
                </div>
                <div className="mt-2 flex items-center gap-3">
                  <div className="relative grid h-14 w-14 place-items-center">
                    <svg viewBox="0 0 40 40" className="h-14 w-14 -rotate-90">
                      <circle cx="20" cy="20" r="16" fill="none" stroke="rgba(11,20,55,0.08)" strokeWidth="4" />
                      <motion.circle
                        cx="20" cy="20" r="16" fill="none" stroke="url(#cta-ring)" strokeWidth="4" strokeLinecap="round"
                        strokeDasharray="100.5"
                        initial={{ strokeDashoffset: 100.5 }}
                        whileInView={{ strokeDashoffset: 100.5 * (1 - 0.78) }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.2, ease: EASE, delay: 0.6 }}
                      />
                      <defs>
                        <linearGradient id="cta-ring" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#4F46E5" />
                          <stop offset="100%" stopColor="#7C3AED" />
                        </linearGradient>
                      </defs>
                    </svg>
                    <span className="absolute font-display text-sm font-extrabold text-brand-navy">78%</span>
                  </div>
                  <div>
                    <div className="font-display text-xs font-extrabold text-brand-navy">Completed</div>
                    <div className="text-[10px] text-brand-navy/50">Phase 2 · 224A</div>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* AI Detection — right, above the person */}
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: EASE, delay: 0.52 }}
              className="absolute right-[3%] top-[40%]"
            >
              <motion.div
                animate={reduce ? {} : { y: [0, -6, 0] }}
                transition={{ duration: 4.8, repeat: Infinity, ease: "easeInOut", delay: 1.1 }}
                className="rounded-2xl border border-brand-navy/10 bg-white p-3.5 shadow-float will-change-transform"
              >
                <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-brand-navy/55">
                  <ScanEye size={11} className="text-brand-indigo" />
                  AI detection
                </div>
                <div className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-success/10 px-2 py-0.5 text-[10px] font-bold text-success">
                  <CheckCircle2 size={11} strokeWidth={2.75} />
                  No encroachment
                </div>
                <div className="mt-2 font-display text-lg font-extrabold text-brand-navy tabular-nums">
                  98.6%
                  <span className="ml-1 text-[10px] font-semibold text-brand-navy/50">confidence</span>
                </div>
              </motion.div>
            </motion.div>

            {/* Solar layout chip — lower centre, clear of the person */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: EASE, delay: 0.64 }}
              className="absolute left-[54%] bottom-[8%]"
            >
              <motion.div
                animate={reduce ? {} : { y: [0, -5, 0] }}
                transition={{ duration: 5.2, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
                className="flex items-center gap-2.5 rounded-2xl border border-brand-navy/10 bg-white px-3.5 py-2.5 shadow-float will-change-transform"
              >
                <span className="grid h-8 w-8 place-items-center rounded-lg bg-brand-purple/10 text-brand-purple">
                  <Layers3 size={15} strokeWidth={2.25} />
                </span>
                <div>
                  <div className="text-[9px] font-bold uppercase tracking-wider text-brand-navy/45">Solar layout</div>
                  <div className="font-display text-xs font-extrabold text-brand-navy">25 MWp · 4 blocks</div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
