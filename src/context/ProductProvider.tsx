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
      const products = await productServices.getProducts();
      dispatch({ type: "setProducts", payload: products });
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
      console.log(newProduct)
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
      const updatedProduct = await productServices.updateProduct(product)
      dispatch({ type: "updateProduct", payload: updatedProduct });
    } catch (err) {
      dispatch({ type: "setError", payload: getErrorMessage(err) });
    } finally {
      dispatch({ type: "setSelectedProduct", payload: null });
      dispatch({ type: "setLoading", payload: false });
    }
  };

  const deleteProduct = async (product: Product) => {
    try {
      dispatch({ type: "setLoading", payload: true });
      const deletedProduct = await productServices.deleteProduct(product)
      dispatch({ type: "deleteProduct", payload: deletedProduct });
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
