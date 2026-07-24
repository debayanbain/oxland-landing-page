"use client";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus, MessageCircleQuestion } from "lucide-react";

export const FAQS = [
  {
    q: "Which OxLand plan is right for my organization?",
    a: "OxLand Enterprise is built for organizations managing land acquisition, land records, GIS, litigation, and Geo-AI-powered land operations across multiple projects or locations. For organizations that want to evaluate the platform before deployment, the Free Evaluation Workspace provides access to its core capabilities.",
  },
  {
    q: "Can I try OxLand before purchasing?",
    a: "Yes. You can start with a Free Evaluation Workspace to explore key capabilities before choosing an Enterprise deployment.",
  },
  {
    q: "Does OxLand include Geo-AI capabilities?",
    a: "Yes. Enterprise customers can use Geo-AI powered capabilities such as land change detection, spatial analysis, intelligent land monitoring, and map-based insights, depending on the licensed modules and available project data.",
  },
  {
    q: "Can OxLand integrate with our existing systems?",
    a: "Yes. OxLand supports API-based integration with enterprise applications, GIS platforms, document management systems, and other third-party software where integration is technically feasible.",
  },
  {
    q: "Can OxLand be deployed on-premises or in the cloud?",
    a: "Yes. Enterprise deployments can be hosted on your own infrastructure or in the cloud, depending on your organization's IT and security requirements.",
  },
  {
    q: "How is Enterprise pricing determined?",
    a: "Enterprise pricing depends on factors such as project size, number of users, deployment model, required modules, implementation scope, and support requirements.",
  },
  {
    q: "Is onboarding and training included?",
    a: "Yes. Enterprise deployments include implementation guidance, onboarding, user training, and customer support as defined in your agreement.",
  },
  {
    q: "How long does implementation take?",
    a: "Implementation timelines vary based on project scope, data availability, required integrations, and deployment requirements. Our team will provide a project plan during onboarding.",
  },
  {
    q: "Can we upgrade as our requirements grow?",
    a: "Yes. Additional users, projects, storage, modules, and capabilities can be added as your organization's requirements evolve.",
  },
  {
    q: "Who owns the data stored in OxLand?",
    a: "Your organization retains ownership of its data. Data handling, export options, and retention policies are governed by the applicable agreement and deployment model.",
  },
  {
    q: "Who is eligible for the Free Evaluation Workspace?",
    a: "The Free Evaluation Workspace is available for qualified organizations involved in land acquisition & land management, infrastructure & project development, construction & engineering, mining & natural resources, renewable energy & utilities, government departments & public sector undertakings (PSUs), industrial & manufacturing organizations, and others managing significant land assets or land banks. To ensure the best onboarding experience, all Free Evaluation requests are reviewed and approved by the OxLand team based on the organization's business use case. Please note: Free Evaluation Workspaces are currently not available for individual use, academic demonstrations, general software evaluation, marketing agencies, or organizations without an active land management or land acquisition requirement.",
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
