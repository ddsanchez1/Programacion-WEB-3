import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "../features/home/pages/HomePage";
// import ProductsPage from "../features/home/pages/ProductsPage";
//import CartPage from "../features/home/pages/CartPage";
import CheckoutPage from "../features/home/pages/CheckoutPage";
import LoginPage from "../features/home/sesion/login/LoginPage";
import RegisterPage from "../features/home/sesion/register/RegisterPage";
// import ProductDetailPage from "../features/products/ProductDetailPage";
import ProductsPage from "../features/home/pages/products/ProductsPage";
// import ProductModal from "../features/home/pages/products/ProductModal";
import ProtectedRoute from "../components/ProtectedRoute";
import AdminRoute from "../components/AdminRoute";
import PublicRoute from "../components/PublicRoute";
import AdminProductsPage from "../features/home/sesion/login/admin/pages/AdminProductsPage";
import ProductFormPage from "../features/home/sesion/login/admin/pages/ProductsFormPage";
import AdminPage from "../features/home/sesion/login/admin/pages/AdminPage";
import AdminLogsPage from "../features/home/sesion/login/admin/pages/AdminLogsPage";

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/products" element={<ProductsPage />} />
        {/* <Route path="/products/:id" element={<ProductModal />} /> */}
        {/* <Route path="/cart" element={<CartPage />} /> */}
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route
          path="/login"
          element={
            <PublicRoute>
              <LoginPage />
            </PublicRoute>
          }
        />
        <Route
          path="/register"
          element={
            <PublicRoute>
              <RegisterPage />
            </PublicRoute>
          }
        />
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminRoute>
                <AdminPage />
              </AdminRoute>
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/products"
          element={
            <ProtectedRoute>
              <AdminRoute>
                <AdminProductsPage />
              </AdminRoute>
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/products/new"
          element={
            <ProtectedRoute>
              <AdminRoute>
                <ProductFormPage />
              </AdminRoute>
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/products/edit/:id"
          element={
            <ProtectedRoute>
              <AdminRoute>
                <ProductFormPage />
              </AdminRoute>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/logs"
          element={
            <ProtectedRoute>
              <AdminRoute>
                <AdminLogsPage />
              </AdminRoute>
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
