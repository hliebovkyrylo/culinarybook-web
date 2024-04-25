"use client"

import RecipeCard                         from "@/components/cards/RecipeCard/RecipeCard";
import { 
  FollowWindow, 
  FollowerCard, 
  FollowerCardSkeleton 
}                                         from "@/components/profile"
import { Confirm }                        from "@/components/shared";
import { 
  useFollowMutation, 
  useGetUserFollowersQuery, 
  useUnfollowMutation 
}                                         from "@/lib/api/followApi";
import { useGetRecipesByUserIdQuery }     from "@/lib/api/recipeApi";
import { useGetMeQuery, useGetUserQuery } from "@/lib/api/userApi";
import { IUserFollower }                  from "@/typings/user";
import { Input }                          from "@/ui";
import { useParams, useRouter }           from "next/navigation";
import { useEffect, useState }            from "react";
import { useTranslation }                 from "react-i18next";

const Followers = () => {
  const { t }  = useTranslation();
  const router = useRouter();

  const { id } = useParams();
  const userId = id as string;

  const { data: user, isLoading: isLoadingUser }                                  = useGetUserQuery(userId);
  const { data: followers, isLoading: isLoadingUsers, refetch: refetchFollowers } = useGetUserFollowersQuery({ userId: userId });
  const { data: recipes, isLoading: isLoadingRecipes }                            = useGetRecipesByUserIdQuery({ userId: userId, sortBy: 'desc' });

  const [ follow ]   = useFollowMutation();
  const [ unfollow ] = useUnfollowMutation();

  const [followStateButtonText, setFollowStateButtonText] = useState<{ [id: string]: boolean }>(
    followers
      ? Object.fromEntries(followers.map((follower) => [follower.id, follower.isFollowed]))
      : {}
  );

  useEffect(() => {
    setFollowStateButtonText(Object.fromEntries(followers?.map((follower) => [follower.id, follower.isFollowed]) as (string | boolean)[][]))
  }, [followers]);

  const [selectedUserId, setSelectedUserId]     = useState<string>("");
  const [selectedUsername, setSelectedUsername] = useState<string>("");

  const [isOpenConfirm, setIsOpenConfirm] = useState<boolean>(false);

  if (user?.isPrivate) {
    router.push(`/profile/${userId}`)
    return null
  }

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

  const isLoading = isLoadingUsers || isLoadingRecipes || isLoadingUser;

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
        <Input type="search" placeholder={t('input-username-placeholder')} className="mb-4 border-[1px] border-[#383838]" />
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