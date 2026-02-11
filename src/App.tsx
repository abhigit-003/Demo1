import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import { FavoritesProvider } from "./context/FavoritesContext";
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
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <CartProvider>
          <FavoritesProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                {/* Public Auth Routes */}
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />

                {/* Protected Routes */}
                <Route element={<ProtectedRoute />}>
                  <Route element={<MainLayout />}>
                    <Route path="/" element={<RaffineLanding />} />
                    <Route path="/home" element={<Index />} />
                    <Route path="/services" element={<Services />} />
                    <Route path="/services/:id" element={<ServiceDetail />} />
                    <Route path="/product/:id" element={<ProductDetail />} />
                    <Route path="/item/:id" element={<ProductDetail />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/privacy" element={<Privacy />} />
                    <Route path="/terms" element={<Terms />} />
                    <Route path="/search" element={<SearchResults />} />
                    <Route path="/shop" element={<Shop />} />
                    <Route path="/editorial" element={<EditorialPage />} />
                    <Route path="/service/:id" element={<ServiceDetail />} />

                    {/* Admin/Quick Action Routes */}
                    <Route path="/admin/add-service" element={<AddService />} />
                    <Route path="/admin/products" element={<ManageProducts />} />
                    <Route path="/admin/analytics" element={<Analytics />} />
                  </Route>
                </Route>

                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </FavoritesProvider>
        </CartProvider>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
