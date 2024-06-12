import { useTranslation }         from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { AuthorizationLayout }    from "@/modules/layouts";
import { SignInForm }             from "@/modules/auth";
import { RequireGuest }           from "@/hocs/requireGuest";

export const getServerSideProps = async ({ locale }: { locale: string }) => ({
  props: {
    ...await serverSideTranslations(locale, ['common']),
  },
})

const SignIn = () => {
  const { t } = useTranslation('common');
  return (
    <AuthorizationLayout
      pageTitle={t('signUp-link')}
      pageDescription={t('meta-sign-in-description')}
      metaTitle={`${t('signUp-link')} | Culinarybook`}
      applyHomeButton={true}
    >
      <SignInForm />
    </AuthorizationLayout>
  )
};

export default RequireGuest(SignIn);