import { motion } from "framer-motion";

export default function Footer() {
  return (
    <>
      <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-purple-900 via-transparent to-purple-900 opacity-30" />

      <motion.footer
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="bg-gradient-to-r from-[#0a0a0a] via-[#1a1222] to-[#0a0a0a] text-white py-12 text-center text-sm uppercase tracking-widest"
      >
        <div className="text-xs text-neutral-400">
          © {new Date().getFullYear()} ORICAND
        </div>

        <div className="text-sm font-light tracking-[0.15em]">
          Welcome Anytime
        </div>
        <nav className="flex justify-center gap-6 text-xs text-neutral-500 mt-4">
          <a href="/terms" className="hover:text-white">
            Terms
          </a>
          <a href="/privacy" className="hover:text-white">
            Privacy
          </a>
          <a
            href="https://instagram.com/oricand"
            className="hover:text-white"
            target="_blank"
          >
            Instagram
          </a>
        </nav>
      </motion.footer>
    </>
  );
}
