import { columns } from "@/components/categories/columns";
import { DataTable } from "@/components/products/DataTable";
import { categories } from "@/services/categoriesMock";

const Categories = () => {
  
  return (
    <section className="space-y-4">
            <h1 className="text-2xl font-bold">Categorias</h1>
    
            <DataTable columns={columns} data={categories} inputPlaceholder="Filtrar categorías" inputSearchColumn="name" addButonValue="Agregar Categoria"/>
          </section>
  )
};

export default Categories;
