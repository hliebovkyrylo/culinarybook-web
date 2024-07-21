import {
  FollowsInputSearch,
  FollowsUsersContent,
  FollowsWindow,
  ProfileNavigationPanel,
  ProfileRecipesContent,
  ProfileUserData,
  useFollowState,
  useUsers
} from "@/modules/profile"
import {
  GetServerSidePropsContext,
  InferGetServerSidePropsType
} from "next";
import { RequireAuth } from "@/hocs/requireAuth";
import { useGetUserFollowingsQuery } from "@/lib/api/followApi";
import { useGetRecipesByUserIdQuery } from "@/lib/api/recipeApi";
import { MainLayout } from "@/modules/layouts"
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";
import { Loader } from "@/components/Loader";
import { useGetMyAllUnreadedNotificationsQuery } from "@/lib/api/notificationApi";
import { MetaTags } from "@/modules/meta-tags";

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

const Followers = ({ userId }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const { t } = useTranslation('common');
  const router = useRouter();

  const sortBy = router.query.sortBy;
  const searchFollowing = router.query.username;

  const { user, userMe, isLoadingUser, isMeLoading } = useUsers(userId);
  const { followState, followRequestState, isLoadingFollowState, isLoadingFollowRequestState } = useFollowState(userId);

  const { data: notifications, isLoading: isLoadingNotifications } = useGetMyAllUnreadedNotificationsQuery();
  const { data: recipes, isLoading: isLoadingRecipes } = useGetRecipesByUserIdQuery({ userId: userId as string, sortBy: sortBy !== undefined ? sortBy as string : 'desc' });
  const { data: followings, isLoading: isLoadingFollowings } = useGetUserFollowingsQuery({ userId: userId, username: searchFollowing as string });

  if (isLoadingUser || isMeLoading || isLoadingFollowState || isLoadingFollowRequestState || isLoadingNotifications) {
    return <Loader className="absolute top-0 left-0" />
  }
  return (
    <>
      <MetaTags title={`${user?.name} - Followings`} description={t('meta-profile-description')} />
      <MainLayout
        containerSize="full"
        user={userMe}
        notifications={notifications}
      >
        <ProfileUserData
          data={user}
          selfId={userMe?.id}
          followState={followState}
          followRequestState={followRequestState}
        />
        <ProfileNavigationPanel
          userId={userId}
          selfId={userMe?.id}
        />
        <ProfileRecipesContent
          data={recipes}
          isLoading={isLoadingRecipes}
        />
        <FollowsWindow title={t('followings')} userId={userId}>
          <FollowsInputSearch
            pageType="followings"
            userId={userId}
          />
          <FollowsUsersContent
            data={followings}
            isLoading={isLoadingFollowings}
          />
        </FollowsWindow>
      </MainLayout>
    </>
  )
}

export default RequireAuth(Followers);