import { GetStaticPropsContext }  from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { AuthorizationLayout }    from "@/modules/layouts";
import { ConfirmCodeForm }        from "@/modules/auth";
import { useTranslation }         from "next-i18next";
import { requireGuest }           from "@/hocs/requireGuest";

export async function getStaticProps({ locale }: GetStaticPropsContext) {
  return {
    props: {
      ...(await serverSideTranslations(locale as string, ['common'])),
    },
  }
}

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

export default requireGuest(ConfirmCode);