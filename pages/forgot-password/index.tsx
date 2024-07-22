import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { AuthorizationLayout } from "@/modules/layouts";
import { ForgotPasswordForm } from "@/modules/auth";
import { RequireGuest } from "@/hocs/requireGuest";
import { MetaTags } from "@/modules/meta-tags";
import { InferGetServerSidePropsType } from "next";

export const getServerSideProps = async ({ locale }: { locale: string }) => {
  const translations = await serverSideTranslations(locale, ['common']);
  
  const commonTranslations = translations._nextI18Next?.initialI18nStore[locale || 'en'].common;
  
  return {
    props: {
      ...await serverSideTranslations(locale, ['common']),
      metaTags: {
        title: commonTranslations['forgot-passwor-meta'] || 'Culinarybook',
      }
    },
  }
}

const ForgotPassword = ({ metaTags }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const { t } = useTranslation('common');
  return (
    <>
      <MetaTags title={metaTags.title} />
      <AuthorizationLayout
        pageTitle={t('email-title')}
        applyHomeButton={true}
      >
        <ForgotPasswordForm />
      </AuthorizationLayout>
    </>
  )
}

export default RequireGuest(ForgotPassword);