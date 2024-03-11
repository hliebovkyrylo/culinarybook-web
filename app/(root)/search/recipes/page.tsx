"use client"

import RecipeCard                    from "@/components/cards/RecipeCard";
import { SearchButtons, SearchField, SearchLayout } from "@/components/search";
import { GlassIcon }                 from "@/icons";

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
      <div className="flex flex-wrap justify-between">
        {[...Array(8)].map(() => (
          <RecipeCard
            key={'ssgsg'}
            id="dgfg9034hg348yfg3j0s94"
            recipeName="Meat pie"
            recipeImage=""
            foodType="Meat"
            cookingTime="10-15 minutes"
            complexity="Middle"
            author="Jhon Doe"
            className="mb-4"
          />
        ))}
      </div>
    </SearchLayout>
  )
}

export default Search;