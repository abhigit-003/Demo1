import { useState } from "react";
import { MapPin, Filter, Plus, Globe, AlertTriangle, CheckCircle, Clock, X } from "lucide-react";

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

const mockDestinations: Destination[] = [
  { id: '1', name: 'Paris City Tour', region: 'Europe', tier: 'Elite', capacity: 150, booked: 127, price: 1899, status: 'active', coordinates: { lat: 48.8566, lng: 2.3522 } },
  { id: '2', name: 'Tokyo Adventure', region: 'Asia', tier: 'Elite', capacity: 120, booked: 98, price: 2199, status: 'active', coordinates: { lat: 35.6762, lng: 139.6503 } },
  { id: '3', name: 'New York Experience', region: 'North America', tier: 'Standard', capacity: 200, booked: 145, price: 1599, status: 'active', coordinates: { lat: 40.7128, lng: -74.0060 } },
  { id: '4', name: 'Cairo Historical', region: 'Africa', tier: 'Standard', capacity: 100, booked: 45, price: 1299, status: 'maintenance', coordinates: { lat: 30.0444, lng: 31.2357 } },
  { id: '5', name: 'Sydney Beaches', region: 'Oceania', tier: 'Elite', capacity: 80, booked: 72, price: 1999, status: 'active', coordinates: { lat: -33.8688, lng: 151.2093 } },
  { id: '6', name: 'Rio Carnival', region: 'South America', tier: 'Budget', capacity: 250, booked: 189, price: 999, status: 'restricted', coordinates: { lat: -22.9068, lng: -43.1729 } },
  { id: '7', name: 'Dubai Luxury', region: 'Middle East', tier: 'Elite', capacity: 100, booked: 91, price: 2499, status: 'active', coordinates: { lat: 25.2048, lng: 55.2708 } },
  { id: '8', name: 'Bali Retreat', region: 'Asia', tier: 'Standard', capacity: 90, booked: 34, price: 1399, status: 'active', coordinates: { lat: -8.3405, lng: 115.0920 } },
];

const regions = ['All Regions', 'Europe', 'Asia', 'North America', 'South America', 'Africa', 'Oceania', 'Middle East'];
const tiers = ['All Tiers', 'Elite', 'Standard', 'Budget'];

export default function DestinationHub() {
  const [destinations, setDestinations] = useState<Destination[]>(mockDestinations);
  const [selectedRegion, setSelectedRegion] = useState('All Regions');
  const [selectedTier, setSelectedTier] = useState('All Tiers');
  const [editingDestination, setEditingDestination] = useState<Destination | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const filteredDestinations = destinations.filter(dest => {
    const matchesRegion = selectedRegion === 'All Regions' || dest.region === selectedRegion;
    const matchesTier = selectedTier === 'All Tiers' || dest.tier === selectedTier;
    return matchesRegion && matchesTier;
  });

  const getCapacityPercentage = (booked: number, capacity: number) => {
    return Math.round((booked / capacity) * 100);
  };

  const getCapacityColor = (percentage: number) => {
    if (percentage >= 80) return 'text-red-600';
    if (percentage >= 60) return 'text-yellow-600';
    return 'text-green-600';
  };

  const hideRegion = (region: string) => {
    setDestinations(destinations.map(d => 
      d.region === region ? { ...d, status: 'restricted' as const } : d
    ));
  };

  const handleEditClick = (destination: Destination) => {
    setEditingDestination({ ...destination });
    setIsEditModalOpen(true);
  };

  const handleEditChange = (field: keyof Destination, value: any) => {
    if (editingDestination) {
      setEditingDestination({
        ...editingDestination,
        [field]: value
      });
    }
  };

  const handleSaveEdit = () => {
    if (editingDestination) {
      setDestinations(destinations.map(d => 
        d.id === editingDestination.id ? editingDestination : d
      ));
      setIsEditModalOpen(false);
      setEditingDestination(null);
    }
  };

  const handleCancelEdit = () => {
    setIsEditModalOpen(false);
    setEditingDestination(null);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900">Destination Hub</h2>
          <p className="text-gray-600 mt-1">Manage and regulate travel destinations globally</p>
        </div>
        <button className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          <Plus className="w-5 h-5" />
          Add Destination
        </button>
      </div>

      {/* Global Map View - Placeholder */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Global Map View</h3>
          <button className="text-sm text-blue-600 hover:text-blue-700">Full Screen</button>
        </div>
        <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg h-64 flex items-center justify-center relative overflow-hidden">
          <Globe className="w-24 h-24 text-blue-200" />
          <div className="absolute inset-0 flex items-center justify-center">
            <p className="text-sm text-gray-600 bg-white/80 px-4 py-2 rounded-lg">
              Interactive world map showing all destination locations
            </p>
          </div>
        </div>
        <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
          {regions.slice(1).map((region) => (
            <button
              key={region}
              onClick={() => hideRegion(region)}
              className="px-3 py-2 text-sm border border-gray-300 rounded-lg hover:bg-red-50 hover:border-red-300 hover:text-red-600 transition-colors"
            >
              Hide {region}
            </button>
          ))}
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <select 
            value={selectedRegion}
            onChange={(e) => setSelectedRegion(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {regions.map(region => (
              <option key={region} value={region}>{region}</option>
            ))}
          </select>
          
          <select 
            value={selectedTier}
            onChange={(e) => setSelectedTier(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {tiers.map(tier => (
              <option key={tier} value={tier}>{tier}</option>
            ))}
          </select>
          
          <button className="inline-flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            <Filter className="w-5 h-5" />
            More Filters
          </button>
        </div>
      </div>

      {/* Stats by Tier */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {['Elite', 'Standard', 'Budget'].map((tier) => {
          const tierDestinations = destinations.filter(d => d.tier === tier);
          const totalRevenue = tierDestinations.reduce((sum, d) => sum + (d.price * d.booked), 0);
          
          return (
            <div key={tier} className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">{tier} Tier</h3>
                <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  tier === 'Elite' ? 'bg-purple-50 text-purple-700' :
                  tier === 'Standard' ? 'bg-blue-50 text-blue-700' :
                  'bg-green-50 text-green-700'
                }`}>
                  {tierDestinations.length} destinations
                </span>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Total Revenue</span>
                  <span className="font-medium text-gray-900">${totalRevenue.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Avg. Price</span>
                  <span className="font-medium text-gray-900">
                    ${Math.round(tierDestinations.reduce((sum, d) => sum + d.price, 0) / tierDestinations.length)}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Destinations Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredDestinations.map((destination) => {
          const capacityPercentage = getCapacityPercentage(destination.booked, destination.capacity);
          
          return (
            <div key={destination.id} className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">{destination.name}</h3>
                    <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                      destination.tier === 'Elite' ? 'bg-purple-50 text-purple-700' :
                      destination.tier === 'Standard' ? 'bg-blue-50 text-blue-700' :
                      'bg-green-50 text-green-700'
                    }`}>
                      {destination.tier}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <MapPin className="w-4 h-4" />
                    <span>{destination.region}</span>
                  </div>
                </div>
                
                <div className={`flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-medium ${
                  destination.status === 'active' ? 'bg-green-50 text-green-700' :
                  destination.status === 'restricted' ? 'bg-red-50 text-red-700' :
                  'bg-yellow-50 text-yellow-700'
                }`}>
                  {destination.status === 'active' && <CheckCircle className="w-3 h-3" />}
                  {destination.status === 'restricted' && <AlertTriangle className="w-3 h-3" />}
                  {destination.status === 'maintenance' && <Clock className="w-3 h-3" />}
                  <span className="capitalize">{destination.status}</span>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Capacity Status</span>
                  <span className={`text-sm font-medium ${getCapacityColor(capacityPercentage)}`}>
                    {destination.booked}/{destination.capacity} ({capacityPercentage}%)
                  </span>
                </div>
                
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full transition-all ${
                      capacityPercentage >= 80 ? 'bg-red-500' :
                      capacityPercentage >= 60 ? 'bg-yellow-500' :
                      'bg-green-500'
                    }`}
                    style={{ width: `${capacityPercentage}%` }}
                  />
                </div>

                <div className="flex justify-between items-center pt-2">
                  <span className="text-2xl font-semibold text-gray-900">${destination.price}</span>
                  <div className="flex gap-2">
                    <button className="px-3 py-1 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors" onClick={() => handleEditClick(destination)}>
                      Edit
                    </button>
                    <button className={`px-3 py-1 text-sm rounded-lg transition-colors ${
                      destination.status === 'active' 
                        ? 'bg-red-50 text-red-600 hover:bg-red-100'
                        : 'bg-green-50 text-green-600 hover:bg-green-100'
                    }`}>
                      {destination.status === 'active' ? 'Restrict' : 'Activate'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Audit Log Preview */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Recent Destination Changes</h3>
          <button className="text-sm text-blue-600 hover:text-blue-700">View Full Audit Log</button>
        </div>
        <div className="space-y-3">
          <div className="flex items-center justify-between py-2 text-sm border-b border-gray-100">
            <div>
              <p className="text-gray-900">Rio Carnival restricted due to political instability</p>
              <p className="text-gray-500 text-xs mt-1">Changed by: Admin • 2 hours ago</p>
            </div>
          </div>
          <div className="flex items-center justify-between py-2 text-sm border-b border-gray-100">
            <div>
              <p className="text-gray-900">Cairo Historical moved to maintenance mode</p>
              <p className="text-gray-500 text-xs mt-1">Changed by: Operations Manager • 5 hours ago</p>
            </div>
          </div>
          <div className="flex items-center justify-between py-2 text-sm">
            <div>
              <p className="text-gray-900">Dubai Luxury tier updated to Elite</p>
              <p className="text-gray-500 text-xs mt-1">Changed by: Admin • Yesterday</p>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      {isEditModalOpen && editingDestination && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4 shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold text-gray-900">Edit Destination</h3>
              <button className="p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded" onClick={handleCancelEdit}>
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input
                  type="text"
                  value={editingDestination.name}
                  onChange={(e) => handleEditChange('name', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Region</label>
                <select
                  value={editingDestination.region}
                  onChange={(e) => handleEditChange('region', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {regions.slice(1).map(region => (
                    <option key={region} value={region}>{region}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tier</label>
                <select
                  value={editingDestination.tier}
                  onChange={(e) => handleEditChange('tier', e.target.value as Destination['tier'])}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Elite">Elite</option>
                  <option value="Standard">Standard</option>
                  <option value="Budget">Budget</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Capacity</label>
                <input
                  type="number"
                  value={editingDestination.capacity}
                  onChange={(e) => handleEditChange('capacity', parseInt(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Booked</label>
                <input
                  type="number"
                  value={editingDestination.booked}
                  onChange={(e) => handleEditChange('booked', parseInt(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Price</label>
                <input
                  type="number"
                  value={editingDestination.price}
                  onChange={(e) => handleEditChange('price', parseInt(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select
                  value={editingDestination.status}
                  onChange={(e) => handleEditChange('status', e.target.value as Destination['status'])}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="active">Active</option>
                  <option value="restricted">Restricted</option>
                  <option value="maintenance">Maintenance</option>
                </select>
              </div>
            </div>
            <div className="mt-6 flex justify-end gap-3">
              <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors" onClick={handleCancelEdit}>
                Cancel
              </button>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors" onClick={handleSaveEdit}>
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}