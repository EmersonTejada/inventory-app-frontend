import { useCallback, useReducer } from "react";
import { ProductContext } from "./ProductContext";
import {
  initialProductState,
  productsReducer,
} from "@/reducers/productsReducer";
import { getErrorMessage } from "@/helpers/getErrorMessage";
import type { NewProduct, Product } from "@/types/product";
import * as productServices from "../services/productsService";

interface ProductProviderProps {
  children: React.ReactNode;
}

export const ProductProvider = ({ children }: ProductProviderProps) => {
  const [state, dispatch] = useReducer(productsReducer, initialProductState);

  const getProducts = useCallback(async () => {
    try {
      dispatch({ type: "setLoading", payload: true });
      const newproducts = await productServices.getProducts();
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
      dispatch({ type: "setLoading", payload: true });
      const newProduct = await productServices.createProduct(product);
      dispatch({ type: "createProduct", payload: newProduct });
    } catch (err) {
      dispatch({ type: "setError", payload: getErrorMessage(err) });
    } finally {
      dispatch({ type: "setLoading", payload: false });
    }
  };

  const updateProduct = async (product: Product) => {
    try {
      dispatch({ type: "setLoading", payload: true });
      dispatch({ type: "updateProduct", payload: product });
    } catch (err) {
      dispatch({ type: "setError", payload: getErrorMessage(err) });
    } finally {
      dispatch({ type: "setSelectedProduct", payload: null });
      dispatch({ type: "setLoading", payload: false });
    }
  };

  const deleteProduct = async (productId: number) => {
    try {
      dispatch({ type: "setLoading", payload: true });
      dispatch({ type: "deleteProduct", payload: productId });
    } catch (err) {
      dispatch({ type: "setError", payload: getErrorMessage(err) });
    } finally {
      dispatch({ type: "setLoading", payload: false });
    }
  };
  return (
    <ProductContext
      value={{
        state,
        getProducts,
        createProduct,
        updateProduct,
        deleteProduct,
        dispatch,
      }}
    >
      {children}
    </ProductContext>
  );
};
