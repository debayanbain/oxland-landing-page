"use client";
import { useState, useEffect, useMemo } from "react";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { MapPinned, Gavel, UserCog, TrendingUp, IndianRupee, Clock } from "lucide-react";

type SliderConfig = {
  key: "parcels" | "cases" | "surveyors";
  label: string;
  unit: string;
  icon: any;
  min: number;
  max: number;
  step: number;
  default: number;
};

const SLIDERS: SliderConfig[] = [
  { key: "parcels", label: "Parcels under management", unit: "parcels", icon: MapPinned, min: 100, max: 25000, step: 100, default: 5000 },
  { key: "cases", label: "Active litigation cases", unit: "cases", icon: Gavel, min: 0, max: 1000, step: 5, default: 80 },
  { key: "surveyors", label: "Field surveyors deployed", unit: "people", icon: UserCog, min: 0, max: 200, step: 1, default: 12 },
];

// Tuneable constants — based on internal benchmarks
const HOURS_PER_PARCEL = 0.18;
const HOURS_PER_CASE = 2.4;
const HOURS_PER_SURVEYOR = 6.5;
const COST_PER_HOUR_INR = 420;

function AnimatedNumber({ value, prefix = "", suffix = "" }: { value: number; prefix?: string; suffix?: string }) {
  const mv = useMotionValue(0);
  const display = useTransform(mv, (v) => `${prefix}${new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 }).format(Math.round(v))}${suffix}`);

  useEffect(() => {
    const controls = animate(mv, value, { duration: 0.6, ease: [0.22, 1, 0.36, 1] });
    return controls.stop;
  }, [value]);

  return <motion.span>{display}</motion.span>;
}

export default function ROICalculator() {
  const [vals, setVals] = useState<Record<string, number>>(() =>
    SLIDERS.reduce((acc, s) => ({ ...acc, [s.key]: s.default }), {})
  );

  const { hoursSaved, rupeesSavedAnnual, percent } = useMemo(() => {
    const hours =
      vals.parcels * HOURS_PER_PARCEL +
      vals.cases * HOURS_PER_CASE +
      vals.surveyors * HOURS_PER_SURVEYOR;
    const rupees = hours * 12 * COST_PER_HOUR_INR;
    const baselineHours = vals.parcels * 0.45 + vals.cases * 5 + vals.surveyors * 12;
    const pct = baselineHours > 0 ? Math.min(85, Math.round((hours / baselineHours) * 100)) : 0;
    return { hoursSaved: hours, rupeesSavedAnnual: rupees, percent: pct };
  }, [vals]);

  return (
    <section id="roi" className="relative py-16 sm:py-24">
      <div className="container">
        <div className="mx-auto max-w-3xl text-center mb-12">
          <div className="inline-flex items-center gap-2 rounded-full border border-brand-indigo/20 bg-brand-indigo/5 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-brand-indigo">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-indigo" />
            ROI calculator
          </div>
          <h2 className="mt-5 font-display text-4xl font-extrabold tracking-tight text-brand-navy sm:text-5xl">
            See what Oxland is{" "}
            <span className="bg-gradient-to-r from-brand-indigo to-brand-purple bg-clip-text text-transparent">worth to your team.</span>
          </h2>
          <p className="mt-4 text-base text-brand-navy/60">
            Drag the sliders to match your project profile. We'll estimate hours saved per month and the ₹ value across a year.
          </p>
        </div>

        <div className="relative mx-auto max-w-6xl overflow-hidden rounded-[36px] border border-brand-navy/10 bg-white shadow-card">
          {/* Decorative */}
          <div className="pointer-events-none absolute -top-32 -right-32 h-80 w-80 rounded-full opacity-50 blur-3xl" style={{ background: "radial-gradient(closest-side, rgba(124,58,237,0.32), transparent 70%)" }} />
          <div className="pointer-events-none absolute -bottom-32 -left-32 h-80 w-80 rounded-full opacity-50 blur-3xl" style={{ background: "radial-gradient(closest-side, rgba(47,91,255,0.28), transparent 70%)" }} />
          <div className="pointer-events-none absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "radial-gradient(circle, #6366f1 1px, transparent 1px)", backgroundSize: "22px 22px" }} />

          <div className="relative grid lg:grid-cols-[1.1fr_1fr]">
            {/* Sliders */}
            <div className="p-8 sm:p-10 lg:p-12 lg:border-r lg:border-brand-navy/8">
              <div className="space-y-9">
                {SLIDERS.map((s) => {
                  const v = vals[s.key];
                  const pct = ((v - s.min) / (s.max - s.min)) * 100;
                  return (
                    <div key={s.key}>
                      <div className="mb-3 flex items-center justify-between">
                        <div className="flex items-center gap-2.5">
                          <span className="grid h-9 w-9 place-items-center rounded-xl bg-brand-indigo/10 text-brand-indigo">
                            <s.icon size={16} strokeWidth={2.25} />
                          </span>
                          <span className="text-sm font-bold text-brand-navy">{s.label}</span>
                        </div>
                        <div className="rounded-full bg-brand-indigo/8 px-3 py-1 text-sm font-bold text-brand-indigo tabular-nums">
                          {new Intl.NumberFormat("en-IN").format(v)} {s.unit}
                        </div>
                      </div>
                      <div className="relative">
                        <input
                          type="range"
                          min={s.min}
                          max={s.max}
                          step={s.step}
                          value={v}
                          onChange={(e) => setVals((p) => ({ ...p, [s.key]: Number(e.target.value) }))}
                          className="roi-slider w-full appearance-none bg-transparent"
                          style={{
                            background: `linear-gradient(to right, #4F46E5 0%, #7C3AED ${pct}%, #E5E7F3 ${pct}%, #E5E7F3 100%)`,
                          }}
                        />
                      </div>
                      <div className="mt-1.5 flex justify-between text-[11px] text-brand-navy/40">
                        <span>{new Intl.NumberFormat("en-IN").format(s.min)}</span>
                        <span>{new Intl.NumberFormat("en-IN").format(s.max)}</span>
                      </div>
                    </div>
                  );
                })}
              </div>

              <style>{`
                .roi-slider {
                  height: 8px;
                  border-radius: 999px;
                  outline: none;
                }
                .roi-slider::-webkit-slider-thumb {
                  -webkit-appearance: none;
                  appearance: none;
                  width: 22px;
                  height: 22px;
                  border-radius: 50%;
                  background: white;
                  border: 3px solid #4F46E5;
                  box-shadow: 0 4px 12px rgba(79,70,229,0.35);
                  cursor: grab;
                  transition: transform 0.15s ease;
                }
                .roi-slider::-webkit-slider-thumb:hover { transform: scale(1.12); }
                .roi-slider::-webkit-slider-thumb:active { cursor: grabbing; transform: scale(0.95); }
                .roi-slider::-moz-range-thumb {
                  width: 22px;
                  height: 22px;
                  border-radius: 50%;
                  background: white;
                  border: 3px solid #4F46E5;
                  box-shadow: 0 4px 12px rgba(79,70,229,0.35);
                  cursor: grab;
                }
              `}</style>
            </div>

            {/* Results */}
            <div className="relative bg-gradient-to-br from-brand-indigo/[0.04] via-white to-brand-purple/[0.04] p-8 sm:p-10 lg:p-12">
              <p className="text-xs font-bold uppercase tracking-widest text-brand-navy/45">Estimated impact</p>

              <div className="mt-5">
                <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-brand-navy/50">
                  <Clock size={12} strokeWidth={2.5} /> Hours saved / month
                </p>
                <div className="mt-1 font-display text-6xl font-extrabold tracking-tight text-brand-navy tabular-nums">
                  <AnimatedNumber value={hoursSaved} />
                  <span className="ml-2 text-2xl font-bold text-brand-navy/45">hrs</span>
                </div>
              </div>

              <div className="my-7 h-px bg-brand-navy/8" />

              <div>
                <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-brand-navy/50">
                  <IndianRupee size={12} strokeWidth={2.5} /> Saved annually
                </p>
                <div className="mt-1 font-display text-6xl font-extrabold tracking-tight tabular-nums bg-gradient-to-r from-brand-indigo to-brand-purple bg-clip-text text-transparent">
                  <AnimatedNumber value={rupeesSavedAnnual} prefix="₹ " />
                </div>
              </div>

              <div className="mt-7 rounded-2xl border border-brand-indigo/15 bg-white/80 p-5 backdrop-blur-sm">
                <div className="flex items-center justify-between text-xs font-semibold text-brand-navy/65">
                  <span className="flex items-center gap-2">
                    <TrendingUp size={14} className="text-brand-indigo" strokeWidth={2.5} />
                    Workflow efficiency uplift
                  </span>
                  <span className="text-brand-indigo">{percent}%</span>
                </div>
                <div className="mt-3 h-2 overflow-hidden rounded-full bg-brand-navy/8">
                  <motion.div
                    className="h-full rounded-full bg-gradient-to-r from-brand-indigo to-brand-purple"
                    animate={{ width: `${percent}%` }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  />
                </div>
                <p className="mt-3 text-[11px] leading-relaxed text-brand-navy/50">
                  Estimates assume an average loaded cost of ₹420 / hour and benchmark workflows reported by infra and real-estate teams running Oxland Growth.
                </p>
              </div>

              <button
                type="button"
                onClick={() =>
                  window.dispatchEvent(
                    new CustomEvent("oxland:open-contact", { detail: { reason: "roi" } })
                  )
                }
                className="mt-7 inline-flex items-center gap-2 rounded-full bg-brand-gradient px-5 py-3 text-sm font-semibold text-white shadow-soft transition-all hover:shadow-float"
              >
                Get a custom ROI report →
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
