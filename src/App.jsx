import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { AppRoutes } from "@/routes";
import ErrorBoundary from "@/components/shared/ErrorBoundary";
import { PageLoader } from "@/components/shared/PageLoader";
import { useSmoothScroll } from "@/hooks/interaction/useSmoothScroll";
import { UserProvider } from "@/features/auth/context/UserContext";
import "@ant-design/v5-patch-for-react-19";

function App() {
  useSmoothScroll();

  return (
    <ErrorBoundary>
      <BrowserRouter>
        <UserProvider>
          <PageLoader>
            <AppRoutes />
          </PageLoader>
          <Toaster 
            position="top-center" 
            toastOptions={{ 
              duration: parseInt(import.meta.env.VITE_TOAST_DURATION || 2000),
              style: {
                background: '#333',
                color: '#fff',
              },
            }} 
          />
        </UserProvider>
      </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;