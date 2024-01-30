import { z } from "zod";

export const createRecipeSchema = z.object({
  authorId    : z.string(),
  recipeName  : z.string(),
  imageUrl    : z.string(), 
  cookingTime : z.string(),
  complexity  : z.string(),
  access      : z.string(),
  inagradients: z.string(),
});

export type ICreateRecipeSchema = z.infer<typeof createRecipeSchema>;