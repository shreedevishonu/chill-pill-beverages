export type ProductType = "Juice" | "Soda";

export interface Product {
  id: string;
  name: string;
  type: ProductType;
  color: string;
  tagline: string;
  description: string;
  ingredients: string[];
  price: number;
  image?: string;
}

export const products: Product[] = [
  {
    id: "tangy-orange",
    name: "Tangy Orange",
    type: "Juice",
    color: "#FF6B35",
    tagline: "Squeeze the day, every day",
    description:
      "Sun-kissed oranges from Maharashtra's finest orchards, cold-pressed into every bottle. Bursting with Vitamin C and natural citrusy goodness that wakes up your senses and keeps you going all day.",
    ingredients: [
      "Fresh Orange Juice (98%)",
      "Natural Lemon Extract",
      "Rock Salt",
      "No Preservatives",
      "No Added Sugar",
    ],
    price: 10,
    image: "/images/products/tangy-orange.png",
  },
  {
    id: "lime-lemon",
    name: "Lime & Lemon",
    type: "Juice",
    color: "#7CB518",
    tagline: "Double the zing, double the life",
    description:
      "A powerhouse duo of farm-fresh lime and juicy lemons, blended perfectly for that zesty punch you crave. Naturally alkaline and packed with antioxidants to keep you refreshed all day.",
    ingredients: [
      "Fresh Lime Juice (55%)",
      "Lemon Juice (40%)",
      "Himalayan Pink Salt",
      "Natural Mint Extract",
      "No Preservatives",
    ],
    price: 10,
    image: "/images/products/lime-lemon.svg",
  },
  {
    id: "shikanji",
    name: "Shikanji",
    type: "Juice",
    color: "#FFD700",
    tagline: "Dadi ka nuskha, modern bottle",
    description:
      "The iconic Indian street-side lemonade reimagined for the modern age. Our Shikanji blends fresh lemon juice with roasted cumin, black salt, and a hint of ginger — just like home, but better.",
    ingredients: [
      "Lemon Juice (70%)",
      "Roasted Cumin Powder",
      "Black Salt (Kala Namak)",
      "Fresh Ginger Extract",
      "Amchur Powder",
      "No Preservatives",
    ],
    price: 10,
    image: "/images/products/shikanji.png",
  },
  {
    id: "club-soda",
    name: "Club Soda",
    type: "Soda",
    color: "#00B4D8",
    tagline: "Pure. Clean. Crisp.",
    description:
      "Triple-filtered, highly carbonated club soda. Pristine and refreshing with no added flavors — the ultimate mixer and the cleanest way to hydrate. Your bartender's best friend.",
    ingredients: [
      "Purified Carbonated Water",
      "Sodium Bicarbonate",
      "Potassium Sulfate",
      "Zero Calories",
      "Zero Sugar",
    ],
    price: 10,
    image: "/images/products/club-soda.png",
  },
  {
    id: "frutu-fizy",
    name: "Frutu Fizy",
    type: "Soda",
    color: "#9B5DE5",
    tagline: "Fizz with a fruity twist",
    description:
      "A wild explosion of tropical fruit flavors meets the fizz of premium carbonated water. Frutu Fizy is the party in a bottle — bold purple fizz loaded with mixed berry and lychee notes.",
    ingredients: [
      "Carbonated Water",
      "Mixed Berry Extract",
      "Lychee Flavor",
      "Natural Cane Sugar",
      "Citric Acid",
      "No Artificial Colors",
    ],
    price: 10,
    image: "/images/products/frutu-fizy.png",
  },
  {
    id: "jeera-soda",
    name: "Jeera Soda",
    type: "Soda",
    color: "#D4611C",
    tagline: "India's OG digestive fizz",
    description:
      "The legendary Indian digestive drink, bottled and carbonated for modern convenience. Slow-roasted cumin meets natural carbonation for a spiced fizz that settles the stomach and delights the palate.",
    ingredients: [
      "Carbonated Water",
      "Roasted Cumin Extract",
      "Black Salt",
      "Amchur Flavor",
      "Ginger Extract",
      "Natural Cane Sugar",
    ],
    price: 10,
    image: "/images/products/jeera-soda.png",
  },
];

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}

export function getRelatedProducts(id: string, limit = 3): Product[] {
  const product = getProductById(id);
  if (!product) return products.slice(0, limit);
  return products
    .filter((p) => p.id !== id && p.type === product.type)
    .slice(0, limit);
}
