"use client";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  X,
  ArrowRight,
  Calendar,
  User,
  Mail,
  Phone,
  Building2,
  MapPinned,
  MessageSquare,
  ShieldCheck,
  Clock,
  Check,
  Sparkles,
} from "lucide-react";

const EASE = [0.22, 1, 0.36, 1] as const;

const PROJECT_TYPES = [
  "Land acquisition & parcel management",
  "Litigation & case tracking",
  "GIS, cadastre & surveying",
  "R&R / compensation management",
  "Drone & IoT monitoring",
  "Document OCR & workflows",
  "End-to-end land operations platform",
  "Other / not sure yet",
];

const TIME_SLOTS = [
  { id: "morning", label: "Morning", hint: "9 AM – 12 PM" },
  { id: "afternoon", label: "Afternoon", hint: "12 PM – 4 PM" },
  { id: "evening", label: "Evening", hint: "4 PM – 7 PM" },
];

const VALUE_POINTS = [
  { icon: Clock, text: "30-minute land-ops walkthrough" },
  { icon: ShieldCheck, text: "Custom NDA on request" },
  { icon: Sparkles, text: "Tailored pricing within 48 hours" },
];

declare global {
  interface Window {
    openOxlandContact?: (reason?: string) => void;
  }
}

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

export default function ContactModal() {
  const [open, setOpen] = useState(false);
  const [reason, setReason] = useState<string | undefined>(undefined);
  const [form, setForm] = useState<FormState>(initialForm);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const firstFieldRef = useRef<HTMLInputElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  // Listen for global open events
  useEffect(() => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent).detail;
      setReason(detail?.reason);
      setOpen(true);
    };
    window.addEventListener("oxland:open-contact", handler);
    window.openOxlandContact = (r?: string) => {
      setReason(r);
      setOpen(true);
    };
    return () => {
      window.removeEventListener("oxland:open-contact", handler);
      delete window.openOxlandContact;
    };
  }, []);

  // Escape to close + body scroll lock + autofocus first field
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.documentElement.style.overflow = "hidden";
    // Tiny delay so the panel is in the DOM before focusing
    const t = setTimeout(() => firstFieldRef.current?.focus(), 120);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = "";
      clearTimeout(t);
    };
  }, [open]);

  // Reset success state after close animation
  useEffect(() => {
    if (open) return;
    const t = setTimeout(() => {
      setSubmitted(false);
      setForm(initialForm);
    }, 400);
    return () => clearTimeout(t);
  }, [open]);

  const update = <K extends keyof FormState>(key: K, value: FormState[K]) =>
    setForm((p) => ({ ...p, [key]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.phone.trim()) return;
    setSubmitting(true);
    // Placeholder submit — wire to your backend / Formspree / Web3Forms later
    await new Promise((r) => setTimeout(r, 900));
    setSubmitting(false);
    setSubmitted(true);
  };

  const headerCopy = (() => {
    switch (reason) {
      case "roi":
        return {
          eyebrow: "Custom ROI Report",
          title: "Get a tailored ROI breakdown",
          subtitle:
            "Tell us about your project — we'll send back a custom impact report and a deployment estimate within 48 hours.",
        };
      case "sales":
        return {
          eyebrow: "Talk to Sales",
          title: "Schedule a free consultation",
          subtitle:
            "Walk us through your land operation. We'll come back with the right plan, integration scope and a procurement-ready quote.",
        };
      default:
        return {
          eyebrow: "Schedule a Call",
          title: "Schedule a free consultation at your preferred time",
          subtitle:
            "Share a few details about your project and pick a slot that suits your team. A land-ops specialist will reach out within one working day.",
        };
    }
  })();

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-labelledby="contact-modal-title"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: EASE }}
            onClick={() => setOpen(false)}
            className="absolute inset-0 bg-brand-navy/55 backdrop-blur-md"
          />

          {/* Panel */}
          <motion.div
            ref={panelRef}
            initial={{ opacity: 0, y: 20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.97 }}
            transition={{ duration: 0.42, ease: EASE }}
            className="relative w-full max-w-[1080px] max-h-[92vh] overflow-hidden rounded-[28px] bg-white shadow-float"
          >
            {/* Gradient border via SVG */}
            <svg
              aria-hidden
              className="pointer-events-none absolute inset-0 h-full w-full"
              style={{ overflow: "visible" }}
            >
              <defs>
                <linearGradient id="modal-border" x1="0%" y1="0%" x2="100%" y2="100%">
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
                stroke="url(#modal-border)"
                strokeWidth="1.5"
                opacity="0.4"
              />
            </svg>

            <div className="relative grid h-full max-h-[92vh] grid-cols-1 overflow-hidden lg:grid-cols-[0.85fr_1.15fr]">
              {/* Left — Brand panel */}
              <div className="relative hidden overflow-hidden bg-brand-navy p-10 lg:flex lg:flex-col xl:p-12">
                {/* Layer 1 — dashboard product peek (cinematic) */}
                <div
                  className="pointer-events-none absolute inset-0 opacity-[0.18]"
                  style={{
                    backgroundImage: "url(/dashboard.webp)",
                    backgroundSize: "150%",
                    backgroundPosition: "right -20% bottom -10%",
                    backgroundRepeat: "no-repeat",
                    filter: "saturate(0.85) blur(0.5px)",
                  }}
                />
                {/* Layer 2 — left-to-right gradient veil so headline stays crisp, dashboard reveals on the right */}
                <div
                  className="pointer-events-none absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(105deg, rgba(11,20,55,0.96) 0%, rgba(11,20,55,0.86) 38%, rgba(11,20,55,0.55) 70%, rgba(11,20,55,0.35) 100%)",
                  }}
                />
                {/* Layer 3 — subtle SaaS grid */}
                <div
                  className="pointer-events-none absolute inset-0 opacity-[0.09]"
                  style={{
                    backgroundImage:
                      "linear-gradient(to right, rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.6) 1px, transparent 1px)",
                    backgroundSize: "44px 44px",
                    maskImage:
                      "radial-gradient(ellipse at center, black 40%, transparent 85%)",
                    WebkitMaskImage:
                      "radial-gradient(ellipse at center, black 40%, transparent 85%)",
                  }}
                />
                {/* Layer 4 — gradient orbs (depth) */}
                <div className="pointer-events-none absolute inset-0">
                  <div
                    className="absolute -top-24 -left-16 h-72 w-72 rounded-full blur-3xl opacity-70"
                    style={{
                      background:
                        "radial-gradient(closest-side, rgba(79,70,229,0.65), transparent 70%)",
                    }}
                  />
                  <div
                    className="absolute -bottom-32 -right-20 h-[420px] w-[420px] rounded-full blur-3xl opacity-55"
                    style={{
                      background:
                        "radial-gradient(closest-side, rgba(124,58,237,0.65), transparent 70%)",
                    }}
                  />
                  <div
                    className="absolute top-1/3 right-[-6%] h-56 w-56 rounded-full blur-3xl opacity-40"
                    style={{
                      background:
                        "radial-gradient(closest-side, rgba(47,91,255,0.55), transparent 70%)",
                    }}
                  />
                </div>
                {/* Layer 5 — atmospheric cloud (lifted from hero) */}
                <img
                  src="/cloud1.webp"
                  alt=""
                  aria-hidden
                  width="1920"
                  height="1080"
                  loading="lazy"
                  decoding="async"
                  className="pointer-events-none absolute -top-14 -right-10 w-[280px] select-none opacity-[0.14] blur-[2px] mix-blend-screen"
                />
                {/* Layer 6 — fine noise / shimmer hint via animated gradient line */}
                <div
                  className="pointer-events-none absolute inset-x-0 top-0 h-px"
                  style={{
                    background:
                      "linear-gradient(90deg, transparent, rgba(167,139,250,0.6), transparent)",
                  }}
                />

                <div className="relative">
                  <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-widest text-white/90 backdrop-blur-md ring-1 ring-white/20">
                    <span className="h-1.5 w-1.5 rounded-full bg-brand-lavender animate-pulse-soft" />
                    {headerCopy.eyebrow}
                  </span>
                  <h2
                    id="contact-modal-title"
                    className="mt-5 font-display text-3xl font-extrabold leading-tight text-white xl:text-[34px]"
                  >
                    {headerCopy.title}
                  </h2>
                  <p className="mt-3 text-sm leading-relaxed text-white/65">
                    {headerCopy.subtitle}
                  </p>
                </div>

                <div className="relative mt-auto pt-10">
                  <ul className="space-y-3">
                    {VALUE_POINTS.map((v) => (
                      <li key={v.text} className="flex items-center gap-3 text-sm text-white/85">
                        <span className="grid h-8 w-8 place-items-center rounded-xl bg-white/10 text-brand-lavender ring-1 ring-white/15">
                          <v.icon size={14} strokeWidth={2.25} />
                        </span>
                        {v.text}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-8 rounded-2xl border border-white/15 bg-white/[0.06] p-4 backdrop-blur-md">
                    <p className="text-[11px] font-bold uppercase tracking-widest text-white/55">
                      Need it sooner?
                    </p>
                    <p className="mt-1 text-sm font-semibold text-white">
                      Call us · <span className="text-brand-lavender">+91 80 4000 8800</span>
                    </p>
                    <p className="mt-0.5 text-xs text-white/55">Mon – Sat · 9 AM to 7 PM IST</p>
                  </div>
                </div>
              </div>

              {/* Right — Form */}
              <div className="relative flex flex-col overflow-y-auto">
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="absolute right-4 top-4 z-10 grid h-9 w-9 place-items-center rounded-full border border-brand-navy/10 bg-white text-brand-navy/65 transition-colors hover:bg-brand-navy/[0.04] hover:text-brand-navy"
                  aria-label="Close"
                >
                  <X size={16} strokeWidth={2.25} />
                </button>

                {/* Mobile header (replaces left panel on small screens) */}
                <div className="border-b border-brand-navy/8 p-6 lg:hidden">
                  <span className="inline-flex items-center gap-2 rounded-full border border-brand-indigo/20 bg-brand-indigo/5 px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-brand-indigo">
                    <span className="h-1.5 w-1.5 rounded-full bg-brand-indigo" />
                    {headerCopy.eyebrow}
                  </span>
                  <h2 className="mt-3 font-display text-2xl font-extrabold leading-tight text-brand-navy">
                    {headerCopy.title}
                  </h2>
                </div>

                {!submitted ? (
                  <form onSubmit={handleSubmit} className="flex flex-col gap-5 p-6 sm:p-8 lg:p-10">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <Field
                        label="Full name"
                        required
                        icon={<User size={14} strokeWidth={2.25} />}
                      >
                        <input
                          ref={firstFieldRef}
                          required
                          type="text"
                          value={form.name}
                          onChange={(e) => update("name", e.target.value)}
                          placeholder="Rohan Sharma"
                          className={inputCls}
                        />
                      </Field>
                      <Field
                        label="Work email"
                        required
                        icon={<Mail size={14} strokeWidth={2.25} />}
                      >
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
                      <Field
                        label="Phone"
                        required
                        icon={<Phone size={14} strokeWidth={2.25} />}
                      >
                        <input
                          required
                          type="tel"
                          value={form.phone}
                          onChange={(e) => update("phone", e.target.value)}
                          placeholder="+91 98XXX XXXXX"
                          className={inputCls}
                        />
                      </Field>
                      <Field
                        label="Company / organisation"
                        icon={<Building2 size={14} strokeWidth={2.25} />}
                      >
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
                      <Field
                        label="Parcels under management"
                        icon={<MapPinned size={14} strokeWidth={2.25} />}
                      >
                        <input
                          type="text"
                          inputMode="numeric"
                          value={form.parcels}
                          onChange={(e) => update("parcels", e.target.value)}
                          placeholder="e.g. 2,500"
                          className={inputCls}
                        />
                      </Field>
                      <Field
                        label="Preferred date"
                        icon={<Calendar size={14} strokeWidth={2.25} />}
                      >
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
                                <span
                                  className={`text-sm font-bold ${active ? "text-brand-indigo" : "text-brand-navy"}`}
                                >
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

                    <Field
                      label="Anything we should know? (optional)"
                      icon={<MessageSquare size={14} strokeWidth={2.25} />}
                    >
                      <textarea
                        rows={3}
                        value={form.message}
                        onChange={(e) => update("message", e.target.value)}
                        placeholder="State you operate in, current tools, integrations needed…"
                        className={`${inputCls} resize-none`}
                      />
                    </Field>

                    <div className="mt-2 flex flex-col-reverse items-stretch gap-3 sm:flex-row sm:items-center sm:justify-between">
                      <p className="text-[11px] leading-relaxed text-brand-navy/45">
                        By submitting, you agree to our privacy policy. We never share your contact with third parties.
                      </p>
                      <button
                        type="submit"
                        disabled={submitting}
                        className="group inline-flex items-center justify-center gap-2 rounded-full bg-brand-gradient px-6 py-3 text-sm font-semibold text-white shadow-soft transition-all hover:shadow-float disabled:opacity-70"
                      >
                        {submitting ? (
                          <>
                            <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                            Sending…
                          </>
                        ) : (
                          <>
                            Schedule my consultation
                            <ArrowRight size={14} strokeWidth={2.5} className="transition-transform group-hover:translate-x-0.5" />
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: EASE }}
                    className="flex flex-1 flex-col items-center justify-center gap-5 p-10 text-center"
                  >
                    <div className="relative">
                      <div className="absolute inset-0 animate-pulse-soft rounded-full bg-brand-indigo/20 blur-2xl" />
                      <div className="relative grid h-16 w-16 place-items-center rounded-full bg-gradient-to-br from-brand-indigo to-brand-purple text-white shadow-float">
                        <Check size={28} strokeWidth={3} />
                      </div>
                    </div>
                    <h3 className="font-display text-2xl font-extrabold text-brand-navy">
                      You're on the calendar.
                    </h3>
                    <p className="max-w-md text-sm leading-relaxed text-brand-navy/60">
                      A land-ops specialist will reach you within one working day at{" "}
                      <span className="font-semibold text-brand-navy">{form.email || "your email"}</span>{" "}
                      to confirm the slot and share a meeting link.
                    </p>
                    <button
                      type="button"
                      onClick={() => setOpen(false)}
                      className="mt-2 rounded-full border border-brand-navy/15 px-5 py-2.5 text-sm font-semibold text-brand-navy transition-colors hover:bg-brand-navy/5"
                    >
                      Close
                    </button>
                  </motion.div>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

const inputCls =
  "w-full rounded-xl border border-brand-navy/12 bg-white px-3.5 py-2.5 text-sm text-brand-navy placeholder:text-brand-navy/35 outline-none transition-all focus:border-brand-indigo focus:ring-4 focus:ring-brand-indigo/10";

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
