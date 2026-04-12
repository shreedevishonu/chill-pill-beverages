import { Link, useLocation } from "@tanstack/react-router";
import { Minus, Plus, ShoppingBag, ShoppingCart, Truck, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect } from "react";
import { useCartStore } from "../store/cartStore";

export default function GlobalCartSidebar() {
  const {
    items,
    removeFromCart,
    updateQuantity,
    total,
    itemCount,
    isOpen,
    closeCart,
  } = useCartStore();
  const location = useLocation();

  // Don't render on ShopPage — it has its own integrated cart sidebar
  const isShopPage = location.pathname === "/shop";

  const count = itemCount();
  const subtotal = total();
  const delivery = subtotal >= 499 ? 0 : subtotal > 0 ? 49 : 0;
  const grandTotal = subtotal + delivery;

  // Lock body scroll when open
  useEffect(() => {
    if (!isShopPage) {
      document.body.style.overflow = isOpen ? "hidden" : "";
      return () => {
        document.body.style.overflow = "";
      };
    }
  }, [isOpen, isShopPage]);

  if (isShopPage) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="global-cart-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40"
            style={{
              background: "rgba(0,0,0,0.7)",
              backdropFilter: "blur(4px)",
            }}
            onClick={closeCart}
            aria-hidden="true"
          />

          {/* Sidebar panel */}
          <motion.aside
            key="global-cart-panel"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 280 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-[420px] z-50 flex flex-col"
            style={{
              background: "rgba(13,13,32,0.97)",
              borderLeft: "1px solid rgba(255,255,255,0.1)",
              backdropFilter: "blur(24px)",
            }}
            data-ocid="global-cart-sidebar"
            aria-label="Shopping cart"
            aria-modal="true"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
              <div className="flex items-center gap-3">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center"
                  style={{ background: "rgba(255,107,53,0.2)" }}
                >
                  <ShoppingCart
                    className="w-4 h-4"
                    style={{ color: "#FF6B35" }}
                  />
                </div>
                <h2 className="font-display text-lg font-black text-white">
                  Your Cart
                  {count > 0 && (
                    <span
                      className="ml-2 text-sm font-bold px-2 py-0.5 rounded-full"
                      style={{
                        background: "rgba(255,107,53,0.2)",
                        color: "#FF6B35",
                      }}
                    >
                      {count}
                    </span>
                  )}
                </h2>
              </div>
              <button
                type="button"
                onClick={closeCart}
                className="w-8 h-8 rounded-full flex items-center justify-center transition-smooth hover:bg-white/10 text-white/50 hover:text-white"
                aria-label="Close cart"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Delivery banner */}
            {count > 0 && delivery > 0 && (
              <div
                className="mx-4 mt-3 px-4 py-2.5 rounded-xl text-xs font-medium flex items-center gap-2"
                style={{
                  background: "rgba(255,215,0,0.1)",
                  border: "1px solid rgba(255,215,0,0.2)",
                  color: "#FFD700",
                }}
              >
                <Truck className="w-3.5 h-3.5 flex-shrink-0" />
                Add ₹{499 - subtotal} more for FREE delivery!
              </div>
            )}
            {count > 0 && delivery === 0 && (
              <div
                className="mx-4 mt-3 px-4 py-2.5 rounded-xl text-xs font-medium flex items-center gap-2"
                style={{
                  background: "rgba(124,181,24,0.1)",
                  border: "1px solid rgba(124,181,24,0.25)",
                  color: "#7CB518",
                }}
              >
                <Truck className="w-3.5 h-3.5 flex-shrink-0" />🎉 FREE delivery
                unlocked!
              </div>
            )}

            {/* Items list */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
              {items.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-col items-center justify-center py-16 text-center"
                  data-ocid="global-cart-empty"
                >
                  <div
                    className="w-20 h-20 rounded-full flex items-center justify-center mb-4"
                    style={{ background: "rgba(255,107,53,0.1)" }}
                  >
                    <ShoppingBag
                      className="w-10 h-10"
                      style={{ color: "rgba(255,107,53,0.5)" }}
                    />
                  </div>
                  <h3 className="text-white font-display font-bold text-lg mb-1">
                    Your cart is empty
                  </h3>
                  <p className="text-white/40 text-sm mb-5">
                    Add some Chill Pills to get started!
                  </p>
                  <button
                    type="button"
                    onClick={closeCart}
                    className="px-5 py-2 rounded-full text-sm font-bold transition-smooth hover:scale-105"
                    style={{
                      background: "rgba(255,107,53,0.15)",
                      border: "1px solid rgba(255,107,53,0.4)",
                      color: "#FF6B35",
                    }}
                  >
                    Browse Products
                  </button>
                </motion.div>
              ) : (
                <AnimatePresence initial={false}>
                  {items.map((item) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20, height: 0, marginBottom: 0 }}
                      transition={{
                        type: "spring",
                        damping: 25,
                        stiffness: 300,
                      }}
                      className="flex items-center gap-3 p-3 rounded-xl"
                      style={{
                        background: "rgba(255,255,255,0.05)",
                        border: "1px solid rgba(255,255,255,0.1)",
                      }}
                      data-ocid={`global-cart-item-${item.id}`}
                    >
                      {/* Color swatch */}
                      <div
                        className="w-12 h-12 rounded-xl flex-shrink-0 flex items-center justify-center"
                        style={{
                          background: `radial-gradient(circle at 35% 35%, ${item.color}, ${item.color}66)`,
                          boxShadow: `0 0 12px ${item.color}44`,
                        }}
                      >
                        <div className="w-5 h-5 rounded-full bg-white/20" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-white font-semibold text-sm truncate">
                          {item.name}
                        </div>
                        <div className="text-white/40 text-xs mt-0.5">
                          ₹{item.price} each
                        </div>
                      </div>
                      {/* Qty controls */}
                      <div className="flex items-center gap-1.5">
                        <button
                          type="button"
                          onClick={() =>
                            updateQuantity(item.id, item.quantity - 1)
                          }
                          className="w-7 h-7 rounded-full flex items-center justify-center transition-smooth hover:bg-white/20"
                          style={{ background: "rgba(255,255,255,0.1)" }}
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3 h-3 text-white" />
                        </button>
                        <span className="text-white font-bold text-sm w-5 text-center">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() =>
                            updateQuantity(item.id, item.quantity + 1)
                          }
                          className="w-7 h-7 rounded-full flex items-center justify-center transition-smooth hover:bg-white/20"
                          style={{ background: "rgba(255,255,255,0.1)" }}
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3 h-3 text-white" />
                        </button>
                      </div>
                      <div className="text-white font-bold text-sm min-w-[44px] text-right">
                        ₹{item.price * item.quantity}
                      </div>
                      <button
                        type="button"
                        onClick={() => removeFromCart(item.id)}
                        className="w-6 h-6 rounded-full flex items-center justify-center transition-smooth text-white/30 hover:text-red-400 hover:bg-red-500/20"
                        aria-label={`Remove ${item.name}`}
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </motion.div>
                  ))}
                </AnimatePresence>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="px-5 py-4 border-t border-white/10 space-y-3">
                <div className="space-y-1.5">
                  <div className="flex justify-between text-white/50 text-sm">
                    <span>Subtotal</span>
                    <span>₹{subtotal}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-white/50">Delivery</span>
                    <span
                      style={{
                        color:
                          delivery === 0 ? "#7CB518" : "rgba(255,255,255,0.5)",
                      }}
                    >
                      {delivery === 0 ? "FREE" : `₹${delivery}`}
                    </span>
                  </div>
                  <div className="flex justify-between text-white font-bold text-lg pt-2 border-t border-white/10">
                    <span>Total</span>
                    <span>₹{grandTotal}</span>
                  </div>
                </div>
                <Link
                  to="/shop"
                  onClick={closeCart}
                  className="w-full py-3.5 rounded-xl text-white font-bold text-base flex items-center justify-center gap-2 transition-smooth hover:scale-[1.02] active:scale-[0.98]"
                  style={{
                    background: "linear-gradient(135deg, #FF6B35, #e55a25)",
                    display: "flex",
                  }}
                  data-ocid="global-cart-checkout-btn"
                >
                  <ShoppingCart className="w-4 h-4" />
                  Checkout — ₹{grandTotal}
                </Link>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
