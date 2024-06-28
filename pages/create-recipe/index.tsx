import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { MainLayout } from "@/modules/layouts";
import { CreateRecipeForm } from "@/modules/create-recipe";
import { RequireAuth } from "@/hocs/requireAuth";
import { useGetMeQuery } from "@/lib/api/userApi";
import { useGetMyAllUnreadedNotificationsQuery } from "@/lib/api/notificationApi";
import { Loader } from "@/components/Loader";

export const getServerSideProps = async ({ locale }: { locale: string }) => ({
  props: {
    ...await serverSideTranslations(locale, ['common']),
  },
})

const CreateRecipe = () => {
  const { t } = useTranslation('common');

  const { data: notifications, isLoading: isLoadingNotifications } = useGetMyAllUnreadedNotificationsQuery(undefined, {
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: true,
    refetchOnFocus: true
  });
  const { data: user, isLoading: isLoadingUser } = useGetMeQuery(undefined, {
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: true,
    refetchOnFocus: true
  });

  if (isLoadingUser || isLoadingNotifications) {
    return <Loader className="absolute top-0 left-0" />
  }

  return (
    <MainLayout
      pageTitle={t('create-recipe')}
      pageDescription={t('meta-create-recipe-description')}
      metaTitle={`${t('create-recipe')} | Culinarybook`}
      containerSize="full"
      user={user}
      notifications={notifications}
    >
      <CreateRecipeForm />
    </MainLayout>
  )
};

export default RequireAuth(CreateRecipe);