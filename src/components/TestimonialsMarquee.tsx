import { motion } from "framer-motion";

type Testimonial = {
  name: string;
  handle: string;
  initials: string;
  quote: string;
  accent: string;
};

const testimonials: Testimonial[] = [
  {
    name: "Ananya Rao",
    handle: "@ananya_land",
    initials: "AR",
    accent: "from-[#2F5BFF] to-[#4F46E5]",
    quote:
      "Oxland is super useful. We cut parcel onboarding from weeks to days — it's now the single source of truth for our entire acquisition team.",
  },
  {
    name: "Vikram Mehta",
    handle: "@vikm",
    initials: "VM",
    accent: "from-[#4F46E5] to-[#7C3AED]",
    quote:
      "Litigation tracking tied directly to parcels and documents means nothing slips. Legal and field finally share one view — 78 cases, zero missed deadlines.",
  },
  {
    name: "Priya Nair",
    handle: "@priyagis",
    initials: "PN",
    accent: "from-[#7C3AED] to-[#A78BFA]",
    quote:
      "The GIS layers turned our maps into something leadership actually uses to make decisions. Adoption was instant — 100% team adoption in two weeks.",
  },
  {
    name: "Rohan Iyer",
    handle: "@rohaniyer",
    initials: "RI",
    accent: "from-[#2F5BFF] to-[#22D3EE]",
    quote:
      "We replaced four tools with Oxland. Workflows, documents, approvals and reporting — everything lives in one place now. Insanely valuable for a growing team.",
  },
  {
    name: "Meera Krishnan",
    handle: "@meerak",
    initials: "MK",
    accent: "from-[#4F46E5] to-[#2F5BFF]",
    quote:
      "Having actors, parcels and case data in one dialog box simplifies / automates everything much more. I've been smiling all day. 😄",
  },
  {
    name: "Arjun Bose",
    handle: "@arjbose",
    initials: "AB",
    accent: "from-[#7C3AED] to-[#4F46E5]",
    quote:
      "Live dashboards across projects mean our leadership stops asking for weekly status decks. Visibility went from spreadsheets to real-time, instantly.",
  },
  {
    name: "Saanvi Kapoor",
    handle: "@saanvik",
    initials: "SK",
    accent: "from-[#22D3EE] to-[#2F5BFF]",
    quote:
      "The automation around documents and approvals alone is worth it. Our team spends 70% less time on manual reporting and more on actually closing parcels.",
  },
  {
    name: "Devansh Pillai",
    handle: "@devansh_p",
    initials: "DP",
    accent: "from-[#A78BFA] to-[#7C3AED]",
    quote:
      "Onboarding new team members used to take a week. With Oxland, they're productive on day one — every workflow, parcel and case is right there.",
  },
];

const logos: { name: string; mark: string }[] = [
  { name: "Solaris Infra", mark: "◇" },
  { name: "Greenline Energy", mark: "◉" },
  { name: "Bharat Renewables", mark: "▲" },
  { name: "Northwind Power", mark: "◈" },
  { name: "Terraform Group", mark: "⬡" },
  { name: "Heliox", mark: "✦" },
  { name: "Vantage Land", mark: "◆" },
  { name: "Aurora Grid", mark: "○" },
];

function Card({ t }: { t: Testimonial }) {
  return (
    <figure className="group relative flex w-[340px] shrink-0 flex-col gap-4 rounded-2xl border border-border bg-white/90 p-6 shadow-card backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-float sm:w-[400px]">
      <figcaption className="flex items-center gap-3">
        <span
          className={`grid h-11 w-11 place-items-center rounded-full bg-gradient-to-br ${t.accent} font-display text-sm font-bold text-white shadow-soft`}
        >
          {t.initials}
        </span>
        <div className="leading-tight">
          <div className="font-semibold text-brand-navy">{t.name}</div>
          <div className="text-xs text-brand-navy/55">{t.handle}</div>
        </div>
      </figcaption>
      <blockquote className="text-[15px] leading-relaxed text-brand-navy/75">
        {t.quote}
      </blockquote>
    </figure>
  );
}

function Row({
  items,
  reverse = false,
  duration = 50,
}: {
  items: Testimonial[];
  reverse?: boolean;
  duration?: number;
}) {
  const doubled = [...items, ...items];
  return (
    <div className="group/row relative overflow-hidden">
      <div
        className={`flex w-max gap-6 ${reverse ? "animate-marquee-x-reverse" : "animate-marquee-x"} [animation-play-state:running] group-hover/row:[animation-play-state:paused]`}
        style={{ ["--marquee-duration" as any]: `${duration}s` }}
      >
        {doubled.map((t, i) => (
          <Card key={`${t.handle}-${i}`} t={t} />
        ))}
      </div>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-background to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-background to-transparent" />
    </div>
  );
}

export default function TestimonialsMarquee() {
  const rowA = testimonials.slice(0, 4);
  const rowB = testimonials.slice(4);

  return (
    <section className="relative py-12 sm:py-16">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto max-w-3xl text-center"
        >
          <h2 className="font-display text-4xl font-extrabold tracking-tight text-brand-navy sm:text-5xl">
            Trusted by forward-thinking land teams
          </h2>
          <p className="mt-4 text-base text-brand-navy/60 sm:text-lg">
            Acquisition, legal and GIS teams across renewables and infrastructure
            run on Oxland.
          </p>
        </motion.div>

      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.8, delay: 0.1 }}
        className="group/logos relative mt-12 overflow-hidden"
      >
        <div
          className="flex w-max animate-marquee-x items-center gap-12 sm:gap-16 [animation-play-state:running] group-hover/logos:[animation-play-state:paused]"
          style={{ ["--marquee-duration" as any]: "35s" }}
        >
          {[...logos, ...logos].map((l, i) => (
            <span
              key={`${l.name}-${i}`}
              className="flex shrink-0 items-center gap-2.5 font-display text-sm font-bold uppercase tracking-[0.18em] text-brand-navy/45 transition-colors hover:text-brand-navy/80"
            >
              <span className="text-lg text-brand-indigo/60">{l.mark}</span>
              {l.name}
            </span>
          ))}
        </div>
        <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-background to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-background to-transparent" />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        className="mt-14 flex flex-col gap-6"
      >
        <Row items={rowA} duration={55} />
        <Row items={rowB} reverse duration={65} />
      </motion.div>
    </section>
  );
}
