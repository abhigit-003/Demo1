import { AuditLog, Coupon, Destination, PricingRule, Product } from './types';

export const mockProducts: Product[] = [
  { id: 'P001', name: 'Premium Travel Backpack', category: 'physical', price: 129.99, status: 'active', stock: 45, image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&q=80&w=200' },
  { id: 'P002', name: 'Paris City Tour', category: 'destination', price: 89.00, status: 'active', region: 'Europe', tier: 'standard', image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&q=80&w=200' },
  { id: 'P003', name: 'Kyoto Tea Ceremony', category: 'destination', price: 150.00, status: 'pending_review', region: 'Asia', tier: 'elite', image: 'https://images.unsplash.com/photo-1624253321171-1be53e12f5f4?auto=format&fit=crop&q=80&w=200' },
  { id: 'P004', name: 'Noise Cancelling Headphones', category: 'physical', price: 299.00, status: 'out_of_stock', stock: 0, image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=200' },
  { id: 'P005', name: 'Bali Villa Retreat', category: 'destination', price: 450.00, status: 'hidden', region: 'Asia', tier: 'elite', image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&q=80&w=200' },
  { id: 'P006', name: 'Travel Pillow', category: 'physical', price: 25.00, status: 'active', stock: 120, image: 'https://images.unsplash.com/photo-1520977218684-257a53e4c4c2?auto=format&fit=crop&q=80&w=200' },
  { id: 'P007', name: 'New York Skyline Pass', category: 'destination', price: 110.00, status: 'active', region: 'North America', tier: 'standard', image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&q=80&w=200' },
  { id: 'P008', name: 'Safari Adventure', category: 'destination', price: 1200.00, status: 'active', region: 'Africa', tier: 'elite', image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&q=80&w=200' },
];

export const mockPricingRules: PricingRule[] = [
  { id: 'R001', name: 'High Demand Surge', type: 'demand', description: 'Increase price by 15% if destination bookings exceed 80% capacity.', active: true, value: 15 },
  { id: 'R002', name: 'Early Bird Special', type: 'time', description: 'Apply 10% discount for bookings made 60 days in advance.', active: true, value: -10 },
  { id: 'R003', name: 'Competitor Match', type: 'competitor', description: 'Match the lowest price on the market within a 5% margin.', active: false, value: 0 },
];

export const mockCoupons: Coupon[] = [
  { id: 'C001', code: 'SAVE20', discount: 20, type: 'percentage', expiryDate: '2023-12-31', usageCount: 145, usageLimit: 500, stackable: true },
  { id: 'C002', code: 'SUMMERFUN', discount: 50, type: 'fixed', expiryDate: '2023-08-31', usageCount: 890, usageLimit: 1000, stackable: false },
  { id: 'C003', code: 'WELCOME10', discount: 10, type: 'percentage', expiryDate: '2024-12-31', usageCount: 23, usageLimit: 99999, stackable: true },
];

export const mockDestinations: Destination[] = [
  { id: 'D001', name: 'Paris, France', region: 'Europe', status: 'open', tier: 'standard', capacity: 5000, currentBookings: 3200, coordinates: { x: 48, y: 2 } },
  { id: 'D002', name: 'Kyoto, Japan', region: 'Asia', status: 'restricted', tier: 'elite', capacity: 1000, currentBookings: 850, coordinates: { x: 35, y: 135 } },
  { id: 'D003', name: 'Bali, Indonesia', region: 'Asia', status: 'open', tier: 'elite', capacity: 2000, currentBookings: 1900, coordinates: { x: -8, y: 115 } },
  { id: 'D004', name: 'New York, USA', region: 'North America', status: 'open', tier: 'standard', capacity: 10000, currentBookings: 4500, coordinates: { x: 40, y: -74 } },
  { id: 'D005', name: 'Cairo, Egypt', region: 'Africa', status: 'closed', tier: 'budget', capacity: 3000, currentBookings: 1200, coordinates: { x: 30, y: 31 } },
];

export const mockAuditLogs: AuditLog[] = [
  { id: 'L001', user: 'Admin User', action: 'Update Status', target: 'Kyoto Tea Ceremony', timestamp: '2023-10-25 14:30', details: 'Changed status to Pending Review' },
  { id: 'L002', user: 'Marketing Intern', action: 'Create Coupon', target: 'SAVE20', timestamp: '2023-10-25 10:15', details: 'Created new 20% off coupon' },
  { id: 'L003', user: 'System', action: 'Auto-Delist', target: 'Cairo, Egypt', timestamp: '2023-10-24 09:00', details: 'Regional alert triggered automatic delisting' },
];
