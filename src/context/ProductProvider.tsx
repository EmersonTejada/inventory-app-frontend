import { useCallback, useReducer } from "react";
import { ProductContext } from "./ProductContext";
import {
  initialProductState,
  productsReducer,
} from "@/reducers/productsReducer";
import { products } from "@/services/productsService";

interface ProductProviderProps {
  children: React.ReactNode;
}

export const ProductProvider = ({ children }: ProductProviderProps) => {
  const [state, dispatch] = useReducer(productsReducer, initialProductState);

  const getProducts = useCallback(async () => {
    try {
      dispatch({ type: "setLoading", payload: true });
      const newproducts = await products
      dispatch({ type: "setProducts", payload: newproducts});
      dispatch({type: "setLoaded", payload: true})
    } catch (err) {
      if (err instanceof Error) {
        dispatch({ type: "setError", payload: err.message });
      } else {
        dispatch({ type: "setError", payload: "Error desconocido" });
      }
    } finally {
      dispatch({ type: "setLoading", payload: false });
    }
  }, [])
  return <ProductContext value={{ state, getProducts }}>{children}</ProductContext>;
};
