import { useState, useEffect, useCallback } from "react";
import { Search, Plus, Edit, Trash2, Image as ImageIcon, ArrowUpDown, X, Loader2 } from "lucide-react";
import { getProducts, createProduct, updateProduct, deleteProduct } from "../services/adminAPI";
import Toast from "../components/Toast";

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

const blankProduct: Omit<Product, 'id' | 'lastUpdated' | 'image'> = {
  name: '',
  category: 'Physical Product',
  type: 'product',
  price: 0,
  stock: 0,
  status: 'active',
};

const statusColors: Record<ProductStatus, { bg: string; text: string; label: string }> = {
  'active': { bg: 'bg-green-50', text: 'text-green-700', label: 'Active' },
  'hidden': { bg: 'bg-gray-50', text: 'text-gray-700', label: 'Hidden' },
  'out-of-stock': { bg: 'bg-red-50', text: 'text-red-700', label: 'Out of Stock' },
  'pending': { bg: 'bg-yellow-50', text: 'text-yellow-700', label: 'Pending Review' },
};

const MOCK_PRODUCTS: Product[] = [
  { id: '1', name: 'Luxury Watch Collection', category: 'Physical Product', type: 'product', price: 2499, stock: 45, status: 'active', image: 'watch', lastUpdated: '2 hours ago' },
  { id: '2', name: 'Paris Premium Package', category: 'Destination', type: 'destination', price: 1899, stock: 120, status: 'active', image: 'paris', lastUpdated: '5 hours ago' },
  { id: '3', name: 'Photography Service', category: 'Service', type: 'service', price: 499, stock: 0, status: 'active', image: 'camera', lastUpdated: '1 day ago' },
  { id: '4', name: 'Designer Handbag', category: 'Physical Product', type: 'product', price: 899, stock: 0, status: 'out-of-stock', image: 'handbag', lastUpdated: '2 days ago' },
  { id: '5', name: 'Tokyo Adventure Tour', category: 'Destination', type: 'destination', price: 2199, stock: 85, status: 'active', image: 'tokyo', lastUpdated: '3 hours ago' },
];

export default function ProductManager() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'name' | 'price' | 'stock'>('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newProduct, setNewProduct] = useState({ ...blankProduct });
  const [isSaving, setIsSaving] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  const showToast = (message: string, type: 'success' | 'error') => {
    setToast({ message, type });
  };

  const fetchProducts = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await getProducts();
      setProducts(data);
    } catch {
      setProducts(MOCK_PRODUCTS);
      setError('Could not reach backend – showing demo data.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => { fetchProducts(); }, [fetchProducts]);

  const filteredProducts = products
    .filter(p => {
      const matchesStatus = selectedStatus === 'all' || p.status === selectedStatus;
      const matchesType = selectedType === 'all' || p.type === selectedType;
      const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesStatus && matchesType && matchesSearch;
    })
    .sort((a, b) => {
      let cmp = 0;
      if (sortBy === 'name') cmp = a.name.localeCompare(b.name);
      else if (sortBy === 'price') cmp = a.price - b.price;
      else if (sortBy === 'stock') cmp = a.stock - b.stock;
      return sortOrder === 'asc' ? cmp : -cmp;
    });

  const handleToggleStatus = async (product: Product) => {
    const newStatus: ProductStatus = product.status === 'active' ? 'hidden' : 'active';
    const optimistic = products.map(p => p.id === product.id ? { ...p, status: newStatus } : p);
    setProducts(optimistic);
    try {
      await updateProduct(product.id, { status: newStatus });
      showToast(`Product ${newStatus === 'active' ? 'activated' : 'hidden'} successfully.`, 'success');
    } catch {
      setProducts(products); // rollback
      showToast('Failed to update status.', 'error');
    }
  };

  const handleSaveEdit = async () => {
    if (!editingProduct) return;
    setIsSaving(true);
    try {
      await updateProduct(editingProduct.id, editingProduct);
      setProducts(products.map(p => p.id === editingProduct.id ? { ...editingProduct, lastUpdated: 'Just now' } : p));
      setEditingProduct(null);
      showToast('Product updated successfully.', 'success');
    } catch {
      showToast('Failed to update product.', 'error');
    } finally {
      setIsSaving(false);
    }
  };

  const handleAddProduct = async () => {
    if (!newProduct.name.trim()) { showToast('Product name is required.', 'error'); return; }
    if (newProduct.price <= 0) { showToast('Price must be greater than 0.', 'error'); return; }
    setIsSaving(true);
    try {
      const created = await createProduct(newProduct);
      setProducts(prev => [{ ...newProduct, id: created?.id || String(Date.now()), image: '', lastUpdated: 'Just now' }, ...prev]);
      setIsAddModalOpen(false);
      setNewProduct({ ...blankProduct });
      showToast('Product created successfully.', 'success');
    } catch {
      // Optimistic fallback for demo
      setProducts(prev => [{ ...newProduct, id: String(Date.now()), image: '', lastUpdated: 'Just now' }, ...prev]);
      setIsAddModalOpen(false);
      setNewProduct({ ...blankProduct });
      showToast('Product saved (offline mode).', 'success');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    setDeleteConfirm(null);
    try {
      await deleteProduct(id);
      setProducts(prev => prev.filter(p => p.id !== id));
      showToast('Product deleted.', 'success');
    } catch {
      setProducts(prev => prev.filter(p => p.id !== id));
      showToast('Product removed (offline mode).', 'success');
    }
  };

  return (
    <div className="space-y-6">
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

      {/* Delete Confirmation Modal */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-sm w-full mx-4 shadow-xl">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Delete Product?</h3>
            <p className="text-sm text-gray-600 mb-6">This action cannot be undone.</p>
            <div className="flex gap-3 justify-end">
              <button onClick={() => setDeleteConfirm(null)} className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm">Cancel</button>
              <button onClick={() => handleDelete(deleteConfirm)} className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 text-sm">Delete</button>
            </div>
          </div>
        </div>
      )}

      {/* Add Product Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-gray-500/75 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4 shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold text-gray-900">Add New Product</h3>
              <button onClick={() => setIsAddModalOpen(false)} className="p-1 hover:bg-gray-100 rounded"><X className="w-5 h-5 text-gray-400" /></button>
            </div>
            <div className="space-y-4">
              {[
                { label: 'Name', field: 'name', type: 'text' },
                { label: 'Category', field: 'category', type: 'text' },
                { label: 'Price ($)', field: 'price', type: 'number' },
                { label: 'Stock / Capacity', field: 'stock', type: 'number' },
              ].map(({ label, field, type }) => (
                <div key={field}>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
                  <input type={type} value={(newProduct as any)[field]}
                    onChange={e => setNewProduct({ ...newProduct, [field]: type === 'number' ? Number(e.target.value) : e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
              ))}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                <select value={newProduct.type} onChange={e => setNewProduct({ ...newProduct, type: e.target.value as ProductType })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option value="product">Product</option>
                  <option value="service">Service</option>
                  <option value="destination">Destination</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select value={newProduct.status} onChange={e => setNewProduct({ ...newProduct, status: e.target.value as ProductStatus })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option value="active">Active</option>
                  <option value="hidden">Hidden</option>
                  <option value="pending">Pending Review</option>
                </select>
              </div>
            </div>
            <div className="mt-6 flex justify-end gap-3">
              <button onClick={() => setIsAddModalOpen(false)} className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200">Cancel</button>
              <button onClick={handleAddProduct} disabled={isSaving} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-60 flex items-center gap-2">
                {isSaving && <Loader2 className="w-4 h-4 animate-spin" />} Add Product
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Product Modal */}
      {editingProduct && (
        <div className="fixed inset-0 bg-gray-500/75 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4 shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold text-gray-900">Edit Product</h3>
              <button onClick={() => setEditingProduct(null)} className="p-1 hover:bg-gray-100 rounded"><X className="w-5 h-5 text-gray-400" /></button>
            </div>
            <div className="space-y-4">
              {[
                { label: 'Name', field: 'name', type: 'text' },
                { label: 'Category', field: 'category', type: 'text' },
                { label: 'Price ($)', field: 'price', type: 'number' },
                { label: 'Stock / Capacity', field: 'stock', type: 'number' },
              ].map(({ label, field, type }) => (
                <div key={field}>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
                  <input type={type} value={(editingProduct as any)[field]}
                    onChange={e => setEditingProduct({ ...editingProduct, [field]: type === 'number' ? Number(e.target.value) : e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
              ))}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select value={editingProduct.status} onChange={e => setEditingProduct({ ...editingProduct, status: e.target.value as ProductStatus })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option value="active">Active</option>
                  <option value="hidden">Hidden</option>
                  <option value="out-of-stock">Out of Stock</option>
                  <option value="pending">Pending Review</option>
                </select>
              </div>
            </div>
            <div className="mt-6 flex justify-end gap-3">
              <button onClick={() => setEditingProduct(null)} className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200">Cancel</button>
              <button onClick={handleSaveEdit} disabled={isSaving} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-60 flex items-center gap-2">
                {isSaving && <Loader2 className="w-4 h-4 animate-spin" />} Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900">Product & Service Hub</h2>
          <p className="text-gray-600 mt-1">Manage your inventory of products and destinations</p>
        </div>
        <div className="flex gap-2">
          <button onClick={fetchProducts} className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm">Refresh</button>
          <button onClick={() => setIsAddModalOpen(true)} className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            <Plus className="w-5 h-5" /> Add Product
          </button>
        </div>
      </div>

      {/* Error Banner */}
      {error && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg px-4 py-3 text-sm text-yellow-800">
          ⚠️ {error}
        </div>
      )}

      {/* Type Filter Tabs */}
      <div className="bg-white rounded-lg border border-gray-200 p-2">
        <div className="flex flex-wrap gap-2">
          {(['all', 'product', 'service', 'destination'] as const).map(type => (
            <button key={type} onClick={() => setSelectedType(type)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${selectedType === type ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:bg-gray-100'}`}>
              {type === 'all' ? `All Items (${products.length})` : `${type.charAt(0).toUpperCase() + type.slice(1)}s (${products.filter(p => p.type === type).length})`}
            </button>
          ))}
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input type="text" placeholder="Search products..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <div className="flex gap-2">
            <select value={selectedStatus} onChange={e => setSelectedStatus(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="hidden">Hidden</option>
              <option value="out-of-stock">Out of Stock</option>
              <option value="pending">Pending Review</option>
            </select>
            <select value={sortBy} onChange={e => setSortBy(e.target.value as any)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="name">Sort by Name</option>
              <option value="price">Sort by Price</option>
              <option value="stock">Sort by Stock</option>
            </select>
            <button onClick={() => setSortOrder(o => o === 'asc' ? 'desc' : 'asc')}
              className="inline-flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
              <ArrowUpDown className="w-5 h-5" /> {sortOrder.toUpperCase()}
            </button>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
            <span className="ml-3 text-gray-500">Loading products...</span>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  {['Product', 'Category', 'Price', 'Stock', 'Status', 'Visibility', 'Actions'].map(h => (
                    <th key={h} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredProducts.length === 0 ? (
                  <tr><td colSpan={7} className="px-6 py-12 text-center text-gray-500">No products found.</td></tr>
                ) : filteredProducts.map(product => (
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
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{product.category}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">${product.price.toLocaleString()}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      {product.category === 'Service' ? 'Unlimited' : product.stock}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColors[product.status].bg} ${statusColors[product.status].text}`}>
                        {statusColors[product.status].label}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button onClick={() => handleToggleStatus(product)}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${product.status === 'active' ? 'bg-green-500' : 'bg-gray-300'}`}>
                        <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${product.status === 'active' ? 'translate-x-6' : 'translate-x-1'}`} />
                      </button>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <button onClick={() => setEditingProduct({ ...product })} className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button onClick={() => setDeleteConfirm(product.id)} className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}