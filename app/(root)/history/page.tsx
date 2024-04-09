import { RecipeCardSkeleton } from "@/components/cards";
import RecipeCard             from "@/components/cards/RecipeCard/RecipeCard";
import { HistoryLayout }      from "@/components/history";

const HistoryPage = () => {
  const isLoading = false;
  return (
    <HistoryLayout
      title="History of views"
    >
      <div className="grid grid-cols-4 mt-8 max-lg:grid-cols-3 max-[746px]:grid-cols-1">
        {isLoading ? (
          <>
            {[...Array(12)].map((_, index) => (
              <RecipeCardSkeleton className="mb-4" key={index} />
            ))}
          </>
        ) : (
          <>
            {[...Array(15)].map(() => (
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
    </HistoryLayout>
  )
}

export default HistoryPage;