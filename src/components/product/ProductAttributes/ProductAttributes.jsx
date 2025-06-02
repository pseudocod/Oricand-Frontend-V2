import { motion } from "framer-motion";

export default function ProductAttributes({ groupedAttributes }) {
  return (
    <section className="w-full px-6 md:pl-32 md:pr-0 max-w-6xl mx-auto pt-0 pb-24">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-8">
        {Object.entries(groupedAttributes).map(([key, values], i) => (
          <motion.div
            key={key}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ delay: i * 0.05 }}
          >
            <div className="pl-5 border-l-2 border-black hover:opacity-80 transition">
              <p className="text-xs font-medium uppercase text-neutral-400 tracking-widest mb-1">
                {key}
              </p>
              <p className="text-xl text-black leading-snug font-light">
                {values.join(", ")}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
} 