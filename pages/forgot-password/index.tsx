import { useTranslation }            from "next-i18next";
import { GetStaticPropsContext }     from "next";
import { serverSideTranslations }    from "next-i18next/serverSideTranslations";
import { AuthorizationLayout }       from "@/modules/layouts";
import { ForgotPasswordForm }        from "@/modules/auth";
import { requireGuest }              from "@/hocs/requireGuest";

export async function getStaticProps({ locale }: GetStaticPropsContext) {
  return {
    props: {
      ...(await serverSideTranslations(locale as string, ['common'])),
    },
  }
}

const ForgotPassword = () => {
  const { t }  = useTranslation('common');
  return (
    <AuthorizationLayout
      pageTitle={t('email-title')}
      pageDescription=""
      metaTitle={`${t('forgot-passwor-meta')} | Culinarybook` }
    >
      <ForgotPasswordForm />
    </AuthorizationLayout>
  )
}

export default requireGuest(ForgotPassword);