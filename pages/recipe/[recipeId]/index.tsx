import { 
  useGetLikeStateQuery, 
  useGetRecipeLikesQuery,  
}                                      from "@/lib/api/likeApi";
import { 
  CommentsContent, 
  CreateCommentForm, 
  RecipeData, 
  StepsData 
}                                      from "@/modules/recipe";
import { 
  useGetRecipeQuery, 
  useGetStepsQuery 
}                                      from "@/lib/api/recipeApi";
import { 
  GetServerSidePropsContext, 
  InferGetServerSidePropsType 
}                                      from "next";
import { useGetSaveStateQuery }        from "@/lib/api/saveApi";
import { PrivateRecipe }               from "@/components/recipe";
import { useGetCommentsQuery }         from "@/lib/api/commentApi";
import Image                           from "next/image";
import { useEffect, useState }         from "react";
import { useTranslation }              from "next-i18next";
import { useGetMeQuery }               from "@/lib/api/userApi";
import { serverSideTranslations }      from "next-i18next/serverSideTranslations";
import { MainLayout }                  from "@/modules/layouts";
import { Loader }                      from "@/components/Loader";

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const recipeId = ctx.params?.recipeId;
  const locale   = ctx.locale;

  return {
    props: {
      ...await serverSideTranslations(locale as string, ['common']),
      recipeId: recipeId as string,
    },
  };
}

const Recipe = ({ recipeId }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const { t }  = useTranslation('common');

  const { data: user, isLoading: isLoadingUser } = useGetMeQuery();

  const { data: recipe, isLoading: isLoadingRecipe }                 = useGetRecipeQuery(recipeId)
  const { data: steps, isLoading: isLoadingSteps }                   = useGetStepsQuery(recipeId);
  const { data: comments, isLoading: isLoadingComments, isFetching } = useGetCommentsQuery(recipeId);
  const { data: likes, isLoading: isLoadingLikes }                   = useGetRecipeLikesQuery(recipeId);

  const { data: likeState, isLoading: isLoadingLikeState } = useGetLikeStateQuery(recipeId);
  const { data: saveState, isLoading: isLoadingSaveState } = useGetSaveStateQuery(recipeId);

  const [isRecipeOwner, setIsRecipeOwner] = useState(user ? user.id === recipe?.ownerId : false);

  useEffect(() => {
    setIsRecipeOwner(user?.id === recipe?.ownerId);
  }, [user, recipe]);

  const isBackgroundApplied = recipe?.applyBackground;

  if (isLoadingLikes || isLoadingLikeState || isLoadingSaveState || isLoadingUser || isLoadingRecipe) {
    return <Loader className="absolute top-0 left-0" />
  }

  const isLoadingAllComments = isLoadingComments || isFetching;

  if (!recipe?.isPublic) {
    return <PrivateRecipe />
  }
  
  return (
    <MainLayout
      pageTitle={''}
      pageDescription={recipe.ingradients}
      metaTitle={`${recipe.title} | Culinarybook`}
      containerSize="full"
    >
      {isBackgroundApplied && (
        <Image src={recipe.image} alt="Background image" width={1000} height={1000} className=" absolute top-0 left-0 w-full h-full object-cover -z-10 blur-sm opacity-10" />
      )}
      <RecipeData 
        data={recipe}
        averageGrade={comments && comments?.length > 0 ? comments.reduce((sum, comment) => sum + comment.grade, 0) / comments.length : 0}
        isOwner={isRecipeOwner}
        isAuth={!!user}
        likes={likes}
        likeState={likeState}
        saveState={saveState}
      />
      <StepsData data={steps} isLoading={isLoadingSteps} />
      <div className="mt-12">
        <h3 className="link-text font-semibold my-5">{t('title-comment')}</h3>
        <CreateCommentForm averageRating={4} />
        <CommentsContent 
          data={comments}
          isLoading={isLoadingAllComments}
          recipeOwnerId={recipe.ownerId}
        />
      </div>
    </MainLayout>
  )
}

export default Recipe;