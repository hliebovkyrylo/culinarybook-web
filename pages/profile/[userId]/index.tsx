import { 
  GetServerSidePropsContext, 
  InferGetServerSidePropsType 
}                                     from "next";
import { 
  PrivateAccountWindow,
  ProfileNavigationPanel, 
  ProfileRecipesContent, 
  ProfileUserData, 
  useFollowState, 
  useUsers
}                                     from "@/modules/profile";
import { useGetRecipesByUserIdQuery } from "@/lib/api/recipeApi";
import { serverSideTranslations }     from "next-i18next/serverSideTranslations";
import { useTranslation }             from "next-i18next";
import { useRouter }                  from "next/router";
import { MainLayout }                 from "@/modules/layouts";
import { Loader }                     from "@/components/shared";

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

const Profile = ({ userId }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const { t }  = useTranslation('common');
  const router = useRouter();

  const sortBy = router.query.sortBy;

  const { user, userMe, isLoadingUser, isMeLoading }                                           = useUsers(userId);
  const { followState, followRequestState, isLoadingFollowState, isLoadingFollowRequestState } = useFollowState(userId);

  const { data: recipes, isLoading: isLoadingRecipes, isFetching: isFetchingRecipes } = useGetRecipesByUserIdQuery({ userId: userId as string, sortBy: sortBy !== undefined ? sortBy as string : 'desc' });

  if (isMeLoading || isLoadingFollowState || isLoadingRecipes || isLoadingUser || isLoadingFollowRequestState) {
    return <Loader className="absolute top-0 left-0" />
  }

  const isPrivateAccount = user?.isPrivate && userMe?.id !== userId && !followState?.isFollowed;

  return (
    <MainLayout
      pageDescription={`${user?.name} ${t('meta-profile-description')}`}
      metaTitle={`${user?.name} | Culinarybook`}
      containerSize="full"
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
  )
}

export default Profile;