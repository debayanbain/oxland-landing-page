"use client";
import { useState, useRef } from "react";
import { motion } from "framer-motion";
import {
  User,
  Mail,
  Phone,
  Building2,
  MapPinned,
  MessageSquare,
  Calendar,
  Check,
  ArrowRight,
  Sparkles,
  Handshake,
  LifeBuoy,
  Briefcase,
  ArrowUpRight,
} from "lucide-react";

const EASE = [0.22, 1, 0.36, 1] as const;

const CONTACT_EMAIL = "info@oxbowintellect.com";
const CONTACT_ENDPOINT = "/contact-submit.php";

const PROJECT_TYPES = [
  "Land acquisition & parcel management",
  "Litigation & case tracking",
  "GIS, cadastre & surveying",
  "R&R / compensation management",
  "Drone & IoT monitoring",
  "Document OCR & workflows",
  "End-to-end land operations platform",
  "Partnership / reseller enquiry",
  "Other / not sure yet",
];

const TIME_SLOTS = [
  { id: "morning", label: "Morning", hint: "9 AM – 12 PM" },
  { id: "afternoon", label: "Afternoon", hint: "12 PM – 4 PM" },
  { id: "evening", label: "Evening", hint: "4 PM – 7 PM" },
];

type FormState = {
  name: string;
  email: string;
  phone: string;
  company: string;
  projectType: string;
  parcels: string;
  preferredDate: string;
  preferredSlot: string;
  message: string;
};

const initialForm: FormState = {
  name: "",
  email: "",
  phone: "",
  company: "",
  projectType: PROJECT_TYPES[0],
  parcels: "",
  preferredDate: "",
  preferredSlot: "morning",
  message: "",
};

const CHANNELS = [
  {
    id: "sales",
    icon: Briefcase,
    palette: "bg-brand-blue/10 text-brand-blue",
    ringPalette: "ring-brand-blue/25",
    accent: "from-brand-blue to-brand-indigo",
    title: "Enterprise sales",
    description: "For infra, PSU, real estate and renewables teams evaluating Oxland at scale.",
    action: "info@oxbowintellect.com",
    meta: "Reply within 4 business hours",
  },
  {
    id: "support",
    icon: LifeBuoy,
    palette: "bg-emerald-50 text-emerald-600",
    ringPalette: "ring-emerald-500/25",
    accent: "from-emerald-600 to-teal-600",
    title: "Product support",
    description: "Bugs, integrations, data issues — routed to on-call engineers within one hour.",
    action: "info@oxbowintellect.com",
    meta: "24×7 NOC · Growth & Enterprise",
  },
  {
    id: "partnership",
    icon: Handshake,
    palette: "bg-teal-50 text-teal-600",
    ringPalette: "ring-teal-500/25",
    accent: "from-teal-700 to-emerald-700",
    title: "Partnerships",
    description: "System integrators, GIS consultancies, drone operators and legal firms welcome.",
    action: "info@oxbowintellect.com",
    meta: "Referral & co-sell tiers",
  },
];

const inputCls =
  "w-full rounded-xl border border-brand-navy/12 bg-white px-4 py-3 text-sm text-brand-navy placeholder:text-brand-navy/35 outline-none transition-all focus:border-brand-indigo focus:ring-4 focus:ring-brand-indigo/10";

function Field({
  label,
  required,
  icon,
  children,
}: {
  label: string;
  required?: boolean;
  icon?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-brand-navy/55">
        {icon && <span className="text-brand-indigo">{icon}</span>}
        {label}
        {required && <span className="text-brand-purple">*</span>}
      </span>
      {children}
    </label>
  );
}

export default function ContactMain() {
  const [form, setForm] = useState<FormState>(initialForm);
  const [company_website, setCompanyWebsite] = useState(""); // honeypot
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const successRef = useRef<HTMLDivElement>(null);

  const update = <K extends keyof FormState>(key: K, value: FormState[K]) =>
    setForm((p) => ({ ...p, [key]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.phone.trim()) return;
    setSubmitting(true);
    setError(null);

    try {
      const res = await fetch(CONTACT_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, company_website, reason: "contact-page" }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.ok) {
        throw new Error(data.error || "Something went wrong. Please try again.");
      }
      setSubmitting(false);
      setSubmitted(true);
      setTimeout(() => successRef.current?.scrollIntoView({ behavior: "smooth", block: "center" }), 60);
    } catch (err) {
      setSubmitting(false);
      setError(
        err instanceof Error
          ? err.message
          : `Could not send your message. Please email ${CONTACT_EMAIL} directly.`
      );
    }
  };

  return (
    <section id="contact-form" className="relative py-16 sm:py-24">
      <div className="container">
        <div className="grid gap-8 lg:grid-cols-[1.35fr_1fr] lg:gap-10">
          {/* LEFT — the form */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, ease: EASE }}
              className="relative overflow-hidden rounded-[28px] border border-brand-navy/10 bg-white shadow-float"
            >
              {/* Gradient border via SVG */}
              <svg
                aria-hidden
                className="pointer-events-none absolute inset-0 h-full w-full"
                style={{ overflow: "visible" }}
              >
                <defs>
                  <linearGradient id="contact-form-border" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#2F5BFF" />
                    <stop offset="50%" stopColor="#6366f1" />
                    <stop offset="100%" stopColor="#a855f7" />
                  </linearGradient>
                </defs>
                <rect
                  x="0"
                  y="0"
                  width="100%"
                  height="100%"
                  rx="28"
                  fill="none"
                  stroke="url(#contact-form-border)"
                  strokeWidth="1.5"
                  opacity="0.35"
                />
              </svg>

              {/* Form header */}
              <div className="relative border-b border-brand-navy/8 bg-gradient-to-br from-brand-indigo/[0.03] via-white to-brand-purple/[0.03] px-6 py-4 sm:px-8 sm:py-5">
                <div className="flex items-center gap-3">
                  <span className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-brand-indigo to-brand-purple text-white shadow-soft">
                    <MessageSquare size={16} strokeWidth={2.5} />
                  </span>
                  <div>
                    <h2 className="font-display text-lg font-extrabold text-brand-navy leading-tight sm:text-xl">
                      Send us a message
                    </h2>
                    <p className="mt-0.5 text-[13px] text-brand-navy/60">
                      A land-ops specialist replies within four working hours.
                    </p>
                  </div>
                </div>
              </div>

              {!submitted ? (
                <form onSubmit={handleSubmit} className="relative flex flex-col gap-4 p-6 sm:p-8">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Field label="Full name" required icon={<User size={14} strokeWidth={2.25} />}>
                      <input
                        required
                        type="text"
                        value={form.name}
                        onChange={(e) => update("name", e.target.value)}
                        placeholder="Rohan Sharma"
                        className={inputCls}
                      />
                    </Field>
                    <Field label="Work email" required icon={<Mail size={14} strokeWidth={2.25} />}>
                      <input
                        required
                        type="email"
                        value={form.email}
                        onChange={(e) => update("email", e.target.value)}
                        placeholder="rohan@company.in"
                        className={inputCls}
                      />
                    </Field>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <Field label="Phone" required icon={<Phone size={14} strokeWidth={2.25} />}>
                      <input
                        required
                        type="tel"
                        value={form.phone}
                        onChange={(e) => update("phone", e.target.value)}
                        placeholder="+91 98XXX XXXXX"
                        className={inputCls}
                      />
                    </Field>
                    <Field label="Company / organisation" icon={<Building2 size={14} strokeWidth={2.25} />}>
                      <input
                        type="text"
                        value={form.company}
                        onChange={(e) => update("company", e.target.value)}
                        placeholder="Highways Infra Pvt Ltd"
                        className={inputCls}
                      />
                    </Field>
                  </div>

                  <Field label="What are you exploring Oxland for?">
                    <select
                      value={form.projectType}
                      onChange={(e) => update("projectType", e.target.value)}
                      className={`${inputCls} appearance-none bg-[length:14px] bg-no-repeat bg-[right_14px_center] pr-10`}
                      style={{
                        backgroundImage:
                          "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='14' height='14' viewBox='0 0 24 24' fill='none' stroke='%230B1437' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'><polyline points='6 9 12 15 18 9'/></svg>\")",
                      }}
                    >
                      {PROJECT_TYPES.map((p) => (
                        <option key={p} value={p}>
                          {p}
                        </option>
                      ))}
                    </select>
                  </Field>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <Field label="Parcels under management" icon={<MapPinned size={14} strokeWidth={2.25} />}>
                      <input
                        type="text"
                        inputMode="numeric"
                        value={form.parcels}
                        onChange={(e) => update("parcels", e.target.value)}
                        placeholder="e.g. 2,500"
                        className={inputCls}
                      />
                    </Field>
                    <Field label="Preferred date" icon={<Calendar size={14} strokeWidth={2.25} />}>
                      <input
                        type="date"
                        value={form.preferredDate}
                        onChange={(e) => update("preferredDate", e.target.value)}
                        className={inputCls}
                      />
                    </Field>
                  </div>

                  <div>
                    <label className="text-xs font-bold uppercase tracking-wider text-brand-navy/55">
                      Preferred time slot
                    </label>
                    <div className="mt-2 grid grid-cols-3 gap-2">
                      {TIME_SLOTS.map((slot) => {
                        const active = form.preferredSlot === slot.id;
                        return (
                          <button
                            key={slot.id}
                            type="button"
                            onClick={() => update("preferredSlot", slot.id)}
                            className={`relative overflow-hidden rounded-xl border px-3 py-3 text-left transition-all duration-200 ${
                              active
                                ? "border-brand-indigo bg-gradient-to-br from-brand-indigo/10 to-brand-purple/10 shadow-[0_2px_10px_rgba(79,70,229,0.18)]"
                                : "border-brand-navy/10 bg-white hover:border-brand-indigo/30 hover:bg-brand-indigo/[0.03]"
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <span className={`text-sm font-bold ${active ? "text-brand-indigo" : "text-brand-navy"}`}>
                                {slot.label}
                              </span>
                              {active && (
                                <span className="grid h-5 w-5 place-items-center rounded-full bg-brand-indigo text-white">
                                  <Check size={11} strokeWidth={3} />
                                </span>
                              )}
                            </div>
                            <p className="mt-0.5 text-[11px] text-brand-navy/55">{slot.hint}</p>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <Field label="Tell us about your project" icon={<MessageSquare size={14} strokeWidth={2.25} />}>
                    <textarea
                      rows={4}
                      value={form.message}
                      onChange={(e) => update("message", e.target.value)}
                      placeholder="Which state you operate in, current tools, integrations you need, timeline…"
                      className={`${inputCls} resize-none`}
                    />
                  </Field>

                  {/* Honeypot — hidden from real users, catches bots */}
                  <input
                    type="text"
                    name="company_website"
                    tabIndex={-1}
                    autoComplete="off"
                    value={company_website}
                    onChange={(e) => setCompanyWebsite(e.target.value)}
                    className="absolute -left-[9999px] h-0 w-0 opacity-0"
                    aria-hidden="true"
                  />

                  {error && (
                    <p className="rounded-xl border border-rose-200 bg-rose-50 px-3 py-2 text-[12.5px] font-medium text-rose-600">
                      {error}
                    </p>
                  )}

                  <div className="mt-1 flex items-center justify-between">
                    <p className="text-[11px] text-brand-navy/45">
                      * Required fields
                    </p>
                    <button
                      type="submit"
                      disabled={submitting}
                      className="group inline-flex items-center justify-center gap-2 rounded-full bg-brand-gradient px-6 py-3 text-sm font-semibold text-white shadow-soft transition-all hover:shadow-float disabled:opacity-60"
                    >
                      {submitting ? (
                        <>
                          <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                          Sending…
                        </>
                      ) : (
                        <>
                          Send message
                          <ArrowRight size={14} strokeWidth={2.5} className="transition-transform group-hover:translate-x-0.5" />
                        </>
                      )}
                    </button>
                  </div>
                </form>
              ) : (
                <motion.div
                  ref={successRef}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease: EASE }}
                  className="relative flex flex-col items-center gap-5 p-12 text-center"
                >
                  <div className="relative">
                    <div className="absolute inset-0 animate-pulse-soft rounded-full bg-brand-indigo/20 blur-2xl" />
                    <div className="relative grid h-16 w-16 place-items-center rounded-full bg-gradient-to-br from-brand-indigo to-brand-purple text-white shadow-float">
                      <Check size={28} strokeWidth={3} />
                    </div>
                  </div>
                  <h3 className="font-display text-2xl font-extrabold text-brand-navy">
                    Message delivered.
                  </h3>
                  <p className="max-w-md text-sm leading-relaxed text-brand-navy/60">
                    A land-ops specialist will reach you at{" "}
                    <span className="font-semibold text-brand-navy">{form.email || "your email"}</span>{" "}
                    within four working hours to confirm the slot and share a meeting link.
                  </p>
                  <div className="mt-2 inline-flex items-center gap-2 rounded-full bg-emerald-100 px-3 py-1.5 text-xs font-bold text-emerald-700">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse-soft" />
                    Reply expected by end of day
                  </div>
                </motion.div>
              )}
            </motion.div>
          </div>

          {/* RIGHT — channel cards */}
          <div className="space-y-4">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-brand-indigo/20 bg-brand-indigo/5 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-brand-indigo">
                <Sparkles size={11} strokeWidth={2.5} />
                Direct channels
              </div>
              <h3 className="mt-3 font-display text-2xl font-extrabold text-brand-navy leading-tight">
                Reach the right team{" "}
                <span className="bg-gradient-to-r from-brand-indigo to-brand-purple bg-clip-text text-transparent">
                  directly.
                </span>
              </h3>
              <p className="mt-2 text-sm text-brand-navy/60">
                Three specialised inboxes — each with its own SLA and owner.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-1">
              {CHANNELS.map((c, i) => (
                <motion.div
                  key={c.id}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.5, ease: EASE, delay: i * 0.06 }}
                  className="group relative overflow-hidden rounded-2xl border border-brand-navy/10 bg-white p-4 shadow-card transition-all hover:-translate-y-0.5 hover:shadow-float"
                >
                  <div className="flex items-start gap-3">
                    <span className={`grid h-11 w-11 shrink-0 place-items-center rounded-xl ${c.palette} ring-1 ${c.ringPalette}`}>
                      <c.icon size={18} strokeWidth={2.5} />
                    </span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <h4 className="font-display text-[15px] font-extrabold text-brand-navy leading-tight">
                          {c.title}
                        </h4>
                        <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-brand-navy/[0.04] text-brand-navy/40 transition-all group-hover:bg-brand-indigo group-hover:text-white">
                          <ArrowUpRight size={12} strokeWidth={2.5} />
                        </span>
                      </div>
                      <p className="mt-1 text-[12.5px] leading-snug text-brand-navy/60">
                        {c.description}
                      </p>
                      <div className="mt-3 flex items-center justify-between gap-3 border-t border-brand-navy/6 pt-3">
                        <a
                          href={`mailto:${c.action}`}
                          className={`text-[12px] font-bold bg-gradient-to-r ${c.accent} bg-clip-text text-transparent hover:underline`}
                        >
                          {c.action}
                        </a>
                        <span className="text-[10px] font-semibold text-brand-navy/45">
                          {c.meta}
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
