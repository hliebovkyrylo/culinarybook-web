import { 
  SearchButtons, 
  SearchInput, 
  SearchUsersContent,
  useUsers
}                                 from "@/modules/search";
import { useInfiniteScroll }      from "@/hooks/useInfiniteScroll";
import { GlassIcon }              from "@/icons";
import { MainLayout }             from "@/modules/layouts";
import { IUser }                  from "@/typings/user";
import { GetStaticPropsContext }  from "next";
import { useTranslation }         from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter }              from "next/router";
import { useEffect, useState }    from "react";
import cookies                    from "js-cookie";
import { useGetAuthStatusQuery } from "@/lib/api/authApi";

export async function getStaticProps({ locale }: GetStaticPropsContext) {
  return {
    props: {
      ...(await serverSideTranslations(locale as string, ['common'])),
    },
  }
}

const SearchUsers = () => {
  const { t }       = useTranslation("common");
  const router      = useRouter();
  
  const { data: authStatus, isLoading: isLoadingAuthStatus } = useGetAuthStatusQuery();

  const searchParams      = router.query.username;
  const [ page, setPage ] = useState<number>(1);

  const { users: newUsers, isLoading } = useUsers(page, authStatus?.isAuth, searchParams);
  const [users, setUses]               = useState<IUser[]>([]);
  const [findedUsers, setFindedUsers]  = useState<IUser[]>([]);

  const [ isLoadingMore, setIsLoadingMore ] = useState<boolean>(false);

  useEffect(() => {
    if (searchParams && newUsers) {
      setFindedUsers([]);
      setPage(1);
      setFindedUsers(prevUsers => [...prevUsers, ...newUsers]);
    }
  }, [newUsers, searchParams]);

  useInfiniteScroll(newUsers, searchParams ? setFindedUsers : setUses, 25, setPage, setIsLoadingMore);
  return (
    <MainLayout
      pageTitle={t('title-search')}
      pageDescription={'search-user-meta-description'}
      containerSize="small"
      metaTitle={`${t('search-user-meta-title')} | Culinarybook`}
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
        isLoading={isLoading || isLoadingAuthStatus}
        isLoadingMore={isLoadingMore}
      />
    </MainLayout>
  )
}

export default SearchUsers;