import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { AuthorizationLayout } from "@/modules/layouts";
import { ForgotPasswordForm } from "@/modules/auth";
import { RequireGuest } from "@/hocs/requireGuest";

export const getServerSideProps = async ({ locale }: { locale: string }) => ({
  props: {
    ...await serverSideTranslations(locale, ['common']),
  },
})

const ForgotPassword = () => {
  const { t } = useTranslation('common');
  return (
    <AuthorizationLayout
      pageTitle={t('email-title')}
      metaTitle={`${t('forgot-passwor-meta')} | Culinarybook`}
      applyHomeButton={true}
    >
      <ForgotPasswordForm />
    </AuthorizationLayout>
  )
}

export default RequireGuest(ForgotPassword);