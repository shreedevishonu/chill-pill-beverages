import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  ChevronUp,
  Leaf,
  MapPin,
  Truck,
  Users,
  Zap,
} from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { SiFacebook, SiInstagram } from "react-icons/si";
import ProductCard from "../components/ProductCard";
import { products } from "../data/products";
import { useScrollAnimation } from "../hooks/useScrollAnimation";

/* ─── Particle colors ───────────────────────────────────────────── */
const PARTICLE_COLORS = [
  "#FF6B35",
  "#FFD700",
  "#7CB518",
  "#00B4D8",
  "#9B5DE5",
  "#FF6B35",
  "#FFD700",
];

const PARTICLES = Array.from({ length: 28 }, (_, i) => ({
  id: i,
  color: PARTICLE_COLORS[i % PARTICLE_COLORS.length],
  size: 5 + (i % 4) * 4,
  left: `${(i * 3.7 + 1.5) % 100}%`,
  delay: `${(i * 0.28) % 7}s`,
  duration: `${6 + (i % 6) * 1.3}s`,
  drift: `${((i % 7) - 3) * 18}px`,
}));

/* ─── FloatingParticles ─────────────────────────────────────────── */
function FloatingParticles() {
  return (
    <div
      className="absolute inset-0 overflow-hidden pointer-events-none"
      aria-hidden="true"
    >
      {PARTICLES.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full"
          style={{
            width: p.size,
            height: p.size,
            background: `radial-gradient(circle at 35% 35%, ${p.color}ee, ${p.color}44)`,
            left: p.left,
            bottom: "-20px",
            filter: "blur(0.5px)",
            opacity: 0.7,
            // @ts-expect-error -- CSS custom property for keyframe
            "--drift": p.drift,
            animation: `particle-float ${p.duration} ${p.delay} ease-in infinite`,
          }}
        />
      ))}
    </div>
  );
}

/* ─── Animated counter ──────────────────────────────────────────── */
function AnimatedCounter({
  target,
  suffix = "",
  prefix = "",
  duration = 1800,
  isVisible,
}: {
  target: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  isVisible: boolean;
}) {
  const [count, setCount] = useState(0);
  const startedRef = useRef(false);

  useEffect(() => {
    if (!isVisible || startedRef.current) return;
    startedRef.current = true;
    const startTime = performance.now();
    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // easeOutExpo
      const eased = progress === 1 ? 1 : 1 - 2 ** (-10 * progress);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [isVisible, target, duration]);

  return (
    <span>
      {prefix}
      {count}
      {suffix}
    </span>
  );
}

/* ─── Static data ────────────────────────────────────────────────── */
const VALUES = [
  {
    icon: Leaf,
    label: "100% Natural",
    desc: "Real ingredients, zero preservatives, zero compromise",
    color: "#7CB518",
  },
  {
    icon: Truck,
    label: "Pan India Delivery",
    desc: "From Kashmir to Kanyakumari, we've got you covered",
    color: "#00B4D8",
  },
  {
    icon: MapPin,
    label: "Made in India",
    desc: "Proudly crafted for the Indian palate and spirit",
    color: "#FF6B35",
  },
  {
    icon: Users,
    label: "For Everyone",
    desc: "All ages, all regions, every mood and occasion",
    color: "#9B5DE5",
  },
];

const SOCIAL = [
  {
    label: "Instagram",
    icon: SiInstagram,
    href: "https://www.instagram.com/chillpillbeverages",
    color: "#C13584",
    bg: "from-[#E1306C]/20 to-[#833AB4]/20",
  },
  {
    label: "Facebook",
    icon: SiFacebook,
    href: "https://www.facebook.com/profile.php?id=61573663829948",
    color: "#1877F2",
    bg: "from-[#1877F2]/20 to-[#0a5fc7]/20",
  },
];

const STATS = [
  { target: 6, suffix: "+", label: "Launch Flavors" },
  { target: 28, suffix: "", label: "States Delivered" },
  { target: 0, suffix: "%", label: "Artificial Stuff" },
];

const MARQUEE_CHUNKS = [
  "INDIA'S FRESHEST BEVERAGES",
  "NATURAL",
  "BOLD",
  "MADE FOR EVERY MOOD",
  "TANGY ORANGE",
  "LIME & LEMON",
  "SHIKANJI",
  "CLUB SODA",
  "FRUTU FIZY",
  "JEERA SODA",
];

/* ─── Sub-components ─────────────────────────────────────────────── */
function ValueCard({
  icon: Icon,
  label,
  desc,
  color,
  index,
}: (typeof VALUES)[0] & { index: number }) {
  const { ref, isVisible } = useScrollAnimation();
  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className={`fade-in-up ${isVisible ? "visible" : ""} h-full`}
      style={{ transitionDelay: `${index * 0.12}s` }}
    >
      <motion.div
        whileHover={{ y: -6, scale: 1.02 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="glass-card rounded-2xl p-7 text-center h-full flex flex-col items-center"
      >
        <div
          className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5"
          style={{ background: `${color}25`, border: `1.5px solid ${color}40` }}
        >
          <Icon className="w-7 h-7" style={{ color }} />
        </div>
        <h3 className="font-display font-black text-white text-xl mb-2">
          {label}
        </h3>
        <p className="text-white/50 text-sm leading-relaxed">{desc}</p>
      </motion.div>
    </div>
  );
}

function SocialCard({
  label,
  icon: Icon,
  href,
  color,
  bg,
}: (typeof SOCIAL)[0]) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ y: -4, scale: 1.04 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 300, damping: 18 }}
      className={`flex flex-col items-center gap-3 px-10 py-8 rounded-2xl border border-white/15 bg-gradient-to-br ${bg} backdrop-blur-md cursor-pointer`}
      data-ocid={`social-${label.toLowerCase().replace("/", "-")}`}
    >
      <div
        className="w-12 h-12 rounded-xl flex items-center justify-center"
        style={{ background: `${color}22`, border: `1.5px solid ${color}50` }}
      >
        <Icon className="w-6 h-6" style={{ color }} />
      </div>
      <span className="font-bold text-sm" style={{ color }}>
        {label}
      </span>
    </motion.a>
  );
}

/* ─── Marquee Banner ─────────────────────────────────────────────── */
function MarqueeBanner() {
  const ACCENT_COLORS = ["#FF6B35", "#FFD700", "#7CB518", "#00B4D8", "#9B5DE5"];
  // Double the array for seamless loop — suffix "a" and "b" to keep keys unique
  const items = [
    ...MARQUEE_CHUNKS.map((c) => ({ text: c, uid: `a-${c}` })),
    ...MARQUEE_CHUNKS.map((c) => ({ text: c, uid: `b-${c}` })),
  ];
  return (
    <div
      className="py-3.5 overflow-hidden"
      style={{
        background:
          "linear-gradient(90deg, #0a0a1a 0%, #1a0520 20%, #200a28 50%, #1a0520 80%, #0a0a1a 100%)",
        borderTop: "1px solid rgba(155,93,229,0.3)",
        borderBottom: "1px solid rgba(255,107,53,0.3)",
      }}
    >
      <div className="marquee-track inline-flex whitespace-nowrap">
        {items.map((item, i) => (
          <span
            key={item.uid}
            className="inline-flex items-center gap-5 mr-5"
            aria-hidden={i >= MARQUEE_CHUNKS.length}
          >
            <span className="font-display font-black text-sm tracking-[0.2em] uppercase text-white/70">
              {item.text}
            </span>
            <span
              className="w-2 h-2 rounded-full inline-block flex-shrink-0"
              style={{ background: ACCENT_COLORS[i % ACCENT_COLORS.length] }}
            />
          </span>
        ))}
      </div>
    </div>
  );
}

/* ─── Scroll to Top button ───────────────────────────────────────── */
function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Scroll to top"
      className="scroll-top-btn fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full flex items-center justify-center shadow-2xl transition-smooth hover:scale-110 active:scale-95"
      style={{
        background: "linear-gradient(135deg, #FF6B35, #9B5DE5)",
        boxShadow: "0 0 20px rgba(255,107,53,0.5), 0 4px 20px rgba(0,0,0,0.4)",
      }}
      data-ocid="scroll-to-top"
    >
      <ChevronUp className="w-5 h-5 text-white" />
    </button>
  );
}

/* ─── Page ───────────────────────────────────────────────────────── */
export default function HomePage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const featuredRef = useRef<HTMLDivElement>(null);
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const { ref: statsRef, isVisible: statsVisible } = useScrollAnimation({
    threshold: 0.3,
  });
  const { ref: productsRef, isVisible: productsVisible } = useScrollAnimation({
    threshold: 0.05,
  });
  const { ref: valuesRef, isVisible: valuesVisible } = useScrollAnimation({
    threshold: 0.05,
  });
  const { ref: socialRef, isVisible: socialVisible } = useScrollAnimation({
    threshold: 0.1,
  });
  const { ref: newsletterRef, isVisible: newsletterVisible } =
    useScrollAnimation({ threshold: 0.2 });

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail("");
    }
  };

  const scrollToFeatured = () =>
    featuredRef.current?.scrollIntoView({ behavior: "smooth" });

  return (
    <div className="bg-[#0A0A1A]">
      <ScrollToTop />

      {/* ── Hero ─────────────────────────────────────────────────── */}
      <section
        ref={heroRef}
        className="relative min-h-screen flex items-center overflow-hidden hero-bg-animated"
      >
        {/* Floating particles */}
        <FloatingParticles />

        {/* Ambient blob overlays */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div
            className="absolute top-[-10%] right-[-5%] w-[55%] h-[70%] rounded-full opacity-20 blur-3xl"
            style={{
              background:
                "radial-gradient(circle, #FF6B35 0%, #FFD700 60%, transparent 100%)",
            }}
          />
          <div
            className="absolute bottom-[-10%] left-[-5%] w-[50%] h-[60%] rounded-full opacity-15 blur-3xl"
            style={{
              background:
                "radial-gradient(circle, #9B5DE5 0%, #00B4D8 60%, transparent 100%)",
            }}
          />
          <div
            className="absolute top-[40%] left-[30%] w-[35%] h-[35%] rounded-full blur-2xl"
            style={{
              background:
                "radial-gradient(circle, #7CB518 0%, transparent 100%)",
              opacity: 0.06,
            }}
          />
        </div>

        {/* Content */}
        <div className="container mx-auto px-4 sm:px-6 relative z-10 pt-24 pb-20">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            >
              <motion.span
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="inline-flex items-center gap-2 text-[#FF6B35] text-xs font-bold tracking-widest uppercase mb-6 border border-[#FF6B35]/30 rounded-full px-4 py-1.5 backdrop-blur-sm bg-[#FF6B35]/10"
              >
                <Zap className="w-3 h-3" />
                🇮🇳 India's Freshest Beverages
              </motion.span>

              <h1 className="font-display text-[clamp(3.5rem,9vw,7.5rem)] font-black text-white leading-[0.9] mb-6 neon-headline">
                Take a{" "}
                <span className="gradient-text-brand block">Chill Pill</span>
              </h1>

              <p className="text-white/60 text-lg md:text-xl leading-relaxed mb-10 max-w-2xl mx-auto">
                India's freshest new beverages, packed with flavor and fun.
                Natural, bold, and made for every mood — from tangy orange
                sunrise to masaledar jeera nights.
              </p>

              <div className="flex flex-wrap gap-4 mb-14 justify-center">
                <Link
                  to="/shop"
                  className="btn-shimmer relative flex items-center gap-2.5 px-8 py-4 rounded-full bg-[#FF6B35] hover:bg-[#e55a25] text-white font-black text-base transition-smooth hover:scale-105 active:scale-95 pulse-glow-orange shadow-lg"
                  data-ocid="hero-shop-now"
                >
                  Shop Now <ArrowRight className="w-5 h-5" />
                </Link>
                <button
                  type="button"
                  onClick={scrollToFeatured}
                  className="flex items-center gap-2.5 px-8 py-4 rounded-full border border-white/20 text-white hover:bg-white/10 font-bold text-base transition-smooth backdrop-blur-sm"
                  data-ocid="hero-explore"
                >
                  Explore Flavors
                </button>
              </div>

              {/* Stats with counter animation */}
              <div
                ref={statsRef as React.RefObject<HTMLDivElement>}
                className="flex gap-8 md:gap-16 justify-center"
              >
                {STATS.map((s, i) => (
                  <motion.div
                    key={s.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 + i * 0.1, duration: 0.5 }}
                    className="text-center"
                  >
                    <div className="font-display text-3xl md:text-4xl font-black gradient-text-brand">
                      <AnimatedCounter
                        target={s.target}
                        suffix={s.suffix}
                        isVisible={statsVisible}
                        duration={1600 + i * 200}
                      />
                    </div>
                    <div className="text-white/40 text-xs mt-0.5">
                      {s.label}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/30 text-xs"
        >
          <span className="tracking-widest uppercase">scroll</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
            className="w-px h-8 bg-gradient-to-b from-white/40 to-transparent"
          />
        </motion.div>
      </section>

      {/* ── Flavors strip ─────────────────────────────────────────── */}
      <div className="bg-[#FF6B35] py-3 overflow-hidden">
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            duration: 20,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
          className="flex gap-8 whitespace-nowrap"
        >
          {Array.from({ length: 4 }).flatMap(() =>
            products.map((p) => (
              <span
                key={`${p.id}-strip`}
                className="text-white font-black text-sm tracking-widest uppercase flex items-center gap-3"
              >
                <span className="w-2 h-2 rounded-full bg-white/60 inline-block" />
                {p.name}
              </span>
            )),
          )}
        </motion.div>
      </div>

      {/* ── Marquee text banner ───────────────────────────────────── */}
      <MarqueeBanner />

      {/* ── Featured Products ─────────────────────────────────────── */}
      <section
        ref={featuredRef}
        className="py-28 bg-[#0D0D20] relative overflow-hidden"
      >
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        </div>

        <div className="container mx-auto px-4 sm:px-6">
          <div
            ref={productsRef as React.RefObject<HTMLDivElement>}
            className={`text-center mb-16 fade-in-up ${productsVisible ? "visible" : ""}`}
          >
            <span className="text-[#7CB518] text-xs font-bold tracking-widest uppercase">
              Our Flavors
            </span>
            <h2 className="font-display text-5xl md:text-6xl font-black text-white mt-3 mb-5">
              Pick Your <span className="gradient-text-brand">Chill</span>
            </h2>
            <p className="text-white/50 text-lg max-w-md mx-auto">
              Six bold flavors, one mission: keep India refreshed, naturally.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-14">
            {products.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>

          <div className="text-center">
            <Link
              to="/products"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full border border-white/20 text-white hover:bg-white/10 font-bold transition-smooth hover:scale-105"
              data-ocid="home-view-all"
            >
              View All Products <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── Marquee banner 2 ─────────────────────────────────────── */}
      <MarqueeBanner />

      {/* ── Hero image band ───────────────────────────────────────── */}
      <section className="relative h-80 md:h-96 overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(135deg, #FF6B35 0%, #FFD700 25%, #7CB518 50%, #00B4D8 75%, #9B5DE5 100%)",
          }}
        />
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div
            className="absolute top-[-20%] left-[-5%] w-72 h-72 rounded-full opacity-30 blur-2xl"
            style={{
              background: "radial-gradient(circle, #FFD700, transparent)",
            }}
          />
          <div
            className="absolute bottom-[-20%] right-[-5%] w-80 h-80 rounded-full opacity-25 blur-2xl"
            style={{
              background: "radial-gradient(circle, #9B5DE5, transparent)",
            }}
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#0D0D20]/60 via-transparent to-[#0A0A1A]/60" />
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-center"
          >
            <p className="font-display text-3xl md:text-5xl font-black text-white">
              Fresh is the new <span className="gradient-text-brand">cool</span>
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Brand Values ──────────────────────────────────────────── */}
      <section className="py-28 bg-[#0A0A1A] relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] rounded-full opacity-5 blur-3xl"
            style={{
              background:
                "radial-gradient(circle, #FF6B35 0%, #9B5DE5 50%, transparent 100%)",
            }}
          />
        </div>

        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <div
            ref={valuesRef as React.RefObject<HTMLDivElement>}
            className={`text-center mb-16 fade-in-up ${valuesVisible ? "visible" : ""}`}
          >
            <span className="text-[#00B4D8] text-xs font-bold tracking-widest uppercase">
              Why Chill Pill
            </span>
            <h2 className="font-display text-5xl md:text-6xl font-black text-white mt-3">
              Made <span className="gradient-text-cool">Different</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {VALUES.map((v, i) => (
              <ValueCard key={v.label} {...v} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Delivery banner ───────────────────────────────────────── */}
      <section
        className="py-14 relative overflow-hidden"
        style={{
          background: "linear-gradient(135deg, #7CB518 0%, #00B4D8 100%)",
        }}
      >
        <div className="container mx-auto px-4 sm:px-6 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-12"
          >
            <div className="text-white">
              <div className="font-display text-4xl font-black">
                🚚 Free Delivery
              </div>
              <div className="text-white/80 text-sm mt-1">
                On orders above ₹499
              </div>
            </div>
            <div className="w-px h-12 bg-white/30 hidden sm:block" />
            <div className="text-white">
              <div className="font-display text-4xl font-black">
                📦 3–7 Days
              </div>
              <div className="text-white/80 text-sm mt-1">
                Pan India delivery
              </div>
            </div>
            <div className="w-px h-12 bg-white/30 hidden sm:block" />
            <div className="text-white">
              <div className="font-display text-4xl font-black">
                🌿 100% Natural
              </div>
              <div className="text-white/80 text-sm mt-1">
                No artificial anything
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Social section ────────────────────────────────────────── */}
      <section
        className="py-28 bg-[#0D0D20]"
        ref={socialRef as React.RefObject<HTMLElement>}
      >
        <div className="container mx-auto px-4 sm:px-6">
          <div
            className={`text-center mb-14 fade-in-up ${socialVisible ? "visible" : ""}`}
          >
            <span className="text-[#FF6B35] text-xs font-bold tracking-widest uppercase">
              Social
            </span>
            <h2 className="font-display text-5xl md:text-6xl font-black text-white mt-3 mb-4">
              Join the <span className="gradient-text-brand">Chill Gang</span>
            </h2>
            <p className="text-white/50 text-lg max-w-sm mx-auto">
              Tag us{" "}
              <span className="text-white font-semibold">@chillpill.in</span>{" "}
              and share your chill moment
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-5">
            {SOCIAL.map((s) => (
              <SocialCard key={s.label} {...s} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Newsletter ────────────────────────────────────────────── */}
      <section
        className="py-28 bg-[#0A0A1A]"
        ref={newsletterRef as React.RefObject<HTMLElement>}
      >
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className={`max-w-2xl mx-auto text-center fade-in-up ${newsletterVisible ? "visible" : ""}`}
          >
            <div className="glass-card rounded-3xl p-10 md:p-14 border border-white/10">
              <div className="text-4xl mb-5">🎉</div>
              <h2 className="font-display text-4xl md:text-5xl font-black text-white mb-4">
                Stay in the <span className="gradient-text-brand">Loop</span>
              </h2>
              <p className="text-white/50 text-base mb-8">
                Get exclusive deals, new flavor launches, and chill vibes
                straight to your inbox. No spam — only good stuff.
              </p>

              {subscribed ? (
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="flex items-center justify-center gap-3 py-4"
                >
                  <div className="w-8 h-8 rounded-full bg-[#7CB518] flex items-center justify-center">
                    <span className="text-white text-lg">✓</span>
                  </div>
                  <span className="text-white font-bold text-lg">
                    You're subscribed! Welcome to the gang 🤙
                  </span>
                </motion.div>
              ) : (
                <form
                  onSubmit={handleSubscribe}
                  className="flex flex-col sm:flex-row gap-3"
                  data-ocid="newsletter-form"
                >
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    required
                    className="flex-1 px-5 py-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/30 focus:outline-none focus:border-[#FF6B35] focus:bg-white/15 transition-smooth text-sm"
                    data-ocid="newsletter-email"
                  />
                  <button
                    type="submit"
                    className="btn-shimmer relative px-8 py-4 rounded-xl bg-[#FF6B35] hover:bg-[#e55a25] text-white font-black transition-smooth hover:scale-105 active:scale-95 whitespace-nowrap glow-orange"
                    data-ocid="newsletter-subscribe"
                  >
                    Subscribe 🚀
                  </button>
                </form>
              )}

              <p className="text-white/25 text-xs mt-4">
                No spam ever. Unsubscribe anytime.
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
