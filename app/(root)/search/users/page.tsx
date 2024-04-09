"use client"

import { CreatorCardSkeleton } from "@/components/cards";
import CreatorCard             from "@/components/cards/CreatorCard/CreatorCard";

const Search = () => {
  const isLoading = false;
  return (
    <div className="grid grid-cols-5 max-lg:grid-cols-3 max-[746px]:grid-cols-1 max-[746px]:justify-items-center">
      {isLoading ? (
        <>
          {[...Array(20)].map(() => (
            <CreatorCardSkeleton className="mb-2 !w-[186px]" />
          ))}
        </>
      ) : (
        <>
          {[...Array(20)].map(() => (
            <CreatorCard
              key={'ssgs' + 1}
              id="fgsdfgheth53"
              userImage="/assets/testuserimage.jpg"
              name="Jhon Doe"
              followers={100}
              recipes={17}
              className="mb-2 !w-[186px] max-lg:!w-[98%]"
              userBanner=""
            />
          ))}
        </>
      )}

    </div>
  )
}

export default Search;