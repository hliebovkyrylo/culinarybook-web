import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { AuthorizationLayout } from "@/modules/layouts";
import { ResetPasswordForm } from "@/modules/auth";

export const getServerSideProps = async ({ locale }: { locale: string }) => ({
  props: {
    ...await serverSideTranslations(locale, ['common']),
  },
})

const ResetPassword = () => {
  const { t } = useTranslation('common');
  return (
    <AuthorizationLayout
      pageTitle={t('title-new-password')}
      pageDescription=""
      metaTitle={`${t('title-new-password')} | Culinarybook`}
      applyHomeButton={false}
    >
      <ResetPasswordForm />
    </AuthorizationLayout>
  )
};

export default ResetPassword;