import { Link } from "@tanstack/react-router";
import { ArrowRight, Clock, Mail, MapPin, Phone, Truck } from "lucide-react";
import { motion } from "motion/react";
import { useForm } from "react-hook-form";
import { SiFacebook, SiInstagram } from "react-icons/si";
import { toast } from "sonner";

type FormData = {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
};

const INQUIRY_OPTIONS = [
  { value: "", label: "Select inquiry type" },
  { value: "General Inquiry", label: "General Inquiry" },
  { value: "Delivery Query", label: "Delivery Query" },
  { value: "Bulk Order", label: "Bulk Order" },
  { value: "Partnership", label: "Partnership" },
  { value: "Product Feedback", label: "Product Feedback" },
];

const CONTACT_INFO = [
  {
    icon: Mail,
    label: "Email Us",
    value: "hello@chillpill.in",
    href: "mailto:hello@chillpill.in",
    color: "#FF6B35",
    glow: "rgba(255,107,53,0.25)",
    ocid: "contact-info-email",
  },
  {
    icon: Phone,
    label: "Call Us",
    value: "+91 98765 43210",
    href: "tel:+919876543210",
    color: "#7CB518",
    glow: "rgba(124,181,24,0.25)",
    ocid: "contact-info-phone",
  },
  {
    icon: MapPin,
    label: "Head Office",
    value: "Bengaluru, India",
    href: "https://maps.google.com/?q=Bengaluru,India",
    color: "#9B5DE5",
    glow: "rgba(155,93,229,0.25)",
    ocid: "contact-info-location",
  },
];

const SOCIAL_LINKS = [
  {
    icon: SiInstagram,
    label: "Instagram",
    handle: "@chillpillbeverages",
    href: "https://www.instagram.com/chillpillbeverages",
    color: "#C13584",
  },
  {
    icon: SiFacebook,
    label: "Facebook",
    handle: "Chill Pill Beverages",
    href: "https://www.facebook.com/profile.php?id=61573663829948",
    color: "#1877F2",
  },
];

const fieldVariants = {
  hidden: { opacity: 0, y: 18 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.15 + i * 0.08,
      duration: 0.45,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  }),
};

export default function ContactPage() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>();

  const onSubmit = async (_data: FormData) => {
    await new Promise((r) => setTimeout(r, 600));
    toast.success("Message sent! 🎉 We'll get back to you within 24 hours.", {
      duration: 5000,
    });
    reset();
  };

  return (
    <div
      className="min-h-screen pt-20"
      style={{
        background:
          "linear-gradient(160deg, #FFFBF0 0%, #fff7e8 40%, #f0f8ff 70%, #f5f0ff 100%)",
      }}
    >
      {/* Decorative blobs */}
      <div
        className="fixed top-32 -left-32 w-80 h-80 rounded-full blur-3xl opacity-30 pointer-events-none"
        style={{
          background: "radial-gradient(circle, #FF6B35 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />
      <div
        className="fixed bottom-32 -right-32 w-80 h-80 rounded-full blur-3xl opacity-20 pointer-events-none"
        style={{
          background: "radial-gradient(circle, #9B5DE5 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Hero heading */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-14"
        >
          <span
            className="inline-block text-xs font-bold tracking-[0.2em] uppercase mb-3 px-4 py-1.5 rounded-full"
            style={{ background: "rgba(255,107,53,0.12)", color: "#FF6B35" }}
          >
            Contact Us
          </span>
          <h1
            className="font-display text-5xl md:text-7xl font-black leading-tight mb-4"
            style={{ color: "#1A1A2E" }}
          >
            Get in <span className="gradient-text-brand">Touch</span>
          </h1>
          <p
            className="text-lg max-w-lg mx-auto"
            style={{ color: "#1A1A2E99" }}
          >
            Have a question, want to collaborate, or just love our drinks?{" "}
            <span style={{ color: "#FF6B35", fontWeight: 600 }}>
              We'd love to hear from you.
            </span>
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-[1fr_420px] gap-10 items-start">
          {/* ── LEFT: Contact Form ── */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              delay: 0.2,
              duration: 0.55,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <div
              className="rounded-3xl p-8 md:p-10"
              style={{
                background: "rgba(255,255,255,0.72)",
                backdropFilter: "blur(20px)",
                WebkitBackdropFilter: "blur(20px)",
                border: "1px solid rgba(255,107,53,0.15)",
                boxShadow: "0 8px 40px rgba(255,107,53,0.08)",
              }}
              data-ocid="contact-form-card"
            >
              <h2
                className="font-display text-2xl font-black mb-6"
                style={{ color: "#1A1A2E" }}
              >
                Send a Message
              </h2>

              <form
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-5"
                data-ocid="contact-form"
                noValidate
              >
                {/* Name + Phone row */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <motion.div
                    custom={0}
                    variants={fieldVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    <label
                      htmlFor="cf-name"
                      className="block text-xs font-semibold mb-1.5"
                      style={{ color: "#1A1A2E99" }}
                    >
                      Full Name *
                    </label>
                    <input
                      id="cf-name"
                      type="text"
                      placeholder="Rohit Sharma"
                      {...register("name", { required: "Name is required" })}
                      className="w-full rounded-xl px-4 py-3 text-sm outline-none transition-smooth"
                      style={{
                        background: "rgba(26,26,46,0.04)",
                        border: errors.name
                          ? "1.5px solid #FF6B35"
                          : "1.5px solid rgba(26,26,46,0.1)",
                        color: "#1A1A2E",
                      }}
                      data-ocid="contact-name"
                    />
                    {errors.name && (
                      <p className="text-xs mt-1" style={{ color: "#FF6B35" }}>
                        {errors.name.message}
                      </p>
                    )}
                  </motion.div>

                  <motion.div
                    custom={1}
                    variants={fieldVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    <label
                      htmlFor="cf-phone"
                      className="block text-xs font-semibold mb-1.5"
                      style={{ color: "#1A1A2E99" }}
                    >
                      Phone Number
                    </label>
                    <input
                      id="cf-phone"
                      type="tel"
                      placeholder="+91 98765 43210"
                      {...register("phone")}
                      className="w-full rounded-xl px-4 py-3 text-sm outline-none transition-smooth"
                      style={{
                        background: "rgba(26,26,46,0.04)",
                        border: "1.5px solid rgba(26,26,46,0.1)",
                        color: "#1A1A2E",
                      }}
                      data-ocid="contact-phone"
                    />
                  </motion.div>
                </div>

                {/* Email */}
                <motion.div
                  custom={2}
                  variants={fieldVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <label
                    htmlFor="cf-email"
                    className="block text-xs font-semibold mb-1.5"
                    style={{ color: "#1A1A2E99" }}
                  >
                    Email Address *
                  </label>
                  <input
                    id="cf-email"
                    type="email"
                    placeholder="you@example.com"
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: "Enter a valid email",
                      },
                    })}
                    className="w-full rounded-xl px-4 py-3 text-sm outline-none transition-smooth"
                    style={{
                      background: "rgba(26,26,46,0.04)",
                      border: errors.email
                        ? "1.5px solid #FF6B35"
                        : "1.5px solid rgba(26,26,46,0.1)",
                      color: "#1A1A2E",
                    }}
                    data-ocid="contact-email"
                  />
                  {errors.email && (
                    <p className="text-xs mt-1" style={{ color: "#FF6B35" }}>
                      {errors.email.message}
                    </p>
                  )}
                </motion.div>

                {/* Subject / Inquiry Type */}
                <motion.div
                  custom={3}
                  variants={fieldVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <label
                    htmlFor="cf-subject"
                    className="block text-xs font-semibold mb-1.5"
                    style={{ color: "#1A1A2E99" }}
                  >
                    Subject / Inquiry Type *
                  </label>
                  <select
                    id="cf-subject"
                    {...register("subject", {
                      required: "Please select an inquiry type",
                    })}
                    className="w-full rounded-xl px-4 py-3 text-sm outline-none transition-smooth appearance-none cursor-pointer"
                    style={{
                      background: errors.subject
                        ? "rgba(255,107,53,0.04)"
                        : "rgba(26,26,46,0.04)",
                      border: errors.subject
                        ? "1.5px solid #FF6B35"
                        : "1.5px solid rgba(26,26,46,0.1)",
                      color: "#1A1A2E",
                    }}
                    data-ocid="contact-subject"
                  >
                    {INQUIRY_OPTIONS.map((opt) => (
                      <option
                        key={opt.value}
                        value={opt.value}
                        disabled={opt.value === ""}
                      >
                        {opt.label}
                      </option>
                    ))}
                  </select>
                  {errors.subject && (
                    <p className="text-xs mt-1" style={{ color: "#FF6B35" }}>
                      {errors.subject.message}
                    </p>
                  )}
                </motion.div>

                {/* Message */}
                <motion.div
                  custom={4}
                  variants={fieldVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <label
                    htmlFor="cf-message"
                    className="block text-xs font-semibold mb-1.5"
                    style={{ color: "#1A1A2E99" }}
                  >
                    Message *
                  </label>
                  <textarea
                    id="cf-message"
                    rows={5}
                    placeholder="Tell us what's on your mind..."
                    {...register("message", {
                      required: "Message is required",
                      minLength: { value: 10, message: "Message too short" },
                    })}
                    className="w-full rounded-xl px-4 py-3 text-sm outline-none transition-smooth resize-none"
                    style={{
                      background: "rgba(26,26,46,0.04)",
                      border: errors.message
                        ? "1.5px solid #FF6B35"
                        : "1.5px solid rgba(26,26,46,0.1)",
                      color: "#1A1A2E",
                    }}
                    data-ocid="contact-message"
                  />
                  {errors.message && (
                    <p className="text-xs mt-1" style={{ color: "#FF6B35" }}>
                      {errors.message.message}
                    </p>
                  )}
                </motion.div>

                {/* Submit */}
                <motion.div
                  custom={5}
                  variants={fieldVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 rounded-xl font-bold text-base transition-smooth hover:scale-[1.02] active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    style={{
                      background: isSubmitting
                        ? "rgba(255,107,53,0.6)"
                        : "linear-gradient(135deg, #FF6B35 0%, #FFD700 100%)",
                      color: "#fff",
                      boxShadow: "0 4px 20px rgba(255,107,53,0.35)",
                    }}
                    data-ocid="contact-submit"
                  >
                    {isSubmitting ? (
                      <>
                        <span
                          className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin"
                          aria-hidden="true"
                        />
                        Sending...
                      </>
                    ) : (
                      <>
                        Send Message
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </motion.div>
              </form>
            </div>
          </motion.div>

          {/* ── RIGHT: Info Panel ── */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              delay: 0.3,
              duration: 0.55,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="space-y-5"
          >
            {/* Contact info cards */}
            {CONTACT_INFO.map(
              ({ icon: Icon, label, value, href, color, glow, ocid }, i) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: 0.35 + i * 0.1,
                    duration: 0.45,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  whileHover={{ scale: 1.02, y: -2 }}
                  className="flex items-center gap-4 rounded-2xl p-5 transition-smooth group block"
                  style={{
                    background: "rgba(255,255,255,0.72)",
                    backdropFilter: "blur(16px)",
                    WebkitBackdropFilter: "blur(16px)",
                    border: `1.5px solid ${glow}`,
                    boxShadow: `0 4px 20px ${glow}`,
                  }}
                  data-ocid={ocid}
                >
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: `${color}18` }}
                  >
                    <Icon className="w-5 h-5" style={{ color }} />
                  </div>
                  <div className="min-w-0">
                    <div
                      className="text-xs font-semibold mb-0.5"
                      style={{ color: "#1A1A2E66" }}
                    >
                      {label}
                    </div>
                    <div
                      className="font-bold text-sm truncate"
                      style={{ color: "#1A1A2E" }}
                    >
                      {value}
                    </div>
                  </div>
                </motion.a>
              ),
            )}

            {/* Office hours */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.65,
                duration: 0.45,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="rounded-2xl p-5"
              style={{
                background: "rgba(255,255,255,0.72)",
                backdropFilter: "blur(16px)",
                WebkitBackdropFilter: "blur(16px)",
                border: "1.5px solid rgba(255,215,0,0.3)",
                boxShadow: "0 4px 20px rgba(255,215,0,0.12)",
              }}
              data-ocid="contact-office-hours"
            >
              <div className="flex items-center gap-3 mb-3">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ background: "rgba(255,215,0,0.15)" }}
                >
                  <Clock className="w-4 h-4" style={{ color: "#FFD700" }} />
                </div>
                <span
                  className="font-bold text-sm"
                  style={{ color: "#1A1A2E" }}
                >
                  Office Hours
                </span>
              </div>
              <div className="space-y-1.5">
                <div className="flex justify-between text-sm">
                  <span style={{ color: "#1A1A2E99" }}>Monday – Saturday</span>
                  <span className="font-semibold" style={{ color: "#1A1A2E" }}>
                    9:00 AM – 6:00 PM IST
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span style={{ color: "#1A1A2E99" }}>Sunday</span>
                  <span className="font-semibold" style={{ color: "#FF6B35" }}>
                    Closed
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Pan India Delivery */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.75,
                duration: 0.45,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="rounded-2xl p-5"
              style={{
                background:
                  "linear-gradient(135deg, rgba(0,180,216,0.08) 0%, rgba(155,93,229,0.08) 100%)",
                backdropFilter: "blur(16px)",
                WebkitBackdropFilter: "blur(16px)",
                border: "1.5px solid rgba(0,180,216,0.25)",
                boxShadow: "0 4px 20px rgba(0,180,216,0.1)",
              }}
              data-ocid="contact-delivery-info"
            >
              <div className="flex items-center gap-3 mb-3">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ background: "rgba(0,180,216,0.15)" }}
                >
                  <Truck className="w-4 h-4" style={{ color: "#00B4D8" }} />
                </div>
                <span
                  className="font-bold text-sm"
                  style={{ color: "#1A1A2E" }}
                >
                  Pan India Delivery
                </span>
              </div>
              <ul className="space-y-1.5 mb-4">
                <li
                  className="text-xs flex items-center gap-2"
                  style={{ color: "#1A1A2E88" }}
                >
                  <span
                    className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                    style={{ background: "#00B4D8" }}
                  />
                  Free delivery on orders above{" "}
                  <strong style={{ color: "#1A1A2E" }}>₹499</strong>
                </li>
                <li
                  className="text-xs flex items-center gap-2"
                  style={{ color: "#1A1A2E88" }}
                >
                  <span
                    className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                    style={{ background: "#00B4D8" }}
                  />
                  Delivered in{" "}
                  <strong style={{ color: "#1A1A2E" }}>
                    3–7 business days
                  </strong>
                </li>
                <li
                  className="text-xs flex items-center gap-2"
                  style={{ color: "#1A1A2E88" }}
                >
                  <span
                    className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                    style={{ background: "#00B4D8" }}
                  />
                  We ship to all Indian states &amp; territories
                </li>
              </ul>
              <Link
                to="/shop"
                className="inline-flex items-center gap-1.5 text-xs font-bold transition-smooth hover:gap-2.5"
                style={{ color: "#00B4D8" }}
                data-ocid="contact-shop-link"
              >
                Shop Now <ArrowRight className="w-3 h-3" />
              </Link>
            </motion.div>

            {/* Social media */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.85,
                duration: 0.45,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="rounded-2xl p-5"
              style={{
                background: "rgba(255,255,255,0.72)",
                backdropFilter: "blur(16px)",
                WebkitBackdropFilter: "blur(16px)",
                border: "1.5px solid rgba(26,26,46,0.08)",
                boxShadow: "0 4px 20px rgba(26,26,46,0.05)",
              }}
              data-ocid="contact-social"
            >
              <h3
                className="font-bold text-sm mb-4"
                style={{ color: "#1A1A2E" }}
              >
                Follow the Chill Vibe 🧃
              </h3>
              <div className="grid grid-cols-2 gap-2.5">
                {SOCIAL_LINKS.map(
                  ({ icon: Icon, label, handle, href, color }) => (
                    <motion.a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.04 }}
                      className="flex items-center gap-2.5 p-2.5 rounded-xl transition-smooth"
                      style={{ background: `${color}10` }}
                      data-ocid={`social-${label.toLowerCase().replace(/[^a-z]/g, "-")}`}
                    >
                      <Icon
                        className="w-4 h-4 flex-shrink-0"
                        style={{ color }}
                      />
                      <div className="min-w-0">
                        <div
                          className="text-xs font-semibold truncate"
                          style={{ color: "#1A1A2E" }}
                        >
                          {label}
                        </div>
                        <div
                          className="text-xs truncate"
                          style={{ color: "#1A1A2E66" }}
                        >
                          {handle}
                        </div>
                      </div>
                    </motion.a>
                  ),
                )}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
