"use client";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus, MessageCircleQuestion } from "lucide-react";

export const FAQS = [
  {
    q: "Are these prices inclusive of GST?",
    a: "No — list prices are exclusive of GST. 18% GST is added at invoicing as per Indian tax law. PSU and central-ministry customers can opt for a GST-segmented invoice; e-invoice and IRN are generated automatically.",
  },
  {
    q: "Can Oxland be deployed on-prem or on a sovereign cloud?",
    a: "Yes — Enterprise customers can run Oxland on their own VPC (AWS Mumbai, Azure India, OCI Hyderabad) or on a fully on-prem appliance for restricted environments. We also support NIC and CDAC cloud for ministry deployments.",
  },
  {
    q: "Where is our data stored?",
    a: "All customer data, including GIS layers, case documents and OCR output, is stored in India-region data centres by default. Backups are encrypted at rest (AES-256) and replicated to a secondary India-region zone.",
  },
  {
    q: "Is there a minimum contract term?",
    a: "Starter and Growth are month-to-month — you can cancel anytime. Yearly billing locks the rate for 12 months with the 20% discount. Enterprise contracts are usually 24–36 months with custom terms.",
  },
  {
    q: "Do you include training and onboarding?",
    a: "Growth includes a 4-week guided onboarding with one of our land-ops specialists, two live workshops and a hand-off runbook. Enterprise gets a tailored programme: data migration, custom GIS layer onboarding, user training across multiple sites, and a dedicated CSM.",
  },
  {
    q: "Can we integrate Oxland with our existing systems?",
    a: "Yes. Growth ships with a documented REST API, webhooks and pre-built connectors for SAP, Oracle ERP, Tally, Zoho and Microsoft Dynamics. Enterprise customers get custom integration work bundled — including legacy GIS systems, court e-filing portals and state land record portals where APIs are available.",
  },
  {
    q: "What happens to our data if we leave?",
    a: "You own your data, always. On termination we provide a full export — parcels, cases, documents, GIS layers — in open formats (GeoPackage, PDF, JSON) within 30 days. After that, your tenant is purged and certified-destroyed; you'll receive a destruction certificate.",
  },
  {
    q: "How is security and compliance handled?",
    a: "Oxland is ISO 27001 and SOC 2 Type II audited, MeitY empanelled and DPDP Act 2023 compliant. We carry a ₹10 crore cyber-liability cover, run quarterly third-party pen-tests, and our DPA + MSA are available for review under NDA.",
  },
];

export default function PricingFaq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="pricing-faq" className="relative py-16 sm:py-24">
      <div className="container">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr]">
          {/* Left — heading */}
          <div className="lg:sticky lg:top-28 lg:self-start">
            <div className="inline-flex items-center gap-2 rounded-full border border-brand-indigo/20 bg-brand-indigo/5 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-brand-indigo">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-indigo" />
              FAQs
            </div>
            <h2 className="mt-5 font-display text-4xl font-extrabold tracking-tight text-brand-navy sm:text-5xl">
              Pricing &{" "}
              <span className="bg-gradient-to-r from-brand-indigo to-brand-purple bg-clip-text text-transparent">commercial questions.</span>
            </h2>
            <p className="mt-4 text-base text-brand-navy/60">
              Everything procurement, legal and finance typically ask before we sign — answered upfront.
            </p>

            <div className="mt-7 rounded-2xl border border-brand-navy/10 bg-white p-5 shadow-card">
              <div className="flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-brand-indigo/10 text-brand-indigo">
                  <MessageCircleQuestion size={18} strokeWidth={2.25} />
                </span>
                <div>
                  <p className="text-sm font-bold text-brand-navy">Still have questions?</p>
                  <p className="text-xs text-brand-navy/55">Procurement-ready answers, RFP support, demo within 24h.</p>
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
                Talk to sales
              </button>
            </div>
          </div>

          {/* Right — accordion */}
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
