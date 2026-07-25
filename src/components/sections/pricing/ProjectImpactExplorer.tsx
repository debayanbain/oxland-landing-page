"use client";
import { useState, useMemo } from "react";
import {
  BarChart3,
  MapPinned,
  MapPin,
  FolderKanban,
  FileSignature,
  FileText,
  Scale,
  Wind,
  Briefcase,
  IndianRupee,
  Users2,
  Clock,
  ShieldCheck,
  Eye,
  Database,
  Gift,
  ArrowRight,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Slider configuration                                               */
/* ------------------------------------------------------------------ */

type SliderKey =
  | "landArea"
  | "villages"
  | "projects"
  | "deeds"
  | "otherDocs"
  | "litigations"
  | "renewableMW";

type SliderConfig = {
  key: SliderKey;
  label: string;
  unit: string; // shown after the value ("" = number only)
  icon: any;
  min: number;
  max: number;
  step: number;
  default: number;
};

const SLIDERS: SliderConfig[] = [
  { key: "landArea",    label: "Total Land Area (In Acres)",         unit: "Acres",    icon: MapPinned,     min: 500,  max: 25000,  step: 100, default: 12500 },
  { key: "villages",    label: "Villages",                           unit: "Villages", icon: MapPin,        min: 1,    max: 500,    step: 1,   default: 84 },
  { key: "projects",    label: "Active Projects",                    unit: "Projects", icon: FolderKanban,  min: 1,    max: 50,     step: 1,   default: 18 },
  { key: "deeds",       label: "Land Deeds / Agreements",            unit: "",         icon: FileSignature, min: 500,  max: 50000,  step: 250, default: 18750 },
  { key: "otherDocs",   label: "Other Documents",                    unit: "",         icon: FileText,      min: 500,  max: 200000, step: 100, default: 72600 },
  { key: "litigations", label: "Litigations",                        unit: "Cases",    icon: Scale,         min: 0,    max: 2000,   step: 1,   default: 256 },
  { key: "renewableMW", label: "New Renewable Project Capacity (MW)", unit: "MW",       icon: Wind,          min: 10,   max: 2000,   step: 10,  default: 750 },
];

/* ------------------------------------------------------------------ */
/*  Impact model — tuneable benchmark constants                        */
/* ------------------------------------------------------------------ */

const HRS_PER_DOC = 0.008;        // manual handling hrs / doc / month
const HRS_PER_LITIGATION = 0.6;
const HRS_PER_ACRE = 0.012;
const HRS_PER_PROJECT = 4;
const HRS_PER_VILLAGE = 1;
const HRS_PER_MW = 0.15;
const COST_PER_HOUR_INR = 420;
const DOCS_PER_LITIGATION = 16;   // case files bundled per litigation
const ACRES_PER_MW_LOW = 1.4;     // land footprint band for renewable capacity
const ACRES_PER_MW_HIGH = 1.667;

const INR = (n: number) => new Intl.NumberFormat("en-IN").format(Math.round(n));
const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));
const norm = (v: number, lo: number, hi: number) => clamp((v - lo) / (hi - lo), 0, 1);

/** Format a ₹ range, auto-switching Lakhs → Crores. */
function fmtMoneyRange(lowR: number, highR: number) {
  const cr = highR >= 1e7;
  const div = cr ? 1e7 : 1e5;
  const unit = cr ? "Cr" : "Lakhs";
  const f = (r: number) => {
    const v = r / div;
    if (cr) return v.toFixed(1);
    return v >= 10 ? String(Math.round(v)) : v.toFixed(1);
  };
  return `₹${f(lowR)} – ${f(highR)} ${unit}`;
}

/* ------------------------------------------------------------------ */
/*  Static benchmark badges (bottom banner)                            */
/* ------------------------------------------------------------------ */

const BENCHMARKS = [
  { icon: Clock,       value: "50–70%",    label: "Faster Acquisition Cycle",       cls: "text-brand-indigo bg-brand-indigo/10" },
  { icon: FileText,    value: "60–80%",    label: "Less Manual Documentation",      cls: "text-brand-blue bg-brand-blue/10" },
  { icon: ShieldCheck, value: "40–60%",    label: "Lower Legal & Compliance Risk",  cls: "text-emerald-600 bg-emerald-50" },
  { icon: Eye,         value: "Real-time", label: "End-to-end Project Visibility",  cls: "text-amber-600 bg-amber-50" },
  { icon: Database,    value: "100%",      label: "Centralized Land Records",       cls: "text-brand-purple bg-brand-purple/10" },
];

/* ------------------------------------------------------------------ */
/*  Component                                                           */
/* ------------------------------------------------------------------ */

export default function ProjectImpactExplorer() {
  const [vals, setVals] = useState<Record<SliderKey, number>>(() =>
    SLIDERS.reduce((acc, s) => ({ ...acc, [s.key]: s.default }), {} as Record<SliderKey, number>)
  );

  const m = useMemo(() => {
    const { landArea, villages, projects, deeds, otherDocs, litigations, renewableMW } = vals;

    // Derived snapshot values
    const totalDocuments = deeds + otherDocs + litigations * DOCS_PER_LITIGATION;
    const landRequiredLow = Math.round((renewableMW * ACRES_PER_MW_LOW) / 10) * 10;
    const landRequiredHigh = Math.round((renewableMW * ACRES_PER_MW_HIGH) / 10) * 10;

    // Impact — hours saved / month → annual ₹
    const hoursPerMonth =
      (deeds + otherDocs) * HRS_PER_DOC +
      litigations * HRS_PER_LITIGATION +
      landArea * HRS_PER_ACRE +
      projects * HRS_PER_PROJECT +
      villages * HRS_PER_VILLAGE +
      renewableMW * HRS_PER_MW;
    const annualMid = hoursPerMonth * 12 * COST_PER_HOUR_INR;
    const savingsLow = annualMid * 0.88;
    const savingsHigh = annualMid * 1.1;

    // Effort reduction — averaged, normalized complexity index → 60–70% band
    const idx =
      (norm(deeds + otherDocs, 1000, 250000) +
        norm(landArea, 500, 25000) +
        norm(litigations, 0, 2000) +
        norm(projects, 1, 50) +
        norm(villages, 1, 500) +
        norm(renewableMW, 10, 2000)) /
      6;
    const effortMid = clamp(Math.round(60 + idx * 16), 55, 78);
    const effortLow = clamp(effortMid - 5, 40, 80);
    const effortHigh = clamp(effortMid + 5, 40, 82);

    return {
      totalDocuments,
      landRequiredLow,
      landRequiredHigh,
      savingsLabel: fmtMoneyRange(savingsLow, savingsHigh),
      effortLabel: `${effortLow} – ${effortHigh}%`,
    };
  }, [vals]);

  // Snapshot cards, derived live from sliders
  const snapshot = [
    { icon: MapPinned, label: "Total Land Area",         value: vals.landArea,   suffix: " Acres", note: "Total area under management", chip: "bg-brand-indigo/10 text-brand-indigo", valueCls: "text-brand-indigo" },
    { icon: FileText,  label: "Total Documents",         value: Math.round(m.totalDocuments / 100) * 100, prefix: "~", note: "All documents organized", chip: "bg-brand-blue/10 text-brand-blue", valueCls: "text-brand-blue" },
    { icon: Briefcase, label: "Active Project Workspaces", value: vals.projects, note: "Live dashboards for your teams", chip: "bg-amber-50 text-amber-600", valueCls: "text-amber-600" },
    { icon: MapPin,    label: "Villages",                value: vals.villages,   note: "Villages under coverage", chip: "bg-emerald-50 text-emerald-600", valueCls: "text-emerald-600" },
    { icon: Scale,     label: "Litigation Cases",        value: vals.litigations, note: "Cases tracked & monitored", chip: "bg-teal-50 text-teal-600", valueCls: "text-teal-600" },
    { icon: BarChart3, label: "Renewable Capacity",      value: vals.renewableMW, suffix: " MW", note: "Capacity under development", chip: "bg-rose-50 text-rose-600", valueCls: "text-rose-600", renewable: true },
  ] as const;

  const openContact = () =>
    window.dispatchEvent(new CustomEvent("oxland:open-contact", { detail: { reason: "demo" } }));

  return (
    <section id="roi" className="relative py-16 sm:py-24">
      <div className="mx-auto w-full max-w-[1480px] px-5 sm:px-8">
        {/* -------- Header -------- */}
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-brand-indigo/20 bg-brand-indigo/5 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-brand-indigo">
            <BarChart3 size={13} strokeWidth={2.5} />
            Project Impact Explorer
          </div>
          <h2 className="mt-5 font-display text-4xl font-extrabold tracking-tight text-brand-navy sm:text-5xl">
            See how{" "}
            <span className="bg-gradient-to-r from-brand-indigo to-brand-purple bg-clip-text text-transparent">OxLand</span>{" "}
            transforms your land operations
          </h2>
          <p className="mt-4 text-base leading-relaxed text-brand-navy/60">
            Adjust the sliders to match your project profile.
            <br className="hidden sm:block" /> Instantly see your project snapshot and estimated impact.
          </p>
        </div>

        {/* -------- Explorer panel -------- */}
        <div className="relative w-full overflow-hidden rounded-[32px] border border-brand-navy/10 bg-[#fbfbfe] p-3 shadow-card sm:p-5">
          <div className="pointer-events-none absolute -top-32 -right-32 h-80 w-80 rounded-full opacity-50 blur-3xl" style={{ background: "radial-gradient(closest-side, rgba(124,58,237,0.22), transparent 70%)" }} />
          <div className="pointer-events-none absolute -bottom-32 -left-32 h-80 w-80 rounded-full opacity-50 blur-3xl" style={{ background: "radial-gradient(closest-side, rgba(47,91,255,0.2), transparent 70%)" }} />

          <div className="relative grid gap-4 lg:grid-cols-[0.92fr_1.28fr] lg:gap-5">
            {/* ============ LEFT — Configure ============ */}
            <div className="rounded-3xl border border-brand-navy/10 bg-white p-6 shadow-soft sm:p-7">
              <StepHeading n={1} title="Configure Your Project Profile" subtitle="Move the sliders to match your project scale." />

              <div className="mt-6 space-y-6">
                {SLIDERS.map((s) => {
                  const v = vals[s.key];
                  const pct = ((v - s.min) / (s.max - s.min)) * 100;
                  return (
                    <div key={s.key}>
                      <div className="mb-2.5 flex items-center justify-between gap-3">
                        <div className="flex min-w-0 items-center gap-2.5">
                          <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-brand-indigo/10 text-brand-indigo">
                            <s.icon size={15} strokeWidth={2.25} />
                          </span>
                          <span className="truncate text-[13px] font-bold text-brand-navy">{s.label}</span>
                        </div>
                        <span className="shrink-0 text-[13px] font-extrabold text-brand-indigo tabular-nums">
                          {INR(v)}{s.unit ? ` ${s.unit}` : ""}
                        </span>
                      </div>
                      <input
                        type="range"
                        min={s.min}
                        max={s.max}
                        step={s.step}
                        value={v}
                        onChange={(e) => setVals((p) => ({ ...p, [s.key]: Number(e.target.value) }))}
                        aria-label={s.label}
                        className="pie-slider w-full appearance-none bg-transparent"
                        style={{ background: `linear-gradient(to right, #4F46E5 0%, #7C3AED ${pct}%, #E9EAF4 ${pct}%, #E9EAF4 100%)` }}
                      />
                      <div className="mt-1 flex justify-between text-[10.5px] text-brand-navy/40 tabular-nums">
                        <span>{INR(s.min)}</span>
                        <span>{INR(s.max)}+</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* ============ RIGHT — Snapshot + Impact ============ */}
            <div className="flex flex-col gap-4 lg:gap-5">
              {/* ---- Snapshot ---- */}
              <div className="rounded-3xl border border-brand-navy/10 bg-white p-6 shadow-soft sm:p-7">
                <StepHeading n={2} title="Your Project Snapshot" subtitle="Here's what OxLand will manage for your organization." />

                <div className="mt-6 grid grid-cols-2 gap-3 lg:grid-cols-3">
                  {snapshot.map((c) => (
                    <div key={c.label} className="rounded-2xl border border-brand-navy/10 bg-white p-4 shadow-[0_1px_0_rgba(255,255,255,0.6)_inset,0_8px_24px_-18px_rgba(11,20,55,0.25)]">
                      <span className={`grid h-9 w-9 place-items-center rounded-xl ${c.chip}`}>
                        <c.icon size={16} strokeWidth={2.25} />
                      </span>
                      <p className="mt-3 text-[10.5px] font-bold uppercase tracking-wide text-brand-navy/45">{c.label}</p>
                      <p className={`mt-0.5 font-display text-[22px] font-extrabold leading-tight tracking-tight tabular-nums ${c.valueCls}`}>
                        {(c as any).prefix ?? ""}{INR(c.value)}{(c as any).suffix ?? ""}
                      </p>
                      <p className="mt-1 text-[11px] leading-snug text-brand-navy/50">{c.note}</p>

                      {(c as any).renewable && (
                        <div className="mt-2.5 rounded-lg border border-rose-200/70 bg-rose-50/60 px-2.5 py-1.5">
                          <p className="text-[9.5px] font-bold uppercase tracking-wide text-brand-navy/45">Approx. Land Required</p>
                          <p className="text-[12.5px] font-extrabold text-rose-600 tabular-nums">
                            {INR(m.landRequiredLow)} – {INR(m.landRequiredHigh)} Acres
                          </p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* ---- Potential impact ---- */}
              <div className="rounded-3xl border border-brand-navy/10 bg-gradient-to-br from-brand-indigo/[0.04] via-white to-brand-purple/[0.04] p-6 shadow-soft sm:p-7">
                <StepHeading n={3} title="Your Potential Impact with OxLand" subtitle="Based on your project profile, here's what you can achieve." />

                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  {/* Savings */}
                  <ImpactCard
                    icon={IndianRupee}
                    ring="border-emerald-400/50"
                    chip="bg-emerald-500"
                    value={<>{m.savingsLabel}<span className="text-emerald-500/70">*</span></>}
                    valueCls="text-emerald-600"
                    title="Estimated annual savings"
                    body="From reduced manual work, faster processes and fewer delays"
                    heading="Approximate Savings"
                  />
                  {/* Effort */}
                  <ImpactCard
                    icon={Users2}
                    ring="border-amber-400/50"
                    chip="bg-amber-500"
                    value={<>{m.effortLabel}<span className="text-amber-500/70">*</span></>}
                    valueCls="text-amber-600"
                    title="Overall reduction in manual effort"
                    body="Through automation, centralized data and smart workflows"
                    heading="Less Effort"
                  />
                </div>

                {/* Benchmark banner (static) */}
                <div className="mt-4 grid grid-cols-2 gap-x-4 gap-y-3 rounded-2xl border border-brand-navy/10 bg-white/70 p-4 backdrop-blur-sm sm:grid-cols-3 lg:grid-cols-5">
                  {BENCHMARKS.map((b) => (
                    <div key={b.label} className="flex items-start gap-2">
                      <span className={`grid h-7 w-7 shrink-0 place-items-center rounded-lg ${b.cls}`}>
                        <b.icon size={13} strokeWidth={2.25} />
                      </span>
                      <div className="min-w-0">
                        <p className="text-[12.5px] font-extrabold leading-none text-brand-navy">{b.value}</p>
                        <p className="mt-1 text-[10px] leading-snug text-brand-navy/55">{b.label}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* CTA */}
                <div className="mt-5 flex flex-col items-start gap-3 sm:flex-row sm:items-center">
                  <button
                    type="button"
                    onClick={openContact}
                    className="group inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-full bg-brand-gradient px-6 py-3 text-sm font-semibold text-white shadow-soft transition-all hover:shadow-float"
                  >
                    <Gift size={15} strokeWidth={2.25} />
                    Try OxLand for Free
                    <ArrowRight size={15} strokeWidth={2.5} className="transition-transform group-hover:translate-x-0.5" />
                  </button>
                  <p className="flex items-center gap-1.5 text-[12.5px] font-medium text-brand-navy/55">
                    <ShieldCheck size={14} strokeWidth={2.25} className="text-emerald-500" />
                    No commitment. 100% confidential.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Footnote */}
          <p className="relative mt-4 text-center text-[11px] italic text-brand-navy/40">
            *Savings and effort reduction are indicative and may vary based on project complexity and implementation.
          </p>
        </div>
      </div>

      <style>{`
        .pie-slider {
          height: 7px;
          border-radius: 999px;
          outline: none;
        }
        .pie-slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: #ffffff;
          border: 3px solid #4F46E5;
          box-shadow: 0 4px 12px rgba(79,70,229,0.35);
          cursor: grab;
          transition: transform 0.15s ease;
        }
        .pie-slider::-webkit-slider-thumb:hover { transform: scale(1.12); }
        .pie-slider::-webkit-slider-thumb:active { cursor: grabbing; transform: scale(0.95); }
        .pie-slider::-moz-range-thumb {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: #ffffff;
          border: 3px solid #4F46E5;
          box-shadow: 0 4px 12px rgba(79,70,229,0.35);
          cursor: grab;
        }
        @media (prefers-reduced-motion: reduce) {
          .pie-slider::-webkit-slider-thumb { transition: none; }
        }
      `}</style>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Sub-components                                                      */
/* ------------------------------------------------------------------ */

function StepHeading({ n, title, subtitle }: { n: number; title: string; subtitle: string }) {
  return (
    <div>
      <div className="flex items-center gap-2.5">
        <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-brand-indigo text-[12px] font-extrabold text-white">
          {n}
        </span>
        <h3 className="font-display text-lg font-extrabold tracking-tight text-brand-navy">{title}</h3>
      </div>
      <p className="mt-1.5 pl-[34px] text-[12.5px] leading-relaxed text-brand-navy/55">{subtitle}</p>
    </div>
  );
}

function ImpactCard({
  icon: Icon,
  ring,
  chip,
  value,
  valueCls,
  title,
  body,
  heading,
}: {
  icon: any;
  ring: string;
  chip: string;
  value: React.ReactNode;
  valueCls: string;
  title: string;
  body: string;
  heading: string;
}) {
  return (
    <div className="flex gap-4 rounded-2xl border border-brand-navy/10 bg-white p-5 shadow-soft">
      <span className={`grid h-14 w-14 shrink-0 place-items-center self-start rounded-full border-2 border-dashed ${ring}`}>
        <span className={`grid h-10 w-10 place-items-center rounded-full text-white ${chip}`}>
          <Icon size={18} strokeWidth={2.25} />
        </span>
      </span>
      <div className="min-w-0">
        <p className="text-[11px] font-bold uppercase tracking-wide text-brand-navy/45">{heading}</p>
        <p className={`mt-0.5 whitespace-nowrap font-display text-[23px] font-extrabold leading-tight tracking-tight tabular-nums ${valueCls}`}>
          {value}
        </p>
        <p className="mt-0.5 text-[12.5px] font-semibold text-brand-navy/70">{title}</p>
        <p className="mt-1.5 text-[11.5px] leading-relaxed text-brand-navy/50">{body}</p>
      </div>
    </div>
  );
}
