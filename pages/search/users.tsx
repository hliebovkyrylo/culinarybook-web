import {
  SearchButtons,
  SearchInput,
  SearchUsersContent,
  useUsers
} from "@/modules/search";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";
import { GlassIcon } from "@/icons";
import { MainLayout } from "@/modules/layouts";
import { IUser } from "@/typings/user";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useGetMeQuery } from "@/lib/api/userApi";
import { useGetMyAllUnreadedNotificationsQuery } from "@/lib/api/notificationApi";
import { Loader } from "@/components/Loader";

export const getServerSideProps = async ({ locale }: { locale: string }) => ({
  props: {
    ...await serverSideTranslations(locale, ['common']),
  },
})

const SearchUsers = () => {
  const { t } = useTranslation("common");
  const router = useRouter();

  const { data: user, isLoading: isLoadingUser } = useGetMeQuery();
  const { data: notifications, isLoading: isLoadingNotifications } = useGetMyAllUnreadedNotificationsQuery();

  const searchParams = router.query.username;
  const [page, setPage] = useState<number>(1);

  const { users: newUsers, isLoading } = useUsers(page, !!user, searchParams);
  const [users, setUses] = useState<IUser[]>([]);
  const [findedUsers, setFindedUsers] = useState<IUser[]>([]);

  const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false);

  useEffect(() => {
    if (searchParams && newUsers) {
      setFindedUsers([]);
      setPage(1);
      setFindedUsers(prevUsers => [...prevUsers, ...newUsers]);
    }
  }, [newUsers, searchParams]);

  useInfiniteScroll(newUsers, searchParams ? setFindedUsers : setUses, 25, setPage, setIsLoadingMore);

  if (isLoadingUser || isLoadingNotifications) {
    return <Loader className="absolute top-0 left-0" />
  }

  return (
    <MainLayout
      pageTitle={t('title-search')}
      pageDescription={'search-user-meta-description'}
      containerSize="small"
      metaTitle={`${t('search-user-meta-title')} | Culinarybook`}
      user={user}
      notifications={notifications}
    >
      <SearchInput
        placeholder={t('input-username-placeholder')}
        leftIcon={<GlassIcon className="absolute top-1.5 left-3 fill-[#666]" />}
        routeType={"users"}
        searchType={"username"}
      />
      <SearchButtons />
      <SearchUsersContent
        data={searchParams ? findedUsers : users}
        isLoading={isLoading}
        isLoadingMore={isLoadingMore}
      />
    </MainLayout>
  )
}

export default SearchUsers;