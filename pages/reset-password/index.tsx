import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { AuthorizationLayout } from "@/modules/layouts";
import { ResetPasswordForm } from "@/modules/auth";
import { MetaTags } from "@/modules/meta-tags";

export const getServerSideProps = async ({ locale }: { locale: string }) => ({
  props: {
    ...await serverSideTranslations(locale, ['common']),
  },
})

const ResetPassword = () => {
  const { t } = useTranslation('common');
  return (
    <>
      <MetaTags title={t('title-new-password')} />
      <AuthorizationLayout
        pageTitle={t('title-new-password')}
        applyHomeButton={false}
      >
        <ResetPasswordForm />
      </AuthorizationLayout>
    </>
  )
};

export default ResetPassword;