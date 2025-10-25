import type { Category, NewCategory } from "@/types/category";

const API_URL = import.meta.env.VITE_API_URL;

export const getCategories = async (): Promise<Category[]> => {
  try {
    const res = await fetch(`${API_URL}/categories`);

    if (!res.ok) {
      throw new Error(
        `Ha habido un error al obtener las categorias: ${res.statusText}`
      );
    }
    const { categories } = await res.json();
    return categories;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const createCategory = async (newCategory: NewCategory): Promise<Category> => {
  try {
    const res = await fetch(`${API_URL}/categories/create`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newCategory),
    });
    if (!res.ok) {
      throw new Error(
        `Ha habido un error al crear categoria ${res.statusText}`
      );
    }
    const { category } = await res.json();
    return category;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const updateCategory = async (updatedCategory: Partial<Category>)=> {
  try {
    const res = await fetch(`${API_URL}/categories/update/${updatedCategory.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedCategory),
    });
    if (!res.ok) {
      throw new Error(
        `Ha habido un error al actualizar la categoria ${res.statusText}`
      );
    }
    const { category } = await res.json();
    return category;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export const deleteCategory = async (id: number) => {
  try {
    const res = await fetch(`${API_URL}/categories/delete/${id}`, {
      method: "DELETE"
    });
    if (!res.ok) {
      throw new Error(
        `Ha habido un error al eliminar la categoria ${res.statusText}`
      );
    }
    const { category } = await res.json();
    return category;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

