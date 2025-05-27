// components/DropThemeScene.jsx
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function DropThemeScene({
  videoSrc,
  imageSrc,
  phrase,
  label,
  bg = "bg-black",
  textColor = "white",
  font = "font-playfair",
  ctaHref = "/drops/pitch",
  ctaText = "Explore Drop",
}) {
  return (
    <section className={`relative h-screen w-full overflow-hidden ${bg}`}>
      {/* Background layer: either video, image, or nothing */}
      {videoSrc ? (
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src={videoSrc} type="video/mp4" />
        </video>
      ) : imageSrc ? (
        <img
          src={imageSrc}
          alt="drop background"
          className="absolute inset-0 w-full h-full object-cover"
        />
      ) : (
        <div className="absolute inset-0 bg-black" />
      )}

      {/* Overlay tint */}
      <div className="absolute inset-0 bg-black/20 mix-blend-overlay z-10 pointer-events-none" />

      {/* Floating drop label */}
      <motion.div
        animate={{ y: [0, -10, 10, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className={`absolute top-10 left-10 text-sm uppercase tracking-widest text-${textColor} z-20`}
      >
        {label}
      </motion.div>

      {/* Main content: phrase + CTA */}
      <div className="relative z-30 h-full flex flex-col justify-center items-center px-6 text-center">
        <motion.h2
          initial={{ opacity: 0, scale: 1.05 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.4, ease: "easeOut" }}
          className={`${font} text-3xl md:text-5xl text-${textColor} leading-tight`}
        >
          {phrase}
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.8, ease: "easeOut" }}
          className="mt-6"
        >
          <Link
            to={ctaHref}
            className="inline-block border border-white text-white px-6 py-2 uppercase tracking-wide text-sm hover:bg-white hover:text-black transition-all duration-300"
          >
            {ctaText}
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
