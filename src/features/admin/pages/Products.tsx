import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  MoreHorizontal, 
  Eye, 
  EyeOff, 
  Edit2, 
  Trash2,
  Plus
} from 'lucide-react';
import { clsx } from 'clsx';
import { motion, AnimatePresence } from 'motion/react';

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  status: 'Active' | 'Hidden' | 'Out of Stock' | 'Pending Review';
  image: string;
}

const MOCK_PRODUCTS: Product[] = [
  { id: '1', name: 'Premium Paris Tour', category: 'Destination', price: 1200, stock: 45, status: 'Active', image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&q=80&w=100' },
  { id: '2', name: 'Tokyo Food Walk', category: 'Service', price: 150, stock: 12, status: 'Pending Review', image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&q=80&w=100' },
  { id: '3', name: 'Swiss Alps Ski Pass', category: 'Destination', price: 450, stock: 0, status: 'Out of Stock', image: 'https://images.unsplash.com/photo-1551009175-8a68da93d5f9?auto=format&fit=crop&q=80&w=100' },
  { id: '4', name: 'Bali Villa Retreat', category: 'Destination', price: 2500, stock: 5, status: 'Hidden', image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&q=80&w=100' },
  { id: '5', name: 'NYC Helicopter Ride', category: 'Service', price: 300, stock: 20, status: 'Active', image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&q=80&w=100' },
];

export function ProductsPage() {
  const [products, setProducts] = useState(MOCK_PRODUCTS);
  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');

  const toggleStatus = (id: string) => {
    setProducts(products.map(p => {
      if (p.id === id) {
        return { 
          ...p, 
          status: p.status === 'Hidden' ? 'Active' : 'Hidden' 
        };
      }
      return p;
    }));
  };

  const filteredProducts = products.filter(p => {
    const matchesFilter = filter === 'All' || p.status === filter;
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Product & Service Hub</h1>
          <p className="text-gray-500 mt-1">Manage your inventory, services, and destinations.</p>
        </div>
        <button className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
          <Plus className="h-4 w-4 mr-2" />
          Add New Product
        </button>
      </div>

      <div className="bg-white shadow-sm rounded-lg border border-gray-200 overflow-hidden">
        <div className="p-4 border-b border-gray-200 flex flex-col sm:flex-row gap-4 justify-between items-center">
          <div className="relative w-full sm:w-64">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Search inventory..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          
          <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto">
            {['All', 'Active', 'Hidden', 'Out of Stock', 'Pending Review'].map((status) => (
              <button
                key={status}
                onClick={() => setFilter(status)}
                className={clsx(
                  "px-3 py-1.5 text-sm font-medium rounded-full whitespace-nowrap transition-colors",
                  filter === status
                    ? "bg-indigo-100 text-indigo-700"
                    : "text-gray-600 hover:bg-gray-100"
                )}
              >
                {status}
              </button>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <AnimatePresence>
                {filteredProducts.map((product) => (
                  <motion.tr 
                    key={product.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-10 w-10 flex-shrink-0">
                          <img className="h-10 w-10 rounded-md object-cover" src={product.image} alt="" />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{product.name}</div>
                          <div className="text-sm text-gray-500">ID: {product.id}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{product.category}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">₹{product.price.toLocaleString()}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={clsx(
                        "px-2 inline-flex text-xs leading-5 font-semibold rounded-full",
                        product.status === 'Active' ? "bg-green-100 text-green-800" :
                        product.status === 'Hidden' ? "bg-gray-100 text-gray-800" :
                        product.status === 'Out of Stock' ? "bg-red-100 text-red-800" :
                        "bg-yellow-100 text-yellow-800"
                      )}>
                        {product.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center justify-end gap-2">
                        <button 
                          onClick={() => toggleStatus(product.id)}
                          className={clsx(
                            "p-1 rounded-md hover:bg-gray-100 transition-colors",
                            product.status === 'Hidden' ? "text-gray-400" : "text-indigo-600"
                          )}
                          title={product.status === 'Hidden' ? "Show Product" : "Hide Product"}
                        >
                          {product.status === 'Hidden' ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                        <button className="p-1 rounded-md text-gray-400 hover:text-indigo-600 hover:bg-gray-100 transition-colors">
                          <Edit2 className="h-4 w-4" />
                        </button>
                        <button className="p-1 rounded-md text-gray-400 hover:text-red-600 hover:bg-gray-100 transition-colors">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
          {filteredProducts.length === 0 && (
            <div className="p-8 text-center text-gray-500">
              No products found matching your criteria.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
