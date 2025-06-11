import { motion } from "framer-motion";

export default function OricandConcept() {
  return (
    <section className="text-richblack w-full py-24 px-4 md:px-8 lg:px-12">
      <motion.div
        className="w-full"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true, amount: 0.6 }}
      >
        <p className="text-2xl md:text-3xl lg:text-4xl leading-relaxed font-normal text-center tracking-normal">
          <span className="font-semibold">ORICÂND</span> is a themed e-commerce platform blending cultural storytelling
          with curated coffee drops. Instead of overwhelming you with endless
          choices, we release limited collections that speak to moods, moments,
          and identities. Our goal? Make coffee emotional — not just transactional.
        </p>
      </motion.div>
    </section>
  );
}
