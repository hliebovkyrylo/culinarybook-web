"use client"

import { RecipeCardSkeleton } from "@/components/cards";
import RecipeCard             from "@/components/cards/RecipeCard/RecipeCard";
import { useGetMySavedQuery } from "@/lib/api/recipeApi";
import { useTranslation }     from "react-i18next";

const Profile = () => {
  const { t } = useTranslation();

  const { data: recipes, isLoading } = useGetMySavedQuery();
  return (
    <>
      {isLoading ? (
        <>
          {[...Array(12)].map(() => (
            <RecipeCardSkeleton className="max-[746px]:!w-full mb-7" />
          ))}
        </>
      ) : (
        <>
          {recipes && recipes.length > 0 ? recipes.map((recipe) => (
            <RecipeCard
              key={recipe.id}
              id={recipe.id}
              recipeName={recipe.title}
              recipeImage={recipe.image}
              foodType={recipe.typeOfFood}
              cookingTime={recipe.coockingTime}
              complexity={recipe.complexity}
              authorImage={recipe.owner.image}
              authorName={recipe.owner.name}
              className="max-[746px]:!w-full mb-7"
            />
          )) : (
            <p className="text-color-666 absolute top-[60%]">{t('no-have-saved')}</p>
          )}
        </>
      )}
    </>
  )
}

export default Profile;