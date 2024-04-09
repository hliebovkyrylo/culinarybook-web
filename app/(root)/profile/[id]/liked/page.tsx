import { RecipeCardSkeleton } from "@/components/cards";
import RecipeCard             from "@/components/cards/RecipeCard/RecipeCard";

const Profile = () => {
  const isLoading = false;
  return (
    <>
      {isLoading ? (
        <>
          {[...Array(12)].map(() => (
            <RecipeCardSkeleton className="mb-7" />
          ))}
        </>
      ) : (
        <>
          {[...Array(16)].map(() => (
            <RecipeCard
              key={'ssgsg'}
              id="dgfg9034hg348yfg3j0s94"
              recipeName="Meat pie"
              recipeImage=""
              foodType="Meat"
              cookingTime="10-15 minutes"
              complexity="Middle"
              author="Jhon Doe"
              className="max-[746px]:!w-full mb-7"
            />
          ))}
        </>
      )}
    </>
  )
}

export default Profile;