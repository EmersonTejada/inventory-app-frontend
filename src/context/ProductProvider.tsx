import { useCallback, useReducer } from "react";
import { ProductContext } from "./ProductContext";
import {
  initialProductState,
  productsReducer,
} from "@/reducers/productsReducer";
import { getErrorMessage } from "@/helpers/getErrorMessage";
import type { NewProduct } from "@/types/product";
import * as productServices from "../services/productsService"

interface ProductProviderProps {
  children: React.ReactNode;
}

export const ProductProvider = ({ children }: ProductProviderProps) => {
  const [state, dispatch] = useReducer(productsReducer, initialProductState);

  const getProducts = useCallback(async () => {
    try {
      dispatch({ type: "setLoading", payload: true });
      const newproducts = await productServices.getProducts()
      dispatch({ type: "setProducts", payload: newproducts });
      dispatch({ type: "setLoaded", payload: true });
    } catch (err) {
      if (err instanceof Error) {
        dispatch({ type: "setError", payload: err.message });
      } else {
        dispatch({ type: "setError", payload: "Error desconocido" });
      }
    } finally {
      dispatch({ type: "setLoading", payload: false });
    }
  }, []);

  const createProduct = async (product: NewProduct) => {
    try {
        dispatch({type: "setLoading", payload: true})
        const newProduct = productServices.createProduct(product)
        dispatch({type: "createProduct", payload: newProduct})
    } catch (err) {
      dispatch({ type: "setError", payload: getErrorMessage(err) });
    } finally {
        dispatch({type: "setLoading", payload: false})
    }
  };
  return (
    <ProductContext value={{ state, getProducts, createProduct }}>{children}</ProductContext>
  );
};
