import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { useAuth } from "../../context/UserContext";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuth();
  const location = useLocation();

  useEffect(() => {
    const closeOnEscape = (e) => e.key === "Escape" && setIsOpen(false);
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, []);

  return (
    <>
      <header className="fixed top-0 left-0 z-50 w-full px-6 py-6 flex justify-between items-center bg-transparent text-white mix-blend-difference">
        <button
          onClick={() => setIsOpen(true)}
          className="text-base tracking-widest uppercase hover:opacity-80 transition cursor-pointer"
        >
          Menu
        </button>
        <div>
          <Link
            to="/cart"
            className="text-base uppercase tracking-widest hover:opacity-80 transition relative"
          >
            Cart
            {2 > 0 && (
              <span className="absolute -top-2 -right-3 bg-white text-black text-xs w-5 h-5 rounded-full flex items-center justify-center">
                2
              </span>
            )}
          </Link>
        </div>
      </header>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.8 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="fixed inset-0 bg-black z-40"
              onClick={() => setIsOpen(false)}
            />

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="fixed inset-0 z-50 flex flex-col justify-center items-center bg-black text-white"
            >
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-6 right-6 text-3xl hover:opacity-70 transition cursor-pointer"
              >
                ✕
              </button>
              <div className="absolute top-20">
                <Link
                  to="/"
                  onClick={() => setIsOpen(false)}
                  className="hover:opacity-70 text-7xl tracking-widest uppercase font-extralight"
                >
                  ANYTIME
                </Link>
              </div>

              <nav className="flex flex-col gap-8 text-xl tracking-wider uppercase text-center">
                <Link
                  to="/drops"
                  onClick={() => setIsOpen(false)}
                  className="hover:opacity-70"
                >
                  Drops
                </Link>

                {user && (
                  <Link
                    to="/account"
                    onClick={() => setIsOpen(false)}
                    className="hover:opacity-70"
                  >
                    Account
                  </Link>
                )}

                {user?.role === "ROLE_ADMIN" && (
                  <Link
                    to="/admin"
                    onClick={() => setIsOpen(false)}
                    className="hover:opacity-70"
                  >
                    Admin Panel
                  </Link>
                )}

                {user ? (
                  <button
                    onClick={() => {
                      logout();
                      setIsOpen(false);
                    }}
                    className="hover:opacity-70"
                  >
                    Logout
                  </button>
                ) : (
                  <Link
                    to="/login"
                    onClick={() => setIsOpen(false)}
                    className="hover:opacity-70"
                  >
                    Login
                  </Link>
                )}
              </nav>

              <p className="absolute bottom-8 text-xs text-white/60 tracking-wider">
                © ORICÂND 2025
              </p>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
