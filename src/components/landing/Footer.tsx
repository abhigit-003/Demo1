import { Link } from "react-router-dom";

const footerLinks = {
  Services: [
    { label: "Spa & Massage", to: "/services?category=spa" },
    { label: "Hair Styling", to: "/services?category=hair" },
    { label: "Fitness Training", to: "/services?category=fitness" },
    { label: "Wellness Programs", to: "/services?category=wellness" },
  ],
  Company: [
    { label: "About Us", to: "/" },
    { label: "Careers", to: "/" },
    { label: "Journal", to: "/" },
    { label: "Sustainability", to: "/" },
  ],
  Support: [
    { label: "FAQ", to: "/" },
    { label: "Contact Us", to: "/" },
    { label: "Shipping & Returns", to: "/" },
    { label: "Privacy Policy", to: "/privacy" },
  ],
};

const Footer = () => {
  return (
    <footer className="border-t border-border bg-background py-16">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 md:grid-cols-4">
        {/* Brand */}
        <div>
          <Link to="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <span className="text-sm font-bold text-primary-foreground">R</span>
            </div>
            <span className="text-lg font-bold text-foreground">Raffine</span>
          </Link>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            Redefining beauty rituals with a curated selection of premium skincare and leisure essentials.
          </p>
        </div>

        {/* Link columns */}
        {Object.entries(footerLinks).map(([title, links]) => (
          <div key={title}>
            <h4 className="text-sm font-bold text-foreground">{title}</h4>
            <ul className="mt-4 space-y-3">
              {links.map((link) => (
                <li key={link.label}>
                  <Link to={link.to} className="text-sm text-muted-foreground transition-colors hover:text-primary">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="mx-auto mt-12 max-w-7xl border-t border-border px-6 pt-6">
        <div className="flex flex-col items-center justify-between gap-2 sm:flex-row">
          <p className="text-xs text-muted-foreground">© 2026 Raffine. All rights reserved.</p>
          <div className="flex gap-4">
            <Link to="/privacy" className="text-xs text-muted-foreground hover:text-primary">Privacy</Link>
            <Link to="/terms" className="text-xs text-muted-foreground hover:text-primary">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
