import { useTranslation } from "next-i18next";
import {
  useGetRecipeQuery,
  useGetStepsQuery,
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

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const recipeId = ctx.params?.recipeId;
  const locale = ctx.locale;

  return {
    props: {
      ...await serverSideTranslations(locale as string, ['common']),
      recipeId: recipeId as string,
    },
  };
}

const UpdateRecipe = ({ recipeId }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const { t } = useTranslation('common');
  const router = useRouter();

  const { data: user, isLoading: isLoadingUser } = useGetMeQuery();
  const { data: recipe, isLoading: isLoadingRecipe } = useGetRecipeQuery(recipeId);
  const { data: steps, isLoading: isLoadingSteps } = useGetStepsQuery(recipeId);
  const { data: notifications, isLoading: isLoadingNotifications } = useGetMyAllUnreadedNotificationsQuery();

  if (isLoadingRecipe || isLoadingSteps || isLoadingUser || isLoadingNotifications) {
    return <Loader className="absolute top-0 left-0 z-[1000]" />;
  }

  if (user?.id !== recipe?.ownerId) {
    router.push('/');
    return null;
  }

  return (
    <MainLayout
      pageTitle={t('update-recipe')}
      metaTitle={`${t('update-recipe')} | Culinarybook`}
      pageDescription={t('update-recipe-meta-description')}
      containerSize="full"
      user={user}
      notifications={notifications}
    >
      <UpdateRecipeForm
        recipe={recipe}
        steps={steps}
      />
    </MainLayout>
  )
};

export default RequireAuth(UpdateRecipe);