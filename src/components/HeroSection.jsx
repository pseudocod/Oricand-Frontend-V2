import { motion } from "framer-motion";

export default function HeroSection() {
  return (
    <div className="relative h-screen w-full overflow-hidden bg-black text-white">
      {/* Optional ambient grain or background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0d0d0d] via-[#111] to-[#0a0a0a]" />

      <motion.div
        className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6"
        initial="hidden"
        animate="show"
        variants={{
          hidden: {},
          show: {
            transition: { staggerChildren: 0.3, delayChildren: 0.2 },
          },
        }}
      >
        <motion.h1
          className="text-[10vw] font-light tracking-[0.3em]"
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{
            opacity: [0.8, 1, 0.95, 1],
            scale: [0.98, 1, 0.995, 1],
          }}
          transition={{
            duration: 4,
            ease: "easeInOut",
            repeat: Infinity,
            repeatType: "reverse",
          }}
        >
          ORICAND
        </motion.h1>

        <motion.p
          className="uppercase text-sm text-neutral-400 tracking-[0.3em] mt-2"
          variants={{
            hidden: { opacity: 0, y: 30 },
            show: {
              opacity: 1,
              y: 0,
              transition: { duration: 1, ease: "easeOut" },
            },
          }}
        >
          Welcome Anytime
        </motion.p>

        <motion.p
          className="mt-6 max-w-xl text-neutral-500 text-base leading-relaxed"
          variants={{
            hidden: { opacity: 0, y: 20 },
            show: {
              opacity: 1,
              y: 0,
              transition: { duration: 1.2, ease: "easeOut" },
            },
          }}
        >
          A drop-based identity. Nothing permanent — only presence.
        </motion.p>
      </motion.div>
    </div>
  );
}
