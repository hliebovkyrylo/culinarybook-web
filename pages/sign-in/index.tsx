import { useTranslation }         from "next-i18next";
import { GetStaticPropsContext }  from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { AuthorizationLayout }    from "@/modules/layouts";
import { SignInForm }             from "@/modules/auth";
import { requireGuest }           from "@/hocs/requireGuest";

export async function getStaticProps({ locale }: GetStaticPropsContext) {
  return {
    props: {
      ...(await serverSideTranslations(locale as string, ['common'])),
    },
  }
}

const SignIn = () => {
  const { t } = useTranslation('common');
  return (
    <AuthorizationLayout
      pageTitle={t('signUp-link')}
      pageDescription={t('meta-sign-in-description')}
      metaTitle={`${t('signUp-link')} | Culinarybook`}
    >
      <SignInForm />
    </AuthorizationLayout>
  )
};

export default requireGuest(SignIn);