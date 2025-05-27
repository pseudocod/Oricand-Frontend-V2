import { useRef, useEffect, useState } from "react";
import { motion, useScroll, AnimatePresence } from "framer-motion";
import SceneDisplay from "./SceneDisplay";
import scenes from "../data/scenesData";

export default function SceneScroll() {
  const ref = useRef();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (v) => {
      const index = Math.round(v * scenes.length);
      if (index >= 0 && index < scenes.length && index !== activeIndex) {
        setActiveIndex(index);
      }
    });

    return () => unsubscribe();
  }, [scrollYProgress, activeIndex]);

  return (
    <section ref={ref} className="h-[500vh] relative text-white">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <AnimatePresence mode="wait">
          <SceneDisplay key={activeIndex} scene={scenes[activeIndex]} />
        </AnimatePresence>
      </div>
    </section>
  );
}
