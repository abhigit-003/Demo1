import Editorial from "@/components/raffine/Editorial";

const EditorialPage = () => {
    return (
        <div className="pb-20">
            <div className="pt-12 pb-6 px-6 max-w-7xl mx-auto text-center">
                <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">The Journal</h1>
                <p className="text-white/60 max-w-2xl mx-auto italic">
                    Establishing rituals that ground and restore.
                </p>
            </div>
            <Editorial />
            <div className="py-20 px-6 max-w-7xl mx-auto grid md:grid-cols-2 gap-12 text-white">
                <div className="space-y-6">
                    <div className="aspect-video bg-surface rounded-3xl overflow-hidden">
                        <img src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80" alt="Meditation" className="w-full h-full object-cover opacity-80 hover:scale-105 transition-transform duration-700" />
                    </div>
                    <h3 className="text-2xl font-semibold">The Morning Mindfulness Ritual</h3>
                    <p className="text-white/60">Discover how five minutes of intentional breathing can transform your entire day.</p>
                    <button className="text-raffine-pink font-bold tracking-widest uppercase text-xs">Read More</button>
                </div>
                <div className="space-y-6">
                    <div className="aspect-video bg-surface rounded-3xl overflow-hidden">
                        <img src="https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&q=80" alt="Skincare" className="w-full h-full object-cover opacity-80 hover:scale-105 transition-transform duration-700" />
                    </div>
                    <h3 className="text-2xl font-semibold">Seasonal Skincare Transitions</h3>
                    <p className="text-white/60">Adapting your beauty routine for the changing elements: A guide to hydration.</p>
                    <button className="text-raffine-pink font-bold tracking-widest uppercase text-xs">Read More</button>
                </div>
            </div>
        </div>
    );
};

export default EditorialPage;
