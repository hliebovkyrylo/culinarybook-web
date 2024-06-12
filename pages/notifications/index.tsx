import { baseUrl }                from "@/lib/api";
import { useGetMeQuery }          from "@/lib/api/userApi";
import { INotification }          from "@/typings/notification";
import { useEffect, useState }    from "react";
import { useTranslation }         from "next-i18next";
import io                         from "socket.io-client";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { MainLayout }             from "@/modules/layouts";
import { NotificationsContent }   from "@/modules/notifications";
import { RequireAuth }            from "@/hocs/requireAuth";
import { Loader }                 from "@/components/Loader";

export const getServerSideProps = async ({ locale }: { locale: string }) => ({
  props: {
    ...await serverSideTranslations(locale, ['common']),
  },
})

const Notifications = () => {
  const { t } = useTranslation('common');

  const { data: user, isLoading: isLoadingUser } = useGetMeQuery();

  const [ notifications, setNotifications ] = useState<INotification[]>([]);

  const [ isLoadingNotification, setIsLoadingNotifications ] = useState<boolean>(false);

  useEffect(() => {
    if (!user) {
      return () => null;
    }
    
    const socket = io(baseUrl, {
      withCredentials: true,
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

  if (isLoadingUser) {
    return <Loader className="absolute top-0 left-0" />
  }

  return (
    <MainLayout
      pageTitle={t('title-notifications')}
      metaTitle={`${t('user')} - ${t('title-notifications')} | Culinarybook`}
      pageDescription=""
      containerSize="small"
    >
      <section className="w-full h-full p-3 mt-3 rounded-lg overflow-y-auto max-h-[85%] dark:bg-[#222] bg-white">
        <NotificationsContent 
          data={notifications}
          isLoading={isLoadingNotification}
        />
      </section>
    </MainLayout>
  )
}

export default RequireAuth(Notifications);