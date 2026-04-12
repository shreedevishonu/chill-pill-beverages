import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import ProductCard from "../components/ProductCard";
import { products } from "../data/products";
import type { ProductType } from "../data/products";

type FilterType = "All" | ProductType;

const COMING_SOON = [
  {
    id: "mango-blast",
    hint: "🥭",
    type: "Juice",
    color: "#FFA000",
    label: "Tropical Fruit",
  },
  {
    id: "rose-sharbat",
    hint: "🌹",
    type: "Juice",
    color: "#E91E8C",
    label: "Floral Fusion",
  },
  {
    id: "kokum-cooler",
    hint: "🫐",
    type: "Soda",
    color: "#7B1FA2",
    label: "Berry Cooler",
  },
];

const FILTER_OPTIONS: FilterType[] = ["All", "Juice", "Soda"];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 36, scale: 0.94 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  },
  exit: {
    opacity: 0,
    y: -18,
    scale: 0.93,
    transition: { duration: 0.25, ease: "easeIn" as const },
  },
};

export default function ProductsPage() {
  const [filter, setFilter] = useState<FilterType>("All");

  const filtered =
    filter === "All" ? products : products.filter((p) => p.type === filter);

  return (
    <div className="min-h-screen pt-24 pb-24 relative overflow-hidden">
      {/* Background gradient */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 10% 20%, #FF6B3518 0%, transparent 50%), radial-gradient(ellipse 60% 40% at 90% 80%, #9B5DE518 0%, transparent 50%), #0A0A1A",
        }}
      />

      {/* Floating accent blobs */}
      <div
        className="absolute top-32 left-8 w-72 h-72 rounded-full opacity-20 pointer-events-none blur-3xl"
        style={{ background: "#FF6B35" }}
        aria-hidden="true"
      />
      <div
        className="absolute bottom-40 right-8 w-80 h-80 rounded-full opacity-15 pointer-events-none blur-3xl"
        style={{ background: "#9B5DE5" }}
        aria-hidden="true"
      />

      {/* Extra subtle mid-page glow blobs */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-[0.07] pointer-events-none blur-3xl"
        style={{ background: "#7CB518" }}
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Page header */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-14"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1, duration: 0.4 }}
            className="inline-block text-xs font-bold tracking-[0.2em] uppercase px-4 py-1.5 rounded-full mb-4 border border-white/20"
            style={{
              background: "rgba(255,107,53,0.15)",
              color: "#FF6B35",
            }}
          >
            6 Launch Flavors
          </motion.span>

          <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-black mb-4 leading-none tracking-tight">
            <span className="text-white">Our </span>
            <span className="gradient-text-brand">Drinks</span>
          </h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="text-white/50 max-w-sm mx-auto text-base leading-relaxed"
          >
            Juices &amp; sodas crafted for India's taste — fresh, bold, and
            unapologetically good.
          </motion.p>
        </motion.div>

        {/* Filter tabs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.45 }}
          className="flex justify-center gap-3 mb-12"
          data-ocid="product-filter-tabs"
        >
          {FILTER_OPTIONS.map((f) => {
            const isActive = filter === f;
            const count =
              f === "All"
                ? products.length
                : products.filter((p) => p.type === f).length;
            return (
              <button
                key={f}
                type="button"
                onClick={() => setFilter(f)}
                className={`relative px-6 py-2.5 rounded-full font-semibold text-sm transition-smooth focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60 ${
                  isActive
                    ? "text-white shadow-lg"
                    : "border border-white/20 text-white/60 hover:text-white hover:border-white/40 hover:bg-white/8"
                }`}
                style={
                  isActive
                    ? {
                        background: "linear-gradient(135deg, #FF6B35, #FFA500)",
                        boxShadow: "0 4px 20px rgba(255, 107, 53, 0.4)",
                      }
                    : {}
                }
                data-ocid={`filter-${f.toLowerCase()}`}
                aria-pressed={isActive}
              >
                {/* Active background uses layoutId for smooth transition */}
                {isActive && (
                  <motion.span
                    layoutId="filter-pill"
                    className="absolute inset-0 rounded-full"
                    style={{
                      background: "linear-gradient(135deg, #FF6B35, #FFA500)",
                    }}
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    aria-hidden="true"
                  />
                )}
                <span className="relative z-10">
                  {f}
                  <span
                    className={`ml-2 text-xs font-bold ${isActive ? "text-white/80" : "text-white/30"}`}
                  >
                    {count}
                  </span>
                </span>
              </button>
            );
          })}
        </motion.div>

        {/* Products grid with stagger + AnimatePresence */}
        <AnimatePresence mode="wait">
          <motion.div
            key={filter}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit={{ opacity: 0, transition: { duration: 0.2 } }}
            /* Consistent gap, good breathing room for hover scale */
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-20"
            data-ocid="products-grid"
          >
            {filtered.map((product, i) => (
              <motion.div
                key={product.id}
                variants={cardVariants}
                custom={i}
                data-ocid={`product-grid-item-${product.id}`}
                /* Extra padding space so scale-up doesn't clip at grid edges */
                className="p-1"
              >
                <ProductCard product={product} index={i} />
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Coming soon divider */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative mb-16"
        >
          <div className="border-t border-white/10" />
          <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        </motion.div>

        {/* Coming soon section */}
        <div data-ocid="coming-soon-section">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <span
              className="inline-block text-xs font-bold tracking-[0.2em] uppercase px-4 py-1.5 rounded-full mb-4 border border-purple-400/30"
              style={{
                background: "rgba(155,93,229,0.12)",
                color: "#9B5DE5",
              }}
            >
              Sneak Peek
            </span>
            <h2 className="font-display text-4xl sm:text-5xl font-black text-white">
              More <span className="gradient-text-cool">Flavors</span> Dropping
            </h2>
            <p className="text-white/40 mt-3 text-sm">
              Something exciting is brewing — stay tuned 👀
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {COMING_SOON.map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 24, scale: 0.96 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{
                  delay: i * 0.12,
                  duration: 0.5,
                  ease: [0.22, 1, 0.36, 1],
                }}
                data-ocid={`coming-soon-${item.id}`}
                className="relative group rounded-2xl overflow-hidden border border-white/10 cursor-not-allowed select-none"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  backdropFilter: "blur(20px)",
                  WebkitBackdropFilter: "blur(20px)",
                }}
              >
                {/* Color hero area */}
                <div
                  className="h-48 flex items-center justify-center relative overflow-hidden"
                  style={{
                    background: `linear-gradient(135deg, ${item.color}18 0%, ${item.color}38 100%)`,
                  }}
                >
                  <div
                    className="w-20 h-20 rounded-full blur-xl opacity-60"
                    style={{
                      background: `radial-gradient(circle at 35% 35%, ${item.color}, ${item.color}44)`,
                    }}
                    aria-hidden="true"
                  />
                  <span
                    className="absolute text-6xl font-black select-none"
                    style={{
                      color: `${item.color}55`,
                      fontFamily: "var(--font-display)",
                      filter: "blur(1px)",
                    }}
                    aria-hidden="true"
                  >
                    ?
                  </span>
                  <span
                    className="absolute text-4xl opacity-40 blur-sm group-hover:blur-0 group-hover:opacity-70 transition-all duration-500"
                    aria-hidden="true"
                  >
                    {item.hint}
                  </span>

                  <span
                    className="absolute top-3 right-3 text-xs font-bold px-2.5 py-1 rounded-full backdrop-blur-md border border-white/20 text-white/60"
                    style={{ backgroundColor: "rgba(255,255,255,0.08)" }}
                  >
                    {item.type}
                  </span>
                </div>

                {/* Card content — blurred */}
                <div className="p-5 relative">
                  <div
                    className="absolute inset-0"
                    style={{
                      backdropFilter: "blur(3px)",
                      WebkitBackdropFilter: "blur(3px)",
                      background: "rgba(10,10,26,0.25)",
                    }}
                    aria-hidden="true"
                  />
                  <div className="relative z-10">
                    <h3 className="font-display text-lg font-bold text-white/30 mb-1 blur-sm">
                      {item.label}
                    </h3>
                    <p className="text-white/20 text-xs mb-4 blur-sm">
                      Stay tuned for launch
                    </p>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-2xl font-display font-black text-white/20 blur-sm">
                        ₹??
                      </span>
                    </div>
                    <div className="flex gap-2">
                      <div className="flex-1 h-10 rounded-xl border border-white/10 bg-white/5 blur-sm" />
                      <div className="flex-1 h-10 rounded-xl bg-white/10 blur-sm" />
                    </div>
                  </div>
                </div>

                {/* Coming soon badge overlay */}
                <div className="absolute inset-0 flex items-end justify-center pb-8 pointer-events-none">
                  <motion.span
                    animate={{ y: [0, -4, 0] }}
                    transition={{
                      repeat: Number.POSITIVE_INFINITY,
                      duration: 2.5,
                      delay: i * 0.4,
                      ease: "easeInOut",
                    }}
                    className="flex items-center gap-2 text-white font-bold text-sm px-5 py-2.5 rounded-full border border-white/25"
                    style={{
                      background: "rgba(26,26,46,0.85)",
                      backdropFilter: "blur(12px)",
                      WebkitBackdropFilter: "blur(12px)",
                      boxShadow: `0 4px 24px ${item.color}44`,
                    }}
                  >
                    <span>🔒</span>
                    <span>Coming Soon</span>
                  </motion.span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
