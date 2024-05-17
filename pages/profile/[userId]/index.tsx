import { RecipeCardSkeleton }         from "@/components/cards";
import RecipeCard                     from "@/components/cards/RecipeCard/RecipeCard";
import { useGetRecipesByUserIdQuery } from "@/lib/api/recipeApi";
import { GetStaticPropsContext }      from "next";
import { serverSideTranslations }     from "next-i18next/serverSideTranslations";
import { useSearchParams }            from "next/navigation";
import { useTranslation }             from "next-i18next";

export async function getStaticProps({ locale }: GetStaticPropsContext) {
  return {
    props: {
      ...(await serverSideTranslations(locale as string, ['common'])),
    },
  }
}

const Profile = () => {
  const { t } = useTranslation('common');

  const id = "6616a09cc5d792a792f999b5";
  const userId = id as string;

  let sortBy = useSearchParams().get('sortBy');

  if (sortBy === null) {
    sortBy = 'desc'
  }

  const { data: recipes, isLoading } = useGetRecipesByUserIdQuery({ userId: userId, sortBy: sortBy })

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
            <p className="text-color-666 absolute top-[60%]">{t('no-have-recipes')}</p>
          )}
        </>
      )}
    </>
  )
}

export default Profile;