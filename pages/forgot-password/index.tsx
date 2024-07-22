import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { AuthorizationLayout } from "@/modules/layouts";
import { ForgotPasswordForm } from "@/modules/auth";
import { RequireGuest } from "@/hocs/requireGuest";
import { InferGetServerSidePropsType } from "next";
import { NextSeo } from "next-seo";

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
      <NextSeo 
        title={metaTags.title}
        canonical="https://www.culinarybook.website/forgot-password"
        openGraph={{
          url: 'https://www.culinarybook.website/forgot-password',
          title: metaTags.title,
          images: [
            { url: `/api/og?title=${metaTags.title}` },
          ],
        }}
      />
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