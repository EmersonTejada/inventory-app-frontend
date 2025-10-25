import type { Category } from "@/types/category";

export interface CategoryState {
  categories: Category[];
  loading: boolean;
  error: string | null;
}

export const initialCategoryState: CategoryState = {
  categories: [],
  loading: false,
  error: null,
};

export type CategoryActions =
  | { type: "setCategories"; payload: Category[] }
  | { type: "createCategory"; payload: Category }
  | { type: "updateCategory"; payload: Category }
  | { type: "deleteCategory"; payload: number }
  | { type: "setLoading"; payload: boolean }
  | { type: "setError"; payload: string | null };

  export const categoryReducer = (state: CategoryState, action: CategoryActions): CategoryState => {
    switch(action.type) {
        case "setCategories": return {...state, categories: action.payload};
        case "createCategory": return {...state, categories: [...state.categories, action.payload]};
        case "updateCategory": return {...state, categories: state.categories.map((category) => category.id === action.payload.id ? action.payload : category)};
        case "deleteCategory": return {...state, categories: state.categories.filter((category) => category.id !== action.payload)};
        case "setError": return {...state, error: action.payload}
        case "setLoading": return {...state, loading: action.payload}
        default: return state
    }
  }