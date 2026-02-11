import { Search, Heart, User, ShoppingBag, X, Menu, LogOut } from "lucide-react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { useWishlist } from "@/context/WishlistContext";
import { useState, useEffect } from "react";

const navLinks = [
    { label: "Spa", to: "/home/spa" },
    { label: "Hair", to: "/home/hair" },
    { label: "Fitness", to: "/home/fitness" },
    { label: "Wellness", to: "/home/wellness" },
    { label: "Shop", to: "/home/shop" },
    { label: "Editorial", to: "/home/editorial" },
];

const Navbar = () => {
    const { totalItems } = useCart();
    const { logout } = useAuth();
    const { wishlistCount } = useWishlist();
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const navigate = useNavigate();

    // Prevent scrolling when search or mobile menu is open
    useEffect(() => {
        if (isSearchOpen || isMobileMenuOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [isSearchOpen, isMobileMenuOpen]);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/home/search?q=${encodeURIComponent(searchQuery.trim())}`);
            setIsSearchOpen(false);
            setSearchQuery("");
        }
    };

    return (
        <nav className="sticky top-0 z-50 w-full border-b border-white/5 bg-raffine-burgundy text-raffine-gold font-display antialiased">
            <div className="px-6 md:px-12 py-5 flex items-center justify-between max-w-[1536px] mx-auto">
                {/* Logo Section - Left */}
                <Link to="/home" className="flex items-center gap-3 group shrink-0">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-raffine-pink text-white shadow-lg shadow-raffine-pink/20 transition-transform group-hover:scale-105">
                        <span className="text-xl font-black tracking-tighter">R</span>
                    </div>
                    <span className="text-xl font-bold tracking-[0.1em] text-white">Raffine</span>
                </Link>

                {/* Desktop Nav Links - Center */}
                <div className="hidden lg:flex flex-1 justify-center gap-10">
                    {navLinks.map((link) => (
                        <NavLink
                            key={link.label}
                            to={link.to}
                            className={({ isActive }) =>
                                `text-[11px] font-bold uppercase tracking-[0.25em] transition-all hover:opacity-70 ${isActive ? "text-white" : "text-raffine-gold"
                                }`
                            }
                        >
                            {link.label}
                        </NavLink>
                    ))}
                </div>

                {/* Utility Icons - Right */}
                <div className="flex items-center gap-1 md:gap-4 shrink-0 text-white">
                    <button
                        onClick={() => setIsSearchOpen(true)}
                        className="flex items-center justify-center size-10 rounded-full hover:bg-white/5 transition-colors"
                        aria-label="Search"
                    >
                        <Search className="size-[22px] stroke-[1.5px]" />
                    </button>
                    <Link to="/home/wishlist" className="relative hidden sm:flex items-center justify-center size-10 rounded-full hover:bg-white/5 transition-colors" aria-label="Wishlist">
                        <Heart className="size-[22px] stroke-[1.5px]" />
                        {wishlistCount > 0 && (
                            <span className="absolute top-1.5 right-1.5 flex items-center justify-center size-4 bg-raffine-gold text-raffine-burgundy rounded-full text-[9px] font-black">
                                {wishlistCount}
                            </span>
                        )}
                    </Link>
                    <Link to="/home/cart" className="relative flex items-center justify-center size-10 rounded-full hover:bg-white/5 transition-colors" aria-label="Cart">
                        <ShoppingBag className="size-[22px] stroke-[1.5px]" />
                        {totalItems > 0 && (
                            <span className="absolute top-1.5 right-1.5 flex items-center justify-center size-4 bg-raffine-pink text-white rounded-full text-[9px] font-black">
                                {totalItems}
                            </span>
                        )}
                    </Link>
                    <Link to="/home/dashboard" className="hidden sm:flex items-center justify-center size-10 rounded-full hover:bg-white/5 transition-colors" aria-label="Profile">
                        <User className="size-[22px] stroke-[1.5px]" />
                    </Link>
                    <button
                        onClick={() => { logout(); navigate("/login"); }}
                        className="hidden sm:flex items-center justify-center size-10 rounded-full hover:bg-white/5 transition-colors text-raffine-pink"
                        aria-label="Logout"
                    >
                        <LogOut className="size-[22px] stroke-[1.5px]" />
                    </button>
                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="lg:hidden flex items-center justify-center size-10 rounded-full hover:bg-white/5 transition-colors ml-1"
                        aria-label="Toggle Menu"
                    >
                        {isMobileMenuOpen ? <X className="size-6" /> : <Menu className="size-6" />}
                    </button>
                </div>
            </div>

            {/* Search Overlay */}
            {isSearchOpen && (
                <div className="absolute top-full left-0 w-full z-[100] bg-raffine-burgundy border-b border-white/5 animate-in slide-in-from-top duration-300 shadow-2xl">
                    <div className="max-w-[1536px] mx-auto px-6 md:px-12 py-8 flex items-center justify-between gap-8">
                        <form onSubmit={handleSearch} className="flex-1">
                            <div className="relative flex items-center gap-6 group">
                                <Search className="size-6 text-raffine-gold/50 group-focus-within:text-raffine-gold transition-colors flex-shrink-0" />
                                <input
                                    autoFocus
                                    type="text"
                                    placeholder="SEARCH EXPERIENCES, SALONS, PRODUCTS..."
                                    className="flex-1 bg-transparent border-b border-white/10 py-3 text-xl font-light tracking-widest focus:outline-none focus:border-raffine-gold transition-colors text-raffine-gold placeholder:text-raffine-gold/20 min-w-0 uppercase"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>
                        </form>
                        <button
                            onClick={() => setIsSearchOpen(false)}
                            className="text-raffine-gold/50 hover:text-raffine-gold transition-colors p-2 flex-shrink-0"
                            aria-label="Close search"
                        >
                            <X className="size-7" />
                        </button>
                    </div>
                </div>
            )}

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="lg:hidden fixed inset-0 top-[81px] z-[90] bg-raffine-burgundy animate-in fade-in duration-300">
                    <div className="flex flex-col p-8 gap-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.label}
                                to={link.to}
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="text-xl font-bold uppercase tracking-[0.3em] text-raffine-gold hover:text-white transition-colors"
                            >
                                {link.label}
                            </Link>
                        ))}
                        <div className="pt-8 border-t border-white/5 flex gap-8">
                            <Link to="/home/wishlist" onClick={() => setIsMobileMenuOpen(false)} className="text-raffine-gold"><Heart /></Link>
                            <Link to="/home/dashboard" onClick={() => setIsMobileMenuOpen(false)} className="text-raffine-gold"><User /></Link>
                            <button onClick={() => { logout(); navigate("/login"); setIsMobileMenuOpen(false); }} className="text-raffine-pink"><LogOut /></button>
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
