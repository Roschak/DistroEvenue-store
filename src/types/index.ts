export type ProductStatus = "DRAFT" | "PUBLISHED" | "ARCHIVED";
export type StockStatus = "IN STOCK" | "LOW STOCK" | "OUT OF STOCK";

export interface ProductColor {
  name: string;
  hex: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  brand: string;
  collectionId: string;
  category: string;
  description: string;
  price: number;
  salePrice?: number | null;
  images: string[];
  sizes: string[];
  colors: ProductColor[];
  sku: string;
  stock: number;
  status: ProductStatus;
  featured?: boolean;
  createdAt: string;
}

export interface Collection {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  productCount: number;
  tagline?: string;
}

export interface Look {
  id: string;
  title: string;
  slug: string;
  subtitle: string;
  images: { main: string; secondary: string; vertical: string };
  productIds: string[];
  layout: "a" | "b" | "c";
}

export type JournalCategory = "STYLE" | "BOGOR" | "CULTURE" | "COMMUNITY" | "FASHION";

export interface JournalArticle {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string[];
  image: string;
  category: JournalCategory;
  publishedAt: string;
  readTime: string;
  status: "PUBLISHED" | "DRAFT";
  note?: string;
}

export interface OrderItem {
  productId: string;
  name: string;
  brand: string;
  size: string;
  qty: number;
  price: number;
  image: string;
}

export type OrderStatus = "PENDING" | "PAID" | "PROCESSING" | "SHIPPED" | "COMPLETED" | "CANCELLED";

export interface Order {
  id: string;
  customer: { name: string; email: string; city: string };
  items: OrderItem[];
  subtotal: number;
  shipping: number;
  discount: number;
  total: number;
  paymentStatus: "PAID" | "UNPAID" | "REFUNDED";
  orderStatus: OrderStatus;
  createdAt: string;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  city: string;
  orders: number;
  totalSpent: number;
  joinedAt: string;
}

export interface BagItem {
  key: string;
  productId: string;
  slug: string;
  brand: string;
  name: string;
  price: number;
  salePrice?: number | null;
  image: string;
  size: string;
  qty: number;
}

export interface Promotion {
  id: string;
  code: string;
  name: string;
  type: "PERCENT" | "FIXED";
  value: number;
  status: "ACTIVE" | "SCHEDULED" | "ENDED";
  uses: number;
}
