import { Loader } from "@/components/Loader";
import { RequireAuth } from "@/hocs/requireAuth";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";
import { useGetMyAllUnreadedNotificationsQuery } from "@/lib/api/notificationApi";
import { useGetMyVisitedQuery } from "@/lib/api/recipeApi";
import { useGetMeQuery } from "@/lib/api/userApi";
import { HistoryRecipesContent } from "@/modules/history";
import { MainLayout } from "@/modules/layouts";
import { IRecipePreview } from "@/typings/recipe";
import { InferGetServerSidePropsType } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { NextSeo } from "next-seo";
import { useEffect, useState } from "react";

export const getServerSideProps = async ({ locale }: { locale: string }) => {
  const translations = await serverSideTranslations(locale, ["common"]);

  const commonTranslations =
    translations._nextI18Next?.initialI18nStore[locale || "en"].common;

  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
      metaTags: {
        title: commonTranslations["title-notifications"] || "Culinarybook",
        description: commonTranslations["history-meta-description"] || "",
      },
    },
  };
};

const History = ({
  metaTags,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const { t } = useTranslation("common");

  const [page, setPage] = useState<number>(1);
  const [visitedRecipes, setVisitedRecipes] = useState<IRecipePreview[]>([]);
  const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false);

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

  const { data: newVisitedRecipes, isLoading: isLoadingRecipes } =
    useGetMyVisitedQuery({ page: page, limit: 10 });

  if (isLoadingUser || isLoadingNotifications) {
    return <Loader className="absolute top-0 left-0" />;
  }

  useEffect(() => {
    if (newVisitedRecipes) {
      setVisitedRecipes([]);
      setPage(1);
      setVisitedRecipes((prevRecipes) => [
        ...prevRecipes,
        ...newVisitedRecipes,
      ]);
    }
  }, [newVisitedRecipes]);

  useInfiniteScroll(
    newVisitedRecipes,
    setVisitedRecipes,
    12,
    setPage,
    setIsLoadingMore
  );
  return (
    <>
      <NextSeo
        title={metaTags.title}
        description={metaTags.description}
        canonical="https://www.culinarybook.website/history"
        openGraph={{
          url: "https://www.culinarybook.website/history",
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
        pageTitle={t("title-history")}
        containerSize="small"
        user={user}
        notifications={notifications}
      >
        <HistoryRecipesContent
          data={visitedRecipes}
          isLoading={isLoadingRecipes}
          isLoadingMore={isLoadingMore}
        />
      </MainLayout>
    </>
  );
};

export default RequireAuth(History);
