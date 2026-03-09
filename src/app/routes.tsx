import { createBrowserRouter } from "react-router";
import DashboardLayout from "./layouts/DashboardLayout";
import DashboardHome from "./pages/DashboardHome";
import ProductManager from "./pages/ProductManager";
import DestinationHub from "./pages/DestinationHub";
import PricingEngine from "./pages/PricingEngine";
import PricingRules from "./pages/PricingRules";
import CouponManager from "./pages/CouponManager";
import Analytics from "./pages/Analytics";
import UserLogs from "./pages/UserLogs";
import { adminRoutes } from "../features/admin/routes/adminRoutes";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <DashboardLayout />,
    children: [
      { index: true, element: <DashboardHome /> },
      { path: "products", element: <ProductManager /> },
      { path: "destinations", element: <DestinationHub /> },
      { path: "pricing-engine", element: <PricingEngine /> },
      { path: "pricing-rules", element: <PricingRules /> },
      { path: "coupons", element: <CouponManager /> },
      { path: "analytics", element: <Analytics /> },
      { path: "logs", element: <UserLogs /> },
    ],
  },
  ...adminRoutes,
]);