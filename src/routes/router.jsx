import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Account from "../pages/Profile";
import ProductAdmin from "../pages/admin/ProductAdmin";
import AttributeOptionAdmin from "../pages/admin/AttributeOptionAdmin";
import AttributeTypeAdmin from "../pages/admin/AttributeTypeAdmin";
import SelectedAttributeAdmin from "../pages/admin/SelectedAttributeAdmin";
import CategoryAdmin from "../pages/admin/CategoryAdmin";
import DashboardAdmin from "../pages/admin/DashboardAdmin";
import OrderAdmin from "../pages/admin/OrderAdmin";
import AllProducts from "../pages/AllProducts";
import CategoryProducts from "../pages/CategoryProducts";
import ProductPage from "../pages/ProductPage";
import PageWrapper from "../components/layout/PageWrapper";
import ProtectedRoute from "./ProtectedRoute";
import AdminRoute from "./AdminRoute";
import ErrorState from "../components/common/ErrorState/ErrorState";
import RootLayout from "../components/layout/RootLayout";
import CartPage from "../pages/CartPage";
import CheckoutPage from "../pages/CheckoutPage";
import OrderConfirmationPage from "../pages/OrderConfirmationPage";


const router = createBrowserRouter([
  {
    element: <RootLayout />,
    errorElement: <ErrorState />,
    children: [
      {
        path: "/",
        element: (
          <PageWrapper>
            <Home />
          </PageWrapper>
        ),
      },
      {
        path: "/login",
        element: (
          <PageWrapper>
            <Login />
          </PageWrapper>
        ),
      },
      {
        path: "/register",
        element: (
          <PageWrapper>
            <Register />
          </PageWrapper>
        ),
      },
      {
        path: "/products",
        element: (
          <PageWrapper>
            <AllProducts />
          </PageWrapper>
        ),
      },
      {
        path: "/products/:productId",
        element: (
          <PageWrapper>
            <ProductPage />
          </PageWrapper>
        ),
      },
      {
        path: "/categories/:categoryId",
        element: (
          <PageWrapper>
            <CategoryProducts />
          </PageWrapper>
        ),
      },
      {
        path: "/collections/:categoryName",
        element: (
          <PageWrapper>
            <AllProducts />
          </PageWrapper>
        ),
      },
      {
        path: "/account",
        element: (
          <PageWrapper>
            <ProtectedRoute>
              <Account />
            </ProtectedRoute>
          </PageWrapper>
        ),
      },
      {
        path: "/cart",
        element: (
          <PageWrapper>
            <CartPage />
          </PageWrapper>
        ),
      },
      {
        path: "/checkout",
        element: (
          <PageWrapper>
            <CheckoutPage />
          </PageWrapper>
        ),
      },
      {
        path: "/admin",
        element: (
          <PageWrapper>
            <AdminRoute>
              <DashboardAdmin />
            </AdminRoute>
          </PageWrapper>
        ),
      },
      {
        path: "/admin/orders",
        element: (
          <PageWrapper>
            <AdminRoute>
              <OrderAdmin />
            </AdminRoute>
          </PageWrapper>
        ),
      },
      {
        path: "/admin/products",
        element: (
          <PageWrapper>
            <AdminRoute>
              <ProductAdmin />
            </AdminRoute>
          </PageWrapper>
        ),
      },
      {
        path: "/admin/attribute-options",
        element: (
          <PageWrapper>
            <AdminRoute>
              <AttributeOptionAdmin />
            </AdminRoute>
          </PageWrapper>
        ),
      },
      {
        path: "/admin/attribute-types",
        element: (
          <PageWrapper>
            <AdminRoute>
              <AttributeTypeAdmin />
            </AdminRoute>
          </PageWrapper>
        ),
      },
      {
        path: "/admin/selected-attributes",
        element: (
          <PageWrapper>
            <AdminRoute>
              <SelectedAttributeAdmin />
            </AdminRoute>
          </PageWrapper>
        ),
      },
      {
        path: "/admin/categories",
        element: (
          <PageWrapper>
            <AdminRoute>
              <CategoryAdmin />
            </AdminRoute>
          </PageWrapper>
        ),
      },
      {
        path: "/order-confirmation",
        element: (
          <PageWrapper>
            <OrderConfirmationPage />
          </PageWrapper>
        ),
      },
    ],
  },
]);

export default router;
