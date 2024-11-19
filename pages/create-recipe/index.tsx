import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { MainLayout } from "@/modules/layouts";
import { CreateRecipeForm } from "@/modules/create-recipe";
import { RequireAuth } from "@/hocs/requireAuth";
import { useGetMeQuery } from "@/lib/api/userApi";
import { useGetMyAllUnreadedNotificationsQuery } from "@/lib/api/notificationApi";
import { Loader } from "@/components/Loader";
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
        title: commonTranslations["create-recipe"] || "Culinarybook",
        description: commonTranslations["meta-create-recipe-description"] || "",
      },
    },
  };
};

const CreateRecipe = ({
  metaTags,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const { t } = useTranslation("common");

  const { data: notifications, isLoading: isLoadingNotifications } =
    useGetMyAllUnreadedNotificationsQuery(undefined, {
      refetchOnMountOrArgChange: true,
      refetchOnReconnect: true,
      refetchOnFocus: true,
    });
  const { data: user, isLoading: isLoadingUser } = useGetMeQuery(undefined, {
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: true,
    refetchOnFocus: true,
  });

  if (isLoadingUser || isLoadingNotifications) {
    return <Loader className="absolute top-0 left-0" />;
  }

  return (
    <>
      <NextSeo
        title={metaTags.title}
        description={metaTags.description}
        canonical="https://www.culinarybook.website/create-recipe"
        openGraph={{
          url: "https://www.culinarybook.website/create-recipe",
          title: metaTags.title,
          description: metaTags.description,
          images: [
            {
              url: `/api/og?title=${metaTags.title}&description=${metaTags.description}`,
            },
          ],
        }}
      />
      <MainLayout
        pageTitle={t("create-recipe")}
        containerSize="full"
        user={user}
        notifications={notifications}
      >
        <CreateRecipeForm />
      </MainLayout>
    </>
  );
};

export default RequireAuth(CreateRecipe);
