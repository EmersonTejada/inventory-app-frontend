import type { ProductState } from "@/reducers/productsReducer";
import type { NewProduct } from "@/types/product";
import { createContext } from "react";

interface ProductContext {
  state: ProductState;
  getProducts: () => void;
  createProduct: (product: NewProduct) => void;
//   updateProduct: (product: Partial<Product>) => void;
//   deleteProduct: (id: number) => void;
}

export const ProductContext = createContext<ProductContext | undefined>(
  undefined
);