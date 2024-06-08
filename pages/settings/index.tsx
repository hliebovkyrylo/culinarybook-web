import { Loader } from "@/components/shared";
import { RequireAuth } from "@/hocs/requireAuth";
import { useGetMeQuery } from "@/lib/api/userApi";
import { MainLayout } from "@/modules/layouts";
import { SettingsUpdateUserForm } from "@/modules/settings";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

export const getServerSideProps = async ({ locale }: { locale: string }) => ({
  props: {
    ...await serverSideTranslations(locale, ['common']),
  },
})

const Settings = () => {
  const { t } = useTranslation('common');

  const { data: user, isLoading: isLoadingUser } = useGetMeQuery();

  if (isLoadingUser) {
    return <Loader className="absolute top-0 left-0" />
  }
  return (
    <MainLayout
      pageTitle={t('settings')}
      metaTitle={`${t('settings')} | Culinarybook`}
      pageDescription=""
      containerSize="small"
    >
      <SettingsUpdateUserForm user={user} />
    </MainLayout>
  )
};

export default RequireAuth(Settings);