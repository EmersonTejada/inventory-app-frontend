import { columns } from "@/components/products/columns";
import { DataTable } from "@/components/products/DataTable";
import ProductsForm from "@/components/products/ProductsForm";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Spinner } from "@/components/ui/spinner";
import { useProducts } from "@/hooks/useProducts";
import { useEffect } from "react";

const Products = () => {
  const { state, getProducts, deleteProduct, dispatch } = useProducts();

  useEffect(() => {
    if (!state.isLoaded && !state.loading && !state.error) {
      getProducts();
    }
  }, [state.isLoaded, state.loading, state.error, getProducts]);
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
            columns={columns(deleteProduct, dispatch)}
            data={state.products}
            inputPlaceholder="Filtrar productos"
            inputSearchColumn="title"
            addButonValue="Agregar Producto"
            onAddButtonClick={() => {
              dispatch({ type: "setDialogOpen", payload: true });
            }}
          />
        )}
        <Dialog
          open={state.dialogOpen}
          onOpenChange={(open) => {
            dispatch({ type: "setDialogOpen", payload: open });
            if (!open) {
              dispatch({ type: "setSelectedProduct", payload: null });
            }
          }}
        >
          <DialogContent aria-describedby={undefined}>
            <DialogHeader>
              <DialogTitle>
                {state.selectedProduct ? "Editar producto" : "Agregar producto"}
              </DialogTitle>
            </DialogHeader>
            <ProductsForm product={state.selectedProduct ?? undefined} />
          </DialogContent>
        </Dialog>
      </section>
    </>
  );
};

export default Products;
