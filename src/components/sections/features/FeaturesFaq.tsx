"use client";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus, MessageCircleQuestion } from "lucide-react";

export const FAQS = [
  {
    q: "What is OxLand and who is it built for?",
    a: "OxLand is a Geo-AI powered Land Management Platform that helps organizations manage land acquisition, land records, GIS mapping, litigation, document management, land bank monitoring, Rehabilitation & Resettlement (R&R), and executive reporting from a single platform. It is designed for organizations that own, acquire, develop, or manage land assets across renewable energy, mining, manufacturing, infrastructure, industrial parks, logistics, ports, railways, government agencies, and other land-intensive industries.",
  },
  {
    q: "Can OxLand manage the complete land acquisition lifecycle?",
    a: "Yes. OxLand provides configurable workflows to support every stage of the land acquisition process, including parcel identification, GIS mapping, ownership information management, survey activities, negotiations, document collection, approvals, compensation tracking, mutation monitoring, and post-acquisition record management. Organizations can configure the workflows to align with their internal processes and applicable regulations.",
  },
  {
    q: "How does OxLand help organizations manage large land banks?",
    a: "OxLand centralizes land information into a single digital platform, allowing teams to monitor parcel status, ownership, acquisition progress, litigation, document availability, and land utilization through GIS maps and real-time dashboards. This enables better visibility and informed decision-making across geographically distributed land assets.",
  },
  {
    q: "Can OxLand integrate with our existing land records and GIS data?",
    a: "Yes. OxLand supports importing cadastral maps, GIS layers, Shapefiles, GeoJSON, KML/KMZ, GeoPackages, Excel datasets, and digitized land records. Existing datasets can be integrated into the platform while preserving historical information, subject to data quality and compatibility.",
  },
  {
    q: "Does OxLand include a mobile application for field teams?",
    a: "Yes. The OxLand Mobile App enables authorized field personnel to capture GPS coordinates, photographs, survey observations, owner interactions, and supporting documents directly from the field. Offline data capture is supported, with synchronization occurring when network connectivity becomes available.",
  },
  {
    q: "How does Geo-AI support land monitoring?",
    a: "OxLand combines GIS with Geo-AI capabilities to assist organizations in monitoring land assets. Depending on available imagery and project requirements, the platform can help identify land-use changes, potential encroachments, project progress, and other spatial insights that support operational planning and decision-making. Geo-AI outputs are intended to assist users and should be reviewed alongside applicable field verification and organizational processes where required.",
  },
  {
    q: "Can OxLand help manage land-related litigation?",
    a: "Yes. OxLand includes Litigation Management capabilities that help organizations organize and monitor land-related legal matters, including court cases, hearing schedules, legal notices, case documents, advocates, and associated land parcels. The platform provides centralized visibility and workflow support; however, legal decisions and case outcomes remain subject to judicial and regulatory processes.",
  },
  {
    q: "Can OxLand generate reports and executive dashboards?",
    a: "Yes. OxLand provides configurable dashboards and reports covering land acquisition progress, land bank status, litigation, compensation tracking, document management, survey activities, ownership records, and operational KPIs. Reports can be filtered, exported, and customized to support management reviews and project monitoring.",
  },
  {
    q: "Can multiple departments collaborate on the same platform?",
    a: "Yes. OxLand supports collaboration across Land, Legal, GIS, Survey, Projects, Finance, R&R, and Management teams through role-based access controls, configurable approval workflows, notifications, and complete audit trails. This helps improve coordination while maintaining controlled access to sensitive information.",
  },
  {
    q: "How does OxLand help protect and secure land information?",
    a: "OxLand incorporates enterprise security features including role-based access control, user authentication, audit logging, encrypted communication, and configurable permissions to help organizations safeguard their land-related information. Deployment options and security configurations can be aligned with an organization's IT and governance requirements.",
  },
  {
    q: "Can OxLand be customized to our organization's land management process?",
    a: "Yes. OxLand is designed to support configurable workflows, approval hierarchies, dashboards, reports, document templates, and business rules. This allows organizations to align the platform with their operational processes, governance policies, and project requirements without changing their core business practices.",
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
