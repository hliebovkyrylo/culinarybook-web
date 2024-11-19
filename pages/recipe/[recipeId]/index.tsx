import {
  useGetLikeStateQuery,
  useGetRecipeLikesQuery,
} from "@/lib/api/likeApi";
import {
  CommentsContent,
  CreateCommentForm,
  RecipeData,
  StepsData,
} from "@/modules/recipe";
import { recipeApi } from "@/lib/api/recipeApi";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { useGetSaveStateQuery } from "@/lib/api/saveApi";
import { useGetCommentsQuery } from "@/lib/api/commentApi";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useTranslation } from "next-i18next";
import { useGetMeQuery } from "@/lib/api/userApi";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { MainLayout } from "@/modules/layouts";
import { Loader } from "@/components/Loader";
import { useGetMyAllUnreadedNotificationsQuery } from "@/lib/api/notificationApi";
import { PrivateRecipe } from "@/components/recipes";
import { wrapper } from "@/lib/store";
import { NextSeo } from "next-seo";

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (ctx: GetServerSidePropsContext) => {
    const recipeId = ctx.params?.recipeId as string;
    const locale = ctx.locale;

    const recipePromise = store.dispatch(
      recipeApi.endpoints.getRecipe.initiate(recipeId)
    );
    const stepsPromise = store.dispatch(
      recipeApi.endpoints.getSteps.initiate(recipeId)
    );

    await Promise.all([recipePromise, stepsPromise]);

    const recipe = recipeApi.endpoints.getRecipe.select(recipeId)(
      store.getState() as any
    );
    const steps = recipeApi.endpoints.getSteps.select(recipeId)(
      store.getState() as any
    );

    return {
      props: {
        ...(await serverSideTranslations(locale as string, ["common"])),
        recipeId,
        recipe: recipe.data,
        steps: steps.data,
        metaTags: {
          title: recipe.data?.title || "Recipe",
          description: steps.data
            ?.map((step) => step.stepDescription)
            .join(" "),
        },
      },
    };
  }
);

const Recipe = ({
  metaTags,
  recipeId,
  recipe,
  steps,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const { t } = useTranslation("common");

  const {
    data: comments,
    isLoading: isLoadingComments,
    isFetching,
  } = useGetCommentsQuery(recipeId);
  const { data: likes, isLoading: isLoadingLikes } =
    useGetRecipeLikesQuery(recipeId);
  const { data: notifications, isLoading: isLoadingNotifications } =
    useGetMyAllUnreadedNotificationsQuery(undefined, {
      refetchOnMountOrArgChange: true,
      refetchOnReconnect: true,
      refetchOnFocus: true,
    });
  const { data: user, isLoading: isLoadingUser } = useGetMeQuery(undefined, {
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: true,
    refetchOnFocus: true,
  });

  const { data: likeState, isLoading: isLoadingLikeState } =
    useGetLikeStateQuery(recipeId);
  const { data: saveState, isLoading: isLoadingSaveState } =
    useGetSaveStateQuery(recipeId);

  const [isRecipeOwner, setIsRecipeOwner] = useState(
    user ? user.id === recipe?.ownerId : false
  );

  useEffect(() => {
    setIsRecipeOwner(user?.id === recipe?.ownerId);
  }, [user, recipe]);

  const isBackgroundApplied = recipe?.applyBackground;

  if (
    isLoadingLikes ||
    isLoadingLikeState ||
    isLoadingSaveState ||
    isLoadingUser ||
    isLoadingNotifications
  ) {
    return <Loader className="absolute top-0 left-0" />;
  }

  const isLoadingAllComments = isLoadingComments || isFetching;

  if (!recipe?.isPublic) {
    return <PrivateRecipe />;
  }

  return (
    <>
      <NextSeo
        title={metaTags.title}
        description={metaTags.description}
        canonical={`https://www.culinarybook.website/${recipeId}`}
        openGraph={{
          url: `https://www.culinarybook.website/${recipeId}`,
          title: metaTags.title,
          description: metaTags.description,
          images: [
            {
              url: `/api/og?title=${metaTags.title}&description=${metaTags.description}`,
            },
          ],
        }}
      />
      <MainLayout
        pageTitle={""}
        containerSize="full"
        user={user}
        notifications={notifications}
      >
        {isBackgroundApplied && (
          <Image
            src={recipe.image}
            alt="Background image"
            width={1000}
            height={1000}
            className=" absolute top-0 left-0 w-full h-full object-cover -z-10 blur-sm opacity-10"
          />
        )}
        <RecipeData
          data={recipe}
          averageGrade={
            comments && comments?.length > 0
              ? comments.reduce((sum, comment) => sum + comment.grade, 0) /
                comments.length
              : 0
          }
          isOwner={isRecipeOwner}
          isAuth={!!user}
          likes={likes}
          likeState={likeState}
          saveState={saveState}
        />
        <StepsData data={steps} />
        <div className="mt-12">
          <h3 className="link-text font-semibold my-5">{t("title-comment")}</h3>
          <CreateCommentForm averageRating={4} />
          <CommentsContent
            data={comments}
            isLoading={isLoadingAllComments}
            recipeOwnerId={recipe.ownerId}
          />
        </div>
      </MainLayout>
    </>
  );
};

export default Recipe;
