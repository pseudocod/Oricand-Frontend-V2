import { Routes, Route } from "react-router-dom";
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

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route
        path="/account"
        element={
          <ProtectedRoute>
            <Account />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin"
        element={
          <AdminRoute>
            <DashboardAdmin />
          </AdminRoute>
        }
      />
      <Route
        path="/admin/products"
        element={
          <AdminRoute>
            <ProductAdmin />
          </AdminRoute>
        }
      />
      <Route
        path="/admin/attribute-options"
        element={
          <AdminRoute>
            <AttributeOptionAdmin />
          </AdminRoute>
        }
      />
      <Route
        path="/admin/attribute-types"
        element={
          <AdminRoute>
            <AttributeTypeAdmin />
          </AdminRoute>
        }
      />

      <Route
        path="/admin/selected-attributes"
        element={
          <AdminRoute>
            <SelectedAttributeAdmin />
          </AdminRoute>
        }
      />

      <Route
        path="/admin/categories"
        element={
          <AdminRoute>
            <CategoryAdmin />
          </AdminRoute>
        }
      />
    </Routes>
  );
}
