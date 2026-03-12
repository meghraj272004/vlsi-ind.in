import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X, Cpu, ChevronRight, Mail, Phone, Youtube, Linkedin } from "lucide-react";
import { cn } from "@/src/lib/utils";
import { ThemeToggle } from "./ThemeToggle";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "Products & Services", path: "/products" },
  { name: "About Us", path: "/#about" },
  { name: "Careers", path: "/careers" },
  { name: "Contact", path: "/contact" },
];

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 py-4",
        scrolled ? "bg-deep-bg/80 backdrop-blur-md border-b border-border-theme py-3" : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center gap-4 group">
          <div className="w-20 h-20 md:w-24 md:h-24 flex items-center justify-center group-hover:scale-110 transition-transform overflow-hidden">
            <img src="/logo.png" alt="VLSI Technology Logo" className="w-full h-full object-contain" />
          </div>
          <div className="flex flex-col">
            <span className="text-2xl md:text-3xl font-display font-bold tracking-tighter leading-none">
              VLSI <span className="text-gold">TECHNOLOGY</span>
            </span>
            <span className="text-[10px] md:text-xs text-muted font-bold tracking-widest uppercase mt-1">( VERY LARGE SIGNAL INTEGRATION )</span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={cn(
                "text-sm font-medium transition-colors hover:text-neon-blue",
                (location.pathname === link.path || (link.path.startsWith("/#") && location.pathname === "/" && location.hash === link.path.substring(1))) ? "text-neon-blue" : "text-muted"
              )}
            >
              {link.name}
            </Link>
          ))}
          <ThemeToggle />
          <Link
            to="/contact"
            className="bg-gold text-navy px-5 py-2 rounded-full text-sm font-bold hover:bg-white transition-all hover:shadow-[0_0_20px_rgba(212,175,55,0.4)]"
          >
            Get Started
          </Link>
        </div>

        {/* Mobile Toggle */}
        <div className="flex items-center gap-4 md:hidden">
          <ThemeToggle />
          <button
            className="text-[var(--text-color)]"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 bg-navy/95 backdrop-blur-xl border-b border-border-theme p-6 md:hidden"
          >
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "text-lg font-medium py-2 border-b border-border-theme",
                    (location.pathname === link.path || (link.path.startsWith("/#") && location.pathname === "/" && location.hash === link.path.substring(1))) ? "text-neon-blue" : "text-muted"
                  )}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export const Footer = () => {
  return (
    <footer className="bg-navy/40 border-t border-border-theme pt-20 pb-10 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="col-span-1 md:col-span-2">
          <Link to="/" className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 flex items-center justify-center overflow-hidden">
              <img src="/logo.png" alt="VLSI Technology Logo" className="w-full h-full object-contain" />
            </div>
            <span className="text-2xl font-display font-bold">VLSI TECHNOLOGY</span>
          </Link>
          <p className="text-muted max-w-md mb-8 leading-relaxed">
            Pioneering the future of semiconductor design. We provide end-to-end VLSI solutions,
            from RTL design to physical implementation, ensuring your silicon success.
          </p>
          <div className="space-y-4 mb-8 text-sm text-muted">
            <a 
              href="mailto:hr@vlsiind.in" 
              className="flex items-center gap-3 hover:text-neon-blue transition-all group w-fit"
            >
              <div className="w-8 h-8 rounded-lg bg-neon-blue/10 flex items-center justify-center group-hover:bg-neon-blue/20 transition-colors">
                <Mail className="w-4 h-4 text-neon-blue" />
              </div>
              hr@vlsiind.in
            </a>
            <a 
              href="tel:+919187393632" 
              className="flex items-center gap-3 hover:text-gold transition-all group w-fit"
            >
              <div className="w-8 h-8 rounded-lg bg-gold/10 flex items-center justify-center group-hover:bg-gold/20 transition-colors">
                <Phone className="w-4 h-4 text-gold" />
              </div>
              +91 9187393632
            </a>
          </div>
          <div className="flex gap-4">
            {[
              { icon: <Linkedin className="w-5 h-5" />, label: "LinkedIn", href: "https://www.linkedin.com/company/vlsitechnology/" },
              { icon: <Youtube className="w-5 h-5" />, label: "YouTube", href: "https://www.youtube.com/@vlsisemiconductorrd-division" }
            ].map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-border-theme flex items-center justify-center hover:bg-neon-blue/20 hover:text-neon-blue transition-all"
              >
                <span className="sr-only">{social.label}</span>
                {social.icon}
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="font-bold mb-6 text-gold">Services</h4>
          <ul className="space-y-4 text-muted">
            <li><Link to="/products" className="hover:text-neon-blue transition-colors">RTL Design</Link></li>
            <li><Link to="/products" className="hover:text-neon-blue transition-colors">Physical Design</Link></li>
            <li><Link to="/products" className="hover:text-neon-blue transition-colors">DFT Services</Link></li>
            <li><Link to="/products" className="hover:text-neon-blue transition-colors">Analog Layout</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold mb-6 text-gold">Company</h4>
          <ul className="space-y-4 text-muted">
            <li><Link to="/#about" className="hover:text-neon-blue transition-colors">About Us</Link></li>
            <li><Link to="/careers" className="hover:text-neon-blue transition-colors">Careers</Link></li>
            <li><Link to="/contact" className="hover:text-neon-blue transition-colors">Contact</Link></li>
            <li><Link to="/privacy" className="hover:text-neon-blue transition-colors">Privacy Policy</Link></li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-border-theme flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted">
        <p>© 2026 VLSI IND. All rights reserved.</p>
        <p>Designed for the next generation of silicon.</p>
      </div>
    </footer>
  );
};
