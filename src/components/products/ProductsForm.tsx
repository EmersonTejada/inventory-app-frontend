import { productSchema } from "@/schemas/product";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Field,
  FieldContent,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "../ui/field";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Button } from "../ui/button";
import { z } from "zod";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
  InputGroupTextarea,
} from "../ui/input-group";
import { BoxIcon } from "lucide-react";
import type { Product } from "@/types/product";
import { useCategories } from "@/hooks/useCategories";
import { useEffect } from "react";
import { useProducts } from "@/hooks/useProducts";

interface ProductsFormProps {
  product?: Product;
}
const ProductsForm = ({ product }: ProductsFormProps) => {
  const { createProduct, updateProduct, dispatch } = useProducts();

  const form = useForm<z.infer<typeof productSchema>>({
    resolver: zodResolver(productSchema),
    mode: "onChange",
    defaultValues: {
      title: product?.title ?? "",
      price: product?.price ?? 0,
      stock: product?.stock ?? 0,
      categoryId: product?.categoryId,
      description: product?.description ?? "",
    },
  });

  const handleSubmit = async (newProduct: z.infer<typeof productSchema>) => {
    if (product?.id) {
      updateProduct({
        id: product.id,
        createdAt: product.createdAt,
        ...newProduct,
      });
    } else {
      createProduct(newProduct);
    }
    dispatch({ type: "setDialogOpen", payload: false });
  };

  const { state: categoryState, getCategories } = useCategories();
  const { state: productState } = useProducts();
  useEffect(() => {
    if (categoryState.categories.length === 0) {
      getCategories();
    }
  }, [getCategories, categoryState.categories.length]);
  return (
    <form id="products-form" onSubmit={form.handleSubmit(handleSubmit)}>
      <FieldGroup className="">
        <Controller
          name="title"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>Titulo</FieldLabel>
              <Input
                {...field}
                id={field.name}
                aria-invalid={fieldState.invalid}
                placeholder="Ingresa el nombre del producto"
              />
              {fieldState.error && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <div className="grid grid-cols-2 gap-4">
          <Controller
            name="price"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>Precio</FieldLabel>
                <InputGroup>
                  <InputGroupAddon>
                    <InputGroupText>$</InputGroupText>
                  </InputGroupAddon>
                  <InputGroupInput
                    {...field}
                    id={field.name}
                    type="number"
                    placeholder="0.00"
                    min={0}
                    aria-invalid={fieldState.invalid}
                  />
                </InputGroup>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Controller
            name="stock"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>Stock</FieldLabel>
                <InputGroup>
                  <InputGroupAddon>
                    <BoxIcon />
                  </InputGroupAddon>
                  <InputGroupInput
                    {...field}
                    type="number"
                    min={0}
                    id={field.name}
                    placeholder="0.00"
                    aria-invalid={fieldState.invalid}
                  />
                </InputGroup>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </div>
        <Controller
          name="description"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>Description</FieldLabel>
              <InputGroup>
                <InputGroupTextarea
                  {...field}
                  id={field.name}
                  placeholder="Descripcion del producto"
                  className="max-h-4"
                  aria-invalid={fieldState.invalid}
                />
                <InputGroupAddon align="block-end">
                  <InputGroupText className="tabular-nums">
                    {field.value.length}/100 caracteres
                  </InputGroupText>
                </InputGroupAddon>
              </InputGroup>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name="categoryId"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldContent>
                <FieldLabel htmlFor={field.name}>Categoría</FieldLabel>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </FieldContent>
              <Select
                name={field.name}
                value={field.value ? String(field.value) : ""}
                onValueChange={(value) => field.onChange(Number(value))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona una categoria" />
                </SelectTrigger>
                <SelectContent>
                  {categoryState.categories.map((c) => (
                    <SelectItem key={c.id} value={String(c.id)}>
                      {c.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Field>
          )}
        />
        <Field orientation="horizontal">
          <Button type="button" variant="outline" onClick={() => form.reset()}>
            Reset
          </Button>
          <Button type="submit" form="products-form">
            {productState.selectedProduct ? "Editar" : "Agregar"}
          </Button>
        </Field>
      </FieldGroup>
    </form>
  );
};

export default ProductsForm;
