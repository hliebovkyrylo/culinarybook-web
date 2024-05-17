import { renderMetaTags }                  from "@/pages/meta";
import { 
  NotificationAllowRequest,
  NotificationCommentMessage, 
  NotificationCommentReplyMessage, 
  NotificationFollowMessage, 
  NotificationFollowRequestMessage, 
  NotificationLikeMessage, 
  NotificationMessageSkeleton, 
  NotificationSaveMessage, 
  NotificationsLayout 
}                                          from "@/components/notifications";
import { baseUrl }                         from "@/lib/api";
import { useFollowRequestAnswearMutation } from "@/lib/api/followApi";
import { useGetMeQuery }                   from "@/lib/api/userApi";
import { IAppState }                       from "@/lib/store";
import { INotification }                   from "@/typings/notification";
import { useEffect, useState }             from "react";
import { useTranslation }                  from "next-i18next";
import { useSelector }                     from "react-redux";
import io                                  from "socket.io-client";
import { GetStaticPropsContext }           from "next";
import { serverSideTranslations }          from "next-i18next/serverSideTranslations";

export async function getStaticProps({ locale }: GetStaticPropsContext) {
  return {
    props: {
      ...(await serverSideTranslations(locale as string, ['common'])),
    },
  }
}

const Notifications = () => {
  const { t }       = useTranslation('common');
  const accessToken = useSelector((state: IAppState) => state.auth.accessToken)

  const { data: user, isLoading: isLoadingUser } = useGetMeQuery();

  const [ notifications, setNotifications ] = useState<INotification[]>([]);

  const [ isLoadingNotification, setIsLoadingNotifications ] = useState<boolean>(false);

  useEffect(() => {
    if (!user) {
      return () => null;
    }
    
    const socket = io(baseUrl, {
      extraHeaders: {
        authorization: accessToken || '',
      },
    });

    socket.emit('userConnect', user.id); 
    socket.emit('getNotifications', user.id);

    socket.on("notification", (notification: any) => {
      setNotifications((currentNotifications) => [notification, ...currentNotifications]);
    });

    socket.on('removeNotification', (notificationId) => {
      setNotifications((currentNotifications) => currentNotifications.filter(notification => notification.id !== notificationId));
    });

    socket.on('loading_start', () => {
      setIsLoadingNotifications(true);
    });

    socket.on('notifications', (notifications) => {
      setNotifications(notifications);
    });

    socket.on('loading_end', () => {
      setIsLoadingNotifications(false);
    });

    return () => {
      socket.disconnect();
    };
  }, [user]);
  
  const [ followRequestAnswear, { isLoading: isLoadingFollowRequest } ] = useFollowRequestAnswearMutation();

  const handleAllowRequest = async (userId: string) => {
    await followRequestAnswear({ allowed: true, userId: userId });
  };

  const handleRejectRequest = async (userId: string) => {
    await followRequestAnswear({ allowed: false, userId: userId });
  };

  const isLoading = isLoadingFollowRequest || isLoadingUser || isLoadingNotification;

  return (
    <NotificationsLayout
      title={t('title-notifications')}
    >
      {renderMetaTags({ title: `${t('title-notifications')} | Culinarybook` })}
      {isLoading ? (
        <>
          {[...Array(9)].map(() => (
            <NotificationMessageSkeleton />
          ))}
        </>
      ) : (
        <>
          {notifications && notifications.length > 0 ? notifications.map((notification) => {
            switch (notification?.type) {
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
                    userId={notification.notificationCreator.id}
                    createdAt={notification.createdAt}
                  />
                )
              case 'comment':
                return (
                  <NotificationCommentMessage 
                    key={notification.id}
                    username={notification.notificationCreator.username}
                    userImage={notification.notificationCreator.image}
                    commentText={notification.noficationData}
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
                    commentText={notification.noficationData}
                    recipeId={notification.recipeId}
                    recipeImage={notification.recipe.image}
                    userId={notification.userId}
                    createdAt={notification.createdAt}
                  />
                )
              case 'follow-allowed':
                return (
                  <NotificationAllowRequest 
                    key={notification.id}
                    username={notification.notificationCreator.username}
                    userImage={notification.notificationCreator.image}
                    userId={notification.notificationCreator.id}
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