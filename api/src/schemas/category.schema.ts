import { z } from "zod";

export const createCategorySchema = z.object({
  name: z.string().trim().min(2, "Le nom doit contenir au moins 2 caractères"),
});

export const updateCategorySchema = createCategorySchema.partial();

export type CreateCategoryInput = z.infer<typeof createCategorySchema>;