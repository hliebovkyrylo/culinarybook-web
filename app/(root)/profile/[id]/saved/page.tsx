import RecipeCard from "@/components/cards/RecipeCard/RecipeCard";

const Profile = () => {
  return (
    <>
      {[...Array(3)].map(() => (
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
  )
}

export default Profile;