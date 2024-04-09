"use client"

import RecipeCard                     from "@/components/cards/RecipeCard/RecipeCard"
import { FollowWindow, FollowerCard, FollowerCardSkeleton } from "@/components/profile"
import { Input }                      from "@/ui";
import { useTranslation }             from "react-i18next";

const Followings = () => {
  const { t }     = useTranslation();
  const isLoading = false;
  return (
    <>
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
      <FollowWindow
        title={t('followings')}
        userId="3489hg33934hujgg"
      >
        <Input type="search" placeholder={t('input-username-placeholder')} className="mb-4 border-[1px] border-[#383838]" />
        {isLoading ? (
          <>
            {[...Array(5)].map(() => (
              <FollowerCardSkeleton className="mb-[10px]" />
            ))}
          </>
        ) : (
          <>
            {[...Array(3)].map(() => (
              <FollowerCard 
                key={'wfwsfgre'}
                username="jhondoe"
                userImage=""
                isFollowed={false}
                name="Jhon Doe"
                userId="3489hg33934hujgg"
                className="mb-3"
              />
            ))}
          </>
        )}
      </FollowWindow>
    </>
  )
}

export default Followings;