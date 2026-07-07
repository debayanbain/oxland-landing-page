"use client";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus, MessageCircleQuestion, Phone } from "lucide-react";

const FAQS = [
  {
    q: "How quickly will someone respond to my message?",
    a: "For Growth and Enterprise enquiries, a land-ops specialist reaches out within four working hours. Starter enquiries get a response within eight business hours. Support tickets for active customers are triaged within one hour by our 24×7 NOC.",
  },
  {
    q: "Can I book a live demo instead of writing?",
    a: "Yes. Click 'Book a live demo' on any card — you'll get a scheduling window with our team's real calendar. 45-minute sessions run Monday to Saturday, 9 AM to 7 PM IST, and include a hands-on walkthrough with your parcel data if you send it in advance.",
  },
  {
    q: "Do you sign NDAs before sharing project details?",
    a: "Yes. Mention 'NDA required' in your message and we'll route the mutual NDA before the first call. For PSUs and state agencies, we can execute on your standard NDA template within one working day.",
  },
  {
    q: "How do you handle RFP responses and tender enquiries?",
    a: "Send tender documents and the RFP reference to tenders@oxland.in. Our proposal team responds with the compliance dossier, past-performance credentials, technical specs and pricing — typically within 24 hours. We are MeitY empanelled and GeM-ready.",
  },
  {
    q: "Can we meet in person at your office?",
    a: "Absolutely. Our Bengaluru, Mumbai and Delhi offices welcome visits by appointment. Mention the office and preferred date in your message — we'll confirm and share meeting-room details, parking and any building access requirements.",
  },
  {
    q: "I'm evaluating for a PSU / state nodal agency. Who do I contact?",
    a: "Our public-sector team handles PSU, state nodal agency and central-ministry enquiries. Email tenders@oxland.in or select 'Public sector' in the form. The Delhi office is our dedicated hub for public-sector delivery.",
  },
  {
    q: "What if I need product support, not sales?",
    a: "If you're already a customer, email support@oxland.in or use the in-product chat — routed to on-call engineers. Growth and Enterprise tenants have a dedicated Slack channel with sub-hour response SLAs.",
  },
  {
    q: "Do you have partners or resellers in my region?",
    a: "We work with system integrators, GIS consultancies, drone operators, DGCA pilots and legal firms across India. Email partners@oxland.in for our partner tiers, margin structure and co-sell playbook.",
  },
];

export default function ContactFaq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="contact-faq" className="relative py-16 sm:py-24">
      <div className="container">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr]">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <div className="inline-flex items-center gap-2 rounded-full border border-brand-indigo/20 bg-brand-indigo/5 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-brand-indigo">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-indigo" />
              FAQs
            </div>
            <h2 className="mt-5 font-display text-4xl font-extrabold tracking-tight text-brand-navy sm:text-5xl">
              Everything about{" "}
              <span className="bg-gradient-to-r from-brand-indigo to-brand-purple bg-clip-text text-transparent">
                getting in touch.
              </span>
            </h2>
            <p className="mt-4 text-base text-brand-navy/60">
              Response times, NDAs, tender submissions, in-person meetings — answered upfront so you know what to expect.
            </p>

            <div className="mt-7 rounded-2xl border border-brand-navy/10 bg-white p-5 shadow-card">
              <div className="flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-brand-indigo/10 text-brand-indigo">
                  <MessageCircleQuestion size={18} strokeWidth={2.25} />
                </span>
                <div>
                  <p className="text-sm font-bold text-brand-navy">Prefer a real conversation?</p>
                  <p className="text-xs text-brand-navy/55">We answer the phone Mon–Sat, 9–7 IST.</p>
                </div>
              </div>
              <a
                href="tel:+918040008800"
                className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full bg-brand-gradient px-4 py-2.5 text-sm font-semibold text-white shadow-soft transition-all hover:shadow-float"
              >
                <Phone size={13} strokeWidth={2.5} />
                +91 80 4000 8800
              </a>
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
