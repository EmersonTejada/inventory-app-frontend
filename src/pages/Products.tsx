import { columns } from "@/components/products/columns";
import { DataTable } from "@/components/products/DataTable";
import ProductsForm from "@/components/products/ProductsForm";
import { Spinner } from "@/components/ui/spinner";
import { useProducts } from "@/hooks/useProducts";
import { useEffect } from "react";

const Products = () => {
  const { state, getProducts } = useProducts();

  useEffect(() => {
    getProducts();
  }, []);
  return (
    <>
      <section className="space-y-4">
        <h1 className="text-2xl font-bold">Productos</h1>
        {state.error && (
          <div className="p-4 text-red-700 bg-red-100 border border-red-400 rounded">
            {state.error}
          </div>
        )}
        {state.loading ? (
          <div className="flex justify-center items-center min-h-[60vh]">
            <Spinner />
          </div>
        ) : (
          <DataTable
            columns={columns}
            data={state.products}
            inputPlaceholder="Filtrar productos"
            inputSearchColumn="title"
            addButonValue="Agregar Producto"
            dialogForm={<ProductsForm />}
            dialogTitle="Agregar Producto"
          />
        )}
      </section>
    </>
  );
};

export default Products;
