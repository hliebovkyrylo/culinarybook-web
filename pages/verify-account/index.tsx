import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { AuthorizationLayout } from "@/modules/layouts";
import { VerifyAccountForm } from "@/modules/auth";
import { useGetMeQuery } from "@/lib/api/userApi";
import { Loader } from "@/components/Loader";
import { useRouter } from "next/router";
import Cookies from "js-cookie";

export const getServerSideProps = async ({ locale }: { locale: string }) => ({
  props: {
    ...await serverSideTranslations(locale, ['common']),
  },
})

const VerifyAccount = () => {
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
    <AuthorizationLayout
      pageTitle={t('title-verify')}
      metaTitle={`${t('title-verify')} | Culinarybook`}
      applyHomeButton={false}
    >
      <VerifyAccountForm />
    </AuthorizationLayout>
  )
};

export default VerifyAccount;