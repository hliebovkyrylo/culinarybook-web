import {
  ProfileNavigationPanel,
  ProfileRecipesContent,
  ProfileUserData,
  useFollowState,
  useUsers
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

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const userId = ctx.params?.userId;
  const locale = ctx.locale;

  return {
    props: {
      ...await serverSideTranslations(locale as string, ['common']),
      userId: userId as string,
    },
  };
}

const Saved = ({ userId }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const { t } = useTranslation('common');
  const router = useRouter();

  const { user, userMe, isLoadingUser, isMeLoading } = useUsers(userId);
  const { followState, followRequestState, isLoadingFollowState, isLoadingFollowRequestState } = useFollowState(userId);

  const { data: recipes, isLoading: isLoadingRecipes } = useGetMySavedQuery();
  const { data: notifications, isLoading: isLoadingNotifications } = useGetMyAllUnreadedNotificationsQuery();

  if (isLoadingUser || isMeLoading || isLoadingFollowState || isLoadingFollowRequestState || isLoadingNotifications) {
    return <Loader className="absolute top-0 left-0" />
  }

  if (userId !== userMe?.id) {
    router.push(`/profile/${userId}`);
    return null;
  }
  return (
    <MainLayout
      metaTitle={`${user?.name} - Saved | Culinarybook`}
      pageDescription={`${user?.name} ${t('meta-profile-description')}`}
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
  )
}

export default RequireAuth(Saved);