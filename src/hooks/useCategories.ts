import { CategoryContext } from "@/context/CategoryContext";
import { useContext } from "react";

export const useCategories = () => {
  const ctx = useContext(CategoryContext);
  if (!ctx)
    throw new Error("useCategories debe estar dentro del CategoryProvider");
  return ctx;
};
