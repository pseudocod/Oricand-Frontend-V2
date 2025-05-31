import { motion } from "framer-motion";

const transition = {
  duration: 0.5,
  ease: "easeInOut",
};

const slideIn = {
  initial: {
    opacity: 0,
    y: 5,
  },
  animate: {
    opacity: 1,
    y: 0,
  },
  exit: {
    opacity: 0,
    y: -5,
    transition: { duration: 0.4, ease: "easeInOut" },
  },
};

export default function PageWrapper({ children }) {
  return (
    <motion.div
      variants={slideIn}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={transition}
      className="min-h-screen w-full"
    >
      {children}
    </motion.div>
  );
}
