
export type ProductStatus = 'active' | 'hidden' | 'out_of_stock' | 'pending_review';

export interface Product {
  id: string;
  name: string;
  category: 'physical' | 'service' | 'destination';
  price: number;
  status: ProductStatus;
  stock?: number;
  image: string;
  region?: string; // For destinations
  tier?: 'elite' | 'standard' | 'budget'; // For destinations
}

export interface PricingRule {
  id: string;
  name: string;
  type: 'demand' | 'time' | 'competitor';
  description: string;
  active: boolean;
  value: number; // e.g. 15 for 15%
}

export interface Coupon {
  id: string;
  code: string;
  discount: number;
  type: 'percentage' | 'fixed';
  expiryDate: string;
  usageCount: number;
  usageLimit: number;
  stackable: boolean;
}

export interface Destination {
  id: string;
  name: string;
  region: string;
  status: 'open' | 'restricted' | 'closed';
  tier: 'elite' | 'standard' | 'budget';
  capacity: number;
  currentBookings: number;
  coordinates: { x: number; y: number }; // Simplified for map visualization
}

export interface AuditLog {
  id: string;
  user: string;
  action: string;
  target: string;
  timestamp: string;
  details: string;
}
