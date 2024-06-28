import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { MainLayout } from "@/modules/layouts";
import { NotificationsContent } from "@/modules/notifications";
import { RequireAuth } from "@/hocs/requireAuth";
import { useGetMyAllNotificationsQuery, useGetMyAllUnreadedNotificationsQuery } from "@/lib/api/notificationApi";
import { useGetMeQuery } from "@/lib/api/userApi";
import { Loader } from "@/components/Loader";


export const getServerSideProps = async ({ locale }: { locale: string }) => ({
  props: {
    ...await serverSideTranslations(locale, ['common']),
  },
})

const Notifications = () => {
  const { t } = useTranslation('common');

  const { data: user, isLoading: isLoadingUser } = useGetMeQuery();
  const { data: unreadedNotifications, isLoading: isLoadingUnreadedNotifications } = useGetMyAllUnreadedNotificationsQuery();
  const { data: notifications, isLoading: isLoadingNotifications } = useGetMyAllNotificationsQuery();

  if (isLoadingUser || isLoadingNotifications || isLoadingUnreadedNotifications) {
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
          isLoading={isLoadingNotifications}
        />
      </section>
    </MainLayout>
  )
}

export default RequireAuth(Notifications);