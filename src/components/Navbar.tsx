import { Search, Heart, User, ShoppingBag, X, Menu } from "lucide-react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useCart } from "@/context/CartContext";
import { useState, useEffect } from "react";

const navLinks = [
    { label: "Spa", to: "/services?category=spa" },
    { label: "Hair", to: "/services?category=hair" },
    { label: "Fitness", to: "/services?category=fitness" },
    { label: "Wellness", to: "/services?category=wellness" },
    { label: "Shop", to: "/shop" },
    { label: "Editorial", to: "/editorial" },
];

const Navbar = () => {
    const { totalItems } = useCart();
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
            navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
            setIsSearchOpen(false);
            setSearchQuery("");
        }
    };

    return (
        <nav className="sticky top-0 z-50 w-full border-b border-white/5 bg-raffine-burgundy text-raffine-gold font-display antialiased">
            <div className="px-6 md:px-12 py-5 flex items-center justify-between max-w-[1536px] mx-auto">
                {/* Logo Section - Left */}
                <Link to="/" className="flex items-center gap-3 group shrink-0">
                    <div className="size-5 text-raffine-gold">
                        <svg
                            fill="none"
                            viewBox="0 0 48 48"
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-full h-full"
                        >
                            <path
                                clipRule="evenodd"
                                d="M24 8.18819L33.4123 11.574L24 15.2071L14.5877 11.574L24 8.18819ZM9 15.8487L21 20.4805V37.6263L9 32.9945V15.8487ZM27 37.6263V20.4805L39 15.8487V32.9945L27 37.6263ZM25.354 2.29885C24.4788 1.98402 23.5212 1.98402 22.646 2.29885L4.98454 8.65208C3.7939 9.08038 3 10.2097 3 11.475V34.3663C3 36.0196 4.01719 37.5026 5.55962 38.098L22.9197 44.7987C23.6149 45.0671 24.3851 45.0671 25.0803 44.7987L42.4404 38.098C43.9828 37.5026 45 36.0196 45 34.3663V11.475C45 10.2097 44.2061 9.08038 43.0155 8.65208L25.354 2.29885Z"
                                fill="currentColor"
                                fillRule="evenodd"
                            ></path>
                        </svg>
                    </div>
                    <span className="text-lg font-bold tracking-[0.2em] uppercase">Raffine</span>
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
                <div className="flex items-center gap-1 md:gap-3 shrink-0">
                    <button
                        onClick={() => setIsSearchOpen(true)}
                        className="flex items-center justify-center size-10 rounded-full hover:bg-white/5 transition-colors"
                        aria-label="Search"
                    >
                        <Search className="size-[20px]" />
                    </button>
                    <Link to="/cart" className="hidden sm:flex items-center justify-center size-10 rounded-full hover:bg-white/5 transition-colors" aria-label="Favorites">
                        <Heart className="size-[20px]" />
                    </Link>
                    <Link to="/dashboard" className="hidden sm:flex items-center justify-center size-10 rounded-full hover:bg-white/5 transition-colors" aria-label="Profile">
                        <User className="size-[20px]" />
                    </Link>
                    <Link to="/cart" className="relative flex items-center justify-center size-10 rounded-full hover:bg-white/5 transition-colors" aria-label="Cart">
                        <ShoppingBag className="size-[20px]" />
                        {totalItems > 0 && (
                            <span className="absolute top-2 right-2 flex items-center justify-center size-4 bg-raffine-gold text-raffine-burgundy rounded-full text-[9px] font-black scale-110">
                                {totalItems}
                            </span>
                        )}
                    </Link>
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
                            <Link to="/cart" onClick={() => setIsMobileMenuOpen(false)} className="text-raffine-gold"><Heart /></Link>
                            <Link to="/dashboard" onClick={() => setIsMobileMenuOpen(false)} className="text-raffine-gold"><User /></Link>
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
