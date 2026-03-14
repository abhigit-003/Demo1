import { useState } from "react";
import { Plus, Tag, Calendar, Users, Zap, Copy, MoreVertical, Edit, Trash2 } from "lucide-react";

interface Coupon {
  id: string;
  code: string;
  type: 'percentage' | 'fixed' | 'tiered';
  discount: string;
  description: string;
  usage: { current: number; limit: number };
  expires: string;
  status: 'active' | 'scheduled' | 'expired';
  stackable: boolean;
  appliedTo: string;
}

const mockCoupons: Coupon[] = [
  {
    id: '1',
    code: 'SAVE20',
    type: 'percentage',
    discount: '20%',
    description: 'Spring Sale - 20% off all destinations',
    usage: { current: 234, limit: 1000 },
    expires: 'March 31, 2026',
    status: 'active',
    stackable: false,
    appliedTo: 'All Destinations'
  },
  {
    id: '2',
    code: 'FIRST50',
    type: 'fixed',
    discount: '$50',
    description: 'First-time customer discount',
    usage: { current: 89, limit: 500 },
    expires: 'December 31, 2026',
    status: 'active',
    stackable: true,
    appliedTo: 'All Products'
  },
  {
    id: '3',
    code: 'ELITE100',
    type: 'fixed',
    discount: '$100',
    description: 'Elite tier exclusive offer',
    usage: { current: 45, limit: 100 },
    expires: 'April 15, 2026',
    status: 'active',
    stackable: false,
    appliedTo: 'Elite Tier'
  },
  {
    id: '4',
    code: 'SUMMER25',
    type: 'percentage',
    discount: '25%',
    description: 'Summer promotion - starts June 1',
    usage: { current: 0, limit: 2000 },
    expires: 'August 31, 2026',
    status: 'scheduled',
    stackable: true,
    appliedTo: 'All Products'
  },
];

export default function CouponManager() {
  const [coupons, setCoupons] = useState<Coupon[]>(mockCoupons);
  const [showFlashSale, setShowFlashSale] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingCoupon, setEditingCoupon] = useState<Coupon | null>(null);
  
  // Form states
  const [formData, setFormData] = useState({
    code: '',
    type: 'percentage' as 'percentage' | 'fixed' | 'tiered',
    discountValue: '',
    description: '',
    usageLimit: '',
    expires: '',
    stackable: false,
    appliedTo: 'All Products'
  });

  const copyCode = (code: string) => {
    // Use fallback method for copying text
    const textArea = document.createElement('textarea');
    textArea.value = code;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    document.body.appendChild(textArea);
    textArea.select();
    try {
      document.execCommand('copy');
      // Optional: Show a toast notification here
      console.log('Coupon code copied:', code);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
    document.body.removeChild(textArea);
  };

  const handleCreateCoupon = () => {
    const newCoupon: Coupon = {
      id: String(Date.now()),
      code: formData.code.toUpperCase(),
      type: formData.type,
      discount: formData.type === 'percentage' ? `${formData.discountValue}%` : `$${formData.discountValue}`,
      description: formData.description,
      usage: { current: 0, limit: Number(formData.usageLimit) },
      expires: formData.expires,
      status: 'active',
      stackable: formData.stackable,
      appliedTo: formData.appliedTo
    };
    
    setCoupons([...coupons, newCoupon]);
    resetForm();
    setShowCreateModal(false);
  };

  const handleEditCoupon = () => {
    if (!editingCoupon) return;
    
    setCoupons(coupons.map(c =>
      c.id === editingCoupon.id
        ? {
            ...c,
            code: formData.code.toUpperCase(),
            type: formData.type,
            discount: formData.type === 'percentage' ? `${formData.discountValue}%` : `$${formData.discountValue}`,
            description: formData.description,
            usage: { ...c.usage, limit: Number(formData.usageLimit) },
            expires: formData.expires,
            stackable: formData.stackable,
            appliedTo: formData.appliedTo
          }
        : c
    ));
    
    resetForm();
    setEditingCoupon(null);
  };

  const handleDeleteCoupon = (id: string) => {
    if (confirm('Are you sure you want to delete this coupon?')) {
      setCoupons(coupons.filter(c => c.id !== id));
    }
  };

  const openEditModal = (coupon: Coupon) => {
    setEditingCoupon(coupon);
    setFormData({
      code: coupon.code,
      type: coupon.type,
      discountValue: coupon.discount.replace(/[%$]/g, ''),
      description: coupon.description,
      usageLimit: String(coupon.usage.limit),
      expires: coupon.expires,
      stackable: coupon.stackable,
      appliedTo: coupon.appliedTo
    });
  };

  const resetForm = () => {
    setFormData({
      code: '',
      type: 'percentage',
      discountValue: '',
      description: '',
      usageLimit: '',
      expires: '',
      stackable: false,
      appliedTo: 'All Products'
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-50 text-green-700';
      case 'scheduled': return 'bg-blue-50 text-blue-700';
      case 'expired': return 'bg-gray-50 text-gray-700';
      default: return 'bg-gray-50 text-gray-700';
    }
  };

  return (
    <div className="space-y-6">
      {/* Create/Edit Modal */}
      {(showCreateModal || editingCoupon) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto m-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              {editingCoupon ? 'Edit Coupon' : 'Create New Coupon'}
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Coupon Code</label>
                <input
                  type="text"
                  value={formData.code}
                  onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                  placeholder="e.g., SAVE20"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Discount Type</label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value as any })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="percentage">Percentage</option>
                  <option value="fixed">Fixed Amount</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Discount Value</label>
                <div className="relative">
                  {formData.type === 'fixed' && <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>}
                  <input
                    type="number"
                    value={formData.discountValue}
                    onChange={(e) => setFormData({ ...formData, discountValue: e.target.value })}
                    placeholder={formData.type === 'percentage' ? '20' : '50'}
                    className={`w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${formData.type === 'fixed' ? 'pl-7' : ''}`}
                  />
                  {formData.type === 'percentage' && <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">%</span>}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="e.g., Spring Sale - 20% off all destinations"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={2}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Usage Limit</label>
                <input
                  type="number"
                  value={formData.usageLimit}
                  onChange={(e) => setFormData({ ...formData, usageLimit: e.target.value })}
                  placeholder="e.g., 1000"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Expiration Date</label>
                <input
                  type="text"
                  value={formData.expires}
                  onChange={(e) => setFormData({ ...formData, expires: e.target.value })}
                  placeholder="e.g., March 31, 2026"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Apply To</label>
                <select
                  value={formData.appliedTo}
                  onChange={(e) => setFormData({ ...formData, appliedTo: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option>All Products</option>
                  <option>All Destinations</option>
                  <option>All Services</option>
                  <option>Elite Tier</option>
                  <option>Standard Tier</option>
                  <option>Budget Tier</option>
                </select>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={formData.stackable}
                  onChange={(e) => setFormData({ ...formData, stackable: e.target.checked })}
                  className="w-4 h-4 text-blue-600 rounded"
                />
                <label className="text-sm text-gray-700">Stackable with pricing rules</label>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={editingCoupon ? handleEditCoupon : handleCreateCoupon}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                {editingCoupon ? 'Update Coupon' : 'Create Coupon'}
              </button>
              <button
                onClick={() => {
                  resetForm();
                  setShowCreateModal(false);
                  setEditingCoupon(null);
                }}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900">Coupon & Offer Management</h2>
          <p className="text-gray-600 mt-1">Create and manage promotional codes and special offers</p>
        </div>
        <button 
          onClick={() => {
            resetForm();
            setShowCreateModal(true);
          }}
          className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-5 h-5" />
          Create Coupon
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-2">
            <Tag className="w-8 h-8 text-blue-600" />
            <span className="text-2xl font-semibold text-gray-900">
              {coupons.filter(c => c.status === 'active').length}
            </span>
          </div>
          <p className="text-sm text-gray-600">Active Coupons</p>
        </div>
        
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-2">
            <Users className="w-8 h-8 text-green-600" />
            <span className="text-2xl font-semibold text-gray-900">
              {coupons.reduce((sum, c) => sum + c.usage.current, 0)}
            </span>
          </div>
          <p className="text-sm text-gray-600">Total Uses</p>
        </div>
        
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-2">
            <Calendar className="w-8 h-8 text-purple-600" />
            <span className="text-2xl font-semibold text-gray-900">
              {coupons.filter(c => c.status === 'scheduled').length}
            </span>
          </div>
          <p className="text-sm text-gray-600">Scheduled</p>
        </div>
        
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-2">
            <Zap className="w-8 h-8 text-orange-600" />
            <span className="text-2xl font-semibold text-gray-900">$48.2K</span>
          </div>
          <p className="text-sm text-gray-600">Revenue Generated</p>
        </div>
      </div>

      {/* Flash Sale Section - Big Red Button */}
      <div className="bg-gradient-to-r from-red-500 to-orange-500 rounded-lg p-8 text-white">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-3">
              <Zap className="w-10 h-10" />
              <h3 className="text-2xl font-bold">Flash Sale Control</h3>
            </div>
            <p className="text-red-50 mb-4">
              Apply an instant sitewide discount for a limited time window. This will override all other active discounts.
            </p>
            
            {showFlashSale && (
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium mb-1">Discount Amount</label>
                    <input
                      type="text"
                      placeholder="e.g., 30%"
                      className="w-full px-3 py-2 bg-white/20 border border-white/30 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Duration (hours)</label>
                    <input
                      type="number"
                      placeholder="4"
                      className="w-full px-3 py-2 bg-white/20 border border-white/30 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Apply To</label>
                  <select className="w-full px-3 py-2 bg-white/20 border border-white/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-white/50">
                    <option className="text-gray-900">All Products & Destinations</option>
                    <option className="text-gray-900">Destinations Only</option>
                    <option className="text-gray-900">Physical Products Only</option>
                  </select>
                </div>
              </div>
            )}
          </div>
          
          <div className="ml-8">
            <button 
              onClick={() => setShowFlashSale(!showFlashSale)}
              className="px-8 py-8 bg-white text-red-600 rounded-full hover:bg-red-50 transition-all transform hover:scale-105 shadow-2xl"
            >
              <Zap className="w-12 h-12" />
            </button>
            <p className="text-center text-sm mt-3 font-medium">
              {showFlashSale ? 'Configure & Start' : 'Start Flash Sale'}
            </p>
          </div>
        </div>
        
        {showFlashSale && (
          <div className="flex gap-3 mt-4">
            <button className="px-6 py-2 bg-white text-red-600 rounded-lg hover:bg-red-50 transition-colors font-medium">
              Launch Flash Sale
            </button>
            <button 
              onClick={() => setShowFlashSale(false)}
              className="px-6 py-2 bg-white/20 backdrop-blur-sm text-white rounded-lg hover:bg-white/30 transition-colors"
            >
              Cancel
            </button>
          </div>
        )}
      </div>

      {/* Coupons Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {coupons.map((coupon) => {
          const usagePercentage = Math.round((coupon.usage.current / coupon.usage.limit) * 100);
          
          return (
            <div key={coupon.id} className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="px-3 py-1 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg font-mono font-bold text-sm">
                      {coupon.code}
                    </div>
                    <button 
                      onClick={() => copyCode(coupon.code)}
                      className="p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded"
                    >
                      <Copy className="w-4 h-4" />
                    </button>
                  </div>
                  <p className="text-sm text-gray-600">{coupon.description}</p>
                </div>
                
                <div className="flex items-center gap-2">
                  <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(coupon.status)}`}>
                    {coupon.status.charAt(0).toUpperCase() + coupon.status.slice(1)}
                  </span>
                  <button className="p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded">
                    <MoreVertical className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Discount Value</span>
                  <span className="font-semibold text-lg text-blue-600">{coupon.discount} OFF</span>
                </div>
                
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Usage</span>
                  <span className="font-medium text-gray-900">
                    {coupon.usage.current} / {coupon.usage.limit} ({usagePercentage}%)
                  </span>
                </div>
                
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full transition-all ${
                      usagePercentage >= 80 ? 'bg-red-500' :
                      usagePercentage >= 50 ? 'bg-yellow-500' :
                      'bg-green-500'
                    }`}
                    style={{ width: `${usagePercentage}%` }}
                  />
                </div>

                <div className="grid grid-cols-2 gap-3 pt-2">
                  <div>
                    <p className="text-xs text-gray-600">Expires</p>
                    <p className="text-sm font-medium text-gray-900 mt-1">{coupon.expires}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600">Applies To</p>
                    <p className="text-sm font-medium text-gray-900 mt-1">{coupon.appliedTo}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-gray-200">
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={coupon.stackable}
                      readOnly
                      className="w-4 h-4 text-blue-600 rounded"
                    />
                    <span className="text-sm text-gray-600">Stackable with pricing rules</span>
                  </div>
                  
                  <div className="flex gap-2">
                    <button 
                      onClick={() => openEditModal(coupon)}
                      className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => handleDeleteCoupon(coupon.id)}
                      className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Coupon Architect Info */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Coupon Architect Features</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div>
            <p className="font-medium text-gray-900 mb-1">✓ Custom Code Generation</p>
            <p className="text-gray-600">Create memorable codes with custom prefixes and suffixes</p>
          </div>
          <div>
            <p className="font-medium text-gray-900 mb-1">✓ Advanced Usage Limits</p>
            <p className="text-gray-600">Set per-user limits, date ranges, and total redemption caps</p>
          </div>
          <div>
            <p className="font-medium text-gray-900 mb-1">✓ Stacking Logic Control</p>
            <p className="text-gray-600">Define whether coupons can combine with dynamic pricing</p>
          </div>
        </div>
      </div>
    </div>
  );
}