import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const scenes = [
  {
    title: "ORICAND",
    subtitle: "Welcome Anytime",
    desc: "A drop-based identity. Nothing permanent — only presence.",
  },
  {
    title: "Scene 02",
    subtitle: "Crafted for feeling",
    desc: "Not a brand. A state of mind. A pause between playlists.",
  },
  {
    title: "Scene 03",
    subtitle: "Beach, Turf, Rave, Record Store",
    desc: "Anywhere you are — there's a drop for it.",
  },
];

export default function IntroScroll() {
  const wrapperRef = useRef();
  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ["start start", "end start"],
  });

  return (
    <section
      ref={wrapperRef}
      className="h-[300vh] relative bg-black text-white"
    >
      <div className="sticky top-0 h-screen flex items-center justify-center">
        <div className="text-center px-6">
          {scenes.map((scene, index) => {
            const start = index / scenes.length;
            const end = (index + 1) / scenes.length;
            const opacity = useTransform(scrollYProgress, [start, end], [1, 0]);
            const y = useTransform(
              scrollYProgress,
              [start, end],
              ["0%", "-40%"]
            );

            return (
              <motion.div
                key={index}
                style={{ opacity, y }}
                className="absolute top-0 left-0 right-0 h-full flex flex-col justify-center items-center"
              >
                <h1 className="text-[8vw] font-montserrat tracking-wide font-extralight">
                  {scene.title}
                </h1>
                <p className="mt-2 uppercase text-sm text-neutral-400 tracking-widest">
                  {scene.subtitle}
                </p>
                <p className="mt-6 text-neutral-500 max-w-xl text-lg leading-relaxed">
                  {scene.desc}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
