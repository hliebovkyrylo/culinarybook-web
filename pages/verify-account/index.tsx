import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { AuthorizationLayout } from "@/modules/layouts";
import { VerifyAccountForm } from "@/modules/auth";
import { useGetMeQuery } from "@/lib/api/userApi";
import { Loader } from "@/components/Loader";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import { InferGetServerSidePropsType } from "next";
import { NextSeo } from "next-seo";

export const getServerSideProps = async ({ locale }: { locale: string }) => {
  const translations = await serverSideTranslations(locale, ['common']);
  
  const commonTranslations = translations._nextI18Next?.initialI18nStore[locale || 'en'].common;
  
  return {
    props: {
      ...await serverSideTranslations(locale, ['common']),
      metaTags: {
        title: commonTranslations['title-verify'] || 'Culinarybook',
      }
    },
  }
}

const VerifyAccount = ({ metaTags }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const accessToken = Cookies.get("access_token");
  const { data: user, isLoading } = useGetMeQuery();

  const { t } = useTranslation('common');
  const router = useRouter();

  if (isLoading) {
    return <Loader className="absolute top-0 left-0" />
  }

  if (user?.isVerified) {
    router.push('/');
    return null;
  }

  if (!accessToken) {
    router.push('/sign-in');
    return null;
  }
  return (
    <>
      <NextSeo 
        title={metaTags.title}
        canonical="https://www.culinarybook.website/verify-account"
        openGraph={{
          url: 'https://www.culinarybook.website/verify-account',
          title: metaTags.title,
          images: [
            { url: `/api/og?title=${metaTags.title}` },
          ],
        }}
      />
      <AuthorizationLayout
        pageTitle={t('title-verify')}
        applyHomeButton={false}
      >
        <VerifyAccountForm />
      </AuthorizationLayout>
    </>
  )
};

export default VerifyAccount;