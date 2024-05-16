"use client"

import RecipeCard                         from "@/components/cards/RecipeCard/RecipeCard"
import { 
  FollowWindow, 
  FollowerCard, 
  FollowerCardSkeleton 
}                                         from "@/components/profile"
import { Confirm }                        from "@/components/shared";
import { 
  useFollowMutation, 
  useGetFollowStateQuery, 
  useGetUserFollowingsQuery, 
  useUnfollowMutation 
}                                         from "@/lib/api/followApi";
import { useGetRecipesByUserIdQuery }     from "@/lib/api/recipeApi";
import { useGetMeQuery, useGetUserQuery } from "@/lib/api/userApi";
import { IUserFollower }                  from "@/typings/user";
import { Input }                          from "@/ui";
import { useParams, useRouter }           from "next/navigation";
import { useEffect, useState }            from "react";
import { useTranslation }                 from "react-i18next";

const Followings = () => {
  const { t }  = useTranslation();
  const router = useRouter();

  const { id } = useParams();
  const userId = id as string;

  const { data: userMe } = useGetMeQuery();

  const { data: followState, isLoading: isLoadingFollowState } = useGetFollowStateQuery(userId);

  const [searchFollowings, setSearchFollowings] = useState<string>("");

  const { data: user, isLoading: isLoadingUser }                                         = useGetUserQuery(userId);
  const { data: followings, isLoading: isLoadingFollowings, refetch: refetchFollowings } = useGetUserFollowingsQuery({ userId: userId, username: searchFollowings });
  const { data: recipes, isLoading: isLoadingRecipes }                                   = useGetRecipesByUserIdQuery({ userId: userId, sortBy: 'desc' });

  const [ follow ]   = useFollowMutation();
  const [ unfollow ] = useUnfollowMutation();

  const [followStateButtonText, setFollowStateButtonText] = useState<{ [id: string]: boolean }>(
    followings
      ? Object.fromEntries(followings.map((following) => [following.id, following.isFollowed]))
      : {}
  );

  useEffect(() => {
    if (searchFollowings) {
      setFollowStateButtonText(Object.fromEntries(followings?.map((following) => [following.id, following.isFollowed]) as (string | boolean)[][]))
    }
  }, [followings, searchFollowings]);

  useEffect(() => {
    if (searchFollowings) {
      router.push(`?username=${searchFollowings}`);
    } else {
      router.push(`/profile/${userId}/followings`)
    }
  }, [searchFollowings])

  const [selectedUserId, setSelectedUserId] = useState<string>("");

  const [isOpenConfirm, setIsOpenConfirm]       = useState<boolean>(false);
  const [selectedUsername, setSelectedUsername] = useState<string>("");

  const handleFollow = async (follower: IUserFollower) => {
    if (follower.isFollowed) {
      setSelectedUserId(follower.id);
      setSelectedUsername(follower.username);
      setIsOpenConfirm(true);
    } else {
      setFollowStateButtonText((prevState) => ({
        ...prevState,
        [follower.id]: true,
      }))
      setIsOpenConfirm(false);
      
      await follow(follower.id);
      await refetchFollowings();
    }
  }

  const onClickUnfollow = async (unfollowUserId: string) => {
    setFollowStateButtonText((prevState) => ({
      ...prevState,
      [unfollowUserId]: false,
    }))
    setIsOpenConfirm(false);

    await unfollow(unfollowUserId); 
    await refetchFollowings();
  }

  const isLoading = isLoadingFollowings || isLoadingRecipes || isLoadingUser || isLoadingFollowState;

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
        title={t('followings')}
        userId={userId}
      >
        <Input type="search" onChange={e => setSearchFollowings(e.target.value)} placeholder={t('input-username-placeholder')} className="mb-4 border-[1px] border-[#383838]" />
        {isLoading ? (
          <>
            {[...Array(5)].map(() => (
              <FollowerCardSkeleton className="mb-[10px]" />
            ))}
          </>
        ) : (
          <>
            {followings && followings.length > 0 ? followings.map((following) => (
              <FollowerCard 
                key={following.id}
                username={following.username}
                userImage={following.image}
                isFollowed={followStateButtonText[following.id]}
                name={following.name}
                userId={following.id}
                className="mb-3"
                onClick={() => handleFollow(following)}
              />
            )) : (
              <div className="w-full text-[#979797] flex justify-center items-center">
                <p>No followings</p>
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

export default Followings;