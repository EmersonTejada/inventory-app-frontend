import type { ProductsAction, ProductState } from "@/reducers/productsReducer";
import type { NewProduct, Product } from "@/types/product";
import { createContext } from "react";

interface ProductContext {
  state: ProductState;
  getProducts: () => void;
  createProduct: (product: NewProduct) => void;
 updateProduct: (product: Product) => void;
  deleteProduct: (id: number) => void
  dispatch: React.Dispatch<ProductsAction>;
}

export const ProductContext = createContext<ProductContext | undefined>(
  undefined
);