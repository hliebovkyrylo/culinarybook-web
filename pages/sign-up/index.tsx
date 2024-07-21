import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { AuthorizationLayout } from "@/modules/layouts";
import { SignUpForm } from "@/modules/auth";
import { RequireGuest } from "@/hocs/requireGuest";
import { MetaTags } from "@/modules/meta-tags";

export const getServerSideProps = async ({ locale }: { locale: string }) => ({
  props: {
    ...await serverSideTranslations(locale, ['common']),
  },
})

const SignUp = () => {
  const { t } = useTranslation('common');
  return (
    <>
      <MetaTags title={t('title-signup')} description={t('meta-sign-up-description')} />
      <AuthorizationLayout
        pageTitle={t('title-signup')}
        applyHomeButton={true}
      >
        <SignUpForm />
      </AuthorizationLayout>
    </>
  )
};

export default RequireGuest(SignUp);