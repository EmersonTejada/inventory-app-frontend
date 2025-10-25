import CategoriesForm from "@/components/categories/CategoriesForm";
import { columns } from "@/components/categories/columns";
import { DataTable } from "@/components/products/DataTable";
import { useCategories } from "@/hooks/useCategories";
import { useEffect } from "react";

const Categories = () => {
  const { state, getCategories } = useCategories();

  useEffect(() => {
    getCategories(); 
  }, []);
  return (
    <section className="space-y-4">
      <h1 className="text-2xl font-bold">Categorias</h1>

      <DataTable
        columns={columns}
        data={state.categories}
        inputPlaceholder="Filtrar categorías"
        inputSearchColumn="name"
        addButonValue="Agregar Categoria"
        dialogForm={<CategoriesForm />}
        dialogTitle="Agregar Categoria"
      />
    </section>
  );
};

export default Categories;
