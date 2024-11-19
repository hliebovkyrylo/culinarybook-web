import {
  FollowsInputSearch,
  FollowsUsersContent,
  FollowsWindow,
  ProfileNavigationPanel,
  ProfileRecipesContent,
  ProfileUserData,
  useFollowState,
} from "@/modules/profile";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { RequireAuth } from "@/hocs/requireAuth";
import { useGetUserFollowersQuery } from "@/lib/api/followApi";
import { useGetRecipesByUserIdQuery } from "@/lib/api/recipeApi";
import { MainLayout } from "@/modules/layouts";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";
import { Loader } from "@/components/Loader";
import { useGetMyAllUnreadedNotificationsQuery } from "@/lib/api/notificationApi";
import { wrapper } from "@/lib/store";
import { useGetMeQuery, userApi } from "@/lib/api/userApi";
import { NextSeo } from "next-seo";

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (ctx: GetServerSidePropsContext) => {
    const userId = ctx.params?.userId as string;
    const locale = ctx.locale as string;

    const translations = await serverSideTranslations(locale, ["common"]);
    const commonTranslations =
      translations._nextI18Next?.initialI18nStore[locale || "en"].common;

    const userPromise = store.dispatch(
      userApi.endpoints.getUser.initiate(userId)
    );
    await Promise.all([userPromise]);

    const user = userApi.endpoints.getUser.select(userId)(
      store.getState() as any
    );

    return {
      props: {
        ...(await serverSideTranslations(locale as string, ["common"])),
        userId: userId as string,
        user: user.data,
        metaTags: {
          title: user.data?.name || "",
          description: commonTranslations["meta-profile-description"] || "",
        },
      },
    };
  }
);

const Followers = ({
  userId,
  user,
  metaTags,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const { t } = useTranslation("common");
  const router = useRouter();
  const sortBy = router.query.sortBy;

  const searchFollower = router.query.username;

  const { data: userMe, isLoading: isMeLoading } = useGetMeQuery(undefined, {
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: true,
    refetchOnFocus: true,
  });
  const {
    followState,
    followRequestState,
    isLoadingFollowState,
    isLoadingFollowRequestState,
  } = useFollowState(userId);

  const { data: notifications, isLoading: isLoadingNotifications } =
    useGetMyAllUnreadedNotificationsQuery();
  const { data: recipes, isLoading: isLoadingRecipes } =
    useGetRecipesByUserIdQuery({
      userId: userId as string,
      sortBy: sortBy !== undefined ? (sortBy as string) : "desc",
    });
  const { data: followers, isLoading: isLoadingFollowers } =
    useGetUserFollowersQuery({
      userId: userId,
      username: searchFollower as string,
    });

  if (
    isMeLoading ||
    isLoadingFollowState ||
    isLoadingFollowRequestState ||
    isLoadingNotifications
  ) {
    return <Loader className="absolute top-0 left-0" />;
  }
  return (
    <>
      <NextSeo
        title={metaTags.title}
        description={metaTags.description}
        canonical={`https://www.culinarybook.website/profile/${userId}/followers`}
        openGraph={{
          url: `https://www.culinarybook.website/profile/${userId}/followers`,
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
        <ProfileNavigationPanel userId={userId} selfId={userMe?.id} />
        <ProfileRecipesContent data={recipes} isLoading={isLoadingRecipes} />
        <FollowsWindow title={t("title-followers")} userId={userId}>
          <FollowsInputSearch pageType="followers" userId={userId} />
          <FollowsUsersContent
            data={followers}
            isLoading={isLoadingFollowers}
          />
        </FollowsWindow>
      </MainLayout>
    </>
  );
};

export default RequireAuth(Followers);
