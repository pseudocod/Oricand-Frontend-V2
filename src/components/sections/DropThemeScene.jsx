import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { themeConfig } from "../../config/themeConfig";

export default function DropThemeScene({ category }) {
  if (!category) return null;

  const theme = themeConfig[category.theme] || themeConfig.default;

  return (
    <section className={`relative h-screen w-full overflow-hidden ${theme.bg}`}>
      {category.teaserVideoUrl ? (
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source
            src={`http://localhost:8080${category.teaserVideoUrl}`}
            type="video/mp4"
          />
        </video>
      ) : category.coverImageUrl ? (
        <img
          src={`http://localhost:8080${category.coverImageUrl}`}
          alt="drop background"
          className="absolute inset-0 w-full h-full object-cover"
        />
      ) : (
        <div className="absolute inset-0 bg-black" />
      )}

      <div className="absolute inset-0 bg-black/20 mix-blend-overlay z-10 pointer-events-none" />

      <motion.div
        animate={{ y: [0, -10, 10, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className={`absolute top-10 left-10 text-sm uppercase tracking-widest text-${theme.textColor} z-20`}
      >
        {category.name}
      </motion.div>

      <div className="relative z-30 h-full flex flex-col justify-center items-center px-6 text-center">
        <motion.h2
          initial={{ opacity: 0, scale: 1.05 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.4, ease: "easeOut" }}
          className={`${theme.font} text-3xl md:text-5xl text-${theme.textColor} leading-tight`}
        >
          {category.phrase}
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8, ease: "easeOut" }}
          className="mt-6"
        >
          <Link
            to={`/${category.id}`}
            className="inline-block border border-white text-white px-6 py-2 uppercase tracking-wide text-sm hover:bg-white hover:text-black transition-all duration-300"
          >
            {theme.ctaText}
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
