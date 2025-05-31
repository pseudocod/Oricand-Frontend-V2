import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import { Toaster } from "react-hot-toast";
import Lenis from "lenis";
import { useEffect } from "react";
import Footer from "./components/layout/Footer";
import { AnimatePresence } from "framer-motion";
import CustomCursor from "./components/ui/CustomCursor";
import SidebarHeader from "./components/layout/SidebarHeader";
import ScrollToTop from "./components/layout/ScrollToTop";

function App() {
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
    <>
      <BrowserRouter>
        <ScrollToTop />
        <div className="relative">
          <SidebarHeader />
          <CustomCursor />
          <AnimatePresence mode="wait">
            <AppRoutes />
          </AnimatePresence>
          <Footer />
          <Toaster position="top-center" toastOptions={{ duration: 2000 }} />
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
