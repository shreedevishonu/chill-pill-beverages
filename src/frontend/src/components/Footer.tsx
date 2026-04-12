import { Link } from "@tanstack/react-router";
import { Send } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { SiFacebook, SiInstagram } from "react-icons/si";

function FooterLogo() {
  const [imgError, setImgError] = useState(false);
  if (imgError) {
    return (
      <span
        className="font-display font-black text-2xl tracking-tight"
        style={{ color: "#FF6B35" }}
      >
        ChillPill
      </span>
    );
  }
  return (
    <img
      src="/assets/chill-pill-logo.png"
      alt="Chill Pill"
      className="h-10 w-auto object-contain"
      onError={() => setImgError(true)}
    />
  );
}

const footerLinks = [
  { to: "/", label: "Home" },
  { to: "/products", label: "Products" },
  { to: "/shop", label: "Shop" },
  { to: "/about", label: "About Us" },
  { to: "/contact", label: "Contact" },
];

const socialLinks = [
  {
    icon: SiFacebook,
    label: "Facebook",
    href: "https://www.facebook.com/profile.php?id=61573663829948",
    hoverColor: "#1877F2",
    glowColor: "rgba(24,119,242,0.65)",
    pulseClass: "social-pulse-blue",
  },
  {
    icon: SiInstagram,
    label: "Instagram",
    href: "https://www.instagram.com/chillpillbeverages",
    hoverColor: "#E1306C",
    glowColor: "rgba(225,48,108,0.65)",
    pulseClass: "social-pulse-pink",
  },
];

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const year = new Date().getFullYear();

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <footer className="footer-gradient text-white" data-ocid="footer">
      {/* Top gradient border */}
      <div className="footer-top-border" />

      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="mb-4">
              <Link to="/" data-ocid="footer-logo">
                <motion.div
                  whileHover={{
                    filter:
                      "drop-shadow(0 0 8px rgba(255,107,53,0.9)) drop-shadow(0 0 20px rgba(255,215,0,0.5))",
                    scale: 1.05,
                  }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                  className="inline-block"
                >
                  <FooterLogo />
                </motion.div>
              </Link>
            </div>
            <p className="text-white/60 text-sm leading-relaxed max-w-xs mb-6">
              Fresh, natural beverages crafted for India's spirit. From the
              streets of Mumbai to the ghats of Varanasi — take your Chill Pill.
            </p>

            {/* Social Icons */}
            <div className="flex gap-5">
              {socialLinks.map(
                ({
                  icon: Icon,
                  label,
                  href,
                  hoverColor,
                  glowColor,
                  pulseClass,
                }) => (
                  <motion.a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    data-ocid={`footer-social-${label.toLowerCase()}`}
                    className={`social-icon-btn ${pulseClass}`}
                    whileHover={{
                      scale: 1.2,
                      color: hoverColor,
                      boxShadow: `0 0 18px ${glowColor}, 0 0 36px ${glowColor}`,
                    }}
                    whileTap={{ scale: 0.9 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                  >
                    <Icon />
                  </motion.a>
                ),
              )}
            </div>
          </div>

          {/* Nav Links */}
          <div>
            <h3 className="font-display font-bold text-lg mb-4">Explore</h3>
            <ul className="space-y-2">
              {footerLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-white/60 hover:text-[#FF6B35] text-sm transition-smooth"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Address */}
          <div>
            <h3 className="font-display font-bold text-lg mb-4">Find Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                {/* Location pin SVG */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-4 h-4 mt-0.5 flex-shrink-0 text-[#FF6B35]"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-2.003 3.5-4.697 3.5-8.327a8 8 0 10-16 0c0 3.63 1.556 6.324 3.5 8.327a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.144.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z"
                    clipRule="evenodd"
                  />
                </svg>
                <address className="not-italic text-white/60 text-sm leading-relaxed">
                  Halol Road, Kotambi Gam, Jarod,
                  <br />
                  Vadodara - 391510,
                  <br />
                  Vaghodia, Vadodara,
                  <br />
                  Gujarat - 391510, India
                </address>
              </li>
              <li className="flex items-center gap-3">
                {/* Phone SVG */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-4 h-4 flex-shrink-0 text-[#FF6B35]"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M1.5 4.5a3 3 0 013-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 01-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 006.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 011.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 01-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5z"
                    clipRule="evenodd"
                  />
                </svg>
                <a
                  href="tel:+918850792514"
                  className="text-white/60 hover:text-[#FF6B35] text-sm transition-smooth"
                  data-ocid="footer-phone"
                >
                  +91 8850792514
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-display font-bold text-lg mb-4">Stay Fresh</h3>
            <p className="text-white/60 text-sm mb-4">
              Get launch news, deals & chill vibes in your inbox.
            </p>
            {subscribed ? (
              <div className="bg-[#7CB518]/20 border border-[#7CB518]/40 rounded-xl p-3 text-[#7CB518] text-sm font-medium">
                🎉 You're on the list!
              </div>
            ) : (
              <form
                onSubmit={handleSubscribe}
                className="flex gap-2"
                data-ocid="footer-newsletter"
              >
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  required
                  className="flex-1 min-w-0 bg-white/10 border border-white/20 rounded-xl px-3 py-2 text-sm text-white placeholder-white/40 focus:outline-none focus:border-[#FF6B35] transition-smooth"
                  data-ocid="footer-email-input"
                />
                <button
                  type="submit"
                  aria-label="Subscribe"
                  className="w-9 h-9 flex-shrink-0 rounded-xl bg-[#FF6B35] hover:bg-[#e55a25] flex items-center justify-center transition-smooth"
                  data-ocid="footer-subscribe-btn"
                >
                  <Send className="w-4 h-4 text-white" />
                </button>
              </form>
            )}
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/40 text-sm">
            © {year} ChillPill Beverages. All rights reserved.
          </p>
          <p className="text-white/40 text-sm">
            Built with love using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#FF6B35] hover:underline"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
