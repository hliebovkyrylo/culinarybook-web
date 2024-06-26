import {
  RecipesContent,
  UsersContent,
  useRecipes,
  useUsers
} from "@/modules/home";
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { MainLayout } from "@/modules/layouts";
import { useGetMeQuery } from "@/lib/api/userApi";
import Link from "next/link";
import { useGetMyAllUnreadedNotificationsQuery } from "@/lib/api/notificationApi";
import { Loader } from "@/components/Loader";

export const getServerSideProps = async ({ locale }: { locale: string }) => ({
  props: {
    ...await serverSideTranslations(locale, ['common']),
  },
})

const Home = () => {
  const { t } = useTranslation('common');

  const { data: notifications, isLoading: isLoadingNotifications } = useGetMyAllUnreadedNotificationsQuery(undefined, {
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: true,
    refetchOnFocus: true
  });
  const { data: user, isLoading: isMeLoading, isFetching } = useGetMeQuery(undefined, {
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: true,
    refetchOnFocus: true
  });

  const { recipes, isLoadingRecipes } = useRecipes(!!user);
  const { users, isLoadingUsers } = useUsers(!!user);

  const isLoading = isLoadingRecipes || isLoadingUsers;

  if (isMeLoading || isLoadingNotifications || isFetching) {
    return <Loader className="absolute top-0 left-0" />
  }

  return (
    <MainLayout
      pageTitle={t('title')}
      pageDescription={t('app-description')}
      isLoading={isLoading}
      backgroundImage={(recipes && recipes[0]?.image !== '') ? recipes[0]?.image : ''}
      containerSize="full"
      metaTitle={`${t('title')} | Culinarybook`}
      user={user}
      notifications={notifications}
    >
      <div className="mb-28 w-full">
        <div className="flex items-center justify-between mt-6 mb-3">
          <span>{user ? t('recipes-headText') : t('second-recipes-headText')}</span>
          <Link href={'/search/recipes'} className="link-text">{t('link')}</Link>
        </div>
        <RecipesContent
          data={recipes}
          isLoading={isLoading}
        />
        <div className="flex items-center justify-between mt-6 mb-3">
          <span>{user ? t('users-headText') : t('second-users-headText')}</span>
        </div>
        <UsersContent
          data={users}
          isLoading={isLoading}
        />
      </div>
    </MainLayout>
  )
}

export default Home;