import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { AuthorizationLayout } from "@/modules/layouts";
import { ChangePasswordForm } from "@/modules/auth";
import { RequireAuth } from "@/hocs/requireAuth";
import { MetaTags } from "@/modules/meta-tags";
import { InferGetServerSidePropsType } from "next";

export const getServerSideProps = async ({ locale }: { locale: string }) => {
  const translations = await serverSideTranslations(locale, ['common']);
  
  const commonTranslations = translations._nextI18Next?.initialI18nStore[locale || 'en'].common;
  
  return {
    props: {
      ...await serverSideTranslations(locale, ['common']),
      metaTags: {
        title: commonTranslations['title-change'] || 'Culinarybook',
      }
    },
  }
}

const ChangePassword = ({ metaTags }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const { t } = useTranslation('common');
  return (
    <>
      <MetaTags title={metaTags.title} />
      <AuthorizationLayout
        pageTitle={t('title-change')}
        applyHomeButton={true}
      >
        <ChangePasswordForm />
      </AuthorizationLayout>
    </>
  )
};

export default RequireAuth(ChangePassword);