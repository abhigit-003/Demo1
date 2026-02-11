import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, Plus, Sparkles } from "lucide-react";
import { toast } from "sonner";

const AddService = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        category: "spa",
        price: "",
        description: "",
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        // Simulate API call
        setTimeout(() => {
            const existingServices = JSON.parse(localStorage.getItem("raffine_custom_services") || "[]");
            const newService = {
                ...formData,
                id: Date.now().toString(),
                rating: "5.0",
                reviews: "0",
                duration: "60 min",
                location: "Premium Suite"
            };

            localStorage.setItem("raffine_custom_services", JSON.stringify([...existingServices, newService]));

            toast.success("Service added successfully!");
            setIsLoading(false);
            navigate("/dashboard");
        }, 1000);
    };

    return (
        <div className="pb-20">
            <div className="mx-auto max-w-3xl px-6 py-12">
                <button
                    onClick={() => navigate(-1)}
                    className="group mb-8 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gray-500 hover:text-white transition-colors"
                >
                    <ChevronLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
                    Back to Dashboard
                </button>

                <div className="text-center mb-12">
                    <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-raffine-pink/10 text-raffine-pink mb-4">
                        <Plus className="h-6 w-6" />
                    </div>
                    <h1 className="text-3xl font-bold text-white uppercase tracking-widest">Add New Service</h1>
                    <p className="mt-2 text-gray-400">Expand the Raffine luxury collection</p>
                </div>

                <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl shadow-2xl relative overflow-hidden">
                    <div className="absolute -top-24 -right-24 h-48 w-48 bg-raffine-pink/5 rounded-full blur-3xl text-white" />

                    <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                        <div className="grid gap-6 md:grid-cols-2">
                            <div className="space-y-2">
                                <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-raffine-gold ml-1">Service Name</label>
                                <input
                                    type="text"
                                    required
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full rounded-xl border border-white/5 bg-white/5 px-4 py-4 text-sm text-white placeholder:text-gray-600 outline-none focus:border-raffine-gold/50 focus:bg-white/10 transition-all"
                                    placeholder="e.g. Royal Gold Facial"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-raffine-gold ml-1">Category</label>
                                <select
                                    value={formData.category}
                                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                    className="w-full rounded-xl border border-white/5 bg-white/5 px-4 py-4 text-sm text-white outline-none focus:border-raffine-gold/50 focus:bg-white/10 transition-all appearance-none cursor-pointer"
                                >
                                    <option value="spa" className="bg-[#2d161e]">Spa & Massage</option>
                                    <option value="hair" className="bg-[#2d161e]">Hair & Styling</option>
                                    <option value="fitness" className="bg-[#2d161e]">Fitness & Training</option>
                                    <option value="wellness" className="bg-[#2d161e]">Wellness & Healing</option>
                                </select>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-raffine-gold ml-1">Price (₹)</label>
                            <input
                                type="number"
                                required
                                value={formData.price}
                                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                                className="w-full rounded-xl border border-white/5 bg-white/5 px-4 py-4 text-sm text-white placeholder:text-gray-600 outline-none focus:border-raffine-gold/50 focus:bg-white/10 transition-all"
                                placeholder="2500"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-raffine-gold ml-1">Description</label>
                            <textarea
                                required
                                rows={4}
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                className="w-full rounded-xl border border-white/5 bg-white/5 px-4 py-4 text-sm text-white placeholder:text-gray-600 outline-none focus:border-raffine-gold/50 focus:bg-white/10 transition-all resize-none"
                                placeholder="Describe the luxury experience..."
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="group relative w-full overflow-hidden rounded-xl bg-raffine-pink py-4 text-xs font-bold uppercase tracking-[0.2em] text-white transition-all hover:shadow-[0_0_20px_rgba(238,43,108,0.4)] active:scale-[0.98] disabled:opacity-70 mt-4"
                        >
                            <span className="relative z-10 flex items-center justify-center gap-2">
                                {isLoading ? "Publishing..." : "Create Service"}
                                {!isLoading && <Sparkles className="h-4 w-4" />}
                            </span>
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddService;
