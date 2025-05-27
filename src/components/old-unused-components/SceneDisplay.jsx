import { motion } from "framer-motion";

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const textVariants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

export default function SceneDisplay({ scene }) {
  if (!scene) return null;

  const { title, subtitle, desc, fontClass, bgVideo, bgImage, bg } = scene;

  const bgLayer = (
    <motion.div
      key={bgVideo || bgImage || bg} // ensure re-mount on scene change
      className="absolute inset-0 w-full h-full"
      initial={{ y: "100%" }}
      animate={{ y: 0 }}
      exit={{ y: "-100%" }}
      transition={{ duration: 1.2, ease: "easeInOut" }}
    >
      {bgVideo ? (
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        >
          <source src={bgVideo} type="video/mp4" />
        </video>
      ) : bgImage ? (
        <img
          src={bgImage}
          alt="background"
          className="w-full h-full object-cover"
        />
      ) : (
        <div className={`w-full h-full ${bg || "bg-black"}`} />
      )}
    </motion.div>
  );

  return (
    <motion.div
      className="absolute inset-0 flex items-center justify-center px-6 text-center"
      initial="hidden"
      animate="show"
      exit="hidden"
      variants={containerVariants}
    >
      {bgLayer}
      <motion.div
        className="relative z-10 max-w-2xl"
        variants={containerVariants}
      >
        <motion.h1
          className={`text-[8vw] leading-tight ${fontClass}`}
          variants={textVariants}
        >
          {title}
        </motion.h1>

        <motion.p
          className="uppercase text-sm text-neutral-400 tracking-widest mt-2"
          variants={textVariants}
        >
          {subtitle}
        </motion.p>

        <motion.p
          className="mt-6 text-neutral-400 text-base leading-relaxed"
          variants={textVariants}
        >
          {desc}
        </motion.p>
      </motion.div>
    </motion.div>
  );
}
