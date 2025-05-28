import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { useAuth } from "../context/UserContext";
import { useLocation } from "react-router-dom";

export default function SidebarHeader() {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useAuth();
  const location = useLocation();
  const isDark = location.pathname === "/";

  useEffect(() => {
    const handleEsc = (e) => e.key === "Escape" && setIsOpen(false);
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed top-6 right-6 z-[60] text-2xl focus:outline-none cursor-pointer transition-transform transform hover:scale-110 ${
          isDark
            ? `${isOpen ? "text-black" : "text-white"}`
            : `${isOpen ? "text-white" : "text-black"}`
        }`}
        aria-label="Toggle Menu"
      >
        ☰
      </button>

      {/* Slide-in Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black backdrop-blur-sm z-40"
            onClick={() => setIsOpen(false)}
          />
        )}

        {isOpen && (
          <motion.aside
            initial={{ x: "100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "100%", opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="fixed top-0 right-0 h-full w-64 z-50 bg-black text-white flex flex-col items-start px-8 py-10 space-y-10"
          >
            <Link
              to="/"
              onClick={() => setIsOpen(false)}
              className="uppercase tracking-[0.25em] text-sm hover:opacity-70"
            >
              ORICAND
            </Link>

            <nav className="flex flex-col gap-6 text-sm font-light tracking-wide">
              {["Drops", "About"].map((label, index) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                >
                  <Link
                    to={`/${label.toLowerCase()}`}
                    onClick={() => setIsOpen(false)}
                    className="hover:underline"
                  >
                    {label}
                  </Link>
                </motion.div>
              ))}

              {/* ✅ Admin Panel Link */}
              {user?.role === "ROLE_ADMIN" && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  <Link
                    to="/admin"
                    onClick={() => setIsOpen(false)}
                    className="hover:underline text-white"
                  >
                    Admin Panel
                  </Link>
                </motion.div>
              )}
            </nav>

            <p className="mt-auto text-xs text-white">© ORICAND 2025</p>
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
}
