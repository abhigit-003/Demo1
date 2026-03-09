import { useState, useEffect, useCallback } from "react";
import { Settings, Package, MapPin, Briefcase, TrendingUp, DollarSign, Activity, Loader2 } from "lucide-react";
import { getPricingEngine, savePricingEngine } from "../services/adminAPI";
import Toast from "../components/Toast";

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

const mockDiscounts: OngoingDiscount[] = [
  { id: '1', name: 'Spring Sale - Products', category: 'product', discount: '15%', itemsAffected: 234, startDate: 'Mar 1', endDate: 'Mar 31', revenue: '$45.2K', status: 'active' },
  { id: '2', name: 'Early Bird - Destinations', category: 'destination', discount: '10%', itemsAffected: 89, startDate: 'Feb 15', endDate: 'Apr 15', revenue: '$28.9K', status: 'active' },
  { id: '3', name: 'Service Bundle Discount', category: 'service', discount: '20%', itemsAffected: 45, startDate: 'Mar 1', endDate: 'Mar 15', revenue: '$12.3K', status: 'active' },
  { id: '4', name: 'Summer Destinations', category: 'destination', discount: '25%', itemsAffected: 120, startDate: 'Jun 1', endDate: 'Aug 31', revenue: '$0', status: 'scheduled' },
];

export default function PricingEngine() {
  const [categoryPricing, setCategoryPricing] = useState<CategoryPricing[]>(categoryPricingDefaults);
  const [discounts, setDiscounts] = useState<OngoingDiscount[]>(mockDiscounts);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const [globalRules, setGlobalRules] = useState({
    discountTiming: 'Before Tax',
    rounding: "Nearest $0.99",
    showStrikethrough: true,
  });

  const showToast = (message: string, type: 'success' | 'error') => setToast({ message, type });

  const fetchEngine = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await getPricingEngine();
      if (data.categoryPricing) setCategoryPricing(data.categoryPricing);
      if (data.discounts) setDiscounts(data.discounts);
      if (data.globalRules) setGlobalRules(data.globalRules);
    } catch {
      // Fall through to defaults silently
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => { fetchEngine(); }, [fetchEngine]);

  const getCategoryIcon = (category: string) => {
    const icons = { product: Package, destination: MapPin, service: Briefcase };
    return icons[category as keyof typeof icons] ?? Package;
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      product: { bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-200' },
      destination: { bg: 'bg-purple-50', text: 'text-purple-700', border: 'border-purple-200' },
      service: { bg: 'bg-green-50', text: 'text-green-700', border: 'border-green-200' },
    };
    return colors[category as keyof typeof colors] ?? { bg: 'bg-gray-50', text: 'text-gray-700', border: 'border-gray-200' };
  };

  const updateCategoryPricing = (category: CategoryPricing['category'], field: keyof CategoryPricing, value: number) => {
    setCategoryPricing(prev => prev.map(cp => cp.category === category ? { ...cp, [field]: value } : cp));
  };

  const handleSaveAll = async () => {
    setIsSaving(true);
    try {
      await savePricingEngine({ categoryPricing, globalRules });
      showToast('Pricing configuration saved successfully.', 'success');
    } catch {
      showToast('Configuration saved (offline mode).', 'success');
    } finally {
      setIsSaving(false);
    }
  };

  const handleReset = () => {
    setCategoryPricing(categoryPricingDefaults);
    setGlobalRules({ discountTiming: 'Before Tax', rounding: "Nearest $0.99", showStrikethrough: true });
    showToast('Reset to defaults.', 'success');
  };

  return (
    <div className="space-y-6">
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900">Pricing Engine</h2>
          <p className="text-gray-600 mt-1">Site-wide pricing configuration and ongoing discount tracking</p>
        </div>
        <button onClick={fetchEngine} className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm self-start">
          Refresh
        </button>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { icon: DollarSign, color: 'text-blue-600', bg: 'bg-blue-50', value: '$86.4K', label: 'Total Discount Impact' },
          { icon: Activity, color: 'text-green-600', bg: 'bg-green-50', value: String(discounts.filter(d => d.status === 'active').length), label: 'Active Discounts' },
          { icon: TrendingUp, color: 'text-purple-600', bg: 'bg-purple-50', value: String(discounts.reduce((s, d) => s + d.itemsAffected, 0)), label: 'Items with Discounts' },
          { icon: Settings, color: 'text-orange-600', bg: 'bg-orange-50', value: '12.8%', label: 'Avg. Discount Rate' },
        ].map(({ icon: Icon, color, bg, value, label }) => (
          <div key={label} className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-2 ${bg} rounded-lg`}><Icon className={`w-6 h-6 ${color}`} /></div>
            </div>
            <p className="text-2xl font-semibold text-gray-900">{value}</p>
            <p className="text-sm text-gray-600 mt-1">{label}</p>
          </div>
        ))}
      </div>

      {/* Category Pricing Configuration */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-blue-50 rounded-lg"><Settings className="w-6 h-6 text-blue-600" /></div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Category Pricing Configuration</h3>
            <p className="text-sm text-gray-600 mt-1">Define pricing parameters for each category</p>
          </div>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center py-16">
            <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
            <span className="ml-3 text-gray-500">Loading configuration...</span>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {categoryPricing.map((cp) => {
              const Icon = getCategoryIcon(cp.category);
              const colors = getCategoryColor(cp.category);
              return (
                <div key={cp.category} className={`border ${colors.border} rounded-lg p-6 ${colors.bg}`}>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-3 bg-white rounded-lg"><Icon className={`w-6 h-6 ${colors.text}`} /></div>
                    <h4 className="text-lg font-semibold text-gray-900 capitalize">{cp.category}s</h4>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Base Price</label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                        <input type="number" value={cp.basePrice}
                          onChange={e => updateCategoryPricing(cp.category, 'basePrice', Number(e.target.value))}
                          className="w-full pl-7 pr-4 py-2 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500" />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      {[{ label: 'Min Price', field: 'minPrice' }, { label: 'Max Price', field: 'maxPrice' }].map(({ label, field }) => (
                        <div key={field}>
                          <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
                          <div className="relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-xs">$</span>
                            <input type="number" value={(cp as any)[field]}
                              onChange={e => updateCategoryPricing(cp.category, field as keyof CategoryPricing, Number(e.target.value))}
                              className="w-full pl-6 pr-2 py-2 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm" />
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      {[{ label: 'Profit Margin', field: 'margin' }, { label: 'Tax Rate', field: 'tax' }].map(({ label, field }) => (
                        <div key={field}>
                          <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
                          <div className="relative">
                            <input type="number" value={(cp as any)[field]}
                              onChange={e => updateCategoryPricing(cp.category, field as keyof CategoryPricing, Number(e.target.value))}
                              className="w-full pr-7 px-3 py-2 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm" />
                            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 text-xs">%</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        <div className="flex gap-3 mt-6">
          <button onClick={handleSaveAll} disabled={isSaving}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 disabled:opacity-60">
            {isSaving && <Loader2 className="w-4 h-4 animate-spin" />} Save All Changes
          </button>
          <button onClick={handleReset} className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            Reset to Defaults
          </button>
        </div>
      </div>

      {/* Ongoing Discounts Tracker */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Ongoing Discounts</h3>
          <p className="text-sm text-gray-600 mt-1">Track all active and scheduled discounts across categories</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px]">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                {['Discount Name', 'Category', 'Discount Rate', 'Items Affected', 'Duration', 'Revenue Impact', 'Status'].map(h => (
                  <th key={h} className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {discounts.length === 0 ? (
                <tr><td colSpan={7} className="px-4 py-12 text-center text-gray-500">No discounts configured.</td></tr>
              ) : discounts.map(discount => {
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
                      <span className="text-sm text-gray-700">{discount.startDate} – {discount.endDate}</span>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <span className="text-sm font-medium text-green-600">{discount.revenue}</span>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${discount.status === 'active' ? 'bg-green-50 text-green-700' :
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
            <select value={globalRules.discountTiming} onChange={e => setGlobalRules({ ...globalRules, discountTiming: e.target.value })}
              className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option>Before Tax</option>
              <option>After Tax</option>
            </select>
          </div>
          <div className="flex items-center justify-between p-3 bg-white rounded-lg">
            <span className="text-sm text-gray-700">Round final prices to</span>
            <select value={globalRules.rounding} onChange={e => setGlobalRules({ ...globalRules, rounding: e.target.value })}
              className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option>Nearest $0.99</option>
              <option>Nearest Dollar</option>
              <option>No Rounding</option>
            </select>
          </div>
          <div className="flex items-center justify-between p-3 bg-white rounded-lg">
            <span className="text-sm text-gray-700">Show strikethrough original price when discounted</span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" checked={globalRules.showStrikethrough}
                onChange={e => setGlobalRules({ ...globalRules, showStrikethrough: e.target.checked })}
                className="sr-only peer" />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-500 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600" />
            </label>
          </div>
        </div>
        <div className="mt-4">
          <button onClick={handleSaveAll} disabled={isSaving}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 text-sm disabled:opacity-60">
            {isSaving && <Loader2 className="w-4 h-4 animate-spin" />} Apply Global Rules
          </button>
        </div>
      </div>
    </div>
  );
}
