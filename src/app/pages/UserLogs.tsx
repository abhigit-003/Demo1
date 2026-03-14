import { useState } from "react";
import { Search, Filter, Download, Calendar, User, AlertTriangle, CheckCircle, Info } from "lucide-react";

interface LogEntry {
  id: string;
  timestamp: string;
  user: string;
  role: string;
  action: string;
  target: string;
  category: 'product' | 'destination' | 'pricing' | 'coupon' | 'system';
  severity: 'info' | 'warning' | 'critical';
  details: string;
  ip?: string;
}

const mockLogs: LogEntry[] = [
  {
    id: '1',
    timestamp: '2026-03-01 14:32:15',
    user: 'Sarah Admin',
    role: 'Senior Admin',
    action: 'Updated pricing rule',
    target: 'High Demand Surge',
    category: 'pricing',
    severity: 'info',
    details: 'Changed adjustment from +10% to +15%',
    ip: '192.168.1.45'
  },
  {
    id: '2',
    timestamp: '2026-03-01 13:15:42',
    user: 'Mike Operations',
    role: 'Operations Manager',
    action: 'Restricted destination',
    target: 'Rio Carnival',
    category: 'destination',
    severity: 'critical',
    details: 'Reason: Political instability in region',
    ip: '192.168.1.89'
  },
  {
    id: '3',
    timestamp: '2026-03-01 12:08:30',
    user: 'Emma Marketing',
    role: 'Marketing Team',
    action: 'Created coupon',
    target: 'SPRING30',
    category: 'coupon',
    severity: 'info',
    details: '30% discount, expires April 15',
    ip: '192.168.1.102'
  },
  {
    id: '4',
    timestamp: '2026-03-01 11:45:19',
    user: 'John Moderator',
    role: 'Moderator',
    action: 'Hidden product',
    target: 'Luxury Watch #2341',
    category: 'product',
    severity: 'warning',
    details: 'Reason: Regulation violation - pending review',
    ip: '192.168.1.67'
  },
  {
    id: '5',
    timestamp: '2026-03-01 10:22:08',
    user: 'Sarah Admin',
    role: 'Senior Admin',
    action: 'Deleted destination',
    target: 'Bangkok Package',
    category: 'destination',
    severity: 'critical',
    details: 'Vendor contract terminated',
    ip: '192.168.1.45'
  },
  {
    id: '6',
    timestamp: '2026-03-01 09:15:33',
    user: 'Alex Support',
    role: 'Support Team',
    action: 'Updated product status',
    target: 'Designer Handbag',
    category: 'product',
    severity: 'info',
    details: 'Changed from active to out-of-stock',
    ip: '192.168.1.156'
  },
  {
    id: '7',
    timestamp: '2026-03-01 08:52:47',
    user: 'Mike Operations',
    role: 'Operations Manager',
    action: 'Updated destination tier',
    target: 'Dubai Luxury',
    category: 'destination',
    severity: 'info',
    details: 'Upgraded from Standard to Elite tier',
    ip: '192.168.1.89'
  },
  {
    id: '8',
    timestamp: '2026-02-29 18:30:22',
    user: 'Emma Marketing',
    role: 'Marketing Team',
    action: 'Started flash sale',
    target: 'European Destinations',
    category: 'pricing',
    severity: 'warning',
    details: '25% discount for 4 hours',
    ip: '192.168.1.102'
  },
];

const categories = ['All Categories', 'Product', 'Destination', 'Pricing', 'Coupon', 'System'];
const severities = ['All Severity', 'Info', 'Warning', 'Critical'];

export default function UserLogs() {
  const [logs, setLogs] = useState<LogEntry[]>(mockLogs);
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [selectedSeverity, setSelectedSeverity] = useState('All Severity');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredLogs = logs.filter(log => {
    const matchesCategory = selectedCategory === 'All Categories' || 
                           log.category === selectedCategory.toLowerCase();
    const matchesSeverity = selectedSeverity === 'All Severity' || 
                           log.severity === selectedSeverity.toLowerCase();
    const matchesSearch = log.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         log.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         log.target.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSeverity && matchesSearch;
  });

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'critical': return AlertTriangle;
      case 'warning': return AlertTriangle;
      case 'info': return Info;
      default: return Info;
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-red-50 text-red-700 border-red-200';
      case 'warning': return 'bg-yellow-50 text-yellow-700 border-yellow-200';
      case 'info': return 'bg-blue-50 text-blue-700 border-blue-200';
      default: return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'product': return 'bg-blue-50 text-blue-700';
      case 'destination': return 'bg-purple-50 text-purple-700';
      case 'pricing': return 'bg-green-50 text-green-700';
      case 'coupon': return 'bg-orange-50 text-orange-700';
      case 'system': return 'bg-gray-50 text-gray-700';
      default: return 'bg-gray-50 text-gray-700';
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900">Audit Logs & User Activity</h2>
          <p className="text-gray-600 mt-1">Track all changes and ensure accountability</p>
        </div>
        <button className="inline-flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
          <Download className="w-5 h-5" />
          Export Logs
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <p className="text-sm text-gray-600">Total Actions Today</p>
          <p className="text-2xl font-semibold text-gray-900 mt-1">{logs.length}</p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <p className="text-sm text-gray-600">Critical Events</p>
          <p className="text-2xl font-semibold text-red-600 mt-1">
            {logs.filter(l => l.severity === 'critical').length}
          </p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <p className="text-sm text-gray-600">Active Users</p>
          <p className="text-2xl font-semibold text-gray-900 mt-1">
            {new Set(logs.map(l => l.user)).size}
          </p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <p className="text-sm text-gray-600">Warnings</p>
          <p className="text-2xl font-semibold text-yellow-600 mt-1">
            {logs.filter(l => l.severity === 'warning').length}
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by user, action, or target..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div className="flex gap-2">
            <select 
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
            
            <select 
              value={selectedSeverity}
              onChange={(e) => setSelectedSeverity(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {severities.map(sev => (
                <option key={sev} value={sev}>{sev}</option>
              ))}
            </select>
            
            <button className="inline-flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              <Calendar className="w-5 h-5" />
              Date Range
            </button>
          </div>
        </div>
      </div>

      {/* Role-Based Access Info */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-3">Role-Based Access Control (RBAC)</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div>
            <p className="font-medium text-blue-900 mb-2">👑 Senior Admin</p>
            <p className="text-blue-700">Full access including deletion, core pricing changes, and destination management</p>
          </div>
          <div>
            <p className="font-medium text-blue-900 mb-2">⚙️ Operations Manager</p>
            <p className="text-blue-700">Manage destinations, update tiers, and handle restrictions</p>
          </div>
          <div>
            <p className="font-medium text-blue-900 mb-2">📢 Marketing Team</p>
            <p className="text-blue-700">Create and manage coupons, flash sales, but limited product access</p>
          </div>
        </div>
      </div>

      {/* Logs Timeline */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Activity Timeline</h3>
        </div>
        
        <div className="divide-y divide-gray-200">
          {filteredLogs.map((log) => {
            const SeverityIcon = getSeverityIcon(log.severity);
            
            return (
              <div key={log.id} className="p-6 hover:bg-gray-50 transition-colors">
                <div className="flex items-start gap-4">
                  <div className={`p-2 rounded-lg border ${getSeverityColor(log.severity)}`}>
                    <SeverityIcon className="w-5 h-5" />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4 mb-2">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="text-base font-semibold text-gray-900">{log.action}</h4>
                          <span className={`px-2 py-0.5 rounded text-xs font-medium ${getCategoryColor(log.category)}`}>
                            {log.category.charAt(0).toUpperCase() + log.category.slice(1)}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600">
                          Target: <span className="font-medium text-gray-900">{log.target}</span>
                        </p>
                        <p className="text-sm text-gray-600 mt-1">{log.details}</p>
                      </div>
                      
                      <div className="text-right flex-shrink-0">
                        <p className="text-sm text-gray-900">{log.timestamp}</p>
                        <p className="text-xs text-gray-500 mt-1">{log.ip}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2 mt-3 pt-3 border-t border-gray-100">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                          <User className="w-3 h-3 text-white" />
                        </div>
                        <span className="text-sm text-gray-700">{log.user}</span>
                      </div>
                      <span className="text-gray-300">•</span>
                      <span className="text-sm text-gray-600">{log.role}</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between bg-white rounded-lg border border-gray-200 px-6 py-4">
        <p className="text-sm text-gray-600">
          Showing <span className="font-medium">{filteredLogs.length}</span> of <span className="font-medium">{logs.length}</span> logs
        </p>
        <div className="flex gap-2">
          <button className="px-3 py-1 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm">
            Previous
          </button>
          <button className="px-3 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm">
            1
          </button>
          <button className="px-3 py-1 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm">
            2
          </button>
          <button className="px-3 py-1 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm">
            3
          </button>
          <button className="px-3 py-1 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm">
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
