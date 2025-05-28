import { lazy } from 'react';
import AdminRoute from '@/routes/AdminRoute';

const AdminPages = {
  Dashboard: lazy(() => import('./pages/DashboardAdmin')),
  Products: lazy(() => import('./pages/ProductAdmin')),
  AttributeOptions: lazy(() => import('./pages/AttributeOptionAdmin')),
  AttributeTypes: lazy(() => import('./pages/AttributeTypeAdmin')),
  SelectedAttributes: lazy(() => import('./pages/SelectedAttributeAdmin')),
  Categories: lazy(() => import('./pages/CategoryAdmin')),
};

export const adminRoutes = {
  element: <AdminRoute />,
  children: [
    { path: '/admin', element: <AdminPages.Dashboard /> },
    { path: '/admin/products', element: <AdminPages.Products /> },
    { path: '/admin/attribute-options', element: <AdminPages.AttributeOptions /> },
    { path: '/admin/attribute-types', element: <AdminPages.AttributeTypes /> },
    { path: '/admin/selected-attributes', element: <AdminPages.SelectedAttributes /> },
    { path: '/admin/categories', element: <AdminPages.Categories /> },
  ],
}; 