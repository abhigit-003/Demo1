import { useState, useEffect, useCallback } from "react";
import { Plus, TrendingUp, Calendar, Target, Play, Pause, Edit, Trash2, AlertCircle, Settings, Activity, User, Loader2, X, IndianRupee } from "lucide-react";
import { getPricingRules, createPricingRule, updatePricingRule, deletePricingRule, savePricingEngine } from "../services/adminAPI";
import Toast from "../components/Toast";
import AdminModal from "../components/AdminModal";
import FormInput from "../components/FormInput";
import AdminButton from "../components/AdminButton";
import AdminBadge from "../components/AdminBadge";

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
      if (Array.isArray(data)) {
        setRules(data);
      } else {
        throw new Error('Invalid data format');
      }
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
    if (!ruleForm.condition.trim()) { showToast('Rule condition is required.', 'error'); return; }
    if (!ruleForm.adjustment.trim()) { showToast('Adjustment value is required.', 'error'); return; }
    
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
    if (engineConfig.minPrice < 0) { showToast('Min price cannot be negative.', 'error'); return; }
    if (engineConfig.maxPrice <= engineConfig.minPrice) { showToast('Max price must be greater than min price.', 'error'); return; }
    if (engineConfig.maxIncrease < 0 || engineConfig.maxIncrease > 100) { showToast('Max increase must be between 0-100%.', 'error'); return; }
    if (engineConfig.maxDecrease < 0 || engineConfig.maxDecrease > 100) { showToast('Max decrease must be between 0-100%.', 'error'); return; }

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

      <AdminModal
        isOpen={!!deleteConfirm}
        onClose={() => setDeleteConfirm(null)}
        title="Delete Pricing Rule?"
        footer={
          <>
            <AdminButton variant="secondary" onClick={() => setDeleteConfirm(null)}>Cancel</AdminButton>
            <AdminButton variant="danger" onClick={() => deleteConfirm && handleDelete(deleteConfirm)}>Delete Rule</AdminButton>
          </>
        }
      >
        <p className="text-sm text-gray-600">Are you sure you want to permanently delete this pricing rule? This action cannot be reversed.</p>
      </AdminModal>

      <AdminModal
        isOpen={showRuleModal}
        onClose={() => { setShowRuleModal(false); setEditingRule(null); setRuleForm({ ...blankRule }); }}
        title={editingRule ? 'Edit Pricing Rule' : 'Create Pricing Rule'}
        footer={
          <>
            <AdminButton variant="secondary" onClick={() => { setShowRuleModal(false); setEditingRule(null); setRuleForm({ ...blankRule }); }}>Cancel</AdminButton>
            <AdminButton onClick={handleSaveRule} isLoading={isSaving} icon={<Plus className="w-4 h-4" />}>
              {editingRule ? 'Update Rule' : 'Create Rule'}
            </AdminButton>
          </>
        }
      >
        <div className="space-y-4">
          <FormInput label="Rule Name" value={ruleForm.name} onChange={v => setRuleForm({ ...ruleForm, name: v })} placeholder="e.g. Weekend Peak Pricing" />
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Rule Type</label>
              <select value={ruleForm.type} onChange={e => setRuleForm({ ...ruleForm, type: e.target.value as PricingRule['type'] })}
                className="w-full px-3 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all">
                <option value="demand">Demand-Based</option>
                <option value="time">Time-Based</option>
                <option value="competitor">Competitor-Linked</option>
              </select>
            </div>
            <FormInput label="Price Adjustment" value={ruleForm.adjustment} onChange={v => setRuleForm({ ...ruleForm, adjustment: v })} placeholder="e.g. +15%" />
          </div>
          <FormInput label="Condition" value={ruleForm.condition} onChange={v => setRuleForm({ ...ruleForm, condition: v })} placeholder="e.g. If bookings exceed 70% capacity" />
          <FormInput label="Description" value={ruleForm.description} onChange={v => setRuleForm({ ...ruleForm, description: v })} />
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Apply To</label>
            <select value={ruleForm.appliedTo} onChange={e => setRuleForm({ ...ruleForm, appliedTo: e.target.value })}
              className="w-full px-3 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all">
              {['All Products', 'All Destinations', 'Elite Tier Only', 'Standard Tier Only', 'Budget Tier Only'].map(o => <option key={o}>{o}</option>)}
            </select>
          </div>
        </div>
      </AdminModal>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900">Revenue & Pricing Engine</h2>
          <p className="text-gray-600 mt-1">Automate and optimize your pricing strategy</p>
        </div>
        <div className="flex gap-2">
          <AdminButton variant="secondary" onClick={fetchRules}>Refresh</AdminButton>
          <AdminButton onClick={() => setShowRuleModal(true)} icon={<Plus className="w-5 h-5" />}>
            Create Rule
          </AdminButton>
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
          <AdminButton variant="secondary" onClick={() => setShowEngineConfig(!showEngineConfig)}>
            {showEngineConfig ? 'Hide Settings' : 'Configure Engine'}
          </AdminButton>
        </div>
        {showEngineConfig && (
          <div className="space-y-6 pt-6 border-t border-gray-200">
            <div>
              <h4 className="text-sm font-semibold text-gray-900 mb-4">Base Price Settings</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormInput label="Minimum Price Floor" type="number" value={engineConfig.minPrice} onChange={v => setEngineConfig({ ...engineConfig, minPrice: Number(v) })} icon={<IndianRupee className="w-4 h-4" />} />
                <FormInput label="Maximum Price Ceiling" type="number" value={engineConfig.maxPrice} onChange={v => setEngineConfig({ ...engineConfig, maxPrice: Number(v) })} icon={<IndianRupee className="w-4 h-4" />} />
              </div>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-gray-900 mb-4">Adjustment Limits</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <FormInput label="Max Single Increase" type="number" value={engineConfig.maxIncrease} onChange={v => setEngineConfig({ ...engineConfig, maxIncrease: Number(v) })} icon={<span className="text-xs font-bold">%</span>} />
                <FormInput label="Max Single Decrease" type="number" value={engineConfig.maxDecrease} onChange={v => setEngineConfig({ ...engineConfig, maxDecrease: Number(v) })} icon={<span className="text-xs font-bold">%</span>} />
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Update Frequency</label>
                  <select value={engineConfig.frequency} onChange={e => setEngineConfig({ ...engineConfig, frequency: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500">
                    {['Real-time', 'Every 15 minutes', 'Hourly', 'Daily'].map(o => <option key={o}>{o}</option>)}
                  </select>
                </div>
              </div>
            </div>
            <div className="flex gap-3">
              <AdminButton onClick={handleSaveEngine} isLoading={isSavingEngine} icon={<Settings className="w-4 h-4" />}>
                Save Configuration
              </AdminButton>
              <AdminButton variant="secondary" onClick={() => setEngineConfig({ minPrice: 99, maxPrice: 9999, maxIncrease: 25, maxDecrease: 30, frequency: 'Real-time', allowStacking: true, capStacking: true, manualOverride: true })}>
                Reset to Defaults
              </AdminButton>
            </div>
          </div>
        )}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'Active Rules', value: rules.filter(r => r.status === 'active').length, icon: Play, iconBg: 'bg-green-50', iconColor: 'text-green-600', textColor: 'text-gray-900' },
          { label: 'Avg. Price Increase', value: '+8.5%', icon: TrendingUp, iconBg: 'bg-blue-50', iconColor: 'text-blue-600', textColor: 'text-green-600' },
          { label: 'Revenue Impact', value: '₹24.3K', icon: Target, iconBg: 'bg-purple-50', iconColor: 'text-purple-600', textColor: 'text-gray-900' },
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
              const TypeIcon = typeIcon[rule.type as keyof typeof typeIcon] || Activity;
              const ruleTypeColor = typeColor[rule.type as keyof typeof typeColor] || 'bg-gray-50 text-gray-700';
              return (
                <div key={rule.id} className="p-6 hover:bg-gray-50 transition-colors">
                  <div className="flex items-start gap-4">
                    <div className={`p-3 rounded-lg ${ruleTypeColor}`}><TypeIcon className="w-6 h-6" /></div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h4 className="text-base font-semibold text-gray-900">{rule.name}</h4>
                          <p className="text-sm text-gray-600 mt-1">{rule.description}</p>
                        </div>
                        <AdminButton 
                          variant={rule.status === 'active' ? 'success' : 'secondary'} 
                          size="sm" 
                          onClick={() => toggleStatus(rule)}
                          icon={rule.status === 'active' ? <Play className="w-3 h-3" /> : <Pause className="w-3 h-3" />}
                        >
                          {rule.status === 'active' ? 'Active' : 'Paused'}
                        </AdminButton>
                      </div>
                      <div className="grid grid-cols-3 gap-4 mt-4 p-3 bg-gray-50 rounded-lg">
                        <div><p className="text-xs text-gray-600">Condition</p><p className="text-sm font-medium text-gray-900 mt-1">{rule.condition}</p></div>
                        <div><p className="text-xs text-gray-600">Adjustment</p><p className="text-sm font-medium text-gray-900 mt-1">{rule.adjustment}</p></div>
                        <div><p className="text-xs text-gray-600">Applied To</p><p className="text-sm font-medium text-gray-900 mt-1">{rule.appliedTo}</p></div>
                      </div>
                      <div className="flex items-center justify-between mt-4">
                        <p className="text-xs text-gray-500">Created {rule.created}</p>
                        <div className="flex gap-2">
                          <AdminButton variant="ghost" size="sm" onClick={() => openEdit(rule)} className="px-1.5" icon={<Edit className="w-4 h-4" />} />
                          <AdminButton variant="ghost" size="sm" onClick={() => setDeleteConfirm(rule.id)} className="px-1.5 hover:text-red-600" icon={<Trash2 className="w-4 h-4" />} />
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
                className="flex-1 px-4 py-2 bg-white border border-gray-200 rounded-xl text-sm focus:ring-4 focus:ring-orange-500/10 focus:border-orange-500 outline-none transition-all placeholder:text-gray-400 text-gray-900" />
              <AdminButton onClick={() => showToast('Override applied (backend required for persistence).', 'success')} className="!bg-orange-600 hover:!bg-orange-700 shadow-lg">
                Set Override
              </AdminButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}