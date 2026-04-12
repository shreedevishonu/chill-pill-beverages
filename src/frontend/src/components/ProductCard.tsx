import { Link } from "@tanstack/react-router";
import { Eye, ShoppingCart } from "lucide-react";
import { motion } from "motion/react";
import { useRef, useState } from "react";
import { toast } from "sonner";
import type { Product } from "../data/products";
import { useCartStore } from "../store/cartStore";

interface ProductCardProps {
  product: Product;
  index?: number;
}

/** Compute a complementary accent for gradient border based on product color */
function getGradientAccent(color: string): string {
  const map: Record<string, string> = {
    "#FF6B35": "#9B5DE5",
    "#7CB518": "#00B4D8",
    "#FFD700": "#FF6B35",
    "#00B4D8": "#7CB518",
    "#9B5DE5": "#FF6B35",
    "#E91E8C": "#FFD700",
    "#FFA000": "#9B5DE5",
    "#7B1FA2": "#00B4D8",
  };
  return map[color] ?? "#FFD700";
}

export default function ProductCard({ product, index = 0 }: ProductCardProps) {
  const addToCart = useCartStore((s) => s.addToCart);
  const openCart = useCartStore((s) => s.openCart);
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [imgError, setImgError] = useState(false);

  const accent = getGradientAccent(product.color);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || isTouchDevice) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = ((e.clientY - rect.top) / rect.height - 0.5) * 14;
    const y = ((e.clientX - rect.left) / rect.width - 0.5) * -14;
    setTilt({ x, y });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
    setIsHovered(false);
  };

  const handleTouchStart = () => {
    setIsTouchDevice(true);
    setIsHovered(true);
  };

  const handleTouchEnd = () => {
    setIsHovered(false);
  };

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      color: product.color,
    });
    toast.success(`${product.name} added to cart!`, {
      action: { label: "View Cart", onClick: openCart },
    });
  };

  const showImage = product.image && !imgError;

  /* Prominent multi-layer glow on hover */
  const hoverBoxShadow = isHovered
    ? `0 0 30px ${product.color}80, 0 0 60px ${product.color}4D, 0 0 100px ${product.color}26, 0 20px 60px rgba(0,0,0,0.45)`
    : "0 4px 24px rgba(0,0,0,0.25)";

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      data-ocid={`product-card-${product.id}`}
      /* Scale-up on hover (spring) */
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.98 }}
      style={{
        borderRadius: "1rem",
        /* outer glow ring */
        boxShadow: hoverBoxShadow,
        transition: "box-shadow 0.35s ease",
      }}
    >
      {/* ── Gradient border wrapper ───────────────────────────── */}
      <div
        className="relative rounded-2xl p-px"
        style={{
          background: isHovered
            ? `linear-gradient(135deg, ${product.color}, ${accent}, #FFD700, ${product.color})`
            : "transparent",
          transition: "background 0.35s ease",
        }}
      >
        {/* ── Card body ─────────────────────────────────────── */}
        <div
          ref={cardRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          onMouseEnter={() => setIsHovered(true)}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          className="relative group rounded-2xl overflow-hidden bg-[#1A1A2E]/90 backdrop-blur-md cursor-pointer h-full"
          style={{
            transform: isTouchDevice
              ? undefined
              : `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
            transition: "transform 0.15s ease-out",
          }}
        >
          {/* Animated inner glow overlay on hover */}
          <div
            className="absolute inset-0 pointer-events-none rounded-2xl"
            style={{
              background: isHovered
                ? `radial-gradient(ellipse at 50% 0%, ${product.color}28 0%, transparent 65%)`
                : "transparent",
              transition: "background 0.4s ease",
            }}
            aria-hidden="true"
          />

          {/* Hero area */}
          <div
            className="relative h-52 flex items-center justify-center overflow-hidden"
            style={{
              background: `linear-gradient(135deg, ${product.color}22 0%, ${product.color}44 100%)`,
            }}
          >
            {showImage ? (
              <motion.img
                src={product.image}
                alt={product.name}
                onError={() => setImgError(true)}
                animate={{ scale: isHovered ? 1.1 : 1 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="h-44 w-full object-contain drop-shadow-2xl"
                style={{
                  filter: isHovered
                    ? `drop-shadow(0 0 22px ${product.color}CC) drop-shadow(0 0 40px ${product.color}66)`
                    : `drop-shadow(0 4px 12px ${product.color}44)`,
                  transition: "filter 0.35s ease",
                }}
              />
            ) : (
              <div
                className="w-24 h-24 rounded-full opacity-80 animate-float"
                style={{
                  background: `radial-gradient(circle at 35% 35%, ${product.color}ff, ${product.color}88)`,
                  boxShadow: `0 0 ${isHovered ? "70px" : "40px"} ${product.color}${isHovered ? "BB" : "66"}`,
                  transition: "box-shadow 0.3s ease",
                  animationDelay: `${index * 0.5}s`,
                }}
              />
            )}

            {/* Type badge */}
            <span
              className="absolute top-3 right-3 text-xs font-bold px-2.5 py-1 rounded-full text-white backdrop-blur-md border border-white/20"
              style={{ backgroundColor: `${product.color}66` }}
            >
              {product.type}
            </span>

            {/* Shimmer line on hover */}
            {isHovered && (
              <motion.div
                initial={{ x: "-120%", opacity: 0 }}
                animate={{ x: "120%", opacity: [0, 0.6, 0] }}
                transition={{ duration: 0.7, ease: "easeInOut" }}
                className="absolute inset-y-0 w-1/3 pointer-events-none"
                style={{
                  background: `linear-gradient(90deg, transparent, ${product.color}55, transparent)`,
                  transform: "skewX(-15deg)",
                }}
                aria-hidden="true"
              />
            )}
          </div>

          {/* Content */}
          <div className="p-5">
            <h3 className="font-display text-lg font-bold text-white mb-1 truncate">
              {product.name}
            </h3>
            <p className="text-white/50 text-xs mb-4 line-clamp-2">
              {product.tagline}
            </p>

            <div className="flex items-center justify-between mb-4">
              <span className="text-2xl font-display font-black text-white">
                ₹{product.price}
              </span>
              <span className="text-white/40 text-xs">per bottle</span>
            </div>

            <div className="flex gap-2">
              <Link
                to="/products/$id"
                params={{ id: product.id }}
                className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl border border-white/20 text-white/80 hover:text-white hover:bg-white/10 transition-smooth text-sm font-medium"
                data-ocid={`product-view-${product.id}`}
              >
                <Eye className="w-3.5 h-3.5" />
                Details
              </Link>
              <button
                type="button"
                onClick={handleAddToCart}
                className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-white text-sm font-bold transition-smooth hover:scale-105 active:scale-95"
                style={{
                  backgroundColor: product.color,
                  boxShadow: isHovered
                    ? `0 4px 24px ${product.color}88, 0 0 12px ${product.color}55`
                    : "none",
                  transition: "box-shadow 0.3s ease, transform 0.15s ease",
                }}
                data-ocid={`product-add-cart-${product.id}`}
              >
                <ShoppingCart className="w-3.5 h-3.5" />
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
