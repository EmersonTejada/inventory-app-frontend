import type { NewProduct, Product } from "@/types/product";

export const products = [
  {
    id: 1,
    title: "Laptop Dell XPS 13",
    price: 1299.99,
    stock: 8,
    categoryId: 1,
    createdAt: "2025-10-10T09:32:12.000Z",
    updatedAt: "2025-10-15T14:41:59.647Z",
  },
  {
    id: 2,
    title: "Mouse Logitech MX Master 3S",
    price: 89.99,
    stock: 25,
    categoryId: 2,
    createdAt: "2025-10-12T12:11:30.000Z",
    updatedAt: "2025-10-20T08:10:45.000Z",
  },
  {
    id: 3,
    title: "Teclado Mecánico Keychron K6",
    price: 99.99,
    stock: 15,
    categoryId: 2,
    createdAt: "2025-10-05T10:21:47.000Z",
    updatedAt: "2025-10-18T09:59:12.000Z",
  },
  {
    id: 4,
    title: "Monitor Samsung 27'' Curvo",
    price: 279.5,
    stock: 12,
    categoryId: 3,
    createdAt: "2025-09-30T15:43:09.000Z",
    updatedAt: "2025-10-20T17:12:24.000Z",
  },
  {
    id: 5,
    title: "Silla Gamer Razer Iskur",
    price: 449.0,
    stock: 6,
    categoryId: 4,
    createdAt: "2025-10-01T11:12:55.000Z",
    updatedAt: "2025-10-21T13:41:59.647Z",
  },
  {
    id: 6,
    title: "Audífonos Sony WH-1000XM5",
    price: 379.99,
    stock: 20,
    categoryId: 5,
    createdAt: "2025-09-28T09:41:12.000Z",
    updatedAt: "2025-10-19T10:31:42.000Z",
  },
  {
    id: 7,
    title: "Webcam Logitech C920 HD Pro",
    price: 99.5,
    stock: 30,
    categoryId: 6,
    createdAt: "2025-09-22T17:22:10.000Z",
    updatedAt: "2025-10-21T18:15:03.000Z",
  },
  {
    id: 8,
    title: "Disco Duro Externo Seagate 2TB",
    price: 74.99,
    stock: 18,
    categoryId: 7,
    createdAt: "2025-09-29T20:02:34.000Z",
    updatedAt: "2025-10-20T10:00:19.000Z",
  },
  {
    id: 9,
    title: "Router TP-Link Archer AX50",
    price: 159.0,
    stock: 10,
    categoryId: 8,
    createdAt: "2025-10-03T16:45:27.000Z",
    updatedAt: "2025-10-18T12:12:24.000Z",
  },
  {
    id: 10,
    title: "Impresora HP LaserJet Pro",
    price: 249.99,
    stock: 9,
    categoryId: 9,
    createdAt: "2025-10-08T08:18:12.000Z",
    updatedAt: "2025-10-21T11:41:59.647Z",
  },
  {
    id: 11,
    title: "Impresora HP LaserJet Pro",
    price: 249.99,
    stock: 9,
    categoryId: 9,
    createdAt: "2025-10-08T08:18:12.000Z",
    updatedAt: "2025-10-21T11:41:59.647Z",
  },
];

export const createProduct = (product: NewProduct): Product => {
    const now = new Date().toISOString()
    return {
        id: Math.floor(Math.random() * 1000),
        ...product,
        createdAt: now,
        updatedAt: now

    }
}