import { useTranslation }         from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { AuthorizationLayout }    from "@/modules/layouts";
import { VerifyAccountForm }      from "@/modules/auth";
import { RequireAuth }            from "@/hocs/requireAuth";

export const getServerSideProps = async ({ locale }: { locale: string }) => ({
  props: {
    ...await serverSideTranslations(locale, ['common']),
  },
})

const VerifyAccount = () => {
  const { t } = useTranslation('common');
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

export default RequireAuth(VerifyAccount);