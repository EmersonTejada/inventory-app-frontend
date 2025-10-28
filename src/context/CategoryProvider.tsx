import { useCallback, useReducer, type ReactNode } from "react";
import { CategoryContext } from "./CategoryContext";
import {
  categoryReducer,
  initialCategoryState,
} from "@/reducers/categoryReducer";
import * as categoriesService from "../services/categoriesService";
import type { Category, NewCategory } from "@/types/category";

interface CategoryProviderProps {
  children: ReactNode;
}
export const CategoryProvider = ({ children }: CategoryProviderProps) => {
  const [state, dispatch] = useReducer(categoryReducer, initialCategoryState);

  const getCategories = useCallback(async () => {
    try {
      dispatch({ type: "setLoading", payload: true });
      const categories = await categoriesService.getCategories();
      dispatch({ type: "setCategories", payload: categories });
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

  const createCategory = async (category: NewCategory) => {
    try {
      dispatch({ type: "setLoading", payload: true });
      const newCategory = await categoriesService.createCategory(category);
      dispatch({ type: "createCategory", payload: newCategory });
    } catch (err) {
      if (err instanceof Error) {
        dispatch({ type: "setError", payload: err.message });
      } else {
        dispatch({ type: "setError", payload: "Error desconocido" });
      }
    } finally {
      dispatch({ type: "setLoading", payload: false });
    }
  };

  const updateCategory = async (category: Partial<Category>) => {
    try {
      dispatch({ type: "setLoading", payload: true });
      const updatedCategory = await categoriesService.updateCategory(category);
      dispatch({ type: "updateCategory", payload: updatedCategory });
    } catch (err) {
      if (err instanceof Error) {
        dispatch({ type: "setError", payload: err.message });
      } else {
        dispatch({ type: "setError", payload: "Error desconocido" });
      }
    } finally {
      dispatch({ type: "setSelectedProduct", payload: null });
      dispatch({ type: "setLoading", payload: false });
    }
  };

  const deleteCategory = async (id: number) => {
    try {
      dispatch({ type: "setLoading", payload: true });
      await categoriesService.deleteCategory(id);
      dispatch({ type: "deleteCategory", payload: id });
    } catch (err) {
      if (err instanceof Error) {
        dispatch({ type: "setError", payload: err.message });
      } else {
        dispatch({ type: "setError", payload: "Error desconocido" });
      }
    } finally {
      dispatch({ type: "setLoading", payload: false });
    }
  };
  return (
    <CategoryContext
      value={{
        state,
        getCategories,
        createCategory,
        updateCategory,
        deleteCategory,
        dispatch,
      }}
    >
      {children}
    </CategoryContext>
  );
};

export default CategoryProvider;
