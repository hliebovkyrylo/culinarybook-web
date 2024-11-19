import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { AuthorizationLayout } from "@/modules/layouts";
import { SignInForm } from "@/modules/auth";
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
        title: commonTranslations["signUp-link"] || "Culinarybook",
        description: commonTranslations["meta-sign-in-description"] || "",
      },
    },
  };
};

const SignIn = ({
  metaTags,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const { t } = useTranslation("common");
  return (
    <>
      <NextSeo
        title={metaTags.title}
        description={metaTags.description}
        canonical="https://www.culinarybook.website/sign-in"
        openGraph={{
          url: "https://www.culinarybook.website/sign-in",
          title: metaTags.title,
          description: metaTags.description,
          images: [
            {
              url: `/api/og?title=${metaTags.title}&description=${metaTags.description}`,
            },
          ],
        }}
      />
      <AuthorizationLayout pageTitle={t("signUp-link")} applyHomeButton={true}>
        <SignInForm />
      </AuthorizationLayout>
    </>
  );
};

export default RequireGuest(SignIn);
