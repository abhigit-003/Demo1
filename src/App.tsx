import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import { WishlistProvider } from "./context/WishlistContext";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import MainLayout from "./components/MainLayout";
import RaffineLanding from "./pages/RaffineLanding";
import Index from "./pages/Index";
import Services from "./pages/Services";
import ServiceDetail from "./pages/ServiceDetail";
import ProductDetail from "./pages/ProductDetail";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Cart from "./pages/Cart";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import SearchResults from "./pages/SearchResults";
import Shop from "./pages/Shop";
import EditorialPage from "./pages/EditorialPage";
import AddService from "./pages/admin/AddService";
import ManageProducts from "./pages/admin/ManageProducts";
import Analytics from "./pages/admin/Analytics";
import Wishlist from "./pages/Wishlist";
import Checkout from "./pages/Checkout";
import Bookings from "./pages/Bookings";
import NotFound from "./pages/NotFound";
import { Navigate } from "react-router-dom";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <CartProvider>
          <WishlistProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                {/* Public Layout */}
                <Route element={<MainLayout />}>
                  <Route path="/" element={<RaffineLanding />} />
                  <Route path="/home" element={<Navigate to="/" replace />} />
                  <Route path="/landing" element={<Index />} />
                  <Route path="/spa" element={<Services category="spa" />} />
                  <Route path="/hair" element={<Services category="hair" />} />
                  <Route path="/fitness" element={<Services category="fitness" />} />
                  <Route path="/wellness" element={<Services category="wellness" />} />
                  <Route path="/all" element={<Services />} />
                  <Route path="/shop" element={<Shop />} />
                  <Route path="/editorial" element={<EditorialPage />} />
                  <Route path="/search" element={<SearchResults />} />
                  <Route path="/service/:id" element={<ServiceDetail />} />
                  <Route path="/product/:id" element={<ProductDetail />} />
                </Route>

                {/* Public Auth Routes */}
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />

                {/* Protected Routes Hierarchy */}
                <Route element={<ProtectedRoute />}>
                  <Route element={<MainLayout />}>
                    <Route path="/checkout" element={<Checkout />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/wishlist" element={<Wishlist />} />
                    <Route path="/my-bookings" element={<Bookings />} />
                    <Route path="/cart" element={<Cart />} />

                    {/* Admin Modules */}
                    <Route path="/admin/add-service" element={<AddService />} />
                    <Route path="/admin/products" element={<ManageProducts />} />
                    <Route path="/admin/analytics" element={<Analytics />} />
                  </Route>
                </Route>

                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </WishlistProvider>
        </CartProvider>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
