import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { AuthorizationLayout } from "@/modules/layouts";
import { ChangePasswordForm } from "@/modules/auth";
import { RequireAuth } from "@/hocs/requireAuth";
import { MetaTags } from "@/modules/meta-tags";

export const getServerSideProps = async ({ locale }: { locale: string }) => ({
  props: {
    ...await serverSideTranslations(locale, ['common']),
  },
})

const ChangePassword = () => {
  const { t } = useTranslation('common');
  return (
    <>
      <MetaTags title={t('title-change')} />
      <AuthorizationLayout
        pageTitle={t('title-change')}
        applyHomeButton={true}
      >
        <ChangePasswordForm />
      </AuthorizationLayout>
    </>
  )
};

export default RequireAuth(ChangePassword);