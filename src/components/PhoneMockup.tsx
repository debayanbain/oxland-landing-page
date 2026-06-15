import { motion } from "framer-motion";

export default function PhoneMockup() {
  return (
    <motion.div
      initial={{ y: 40, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      className="relative w-full flex justify-end"
      style={{ marginTop: "-80px", marginBottom: "-100px", marginRight: "-80px" }}
    >
      <img
        src="/oxland.png"
        alt="Oxland mobile app — Land Management Simplified"
        className="w-[460px] sm:w-[540px] lg:w-[640px] xl:w-[700px] object-contain select-none"
        draggable={false}
      />
    </motion.div>
  );
}
