import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Field, FieldError, FieldGroup, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { z } from "zod";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  InputGroupTextarea,
} from "../ui/input-group";

import {
  categoriesSchema,
  type CategoriesFormValues,
} from "@/schemas/categories";
import type { Category } from "@/types/category";
import { useCategories } from "@/hooks/useCategories";

interface CategoriesFormProps {
  category?: Partial<Category>;
}
const CategoriesForm = ({ category }: CategoriesFormProps) => {
  const form = useForm<CategoriesFormValues>({
    resolver: zodResolver(categoriesSchema),
    mode: "onChange",
    defaultValues: {
      name: category?.name ?? "",
      description: category?.description ?? "",
    },
  });

  const { state, createCategory, updateCategory, dispatch } = useCategories();

  const handleSubmit = async (
    newCategory: z.infer<typeof categoriesSchema>
  ) => {
    if (category?.id) {
      updateCategory({ id: category?.id, ...newCategory });
    } else {
      createCategory(newCategory);
    }
    dispatch({ type: "setDialogOpen", payload: false });
  };
  return (
    <form id="categories-form" onSubmit={form.handleSubmit(handleSubmit)}>
      <FieldGroup>
        <Controller
          name="name"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>Titulo</FieldLabel>
              <Input
                {...field}
                id={field.name}
                aria-invalid={fieldState.invalid}
                placeholder="Ingresa el nombre de la categoria"
              />
              {fieldState.error && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
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
                  placeholder="Descripcion de la categoria"
                  rows={6}
                  className="min-h-24 resize-none"
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
        <Field orientation="horizontal">
          <Button type="button" variant="outline" onClick={() => form.reset()}>
            Reset
          </Button>
          <Button type="submit" form="categories-form">
            {state.selectedCategory ? "Editar" : "Agregar"}
          </Button>
        </Field>
      </FieldGroup>
    </form>
  );
};

export default CategoriesForm;
