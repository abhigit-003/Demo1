import { useState, useEffect, useCallback } from "react";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { TrendingUp, Users, MousePointer, ShoppingCart, Eye, Clock, GitBranch, AlertCircle, Loader2 } from "lucide-react";
import { getAnalytics } from "../services/adminAPI";

const DEFAULT_JOURNEY = [
  { step: 'Landing', users: 10000, dropoff: 0 },
  { step: 'Browse', users: 8500, dropoff: 15 },
  { step: 'Product View', users: 6800, dropoff: 20 },
  { step: 'Add to Cart', users: 3400, dropoff: 50 },
  { step: 'Checkout', users: 2380, dropoff: 30 },
  { step: 'Purchase', users: 1904, dropoff: 20 },
];

const DEFAULT_PATHFINDER = [
  { path: 'Home → Paris → Add to Cart → Purchase', users: 456, conversionRate: 85, avgTime: '8:24', revenue: '$865,344' },
  { path: 'Search → Tokyo → Compare → Tokyo → Purchase', users: 389, conversionRate: 72, avgTime: '12:15', revenue: '$854,811' },
  { path: 'Home → Browse → Filter → New York → Abandoned', users: 1200, conversionRate: 0, avgTime: '5:42', revenue: '$0' },
  { path: 'Social → Paris → Price Check → Abandoned', users: 890, conversionRate: 0, avgTime: '3:18', revenue: '$0' },
  { path: 'Email → Dubai → Reviews → Add to Cart → Purchase', users: 298, conversionRate: 88, avgTime: '15:20', revenue: '$744,702' },
];

const DEFAULT_EXIT_POINTS = [
  { page: 'Product Details - Paris', exits: 1240, reason: 'High Price Shock' },
  { page: 'Checkout - Payment', exits: 892, reason: 'Payment Method Issues' },
  { page: 'Browse - Destinations', exits: 756, reason: 'Information Overload' },
  { page: 'Product Comparison', exits: 634, reason: 'Better Deal Found' },
  { page: 'Search Results', exits: 521, reason: 'No Results Matched' },
];

const DEFAULT_INTERACTIONS = [
  { destination: 'Paris', clicks: 2840, conversions: 456 },
  { destination: 'Tokyo', clicks: 2210, conversions: 389 },
  { destination: 'New York', clicks: 1980, conversions: 312 },
  { destination: 'Dubai', clicks: 1750, conversions: 298 },
  { destination: 'Sydney', clicks: 1420, conversions: 234 },
];

const DEFAULT_CONVERSION = [
  { date: 'Feb 24', baseline: 12.5, withCoupon: 12.5 },
  { date: 'Feb 25', baseline: 13.2, withCoupon: 13.2 },
  { date: 'Feb 26', baseline: 12.8, withCoupon: 18.4 },
  { date: 'Feb 27', baseline: 13.1, withCoupon: 19.2 },
  { date: 'Feb 28', baseline: 12.9, withCoupon: 17.8 },
  { date: 'Mar 1', baseline: 13.3, withCoupon: 20.1 },
];

const DEFAULT_TRAFFIC = [
  { name: 'Organic Search', value: 45, color: '#3b82f6' },
  { name: 'Direct', value: 25, color: '#8b5cf6' },
  { name: 'Social Media', value: 20, color: '#10b981' },
  { name: 'Referral', value: 10, color: '#f59e0b' },
];

const DEFAULT_METRICS = [
  { icon: Users, bg: 'bg-blue-50', color: 'text-blue-600', change: '+12.5%', changeColor: 'text-green-600', value: '24,583', label: 'Total Visitors' },
  { icon: Eye, bg: 'bg-purple-50', color: 'text-purple-600', change: '+8.3%', changeColor: 'text-green-600', value: '68,492', label: 'Page Views' },
  { icon: ShoppingCart, bg: 'bg-green-50', color: 'text-green-600', change: '-2.1%', changeColor: 'text-red-600', value: '18.4%', label: 'Conversion Rate' },
  { icon: Clock, bg: 'bg-orange-50', color: 'text-orange-600', change: '+15.2%', changeColor: 'text-green-600', value: '4:32', label: 'Avg. Session Time' },
];

export default function Analytics() {
  const [isLoading, setIsLoading] = useState(true);
  const [metrics, setMetrics] = useState(DEFAULT_METRICS);
  const [journeyData, setJourneyData] = useState(DEFAULT_JOURNEY);
  const [pathfinderData, setPathfinderData] = useState(DEFAULT_PATHFINDER);
  const [exitPoints, setExitPoints] = useState(DEFAULT_EXIT_POINTS);
  const [interactionData, setInteractionData] = useState(DEFAULT_INTERACTIONS);
  const [conversionData, setConversionData] = useState(DEFAULT_CONVERSION);
  const [trafficSources, setTrafficSources] = useState(DEFAULT_TRAFFIC);
  const [dateRange, setDateRange] = useState('Last 7 days');

  const fetchAnalytics = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await getAnalytics();
      if (data.metrics) setMetrics(data.metrics);
      if (data.journeyData) setJourneyData(data.journeyData);
      if (data.pathfinderData) setPathfinderData(data.pathfinderData);
      if (data.exitPoints) setExitPoints(data.exitPoints);
      if (data.interactionData) setInteractionData(data.interactionData);
      if (data.conversionData) setConversionData(data.conversionData);
      if (data.trafficSources) setTrafficSources(data.trafficSources);
    } catch {
      // Fall through to defaults silently
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => { fetchAnalytics(); }, [fetchAnalytics]);

  const SkeletonCard = () => (
    <div className="bg-white rounded-lg border border-gray-200 p-6 animate-pulse">
      <div className="h-10 w-10 bg-gray-200 rounded-lg mb-4" />
      <div className="h-7 bg-gray-200 rounded w-20 mb-2" />
      <div className="h-4 bg-gray-200 rounded w-28" />
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900">Customer Behavior & Analytics</h2>
          <p className="text-gray-600 mt-1">Track user interactions and optimize your strategy</p>
        </div>
        <button onClick={fetchAnalytics} disabled={isLoading}
          className="inline-flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm disabled:opacity-60">
          {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <TrendingUp className="w-4 h-4" />}
          Refresh
        </button>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {isLoading
          ? Array.from({ length: 4 }).map((_, i) => <SkeletonCard key={i} />)
          : metrics.map(({ icon: Icon, bg, color, change, changeColor, value, label }) => (
            <div key={label} className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-2 ${bg} rounded-lg`}><Icon className={`w-6 h-6 ${color}`} /></div>
                <span className={`text-sm font-medium ${changeColor}`}>{change}</span>
              </div>
              <p className="text-2xl font-semibold text-gray-900">{value}</p>
              <p className="text-sm text-gray-600 mt-1">{label}</p>
            </div>
          ))
        }
      </div>

      {/* User Journey */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">User Journey – Pathfinder View</h3>
            <p className="text-sm text-gray-600 mt-1">Visualize where users drop off in their journey</p>
          </div>
          <select value={dateRange} onChange={e => { setDateRange(e.target.value); fetchAnalytics(); }}
            className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option>Last 7 days</option>
            <option>Last 30 days</option>
            <option>Last 90 days</option>
          </select>
        </div>
        {isLoading ? (
          <div className="flex items-center justify-center py-16"><Loader2 className="w-8 h-8 animate-spin text-blue-500" /></div>
        ) : (
          <>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={journeyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="step" stroke="#6b7280" fontSize={12} />
                <YAxis stroke="#6b7280" fontSize={12} />
                <Tooltip />
                <Bar dataKey="users" fill="#3b82f6" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-4 mt-6">
              {journeyData.map(step => (
                <div key={step.step} className="text-center">
                  <div className={`w-full h-2 rounded-full mb-2 ${step.dropoff === 0 ? 'bg-green-500' : step.dropoff < 25 ? 'bg-blue-500' : step.dropoff < 40 ? 'bg-yellow-500' : 'bg-red-500'}`} />
                  <p className="text-xs font-medium text-gray-900">{step.step}</p>
                  <p className="text-xs text-gray-600 mt-1">{step.users.toLocaleString()}</p>
                  {step.dropoff > 0 && <p className="text-xs text-red-600 mt-1">-{step.dropoff}%</p>}
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Destination Interactions */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Top Destination Interactions</h3>
          {isLoading ? (
            <div className="flex items-center justify-center py-12"><Loader2 className="w-6 h-6 animate-spin text-blue-500" /></div>
          ) : (
            <div className="space-y-4">
              {interactionData.map((dest, index) => {
                const conversionRate = ((dest.conversions / dest.clicks) * 100).toFixed(1);
                return (
                  <div key={dest.destination}>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <span className="text-lg font-semibold text-gray-400">#{index + 1}</span>
                        <span className="font-medium text-gray-900">{dest.destination}</span>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-gray-900">{dest.clicks.toLocaleString()} clicks</p>
                        <p className="text-xs text-gray-600">{conversionRate}% conversion</p>
                      </div>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-500 h-2 rounded-full" style={{ width: `${(dest.clicks / interactionData[0].clicks) * 100}%` }} />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <p className="text-sm text-blue-900 font-medium">💡 Insight</p>
            <p className="text-sm text-blue-700 mt-1">Users are clicking 'Paris' frequently but leaving after seeing the Dynamic Price. Consider adjusting the pricing strategy.</p>
          </div>
        </div>

        {/* Traffic Sources */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Traffic Sources</h3>
          {isLoading ? (
            <div className="flex items-center justify-center py-12"><Loader2 className="w-6 h-6 animate-spin text-blue-500" /></div>
          ) : (
            <>
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie data={trafficSources} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                    {trafficSources.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="mt-6 space-y-3">
                {trafficSources.map(source => (
                  <div key={source.name} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-4 h-4 rounded" style={{ backgroundColor: source.color }} />
                      <span className="text-sm text-gray-700">{source.name}</span>
                    </div>
                    <span className="text-sm font-medium text-gray-900">{source.value}%</span>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      {/* Conversion Monitoring */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Conversion Rate Monitoring</h3>
            <p className="text-sm text-gray-600 mt-1">Impact of pricing changes and coupons on "Add to Cart" rate</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2"><div className="w-3 h-3 bg-gray-300 rounded-full" /><span className="text-sm text-gray-600">Baseline</span></div>
            <div className="flex items-center gap-2"><div className="w-3 h-3 bg-green-500 rounded-full" /><span className="text-sm text-gray-600">With SAVE20 Coupon</span></div>
          </div>
        </div>
        {isLoading ? (
          <div className="flex items-center justify-center py-16"><Loader2 className="w-8 h-8 animate-spin text-blue-500" /></div>
        ) : (
          <>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={conversionData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="date" stroke="#6b7280" fontSize={12} />
                <YAxis stroke="#6b7280" fontSize={12} />
                <Tooltip />
                <Line type="monotone" dataKey="baseline" stroke="#9ca3af" strokeWidth={2} dot={{ fill: '#9ca3af', r: 4 }} />
                <Line type="monotone" dataKey="withCoupon" stroke="#10b981" strokeWidth={2} dot={{ fill: '#10b981', r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
            <div className="mt-6 grid grid-cols-3 gap-6">
              {[
                { bg: 'bg-green-50', valueColor: 'text-green-600', value: '+54%', label: 'Conversion Increase' },
                { bg: 'bg-blue-50', valueColor: 'text-blue-600', value: '$18.4K', label: 'Additional Revenue' },
                { bg: 'bg-purple-50', valueColor: 'text-purple-600', value: '234', label: 'Coupon Uses' },
              ].map(({ bg, valueColor, value, label }) => (
                <div key={label} className={`text-center p-4 ${bg} rounded-lg`}>
                  <p className={`text-2xl font-semibold ${valueColor}`}>{value}</p>
                  <p className="text-sm text-gray-600 mt-1">{label}</p>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Pathfinder Behavior Analytics */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-indigo-50 rounded-lg"><GitBranch className="w-6 h-6 text-indigo-600" /></div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Pathfinder Behavior Analytics</h3>
            <p className="text-sm text-gray-600 mt-1">Analyze complete user paths from entry to conversion or exit</p>
          </div>
        </div>
        {isLoading ? (
          <div className="flex items-center justify-center py-12"><Loader2 className="w-6 h-6 animate-spin text-blue-500" /></div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[640px]">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    {['User Path', 'Users', 'Conversion Rate', 'Avg. Time', 'Revenue'].map(h => (
                      <th key={h} className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {pathfinderData.map((pathData, index) => (
                    <tr key={index} className="hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-2">
                          <GitBranch className="w-4 h-4 text-gray-400 flex-shrink-0" />
                          <span className="text-sm text-gray-900 font-mono">{pathData.path}</span>
                        </div>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap"><span className="text-sm font-medium text-gray-900">{pathData.users.toLocaleString()}</span></td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <div className="w-full max-w-[100px] bg-gray-200 rounded-full h-2">
                            <div className={`h-2 rounded-full ${pathData.conversionRate >= 80 ? 'bg-green-500' : pathData.conversionRate >= 60 ? 'bg-blue-500' : pathData.conversionRate > 0 ? 'bg-yellow-500' : 'bg-red-500'}`}
                              style={{ width: `${pathData.conversionRate}%` }} />
                          </div>
                          <span className="text-sm font-medium text-gray-900">{pathData.conversionRate}%</span>
                        </div>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap"><span className="text-sm text-gray-700">{pathData.avgTime}</span></td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <span className={`text-sm font-medium ${pathData.conversionRate > 0 ? 'text-green-600' : 'text-gray-400'}`}>{pathData.revenue}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { from: 'from-green-50 to-emerald-50', border: 'border-green-200', labelColor: 'text-green-900', valueColor: 'text-green-600', desc: 'text-green-700', label: 'High Converting Paths', value: String(pathfinderData.filter(p => p.conversionRate >= 70).length), descText: 'Paths with 70%+ conversion rate' },
                { from: 'from-red-50 to-orange-50', border: 'border-red-200', labelColor: 'text-red-900', valueColor: 'text-red-600', desc: 'text-red-700', label: 'Abandoned Journeys', value: pathfinderData.filter(p => p.conversionRate === 0).reduce((s, p) => s + p.users, 0).toLocaleString(), descText: "Users who didn't complete purchase" },
                { from: 'from-blue-50 to-indigo-50', border: 'border-blue-200', labelColor: 'text-blue-900', valueColor: 'text-blue-600', desc: 'text-blue-700', label: 'Avg. Path Length', value: '4.2', descText: 'Pages visited before action' },
              ].map(({ from, border, labelColor, valueColor, desc, label, value, descText }) => (
                <div key={label} className={`p-4 bg-gradient-to-br ${from} rounded-lg border ${border}`}>
                  <div className="flex items-center justify-between mb-2">
                    <span className={`text-sm font-medium ${labelColor}`}>{label}</span>
                    <span className={`text-2xl font-semibold ${valueColor}`}>{value}</span>
                  </div>
                  <p className={`text-xs ${desc}`}>{descText}</p>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Critical Exit Points */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-red-50 rounded-lg"><AlertCircle className="w-6 h-6 text-red-600" /></div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Critical Exit Points</h3>
            <p className="text-sm text-gray-600 mt-1">Pages where users commonly leave without converting</p>
          </div>
        </div>
        {isLoading ? (
          <div className="flex items-center justify-center py-12"><Loader2 className="w-6 h-6 animate-spin text-blue-500" /></div>
        ) : (
          <div className="space-y-4">
            {exitPoints.map((exitPoint, index) => {
              const maxExits = exitPoints[0].exits;
              const percentage = (exitPoint.exits / maxExits) * 100;
              return (
                <div key={index} className="p-4 bg-red-50 rounded-lg border border-red-100 hover:border-red-300 transition-colors">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-lg font-semibold text-gray-400">#{index + 1}</span>
                        <h4 className="text-base font-semibold text-gray-900">{exitPoint.page}</h4>
                      </div>
                      <p className="text-sm text-gray-600">Primary Reason: <span className="font-medium text-red-700">{exitPoint.reason}</span></p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-semibold text-red-600">{exitPoint.exits.toLocaleString()}</p>
                      <p className="text-xs text-gray-600">exits</p>
                    </div>
                  </div>
                  <div className="w-full bg-red-200 rounded-full h-2">
                    <div className="bg-red-500 h-2 rounded-full transition-all" style={{ width: `${percentage}%` }} />
                  </div>
                </div>
              );
            })}
          </div>
        )}
        <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <div className="flex gap-3">
            <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-yellow-900">💡 Action Recommendations</p>
              <ul className="text-sm text-yellow-800 mt-2 space-y-1">
                <li>• Consider implementing dynamic pricing display on Paris product page to reduce price shock</li>
                <li>• Add more payment methods to reduce checkout abandonment</li>
                <li>• Simplify the destination browse page to reduce information overload</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Heatmap Integration Placeholder */}
      <div className="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-lg p-6">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-white rounded-lg"><MousePointer className="w-8 h-8 text-purple-600" /></div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900">Heatmap Integration</h3>
            <p className="text-sm text-gray-600 mt-1">Connect with Hotjar or Microsoft Clarity to see which destination photos and elements get the most attention</p>
          </div>
          <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors whitespace-nowrap">
            Connect Tool
          </button>
        </div>
      </div>
    </div>
  );
}