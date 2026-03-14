import { createBrowserRouter, Navigate } from "react-router";
import { adminRoutes } from "../features/admin/routes/adminRoutes";

import MainLayout from "@/components/MainLayout";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import AdminRoute from "@/components/auth/AdminRoute";

// Core Pages
import RaffineLanding from "@/pages/RaffineLanding";
import Index from "@/pages/Index";
import Services from "@/pages/Services";
import ServiceDetail from "@/pages/ServiceDetail";
import ProductDetail from "@/pages/ProductDetail";
import Dashboard from "@/pages/Dashboard";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import Cart from "@/pages/Cart";
import Privacy from "@/pages/Privacy";
import Terms from "@/pages/Terms";
import SearchResults from "@/pages/SearchResults";
import Shop from "@/pages/Shop";
import EditorialPage from "@/pages/EditorialPage";
import Wishlist from "@/pages/Wishlist";
import Checkout from "@/pages/Checkout";
import Bookings from "@/pages/Bookings";
import NotFound from "@/pages/NotFound";

// Original Admin Pages (for integration)
import AddService from "@/pages/admin/AddService";
import ManageProducts from "@/pages/admin/ManageProducts";
import Analytics from "@/pages/admin/Analytics";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <RaffineLanding /> },
      { path: "home", element: <Navigate to="/" replace /> },
      { path: "landing", element: <Index /> },
      { path: "spa", element: <Services category="spa" /> },
      { path: "hair", element: <Services category="hair" /> },
      { path: "fitness", element: <Services category="fitness" /> },
      { path: "wellness", element: <Services category="wellness" /> },
      { path: "all", element: <Services /> },
      { path: "shop", element: <Shop /> },
      { path: "editorial", element: <EditorialPage /> },
      { path: "search", element: <SearchResults /> },
      { path: "service/:id", element: <ServiceDetail /> },
      { path: "product/:id", element: <ProductDetail /> },
      { path: "privacy", element: <Privacy /> },
      { path: "terms", element: <Terms /> },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <MainLayout />,
        children: [
          { path: "checkout", element: <Checkout /> },
          { path: "dashboard", element: <Dashboard /> },
          { path: "wishlist", element: <Wishlist /> },
          { path: "my-bookings", element: <Bookings /> },
          { path: "cart", element: <Cart /> },
          
          // Legacy Admin Routes (Renamed to avoid conflict with new Admin Panel)
          { path: "admin/legacy/add-service", element: <AddService /> },
          { path: "admin/legacy/products", element: <ManageProducts /> },
          { path: "admin/legacy/analytics", element: <Analytics /> },
        ],
      },
    ],
  },
  // New Admin Panel Routes (Protected for developers only)
  {
    element: <AdminRoute />,
    children: [
      ...adminRoutes
    ]
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);