import { RecipeCard, RecipeCardSkeleton } from "@/components/recipes";
import { IRecipePreview } from "@/typings/recipe";
import { useTranslation } from "next-i18next";

interface IProfileRecipesContent {
  isLoading: boolean;
  data?: IRecipePreview[];
}

export const ProfileRecipesContent = ({
  isLoading,
  data,
}: IProfileRecipesContent) => {
  const { t } = useTranslation("common");
  return (
    <section className="grid grid-cols-6 justify-items-center max-[1480px]:grid-cols-5 max-[1220px]:grid-cols-4 max-lg:grid-cols-3 max-[748px]:grid-cols-1">
      {isLoading ? (
        <>
          {[...Array(12)].map((_, index) => (
            <RecipeCardSkeleton
              key={index}
              className="max-[746px]:!w-full mb-7"
            />
          ))}
        </>
      ) : (
        <>
          {data && data.length > 0 ? (
            data.map((recipe) => (
              <RecipeCard
                key={recipe.id}
                id={recipe.id}
                recipeName={recipe.title}
                recipeImage={recipe.image}
                foodType={recipe.typeOfFood}
                cookingTime={recipe.coockingTime}
                complexity={recipe.complexity}
                authorImage={recipe.owner.image}
                authorName={recipe.owner.name}
                className="max-[746px]:!w-full mb-7"
              />
            ))
          ) : (
            <p className="text-color-666 absolute top-[60%]">
              {t("no-have-recipes")}
            </p>
          )}
        </>
      )}
    </section>
  );
};
