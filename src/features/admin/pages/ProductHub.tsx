import { useState } from 'react';
import { 
  Filter, 
  MoreHorizontal, 
  Plus, 
  Search, 
  AlertCircle,
  Eye,
  EyeOff
} from 'lucide-react';
import { mockProducts } from '../data';
import { Product } from '../types';
import { StatusBadge } from '../components/StatusBadge';
import { clsx } from 'clsx';
import { toast } from 'sonner';

export default function ProductHub() {
  const [products, setProducts] = useState<Product[]>(mockProducts);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === 'all' || product.status === filter;
    return matchesSearch && matchesFilter;
  });

  const toggleStatus = (id: string, currentStatus: string) => {
    const newStatus = currentStatus === 'hidden' ? 'active' : 'hidden';
    setProducts(products.map(p => p.id === id ? { ...p, status: newStatus as any } : p));
    toast.success(`Product ${id} is now ${newStatus}`);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Product & Service Hub</h1>
          <p className="text-slate-500 mt-1">Manage physical inventory and service destinations.</p>
        </div>
        <button className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
          <Plus size={18} />
          Add New Item
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        {/* Toolbar */}
        <div className="p-4 border-b border-slate-200 flex flex-col sm:flex-row gap-4 justify-between items-center">
          <div className="relative w-full sm:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 h-5 w-5" />
            <input 
              type="text"
              placeholder="Search products, services..."
              className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Filter className="text-slate-500 h-5 w-5" />
            <select 
              className="bg-slate-50 border border-slate-300 text-slate-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="hidden">Hidden</option>
              <option value="out_of_stock">Out of Stock</option>
              <option value="pending_review">Pending Review</option>
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200">
            <thead className="bg-slate-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Product / Service
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Type
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Price
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Inventory / Tier
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-slate-200">
              {filteredProducts.map((product) => (
                <tr key={product.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-10 w-10 flex-shrink-0">
                        <img className="h-10 w-10 rounded-lg object-cover" src={product.image} alt="" />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-slate-900">{product.name}</div>
                        <div className="text-sm text-slate-500">ID: {product.id}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={clsx(
                      "px-2 inline-flex text-xs leading-5 font-semibold rounded-full",
                      product.category === 'physical' ? "bg-blue-100 text-blue-800" : "bg-purple-100 text-purple-800"
                    )}>
                      {product.category === 'physical' ? 'Physical' : 'Destination'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                    ₹{product.price.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <StatusBadge status={product.status} />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                    {product.category === 'physical' ? (
                      <span className={product.stock === 0 ? "text-red-500 font-medium" : ""}>
                        {product.stock} units
                      </span>
                    ) : (
                      <span className="capitalize">{product.tier || 'Standard'} Tier</span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end gap-2">
                      <button 
                        onClick={() => toggleStatus(product.id, product.status)}
                        className={clsx(
                          "p-1 rounded hover:bg-slate-200 transition-colors",
                          product.status === 'hidden' ? "text-slate-400" : "text-green-600"
                        )}
                        title={product.status === 'hidden' ? "Show Product" : "Hide Product"}
                      >
                        {product.status === 'hidden' ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                      <button className="p-1 text-slate-400 hover:text-indigo-600 hover:bg-slate-200 rounded transition-colors">
                        <MoreHorizontal size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Pagination (Mock) */}
        <div className="bg-white px-4 py-3 border-t border-slate-200 flex items-center justify-between sm:px-6">
          <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-slate-700">
                Showing <span className="font-medium">1</span> to <span className="font-medium">{filteredProducts.length}</span> of <span className="font-medium">{products.length}</span> results
              </p>
            </div>
            <div>
              <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                <button className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-slate-300 bg-white text-sm font-medium text-slate-500 hover:bg-slate-50">
                  Previous
                </button>
                <button className="relative inline-flex items-center px-4 py-2 border border-slate-300 bg-white text-sm font-medium text-slate-700 hover:bg-slate-50">
                  1
                </button>
                <button className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-slate-300 bg-white text-sm font-medium text-slate-500 hover:bg-slate-50">
                  Next
                </button>
              </nav>
            </div>
          </div>
        </div>
      </div>
      
      {/* Quick Actions Panel */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-2">
            <AlertCircle className="text-amber-600 h-6 w-6" />
            <h3 className="font-bold text-amber-900">Pending Reviews</h3>
          </div>
          <p className="text-amber-800 text-sm mb-4">
            3 products are waiting for approval before they can go live.
          </p>
          <button className="text-sm font-bold text-amber-700 hover:text-amber-900 underline">
            Review Queue &rarr;
          </button>
        </div>
      </div>
    </div>
  );
}
