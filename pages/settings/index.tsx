import { Loader } from "@/components/Loader";
import { RequireAuth } from "@/hocs/requireAuth";
import { useGetMyAllUnreadedNotificationsQuery } from "@/lib/api/notificationApi";
import { useGetMeQuery } from "@/lib/api/userApi";
import { MainLayout } from "@/modules/layouts";
import { SettingsUpdateUserForm } from "@/modules/settings";
import { InferGetServerSidePropsType } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { NextSeo } from "next-seo";

export const getServerSideProps = async ({ locale }: { locale: string }) => {
  const translations = await serverSideTranslations(locale, ['common']);
  
  const commonTranslations = translations._nextI18Next?.initialI18nStore[locale || 'en'].common;
  
  return {
    props: {
      ...await serverSideTranslations(locale, ['common']),
      metaTags: {
        title: commonTranslations['settings'] || 'Culinarybook',
      }
    },
  }
}

const Settings = ({ metaTags }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const { t } = useTranslation('common');

  const { data: notifications, isLoading: isLoadingNotifications } = useGetMyAllUnreadedNotificationsQuery();
  const { data: user, isLoading: isLoadingUser } = useGetMeQuery();

  if (isLoadingUser || isLoadingNotifications) {
    return <Loader className="absolute top-0 left-0" />
  }
  return (
    <>
      <NextSeo 
        title={metaTags.title}
        canonical="https://www.culinarybook.website/settings"
        openGraph={{
          url: 'https://www.culinarybook.website/settings',
          title: metaTags.title,
          images: [
            { url: `/api/og?title=${metaTags.title}` },
          ],
        }}
      />
      <MainLayout
        pageTitle={t('settings')}
        containerSize="small"
        user={user}
        notifications={notifications}
      >
        <SettingsUpdateUserForm user={user} />
      </MainLayout>
    </>
  )
};

export default RequireAuth(Settings);