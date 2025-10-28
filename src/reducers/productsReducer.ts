import type { Product } from "@/types/product";

export interface ProductState {
  products: Product[];
  loading: boolean;
  error: string | null;
  isLoaded: boolean;
  dialogOpen: boolean
  selectedProduct: Product | null;
}

export const initialProductState: ProductState = {
  products: [],
  loading: false,
  error: null,
  isLoaded: false,
  dialogOpen: false,
  selectedProduct: null,
};

export type ProductsAction =
  | { type: "setProducts"; payload: Product[] }
  | { type: "createProduct"; payload: Product }
  | { type: "updateProduct"; payload: Product }
  | { type: "deleteProduct"; payload: Product }
  | { type: "setLoading"; payload: boolean }
  | { type: "setError"; payload: string | null }
  | { type: "setLoaded"; payload: boolean }
  | { type: "setDialogOpen"; payload: boolean }
  | { type: "setSelectedProduct"; payload: Product | null };

export const productsReducer = (
  state: ProductState,
  action: ProductsAction
): ProductState => {
  switch (action.type) {
    case "setProducts":
      return { ...state, products: action.payload };
    case "createProduct":
      return { ...state, products: [...state.products, action.payload] };
    case "updateProduct":
      return {
        ...state,
        products: state.products.map((product) =>
          product.id === action.payload.id ? action.payload : product
        ),
      };
    case "deleteProduct":
      return {
        ...state,
        products: state.products.filter(
          (product) => product.id !== action.payload.id
        ),
      };
    case "setError":
      return { ...state, error: action.payload };
    case "setLoading":
      return { ...state, loading: action.payload };
    case "setLoaded":
      return { ...state, isLoaded: action.payload };
    case "setDialogOpen":
      return { ...state, dialogOpen: action.payload };
    case "setSelectedProduct":
      return { ...state, selectedProduct: action.payload };
    default:
      return state;
  }
};
