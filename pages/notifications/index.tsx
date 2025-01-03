import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { MainLayout } from "@/modules/layouts";
import { NotificationsContent } from "@/modules/notifications";
import { RequireAuth } from "@/hocs/requireAuth";
import {
  useGetMyAllNotificationsQuery,
  useGetMyAllUnreadedNotificationsQuery,
} from "@/lib/api/notificationApi";
import { useGetMeQuery } from "@/lib/api/userApi";
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
        title: commonTranslations["title-notifications"] || "Culinarybook",
      },
    },
  };
};

const Notifications = ({
  metaTags,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const { t } = useTranslation("common");

  const {
    data: unreadedNotifications,
    isLoading: isLoadingUnreadedNotifications,
  } = useGetMyAllUnreadedNotificationsQuery(undefined, {
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: true,
    refetchOnFocus: true,
  });
  const { data: user, isLoading: isLoadingUser } = useGetMeQuery(undefined, {
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: true,
    refetchOnFocus: true,
  });
  const { data: notifications, isLoading: isLoadingNotifications } =
    useGetMyAllNotificationsQuery();

  if (isLoadingUser || isLoadingUnreadedNotifications) {
    return <Loader className="absolute top-0 left-0" />;
  }

  return (
    <>
      <NextSeo
        title={metaTags.title}
        canonical="https://www.culinarybook.website/notifications"
        openGraph={{
          url: "https://www.culinarybook.website/notifications",
          title: metaTags.title,
          images: [{ url: `/api/og?title=${metaTags.title}` }],
        }}
      />
      <MainLayout
        pageTitle={t("title-notifications")}
        containerSize="small"
        user={user}
        notifications={unreadedNotifications}
      >
        <section className="w-full h-full p-3 mt-3 rounded-lg overflow-y-auto max-h-[85%] dark:bg-[#222] bg-white">
          <NotificationsContent
            data={notifications}
            isLoading={isLoadingNotifications}
          />
        </section>
      </MainLayout>
    </>
  );
};

export default RequireAuth(Notifications);
