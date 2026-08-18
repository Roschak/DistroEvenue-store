import type { Customer, Order, Promotion } from "@/types";

/**
 * DEMO orders, customers and promotions — fully synthetic portfolio data.
 * Never presented as real business activity.
 */

export const ORDERS: Order[] = [
  {
    id: "DA-2026-0841",
    customer: { name: "Raka Pradana", email: "raka.demo@example.com", city: "Bogor" },
    items: [
      {
        productId: "p-03",
        name: "AFTER DARK HOODIE",
        brand: "DISTRO AVENUE",
        size: "L",
        qty: 1,
        price: 429000,
        image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=600&auto=format&fit=crop",
      },
    ],
    subtotal: 429000,
    shipping: 20000,
    discount: 0,
    total: 449000,
    paymentStatus: "PAID",
    orderStatus: "PROCESSING",
    createdAt: "2026-08-06",
  },
  {
    id: "DA-2026-0840",
    customer: { name: "Salsa Ayu", email: "salsa.demo@example.com", city: "Depok" },
    items: [
      {
        productId: "p-02",
        name: "CITY UNIFORM TEE",
        brand: "DISTRO AVENUE",
        size: "M",
        qty: 2,
        price: 179000,
        image: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?q=80&w=600&auto=format&fit=crop",
      },
      {
        productId: "p-12",
        name: "PAKUAN CAP",
        brand: "DISTRO AVENUE",
        size: "ONE SIZE",
        qty: 1,
        price: 149000,
        image: "https://images.unsplash.com/photo-1523205771623-e0faa4d2813d?q=80&w=600&auto=format&fit=crop",
      },
    ],
    subtotal: 507000,
    shipping: 25000,
    discount: 0,
    total: 532000,
    paymentStatus: "PAID",
    orderStatus: "SHIPPED",
    createdAt: "2026-08-05",
  },
  {
    id: "DA-2026-0839",
    customer: { name: "Bima Saputra", email: "bima.demo@example.com", city: "Jakarta" },
    items: [
      {
        productId: "p-05",
        name: "RAIN COMMAND JACKET",
        brand: "DISTRO AVENUE",
        size: "XL",
        qty: 1,
        price: 589000,
        image: "https://images.unsplash.com/photo-1543076447-215ad9ba6923?q=80&w=600&auto=format&fit=crop",
      },
    ],
    subtotal: 589000,
    shipping: 30000,
    discount: 58900,
    total: 560100,
    paymentStatus: "PAID",
    orderStatus: "COMPLETED",
    createdAt: "2026-08-02",
  },
  {
    id: "DA-2026-0838",
    customer: { name: "Nadia Kirana", email: "nadia.demo@example.com", city: "Bandung" },
    items: [
      {
        productId: "p-09",
        name: "AVENUE LOW",
        brand: "DISTRO AVENUE",
        size: "42",
        qty: 1,
        price: 529000,
        image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=600&auto=format&fit=crop",
      },
      {
        productId: "p-11",
        name: "AVENUE DAYPACK",
        brand: "DISTRO AVENUE",
        size: "ONE SIZE",
        qty: 1,
        price: 289000,
        image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=600&auto=format&fit=crop",
      },
    ],
    subtotal: 818000,
    shipping: 35000,
    discount: 0,
    total: 853000,
    paymentStatus: "UNPAID",
    orderStatus: "PENDING",
    createdAt: "2026-08-01",
  },
  {
    id: "DA-2026-0837",
    customer: { name: "Dewa Mahardika", email: "dewa.demo@example.com", city: "Bogor" },
    items: [
      {
        productId: "p-07",
        name: "WEEKEND CARGO PANT",
        brand: "DISTRO AVENUE",
        size: "32",
        qty: 1,
        price: 359000,
        image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?q=80&w=600&auto=format&fit=crop",
      },
    ],
    subtotal: 359000,
    shipping: 0,
    discount: 0,
    total: 359000,
    paymentStatus: "PAID",
    orderStatus: "COMPLETED",
    createdAt: "2026-07-28",
  },
  {
    id: "DA-2026-0836",
    customer: { name: "Anggi Lestari", email: "anggi.demo@example.com", city: "Tangerang" },
    items: [
      {
        productId: "p-04",
        name: "PAKUAN HOODIE",
        brand: "DISTRO AVENUE",
        size: "L",
        qty: 1,
        price: 409000,
        image: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?q=80&w=600&auto=format&fit=crop",
      },
    ],
    subtotal: 409000,
    shipping: 25000,
    discount: 0,
    total: 434000,
    paymentStatus: "PAID",
    orderStatus: "CANCELLED",
    createdAt: "2026-07-25",
  },
];

export const CUSTOMERS: Customer[] = [
  { id: "cu-01", name: "Raka Pradana", email: "raka.demo@example.com", city: "Bogor", orders: 3, totalSpent: 1147000, joinedAt: "2026-05-12" },
  { id: "cu-02", name: "Salsa Ayu", email: "salsa.demo@example.com", city: "Depok", orders: 2, totalSpent: 876000, joinedAt: "2026-05-30" },
  { id: "cu-03", name: "Bima Saputra", email: "bima.demo@example.com", city: "Jakarta", orders: 4, totalSpent: 2410000, joinedAt: "2026-04-18" },
  { id: "cu-04", name: "Nadia Kirana", email: "nadia.demo@example.com", city: "Bandung", orders: 1, totalSpent: 853000, joinedAt: "2026-06-22" },
  { id: "cu-05", name: "Dewa Mahardika", email: "dewa.demo@example.com", city: "Bogor", orders: 5, totalSpent: 1985000, joinedAt: "2026-03-09" },
  { id: "cu-06", name: "Anggi Lestari", email: "anggi.demo@example.com", city: "Tangerang", orders: 1, totalSpent: 434000, joinedAt: "2026-07-01" },
];

export const PROMOTIONS: Promotion[] = [
  { id: "pr-01", code: "AVENUE10", name: "First Visit 10%", type: "PERCENT", value: 10, status: "ACTIVE", uses: 128 },
  { id: "pr-02", code: "DROP001", name: "Drop 001 Launch", type: "FIXED", value: 50000, status: "SCHEDULED", uses: 0 },
  { id: "pr-03", code: "WEEKEND25", name: "Weekend Shipping", type: "FIXED", value: 25000, status: "ACTIVE", uses: 64 },
  { id: "pr-04", code: "CLEARANCE", name: "Season Clearance", type: "PERCENT", value: 30, status: "ENDED", uses: 402 },
];
