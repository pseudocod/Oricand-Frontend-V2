import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { useAuth } from "../../context/UserContext";
import {
  Bars3Icon,
  XMarkIcon,
  ShoppingBagIcon,
  UserIcon,
} from "@heroicons/react/24/outline";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuth();
  const location = useLocation();

  useEffect(() => {
    const closeOnEscape = (e) => e.key === "Escape" && setIsOpen(false);
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, []);

  // Close menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  // Lock body scroll when menu is open on mobile
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <>
      {/* Desktop Vertical Sidebar Header */}
      <div className="fixed right-0 top-0 h-full z-[60] hidden md:flex flex-col justify-between items-center py-6 bg-white text-black w-[80px] border-l border-neutral-200">
        {/* Top - Menu Icon */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-6 h-6 cursor-pointer relative group"
        >
          <AnimatePresence mode="wait">
            {isOpen ? (
              <motion.div
                key="close"
                initial={{ opacity: 0, rotate: -90 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: 90 }}
                transition={{ duration: 0.3 }}
                className="w-full h-full"
              >
                <XMarkIcon />
              </motion.div>
            ) : (
              <motion.div
                key="menu"
                initial={{ opacity: 0, rotate: 90 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: -90 }}
                transition={{ duration: 0.3 }}
                className="w-full h-full"
              >
                <Bars3Icon />
              </motion.div>
            )}
          </AnimatePresence>
        </button>

        {/* Middle - Rotated Shipping Info */}
        <div className="transform rotate-90 text-xs text-center whitespace-pre w-[420px] leading-snug">
          <div className="font-semibold uppercase mb-1">Free Shipping</div>
          <span className="text-neutral-500">Bucharest 100 RON+ · Romania 150 RON+ · EU 250 RON+</span>
        </div>

        {/* Bottom - Icons */}
        <div className="flex flex-col items-center gap-4">
          <Link to="/cart" className="w-5 h-5 hover:scale-110 transition-transform">
            <ShoppingBagIcon />
          </Link>
          <Link to={user ? "/account" : "/login"} className="w-5 h-5 hover:scale-110 transition-transform">
            <UserIcon />
          </Link>
          <span className="text-xs font-medium">RO</span>
        </div>
      </div>

      {/* Mobile Header */}
      <div className="fixed top-0 left-0 right-0 z-[60] md:hidden">
        {/* Top Bar with Shipping Info */}
        <div className="px-4 py-2 text-[10px] text-center bg-black text-white font-light tracking-wide">
          <span className="font-medium">Free Shipping:</span>
          {" "}Bucharest 100 RON+ · Romania 150 RON+ · EU 250 RON+
        </div>
        
        {/* Main Header Bar */}
        <div className="bg-white border-b border-neutral-200">
          <div className="px-6 h-16 flex items-center justify-between">
            {/* Left - Logo/Brand */}
            <Link to="/" className="text-lg font-medium tracking-wide">
              ORICÂND
            </Link>

            {/* Right - Icons */}
            <div className="flex items-center gap-6">
              <Link to="/cart" className="w-5 h-5">
                <ShoppingBagIcon />
              </Link>
              <Link to={user ? "/account" : "/login"} className="w-5 h-5">
                <UserIcon />
              </Link>
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-6 h-6 cursor-pointer"
              >
                {isOpen ? <XMarkIcon /> : <Bars3Icon />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black/20 backdrop-blur-2xs z-50"
              onClick={() => setIsOpen(false)}
            />

            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className={`fixed top-0 h-full w-full max-w-md bg-white z-50 flex flex-col
                md:right-[80px]
                right-0
              `}
            >
              <nav className="flex-1 p-10 pt-24 md:pt-20">
                <div className="flex flex-col gap-8">
                  <Link 
                    to="/products"
                    className="text-3xl font-light tracking-wide hover:opacity-60 transition-opacity"
                    onClick={() => setIsOpen(false)}
                  >
                    All Products
                  </Link>
                  <Link 
                    to="/all-coffees"
                    className="text-3xl font-light tracking-wide hover:opacity-60 transition-opacity"
                    onClick={() => setIsOpen(false)}
                  >
                    All Coffees
                  </Link>
                  <Link 
                    to="/gift-card"
                    className="text-3xl font-light tracking-wide hover:opacity-60 transition-opacity"
                    onClick={() => setIsOpen(false)}
                  >
                    Gift Card
                  </Link>
                  <Link 
                    to="/boxes"
                    className="text-3xl font-light tracking-wide hover:opacity-60 transition-opacity"
                    onClick={() => setIsOpen(false)}
                  >
                    Boxes
                  </Link>
                  <Link 
                    to="/cool-stuff"
                    className="text-3xl font-light tracking-wide hover:opacity-60 transition-opacity"
                    onClick={() => setIsOpen(false)}
                  >
                    Cool Stuff
                  </Link>
                </div>

                <div className="mt-20 flex flex-col gap-4">
                  {user && (
                    <Link 
                      to="/account"
                      className="text-lg font-light tracking-wide hover:opacity-60 transition-opacity"
                      onClick={() => setIsOpen(false)}
                    >
                      Account
                    </Link>
                  )}
                  {user?.role === "ROLE_ADMIN" && (
                    <Link 
                      to="/admin"
                      className="text-lg font-light tracking-wide hover:opacity-60 transition-opacity"
                      onClick={() => setIsOpen(false)}
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
                      className="text-lg font-light tracking-wide text-left hover:opacity-60 transition-opacity"
                    >
                      Logout
                    </button>
                  ) : (
                    <Link 
                      to="/login"
                      className="text-lg font-light tracking-wide hover:opacity-60 transition-opacity"
                      onClick={() => setIsOpen(false)}
                    >
                      Login
                    </Link>
                  )}
                </div>
              </nav>

              <div className="p-10 pt-0 text-xs text-neutral-500">
                <p className="mb-1">© 2025 ORICÂND</p>
                <p>WELCOME ANYTIME</p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
