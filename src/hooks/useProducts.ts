import { ProductContext } from "@/context/ProductContext";
import { useContext } from "react";

export const useProducts = () => {
  const ctx = useContext(ProductContext);
  if (!ctx)
    throw new Error("useProducts debe estar dentro del ProductProvider");
  return ctx;
};
