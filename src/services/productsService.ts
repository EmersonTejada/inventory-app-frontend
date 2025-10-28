import type { NewProduct, Product } from "@/types/product";

const API_URL = import.meta.env.VITE_API_URL;
export const getProducts = async (): Promise<Product[]> => {
  try {
    const res = await fetch(`${API_URL}/products`);
    const data = await res.json();
    if (!res.ok) {
      throw new Error(`Ha habido un error al obtener los productos: ${data.message}`);
    }
    return data.products;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const createProduct = async (product: NewProduct): Promise<Product> => {
  try {
    const res = await fetch(`${API_URL}/products/create`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(product)
    })
    const data = await res.json()

    if(!res.ok) {
        throw new Error(`Ha habido un error al crear el producto ${data.message}`)
    }

    return data.product
  } catch (err) {
    console.error(err)
    throw err
  }
};

export const updateProduct = async (product: Product): Promise<Product> => {
  try {
    const res = await fetch(`${API_URL}/products/update/${product.id}`, {
      method: "PUT",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(product)
    })
    const data = await res.json()

    if(!res.ok) {
        throw new Error(`Ha habido un error al actualizar el producto: ${data.message}`)
    }

    return data.product
  } catch (err) {
    console.error(err)
    throw err
  }
};

export const deleteProduct = async (product: Product): Promise<Product> => {
  try {
    const res = await fetch(`${API_URL}/products/delete/${product.id}`, {
      method: "DELETE",
    })
    const data = await res.json()

    if(!res.ok) {
        throw new Error(`Ha habido un error al eliminar el producto: ${data.message}`)
    }

    return data.product
  } catch (err) {
    console.error(err)
    throw err
  }
};
