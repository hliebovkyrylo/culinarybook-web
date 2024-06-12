import { Loader }                 from "@/components/Loader"
import { RequireAuth }            from "@/hocs/requireAuth"
import { useGetMyLikedQuery }     from "@/lib/api/recipeApi"
import { MainLayout }             from "@/modules/layouts"
import { 
  ProfileNavigationPanel, 
  ProfileRecipesContent, 
  ProfileUserData, 
  useFollowState, 
  useUsers 
}                                 from "@/modules/profile"
import { 
  GetServerSidePropsContext, 
  InferGetServerSidePropsType 
}                                 from "next"
import { useTranslation }         from "next-i18next"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import { useRouter }              from "next/router"

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

const Liked = ({ userId }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const { t }  = useTranslation('common');
  const router = useRouter();

  const { user, userMe, isLoadingUser, isMeLoading } = useUsers(userId);
  const { followState, followRequestState, isLoadingFollowState, isLoadingFollowRequestState } = useFollowState(userId);

  const { data: recipes, isLoading: isLoadingLikedRecipes } = useGetMyLikedQuery();

  if (isLoadingUser || isMeLoading || isLoadingFollowState || isLoadingFollowRequestState) {
    return <Loader className="absolute top-0 left-0" />
  }

  if (userId !== userMe?.id) {
    router.push(`/profile/${userId}`);
    return null;
  }
  return (
    <MainLayout
      metaTitle={`${user?.name} - Liked | Culinarybook`}
      pageDescription={`${user?.name} ${t('meta-profile-description')}`}
      containerSize="full"
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
  )
}

export default RequireAuth(Liked);