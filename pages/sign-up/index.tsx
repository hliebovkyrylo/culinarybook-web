import { useTranslation }         from "next-i18next";
import { GetStaticPropsContext }  from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { AuthorizationLayout }    from "@/modules/layouts";
import { SignUpForm }             from "@/modules/auth";
import { requireGuest }           from "@/hocs/requireGuest";

export async function getStaticProps({ locale }: GetStaticPropsContext) {
  return {
    props: {
      ...(await serverSideTranslations(locale as string, ['common'])),
    },
  }
};

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

export default requireGuest(SignUp);