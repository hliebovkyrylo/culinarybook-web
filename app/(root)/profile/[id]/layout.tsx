"use client"

import { renderMetaTags }                 from "@/app/meta";
import { 
  PrivateAccount, 
  ProfilePanel, 
  ProfileUserInfo 
}                                         from "@/components/profile";
import { Confirm, Loader }                from "@/components/shared";
import { 
  useFollowMutation,
  useGetFollowStateQuery,
  useGetUserFollowersQuery, 
  useGetUserFollowingsQuery, 
  useUnfollowMutation
}                                         from "@/lib/api/followApi";
import { useGetRecipesByUserIdQuery }     from "@/lib/api/recipeApi";
import { useGetMeQuery, useGetUserQuery } from "@/lib/api/userApi";
import { useParams, useRouter }           from "next/navigation";
import { useEffect, useState }            from "react";
import { useTranslation }                 from "react-i18next";

const ProfileLayout = ({ children }: { children: React.ReactNode }) => {
  const { t } = useTranslation();

  const { id } = useParams();
  const userId = id as string;

  const router = useRouter();

  const { data: user, isLoading }                = useGetUserQuery(userId);
  const { data: userMe, isLoading: isMeLoading } = useGetMeQuery();
  
  const { data: followers, isLoading: isLoadingFollowers, refetch: refetchFollowers }       = useGetUserFollowersQuery({ userId: userId });
  const { data: followings, isLoading: isLoadingFollowings }                                = useGetUserFollowingsQuery({ userId: userId });
  const { data: followState, isLoading: isLoadingFollowState, refetch: refetchFollowState } = useGetFollowStateQuery(userId);

  const [sortBy, setSortBy] = useState<string>("desc");

  const handleChangeSort = () => {
    setSortBy((prevSortBy) => {
      const newSortBy = prevSortBy === 'desc' ? 'asc' : 'desc';
      router.push(`/profile/${userId}?sortBy=${newSortBy}`);
      return newSortBy;
    });
  }

  const { data: recipes, isLoading: isLoaidngRecipes } = useGetRecipesByUserIdQuery({ userId: userId, sortBy: sortBy });
  
  const [ follow ]   = useFollowMutation();
  const [ unfollow ] = useUnfollowMutation();

  const [followStateButtonText, setFollowStateButtonText] = useState<boolean>(followState?.isFollowed as boolean)

  const [isOpenConfirm, setIsOpenConfirm] = useState<boolean>(false);

  useEffect(() => {
    setFollowStateButtonText(followState?.isFollowed as boolean)
  }, [followState])

  const handleFollow = async () => {
    if (!followState?.isFollowed) {
      setFollowStateButtonText(true);
      setIsOpenConfirm(false);

      await follow(userId)
      await refetchFollowers(); 
      await refetchFollowState();
    } else {
      setIsOpenConfirm(true)
    }
  }

  const onClickUnfollow = async () => {
    setFollowStateButtonText(false);
    setIsOpenConfirm(false);

    await unfollow(userId); 
    await refetchFollowers(); 
    await refetchFollowState();
  }

  if 
  (    isLoading 
    || isMeLoading 
    || isLoadingFollowers 
    || isLoadingFollowings 
    || isLoaidngRecipes
    || isLoadingFollowState
  ) {
    return <Loader />
  }

  const isPrivateAccount = user?.isPrivate && userMe?.id !== user.id;

  return (
    <div className="w-full z-50 flex flex-col h-full">
      {renderMetaTags({ title: `${user?.name} | Recipebook` })}
      <ProfileUserInfo
        username={user?.username || ""}
        userId={userId}
        image={user?.image}
        name={user?.name || ''}
        followersNumber={followers?.length || 0}
        followingsNumber={followings?.length || 0}
        recipesNumber={recipes?.length || 0}
        isFollowed={followStateButtonText}
        followActions={() => handleFollow()}
        myId={userMe?.id || ''}
        backgroundImage={user?.backgroundImage || ''}
      />
      <ProfilePanel
        userId={userMe?.id || ''}
        className="my-2"
        sortBy={sortBy}
        handleChangeSort={handleChangeSort}
      />
      {isPrivateAccount ? (
          <div className=" flex flex-col flex-grow h-full">
            <PrivateAccount />
          </div>
        ) : (
          <div className="grid grid-cols-6 justify-items-center max-[1488px]:grid-cols-5 max-[1220px]:grid-cols-4 max-lg:grid-cols-3 max-[748px]:grid-cols-1">
            {children}
          </div>
        )
      }
      {isOpenConfirm && (
        <Confirm
          confirmButtonText={'Unfollow'}
          confirmText={`${t('confirm-unfollow')} "${user?.username}"?`}
          clickAction={() => onClickUnfollow()}
          closeConfirm={() => setIsOpenConfirm(false)}
        />
      )}
    </div>
  )
}

export default ProfileLayout;