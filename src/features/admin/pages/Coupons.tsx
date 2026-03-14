import { useState, useEffect, useCallback } from "react";
import { Plus, Tag, Calendar, Users, Zap, Copy, Edit, Trash2, Loader2, X, IndianRupee } from "lucide-react";
import { getCoupons, createCoupon, updateCoupon, deleteCoupon, launchFlashSale } from "../services/adminAPI";
import Toast from "../components/Toast";
import AdminModal from "../components/AdminModal";
import FormInput from "../components/FormInput";
import AdminButton from "../components/AdminButton";
import AdminBadge from "../components/AdminBadge";

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

const MOCK_COUPONS: Coupon[] = [
  { id: '1', code: 'SAVE20', type: 'percentage', discount: '20%', description: 'Spring Sale - 20% off all destinations', usage: { current: 234, limit: 1000 }, expires: 'March 31, 2026', status: 'active', stackable: false, appliedTo: 'All Destinations' },
  { id: '2', code: 'FIRST50', type: 'fixed', discount: '₹50', description: 'First-time customer discount', usage: { current: 89, limit: 500 }, expires: 'December 31, 2026', status: 'active', stackable: true, appliedTo: 'All Products' },
  { id: '3', code: 'ELITE100', type: 'fixed', discount: '₹100', description: 'Elite tier exclusive offer', usage: { current: 45, limit: 100 }, expires: 'April 15, 2026', status: 'active', stackable: false, appliedTo: 'Elite Tier' },
  { id: '4', code: 'SUMMER25', type: 'percentage', discount: '25%', description: 'Summer promotion - starts June 1', usage: { current: 0, limit: 2000 }, expires: 'August 31, 2026', status: 'scheduled', stackable: true, appliedTo: 'All Products' },
];

const blankForm = { code: '', type: 'percentage' as Coupon['type'], discountValue: '', description: '', usageLimit: '', expires: '', stackable: false, appliedTo: 'All Products' };

export default function Coupons() {
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [editingCoupon, setEditingCoupon] = useState<Coupon | null>(null);
  const [formData, setFormData] = useState({ ...blankForm });
  const [isSaving, setIsSaving] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const [showFlashSale, setShowFlashSale] = useState(false);
  const [flashData, setFlashData] = useState({ discount: '', duration: 4, applyTo: 'All Products & Destinations' });
  const [isLaunching, setIsLaunching] = useState(false);

  const showToast = (message: string, type: 'success' | 'error') => setToast({ message, type });

  const fetchCoupons = useCallback(async () => {
    setIsLoading(true); setError(null);
    try {
      const data = await getCoupons();
      if (Array.isArray(data)) {
        setCoupons(data);
      } else {
        throw new Error('Invalid data format');
      }
    } catch {
      setCoupons(MOCK_COUPONS);
      setError('Could not reach backend – showing demo data.');
    } finally { setIsLoading(false); }
  }, []);

  useEffect(() => { fetchCoupons(); }, [fetchCoupons]);

  const resetForm = () => setFormData({ ...blankForm });

  const openEdit = (coupon: Coupon) => {
    setEditingCoupon(coupon);
    setFormData({ code: coupon.code, type: coupon.type, discountValue: coupon.discount.replace(/[%$₹]/g, ''), description: coupon.description, usageLimit: String(coupon.usage.limit), expires: coupon.expires, stackable: coupon.stackable, appliedTo: coupon.appliedTo });
    setShowModal(true);
  };

  const buildCouponFromForm = (id?: string): Coupon => ({
    id: id || String(Date.now()),
    code: formData.code.toUpperCase(),
    type: formData.type,
    discount: formData.type === 'percentage' ? `${formData.discountValue}%` : `₹${formData.discountValue}`,
    description: formData.description,
    usage: { current: editingCoupon ? editingCoupon.usage.current : 0, limit: Number(formData.usageLimit) },
    expires: formData.expires,
    status: 'active',
    stackable: formData.stackable,
    appliedTo: formData.appliedTo,
  });

  const handleSave = async () => {
    if (!formData.code.trim()) { showToast('Coupon code is required.', 'error'); return; }
    
    const val = Number(formData.discountValue);
    if (!formData.discountValue || isNaN(val) || val <= 0) { 
      showToast('Valid positive discount value is required.', 'error'); return; 
    }
    if (formData.type === 'percentage' && val > 100) {
      showToast('Percentage discount cannot exceed 100%.', 'error'); return;
    }

    const limit = Number(formData.usageLimit);
    if (!formData.usageLimit || isNaN(limit) || limit <= 0) {
      showToast('Usage limit must be a positive number.', 'error'); return;
    }

    if (!formData.expires) {
      showToast('Expiration date is required.', 'error'); return;
    }
    const expDate = new Date(formData.expires);
    if (expDate < new Date()) {
      showToast('Expiration date must be in the future.', 'error'); return;
    }

    setIsSaving(true);
    try {
      if (editingCoupon) {
        await updateCoupon(editingCoupon.id, formData);
        setCoupons(prev => prev.map(c => c.id === editingCoupon.id ? buildCouponFromForm(editingCoupon.id) : c));
        showToast('Coupon updated.', 'success');
      } else {
        const created = await createCoupon(formData);
        setCoupons(prev => [buildCouponFromForm(created?.id), ...prev]);
        showToast('Coupon created.', 'success');
      }
    } catch {
      if (editingCoupon) {
        setCoupons(prev => prev.map(c => c.id === editingCoupon.id ? buildCouponFromForm(editingCoupon.id) : c));
      } else {
        setCoupons(prev => [buildCouponFromForm(), ...prev]);
      }
      showToast(editingCoupon ? 'Coupon updated (offline mode).' : 'Coupon saved (offline mode).', 'success');
    } finally {
      resetForm(); setShowModal(false); setEditingCoupon(null); setIsSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    setDeleteConfirm(null);
    try { await deleteCoupon(id); } catch { /* offline */ }
    setCoupons(prev => prev.filter(c => c.id !== id));
    showToast('Coupon deleted.', 'success');
  };

  const copyCode = (code: string) => {
    navigator.clipboard.writeText(code).then(() => showToast(`Copied: ${code}`, 'success')).catch(() => showToast('Could not copy.', 'error'));
  };

  const handleLaunchFlashSale = async () => {
    if (!flashData.discount) { showToast('Enter a discount amount.', 'error'); return; }
    setIsLaunching(true);
    try {
      await launchFlashSale({ discount: flashData.discount, duration: flashData.duration, applyTo: flashData.applyTo });
      showToast('Flash sale launched!', 'success');
    } catch {
      showToast('Flash sale configured (offline mode).', 'success');
    } finally {
      setShowFlashSale(false); setIsLaunching(false);
    }
  };

  const statusColor = (s: string) => s === 'active' ? 'bg-green-50 text-green-700' : s === 'scheduled' ? 'bg-blue-50 text-blue-700' : 'bg-gray-50 text-gray-700';

  return (
    <div className="space-y-6">
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

      <AdminModal
        isOpen={!!deleteConfirm}
        onClose={() => setDeleteConfirm(null)}
        title="Delete Coupon?"
        footer={
          <>
            <AdminButton variant="secondary" onClick={() => setDeleteConfirm(null)}>Cancel</AdminButton>
            <AdminButton variant="danger" onClick={() => deleteConfirm && handleDelete(deleteConfirm)}>Delete</AdminButton>
          </>
        }
      >
        <p className="text-sm text-gray-600">This action cannot be undone. Are you sure you want to delete this coupon?</p>
      </AdminModal>

      <AdminModal
        isOpen={showModal}
        onClose={() => { resetForm(); setShowModal(false); setEditingCoupon(null); }}
        title={editingCoupon ? 'Edit Coupon' : 'Create New Coupon'}
        footer={
          <>
            <AdminButton variant="secondary" onClick={() => { resetForm(); setShowModal(false); setEditingCoupon(null); }}>Cancel</AdminButton>
            <AdminButton onClick={handleSave} isLoading={isSaving} icon={<Plus className="w-4 h-4" />}>
              {editingCoupon ? 'Update Coupon' : 'Create Coupon'}
            </AdminButton>
          </>
        }
      >
        <div className="space-y-4">
          <FormInput label="Coupon Code" value={formData.code} onChange={e => setFormData({ ...formData, code: e.toUpperCase() })} placeholder="e.g. SAVE20" />
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Discount Type</label>
              <select value={formData.type} onChange={e => setFormData({ ...formData, type: e.target.value as Coupon['type'] })}
                className="w-full px-3 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all">
                <option value="percentage">Percentage</option>
                <option value="fixed">Fixed Amount</option>
              </select>
            </div>
            <FormInput label="Discount Value" type="number" value={formData.discountValue} onChange={v => setFormData({ ...formData, discountValue: v })} 
              icon={formData.type === 'fixed' ? <IndianRupee className="w-4 h-4" /> : <span className="text-xs font-bold">%</span>} />
          </div>
          <FormInput label="Description" value={formData.description} onChange={v => setFormData({ ...formData, description: v })} />
          <div className="grid grid-cols-2 gap-4">
            <FormInput label="Usage Limit" type="number" value={formData.usageLimit} onChange={v => setFormData({ ...formData, usageLimit: v })} />
            <FormInput label="Expiration Date" type="date" value={formData.expires} onChange={v => setFormData({ ...formData, expires: v })} />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Apply To</label>
            <select value={formData.appliedTo} onChange={e => setFormData({ ...formData, appliedTo: e.target.value })}
              className="w-full px-3 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all">
              {['All Products', 'All Destinations', 'All Services', 'Elite Tier', 'Standard Tier', 'Budget Tier'].map(o => <option key={o}>{o}</option>)}
            </select>
          </div>
          <div className="flex items-center gap-3 p-3 bg-blue-50/50 rounded-xl border border-blue-100">
            <input type="checkbox" checked={formData.stackable} onChange={e => setFormData({ ...formData, stackable: e.target.checked })} className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500" />
            <label className="text-sm font-medium text-blue-900">Stackable with pricing rules</label>
          </div>
        </div>
      </AdminModal>

      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900">Coupon & Offer Management</h2>
          <p className="text-gray-600 mt-1">Create and manage promotional codes and special offers</p>
        </div>
        <div className="flex gap-2">
          <AdminButton variant="secondary" onClick={fetchCoupons}>Refresh</AdminButton>
          <AdminButton onClick={() => { resetForm(); setShowModal(true); setEditingCoupon(null); }} icon={<Plus className="w-5 h-5" />}>
            Create Coupon
          </AdminButton>
        </div>
      </div>

      {error && <div className="bg-yellow-50 border border-yellow-200 rounded-lg px-4 py-3 text-sm text-yellow-800">⚠️ {error}</div>}

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { icon: Tag, color: 'text-blue-600', label: 'Active Coupons', value: coupons.filter(c => c.status === 'active').length },
          { icon: Users, color: 'text-green-600', label: 'Total Uses', value: coupons.reduce((s, c) => s + c.usage.current, 0) },
          { icon: Calendar, color: 'text-purple-600', label: 'Scheduled', value: coupons.filter(c => c.status === 'scheduled').length },
          { icon: Zap, color: 'text-orange-600', label: 'Revenue Generated', value: '₹48.2K' },
        ].map(({ icon: Icon, color, label, value }) => (
          <div key={label} className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-2">
              <Icon className={`w-8 h-8 ${color}`} />
              <span className="text-2xl font-semibold text-gray-900">{value}</span>
            </div>
            <p className="text-sm text-gray-600">{label}</p>
          </div>
        ))}
      </div>

      {/* Flash Sale */}
      <div className="bg-gradient-to-r from-red-500 to-orange-500 rounded-lg p-8 text-white">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-3">
              <Zap className="w-10 h-10" />
              <h3 className="text-2xl font-bold">Flash Sale Control</h3>
            </div>
            <p className="text-red-50 mb-4">Apply an instant sitewide discount for a limited time window.</p>
            {showFlashSale && (
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium mb-1">Discount Amount</label>
                    <input type="text" placeholder="e.g., 30%" value={flashData.discount} onChange={e => setFlashData({ ...flashData, discount: e.target.value })}
                      className="w-full px-3 py-2 bg-white/20 border border-white/30 rounded-lg text-white placeholder-white/60 focus:outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Duration (hours)</label>
                    <input type="number" value={flashData.duration} onChange={e => setFlashData({ ...flashData, duration: Number(e.target.value) })}
                      className="w-full px-3 py-2 bg-white/20 border border-white/30 rounded-lg text-white focus:outline-none" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Apply To</label>
                  <select value={flashData.applyTo} onChange={e => setFlashData({ ...flashData, applyTo: e.target.value })}
                    className="w-full px-3 py-2 bg-white/20 border border-white/30 rounded-lg text-white focus:outline-none">
                    {['All Products & Destinations', 'Destinations Only', 'Physical Products Only'].map(o => <option key={o} className="text-gray-900">{o}</option>)}
                  </select>
                </div>
              </div>
            )}
          </div>
          <div className="ml-8">
            <AdminButton 
              onClick={() => setShowFlashSale(!showFlashSale)}
              className={`w-28 h-28 !rounded-full !p-0 shadow-2xl transition-all transform hover:scale-110 active:scale-95 border-4 border-white/20 ${showFlashSale ? 'bg-white text-red-600' : 'bg-red-600 text-white'}`}
            >
              <Zap className={`w-12 h-12 ${showFlashSale ? 'animate-pulse' : ''}`} />
            </AdminButton>
            <p className="text-center text-sm mt-4 font-bold tracking-wide uppercase">{showFlashSale ? 'Configure' : 'Start Now'}</p>
          </div>
        </div>
        {showFlashSale && (
          <div className="flex gap-3 mt-6">
            <AdminButton onClick={handleLaunchFlashSale} isLoading={isLaunching} variant="success" className="grow !bg-white !text-red-600 border-none shadow-lg">
              Launch Flash Sale Now
            </AdminButton>
            <AdminButton variant="ghost" onClick={() => setShowFlashSale(false)} className="grow !text-white hover:!bg-white/20">
              Cancel
            </AdminButton>
          </div>
        )}
      </div>

      {/* Coupons Grid */}
      {isLoading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="w-8 h-8 animate-spin text-blue-500" /><span className="ml-3 text-gray-500">Loading coupons...</span>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {coupons.map(coupon => {
            const usagePct = Math.round((coupon.usage.current / coupon.usage.limit) * 100);
            return (
              <div key={coupon.id} className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="px-3 py-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg font-mono font-bold text-sm shadow-sm">{coupon.code}</div>
                      <button onClick={() => copyCode(coupon.code)} className="p-1 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors"><Copy className="w-4 h-4" /></button>
                    </div>
                    <p className="text-sm text-gray-600">{coupon.description}</p>
                  </div>
                  <AdminBadge variant={coupon.status === 'active' ? 'green' : coupon.status === 'scheduled' ? 'blue' : 'gray'}>
                    {coupon.status.charAt(0).toUpperCase() + coupon.status.slice(1)}
                  </AdminBadge>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Discount Value</span>
                    <span className="font-semibold text-lg text-blue-600">{coupon.discount} OFF</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Usage</span>
                    <span className="font-medium">{coupon.usage.current} / {coupon.usage.limit} ({usagePct}%)</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className={`h-2 rounded-full ${usagePct >= 80 ? 'bg-red-500' : usagePct >= 50 ? 'bg-yellow-500' : 'bg-green-500'}`} style={{ width: `${usagePct}%` }} />
                  </div>
                  <div className="grid grid-cols-2 gap-3 pt-2 text-sm">
                    <div><p className="text-xs text-gray-600">Expires</p><p className="font-medium mt-1">{coupon.expires}</p></div>
                    <div><p className="text-xs text-gray-600">Applies To</p><p className="font-medium mt-1">{coupon.appliedTo}</p></div>
                  </div>
                  <div className="flex items-center justify-between pt-2 border-t border-gray-200">
                    <div className="flex items-center gap-2">
                      <input type="checkbox" checked={coupon.stackable} readOnly className="w-4 h-4 text-blue-600 rounded" />
                      <span className="text-sm text-gray-600">Stackable</span>
                    </div>
                    <div className="flex gap-2">
                      <AdminButton variant="ghost" size="sm" onClick={() => openEdit(coupon)} className="px-1.5" icon={<Edit className="w-4 h-4" />} />
                      <AdminButton variant="ghost" size="sm" onClick={() => setDeleteConfirm(coupon.id)} className="px-1.5 hover:text-red-600" icon={<Trash2 className="w-4 h-4" />} />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}