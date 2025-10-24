import { z } from "zod";
export const categoriesSchema = z.object({
    name: z.string().min(5, "La categoria debe tener minimo 5 caracteres").max(30, "La categoria debe ser de maximo 30 caracteres"),
    description: z.string().max(100, "La categoria no debe tener mas de 100 caracteres")
})

export type CategoriesFormValues = z.infer<typeof categoriesSchema>