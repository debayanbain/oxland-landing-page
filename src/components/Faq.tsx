import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";

const FAQS = [
  {
    q: "How quickly can we get started?",
    a: "Most teams are live within a day. Import your existing projects and parcels via spreadsheet or our API, invite your team, and start tracking acquisitions immediately — no lengthy onboarding required.",
  },
  {
    q: "Can Oxland manage multiple projects?",
    a: "Yes. Oxland is built for portfolios. Run unlimited projects across regions, each with its own parcels, cases, documents, and budgets, while rolling everything up into a single executive dashboard.",
  },
  {
    q: "Does it support GIS and parcel mapping?",
    a: "Fully. Layer states, districts, and custom boundaries; overlay acquisition zones and affected areas; and turn raw GIS data into operational intelligence your whole team can act on.",
  },
  {
    q: "Can we upload documents and track cases?",
    a: "Centralize every document with secure, versioned workflows and link them directly to parcels, proposals, and litigation cases — so nothing falls through the cracks.",
  },
  {
    q: "Is Oxland suitable for enterprise teams?",
    a: "Oxland ships with role-based access control, audit trails, multi-team collaboration, and granular permissions designed for large land operations and compliance requirements.",
  },
];

export default function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="mx-auto max-w-3xl divide-y divide-border rounded-3xl border border-border bg-white/70 backdrop-blur-sm">
      {FAQS.map((f, i) => {
        const isOpen = open === i;
        return (
          <div key={f.q} className="px-6">
            <button
              onClick={() => setOpen(isOpen ? null : i)}
              className="flex w-full items-center justify-between gap-4 py-5 text-left"
            >
              <span className="font-display text-base font-semibold text-brand-navy sm:text-lg">
                {f.q}
              </span>
              <span
                className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-secondary text-brand-indigo transition-transform duration-300"
                style={{ transform: isOpen ? "rotate(45deg)" : "none" }}
              >
                <Plus size={16} />
              </span>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <p className="pb-5 pr-12 text-[15px] leading-relaxed text-brand-navy/65">
                    {f.a}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
