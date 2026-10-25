
import { z } from "zod";

export const idParam = z.object({
  id: z.coerce.number().int().positive(),
});

export const listQuery = z.object({
  limit: z.coerce.number().int().min(1).max(100).default(12),
  skip: z.coerce.number().int().min(0).default(0),
  q: z.string().optional(),
  category: z.string().optional(),
});

export const productBody = z.object({
  title: z.string().trim().min(2, "Le titre est obligatoire"),
  description: z.string().trim().min(1, "La description est obligatoire"),
  price: z.coerce.number().positive("Le prix doit être supérieur à zéro"),
  thumbnail: z.string().url("L'image doit être une URL valide"),
  stock: z.coerce.number().int().min(0).default(0),
  category: z.string().trim().min(1, "La catégorie est obligatoire"),
});

export const productPatch = productBody.partial();
