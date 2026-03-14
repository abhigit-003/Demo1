import { useState, useEffect, useCallback } from "react";
import { Search, Download, Calendar, AlertTriangle, Info, User, Loader2, ChevronLeft, ChevronRight } from "lucide-react";
import { getUserLogs, exportUserLogs } from "../services/adminAPI";
import Toast from "../components/Toast";
import AdminButton from "../components/AdminButton";
import AdminBadge from "../components/AdminBadge";
import FormInput from "../components/FormInput";

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

const MOCK_LOGS: LogEntry[] = [
  { id: '1', timestamp: '2026-03-09 14:32:15', user: 'Sarah Admin', role: 'Senior Admin', action: 'Updated pricing rule', target: 'High Demand Surge', category: 'pricing', severity: 'info', details: 'Changed adjustment from +10% to +15%', ip: '192.168.1.45' },
  { id: '2', timestamp: '2026-03-09 13:15:42', user: 'Mike Operations', role: 'Operations Manager', action: 'Restricted destination', target: 'Rio Carnival', category: 'destination', severity: 'critical', details: 'Reason: Political instability in region', ip: '192.168.1.89' },
  { id: '3', timestamp: '2026-03-09 12:08:30', user: 'Emma Marketing', role: 'Marketing Team', action: 'Created coupon', target: 'SPRING30', category: 'coupon', severity: 'info', details: '30% discount, expires April 15', ip: '192.168.1.102' },
  { id: '4', timestamp: '2026-03-09 11:45:19', user: 'John Moderator', role: 'Moderator', action: 'Hidden product', target: 'Luxury Watch #2341', category: 'product', severity: 'warning', details: 'Reason: Regulation violation - pending review', ip: '192.168.1.67' },
  { id: '5', timestamp: '2026-03-09 10:22:08', user: 'Sarah Admin', role: 'Senior Admin', action: 'Deleted destination', target: 'Bangkok Package', category: 'destination', severity: 'critical', details: 'Vendor contract terminated', ip: '192.168.1.45' },
  { id: '6', timestamp: '2026-03-09 09:15:33', user: 'Alex Support', role: 'Support Team', action: 'Updated product status', target: 'Designer Handbag', category: 'product', severity: 'info', details: 'Changed from active to out-of-stock', ip: '192.168.1.156' },
];

const ITEMS_PER_PAGE = 5;
const categories = ['All Categories', 'Product', 'Destination', 'Pricing', 'Coupon', 'System'];
const severities = ['All Severity', 'Info', 'Warning', 'Critical'];

export default function UserLogs() {
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [totalLogs, setTotalLogs] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [selectedSeverity, setSelectedSeverity] = useState('All Severity');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [isExporting, setIsExporting] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const showToast = (message: string, type: 'success' | 'error') => setToast({ message, type });

  const fetchLogs = useCallback(async (page = 1) => {
    setIsLoading(true); setError(null);
    try {
      const data = await getUserLogs({
        page,
        category: selectedCategory !== 'All Categories' ? selectedCategory.toLowerCase() : undefined,
        severity: selectedSeverity !== 'All Severity' ? selectedSeverity.toLowerCase() : undefined,
        search: searchQuery || undefined,
      });
      const logsData = data?.logs ?? (Array.isArray(data) ? data : null);
      if (logsData) {
        setLogs(logsData);
        setTotalLogs(data.total ?? logsData.length);
      } else {
        throw new Error('Invalid data format');
      }
    } catch {
      const startIndex = (page - 1) * ITEMS_PER_PAGE;
      const paginatedMock = MOCK_LOGS.slice(startIndex, startIndex + ITEMS_PER_PAGE);
      setLogs(paginatedMock);
      setTotalLogs(MOCK_LOGS.length);
      setError('Could not reach backend – showing demo data.');
    } finally { setIsLoading(false); }
  }, [selectedCategory, selectedSeverity, searchQuery]);

  useEffect(() => { setCurrentPage(1); fetchLogs(1); }, [selectedCategory, selectedSeverity, searchQuery, fetchLogs]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    fetchLogs(page);
  };

  const filteredLogs = logs.filter(log => {
    const matchesCat = selectedCategory === 'All Categories' || log.category === selectedCategory.toLowerCase();
    const matchesSev = selectedSeverity === 'All Severity' || log.severity === selectedSeverity.toLowerCase();
    const matchesSearch = log.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.target.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSev && matchesSearch;
  });

  const handleExport = async () => {
    setIsExporting(true);
    try {
      const blob = await exportUserLogs();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `admin-logs-${new Date().toISOString().split('T')[0]}.csv`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      showToast('Logs exported.', 'success');
    } catch {
      showToast('Export requires backend connection.', 'error');
    } finally { setIsExporting(false); }
  };

  const severityIcon = (s: string) => s === 'critical' || s === 'warning' ? AlertTriangle : Info;
  const severityColor = (s: string) => s === 'critical' ? 'bg-red-50 text-red-700 border-red-200' : s === 'warning' ? 'bg-yellow-50 text-yellow-700 border-yellow-200' : 'bg-blue-50 text-blue-700 border-blue-200';
  const categoryColor = (c: string) => ({ product: 'bg-blue-50 text-blue-700', destination: 'bg-purple-50 text-purple-700', pricing: 'bg-green-50 text-green-700', coupon: 'bg-orange-50 text-orange-700', system: 'bg-gray-50 text-gray-700' }[c] ?? 'bg-gray-50 text-gray-700');

  const totalPages = Math.max(1, Math.ceil(totalLogs / ITEMS_PER_PAGE));

  return (
    <div className="space-y-6">
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900">Audit Logs & User Activity</h2>
          <p className="text-gray-600 mt-1">Track all changes and ensure accountability</p>
        </div>
        <AdminButton onClick={handleExport} isLoading={isExporting} icon={<Download className="w-5 h-5" />} variant="primary">
          Export Audit Logs
        </AdminButton>
      </div>

      {error && <div className="bg-yellow-50 border border-yellow-200 rounded-lg px-4 py-3 text-sm text-yellow-800">⚠️ {error}</div>}

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'Total Actions Today', value: filteredLogs.length, color: 'text-gray-900' },
          { label: 'Critical Events', value: filteredLogs.filter(l => l.severity === 'critical').length, color: 'text-red-600' },
          { label: 'Active Users', value: new Set(filteredLogs.map(l => l.user)).size, color: 'text-gray-900' },
          { label: 'Warnings', value: filteredLogs.filter(l => l.severity === 'warning').length, color: 'text-yellow-600' },
        ].map(({ label, value, color }) => (
          <div key={label} className="bg-white rounded-lg border border-gray-200 p-6">
            <p className="text-sm text-gray-600">{label}</p>
            <p className={`text-2xl font-semibold mt-1 ${color}`}>{value}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1">
            <FormInput 
              label="Search Activity"
              value={searchQuery} 
              onChange={v => setSearchQuery(v)} 
              placeholder="Search by user, action, or target..." 
              icon={<Search className="w-5 h-5" />}
            />
          </div>
          <div className="flex gap-2">
            <select value={selectedCategory} onChange={e => setSelectedCategory(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-900">
              {categories.map(c => <option key={c} value={c} className="text-gray-900">{c}</option>)}
            </select>
            <select value={selectedSeverity} onChange={e => setSelectedSeverity(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-900">
              {severities.map(s => <option key={s} value={s} className="text-gray-900">{s}</option>)}
            </select>
          </div>
        </div>
      </div>

      {/* Timeline */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">Activity Timeline</h3>
          <AdminButton variant="ghost" size="sm" onClick={() => fetchLogs(currentPage)}>Refresh</AdminButton>
        </div>
        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-blue-500" /><span className="ml-3 text-gray-500">Loading logs...</span>
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {filteredLogs.length === 0 ? (
              <div className="py-12 text-center text-gray-500">No logs match your filters.</div>
            ) : filteredLogs.map(log => {
              const SeverityIcon = severityIcon(log.severity);
              return (
                <div key={log.id} className="p-6 hover:bg-gray-50 transition-colors">
                  <div className="flex items-start gap-4">
                    <div className={`p-2 rounded-lg border ${severityColor(log.severity)}`}><SeverityIcon className="w-5 h-5" /></div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-4 mb-2">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="text-base font-semibold text-gray-900">{log.action}</h4>
                            <AdminBadge variant={log.category === 'pricing' ? 'green' : log.category === 'destination' ? 'blue' : log.category === 'coupon' ? 'orange' : 'gray'}>
                              {log.category.charAt(0).toUpperCase() + log.category.slice(1)}
                            </AdminBadge>
                          </div>
                          <p className="text-sm text-gray-600">Target: <span className="font-medium text-gray-900">{log.target}</span></p>
                          <p className="text-sm text-gray-600 mt-1">{log.details}</p>
                        </div>
                        <div className="text-right flex-shrink-0">
                          <p className="text-sm text-gray-900">{log.timestamp}</p>
                          <p className="text-xs text-gray-500 mt-1">{log.ip}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 mt-3 pt-3 border-t border-gray-100">
                        <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                          <User className="w-3 h-3 text-white" />
                        </div>
                        <span className="text-sm text-gray-700">{log.user}</span>
                        <span className="text-gray-300">•</span>
                        <span className="text-sm text-gray-600">{log.role}</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between bg-white rounded-lg border border-gray-200 px-6 py-4">
        <p className="text-sm text-gray-600">Showing <span className="font-medium">{filteredLogs.length}</span> of <span className="font-medium">{totalLogs}</span> logs</p>
        <div className="flex gap-2">
          <AdminButton variant="secondary" size="sm" onClick={() => handlePageChange(Math.max(1, currentPage - 1))} disabled={currentPage === 1} icon={<ChevronLeft className="w-4 h-4" />}>
            Previous
          </AdminButton>
          <div className="flex gap-1">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
              <AdminButton key={page} size="sm" variant={currentPage === page ? 'primary' : 'ghost'} onClick={() => handlePageChange(page)} className="w-9">
                {page}
              </AdminButton>
            ))}
          </div>
          <AdminButton variant="secondary" size="sm" onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))} disabled={currentPage >= totalPages} iconRight={<ChevronRight className="w-4 h-4" />}>
            Next
          </AdminButton>
        </div>
      </div>
    </div>
  );
}
