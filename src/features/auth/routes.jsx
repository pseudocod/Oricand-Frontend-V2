import { lazy } from 'react';
import ProtectedRoute from '@/routes/ProtectedRoute';

const AuthPages = {
  Login: lazy(() => import('./pages/Login')),
  Register: lazy(() => import('./pages/Register')),
  Account: lazy(() => import('./pages/Account')),
};

export const authRoutes = {
  public: [
    { path: '/login', element: <AuthPages.Login /> },
    { path: '/register', element: <AuthPages.Register /> },
  ],
  protected: {
    element: <ProtectedRoute />,
    children: [
      { path: '/account', element: <AuthPages.Account /> },
    ],
  },
}; 