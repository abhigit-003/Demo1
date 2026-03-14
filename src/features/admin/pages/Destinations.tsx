import React, { useState } from "react";
import { Map as MapIcon, Shield, AlertTriangle, Layers, ChevronRight, Search } from "lucide-react";

export function Destinations() {
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);

  const REGIONS = [
    { name: "Europe", status: "Active", alerts: 0, services: 12 },
    { name: "Asia Pacific", status: "Warning", alerts: 2, services: 8 },
    { name: "North America", status: "Active", alerts: 0, services: 15 },
    { name: "Latin America", status: "Restricted", alerts: 1, services: 4 },
  ];

  return (
    <div className="space-y-6 h-[calc(100vh-8rem)] flex flex-col">
      <div className="flex justify-between items-center shrink-0">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Destination & Service Regulation</h1>
          <p className="text-gray-500 mt-1">Monitor global operations and control service visibility.</p>
        </div>
        <div className="flex gap-3">
           <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
            <Layers size={18} />
            Service Tiers
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
            <Shield size={18} />
            Audit Logs
          </button>
        </div>
      </div>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-6 min-h-0">
        {/* Map View (Mock) */}
        <div className="lg:col-span-2 bg-slate-900 rounded-xl overflow-hidden relative shadow-lg flex flex-col">
          <div className="absolute top-4 left-4 z-10 bg-white/10 backdrop-blur-md p-2 rounded-lg flex items-center gap-2 border border-white/20">
            <Search className="text-white/70" size={16} />
            <input 
              type="text" 
              placeholder="Search region..." 
              className="bg-transparent border-none text-white placeholder-white/50 text-sm focus:outline-none w-48"
            />
          </div>

          <div className="absolute bottom-4 right-4 z-10 flex flex-col gap-2">
            <button className="p-2 bg-white rounded-lg shadow-lg hover:bg-gray-50 text-gray-700 font-bold">+</button>
            <button className="p-2 bg-white rounded-lg shadow-lg hover:bg-gray-50 text-gray-700 font-bold">-</button>
          </div>

          {/* Abstract Map Representation */}
          <div className="flex-1 relative bg-[#0F172A] p-8 flex items-center justify-center">
            <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(#334155 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
            
            {/* Mock Continents */}
            <div className="relative w-full h-full max-w-2xl mx-auto opacity-80">
               {/* NA */}
               <div 
                 onClick={() => setSelectedRegion("North America")}
                 className={`absolute top-[20%] left-[10%] w-32 h-24 bg-emerald-500/20 border-2 border-emerald-500/50 rounded-full blur-xl cursor-pointer hover:bg-emerald-500/30 transition-all duration-500 ${selectedRegion === 'North America' ? 'bg-emerald-500/40 scale-110' : ''}`}
               />
               <div className="absolute top-[25%] left-[15%] text-emerald-400 font-mono text-xs font-bold tracking-widest">NO. AMERICA</div>

               {/* EU */}
               <div 
                 onClick={() => setSelectedRegion("Europe")}
                 className={`absolute top-[25%] left-[48%] w-20 h-20 bg-emerald-500/20 border-2 border-emerald-500/50 rounded-full blur-xl cursor-pointer hover:bg-emerald-500/30 transition-all duration-500 ${selectedRegion === 'Europe' ? 'bg-emerald-500/40 scale-110' : ''}`}
               />
               
               {/* Asia */}
               <div 
                  onClick={() => setSelectedRegion("Asia Pacific")}
                  className={`absolute top-[30%] left-[65%] w-40 h-32 bg-yellow-500/20 border-2 border-yellow-500/50 rounded-full blur-xl cursor-pointer hover:bg-yellow-500/30 transition-all duration-500 ${selectedRegion === 'Asia Pacific' ? 'bg-yellow-500/40 scale-110' : ''}`}
               />
               <div className="absolute top-[35%] left-[70%] text-yellow-400 font-mono text-xs font-bold tracking-widest">ASIA PAC</div>
               {/* LatAm */}
               <div 
                  onClick={() => setSelectedRegion("Latin America")}
                  className={`absolute top-[55%] left-[20%] w-24 h-32 bg-red-500/20 border-2 border-red-500/50 rounded-full blur-xl cursor-pointer hover:bg-red-500/30 transition-all duration-500 ${selectedRegion === 'Latin America' ? 'bg-red-500/40 scale-110' : ''}`}
               />
               <div className="absolute top-[60%] left-[22%] text-red-400 font-mono text-xs font-bold tracking-widest">LATAM</div>
            </div>
          </div>
        </div>

        {/* Sidebar Details */}
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm flex flex-col overflow-hidden">
          <div className="p-4 border-b border-gray-200 bg-gray-50">
            <h3 className="font-semibold text-gray-900">Regional Status</h3>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {REGIONS.map((region) => (
              <div 
                key={region.name}
                onClick={() => setSelectedRegion(region.name)}
                className={`p-4 rounded-lg border cursor-pointer transition-all ${
                  selectedRegion === region.name 
                    ? "border-indigo-500 bg-indigo-50 shadow-sm" 
                    : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                }`}
              >
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-medium text-gray-900">{region.name}</h4>
                  <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                    region.status === 'Active' ? 'bg-green-100 text-green-700' :
                    region.status === 'Warning' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-red-100 text-red-700'
                  }`}>
                    {region.status}
                  </span>
                </div>
                
                <div className="grid grid-cols-2 gap-2 text-sm text-gray-600 mt-3">
                  <div className="flex items-center gap-2">
                    <MapIcon size={14} />
                    <span>{region.services} Services</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <AlertTriangle size={14} className={region.alerts > 0 ? "text-yellow-500" : "text-gray-300"} />
                    <span>{region.alerts} Alerts</span>
                  </div>
                </div>

                {selectedRegion === region.name && (
                  <div className="mt-4 pt-4 border-t border-indigo-100 flex gap-2">
                    <button className="flex-1 py-1.5 text-xs font-medium text-white bg-red-500 hover:bg-red-600 rounded">
                      Suspend Region
                    </button>
                    <button className="flex-1 py-1.5 text-xs font-medium text-indigo-700 bg-white border border-indigo-200 hover:bg-indigo-50 rounded">
                      View Services
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
