import { 
  useCreateLikeMutation, 
  useGetLikeStateQuery, 
  useGetRecipeLikesQuery, 
  useRemoveLikeMutation }              from "@/lib/api/likeApi";
import { 
  CommentsContent, 
  CreateCommentForm, 
  RecipeData, 
  StepsData 
}                                      from "@/modules/recipe";
import { 
  useCreateSaveMutation, 
  useGetSaveStateQuery, 
  useRemoveSaveMutation 
}                                      from "@/lib/api/saveApi";
import { PrivateRecipe }               from "@/components/recipe";
import { Loader }                      from "@/components/shared";
import { useGetCommentsQuery }         from "@/lib/api/commentApi";
import { useGetStepsQuery }            from "@/lib/api/recipeApi";
import Image                           from "next/image";
import { useEffect, useState }         from "react";
import { useTranslation }              from "next-i18next";
import { InferGetServerSidePropsType } from "next";
import { useRouter }                   from "next/router";
import { useGetMeQuery }               from "@/lib/api/userApi";
import { api }                         from "@/lib/api";
import { wrapper }                     from "@/lib/store";
import { serverSideTranslations }      from "next-i18next/serverSideTranslations";
import { MainLayout }                  from "@/modules/layouts";

const Recipe = ({
  recipe
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const { t }  = useTranslation('common');
  const router = useRouter();

  const { data: user, isLoading: isLoadingUser } = useGetMeQuery();

  const { recipeId } = router.query;

  const { data: steps, isLoading: isLoadingSteps }                   = useGetStepsQuery(recipeId as string);
  const { data: comments, isLoading: isLoadingComments, isFetching } = useGetCommentsQuery(recipeId as string);
  const { data: likes, isLoading: isLoadingLikes }                   = useGetRecipeLikesQuery(recipeId as string);

  const { data: likeState, isLoading: isLoadingLikeState } = useGetLikeStateQuery(recipeId as string);
  const { data: saveState, isLoading: isLoadingSaveState } = useGetSaveStateQuery(recipeId as string);

  const [ createLike ] = useCreateLikeMutation();
  const [ removeLike ] = useRemoveLikeMutation();
  const [ createSave ] = useCreateSaveMutation();
  const [ removeSave ] = useRemoveSaveMutation();

  const [ isLiked, setIsLiked ] = useState<boolean>(!!likeState?.isLiked);
  const [ isSaved, setIsSaved ] = useState<boolean>(!!saveState?.isSaved);
  const [ likesCount, setLikesCount] = useState(likes?.length || 0); 

  useEffect(() => {
    setIsLiked(!!likeState?.isLiked);
  }, [likeState])

  useEffect(() => {
    setLikesCount(likes?.length || 0);
  }, [likes])

  useEffect(() => {
    setIsSaved(!!saveState?.isSaved);
  }, [saveState])

  const handleLikeClick = async () => {
    if (!user) {
      router.push('/sign-in');
    } else {
      if (!isLiked) {
        setIsLiked(true);
        setLikesCount(likesCount + 1);

        await createLike(recipeId as string);
      } else {
        setIsLiked(false);
        setLikesCount(likesCount - 1);
        
        await removeLike(recipeId as string);
      }
    }
  };

  const handleSaveClick = async () => {
    if (!user) {
      router.push('/sign-in');
    } else {
      if (!isSaved) {
        setIsSaved(true);
  
        await createSave(recipeId as string);
      } else {
        setIsSaved(false);
  
        await removeSave(recipeId as string);
      }
    }
  };

  const [isRecipeOwner, setIsRecipeOwner] = useState(user ? user.id === recipe?.ownerId : false);

  useEffect(() => {
    setIsRecipeOwner(user?.id === recipe?.ownerId);
  }, [user, recipe]);

  const isBackgroundApplied = recipe?.applyBackground;

  if (isLoadingLikes || isLoadingLikeState || isLoadingSaveState || isLoadingUser) {
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
        numbersOfLikes={likesCount}
        averageGrade={comments && comments?.length > 0 ? comments.reduce((sum, comment) => sum + comment.grade, 0) / comments.length : 0}
        isLiked={isLiked}
        isSaved={isSaved}
        likeButtonClick={handleLikeClick}
        saveButtonClick={handleSaveClick}
        isOwner={isRecipeOwner}
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

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async ({ params, locale }) => {
    const recipeId = params?.recipeId;

    let recipe = null;
    if (recipeId) {
      recipe = await store.dispatch(api.endpoints.getRecipe.initiate(recipeId)).unwrap();
    }

    return {
      props: {
        ...await serverSideTranslations(locale as string, ['common']),
        recipe: recipe,
      },
    };
  }
);
