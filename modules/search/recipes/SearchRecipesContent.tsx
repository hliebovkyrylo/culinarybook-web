import { RecipeCard, RecipeCardSkeleton } from "@/components/recipes";
import { IRecipePreview }                 from "@/typings/recipe"

interface ISearchRecipesContent {
  data         : IRecipePreview[] | undefined;
  isLoading    : boolean;
  isLoadingMore: boolean;
}

export const SearchRecipesContent = ({
  data,
  isLoading,
  isLoadingMore
}: ISearchRecipesContent) => {
  return (
    <div className="grid grid-cols-4 max-lg:grid-cols-3 mt-3 max-[746px]:grid-cols-1 mb-8 max-2xl:!mb-16 relative">
      {isLoading ? (
        <>
          {[...Array(8)].map((_, index) => (
            <RecipeCardSkeleton key={index} className="mb-4 max-[746px]:!w-full" />
          ))}
        </>
      ) : (
        <>
          {data && data.map((recipe) => (
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
              className="mb-4 max-[746px]:!w-full"
            />
          ))}
        </>
      )}
      {isLoadingMore && (
        <div className={`absolute left-[calc(50%-24px)] -bottom-4 flex justify-center items-center z-50 dark:bg-bg-c bg-bg-c-7`}>
          <div className=" dark:border-[#222222] border-neutral-300 h-6 w-6 animate-spin rounded-full border-4 dark:border-t-[#DDDF72] border-t-[#C77D0A]" />
        </div>
      )}
    </div>
  )
}