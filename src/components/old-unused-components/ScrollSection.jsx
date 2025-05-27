import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function ScrollSection({ children, className = "" }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10% 0px" });

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.98, filter: "blur(4px)" }}
      whileInView={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
      viewport={{ once: true }}
      transition={{ duration: 1.2, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}
