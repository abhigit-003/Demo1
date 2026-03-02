import React, { useState } from "react";
import { Plus, Percent, Clock, TrendingUp, Tag, Trash2, Save, X } from "lucide-react";

export function Pricing() {
  const [activeTab, setActiveTab] = useState("rules");
  const [isCreatingRule, setIsCreatingRule] = useState(false);
  const [newRule, setNewRule] = useState({ name: "", type: "demand", logic: "", action: "" });

  const RULES = [
    { id: 1, name: "Summer Surge", type: "demand", logic: "If bookings > 80%", action: "+15% price", active: true },
    { id: 2, name: "Early Bird", type: "time", logic: "If booking > 60 days in advance", action: "-10% discount", active: true },
    { id: 3, name: "Competitor Match", type: "competitor", logic: "If competitor < our price", action: "Match price", active: false },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Revenue & Pricing Engine</h1>
          <p className="text-gray-500 mt-1">Configure automated pricing strategies and offers.</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white border-b border-gray-200">
        <nav className="-mb-px flex space-x-8 px-6" aria-label="Tabs">
          {["rules", "coupons", "flash-sales"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`${
                activeTab === tab
                  ? "border-indigo-500 text-indigo-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm capitalize`}
            >
              {tab.replace("-", " ")}
            </button>
          ))}
        </nav>
      </div>

      {/* Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Panel */}
        <div className="lg:col-span-2 space-y-6">
          {activeTab === "rules" && (
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Dynamic Pricing Rules</h3>
                <button 
                  onClick={() => setIsCreatingRule(true)}
                  className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                >
                  <Plus size={16} /> Add Rule
                </button>
              </div>

              {isCreatingRule && (
                <div className="mb-6 p-4 bg-gray-50 border border-gray-200 rounded-lg animate-in slide-in-from-top-2">
                  <div className="flex justify-between items-start mb-4">
                    <h4 className="font-medium text-gray-900">New Rule Configuration</h4>
                    <button onClick={() => setIsCreatingRule(false)} className="text-gray-400 hover:text-gray-600">
                      <X size={16} />
                    </button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Rule Name</label>
                      <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500" placeholder="e.g. Weekend Bump" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                      <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500">
                        <option value="demand">Demand-Based</option>
                        <option value="time">Time-Based</option>
                        <option value="competitor">Competitor-Linked</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Trigger Logic</label>
                      <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500" placeholder="e.g. Booking > 80%" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Action</label>
                      <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500" placeholder="e.g. +10% Price" />
                    </div>
                  </div>
                  <div className="flex justify-end gap-2">
                    <button onClick={() => setIsCreatingRule(false)} className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg">Cancel</button>
                    <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">Save Rule</button>
                  </div>
                </div>
              )}

              <div className="space-y-4">
                {RULES.map((rule) => (
                  <div key={rule.id} className="flex items-center justify-between p-4 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className={`p-2 rounded-lg ${
                        rule.type === 'demand' ? 'bg-orange-100 text-orange-600' :
                        rule.type === 'time' ? 'bg-blue-100 text-blue-600' :
                        'bg-purple-100 text-purple-600'
                      }`}>
                        {rule.type === 'demand' ? <TrendingUp size={20} /> :
                         rule.type === 'time' ? <Clock size={20} /> :
                         <Tag size={20} />}
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">{rule.name}</h4>
                        <p className="text-sm text-gray-500">{rule.logic} → <span className="font-medium text-indigo-600">{rule.action}</span></p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" checked={rule.active} readOnly />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                      </label>
                      <button className="text-gray-400 hover:text-red-500 transition-colors">
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "coupons" && (
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 text-center py-12">
              <div className="mx-auto w-12 h-12 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center mb-4">
                <Tag size={24} />
              </div>
              <h3 className="text-lg font-medium text-gray-900">Coupon Architect</h3>
              <p className="text-gray-500 mt-1 mb-6">Create and manage discount codes for your customers.</p>
              <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
                Create First Coupon
              </button>
            </div>
          )}
          
          {activeTab === "flash-sales" && (
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 text-center py-12">
              <div className="mx-auto w-12 h-12 bg-red-100 text-red-600 rounded-full flex items-center justify-center mb-4">
                <Clock size={24} />
              </div>
              <h3 className="text-lg font-medium text-gray-900">Flash Sales</h3>
              <p className="text-gray-500 mt-1 mb-6">Launch time-limited offers to boost sales immediately.</p>
              <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium">
                Start Flash Sale
              </button>
            </div>
          )}
        </div>

        {/* Sidebar Info */}
        <div className="space-y-6">
          <div className="bg-gradient-to-br from-indigo-600 to-purple-700 text-white rounded-xl p-6 shadow-lg">
            <h3 className="font-semibold text-lg mb-2">Pricing Impact</h3>
            <p className="text-indigo-100 text-sm mb-6">
              Your dynamic rules have generated an additional <span className="font-bold text-white">$12,450</span> in revenue this month.
            </p>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-indigo-200">Demand Pricing</span>
                <span className="font-medium">+$8,200</span>
              </div>
              <div className="w-full bg-indigo-800/50 rounded-full h-1.5">
                <div className="bg-white h-1.5 rounded-full" style={{ width: '65%' }}></div>
              </div>
              
              <div className="flex justify-between text-sm mt-2">
                <span className="text-indigo-200">Time-Based</span>
                <span className="font-medium">+$4,250</span>
              </div>
              <div className="w-full bg-indigo-800/50 rounded-full h-1.5">
                <div className="bg-white h-1.5 rounded-full" style={{ width: '35%' }}></div>
              </div>
            </div>
          </div>
          
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
            <h3 className="font-semibold text-gray-900 mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <button className="w-full text-left px-4 py-3 bg-gray-50 hover:bg-gray-100 rounded-lg text-sm font-medium text-gray-700 transition-colors flex items-center gap-3">
                <Clock size={16} className="text-gray-400" />
                Schedule Price Update
              </button>
              <button className="w-full text-left px-4 py-3 bg-gray-50 hover:bg-gray-100 rounded-lg text-sm font-medium text-gray-700 transition-colors flex items-center gap-3">
                <Save size={16} className="text-gray-400" />
                Export Pricing Logs
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
