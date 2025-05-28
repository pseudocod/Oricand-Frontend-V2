import { Routes, Route } from "react-router-dom";
import ErrorBoundary from "@/components/shared/ErrorBoundary";
import MainLayout from "@components/layout/MainLayout";
import { adminRoutes } from "@features/admin/routes";
import { authRoutes } from "@features/auth/routes";
import { homeRoutes } from "@features/home/routes";

function RouteErrorBoundary({ children }) {
  return (
    <ErrorBoundary>
      {children}
    </ErrorBoundary>
  );
}

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        {/* Home Routes */}
        {homeRoutes.map((route) => (
          <Route 
            key={route.path} 
            element={
              <RouteErrorBoundary>
                <route.element />
              </RouteErrorBoundary>
            }
            {...route} 
          />
        ))}

        {/* Public Auth Routes */}
        {authRoutes.public.map((route) => (
          <Route 
            key={route.path} 
            element={
              <RouteErrorBoundary>
                <route.element />
              </RouteErrorBoundary>
            }
            {...route} 
          />
        ))}

        {/* Protected Auth Routes */}
        <Route {...authRoutes.protected}>
          {authRoutes.protected.children.map((route) => (
            <Route 
              key={route.path} 
              element={
                <RouteErrorBoundary>
                  <route.element />
                </RouteErrorBoundary>
              }
              {...route} 
            />
          ))}
        </Route>

        {/* Admin Routes */}
        <Route {...adminRoutes}>
          {adminRoutes.children.map((route) => (
            <Route 
              key={route.path} 
              element={
                <RouteErrorBoundary>
                  <route.element />
                </RouteErrorBoundary>
              }
              {...route} 
            />
          ))}
        </Route>
      </Route>
    </Routes>
  );
}
