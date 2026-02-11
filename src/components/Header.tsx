import { Search, Heart, ShoppingBag, User, LogOut, Menu, X } from "lucide-react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { useState, useEffect } from "react";

const navLinks = [
  { label: "Spa", to: "/services?category=spa" },
  { label: "Hair", to: "/services?category=hair" },
  { label: "Fitness", to: "/services?category=fitness" },
  { label: "Wellness", to: "/services?category=wellness" },
  { label: "Shop", to: "/shop" },
  { label: "Editorial", to: "/editorial" },
];

const Header = () => {
  const { totalItems } = useCart();
  const { user, logout } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  // Prevent scrolling when search is open
  useEffect(() => {
    if (isSearchOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isSearchOpen]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setIsSearchOpen(false);
      setSearchQuery("");
      setMobileOpen(false);
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
            <span className="text-sm font-bold text-primary-foreground">R</span>
          </div>
          <span className="text-lg font-bold tracking-tight text-foreground">Raffine</span>
        </Link>

        {/* Center Nav */}
        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <NavLink
              key={link.label}
              to={link.to}
              className={({ isActive }) =>
                `text-sm font-medium transition-colors hover:text-primary ${isActive ? "text-primary" : "text-muted-foreground"}`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        {/* Right Icons */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => setIsSearchOpen(true)}
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            <Search className="h-5 w-5" />
          </button>
          <Link to="/cart" className="hidden text-muted-foreground transition-colors hover:text-foreground sm:block">
            <Heart className="h-5 w-5" />
          </Link>
          <Link to="/cart" className="relative text-muted-foreground transition-colors hover:text-foreground">
            <ShoppingBag className="h-5 w-5" />
            {totalItems > 0 && (
              <span className="absolute -right-1.5 -top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
                {totalItems}
              </span>
            )}
          </Link>
          {user ? (
            <div className="flex items-center gap-2">
              <Link to="/dashboard" className="text-muted-foreground transition-colors hover:text-foreground">
                <User className="h-5 w-5" />
              </Link>
              <button onClick={logout} className="hidden text-muted-foreground transition-colors hover:text-foreground sm:block">
                <LogOut className="h-5 w-5" />
              </button>
            </div>
          ) : (
            <Link to="/login" className="text-muted-foreground transition-colors hover:text-foreground">
              <User className="h-5 w-5" />
            </Link>
          )}
          <button onClick={() => setMobileOpen(!mobileOpen)} className="text-muted-foreground md:hidden">
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Search Overlay */}
      {isSearchOpen && (
        <div className="absolute top-0 left-0 w-full h-16 z-[100] bg-background border-b border-border flex items-center px-6 animate-in slide-in-from-top duration-200">
          <div className="mx-auto flex w-full max-w-7xl items-center gap-4">
            <Search className="h-5 w-5 text-muted-foreground" />
            <form onSubmit={handleSearch} className="flex-1">
              <input
                autoFocus
                type="text"
                placeholder="Search products, services..."
                className="w-full bg-transparent text-lg outline-none placeholder:text-muted-foreground"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </form>
            <button
              onClick={() => setIsSearchOpen(false)}
              className="text-muted-foreground hover:text-foreground"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
        </div>
      )}

      {/* Mobile nav */}
      {mobileOpen && (
        <nav className="border-t border-border bg-background px-6 py-4 md:hidden">
          {navLinks.map((link) => (
            <NavLink
              key={link.label}
              to={link.to}
              onClick={() => setMobileOpen(false)}
              className={({ isActive }) =>
                `block py-2 text-sm font-medium transition-colors ${isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"}`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
      )}
    </header>
  );
};

export default Header;
