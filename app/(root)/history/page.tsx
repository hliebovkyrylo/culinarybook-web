import RecipeCard        from "@/components/cards/RecipeCard";
import { HistoryLayout } from "@/components/history";

const HistoryPage = () => {
  return (
    <HistoryLayout
      title="History of views"
    >
      <div className="grid grid-cols-4 mt-8 max-lg:grid-cols-3 max-[746px]:grid-cols-1">
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
      </div>
    </HistoryLayout>
  )
}

export default HistoryPage;