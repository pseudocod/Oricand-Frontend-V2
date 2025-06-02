import { AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import CartOverlay from "./CartOverlay/CartOverlay";
import MenuOverlay from "./MenuOverlay";
import DesktopHeader from "./DesktopHeader";
import MobileHeader from "./MobileHeader";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const closeOnEscape = (e) => {
      if (e.key === "Escape") {
        setIsOpen(false);
        setIsCartOpen(false);
      }
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, []);

  // Close menu and cart on route change
  useEffect(() => {
    setIsOpen(false);
    setIsCartOpen(false);
  }, [location.pathname]);

  // Lock body scroll when menu or cart is open
  useEffect(() => {
    if (isOpen || isCartOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen, isCartOpen]);

  return (
    <>
      <DesktopHeader
        isOpen={isOpen}
        onMenuToggle={() => setIsOpen(!isOpen)}
        onCartOpen={() => setIsCartOpen(true)}
      />

      <MobileHeader
        isOpen={isOpen}
        onMenuToggle={() => setIsOpen(!isOpen)}
        onCartOpen={() => setIsCartOpen(true)}
      />

      {/* Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <MenuOverlay isOpen={isOpen} onClose={() => setIsOpen(false)} />
        )}
      </AnimatePresence>

      {/* Cart Overlay */}
      <AnimatePresence>
        {isCartOpen && (
          <CartOverlay
            isOpen={isCartOpen}
            onClose={() => setIsCartOpen(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
}
