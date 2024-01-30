import { prisma }      from "@/prisma/seed";
import { type Recipe } from "@prisma/client";

class RecipeService {
  public async createRecipe(data: Omit<Recipe, 'id'>) {
    return await prisma.recipe.create({ data });
  };
};

export const recipeService = new RecipeService();