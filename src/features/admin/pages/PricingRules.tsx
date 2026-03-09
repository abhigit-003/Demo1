import { useState, useEffect, useCallback } from "react";
import { Plus, TrendingUp, Calendar, Target, Play, Pause, Edit, Trash2, AlertCircle, Settings, Activity, User, Loader2, X } from "lucide-react";
import { getPricingRules, createPricingRule, updatePricingRule, deletePricingRule, savePricingEngine } from "../services/adminAPI";
import Toast from "../components/Toast";

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

const MOCK_RULES: PricingRule[] = [
  { id: '1', name: 'High Demand Surge', type: 'demand', description: 'Increase price when capacity exceeds 80%', adjustment: '+15%', condition: 'Bookings > 80% capacity', status: 'active', appliedTo: 'All Destinations', created: '2 weeks ago' },
  { id: '2', name: 'Early Bird Discount', type: 'time', description: 'Discount for bookings made 60+ days in advance', adjustment: '-10%', condition: 'Booking date > 60 days before travel', status: 'active', appliedTo: 'Elite Destinations', created: '1 month ago' },
  { id: '3', name: 'Competitor Price Match', type: 'competitor', description: 'Match lowest market price within 5% margin', adjustment: 'Match ±5%', condition: 'Competitor price detected', status: 'paused', appliedTo: 'Standard Tier', created: '3 weeks ago' },
  { id: '4', name: 'Last Minute Deal', type: 'time', description: 'Reduce price for bookings within 7 days', adjustment: '-20%', condition: 'Booking date < 7 days before travel', status: 'active', appliedTo: 'Budget Destinations', created: '1 week ago' },
];

const blankRule = { name: '', type: 'demand' as PricingRule['type'], description: '', adjustment: '+10%', condition: '', appliedTo: 'All Products' };

export default function PricingRules() {
  const [rules, setRules] = useState<PricingRule[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showRuleModal, setShowRuleModal] = useState(false);
  const [editingRule, setEditingRule] = useState<PricingRule | null>(null);
  const [ruleForm, setRuleForm] = useState({ ...blankRule });
  const [isSaving, setIsSaving] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [showEngineConfig, setShowEngineConfig] = useState(false);
  const [engineConfig, setEngineConfig] = useState({ minPrice: 99, maxPrice: 9999, maxIncrease: 25, maxDecrease: 30, frequency: 'Real-time', allowStacking: true, capStacking: true, manualOverride: true });
  const [isSavingEngine, setIsSavingEngine] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const showToast = (message: string, type: 'success' | 'error') => setToast({ message, type });

  const fetchRules = useCallback(async () => {
    setIsLoading(true); setError(null);
    try {
      const data = await getPricingRules();
      setRules(data);
    } catch {
      setRules(MOCK_RULES);
      setError('Could not reach backend – showing demo data.');
    } finally { setIsLoading(false); }
  }, []);

  useEffect(() => { fetchRules(); }, [fetchRules]);

  const toggleStatus = async (rule: PricingRule) => {
    const newStatus = rule.status === 'active' ? 'paused' : 'active';
    setRules(prev => prev.map(r => r.id === rule.id ? { ...r, status: newStatus } : r));
    try {
      await updatePricingRule(rule.id, { status: newStatus });
      showToast(`Rule ${newStatus}.`, 'success');
    } catch {
      showToast(`Rule ${newStatus} (offline mode).`, 'success');
    }
  };

  const openEdit = (rule: PricingRule) => {
    setEditingRule(rule);
    setRuleForm({ name: rule.name, type: rule.type, description: rule.description, adjustment: rule.adjustment, condition: rule.condition, appliedTo: rule.appliedTo });
    setShowRuleModal(true);
  };

  const handleSaveRule = async () => {
    if (!ruleForm.name.trim()) { showToast('Rule name is required.', 'error'); return; }
    setIsSaving(true);
    try {
      if (editingRule) {
        await updatePricingRule(editingRule.id, ruleForm);
        setRules(prev => prev.map(r => r.id === editingRule.id ? { ...r, ...ruleForm } : r));
        showToast('Rule updated.', 'success');
      } else {
        const created = await createPricingRule(ruleForm);
        const newRule: PricingRule = { ...ruleForm, id: created?.id || String(Date.now()), status: 'active', created: 'Just now' };
        setRules(prev => [...prev, newRule]);
        showToast('Rule created.', 'success');
      }
    } catch {
      if (editingRule) {
        setRules(prev => prev.map(r => r.id === editingRule.id ? { ...r, ...ruleForm } : r));
      } else {
        setRules(prev => [...prev, { ...ruleForm, id: String(Date.now()), status: 'active', created: 'Just now' }]);
      }
      showToast('Rule saved (offline mode).', 'success');
    } finally {
      setIsSaving(false);
      setShowRuleModal(false);
      setEditingRule(null);
      setRuleForm({ ...blankRule });
    }
  };

  const handleDelete = async (id: string) => {
    setDeleteConfirm(null);
    try { await deletePricingRule(id); } catch { /* offline */ }
    setRules(prev => prev.filter(r => r.id !== id));
    showToast('Rule deleted.', 'success');
  };

  const handleSaveEngine = async () => {
    setIsSavingEngine(true);
    try {
      await savePricingEngine(engineConfig);
      showToast('Engine configuration saved.', 'success');
    } catch {
      showToast('Configuration saved (offline mode).', 'success');
    } finally {
      setIsSavingEngine(false);
    }
  };

  const typeIcon = { demand: TrendingUp, time: Calendar, competitor: Target };
  const typeColor = { demand: 'bg-purple-50 text-purple-700', time: 'bg-blue-50 text-blue-700', competitor: 'bg-orange-50 text-orange-700' };

  return (
    <div className="space-y-6">
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

      {deleteConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-sm w-full mx-4 shadow-xl">
            <h3 className="text-lg font-semibold mb-2">Delete Rule?</h3>
            <p className="text-sm text-gray-600 mb-6">This cannot be undone.</p>
            <div className="flex gap-3 justify-end">
              <button onClick={() => setDeleteConfirm(null)} className="px-4 py-2 border rounded-lg text-sm">Cancel</button>
              <button onClick={() => handleDelete(deleteConfirm)} className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm">Delete</button>
            </div>
          </div>
        </div>
      )}

      {/* Rule Modal */}
      {showRuleModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-lg w-full mx-4 shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">{editingRule ? 'Edit Rule' : 'Create Rule'}</h3>
              <button onClick={() => { setShowRuleModal(false); setEditingRule(null); setRuleForm({ ...blankRule }); }}><X className="w-5 h-5 text-gray-400" /></button>
            </div>
            <div className="space-y-4">
              {[
                { label: 'Rule Name', field: 'name', placeholder: 'e.g., Weekend Peak Pricing' },
                { label: 'Condition', field: 'condition', placeholder: 'e.g., If bookings exceed 70% capacity' },
                { label: 'Price Adjustment', field: 'adjustment', placeholder: 'e.g., +15%' },
                { label: 'Description', field: 'description', placeholder: 'Describe the rule...' },
              ].map(({ label, field, placeholder }) => (
                <div key={field}>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
                  <input type="text" value={(ruleForm as any)[field]} placeholder={placeholder}
                    onChange={e => setRuleForm({ ...ruleForm, [field]: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
              ))}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Rule Type</label>
                <select value={ruleForm.type} onChange={e => setRuleForm({ ...ruleForm, type: e.target.value as PricingRule['type'] })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option value="demand">Demand-Based</option>
                  <option value="time">Time-Based</option>
                  <option value="competitor">Competitor-Linked</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Apply To</label>
                <select value={ruleForm.appliedTo} onChange={e => setRuleForm({ ...ruleForm, appliedTo: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                  {['All Products', 'All Destinations', 'Elite Tier Only', 'Standard Tier Only', 'Budget Tier Only'].map(o => <option key={o}>{o}</option>)}
                </select>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={handleSaveRule} disabled={isSaving}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center justify-center gap-2 disabled:opacity-60">
                {isSaving && <Loader2 className="w-4 h-4 animate-spin" />} {editingRule ? 'Update Rule' : 'Create Rule'}
              </button>
              <button onClick={() => { setShowRuleModal(false); setEditingRule(null); setRuleForm({ ...blankRule }); }} className="px-4 py-2 border rounded-lg hover:bg-gray-50">Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900">Revenue & Pricing Engine</h2>
          <p className="text-gray-600 mt-1">Automate and optimize your pricing strategy</p>
        </div>
        <div className="flex gap-2">
          <button onClick={fetchRules} className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm">Refresh</button>
          <button onClick={() => setShowRuleModal(true)} className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            <Plus className="w-5 h-5" /> Create Rule
          </button>
        </div>
      </div>

      {error && <div className="bg-yellow-50 border border-yellow-200 rounded-lg px-4 py-3 text-sm text-yellow-800">⚠️ {error}</div>}

      {/* Engine Config */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-blue-50 rounded-lg"><Settings className="w-6 h-6 text-blue-600" /></div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Price Engine Configuration</h3>
              <p className="text-sm text-gray-600 mt-1">Core pricing algorithm settings</p>
            </div>
          </div>
          <button onClick={() => setShowEngineConfig(!showEngineConfig)} className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
            {showEngineConfig ? 'Hide' : 'Configure'}
          </button>
        </div>
        {showEngineConfig && (
          <div className="space-y-6 pt-6 border-t border-gray-200">
            <div>
              <h4 className="text-sm font-semibold text-gray-900 mb-4">Base Price Settings</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[{ label: 'Minimum Price Floor', field: 'minPrice' }, { label: 'Maximum Price Ceiling', field: 'maxPrice' }].map(({ label, field }) => (
                  <div key={field}>
                    <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                      <input type="number" value={(engineConfig as any)[field]} onChange={e => setEngineConfig({ ...engineConfig, [field]: Number(e.target.value) })}
                        className="w-full pl-7 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-gray-900 mb-4">Adjustment Limits</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[{ label: 'Max Single Increase', field: 'maxIncrease' }, { label: 'Max Single Decrease', field: 'maxDecrease' }].map(({ label, field }) => (
                  <div key={field}>
                    <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
                    <div className="relative">
                      <input type="number" value={(engineConfig as any)[field]} onChange={e => setEngineConfig({ ...engineConfig, [field]: Number(e.target.value) })}
                        className="w-full pr-8 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">%</span>
                    </div>
                  </div>
                ))}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Update Frequency</label>
                  <select value={engineConfig.frequency} onChange={e => setEngineConfig({ ...engineConfig, frequency: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                    {['Real-time', 'Every 15 minutes', 'Hourly', 'Daily'].map(o => <option key={o}>{o}</option>)}
                  </select>
                </div>
              </div>
            </div>
            <div className="flex gap-3">
              <button onClick={handleSaveEngine} disabled={isSavingEngine}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2 disabled:opacity-60">
                {isSavingEngine && <Loader2 className="w-4 h-4 animate-spin" />} Save Configuration
              </button>
              <button onClick={() => setEngineConfig({ minPrice: 99, maxPrice: 9999, maxIncrease: 25, maxDecrease: 30, frequency: 'Real-time', allowStacking: true, capStacking: true, manualOverride: true })}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">Reset to Defaults</button>
            </div>
          </div>
        )}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'Active Rules', value: rules.filter(r => r.status === 'active').length, icon: Play, iconBg: 'bg-green-50', iconColor: 'text-green-600', textColor: 'text-gray-900' },
          { label: 'Avg. Price Increase', value: '+8.5%', icon: TrendingUp, iconBg: 'bg-blue-50', iconColor: 'text-blue-600', textColor: 'text-green-600' },
          { label: 'Revenue Impact', value: '$24.3K', icon: Target, iconBg: 'bg-purple-50', iconColor: 'text-purple-600', textColor: 'text-gray-900' },
          { label: 'This Month', value: '142', icon: Calendar, iconBg: 'bg-orange-50', iconColor: 'text-orange-600', textColor: 'text-gray-900' },
        ].map(({ label, value, icon: Icon, iconBg, iconColor, textColor }) => (
          <div key={label} className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div><p className="text-sm text-gray-600">{label}</p><p className={`text-2xl font-semibold mt-1 ${textColor}`}>{value}</p></div>
              <div className={`p-3 ${iconBg} rounded-lg`}><Icon className={`w-6 h-6 ${iconColor}`} /></div>
            </div>
          </div>
        ))}
      </div>

      {/* Rules List */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Dynamic Pricing Rules</h3>
        </div>
        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-blue-500" /><span className="ml-3 text-gray-500">Loading rules...</span>
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {rules.map(rule => {
              const TypeIcon = typeIcon[rule.type];
              return (
                <div key={rule.id} className="p-6 hover:bg-gray-50 transition-colors">
                  <div className="flex items-start gap-4">
                    <div className={`p-3 rounded-lg ${typeColor[rule.type]}`}><TypeIcon className="w-6 h-6" /></div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h4 className="text-base font-semibold text-gray-900">{rule.name}</h4>
                          <p className="text-sm text-gray-600 mt-1">{rule.description}</p>
                        </div>
                        <button onClick={() => toggleStatus(rule)}
                          className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors ${rule.status === 'active' ? 'bg-green-50 text-green-700 hover:bg-green-100' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
                          {rule.status === 'active' ? <span className="flex items-center gap-1"><Play className="w-3 h-3" /> Active</span> : <span className="flex items-center gap-1"><Pause className="w-3 h-3" /> Paused</span>}
                        </button>
                      </div>
                      <div className="grid grid-cols-3 gap-4 mt-4 p-3 bg-gray-50 rounded-lg">
                        <div><p className="text-xs text-gray-600">Condition</p><p className="text-sm font-medium text-gray-900 mt-1">{rule.condition}</p></div>
                        <div><p className="text-xs text-gray-600">Adjustment</p><p className="text-sm font-medium text-gray-900 mt-1">{rule.adjustment}</p></div>
                        <div><p className="text-xs text-gray-600">Applied To</p><p className="text-sm font-medium text-gray-900 mt-1">{rule.appliedTo}</p></div>
                      </div>
                      <div className="flex items-center justify-between mt-4">
                        <p className="text-xs text-gray-500">Created {rule.created}</p>
                        <div className="flex gap-2">
                          <button onClick={() => openEdit(rule)} className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded"><Edit className="w-4 h-4" /></button>
                          <button onClick={() => setDeleteConfirm(rule.id)} className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded"><Trash2 className="w-4 h-4" /></button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Manual Override */}
      <div className="bg-gradient-to-r from-orange-50 to-red-50 border border-orange-200 rounded-lg p-6">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-white rounded-lg"><AlertCircle className="w-6 h-6 text-orange-600" /></div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900">Manual Price Override</h3>
            <p className="text-sm text-gray-600 mt-1">Temporarily override automated pricing for specific products or destinations</p>
            <div className="flex gap-3 mt-4">
              <input type="text" placeholder="Search product or destination..."
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white" />
              <button onClick={() => showToast('Override applied (backend required for persistence).', 'success')}
                className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700">Set Override</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}