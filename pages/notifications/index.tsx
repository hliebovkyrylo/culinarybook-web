import { useTranslation }                from "next-i18next";
import { serverSideTranslations }        from "next-i18next/serverSideTranslations";
import { MainLayout }                    from "@/modules/layouts";
import { NotificationsContent }          from "@/modules/notifications";
import { RequireAuth }                   from "@/hocs/requireAuth";
import { useGetMyAllNotificationsQuery } from "@/lib/api/notificationApi";


export const getServerSideProps = async ({ locale }: { locale: string }) => ({
  props: {
    ...await serverSideTranslations(locale, ['common']),
  },
})

const Notifications = () => {
  const { t } = useTranslation('common');

  const { data: notifications, isLoading: isLoadingNotification } = useGetMyAllNotificationsQuery();

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