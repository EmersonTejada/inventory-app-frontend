export interface Product {
    id?: number
    title: string
    description?: string
    price: number
    stock: number
    categoryId: number
    createdAt: string,
    updatedAt: string
}

export type NewProduct = Omit<Product, "id">