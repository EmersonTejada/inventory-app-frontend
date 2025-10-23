import { z } from "zod";
export const productSchema = z.object({
  title: z
    .string()
    .min(5, "El titulo debe contener minimo 5 caracteres")
    .max(32, "El titulo debe contener maximo 32 caracteres"),
  description: z
    .string()
    .max(100, "La descripcion debe tener maximo 100 caracteres"),
  price: z.coerce.number().min(0, "El precio debe ser 0 o mayor"),
  stock: z.coerce.number().int().min(0, "El stock debe ser un numero entero"),
  categoryId: z.coerce.number().int().min(0, "Selecciona una categoria"),
});

export type ProductFormValues = z.infer<typeof productSchema>;
