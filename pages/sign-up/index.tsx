import { useTranslation }         from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { AuthorizationLayout }    from "@/modules/layouts";
import { SignUpForm }             from "@/modules/auth";
import { RequireGuest }           from "@/hocs/requireGuest";

export const getServerSideProps = async ({ locale }: { locale: string }) => ({
  props: {
    ...await serverSideTranslations(locale, ['common']),
  },
})

const SignUp = () => {
  const { t } = useTranslation('common');
  return (
    <AuthorizationLayout
      pageTitle={t('title-signup')}
      pageDescription={t('meta-sign-up-description')}
      metaTitle={`${t('title-signup')} | Culinarybook`}
      applyHomeButton={true}
    >
      <SignUpForm />
    </AuthorizationLayout>
  )
};

export default RequireGuest(SignUp);