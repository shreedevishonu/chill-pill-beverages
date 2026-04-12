import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { products } from "@/data/products";
import type { Product } from "@/data/products";
import {
  ChevronDown,
  Edit3,
  FileText,
  Globe,
  LayoutDashboard,
  type LucideIcon,
  Package,
  Palette,
  Save,
  Settings,
  ShieldCheck,
  Sparkles,
  Type,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";

// ─── Types ────────────────────────────────────────────────────────────────────

type AdminTab = "dashboard" | "products" | "content" | "settings";

interface EditableProduct extends Product {
  ingredientsText: string;
}

interface SiteContent {
  heroTagline: string;
  heroSubTagline: string;
  newsletterCTA: string;
  footerTagline: string;
}

// ─── Constants ────────────────────────────────────────────────────────────────

const BRAND_COLORS = [
  { name: "Tangy Orange", hex: "#FF6B35", desc: "Primary CTA, hero accents" },
  { name: "Lime Green", hex: "#7CB518", desc: "Secondary, freshness" },
  { name: "Golden Yellow", hex: "#FFD700", desc: "Highlight, Shikanji" },
  { name: "Sky Blue", hex: "#00B4D8", desc: "Club Soda, cool tones" },
  { name: "Purple", hex: "#9B5DE5", desc: "Frutu Fizy, premium" },
  { name: "Warm White", hex: "#FFFBF0", desc: "Background, cards" },
  { name: "Dark Charcoal", hex: "#1A1A2E", desc: "Text, nav, hero bg" },
];

const COMING_SOON = [
  { name: "Aam Panna", type: "Juice", color: "#85C227" },
  { name: "Kokum Cooler", type: "Soda", color: "#C72B4B" },
  { name: "Rose Sherbet", type: "Juice", color: "#E8789A" },
];

const DEFAULT_CONTENT: SiteContent = {
  heroTagline: "Take a Chill Pill",
  heroSubTagline: "Bold, Fresh, Desi — India's favourite drinks, reimagined.",
  newsletterCTA: "Get exclusive deals & new launches straight to your inbox",
  footerTagline: "Made with love in India 🇮🇳 for India.",
};

const NAV_ITEMS: { id: AdminTab; label: string; icon: LucideIcon }[] = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "products", label: "Products", icon: Package },
  { id: "content", label: "Content", icon: FileText },
  { id: "settings", label: "Settings", icon: Settings },
];

// ─── StatCard ─────────────────────────────────────────────────────────────────

function StatCard({
  value,
  label,
  color,
  icon: Icon,
}: {
  value: string | number;
  label: string;
  color: string;
  icon: LucideIcon;
}) {
  return (
    <div
      className="rounded-2xl p-5 flex items-center gap-4"
      style={{
        background: "rgba(255,255,255,0.04)",
        border: "1px solid rgba(255,255,255,0.08)",
        backdropFilter: "blur(12px)",
      }}
    >
      <div
        className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
        style={{ background: `${color}22`, border: `1.5px solid ${color}55` }}
      >
        <Icon size={20} style={{ color }} />
      </div>
      <div>
        <p className="text-2xl font-black font-display" style={{ color }}>
          {value}
        </p>
        <p
          className="text-xs mt-0.5"
          style={{ color: "rgba(255,255,255,0.4)" }}
        >
          {label}
        </p>
      </div>
    </div>
  );
}

// ─── DashboardTab ─────────────────────────────────────────────────────────────

function DashboardTab() {
  return (
    <motion.div
      key="dashboard"
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.2 }}
      className="space-y-7"
    >
      <div>
        <h2 className="text-2xl font-black font-display text-white mb-1">
          Welcome back 👋
        </h2>
        <p className="text-sm" style={{ color: "rgba(255,255,255,0.45)" }}>
          Here's your Chill Pill content overview.
        </p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <StatCard
          value={6}
          label="Total Products"
          color="#FF6B35"
          icon={Package}
        />
        <StatCard
          value={3}
          label="Juice Variants"
          color="#7CB518"
          icon={Sparkles}
        />
        <StatCard
          value={3}
          label="Soda Variants"
          color="#00B4D8"
          icon={Sparkles}
        />
        <StatCard value={3} label="Coming Soon" color="#9B5DE5" icon={Globe} />
      </div>

      <div>
        <h3 className="text-base font-bold font-display text-white mb-3">
          Coming Soon Products
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {COMING_SOON.map((p) => (
            <div
              key={p.name}
              className="rounded-2xl p-4 flex items-center gap-3"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)",
              }}
            >
              <div
                className="w-9 h-9 rounded-full flex-shrink-0"
                style={{ background: p.color, opacity: 0.85 }}
              />
              <div className="min-w-0">
                <p className="font-semibold text-sm text-white truncate">
                  {p.name}
                </p>
                <p
                  className="text-xs mt-0.5"
                  style={{
                    color: p.type === "Juice" ? "#7CB518" : "#00B4D8",
                  }}
                >
                  {p.type}
                </p>
              </div>
              <span
                className="ml-auto text-xs px-2 py-0.5 rounded-lg flex-shrink-0"
                style={{
                  background: "rgba(155,93,229,0.15)",
                  color: "#9B5DE5",
                  border: "1px solid rgba(155,93,229,0.3)",
                }}
              >
                Soon
              </span>
            </div>
          ))}
        </div>
      </div>

      <div
        className="rounded-2xl p-5"
        style={{
          background: "rgba(255,255,255,0.03)",
          border: "1px solid rgba(255,255,255,0.07)",
        }}
      >
        <h3 className="text-sm font-bold text-white mb-3">Quick Links</h3>
        <div className="flex flex-wrap gap-2">
          {[
            { href: "/", label: "View Homepage" },
            { href: "/products", label: "View Products" },
            { href: "/shop", label: "View Shop" },
          ].map(({ href, label }) => (
            <a
              key={href}
              href={href}
              target="_blank"
              rel="noreferrer"
              className="text-xs px-3 py-2 rounded-lg transition-smooth"
              style={{
                border: "1px solid rgba(255,255,255,0.15)",
                color: "rgba(255,255,255,0.6)",
              }}
            >
              {label} ↗
            </a>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

// ─── ProductRow ───────────────────────────────────────────────────────────────

function ProductRow({
  product,
  onSave,
}: {
  product: EditableProduct;
  onSave: (updated: EditableProduct) => void;
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState<EditableProduct>(product);

  function handleSave() {
    const updated: EditableProduct = {
      ...draft,
      ingredients: draft.ingredientsText
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
    };
    onSave(updated);
    setIsEditing(false);
    toast.success(`"${draft.name}" saved successfully!`);
  }

  function handleCancel() {
    setDraft(product);
    setIsEditing(false);
  }

  const typeColor = product.type === "Juice" ? "#7CB518" : "#00B4D8";

  return (
    <div
      className="rounded-2xl overflow-hidden"
      style={{ border: "1px solid rgba(255,255,255,0.08)" }}
    >
      {/* Row header — button for keyboard accessibility */}
      <button
        type="button"
        aria-expanded={isEditing}
        className="w-full flex items-center gap-3 px-4 py-3.5 cursor-pointer select-none transition-smooth text-left"
        style={{ background: "rgba(255,255,255,0.04)" }}
        onClick={() => setIsEditing((v) => !v)}
        data-ocid="product-row-toggle"
      >
        <div
          className="w-9 h-9 rounded-xl flex-shrink-0 ring-1 ring-white/10"
          style={{
            background: `radial-gradient(circle at 35% 35%, ${product.color}, ${product.color}66)`,
          }}
        />
        <div className="flex-1 min-w-0">
          <p className="font-bold text-sm text-white truncate">
            {product.name}
          </p>
          <p
            className="text-xs truncate"
            style={{ color: "rgba(255,255,255,0.4)" }}
          >
            {product.tagline}
          </p>
        </div>
        <span
          className="text-xs px-2 py-0.5 rounded-full flex-shrink-0 font-medium"
          style={{
            background: `${typeColor}18`,
            color: typeColor,
            border: `1px solid ${typeColor}44`,
          }}
        >
          {product.type}
        </span>
        <p
          className="text-sm font-black flex-shrink-0 w-10 text-right font-display"
          style={{ color: "rgba(255,255,255,0.7)" }}
        >
          ₹{product.price}
        </p>
        <span
          className="flex items-center gap-1 text-xs px-3 py-1.5 rounded-lg flex-shrink-0"
          style={{
            border: "1px solid rgba(255,255,255,0.18)",
            color: "rgba(255,255,255,0.6)",
          }}
          data-ocid="product-edit-btn"
        >
          <Edit3 size={12} />
          Edit
          <ChevronDown
            size={12}
            className={`transition-transform duration-200 ${isEditing ? "rotate-180" : ""}`}
          />
        </span>
      </button>

      {/* Edit Form */}
      <AnimatePresence>
        {isEditing && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22 }}
            className="overflow-hidden"
          >
            <div
              className="p-5 grid grid-cols-1 sm:grid-cols-2 gap-4"
              style={{
                background: "rgba(255,255,255,0.02)",
                borderTop: "1px solid rgba(255,255,255,0.06)",
              }}
            >
              <div className="space-y-1.5">
                <Label
                  className="text-xs"
                  style={{ color: "rgba(255,255,255,0.5)" }}
                >
                  Product Name
                </Label>
                <Input
                  value={draft.name}
                  onChange={(e) =>
                    setDraft((d) => ({ ...d, name: e.target.value }))
                  }
                  className="h-9 text-sm bg-white/5 border-white/10 text-white"
                  data-ocid="edit-name"
                />
              </div>
              <div className="space-y-1.5">
                <Label
                  className="text-xs"
                  style={{ color: "rgba(255,255,255,0.5)" }}
                >
                  Price (₹)
                </Label>
                <Input
                  type="number"
                  value={draft.price}
                  onChange={(e) =>
                    setDraft((d) => ({ ...d, price: Number(e.target.value) }))
                  }
                  className="h-9 text-sm bg-white/5 border-white/10 text-white"
                  data-ocid="edit-price"
                />
              </div>
              <div className="sm:col-span-2 space-y-1.5">
                <Label
                  className="text-xs"
                  style={{ color: "rgba(255,255,255,0.5)" }}
                >
                  Tagline
                </Label>
                <Input
                  value={draft.tagline}
                  onChange={(e) =>
                    setDraft((d) => ({ ...d, tagline: e.target.value }))
                  }
                  className="h-9 text-sm bg-white/5 border-white/10 text-white"
                  data-ocid="edit-tagline"
                />
              </div>
              <div className="sm:col-span-2 space-y-1.5">
                <Label
                  className="text-xs"
                  style={{ color: "rgba(255,255,255,0.5)" }}
                >
                  Description
                </Label>
                <Textarea
                  value={draft.description}
                  onChange={(e) =>
                    setDraft((d) => ({ ...d, description: e.target.value }))
                  }
                  rows={3}
                  className="resize-none text-sm bg-white/5 border-white/10 text-white"
                  data-ocid="edit-description"
                />
              </div>
              <div className="sm:col-span-2 space-y-1.5">
                <Label
                  className="text-xs"
                  style={{ color: "rgba(255,255,255,0.5)" }}
                >
                  Ingredients{" "}
                  <span style={{ color: "rgba(255,255,255,0.3)" }}>
                    (comma-separated)
                  </span>
                </Label>
                <Textarea
                  value={draft.ingredientsText}
                  onChange={(e) =>
                    setDraft((d) => ({ ...d, ingredientsText: e.target.value }))
                  }
                  rows={2}
                  className="resize-none text-sm font-mono bg-white/5 border-white/10 text-white"
                  data-ocid="edit-ingredients"
                />
              </div>
              <div className="sm:col-span-2 flex gap-2 justify-end pt-1">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleCancel}
                  className="gap-1 text-white/60 hover:text-white"
                  data-ocid="edit-cancel"
                >
                  <X size={13} /> Cancel
                </Button>
                <button
                  type="button"
                  onClick={handleSave}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-bold transition-smooth hover:scale-105"
                  style={{
                    background: "linear-gradient(135deg, #FF6B35, #FFD700)",
                    color: "#1A1A2E",
                  }}
                  data-ocid="edit-save"
                >
                  <Save size={13} /> Save Changes
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── ProductsTab ──────────────────────────────────────────────────────────────

function ProductsTab() {
  const [editableProducts, setEditableProducts] = useState<EditableProduct[]>(
    products.map((p) => ({ ...p, ingredientsText: p.ingredients.join(", ") })),
  );

  function handleSave(updated: EditableProduct) {
    setEditableProducts((prev) =>
      prev.map((p) => (p.id === updated.id ? updated : p)),
    );
  }

  return (
    <motion.div
      key="products"
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.2 }}
      className="space-y-5"
    >
      <div>
        <h2 className="text-2xl font-black font-display text-white mb-1">
          Products
        </h2>
        <p className="text-sm" style={{ color: "rgba(255,255,255,0.45)" }}>
          Click a row or the Edit button to modify product details. Changes are
          stored in local state.
        </p>
      </div>
      <div className="space-y-2" data-ocid="admin-product-list">
        {editableProducts.map((product) => (
          <ProductRow key={product.id} product={product} onSave={handleSave} />
        ))}
      </div>
    </motion.div>
  );
}

// ─── ContentTab ───────────────────────────────────────────────────────────────

function ContentTab() {
  const [content, setContent] = useState<SiteContent>(DEFAULT_CONTENT);
  const [saved, setSaved] = useState(false);

  function handleSave() {
    setSaved(true);
    toast.success("Site content saved successfully!");
    setTimeout(() => setSaved(false), 2500);
  }

  const fields: { key: keyof SiteContent; label: string; desc: string }[] = [
    {
      key: "heroTagline",
      label: "Hero Tagline",
      desc: "Main headline displayed in the homepage hero section",
    },
    {
      key: "heroSubTagline",
      label: "Hero Sub-tagline",
      desc: "Supporting text shown below the main headline",
    },
    {
      key: "newsletterCTA",
      label: "Newsletter CTA Text",
      desc: "Prompt copy above the email signup form",
    },
    {
      key: "footerTagline",
      label: "Footer Tagline",
      desc: "Brand tagline displayed at the bottom of every page",
    },
  ];

  return (
    <motion.div
      key="content"
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.2 }}
      className="space-y-5"
    >
      <div>
        <h2 className="text-2xl font-black font-display text-white mb-1">
          Site Content
        </h2>
        <p className="text-sm" style={{ color: "rgba(255,255,255,0.45)" }}>
          Edit site-wide copy and messaging.
        </p>
      </div>

      <div
        className="rounded-2xl p-6 space-y-5"
        style={{
          background: "rgba(255,255,255,0.03)",
          border: "1px solid rgba(255,255,255,0.07)",
        }}
      >
        {fields.map(({ key, label, desc }) => (
          <div key={key} className="space-y-1.5">
            <Label className="text-sm font-bold text-white">{label}</Label>
            <p
              className="text-xs mb-1.5"
              style={{ color: "rgba(255,255,255,0.4)" }}
            >
              {desc}
            </p>
            <Textarea
              value={content[key]}
              onChange={(e) =>
                setContent((c) => ({ ...c, [key]: e.target.value }))
              }
              rows={2}
              className="resize-none text-sm bg-white/5 border-white/10 text-white"
              data-ocid={`content-${key}`}
            />
          </div>
        ))}

        <div className="pt-2 flex justify-end">
          <button
            type="button"
            onClick={handleSave}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm transition-smooth hover:scale-105"
            style={{
              background: saved
                ? "#7CB518"
                : "linear-gradient(135deg, #FF6B35, #FFD700)",
              color: "#1A1A2E",
              transition: "background 0.4s",
            }}
            data-ocid="content-save"
          >
            <Save size={14} />
            {saved ? "Saved!" : "Save Content"}
          </button>
        </div>
      </div>
    </motion.div>
  );
}

// ─── SettingsTab ──────────────────────────────────────────────────────────────

function SettingsTab() {
  const typeSamples = [
    {
      role: "Display / Headings",
      family: "Fraunces",
      sample: "Take a Chill Pill",
      cls: "font-display text-2xl font-black text-white",
    },
    {
      role: "Body / UI Text",
      family: "DM Sans",
      sample: "Fresh, bold, and full of flavour.",
      cls: "font-body text-base text-white",
    },
    {
      role: "Monospace / Code",
      family: "Geist Mono",
      sample: "#FF6B35 — Tangy Orange",
      cls: "font-mono text-sm text-white",
    },
  ];

  const brandInfo: [string, string][] = [
    ["Brand Name", "Chill Pill"],
    ["Brand Style", "Glassmorphism + 3D"],
    ["Target Audience", "General public, India"],
    ["Tone", "Fun, Fresh, Energetic, Youthful"],
    ["Design Style", "Bold Typography, Vibrant Colors"],
    ["Delivery Coverage", "Pan India"],
  ];

  const panelStyle = {
    background: "rgba(255,255,255,0.03)",
    border: "1px solid rgba(255,255,255,0.07)",
  };

  return (
    <motion.div
      key="settings"
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.2 }}
      className="space-y-7"
    >
      <div>
        <h2 className="text-2xl font-black font-display text-white mb-1">
          Settings
        </h2>
        <p className="text-sm" style={{ color: "rgba(255,255,255,0.45)" }}>
          Brand identity and design system reference.
        </p>
      </div>

      {/* Brand Colors */}
      <div className="rounded-2xl p-6" style={panelStyle}>
        <div className="flex items-center gap-2 mb-5">
          <Palette size={17} style={{ color: "#FF6B35" }} />
          <h3 className="text-base font-bold text-white font-display">
            Brand Color Palette
          </h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {BRAND_COLORS.map(({ name, hex, desc }) => (
            <div key={hex} className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-xl flex-shrink-0"
                style={{
                  background: hex,
                  boxShadow: `0 0 16px ${hex}44`,
                }}
              />
              <div className="min-w-0">
                <p className="text-sm font-semibold text-white">{name}</p>
                <p
                  className="text-xs"
                  style={{ color: "rgba(255,255,255,0.4)" }}
                >
                  {desc}
                </p>
                <p className="text-xs font-mono mt-0.5" style={{ color: hex }}>
                  {hex}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Typography */}
      <div className="rounded-2xl p-6" style={panelStyle}>
        <div className="flex items-center gap-2 mb-5">
          <Type size={17} style={{ color: "#7CB518" }} />
          <h3 className="text-base font-bold text-white font-display">
            Typography
          </h3>
        </div>
        <div className="space-y-3">
          {typeSamples.map(({ role, family, sample, cls }) => (
            <div
              key={role}
              className="p-4 rounded-xl"
              style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.06)",
              }}
            >
              <div className="flex items-center justify-between mb-2">
                <p
                  className="text-xs"
                  style={{ color: "rgba(255,255,255,0.4)" }}
                >
                  {role}
                </p>
                <Badge
                  variant="outline"
                  className="text-xs font-mono border-white/20 text-white/60"
                >
                  {family}
                </Badge>
              </div>
              <p className={cls}>{sample}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Brand Info */}
      <div className="rounded-2xl p-6" style={panelStyle}>
        <div className="flex items-center gap-2 mb-5">
          <Globe size={17} style={{ color: "#00B4D8" }} />
          <h3 className="text-base font-bold text-white font-display">
            Brand Info
          </h3>
        </div>
        <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4 text-sm">
          {brandInfo.map(([label, value]) => (
            <div key={label}>
              <dt
                className="text-xs"
                style={{ color: "rgba(255,255,255,0.4)" }}
              >
                {label}
              </dt>
              <dd className="font-semibold text-white mt-0.5">{value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </motion.div>
  );
}

// ─── AdminPage ────────────────────────────────────────────────────────────────

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<AdminTab>("dashboard");

  const tabContent: Record<AdminTab, React.ReactNode> = {
    dashboard: <DashboardTab />,
    products: <ProductsTab />,
    content: <ContentTab />,
    settings: <SettingsTab />,
  };

  return (
    <div
      className="min-h-screen"
      style={{
        background:
          "linear-gradient(135deg, #1A1A2E 0%, #16213e 55%, #0f3460 100%)",
      }}
    >
      {/* Admin Header */}
      <header
        className="sticky top-0 z-40"
        style={{
          background: "rgba(26,26,46,0.85)",
          backdropFilter: "blur(16px)",
          borderBottom: "1px solid rgba(255,255,255,0.08)",
        }}
        data-ocid="admin-header"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center gap-3">
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ background: "linear-gradient(135deg, #FF6B35, #FFD700)" }}
          >
            <ShieldCheck size={17} style={{ color: "#1A1A2E" }} />
          </div>
          <div>
            <p className="font-black text-sm text-white font-display leading-tight">
              Chill Pill Admin
            </p>
            <p className="text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>
              Content Management
            </p>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <span
              className="text-xs px-2.5 py-1 rounded-lg hidden sm:inline-flex items-center gap-1"
              style={{
                background: "rgba(124,181,24,0.12)",
                color: "#7CB518",
                border: "1px solid rgba(124,181,24,0.3)",
              }}
            >
              <span
                className="w-1.5 h-1.5 rounded-full"
                style={{ background: "#7CB518" }}
              />
              Live
            </span>
            <a
              href="/"
              className="text-xs px-3 py-1.5 rounded-lg transition-smooth"
              style={{
                border: "1px solid rgba(255,255,255,0.15)",
                color: "rgba(255,255,255,0.6)",
              }}
            >
              ← Back to Site
            </a>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 flex gap-5 lg:gap-7">
        {/* Sidebar — desktop */}
        <aside
          className="hidden lg:flex flex-col gap-1 w-52 flex-shrink-0 sticky top-24 self-start"
          data-ocid="admin-sidebar"
        >
          {NAV_ITEMS.map(({ id, label, icon: Icon }) => {
            const active = activeTab === id;
            return (
              <button
                key={id}
                type="button"
                onClick={() => setActiveTab(id)}
                className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-medium transition-smooth text-left"
                style={
                  active
                    ? {
                        background: "linear-gradient(135deg, #FF6B35, #FFD700)",
                        color: "#1A1A2E",
                        fontWeight: 700,
                      }
                    : { color: "rgba(255,255,255,0.55)" }
                }
                data-ocid={`admin-nav-${id}`}
              >
                <Icon size={15} />
                {label}
              </button>
            );
          })}
        </aside>

        {/* Main content */}
        <main className="flex-1 min-w-0">
          {/* Mobile tabs */}
          <div
            className="lg:hidden flex gap-1 mb-5 p-1 rounded-2xl overflow-x-auto"
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.08)",
            }}
            data-ocid="admin-mobile-nav"
          >
            {NAV_ITEMS.map(({ id, label, icon: Icon }) => {
              const active = activeTab === id;
              return (
                <button
                  key={id}
                  type="button"
                  onClick={() => setActiveTab(id)}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium whitespace-nowrap transition-smooth flex-shrink-0"
                  style={
                    active
                      ? {
                          background:
                            "linear-gradient(135deg, #FF6B35, #FFD700)",
                          color: "#1A1A2E",
                          fontWeight: 700,
                        }
                      : { color: "rgba(255,255,255,0.55)" }
                  }
                  data-ocid={`admin-mobile-nav-${id}`}
                >
                  <Icon size={12} />
                  {label}
                </button>
              );
            })}
          </div>

          {/* Content panel */}
          <div
            className="rounded-2xl p-5 sm:p-6 min-h-[60vh]"
            style={{
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.07)",
              backdropFilter: "blur(10px)",
            }}
          >
            <AnimatePresence mode="wait">
              {tabContent[activeTab]}
            </AnimatePresence>
          </div>
        </main>
      </div>
    </div>
  );
}
