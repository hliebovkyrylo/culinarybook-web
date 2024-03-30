"use client"

import useFormatDaysAgo   from "@/hooks/useFormatDaysAgo";
import Link               from "next/link";
import { useTranslation } from "react-i18next";

interface INotificationFollowMessage {
  userImage  : React.ReactNode | "";
  username   : string;
  userId     : string;
  createdAt  : Date;
}

export const NotificationFollowMessage = ({
  userImage,
  username,
  userId,
  createdAt,
}: INotificationFollowMessage) => {
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
              <span> {t('comment-type-following')}</span>
            </div>
            <div className="flex items-center">
              <span className="block w-1 h-1 bg-[#959595] rounded-full mr-1" />
              <p className="text-[#959595] text-sm">{formatDaysAgo(createdAt)}</p>
            </div>
          </div>
        </div>
      </div>
    </article>
  )
}