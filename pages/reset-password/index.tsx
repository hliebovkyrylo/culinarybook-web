import { useTranslation }         from "next-i18next";
import { GetStaticPropsContext }  from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { AuthorizationLayout }    from "@/modules/layouts";
import { ResetPasswordForm }      from "@/modules/auth";

export async function getStaticProps({ locale }: GetStaticPropsContext) {
  return {
    props: {
      ...(await serverSideTranslations(locale as string, ['common'])),
    },
  }
}

const ResetPassword = () => {
  const { t } = useTranslation('common');
  return (
    <AuthorizationLayout
      pageTitle={t('title-new-password')}
      pageDescription=""
      metaTitle={`${t('title-new-password')} | Culinarybook`}
    >
      <ResetPasswordForm />
    </AuthorizationLayout>
  )
};

export default ResetPassword;