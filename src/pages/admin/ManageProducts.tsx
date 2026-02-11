import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, Edit, Trash2, Package, Search } from "lucide-react";
import { toast } from "sonner";

const initialProducts = [
    { id: "1", name: "Midnight Radiance Oil", category: "Skincare", price: "2,450" },
    { id: "2", name: "Sculpting Stone Roller", category: "Accessories", price: "1,850" },
    { id: "3", name: "Silk Sleeping Mask", category: "Lifestyle", price: "1,200" },
    { id: "4", name: "Velvet Body Butter", category: "Body Care", price: "3,100" },
];

const ManageProducts = () => {
    const navigate = useNavigate();
    const [products, setProducts] = useState(() => {
        const saved = localStorage.getItem("raffine_managed_products");
        return saved ? JSON.parse(saved) : initialProducts;
    });
    const [searchTerm, setSearchTerm] = useState("");

    const handleDelete = (id: string) => {
        const updated = products.filter((p: any) => p.id !== id);
        setProducts(updated);
        localStorage.setItem("raffine_managed_products", JSON.stringify(updated));
        toast.success("Product removed from collection");
    };

    const filtered = products.filter((p: any) =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="pb-20">
            <div className="mx-auto max-w-5xl px-6 py-12">
                <button
                    onClick={() => navigate(-1)}
                    className="group mb-8 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gray-500 hover:text-white transition-colors"
                >
                    <ChevronLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
                    Back to Dashboard
                </button>

                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                    <div>
                        <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-raffine-pink/10 text-raffine-pink mb-4">
                            <Package className="h-6 w-6" />
                        </div>
                        <h1 className="text-3xl font-bold text-white uppercase tracking-widest">Manage Products</h1>
                        <p className="mt-2 text-gray-400">Curate your inventory of luxury essentials</p>
                    </div>

                    <div className="relative max-w-xs w-full">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                        <input
                            type="text"
                            placeholder="Search products..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-11 pr-4 text-sm text-white focus:border-raffine-gold/50 outline-none transition-all"
                        />
                    </div>
                </div>

                <div className="rounded-3xl border border-white/10 bg-white/5 overflow-hidden backdrop-blur-xl shadow-2xl">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-white/10">
                                    <th className="px-6 py-5 text-[10px] font-bold uppercase tracking-[0.2em] text-raffine-gold">Product</th>
                                    <th className="px-6 py-5 text-[10px] font-bold uppercase tracking-[0.2em] text-raffine-gold">Category</th>
                                    <th className="px-6 py-5 text-[10px] font-bold uppercase tracking-[0.2em] text-raffine-gold">Price</th>
                                    <th className="px-6 py-5 text-[10px] font-bold uppercase tracking-[0.2em] text-raffine-gold text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                {filtered.map((product: any) => (
                                    <tr key={product.id} className="group hover:bg-white/5 transition-colors">
                                        <td className="px-6 py-5">
                                            <div className="flex items-center gap-3">
                                                <div className="h-10 w-10 rounded-lg bg-white/10 flex items-center justify-center text-raffine-gold">
                                                    <Package className="h-5 w-5 opacity-50" />
                                                </div>
                                                <span className="text-sm font-bold text-white">{product.name}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-5">
                                            <span className="px-3 py-1 rounded-full bg-white/5 text-[10px] font-bold uppercase tracking-widest text-gray-400 border border-white/10">
                                                {product.category}
                                            </span>
                                        </td>
                                        <td className="px-6 py-5 text-sm font-black text-raffine-gold">₹{product.price}</td>
                                        <td className="px-6 py-5 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <button className="h-9 w-9 flex items-center justify-center rounded-lg bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 transition-all">
                                                    <Edit className="h-4 w-4" />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(product.id)}
                                                    className="h-9 w-9 flex items-center justify-center rounded-lg bg-white/5 text-gray-600 hover:text-raffine-pink hover:bg-raffine-pink/10 transition-all"
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                {filtered.length === 0 && (
                                    <tr>
                                        <td colSpan={4} className="px-6 py-20 text-center">
                                            <p className="text-gray-500 italic">No products found in your curation.</p>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ManageProducts;
