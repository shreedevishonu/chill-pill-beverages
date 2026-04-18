import { Link, useRouter } from "@tanstack/react-router";
import { Menu, ShoppingCart, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { useCartStore } from "../store/cartStore";

function LogoImage() {
  const [imgError, setImgError] = useState(false);
  if (imgError) {
    return (
      <span
        className="font-display font-black text-xl tracking-tight"
        style={{ color: "#FF6B35" }}
      >
        ChillPill
      </span>
    );
  }
  return (
    <img
      src="/assets/chill-pill-logo.svg"
      alt="Chill Pill"
      className="h-10 w-auto object-contain"
      onError={() => setImgError(true)}
    />
  );
}

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/products", label: "Products" },
  { to: "/shop", label: "Shop" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const itemCount = useCartStore((s) => s.itemCount());
  const openCart = useCartStore((s) => s.openCart);
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const unsub = router.subscribe("onBeforeNavigate", () => {
      setIsMenuOpen(false);
    });
    return unsub;
  }, [router]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-400 ${
        scrolled ? "navbar-scrolled" : "navbar-top"
      }`}
      data-ocid="navbar"
    >
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center group" data-ocid="nav-logo">
          <motion.div
            whileHover={{
              filter:
                "drop-shadow(0 0 8px rgba(255,107,53,0.9)) drop-shadow(0 0 20px rgba(255,215,0,0.5))",
              scale: 1.05,
            }}
            transition={{ duration: 0.35, ease: "easeOut" }}
          >
            <LogoImage />
          </motion.div>
        </Link>

        {/* Desktop Nav */}
        <nav
          className="hidden md:flex items-center gap-1"
          aria-label="Main navigation"
        >
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="px-4 py-2 rounded-full text-sm font-medium text-white/80 hover:text-white hover:bg-white/10 transition-smooth"
              activeProps={{
                className:
                  "px-4 py-2 rounded-full text-sm font-medium text-white bg-white/15",
              }}
              data-ocid={`nav-${link.label.toLowerCase()}`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Cart + Hamburger */}
        <div className="flex items-center gap-2">
          <button
            onClick={openCart}
            type="button"
            className="relative p-2 rounded-full text-white hover:bg-white/10 transition-smooth"
            aria-label={`Cart with ${itemCount} items`}
            data-ocid="nav-cart"
          >
            <ShoppingCart className="w-5 h-5" />
            {itemCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#FF6B35] text-white text-xs font-bold rounded-full flex items-center justify-center">
                {itemCount}
              </span>
            )}
          </button>

          <button
            type="button"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-full text-white hover:bg-white/10 transition-smooth"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            data-ocid="nav-hamburger"
          >
            {isMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="md:hidden border-t border-white/10 backdrop-blur-2xl"
            style={{ background: "rgba(10,10,26,0.97)" }}
            data-ocid="mobile-menu"
          >
            <nav className="container mx-auto px-4 py-4 flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="px-4 py-3 rounded-xl text-white/80 hover:text-white hover:bg-white/10 transition-smooth font-medium"
                  activeProps={{
                    className:
                      "px-4 py-3 rounded-xl text-white bg-white/15 font-medium",
                  }}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
