import RecipeCard                        from "@/components/cards/RecipeCard";
import { ProfilePanel, ProfileUserInfo } from "@/components/profile";

const Profile = () => {
  return (
    <div className="w-full max-w-3xl mx-auto">
      <ProfileUserInfo
        username="jhondoe"
        name="Jhon Doe"
        followersNumber={54}
        followingsNumber={13}
        recipesNumber={1}
      />
      <ProfilePanel 
        userId="3489hg33934hujgg" 
        className=" my-8"
      />
      <div className="grid grid-cols-3 justify-items-center max-[748px]:grid-cols-1">
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
          className="max-[746px]:!w-full mb-7"
        />
        ))}
      </div>
    </div>
  )
}

export default Profile;