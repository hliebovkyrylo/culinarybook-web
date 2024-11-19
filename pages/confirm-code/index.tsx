import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { AuthorizationLayout } from "@/modules/layouts";
import { ConfirmCodeForm } from "@/modules/auth";
import { useTranslation } from "next-i18next";
import { RequireGuest } from "@/hocs/requireGuest";
import { InferGetServerSidePropsType } from "next";
import { NextSeo } from "next-seo";

export const getServerSideProps = async ({ locale }: { locale: string }) => {
  const translations = await serverSideTranslations(locale, ["common"]);

  const commonTranslations =
    translations._nextI18Next?.initialI18nStore[locale || "en"].common;

  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
      metaTags: {
        title: commonTranslations["title-confirm"] || "Culinarybook",
      },
    },
  };
};

const ConfirmCode = ({
  metaTags,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const { t } = useTranslation("common");
  return (
    <>
      <NextSeo
        title={metaTags.title}
        canonical="https://www.culinarybook.website/confirm-code"
        openGraph={{
          url: "https://www.culinarybook.website/confirm-code",
          title: metaTags.title,
          images: [{ url: `/api/og?title=${metaTags.title}` }],
        }}
      />
      <AuthorizationLayout
        pageTitle={t("title-confirm")}
        applyHomeButton={true}
      >
        <ConfirmCodeForm />
      </AuthorizationLayout>
    </>
  );
};

export default RequireGuest(ConfirmCode);
