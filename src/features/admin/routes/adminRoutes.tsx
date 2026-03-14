import { RouteObject } from "react-router";
import AdminLayout from "../layout/AdminLayout";
import DashboardHome from "../pages/DashboardHome";
import ProductManager from "../pages/ProductManager";
import DestinationHub from "../pages/DestinationHub";
import PricingEngine from "../pages/PricingEngine";
import PricingRules from "../pages/PricingRules";
import Coupons from "../pages/Coupons";
import Analytics from "../pages/Analytics";
import UserLogs from "../pages/UserLogs";

export const adminRoutes: RouteObject[] = [
    {
        path: "/admin",
        element: <AdminLayout />,
        children: [
            { index: true, element: <DashboardHome /> },
            { path: "products", element: <ProductManager /> },
            { path: "destinations", element: <DestinationHub /> },
            { path: "pricing-engine", element: <PricingEngine /> },
            { path: "pricing-rules", element: <PricingRules /> },
            { path: "coupons", element: <Coupons /> },
            { path: "analytics", element: <Analytics /> },
            { path: "user-logs", element: <UserLogs /> },
        ],
    },
];
