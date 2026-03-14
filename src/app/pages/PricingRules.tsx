import { useState } from "react";
import { Plus, TrendingUp, Calendar, Target, Play, Pause, Edit, Trash2, AlertCircle, Settings, Activity, User, Clock, IndianRupee, Package, MapPin, Briefcase } from "lucide-react";

interface PricingRule {
  id: string;
  name: string;
  type: 'demand' | 'time' | 'competitor';
  description: string;
  adjustment: string;
  condition: string;
  status: 'active' | 'paused';
  appliedTo: string;
  created: string;
}

const mockRules: PricingRule[] = [
  {
    id: '1',
    name: 'High Demand Surge',
    type: 'demand',
    description: 'Increase price when capacity exceeds 80%',
    adjustment: '+15%',
    condition: 'Bookings > 80% capacity',
    status: 'active',
    appliedTo: 'All Destinations',
    created: '2 weeks ago'
  },
  {
    id: '2',
    name: 'Early Bird Discount',
    type: 'time',
    description: 'Discount for bookings made 60+ days in advance',
    adjustment: '-10%',
    condition: 'Booking date > 60 days before travel',
    status: 'active',
    appliedTo: 'Elite Destinations',
    created: '1 month ago'
  },
  {
    id: '3',
    name: 'Competitor Price Match',
    type: 'competitor',
    description: 'Match lowest market price within 5% margin',
    adjustment: 'Match ±5%',
    condition: 'Competitor price detected',
    status: 'paused',
    appliedTo: 'Standard Tier',
    created: '3 weeks ago'
  },
  {
    id: '4',
    name: 'Last Minute Deal',
    type: 'time',
    description: 'Reduce price for bookings within 7 days',
    adjustment: '-20%',
    condition: 'Booking date < 7 days before travel',
    status: 'active',
    appliedTo: 'Budget Destinations',
    created: '1 week ago'
  },
];

interface AdminAction {
  id: string;
  user: string;
  action: string;
  target: string;
  timestamp: string;
  impact: string;
}

const recentActions: AdminAction[] = [
  { id: '1', user: 'Sarah Admin', action: 'Updated pricing rule', target: 'High Demand Surge', timestamp: '5 min ago', impact: '+₹2.3K revenue' },
  { id: '2', user: 'Mike Operations', action: 'Paused pricing rule', target: 'Competitor Price Match', timestamp: '23 min ago', impact: 'Affecting 45 products' },
  { id: '3', user: 'Sarah Admin', action: 'Created pricing rule', target: 'Weekend Premium', timestamp: '2 hours ago', impact: '+8% average price' },
  { id: '4', user: 'Emma Marketing', action: 'Manual override set', target: 'Paris Premium Package', timestamp: '3 hours ago', impact: 'Price locked at ₹1799' },
];

interface OngoingDiscount {
  id: string;
  name: string;
  category: 'product' | 'destination' | 'service';
  discount: string;
  itemsAffected: number;
  startDate: string;
  endDate: string;
  revenue: string;
}

const ongoingDiscounts: OngoingDiscount[] = [
  { id: '1', name: 'Spring Sale - Products', category: 'product', discount: '15%', itemsAffected: 234, startDate: 'Mar 1', endDate: 'Mar 31', revenue: '₹45.2K' },
  { id: '2', name: 'Early Bird - Destinations', category: 'destination', discount: '10%', itemsAffected: 89, startDate: 'Feb 15', endDate: 'Apr 15', revenue: '₹28.9K' },
  { id: '3', name: 'Service Bundle Discount', category: 'service', discount: '20%', itemsAffected: 45, startDate: 'Mar 1', endDate: 'Mar 15', revenue: '₹12.3K' },
];

export default function PricingRules() {
  const [rules, setRules] = useState<PricingRule[]>(mockRules);
  const [showRuleBuilder, setShowRuleBuilder] = useState(false);

  const toggleRuleStatus = (id: string) => {
    setRules(rules.map(rule =>
      rule.id === id
        ? { ...rule, status: rule.status === 'active' ? 'paused' : 'active' }
        : rule
    ));
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'demand': return TrendingUp;
      case 'time': return Calendar;
      case 'competitor': return Target;
      default: return TrendingUp;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'demand': return 'bg-purple-50 text-purple-700';
      case 'time': return 'bg-blue-50 text-blue-700';
      case 'competitor': return 'bg-orange-50 text-orange-700';
      default: return 'bg-gray-50 text-gray-700';
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900">Revenue & Pricing Engine</h2>
          <p className="text-gray-600 mt-1">Automate and optimize your pricing strategy</p>
        </div>
        <button 
          onClick={() => setShowRuleBuilder(true)}
          className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-5 h-5" />
          Create Rule
        </button>
      </div>

      {/* Price Engine Section */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-blue-50 rounded-lg">
              <Settings className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Price Engine Configuration</h3>
              <p className="text-sm text-gray-600 mt-1">Core pricing algorithm settings</p>
            </div>
          </div>
          <button 
            onClick={() => setShowRuleBuilder(!showRuleBuilder)}
            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            {showRuleBuilder ? 'Hide' : 'Configure'}
          </button>
        </div>

        {showRuleBuilder && (
          <div className="space-y-6 pt-6 border-t border-gray-200">
            {/* Base Price Settings */}
            <div>
              <h4 className="text-sm font-semibold text-gray-900 mb-4">Base Price Settings</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Minimum Price Floor</label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                    <input
                      type="number"
                      defaultValue="99"
                      className="w-full pl-7 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Prices will never go below this amount</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Maximum Price Ceiling</label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                    <input
                      type="number"
                      defaultValue="9999"
                      className="w-full pl-7 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Maximum allowed price for any product</p>
                </div>
              </div>
            </div>

            {/* Adjustment Limits */}
            <div>
              <h4 className="text-sm font-semibold text-gray-900 mb-4">Adjustment Limits</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Max Single Increase</label>
                  <div className="relative">
                    <input
                      type="number"
                      defaultValue="25"
                      className="w-full pr-8 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">%</span>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Max Single Decrease</label>
                  <div className="relative">
                    <input
                      type="number"
                      defaultValue="30"
                      className="w-full pr-8 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">%</span>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Update Frequency</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option>Real-time</option>
                    <option>Every 15 minutes</option>
                    <option>Hourly</option>
                    <option>Daily</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Rule Priority */}
            <div>
              <h4 className="text-sm font-semibold text-gray-900 mb-4">Rule Priority & Stacking</h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-sm text-gray-700">Allow multiple rules to stack</span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" defaultChecked className="sr-only peer" />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-500 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-sm text-gray-700">Cap stacked adjustments at 50%</span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" defaultChecked className="sr-only peer" />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-500 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-sm text-gray-700">Manual overrides take precedence</span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" defaultChecked className="sr-only peer" />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-500 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
              </div>
            </div>

            <div className="flex gap-3 pt-4">
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                Save Configuration
              </button>
              <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                Reset to Defaults
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Active Rules</p>
              <p className="text-2xl font-semibold text-gray-900 mt-1">
                {rules.filter(r => r.status === 'active').length}
              </p>
            </div>
            <div className="p-3 bg-green-50 rounded-lg">
              <Play className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Avg. Price Increase</p>
              <p className="text-2xl font-semibold text-green-600 mt-1">+8.5%</p>
            </div>
            <div className="p-3 bg-blue-50 rounded-lg">
              <TrendingUp className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Revenue Impact</p>
              <p className="text-2xl font-semibold text-gray-900 mt-1">₹24.3K</p>
            </div>
            <div className="p-3 bg-purple-50 rounded-lg">
              <Target className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">This Month</p>
              <p className="text-2xl font-semibold text-gray-900 mt-1">142</p>
            </div>
            <div className="p-3 bg-orange-50 rounded-lg">
              <Calendar className="w-6 h-6 text-orange-600" />
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-2">Price adjustments applied</p>
        </div>
      </div>

      {/* Rule Builder Modal */}
      {showRuleBuilder && (
        <div className="bg-white rounded-lg border-2 border-blue-500 p-6 shadow-lg">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Rule Builder</h3>
            <button 
              onClick={() => setShowRuleBuilder(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Rule Name</label>
              <input
                type="text"
                placeholder="e.g., Weekend Peak Pricing"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Rule Type</label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option>Demand-Based</option>
                <option>Time-Based</option>
                <option>Competitor-Linked</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Condition</label>
              <input
                type="text"
                placeholder="e.g., If bookings exceed 70% capacity"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Price Adjustment</label>
              <div className="flex gap-2">
                <select className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option>Increase by</option>
                  <option>Decrease by</option>
                  <option>Set to</option>
                </select>
                <input
                  type="text"
                  placeholder="15"
                  className="w-24 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <select className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option>%</option>
                  <option>₹</option>
                </select>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Apply To</label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option>All Products</option>
                <option>All Destinations</option>
                <option>Elite Tier Only</option>
                <option>Standard Tier Only</option>
                <option>Budget Tier Only</option>
                <option>Specific Products...</option>
              </select>
            </div>
            
            <div className="flex gap-3 pt-4">
              <button className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                Create Rule
              </button>
              <button 
                onClick={() => setShowRuleBuilder(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Active Rules */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Dynamic Pricing Rules</h3>
        </div>
        
        <div className="divide-y divide-gray-200">
          {rules.map((rule) => {
            const TypeIcon = getTypeIcon(rule.type);
            
            return (
              <div key={rule.id} className="p-6 hover:bg-gray-50 transition-colors">
                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-lg ${getTypeColor(rule.type)}`}>
                    <TypeIcon className="w-6 h-6" />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h4 className="text-base font-semibold text-gray-900">{rule.name}</h4>
                        <p className="text-sm text-gray-600 mt-1">{rule.description}</p>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => toggleRuleStatus(rule.id)}
                          className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors ${
                            rule.status === 'active'
                              ? 'bg-green-50 text-green-700 hover:bg-green-100'
                              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                          }`}
                        >
                          {rule.status === 'active' ? (
                            <span className="flex items-center gap-1">
                              <Play className="w-3 h-3" /> Active
                            </span>
                          ) : (
                            <span className="flex items-center gap-1">
                              <Pause className="w-3 h-3" /> Paused
                            </span>
                          )}
                        </button>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-4 mt-4 p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="text-xs text-gray-600">Condition</p>
                        <p className="text-sm font-medium text-gray-900 mt-1">{rule.condition}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-600">Adjustment</p>
                        <p className="text-sm font-medium text-gray-900 mt-1">{rule.adjustment}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-600">Applied To</p>
                        <p className="text-sm font-medium text-gray-900 mt-1">{rule.appliedTo}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between mt-4">
                      <p className="text-xs text-gray-500">Created {rule.created}</p>
                      <div className="flex gap-2">
                        <button className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Manual Override Section */}
      <div className="bg-gradient-to-r from-orange-50 to-red-50 border border-orange-200 rounded-lg p-6">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-white rounded-lg">
            <AlertCircle className="w-6 h-6 text-orange-600" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900">Manual Price Override</h3>
            <p className="text-sm text-gray-600 mt-1">
              Temporarily override automated pricing for specific products or destinations
            </p>
            <div className="flex gap-3 mt-4">
              <input
                type="text"
                placeholder="Search product or destination..."
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white"
              />
              <button className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors">
                Set Override
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Admin Actions */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-gray-50 rounded-lg">
              <Activity className="w-6 h-6 text-gray-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Recent Admin Actions</h3>
              <p className="text-sm text-gray-600 mt-1">Latest changes to pricing rules</p>
            </div>
          </div>
        </div>

        <div className="divide-y divide-gray-200">
          {recentActions.map((action) => (
            <div key={action.id} className="p-6 hover:bg-gray-50 transition-colors">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-gray-50 rounded-lg">
                  <User className="w-6 h-6 text-gray-600" />
                </div>
                
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h4 className="text-base font-semibold text-gray-900">{action.user}</h4>
                      <p className="text-sm text-gray-600 mt-1">{action.action} on {action.target}</p>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <p className="text-xs text-gray-500">{action.timestamp}</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4 mt-4 p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="text-xs text-gray-600">Impact</p>
                      <p className="text-sm font-medium text-gray-900 mt-1">{action.impact}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}