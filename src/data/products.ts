export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  images: string[];
  category: "male" | "unisex";
  sizes: number[];
  colors: { name: string; hex: string }[];
  isNew?: boolean;
  isBestseller?: boolean;
  createdAt: Date;
}

export const products: Product[] = [
  {
    id: "1",
    name: "Executive Leather Classic",
    description: "Premium full-grain leather sneaker with cushioned insole and signature stitching. Perfect for the modern gentleman who values both comfort and style.",
    price: 125000,
    images: ["/images/sneaker-1.jpg"],
    category: "male",
    sizes: [40, 41, 42, 43, 44, 45],
    colors: [
      { name: "Classic White", hex: "#FFFFFF" },
      { name: "Obsidian Black", hex: "#1a1a1a" },
    ],
    isNew: true,
    createdAt: new Date("2024-01-15"),
  },
  {
    id: "2",
    name: "Urban Sport Premium",
    description: "Handcrafted Italian leather upper with responsive cushioning technology. Designed for all-day comfort without compromising on elegance.",
    price: 145000,
    originalPrice: 165000,
    images: ["/images/sneaker-2.jpg"],
    category: "male",
    sizes: [40, 41, 42, 43, 44, 45, 46],
    colors: [
      { name: "Pure White", hex: "#F8F8F8" },
      { name: "Navy Blue", hex: "#1a1a3e" },
    ],
    isBestseller: true,
    createdAt: new Date("2024-01-10"),
  },
  {
    id: "3",
    name: "Midnight Runner Elite",
    description: "Bold design meets premium craftsmanship. Features breathable mesh panels and memory foam insole for superior comfort.",
    price: 98000,
    images: ["/images/sneaker-3.jpg"],
    category: "male",
    sizes: [40, 41, 42, 43, 44, 45],
    colors: [
      { name: "Jet Black", hex: "#0d0d0d" },
      { name: "Storm Grey", hex: "#4a4a4a" },
    ],
    isNew: true,
    createdAt: new Date("2024-01-20"),
  },
  {
    id: "4",
    name: "Heritage Sport Low",
    description: "Inspired by vintage athletic designs with modern comfort technology. Premium suede and leather combination for a timeless look.",
    price: 112000,
    images: ["/images/sneaker-4.jpg"],
    category: "male",
    sizes: [40, 41, 42, 43, 44, 45],
    colors: [
      { name: "Vintage White", hex: "#F5F5DC" },
      { name: "Tan Brown", hex: "#D2691E" },
    ],
    createdAt: new Date("2024-01-05"),
  },
  {
    id: "5",
    name: "Velocity Runner Pro",
    description: "Dynamic design with vibrant accents. Lightweight construction with maximum cushioning for active lifestyles.",
    price: 135000,
    images: ["/images/sneaker-5.jpg"],
    category: "unisex",
    sizes: [36, 37, 38, 39, 40, 41, 42, 43, 44, 45],
    colors: [
      { name: "Racing Red", hex: "#C41E3A" },
      { name: "Electric Blue", hex: "#0066CC" },
    ],
    isBestseller: true,
    isNew: true,
    createdAt: new Date("2024-01-18"),
  },
  {
    id: "6",
    name: "Signature Low Top",
    description: "Clean lines and premium materials define this essential sneaker. Butter-soft leather with hand-finished details.",
    price: 158000,
    images: ["/images/sneaker-6.jpg"],
    category: "male",
    sizes: [40, 41, 42, 43, 44, 45, 46],
    colors: [
      { name: "Cream White", hex: "#FFFDD0" },
      { name: "Cognac Brown", hex: "#9A463D" },
    ],
    isBestseller: true,
    createdAt: new Date("2024-01-08"),
  },
  {
    id: "7",
    name: "Street Luxe Essential",
    description: "Where street style meets luxury craftsmanship. Premium materials with distinctive design elements.",
    price: 142000,
    originalPrice: 168000,
    images: ["/images/sneaker-7.jpg"],
    category: "unisex",
    sizes: [36, 37, 38, 39, 40, 41, 42, 43, 44],
    colors: [
      { name: "Arctic White", hex: "#F0F8FF" },
      { name: "Deep Forest", hex: "#228B22" },
    ],
    createdAt: new Date("2024-01-12"),
  },
  {
    id: "8",
    name: "Icon Sport Classic",
    description: "Timeless design updated with contemporary comfort. Premium leather upper with cushioned midsole technology.",
    price: 128000,
    images: ["/images/sneaker-8.jpg"],
    category: "unisex",
    sizes: [36, 37, 38, 39, 40, 41, 42, 43, 44, 45],
    colors: [
      { name: "Cloud White", hex: "#F5F5F5" },
      { name: "Midnight Black", hex: "#191970" },
    ],
    isNew: true,
    createdAt: new Date("2024-01-22"),
  },
];

// Utility functions
export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
};

export const getProductById = (id: string): Product | undefined => {
  return products.find((p) => p.id === id);
};

export const getProductsByCategory = (category: "male" | "unisex" | "all"): Product[] => {
  if (category === "all") return products;
  return products.filter((p) => p.category === category);
};

export const getFeaturedProducts = (count: number = 4): Product[] => {
  return products.filter((p) => p.isBestseller || p.isNew).slice(0, count);
};

export const getNewArrivals = (): Product[] => {
  return products.filter((p) => p.isNew);
};

export const getBestsellers = (): Product[] => {
  return products.filter((p) => p.isBestseller);
};

export const getRelatedProducts = (productId: string, count: number = 4): Product[] => {
  const product = getProductById(productId);
  if (!product) return [];
  return products
    .filter((p) => p.id !== productId && p.category === product.category)
    .slice(0, count);
};
