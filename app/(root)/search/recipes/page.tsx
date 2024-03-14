"use client"

import RecipeCard    from "@/components/cards/RecipeCard";
import { 
  SearchButtons, 
  SearchField, 
  SearchLayout 
}                    from "@/components/search";
import { GlassIcon } from "@/icons";

const Search = () => {
  return (
    <SearchLayout title="Search">
      <div className="my-6">
        <SearchField 
          placeholder="Enter recipe name..." 
          leftIcon={<GlassIcon className="absolute top-1.5 left-3 fill-[#666]" />} 
        />
        <SearchButtons className="mt-3" />
      </div>
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
    </SearchLayout>
  )
}

export default Search;