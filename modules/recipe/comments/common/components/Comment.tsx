import { ChevronDownIcon, ChevronUpIcon, StarIcon, TrashIcon } from "@/icons";
import { useGetMeQuery } from "@/lib/api/userApi";
import Image from "next/image";
import Link from "next/link";
import { useTranslation } from "react-i18next";

interface IComment {
  userImage: string;
  username: string;
  userId: string;
  recipeOwnerId: string;
  numbersOfReplies: number;
  rating?: number;
  commentText: string;
  onClickOpenReplies?: () => void;
  isOpenReplies?: boolean;
  onClickReply: () => void;
  onClickDeleteComment: () => void;
}

export const Comment = ({
  userImage,
  username,
  rating,
  userId,
  commentText,
  numbersOfReplies,
  isOpenReplies,
  recipeOwnerId,
  onClickOpenReplies,
  onClickReply,
  onClickDeleteComment,
}: IComment) => {
  const { t } = useTranslation();

  const { data: userMe } = useGetMeQuery();

  return (
    <article className="flex w-full relative">
      <Link href={`/profile/${userId}`} className="w-12 h-12 mr-2">
        <Image
          src={userImage !== "" ? userImage : "/assets/defaulUserImage.jpg"}
          alt="User photo"
          className="w-full h-full object-cover rounded-full"
          width={38}
          height={38}
        />
      </Link>
      <div className="flex flex-col justify-around">
        <div className="flex">
          <Link href={`/profile/${userId}`}>@{username}</Link>
          {rating && (
            <div className="flex ml-2">
              {[...Array(rating)].map((_, index) => (
                <StarIcon className="w-3 star-icon-active" key={index} />
              ))}
            </div>
          )}
        </div>
        <p>{commentText}</p>
        <div className="flex items-center">
          {numbersOfReplies > 0 && (
            <button
              onClick={onClickOpenReplies}
              className="flex items-center leftsidebar__text !text-base !p-0 mr-6"
            >
              {isOpenReplies ? (
                <ChevronUpIcon className="w-4 icon-color mr-1" />
              ) : (
                <ChevronDownIcon className="w-4 icon-color mr-1" />
              )}
              {numbersOfReplies} {t("replies-button")}
            </button>
          )}
          <button
            onClick={onClickReply}
            className="my-2 rounded-xl text-left text-color-666"
          >
            {t("reply-button")}
          </button>
        </div>
      </div>
      {(userMe?.id === userId || userMe?.id === recipeOwnerId) && (
        <button onClick={onClickDeleteComment} className="absolute right-0">
          <TrashIcon className="w-4 fill-color-666" />
        </button>
      )}
    </article>
  );
};
