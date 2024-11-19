import { IUserFollower } from "@/typings/user";
import { FollowerCard, FollowerCardSkeleton } from "./components";
import { useTranslation } from "next-i18next";
import { useState } from "react";
import { useFollowMutation, useUnfollowMutation } from "@/lib/api/followApi";
import { Dialog } from "@/components/ui";

interface IFollowsUsersContent {
  data?: IUserFollower[];
  isLoading: boolean;
}

export const FollowsUsersContent = ({
  data,
  isLoading,
}: IFollowsUsersContent) => {
  const { t } = useTranslation("common");

  const [follow] = useFollowMutation();
  const [unfollow] = useUnfollowMutation();

  const [selectedUserId, setSelectedUserId] = useState<string>("");
  const [selectedUsername, setSelectedUsername] = useState<string>("");
  const [isOpenConfirm, setIsOpenConfirm] = useState<boolean>(false);

  const [followStateButtonText, setFollowStateButtonText] = useState<{
    [id: string]: boolean;
  }>();

  const handleFollow = async (follower: IUserFollower) => {
    if (follower.isFollowed) {
      setSelectedUserId(follower.id);
      setSelectedUsername(follower.username);
      setIsOpenConfirm(true);
    } else {
      setFollowStateButtonText((prevState) => ({
        ...prevState,
        [follower.id]: true,
      }));
      setIsOpenConfirm(false);

      await follow(follower.id);
    }
  };

  const onClickUnfollow = async (unfollowUserId: string) => {
    setFollowStateButtonText((prevState) => ({
      ...prevState,
      [unfollowUserId]: false,
    }));
    setIsOpenConfirm(false);

    await unfollow(unfollowUserId);
  };
  return (
    <>
      {isLoading ? (
        <>
          {[...Array(5)].map((_, index) => (
            <FollowerCardSkeleton key={index} />
          ))}
        </>
      ) : (
        <>
          {data && data.length > 0 ? (
            data.map((follower) => (
              <FollowerCard
                key={follower.id}
                username={follower.username}
                userImage={follower.image}
                isFollowed={
                  followStateButtonText
                    ? followStateButtonText[follower.id]
                    : follower.isFollowed
                }
                name={follower.name}
                userId={follower.id}
                onClick={() => handleFollow(follower)}
              />
            ))
          ) : (
            <div className="w-full h-full text-[#979797] flex justify-center items-center">
              <p>{t("nothing-found")}</p>
            </div>
          )}
        </>
      )}
      {isOpenConfirm && (
        <Dialog
          confirmText={`${t("confirm-unfollow")} "${selectedUsername}"?`}
          buttonText={t("unfollow-button")}
          clickAction={() => onClickUnfollow(selectedUserId)}
          closeConfirm={() => setIsOpenConfirm(false)}
        />
      )}
    </>
  );
};
