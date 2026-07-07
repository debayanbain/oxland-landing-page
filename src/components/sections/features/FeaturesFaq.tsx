"use client";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus, MessageCircleQuestion } from "lucide-react";

const FAQS = [
  {
    q: "Do we need to migrate our existing GIS data to use Oxland?",
    a: "No. Oxland ingests Shapefile, GeoPackage, KML/KMZ and most state-portal exports. We can mirror your current GIS layer structure or rebuild it cleanly — your choice. Most teams do a hybrid: keep their legacy ESRI/QGIS layers as-is, and let Oxland become the parcel-level workspace on top.",
  },
  {
    q: "How does the offline survey app work for areas with no signal?",
    a: "The Android app caches the relevant project area, parcel attributes, photo upload queue and form templates on-device. Surveyors can capture, geo-tag, sketch and fill records without any signal — when they're back on Wi-Fi or 4G, everything syncs to the cloud parcel record automatically.",
  },
  {
    q: "Can Oxland handle the litigation volume of a major infrastructure project?",
    a: "Yes — our largest tenant tracks 4,200+ active cases across 11 states. The case engine indexes hearings, orders, counsel allocations and party-wise dossiers. OCR runs on every uploaded order and links it back to the parcel and the case automatically.",
  },
  {
    q: "How customisable are the workflows?",
    a: "Approval matrices, stage transitions, document checklists, validation rules and notification rules are all configurable per project — no code, no developer involvement. For state-rule-specific computations (like RFCTLARR awards), we ship pre-built logic that you can tune.",
  },
  {
    q: "What integrations are available out of the box?",
    a: "SAP, Oracle ERP, Tally, Zoho, Microsoft Dynamics, DocuSign, Adobe Sign, NIC e-procurement and most state land-record portals where APIs are published. We also expose a documented REST API and webhooks for anything custom.",
  },
  {
    q: "How do you handle vernacular content — RoR in Hindi, court orders in Marathi?",
    a: "OCR runs on 10 Indian languages today. Extracted text is tagged at field level (khasra, owner, area, dates) and indexed for search — so a query like 'show me all orders mentioning section 11A in district Pune' works regardless of source language.",
  },
  {
    q: "What about data residency and compliance?",
    a: "All customer data sits in India-region data centres (AWS Mumbai, Azure India, OCI Hyderabad) by default. Backups are encrypted at rest. We are ISO 27001 audited, MeitY empanelled, and DPDP Act 2023 compliant — DPA and MSA available under NDA.",
  },
  {
    q: "Can we white-label Oxland for our PSU / nodal-agency rollout?",
    a: "Yes — Enterprise customers can run Oxland under their own brand, with custom domain, logos, colour tokens and onboarding flow. Your end users will never see the word 'Oxland' unless you want them to.",
  },
];

export default function FeaturesFaq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="relative py-20 sm:py-28">
      <div className="container">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr]">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <div className="inline-flex items-center gap-2 rounded-full border border-brand-indigo/20 bg-brand-indigo/5 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-brand-indigo">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-indigo" />
              FAQs
            </div>
            <h2 className="mt-5 font-display text-4xl font-extrabold tracking-tight text-brand-navy sm:text-5xl">
              Features &{" "}
              <span className="bg-gradient-to-r from-brand-indigo to-brand-purple bg-clip-text text-transparent">platform questions.</span>
            </h2>
            <p className="mt-4 text-base text-brand-navy/60">
              Everything teams ask in evaluation calls — answered upfront so you can move faster.
            </p>

            <div className="mt-7 rounded-2xl border border-brand-navy/10 bg-white p-5 shadow-card">
              <div className="flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-brand-indigo/10 text-brand-indigo">
                  <MessageCircleQuestion size={18} strokeWidth={2.25} />
                </span>
                <div>
                  <p className="text-sm font-bold text-brand-navy">Couldn't find your answer?</p>
                  <p className="text-xs text-brand-navy/55">Our land-ops team replies within one working day.</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() =>
                  window.dispatchEvent(
                    new CustomEvent("oxland:open-contact", { detail: { reason: "sales" } })
                  )
                }
                className="mt-4 inline-flex w-full items-center justify-center rounded-full bg-brand-gradient px-4 py-2.5 text-sm font-semibold text-white shadow-soft transition-all hover:shadow-float"
              >
                Ask a specialist
              </button>
            </div>
          </div>

          <div className="divide-y divide-brand-navy/8 rounded-3xl border border-brand-navy/10 bg-white shadow-card overflow-hidden">
            {FAQS.map((f, i) => {
              const isOpen = open === i;
              return (
                <div key={f.q} className="px-6 transition-colors duration-300 hover:bg-brand-indigo/[0.02] sm:px-8">
                  <button
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="flex w-full items-center justify-between gap-4 py-5 text-left"
                  >
                    <span className="font-display text-base font-bold text-brand-navy pr-4 sm:text-[17px]">
                      {f.q}
                    </span>
                    <span
                      className={`grid h-8 w-8 shrink-0 place-items-center rounded-full transition-all duration-300 ${
                        isOpen ? "bg-brand-indigo text-white rotate-45" : "bg-brand-navy/5 text-brand-indigo"
                      }`}
                    >
                      <Plus size={15} strokeWidth={2.5} />
                    </span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="pb-5 pr-10 text-[14px] leading-relaxed text-brand-navy/65">
                          {f.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
