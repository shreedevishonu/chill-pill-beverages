import { Link, useParams } from "@tanstack/react-router";
import { ArrowLeft, Minus, Plus, ShoppingCart } from "lucide-react";
import { motion } from "motion/react";
import { useRef, useState } from "react";
import { toast } from "sonner";
import BottleCanvas from "../components/BottleCanvas";
import { ErrorBoundary } from "../components/ErrorBoundary";
import ProductCard from "../components/ProductCard";
import { getProductById, getRelatedProducts } from "../data/products";
import {
  useScrollAnimation,
  useStaggeredAnimation,
} from "../hooks/useScrollAnimation";
import { useCartStore } from "../store/cartStore";

export default function ProductDetailPage() {
  const { id } = useParams({ from: "/products/$id" });
  const [quantity, setQuantity] = useState(1);
  const [imgError, setImgError] = useState(false);
  const addToCart = useCartStore((s) => s.addToCart);
  const openCart = useCartStore((s) => s.openCart);

  const product = getProductById(id);
  const relatedProducts = product ? getRelatedProducts(id) : [];

  const detailsAnimRef = useRef<HTMLDivElement>(null);
  const { ref: scrollRef, isVisible: detailsVisible } = useScrollAnimation({
    threshold: 0.1,
  });
  const { ref: relatedRef, visibleItems } = useStaggeredAnimation(
    relatedProducts.length,
    { threshold: 0.1 },
  );

  // Merge refs helper
  const setDetailsRef = (el: HTMLDivElement | null) => {
    (detailsAnimRef as React.MutableRefObject<HTMLDivElement | null>).current =
      el;
    (
      scrollRef as unknown as React.MutableRefObject<HTMLDivElement | null>
    ).current = el;
  };

  if (!product) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center gap-6 px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <div className="text-8xl mb-6">🫙</div>
          <h1 className="text-4xl font-display font-black text-white mb-3">
            Product Not Found
          </h1>
          <p className="text-white/60 mb-8 text-lg">
            This product doesn't exist or may have been removed.
          </p>
          <Link
            to="/products"
            className="inline-flex items-center gap-2 px-8 py-3 rounded-2xl font-bold text-white transition-smooth hover:scale-105 active:scale-95"
            style={{ backgroundColor: "#FF6B35" }}
            data-ocid="product-not-found-back"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Products
          </Link>
        </motion.div>
      </div>
    );
  }

  const showImage = product.image && !imgError;

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        color: product.color,
      });
    }
    toast.success(`${quantity}× ${product.name} added to cart!`, {
      description: `Total: ₹${product.price * quantity}`,
      action: { label: "View Cart", onClick: openCart },
    });
  };

  return (
    <div
      className="min-h-screen relative"
      style={{
        background: `radial-gradient(ellipse 80% 60% at 15% 25%, ${product.color}1f 0%, transparent 55%),
                     radial-gradient(ellipse 55% 45% at 85% 75%, ${product.color}0f 0%, transparent 50%),
                     #0d0d1a`,
      }}
    >
      {/* Back navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-2">
        <Link
          to="/products"
          className="inline-flex items-center gap-2 text-white/50 hover:text-white transition-smooth text-sm font-medium group"
          data-ocid="product-back-link"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          Back to Products
        </Link>
      </div>

      {/* Main product section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-14">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left: Product Image or 3D Bottle fallback */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="relative flex justify-center"
          >
            {/* Ambient glow */}
            <div
              className="absolute inset-8 rounded-full blur-3xl opacity-25 pointer-events-none"
              style={{
                background: `radial-gradient(circle, ${product.color}, transparent 70%)`,
              }}
            />
            {/* Glassmorphism card */}
            <div
              className="relative w-full max-w-sm rounded-3xl border border-white/10 backdrop-blur-md overflow-hidden"
              style={{ background: `${product.color}0d` }}
            >
              {showImage ? (
                <div
                  className="w-full h-[420px] flex items-center justify-center p-6"
                  style={{
                    background: `radial-gradient(circle at 50% 40%, ${product.color}22 0%, transparent 70%)`,
                  }}
                >
                  <motion.img
                    src={product.image}
                    alt={product.name}
                    onError={() => setImgError(true)}
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    whileHover={{ scale: 1.04 }}
                    className="h-full w-full object-contain"
                    style={{
                      filter: `drop-shadow(0 8px 32px ${product.color}66)`,
                      maxHeight: "380px",
                    }}
                  />
                </div>
              ) : (
                <ErrorBoundary
                  fallback={
                    <div
                      className="w-full h-[420px] flex items-center justify-center"
                      style={{
                        background: `radial-gradient(circle at 50% 50%, ${product.color}44, transparent 70%)`,
                      }}
                    >
                      <div
                        className="w-32 h-32 rounded-full animate-float"
                        style={{
                          background: `radial-gradient(circle at 35% 35%, ${product.color}, ${product.color}88)`,
                          boxShadow: `0 0 60px ${product.color}66`,
                        }}
                      />
                    </div>
                  }
                >
                  <BottleCanvas
                    color={product.color}
                    className="w-full h-[420px]"
                    speed={0.8}
                  />
                </ErrorBoundary>
              )}
              {/* Bottom gradient overlay */}
              <div
                className="absolute bottom-0 left-0 right-0 h-20 pointer-events-none"
                style={{
                  background: `linear-gradient(to top, ${product.color}1a, transparent)`,
                }}
              />
            </div>
          </motion.div>

          {/* Right: Product Details */}
          <motion.div
            ref={setDetailsRef}
            initial={{ opacity: 0, x: 50 }}
            animate={
              detailsVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }
            }
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.15 }}
            className="flex flex-col gap-5"
          >
            {/* Badge row */}
            <div className="flex items-center gap-3 flex-wrap">
              <span
                className="text-xs font-bold px-3 py-1.5 rounded-full border border-white/15 backdrop-blur-sm text-white"
                style={{ backgroundColor: `${product.color}33` }}
                data-ocid="product-type-badge"
              >
                {product.type}
              </span>
              <span className="text-white/35 text-xs tracking-wide">
                Chill Pill Original
              </span>
            </div>

            {/* Name */}
            <h1
              className="font-display text-5xl sm:text-6xl font-black leading-none text-white"
              data-ocid="product-name"
            >
              {product.name}
            </h1>

            {/* Tagline */}
            <p
              className="text-xl italic font-medium leading-snug"
              style={{ color: product.color }}
            >
              "{product.tagline}"
            </p>

            {/* Description */}
            <p className="text-white/65 text-base leading-relaxed">
              {product.description}
            </p>

            {/* Ingredients */}
            <div>
              <h3 className="text-white/40 text-xs font-bold uppercase tracking-widest mb-3">
                What's Inside
              </h3>
              <div className="flex flex-wrap gap-2">
                {product.ingredients.map((ingredient) => (
                  <span
                    key={ingredient}
                    className="text-xs font-semibold px-3 py-1.5 rounded-full border border-white/10 text-white/75"
                    style={{ backgroundColor: `${product.color}1a` }}
                  >
                    {ingredient}
                  </span>
                ))}
              </div>
            </div>

            <div className="h-px bg-white/10" />

            {/* Price */}
            <div className="flex items-baseline gap-3">
              <span
                className="font-display text-5xl font-black"
                style={{ color: "#FF6B35" }}
                data-ocid="product-price"
              >
                ₹{product.price}
              </span>
              <span className="text-white/40 text-sm">per bottle</span>
              {quantity > 1 && (
                <span className="text-white/60 text-sm font-semibold">
                  · Total ₹{product.price * quantity}
                </span>
              )}
            </div>

            {/* Quantity selector */}
            <div className="flex flex-col sm:flex-row gap-3">
              <div
                className="flex items-center gap-1 rounded-2xl border border-white/15 bg-white/5 backdrop-blur-sm px-2 py-1.5 w-fit"
                data-ocid="quantity-selector"
              >
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  disabled={quantity <= 1}
                  aria-label="Decrease quantity"
                  className="w-9 h-9 flex items-center justify-center rounded-xl text-white/55 hover:text-white hover:bg-white/10 transition-smooth disabled:opacity-30"
                  data-ocid="quantity-minus"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span
                  className="w-10 text-center font-display font-black text-xl text-white"
                  data-ocid="quantity-value"
                >
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.min(12, q + 1))}
                  disabled={quantity >= 12}
                  aria-label="Increase quantity"
                  className="w-9 h-9 flex items-center justify-center rounded-xl text-white/55 hover:text-white hover:bg-white/10 transition-smooth disabled:opacity-30"
                  data-ocid="quantity-plus"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              {/* Add to Cart CTA */}
              <motion.button
                type="button"
                onClick={handleAddToCart}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="flex-1 flex items-center justify-center gap-2.5 py-3.5 rounded-2xl font-bold text-white text-base shadow-lg"
                style={{
                  background:
                    "linear-gradient(135deg, #FF6B35 0%, #FF8C42 100%)",
                  boxShadow: "0 8px 30px #FF6B3555",
                }}
                data-ocid="add-to-cart-btn"
              >
                <ShoppingCart className="w-5 h-5" />
                Add to Cart
              </motion.button>
            </div>

            {/* Delivery note */}
            <p className="text-white/35 text-xs flex items-center gap-1.5">
              <span style={{ color: "#7CB518" }}>✓</span>
              Free delivery above ₹499 &nbsp;·&nbsp; Pan India 3–7 days
            </p>
          </motion.div>
        </div>
      </section>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
          {/* Divider with color accent */}
          <div
            className="h-px mb-12"
            style={{
              background: `linear-gradient(to right, transparent, ${product.color}55, transparent)`,
            }}
          />

          <div ref={relatedRef as unknown as React.RefObject<HTMLDivElement>}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={visibleItems[0] ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="mb-8"
            >
              <h2 className="text-3xl font-display font-black text-white mb-1">
                You Might Also Like
              </h2>
              <p className="text-white/40 text-sm">
                More from our {product.type} range
              </p>
            </motion.div>

            {/* Horizontal scroll on mobile, 3-col grid on desktop */}
            <div
              className="flex gap-5 overflow-x-auto pb-4 lg:grid lg:grid-cols-3 lg:overflow-visible"
              style={{ scrollbarWidth: "none" }}
              data-ocid="related-products"
            >
              {relatedProducts.map((related, idx) => (
                <motion.div
                  key={related.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={visibleItems[idx] ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: idx * 0.12 }}
                  className="min-w-[260px] lg:min-w-0 flex-shrink-0 lg:flex-shrink"
                >
                  <ProductCard product={related} index={idx} />
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
