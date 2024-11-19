import { CreatorCard, CreatorCardSkeleton } from "@/components/users";
import { IUser } from "@/typings/user";

interface ISearchUsersContent {
  data: IUser[] | undefined;
  isLoading: boolean;
  isLoadingMore: boolean;
}

export const SearchUsersContent = ({
  data,
  isLoading,
  isLoadingMore,
}: ISearchUsersContent) => {
  return (
    <div className="grid grid-cols-5 mt-3 max-lg:grid-cols-3 max-[746px]:grid-cols-1 max-[746px]:justify-items-center">
      {isLoading ? (
        <>
          {[...Array(20)].map((_, index) => (
            <CreatorCardSkeleton
              key={index}
              className="mb-2 !w-[186px] max-lg:!w-[98%]"
            />
          ))}
        </>
      ) : (
        <>
          {data &&
            data.map((user) => (
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
      {isLoadingMore && (
        <div
          className={`absolute left-[calc(50%-24px)] -bottom-4 flex justify-center items-center z-50 dark:bg-bg-c bg-bg-c-7`}
        >
          <div className=" dark:border-[#222222] border-neutral-300 h-6 w-6 animate-spin rounded-full border-4 dark:border-t-[#DDDF72] border-t-[#C77D0A]" />
        </div>
      )}
    </div>
  );
};
