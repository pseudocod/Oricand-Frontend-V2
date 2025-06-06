import { AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import CartOverlay from "./CartOverlay/CartOverlay";
import MenuOverlay from "./MenuOverlay";
import DesktopHeader from "./DesktopHeader";
import MobileHeader from "./MobileHeader";
import { useCartUI } from "../../../context/CartUIContext";
import { useAuth } from "../../../context/UserContext";
import { useCart } from "../../../hooks/useCart";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isOpen: isCartOpen, openCart, closeCart } = useCartUI();
  const location = useLocation();
  const { user } = useAuth();
  const { cart } = useCart(!!user);
  const itemCount = cart.entries.reduce((n, e) => n + e.quantity, 0);

  useEffect(() => {
    const closeOnEscape = (e) => {
      if (e.key === "Escape") {
        setIsMenuOpen(false);
        closeCart();
      }
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [closeCart]);

  // Close menu and cart on route change
  useEffect(() => {
    setIsMenuOpen(false);
    closeCart();
  }, [location.pathname, closeCart]);

  useEffect(() => {
    document.body.style.overflow =
      isMenuOpen || isCartOpen ? "hidden" : "unset";

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMenuOpen, isCartOpen]);

  return (
    <>
      <DesktopHeader
        isOpen={isMenuOpen}
        onMenuToggle={() => setIsMenuOpen(!isMenuOpen)}
        onCartOpen={openCart}
        cartCount={itemCount}
      />

      <MobileHeader
        isOpen={isMenuOpen}
        onMenuToggle={() => setIsMenuOpen(!isMenuOpen)}
        onCartOpen={openCart}
        cartCount={itemCount}
      />

      {/* Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <MenuOverlay
            isOpen={isMenuOpen}
            onClose={() => setIsMenuOpen(false)}
          />
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {isCartOpen && <CartOverlay key="cart" />}
      </AnimatePresence>
    </>
  );
}
