import { Outlet } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import SidebarHeader from "./header/SidebarHeader";
import CustomCursor from "../ui/CustomCursor";
import Footer from "./Footer/Footer";
import ScrollToTop from "./ScrollToTop";

export default function RootLayout() {
  return (
    <div className="relative">
      <ScrollToTop />
      <SidebarHeader />
      <CustomCursor />
      <AnimatePresence mode="wait">
        <Outlet />
      </AnimatePresence>
      <Footer />
    </div>
  );
} 