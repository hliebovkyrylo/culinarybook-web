import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { AuthorizationLayout } from "@/modules/layouts";
import { SignInForm } from "@/modules/auth";
import { RequireGuest } from "@/hocs/requireGuest";
import { MetaTags } from "@/modules/meta-tags";

export const getServerSideProps = async ({ locale }: { locale: string }) => ({
  props: {
    ...await serverSideTranslations(locale, ['common']),
  },
})

const SignIn = () => {
  const { t } = useTranslation('common');
  return (
    <>
      <MetaTags title={t('signUp-link')} description={t('meta-sign-in-description')} />
      <AuthorizationLayout
        pageTitle={t('signUp-link')}
        applyHomeButton={true}
      >
        <SignInForm />
      </AuthorizationLayout>
    </>
  )
};

export default RequireGuest(SignIn);