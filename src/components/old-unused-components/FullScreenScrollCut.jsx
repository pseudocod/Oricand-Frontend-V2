// components/FullScreenScrollCut.jsx
import { motion } from "framer-motion";

export default function FullScreenScrollCut({ videoSrc, text }) {
  return (
    <section className="relative h-screen w-full overflow-hidden">
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
        <source src={videoSrc} type="video/mp4" />
      </motion.video>

      <div className="absolute inset-0 bg-black/10 pointer-events-none mix-blend-overlay z-10" />

      <div className="relative z-20 h-full flex justify-center items-center">
        <h2 className="text-white text-3xl md:text-5xl font-playfair text-center max-w-2xl px-4 leading-snug">
          {text}
        </h2>
      </div>
    </section>
  );
}
