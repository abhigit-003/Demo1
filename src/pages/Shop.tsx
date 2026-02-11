import FeaturedProducts from "@/components/landing/FeaturedProducts";

const Shop = () => {
    return (
        <div className="pb-20">
            <div className="pt-12 pb-6 px-6 max-w-7xl mx-auto text-center">
                <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">The Collection</h1>
                <p className="text-white/60 max-w-2xl mx-auto italic">
                    Curated beauty essentials and high-performance skincare.
                </p>
            </div>
            <FeaturedProducts />
        </div>
    );
};

export default Shop;
