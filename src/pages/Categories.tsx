import CategoriesForm from "@/components/categories/CategoriesForm";
import { columns } from "@/components/categories/columns";
import { DataTable } from "@/components/products/DataTable";
import { Spinner } from "@/components/ui/spinner";
import { useCategories } from "@/hooks/useCategories";
import { useEffect } from "react";

const Categories = () => {
  const { state, getCategories, deleteCategory } = useCategories();

  useEffect(() => {
    if(!state.isLoaded && !state.loading && !state.error) {
      getCategories();
    }
  }, [state.isLoaded, state.loading, state.error, getCategories]);
  return (
    <section className="space-y-4">
      <h1 className="text-2xl font-bold">Categorias</h1>

      {state.error && (
        <div className="p-4 text-red-700 bg-red-100 border border-red-400 rounded">
          {state.error}
        </div>
      )}
      {state.loading ? (
        <div className="flex justify-center items-center min-h-[60vh]">{<Spinner />}</div>
      ) : (
        <DataTable
          columns={columns(deleteCategory)}
          data={state.categories}
          inputPlaceholder="Filtrar categorías"
          inputSearchColumn="name"
          addButonValue="Agregar Categoria"
          dialogForm={<CategoriesForm />}
          dialogTitle="Agregar Categoria"
        />
      )}
    </section>
  );
};

export default Categories;
