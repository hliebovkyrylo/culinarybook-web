import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { AuthorizationLayout }    from "@/modules/layouts";
import { ConfirmCodeForm }        from "@/modules/auth";
import { useTranslation }         from "next-i18next";
import { RequireGuest }           from "@/hocs/requireGuest";

export const getServerSideProps = async ({ locale }: { locale: string }) => ({
  props: {
    ...await serverSideTranslations(locale, ['common']),
  },
})

const ConfirmCode = () => {
  const { t } = useTranslation('common');
  return (
    <AuthorizationLayout
      pageTitle={t('title-confirm')}
      pageDescription=""
      metaTitle={`${t('title-confirm')} | Culinarybook`}
      applyHomeButton={true}
    >
      <ConfirmCodeForm />
    </AuthorizationLayout>
  )
};

export default RequireGuest(ConfirmCode);