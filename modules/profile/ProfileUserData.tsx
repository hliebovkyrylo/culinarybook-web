import { Button, Dialog } from "@/components/ui";
import {
  useCancelFollowRequestMutation,
  useFollowMutation,
  useUnfollowMutation,
} from "@/lib/api/followApi";
import { IUser } from "@/typings/user";
import { useTranslation } from "next-i18next";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

interface IProfileUserData {
  data: IUser | undefined;
  followRequestState?: any;
  selfId?: string;
  followState?: any;
}

export const ProfileUserData = ({
  data,
  followRequestState,
  selfId,
  followState,
}: IProfileUserData) => {
  const { t } = useTranslation("common");
  const router = useRouter();

  const [follow] = useFollowMutation();
  const [unfollow] = useUnfollowMutation();
  const [cancelFollowRequest] = useCancelFollowRequestMutation();

  const [followStateButtonText, setFollowStateButtonText] = useState<boolean>(
    followState?.isFollowed as boolean
  );
  const [isRequestSent, setIsRequestSent] = useState<boolean>(
    followRequestState?.isFollowRequestSent as boolean
  );

  const [numberOfFollowers, setNumberOfFollowers] = useState(
    data?.followersCount || 0
  );
  const [numberOfFollowings, setNumberOfFollowings] = useState(
    data?.followingsCount || 0
  );

  const [isOpenConfirm, setIsOpenConfirm] = useState<boolean>(false);
  const [confirmText, setConfirmText] = useState<string>("");
  const [confirmButtonText, setConfirmButtonText] = useState<string>("");

  useEffect(() => {
    setNumberOfFollowings(data?.followingsCount || 0);
  }, [data]);

  useEffect(() => {
    setIsRequestSent(followRequestState?.isFollowRequestSent as boolean);
  }, [followRequestState]);

  useEffect(() => {
    setFollowStateButtonText(followState?.isFollowed as boolean);
  }, [followState]);

  const handleFollow = async () => {
    if (!selfId) {
      router.push("/sign-in");
    } else {
      if (!followState?.isFollowed && !data?.isPrivate) {
        setFollowStateButtonText(true);
        setIsOpenConfirm(false);

        setNumberOfFollowers(numberOfFollowers + 1);
        await follow(data?.id as string);
      } else if (
        data?.isPrivate &&
        !followState?.isFollowed &&
        !followRequestState?.isFollowRequestSent
      ) {
        setIsRequestSent(true);
        await follow(data?.id as string);
      } else if (followRequestState?.isFollowRequestSent) {
        setIsOpenConfirm(true);
        setConfirmText(`${t("cancel-follow-request")} "${data?.username}"?`);
        setConfirmButtonText(t("cancel-confirm"));
      } else {
        setIsOpenConfirm(true);
        setConfirmText(`${t("confirm-unfollow")} "${data?.username}"?`);
        setConfirmButtonText(t("unfollow-button"));
      }
    }
  };

  const onClickUnfollow = async () => {
    if (!selfId) {
      router.push("/sign-in");
    } else {
      setIsOpenConfirm(false);

      if (data?.isPrivate && followRequestState?.isFollowRequestSent) {
        setIsRequestSent(false);

        await cancelFollowRequest(data.id as string);
      } else {
        setFollowStateButtonText(false);
        setNumberOfFollowers(numberOfFollowers - 1);

        await unfollow(data?.id as string);
      }
    }
  };

  return (
    <section>
      <div className="flex relative py-3 px-2 gap-14 max-[537px]:gap-4">
        {data?.backgroundImage && (
          <Image
            className=" absolute -z-50 top-0 left-0 w-full h-full object-cover opacity-20 rounded-t-lg"
            src={data.backgroundImage}
            alt="User banner"
            width={500}
            height={500}
          />
        )}
        <Image
          src={
            data && data?.image !== ""
              ? data?.image
              : "/assets/user_placeholder.jpg"
          }
          alt="User image"
          className="object-cover rounded-full w-40 h-40 max-[537px]:w-20 max-[537px]:h-20"
          width={160}
          height={160}
        />
        <div className="w-full max-w-[390px] h-36 flex flex-col justify-around">
          <div className="flex items-center flex-wrap max-[609px]:items-start max-[609px]:flex-col">
            <p className="default-text text-left flex justify-start max-[409px]:w-full">
              @{data?.username}
            </p>
            {data?.id !== selfId && (
              <Button
                text={
                  isRequestSent
                    ? t("follow-request")
                    : !followStateButtonText
                    ? t("follow-button")
                    : t("follow-button-already")
                }
                state="default"
                onClick={handleFollow}
                className={`!w-48 h-8 flex opacity-70 items-center justify-center ml-4 max-[609px]:ml-0 max-[609px]:mt-1 ${
                  (followStateButtonText || isRequestSent) &&
                  "!bg-[#29292b] !text-white font-normal"
                }`}
              />
            )}
          </div>
          <div className="flex justify-between">
            <p className="default-text max-[537px]:!text-sm text-center">
              <span className="link-text max-[537px]:block">
                {data?.recipesCount}
              </span>{" "}
              {(data?.recipesCount as number) > 1 || data?.recipesCount === 0
                ? t("recipes")
                : t("recipe")}
            </p>
            <Link
              href={selfId ? `/profile/${data?.id}/followers` : "/sign-in"}
              className="default-text max-[537px]:!text-sm text-center"
            >
              <span className="link-text max-[537px]:block">
                {numberOfFollowers}
              </span>{" "}
              {numberOfFollowers > 1 || numberOfFollowers === 0
                ? t("followers")
                : t("follower")}
            </Link>
            <Link
              href={selfId ? `/profile/${data?.id}/followings` : "/sign-in"}
              className="default-text max-[537px]:!text-sm text-center"
            >
              <span className="link-text max-[537px]:block">
                {numberOfFollowings}
              </span>{" "}
              {numberOfFollowings > 1 || numberOfFollowings === 0
                ? t("followings")
                : t("following")}
            </Link>
          </div>
          <p className="default-text">{data?.name}</p>
        </div>
      </div>
      {isOpenConfirm && (
        <Dialog
          confirmText={confirmText}
          clickAction={() => onClickUnfollow()}
          buttonText={confirmButtonText}
          closeConfirm={() => setIsOpenConfirm(false)}
        />
      )}
    </section>
  );
};
