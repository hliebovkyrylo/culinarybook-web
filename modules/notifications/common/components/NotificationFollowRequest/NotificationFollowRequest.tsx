import useFormatDaysAgo   from "@/hooks/useFormatDaysAgo";
import { Button }         from "@/components/ui";
import Image              from "next/image";
import Link               from "next/link";
import { useTranslation } from "next-i18next";

interface INotificationFollowRequest {
  userId              : string;
  username            : string;
  createdAt           : Date;
  userImage           : string;
  onClickAllowRequest : () => void;
  onClickRejectRequest: () => void;
}

export const NotificationFollowRequest = ({
  userId,
  username,
  createdAt,
  userImage,
  onClickAllowRequest,
  onClickRejectRequest
}: INotificationFollowRequest) => {
  const { t }         = useTranslation('common');
  const formatDaysAgo = useFormatDaysAgo();
  return (
    <article className="w-full min-h-[64px] second-background flex items-center py-2 px-3 rounded-lg mb-2">
      <div className="flex justify-between flex-wrap w-full max-[600px]:flex-col max-[600px]:items-start">
        <div className="flex justify-between">
          <Link className="mr-3" href={`/profile/${userId}`}><Image className="object-cover rounded-full w-12 h-12" src={userImage || '/assets/defaulUserImage.jpg'} alt="User image" width={48} height={48} /></Link>
          <div>
            <div>
              <Link className="text-sm" href={`/profile/${userId}`}><b>{username}</b></Link>
              <span className="text-sm"> {t('follow-request-notification')}</span>
            </div>
            <div className="flex items-center">
              <span className="block w-1 h-1 bg-[#959595] rounded-full mr-1" />
              <p className="text-[#959595] text-sm">{formatDaysAgo(createdAt)}</p>
            </div>
          </div>
        </div>
        <div className="flex items-center max-[600px]:ml-16 max-[600px]:mt-2">
          <button onClick={onClickRejectRequest} className="mr-3 text-sm">{t('refuse-request')}</button>
          <Button onClick={onClickAllowRequest} text={t('allow-request')} className="!w-28 flex items-center justify-center h-8 text-sm" state="default" />
        </div>
      </div>
    </article>
  )
}