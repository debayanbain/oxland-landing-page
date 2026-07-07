"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  Search,
  FileText,
  CheckCircle2,
  AlertTriangle,
  Activity,
  ClipboardCheck,
  Upload,
  Puzzle,
  TrendingUp,
  Bell,
  Home,
  Users,
  Sparkles,
} from "lucide-react";

const EASE = [0.22, 1, 0.36, 1] as const;

/* ------------------------------------------------------------
   Reusable frame for large section visuals
   ------------------------------------------------------------ */
function Frame({
  children,
  eyebrow,
  title,
  accent,
}: {
  children: React.ReactNode;
  eyebrow: string;
  title: string;
  accent: "indigo" | "blue" | "purple";
}) {
  const iconBg =
    accent === "indigo" ? "bg-brand-indigo/10 text-brand-indigo" :
    accent === "blue" ? "bg-brand-blue/10 text-brand-blue" :
    "bg-brand-purple/10 text-brand-purple";

  return (
    <div className="relative overflow-hidden rounded-3xl border border-brand-navy/10 bg-white shadow-float">
      <div className="pointer-events-none absolute -top-20 -right-20 h-56 w-56 rounded-full opacity-50 blur-3xl" style={{ background: accent === "indigo" ? "radial-gradient(closest-side, rgba(79,70,229,0.3), transparent 70%)" : accent === "blue" ? "radial-gradient(closest-side, rgba(47,91,255,0.3), transparent 70%)" : "radial-gradient(closest-side, rgba(124,58,237,0.3), transparent 70%)" }} />
      <div className="flex items-center justify-between border-b border-brand-navy/8 px-6 py-4">
        <div className="flex items-center gap-3">
          <span className={`grid h-9 w-9 place-items-center rounded-xl ${iconBg}`}>
            <Sparkles size={14} strokeWidth={2.25} />
          </span>
          <div>
            <div className="text-[10px] font-bold uppercase tracking-wider text-brand-navy/50">{eyebrow}</div>
            <div className="mt-0.5 font-display text-base font-extrabold text-brand-navy leading-tight">{title}</div>
          </div>
        </div>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-success/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-success">
          <span className="h-1.5 w-1.5 rounded-full bg-success animate-pulse-soft" />
          Live
        </span>
      </div>
      <div className="relative p-6">{children}</div>
    </div>
  );
}

/* -------------------- GIS -------------------- */
export function GISVisual() {
  return (
    <Frame eyebrow="GIS Mapping · dashboard" title="Interactive parcel intelligence" accent="indigo">
      <div
        className="relative h-56 overflow-hidden rounded-2xl bg-gradient-to-br from-[#f5f7ff] to-[#eef0fc]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(79,70,229,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(79,70,229,0.08) 1px, transparent 1px)",
          backgroundSize: "26px 26px",
        }}
      >
        <svg viewBox="0 0 400 220" className="absolute inset-0 h-full w-full">
          <defs>
            <linearGradient id="gis-full-p" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#4F46E5" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#7C3AED" stopOpacity="0.25" />
            </linearGradient>
          </defs>
          <rect x="70" y="30" width="260" height="160" fill="rgba(245,158,11,0.06)" stroke="#F59E0B" strokeWidth="1.5" strokeDasharray="6 4" rx="4" />
          <polygon points="110,70 180,64 190,120 115,125" fill="url(#gis-full-p)" stroke="#4F46E5" strokeWidth="1.75" />
          <polygon points="190,64 270,72 265,125 190,120" fill="url(#gis-full-p)" stroke="#4F46E5" strokeWidth="1.75" />
          <polygon points="115,125 190,120 200,175 120,178" fill="rgba(167,139,250,0.28)" stroke="#7C3AED" strokeWidth="1.5" />
          <polygon points="190,120 265,125 275,175 200,175" fill="url(#gis-full-p)" stroke="#4F46E5" strokeWidth="1.75" />
          <text x="150" y="105" textAnchor="middle" fontSize="12" fontWeight="700" fill="#0B1437">128</text>
          <text x="225" y="105" textAnchor="middle" fontSize="12" fontWeight="700" fill="#0B1437">202</text>
          <text x="160" y="155" textAnchor="middle" fontSize="12" fontWeight="700" fill="#0B1437">255</text>
          <text x="235" y="155" textAnchor="middle" fontSize="12" fontWeight="700" fill="#0B1437">280</text>
          <circle cx="280" cy="145" r="5" fill="#4F46E5">
            <animate attributeName="r" values="5;9;5" dur="2s" repeatCount="indefinite" />
          </circle>
        </svg>
        <div className="absolute left-3 top-3 rounded-xl border border-brand-navy/8 bg-white/95 p-2.5 backdrop-blur-md shadow-soft">
          <div className="text-[9px] font-bold uppercase tracking-wider text-brand-navy/50">Layers</div>
          <div className="mt-1 space-y-1 text-[10px] text-brand-navy/70">
            <div className="flex items-center justify-between gap-3">Cadastre <span className="h-2 w-4 rounded-full bg-brand-indigo" /></div>
            <div className="flex items-center justify-between gap-3">Roads <span className="h-2 w-4 rounded-full bg-brand-indigo" /></div>
            <div className="flex items-center justify-between gap-3">Satellite <span className="h-2 w-4 rounded-full bg-brand-indigo" /></div>
          </div>
        </div>
      </div>
      <div className="mt-4 grid grid-cols-3 gap-2">
        {[
          { l: "Parcels", v: "1,248" },
          { l: "Acquired", v: "68 ha", accent: true },
          { l: "Pending", v: "31 ha" },
        ].map((k) => (
          <div key={k.l} className="rounded-xl border border-brand-navy/8 bg-white p-3">
            <div className="text-[10px] font-bold uppercase tracking-wider text-brand-navy/45">{k.l}</div>
            <div className={`mt-1 font-display text-lg font-extrabold ${k.accent ? "text-brand-indigo" : "text-brand-navy"}`}>{k.v}</div>
          </div>
        ))}
      </div>
    </Frame>
  );
}

/* -------------------- Records -------------------- */
export function RecordsVisual() {
  const rows = [
    { name: "Khasra 128/2 — Village Garhi", meta: "RoR · v3 · OCR indexed", tag: "Verified", tone: "success" },
    { name: "Order copy · LC-2025/089", meta: "Marathi · 14 pages", tag: "OCR'd", tone: "indigo" },
    { name: "Mutation register · Suresh Verma", meta: "3 chain events", tag: "Chain", tone: "purple" },
    { name: "Encumbrance · 7-12 Extract", meta: "Q1 2025 · latest", tag: "New", tone: "warning" },
    { name: "Consent letter · Ram Verma", meta: "E-signed · DSC", tag: "Signed", tone: "success" },
  ];
  return (
    <Frame eyebrow="Document repository" title="5 documents · linked to Khasra 128/2" accent="blue">
      <div className="mb-4 flex items-center gap-2 rounded-xl border border-brand-navy/10 bg-[#f7f8fd] px-3 py-2.5">
        <Search size={13} className="text-brand-navy/50" />
        <span className="text-[12px] text-brand-navy/55">Search across khasra, owner, order number, section reference…</span>
        <span className="ml-auto text-[9px] font-bold text-brand-navy/40">⌘K</span>
      </div>
      <ul className="space-y-2">
        {rows.map((r) => (
          <li key={r.name} className="flex items-center justify-between gap-3 rounded-xl border border-brand-navy/8 bg-white p-3">
            <div className="flex items-center gap-3">
              <span className="grid h-9 w-9 place-items-center rounded-lg bg-brand-blue/10 text-brand-blue">
                <FileText size={14} strokeWidth={2.25} />
              </span>
              <div>
                <div className="text-[12px] font-bold text-brand-navy">{r.name}</div>
                <div className="text-[10px] text-brand-navy/55">{r.meta}</div>
              </div>
            </div>
            <span className={`rounded-full px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider ${
              r.tone === "success" ? "bg-success/10 text-success" :
              r.tone === "indigo" ? "bg-brand-indigo/10 text-brand-indigo" :
              r.tone === "purple" ? "bg-brand-purple/10 text-brand-purple" :
              "bg-warning/10 text-warning"
            }`}>
              {r.tag}
            </span>
          </li>
        ))}
      </ul>
    </Frame>
  );
}

/* -------------------- Ownership -------------------- */
export function OwnershipVisual() {
  const owners = [
    { code: "SV", name: "Suresh Kumar Verma", role: "Current owner", meta: "Mar 2024 – present · Sole", chip: "Active", tone: "indigo" },
    { code: "RV", name: "Ram Lal Verma", role: "Inheritance", meta: "Jul 2011 – Mar 2024 · Joint (3 heirs)", chip: "Prior", tone: "muted" },
    { code: "PV", name: "Prakash Verma", role: "Purchase", meta: "Apr 1998 – Jul 2011", chip: "Prior", tone: "muted" },
    { code: "GV", name: "Govt. Land Grant", role: "Origin", meta: "Aug 1972 · Revenue dept", chip: "Origin", tone: "muted" },
  ];
  return (
    <Frame eyebrow="Ownership chain" title="Khasra 128/2 · 4 generations" accent="purple">
      <div className="relative space-y-3 pl-4">
        <span className="absolute left-[13px] top-4 bottom-4 w-px bg-gradient-to-b from-brand-purple/50 to-brand-navy/10" />
        {owners.map((o) => (
          <div key={o.code} className="relative flex items-center gap-3">
            <span className={`relative z-10 grid h-8 w-8 shrink-0 place-items-center rounded-full font-display text-[10px] font-extrabold ${
              o.tone === "indigo" ? "bg-gradient-to-br from-brand-indigo to-brand-purple text-white ring-4 ring-brand-indigo/15" : "bg-brand-navy/10 text-brand-navy/70"
            }`}>
              {o.code}
            </span>
            <div className="flex flex-1 items-center justify-between rounded-xl border border-brand-navy/8 bg-white p-3">
              <div>
                <div className="text-[13px] font-bold text-brand-navy">{o.name}</div>
                <div className="text-[10px] font-semibold uppercase tracking-wider text-brand-purple/80">{o.role}</div>
                <div className="text-[10px] text-brand-navy/55">{o.meta}</div>
              </div>
              <span className={`rounded-full px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider ${o.tone === "indigo" ? "bg-brand-indigo/10 text-brand-indigo" : "bg-brand-navy/8 text-brand-navy/50"}`}>
                {o.chip}
              </span>
            </div>
          </div>
        ))}
      </div>
    </Frame>
  );
}

/* -------------------- Acquisition -------------------- */
export function AcquisitionVisual() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15%" });
  const stages = [
    { name: "Identified", count: 147, pct: 100, color: "from-brand-indigo to-brand-blue" },
    { name: "Under negotiation", count: 98, pct: 66, color: "from-brand-indigo to-brand-purple" },
    { name: "Consent & documentation", count: 63, pct: 42, color: "from-brand-purple to-brand-lavender" },
    { name: "Award & disbursement", count: 42, pct: 28, color: "from-brand-purple to-brand-lavender" },
  ];
  return (
    <Frame eyebrow="Acquisition pipeline" title="Bhopal-Sehore corridor · Phase 2" accent="indigo">
      <div ref={ref} className="space-y-3">
        {stages.map((s, i) => (
          <div key={s.name}>
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold uppercase tracking-wider text-brand-navy/55">{s.name}</span>
              <span className="font-display text-sm font-extrabold text-brand-navy">{s.count}</span>
            </div>
            <div className="mt-1.5 relative h-3 overflow-hidden rounded-full bg-brand-navy/5">
              <motion.div
                initial={{ width: 0 }}
                animate={inView ? { width: `${s.pct}%` } : {}}
                transition={{ duration: 1.1, ease: EASE, delay: i * 0.15 }}
                className={`relative h-full rounded-full bg-gradient-to-r ${s.color} shadow-[0_2px_8px_rgba(79,70,229,0.3)]`}
              >
                <motion.span
                  animate={inView ? { x: ["-100%", "200%"] } : {}}
                  transition={{ duration: 2.2, repeat: Infinity, ease: "linear", delay: i * 0.15 + 1 }}
                  className="absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                />
              </motion.div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-5 grid grid-cols-3 gap-2 border-t border-brand-navy/8 pt-4">
        <div className="rounded-xl border border-brand-navy/8 p-3">
          <div className="text-[10px] font-bold uppercase tracking-wider text-brand-navy/45">Awards</div>
          <div className="mt-1 font-display text-lg font-extrabold text-brand-navy">₹ 24.6 Cr</div>
        </div>
        <div className="rounded-xl border border-brand-navy/8 p-3">
          <div className="text-[10px] font-bold uppercase tracking-wider text-brand-navy/45">Families</div>
          <div className="mt-1 font-display text-lg font-extrabold text-brand-indigo">218</div>
        </div>
        <div className="rounded-xl border border-brand-navy/8 p-3">
          <div className="text-[10px] font-bold uppercase tracking-wider text-brand-navy/45">Cycle</div>
          <div className="mt-1 font-display text-lg font-extrabold text-brand-purple">11.4mo</div>
        </div>
      </div>
    </Frame>
  );
}

/* -------------------- Litigation -------------------- */
export function LitigationVisual() {
  const ref = useRef<HTMLOListElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15%" });
  const items = [
    { d: "12 Mar", t: "Notice u/s 11 served", chip: "Done", tone: "success" },
    { d: "28 Mar", t: "Objections received · 4 parties", chip: "Processed", tone: "success" },
    { d: "14 Apr", t: "Hearing · ADM court", chip: "Concluded", tone: "success" },
    { d: "29 Apr", t: "Order u/s 19 · award computed", chip: "Active", tone: "indigo" },
    { d: "10 May", t: "Disbursement window opens", chip: "Upcoming", tone: "warning" },
  ];
  return (
    <Frame eyebrow="Case timeline" title="LC-2025/089 · Award u/s 19" accent="purple">
      <ol ref={ref} className="relative space-y-4">
        <motion.span
          aria-hidden
          initial={{ scaleY: 0 }}
          animate={inView ? { scaleY: 1 } : {}}
          transition={{ duration: 1.3, ease: EASE, delay: 0.1 }}
          style={{ transformOrigin: "top" }}
          className="absolute left-[18px] top-9 bottom-9 w-px bg-gradient-to-b from-brand-purple/50 to-brand-navy/8"
        />
        {items.map((r, i) => (
          <motion.li
            key={r.t}
            initial={{ opacity: 0, x: -12 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, ease: EASE, delay: 0.25 + i * 0.15 }}
            className="relative flex gap-4"
          >
            <span className={`relative z-10 grid h-9 w-9 shrink-0 place-items-center rounded-xl shadow-soft ${
              r.tone === "indigo" ? "bg-brand-indigo text-white ring-4 ring-brand-indigo/15" :
              r.tone === "warning" ? "bg-warning/15 text-warning" :
              "bg-success/10 text-success"
            }`}>
              <CheckCircle2 size={14} strokeWidth={2.5} />
            </span>
            <div className="flex-1 pb-1">
              <div className="flex items-center justify-between">
                <div className="text-[10px] font-bold uppercase tracking-wider text-brand-navy/45">{r.d}</div>
                <span className={`rounded-full px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider ${
                  r.tone === "indigo" ? "bg-brand-indigo/10 text-brand-indigo" :
                  r.tone === "warning" ? "bg-warning/10 text-warning" :
                  "bg-success/10 text-success"
                }`}>{r.chip}</span>
              </div>
              <div className="mt-0.5 text-sm font-semibold text-brand-navy">{r.t}</div>
            </div>
          </motion.li>
        ))}
      </ol>
    </Frame>
  );
}

/* -------------------- Valuation -------------------- */
export function ValuationVisual() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15%" });
  const bars = [22, 30, 28, 42, 48, 45, 58, 62, 71, 68, 78, 84];
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  return (
    <Frame eyebrow="Valuation trend" title="Circle rate · Sehore district" accent="blue">
      <div ref={ref} className="grid grid-cols-[1.2fr_1fr] gap-6 items-end">
        <div className="flex h-40 items-end justify-between gap-1">
          {bars.map((h, i) => (
            <motion.div
              key={i}
              initial={{ height: 0 }}
              animate={inView ? { height: `${h}%` } : {}}
              transition={{ duration: 0.8, ease: EASE, delay: i * 0.05 }}
              className="relative flex-1 rounded-t-md bg-gradient-to-t from-brand-blue to-brand-indigo"
            >
              {i === bars.length - 1 && (
                <span className="absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-brand-indigo px-2 py-1 text-[10px] font-bold text-white shadow-soft">
                  ₹ 42.8L
                </span>
              )}
            </motion.div>
          ))}
        </div>
        <div className="space-y-3">
          <div>
            <div className="text-[10px] font-bold uppercase tracking-wider text-brand-navy/45">Avg rate / acre</div>
            <div className="font-display text-2xl font-extrabold text-brand-navy tabular-nums">₹ 42.8L</div>
            <div className="mt-1 inline-flex items-center gap-1 rounded-full bg-success/10 px-2 py-0.5 text-[10px] font-bold text-success">
              <TrendingUp size={10} /> +18% YoY
            </div>
          </div>
          <div className="rounded-xl border border-brand-navy/8 bg-white p-3">
            <div className="text-[10px] font-bold uppercase tracking-wider text-brand-navy/45">Guideline vs market</div>
            <div className="mt-1 flex items-center justify-between text-[12px]">
              <span className="font-semibold text-brand-navy">Guideline</span>
              <span className="font-bold text-brand-indigo tabular-nums">₹ 32.4L</span>
            </div>
            <div className="mt-0.5 flex items-center justify-between text-[12px]">
              <span className="font-semibold text-brand-navy">Market</span>
              <span className="font-bold text-brand-purple tabular-nums">₹ 42.8L</span>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-3 flex justify-between text-[9px] font-semibold text-brand-navy/40">
        {months.map((m) => <span key={m}>{m}</span>)}
      </div>
    </Frame>
  );
}

/* -------------------- Encroachment -------------------- */
export function EncroachmentVisual() {
  return (
    <Frame eyebrow="Change detection · AI" title="Village Amla · satellite diff" accent="indigo">
      <div className="grid grid-cols-2 gap-3">
        <div className="relative overflow-hidden rounded-2xl border border-brand-navy/8">
          <div
            className="h-40"
            style={{
              background: "linear-gradient(135deg, #dfe6d8 0%, #b7c9a1 55%, #a8b892 100%)",
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)",
              backgroundSize: "24px 24px",
            }}
          />
          <div className="absolute left-2 top-2 rounded bg-white/90 px-2 py-0.5 text-[10px] font-bold text-brand-navy shadow-soft">
            Jan 2024 · baseline
          </div>
        </div>
        <div className="relative overflow-hidden rounded-2xl border border-brand-navy/8">
          <div
            className="h-40"
            style={{
              background: "linear-gradient(135deg, #cfd6ce 0%, #96a889 55%, #7a8b6f 100%)",
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)",
              backgroundSize: "24px 24px",
            }}
          />
          {/* detected structures */}
          <div className="absolute left-5 top-6 h-10 w-14 rounded bg-warning/45 ring-2 ring-warning" />
          <div className="absolute right-3 bottom-4 h-7 w-9 rounded bg-warning/45 ring-2 ring-warning" />
          <motion.div
            animate={{ scale: [1, 1.15, 1], opacity: [0.6, 0, 0.6] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="absolute left-5 top-6 h-10 w-14 rounded ring-2 ring-warning"
          />
          <div className="absolute left-2 top-2 rounded bg-white/90 px-2 py-0.5 text-[10px] font-bold text-brand-navy shadow-soft">
            Apr 2025 · current
          </div>
          <div className="absolute right-2 top-2 rounded-full bg-warning/15 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-warning ring-1 ring-warning/40">
            2 breaches
          </div>
        </div>
      </div>
      <div className="mt-4 rounded-xl border border-warning/20 bg-warning/8 p-3">
        <div className="flex items-center gap-2 text-[12px] font-semibold text-brand-navy">
          <AlertTriangle size={13} className="text-warning" />
          Boundary breach detected — 2 unauthorized structures inside parcel 224
        </div>
        <div className="mt-1 text-[10px] text-brand-navy/55">
          Auto-generated · confidence 96% · report ready for revenue dept.
        </div>
      </div>
    </Frame>
  );
}

/* -------------------- Workflow -------------------- */
export function WorkflowVisual() {
  const stages = [
    { n: "Prepared", tone: "success", by: "Field team" },
    { n: "Legal review", tone: "success", by: "K. Sharma" },
    { n: "Director", tone: "indigo", by: "In review · 2h" },
    { n: "Sign-off", tone: "muted", by: "Pending" },
  ];
  return (
    <Frame eyebrow="Approval workflow" title="Consent letter · Parcel 224" accent="purple">
      <div className="flex items-center gap-1">
        {stages.map((s, i) => (
          <>
            <div key={s.n} className="flex-1 flex flex-col items-center gap-1.5">
              <span className={`grid h-11 w-11 place-items-center rounded-2xl ${
                s.tone === "indigo" ? "bg-brand-indigo text-white ring-4 ring-brand-indigo/15 shadow-soft" :
                s.tone === "success" ? "bg-success/15 text-success" :
                "bg-brand-navy/8 text-brand-navy/45"
              }`}>
                {s.tone === "success" ? <CheckCircle2 size={16} strokeWidth={2.5} /> :
                 s.tone === "indigo" ? <ClipboardCheck size={16} strokeWidth={2.5} /> :
                 <span className="text-[11px] font-bold">{i + 1}</span>}
              </span>
              <div className="text-center">
                <div className="text-[11px] font-bold uppercase tracking-wider text-brand-navy">{s.n}</div>
                <div className="text-[10px] text-brand-navy/55">{s.by}</div>
              </div>
            </div>
            {i < stages.length - 1 && (
              <div className="mb-8 h-[2px] flex-1 bg-gradient-to-r from-brand-indigo/40 to-brand-navy/10" />
            )}
          </>
        ))}
      </div>
      <div className="mt-6 rounded-xl border border-brand-navy/8 bg-white p-4">
        <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-brand-navy/50">
          <Activity size={12} className="text-brand-indigo" />
          Current step · Director sign-off
        </div>
        <div className="mt-2 flex items-center justify-between">
          <div className="text-[13px] font-semibold text-brand-navy">In queue for R. Iyer</div>
          <div className="text-[11px] text-brand-navy/55">Escalates in 22h</div>
        </div>
      </div>
    </Frame>
  );
}

/* -------------------- Alerts -------------------- */
export function AlertsVisual() {
  const items = [
    { text: "Hearing tomorrow · LC-089", tone: "warning", meta: "in 14h · ADM court, Bhopal" },
    { text: "Award deadline · 12 parcels", tone: "indigo", meta: "in 3 days · corridor Phase 2" },
    { text: "Survey complete · 28 parcels", tone: "success", meta: "2h ago · Ravi K." },
    { text: "Encumbrance updated · Khasra 224", tone: "purple", meta: "5h ago · auto-linked" },
    { text: "Payment cleared · ₹ 2.4L", tone: "success", meta: "yesterday · beneficiary #187" },
  ];
  return (
    <Frame eyebrow="Notification centre" title="Smart alerts · this week" accent="blue">
      <ul className="space-y-2">
        {items.map((a) => (
          <li key={a.text} className="flex items-center justify-between gap-3 rounded-xl border border-brand-navy/8 bg-white p-3">
            <div className="flex items-center gap-3">
              <span className={`grid h-9 w-9 place-items-center rounded-xl ${
                a.tone === "warning" ? "bg-warning/10 text-warning" :
                a.tone === "indigo" ? "bg-brand-indigo/10 text-brand-indigo" :
                a.tone === "purple" ? "bg-brand-purple/10 text-brand-purple" :
                "bg-success/10 text-success"
              }`}>
                <Bell size={14} strokeWidth={2.25} />
              </span>
              <div>
                <div className="text-[13px] font-bold text-brand-navy">{a.text}</div>
                <div className="text-[10px] text-brand-navy/55">{a.meta}</div>
              </div>
            </div>
            <span className={`h-2 w-2 shrink-0 rounded-full animate-pulse-soft ${
              a.tone === "warning" ? "bg-warning" :
              a.tone === "indigo" ? "bg-brand-indigo" :
              a.tone === "purple" ? "bg-brand-purple" :
              "bg-success"
            }`} />
          </li>
        ))}
      </ul>
    </Frame>
  );
}

/* -------------------- Integrations -------------------- */
export function IntegrationsVisual() {
  const systems = ["SAP", "Oracle ERP", "Tally", "Zoho", "MS Dynamics", "NIC GIS", "DigiLocker", "Court API"];
  return (
    <Frame eyebrow="Integration hub" title="8 systems connected · streaming" accent="indigo">
      <div className="relative flex items-center justify-center py-2">
        {/* Center Oxland */}
        <div className="relative z-10 grid h-16 w-16 place-items-center rounded-2xl bg-gradient-to-br from-brand-indigo to-brand-purple text-white shadow-float">
          <Puzzle size={22} strokeWidth={2.25} />
        </div>
        <motion.div
          animate={{ scale: [1, 1.3, 1], opacity: [0.4, 0, 0.4] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="absolute h-24 w-24 rounded-full ring-2 ring-brand-indigo/40"
        />
      </div>
      <div className="mt-5 grid grid-cols-4 gap-2">
        {systems.map((s, i) => (
          <motion.div
            key={s}
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, ease: EASE, delay: i * 0.06 }}
            className="rounded-xl border border-brand-navy/10 bg-white px-2 py-3 text-center shadow-soft"
          >
            <div className="text-[11px] font-bold text-brand-navy">{s}</div>
            <div className="mt-1 inline-flex items-center gap-1 rounded-full bg-success/10 px-1.5 py-0.5 text-[8px] font-bold uppercase tracking-wider text-success">
              <span className="h-1 w-1 rounded-full bg-success animate-pulse-soft" />
              live
            </div>
          </motion.div>
        ))}
      </div>
    </Frame>
  );
}

/* -------------------- Upload -------------------- */
export function UploadVisual() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15%" });
  const files = [
    { n: "parcels_q1_2025.xlsx", size: "2.4 MB", p: 100, ok: true },
    { n: "cadastre_sehore.shp", size: "18.7 MB", p: 82, ok: false },
    { n: "boundaries.kml", size: "412 KB", p: 100, ok: true },
    { n: "compensation_ledger.csv", size: "846 KB", p: 45, ok: false },
  ];
  return (
    <Frame eyebrow="Data import" title="4 files · 62% overall · 1m 20s left" accent="purple">
      <div className="rounded-2xl border-2 border-dashed border-brand-purple/25 bg-brand-purple/[0.04] p-5 text-center">
        <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-brand-purple/10 text-brand-purple">
          <Upload size={22} strokeWidth={2.25} />
        </div>
        <div className="mt-3 text-[13px] font-bold text-brand-navy">Drop files or click to browse</div>
        <div className="text-[11px] text-brand-navy/55">Excel · CSV · Shapefile · KML · GeoJSON · up to 100 MB</div>
      </div>
      <div ref={ref} className="mt-4 space-y-2">
        {files.map((f, i) => (
          <div key={f.n} className="rounded-xl border border-brand-navy/8 bg-white p-3">
            <div className="flex items-center justify-between text-[12px]">
              <div className="flex items-center gap-2">
                <FileText size={12} className={f.ok ? "text-success" : "text-brand-purple"} />
                <span className="font-semibold text-brand-navy">{f.n}</span>
                <span className="text-[10px] text-brand-navy/45">{f.size}</span>
              </div>
              <span className={`text-[11px] font-bold ${f.ok ? "text-success" : "text-brand-purple"}`}>{f.p}%</span>
            </div>
            <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-brand-navy/5">
              <motion.div
                initial={{ width: 0 }}
                animate={inView ? { width: `${f.p}%` } : {}}
                transition={{ duration: 1, ease: EASE, delay: i * 0.15 }}
                className={`h-full rounded-full ${f.ok ? "bg-success" : "bg-gradient-to-r from-brand-purple to-brand-lavender"}`}
              />
            </div>
          </div>
        ))}
      </div>
    </Frame>
  );
}

/* -------------------- R&R -------------------- */
export function RRVisual() {
  const fams = [
    { name: "Verma family", size: "4 members", stage: "Housing allotted · Sec 12", tone: "success" },
    { name: "Yadav family", size: "6 members", stage: "Livelihood training", tone: "indigo" },
    { name: "Devi family", size: "3 members", stage: "Awaiting land papers", tone: "warning" },
    { name: "Kumar family", size: "5 members", stage: "Compensation disbursed", tone: "success" },
  ];
  return (
    <Frame eyebrow="R&R tracker" title="Bhopal-Sehore · 218 families" accent="blue">
      <div className="grid grid-cols-4 gap-2">
        {[
          { l: "Total", v: "218", accent: "text-brand-navy" },
          { l: "Compensated", v: "142", accent: "text-success" },
          { l: "Resettled", v: "98", accent: "text-brand-indigo" },
          { l: "Pending", v: "76", accent: "text-warning" },
        ].map((k) => (
          <div key={k.l} className="rounded-xl border border-brand-navy/8 bg-white p-3">
            <div className="text-[9px] font-bold uppercase tracking-wider text-brand-navy/45">{k.l}</div>
            <div className={`mt-1 font-display text-xl font-extrabold ${k.accent}`}>{k.v}</div>
          </div>
        ))}
      </div>
      <ul className="mt-4 space-y-2">
        {fams.map((f) => (
          <li key={f.name} className="flex items-center justify-between gap-3 rounded-xl border border-brand-navy/8 bg-white p-3">
            <div className="flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-brand-blue/10 text-brand-blue">
                <Home size={14} strokeWidth={2.25} />
              </span>
              <div>
                <div className="text-[13px] font-bold text-brand-navy">{f.name}</div>
                <div className="text-[10px] text-brand-navy/55">{f.size}</div>
              </div>
            </div>
            <span className={`rounded-full px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider ${
              f.tone === "success" ? "bg-success/10 text-success" :
              f.tone === "indigo" ? "bg-brand-indigo/10 text-brand-indigo" :
              "bg-warning/10 text-warning"
            }`}>
              {f.stage}
            </span>
          </li>
        ))}
      </ul>
    </Frame>
  );
}
