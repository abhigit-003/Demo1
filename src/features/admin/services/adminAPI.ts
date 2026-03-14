/// <reference types="vite/client" />
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

const adminAPI = axios.create({
    baseURL: API_BASE_URL,
    timeout: 15000,
});

// ─── Request Interceptor: Attach JWT ─────────────────────────────────────────
adminAPI.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('raffine_token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// ─── Response Interceptor: Handle 401 Token Expiry ───────────────────────────
adminAPI.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            // Token expired or invalid — clear auth and redirect to login
            localStorage.removeItem('raffine_token');
            localStorage.removeItem('user');
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

// ─── Dashboard ────────────────────────────────────────────────────────────────
export const getDashboardStats = async () => {
    const response = await adminAPI.get('/admin/dashboard-stats');
    return response.data;
};

// ─── Products ─────────────────────────────────────────────────────────────────
export const getProducts = async () => {
    const response = await adminAPI.get('/admin/products');
    return response.data;
};

export const createProduct = async (productData: any) => {
    const response = await adminAPI.post('/admin/products', productData);
    return response.data;
};

export const updateProduct = async (id: string, productData: any) => {
    const response = await adminAPI.put(`/admin/products/${id}`, productData);
    return response.data;
};

export const deleteProduct = async (id: string) => {
    const response = await adminAPI.delete(`/admin/products/${id}`);
    return response.data;
};

// ─── Destinations ─────────────────────────────────────────────────────────────
export const getDestinations = async () => {
    const response = await adminAPI.get('/admin/destinations');
    return response.data;
};

export const createDestination = async (data: any) => {
    const response = await adminAPI.post('/admin/destinations', data);
    return response.data;
};

export const updateDestination = async (id: string, data: any) => {
    const response = await adminAPI.put(`/admin/destinations/${id}`, data);
    return response.data;
};

export const deleteDestination = async (id: string) => {
    const response = await adminAPI.delete(`/admin/destinations/${id}`);
    return response.data;
};

// ─── Coupons ──────────────────────────────────────────────────────────────────
export const getCoupons = async () => {
    const response = await adminAPI.get('/admin/coupons');
    return response.data;
};

export const createCoupon = async (data: any) => {
    const response = await adminAPI.post('/admin/coupons', data);
    return response.data;
};

export const updateCoupon = async (id: string, data: any) => {
    const response = await adminAPI.put(`/admin/coupons/${id}`, data);
    return response.data;
};

export const deleteCoupon = async (id: string) => {
    const response = await adminAPI.delete(`/admin/coupons/${id}`);
    return response.data;
};

export const launchFlashSale = async (data: { discount: string; duration: number; applyTo: string }) => {
    const response = await adminAPI.post('/admin/flash-sale', data);
    return response.data;
};

// ─── Pricing Rules ────────────────────────────────────────────────────────────
export const getPricingRules = async () => {
    const response = await adminAPI.get('/admin/pricing-rules');
    return response.data;
};

export const createPricingRule = async (data: any) => {
    const response = await adminAPI.post('/admin/pricing-rules', data);
    return response.data;
};

export const updatePricingRule = async (id: string, data: any) => {
    const response = await adminAPI.put(`/admin/pricing-rules/${id}`, data);
    return response.data;
};

export const deletePricingRule = async (id: string) => {
    const response = await adminAPI.delete(`/admin/pricing-rules/${id}`);
    return response.data;
};

// ─── Pricing Engine ───────────────────────────────────────────────────────────
export const getPricingEngine = async () => {
    const response = await adminAPI.get('/admin/pricing-engine');
    return response.data;
};

export const savePricingEngine = async (config: any) => {
    const response = await adminAPI.put('/admin/pricing-engine', config);
    return response.data;
};

// ─── Analytics ────────────────────────────────────────────────────────────────
export const getAnalytics = async () => {
    const response = await adminAPI.get('/admin/analytics');
    return response.data;
};

// ─── User Logs ────────────────────────────────────────────────────────────────
export const getUserLogs = async (params?: {
    page?: number;
    category?: string;
    severity?: string;
    search?: string;
    startDate?: string;
    endDate?: string;
}) => {
    const response = await adminAPI.get('/admin/user-logs', { params });
    return response.data;
};

export const exportUserLogs = async () => {
    const response = await adminAPI.get('/admin/user-logs/export', { responseType: 'blob' });
    return response.data;
};

export default adminAPI;
