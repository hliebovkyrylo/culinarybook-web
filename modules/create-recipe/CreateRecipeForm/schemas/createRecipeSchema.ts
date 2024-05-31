import { z } from "zod";

export const createRecipeAndStepSchema = z.object({
  title          : z.string().min(1).max(80),
  image          : z.string().default(''),
  coockingTime   : z.string().max(32),
  complexity     : z.string().min(1),
  typeOfFood     : z.string().min(1),
  ingradients    : z.string().min(1).min(1),
  isPublic       : z.boolean(),
  applyBackground: z.boolean().default(false),
  steps          : z.array(z.object({
    stepNumber     : z.number().min(1),
    stepDescription: z.string().min(2)
  }))
});

export type CreateRecipeAndStepFormData = z.infer<typeof createRecipeAndStepSchema>;