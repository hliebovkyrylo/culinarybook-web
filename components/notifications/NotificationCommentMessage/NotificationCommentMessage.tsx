"use client"

import Link               from "next/link";
import { useTranslation } from "react-i18next";
import useFormatDaysAgo   from '@/hooks/useFormatDaysAgo';

interface INotificationCommentMessage {
  userImage  : React.ReactNode | "";
  commentText: string;
  username   : string;
  recipeImage: React.ReactNode | "";
  recipeId   : string;
  userId     : string;
  createdAt  : Date;
}

export const NotificationCommentMessage = ({
  userImage,
  commentText,
  username,
  recipeImage,
  recipeId,
  userId,
  createdAt,
}: INotificationCommentMessage) => {
  const { t } = useTranslation();

  const formatDaysAgo = useFormatDaysAgo();

  return (
    <article className="w-full min-h-[64px] second-background flex items-center py-2 px-3 rounded-lg mb-2">
      <div className="flex justify-between w-full">
        <div className="flex justify-between">
          <Link href={`/profile/${userId}`}>{userImage}</Link>
          <div>
            <div>
              <Link href={`/profile/${userId}`}><b>{username}</b></Link>
              <span className="text-[#959595]"> {t('comment-type-comment')}</span>
            </div>
            <p className="max-w-xs break-words overflow-hidden max-h-48 line-clamp-6">
              {commentText}
            </p>
            <div className="flex items-center">
              <span className="block w-1 h-1 bg-[#959595] rounded-full mr-1" />
              <p className="text-[#959595] text-sm">{formatDaysAgo(createdAt)}</p>
            </div>
          </div>
        </div>
        <Link href={`/recipe/${recipeId}`}>{recipeImage}</Link>
      </div>
    </article>
  )
}