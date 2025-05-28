import { useEffect } from "react";
import Lenis from "lenis";
import { AnimatePresence } from "framer-motion";
import { useLocation } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import Footer from "./components/Footer";
import { Toaster } from "react-hot-toast";
import CustomCursor from "./components/CustomCursor";
import TransitionOverlay from "./components/TransitionOverlay";

export default function AppContent() {
  const location = useLocation();

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      smoothWheel: true,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
  }, []);

  return (
    <div className="relative">
      <CustomCursor />
      <AnimatePresence mode="wait">
        <TransitionOverlay key={location.pathname} />
        <AppRoutes />
      </AnimatePresence>
      <Footer />
      <Toaster position="top-center" toastOptions={{ duration: 2000 }} />
    </div>
  );
}
