import RecipeCard                         from "@/components/cards/RecipeCard/RecipeCard";
import { 
  FollowWindow, 
  FollowerCard, 
  FollowerCardSkeleton 
}                                         from "@/components/profile"
import { Confirm }                        from "@/components/shared";
import { 
  useFollowMutation, 
  useGetFollowStateQuery, 
  useGetUserFollowersQuery, 
  useUnfollowMutation 
}                                         from "@/lib/api/followApi";
import { useGetRecipesByUserIdQuery }     from "@/lib/api/recipeApi";
import { useGetMeQuery, useGetUserQuery } from "@/lib/api/userApi";
import { IUserFollower }                  from "@/typings/user";
import { Input }                          from "@/components/ui";
import { useParams, useRouter }           from "next/navigation";
import { useEffect, useState }            from "react";
import { useTranslation }                 from "next-i18next";
import { GetStaticPropsContext }          from "next";
import { serverSideTranslations }         from "next-i18next/serverSideTranslations";

export async function getStaticProps({ locale }: GetStaticPropsContext) {
  return {
    props: {
      ...(await serverSideTranslations(locale as string, ['common'])),
    },
  }
}

const Followers = () => {
  const { t }  = useTranslation('common');
  const router = useRouter();

  const { id } = useParams();
  const userId = id as string;

  const [searchFollowers, setSearchFollowers] = useState<string>("");

  const { data: userMe } = useGetMeQuery();

  const { data: followState, isLoading: isLoadingFollowState } = useGetFollowStateQuery(userId);

  const { data: user, isLoading: isLoadingUser }                                  = useGetUserQuery(userId);
  const { data: followers, isLoading: isLoadingUsers, refetch: refetchFollowers } = useGetUserFollowersQuery({ userId: userId, username: searchFollowers as string });
  const { data: recipes, isLoading: isLoadingRecipes }                            = useGetRecipesByUserIdQuery({ userId: userId, sortBy: 'desc' });

  const [ follow ]   = useFollowMutation();
  const [ unfollow ] = useUnfollowMutation();

  const [followStateButtonText, setFollowStateButtonText] = useState<{ [id: string]: boolean }>(
    followers
      ? Object.fromEntries(followers.map((follower) => [follower.id, follower.isFollowed]))
      : {}
  );

  useEffect(() => {
    if (followers) {
      setFollowStateButtonText(Object.fromEntries(followers?.map((follower) => [follower.id, follower.isFollowed]) as (string | boolean)[][]))
    }
  }, [followers, searchFollowers]);

  useEffect(() => {
    if (searchFollowers) {
      router.push(`?username=${searchFollowers}`);
    } else {
      router.push(`/profile/${userId}/followers`)
    }
  }, [searchFollowers])

  const [selectedUserId, setSelectedUserId]     = useState<string>("");
  const [selectedUsername, setSelectedUsername] = useState<string>("");

  const [isOpenConfirm, setIsOpenConfirm] = useState<boolean>(false);

  const handleFollow = async (follower: IUserFollower) => {
    if (follower.isFollowed) {
      setSelectedUserId(follower.id)
      setSelectedUsername(follower.username)
      setIsOpenConfirm(true)
    } else {
      setFollowStateButtonText((prevState) => ({
        ...prevState,
        [follower.id]: true,
      }))
      setIsOpenConfirm(false);
      
      await follow(follower.id)
      await refetchFollowers()
    }
  }

  const onClickUnfollow = async (unfollowUserId: string) => {
    setFollowStateButtonText((prevState) => ({
      ...prevState,
      [unfollowUserId]: false,
    }))
    setIsOpenConfirm(false);

    await unfollow(unfollowUserId); 
    await refetchFollowers();
  }

  const isLoading = isLoadingUsers || isLoadingRecipes || isLoadingUser || isLoadingFollowState;

  if (user?.isPrivate && (userId !== userMe?.id) && !userMe && !followState?.isFollowed) {
    router.push(`/profile/${userId}`)
    return null
  }

  return (
    <>
      {recipes && recipes.map((recipe) => (
        <RecipeCard
          key={recipe.id}
          id={recipe.id}
          recipeName={recipe.title}
          recipeImage={recipe.image}
          foodType={recipe.typeOfFood}
          cookingTime={recipe.coockingTime}
          complexity={recipe.complexity}
          authorImage={recipe.owner.image}
          authorName={recipe.owner.name}
          className="max-[746px]:!w-full mb-7"
        />
      ))}
      <FollowWindow
        title={t('title-followers')}
        userId={userId}
      >
        <Input type="search" onChange={e => setSearchFollowers(e.target.value)} placeholder={t('input-username-placeholder')} className="mb-4 border-[1px] border-[#383838]" />
        {isLoading ? (
          <>
            {[...Array(5)].map(() => (
              <FollowerCardSkeleton className="mb-[10px]" />
            ))}
          </>
        ) : (
          <>
            {followers && followers.length > 0 ? followers.map((follower) => (
              <FollowerCard 
                key={follower.id}
                username={follower.username}
                userImage={follower.image}
                isFollowed={followStateButtonText[follower.id]}
                name={follower.name}
                userId={follower.id}
                className="mb-3"
                onClick={() => handleFollow(follower)}
              />
            )) : (
              <div className="w-full text-[#979797] flex justify-center items-center">
                <p>No followers</p>
              </div>
            )}
          </>
        )}
      </FollowWindow>
      {isOpenConfirm && (
        <Confirm
          confirmText={`${t('confirm-unfollow')} "${selectedUsername}"?`}
          buttonText={t('unfollow-button') }
          clickAction={() => onClickUnfollow(selectedUserId)}
          closeConfirm={() => setIsOpenConfirm(false)}
        />
      )}
    </>
  )
}

export default Followers;