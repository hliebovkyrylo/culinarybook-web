import {
  GetServerSidePropsContext,
  InferGetServerSidePropsType
} from "next";
import {
  PrivateAccountWindow,
  ProfileNavigationPanel,
  ProfileRecipesContent,
  ProfileUserData,
  useFollowState,
} from "@/modules/profile";
import { useGetRecipesByUserIdQuery } from "@/lib/api/recipeApi";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";
import { MainLayout } from "@/modules/layouts";
import { Loader } from "@/components/Loader";
import { useGetMyAllUnreadedNotificationsQuery } from "@/lib/api/notificationApi";
import { wrapper } from "@/lib/store";
import { useGetMeQuery, userApi } from "@/lib/api/userApi";
import { NextSeo } from "next-seo";

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

const Profile = ({ userId, metaTags, user }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const router = useRouter();

  const sortBy = router.query.sortBy;

  const { data: userMe, isLoading: isMeLoading } = useGetMeQuery(undefined, {
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: true,
    refetchOnFocus: true
  });
  const { followState, followRequestState, isLoadingFollowState, isLoadingFollowRequestState } = useFollowState(userId);

  const { data: notifications, isLoading: isLoadingNotifications } = useGetMyAllUnreadedNotificationsQuery(undefined, {
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: true,
    refetchOnFocus: true
  });
  const { data: recipes, isLoading: isLoadingRecipes, isFetching: isFetchingRecipes } = useGetRecipesByUserIdQuery({ userId: userId as string, sortBy: sortBy !== undefined ? sortBy as string : 'desc' });

  if (isMeLoading || isLoadingFollowState || isLoadingRecipes || isLoadingFollowRequestState || isLoadingNotifications) {
    return <Loader className="absolute top-0 left-0" />
  }

  const isPrivateAccount = user?.isPrivate && userMe?.id !== userId && !followState?.isFollowed;

  return (
    <>
      <NextSeo 
        title={metaTags.title}
        description={metaTags.description}
        canonical={`https://www.culinarybook.website/profile/${userId}`}
        openGraph={{
          url: `https://www.culinarybook.website/profile/${userId}`,
          title: metaTags.title,
          description: metaTags.description,
          images: [
            { url: `/api/og?title=${metaTags.title}&description=${metaTags.description}` },
          ],
        }}
      />
      <MainLayout
        containerSize="full"
        user={userMe}
        notifications={notifications}
      >
        <ProfileUserData
          data={user}
          followRequestState={followRequestState}
          selfId={userMe?.id}
          followState={followState}
        />
        {!isPrivateAccount ? (
          <>
            <ProfileNavigationPanel
              userId={userId}
              selfId={userMe?.id}
            />
            <ProfileRecipesContent
              isLoading={isLoadingRecipes || isFetchingRecipes}
              data={recipes}
            />
          </>
        ) : (
          <PrivateAccountWindow />
        )}
      </MainLayout>
    </>
  )
}

export default Profile;