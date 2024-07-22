import { useTranslation } from "next-i18next";
import {
  recipeApi,
} from "@/lib/api/recipeApi";
import { useRouter } from "next/navigation";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import {
  GetServerSidePropsContext,
  InferGetServerSidePropsType
} from "next";
import { MainLayout } from "@/modules/layouts";
import { UpdateRecipeForm } from "@/modules/update-recipe";
import { RequireAuth } from "@/hocs/requireAuth";
import { useGetMeQuery } from "@/lib/api/userApi";
import { Loader } from "@/components/Loader";
import { useGetMyAllUnreadedNotificationsQuery } from "@/lib/api/notificationApi";
import { wrapper } from "@/lib/store";
import { NextSeo } from "next-seo";

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (ctx: GetServerSidePropsContext) => {
    const recipeId = ctx.params?.recipeId as string;
    const locale = ctx.locale as string;

    const translations = await serverSideTranslations(locale, ['common']);
    const commonTranslations = translations._nextI18Next?.initialI18nStore[locale || 'en'].common;

    const recipePromise = store.dispatch(recipeApi.endpoints.getRecipe.initiate(recipeId));
    const stepsPromise = store.dispatch(recipeApi.endpoints.getSteps.initiate(recipeId));

    await Promise.all([recipePromise, stepsPromise]);

    const recipe = recipeApi.endpoints.getRecipe.select(recipeId)(store.getState() as any);
    const steps = recipeApi.endpoints.getSteps.select(recipeId)(store.getState() as any);

    return {
      props: {
        ...await serverSideTranslations(locale as string, ['common']),
        recipe: recipe.data,
        steps: steps.data,
        metaTags: {
          title: commonTranslations['update-recipe'] || 'Update recipe',
          description: commonTranslations['update-recipe-meta-description'] || '',
        }
      },
    };
  }
)

const UpdateRecipe = ({ recipe, steps, metaTags }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const { t } = useTranslation('common');
  const router = useRouter();

  const { data: user, isLoading: isLoadingUser } = useGetMeQuery();
  const { data: notifications, isLoading: isLoadingNotifications } = useGetMyAllUnreadedNotificationsQuery();

  if (isLoadingUser || isLoadingNotifications) {
    return <Loader className="absolute top-0 left-0 z-[1000]" />;
  }

  if (user?.id !== recipe?.ownerId) {
    router.push('/');
    return null;
  }

  return (
    <>
      <NextSeo 
        title={metaTags.title}
        description={metaTags.description}
        canonical={`https://www.culinarybook.website/update-recipe/${recipe?.id}`}
        openGraph={{
          url: `https://www.culinarybook.website/update-recipe/${recipe?.id}`,
          title: metaTags.title,
          description: metaTags.description,
          images: [
            { url: `/api/og?title=${metaTags.title}&description=${metaTags.description}` },
          ],
        }}
      />
      <MainLayout
        pageTitle={t('update-recipe')}
        containerSize="full"
        user={user}
        notifications={notifications}
      >
        <UpdateRecipeForm
          recipe={recipe}
          steps={steps}
        />
      </MainLayout>
    </>
  )
};

export default RequireAuth(UpdateRecipe);