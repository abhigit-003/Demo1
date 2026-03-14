import { useState } from 'react';
import { 
  Globe, 
  MapPin, 
  Shield, 
  AlertTriangle, 
  MoreVertical,
  Layers
} from 'lucide-react';
import { mockDestinations } from '../data';
import { Destination } from '../types';
import { clsx } from 'clsx';
import { toast } from 'sonner';

export default function DestinationControl() {
  const [destinations, setDestinations] = useState<Destination[]>(mockDestinations);
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);

  const toggleDestinationStatus = (id: string) => {
    setDestinations(destinations.map(d => {
      if (d.id === id) {
        const newStatus = d.status === 'open' ? 'closed' : 'open';
        toast.message(`Destination ${d.name} is now ${newStatus}`);
        return { ...d, status: newStatus as any };
      }
      return d;
    }));
  };

  const handleRegionClick = (region: string) => {
    setSelectedRegion(region === selectedRegion ? null : region);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Destination & Service Regulation</h1>
          <p className="text-slate-500 mt-1">Monitor global operations, safety, and regional compliance.</p>
        </div>
        
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-slate-600">Global Status:</span>
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
            Operational
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Global Map View */}
        <div className="lg:col-span-2 bg-slate-900 rounded-xl shadow-lg overflow-hidden relative min-h-[400px]">
          <div className="absolute top-4 left-4 z-10 bg-slate-800/80 backdrop-blur p-3 rounded-lg border border-slate-700">
            <h3 className="text-white font-semibold text-sm flex items-center gap-2">
              <Globe className="text-blue-400 h-4 w-4" /> Global View
            </h3>
            <p className="text-slate-400 text-xs mt-1">Click a region to manage visibility</p>
          </div>
          
          {/* Mock Map Background */}
          <div className="absolute inset-0 bg-slate-900 flex items-center justify-center opacity-20 pointer-events-none">
            <span className="text-9xl font-black text-slate-800 select-none">WORLD MAP</span>
          </div>

          {/* Interactive Dots */}
          <div className="relative w-full h-full">
            {destinations.map((dest) => (
              <div
                key={dest.id}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
                style={{ 
                  left: `${(dest.coordinates.x + 180) / 3.6}%`, 
                  top: `${(90 - dest.coordinates.y) / 1.8}%` 
                }}
                onClick={() => toggleDestinationStatus(dest.id)}
              >
                <div className={clsx(
                  "w-4 h-4 rounded-full border-2 border-white shadow-lg transition-all duration-300",
                  dest.status === 'open' ? "bg-green-500 hover:scale-125" : 
                  dest.status === 'restricted' ? "bg-orange-500 hover:scale-125" : "bg-red-500 hover:scale-125"
                )} />
                
                {/* Tooltip */}
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-48 bg-white rounded-lg shadow-xl p-3 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-20">
                  <div className="flex justify-between items-start mb-1">
                    <h4 className="font-bold text-slate-900 text-sm">{dest.name}</h4>
                    <span className={clsx(
                      "text-[10px] font-bold px-1.5 py-0.5 rounded uppercase",
                      dest.status === 'open' ? "bg-green-100 text-green-700" :
                      dest.status === 'restricted' ? "bg-orange-100 text-orange-700" : "bg-red-100 text-red-700"
                    )}>{dest.status}</span>
                  </div>
                  <div className="text-xs text-slate-500 space-y-1">
                    <p>Capacity: {Math.round((dest.currentBookings / dest.capacity) * 100)}%</p>
                    <p>Tier: <span className="capitalize">{dest.tier}</span></p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Map Controls */}
          <div className="absolute bottom-4 right-4 flex flex-col gap-2">
            <button className="bg-white p-2 rounded-lg shadow text-slate-600 hover:text-slate-900">
              <Plus size={20} />
            </button>
            <button className="bg-white p-2 rounded-lg shadow text-slate-600 hover:text-slate-900">
              <Minus size={20} />
            </button>
          </div>
        </div>

        {/* Service Tiers & Controls */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
              <Layers className="text-indigo-600 h-5 w-5" />
              Service Tiers
            </h3>
            
            <div className="space-y-4">
              {['Elite', 'Standard', 'Budget'].map((tier) => (
                <div key={tier} className="flex items-center justify-between p-3 border border-slate-100 rounded-lg hover:bg-slate-50 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className={clsx(
                      "w-3 h-3 rounded-full",
                      tier === 'Elite' ? "bg-purple-500" :
                      tier === 'Standard' ? "bg-blue-500" : "bg-gray-500"
                    )} />
                    <span className="font-medium text-slate-700">{tier}</span>
                  </div>
                  <button className="text-slate-400 hover:text-indigo-600">
                    <MoreVertical size={16} />
                  </button>
                </div>
              ))}
            </div>
            
            <button className="mt-4 w-full py-2 border border-dashed border-slate-300 rounded-lg text-sm font-medium text-slate-500 hover:text-indigo-600 hover:border-indigo-300 transition-colors">
              + Add New Tier
            </button>
          </div>

          <div className="bg-red-50 border border-red-100 rounded-xl p-6">
            <div className="flex items-start gap-3">
              <AlertTriangle className="text-red-600 h-6 w-6 flex-shrink-0" />
              <div>
                <h3 className="font-bold text-red-900">Emergency Override</h3>
                <p className="text-sm text-red-800 mt-1 mb-3">
                  Instantly close all destinations in a specific region due to emergencies.
                </p>
                <select 
                  className="w-full bg-white border border-red-200 text-red-900 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block p-2.5 mb-3"
                  onChange={(e) => handleRegionClick(e.target.value)}
                  value={selectedRegion || ''}
                >
                  <option value="">Select Region...</option>
                  <option value="Asia">Asia Pacific</option>
                  <option value="Europe">Europe</option>
                  <option value="North America">North America</option>
                </select>
                <button 
                  className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition-colors"
                  disabled={!selectedRegion}
                  onClick={() => toast.error(`EMERGENCY: Closed all services in ${selectedRegion}`)}
                >
                  LOCKDOWN REGION
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Additional icons needed for this file
import { Plus, Minus } from 'lucide-react';
