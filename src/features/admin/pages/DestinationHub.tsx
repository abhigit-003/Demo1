import { useState, useEffect, useCallback } from "react";
import { MapPin, Filter, Plus, Globe, AlertTriangle, CheckCircle, Clock, X, Loader2, Trash2, Edit, IndianRupee } from "lucide-react";
import { getDestinations, createDestination, updateDestination, deleteDestination } from "../services/adminAPI";
import Toast from "../components/Toast";
import AdminModal from "../components/AdminModal";
import FormInput from "../components/FormInput";
import AdminButton from "../components/AdminButton";
import AdminBadge from "../components/AdminBadge";

interface Destination {
  id: string;
  name: string;
  region: string;
  tier: 'Elite' | 'Standard' | 'Budget';
  capacity: number;
  booked: number;
  price: number;
  status: 'active' | 'restricted' | 'maintenance';
  coordinates: { lat: number; lng: number };
}

const MOCK_DESTINATIONS: Destination[] = [
  { id: '1', name: 'Paris City Tour', region: 'Europe', tier: 'Elite', capacity: 150, booked: 127, price: 1899, status: 'active', coordinates: { lat: 48.8566, lng: 2.3522 } },
  { id: '2', name: 'Tokyo Adventure', region: 'Asia', tier: 'Elite', capacity: 120, booked: 98, price: 2199, status: 'active', coordinates: { lat: 35.6762, lng: 139.6503 } },
  { id: '3', name: 'New York Experience', region: 'North America', tier: 'Standard', capacity: 200, booked: 145, price: 1599, status: 'active', coordinates: { lat: 40.7128, lng: -74.0060 } },
  { id: '4', name: 'Cairo Historical', region: 'Africa', tier: 'Standard', capacity: 100, booked: 45, price: 1299, status: 'maintenance', coordinates: { lat: 30.0444, lng: 31.2357 } },
  { id: '5', name: 'Sydney Beaches', region: 'Oceania', tier: 'Elite', capacity: 80, booked: 72, price: 1999, status: 'active', coordinates: { lat: -33.8688, lng: 151.2093 } },
  { id: '6', name: 'Rio Carnival', region: 'South America', tier: 'Budget', capacity: 250, booked: 189, price: 999, status: 'restricted', coordinates: { lat: -22.9068, lng: -43.1729 } },
];

const regions = ['All Regions', 'Europe', 'Asia', 'North America', 'South America', 'Africa', 'Oceania', 'Middle East'];
const tiers = ['All Tiers', 'Elite', 'Standard', 'Budget'];

const blankDest = { name: '', region: 'Europe', tier: 'Standard' as Destination['tier'], capacity: 100, booked: 0, price: 999, status: 'active' as Destination['status'], coordinates: { lat: 0, lng: 0 } };

export default function DestinationHub() {
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedRegion, setSelectedRegion] = useState('All Regions');
  const [selectedTier, setSelectedTier] = useState('All Tiers');
  const [editingDest, setEditingDest] = useState<Destination | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newDest, setNewDest] = useState({ ...blankDest });
  const [isSaving, setIsSaving] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  const showToast = (message: string, type: 'success' | 'error') => setToast({ message, type });

  const fetchDestinations = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await getDestinations();
      if (Array.isArray(data)) {
        setDestinations(data);
      } else {
        throw new Error('Invalid data format');
      }
    } catch {
      setDestinations(MOCK_DESTINATIONS);
      setError('Could not reach backend – showing demo data.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => { fetchDestinations(); }, [fetchDestinations]);

  const filtered = destinations.filter(d => {
    const matchesRegion = selectedRegion === 'All Regions' || d.region === selectedRegion;
    const matchesTier = selectedTier === 'All Tiers' || d.tier === selectedTier;
    return matchesRegion && matchesTier;
  });

  const pct = (booked: number, capacity: number) => Math.round((booked / capacity) * 100);
  const capacityColor = (p: number) => p >= 80 ? 'text-red-600' : p >= 60 ? 'text-yellow-600' : 'text-green-600';
  const barColor = (p: number) => p >= 80 ? 'bg-red-500' : p >= 60 ? 'bg-yellow-500' : 'bg-green-500';

  const handleToggleStatus = async (dest: Destination) => {
    const newStatus = dest.status === 'active' ? 'restricted' : 'active';
    setDestinations(prev => prev.map(d => d.id === dest.id ? { ...d, status: newStatus } : d));
    try {
      await updateDestination(dest.id, { status: newStatus });
      showToast(`Destination ${newStatus === 'active' ? 'activated' : 'restricted'}.`, 'success');
    } catch {
      setDestinations(prev => prev.map(d => d.id === dest.id ? dest : d));
      showToast('Failed to update status.', 'error');
    }
  };

  const handleSaveEdit = async () => {
    if (!editingDest) return;
    if (!editingDest.name.trim()) { showToast('Destination name is required.', 'error'); return; }
    const price = Number(editingDest.price);
    const capacity = Number(editingDest.capacity);
    if (isNaN(price) || price < 0) { showToast('Valid price is required.', 'error'); return; }
    if (isNaN(capacity) || capacity <= 0) { showToast('Valid capacity is required.', 'error'); return; }

    setIsSaving(true);
    try {
      await updateDestination(editingDest.id, editingDest);
      setDestinations(prev => prev.map(d => d.id === editingDest.id ? editingDest : d));
      setEditingDest(null);
      showToast('Destination updated.', 'success');
    } catch {
      setDestinations(prev => prev.map(d => d.id === editingDest.id ? editingDest : d));
      setEditingDest(null);
      showToast('Saved (offline mode).', 'success');
    } finally {
      setIsSaving(false);
    }
  };

  const handleAddDestination = async () => {
    if (!newDest.name.trim()) { showToast('Destination name is required.', 'error'); return; }
    const price = Number(newDest.price);
    const capacity = Number(newDest.capacity);
    if (isNaN(price) || price < 0) { showToast('Valid price is required.', 'error'); return; }
    if (isNaN(capacity) || capacity <= 0) { showToast('Valid capacity is required.', 'error'); return; }

    try {
      const created = await createDestination(newDest);
      setDestinations(prev => [{ ...newDest, id: created?.id || String(Date.now()) }, ...prev]);
      showToast('Destination created.', 'success');
    } catch {
      setDestinations(prev => [{ ...newDest, id: String(Date.now()) }, ...prev]);
      showToast('Destination saved (offline mode).', 'success');
    } finally {
      setNewDest({ ...blankDest });
      setIsAddModalOpen(false);
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    setDeleteConfirm(null);
    try {
      await deleteDestination(id);
    } catch { /* ignore offline */ }
    setDestinations(prev => prev.filter(d => d.id !== id));
    showToast('Destination deleted.', 'success');
  };

  return (
    <div className="space-y-6">
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

      {/* Delete Confirmation */}
      <AdminModal
        isOpen={!!deleteConfirm}
        onClose={() => setDeleteConfirm(null)}
        title="Delete Destination?"
        footer={
          <>
            <AdminButton variant="secondary" onClick={() => setDeleteConfirm(null)}>Cancel</AdminButton>
            <AdminButton variant="danger" onClick={() => deleteConfirm && handleDelete(deleteConfirm)}>Delete</AdminButton>
          </>
        }
      >
        <p className="text-sm text-gray-600">This action cannot be undone. Are you sure you want to remove this destination?</p>
      </AdminModal>

      {/* Add Modal */}
      <AdminModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Add New Destination"
        footer={
          <>
            <AdminButton variant="secondary" onClick={() => setIsAddModalOpen(false)}>Cancel</AdminButton>
            <AdminButton onClick={handleAddDestination} isLoading={isSaving} icon={<Plus className="w-4 h-4" />}>
              Add Destination
            </AdminButton>
          </>
        }
      >
        <div className="space-y-4">
          <FormInput label="Destination Name" value={newDest.name} onChange={v => setNewDest({ ...newDest, name: v })} placeholder="e.g. Paris City Tour" icon={<Globe className="w-4 h-4" />} />
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Region</label>
              <select value={newDest.region} onChange={e => setNewDest({ ...newDest, region: e.target.value })}
                className="w-full px-3 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all">
                {regions.slice(1).map(r => <option key={r}>{r}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Tier</label>
              <select value={newDest.tier} onChange={e => setNewDest({ ...newDest, tier: e.target.value as Destination['tier'] })}
                className="w-full px-3 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all">
                {['Elite', 'Standard', 'Budget'].map(t => <option key={t}>{t}</option>)}
              </select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <FormInput label="Capacity" type="number" value={newDest.capacity} onChange={v => setNewDest({ ...newDest, capacity: v })} />
            <FormInput label="Price (₹)" type="number" value={newDest.price} onChange={v => setNewDest({ ...newDest, price: v })} icon={<IndianRupee className="w-4 h-4" />} />
          </div>
        </div>
      </AdminModal>

      {/* Edit Modal */}
      <AdminModal
        isOpen={!!editingDest}
        onClose={() => setEditingDest(null)}
        title="Edit Destination"
        footer={
          <>
            <AdminButton variant="secondary" onClick={() => setEditingDest(null)}>Cancel</AdminButton>
            <AdminButton onClick={handleSaveEdit} isLoading={isSaving}>Save Changes</AdminButton>
          </>
        }
      >
        {editingDest && (
          <div className="space-y-4">
            <FormInput label="Destination Name" value={editingDest.name} onChange={v => setEditingDest({ ...editingDest, name: v })} icon={<Globe className="w-4 h-4" />} />
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Region</label>
                <select value={editingDest.region} onChange={e => setEditingDest({ ...editingDest, region: e.target.value })}
                  className="w-full px-3 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all">
                  {regions.slice(1).map(r => <option key={r}>{r}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Tier</label>
                <select value={editingDest.tier} onChange={e => setEditingDest({ ...editingDest, tier: e.target.value as Destination['tier'] })}
                  className="w-full px-3 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all">
                  {['Elite', 'Standard', 'Budget'].map(t => <option key={t}>{t}</option>)}
                </select>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <FormInput label="Capacity" type="number" value={editingDest.capacity} onChange={v => setEditingDest({ ...editingDest, capacity: v })} />
              <FormInput label="Booked" type="number" value={editingDest.booked} onChange={v => setEditingDest({ ...editingDest, booked: v })} />
              <FormInput label="Price (₹)" type="number" value={editingDest.price} onChange={v => setEditingDest({ ...editingDest, price: v })} icon={<IndianRupee className="w-4 h-4" />} />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Status</label>
              <select value={editingDest.status} onChange={e => setEditingDest({ ...editingDest, status: e.target.value as Destination['status'] })}
                className="w-full px-3 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all">
                <option value="active">Active</option>
                <option value="restricted">Restricted</option>
                <option value="maintenance">Maintenance</option>
              </select>
            </div>
          </div>
        )}
      </AdminModal>

      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900">Destination Hub</h2>
          <p className="text-gray-600 mt-1">Manage and regulate travel destinations globally</p>
        </div>
        <div className="flex gap-2">
          <AdminButton variant="secondary" onClick={fetchDestinations}>Refresh</AdminButton>
          <AdminButton onClick={() => setIsAddModalOpen(true)} icon={<Plus className="w-5 h-5" />}>
            Add Destination
          </AdminButton>
        </div>
      </div>

      {error && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg px-4 py-3 text-sm text-yellow-800">⚠️ {error}</div>
      )}

      {/* Filters */}
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <select value={selectedRegion} onChange={e => setSelectedRegion(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
            {regions.map(r => <option key={r}>{r}</option>)}
          </select>
          <select value={selectedTier} onChange={e => setSelectedTier(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
            {tiers.map(t => <option key={t}>{t}</option>)}
          </select>
        </div>
      </div>

      {/* Tier Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {(['Elite', 'Standard', 'Budget'] as const).map(tier => {
          const tierDests = destinations.filter(d => d.tier === tier);
          const revenue = tierDests.reduce((s, d) => s + d.price * d.booked, 0);
          return (
            <div key={tier} className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-gray-900">{tier} Tier</h3>
                <AdminBadge variant={tier === 'Elite' ? 'purple' : tier === 'Standard' ? 'blue' : 'green'}>
                  {tierDests.length} destinations
                </AdminBadge>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between"><span className="text-gray-600">Total Revenue</span><span className="font-medium">₹{revenue.toLocaleString()}</span></div>
                <div className="flex justify-between"><span className="text-gray-600">Avg. Price</span>
                  <span className="font-medium">₹{tierDests.length ? Math.round(tierDests.reduce((s, d) => s + d.price, 0) / tierDests.length) : 0}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Cards Grid */}
      {isLoading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
          <span className="ml-3 text-gray-500">Loading destinations...</span>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filtered.map(dest => {
            const p = pct(dest.booked, dest.capacity);
            return (
              <div key={dest.id} className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-lg font-bold text-gray-900">{dest.name}</h3>
                      <AdminBadge variant={dest.tier === 'Elite' ? 'purple' : dest.tier === 'Standard' ? 'blue' : 'green'}>
                        {dest.tier}
                      </AdminBadge>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <MapPin className="w-4 h-4" /><span>{dest.region}</span>
                    </div>
                  </div>
                  <div className={`flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-medium ${dest.status === 'active' ? 'bg-green-50 text-green-700' : dest.status === 'restricted' ? 'bg-red-50 text-red-700' : 'bg-yellow-50 text-yellow-700'}`}>
                    {dest.status === 'active' && <CheckCircle className="w-3 h-3" />}
                    {dest.status === 'restricted' && <AlertTriangle className="w-3 h-3" />}
                    {dest.status === 'maintenance' && <Clock className="w-3 h-3" />}
                    <span className="capitalize">{dest.status}</span>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Capacity</span>
                    <span className={`text-sm font-medium ${capacityColor(p)}`}>{dest.booked}/{dest.capacity} ({p}%)</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className={`h-2 rounded-full transition-all ${barColor(p)}`} style={{ width: `${p}%` }} />
                  </div>
                  <div className="flex justify-between items-center pt-2">
                    <span className="text-2xl font-bold text-gray-900">₹{dest.price.toLocaleString()}</span>
                    <div className="flex gap-2">
                      <AdminButton variant="secondary" size="sm" onClick={() => setEditingDest({ ...dest })} icon={<Edit className="w-3 h-3" />}>
                        Edit
                      </AdminButton>
                      <AdminButton 
                        variant={dest.status === 'active' ? 'danger' : 'success'} 
                        size="sm" 
                        onClick={() => handleToggleStatus(dest)}
                      >
                        {dest.status === 'active' ? 'Restrict' : 'Activate'}
                      </AdminButton>
                      <AdminButton variant="ghost" size="sm" onClick={() => setDeleteConfirm(dest.id)} className="px-1 text-gray-400 hover:text-red-600">
                        <Trash2 className="w-4 h-4" />
                      </AdminButton>
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