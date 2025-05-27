
import { motion } from "framer-motion";

export default function MoodVideoSection() {
  return (
    <section className="relative h-screen w-full overflow-hidden bg-black">
      <motion.video
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        initial={{ scale: 1 }}
        animate={{ scale: 1.05 }}
        transition={{ duration: 40, ease: "linear" }}
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/videos/mood-orican.mp4" type="video/mp4" />
      </motion.video>

      <div className="absolute inset-0 bg-black opacity-10 mix-blend-overlay pointer-events-none z-10" />

      <div className="relative z-20 h-full flex flex-col justify-center items-center text-white text-center">
        <p className="text-sm uppercase tracking-widest mb-2 text-neutral-400">
          Mood
        </p>
        <h2 className="text-3xl md:text-5xl font-playfair leading-snug max-w-2xl px-6">
          Golden hour for the soul.
        </h2>
      </div>
    </section>
  );
}
