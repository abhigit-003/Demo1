import { Link } from "react-router-dom";

const footerLinks = {
    Services: [
        { label: "Spa & Massage", to: "/spa" },
        { label: "Hair Styling", to: "/hair" },
        { label: "Fitness Training", to: "/fitness" },
        { label: "Wellness Programs", to: "/wellness" },
    ],
    Company: [
        { label: "About Us", to: "/" },
        { label: "Careers", to: "/" },
        { label: "Journal", to: "/editorial" },
        { label: "Sustainability", to: "/" },
    ],
    Support: [
        { label: "FAQ", to: "/" },
        { label: "Contact Us", to: "/" },
        { label: "Shipping & Returns", to: "/cart" },
        { label: "Privacy Policy", to: "/" },
    ],
};

const Footer = () => {
    return (
        <footer className="bg-raffine-burgundy py-16 text-white font-display antialiased">
            <div className="mx-auto grid max-w-7xl gap-12 px-6 md:grid-cols-4">
                {/* Brand */}
                <div className="space-y-6">
                    <Link to="/" className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#ee2b6c]">
                            <span className="text-xl font-bold text-white">R</span>
                        </div>
                        <span className="text-xl font-bold tracking-tight text-white">Raffine</span>
                    </Link>
                    <p className="text-sm leading-relaxed text-gray-400">
                        Redefining beauty rituals with a curated selection of premium skincare and leisure essentials.
                    </p>
                </div>

                {/* Link columns */}
                {Object.entries(footerLinks).map(([title, links]) => (
                    <div key={title} className="space-y-6">
                        <h4 className="text-sm font-bold text-white">{title}</h4>
                        <ul className="space-y-4">
                            {links.map((link) => (
                                <li key={link.label}>
                                    <Link
                                        to={link.to}
                                        className="text-sm text-gray-400 transition-colors hover:text-[#ee2b6c]"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>

            <div className="mx-auto mt-12 max-w-7xl border-t border-white/10 px-6 pt-8">
                <div className="flex flex-col items-center justify-between gap-4 sm:flex-row text-xs text-gray-500">
                    <p>© 2026 Raffine. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
