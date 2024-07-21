import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { AuthorizationLayout } from "@/modules/layouts";
import { ConfirmCodeForm } from "@/modules/auth";
import { useTranslation } from "next-i18next";
import { RequireGuest } from "@/hocs/requireGuest";
import { MetaTags } from "@/modules/meta-tags";

export const getServerSideProps = async ({ locale }: { locale: string }) => ({
  props: {
    ...await serverSideTranslations(locale, ['common']),
  },
})

const ConfirmCode = () => {
  const { t } = useTranslation('common');
  return (
    <>
      <MetaTags title={t('title-confirm')} />
      <AuthorizationLayout
        pageTitle={t('title-confirm')}
        applyHomeButton={true}
      >
        <ConfirmCodeForm />
      </AuthorizationLayout>
    </>
  )
};

export default RequireGuest(ConfirmCode);