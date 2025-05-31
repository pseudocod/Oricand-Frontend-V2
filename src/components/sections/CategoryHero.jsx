import { motion } from "framer-motion";

export default function CategoryHero({ category, theme }) {
  return (
    <div className="relative w-full pt-24 pb-0">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="flex flex-col items-center justify-center text-center px-6"
      >
        <h1
          className={`text-[11vw] md:text-[8vw] font-extralight tracking-[0.15em] uppercase font-montserrat`}
        >
          ORICÂND 
        </h1>
        <span className="text-2xl font-extralight tracking-widest uppercase">X</span>
        <h2 className={`text-[7vw] md:text-[5vw] font-bold uppercase tracking-wider mt-2 ${theme.font}`}>
          {category.name}
        </h2>

        <div className="h-[1px] w-12 bg-black my-6" />

        <p className="text-sm max-w-xl text-neutral-600 uppercase tracking-widest leading-loose">
          {category.label || "LIMITED TIME ONLY"}
        </p>
      </motion.div>
    </div>
  );
}
