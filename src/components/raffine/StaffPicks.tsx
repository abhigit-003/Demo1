import { ArrowRight, ShoppingCart, Heart } from "lucide-react";
import { Link } from "react-router-dom";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { toast } from "sonner";
import { useProducts } from "@/hooks/useProducts";
import { Product } from "@/data/mockData";

const StaffPicks = () => {
    const { addItem } = useCart();
    const { isInWishlist, addToWishlist, removeFromWishlist } = useWishlist();
    const { data: products, isLoading } = useProducts(4);

    const handleAddToCart = (product: Product) => {
        addItem({
            id: product.id,
            name: product.name,
            price: product.price,
            type: "product"
        });
        toast.success(`${product.name} added to cart!`);
    };

    if (isLoading) return <div className="text-white text-center py-20">Loading staff picks...</div>;

    // Use products if available, otherwise fallback (or return null)
    // Ideally we shouldn't fallback to hardcoded if API fails, but user might want something displayed.
    // Given the task is to make it dynamic, I'll rely on API.

    return (
        <section id="products" className="py-16 md:py-24 px-4 md:px-10 max-w-[1440px] mx-auto">
            <div className="flex items-end justify-between mb-10 px-2">
                <div>
                    <span className="text-raffine-gold text-xs font-bold tracking-[0.15em] uppercase block mb-2">
                        Curated
                    </span>
                    <h3 className="text-white text-2xl md:text-3xl font-medium">
                        The Edit: Staff Picks
                    </h3>
                </div>
                <Link
                    to="/shop"
                    className="hidden md:flex items-center gap-1 text-sm text-white/70 hover:text-raffine-primary transition-colors"
                >
                    Shop All <ArrowRight className="size-[18px]" />
                </Link>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-12">
                {products?.map((product, index) => (
                    <div key={index} className="group flex flex-col gap-3 cursor-pointer">
                        <div className="relative aspect-[3/4] bg-raffine-surface rounded-lg overflow-hidden">
                            <div
                                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                                style={{ backgroundImage: `url('${product.image}')` }}
                            ></div>
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleAddToCart(product);
                                }}
                                className="absolute bottom-4 right-4 size-10 bg-white text-raffine-bg-dark rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all translate-y-2 group-hover:translate-y-0 shadow-lg hover:bg-raffine-primary hover:text-white"
                            >
                                <ShoppingCart className="size-[18px]" />
                            </button>
                            <button
                                onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    if (isInWishlist(product.id)) {
                                        removeFromWishlist(product.id);
                                    } else {
                                        addToWishlist({
                                            id: product.id,
                                            name: product.name,
                                            price: product.price,
                                            type: "product",
                                            image: product.image
                                        });
                                    }
                                }}
                                className="absolute top-4 right-4 size-10 bg-black/40 backdrop-blur-md text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all -translate-y-2 group-hover:translate-y-0 shadow-lg hover:bg-raffine-pink"
                            >
                                <Heart className={`size-[18px] ${isInWishlist(product.id) ? "fill-white" : ""}`} />
                            </button>
                        </div>
                        <div className="flex flex-col flex-1">
                            <Link to={`/product/${product.id}`} className="block group/link">
                                <h5 className="text-raffine-gold text-xs font-bold uppercase tracking-wider mb-1">
                                    Raffine
                                </h5>
                                <p className="text-white text-base font-medium leading-tight mb-1 group-hover/link:underline decoration-raffine-primary underline-offset-4">
                                    {product.name}
                                </p>
                            </Link>
                            <p className="text-white/60 text-sm">₹{product.price.toFixed(2)}</p>
                        </div>
                    </div>
                ))}
            </div>
            <div className="md:hidden mt-8 flex justify-center">
                <Link to="/shop" className="px-6 py-3 border border-white/20 text-white rounded-lg text-sm font-semibold w-full text-center">
                    View All Products
                </Link>
            </div>
        </section>
    );
};

export default StaffPicks;
