import { useState } from "react";
import { Settings, Package, MapPin, Briefcase, TrendingUp, IndianRupee, Activity } from "lucide-react";

interface CategoryPricing {
  category: 'product' | 'destination' | 'service';
  basePrice: number;
  minPrice: number;
  maxPrice: number;
  margin: number;
  tax: number;
}

interface OngoingDiscount {
  id: string;
  name: string;
  category: 'product' | 'destination' | 'service';
  discount: string;
  itemsAffected: number;
  startDate: string;
  endDate: string;
  revenue: string;
  status: 'active' | 'scheduled' | 'ended';
}

const categoryPricingDefaults: CategoryPricing[] = [
  { category: 'product', basePrice: 499, minPrice: 99, maxPrice: 9999, margin: 35, tax: 8 },
  { category: 'destination', basePrice: 1499, minPrice: 499, maxPrice: 15000, margin: 25, tax: 12 },
  { category: 'service', basePrice: 299, minPrice: 49, maxPrice: 5000, margin: 40, tax: 10 },
];

const ongoingDiscounts: OngoingDiscount[] = [
  { id: '1', name: 'Spring Sale - Products', category: 'product', discount: '15%', itemsAffected: 234, startDate: 'Mar 1', endDate: 'Mar 31', revenue: '₹45.2K', status: 'active' },
  { id: '2', name: 'Early Bird - Destinations', category: 'destination', discount: '10%', itemsAffected: 89, startDate: 'Feb 15', endDate: 'Apr 15', revenue: '₹28.9K', status: 'active' },
  { id: '3', name: 'Service Bundle Discount', category: 'service', discount: '20%', itemsAffected: 45, startDate: 'Mar 1', endDate: 'Mar 15', revenue: '₹12.3K', status: 'active' },
  { id: '4', name: 'Summer Destinations', category: 'destination', discount: '25%', itemsAffected: 120, startDate: 'Jun 1', endDate: 'Aug 31', revenue: '$0', status: 'scheduled' },
];

export default function PricingEngine() {
  const [categoryPricing, setCategoryPricing] = useState<CategoryPricing[]>(categoryPricingDefaults);
  const [discounts, setDiscounts] = useState<OngoingDiscount[]>(ongoingDiscounts);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'product': return Package;
      case 'destination': return MapPin;
      case 'service': return Briefcase;
      default: return Package;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'product': return { bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-200' };
      case 'destination': return { bg: 'bg-purple-50', text: 'text-purple-700', border: 'border-purple-200' };
      case 'service': return { bg: 'bg-green-50', text: 'text-green-700', border: 'border-green-200' };
      default: return { bg: 'bg-gray-50', text: 'text-gray-700', border: 'border-gray-200' };
    }
  };

  const updateCategoryPricing = (category: 'product' | 'destination' | 'service', field: keyof CategoryPricing, value: number) => {
    setCategoryPricing(categoryPricing.map(cp =>
      cp.category === category ? { ...cp, [field]: value } : cp
    ));
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900">Pricing Engine</h2>
          <p className="text-gray-600 mt-1">Site-wide pricing configuration and ongoing discount tracking</p>
        </div>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-blue-50 rounded-lg">
              <IndianRupee className="w-6 h-6 text-blue-600" />
            </div>
          </div>
          <p className="text-2xl font-semibold text-gray-900">₹86.4K</p>
          <p className="text-sm text-gray-600 mt-1">Total Discount Impact</p>
        </div>
        
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-green-50 rounded-lg">
              <Activity className="w-6 h-6 text-green-600" />
            </div>
          </div>
          <p className="text-2xl font-semibold text-gray-900">{discounts.filter(d => d.status === 'active').length}</p>
          <p className="text-sm text-gray-600 mt-1">Active Discounts</p>
        </div>
        
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-purple-50 rounded-lg">
              <TrendingUp className="w-6 h-6 text-purple-600" />
            </div>
          </div>
          <p className="text-2xl font-semibold text-gray-900">368</p>
          <p className="text-sm text-gray-600 mt-1">Items with Discounts</p>
        </div>
        
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-orange-50 rounded-lg">
              <Settings className="w-6 h-6 text-orange-600" />
            </div>
          </div>
          <p className="text-2xl font-semibold text-gray-900">12.8%</p>
          <p className="text-sm text-gray-600 mt-1">Avg. Discount Rate</p>
        </div>
      </div>

      {/* Category Pricing Configuration */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-blue-50 rounded-lg">
            <Settings className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Category Pricing Configuration</h3>
            <p className="text-sm text-gray-600 mt-1">Define pricing parameters for each category</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {categoryPricing.map((cp) => {
            const Icon = getCategoryIcon(cp.category);
            const colors = getCategoryColor(cp.category);
            
            return (
              <div key={cp.category} className={`border ${colors.border} rounded-lg p-6 ${colors.bg}`}>
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 bg-white rounded-lg">
                    <Icon className={`w-6 h-6 ${colors.text}`} />
                  </div>
                  <h4 className="text-lg font-semibold text-gray-900 capitalize">{cp.category}s</h4>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Base Price</label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">₹</span>
                      <input
                        type="number"
                        value={cp.basePrice}
                        onChange={(e) => updateCategoryPricing(cp.category, 'basePrice', Number(e.target.value))}
                        className="w-full pl-7 pr-4 py-2 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Min Price</label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-xs">$</span>
                        <input
                          type="number"
                          value={cp.minPrice}
                          onChange={(e) => updateCategoryPricing(cp.category, 'minPrice', Number(e.target.value))}
                          className="w-full pl-6 pr-2 py-2 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Max Price</label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-xs">$</span>
                        <input
                          type="number"
                          value={cp.maxPrice}
                          onChange={(e) => updateCategoryPricing(cp.category, 'maxPrice', Number(e.target.value))}
                          className="w-full pl-6 pr-2 py-2 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Profit Margin</label>
                      <div className="relative">
                        <input
                          type="number"
                          value={cp.margin}
                          onChange={(e) => updateCategoryPricing(cp.category, 'margin', Number(e.target.value))}
                          className="w-full pr-7 px-3 py-2 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                        />
                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 text-xs">%</span>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Tax Rate</label>
                      <div className="relative">
                        <input
                          type="number"
                          value={cp.tax}
                          onChange={(e) => updateCategoryPricing(cp.category, 'tax', Number(e.target.value))}
                          className="w-full pr-7 px-3 py-2 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                        />
                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 text-xs">%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="flex gap-3 mt-6">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            Save All Changes
          </button>
          <button 
            onClick={() => setCategoryPricing(categoryPricingDefaults)}
            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Reset to Defaults
          </button>
        </div>
      </div>

      {/* Ongoing Discounts Tracker */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Ongoing Discounts</h3>
            <p className="text-sm text-gray-600 mt-1">Track all active and scheduled discounts across categories</p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Discount Name
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Discount Rate
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Items Affected
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Duration
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Revenue Impact
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {discounts.map((discount) => {
                const Icon = getCategoryIcon(discount.category);
                const colors = getCategoryColor(discount.category);
                
                return (
                  <tr key={discount.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-4 whitespace-nowrap">
                      <span className="text-sm font-medium text-gray-900">{discount.name}</span>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <Icon className={`w-4 h-4 ${colors.text}`} />
                        <span className="text-sm text-gray-700 capitalize">{discount.category}</span>
                      </div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <span className="text-sm font-semibold text-red-600">{discount.discount}</span>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <span className="text-sm text-gray-700">{discount.itemsAffected} items</span>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <span className="text-sm text-gray-700">{discount.startDate} - {discount.endDate}</span>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <span className="text-sm font-medium text-green-600">{discount.revenue}</span>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                        discount.status === 'active' ? 'bg-green-50 text-green-700' :
                        discount.status === 'scheduled' ? 'bg-blue-50 text-blue-700' :
                        'bg-gray-50 text-gray-700'
                      }`}>
                        {discount.status.charAt(0).toUpperCase() + discount.status.slice(1)}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Global Pricing Rules */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Global Pricing Rules</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-white rounded-lg">
            <span className="text-sm text-gray-700">Apply discounts before or after tax</span>
            <select className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option>Before Tax</option>
              <option>After Tax</option>
            </select>
          </div>
          
          <div className="flex items-center justify-between p-3 bg-white rounded-lg">
            <span className="text-sm text-gray-700">Round final prices to</span>
            <select className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option>Nearest ₹0.99</option>
              <option>Nearest Rupee</option>
              <option>No Rounding</option>
            </select>
          </div>
          
          <div className="flex items-center justify-between p-3 bg-white rounded-lg">
            <span className="text-sm text-gray-700">Show strikethrough original price when discounted</span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" defaultChecked className="sr-only peer" />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-500 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
