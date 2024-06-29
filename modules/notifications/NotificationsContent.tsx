import {
  NotificationAllowRequest,
  NotificationComment,
  NotificationCommentReply,
  NotificationFollow,
  NotificationFollowRequest,
  NotificationLike,
  NotificationSave,
  NotificationSkeleton
} from "./common";
import { INotification } from "@/typings/notification"
import { useTranslation } from "next-i18next";
import { useFollowRequestAnswearMutation } from "@/lib/api/followApi";

interface INotificationsContent {
  data?: INotification[];
  isLoading: boolean;
}

export const NotificationsContent = ({
  data,
  isLoading
}: INotificationsContent) => {
  const { t } = useTranslation('common');

  const [followRequestAnswear, { isLoading: isLoadingFollowRequest }] = useFollowRequestAnswearMutation();

  const handleAllowRequest = async (userId: string) => {
    await followRequestAnswear({ allowed: true, userId: userId });
  };

  const handleRejectRequest = async (userId: string) => {
    await followRequestAnswear({ allowed: false, userId: userId });
  };
  return (
    <div className={`${(data && data.length < 0) && 'h-full'}`}>
      {(isLoading || isLoadingFollowRequest) ? (
        <>
          {[...Array(9)].map((_, index) => (
            <NotificationSkeleton key={index} />
          ))}
        </>
      ) : (
        <>
          {data && data.length > 0 ? data.map((notification) => {
            switch (notification?.type) {
              case 'follow':
                return (
                  <NotificationFollow
                    key={notification.id}
                    username={notification.notificationCreator?.username}
                    userImage={notification.notificationCreator?.image}
                    userId={notification.notificationCreator?.id}
                    createdAt={notification.createdAt}
                  />
                )
              case 'like':
                return (
                  <NotificationLike
                    key={notification.id}
                    username={notification.notificationCreator?.username}
                    userImage={notification.notificationCreator?.image}
                    recipeId={notification.recipeId}
                    recipeImage={notification.recipe?.image}
                    userId={notification.notificationCreator?.id}
                    createdAt={notification.createdAt}
                  />
                )
              case 'comment':
                return (
                  <NotificationComment
                    key={notification.id}
                    username={notification.notificationCreator?.username}
                    userImage={notification.notificationCreator?.image}
                    commentText={notification.noficationData}
                    recipeId={notification.recipeId}
                    recipeImage={notification.recipe?.image}
                    userId={notification.userId}
                    createdAt={notification.createdAt}
                  />
                )
              case 'follow-request':
                return (
                  <NotificationFollowRequest
                    key={notification.id}
                    username={notification.notificationCreator?.username}
                    userImage={notification.notificationCreator?.image}
                    userId={notification.userId}
                    createdAt={notification.createdAt}
                    onClickAllowRequest={() => handleAllowRequest(notification.notificationCreator?.id)}
                    onClickRejectRequest={() => handleRejectRequest(notification.notificationCreator?.id)}
                  />
                )
              case 'save':
                return (
                  <NotificationSave
                    key={notification.id}
                    username={notification.notificationCreator?.username}
                    recipeId={notification.recipeId}
                    recipeImage={notification.recipe?.image}
                    userImage={notification.notificationCreator?.image}
                    userId={notification.userId}
                    createdAt={notification.createdAt}
                  />
                )
              case 'comment-reply':
                return (
                  <NotificationCommentReply
                    key={notification.id}
                    username={notification.notificationCreator?.username}
                    userImage={notification.notificationCreator?.image}
                    commentText={notification.noficationData}
                    recipeId={notification.recipeId}
                    recipeImage={notification.recipe?.image}
                    userId={notification.userId}
                    createdAt={notification.createdAt}
                  />
                )
              case 'follow-allowed':
                return (
                  <NotificationAllowRequest
                    key={notification.id}
                    username={notification.notificationCreator?.username}
                    userImage={notification.notificationCreator?.image}
                    userId={notification.notificationCreator?.id}
                    createdAt={notification.createdAt}
                  />
                )
              default:
                return null;
            }
          }) : (
            <p className="flex justify-center items-center h-full text-[#757575]">{t('no-notifications')}</p>
          )}
        </>
      )}
    </div>
  )
}