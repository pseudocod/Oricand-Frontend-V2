// components/Marquee.jsx
import { motion } from "framer-motion";

export default function Marquee() {
  return (
    <div className="overflow-hidden whitespace-nowrap border-t border-b border-neutral-300 py-4 bg-white">
      <motion.div
        animate={{ x: ["100%", "-100%"] }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        className="inline-block text-neutral-500 uppercase tracking-widest text-sm font-bold"
      >
        DON'T MISS OUT ON THE LATEST DROPS! STAY TUNED FOR EXCLUSIVE RELEASES
        AND LIMITED EDITIONS. ANYTIME/ORICAND
      </motion.div>
    </div>
  );
}
