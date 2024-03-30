"use client"

import RecipeCard from "@/components/cards/RecipeCard/RecipeCard";

const Search = () => {
  return (
    <div className="grid grid-cols-4 max-lg:grid-cols-3 max-[746px]:grid-cols-1">
      {[...Array(5)].map(() => (
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
    </div>
  )
}

export default Search;