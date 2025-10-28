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

export const updateProduct = (product: Product): Product => {
    const now = new Date().toISOString()
    return {
        ...product,
        updatedAt: now
    }
}

export const deleteProduct = (productId: number): boolean => {
    return true
}