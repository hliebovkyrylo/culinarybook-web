"use client"

import { RecipeCardSkeleton } from "@/components/cards";
import RecipeCard             from "@/components/cards/RecipeCard/RecipeCard";

const Search = () => {
  const isLoading = false;
  return (
    <div className="grid grid-cols-4 max-lg:grid-cols-3 max-[746px]:grid-cols-1">
      {isLoading ? (
        <>
          {[...Array(8)].map(() => (
            <RecipeCardSkeleton className="mb-4" />
          ))}
        </>
      ) : (
        <>
          {[...Array(12)].map(() => (
            <RecipeCard
              key={'ssgsg'}
              id="dgfg9034hg348yfg3j0s94"
              recipeName="Meat pie"
              recipeImage=""
              foodType="Meat"
              cookingTime="10-15 minutes"
              complexity="Middle"
              author="Jhon Doe"
              className="mb-4 max-[746px]:!w-full"
            />
          ))}
        </>
      )}
    </div>
  )
}

export default Search;