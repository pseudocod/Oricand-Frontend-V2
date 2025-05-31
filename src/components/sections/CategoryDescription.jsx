import { motion } from "framer-motion";

export default function CategoryDescription({ description, theme }) {
  return (
    <div className="w-ful px-6 md:px-20 py-32">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="max-w-5xl mx-auto text-center"
      >
        <p
          className={`text-2xl md:text-3xl leading-relaxed font-light text-black ${theme.font}`}
        >
          {description}
        </p>
      </motion.div>
    </div>
  );
}
