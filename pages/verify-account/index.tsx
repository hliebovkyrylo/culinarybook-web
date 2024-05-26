import { useTranslation }         from "next-i18next";
import { GetStaticPropsContext }  from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { AuthorizationLayout }    from "@/modules/layouts";
import { VerifyAccountForm }      from "@/modules/auth";
import { requireAuth }            from "@/hocs/requireAuth";

export async function getStaticProps({ locale }: GetStaticPropsContext) {
  return {
    props: {
      ...(await serverSideTranslations(locale as string, ['common'])),
    },
  }
}

const VerifyAccount = () => {
  const { t } = useTranslation('common');
  return (
    <AuthorizationLayout
      pageTitle={t('title-verify')}
      pageDescription=""
      metaTitle={`${t('title-verify')} | Culinarybook`}
      applyHomeButton={false}
    >
      <VerifyAccountForm />
    </AuthorizationLayout>
  )
};

export default requireAuth(VerifyAccount);