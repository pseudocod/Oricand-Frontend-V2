// components/PoeticLine.jsx
import { motion } from "framer-motion";

export default function PoeticLine() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.2, ease: "easeOut" }}
      viewport={{ once: true }}
      className="py-24 px-6 text-center"
    >
    </motion.div>
  );
}
