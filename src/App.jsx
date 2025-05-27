import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import { Toaster } from "react-hot-toast";
import Lenis from "lenis";
import { useEffect } from "react";
function App() {
  useEffect(() => {
    const lenis = new Lenis();

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
  }, []);

  return (
    <BrowserRouter>
      <AppRoutes />
      <Toaster position="top-center" toastOptions={{ duration: 2000 }} />
    </BrowserRouter>
  );
}

export default App;
