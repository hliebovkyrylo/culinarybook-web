import {
  ProfileNavigationPanel,
  ProfileRecipesContent,
  ProfileUserData,
  useFollowState,
} from "@/modules/profile";
import {
  GetServerSidePropsContext,
  InferGetServerSidePropsType
} from "next";
import { RequireAuth } from "@/hocs/requireAuth";
import { useGetMySavedQuery } from "@/lib/api/recipeApi";
import { MainLayout } from "@/modules/layouts"
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";
import { Loader } from "@/components/Loader";
import { useGetMyAllUnreadedNotificationsQuery } from "@/lib/api/notificationApi";
import { MetaTags } from "@/modules/meta-tags";
import { wrapper } from "@/lib/store";
import { useGetMeQuery, userApi } from "@/lib/api/userApi";

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (ctx: GetServerSidePropsContext) => {
    const userId = ctx.params?.userId as string;
    const locale = ctx.locale as string;

    const translations = await serverSideTranslations(locale, ['common']);
    const commonTranslations = translations._nextI18Next?.initialI18nStore[locale || 'en'].common;

    const userPromise = store.dispatch(userApi.endpoints.getUser.initiate(userId));
    await Promise.all([userPromise]);

    const user = userApi.endpoints.getUser.select(userId)(store.getState() as any);

    return {
      props: {
        ...await serverSideTranslations(locale as string, ['common']),
        userId: userId as string,
        user: user.data,
        metaTags: {
          title: user.data?.name || '',
          description: commonTranslations['meta-profile-description'] || '',
        }
      },
    };
  }
)

const Saved = ({ userId, user, metaTags }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const { t } = useTranslation('common');
  const router = useRouter();

  const { data: userMe, isLoading: isMeLoading } = useGetMeQuery(undefined, {
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: true,
    refetchOnFocus: true
  });
  const { followState, followRequestState, isLoadingFollowState, isLoadingFollowRequestState } = useFollowState(userId);

  const { data: recipes, isLoading: isLoadingRecipes } = useGetMySavedQuery();
  const { data: notifications, isLoading: isLoadingNotifications } = useGetMyAllUnreadedNotificationsQuery();

  if (isMeLoading || isLoadingFollowState || isLoadingFollowRequestState || isLoadingNotifications) {
    return <Loader className="absolute top-0 left-0" />
  }

  if (userId !== userMe?.id) {
    router.push(`/profile/${userId}`);
    return null;
  }
  return (
    <>
      <MetaTags title={`${metaTags.title} - Saved`} description={metaTags.description} />
      <MainLayout
        containerSize="full"
        user={userMe}
        notifications={notifications}
      >
        <ProfileUserData
          data={user}
          followState={followState}
          followRequestState={followRequestState}
          selfId={userMe?.id}
        />
        <ProfileNavigationPanel
          userId={userId}
          selfId={userMe?.id}
        />
        <ProfileRecipesContent
          data={recipes}
          isLoading={isLoadingRecipes}
        />
      </MainLayout>
    </>
  )
}

export default RequireAuth(Saved);