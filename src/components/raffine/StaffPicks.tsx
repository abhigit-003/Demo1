import { ArrowRight, ShoppingCart, Heart } from "lucide-react";
import { Link } from "react-router-dom";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { toast } from "sonner";

const products = [
    {
        id: "p1",
        brand: "Aesop",
        name: "Parsley Seed Serum",
        price: 75.00,
        image:
            "https://lh3.googleusercontent.com/aida-public/AB6AXuABUU0gS5eZJeXL847vbkvifFQLyNw3cZ7NwEhsTEl-kR2rJekDD_uAF6NoVJ841jyNCvnIBb-Q7OlH-5p6i3KqQwqLhgX9vxyTxSXuOij7fO9t-idtdRr5iqIKrGHrUrqyZUvG8byKeJlJr9GeRpIlHBMTqK8-FhNBwpjEW1op3da0HTUptDdO4I5xm2KxYvscZpCQiBLSwxdyfHhZc9Dk37GE0DX_Mcr3OAY8vX8vdJkmWXwL3Bx1mUyeoc845hpdambx8Um5MXc",
    },
    {
        id: "p2",
        brand: "La Mer",
        name: "Crème de la Mer",
        price: 195.00,
        image:
            "https://lh3.googleusercontent.com/aida-public/AB6AXuCyfSa935aTCwFd53g0K2hSNtZ2FcTNq6xH_ONNzdx94UYq__ptDCPyIa7srONJFjIGxUnFM5VHejR1WYjtA3H2T37ws-CIgc6sF3TEEISTZGSf6Hor0VBmYvL_GDTxzpe-k9vecm_4HHRsZ-AMBGV05peeM25PFcH0LPpxEBajrywh1DoEUzt3zOfo-VHCUmOJgKk0CjXSGFQLxkyRXYa918c_z16xi9emaDY1QJp3aTTz_V_x7F_48lLDRcgUlMs85Putcs4JdfM",
    },
    {
        id: "p3",
        brand: "Byredo",
        name: "Gypsy Water",
        price: 150.00,
        new: true,
        image:
            "https://lh3.googleusercontent.com/aida-public/AB6AXuCI8mQNxLHX-Tmx3WIJetIt7E6D7I2qvY6AEaeJ288HnvoTpEy4uJKXARd9chhQx57izAUdtclWrNrMFJVylMFzB6c7ch-NFBmP0_-yNYl48HRCYRcr-H0thwgN9QWaGNSfUKmbUE3VtHOYO6-1ciKLldYenVeRzjnFJI84K1EO2vRlf6XIolFw7IAbv_ZSFmhHF-C4rhs8UNs2XRjOpDb7bvbIoP_NjswrL5qTgDUboej3dmFx9LGJ5yxPiyAoX1TD7B31n1H2Pls",
    },
    {
        id: "p4",
        brand: "Diptyque",
        name: "Baies Candle",
        price: 68.00,
        image:
            "https://lh3.googleusercontent.com/aida-public/AB6AXuBizigtcvcLwf7Jy6MMiUOQoJiu733--6nMr01aYh2mAP9vlwpnxyQHBdX0RQ12gQB88Ae-HsW1ddXWxX5eihIHn7uenZSsOEaHb9kdluSYcvr9jDvJlFnx0tXGu1-aNCRgxiquak1ji8b3OIcTkBF3i4G5ytK8oONLQnv_dPKStUUsNonZB3fQZw7glZt4IuJyeDTto4PpkrUPQ6sUgXBYP7DFnZB0y1iCjLByCrkDizS4HbhgmdYUkrCuTFjOwamWdB4LwrlotPo",
    },
];

const StaffPicks = () => {
    const { addItem } = useCart();
    const { isInWishlist, addToWishlist, removeFromWishlist } = useWishlist();

    const handleAddToCart = (product: typeof products[0]) => {
        addItem({
            id: product.id,
            name: product.name,
            price: product.price,
            type: "product"
        });
        toast.success(`${product.name} added to cart!`);
    };

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
                {products.map((product, index) => (
                    <div key={index} className="group flex flex-col gap-3 cursor-pointer">
                        <div className="relative aspect-[3/4] bg-raffine-surface rounded-lg overflow-hidden">
                            <div
                                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                                style={{ backgroundImage: `url('${product.image}')` }}
                            ></div>
                            {product.new && (
                                <div className="absolute top-3 left-3 bg-raffine-primary text-white text-[10px] font-bold px-2 py-1 uppercase tracking-wider rounded-sm">
                                    New
                                </div>
                            )}
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
                                    {product.brand}
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
