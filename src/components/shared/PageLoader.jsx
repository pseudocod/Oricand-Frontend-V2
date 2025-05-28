import { Suspense } from 'react';
import { LoadingSpinner } from './LoadingSpinner';

export function PageLoader({ children, fallback }) {
  return (
    <Suspense
      fallback={
        fallback || (
          <div className="min-h-screen flex items-center justify-center">
            <LoadingSpinner size="xl" />
          </div>
        )
      }
    >
      {children}
    </Suspense>
  );
}

// Specialized loader for routes
export function RouteLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <LoadingSpinner size="xl" />
    </div>
  );
} 