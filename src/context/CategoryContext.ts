import type { CategoryState } from "@/reducers/categoryReducer";
import type { Category, NewCategory } from "@/types/category";
import { createContext } from "react";

interface CategoryContext {
  state: CategoryState;
  getCategories: () => void;
  createCategory: (category: NewCategory) => void;
  updateCategory: (category: Partial<Category>) => void;
  deleteCategory: (id: number) => void;
}

export const CategoryContext = createContext<CategoryContext | undefined>(
  undefined
);
