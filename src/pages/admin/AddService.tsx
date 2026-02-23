import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, Plus, Sparkles, MapPin, Clock, User, Image as ImageIcon } from "lucide-react";
import { toast } from "sonner";
import api from "@/lib/api";

const AddService = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        category: "spa",
        price: "",
        description: "",
        duration: "60 min",
        location: "Premium Suite",
        specialist: "",
        image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&q=80&w=1000",
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            await api.post('/services', {
                ...formData,
                price: parseFloat(formData.price),
                rating: 5.0, // Default for new service
                reviews: 0,
                amenities: ["Luxury Robe", "Refreshments", "Private Shower"] // Default amenities
            });

            toast.success("Service added successfully!");
            navigate("/dashboard");
        } catch (error) {
            console.error(error);
            toast.error("Failed to create service");
            setIsLoading(false);
        }
    };

    const handleChange = (field: string, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
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
                        {/* Basic Info */}
                        <div className="grid gap-6 md:grid-cols-2">
                            <div className="space-y-2">
                                <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-raffine-gold ml-1">Service Name</label>
                                <input
                                    type="text"
                                    required
                                    value={formData.name}
                                    onChange={(e) => handleChange('name', e.target.value)}
                                    className="w-full rounded-xl border border-white/5 bg-white/5 px-4 py-4 text-sm text-white placeholder:text-gray-600 outline-none focus:border-raffine-gold/50 focus:bg-white/10 transition-all"
                                    placeholder="e.g. Royal Gold Facial"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-raffine-gold ml-1">Category</label>
                                <select
                                    value={formData.category}
                                    onChange={(e) => handleChange('category', e.target.value)}
                                    className="w-full rounded-xl border border-white/5 bg-white/5 px-4 py-4 text-sm text-white outline-none focus:border-raffine-gold/50 focus:bg-white/10 transition-all appearance-none cursor-pointer"
                                >
                                    <option value="spa" className="bg-[#2d161e]">Spa & Massage</option>
                                    <option value="hair" className="bg-[#2d161e]">Hair & Styling</option>
                                    <option value="fitness" className="bg-[#2d161e]">Fitness & Training</option>
                                    <option value="wellness" className="bg-[#2d161e]">Wellness & Healing</option>
                                </select>
                            </div>
                        </div>

                        {/* Price & Duration */}
                        <div className="grid gap-6 md:grid-cols-2">
                            <div className="space-y-2">
                                <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-raffine-gold ml-1">Price (₹)</label>
                                <input
                                    type="number"
                                    required
                                    value={formData.price}
                                    onChange={(e) => handleChange('price', e.target.value)}
                                    className="w-full rounded-xl border border-white/5 bg-white/5 px-4 py-4 text-sm text-white placeholder:text-gray-600 outline-none focus:border-raffine-gold/50 focus:bg-white/10 transition-all"
                                    placeholder="2500"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-raffine-gold ml-1">Duration</label>
                                <div className="relative">
                                    <Clock className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-gray-500" />
                                    <input
                                        type="text"
                                        required
                                        value={formData.duration}
                                        onChange={(e) => handleChange('duration', e.target.value)}
                                        className="w-full rounded-xl border border-white/5 bg-white/5 pl-10 pr-4 py-4 text-sm text-white placeholder:text-gray-600 outline-none focus:border-raffine-gold/50 focus:bg-white/10 transition-all"
                                        placeholder="60 min"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Location & Specialist */}
                        <div className="grid gap-6 md:grid-cols-2">
                            <div className="space-y-2">
                                <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-raffine-gold ml-1">Location</label>
                                <div className="relative">
                                    <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-gray-500" />
                                    <input
                                        type="text"
                                        required
                                        value={formData.location}
                                        onChange={(e) => handleChange('location', e.target.value)}
                                        className="w-full rounded-xl border border-white/5 bg-white/5 pl-10 pr-4 py-4 text-sm text-white placeholder:text-gray-600 outline-none focus:border-raffine-gold/50 focus:bg-white/10 transition-all"
                                        placeholder="Suite / Room"
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-raffine-gold ml-1">Specialist Name</label>
                                <div className="relative">
                                    <User className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-gray-500" />
                                    <input
                                        type="text"
                                        required
                                        value={formData.specialist}
                                        onChange={(e) => handleChange('specialist', e.target.value)}
                                        className="w-full rounded-xl border border-white/5 bg-white/5 pl-10 pr-4 py-4 text-sm text-white placeholder:text-gray-600 outline-none focus:border-raffine-gold/50 focus:bg-white/10 transition-all"
                                        placeholder="Name of Specialist"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Image URL */}
                        <div className="space-y-2">
                            <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-raffine-gold ml-1">Image URL</label>
                            <div className="relative">
                                <ImageIcon className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-gray-500" />
                                <input
                                    type="text"
                                    required
                                    value={formData.image}
                                    onChange={(e) => handleChange('image', e.target.value)}
                                    className="w-full rounded-xl border border-white/5 bg-white/5 pl-10 pr-4 py-4 text-sm text-white placeholder:text-gray-600 outline-none focus:border-raffine-gold/50 focus:bg-white/10 transition-all"
                                    placeholder="https://..."
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-raffine-gold ml-1">Description</label>
                            <textarea
                                required
                                rows={4}
                                value={formData.description}
                                onChange={(e) => handleChange('description', e.target.value)}
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
