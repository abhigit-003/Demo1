import { useState } from "react";
import { Search, Filter, Plus, MoreVertical, Edit, Trash2, Image as ImageIcon, ArrowUpDown, X } from "lucide-react";

type ProductStatus = 'active' | 'hidden' | 'out-of-stock' | 'pending';
type ProductType = 'product' | 'service' | 'destination';

interface Product {
  id: string;
  name: string;
  category: string;
  type: ProductType;
  price: number;
  stock: number;
  status: ProductStatus;
  image: string;
  lastUpdated: string;
}

const mockProducts: Product[] = [
  { id: '1', name: 'Luxury Watch Collection', category: 'Physical Product', type: 'product', price: 2499, stock: 45, status: 'active', image: 'watch', lastUpdated: '2 hours ago' },
  { id: '2', name: 'Paris Premium Package', category: 'Destination', type: 'destination', price: 1899, stock: 120, status: 'active', image: 'paris', lastUpdated: '5 hours ago' },
  { id: '3', name: 'Photography Service', category: 'Service', type: 'service', price: 499, stock: 0, status: 'active', image: 'camera', lastUpdated: '1 day ago' },
  { id: '4', name: 'Designer Handbag', category: 'Physical Product', type: 'product', price: 899, stock: 0, status: 'out-of-stock', image: 'handbag', lastUpdated: '2 days ago' },
  { id: '5', name: 'Tokyo Adventure Tour', category: 'Destination', type: 'destination', price: 2199, stock: 85, status: 'active', image: 'tokyo', lastUpdated: '3 hours ago' },
  { id: '6', name: 'Consulting Package', category: 'Service', type: 'service', price: 1299, stock: 0, status: 'pending', image: 'consulting', lastUpdated: '1 hour ago' },
  { id: '7', name: 'Smart Home Device', category: 'Physical Product', type: 'product', price: 399, stock: 156, status: 'active', image: 'smart-home', lastUpdated: '4 hours ago' },
  { id: '8', name: 'Bali Retreat', category: 'Destination', type: 'destination', price: 1599, stock: 45, status: 'hidden', image: 'bali', lastUpdated: '6 hours ago' },
];

const statusColors: Record<ProductStatus, { bg: string; text: string; label: string }> = {
  'active': { bg: 'bg-green-50', text: 'text-green-700', label: 'Active' },
  'hidden': { bg: 'bg-gray-50', text: 'text-gray-700', label: 'Hidden' },
  'out-of-stock': { bg: 'bg-red-50', text: 'text-red-700', label: 'Out of Stock' },
  'pending': { bg: 'bg-yellow-50', text: 'text-yellow-700', label: 'Pending Review' },
};

export default function ProductManager() {
  const [products, setProducts] = useState<Product[]>(mockProducts);
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'name' | 'price' | 'stock' | 'updated'>('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const filteredProducts = products.filter(product => {
    const matchesStatus = selectedStatus === 'all' || product.status === selectedStatus;
    const matchesType = selectedType === 'all' || product.type === selectedType;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesType && matchesSearch;
  }).sort((a, b) => {
    let comparison = 0;
    
    switch (sortBy) {
      case 'name':
        comparison = a.name.localeCompare(b.name);
        break;
      case 'price':
        comparison = a.price - b.price;
        break;
      case 'stock':
        comparison = a.stock - b.stock;
        break;
      case 'updated':
        // Simple comparison for demo purposes
        comparison = a.lastUpdated.localeCompare(b.lastUpdated);
        break;
    }
    
    return sortOrder === 'asc' ? comparison : -comparison;
  });

  const toggleProductStatus = (id: string) => {
    setProducts(products.map(p => 
      p.id === id 
        ? { ...p, status: p.status === 'active' ? 'hidden' : 'active' }
        : p
    ));
  };

  const handleSort = (field: 'name' | 'price' | 'stock' | 'updated') => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('asc');
    }
  };

  const handleEditClick = (product: Product) => {
    setEditingProduct({ ...product });
    setIsEditModalOpen(true);
  };

  const handleEditChange = (field: keyof Product, value: any) => {
    if (editingProduct) {
      setEditingProduct({
        ...editingProduct,
        [field]: value
      });
    }
  };

  const handleSaveEdit = () => {
    if (editingProduct) {
      setProducts(products.map(p => 
        p.id === editingProduct.id ? { ...editingProduct, lastUpdated: 'Just now' } : p
      ));
      setIsEditModalOpen(false);
      setEditingProduct(null);
    }
  };

  const handleCancelEdit = () => {
    setIsEditModalOpen(false);
    setEditingProduct(null);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900">Product & Service Hub</h2>
          <p className="text-gray-600 mt-1">Manage your inventory of products and destinations</p>
        </div>
        <button className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          <Plus className="w-5 h-5" />
          Add Product
        </button>
      </div>

      {/* Type Filter Tabs */}
      <div className="bg-white rounded-lg border border-gray-200 p-2">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedType('all')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              selectedType === 'all'
                ? 'bg-blue-100 text-blue-700'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            All Items ({products.length})
          </button>
          <button
            onClick={() => setSelectedType('product')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              selectedType === 'product'
                ? 'bg-blue-100 text-blue-700'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            Products ({products.filter(p => p.type === 'product').length})
          </button>
          <button
            onClick={() => setSelectedType('service')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              selectedType === 'service'
                ? 'bg-purple-100 text-purple-700'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            Services ({products.filter(p => p.type === 'service').length})
          </button>
          <button
            onClick={() => setSelectedType('destination')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              selectedType === 'destination'
                ? 'bg-green-100 text-green-700'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            Destinations ({products.filter(p => p.type === 'destination').length})
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search products, services, destinations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div className="flex gap-2">
            <select 
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="hidden">Hidden</option>
              <option value="out-of-stock">Out of Stock</option>
              <option value="pending">Pending Review</option>
            </select>
            
            <select 
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="name">Sort by Name</option>
              <option value="price">Sort by Price</option>
              <option value="stock">Sort by Stock</option>
              <option value="updated">Sort by Updated</option>
            </select>

            <button 
              onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
              className="inline-flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <ArrowUpDown className="w-5 h-5" />
              {sortOrder === 'asc' ? 'Asc' : 'Desc'}
            </button>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <p className="text-sm text-gray-600">Showing Results</p>
          <p className="text-2xl font-semibold text-gray-900 mt-1">{filteredProducts.length}</p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <p className="text-sm text-gray-600">Active</p>
          <p className="text-2xl font-semibold text-green-600 mt-1">
            {filteredProducts.filter(p => p.status === 'active').length}
          </p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <p className="text-sm text-gray-600">Out of Stock</p>
          <p className="text-2xl font-semibold text-red-600 mt-1">
            {filteredProducts.filter(p => p.status === 'out-of-stock').length}
          </p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <p className="text-sm text-gray-600">Pending Review</p>
          <p className="text-2xl font-semibold text-yellow-600 mt-1">
            {filteredProducts.filter(p => p.status === 'pending').length}
          </p>
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Product
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Price
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Stock/Capacity
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Regulation
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredProducts.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                        <ImageIcon className="w-5 h-5 text-gray-400" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">{product.name}</p>
                        <p className="text-xs text-gray-500">Updated {product.lastUpdated}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-gray-700">{product.category}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm font-medium text-gray-900">${product.price}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-gray-700">
                      {product.category === 'Service' ? 'Unlimited' : product.stock}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColors[product.status].bg} ${statusColors[product.status].text}`}>
                      {statusColors[product.status].label}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={() => toggleProductStatus(product.id)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        product.status === 'active' ? 'bg-green-500' : 'bg-gray-300'
                      }`}
                    >
                      <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        product.status === 'active' ? 'translate-x-6' : 'translate-x-1'
                      }`} />
                    </button>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <button 
                        onClick={() => handleEditClick(product)}
                        className="p-1 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded">
                        <MoreVertical className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit Modal */}
      {isEditModalOpen && editingProduct && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4 shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold text-gray-900">Edit Product</h3>
              <button className="p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded" onClick={handleCancelEdit}>
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input
                  type="text"
                  value={editingProduct.name}
                  onChange={(e) => handleEditChange('name', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <input
                  type="text"
                  value={editingProduct.category}
                  onChange={(e) => handleEditChange('category', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Price</label>
                <input
                  type="number"
                  value={editingProduct.price}
                  onChange={(e) => handleEditChange('price', parseFloat(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Stock/Capacity</label>
                <input
                  type="number"
                  value={editingProduct.stock}
                  onChange={(e) => handleEditChange('stock', parseInt(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select
                  value={editingProduct.status}
                  onChange={(e) => handleEditChange('status', e.target.value as ProductStatus)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="active">Active</option>
                  <option value="hidden">Hidden</option>
                  <option value="out-of-stock">Out of Stock</option>
                  <option value="pending">Pending Review</option>
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