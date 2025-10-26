import type { NewProduct, Product } from "@/types/product";

export const getProducts = async () => {
    return []
}

export const createProduct = (product: NewProduct): Product => {
    const now = new Date().toISOString()
    return {
        id: Math.floor(Math.random() * 1000),
        ...product,
        createdAt: now,
        updatedAt: now

    }
}