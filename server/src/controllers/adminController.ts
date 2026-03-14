import { Request, Response } from 'express';
import { Product, Service, User, Booking } from '../models';

// Mock data stores for missing tables
let pricingEngineConfig = {
    nearestRupee: true,
    autoAdjust: true,
    updateInterval: 'hourly',
    marginTargets: { product: 35, destination: 25, service: 40 }
};

let coupons = [
    { id: '1', code: 'WELCOME10', type: 'percentage', discount: '10%', usage: { current: 145, limit: 500 }, status: 'active', expires: '2026-12-31' },
    { id: '2', code: 'SUMMER25', type: 'percentage', discount: '25%', usage: { current: 89, limit: 100 }, status: 'active', expires: '2026-08-31' }
];

let pricingRules = [
    { id: '1', name: 'High Demand Surge', type: 'demand', description: 'Increase price during peak weekends', adjustment: '+15%', condition: 'Fri-Sun Bookings', status: 'active', appliedTo: 'All Destinations', created: '2 weeks ago' },
    { id: '2', name: 'Low Occupancy Discount', type: 'time', description: 'Discount for low season or early bookings', adjustment: '-10%', condition: '<20% booked', status: 'active', appliedTo: 'Standard Tier', created: '1 month ago' }
];

// ─── Dashboard Stats ──────────────────────────────────────────────────────────
export const getDashboardStats = async (req: Request, res: Response) => {
    try {
        const productCount = await Product.count();
        const serviceCount = await Service.count();
        const userCount = await User.count();
        const bookingCount = await Booking.count();

        res.json({
            revenue: { value: 124832, trend: 12.5 },
            products: { value: productCount, trend: 4.2 },
            destinations: { value: serviceCount, trend: -2.1 },
            customers: { value: userCount, trend: 8.3 },
            recentActivity: [
                { id: 1, action: 'New Booking', user: 'Jane Doe', time: '5m ago' },
                { id: 2, action: 'Product Added', user: 'Admin', time: '12m ago' }
            ]
        });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch dashboard stats' });
    }
};

// ─── Product Management ───────────────────────────────────────────────────────
export const getAdminProducts = async (req: Request, res: Response) => {
    try {
        const products = await Product.findAll();
        // Ensure consistent mapping for frontend
        const mapped = products.map(p => ({
            ...p.toJSON(),
            status: p.status || 'active',
            type: p.type || 'product',
            category: p.category || 'Physical Product',
            stock: p.stock ?? 0,
            lastUpdated: 'Recently'
        }));
        res.json(mapped);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch products' });
    }
};

// ─── Destination Management (using Service model) ─────────────────────────────
export const getAdminDestinations = async (req: Request, res: Response) => {
    try {
        const services = await Service.findAll();
        // Filter or map services to destinations if needed
        const mapped = services.map(s => ({
            ...s.toJSON(),
            status: s.status || 'active',
            type: s.type || 'service',
            region: s.region || 'Global',
            tier: s.tier || 'Standard',
            capacity: s.capacity || 100,
            booked: s.booked || 0,
            coordinates: s.coordinates || { lat: 0, lng: 0 }
        }));
        res.json(mapped);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch destinations' });
    }
};

// ─── Coupons ──────────────────────────────────────────────────────────────────
export const getAdminCoupons = async (req: Request, res: Response) => {
    res.json(coupons);
};

export const createAdminCoupon = async (req: Request, res: Response) => {
    const newCoupon = { id: String(coupons.length + 1), ...req.body, usage: { current: 0, limit: req.body.usageLimit || 100 } };
    coupons.push(newCoupon);
    res.status(201).json(newCoupon);
};

// ─── Pricing ──────────────────────────────────────────────────────────────────
export const getAdminPricingRules = async (req: Request, res: Response) => {
    res.json(pricingRules);
};

export const getAdminPricingEngine = async (req: Request, res: Response) => {
    res.json(pricingEngineConfig);
};

export const updateAdminPricingEngine = async (req: Request, res: Response) => {
    pricingEngineConfig = { ...pricingEngineConfig, ...req.body };
    res.json(pricingEngineConfig);
};

// ─── Analytics ────────────────────────────────────────────────────────────────
export const getAdminAnalytics = async (req: Request, res: Response) => {
    res.json({
        revenueData: [
            { name: 'Jan', revenue: 45000 },
            { name: 'Feb', revenue: 52000 },
            { name: 'Mar', revenue: 48000 }
        ],
        categoryDistribution: [
            { name: 'Spa', value: 45 },
            { name: 'Hair', value: 30 },
            { name: 'Wellness', value: 25 }
        ]
    });
};

// ─── User Logs ────────────────────────────────────────────────────────────────
export const getAdminUserLogs = async (req: Request, res: Response) => {
    res.json({
        logs: [
            { id: 1, timestamp: new Date().toISOString(), user: 'admin@raffine.com', action: 'LOGIN', category: 'auth', severity: 'info', message: 'Admin logged in' },
            { id: 2, timestamp: new Date().toISOString(), user: 'provider@raffine.com', action: 'UPDATE_PRODUCT', category: 'product', severity: 'warning', message: 'Product price updated' }
        ],
        pagination: { total: 2, pages: 1, current: 1 }
    });
};
