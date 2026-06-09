import { useEffect, useState } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";

/**
 * ParallaxBackground — drifts the ambient aurora/grid layers slowly with page scroll,
 * giving the page depth without competing with section content.
 */
export default function ParallaxBackground() {
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();
  const [docHeight, setDocHeight] = useState(2000);

  useEffect(() => {
    const update = () => setDocHeight(document.documentElement.scrollHeight);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const auroraY = useTransform(scrollY, [0, docHeight], [0, -240]);
  const gridY = useTransform(scrollY, [0, docHeight], [0, 120]);
  const auroraOpacity = useTransform(scrollY, [0, 800], [1, 0.65]);

  if (reduce) {
    return (
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute inset-0 aurora" />
        <div className="absolute inset-0 bg-grid-faint [background-size:54px_54px] opacity-50 mask-fade-b" />
      </div>
    );
  }

  return (
    <div className="pointer-events-none fixed inset-0 -z-10">
      <motion.div className="absolute inset-0 aurora" style={{ y: auroraY, opacity: auroraOpacity }} />
      <motion.div
        className="absolute inset-0 bg-grid-faint [background-size:54px_54px] opacity-50 mask-fade-b"
        style={{ y: gridY }}
      />
    </div>
  );
}
