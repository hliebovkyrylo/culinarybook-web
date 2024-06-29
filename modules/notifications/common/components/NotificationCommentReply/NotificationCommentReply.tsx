import useFormatDaysAgo from "@/hooks/useFormatDaysAgo";
import { useTranslation } from "next-i18next";
import Image from "next/image";
import Link from "next/link";

interface INotificationCommentReply {
  userImage: string;
  commentText: string;
  username: string;
  recipeImage: string;
  recipeId: string;
  userId: string;
  createdAt: Date;
}

export const NotificationCommentReply = ({
  userImage,
  commentText,
  username,
  recipeImage,
  recipeId,
  userId,
  createdAt,
}: INotificationCommentReply) => {
  const { t } = useTranslation('common');

  const formatDaysAgo = useFormatDaysAgo();
  return (
    <article className="w-full min-h-[64px] second-background flex items-center py-2 px-3 rounded-lg mb-2">
      <div className="flex justify-between w-full">
        <div className="flex justify-between">
          <Link className="mr-3 w-12 h-12" href={`/profile/${userId}`}>
            <Image src={userImage !== '' ? userImage : '/assets/defaulUserImage.jpg'} className="object-cover rounded-full w-12 h-12" alt="User image" width={48} height={48} />
          </Link>
          <div>
            <div className="max-[516px]:!w-28">
              <Link className="text-sm" href={`/profile/${userId}`}><b>{username}</b></Link>
              <span className="text-[#959595] text-sm"> {t('notification-type-reply')}</span>
            </div>
            <p className="max-w-xs break-words text-sm overflow-hidden max-h-48 line-clamp-6">
              {commentText}
            </p>
            <div className="flex items-center">
              <span className="block w-1 h-1 bg-[#959595] rounded-full mr-1" />
              <p className="text-[#959595] text-sm">{formatDaysAgo(createdAt)}</p>
            </div>
          </div>
        </div>
        <Link className="w-12 h-12" href={`/recipe/${recipeId}`}>
          <Image src={recipeImage !== '' ? recipeImage : '/assets/no-image.png'} className="object-cover rounded-md w-12 h-12" alt="Recipe image" width={48} height={48} />
        </Link>
      </div>
    </article>
  )
};