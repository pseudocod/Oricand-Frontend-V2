import { Routes, Route, useLocation } from "react-router-dom";
import Login from "../pages/Login";
import Home from "../pages/Home";
import Register from "../pages/Register";
import Account from "../pages/Account";
import ProtectedRoute from "./ProtectedRoute";
import AdminRoute from "./AdminRoute";
import ProductAdmin from "../pages/admin/ProductAdmin";
import AttributeOptionAdmin from "../pages/admin/AttributeOptionAdmin";
import AttributeTypeAdmin from "../pages/admin/AttributeTypeAdmin";
import SelectedAttributeAdmin from "../pages/admin/SelectedAttributeAdmin";
import CategoryAdmin from "../pages/admin/CategoryAdmin";
import DashboardAdmin from "../pages/admin/DashboardAdmin";
import PageWrapper from "../components/PageWrapper";

export default function AppRoutes() {
  const location = useLocation();

  return (
    <Routes location={location} key={location.pathname}>
      <Route path="/" element={<PageWrapper><Home /></PageWrapper>} />
      <Route path="/login" element={<PageWrapper><Login /></PageWrapper>} />
      <Route path="/register" element={<PageWrapper><Register /></PageWrapper>} />
      <Route
        path="/account"
        element={
          <ProtectedRoute>
            <PageWrapper>
              <Account />
            </PageWrapper>
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin"
        element={
          <AdminRoute>
            <PageWrapper>
              <DashboardAdmin />
            </PageWrapper>
          </AdminRoute>
        }
      />
      <Route
        path="/admin/products"
        element={
          <AdminRoute>
            <PageWrapper>
              <ProductAdmin />
            </PageWrapper>
          </AdminRoute>
        }
      />
      <Route
        path="/admin/attribute-options"
        element={
          <AdminRoute>
            <PageWrapper>
              <AttributeOptionAdmin />
            </PageWrapper>
          </AdminRoute>
        }
      />
      <Route
        path="/admin/attribute-types"
        element={
          <AdminRoute>
            <PageWrapper>
              <AttributeTypeAdmin />
            </PageWrapper>
          </AdminRoute>
        }
      />

      <Route
        path="/admin/selected-attributes"
        element={
          <AdminRoute>
            <PageWrapper>
              <SelectedAttributeAdmin />
            </PageWrapper>
          </AdminRoute>
        }
      />

      <Route
        path="/admin/categories"
        element={
          <AdminRoute>
            <PageWrapper>
              <CategoryAdmin />
            </PageWrapper>
          </AdminRoute>
        }
      />
    </Routes>
  );
}
