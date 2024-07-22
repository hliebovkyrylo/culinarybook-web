import { Loader } from "@/components/Loader"
import { RequireAuth } from "@/hocs/requireAuth"
import { useGetMyAllUnreadedNotificationsQuery } from "@/lib/api/notificationApi"
import { useGetMyLikedQuery } from "@/lib/api/recipeApi"
import { useGetMeQuery, userApi } from "@/lib/api/userApi"
import { wrapper } from "@/lib/store"
import { MainLayout } from "@/modules/layouts"
import {
  ProfileNavigationPanel,
  ProfileRecipesContent,
  ProfileUserData,
  useFollowState,
} from "@/modules/profile"
import {
  GetServerSidePropsContext,
  InferGetServerSidePropsType
} from "next"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import { NextSeo } from "next-seo"
import { useRouter } from "next/router"

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

const Liked = ({ userId, user, metaTags }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const router = useRouter();

  const { data: userMe, isLoading: isMeLoading } = useGetMeQuery(undefined, {
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: true,
    refetchOnFocus: true
  });
  const { followState, followRequestState, isLoadingFollowState, isLoadingFollowRequestState } = useFollowState(userId);

  const { data: recipes, isLoading: isLoadingLikedRecipes } = useGetMyLikedQuery();
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
      <NextSeo 
        title={metaTags.title}
        description={metaTags.description}
        canonical={`https://www.culinarybook.website/profile/${userId}/liked`}
        openGraph={{
          url: `https://www.culinarybook.website/profile/${userId}/liked`,
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
          isLoading={isLoadingLikedRecipes}
        />
      </MainLayout>
    </>
  )
}

export default RequireAuth(Liked);