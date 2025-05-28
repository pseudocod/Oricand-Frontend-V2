import { lazy } from 'react';
import AdminRoute from '@/routes/AdminRoute';

const AdminPages = {
  Dashboard: lazy(() => import('@/features/admin/pages/DashboardAdmin')),
  Products: lazy(() => import('@/features/admin/pages/ProductAdmin')),
  AttributeOptions: lazy(() => import('@/features/admin/pages/AttributeOptionAdmin')),
  AttributeTypes: lazy(() => import('@/features/admin/pages/AttributeTypeAdmin')),
  SelectedAttributes: lazy(() => import('@/features/admin/pages/SelectedAttributeAdmin')),
  Categories: lazy(() => import('@/features/admin/pages/CategoryAdmin')),
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