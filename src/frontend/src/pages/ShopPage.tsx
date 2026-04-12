import { Link } from "@tanstack/react-router";
import {
  CheckCircle,
  MapPin,
  Minus,
  Package,
  Plus,
  ShoppingBag,
  ShoppingCart,
  Truck,
  X,
  Zap,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

import ProductCard from "../components/ProductCard";
import { products } from "../data/products";
import { useCartStore } from "../store/cartStore";

interface CheckoutForm {
  name: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  payment: "upi" | "card" | "cod";
}

const STATES = [
  "Andhra Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Delhi",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
];

const PAYMENT_METHODS = [
  {
    value: "upi",
    label: "UPI / GPay",
    icon: "📱",
    desc: "Google Pay, PhonePe, Paytm",
  },
  {
    value: "card",
    label: "Credit / Debit Card",
    icon: "💳",
    desc: "Visa, Mastercard, RuPay",
  },
  {
    value: "cod",
    label: "Cash on Delivery",
    icon: "💵",
    desc: "Pay when your order arrives",
  },
] as const;

export default function ShopPage() {
  const {
    items,
    removeFromCart,
    updateQuantity,
    total,
    itemCount,
    isOpen,
    openCart,
    closeCart,
  } = useCartStore();
  const count = itemCount();
  const subtotal = total();
  const delivery = subtotal >= 499 ? 0 : subtotal > 0 ? 49 : 0;
  const grandTotal = subtotal + delivery;

  const [step, setStep] = useState<"browse" | "checkout" | "confirmed">(
    "browse",
  );
  const [form, setForm] = useState<CheckoutForm>({
    name: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    payment: "upi",
  });

  // Lock body scroll when cart is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const set = (key: keyof CheckoutForm, value: string) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setStep("confirmed");
    closeCart();
    useCartStore.getState().clearCart();
  };

  return (
    <div className="min-h-screen" style={{ background: "#0A0A1A" }}>
      {/* Cart Backdrop + Sidebar */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              key="cart-backdrop"
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
            <motion.aside
              key="cart-panel"
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
              data-ocid="cart-sidebar"
              aria-label="Shopping cart"
              aria-modal="true"
            >
              {/* Cart Header */}
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

              {/* Delivery Banner */}
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
                  <Truck className="w-3.5 h-3.5 flex-shrink-0" />🎉 You've
                  unlocked FREE delivery!
                </div>
              )}

              {/* Cart Items */}
              <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
                {items.length === 0 ? (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col items-center justify-center py-16 text-center"
                    data-ocid="cart-empty-state"
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
                        exit={{
                          opacity: 0,
                          x: -20,
                          height: 0,
                          marginBottom: 0,
                        }}
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
                        data-ocid={`cart-item-${item.id}`}
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
                        {/* Quantity controls */}
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

              {/* Cart Footer */}
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
                            delivery === 0
                              ? "#7CB518"
                              : "rgba(255,255,255,0.5)",
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
                  <motion.button
                    type="button"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      closeCart();
                      setStep("checkout");
                    }}
                    className="w-full py-3.5 rounded-xl text-white font-bold text-base transition-smooth flex items-center justify-center gap-2"
                    style={{
                      background: "linear-gradient(135deg, #FF6B35, #e55a25)",
                    }}
                    data-ocid="cart-checkout-btn"
                  >
                    <Zap className="w-4 h-4" />
                    Proceed to Checkout — ₹{grandTotal}
                  </motion.button>
                </div>
              )}
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Page Content */}
      <div className="pt-20">
        <AnimatePresence mode="wait">
          {step === "confirmed" ? (
            <OrderConfirmedView
              key="confirmed"
              onContinue={() => setStep("browse")}
            />
          ) : step === "checkout" ? (
            <CheckoutView
              key="checkout"
              form={form}
              setField={set}
              onBack={() => setStep("browse")}
              onSubmit={handlePlaceOrder}
              subtotal={subtotal}
              delivery={delivery}
              grandTotal={grandTotal}
            />
          ) : (
            <BrowseView key="browse" count={count} onOpenCart={openCart} />
          )}
        </AnimatePresence>
      </div>

      {/* Mobile sticky cart button */}
      <AnimatePresence>
        {count > 0 && step === "browse" && !isOpen && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="fixed bottom-0 left-0 right-0 z-30 p-4 md:hidden"
            style={{
              background:
                "linear-gradient(to top, rgba(10,10,26,0.98) 60%, transparent)",
            }}
          >
            <button
              type="button"
              onClick={openCart}
              className="w-full py-4 rounded-2xl text-white font-bold flex items-center justify-between px-6"
              style={{
                background: "linear-gradient(135deg, #FF6B35, #e55a25)",
              }}
              data-ocid="mobile-cart-btn"
            >
              <span className="flex items-center gap-2">
                <ShoppingCart className="w-5 h-5" />
                View Cart
              </span>
              <span className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded-full bg-white/20 text-sm">
                  {count} items
                </span>
                <span className="font-black">₹{grandTotal}</span>
              </span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ─── Browse View ─── */
function BrowseView({
  count,
  onOpenCart,
}: { count: number; onOpenCart: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Page Header */}
      <div
        className="relative overflow-hidden py-16 px-4"
        style={{
          background:
            "linear-gradient(135deg, rgba(255,107,53,0.15) 0%, rgba(155,93,229,0.1) 50%, rgba(0,180,216,0.1) 100%)",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
            <div>
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest mb-3 px-3 py-1.5 rounded-full"
                style={{
                  background: "rgba(255,107,53,0.15)",
                  color: "#FF6B35",
                  border: "1px solid rgba(255,107,53,0.3)",
                }}
              >
                <Zap className="w-3 h-3" />
                Pan India Delivery
              </motion.div>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="font-display text-5xl md:text-6xl font-black text-white mb-2"
              >
                Shop Chill Pill
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-white/50 text-lg"
              >
                6 bold flavours. Delivered across India. Starting ₹30.
              </motion.p>
            </div>
            {/* Desktop cart button */}
            <motion.button
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              type="button"
              onClick={onOpenCart}
              className="hidden sm:flex items-center gap-3 px-5 py-3 rounded-2xl font-bold text-white transition-smooth hover:scale-105 relative"
              style={{
                background: "rgba(255,255,255,0.08)",
                border: "1px solid rgba(255,255,255,0.15)",
                backdropFilter: "blur(12px)",
              }}
              data-ocid="shop-cart-btn"
            >
              <ShoppingCart className="w-5 h-5" />
              <span>Cart</span>
              {count > 0 && (
                <span
                  className="absolute -top-2 -right-2 w-6 h-6 rounded-full text-white text-xs font-black flex items-center justify-center"
                  style={{ background: "#FF6B35" }}
                >
                  {count}
                </span>
              )}
            </motion.button>
          </div>
        </div>
        {/* Decorative blobs */}
        <div
          className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-10 -translate-y-1/2 translate-x-1/3"
          style={{
            background: "radial-gradient(circle, #FF6B35, transparent)",
          }}
        />
        <div
          className="absolute bottom-0 left-1/3 w-64 h-64 rounded-full opacity-10 translate-y-1/2"
          style={{
            background: "radial-gradient(circle, #9B5DE5, transparent)",
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 pb-32 md:pb-10">
        {/* Delivery Info Banner */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="rounded-2xl p-4 mb-10 grid grid-cols-1 sm:grid-cols-3 gap-4"
          style={{
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.1)",
          }}
          data-ocid="delivery-banner"
        >
          {[
            {
              icon: <Truck className="w-5 h-5" />,
              color: "#7CB518",
              title: "Free Delivery above ₹499",
              desc: "₹49 delivery charge below ₹499",
            },
            {
              icon: <Package className="w-5 h-5" />,
              color: "#00B4D8",
              title: "Delivery in 3–7 Days",
              desc: "Across all major Indian cities",
            },
            {
              icon: <MapPin className="w-5 h-5" />,
              color: "#9B5DE5",
              title: "Pan India Shipping",
              desc: "All 28 states + 8 UTs covered",
            },
          ].map(({ icon, color, title, desc }) => (
            <div key={title} className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: `${color}20`, color }}
              >
                {icon}
              </div>
              <div>
                <div className="text-white font-semibold text-sm">{title}</div>
                <div className="text-white/40 text-xs">{desc}</div>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>
      </div>
    </motion.div>
  );
}

/* ─── Checkout View ─── */
interface CheckoutViewProps {
  form: CheckoutForm;
  setField: (key: keyof CheckoutForm, value: string) => void;
  onBack: () => void;
  onSubmit: (e: React.FormEvent) => void;
  subtotal: number;
  delivery: number;
  grandTotal: number;
}

function CheckoutView({
  form,
  setField,
  onBack,
  onSubmit,
  subtotal,
  delivery,
  grandTotal,
}: CheckoutViewProps) {
  const inputClass =
    "w-full px-4 py-3 rounded-xl text-white text-sm placeholder-white/25 focus:outline-none transition-smooth";
  const inputStyle = {
    background: "rgba(255,255,255,0.05)",
    border: "1px solid rgba(255,255,255,0.1)",
  };
  const focusStyle = { border: "1px solid #FF6B35" };

  return (
    <motion.div
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -40 }}
      className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
    >
      <button
        type="button"
        onClick={onBack}
        className="flex items-center gap-2 text-white/50 hover:text-white text-sm mb-8 transition-smooth group"
        data-ocid="checkout-back"
      >
        <span className="group-hover:-translate-x-1 transition-smooth">←</span>
        Back to Shop
      </button>

      <h1 className="font-display text-4xl md:text-5xl font-black text-white mb-8">
        Checkout
      </h1>

      <form onSubmit={onSubmit} className="space-y-5" data-ocid="checkout-form">
        {/* Delivery Details */}
        <div
          className="rounded-2xl p-6 space-y-5"
          style={{
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.1)",
          }}
        >
          <h3 className="font-display font-bold text-white text-xl flex items-center gap-2">
            <MapPin className="w-5 h-5" style={{ color: "#FF6B35" }} />
            Delivery Details
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {(
              [
                {
                  key: "name",
                  label: "Full Name",
                  type: "text",
                  placeholder: "Riya Sharma",
                  span: false,
                },
                {
                  key: "phone",
                  label: "Phone Number",
                  type: "tel",
                  placeholder: "+91 98765 43210",
                  span: false,
                },
                {
                  key: "email",
                  label: "Email Address",
                  type: "email",
                  placeholder: "riya@example.com",
                  span: true,
                },
              ] as const
            ).map(({ key, label, type, placeholder, span }) => (
              <div key={key} className={span ? "sm:col-span-2" : ""}>
                <label
                  htmlFor={`cf-${key}`}
                  className="block text-white/50 text-xs font-semibold mb-2 uppercase tracking-wider"
                >
                  {label}
                </label>
                <input
                  id={`cf-${key}`}
                  type={type}
                  required
                  value={form[key]}
                  onChange={(e) => setField(key, e.target.value)}
                  placeholder={placeholder}
                  className={inputClass}
                  style={inputStyle}
                  onFocus={(e) => Object.assign(e.target.style, focusStyle)}
                  onBlur={(e) => Object.assign(e.target.style, inputStyle)}
                  data-ocid={`checkout-${key}`}
                />
              </div>
            ))}
            <div className="sm:col-span-2">
              <label
                htmlFor="cf-address"
                className="block text-white/50 text-xs font-semibold mb-2 uppercase tracking-wider"
              >
                Address
              </label>
              <input
                id="cf-address"
                type="text"
                required
                value={form.address}
                onChange={(e) => setField("address", e.target.value)}
                placeholder="Flat/House no., Street, Area, Landmark"
                className={inputClass}
                style={inputStyle}
                onFocus={(e) => Object.assign(e.target.style, focusStyle)}
                onBlur={(e) => Object.assign(e.target.style, inputStyle)}
                data-ocid="checkout-address"
              />
            </div>
            <div>
              <label
                htmlFor="cf-city"
                className="block text-white/50 text-xs font-semibold mb-2 uppercase tracking-wider"
              >
                City
              </label>
              <input
                id="cf-city"
                type="text"
                required
                value={form.city}
                onChange={(e) => setField("city", e.target.value)}
                placeholder="Mumbai"
                className={inputClass}
                style={inputStyle}
                onFocus={(e) => Object.assign(e.target.style, focusStyle)}
                onBlur={(e) => Object.assign(e.target.style, inputStyle)}
                data-ocid="checkout-city"
              />
            </div>
            <div>
              <label
                htmlFor="cf-state"
                className="block text-white/50 text-xs font-semibold mb-2 uppercase tracking-wider"
              >
                State
              </label>
              <select
                id="cf-state"
                required
                value={form.state}
                onChange={(e) => setField("state", e.target.value)}
                className={inputClass}
                style={{ ...inputStyle, background: "#0D0D20" }}
                data-ocid="checkout-state"
              >
                <option value="">Select State</option>
                {STATES.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label
                htmlFor="cf-pincode"
                className="block text-white/50 text-xs font-semibold mb-2 uppercase tracking-wider"
              >
                Pincode
              </label>
              <input
                id="cf-pincode"
                type="text"
                required
                pattern="\d{6}"
                maxLength={6}
                value={form.pincode}
                onChange={(e) => setField("pincode", e.target.value)}
                placeholder="400001"
                className={inputClass}
                style={inputStyle}
                onFocus={(e) => Object.assign(e.target.style, focusStyle)}
                onBlur={(e) => Object.assign(e.target.style, inputStyle)}
                data-ocid="checkout-pincode"
              />
            </div>
          </div>
        </div>

        {/* Payment */}
        <div
          className="rounded-2xl p-6"
          style={{
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.1)",
          }}
        >
          <h3 className="font-display font-bold text-white text-xl flex items-center gap-2 mb-5">
            <Zap className="w-5 h-5" style={{ color: "#FFD700" }} />
            Payment Method
          </h3>
          <div
            className="space-y-3"
            data-ocid="payment-options"
            role="radiogroup"
            aria-label="Payment method"
          >
            {PAYMENT_METHODS.map(({ value, label, icon, desc }) => {
              const isSelected = form.payment === value;
              return (
                <label
                  key={value}
                  htmlFor={`pay-${value}`}
                  className="flex items-center gap-4 p-4 rounded-xl cursor-pointer transition-smooth"
                  style={{
                    background: isSelected
                      ? "rgba(255,107,53,0.1)"
                      : "rgba(255,255,255,0.03)",
                    border: isSelected
                      ? "1px solid rgba(255,107,53,0.5)"
                      : "1px solid rgba(255,255,255,0.08)",
                  }}
                  data-ocid={`payment-${value}`}
                >
                  <input
                    id={`pay-${value}`}
                    type="radio"
                    name="payment"
                    value={value}
                    checked={isSelected}
                    onChange={() => setField("payment", value)}
                    className="sr-only"
                  />
                  <span className="text-2xl flex-shrink-0">{icon}</span>
                  <div className="flex-1">
                    <div className="text-white font-semibold text-sm">
                      {label}
                    </div>
                    <div className="text-white/40 text-xs mt-0.5">{desc}</div>
                  </div>
                  <div
                    className="w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0"
                    style={{
                      borderColor: isSelected
                        ? "#FF6B35"
                        : "rgba(255,255,255,0.2)",
                    }}
                  >
                    {isSelected && (
                      <div
                        className="w-2.5 h-2.5 rounded-full"
                        style={{ background: "#FF6B35" }}
                      />
                    )}
                  </div>
                </label>
              );
            })}
          </div>
          <p className="text-white/25 text-xs mt-4 flex items-center gap-1.5">
            🔒 Secure checkout. 256-bit SSL encrypted.
          </p>
        </div>

        {/* Order Summary */}
        <div
          className="rounded-2xl p-5 space-y-2"
          style={{
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.1)",
          }}
        >
          <h3 className="font-display font-bold text-white text-lg mb-3">
            Order Summary
          </h3>
          <div className="flex justify-between text-white/50 text-sm">
            <span>Subtotal</span>
            <span>₹{subtotal}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-white/50">Delivery</span>
            <span
              style={{
                color: delivery === 0 ? "#7CB518" : "rgba(255,255,255,0.5)",
              }}
            >
              {delivery === 0 ? "FREE" : `₹${delivery}`}
            </span>
          </div>
          <div className="flex justify-between text-white font-bold text-xl pt-3 border-t border-white/10">
            <span>Total</span>
            <span>₹{grandTotal}</span>
          </div>
        </div>

        <motion.button
          type="submit"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          className="w-full py-4 rounded-2xl text-white font-bold text-lg flex items-center justify-center gap-2"
          style={{ background: "linear-gradient(135deg, #FF6B35, #e55a25)" }}
          data-ocid="place-order-btn"
        >
          <CheckCircle className="w-5 h-5" />
          Place Order — ₹{grandTotal}
        </motion.button>
      </form>
    </motion.div>
  );
}

/* ─── Order Confirmed View ─── */
function OrderConfirmedView({ onContinue }: { onContinue: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
      transition={{ type: "spring", damping: 20, stiffness: 200 }}
      className="max-w-lg mx-auto px-4 sm:px-6 py-20 text-center"
      data-ocid="order-confirmed"
    >
      {/* Pulsing success icon */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", damping: 15, stiffness: 300, delay: 0.1 }}
        className="w-28 h-28 rounded-full flex items-center justify-center mx-auto mb-8 relative"
        style={{
          background: "rgba(124,181,24,0.15)",
          border: "2px solid rgba(124,181,24,0.4)",
        }}
      >
        <CheckCircle className="w-14 h-14" style={{ color: "#7CB518" }} />
        {/* Ripple rings */}
        {[1, 2].map((i) => (
          <motion.div
            key={i}
            className="absolute inset-0 rounded-full"
            style={{ border: "1px solid rgba(124,181,24,0.3)" }}
            animate={{ scale: [1, 1.6 + i * 0.3], opacity: [0.5, 0] }}
            transition={{
              duration: 1.5,
              delay: i * 0.3,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeOut",
            }}
          />
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <h2 className="font-display text-5xl font-black text-white mb-3">
          Order Placed! 🎉
        </h2>
        <p className="text-white/60 text-lg mb-2">
          Your Chill Pills are on their way!
        </p>
        <p className="text-white/35 text-sm mb-4">
          Estimated delivery: 3–7 business days.
        </p>
        <div
          className="inline-flex items-center gap-2 text-sm px-4 py-2 rounded-xl mb-10"
          style={{
            background: "rgba(0,180,216,0.1)",
            border: "1px solid rgba(0,180,216,0.2)",
            color: "#00B4D8",
          }}
        >
          <Truck className="w-4 h-4" />
          You'll receive SMS & email updates.
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="flex flex-col sm:flex-row gap-3 justify-center"
      >
        <button
          type="button"
          onClick={onContinue}
          className="px-8 py-3.5 rounded-2xl text-white font-bold transition-smooth hover:scale-105"
          style={{ background: "linear-gradient(135deg, #FF6B35, #e55a25)" }}
          data-ocid="continue-shopping-btn"
        >
          Continue Shopping
        </button>
        <Link
          to="/"
          className="px-8 py-3.5 rounded-2xl text-white font-bold transition-smooth hover:scale-105 inline-flex items-center justify-center"
          style={{
            background: "rgba(255,255,255,0.07)",
            border: "1px solid rgba(255,255,255,0.15)",
          }}
        >
          Back to Home
        </Link>
      </motion.div>
    </motion.div>
  );
}
