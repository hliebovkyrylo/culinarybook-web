"use client"

import { 
  NotificationCommentMessage, 
  NotificationCommentReplyMessage, 
  NotificationFollowMessage, 
  NotificationFollowRequestMessage, 
  NotificationLikeMessage, 
  NotificationMessageSkeleton, 
  NotificationSaveMessage, 
  NotificationsLayout 
}                                          from "@/components/notifications";
import { useFollowRequestAnswearMutation } from "@/lib/api/followApi";
import { useGetAllNotificationsQuery }     from "@/lib/api/notificationApi";
import { IAppState }                       from "@/lib/store";
import { useRouter }                       from "next/navigation";
import { useTranslation }                  from "react-i18next";
import { useSelector }                     from "react-redux";

const Notifications = () => {
  const { t }  = useTranslation();
  const router = useRouter();

  const accessToken = useSelector((state: IAppState) => state.auth.accessToken);

  const { data: notifications, isLoading: isLoadingNotifications, refetch } = useGetAllNotificationsQuery();
  
  const [ followRequestAnswear, { isLoading: isLoadingFollowRequest } ] = useFollowRequestAnswearMutation();

  const handleAllowRequest = async (userId: string) => {
    await followRequestAnswear({ allowed: true, userId: userId });
    await refetch();
  };

  const handleRejectRequest = async (userId: string) => {
    await followRequestAnswear({ allowed: false, userId: userId });
    await refetch();
  };

  const isLoading = isLoadingNotifications || isLoadingFollowRequest;

  if (!accessToken) {
    router.push('/');
    return null;
  }

  return (
    <NotificationsLayout
      title={t('title-notifications')}
    >
      {isLoading ? (
        <>
          {[...Array(9)].map(() => (
            <NotificationMessageSkeleton />
          ))}
        </>
      ) : (
        <>
          {notifications && notifications.length > 0 ? notifications.map((notification) => {
            switch (notification.type) {
              case 'follow':
                return (
                  <NotificationFollowMessage 
                    key={notification.id}
                    username={notification.notificationCreator.username}
                    userImage={notification.notificationCreator.image}
                    userId={notification.notificationCreator.id}
                    createdAt={notification.createdAt}
                  />
                )
              case 'like': 
                return (
                  <NotificationLikeMessage 
                    key={notification.id}
                    username={notification.notificationCreator.username}
                    userImage={notification.notificationCreator.image}
                    recipeId={notification.recipeId}
                    recipeImage={notification.recipe.image}
                    userId={notification.userId}
                    createdAt={notification.createdAt}
                  />
                )
              case 'comment':
                return (
                  <NotificationCommentMessage 
                    key={notification.id}
                    username={notification.notificationCreator.username}
                    userImage={notification.notificationCreator.image}
                    commentText={notification.notificationData}
                    recipeId={notification.recipeId}
                    recipeImage={notification.recipe.image}
                    userId={notification.userId}
                    createdAt={notification.createdAt}
                  />
                )
              case 'follow-request':
                return (
                  <NotificationFollowRequestMessage 
                    key={notification.id}
                    username={notification.notificationCreator.username}
                    userImage={notification.notificationCreator.image}
                    userId={notification.userId}
                    createdAt={notification.createdAt}
                    onClickAllowRequest={() => handleAllowRequest(notification.notificationCreator.id)}
                    onClickRejectRequest={() => handleRejectRequest(notification.notificationCreator.id)}
                  />
                )
              case 'save':
                return (
                  <NotificationSaveMessage 
                    key={notification.id}
                    username={notification.notificationCreator.username}
                    recipeId={notification.recipeId}
                    recipeImage={notification.recipe.image}
                    userImage={notification.notificationCreator.image}
                    userId={notification.userId}
                    createdAt={notification.createdAt}
                  />
                )
              case 'comment-reply':
                return (
                  <NotificationCommentReplyMessage 
                    key={notification.id}
                    username={notification.notificationCreator.username}
                    userImage={notification.notificationCreator.image}
                    commentText={notification.notificationData}
                    recipeId={notification.recipeId}
                    recipeImage={notification.recipe.image}
                    userId={notification.userId}
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
    </NotificationsLayout>
  )
}

export default Notifications;