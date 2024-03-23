import RecipeCard                        from "@/components/cards/RecipeCard/RecipeCard";
import { ProfilePanel, ProfileUserInfo } from "@/components/profile";

const ProfileLayout = ({ children }: { children: React.ReactNode }) => {
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
        {children}
      </div>
    </div>
  )
}

export default ProfileLayout;