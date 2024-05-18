import { renderMetaTags }         from "@/pages/meta";
import { CreatorCardSkeleton }    from "@/components/cards";
import CreatorCard                from "@/components/users/CreatorCard";
import { 
  useGetPopularUsersQuery, 
  useGetRecommendedUsersQuery, 
  useGetUserByUsernameQuery 
}                                 from "@/lib/api/userApi";
import { IAppState }              from "@/lib/store";
import { IUser }                  from "@/typings/user";
import { useSearchParams }        from "next/navigation";
import { useEffect, useState }    from "react";
import { useTranslation }         from "next-i18next";
import { useSelector }            from "react-redux";
import { GetStaticPropsContext }  from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

export async function getStaticProps({ locale }: GetStaticPropsContext) {
  return {
    props: {
      ...(await serverSideTranslations(locale as string, ['common'])),
    },
  }
}

const Search = () => {
  const { t } = useTranslation();

  const searchParams = useSearchParams();
  const accessToken  = useSelector((state: IAppState) => state.auth.accessToken);

  const search = searchParams.get("username");

  const [pageFindedUsers, setPageFindedUsers]           = useState(1);
  const [pageRecommendedUsers, setPageRecommendedUsers] = useState(1);
  const [pagePopulardUsers, setPagePopularUsers]        = useState(1);
  
  const [findedUsers, setFindedUsers]           = useState<IUser[]>([]);
  const [recommendedUsers, setRecommendedUsers] = useState<IUser[]>([]);
  const [popularUsers, setPopularUsers]         = useState<IUser[]>([]);

  const { data: newFindedUsers }                                       = useGetUserByUsernameQuery({ username: search as string, page: pageFindedUsers, limit: 25 });
  const { data: newRecommendedUsers, isLoading: isLoadingRecommended } = useGetRecommendedUsersQuery({ page: pageRecommendedUsers, limit: 25 });
  const { data: newPopularUsers, isLoading: isLoadingPopular }         = useGetPopularUsersQuery({ page: pagePopulardUsers, limit: 25 });

  useEffect(() => {
    if (search === null) {
      setFindedUsers([]);
    }

    if (newFindedUsers) {
      setFindedUsers((prevUsers) => {
        const uniqueNewUsers = newFindedUsers.filter(
          newUser => !prevUsers.some(prevUser => prevUser.id === newUser.id)
        );
        return [...prevUsers, ...uniqueNewUsers];
      });
    }
  }, [newFindedUsers, search]);

  useEffect(() => {
    if (newRecommendedUsers) {
      setRecommendedUsers((prevUsers) => {
        const uniqueNewUsers = newRecommendedUsers.filter(
          newUser => !prevUsers.some(prevUser => prevUser.id === newUser.id)
        );
        return [...prevUsers, ...uniqueNewUsers];
      });
    }
  }, [newRecommendedUsers]);

  useEffect(() => {
    if (newPopularUsers) {
      setPopularUsers((prevUsers) => {
        const uniqueNewUsers = newPopularUsers.filter(
          newUser => !prevUsers.some(prevUser => prevUser.id === newUser.id)
        );
        return [...prevUsers, ...uniqueNewUsers];
      });
    }
  }, [newPopularUsers]);

  const users     = accessToken ? recommendedUsers : popularUsers;
  const isLoading = isLoadingRecommended || isLoadingPopular;

  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const handleScroll = () => {
    const scrollHeight = document.documentElement.scrollHeight;
    const scrollTop    = document.documentElement.scrollTop;
    const clientHeight = document.documentElement.clientHeight;
    if (scrollTop + clientHeight >= scrollHeight) {
      if (
        newPopularUsers && newPopularUsers.length === 12
        || newRecommendedUsers && newRecommendedUsers.length === 12
        || newFindedUsers && newFindedUsers.length >= 12
      ) {
        setIsLoadingMore(true);
        if (search !== null) {
          setPageFindedUsers((prevPage) => prevPage + 1);
        } else if (accessToken) {
          setPageRecommendedUsers((prevPage) => prevPage + 1);
        }
        setPagePopularUsers((prevPage) => prevPage + 1);
      } else {
        setIsLoadingMore(false);
      }
    } else {
      setIsLoadingMore(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [newRecommendedUsers, newPopularUsers, newFindedUsers]);

  return (
    <div className="grid grid-cols-5 max-lg:grid-cols-3 max-[746px]:grid-cols-1 max-[746px]:justify-items-center">
      {renderMetaTags({ title: `${t('search-user-meta-title')} | Culinarybook`, description: t('search-user-meta-description') })}
      {isLoading ? (
        <>
          {[...Array(20)].map(() => (
            <CreatorCardSkeleton className="mb-2 !w-[186px] max-lg:!w-[98%]" />
          ))}
        </>
      ) : (
        <>
          {search ? (
            <>
              {findedUsers && findedUsers.map((user) => (
                <CreatorCard
                  key={user.id}
                  id={user.id}
                  userImage={user.image}
                  name={user.name}
                  followers={user.followerCount}
                  recipes={user.recipeCount}
                  className="mb-2 !w-[186px] max-lg:!w-[98%]"
                  userBanner={user.backgroundImage}
                />
              ))}
            </>
          ) : (
            <>
              {users && users.map((user) => (
                <CreatorCard
                  key={user.id}
                  id={user.id}
                  userImage={user.image}
                  name={user.name}
                  followers={user.followerCount}
                  recipes={user.recipeCount}
                  className="mb-2 !w-[186px] max-lg:!w-[98%]"
                  userBanner={user.backgroundImage}
                />
              ))}
            </>
          )}
        </>
      )}
      {isLoadingMore && (
        <div className={`absolute left-[calc(50%-24px)] -bottom-4 flex justify-center items-center z-50 dark:bg-bg-c bg-bg-c-7`}>
          <div className=" dark:border-[#222222] border-neutral-300 h-6 w-6 animate-spin rounded-full border-4 dark:border-t-[#DDDF72] border-t-[#C77D0A]" />
        </div>
      )}
    </div>
  )
}

export default Search;