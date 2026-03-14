import { Router } from 'express';
import * as adminController from '../controllers/adminController';
import { authenticate, authorizeDeveloper } from '../middleware/auth';
import { adminAuditLogger } from '../middleware/adminAuditLogger';

const router = Router();

// Audit logger runs FIRST (before auth) to capture all attempts including denied ones
// Then authenticate (JWT check) then authorizeDeveloper (role check)
router.use(adminAuditLogger, authenticate, authorizeDeveloper);

// Dashboard
router.get('/dashboard-stats', adminController.getDashboardStats);

// Products
router.get('/products', adminController.getAdminProducts);

// Destinations
router.get('/destinations', adminController.getAdminDestinations);

// Coupons
router.get('/coupons', adminController.getAdminCoupons);
router.post('/coupons', adminController.createAdminCoupon);

// Pricing
router.get('/pricing-rules', adminController.getAdminPricingRules);
router.get('/pricing-engine', adminController.getAdminPricingEngine);
router.put('/pricing-engine', adminController.updateAdminPricingEngine);

// Analytics
router.get('/analytics', adminController.getAdminAnalytics);

// User Logs
router.get('/user-logs', adminController.getAdminUserLogs);

export default router;
